'use client';

import { shaderMaterial, useTexture } from '@react-three/drei';
import { Canvas, extend, Object3DNode, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

import { ShaderMaterial, Texture, Vector2 } from 'three';
import * as THREE from 'three';
import { StaticImageData } from 'next/image';

// logic & shader, https://codepen.io/Juxtopposed/pen/MWZWpVQ?editors=1111
// just converted it to fit for three fiber

const ImageFadeMaterial: typeof ShaderMaterial & {
  key: string;
} = shaderMaterial(
  {
    u_mouse: new THREE.Vector2(),
    u_prevMouse: new THREE.Vector2(),
    u_aberrationIntensity: 0.0,
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
      varying vec2 vUv;
      uniform sampler2D u_texture;    
      uniform vec2 u_mouse;
      uniform vec2 u_prevMouse;
      uniform float u_aberrationIntensity;

      void main() {
        vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);
        
        vec2 mouseDirection = u_mouse - u_prevMouse;
        
        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.4, 0.0, pixelDistanceToMouse);
 
        vec2 uvOffset = strength * - mouseDirection * 0.2;
        vec2 uv = vUv - uvOffset;

        vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
        vec4 colorG = texture2D(u_texture, uv);
        vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

        gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
    }
      
  `
);

extend({ ImageFadeMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    imageFadeMaterial: Object3DNode<
      ShaderMaterial & {
        u_mouse: Vector2;
        u_prevMouse: Vector2;
        u_aberrationIntensity: GLfloat;
        u_texture: Texture;
      },
      typeof ImageFadeMaterial
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

  let easeFactor = 0.02;
  let mousePosition = { x: 0.5, y: 0.5 };
  let targetMousePosition = { x: 0.5, y: 0.5 };
  let aberrationIntensity = 0.0;
  let prevPosition = { x: 0.5, y: 0.5 };

  function handleMouseMove(event: MouseEvent, imageContainer: HTMLElement) {
    easeFactor = 0.02;

    let rect = imageContainer.getBoundingClientRect();

    prevPosition = { ...targetMousePosition };

    targetMousePosition.x = (event.clientX - rect.left) / rect.width;
    targetMousePosition.y = (event.clientY - rect.top) / rect.height;

    aberrationIntensity = 1;
  }

  function handleMouseEnter(event: MouseEvent, imageContainer: HTMLElement) {
    easeFactor = 0.02;

    let rect = imageContainer.getBoundingClientRect();

    mousePosition.x = targetMousePosition.x =
      (event.clientX - rect.left) / rect.width;
    mousePosition.y = targetMousePosition.y =
      (event.clientY - rect.top) / rect.height;
  }

  function handleMouseLeave() {
    easeFactor = 0.05;
    targetMousePosition = { ...prevPosition };
  }

  useEffect(() => {
    const imageContainer = document.getElementById(parentId) as HTMLElement;
    imageContainer?.addEventListener('mousemove', (e) =>
      handleMouseMove(e, imageContainer)
    );
    imageContainer?.addEventListener('mouseenter', (e) =>
      handleMouseEnter(e, imageContainer)
    );
    imageContainer?.addEventListener('mouseleave', handleMouseLeave);
  });

  useFrame((_state, delta) => {
    // easing.damp(ref.current, 'dispFactor', hoverCondition ? 1 : 0, 0.19, delta);
    mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
    mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;
    aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05);
    ref.current.u_aberrationIntensit = aberrationIntensity;
    ref.current.u_prevMouse = new THREE.Vector2(
      prevPosition.x,
      1.0 - prevPosition.y
    );
    ref.current.u_mouse = new THREE.Vector2(
      mousePosition.x,
      1.0 - mousePosition.y
    );
  });

  return (
    <mesh
    //   onPointerOut={() => handleMouseLeave()}
    //   onPointerOver={(e) => handleMouseEnter(e)}
    //   onPointerMove={(e) => handleMouseMove(e)}
    >
      <planeGeometry args={[widthRatio, heightRatio]} />
      <imageFadeMaterial
        ref={ref}
        u_texture={texture1}
        u_aberrationIntensity={aberrationIntensity}
        u_prevMouse={new THREE.Vector2(prevPosition.x, 1.0 - prevPosition.y)}
        u_mouse={new THREE.Vector2(mousePosition.x, 1.0 - mousePosition.y)}
      />
    </mesh>
  );
}

export const HoverImageEffect = ({
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
