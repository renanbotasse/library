"use client";

import React, { useRef, useState, useMemo, Suspense, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useTexture, ContactShadows } from "@react-three/drei";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import type { CollectionEntry, ReadingStatus } from "@tomekeep/core";

// ━━━ Deterministic RNG ━━━

function seededRng(seed: string): () => number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 7;
    h ^= h << 17;
    return (h >>> 0) / 0xffffffff;
  };
}

// ━━━ Constants ━━━

const SPINE_COLORS: Record<ReadingStatus, string> = {
  to_read: "#6b5acd",
  reading: "#c04a2b",
  read:    "#2a7a4a",
};

const BOOKS_PER_SHELF = 9;

// Cabinet
const CW   = 7.2;
const CH   = 5.0;
const CD   = 0.9;
const WALL = 0.12;
const IW   = CW - WALL * 2;    // 6.96

// Book height is FIXED so all books are the same height
const BOOK_HEIGHT = 1.15;

// Shelf planks: equal book zones above each shelf
// zone = BOOK_HEIGHT + 0.08 clearance = 1.23
// SHELF_TOP_Y[2] = 2.38 - 1.23 = 1.15
// SHELF_TOP_Y[1] = 1.15 - 0.1(plank) - 1.23 = -0.18
// SHELF_TOP_Y[0] = -0.18 - 0.1 - 1.23 = -1.51
const SHELF_TOP_Y = [-1.51, -0.18, 1.15] as const;
const SHELF_H = 0.1;

// Book Z: near front of shelf
const BOOK_Z = 0.16;
const HOVER_PUSH = 0.20;

// When selected: book floats in front of bookcase
const SELECTED_Z     = 5.0;
const SELECTED_SCALE = 1.6;

// Wood tones
const WOOD_DARK  = "#291a0c";
const WOOD_MID   = "#3a2514";
const WOOD_LIGHT = "#4a3020";

// ━━━ Book dimensions (deterministic, height fixed) ━━━

interface BookDims {
  w: number; h: number; d: number; rotY: number; nudgeZ: number;
}

function getBookDims(id: string): BookDims {
  const rng = seededRng(id);
  return {
    w:      0.55 + rng() * 0.12,    // 0.55 – 0.67, natural width variation
    h:      BOOK_HEIGHT,             // FIXED — all books same height
    d:      0.08 + rng() * 0.08,    // 0.08 – 0.16
    rotY:   (rng() - 0.5) * 0.04,  // ±2°
    nudgeZ: rng() * 0.03,
  };
}

// ━━━ Error boundary for texture load failures ━━━

class TextureErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() {
    return this.state.error ? this.props.fallback : this.props.children;
  }
}

// ━━━ Book mesh — with cover texture ━━━

function BookMeshWithCover({
  coverUrl, w, h, d, spineColor,
}: {
  coverUrl: string; w: number; h: number; d: number; spineColor: string;
}) {
  const tex = useTexture(coverUrl);
  tex.colorSpace = THREE.SRGBColorSpace;

  const mats = useMemo(() => {
    const s = new THREE.Color(spineColor);
    return [
      // BoxGeometry face order: +X, -X, +Y, -Y, +Z(front), -Z(back)
      new THREE.MeshStandardMaterial({ color: "#e8ddd0", roughness: 0.88 }),           // pages
      new THREE.MeshStandardMaterial({ color: spineColor, roughness: 0.55, emissive: s.clone().multiplyScalar(0.12) }), // spine
      new THREE.MeshStandardMaterial({ color: "#c8b890", roughness: 0.82 }),           // top
      new THREE.MeshStandardMaterial({ color: "#bba878", roughness: 0.9 }),            // bottom
      new THREE.MeshStandardMaterial({ map: tex, roughness: 0.4 }),                    // COVER
      new THREE.MeshStandardMaterial({ color: spineColor, roughness: 0.75 }),          // back
    ];
  }, [tex, spineColor]);

  return (
    <mesh castShadow receiveShadow material={mats}>
      <boxGeometry args={[w, h, d]} />
    </mesh>
  );
}

// ━━━ Book mesh — plain (fallback) ━━━

