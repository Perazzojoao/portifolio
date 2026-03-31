"use client";

import { PointMaterial, Points, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ParticleCluster() {
  const pointsRef = useRef<THREE.Points | null>(null);

  const positions = useMemo(() => {
    const values = new Float32Array(2400);

    for (let i = 0; i < values.length; i += 3) {
      const seedA = Math.sin((i + 1) * 12.9898) * 43758.5453;
      const seedB = Math.sin((i + 2) * 78.233) * 19341.1337;
      const seedC = Math.sin((i + 3) * 37.719) * 53921.4433;

      values[i] = (seedA - Math.floor(seedA) - 0.5) * 7;
      values[i + 1] = (seedB - Math.floor(seedB) - 0.5) * 7;
      values[i + 2] = (seedC - Math.floor(seedC) - 0.5) * 7;
    }

    return values;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.06;
    pointsRef.current.rotation.x += delta * 0.03;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial color="#66e1ff" size={0.018} sizeAttenuation depthWrite={false} transparent opacity={0.95} />
    </Points>
  );
}

export function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 1.6]}>
        <ambientLight intensity={0.25} />
        <pointLight position={[2, 2, 1]} intensity={0.45} color="#66e1ff" />
        <Stars radius={120} depth={50} count={1400} factor={3.8} saturation={0} fade speed={1.1} />
        <ParticleCluster />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(0,194,255,0.16),transparent_42%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.68)_0%,rgba(2,6,23,0.56)_40%,rgba(2,6,23,0.5)_100%)]" />
    </div>
  );
}
