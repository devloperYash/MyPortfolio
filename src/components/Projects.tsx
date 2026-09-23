import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Play,
  Code2,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── types ─── */

interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  url?: string;
  featured?: boolean;
}

/* ─── data ─── */

const PROJECTS: Project[] = [
  {
    id: 'scholarsarthi',
    name: 'ScholarSarthi',
    description: 'Scholarship discovery & deadline aggregation platform — scrapes, curates, and alerts students about active funding opportunities.',
    techStack: ['React', 'Tailwind CSS', 'Python', 'Web Scraping'],
    url: 'https://scholarsarthi-delta.vercel.app/',
    featured: true,
  },
  {
    id: 'documind',
    name: 'Documind',
    description: 'AI-powered multi-modal document processing system — extracts, classifies, and summarizes content from PDFs, images, and scanned docs.',
    techStack: ['AI/ML', 'OCR', 'React', 'Python'],
    url: 'https://documind-beta-sand.vercel.app/',
    featured: true,
  },
  {
    id: 'job-portal',
    name: 'Job Portal',
    description: 'Full-featured job listing and application system built on Spring Boot with REST APIs, role-based auth, and recruiter dashboards.',
    techStack: ['Spring Boot', 'Java', 'MySQL', 'REST API'],
    url: 'https://github.com/devloperYash/Job-Portal-Using-Spring-Boot',
  },
  {
    id: 'prayas',
    name: 'Prayas',
    description: 'AI-powered mock interview platform with real-time feedback, question generation, and performance scoring for placement prep.',
    techStack: ['React', 'Node.js', 'AI/ML', 'WebRTC'],
    url: 'https://github.com/devloperYash/AI-Mock-Interview',
  },
  {
    id: 'keyforge',
    name: 'KeyForge',
    description: 'Production-grade API Key Management SaaS — rate limiting, analytics, key rotation, and team-level access controls for companies.',
    techStack: ['SaaS', 'Node.js', 'PostgreSQL', 'Auth'],
    url: 'https://keyforge-frontend.onrender.com/docs',
  },
  {
    id: 'knowledge-representation',
    name: 'Knowledge Representation & Insight Generation',
    description: 'Built as part of the Intel Unnati Industrial Training Programme — developed data preprocessing pipelines, interactive UI dashboards, and automated insight generation from structured datasets. Our team scored a perfect 100/100 evaluation.',
    techStack: ['Intel Unnati', 'Python', 'Data Preprocessing', 'UI Dashboard', 'Insight Engine'],
    url: 'https://youtu.be/k0nNWaFWbWA',
    featured: true,
  },
  {
    id: 'flora-vision',
    name: 'Flora Vision AI',
    description: 'Computer vision plant disease detection and species classification system for agricultural monitoring and crop vitality analysis.',
    techStack: ['Computer Vision', 'PyTorch', 'CNN', 'Agriculture'],
    url: 'https://drive.google.com/file/d/13WUYGxPct7PhA6W_8Sl8TqGqQQwUKz9D/view',
  },
  {
    id: 'eventease',
    name: 'EventEase',
    description: 'End-to-end event management platform — registration, scheduling, ticket generation, and attendee analytics dashboard.',
    techStack: ['Full-Stack', 'React', 'Node.js', 'MongoDB'],
    url: 'https://drive.google.com/file/d/1hG4GIXO7MSgvvhS2ofuIPI8yPxWuUy1u/view',
  },
  {
    id: 'purplle-challenge',
    name: 'Purplle 2026 Challenge',
    description: 'Competitive coding challenge submission for the Purplle 2026 engineering hiring contest.',
    techStack: ['DSA', 'Problem Solving', 'JavaScript'],
    url: 'https://github.com/devloperYash/Purplle-Challenge-2026',
  },
];

/* ─── helpers ─── */

const isVideoLink = (url?: string) => url?.includes('youtu');
const isGithubLink = (url?: string) => url?.includes('github');

/* ─── layout grouping ─── */

// Row 1: ScholarSarthi + Documind (featured, 2-col)
const ROW_FEATURED = PROJECTS.filter(p => p.id === 'scholarsarthi' || p.id === 'documind');
// Row 2: Job Portal, Prayas, KeyForge (3-col)
const ROW_MID = PROJECTS.filter(p => ['job-portal', 'prayas', 'keyforge'].includes(p.id));
// Row 3: Knowledge Representation (single wide highlight)
const ROW_HIGHLIGHT = PROJECTS.find(p => p.id === 'knowledge-representation')!;
// Row 4: Flora Vision, EventEase, Purplle (3-col)
const ROW_BOTTOM = PROJECTS.filter(p => ['flora-vision', 'eventease', 'purplle-challenge'].includes(p.id));

