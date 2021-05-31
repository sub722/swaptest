import * as THREE from 'three'
import React, { useState, useRef, useEffect, Suspense } from 'react'
import styled from 'styled-components'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { PerspectiveCamera,Stars } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useSpring, animated } from '@react-spring/three'
import config from 'pages/Migration/config'


function MoonHigh (props: JSX.IntrinsicElements['mesh'], loadHandler) {
	const [active, setActive] = useState(false);
	const [isLoaded, setLoaded] = useState(false);
	const [ colorMap, normalMap ] = useLoader(TextureLoader, [
		'moon/maps/moon_4k_color_brim16.jpg',
		'moon/maps/moon_8k_normal.jpg'
	])

	useEffect(()=>{
		setLoaded(true)
	},[colorMap])


	
	const springs = useSpring({ scale: active ? 1.5 : 1 })

	const myMesh = useRef<THREE.Mesh>(null!)
  
	useFrame((state, delta) => {
		if(isLoaded)
		{
			if(myMesh.current.position.y<0)
			{
				myMesh.current.position.y += 0.01
			}
		}
		
		//	mesh.current.rotation.y += 0.0004
	})

	
	
	
	
	return (
		
			
			<mesh  ref={myMesh} position={[0,-5,0]}>
			<icosahedronGeometry args={[ 4, 20 ]} />
			<meshStandardMaterial map={colorMap} normalMap={normalMap} />
			</mesh>
		
	)
}

function Moon (props: JSX.IntrinsicElements['mesh']) {
	/* eslint-disable */
	const mesh = useRef<THREE.Mesh>(null!)
	const moonOrbit = useRef<THREE.Group>(null!)
	const moonRotation = useRef<THREE.Group>(null!)
	const [ MoonShow, setMoonShow ] = useState(0)
	

	  
	useFrame((state, delta) => {
		moonRotation.current.rotation.y += 0.0004
		moonRotation.current.rotation.y += 0.0005
		//	mesh.current.rotation.y += 0.0004
	})



	return (
		
			<group ref={moonRotation} position={[ 0, 0, 0 ]}>
				<Suspense fallback={null}>
					<MoonHigh />
				</Suspense>
			</group>
			
		
	)
}

function GroupLight (props: JSX.IntrinsicElements['group']) {
	/* eslint-disable */
	const mesh = useRef<THREE.Group>(null!)
	const light = useRef<THREE.Light>(null!)
	const grouplight = useRef<THREE.Group>(null!)
	/* eslint-disable */
	useFrame((state, delta) => {
		grouplight.current.rotation.y -= 0.001
		grouplight.current.rotation.x -= 0.001
	})

	return (
		<group position={[ 2, -4, 4 ]} ref={grouplight}>
			<mesh position={[ 0, -10, 0 ]}>
				<sphereGeometry args={[ 1, 50, 50 ]} />
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
				position={[ -2, 3, 10 ]}
				fov={35}
				aspect={window.innerWidth / window.innerHeight}
				near={1}
				far={65536}
			/>

			<Moon />
			<Stars />
			<ambientLight intensity={0.009} />
			<GroupLight />
		</Canvas>
	)
}

/*

import * as THREE from 'three'
import React, { useState, useRef, useEffect, Suspense } from 'react'
import styled from 'styled-components'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { group } from 'console'
import {useTextures} from './useTextures'





function Moon (props: JSX.IntrinsicElements['mesh']) {
	const mesh = useRef<THREE.Mesh>(null!)
	const moonOrbit = useRef<THREE.Group>(null!)
	const moonGroup = useRef<THREE.Group>(null!)
	const {mapSize,maps}=useTextures()
	
	useFrame((state, delta) => {
		mesh.current.rotation.y += 0.0004
		moonOrbit.current.rotation.y += 0.01
		//	mesh.current.rotation.y += 0.0004
	})
	return (
		<group ref={moonOrbit} position={[ 0, 0, -50 ]}>
			<group ref={moonGroup}  position={[ 15, 0, -10 ]}>
			<mesh {...props} ref={mesh}>
				<icosahedronGeometry args={[ 4, 20 ]} />
				
					<meshStandardMaterial color='red' />
				
			</mesh>
			</group>
		</group>
	)
}

function GroupLight (props: JSX.IntrinsicElements['group']) {
	const mesh = useRef<THREE.Group>(null!)
	const light = useRef<THREE.Light>(null!)
	const grouplight = useRef<THREE.Group>(null!)
	
	useFrame((state, delta) => {
		grouplight.current.rotation.y -= 0.0009
		grouplight.current.rotation.x -= 0.0009
	})

	return (
		<group position={[ 1.2, -4, 4 ]} ref={grouplight}>

			
			<mesh >
				<sphereGeometry args={[ 1, 50, 50 ]} />
				<meshBasicMaterial color={'black'} />
			</mesh>
			<pointLight position={[ 0, 10, 10 ]} intensity={0.4} ref={light} />
		</group>
	)
}

export default function Nav () {
	

	return (
		<Canvas style={{ width: '100%', height: '100%' }}>
			<PerspectiveCamera
				makeDefault
				position={[ 0, 0, 10 ]}
				fov={35}
				aspect={window.innerWidth / window.innerHeight}
				near={1}
				far={65536}
			/>
			<color attach='background' args={[ 'black' ]} />
		
			<Suspense fallback={null}>
				<Moon />
			
			</Suspense>
			<ambientLight intensity={0.015} />
			<GroupLight />
		</Canvas>
	)
}




*/
