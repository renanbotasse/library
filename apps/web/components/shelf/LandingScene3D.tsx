"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Environment, Text } from "@react-three/drei";
import * as THREE from "three";

// ─── Shared materials ─────────────────────────────────────────────────────
const GOLD = new THREE.MeshStandardMaterial({ color: "#A3824A", roughness: 0.12, metalness: 0.95 });
const AGED_GOLD = new THREE.MeshStandardMaterial({ color: "#7A5F2E", roughness: 0.3, metalness: 0.8 });
const PAGE = new THREE.MeshStandardMaterial({ color: "#C9C1B4", roughness: 0.95, metalness: 0 });

// ─── Floating Book ────────────────────────────────────────────────────────
function FloatingBook({
  position, rotation, coverColor, spineColor, scale = 1, speed = 1,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  coverColor: string; spineColor: string;
  scale?: number; speed?: number;
}) {
  const cover = useMemo(
    () => new THREE.MeshStandardMaterial({ color: coverColor, roughness: 0.7, metalness: 0.05 }),
    [coverColor]
  );
  const spine = useMemo(
    () => new THREE.MeshStandardMaterial({ color: spineColor, roughness: 0.45, metalness: 0.15 }),
    [spineColor]
  );

  const W = 0.6, H = 0.95, D = 0.13;

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.9} floatingRange={[-0.1, 0.1]}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Front cover */}
        <mesh position={[0, 0, D / 2 - 0.007]} material={cover} castShadow>
          <boxGeometry args={[W, H, 0.014]} />
        </mesh>
        {/* Back cover */}
        <mesh position={[0, 0, -D / 2 + 0.007]} material={cover} castShadow>
          <boxGeometry args={[W, H, 0.014]} />
        </mesh>
        {/* Pages */}
        <mesh position={[0.018, 0, 0]} material={PAGE}>
          <boxGeometry args={[W - 0.03, H - 0.008, D - 0.028]} />
        </mesh>
        {/* Spine */}
        <mesh position={[-W / 2 + 0.007, 0, 0]} material={spine} castShadow>
          <boxGeometry args={[0.014, H, D]} />
        </mesh>
        {/* Gold top edge */}
        <mesh position={[0.018, H / 2 - 0.004, 0]} material={GOLD}>
          <boxGeometry args={[W - 0.03, 0.005, D - 0.028]} />
        </mesh>
        {/* Corner clasps */}
        {([ [-W/2+0.01, H/2-0.01], [W/2-0.01, H/2-0.01],
            [-W/2+0.01, -H/2+0.01], [W/2-0.01, -H/2+0.01] ] as [number,number][]).map(([x,y], i) => (
          <mesh key={i} position={[x, y, D/2 + 0.002]} material={AGED_GOLD}>
            <boxGeometry args={[0.04, 0.04, 0.006]} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// ─── Old Key ──────────────────────────────────────────────────────────────
function OldKey() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.45) * 0.1;
    ref.current.position.y = -0.1 + Math.sin(clock.elapsedTime * 0.65) * 0.12;
  });

  return (
    <group ref={ref} position={[0, 0.2, 0.5]}>
      <mesh position={[0, -0.48, 0]} material={GOLD}>
        <cylinderGeometry args={[0.035, 0.035, 1.0, 10]} />
      </mesh>
      <mesh position={[0, 0.2, 0]} material={GOLD}>
        <torusGeometry args={[0.185, 0.042, 14, 36]} />
      </mesh>
      <mesh position={[0, 0.2, 0]} material={GOLD}>
        <sphereGeometry args={[0.048, 10, 10]} />
      </mesh>
      {([[0.095, -0.85], [0.09, -0.68]] as [number,number][]).map(([x,y], i) => (
        <mesh key={i} position={[x, y, 0]} material={GOLD}>
          <boxGeometry args={[0.14, 0.06, 0.05]} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Pocket Watch ─────────────────────────────────────────────────────────
function PocketWatch({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.3;
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.5) * 0.08;
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.6) * 0.1;
  });

  return (
    <group ref={ref} position={position}>
      {/* Case back */}
      <mesh position={[0, 0, -0.03]} material={GOLD}>
        <cylinderGeometry args={[0.28, 0.28, 0.06, 40]} />
      </mesh>
      {/* Face */}
      <mesh position={[0, 0, 0.005]}>
        <cylinderGeometry args={[0.26, 0.26, 0.012, 40]} />
        <meshStandardMaterial color="#F5F0E6" roughness={0.9} />
      </mesh>
      {/* Rim */}
      <mesh material={GOLD}>
        <torusGeometry args={[0.27, 0.025, 12, 40]} />
      </mesh>
      {/* Hour hand */}
      <mesh position={[-0.07, 0.06, 0.016]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.03, 0.14, 0.008]} />
        <meshStandardMaterial color="#211C29" />
      </mesh>
      {/* Minute hand */}
      <mesh position={[0.06, 0.09, 0.018]} rotation={[0, 0, 0.7]}>
        <boxGeometry args={[0.018, 0.19, 0.006]} />
        <meshStandardMaterial color="#211C29" />
      </mesh>
      {/* Crown */}
      <mesh position={[0, 0.3, 0]} material={GOLD}>
        <cylinderGeometry args={[0.025, 0.025, 0.08, 8]} />
      </mesh>
      {/* Chain links (3 spheres) */}
      {[0.38, 0.52, 0.66].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} material={AGED_GOLD}>
          <sphereGeometry args={[0.018, 8, 8]} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Playing Card ─────────────────────────────────────────────────────────
function PlayingCard({
  position, rotation, suit, speed = 1,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  suit: string;
  speed?: number;
}) {
  const face = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#F5F0E6", roughness: 0.9, metalness: 0 }),
    []
  );
  const back = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#211C29", roughness: 0.8, metalness: 0.05 }),
    []
  );

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.7}>
      <group position={position} rotation={rotation}>
        {/* Card face */}
        <mesh position={[0, 0, 0.003]} material={face} castShadow>
          <boxGeometry args={[0.38, 0.55, 0.003]} />
        </mesh>
        {/* Card back */}
        <mesh position={[0, 0, -0.003]} material={back}>
          <boxGeometry args={[0.38, 0.55, 0.003]} />
        </mesh>
        {/* Card border */}
        <mesh material={AGED_GOLD}>
          <torusGeometry args={[0.2, 0.005, 4, 4, Math.PI * 2]} />
        </mesh>
        {/* Suit symbol */}
        <Text
          position={[0, 0, 0.008]}
          fontSize={0.18}
          color="#6B1F33"
          anchorX="center"
          anchorY="middle"
        >
          {suit}
        </Text>
        <Text position={[-0.12, 0.2, 0.008]} fontSize={0.07} color="#6B1F33" anchorX="center">
          {suit}
        </Text>
        <Text position={[0.12, -0.2, 0.008]} fontSize={0.07} color="#6B1F33" anchorX="center" rotation={[0,0,Math.PI]}>
          {suit}
        </Text>
      </group>
    </Float>
  );
}

