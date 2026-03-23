import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update dot position immediately
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };

    // Animate outline to follow with delay
    const animateOutline = () => {
      // Smooth follow effect
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      requestAnimationFrame(animateOutline);
    };

    // Mouse enter/leave handlers
    const handleMouseEnter = () => {
      cursorDot.style.opacity = '1';
      cursorOutline.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      cursorDot.style.opacity = '0';
      cursorOutline.style.opacity = '0';
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Start animation
    animateOutline();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorDotRef} 
        className={`cursor-dot ${isPointer ? 'pointer' : ''}`}
      />
      <div 
        ref={cursorOutlineRef} 
        className={`cursor-outline ${isPointer ? 'pointer' : ''}`}
      />
    </>
  );
};

export default CustomCursor;
