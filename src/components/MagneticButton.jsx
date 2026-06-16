// FILE: src/components/MagneticButton.jsx
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, className = '', as = 'button', href, target, rel, onClick, ...props }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - rect.left - rect.width / 2) * 0.3, y: (e.clientY - rect.top - rect.height / 2) * 0.3 });
  };

  const Tag = as === 'a' ? motion.a : motion.button;
  return (
    <Tag ref={ref} onMouseMove={handleMove} onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }} transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.2 }}
      className={className} href={href} target={target} rel={rel} onClick={onClick} {...props}>
      {children}
    </Tag>
  );
}
