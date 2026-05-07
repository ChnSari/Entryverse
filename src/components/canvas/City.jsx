import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'

export function City(props) {
  const group = useRef()

  const { scene, animations } = useGLTF('/models/city.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return

    const action = Object.values(actions)[0]

    if (action) {
      action.reset().fadeIn(0.5).play()
    }

    // cleanup (refresh / unmount sorunlarını engeller)
    return () => {
      Object.values(actions).forEach((a) => a.stop())
    }
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

// model preload (performans + refresh stabilitesi)
useGLTF.preload('/models/city.glb')