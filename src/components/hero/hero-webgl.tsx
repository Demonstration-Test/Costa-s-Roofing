"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Points } from "three";

function buildRainPositions() {
  const values = new Float32Array(90 * 3);

  for (let index = 0; index < 90; index += 1) {
    values[index * 3] = ((index * 37) % 101) / 10 - 5;
    values[index * 3 + 1] = ((index * 53) % 67) / 11 - 1;
    values[index * 3 + 2] = ((index * 29) % 47) / 9 - 2.5;
  }

  return values;
}

const rainPositions = buildRainPositions();

function RainField() {
  const points = useRef<Points>(null);

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.z -= delta * 0.018;
      points.current.position.y -= delta * 0.12;

      if (points.current.position.y < -0.6) {
        points.current.position.y = 0.6;
      }
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          args={[rainPositions, 3]}
          attach="attributes-position"
        />
      </bufferGeometry>
      <pointsMaterial
        color="#dce2e8"
        opacity={0.3}
        size={0.025}
        transparent
      />
    </points>
  );
}

function RoofPlanes() {
  const group = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.elapsedTime * 0.12) * 0.025;
    }
  });

  return (
    <group position={[1.4, -0.4, -1]} ref={group} rotation={[-0.1, -0.35, 0]}>
      <mesh position={[-1.7, 0, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[4.5, 0.05, 4]} />
        <meshStandardMaterial color="#202126" metalness={0.3} roughness={0.92} />
      </mesh>
      <mesh position={[1.7, 0, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[4.5, 0.05, 4]} />
        <meshStandardMaterial color="#17181c" metalness={0.25} roughness={0.94} />
      </mesh>
      <mesh position={[0, 1.05, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.035, 0.035, 4.1]} />
        <meshBasicMaterial color="#d93434" />
      </mesh>
    </group>
  );
}

export function HeroWebgl({ active }: { active: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0.8, 6.5], fov: 44 }}
      dpr={[1, 1.5]}
      fallback={null}
      frameloop={active ? "always" : "never"}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    >
      <fog attach="fog" args={["#09090b", 5, 11]} />
      <ambientLight intensity={0.7} />
      <directionalLight color="#d9d4cc" intensity={1.25} position={[2, 4, 5]} />
      <RoofPlanes />
      <RainField />
    </Canvas>
  );
}
