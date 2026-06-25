// FILE: src/components/Hero.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import MagneticButton from './MagneticButton';

const ROLES = [
  { text: 'Spring Boot', color: '#6366f1' }, { text: 'REST APIs', color: '#22d3ee' },
  { text: 'Java', color: '#f472b6' }, { text: 'DSA', color: '#a78bfa' },
  { text: 'SQL', color: '#34d399' }, { text: 'Git', color: '#fb923c' },
];
const POS = [
  { x: '12%', y: '18%' }, { x: '78%', y: '12%' }, { x: '85%', y: '65%' },
  { x: '8%', y: '72%' }, { x: '65%', y: '82%' }, { x: '42%', y: '8%' },
];

function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  return <div className="font-mono text-[10px] text-white/25 tracking-[0.3em] uppercase"><span className="text-white/40">{time}</span> IST</div>;
}

export default function Hero() {
  const [isGlitching, setIsGlitching] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // ─── Glitch interval ───────────────────
  useEffect(() => {
    let timeoutId;
    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
      }, 300); // Glitch lasts 0.3s
      
      const nextDelay = 4000 + Math.random() * 2000; // Randomly every 4-6 seconds
      timeoutId = setTimeout(triggerGlitch, nextDelay);
    };

    timeoutId = setTimeout(triggerGlitch, 4000);
    return () => clearTimeout(timeoutId);
  }, []);

  // ─── Scroll listener ───────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── Animation variants ────────────────
  const nameContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.4,
      }
    }
  };

  const letterVariant = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const subtitleContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 1.6, // Starts right after name finishes
      }
    }
  };

  const subtitleLetterVariant = {
    hidden: { opacity: 0, display: 'none' },
    visible: {
      opacity: 1,
      display: 'inline-block',
      transition: {
        duration: 0.01
      }
    }
  };

  const subtitleText = "Software Development Engineer";

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#080808]">
      {/* ─── Styles injection ─────────────────── */}
      <style>{`
        /* Blurred Orbs floating around */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.20;
          mix-blend-mode: screen;
          pointer-events: none;
        }
        .orb-indigo {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #6366f1 0%, transparent 70%);
          top: -10%;
          left: 15%;
          animation: driftOrb1 24s infinite alternate ease-in-out;
        }
        .orb-cyan {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, #22d3ee 0%, transparent 70%);
          bottom: 10%;
          right: 15%;
          animation: driftOrb2 28s infinite alternate ease-in-out;
        }
        .orb-pink {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #f472b6 0%, transparent 70%);
          top: 30%;
          right: 25%;
          animation: driftOrb3 20s infinite alternate ease-in-out;
        }
        @keyframes driftOrb1 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(100px, 80px) scale(1.15); }
          100% { transform: translate(-50px, 150px) scale(0.95); }
        }
        @keyframes driftOrb2 {
          0% { transform: translate(0, 0) scale(0.95); }
          50% { transform: translate(-120px, -60px) scale(1.1); }
          100% { transform: translate(70px, 100px) scale(1.05); }
        }
        @keyframes driftOrb3 {
          0% { transform: translate(0, 0) scale(1.1); }
          50% { transform: translate(80px, -90px) scale(0.9); }
          100% { transform: translate(-90px, 50px) scale(1.05); }
        }

        /* Letter hover and glitch */
        .char-hover-target {
          display: inline-block;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.75);
          color: transparent;
          text-shadow: none;
          transition: filter 0.3s ease, -webkit-text-stroke 0.3s ease, text-shadow 0.3s ease, transform 0.3s ease;
        }
        .char-hover-target:hover {
          filter: brightness(1.5);
          transform: translateY(-8px) scale(1.05);
        }
        .char-hover-target:nth-child(3n):hover {
          -webkit-text-stroke: 1.5px #22d3ee;
          text-shadow: 0 0 25px rgba(34, 211, 238, 0.8), 0 0 80px rgba(99, 102, 241, 0.3);
        }
        .char-hover-target:nth-child(3n+1):hover {
          -webkit-text-stroke: 1.5px #6366f1;
          text-shadow: 0 0 25px rgba(99, 102, 241, 0.8), 0 0 80px rgba(99, 102, 241, 0.3);
        }
        .char-hover-target:nth-child(3n+2):hover {
          -webkit-text-stroke: 1.5px #f472b6;
          text-shadow: 0 0 25px rgba(244, 114, 182, 0.8), 0 0 80px rgba(99, 102, 241, 0.3);
        }

        .hero-name-glitch {
          animation: rgbSplit 0.3s infinite;
        }
        @keyframes rgbSplit {
          0% { text-shadow: 2px -2px 0px #ff0040, -2px 2px 0px #0ff; transform: translate(0, 0); }
          20% { text-shadow: -3px 1px 0px #ff0040, 2px -2px 0px #0ff; transform: translate(-1px, 2px); }
          40% { text-shadow: 1px -3px 0px #ff0040, -1px 3px 0px #0ff; transform: translate(2px, -1px); }
          60% { text-shadow: -2px 2px 0px #ff0040, 1px -1px 0px #0ff; transform: translate(-2px, 1px); }
          80% { text-shadow: 3px -1px 0px #ff0040, -2px 2px 0px #0ff; transform: translate(1px, 0); }
          100% { text-shadow: 0 0 0 transparent; transform: translate(0, 0); }
        }

        /* Buttons styles */
        .shimmer-btn {
          position: relative;
          overflow: hidden;
        }
        .shimmer-btn::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 30%;
          height: 200%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.55) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(30deg);
          animation: shimmerSweep 3s infinite linear;
        }
        @keyframes shimmerSweep {
          0% { left: -60%; }
          30% { left: 140%; }
          100% { left: 140%; }
        }

        .pulse-glow-btn {
          position: relative;
          animation: borderPulse 2.5s infinite ease-in-out;
        }
        @keyframes borderPulse {
          0% {
            box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.05), 0 0 0 0px rgba(99, 102, 241, 0.05);
            border-color: rgba(255, 255, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.02), 0 0 14px 2px rgba(99, 102, 241, 0.25);
            border-color: rgba(99, 102, 241, 0.5);
          }
          100% {
            box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.05), 0 0 0 0px rgba(99, 102, 241, 0.05);
            border-color: rgba(255, 255, 255, 0.2);
          }
        }
      `}</style>

      {/* ─── Drifting Background Orbs ─────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="orb orb-indigo" />
        <div className="orb orb-cyan" />
        <div className="orb orb-pink" />
      </div>

      <div className="gradient-mesh opacity-30" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

      {/* Floating Skill Pills */}
      {ROLES.map((role, i) => (
        <motion.div key={role.text}
          className="absolute hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm text-xs font-medium tracking-wider"
          style={{ left: POS[i].x, top: POS[i].y, color: role.color }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.6,
            scale: 1,
            y: [0, -12, 12, 0],
            rotate: [0, 2.5, -2.5, 0]
          }}
          transition={{
            opacity: { delay: 1.5 + i * 0.15, duration: 0.6 },
            scale: { delay: 1.5 + i * 0.15, duration: 0.4 },
            y: {
              delay: 2.2 + i * 0.2,
              duration: 5 + (i % 3) * 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            },
            rotate: {
              delay: 2.2 + i * 0.2,
              duration: 6 + (i % 2) * 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: role.color }} />
          {role.text}
        </motion.div>
      ))}

      {/* ─── Hero Content ─────────────────── */}
      <div className="relative z-10 text-center px-4">
        {/* Name Text with character staggered entry + hover triggers + random glitch */}
        <motion.h1
          className={`font-black leading-[0.85] tracking-tighter select-none cursor-default flex flex-col items-center justify-center ${
            isGlitching ? 'hero-name-glitch' : ''
          }`}
          style={{ fontSize: 'clamp(4.2rem, 14vw, 14rem)' }}
          variants={nameContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="flex overflow-hidden px-2 py-2">
            {"YASH".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariant}
                className="char-hover-target"
              >
                {char}
              </motion.span>
            ))}
          </div>
          <div className="flex overflow-hidden px-2 py-2">
            {"LAWANKAR".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariant}
                className="char-hover-target"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        {/* Subtitle / Description Row */}
        <div className="mt-6 md:mt-8 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 min-h-[24px]">
          {/* Typing Effect for Subtitle */}
          <motion.span
            className="text-white/40 text-xs md:text-sm font-light tracking-[0.2em] inline-block text-center font-mono"
            variants={subtitleContainer}
            initial="hidden"
            animate="visible"
          >
            {subtitleText.split("").map((char, index) => (
              <motion.span key={index} variants={subtitleLetterVariant}>
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                opacity: {
                  delay: 2.5, // 1.6s delay + 29 chars * 0.03s stagger = 2.47s
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'steps(2)'
                }
              }}
              className="inline-block w-1.5 h-3 bg-white/40 ml-1 align-middle"
            />
          </motion.span>

          {/* Animating divider (width: 0 -> full width) */}
          <motion.span 
            className="hidden md:block h-[1px] bg-white/20"
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ delay: 2.8, duration: 0.8, ease: 'easeInOut' }}
          />

          {/* Staggered slide in details */}
          <motion.span
            className="text-white/30 text-xs font-mono tracking-wider"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.2, duration: 0.6 }}
          >
            PRMITR Badnera &middot; CSE &middot; 2026
          </motion.span>
        </div>

        {/* Action Buttons */}
        <motion.div className="mt-8 md:mt-10 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.6, duration: 0.8 }}>
          <MagneticButton as="a" href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="shimmer-btn px-6 py-3 rounded-full bg-white text-black text-xs font-semibold tracking-wider uppercase hover:bg-white/90 transition-colors">
            Get in touch
          </MagneticButton>
          
          <MagneticButton as="a" href="https://github.com/devloperYash" target="_blank" rel="noopener noreferrer"
            className="pulse-glow-btn px-6 py-3 rounded-full border border-white/20 text-white/70 text-xs font-semibold tracking-wider uppercase hover:border-white/40 hover:text-white transition-all">
            GitHub
          </MagneticButton>
        </motion.div>
      </div>

      {/* Bouncing Scroll Indicator with Fadeout */}
      <AnimatePresence>
        {scrollPosition < 100 && (
          <motion.div 
            className="absolute bottom-8 left-8 flex items-center gap-3 text-white/20 select-none pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              animate={{ y: [0, 6, 0] }} 
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={14} />
            </motion.div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll to explore</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="absolute bottom-8 right-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
        <LiveClock />
      </motion.div>
    </section>
  );
}