function BookMeshPlain({
  w, h, d, spineColor,
}: {
  w: number; h: number; d: number; spineColor: string;
}) {
  const mats = useMemo(() => {
    const s    = new THREE.Color(spineColor);
    const dark = s.clone().multiplyScalar(0.58);
    return [
      new THREE.MeshStandardMaterial({ color: "#e8ddd0", roughness: 0.88 }),
      new THREE.MeshStandardMaterial({ color: spineColor, roughness: 0.55, emissive: s.clone().multiplyScalar(0.1) }),
      new THREE.MeshStandardMaterial({ color: "#c8b890", roughness: 0.82 }),
      new THREE.MeshStandardMaterial({ color: "#bba878", roughness: 0.9 }),
      new THREE.MeshStandardMaterial({ color: dark, roughness: 0.65 }),
      new THREE.MeshStandardMaterial({ color: dark, roughness: 0.75 }),
    ];
  }, [spineColor]);

  return (
    <mesh castShadow receiveShadow material={mats}>
      <boxGeometry args={[w, h, d]} />
    </mesh>
  );
}

// ━━━ Single book ━━━

function Book({
  entry, posX, shelfTopY, isSelected, onSelect,
}: {
  entry: CollectionEntry;
  posX: number;
  shelfTopY: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const groupRef  = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const dims      = useMemo(() => getBookDims(entry.id), [entry.id]);
  const spine     = SPINE_COLORS[entry.status];
  const centerY   = shelfTopY + dims.h / 2;
  const restZ     = BOOK_Z + dims.nudgeZ;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const lerp = Math.min(delta * 8, 1);

    const targetX = isSelected ? 0       : posX;
    const targetY = isSelected ? 0       : centerY;
    const targetZ = isSelected ? SELECTED_Z : restZ + (hovered && !isSelected ? HOVER_PUSH : 0);
    const targetS = isSelected ? SELECTED_SCALE : (hovered ? 1.04 : 1.0);

    groupRef.current.position.x += (targetX - groupRef.current.position.x) * lerp;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * lerp;
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * lerp;
    groupRef.current.scale.x    += (targetS - groupRef.current.scale.x) * lerp;
    groupRef.current.scale.y    += (targetS - groupRef.current.scale.y) * lerp;
    groupRef.current.scale.z    += (targetS - groupRef.current.scale.z) * lerp;
  });

  return (
    <group
      ref={groupRef}
      position={[posX, centerY, restZ]}
      rotation={[0, isSelected ? 0 : dims.rotY, 0]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={()   => { setHovered(false); document.body.style.cursor = "default"; }}
      onClick={(e)       => { e.stopPropagation(); onSelect(); }}
    >
      {entry.coverUrl ? (
        <TextureErrorBoundary
          fallback={<BookMeshPlain w={dims.w} h={dims.h} d={dims.d} spineColor={spine} />}
        >
          <Suspense fallback={<BookMeshPlain w={dims.w} h={dims.h} d={dims.d} spineColor={spine} />}>
            <BookMeshWithCover
              coverUrl={entry.coverUrl}
              w={dims.w} h={dims.h} d={dims.d}
              spineColor={spine}
            />
          </Suspense>
        </TextureErrorBoundary>
      ) : (
        <BookMeshPlain w={dims.w} h={dims.h} d={dims.d} spineColor={spine} />
      )}

      {/* Hover / selected glow */}
      {(hovered || isSelected) && (
        <mesh>
          <boxGeometry args={[dims.w + 0.04, dims.h + 0.04, dims.d + 0.04]} />
          <meshStandardMaterial
            color={spine}
            transparent
            opacity={isSelected ? 0.18 : 0.11}
            emissive={spine}
            emissiveIntensity={isSelected ? 1.0 : 0.6}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}

// ━━━ Books on one shelf ━━━

function ShelfBooks({
  entries, shelfTopY, selectedId, onSelectBook,
}: {
  entries: CollectionEntry[];
  shelfTopY: number;
  selectedId: string | null;
  onSelectBook: (entry: CollectionEntry) => void;
}) {
  const placements = useMemo(() => {
    const items: Array<{ entry: CollectionEntry; posX: number }> = [];
    let cursorX   = -IW / 2 + 0.12;
    const maxRight = IW / 2 - 0.12;

    for (const entry of entries) {
      const { w } = getBookDims(entry.id);
      const rng   = seededRng(entry.id + "_gap");
      const gap   = 0.01 + rng() * 0.02;
      if (cursorX + w > maxRight) break;
      items.push({ entry, posX: cursorX + w / 2 });
      cursorX += w + gap;
    }
    return items;
  }, [entries]);

  return (
    <>
      {placements.map(({ entry, posX }) => (
        <Book
          key={entry.id}
          entry={entry}
          posX={posX}
          shelfTopY={shelfTopY}
          isSelected={selectedId === entry.id}
          onSelect={() => onSelectBook(entry)}
        />
      ))}
    </>
  );
}

// ━━━ Full bookcase ━━━

function Bookcase({
  entries, selectedId, onSelectBook,
}: {
  entries: CollectionEntry[];
  selectedId: string | null;
  onSelectBook: (entry: CollectionEntry) => void;
}) {
  const darkMat  = useMemo(() => new THREE.MeshStandardMaterial({ color: WOOD_DARK,  roughness: 0.85, metalness: 0.05 }), []);
  const midMat   = useMemo(() => new THREE.MeshStandardMaterial({ color: WOOD_MID,   roughness: 0.80, metalness: 0.06 }), []);
  const lightMat = useMemo(() => new THREE.MeshStandardMaterial({ color: WOOD_LIGHT, roughness: 0.75, metalness: 0.08 }), []);

  const rows = [
    entries.slice(0,                   BOOKS_PER_SHELF),
    entries.slice(BOOKS_PER_SHELF,     BOOKS_PER_SHELF * 2),
    entries.slice(BOOKS_PER_SHELF * 2, BOOKS_PER_SHELF * 3),
  ];

  const shelfDepth = CD - WALL;
  const shelfZ     = WALL / 2;

  return (
    <group>
      {/* Back panel */}
      <mesh position={[0, 0, -CD / 2 + WALL * 0.4]} material={midMat} receiveShadow>
        <boxGeometry args={[CW - WALL * 2, CH - WALL * 2, WALL * 0.5]} />
      </mesh>

      {/* Sides */}
      <mesh position={[-CW / 2 + WALL / 2, 0, 0]} material={darkMat} castShadow>
        <boxGeometry args={[WALL, CH, CD]} />
      </mesh>
      <mesh position={[CW / 2 - WALL / 2, 0, 0]} material={darkMat} castShadow>
        <boxGeometry args={[WALL, CH, CD]} />
      </mesh>

      {/* Top & base */}
      <mesh position={[0, CH / 2 - WALL / 2, 0]} material={darkMat} castShadow>
        <boxGeometry args={[CW, WALL, CD]} />
      </mesh>
      <mesh position={[0, -CH / 2 + WALL / 2, 0]} material={darkMat} castShadow>
        <boxGeometry args={[CW, WALL, CD]} />
      </mesh>

      {/* Shelf planks + books */}
      {SHELF_TOP_Y.map((topY, i) => (
        <group key={i}>
          {/* Plank */}
          <mesh position={[0, topY - SHELF_H / 2, shelfZ]} material={lightMat} receiveShadow>
            <boxGeometry args={[IW, SHELF_H, shelfDepth]} />
          </mesh>

          {/* Gold front edge */}
          <mesh position={[0, topY + 0.005, CD / 2 - WALL * 0.4]}>
            <boxGeometry args={[IW, 0.007, 0.006]} />
            <meshStandardMaterial
              color="#A3824A"
              roughness={0.18}
              metalness={0.92}
              emissive="#A3824A"
              emissiveIntensity={0.6}
            />
          </mesh>

          <ShelfBooks
            entries={rows[i] ?? []}
            shelfTopY={topY}
            selectedId={selectedId}
            onSelectBook={onSelectBook}
          />
        </group>
      ))}
    </group>
  );
}

// ━━━ Camera ━━━

function CameraRig({ paused }: { paused: boolean }) {
  const t = useRef(0);
  useFrame((state, delta) => {
    if (paused) return;
    t.current += delta * 0.032;
    const tx = Math.sin(t.current) * 0.35;
    const ty = 0.25 + Math.sin(t.current * 0.55) * 0.18;
    state.camera.position.x += (tx - state.camera.position.x) * delta * 0.35;
    state.camera.position.y += (ty - state.camera.position.y) * delta * 0.35;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// ━━━ Scene ━━━

function Scene({
  entries, selectedId, onSelectBook, onDeselect,
}: {
  entries: CollectionEntry[];
  selectedId: string | null;
  onSelectBook: (entry: CollectionEntry) => void;
  onDeselect: () => void;
}) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.25, 7.8]} fov={52} />
      <CameraRig paused={selectedId !== null} />

      <fog attach="fog" color="#0d0b18" near={14} far={32} />

      <ambientLight intensity={0.55} color="#ffe8c0" />
      <directionalLight
        position={[2, 7, 6]}
        intensity={1.5}
        color="#fff5e0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      <pointLight position={[0, 2, 5]}  intensity={4.0} color="#f5c842" distance={18} decay={1.2} />
      <pointLight position={[-4, 1, 3]} intensity={1.8} color="#a090e8" distance={14} decay={1.5} />
      <pointLight position={[4,  1, 3]} intensity={1.5} color="#ffa870" distance={14} decay={1.5} />

      <ContactShadows
        position={[0, -CH / 2 - 0.02, 0]}
        opacity={0.5}
        scale={14}
        blur={2.8}
        far={1}
        color="#060410"
      />

      {/* Invisible background plane — click to deselect */}
      {selectedId && (
        <mesh position={[0, 0, -2]} onClick={(e) => { e.stopPropagation(); onDeselect(); }}>
          <planeGeometry args={[40, 40]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      )}

      <Bookcase
        entries={entries}
        selectedId={selectedId}
        onSelectBook={onSelectBook}
      />
    </>
  );
}

// ━━━ Exported component ━━━

export function BookShelf3D({ entries }: { entries: CollectionEntry[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<CollectionEntry | null>(null);

  const handleSelectBook = useCallback((entry: CollectionEntry) => {
    // Second click on same book → navigate
    if (selected?.id === entry.id) {
      router.push(`/book/${entry.googleBookId}`);
      return;
    }
    setSelected(entry);
  }, [selected, router]);

  const handleDeselect = useCallback(() => setSelected(null), []);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{
        height: "72vh",
        border: "1px solid rgba(163,130,74,0.15)",
        backgroundColor: "#0B0A0F",
      }}
    >
      <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true }}>
        <Scene
          entries={entries}
          selectedId={selected?.id ?? null}
          onSelectBook={handleSelectBook}
          onDeselect={handleDeselect}
        />
      </Canvas>

      {/* "Press to open" overlay */}
      {selected && (
        <div
          className="absolute inset-x-0 bottom-14 flex justify-center pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <div
            className="pointer-events-auto flex flex-col items-center gap-3 rounded-2xl px-6 py-4"
            style={{
              backgroundColor: "rgba(11,10,15,0.88)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(163,130,74,0.2)",
            }}
          >
            <div className="text-center">
              <p className="font-sans text-xs" style={{ color: "#7A7060" }}>
                {selected.author ?? "Unknown author"}
              </p>
              <p className="font-serif text-base font-semibold" style={{ color: "#E8DDD0" }}>
                {selected.title}
              </p>
            </div>
            <button
              onClick={() => router.push(`/book/${selected.googleBookId}`)}
              className="rounded-xl px-5 py-2 font-sans text-sm font-medium transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#A3824A", color: "#0B0A0F" }}
            >
              Press to open →
            </button>
            <button
              onClick={handleDeselect}
              className="font-sans text-xs"
              style={{ color: "rgba(201,193,180,0.4)" }}
            >
              dismiss
            </button>
          </div>
        </div>
      )}

      {/* Status legend */}
      <div
        className="absolute bottom-3 left-3 flex items-center gap-4 rounded-xl px-3 py-1.5"
        style={{ backgroundColor: "rgba(11,10,15,0.75)", backdropFilter: "blur(4px)" }}
      >
        {[
          { color: "#6b5acd", label: "To Read" },
          { color: "#c04a2b", label: "Reading" },
          { color: "#2a7a4a", label: "Read"    },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="font-sans text-[10px]" style={{ color: "#C9C1B4" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {!selected && (
        <p
          className="absolute bottom-3 right-3 font-sans text-[10px]"
          style={{ color: "rgba(201,193,180,0.4)" }}
        >
          Click a book to preview
        </p>
      )}
    </div>
  );
}