// ─── Ancient Door (floating, miniature) ─────────────────────────────────
function AncientDoor({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.4) * 0.08;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.12;
  });

  const doorMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#2A1F35", roughness: 0.85, metalness: 0.05 }),
    []
  );

  return (
    <group ref={ref} position={position} scale={0.6}>
      {/* Door frame */}
      <mesh position={[0, 0, -0.03]} material={AGED_GOLD}>
        <boxGeometry args={[0.82, 1.45, 0.06]} />
      </mesh>
      {/* Door panel */}
      <mesh position={[0, 0, 0.015]} material={doorMat} castShadow>
        <boxGeometry args={[0.7, 1.32, 0.06]} />
      </mesh>
      {/* Arch top */}
      <mesh position={[0, 0.73, 0.015]} material={doorMat}>
        <cylinderGeometry args={[0.35, 0.35, 0.06, 20, 1, false, 0, Math.PI]} />
      </mesh>
      <mesh position={[0, 0.73, -0.03]} material={AGED_GOLD}>
        <cylinderGeometry args={[0.41, 0.41, 0.06, 20, 1, false, 0, Math.PI]} />
      </mesh>
      {/* Upper panel */}
      <mesh position={[0, 0.38, 0.05]} material={AGED_GOLD}>
        <boxGeometry args={[0.54, 0.45, 0.01]} />
      </mesh>
      <mesh position={[0, 0.38, 0.052]}>
        <boxGeometry args={[0.48, 0.39, 0.01]} />
        <meshStandardMaterial color="#1A1525" roughness={0.95} />
      </mesh>
      {/* Lower panel */}
      <mesh position={[0, -0.25, 0.05]} material={AGED_GOLD}>
        <boxGeometry args={[0.54, 0.62, 0.01]} />
      </mesh>
      <mesh position={[0, -0.25, 0.052]}>
        <boxGeometry args={[0.48, 0.56, 0.01]} />
        <meshStandardMaterial color="#1A1525" roughness={0.95} />
      </mesh>
      {/* Doorknob */}
      <mesh position={[0.27, -0.05, 0.08]} material={GOLD}>
        <sphereGeometry args={[0.045, 12, 12]} />
      </mesh>
      {/* Keyhole */}
      <mesh position={[0.27, -0.12, 0.08]}>
        <cylinderGeometry args={[0.02, 0.02, 0.015, 8]} />
        <meshStandardMaterial color="#0B0A0F" />
      </mesh>
      {/* A faint warm glow through the keyhole */}
      <pointLight position={[0, -0.12, 0.1]} intensity={0.3} color="#A3824A" distance={0.5} decay={2} />
    </group>
  );
}

