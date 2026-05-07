'use client'

import { useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function PlayerController() {
  const { camera } = useThree()

  const velocity = new THREE.Vector3()
  const direction = new THREE.Vector3()
  const move = { forward: false, backward: false, left: false, right: false }

  useEffect(() => {
    const onKeyDown = (e) => {
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          move.forward = true
          break
        case 'ArrowDown':
        case 'KeyS':
          move.backward = true
          break
        case 'ArrowLeft':
        case 'KeyA':
          move.left = true
          break
        case 'ArrowRight':
        case 'KeyD':
          move.right = true
          break
      }
    }

    const onKeyUp = (e) => {
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          move.forward = false
          break
        case 'ArrowDown':
        case 'KeyS':
          move.backward = false
          break
        case 'ArrowLeft':
        case 'KeyA':
          move.left = false
          break
        case 'ArrowRight':
        case 'KeyD':
          move.right = false
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useFrame(() => {
    direction.set(0, 0, 0)

    if (move.forward) direction.z -= 1
    if (move.backward) direction.z += 1
    if (move.left) direction.x -= 1
    if (move.right) direction.x += 1

    direction.normalize()

    // kamera yönüne göre hareket
    const speed = 0.1
    velocity.copy(direction).applyEuler(camera.rotation).multiplyScalar(speed)

    camera.position.add(velocity)
  })

  return null
}