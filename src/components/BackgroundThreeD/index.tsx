import * as THREE from 'three'
import React, { useState, useRef, useEffect, Suspense } from 'react'
import styled from 'styled-components'
import { Canvas, useFrame, useLoader} from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

function Box (props: JSX.IntrinsicElements['mesh']) {
	const mesh = useRef<THREE.Mesh>(null!)
	const [ hovered, setHover ] = useState(false)
	const [ active, setActive ] = useState(false)
	// const [matcap1, matcap2] = useTexture([`${process.env.PUBLIC_URL}/images/moon/maps/`, `${process.env.PUBLIC_URL}/images/moon/maps/moon_8k_normal`])
	// const [matcap1, matcap2] = useTexture([moonDiffuse,moonNormal])

	const [ colorMap, normalMap ] = useLoader(TextureLoader, [
		'moon/maps/moon_8k_color_brim16.jpg',
		'moon/maps/moon_8k_normal.jpg'
	])

	/* eslint-disable */

	useFrame((state, delta) => {
		mesh.current.rotation.y += 0.0004
	//	mesh.current.rotation.y += 0.0004
	})
	return (
		<mesh
			{...props}
			ref={mesh}
		>
			<icosahedronGeometry args={[ 3, 20 ]} />
			<meshStandardMaterial map={colorMap} normalMap={normalMap} />
		</mesh>
	)
}

function GroupLight (props: JSX.IntrinsicElements['group']) {
	const mesh = useRef<THREE.Group>(null!)
	const light = useRef<THREE.Light>(null!)
  const grouplight = useRef<THREE.Group>(null!)
	/* eslint-disable */
  useFrame((state, delta) => {
		 grouplight.current.rotation.y -= 0.0009
		  grouplight.current.rotation.x -= 0.0009
	})

	return (
    <group position={[1.2, -4, 4]} ref={grouplight}>
          <mesh position={[0,-10 , 0 ]}>
			      <sphereGeometry args={[ 1, 50,50 ]} />
			      <meshBasicMaterial color={'red'} />
		    </mesh>
			  <pointLight position={[ 0, 10, 10 ]} intensity={0.4} ref={light} />
    </group>
	)
}







export default function Nav () {
	/* eslint-disable */
  

	
	return (
		<Canvas style={{ width: '100%', height: '100%' }}>
			<PerspectiveCamera
				makeDefault
				position={[ 0, -3, 10 ]}
				fov={35}
				aspect={window.innerWidth / window.innerHeight}
				near={1}
				far={65536}
			/>
			<color attach='background' args={[ 'black' ]} />
			<Suspense fallback={null}>
				<Box position={[ 1.2, -4, 4 ]} />
        
			</Suspense>
			<ambientLight intensity={0.034} />
      <GroupLight />
		</Canvas>
	)
}
