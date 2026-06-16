// FILE: src/components/Skills.jsx
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const ROW1 = [
  { name: 'Java', color: '#f472b6' }, { name: 'Spring Boot', color: '#6366f1' }, { name: 'REST APIs', color: '#22d3ee' },
  { name: 'Spring Security', color: '#a78bfa' }, { name: 'MySQL', color: '#34d399' }, { name: 'MongoDB', color: '#fb923c' },
  { name: 'HTML', color: '#f87171' }, { name: 'CSS', color: '#38bdf8' }, { name: 'JavaScript', color: '#facc15' },
  { name: 'JPA', color: '#6366f1' }, { name: 'H2 Database', color: '#22d3ee' }, { name: 'BCrypt', color: '#f472b6' },
];
const ROW2 = [
  { name: 'DSA', color: '#22d3ee' }, { name: 'OOP', color: '#6366f1' }, { name: 'System Design', color: '#f472b6' },
  { name: 'Git', color: '#fb923c' }, { name: 'GitHub', color: '#a78bfa' }, { name: 'LLM Integration', color: '#34d399' },
  { name: 'Data Preprocessing', color: '#38bdf8' }, { name: 'Knowledge Graphs', color: '#facc15' },
  { name: 'TCP/IP', color: '#f87171' }, { name: 'HTTP', color: '#6366f1' }, { name: 'Prompt Engineering', color: '#22d3ee' },
  { name: 'Networking', color: '#f472b6' },
];

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';

function ScramblePill({ name, color }) {
  const [displayed, setDisplayed] = useState(name);
  const handleEnter = useCallback(() => {
    let iter = 0;
    const interval = setInterval(() => {
      setDisplayed(name.split('').map((ch, i) => i < Math.floor(iter) ? name[i] : CHARS[Math.floor(Math.random() * CHARS.length)]).join(''));
      iter += 0.5;
      if (iter >= name.length) { setDisplayed(name); clearInterval(interval); }
    }, 25);
  }, [name]);

  return (
    <div className="flex-shrink-0 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-sm font-medium tracking-wider transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.12] select-none whitespace-nowrap"
      style={{ color, textShadow: `0 0 20px ${color}33` }} onMouseEnter={handleEnter}>
      <span className="font-mono text-xs">{displayed}</span>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-2">
      <div className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}>
        <div className="flex gap-3">{doubled.map((item, i) => <ScramblePill key={`${item.name}-${i}`} name={item.name} color={item.color} />)}</div>
        <div className="flex gap-3 ml-3">{doubled.map((item, i) => <ScramblePill key={`${item.name}-d-${i}`} name={item.name} color={item.color} />)}</div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[#22d3ee] text-xs font-mono tracking-[0.3em] uppercase">02 / Skills</span>
          <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tight text-white">Tech I work<br /><span className="text-outline-thin">with daily</span></h2>
        </motion.div>
        <motion.div className="mb-12 flex flex-wrap gap-3" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          {['NPTEL — Programming in Java', 'Infosys Springboard — DBMS'].map((c) => (
            <span key={c} className="px-4 py-2 rounded-full border border-[#6366f1]/20 bg-[#6366f1]/5 text-[#6366f1] text-xs font-mono tracking-wider">{c}</span>
          ))}
        </motion.div>
      </div>
      <motion.div className="space-y-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
        <MarqueeRow items={ROW1} />
        <MarqueeRow items={ROW2} reverse />
      </motion.div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <motion.div className="flex flex-wrap gap-x-12 gap-y-6 text-white/20 text-[10px] font-mono tracking-[0.3em] uppercase"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
          <span><span className="inline-block w-2 h-2 rounded-full bg-[#6366f1] mr-2" />Backend</span>
          <span><span className="inline-block w-2 h-2 rounded-full bg-[#22d3ee] mr-2" />Core CS</span>
          <span><span className="inline-block w-2 h-2 rounded-full bg-[#f472b6] mr-2" />AI / ML</span>
          <span><span className="inline-block w-2 h-2 rounded-full bg-[#fb923c] mr-2" />Tools</span>
          <span><span className="inline-block w-2 h-2 rounded-full bg-[#34d399] mr-2" />Databases</span>
        </motion.div>
      </div>
    </section>
  );
}
