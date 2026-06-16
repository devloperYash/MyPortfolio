// FILE: src/components/About.jsx
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const BIO = "I am a Computer Science Engineering student passionate about building robust Java backends and intelligent AI-powered applications. From architecting Spring Boot REST APIs to integrating LLMs for automated insight generation, I solve real-world problems with clean, scalable code. I have solved 150+ problems on LeetCode, completed 200+ DSA problems on Take U Forward, and mentored 100+ students through Git workshops under GDG PRMITR. I am looking for a Software Engineering role focused on backend development and problem solving.";

const STATS = [
  { value: 150, suffix: '+', label: 'LeetCode Problems', color: '#6366f1' },
  { value: 130, suffix: 'k', label: 'Trailhead Points', color: '#22d3ee' },
  { value: 21, suffix: '', label: 'Superbadges', color: '#f472b6' },
  { value: 8.72, suffix: '', label: 'CGPA', color: '#34d399', decimal: true },
];

function Word({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }} className="inline-block mr-[0.3em] text-white leading-relaxed font-light">{word}</motion.span>;
}

function CountUp({ target, suffix = '', decimal = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const start = Date.now(); const dur = 2000;
    const step = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(decimal ? parseFloat((eased * target).toFixed(2)) : Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, decimal]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const paragraphRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: paragraphRef, 
    offset: ['start 0.8', 'end 0.35'] 
  });
  const words = BIO.split(' ');

  return (
    <section id="about" className="relative py-24 md:py-36 min-h-screen overflow-hidden border-t border-white/[0.04] bg-[#080808]">
      {/* ─── Background geometric shapes ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full border border-white/[0.03] top-10 left-[-200px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="absolute w-[450px] h-[450px] rounded-full border border-white/[0.02] bottom-20 right-[-150px]"
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full border border-white/[0.01] top-1/3 right-1/4"
          animate={{ rotate: 45 }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* ─── LEFT COLUMN (40% width -> col-span-5) ─── */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
            
            {/* Vertical ABOUT Text */}
            <div className="hidden lg:block select-none pointer-events-none">
              <span className="vertical-text text-[11rem] font-black text-white/[0.06] tracking-widest leading-none block">
                ABOUT
              </span>
            </div>

            {/* Minimal Photo Container */}
            <div className="w-56 h-72 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center bg-white/[0.01] backdrop-blur-sm group hover:border-white/30 transition-all duration-500 relative overflow-hidden">
              <img 
                src="/photo.jpg" 
                alt="Yash Lawankar"
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 relative z-10"
                onError={(e) => { 
                  e.target.style.display = 'none'; 
                }} 
              />
              <span className="absolute text-4xl font-black tracking-widest text-white/10 group-hover:text-white/20 transition-colors duration-500 font-mono z-0">
                YASH
              </span>
              <div className="absolute inset-0 bg-[#6366f1]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Personality Tags */}
            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start max-w-sm">
              {["Builder 🔨", "Problem Solver ⚡", "AI Enthusiast 🤖"].map((tag) => (
                <span 
                  key={tag}
                  className="px-4 py-2 rounded-full text-xs font-mono tracking-wider bg-white/[0.02] text-white/50 border border-white/[0.05] hover:bg-white/[0.06] hover:text-white transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>

          {/* ─── RIGHT COLUMN (60% width -> col-span-7) ─── */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            {/* Section label with indigo "01" and animating line */}
            <div className="mb-12 flex items-center gap-4 justify-center lg:justify-start">
              <span className="text-xs font-mono tracking-[0.3em] uppercase">
                <span className="text-[#6366f1]">01</span> / About
              </span>
              <motion.div 
                className="h-[1px] bg-[#6366f1]/30"
                initial={{ width: 0 }}
                whileInView={{ width: 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
            </div>

            {/* Bio text with scroll word highlight */}
            <div ref={paragraphRef} className="mb-16 text-center lg:text-left">
              <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed tracking-tight">
                {words.map((word, i) => (
                  <Word 
                    key={i} 
                    word={word} 
                    progress={scrollYProgress} 
                    range={[i / words.length, (i + 1) / words.length]} 
                  />
                ))}
              </p>
            </div>

            {/* Stats Row at bottom with vertical dividers */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/[0.05] mt-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {STATS.map((s, idx) => (
                <div key={s.label} className="relative flex flex-col items-center md:items-start">
                  {/* Vertical Divider */}
                  {idx > 0 && (
                    <div className="hidden md:block absolute left-[-12px] top-2 bottom-2 w-[1px] bg-white/[0.06]" />
                  )}
                  <div className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: s.color }}>
                    <CountUp target={s.value} suffix={s.suffix} decimal={s.decimal} />
                  </div>
                  <p className="text-white/30 text-[10px] font-mono mt-2 tracking-wider uppercase text-center md:text-left leading-normal">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