// ─── Particle systems ─────────────────────────────────────────────────────
function Particles({ color, count, range, size, opacity }: {
  color: string; count: number; range: number; size: number; opacity: number;
}) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * range;
      pos[i * 3 + 1] = (Math.random() - 0.5) * range * 0.7;
      pos[i * 3 + 2] = (Math.random() - 0.5) * range * 0.5;
    }
    return pos;
  }, [count, range]);

  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.015;
    ref.current.rotation.x = clock.elapsedTime * 0.005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={size} transparent opacity={opacity} sizeAttenuation />
    </points>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      {/* Atmospheric lighting */}
      <ambientLight intensity={0.08} />
      <pointLight position={[0, 3, 2]} intensity={2.5} color="#A3824A" distance={9} decay={2} />
      <pointLight position={[-5, 1, 0]} intensity={1.2} color="#4B2E5E" distance={10} decay={2} />
      <pointLight position={[5, -1, 0]} intensity={0.8} color="#6B1F33" distance={8} decay={2} />
      <pointLight position={[0, -3, 2]} intensity={0.4} color="#314338" distance={6} decay={2} />

      <Environment preset="night" />
      <Stars radius={24} depth={12} count={700} factor={1.8} fade speed={0.3} />

      {/* Particles — gold dust + mist */}
      <Particles color="#A3824A" count={80}  range={10} size={0.02}  opacity={0.3} />
      <Particles color="#C9C1B4" count={40}  range={8}  size={0.035} opacity={0.12} />

      {/* Central key */}
      <OldKey />

      {/* Books — proper geometry */}
      <FloatingBook position={[-3.0, 0.6, -1.2]} rotation={[0.06, 0.32, -0.10]} coverColor="#2E1F45" spineColor="#4B2E5E" scale={1.08} speed={0.8} />
      <FloatingBook position={[2.9, 0.1, -1.6]}  rotation={[-0.05, -0.42, 0.07]} coverColor="#1C2E22" spineColor="#314338" scale={0.95} speed={1.1} />
      <FloatingBook position={[-2.0, -1.4, -0.6]} rotation={[0.15, 0.18, 0.20]} coverColor="#3A1A1F" spineColor="#6B1F33" scale={0.83} speed={0.9} />
      <FloatingBook position={[2.2, 1.6, -2.2]}   rotation={[-0.07, -0.25, -0.07]} coverColor="#1C1830" spineColor="#A3824A" scale={1.12} speed={0.7} />
      <FloatingBook position={[0.8, -1.7, -0.9]}  rotation={[0.10, 0.50, 0.07]} coverColor="#271830" spineColor="#C88C9A" scale={0.78} speed={1.1} />

      {/* Pocket watch — replaces one of the main focal points */}
      <PocketWatch position={[1.4, 1.0, 0.4]} />

      {/* Playing cards */}
      <PlayingCard position={[-1.6, -0.6, 0.3]} rotation={[0.1,  0.3, 0.35]} suit="♥" speed={0.9} />
      <PlayingCard position={[1.7,  0.7, 0.2]} rotation={[0.05,-0.4, -0.2]} suit="♠" speed={1.2} />
      <PlayingCard position={[-0.5,-1.8, -0.4]} rotation={[0.2,  0.1, 0.55]} suit="♦" speed={0.8} />

      {/* Ancient floating door */}
      <AncientDoor position={[-4.5, 0.2, -3]} />
    </>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────
export function LandingScene3D() {
  return (
    <div className="absolute inset-0" style={{ zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0.5, 5.8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        shadows
      >
        <Scene />
      </Canvas>
    </div>
  );
}
