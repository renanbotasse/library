"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Pre-computed sprinkle positions (on a circle r=0.15, at y=0.12)
const SPRINKLES = [
  { x: 0.15, y: 0.12, z: 0.0, color: "#A3824A" },
  { x: 0.046, y: 0.12, z: 0.143, color: "#C88C9A" },
  { x: -0.121, y: 0.12, z: 0.088, color: "#7EC87E" },
  { x: -0.121, y: 0.12, z: -0.088, color: "#C88C9A" },
  { x: 0.046, y: 0.12, z: -0.143, color: "#A3824A" },
];

// Rook battlements: 3 evenly spaced
const BATTLEMENTS = [0, 1, 2].map((i) => ({
  x: Math.cos((i / 3) * Math.PI * 2) * 0.22,
  z: Math.sin((i / 3) * Math.PI * 2) * 0.22,
}));

function RookObject() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.7;
  });
  return (
    <group ref={ref} scale={0.78}>
      {/* Base plate */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.44, 0.5, 0.12, 16]} />
        <meshStandardMaterial color="#2A2535" metalness={0.9} roughness={0.1} emissive="#A3824A" emissiveIntensity={0.7} />
      </mesh>
      {/* Body */}
      <mesh position={[0, -0.18, 0]}>
        <cylinderGeometry args={[0.33, 0.39, 0.7, 16]} />
        <meshStandardMaterial color="#211C29" metalness={0.7} roughness={0.2} emissive="#A3824A" emissiveIntensity={0.3} />
      </mesh>
      {/* Upper rim */}
      <mesh position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.38, 0.31, 0.13, 16]} />
        <meshStandardMaterial color="#2A2535" metalness={0.9} roughness={0.1} emissive="#A3824A" emissiveIntensity={0.7} />
      </mesh>
      {/* Top platform */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.07, 16]} />
        <meshStandardMaterial color="#1a1525" metalness={0.8} roughness={0.15} emissive="#A3824A" emissiveIntensity={0.2} />
      </mesh>
      {/* Battlements */}
      {BATTLEMENTS.map((b, i) => (
        <mesh key={i} position={[b.x, 0.49, b.z]}>
          <boxGeometry args={[0.14, 0.23, 0.14]} />
          <meshStandardMaterial color="#2A2535" metalness={0.9} roughness={0.1} emissive="#A3824A" emissiveIntensity={1.0} />
        </mesh>
      ))}
    </group>
  );
}

function CardObject() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.65;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.18;
  });
  return (
    <group ref={ref} scale={0.88}>
      {/* Card body */}
      <mesh>
        <boxGeometry args={[0.65, 0.94, 0.046]} />
        <meshStandardMaterial color="#211C29" metalness={0.3} roughness={0.4} emissive="#6B1F33" emissiveIntensity={0.55} />
      </mesh>
      {/* Inner face */}
      <mesh position={[0, 0, 0.027]}>
        <boxGeometry args={[0.59, 0.88, 0.005]} />
        <meshStandardMaterial color="#2A2535" roughness={0.7} />
      </mesh>
      {/* Diamond ♦ — rotated box */}
      <mesh position={[0, 0, 0.034]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.27, 0.27, 0.01]} />
        <meshStandardMaterial color="#C88C9A" emissive="#C88C9A" emissiveIntensity={2.2} roughness={0.15} />
      </mesh>
    </group>
  );
}

function BottleObject() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.55;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.06;
  });
  return (
    <group ref={ref} scale={0.85}>
      {/* Bottle body */}
      <mesh position={[0, -0.18, 0]}>
        <cylinderGeometry args={[0.27, 0.31, 0.8, 16]} />
        <meshStandardMaterial
          color="#1a0f2e"
          transparent
          opacity={0.85}
          roughness={0.05}
          metalness={0.1}
          emissive="#4B2E5E"
          emissiveIntensity={0.7}
        />
      </mesh>
      {/* Inner liquid glow */}
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.21, 0.25, 0.64, 16]} />
        <meshStandardMaterial
          color="#6B1F33"
          transparent
          opacity={0.75}
          emissive="#C88C9A"
          emissiveIntensity={2.2}
        />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.1, 0.22, 0.22, 12]} />
        <meshStandardMaterial
          color="#1a0f2e"
          transparent
          opacity={0.9}
          roughness={0.05}
          emissive="#4B2E5E"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Cork body */}
      <mesh position={[0, 0.44, 0]}>
        <cylinderGeometry args={[0.09, 0.1, 0.1, 12]} />
        <meshStandardMaterial color="#8B6914" roughness={0.9} />
      </mesh>
      {/* Cork top */}
      <mesh position={[0, 0.52, 0]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color="#8B6914" roughness={0.9} />
      </mesh>
    </group>
  );
}

function CakeObject() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.6;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.85 + 1) * 0.05;
  });
  return (
    <group ref={ref} scale={0.88}>
      {/* Wrapper/base */}
      <mesh position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.29, 0.25, 0.36, 16]} />
        <meshStandardMaterial color="#314338" roughness={0.7} emissive="#314338" emissiveIntensity={0.5} />
      </mesh>
      {/* Frosting dome */}
      <mesh position={[0, 0.02, 0]}>
        <sphereGeometry args={[0.3, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
        <meshStandardMaterial color="#C88C9A" roughness={0.4} emissive="#C88C9A" emissiveIntensity={1.0} />
      </mesh>
      {/* Cherry */}
      <mesh position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.096, 8, 8]} />
        <meshStandardMaterial color="#6B1F33" roughness={0.3} emissive="#6B1F33" emissiveIntensity={1.8} />
      </mesh>
      {/* Stem */}
      <mesh position={[0.04, 0.37, 0]} rotation={[0, 0, -0.25]}>
        <cylinderGeometry args={[0.013, 0.013, 0.12, 6]} />
        <meshStandardMaterial color="#314338" roughness={0.8} />
      </mesh>
      {/* Sprinkles */}
      {SPRINKLES.map((s, i) => (
        <mesh key={i} position={[s.x, s.y, s.z]}>
          <boxGeometry args={[0.04, 0.04, 0.11]} />
          <meshStandardMaterial color={s.color} emissive={s.color} emissiveIntensity={1.8} />
        </mesh>
      ))}
    </group>
  );
}

type IconType = "rook" | "card" | "bottle" | "cake";

function renderIcon(type: IconType) {
  switch (type) {
    case "rook":   return <RookObject />;
    case "card":   return <CardObject />;
    case "bottle": return <BottleObject />;
    case "cake":   return <CakeObject />;
  }
}

const DEFAULT_GLOW: Record<IconType, string> = {
  rook:   "#A3824A",
  card:   "#C88C9A",
  bottle: "#7B5EA7",
  cake:   "#C88C9A",
};

interface FeatureIcon3DProps {
  type: IconType;
  glowColor?: string;
}

export function FeatureIcon3D({ type, glowColor }: FeatureIcon3DProps) {
  const glow = glowColor ?? DEFAULT_GLOW[type];

  return (
    <div className="relative mx-auto h-24 w-24">
      {/* CSS glow beneath the canvas */}
      <div
        className="absolute inset-3 rounded-full blur-xl opacity-50"
        style={{ backgroundColor: glow }}
      />
      <Canvas
        dpr={1}
        camera={{ position: [0, 0.1, 2.9], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.14} />
        <pointLight position={[0, 0, 3]} intensity={1.4} color={glow} />
        <pointLight position={[1.5, 2, 1]} intensity={0.4} color="#ffffff" />
        {renderIcon(type)}
      </Canvas>
    </div>
  );
}
