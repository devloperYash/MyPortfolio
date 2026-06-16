// FILE: src/components/LoadingScreen.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    const start = Date.now();
    const duration = 2500; // Exact 2.5 seconds load duration
    let raf;
    
    const animate = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(p);
      
      if (p < 100) {
        raf = requestAnimationFrame(animate);
      } else {
        // Delay splitting slightly to let 100% sink in, then slide panels away
        setTimeout(() => setPhase('split'), 300);
        setTimeout(() => {
          setPhase('done');
          onFinish();
        }, 1100); // 300ms delay + 800ms split slide duration = 1100ms
      }
    };
    
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [onFinish]);

  if (phase === 'done') return null;

  // ─── Phrase cycling based on progress ───
  const getLoadingPhrase = (p) => {
    if (p < 30) return "INITIALIZING SYSTEMS...";
    if (p < 60) return "LOADING PROJECTS...";
    if (p < 90) return "ALMOST THERE...";
    return "LAUNCHING...";
  };

  // ─── Dynamic color interpolation (Gray to Indigo) ───
  // Gray (75, 85, 99) to Indigo (99, 102, 241)
  const r = Math.round(75 + (99 - 75) * (progress / 100));
  const g = Math.round(85 + (102 - 85) * (progress / 100));
  const b = Math.round(99 + (241 - 99) * (progress / 100));
  const barColor = `rgb(${r}, ${g}, ${b})`;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-transparent">
      {/* CSS Injection */}
      <style>{`
        .scanlines-local {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.03) 2px,
            rgba(255, 255, 255, 0.03) 4px
          );
        }
        .flicker-text {
          animation: subtleFlicker 4s infinite;
        }
        @keyframes subtleFlicker {
          0%, 100% { opacity: 1; }
          23% { opacity: 1; }
          24% { opacity: 0.93; }
          26% { opacity: 0.98; }
          27% { opacity: 0.91; }
          30% { opacity: 1; }
          35% { opacity: 0.96; }
          37% { opacity: 1; }
          51% { opacity: 0.94; }
          53% { opacity: 1; }
          72% { opacity: 0.98; }
          75% { opacity: 1; }
        }
        .text-outline-ghostly {
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.6);
          color: transparent;
        }
      `}</style>

      {/* TOP PANEL - Slide Up */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#000000] z-10 overflow-hidden border-b border-white/[0.02]"
        animate={phase === 'split' ? { y: '-100%' } : { y: '0%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="absolute inset-0 scanlines-local" />
      </motion.div>

      {/* BOTTOM PANEL - Slide Down */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#000000] z-10 overflow-hidden border-t border-white/[0.02]"
        animate={phase === 'split' ? { y: '100%' } : { y: '0%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="absolute inset-0 scanlines-local" />
      </motion.div>

      {/* GHOSTLY NAME REVEAL BEFORE EXIT (At 80%-100%) */}
      <AnimatePresence>
        {progress >= 80 && progress < 100 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-15 flex items-center justify-center pointer-events-none"
          >
            <h2 
              className="text-outline-ghostly font-black tracking-tighter leading-[0.85] select-none text-center"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
            >
              YASH<br />LAWANKAR
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD & LOADING INTERACTIVE ELEMENTS */}
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div 
            className="absolute inset-0 z-20 flex flex-col items-center justify-center"
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.2 }}
          >
            {/* HUGE COUNTER */}
            <div className="flex items-baseline font-mono flicker-text select-none">
              <span 
                className="font-black leading-none tracking-tighter text-white"
                style={{ fontSize: 'clamp(5rem, 15vw, 12rem)' }}
              >
                {progress}
              </span>
              <span className="text-white/40 font-light text-2xl md:text-4xl ml-2 font-mono">%</span>
            </div>

            {/* EDGE-TO-EDGE 1PX PROGRESS BAR */}
            <div className="absolute left-0 right-0 bottom-1/4 h-[1px] bg-white/5 overflow-visible">
              <div 
                className="h-full relative transition-all duration-75 ease-out"
                style={{ 
                  width: `${progress}%`,
                  backgroundColor: barColor
                }}
              >
                {/* GLOWING DOT AT LEADING EDGE */}
                <div 
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white transition-all duration-150"
                  style={{ 
                    transform: 'translate(50%, -50%)',
                    boxShadow: `0 0 10px 2px ${barColor}, 0 0 20px 4px ${barColor}`
                  }}
                />
              </div>
            </div>

            {/* CYCLING PHRASES */}
            <div className="absolute bottom-[20%] text-center">
              <p className="text-white/30 text-[10px] font-mono tracking-[0.4em] uppercase transition-all duration-300">
                {getLoadingPhrase(progress)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
