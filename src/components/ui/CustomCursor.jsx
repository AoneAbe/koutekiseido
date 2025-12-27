import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { clsx } from 'clsx';

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for main cursor
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Trailing effect dots
  const trailCount = 5;
  const trails = Array.from({ length: trailCount }).map((_, i) => ({
    x: useSpring(mouseX, { damping: 20 + i * 5, stiffness: 200 - i * 10, mass: 0.5 + i * 0.1 }),
    y: useSpring(mouseY, { damping: 20 + i * 5, stiffness: 200 - i * 10, mass: 0.5 + i * 0.1 })
  }));

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    
    // Add hover listeners to clickable elements
    const clickables = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Trailing Dots */}
      {trails.map((trail, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          style={{
            x: trail.x,
            y: trail.y,
            translateX: '-50%',
            translateY: '-50%',
            scale: (trailCount - i) / trailCount,
            opacity: 0.4 - (i * 0.05), // Fade out trail
          }}
        />
      ))}

      {/* Main Cursor */}
      <motion.div
        ref={cursorRef}
        className={clsx(
          "absolute rounded-full transition-all duration-300 ease-out flex items-center justify-center backdrop-blur-[2px]",
          isHovering 
            ? "w-12 h-12 bg-blue-500/10 border border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
            : "w-3 h-3 bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
        )}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {isHovering && (
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-sm" />
        )}
      </motion.div>
    </div>
  );
};

