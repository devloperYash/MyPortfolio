// FILE: src/components/CustomCursor.jsx
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [cursorState, setCursorState] = useState('default');

  const dotX = useSpring(mouseX, { damping: 50, stiffness: 800, mass: 0.2 });
  const dotY = useSpring(mouseY, { damping: 50, stiffness: 800, mass: 0.2 });
  const ringX = useSpring(mouseX, { damping: 18, stiffness: 120, mass: 0.8 });
  const ringY = useSpring(mouseY, { damping: 18, stiffness: 120, mass: 0.8 });

  useEffect(() => {
    const move = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    const handleOver = (e) => {
      const el = e.target;
      if (el.closest('[data-cursor="view"]')) setCursorState('view');
      else if (el.closest('a, button, [role="button"], input, textarea, [data-cursor="hover"]')) setCursorState('hover');
      else setCursorState('default');
    };
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', handleOver);
    return () => { window.removeEventListener('mousemove', move); document.removeEventListener('mouseover', handleOver); };
  }, []);

  return (
    <>
      <motion.div className="cursor-dot" style={{ x: dotX, y: dotY, scale: cursorState !== 'default' ? 0 : 1 }} />
      <motion.div className={`cursor-ring ${cursorState === 'hover' ? 'hovered' : ''} ${cursorState === 'view' ? 'view-mode' : ''}`}
        style={{ x: ringX, y: ringY }}>
        <span className="cursor-text">VIEW</span>
      </motion.div>
    </>
  );
}
