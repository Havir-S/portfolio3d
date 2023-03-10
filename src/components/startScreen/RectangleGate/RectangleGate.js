import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, useAnimations, Html } from '@react-three/drei'
import StartScreenButton from './StartScreenButton/StartScreenButton.js'


//ANIMATIONS
import { useSpring, animated } from '@react-spring/three'

export default function Model(props) {
  const group = useRef()
  const gsapWalls = useRef()
  const gsapEkran = useRef()
  const gsapText = useRef()
  const gsapFrameInvisibleAtFirst = useRef()
  const { nodes, materials, animations } = useGLTF('/animatedFrame4.glb')
  const { actions } = useAnimations(animations, group)
  const [animating, toggleAnimating] = useState(false)


  ////////////////////////////////////////////////////////HOVER ANIMATION - cursor pointer
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (animating) {
      return
    } else {
      document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }
    return () => document.body.style.cursor = 'auto';
  }, [hovered])

  ////////////////////////////////////////////////////// HANDLE CLICK

  const [hoverSprings, apiHover] = useSpring(() => ({
    opacityForWireframe: 0,
    emisWireframe: 0,
    opacityForWalls: 0,
    emisWalls: 0,
    opacityForBackScreen: 0,
    emisForBackScreen: 0,
    textColor: 'rgba(255,255,255,0)',
    textOpacity: 1,
    textSize: 2.3,

    config: {
      duration: 250
    }
  }))

  const handleClick = () => {

    //// DISAPPEAR NAVBAR FOR LOADING
    document.querySelector('.startScreen__navbar').classList.add('startScreen__navbar_hide')

    //// MAKE BACKGROUND WHITE TOO
    const whiteBack = document.querySelector('.whiteBack').classList.add('whiteBackShow');
    // whiteBack.classList.add('whiteBackShow');

    
    // MAKE BUTTON TEXT BLEND AND DISAPPEAR
    document.querySelector('.startScreen__button').classList.add('startScreen__button_animate')

    //FOR TESTING U CAN PAUSE ANIM
    if (animating) {
      return
    } else {
      setTimeout(() => {
        props.setStage(2)
        //// DELETE WHITE BACKGROUND
        // whiteBack.remove();
      }, 2500)
      apiHover.start({
        opacityForWireframe: 1,
          emisWireframe: 1,
          opacityForWalls: .5,
          emisWalls: .2,
          opacityForBackScreen:1,
          emisForBackScreen: .6,
          textOpacity: 0,
          textSize: 30,
          config: {
            duration: 1300
          }
      })
      //ANIMATION PLAYS
      actions['enterPortal'].repetitions = 0;
      actions['enterPortal'].clampWhenFinished = true;
      actions['enterPortal'].setDuration(2)
      actions['enterPortal'].play();

      toggleAnimating(true);
      document.body.style.cursor = 'auto';
    
    
    }
  }

  ////////////////////////////////////////////////////// ON HOVER

  const meshShow = (val) => {

    ///EVENT BECOMES IRRELEVANT ONCE THE ANIMATION BEGINS
    if (animating) { return }
    
    setHovered(val)
    if (val) {
      apiHover.start({
        opacityForWireframe: .7,
        emisWireframe: 2,
        opacityForBackScreen: .01,
        opacityForWalls: .3,
        emisWalls: .2,
        emisForBackScreen: 1
      })
    } else {
      apiHover.start({
        opacityForWireframe: 0,
        emisWireframe: 0,
        opacityForBackScreen: 0,
        opacityForWalls: 0,
        emisWalls: 0,
        emisForBackScreen: 0,
      })
    }
  }


  return (
    <group visible={props.visible}>
      <group onClick={handleClick} onPointerEnter={() => {meshShow(true)} } onPointerOut={(e) => {  meshShow(false) }} ref={group} {...props} dispose={null}>
          <group name="Armature"  position={[0, 0, 4.13]} rotation={[0, 0, 0]}>
            <primitive object={nodes.Bone} />
            <group name="forExport">
              <skinnedMesh name="Plane006" geometry={nodes.Plane006.geometry} material={materials.frameMaterial} skeleton={nodes.Plane006.skeleton} >
                <meshStandardMaterial emissive={'#00A8FF'} emissiveIntensity={1.7}  roughness={0} radius={.5} />
              </skinnedMesh>
              <skinnedMesh name="Plane006_1" geometry={nodes.Plane006_1.geometry} material={materials.frameInvisibleAtFirst} skeleton={nodes.Plane006_1.skeleton} >
                <meshStandardMaterial ref={gsapFrameInvisibleAtFirst} emissive={'#00A8FF'} emissiveIntensity={1.7} transparent opacity={0}
                
                 />

                {/* ///////////////////// WIREFRAME */}
                <animated.meshStandardMaterial ref={gsapFrameInvisibleAtFirst} emissive={'#00A8FF'} emissiveIntensity={hoverSprings.emisWireframe} transparent 
                 roughness={0} 
                 radius={2}
                 opacity={hoverSprings.opacityForWireframe} 
                 
                  />
              </skinnedMesh>

              {/* /////////////// backscreen */}
              <skinnedMesh  name="Plane006_2" geometry={nodes.Plane006_2.geometry} material={materials.ekran} skeleton={nodes.Plane006_2.skeleton} >
                <animated.meshStandardMaterial ref={gsapEkran}
                  emissive={'#fff'}  
                  emissiveIntensity={hoverSprings.emisForBackScreen} 
                  transparent 
                  opacity={hoverSprings.opacityForBackScreen} 
                  roughness={0} 
                  radius={.5} 
                  
                   
                  />

                  {/* ================= HTML EKRAN TUTAJ */}
                <Html className='noEvents' position={[0, 0.05, -.3]} center    >
                  <div >
                    <StartScreenButton hoverSprings={hoverSprings} ref={gsapText} />
                  </div>
                </Html>
              </skinnedMesh>

              {/* ////////////////////////// INSIDE WALLS emissive={'#00A8FF'} */}
              <skinnedMesh name="Plane006_3" geometry={nodes.Plane006_3.geometry} material={materials['walls.001']} skeleton={nodes.Plane006_3.skeleton} >
                <animated.meshStandardMaterial ref={gsapWalls} emissive={'#FFF'} emissiveIntensity={hoverSprings.emisWalls} transparent 
                  opacity={hoverSprings.opacityForWalls}
                  roughness={0} radius={1} />
              </skinnedMesh>
              
            </group>
          </group>
      </group>
      
    </group>
  )
}

useGLTF.preload('/animatedFrame4.glb')
