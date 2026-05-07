import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/models/city.glb");
  return <primitive object={scene} scale={1} />;
}

const CityScene = () => {
  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />

      <Model />

      <OrbitControls />
    </Canvas>
  );
};

export default CityScene;