// FILE: src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 100);
      const ids = links.map((l) => l.href.slice(1));
      let currentActive = '';
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) { currentActive = ids[i]; break; }
        }
      }
      setActive(currentActive);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount to set initial active
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => { setMobileOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <>
      <motion.nav className="fixed top-0 left-0 right-0 z-[100]"
        initial={{ y: -100 }} animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}>
        <div className="glass-strong mx-4 md:mx-8 mt-4 rounded-2xl px-6 py-3 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono font-bold text-white text-sm tracking-wider">
            YL<span className="text-[#6366f1]">.</span>
          </button>
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <button key={link.label} onClick={() => scrollTo(link.href)}
                  className="relative px-4 py-2 text-xs font-medium tracking-wider uppercase transition-colors"
                  style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.4)' }}>
                  {isActive && <motion.div layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 w-1 h-1 rounded-full bg-[#6366f1]" style={{ translateX: '-50%' }} transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }} />}
                  {link.label}
                </button>
              );
            })}
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-[99] flex items-center justify-center bg-[#080808]/95 backdrop-blur-xl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <nav className="flex flex-col items-center gap-6">
              {links.map((link, i) => (
                <motion.button key={link.label} onClick={() => scrollTo(link.href)}
                  className="text-3xl font-light text-white/80 hover:text-white tracking-wider"
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}>
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
