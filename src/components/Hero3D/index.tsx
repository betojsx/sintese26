'use client'

import { useRef, useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function DigitalCore() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 0]} />
        <MeshDistortMaterial
          color="#ffffff"
          wireframe
          distort={0.3}
          speed={2}
          roughness={0}
          metalness={1}
        />
      </mesh>
      <mesh scale={0.5}>
        <octahedronGeometry args={[2, 0]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.2} 
          metalness={0.8}
          transparent 
          opacity={0.9} 
        />
      </mesh>
    </Float>
  )
}

export function Hero3D() {
  const [canvasKey, setCanvasKey] = useState(0)

  const handleCreated = useCallback(
    ({ gl }: { gl: THREE.WebGLRenderer }) => {
      gl.setClearColor(0x000000, 0)
      gl.domElement.addEventListener('webglcontextlost', () => {
        setTimeout(() => setCanvasKey((k) => k + 1), 300)
      })
    },
    [],
  )

  return (
    <div className="absolute inset-0 bg-transparent">
      <Canvas
        key={canvasKey}
        camera={{ position: [0, 0, 6], fov: 75 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        onCreated={handleCreated}
      >
        <ambientLight intensity={0.5} />
        
        {/* Main light from the "middle" (left side relative to object) - Increased intensity */}
        <spotLight 
          position={[-10, 5, 10]} 
          angle={0.5} 
          penumbra={1} 
          intensity={50} 
          color="#ffffff" 
          distance={50}
        />
        
        {/* Fill light */}
        <pointLight position={[5, -5, 5]} intensity={10} color="#4a4a4a" />

        <DigitalCore />
      </Canvas>
    </div>
  )
}
