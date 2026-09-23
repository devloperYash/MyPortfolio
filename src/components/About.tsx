import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Database,
  Terminal,
  Cpu,
  GraduationCap,
  Award,
  Sparkles,
  Layers,
  CheckCircle2,
  TrendingUp,
  Brain,
  Network,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Skill Categories ─── */

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  accent: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages',
    icon: Code2,
    accent: '#D9A441',
    skills: ['Java', 'Python', 'SQL'],
  },
  {
    title: 'Core Computer Science',
    icon: Network,
    accent: '#4C7EFF',
    skills: [
      'Data Structures & Algorithms',
      'Object-Oriented Design',
      'Complexity Analysis',
      'Distributed Systems Fundamentals',
      'Networking (TCP/IP, HTTP)',
    ],
  },
  {
    title: 'Backend & Web Engineering',
    icon: Layers,
    accent: '#10B981',
    skills: [
      'Spring Boot',
      'REST APIs',
      'Multi-tiered Architecture',
      'HTML5',
      'CSS3',
    ],
  },
  {
    title: 'Databases & Modeling',
    icon: Database,
    accent: '#F59E0B',
    skills: [
      'MySQL',
      'MongoDB',
      'Relational Data Modeling',
      'NoSQL Schema Design',
    ],
  },
  {
    title: 'Tools & Environments',
    icon: Terminal,
    accent: '#EC4899',
    skills: ['Git', 'GitHub', 'Linux', 'Postman'],
  },
  {
    title: 'Applied AI & ML',
    icon: Brain,
    accent: '#8B5CF6',
    skills: [
      'Data Preprocessing',
      'LLM API Integration (Gemini)',
      'Natural Language Generation (DistilGPT)',
      'Scikit-learn (PCA, K-Means, DBSCAN)',
    ],
  },
];

