import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronDown,
  X,
  ZoomIn,
  Trophy,
  Newspaper,
  Mail,
  Award,
  Briefcase,
} from 'lucide-react';
import profileImg from '../assets/profile.jpg';
import news1 from '../assets/achievements/news1.jpg';
import news2 from '../assets/achievements/news2.jpg';
import news3 from '../assets/achievements/news3.jpg';
import devothonTrophy from '../assets/achievements/devothon trophy.jpg';
import aavishkarTrophy from '../assets/achievements/Aavishkar trophy.png';

gsap.registerPlugin(ScrollTrigger);

/* ─── data ─── */

interface PetalItem {
  id: string;
  type: 'newspaper' | 'trophy';
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  angle: number;
  distance: number;
}

const PETALS: PetalItem[] = [
  {
    id: 'p1', type: 'newspaper', badge: 'Press',
    title: 'State Aavishkar Press',
    subtitle: 'Featured in leading daily for university research innovation',
    image: news1, angle: -68, distance: 45,
  },
  {
    id: 'p2', type: 'trophy', badge: '1st Runner Up',
    title: 'Devothon Trophy',
    subtitle: '1st Runner Up Trophy at Sipna COET regional hackathon',
    image: devothonTrophy, angle: -34, distance: 47,
  },
  {
    id: 'p3', type: 'newspaper', badge: 'Media',
    title: 'District Championship',
    subtitle: 'Recognized for high-performance software solution',
    image: news2, angle: 0, distance: 47,
  },
  {
    id: 'p4', type: 'trophy', badge: 'Aavishkar',
    title: 'Aavishkar Trophy',
    subtitle: 'Maharashtra Inter-University Research Convention Trophy',
    image: aavishkarTrophy, angle: 34, distance: 47,
  },
  {
    id: 'p5', type: 'newspaper', badge: 'Feature',
    title: 'Tech Innovation Daily',
    subtitle: 'Regional newspaper spotlight on agricultural AI system',
    image: news3, angle: 68, distance: 45,
  },
];

const TITLES = [
  'Software Developer',
  'University Color Coat Holder',
  '2× Hackathon Winner',
  'CSE Graduate, PRMITR',
];

/* ─── icons ─── */

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox= "0 0 24 24" fill = "none" stroke = "currentColor" strokeWidth = "2" strokeLinecap = "round" strokeLinejoin = "round" className = { className } aria-hidden="true" >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox= "0 0 24 24" fill = "currentColor" className = { className } aria-hidden="true" >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
);

