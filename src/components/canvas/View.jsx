'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'
import { useThree } from '@react-three/fiber'

/* COMMON SCENE LIGHTS */
export const Common = ({ color }) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}

    {/* Soft ambient */}
    <ambientLight intensity={0.6} />

    {/* Main light */}
    <directionalLight position={[10, 20, 10]} intensity={2} castShadow />

    {/* Fill lights */}
    <pointLight position={[20, 30, 10]} intensity={2} decay={0.2} />
    <pointLight position={[-10, -10, -10]} color='blue' decay={0.2} />

    {/* Camera */}
    <PerspectiveCamera makeDefault fov={45} position={[0, 0, 6]} />
  </Suspense>
)

/* VIEW WRAPPER */
const View = forwardRef(
  (
    {
      children,
      orbit = true,
      enableZoom = true,
      enablePan = true,
      autoRotate = false,
      className,
      ...props
    },
    ref
  ) => {
    const localRef = useRef(null)
    useImperativeHandle(ref, () => localRef.current)

    return (
      <>
        {/* DOM container */}
        <div ref={localRef} className={className} {...props} />

        {/* Three portal */}
        <Three>
          <ViewImpl track={localRef}>
            {children}

            {orbit && (
              <OrbitControls
                enableZoom={enableZoom}
                enablePan={enablePan}
                autoRotate={autoRotate}
                autoRotateSpeed={1}
                minDistance={25}
                maxDistance={20}
                minPolarAngle={0.3}
                maxPolarAngle={Math.PI / 1.7}
              />
            )}

            <SceneHelpers />
          </ViewImpl>
        </Three>
      </>
    )
  }
)

View.displayName = 'View'

export { View }

/* OPTIONAL DEBUG / HELPERS */
function SceneHelpers() {
  const { gl } = useThree()

  // pixel ratio optimization
  gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  return null
}