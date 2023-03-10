import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  return (
    <group {...props} dispose={null}>
      <group position={[-8.59, 2.11, 14.07]}>
        <pointLight intensity={1} castShadow decay={2} power={15} distance={15} color="#ff4110" rotation={[-Math.PI / 2, 0, 0]} />
      </group>
      <group position={[-8.59, 2.11, 8.79]}>
        <pointLight intensity={1}  decay={2} power={1} distance={20} color="#ff4110" rotation={[-Math.PI / 2, 0, 0]} />
      </group>
      <group position={[-2.26, 2.11, 5.02]}>
        <pointLight intensity={1.1} castShadow decay={2} power={15} distance={30} color="#ff4110" rotation={[-Math.PI / 2, 0, 0]} />
      </group>
      <group position={[-7.22, 2.11, 4.63]}>
        <pointLight intensity={1}  decay={2} power={5} distance={20} color="#ff4110" rotation={[-Math.PI / 2, 0, 0]} />
      </group>
      <group position={[-10.41, 2.11, 4.63]}>
        <pointLight intensity={1}  decay={2} power={5} distance={20} color="#ff4110" rotation={[-Math.PI / 2, 0, 0]} />
      </group>
    </group>
  )
}

useGLTF.preload('/test-lights2.glb')
