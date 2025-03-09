import * as React from 'react';
import { useSphere } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function Pointer() {
  const viewport = useThree((state) => state.viewport);
  const [isHovering, setIsHovering] = useState(false);
  const [isClickable, setIsClickable] = useState(false);
  const pointerRef = useRef();
  
  // Smaller sphere for pointer
  const [ref, api] = useSphere(() => ({ 
    type: "Kinematic", 
    args: [1.5], // Reduced size
    position: [0, 0, 0] 
  }));

  // Track mouse position and interactive elements
  useFrame((state) => {
    // Update pointer position
    api.position.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      0
    );

    // Check if mouse is over interactive elements
    const element = document.elementFromPoint(
      (state.mouse.x + 1) * window.innerWidth / 2,
      (-state.mouse.y + 1) * window.innerHeight / 2
    );

    // Update pointer state based on element
    if (element) {
      const isInteractive = 
        element.tagName === 'BUTTON' || 
        element.tagName === 'A' || 
        element.closest('.interactive') ||
        element.closest('.hero-section') ||
        element.closest('.project-section');

      setIsClickable(isInteractive);
      setIsHovering(isInteractive);
    } else {
      setIsClickable(false);
      setIsHovering(false);
    }
  });

  // Pointer animations
  useEffect(() => {
    if (!pointerRef.current) return;

    const scale = isHovering ? 0.3 : 0.15; // Smaller default size, slightly larger on hover
    const intensity = isHovering ? 10 : 6; // Adjust light intensity based on hover

    pointerRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    if (pointerRef.current.children[2]) { // Point light
      pointerRef.current.children[2].intensity = intensity;
    }
  }, [isHovering]);

  return (
    <mesh 
      ref={mergeRefs(ref, pointerRef)} 
      scale={0.15} // Smaller initial scale
    >
      <sphereGeometry />
      <meshBasicMaterial 
        color={isClickable ? [6, 6, 6] : [4, 4, 4]} // Brighter when clickable
        toneMapped={false} 
      />
      <pointLight 
        intensity={6} 
        distance={8} // Reduced light distance
        color={isClickable ? "#ffffff" : "#f0f0f0"} // Slightly different color when clickable
      />
    </mesh>
  );
}

// Utility function to merge refs
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}

export default Pointer;