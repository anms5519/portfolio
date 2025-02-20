import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useInView } from "react-intersection-observer";
import { Sphere, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function FloatingLogos() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Follow mouse with smooth movement
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.y * 0.2,
      0.1
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.2,
      0.1
    );
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 20 }).map((_, i) => (
        <Float
          key={i}
          speed={1.5}
          rotationIntensity={1}
          floatIntensity={2}
          position={[
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
          ]}
        >
          <Sphere args={[0.2]}>
            <meshStandardMaterial
              color={`hsl(${Math.random() * 360}, 50%, 75%)`}
              roughness={0.5}
              metalness={0.8}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

export default function Background3D() {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <div ref={ref} className="fixed inset-0 -z-10">
      {inView && (
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <FloatingLogos />
          <Environment preset="sunset" />
        </Canvas>
      )}
    </div>
  );
}