const METRICS = [
  {
    value: '350+',
    label: 'DSA Problems Solved',
    sub: 'LeetCode & TakeUForward',
  },
  {
    value: '8.89',
    label: 'Engineering CGPA',
    sub: 'PRMITR Badnera · SGBAU',
  },
  {
    value: '100/100',
    label: 'Intel Unnati Score',
    sub: 'Industrial Training Project',
  },
  {
    value: '2026',
    label: 'CSE Graduate',
    sub: 'Available for SDE Roles',
  },
];

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll('.about-reveal');

      if (reducedMotion) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 w-full px-5 sm:px-10 md:px-14 lg:px-20 py-20 sm:py-28 bg-black border-t border-white/[0.08] overflow-hidden"
    >
      <div ref={contentRef} className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* ━━━ SECTION HEADER ━━━ */}
        <div className="about-reveal max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441]" />
            <span className="text-[11px] font-mono tracking-widest text-[#D9A441] uppercase">
              Profile & Engineering Foundation
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
            Software Development Engineer<span className="text-[#D9A441]">.</span>
          </h2>

          <p className="text-xs sm:text-sm font-mono text-[#D9A441]/90 mt-2 tracking-wide">
            Java · Spring Boot · Data Structures & Algorithms · REST APIs
          </p>

          <p className="text-sm sm:text-base text-white/60 font-sans mt-4 leading-relaxed">
            Computer Science Engineering graduate (2026) with strong foundations in object-oriented design, algorithm design, data structures, and computational complexity analysis. Solved 350+ problems across LeetCode and TakeUForward, and built scalable Java/Spring Boot backend systems with clean multi-tiered architecture and normalized schemas. Comfortable managing ambiguity while designing and coding solutions to broadly defined problems, with hands-on exposure to REST APIs, relational databases, and system design fundamentals.
          </p>
        </div>

        {/* ━━━ KEY METRICS ━━━ */}
        <div className="about-reveal grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {METRICS.map((m, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl bg-[#090909] border border-white/[0.08] hover:border-[#D9A441]/40 transition-colors group"
            >
              <span className="font-display text-2xl sm:text-3xl font-black text-white group-hover:text-[#D9A441] transition-colors block">
                {m.value}
              </span>
              <span className="text-xs font-semibold text-white/90 mt-1 block">
                {m.label}
              </span>
              <span className="text-[11px] font-mono text-white/40 block mt-0.5">
                {m.sub}
              </span>
            </div>
          ))}
        </div>

        {/* ━━━ TECHNICAL SKILLS MATRIX ━━━ */}
        <div className="about-reveal space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#D9A441]" />
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                Technical Skills
              </h3>
            </div>
            <span className="text-[11px] font-mono text-white/40">
              Stack & Fundamentals
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILL_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="rounded-2xl bg-[#090909] border border-white/[0.08] p-5 hover:border-white/20 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-3.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 bg-white/[0.03]"
                        style={{ color: cat.accent }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-display text-sm font-bold text-white tracking-tight">
                        {cat.title}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#000000] text-white/80 border border-white/[0.08] group-hover:border-white/15 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Currently Deepening Pill */}
          <div className="p-4 rounded-xl bg-[#090909] border border-[#D9A441]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-white/80">
              <TrendingUp className="w-4 h-4 text-[#D9A441] shrink-0" />
              <span className="font-semibold text-[#D9A441]">Currently Deepening:</span>
              <span>System Design (HLD & LLD) · Spring Security · Fault-tolerant Architectures</span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 shrink-0">
              Active Focus
            </span>
          </div>
        </div>

        {/* ━━━ EDUCATION & CERTIFICATIONS ━━━ */}
        <div className="about-reveal grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Education Card */}
          <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D9A441]/40 to-transparent" />

            <div>
              <div className="flex items-center gap-2 mb-3 text-[#D9A441]">
                <GraduationCap className="w-4 h-4" />
                <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">
                  Education
                </span>
              </div>

              <h4 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                B.E. in Computer Science & Engineering
              </h4>

              <p className="text-xs sm:text-sm text-white/60 font-sans mt-1">
                Prof. Ram Meghe Institute of Technology & Research (PRMITR), Badnera
              </p>

              <div className="flex flex-wrap items-center gap-2.5 mt-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D9A441]/10 text-[#D9A441] border border-[#D9A441]/30">
                  <Sparkles className="w-3 h-3" />
                  CGPA: 8.89 / 10.0
                </span>
                <span className="text-xs font-mono text-white/40">
                  Graduation: July 2026
                </span>
              </div>
            </div>

            <p className="text-xs text-white/45 font-sans mt-5 pt-4 border-t border-white/[0.06] leading-relaxed">
              Sant Gadge Baba Amravati University (SGBAU) · University Color Coat Holder for State Research Podium finish.
            </p>
          </div>

          {/* Certifications & Mentorship Card */}
          <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#4C7EFF]/40 to-transparent" />

            <div>
              <div className="flex items-center gap-2 mb-3 text-[#4C7EFF]">
                <Award className="w-4 h-4" />
                <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">
                  Certifications & Leadership
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      NPTEL – Programming in Java
                    </span>
                    <span className="text-[11px] font-mono text-white/40 block">
                      Core Java, OOP principles, multi-threading & collections framework
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4C7EFF] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      Infosys Springboard – Database Management Systems (DBMS)
                    </span>
                    <span className="text-[11px] font-mono text-white/40 block">
                      Relational algebra, SQL query optimization, indexing & ACID compliance
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      Git & GitHub Workshop Lead
                    </span>
                    <span className="text-[11px] font-mono text-white/40 block">
                      Conducted hands-on version control masterclass for 100+ students on campus
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-white/45 font-sans mt-5 pt-4 border-t border-white/[0.06] leading-relaxed">
              2nd Prize in Espiranza · Ecothon 4.0 Hackathon Winner · Devthon 1st Runner-Up
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
