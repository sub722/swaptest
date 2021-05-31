import * as THREE from 'three'
import React, { useState, useRef, useEffect, Suspense } from 'react'
import styled from 'styled-components'
import { Canvas, useFrame, useLoader} from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { group } from 'console'



function Moon (props: JSX.IntrinsicElements['mesh']) {
	const mesh = useRef<THREE.Mesh>(null!)
	const moongroup= useRef<THREE.Group>(null!)
	const [textureSize,setTextureSize]=useState(0)
	const [textures,setTexture]=useState()
	
	
	const [  colorMap,normalMap ] = useLoader(TextureLoader, [
		'moon/maps/moon1024x512.jpg',
		'moon/maps/normal1024x512.jpg'
	])
	useEffect(() => {
		console.log('normal loaded')
		setTextureSize(1)
		
		

	}
	, [colorMap])
	const [ colorMap8k, normalMap8k ] = useLoader(TextureLoader, [
		'moon/maps/moon_8k_color_brim16.jpg',
		'moon/maps/moon_8k_normal.jpg'
	])
	
	useEffect(() => {
		console.log('8k loaded')
		setTextureSize(2)

}, [colorMap8k])

	/* eslint-disable */

	useFrame((state, delta) => {
		mesh.current.rotation.y += 0.0004
		moongroup.current.rotation.y+=0.01
	//	mesh.current.rotation.y += 0.0004
	})
	const MaterialMoon=()=>
	{
		if (textureSize===1)
		{
			return <meshStandardMaterial map={colorMap} normalMap={normalMap} />
		}
		if(textureSize===2)
		{
			return <meshStandardMaterial map={colorMap} normalMap={normalMap} />
			// return <meshStandardMaterial map={colorMap8k} normalMap={normalMap8k} />
		}
		return  <meshStandardMaterial color='grey' />
	}
	
	return (
		<group ref={moongroup} position={[0,0,-50]} >
		<mesh
			{...props}
			ref={mesh}
			position={[15,0,-10]}
			
			
		>
			<icosahedronGeometry args={[ 4, 20 ]} />
			
			<MaterialMoon />
		</mesh>
		</group>
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
			      <meshBasicMaterial color={'black'} />
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
				position={[ 0, 0, 10 ]}
				fov={35}
				aspect={window.innerWidth / window.innerHeight}
				near={1}
				far={65536}
			/>
			<color attach='background' args={[ 'black' ]} />
			
				<group>
					<Moon />
				</group>
        
			
			<ambientLight intensity={0.015} />
      <GroupLight />
		</Canvas>
	)
}
