import * as THREE from 'three'
import React, { useState, useRef, useEffect, Suspense,useMemo	 } from 'react'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { PerspectiveCamera,Stars,OrbitControls,Text } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import data from '@compai/font-inter/data/typefaces/normal-800.json'

const font = new THREE.FontLoader().parse(data)




function MoonHigh (props: JSX.IntrinsicElements['mesh'], loadHandler) {
	const myMesh = useRef<THREE.Mesh>(null!)
	const myMaterial = useRef<THREE.MeshStandardMaterial>(null!)
	const [active, setActive] = useState(false);
	const [isLoaded, setLoaded] = useState(false);
	const [ colorMap, normalMap,emisiveMap ] = useLoader(TextureLoader, [
		'moon/maps/moon_4k_color_brim16.jpg',
		'moon/maps/moon_4k_normal.jpg',
		'moon/maps/moon_4k_emisive.png'

	])

	useEffect(()=>{
		setLoaded(true)
	},[colorMap])


	

	
  
	useFrame((state, delta) => {
		const time = state.clock.getElapsedTime()
		const inicolor=new THREE.Color(0xffcea5)
		if(isLoaded)
		{
			if(myMesh.current.position.y<0)
			{
				myMesh.current.position.y += 0.01
			}
			 myMaterial.current.emissive.set(inicolor.multiplyScalar(Math.sin(time/2)))
		}
		
		//	mesh.current.rotation.y += 0.0004
	})

	
	
	
	
	return (
		
			
			<mesh  ref={myMesh} position={[0,-5,0]}>
			<icosahedronGeometry args={[ 4, 20 ]} />
			<meshStandardMaterial map={colorMap} normalMap={normalMap} emissive={new THREE.Color(0xffcea5)} emissiveMap={emisiveMap} envMapIntensity={0} ref={myMaterial}/>
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
			
			<pointLight position={[ 0, 10, 10 ]} intensity={0.4} ref={light} />
		</group>
	)
}

//add inside light group to trackit
/*
<mesh position={[ 0, 10, 10 ]}>
				<sphereGeometry args={[ 1, 50, 50 ]} />
				<meshBasicMaterial color={'red'} />
			</mesh>
*/




export default function Nav () {
	/* eslint-disable */
	
	return (
		<Canvas style={{ width: '100%', height: '100%' }}>
			<Text
		position={[-2,5.4,0]}
      color={'#ffffff'}
      fontSize={.5}
      maxWidth={200}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign={'left'}
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      anchorX="center"
      anchorY="middle"
    >MoonRabbit
  </Text>	
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

