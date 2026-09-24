import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Trophy,
  Award,
  Users,
  Cpu,
  Newspaper,
  Maximize2,
  X,
  ExternalLink,
  Eye,
  Sparkles,
} from 'lucide-react';

import githubWorkshop from '../assets/achievements/github workshop.jpg';
import ecothon from '../assets/achievements/Ecothon Hackthon.jpg';
import devthon from '../assets/achievements/Devthon.jpg';
import projectExpo from '../assets/achievements/Project Expo winner.jpg';
import intelUnnati from '../assets/achievements/intel unnati certificate.jpg';
import aavishkar from '../assets/achievements/District level Aavishkar.jpg';
import news1 from '../assets/achievements/news1.jpg';
import news2 from '../assets/achievements/news2.jpg';
import news3 from '../assets/achievements/news3.jpg';

gsap.registerPlugin(ScrollTrigger);

/* ─── types ─── */

interface Milestone {
  id: string;
  index: string;
  badge: string;
  badgeType: 'gold' | 'silver' | 'blue';
  title: string;
  context: string;
  detail: string;
  techStack: string[];
  image: string;
  icon: React.ElementType;
  isAavishkar?: boolean;
  isNews?: boolean;
  newsImages?: string[];
}

/* ─── data ─── */

const MILESTONES: Milestone[] = [
  {
    id: 'github-workshop',
    index: '01',
    badge: 'GDG Mentorship',
    badgeType: 'blue',
    title: 'Git & GitHub Masterclass',
    context: 'GDG on Campus · PRMITR',
    detail: 'Led a hands-on technical workshop for 100+ students, covering Git internals, branch topologies, merge conflict resolution, and collaborative open-source workflows.',
    techStack: ['Git', 'GitHub', 'CI/CD', 'Open Source'],
    image: githubWorkshop,
    icon: Users,
  },
  {
    id: 'ecothon',
    index: '02',
    badge: '1st Prize Winner',
    badgeType: 'gold',
    title: 'FloraVision AI — Ecothon',
    context: 'State Sustainability Hackathon',
    detail: 'Architected & deployed FloraVision AI — an autonomous computer vision system for real-time botanical disease detection, species classification, and automated crop vitality analytics.',
    techStack: ['FloraVision AI', 'Computer Vision', 'PyTorch', 'IoT'],
    image: ecothon,
    icon: Trophy,
  },
  {
    id: 'devthon',
    index: '03',
    badge: '1st Runner Up',
    badgeType: 'silver',
    title: 'Devthon Hackathon',
    context: 'Sipna COET · 24-Hour Marathon',
    detail: 'Competed among 40+ engineering teams under 24-hour pressure to build and ship an integrated high-concurrency civic assistance application.',
    techStack: ['Full-Stack', 'REST APIs', 'React', 'Rapid Prototyping'],
    image: devthon,
    icon: Award,
  },
  {
    id: 'project-expo',
    index: '04',
    badge: 'Best Project Award',
    badgeType: 'gold',
    title: 'Project Expo Winner',
    context: 'CSE Annual Innovation Showcase',
    detail: 'Awarded 1st place for an end-to-end YOLOv8 object detection and tracking pipeline, optimized for low-latency edge deployment.',
    techStack: ['YOLOv8', 'OpenCV', 'Deep Learning', 'Edge AI'],
    image: projectExpo,
    icon: Sparkles,
  },
  {
    id: 'intel-unnati',
    index: '05',
    badge: 'Industrial Credential',
    badgeType: 'blue',
    title: 'Intel Unnati Trainee',
    context: 'Intel Technology India',
    detail: `Completed rigorous industrial curriculum covering neural network optimization, computer vision inference acceleration, and Intel OpenVINO toolkit deployment.`,
    techStack: ['Intel OpenVINO', 'Neural Networks', 'Hardware Accel'],
    image: intelUnnati,
    icon: Cpu,
  },
  {
    id: 'aavishkar',
    index: '06',
    badge: 'State Research Finalist',
    badgeType: 'gold',
    title: 'Aavishkar Research Convention',
    context: 'SGBAU → Maharashtra Inter-University',
    detail: 'Selected to represent university at Maharashtra\'s premier inter-university research convention with patent-track agricultural automation research.',
    techStack: ['Agricultural AI', 'Research Convention', 'IoT'],
    image: aavishkar,
    icon: Trophy,
    isAavishkar: true,
  },
  {
    id: 'press-coverage',
    index: '07',
    badge: 'Press Spotlights',
    badgeType: 'blue',
    title: 'State & Regional Press',
    context: 'Tarun Bharat · Dainik Pudhari',
    detail: 'Featured across leading regional daily newspapers for competitive research wins and state-level technological contributions.',
    techStack: ['3 Print Dailies', 'State Coverage', 'Research Feature'],
    image: news1,
    icon: Newspaper,
    isNews: true,
    newsImages: [news1, news2, news3],
  },
  {
    id: 'multi-expo',
    index: '08',
    badge: '4× Project Expo Wins',
    badgeType: 'gold',
    title: 'Inter-College Project Expo Sweep',
    context: 'PRMITR · PRCEAM · TGPCET Nagpur · SGMCE Shegaon',
    detail: 'Won 4 Project Expos across PRMITR, PRCEAM, TGPCET Nagpur, and SGMCE Shegaon — consistently recognized for best engineering innovation across the Amravati & Nagpur region.',
    techStack: ['4 Colleges', 'Best Project', 'Regional Winner'],
    image: projectExpo,
    icon: Trophy,
  },
];

