import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Center, useGLTF, Html, useProgress, Float, Lightformer, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./styles/MathematicalModels.css";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="math-loader">Loading Model: {progress.toFixed(0)}%</div>
    </Html>
  );
}

function MathShape({ url, scale, position, speed = 0.2 }: { url: string; scale: number; position: [number, number, number]; speed?: number }) {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);
  
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material) {
          // Ensure it has shiny, beautiful properties
          child.material.metalness = 0.7;
          child.material.roughness = 0.1;
          child.material.envMapIntensity = 2.5;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  useFrame((_state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * speed;
      group.current.rotation.x += delta * (speed * 0.5);
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={group}>
          <Center>
            <primitive object={scene} scale={scale} />
          </Center>
        </group>
      </Float>
    </group>
  );
}

const MathematicalModels = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#a0c0ff" />
        
        <Suspense fallback={null}>
          <MathShape url="/models/klein_bottle.glb" scale={0.4} position={[-6, 5, -2]} speed={0.3} />
          <MathShape url="/models/seifert_surfaces_04.glb" scale={1.2} position={[6, -6, -2]} speed={0.4} />
          
          <Environment preset="studio" resolution={512}>
            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
            <Lightformer rotation-y={Math.PI / 2} position={[5, -1, -1]} scale={[20, 0.5, 1]} />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload the models
useGLTF.preload("/models/seifert_surfaces_04.glb");
useGLTF.preload("/models/klein_bottle.glb");

export default MathematicalModels;
