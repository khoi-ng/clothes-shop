'use client';

import { shaderMaterial, useTexture } from '@react-three/drei';
import { Canvas, extend, Object3DNode, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

import { ShaderMaterial, Texture, Vector2 } from 'three';
import * as THREE from 'three';
import { StaticImageData } from 'next/image';

// logic & shader, https://codepen.io/Juxtopposed/pen/MWZWpVQ?editors=1111
// just converted it to fit for three fiber
const ANIMATION_CONFIG = {
  transitionSpeed: 0.03,
  baseIntensity: 0.005,
  hoverIntensity: 0.003,
};

const ImageFadeMaterial2: typeof ShaderMaterial & {
  key: string;
} = shaderMaterial(
  {
    u_time: 1.0,
    u_mouse: new THREE.Vector2(),
    u_intensity: 0.005,
    u_texture: null,
  },
  /*glsl*/ `
        varying vec2 vUv;
        void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
      `,
  /*glsl*/ ` 
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_intensity;
  uniform sampler2D u_texture;
  varying vec2 vUv;

  void main() {
      vec2 uv = vUv;
      float wave1 = sin(uv.x * 10.0 + u_time * 0.5 + u_mouse.x * 5.0) * u_intensity;
      float wave2 = sin(uv.y * 12.0 + u_time * 0.8 + u_mouse.y * 4.0) * u_intensity;
      float wave3 = cos(uv.x * 8.0 + u_time * 0.5 + u_mouse.x * 3.0) * u_intensity;
      float wave4 = cos(uv.y * 9.0 + u_time * 0.7 + u_mouse.y * 3.5) * u_intensity;

      uv.y += wave1 + wave2;
      uv.x += wave3 + wave4;
      
      gl_FragColor = texture2D(u_texture, uv);
  }
    
      
  `
);

extend({ ImageFadeMaterial2 });

declare module '@react-three/fiber' {
  interface ThreeElements {
    imageFadeMaterial2: Object3DNode<
      ShaderMaterial & {
        u_time: GLfloat;
        u_mouse: Vector2;
        u_intensity: GLfloat;
        u_texture: Texture;
      },
      typeof ImageFadeMaterial2
    >;
  }
}

function ImageWithEffect({
  img,
  aspectRatio,
  parentId,
}: {
  img: StaticImageData;
  aspectRatio: number[];
  parentId: string;
}) {
  const ref = useRef<any>();

  const [widthRatio, heightRatio] = aspectRatio;
  const texture1 = useTexture(img.src);

  // for smooth transitions between base and hover states
  let currentState = { mousePosition: { x: 0, y: 0 }, waveIntensity: 0.003 };
  let targetState = { mousePosition: { x: 0, y: 0 }, waveIntensity: 0.005 };

  function handleMouseMove(event: MouseEvent, imageContainer: HTMLElement) {
    const rect = imageContainer.getBoundingClientRect();
    targetState.mousePosition.x =
      ((event.clientX - rect.left) / rect.width) * 2 - 1;
    targetState.mousePosition.y =
      -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function handleMouseOver() {
    targetState.waveIntensity = ANIMATION_CONFIG.hoverIntensity;
  }

  function handleMouseOut() {
    targetState.waveIntensity = ANIMATION_CONFIG.baseIntensity;
    targetState.mousePosition = { x: 0, y: 0 };
  }

  useEffect(() => {
    const imageContainer = document.getElementById(parentId) as HTMLElement;
    imageContainer?.addEventListener('mousemove', (e) =>
      handleMouseMove(e, imageContainer)
    );
    imageContainer?.addEventListener('mouseenter', (e) => handleMouseOver);
    imageContainer?.addEventListener('mouseleave', handleMouseOut);
  });

  function updateValue(
    targetState: number,
    current: number,
    transitionSpeed: number
  ) {
    return current + (targetState - current) * transitionSpeed;
  }

  useFrame((_state, delta) => {
    // easing.damp(ref.current, 'dispFactor', hoverCondition ? 1 : 0, 0.19, delta);
    currentState.mousePosition.x = updateValue(
      targetState.mousePosition.x,
      currentState.mousePosition.x,
      ANIMATION_CONFIG.transitionSpeed
    );

    currentState.mousePosition.y = updateValue(
      targetState.mousePosition.y,
      currentState.mousePosition.y,
      ANIMATION_CONFIG.transitionSpeed
    );

    currentState.waveIntensity = updateValue(
      targetState.waveIntensity,
      currentState.waveIntensity,
      ANIMATION_CONFIG.transitionSpeed
    );

    ref.current.u_mouse = new THREE.Vector2(
      currentState.mousePosition.x,
      currentState.mousePosition.y
    );
    ref.current.u_time += 0.005;
    ref.current.u_intensity = currentState.waveIntensity;
    ref.current.u_mouse = new Vector2(
      currentState.mousePosition.x,
      currentState.mousePosition.y
    );
  });

  return (
    <mesh
    //   onPointerOut={() => handleMouseLeave()}
    //   onPointerOver={(e) => handleMouseEnter(e)}
    //   onPointerMove={(e) => handleMouseMove(e)}
    >
      <planeGeometry args={[widthRatio, heightRatio]} />
      <imageFadeMaterial2
        ref={ref}
        u_texture={texture1}
        u_time={1.0}
        u_mouse={new THREE.Vector2()}
        u_intensity={currentState.waveIntensity}
      />
    </mesh>
  );
}

export const HoverImageWavyEffect = ({
  className,
  img,
  aspectRatio,
  parentId,
}: {
  className?: string;
  img: StaticImageData;
  aspectRatio: number[];
  parentId: string;
}) => {
  return (
    <Canvas
      gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
      linear
      className={`${className}`}
      camera={{ position: [0, 0, 1], fov: 73.5 }}
    >
      <ImageWithEffect
        img={img}
        aspectRatio={aspectRatio}
        parentId={parentId}
      />
    </Canvas>
  );
};
