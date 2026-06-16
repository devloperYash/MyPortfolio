// FILE: src/components/Projects.jsx
import { motion } from 'framer-motion';
import { Github, ExternalLink, Cpu, Code, Database, Server, Settings } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Purplle Tech Challenge 2026',
    subtitle: 'Store Intelligence Pipeline',
    description: 'High-throughput computer vision pipeline using YOLOv8 to automate retail store analytics. Combines real-time crowd dynamics, heatmaps, and queue-waiting estimation.',
    stack: ['YOLOv8', 'FastAPI', 'Redis Streams', 'Live Dashboard'],
    github: 'https://github.com/devloperYash/Purplle-Challenge-2026',
    link: '#',
    badge: 'Hackathon Finalist',
    color: '#6366f1', // Indigo
    icon: Cpu
  },
  {
    id: 2,
    title: 'PRAYS',
    subtitle: 'AI Mock Interview Platform',
    description: 'Full-stack AI assistant streamlining candidate screening. Leverages Natural Language Processing to score responses, analyze emotional sentiments, and ask adaptive follow-up questions.',
    stack: ['Python', 'NLP', 'REST APIs', 'React'],
    github: 'https://github.com/devloperYash/AI-Mock-Interview-Platform-public-',
    link: '#',
    badge: 'Final Year Project',
    color: '#22d3ee', // Cyan
    icon: Code
  },
  {
    id: 3,
    title: 'Flora Vision',
    subtitle: 'AI Plant Disease Detection',
    description: 'Deep neural network trained on extensive agricultural datasets to identify crop leaf pathogens. Serves diagnostic predictions and treatment schedules instantly.',
    stack: ['Deep Learning', 'Computer Vision', 'Python', 'FastAPI'],
    github: 'https://github.com/devloperYash/Flora-Vision-Ai-public-',
    link: '#',
    badge: 'Research & AI',
    color: '#f472b6', // Pink
    icon: Settings
  },
  {
    id: 4,
    title: 'Knowledge Representation',
    subtitle: 'Intel Unnati AI Pipeline',
    description: 'Advanced pipeline for structured datasets incorporating data preprocessing, LLM integration, custom prompting templates, and automated Knowledge Graph generation with an interactive UI dashboard.',
    stack: ['Data Preprocessing', 'LLM Integration', 'Prompting', 'Knowledge Graphs', 'React UI'],
    github: 'https://github.com/devloperYash/Knowledge-Representation-And-Insight-Generation',
    link: '#',
    badge: 'Intel Unnati',
    color: '#6366f1', // Indigo
    icon: Server
  },
  {
    id: 5,
    title: 'EventEase',
    subtitle: 'AI-Powered Salesforce CRM',
    description: 'Enterprise-grade event system features Lightning Web Components (LWC), robust Apex automation, registration workflows, interest-based recommendations, and intelligent lead scoring.',
    stack: ['Salesforce CRM', 'Apex Triggers', 'LWC Development', 'A/B Testing'],
    github: 'https://github.com/devloperYash/EventEase-AI-Powered-Event-Registration-System',
    link: 'https://github.com/devloperYash/EventEase-AI-Powered-Event-Registration-System',
    badge: 'Salesforce & AI',
    color: '#22d3ee', // Cyan
    icon: Database
  },
  {
    id: 6,
    title: 'Spring Boot Job Portal',
    subtitle: 'Backend REST API',
    description: 'Enterprise-grade recruitment platform backend features JWT stateless security, robust logging, customized exception handling, and full relational schemas.',
    stack: ['Java', 'Spring Boot', 'JWT Security', 'MySQL'],
    github: 'https://github.com/devloperYash/Job-Portal-Using-Spring-Boot',
    link: '#',
    badge: 'Backend Core',
    color: '#f472b6', // Pink
    icon: Database
  }
];

// Spans pattern for balanced asymmetric layout: 8, 4, 4, 8, 8, 4
const SPANS = [8, 4, 4, 8, 8, 4];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-36 overflow-hidden border-t border-white/[0.04]">
      {/* Background radial soft light */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#22d3ee]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#f472b6]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div>
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#6366f1] text-xs font-mono tracking-[0.3em] uppercase">03 / Works</span>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-7xl font-black tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              SELECTED <span className="text-gradient">PROJECTS</span>
            </motion.h2>
          </div>
          <motion.p
            className="text-white/40 max-w-sm text-sm font-mono leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            An asymmetric curation of systems built with computer vision, deep learning, Salesforce Lightning, and robust backend REST APIs.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {projects.map((proj, idx) => {
            const span = SPANS[idx % SPANS.length];
            const isLarge = span === 8;
            const Icon = proj.icon;
            return (
              <motion.div
                key={proj.id}
                className={`flip-card h-[420px] md:h-[480px] cursor-none ${
                  isLarge ? 'lg:col-span-8' : 'lg:col-span-4'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                data-cursor="view"
              >
                <div className="flip-card-inner h-full w-full">
                  
                  {/* FRONT SIDE */}
                  <div className="flip-card-front glass p-8 flex flex-col justify-between border border-white/[0.05] bg-surface/30">
                    <div className="flex justify-between items-start">
                      <span className="text-white/20 font-mono text-xs tracking-wider">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="px-3 py-1 text-[10px] font-mono tracking-wider uppercase rounded-full border"
                        style={{ color: proj.color, borderColor: `${proj.color}33`, backgroundColor: `${proj.color}0d` }}
                      >
                        {proj.badge}
                      </span>
                    </div>

                    <div>
                      <div className="mb-4">
                        <Icon size={32} style={{ color: proj.color }} className="opacity-80" />
                      </div>
                      <h3 className="text-white/40 text-xs font-mono uppercase tracking-[0.2em] mb-1">
                        {proj.subtitle}
                      </h3>
                      <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-gradient">
                        {proj.title}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {proj.stack.slice(0, 3).map((st) => (
                        <span key={st} className="text-xs bg-white/[0.03] text-white/50 px-3 py-1 font-mono rounded">
                          {st}
                        </span>
                      ))}
                      {proj.stack.length > 3 && (
                        <span className="text-xs bg-white/[0.03] text-white/30 px-3 py-1 font-mono rounded">
                          +{proj.stack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="flip-card-back glass p-8 flex flex-col justify-between border border-white/[0.08] bg-[#0c0c0e]">
                    <div className="flex justify-between items-center border-b border-white/[0.05] pb-4">
                      <h4 className="font-bold text-lg text-white">{proj.title}</h4>
                      <div className="flex gap-3">
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/40 hover:text-white transition-colors duration-300 pointer-events-auto"
                          data-cursor="hover"
                        >
                          <Github size={18} />
                        </a>
                        {proj.link !== '#' && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-white transition-colors duration-300 pointer-events-auto"
                            data-cursor="hover"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center py-6">
                      <p className="text-white/70 text-sm leading-relaxed mb-6 font-light">
                        {proj.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {proj.stack.map((st) => (
                          <span key={st} className="text-[11px] bg-white/[0.04] text-white/70 px-2 py-1 font-mono rounded border border-white/[0.02]">
                            {st}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                      <span className="text-xs text-white/30 font-mono">
                        Hover out to flip
                      </span>
                      <span className="text-xs font-mono uppercase tracking-wider" style={{ color: proj.color }}>
                        Explore Details
                      </span>
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
