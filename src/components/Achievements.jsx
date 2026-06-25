// FILE: src/components/Achievements.jsx
import { motion } from 'framer-motion';
import { Award, BookOpen, Star, Users, CheckCircle, BarChart2, Trophy, Medal } from 'lucide-react';

const stats = [
  {
    label: 'LeetCode Problems Solved',
    value: '150+',
    detail: 'Consistent practice focusing on arrays, trees, dynamic programming, and graphs.',
    icon: Star,
    color: '#6366f1' // Indigo
  },
  {
    label: 'Take U Forward DSA Sheet',
    value: '200+',
    detail: 'Completed core algorithmic patterns, data structures, and optimized solutions.',
    icon: BarChart2,
    color: '#22d3ee' // Cyan
  },
  {
    label: 'Workshop Attendees',
    value: '100+',
    detail: 'Conducted interactive Git & GitHub workshops for B.Tech students under GDG PRMITR.',
    icon: Users,
    color: '#f472b6' // Pink
  }
];

const items = [
  {
    category: 'University Honor',
    title: 'University Color Coat Holder — SGBAU',
    description: 'Awarded the prestigious University Color Coat by Sant Gadge Baba Amravati University (2024–25) in recognition of the FloraVision AI project — a distinction given to outstanding achievers across the university.',
    badge: '2024–25',
    icon: Award,
    color: '#f59e0b'
  },
  {
    category: 'Hackathon',
    title: 'National Ecothon — Winner',
    description: 'Won the National Ecothon hackathon held at Sipna COET (2025), competing against teams from across the country with an innovative tech-driven solution.',
    badge: 'Winner 2025',
    icon: Trophy,
    color: '#6366f1'
  },
  {
    category: 'Hackathon',
    title: 'Devothon — Winner',
    description: 'First-place finish at Devothon hackathon held at Sipna COET (2025), demonstrating rapid prototyping and full-stack development under time constraints.',
    badge: 'Winner 2025',
    icon: Trophy,
    color: '#22d3ee'
  },
  {
    category: 'Competitions',
    title: '4+ Project Expo Wins',
    description: 'Consistently secured top positions across multiple inter-college and intra-college project expos, showcasing AI, full-stack, and computer vision projects.',
    badge: 'Multiple Wins',
    icon: Medal,
    color: '#f472b6'
  },
  {
    category: 'Competitions',
    title: 'Purplle Tech Challenge 2026',
    description: 'Selected for the Final Round of the Purplle Tech Challenge for developing a high-throughput Store Intelligence Pipeline.',
    badge: 'Finalist',
    icon: Award,
    color: '#6366f1'
  },
  {
    category: 'Certifications',
    title: 'NPTEL – Programming in Java',
    description: 'Completed comprehensive evaluation in core Java programming paradigms, multi-threading, collections, and object-oriented architectures.',
    badge: 'Elite Certification',
    icon: BookOpen,
    color: '#22d3ee'
  },
  {
    category: 'Certifications',
    title: 'Infosys Springboard – DBMS',
    description: 'Rigorous coursework covering Database Management Systems, Normalization, complex SQL queries, transaction management, and indexing.',
    badge: 'Verified Coursework',
    icon: CheckCircle,
    color: '#f472b6'
  },
  {
    category: 'Certifications',
    title: 'SmartBridge – Salesforce Developer',
    description: 'Completed Salesforce development program via SmartBridge covering Apex programming, Lightning Web Components, SOQL, triggers, and CRM customization.',
    badge: 'Certified',
    icon: CheckCircle,
    color: '#f59e0b'
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 md:py-36 overflow-hidden bg-surface/10 border-t border-white/[0.04]">
      {/* Background soft meshes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6366f1]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="mb-16 md:mb-24">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#f472b6] text-xs font-mono tracking-[0.3em] uppercase">04 / Milestones</span>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-7xl font-black tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            ACHIEVEMENTS &amp; <br />
            <span className="text-gradient">CERTIFICATIONS</span>
          </motion.h2>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 md:mb-24">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="glass p-8 rounded-2xl border border-white/[0.05] relative overflow-hidden group hover:border-white/10 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                {/* Visual hover background indicator */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-10 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: stat.color }}
                />

                <div className="flex justify-between items-start mb-6">
                  <Icon size={24} style={{ color: stat.color }} className="opacity-80" />
                  <span className="text-4xl md:text-5xl font-black tracking-tight text-white group-hover:scale-105 transition-transform duration-500">
                    {stat.value}
                  </span>
                </div>
                
                <h3 className="text-white font-bold text-lg mb-2">{stat.label}</h3>
                <p className="text-white/40 text-xs font-mono leading-relaxed">{stat.detail}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline / Card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="glass p-8 rounded-2xl border border-white/[0.04] bg-[#0c0c0e]/40 flex flex-col justify-between group hover:border-white/10 transition-colors duration-500 relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs text-white/30 font-mono tracking-widest uppercase">{item.category}</span>
                    <span
                      className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border"
                      style={{ color: item.color, borderColor: `${item.color}33`, backgroundColor: `${item.color}05` }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white/95 group-hover:text-white transition-colors duration-300 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-xs font-mono leading-relaxed mb-8">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t border-white/[0.04] pt-4 mt-auto">
                  <Icon size={16} style={{ color: item.color }} className="opacity-60" />
                  <span className="text-[10px] font-mono tracking-wider uppercase text-white/20 group-hover:text-white/40 transition-colors duration-300">
                    Credential Verified
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
