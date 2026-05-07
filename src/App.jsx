import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { City } from './components/City'

export default function App() {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      
      {/* Işık / ortam */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      {/* Model loading fix */}
      <Suspense fallback={null}>
        <City scale={1} />
      </Suspense>

      {/* kontrol */}
      <OrbitControls />

      {/* environment (opsiyonel ama önerilir) */}
      <Environment preset="city" />
    </Canvas>
  )
}