/* ─── component ─── */

export const AchievementsReveal: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(1);
  const [activeNews, setActiveNews] = useState(0);
  const [modalData, setModalData] = useState<{ title: string; image: string; subtitle: string } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const progress = Math.max(0, Math.min(1, el.scrollLeft / maxScroll));
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${Math.max(0.12, progress)})`;
    }
    const idx = Math.min(
      MILESTONES.length,
      Math.max(1, Math.round(progress * (MILESTONES.length - 1)) + 1)
    );
    setCurrentIdx(idx);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const isMobile = window.innerWidth < 1024;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (isMobile || reducedMotion) {
        const cards = section.querySelectorAll('.achievement-card');
        gsap.fromTo(cards, { opacity: 0, y: 25 }, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        });
        return;
      }

      const calculateDistance = () => -(track.scrollWidth - window.innerWidth + 80);

      gsap.to(track, {
        x: calculateDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth * 0.95}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }
            setCurrentIdx(Math.min(MILESTONES.length, Math.max(1, Math.round(self.progress * (MILESTONES.length - 1)) + 1)));
          },
        },
      });
    }, section);

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalData(null); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); ctx.revert(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      aria-label="Achievements and Recognition"
      className="relative w-full h-auto min-h-[580px] lg:h-screen lg:max-h-screen bg-black text-[#E8EAF0] overflow-hidden flex flex-col justify-between select-none"
      style={{ background: '#000' }}
    >
      {/* Film grain */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 left-0 w-full h-px bg-white/[0.08] z-10" />

      {/* ── HEADER ── */}
      <div className="relative z-10 w-full px-5 sm:px-10 lg:px-16 pt-5 pb-3 flex items-center justify-between border-b border-white/[0.06] bg-black/90 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441] shadow-[0_0_8px_#D9A441]" />
            <span className="text-[11px] font-mono tracking-widest text-[#D9A441] uppercase">
              Achievements &amp; Recognition
            </span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Milestones along the way<span className="text-[#D9A441]">.</span>
          </h2>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-base sm:text-lg font-bold text-[#D9A441]">0{currentIdx}</span>
            <span className="text-xs text-white/20">/</span>
            <span className="text-xs text-white/40">0{MILESTONES.length}</span>
          </div>
          <div className="w-20 sm:w-36 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <div
              ref={progressBarRef}
              className="h-full bg-[#D9A441] origin-left transition-transform duration-75"
              style={{ transform: 'scaleX(0.12)' }}
            />
          </div>
          <span className="hidden md:inline-block text-[10px] font-mono text-white/30 tracking-wider">SCROLL ↓</span>
        </div>
      </div>

      {/* ── HORIZONTAL TRACK ── */}
      <div
        className="relative z-10 flex-1 flex items-center overflow-x-auto lg:overflow-hidden py-3 sm:py-4 touch-pan-x snap-x snap-mandatory lg:snap-none"
        onScroll={handleMobileScroll}
      >
        <div
          ref={trackRef}
          className="flex flex-row gap-4 sm:gap-6 px-5 sm:px-10 lg:px-16 w-max items-center"
        >
          {MILESTONES.map((item) => (
            <div
              key={item.id}
              onMouseMove={handleMouseMove}
              className={`achievement-card group relative flex-shrink-0 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 snap-center ${
                item.isAavishkar
                  ? 'w-[84vw] sm:w-[420px] lg:w-[490px] bg-[#0c0c0c] border border-[#D9A441]/45 shadow-[0_0_40px_rgba(217,164,65,0.14)] hover:border-[#D9A441]/80'
                  : item.id === 'ecothon'
                  ? 'w-[84vw] sm:w-[380px] lg:w-[410px] bg-[#090909] border border-[#D9A441]/30 hover:border-[#D9A441]/60'
                  : 'w-[84vw] sm:w-[360px] lg:w-[390px] bg-[#090909] border border-white/[0.08] hover:border-white/25'
              }`}
              style={{ maxHeight: 'calc(100vh - 145px)', height: 'clamp(420px, 70vh, 530px)' }}
            >
              {/* Spotlight sheen */}
              <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                style={{
                  background: (item.isAavishkar || item.id === 'ecothon')
                    ? 'radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(217,164,65,0.12), transparent 80%)'
                    : 'radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08), transparent 80%)',
                }}
              />

              {(item.isAavishkar || item.id === 'ecothon' || item.id === 'multi-expo') && (
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D9A441] to-transparent z-20" />
              )}

              {/* Top info bar */}
              <div className="px-5 py-3.5 flex items-center justify-between border-b border-white/[0.05] bg-white/[0.015] relative z-20">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase ${
                    item.badgeType === 'gold'
                      ? 'text-[#D9A441] bg-[#D9A441]/10 border border-[#D9A441]/30'
                      : item.badgeType === 'silver'
                      ? 'text-white/80 bg-white/[0.08] border border-white/20'
                      : 'text-[#4C7EFF] bg-[#4C7EFF]/10 border border-[#4C7EFF]/30'
                  }`}>
                    <item.icon className="w-3 h-3" />
                    {item.badge}
                  </span>
                  <span className="text-[11px] font-mono text-white/40 truncate max-w-[180px]">{item.context}</span>
                </div>
                <span className="font-mono text-xs font-semibold text-white/25">{item.index}</span>
              </div>

              {/* Image */}
              <div className="relative mx-4 my-2.5 flex-1 min-h-[160px] rounded-xl overflow-hidden bg-black border border-white/[0.06] group/photo z-20">
                {item.isNews ? (
                  <div className="relative w-full h-full">
                    <img
                      src={item.newsImages ? item.newsImages[activeNews] : item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top brightness-[0.88] group-hover:brightness-100 transition-all duration-500 cursor-pointer"
                      onClick={() => setModalData({ title: `News Clipping ${activeNews + 1}`, subtitle: 'Regional Print Coverage', image: item.newsImages ? item.newsImages[activeNews] : item.image })}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-10">
                      <div className="flex gap-1 bg-black/80 backdrop-blur-md p-1 rounded-lg border border-white/10">
                        {item.newsImages?.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveNews(idx)}
                            className={`px-2 py-0.5 text-[9px] font-mono rounded transition-colors ${activeNews === idx ? 'bg-white text-black font-semibold' : 'text-white/50 hover:text-white'}`}
                          >
                            Clip {idx + 1}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setModalData({ title: `News Clipping ${activeNews + 1}`, subtitle: 'Regional Print Coverage', image: item.newsImages ? item.newsImages[activeNews] : item.image })}
                        className="p-1 rounded-lg bg-black/80 hover:bg-[#D9A441] hover:text-black text-white/70 border border-white/10 transition-colors"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="relative w-full h-full cursor-pointer"
                    onClick={() => setModalData({ title: item.title, subtitle: item.context, image: item.image })}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center brightness-[0.88] contrast-105 group-hover/photo:brightness-100 group-hover/photo:scale-[1.02] transition-all duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover/photo:opacity-100 transition-opacity bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 text-[#D9A441] text-[10px] font-mono flex items-center gap-1 shadow-lg">
                      <Eye className="w-3 h-3" />
                      <span>Inspect</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom content */}
              <div className="px-5 py-3.5 border-t border-white/[0.05] bg-black/50 relative z-20">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {item.techStack.map((tech) => (
                    <span key={tech} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/60 border border-white/[0.05]">
                      {tech}
                    </span>
                  ))}
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight leading-snug">{item.title}</h3>
                <p className="text-xs text-white/50 font-sans mt-1 leading-relaxed line-clamp-2">{item.detail}</p>

                <div className="mt-3 pt-2.5 border-t border-white/[0.05] flex items-center justify-between">
                  {item.isAavishkar ? (
                    <Link
                      to="/aavishkar"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        document.documentElement.scrollTop = 0;
                        document.body.scrollTop = 0;
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D9A441] hover:bg-[#e4b356] text-black font-mono font-semibold text-xs transition-all shadow-[0_2px_14px_rgba(217,164,65,0.3)] hover:shadow-[0_2px_22px_rgba(217,164,65,0.5)] hover:scale-[1.02]"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => setModalData({ title: item.title, subtitle: item.context, image: item.image })}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-white/50 hover:text-white transition-colors"
                    >
                      <span>Full view</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">YASH · 2026</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full px-5 sm:px-10 lg:px-16 py-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/30 bg-black">
        <span className="truncate max-w-[200px] sm:max-w-none">PRMITR · SGBAU UNIVERSITY COLOR COAT HOLDER</span>
        <span className="hidden sm:inline">DRAG OR SCROLL TO NAVIGATE</span>
        <span className="sm:hidden text-[#D9A441]/70">SWIPE CARDS →</span>
      </div>

      {/* Lightbox Modal */}
      {modalData && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          onClick={() => setModalData(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0d0d0d] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
              <div>
                <span className="text-[10px] font-mono text-[#D9A441] uppercase tracking-wider">{modalData.subtitle}</span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mt-0.5">{modalData.title}</h3>
              </div>
              <button onClick={() => setModalData(null)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto rounded-xl bg-black/90 border border-white/[0.05] p-2 flex items-center justify-center">
              <img src={modalData.image} alt={modalData.title} className="max-h-[65vh] w-auto object-contain rounded-lg" />
            </div>
            <div className="mt-3 pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-white/40">
              <span>Press ESC or click outside to exit</span>
              <button onClick={() => setModalData(null)} className="px-3.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AchievementsReveal;