/* ─── component ─── */

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.project-card');
      gsap.fromTo(cards, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: reducedMotion ? 'top 90%' : 'top 75%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Projects"
      className="relative w-full bg-black text-[#E8EAF0] px-6 sm:px-10 lg:px-16 py-20 sm:py-28 overflow-hidden"
      style={{ background: '#000' }}
    >
      {/* Film grain */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 left-0 w-full h-px bg-white/[0.06]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── HEADING ── */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441] shadow-[0_0_8px_#D9A441]" />
            <span className="text-[11px] font-mono tracking-widest text-[#D9A441] uppercase">Shipped Work</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Things I've built<span className="text-[#D9A441]">.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] font-sans mt-2 max-w-xl">
            From scholarship platforms to SaaS API managers — shipped products, hackathon entries, and client deliverables.
          </p>
        </div>

        {/* ── ROW 1: Featured (ScholarSarthi + Documind) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
          {ROW_FEATURED.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* ── ROW 2: Job Portal, Prayas, KeyForge ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-4 sm:mb-5">
          {ROW_MID.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* ── ROW 3: Knowledge Representation (single wide highlight) ── */}
        <div className="mb-4 sm:mb-5">
          <ProjectCard project={ROW_HIGHLIGHT} highlight />
        </div>

        {/* ── ROW 4: Flora Vision, EventEase, Purplle ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {ROW_BOTTOM.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Unified Card ─── */

function ProjectCard({ project, highlight }: { project: Project; highlight?: boolean }) {
  const CardWrapper = project.url ? 'a' : 'div';
  const wrapperProps = project.url
    ? { href: project.url, target: '_blank' as const, rel: 'noreferrer' }
    : {};

  const linkIcon = () => {
    if (!project.url) return null;
    if (isVideoLink(project.url)) return <Play className="w-3.5 h-3.5" />;
    if (isGithubLink(project.url)) return <Code2 className="w-3.5 h-3.5" />;
    return <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />;
  };

  // Full-width highlight card (Knowledge Representation)
  if (highlight) {
    return (
      <CardWrapper
        {...wrapperProps as any}
        className="project-card group relative block w-full rounded-2xl border-2 border-[#D9A441]/40 bg-[#111318] hover:border-[#D9A441]/70 hover:bg-[#141820] transition-all duration-400 p-7 sm:p-9 cursor-pointer hover:-translate-y-1 shadow-[0_0_30px_rgba(217,164,65,0.08)] hover:shadow-[0_0_50px_rgba(217,164,65,0.15)]"
      >
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D9A441] to-transparent" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium text-[#D9A441] bg-[#D9A441]/10 border border-[#D9A441]/25 uppercase tracking-wider">
                ✦ Intel Unnati Programme
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white bg-white/[0.08] border border-white/15">
                100/100 Score
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#D9A441] transition-colors duration-300">
              {project.name}
            </h3>
            <p className="text-sm text-white/50 font-sans mt-2 leading-relaxed group-hover:text-white/70 transition-colors max-w-2xl">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3 flex-shrink-0">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((t) => (
                <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/50 border border-white/[0.05] group-hover:text-white/70 group-hover:border-white/10 transition-colors">
                  {t}
                </span>
              ))}
            </div>
            {project.url && (
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D9A441]/70 group-hover:text-[#D9A441] transition-colors">
                <Play className="w-3.5 h-3.5" />
                <span>Watch Video Demo</span>
              </div>
            )}
          </div>
        </div>
      </CardWrapper>
    );
  }

  // Standard / Featured card
  return (
    <CardWrapper
      {...wrapperProps as any}
      className={`project-card group relative rounded-2xl border bg-[#090909] transition-all duration-400 flex flex-col justify-between cursor-pointer hover:-translate-y-1 ${
        project.featured
          ? 'border-white/[0.08] hover:border-[#D9A441]/40 hover:bg-[#0c0c0c] p-6 sm:p-7 min-h-[240px]'
          : 'border-white/[0.08] hover:border-white/20 hover:bg-[#0c0c0c] p-5 sm:p-6 min-h-[200px]'
      }`}
    >
      {project.featured && (
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D9A441]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}

      <div>
        {project.featured && (
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium text-[#D9A441] bg-[#D9A441]/10 border border-[#D9A441]/25 uppercase tracking-wider">
              ✦ Featured
            </span>
            <span className="text-[10px] font-mono text-white/30">Live</span>
          </div>
        )}
        <h3 className={`font-display font-bold tracking-tight leading-snug transition-colors duration-300 ${
          project.featured
            ? 'text-xl sm:text-2xl text-white group-hover:text-[#D9A441]'
            : 'text-base sm:text-lg text-white group-hover:text-[#D9A441]'
        }`}>
          {project.name}
        </h3>
        <p className={`text-white/50 font-sans mt-1.5 leading-relaxed group-hover:text-white/70 transition-colors ${
          project.featured ? 'text-sm mt-2' : 'text-xs line-clamp-3'
        }`}>
          {project.description}
        </p>
      </div>

      <div className={`flex items-end justify-between ${project.featured ? 'mt-5' : 'mt-4'}`}>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((t) => (
            <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/50 border border-white/[0.05] group-hover:text-white/70 group-hover:border-white/10 transition-colors">
              {t}
            </span>
          ))}
        </div>
        {project.url && (
          <div className="flex-shrink-0 text-white/25 group-hover:text-[#D9A441] transition-colors">
            {linkIcon()}
          </div>
        )}
      </div>
    </CardWrapper>
  );
}

export default Projects;
