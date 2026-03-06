"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function buildStarGeometry() {
  const shape = new THREE.Shape();
  const outerR = 0.58;
  const innerR = 0.24;
  const pts = 5;

  for (let i = 0; i < pts * 2; i++) {
    // Start pointing up: subtract π/2
    const angle = (i / (pts * 2)) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.24,
    bevelEnabled: true,
    bevelThickness: 0.055,
    bevelSize: 0.04,
    bevelSegments: 4,
  });

  // Centre geometry on Z so it sits at origin
  geo.translate(0, 0, -0.12);
  return geo;
}

function StarMesh() {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => buildStarGeometry(), []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.9;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.05;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial
        color="#F5C830"
        metalness={0.35}
        roughness={0.12}
        emissive="#C8980A"
        emissiveIntensity={0.9}
      />
    </mesh>
  );
}

export function RegisterStar3D() {
  return (
    <div className="relative mx-auto h-32 w-32">
      {/* Soft gold glow behind */}
      <div
        className="absolute inset-6 rounded-full blur-xl opacity-45"
        style={{ backgroundColor: "#D4A800" }}
      />
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 2.1], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.25} />
        <pointLight position={[2, 3, 2]} intensity={1.8} color="#FFE566" />
        <pointLight position={[-2, -1, 2]} intensity={0.7} color="#FFA020" />
        <StarMesh />
      </Canvas>
    </div>
  );
}