/* ─── component ─── */

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const photoWrapperRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const idleTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  const [modal, setModal] = useState<PetalItem | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [photoHover, setPhotoHover] = useState(false);
  const [titleIdx, setTitleIdx] = useState(0);

  // rotating title ticker
  useEffect(() => {
    const id = setInterval(() => {
      if (!titleRef.current) return;
      gsap.to(titleRef.current, {
        y: -12, opacity: 0, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
          setTitleIdx(prev => (prev + 1) % TITLES.length);
          gsap.fromTo(titleRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
        },
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // main GSAP context
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // text entrance
      gsap.fromTo('.hs', { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.09, ease: 'power3.out',
      });

      // metrics
      gsap.fromTo('.m-box', { opacity: 0, y: 14, scale: 0.96 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.07, delay: 0.3, ease: 'back.out(1.2)',
      });

      // profile
      gsap.fromTo(photoWrapperRef.current, { opacity: 0, scale: 0.85 }, {
        opacity: 1, scale: 1, duration: 1, ease: 'power2.out', delay: 0.12,
      });

      // petal bloom
      const petals = petalsRef.current.filter(Boolean);
      if (petals.length) {
        if (!reduced) {
          gsap.fromTo(petals, { scale: 0.2, opacity: 0 }, {
            scale: 1, opacity: 1, duration: 1.2, stagger: 0.08, ease: 'back.out(1.4)', delay: 0.3,
            onComplete: () => {
              idleTimelineRef.current = gsap.timeline({ repeat: -1, yoyo: true });
              petals.forEach((p, i) => {
                idleTimelineRef.current?.to(p, {
                  y: i % 2 === 0 ? -5 : 5,
                  rotation: `+=${i % 2 === 0 ? 1.4 : -1.4}`,
                  duration: 2.8 + i * 0.35, ease: 'sine.inOut',
                }, 0);
              });
            },
          });
        } else {
          gsap.to(petals, { opacity: 1, duration: 0.4 });
        }
      }

      // pin & fade on desktop only to avoid mobile scroll traps
      if (sectionRef.current) {
        const isDesktop = window.innerWidth >= 1024;
        gsap.to(heroContentRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: isDesktop ? '+=80%' : 'bottom top',
            pin: isDesktop,
            scrub: 0.6,
            pinSpacing: isDesktop,
            onUpdate: (self) => {
              if (scrollIndicatorRef.current) {
                const o = Math.max(0, 1 - self.progress * 4);
                scrollIndicatorRef.current.style.opacity = `${o}`;
                scrollIndicatorRef.current.style.pointerEvents = o <= 0.05 ? 'none' : 'auto';
              }
            },
          },
          scale: reduced ? 1 : (isDesktop ? 0.97 : 0.98),
          opacity: isDesktop ? 0.3 : 0.6,
          ease: 'power1.inOut',
        });
      }
    }, sectionRef);

    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setModal(null); };
    window.addEventListener('keydown', esc);
    return () => { window.removeEventListener('keydown', esc); ctx.revert(); };
  }, []);

  const petalIn = (id: string) => { setHovered(id); idleTimelineRef.current?.pause(); };
  const petalOut = () => { setHovered(null); idleTimelineRef.current?.play(); };

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-x-hidden pt-16 sm:pt-20 lg:pt-16 pb-6 px-4 sm:px-10 md:px-14 lg:px-20 touch-pan-y"
      style={{ background: '#000' }}
    >
      {/* ── bg video ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12] pointer-events-none z-0"
        aria-hidden="true"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* subtle noise-grain overlay to kill the "too clean" AI look */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />

      {/* thin scanline feel – 1px repeating line */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 3px)',
        }}
        aria-hidden="true"
      />

      {/* ── content grid ── */}
      <div
        ref={heroContentRef}
        className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center"
      >
        {/* LEFT: text */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          {/* honor pills — clean and genuine */}
          <div className="hs flex flex-wrap gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono font-medium tracking-wide text-[#D9A441] border border-[#D9A441]/40 rounded-full bg-[#D9A441]/5">
              ✦ University Color Coat Holder — SGBAU '25
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono font-medium tracking-wide text-white/70 border border-white/10 rounded-full">
              2× Hackathon Winner
            </span>
          </div>

          <h1
            className="hs font-display font-extrabold text-5xl sm:text-6xl md:text-6xl lg:text-7xl tracking-tight leading-[0.92]"
            style={{
              color: '#f2f0eb',
              textShadow: '0 2px 24px rgba(0,0,0,0.5)',
              WebkitTextStroke: '0.5px rgba(255,255,255,0.08)',
            }}
          >
            Yash<br />
            Lawankar
            <span className="sr-only"> (Yash Lavankar · Yash Law · Yash Lav · devloperYash)</span>
          </h1>

          {/* rolling title */}
          <div className="hs mt-3 h-6 overflow-hidden">
            <span
              ref={titleRef}
              className="block text-sm sm:text-base font-mono font-medium text-[#D9A441] tracking-wide"
            >
              {TITLES[titleIdx]}
            </span>
          </div>

          {/* real human bio — Plus Jakarta Sans */}
          <p className="hs text-[15px] sm:text-base text-white/55 leading-relaxed mt-5 max-w-md font-sans font-normal">
            CSE Graduate, 8.89 CGPA. I build things that work —
            full-stack web apps, CV pipelines, Spring Boot backends. Won a couple
            hackathons along the way. Mentored 100+ students on Git through GDG.
          </p>

          {/* metrics — compact, no icons-overload */}
          <div className="hs flex flex-wrap gap-2 mt-5">
            {[
              { label: 'CGPA', value: '8.89', sub: 'PRMITR CSE' },
              { label: 'DSA', value: '350+', sub: 'LC + TUF' },
              { label: 'Hackathons', value: '2× Won', sub: 'Devothon · Ecothon' },
              { label: 'Salesforce', value: '130k', sub: '21 Superbadges' },
            ].map((m) => (
              <div
                key={m.label}
                className="m-box px-3.5 py-2 rounded-lg border border-white/[0.07] bg-white/[0.02] text-left min-w-[5.2rem]"
              >
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                  {m.label}
                </div>
                <div className="font-display font-bold text-base text-white mt-0.5">
                  {m.value}
                </div>
                <div className="text-[10px] font-sans text-white/30 font-medium">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: profile + petals + named buttons underneath */}
        <div
          className="lg:col-span-6 flex flex-col items-center justify-center relative pt-2 pb-2"
          style={{ overflow: 'visible' }}
        >
          <div
            ref={photoWrapperRef}
            className="relative flex items-center justify-center mt-8"
            style={{ width: 'clamp(280px, 38vw, 430px)', height: 'clamp(280px, 38vw, 430px)' }}
          >
            {/* dashed ring */}
            <div
              className={`absolute inset-3 rounded-full border border-dashed pointer-events-none transition-all duration-700 ${
                photoHover ? 'border-[#D9A441]/50 scale-[1.08]' : 'border-white/[0.07]'
              }`}
              aria-hidden="true"
            />

            {/* petals */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {PETALS.map((p, i) => {
                const active = hovered === p.id;
                const rad = ((p.angle - 90) * Math.PI) / 180;
                const dist = p.distance + (photoHover ? 3 : 0);
                const x = 50 + dist * Math.cos(rad);
                const y = 50 + dist * Math.sin(rad);

                return (
                  <div
                    key={p.id}
                    ref={(el) => {
                      petalsRef.current[i] = el;
                    }}
                    className="absolute pointer-events-auto transition-transform duration-500 ease-out"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: `translate(-50%,-50%) rotate(${p.angle}deg) ${
                        active ? 'scale(1.22)' : 'scale(1)'
                      }`,
                      zIndex: active ? 40 : 10 + i,
                    }}
                  >
                    <button
                      type="button"
                      aria-label={`View: ${p.title}`}
                      onClick={() => setModal(p)}
                      onMouseEnter={() => petalIn(p.id)}
                      onMouseLeave={petalOut}
                      onFocus={() => petalIn(p.id)}
                      onBlur={petalOut}
                      className={`group relative block w-[4.4rem] h-[6.4rem] sm:w-[5.8rem] sm:h-[8.2rem] md:w-[6.8rem] md:h-[9.6rem] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 text-left focus-visible:ring-2 focus-visible:ring-[#D9A441] bg-neutral-900 ${
                        active
                          ? 'border border-[#D9A441] shadow-[0_12px_30px_rgba(217,164,65,0.35)]'
                          : p.type === 'trophy'
                          ? 'border border-white/[0.08] shadow-lg'
                          : 'border border-white/[0.06] shadow-lg'
                      }`}
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        className={`w-full h-full ${
                          p.type === 'trophy'
                            ? 'object-contain p-1.5 bg-black'
                            : 'object-cover object-top grayscale-[30%] contrast-110'
                        } group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300`}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8px] font-mono text-[#D9A441] bg-black/70 border border-white/[0.06] flex items-center gap-1">
                        {p.type === 'trophy' ? (
                          <Trophy className="w-2 h-2" />
                        ) : (
                          <Newspaper className="w-2 h-2" />
                        )}
                        {p.badge}
                      </div>
                      <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between">
                        <span className="text-[9px] sm:text-[10px] font-display font-medium text-white/90 truncate leading-tight">
                          {p.title}
                        </span>
                        <ZoomIn className="w-3 h-3 text-[#D9A441] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* profile photo */}
            <div
              className="relative z-30 group cursor-pointer"
              onMouseEnter={() => setPhotoHover(true)}
              onMouseLeave={() => setPhotoHover(false)}
              tabIndex={0}
              aria-label="Yash Lawankar"
            >
              <div
                className={`absolute -inset-2 rounded-full border transition-all duration-500 ${
                  photoHover
                    ? 'border-[#D9A441]/80 scale-105 shadow-[0_0_50px_rgba(217,164,65,0.3)]'
                    : 'border-white/[0.08]'
                }`}
                aria-hidden="true"
              />
              <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-white/15 bg-neutral-900 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-[#D9A441]/50 group-hover:shadow-[0_0_40px_rgba(217,164,65,0.2)] group-focus-visible:ring-4 group-focus-visible:ring-[#D9A441]">
                <img
                  src={profileImg}
                  alt="Yash Lawankar — Software Development Engineer"
                  className="w-full h-full object-cover object-center brightness-[0.92] contrast-[1.05] group-hover:brightness-100 transition-all duration-500"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* links embedded with clear names directly under image */}
          <div className="hs flex flex-wrap items-center justify-center gap-2.5 mt-2 z-30 max-w-lg px-2">
            {/* GitHub */}
            <a
              href="https://github.com/devloperYash"
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono text-white/65 shadow-md overflow-hidden cursor-pointer"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.025)',
                transition:
                  'color 0.3s, border-color 0.3s, box-shadow 0.3s, transform 0.25s, background 0.3s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = '#fff';
                el.style.borderColor = 'rgba(255,255,255,0.35)';
                el.style.boxShadow =
                  '0 0 24px rgba(255,255,255,0.12), 0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)';
                el.style.transform = 'translateY(-3px) scale(1.05)';
                el.style.background = 'rgba(255,255,255,0.06)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = '';
                el.style.borderColor = '';
                el.style.boxShadow = '';
                el.style.transform = '';
                el.style.background = '';
              }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 55%)',
                }}
                aria-hidden="true"
              />
              <GithubIcon className="w-3.5 h-3.5 shrink-0 transition-colors duration-200" />
              <span className="tracking-wide">GitHub</span>
              <span className="text-[10px] opacity-40 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all duration-200">
                ↗
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/yash-lawankar-17a752259"
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono text-white/65 shadow-md overflow-hidden cursor-pointer"
              style={{
                border: '1px solid rgba(76,126,255,0.2)',
                background: 'rgba(76,126,255,0.04)',
                transition:
                  'color 0.3s, border-color 0.3s, box-shadow 0.3s, transform 0.25s, background 0.3s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = '#fff';
                el.style.borderColor = 'rgba(76,126,255,0.6)';
                el.style.boxShadow =
                  '0 0 28px rgba(76,126,255,0.25), 0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(76,126,255,0.12)';
                el.style.transform = 'translateY(-3px) scale(1.05)';
                el.style.background = 'rgba(76,126,255,0.09)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = '';
                el.style.borderColor = '';
                el.style.boxShadow = '';
                el.style.transform = '';
                el.style.background = '';
              }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(76,126,255,0.1) 0%, transparent 55%)',
                }}
                aria-hidden="true"
              />
              <LinkedInIcon className="w-3.5 h-3.5 shrink-0 text-[#4C7EFF]" />
              <span className="tracking-wide">LinkedIn</span>
              <span className="text-[10px] text-[#4C7EFF]/50 group-hover:text-[#4C7EFF]/90 group-hover:translate-x-0.5 transition-all duration-200">
                ↗
              </span>
            </a>

            {/* Credly */}
            <a
              href="https://www.credly.com/users/yash-lawankar"
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono shadow-md overflow-hidden cursor-pointer"
              style={{
                border: '1px solid rgba(217,164,65,0.3)',
                background: 'rgba(217,164,65,0.05)',
                color: '#D9A441',
                transition:
                  'border-color 0.3s, box-shadow 0.3s, transform 0.25s, background 0.3s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(217,164,65,0.7)';
                el.style.boxShadow =
                  '0 0 30px rgba(217,164,65,0.3), 0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(217,164,65,0.15)';
                el.style.transform = 'translateY(-3px) scale(1.05)';
                el.style.background = 'rgba(217,164,65,0.1)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = '';
                el.style.boxShadow = '';
                el.style.transform = '';
                el.style.background = '';
              }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(217,164,65,0.12) 0%, transparent 55%)',
                }}
                aria-hidden="true"
              />
              <Award className="w-3.5 h-3.5 shrink-0 text-[#D9A441]" />
              <span className="tracking-wide">Credly Badges</span>
              <span className="text-[10px] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200">
                ↗
              </span>
            </a>

            {/* Kyndle */}
            <a
              href="https://kyndle.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono shadow-md overflow-hidden cursor-pointer"
              style={{
                border: '1px solid rgba(249,115,22,0.28)',
                background: 'rgba(249,115,22,0.04)',
                color: '#fb923c',
                transition:
                  'border-color 0.3s, box-shadow 0.3s, transform 0.25s, background 0.3s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(249,115,22,0.7)';
                el.style.boxShadow =
                  '0 0 28px rgba(249,115,22,0.28), 0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(249,115,22,0.12)';
                el.style.transform = 'translateY(-3px) scale(1.05)';
                el.style.background = 'rgba(249,115,22,0.09)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = '';
                el.style.boxShadow = '';
                el.style.transform = '';
                el.style.background = '';
              }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(249,115,22,0.1) 0%, transparent 55%)',
                }}
                aria-hidden="true"
              />
              <Briefcase className="w-3.5 h-3.5 shrink-0 text-orange-400" />
              <span className="tracking-wide">Kyndle Freelance</span>
              <span className="text-[10px] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200">
                ↗
              </span>
            </a>

            {/* Contact */}
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono text-white/65 shadow-md overflow-hidden cursor-pointer"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.02)',
                transition:
                  'color 0.3s, border-color 0.3s, box-shadow 0.3s, transform 0.25s, background 0.3s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = '#fff';
                el.style.borderColor = 'rgba(255,255,255,0.32)';
                el.style.boxShadow =
                  '0 0 24px rgba(255,255,255,0.1), 0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)';
                el.style.transform = 'translateY(-3px) scale(1.05)';
                el.style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = '';
                el.style.borderColor = '';
                el.style.boxShadow = '';
                el.style.transform = '';
                el.style.background = '';
              }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 55%)',
                }}
                aria-hidden="true"
              />
              <Mail className="w-3.5 h-3.5 shrink-0 transition-colors duration-200" />
              <span className="tracking-wide">Get in Touch</span>
              <span className="text-[10px] opacity-40 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all duration-200">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="w-full flex flex-col items-center z-10 select-none pb-2 transition-opacity duration-300"
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono tracking-widest text-white/20 uppercase mb-1">
          scroll
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-white/20 animate-bounce" />
      </div>

      {/* modal */}
      {modal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={modal.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-neutral-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl p-5 sm:p-7 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
              <div>
                <span className="text-[10px] font-mono text-[#D9A441] uppercase tracking-wider">
                  {modal.badge}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mt-0.5">
                  {modal.title}
                </h3>
                <p className="text-xs text-white/40 mt-0.5">{modal.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setModal(null)}
                aria-label="Close"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#D9A441]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto rounded-lg border border-white/[0.06] bg-black/60 p-2 flex justify-center items-center">
              <img
                src={modal.image}
                alt={modal.title}
                className="w-full max-h-[55vh] object-contain rounded"
              />
            </div>
            <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-white/30">
              <span className="font-sans text-muted">Yash Lawankar — PRMITR CSE '26</span>
              <button
                type="button"
                onClick={() => setModal(null)}
                className="px-4 py-1 rounded bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
