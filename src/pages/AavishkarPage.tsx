import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  Trophy,
  Award,
  Medal,
  Eye,
  Leaf,
  Heart,
  ExternalLink,
  Maximize2,
  X,
  Newspaper,
  MapPin,
  Sparkles,
  Users,
  CheckCircle2,
  Layers,
  ZoomIn,
  Play,
  Cpu,
  Bot,
  CloudSun,
  Volume2,
  ArrowUp,
  Briefcase,
} from 'lucide-react';
import { SOCIAL_LINKS } from '../constants/links';

// Aavishkar images
import collegePic from '../assets/achievements/aavishkar college pic.jpg';
import districtPic from '../assets/achievements/District level Aavishkar.jpg';
import handmadePoster from '../assets/achievements/aavishkar first handmade poster.jpg';
import statePresentation from '../assets/achievements/Statelevel aavishkar presentation.png';
import stateLevel1 from '../assets/achievements/state level avishkar1.jpg';
import aavishkarTrophy from '../assets/achievements/Aavishkar trophy.png';
import colorCoatPic from '../assets/achievements/University Color coat Holder.jpg';

// Newspaper clippings
import news1 from '../assets/achievements/news1.jpg';
import news2 from '../assets/achievements/news2.jpg';
import news3 from '../assets/achievements/news3.jpg';
import news4 from '../assets/achievements/news4.jpg';
import news5 from '../assets/achievements/news5.jpg';

gsap.registerPlugin(ScrollTrigger);

/* ─── Timeline Stage Interface ─── */

interface TimelineStage {
  id: string;
  stageBadge: string;
  level: string;
  location: string;
  title: string;
  result: string;
  resultType: 'gold' | 'silver';
  teammateNote?: string;
  story: string;
  takeaway: string;
  image: string;
  icon: React.ElementType;
}

const STAGES: TimelineStage[] = [
  {
    id: 'college',
    stageBadge: 'Round 01',
    level: 'College Level',
    location: 'PRMITR, Badnera',
    title: 'The Starting Spark — Department Defense',
    result: '🏆 1st Prize Winner',
    resultType: 'gold',
    teammateNote: 'Team Yash Lawankar & Gauri Garole',
    story:
      'Aavishkar began right here at Prof. Ram Meghe Institute of Technology & Research (PRMITR). We took Flora Vision AI to the college jury — demonstrating how deep learning could provide instantaneous crop diagnosis for local farmers. In this format, only the 1st place winner gets nominated to represent the college at the district stage. We defended our algorithm, won 1st prize, and earned the district ticket.',
    takeaway: 'First hurdle cleared: Official nomination as PRMITR’s representative team.',
    image: collegePic,
    icon: Award,
  },
  {
    id: 'district',
    stageBadge: 'Round 02',
    level: 'District Level',
    location: 'Amravati District Convention',
    title: 'Winners vs. Winners — District Elimination',
    result: '🏆 1st Prize Winner',
    resultType: 'gold',
    teammateNote: 'Team Yash Lawankar & Gauri Garole',
    story:
      'At district level, there are no ordinary participants — every single team here is the champion of their respective engineering and science college across Amravati district. The jury scrutinized every claim: dataset diversity, computational complexity on edge mobile hardware, and actual farmer usability. We refined our live pitch, answered tough technical questions on classification accuracy, and emerged as District Champions.',
    takeaway: 'Advanced as Amravati District Champions to the inter-district University Convention.',
    image: districtPic,
    icon: Trophy,
  },
  {
    id: 'university',
    stageBadge: 'Round 03',
    level: 'University Level — SGBAU',
    location: 'Sant Gadge Baba Amravati University',
    title: 'The Regional Summit — University Championship',
    result: '🏆 University Winner & State Ticket',
    resultType: 'gold',
    teammateNote: 'Team Yash Lawankar & Gauri Garole (Up to University Level)',
    story:
      'Here, all district-winning teams from across the vast SGBAU university jurisdiction convened. Surviving two elimination rounds had filtered the competition down to polished, high-impact research projects. Winning here meant receiving the highest honor from the university and the prestigious mandate to represent SGBAU at the Maharashtra State finals. Yash and Gauri presented Flora Vision AI with relentless precision — winning the University Championship.',
    takeaway: 'Official university champion selection to represent SGBAU at the Maharashtra State Finals.',
    image: aavishkarTrophy,
    icon: Trophy,
  },
  {
    id: 'state-poster',
    stageBadge: 'Round 04 — State Part 1',
    level: 'Maharashtra State Finals — Poster Round',
    location: 'DBATU, Lonere, Konkan (7-Day Convention)',
    title: 'The 47-University Showdown — Handmade Poster Defense',
    result: '🏆 Top 8 State Finalist',
    resultType: 'gold',
    story:
      'For the state finals, Yash traveled to Dr. Babasaheb Ambedkar Technological University (DBATU), Lonere in Konkan for a grueling 7-day research convention. 47 teams assembled — and every single one of them was a university champion from across Maharashtra. Round 1 was the exhaustive Poster Presentation Round. Presenting the handmade poster co-created with Gauri, Yash defended Flora Vision AI before senior state research panels. Out of 47 university champion teams, only 8 teams were selected to advance to the podium round. Yash advanced.',
    takeaway: 'Survived 47-team state elimination: Selected in the elite Top 8 for the grand podium finals.',
    image: handmadePoster,
    icon: Eye,
  },
  {
    id: 'state-final',
    stageBadge: 'Round 05 — The Climax',
    level: 'State Podium Defense — Grand Finals',
    location: 'Main Auditorium, DBATU Lonere',
    title: 'The State Podium — 2nd in All Maharashtra',
    result: '🥈 State Runner-Up (2nd Place)',
    resultType: 'silver',
    story:
      'The ultimate stage of Aavishkar: 8 finalist teams on the main stage before a high-ranking scientific evaluation committee, university vice-chancellors, and state delegates. In this final podium defense, Yash presented Flora Vision AI with total conviction — detailing the neural architecture, rural farmer empowerment, and field validation. When the final state rankings were announced, Yash was declared State Runner-Up — 2nd prize across the entire state of Maharashtra.',
    takeaway: 'State Runner-Up trophy brought home to SGBAU & PRMITR Badnera.',
    image: statePresentation,
    icon: Medal,
  },
];

/* ─── Newspaper Articles Data ─── */

interface NewsClipping {
  id: string;
  image: string;
  headline: string;
  publication: string;
  description: string;
  tag: string;
}

const NEWS_CLIPPINGS: NewsClipping[] = [
  {
    id: 'news-1',
    image: news1,
    headline: 'राज्यस्तरीय आविष्कार स्पर्धेत यश लावणकर उपविजेता',
    publication: 'Tarun Bharat',
    description: 'Tarun Bharat headline celebrating Yash Lawankar’s State Runner-Up victory at the Maharashtra State Aavishkar convention for agricultural AI innovation.',
    tag: 'State Runner-Up',
  },
  {
    id: 'news-2',
    image: news2,
    headline: 'विद्यापीठाच्या विद्यार्थ्याचे राज्य पातळीवर नेत्रदीपक यश',
    publication: 'Dainik Pudhari',
    description: 'Dainik Pudhari highlighting the groundbreaking performance representing Sant Gadge Baba Amravati University on the state podium at DBATU.',
    tag: 'University Pride',
  },
  {
    id: 'news-3',
    image: news3,
    headline: 'कृषी क्षेत्रासाठी एआय तंत्रज्ञान: विद्यार्थ्याचा गौरव',
    publication: 'Lokmat / Regional Press',
    description: 'Press feature detailing how Flora Vision AI was architected as an intelligent helping hand for distressed farmers and recognized by university dignitaries.',
    tag: 'Flora Vision AI',
  },
  {
    id: 'news-4',
    image: news4,
    headline: 'संशोधन क्षेत्रात अमरावतीचे नाव राज्य पातळीवर झळकले',
    publication: 'Regional Daily',
    description: 'Detailed coverage of the multi-tier selection process, where Yash competed through college, district, university, and state elimination rounds.',
    tag: 'Multi-Tier Victory',
  },
  {
    id: 'news-5',
    image: news5,
    headline: 'महाविद्यालयाकडून गौरव व सत्कार समारंभ',
    publication: 'Campus & Press Dispatch',
    description: 'Recognition ceremony at PRMITR Badnera honoring the historic state podium finish and University Color Coat award.',
    tag: 'Felicitation',
  },
];

export const AavishkarPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [modalImg, setModalImg] = useState<{ src: string; alt: string; caption?: string } | null>(null);
  const [activeNewsIdx, setActiveNewsIdx] = useState(0);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    const page = pageRef.current;
    if (!page) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const nodes = page.querySelectorAll('.timeline-node');
      const cards = page.querySelectorAll('.timeline-card');
      const sections = page.querySelectorAll('.reveal-section');

      if (reducedMotion) {
        gsap.set([...nodes, ...cards, ...sections], { opacity: 1, y: 0 });
        return;
      }

      // Vertical line scroll progress animation
      const line = page.querySelector('.timeline-line-fill');
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 65%',
              end: 'bottom 80%',
              scrub: 0.5,
            },
          }
        );
      }

      // Timeline nodes pop in
      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.8)',
            scrollTrigger: { trigger: node, start: 'top 82%' },
          }
        );
      });

      // Cards slide in alternatively
      cards.forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          { opacity: 0, x: fromLeft ? -45 : 45 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        );
      });

      // Reveal generic sections
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 88%' },
          }
        );
      });
    }, page);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalImg(null);
    };
    document.title = 'Aavishkar State Journey — Yash Lawankar | Maharashtra State Runner-Up';

    return () => {
      document.title = 'Yash Lawankar — Software Development Engineer | Java, Spring Boot, DSA';
      window.removeEventListener('keydown', onKey);
      ctx.revert();
    };
  }, []);

  return (
    <div ref= { pageRef } className = "min-h-screen bg-black text-[#E8EAF0] selection:bg-[#D9A441]/20 selection:text-white overflow-x-hidden max-w-[100vw]" >
      {/* Film grain overlay */ }
      < div
  className = "fixed inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />

  {/* ━━━ TOP NAV BAR ━━━ */ }
      <nav className="sticky top-0 z-40 w-full px-5 sm:px-10 lg:px-16 py-3.5 backdrop-blur-md bg-black/75 border-b border-white/[0.06] flex items-center justify-between">
        <Link
          to="/"
          onClick={() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          }}
          className="inline-flex items-center gap-2 text-xs font-mono text-white/50 hover:text-[#D9A441] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </Link>

      <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono text-white/40">
        <a href="#tournament" onClick={(e) => handleAnchorClick(e, 'tournament')} className="hover:text-white transition-colors">Format</a>
        <span className="text-white/15">•</span>
        <a href="#timeline" onClick={(e) => handleAnchorClick(e, 'timeline')} className="hover:text-white transition-colors">Timeline</a>
        <span className="text-white/15">•</span>
        <a href="#press" onClick={(e) => handleAnchorClick(e, 'press')} className="hover:text-white transition-colors">Newspaper Coverage</a>
        <span className="text-white/15">•</span>
        <a href="#project" onClick={(e) => handleAnchorClick(e, 'project')} className="hover:text-white transition-colors">Flora Vision AI</a>
        <span className="text-white/15">•</span>
        <a href="#teammate" onClick={(e) => handleAnchorClick(e, 'teammate')} className="hover:text-white transition-colors">Gauri Garole</a>
      </div>

                          < div className = "flex items-center gap-2" >
                            <span className="w-2 h-2 rounded-full bg-[#D9A441] shadow-[0_0_8px_#D9A441]" />
                              <span className="text-[11px] font-mono text-[#D9A441] font-semibold" > State Runner - Up </span>
                                </div>
                                </nav>

{/* ━━━ HERO HEADER ━━━ */ }
      {/* ━━━ HERO HEADER ━━━ */}
      <header className="relative z-10 w-full px-6 sm:px-10 lg:px-20 pt-12 sm:pt-16 pb-20 border-b border-white/[0.06] overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 right-1/4 w-[450px] h-[350px] bg-[#D9A441]/[0.05] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[350px] h-[250px] bg-[#4C7EFF]/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading, intro, metrics */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/10 border border-[#D9A441]/30 mb-6 self-start">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
              <span className="text-[11px] font-mono tracking-widest text-[#D9A441] uppercase font-semibold">
                The Complete Aavishkar Journey
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
              Winners Compete <br />
              With Winners <span className="text-[#D9A441]">.</span>
            </h1>

            <p className="text-base sm:text-xl text-white/70 font-sans mt-6 leading-relaxed max-w-2xl">
              From the college laboratory at PRMITR Badnera to the grand stage at DBATU Lonere — surviving 4 elimination tiers and 47 university champions to claim <span className="text-white font-semibold">State Runner-Up in Maharashtra</span>.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <a
                href="https://drive.google.com/file/d/13WUYGxPct7PhA6W_8Sl8TqGqQQwUKz9D/view"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D9A441] hover:bg-[#e4b356] text-black font-mono font-bold text-xs transition-all shadow-[0_0_20px_rgba(217,164,65,0.3)] hover:scale-[1.02]"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>Watch Project Video Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="#project"
                onClick={(e) => handleAnchorClick(e, 'project')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#D9A441]/50 text-white font-mono text-xs transition-all"
              >
                <Leaf className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>Explore Flora Vision AI</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-10">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Elimination Stages</span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 block">4 Rounds</span>
                <span className="text-[11px] font-mono text-[#D9A441] mt-0.5 block">College to State</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">State Convention</span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 block">47 Teams</span>
                <span className="text-[11px] font-mono text-white/50 mt-0.5 block">All University Winners</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Poster Elimination</span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 block">Top 8</span>
                <span className="text-[11px] font-mono text-[#D9A441] mt-0.5 block">Selected for Podium</span>
              </div>
              <div className="p-4 rounded-xl bg-[#D9A441]/[0.06] border border-[#D9A441]/30">
                <span className="text-[10px] font-mono text-[#D9A441] uppercase tracking-widest block">Final Standing</span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 block">Achieve Top 8 </span>
                <span className="text-[11px] font-mono text-[#D9A441] mt-0.5 block">Runner-Up in Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Newspaper Cutting */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center mt-6 lg:mt-0">
            <div className="relative w-full max-w-md group">
              {/* Glow ambient behind the card */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#D9A441]/25 via-[#D9A441]/10 to-[#4C7EFF]/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Newspaper cutting card container */}
              <div
                onClick={() =>
                  setModalImg({
                    src: news1,
                    alt: 'राज्यस्तरीय आविष्कार स्पर्धेत यश लवणकर यांची निवड',
                    caption: 'Tarun Bharat · संत गाडगे बाबा अमरावती विद्यापीठातर्फे (SGBAU) राज्यस्तरीय आविष्कार स्पर्धेसाठी निवड.',
                  })
                }
                className="relative rounded-2xl bg-[#0c0d12] border border-white/15 p-4 sm:p-5 shadow-2xl cursor-pointer transition-all duration-500 hover:border-[#D9A441]/70 hover:scale-[1.02] hover:-rotate-1"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-[#D9A441]/10 text-[#D9A441] border border-[#D9A441]/30">
                      <Newspaper className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <span className="text-xs font-mono font-bold text-white tracking-wide block">
                        Tarun Bharat
                      </span>
                      <span className="text-[10px] font-mono text-[#D9A441] block">
                        Leading Marathi Daily
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium text-[#D9A441] bg-[#D9A441]/10 border border-[#D9A441]/30">
                    Press Spotlight
                  </span>
                </div>

                {/* Newspaper Image with Click to Zoom */}
                <div className="relative rounded-xl overflow-hidden bg-black border border-white/10 aspect-[4/3] flex items-center justify-center group/img">
                  <img
                    src={news1}
                    alt="राज्यस्तरीय आविष्कार स्पर्धेत यश लवणकर यांची निवड - Tarun Bharat"
                    className="w-full h-full object-cover object-top filter brightness-[0.92] contrast-[1.05] group-hover/img:scale-105 group-hover/img:brightness-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Hover Inspect badge */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-white/20 text-[#D9A441] text-[10px] font-mono flex items-center gap-1.5 shadow-lg group-hover:border-[#D9A441]/50 transition-colors">
                    <ZoomIn className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>View Clipping</span>
                  </div>
                </div>

                {/* Headline & Description */}
                <div className="mt-3.5">
                  <h3 className="font-display text-sm sm:text-base font-bold text-white tracking-tight leading-snug line-clamp-2">
                    राज्यस्तरीय आविष्कार स्पर्धेत यश लवणकर यांची निवड
                  </h3>
                  <p className="text-xs text-white/50 font-sans mt-1 leading-relaxed line-clamp-2">
                    संत गाडगे बाबा अमरावती विद्यापीठातर्फे (SGBAU) राज्यस्तरीय आंतरविद्यापीठ संशोधन स्पर्धेसाठी निवड.
                  </p>

                  {/* Footer link to jump to all press clippings */}
                  <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-white/35">CLICK TO ENLARGE</span>
                    <a
                      href="#press"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAnchorClick(e, 'press');
                      }}
                      className="text-[11px] font-mono text-[#D9A441] hover:text-[#e4b356] transition-colors flex items-center gap-1 group/btn"
                    >
                      <span>All 5 Clippings</span>
                      <span className="group-hover/btn:translate-x-0.5 transition-transform">↓</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

{/* ━━━ HOW AAVISHKAR WORKS — TOURNAMENT FORMAT ━━━ */ }
<section id="tournament" className = "relative z-10 px-6 sm:px-10 lg:px-20 py-16 sm:py-20 border-b border-white/[0.06] bg-[#07090e]" >
  <div className="max-w-4xl mx-auto reveal-section" >
    <div className="flex items-center gap-2 mb-3" >
      <Layers className="w-4 h-4 text-[#D9A441]" />
        <span className="text-[11px] font-mono tracking-widest text-[#D9A441] uppercase" > The Competition Structure </span>
          </div>

          < h2 className = "font-display text-2xl sm:text-3xl font-bold text-white tracking-tight" >
            How Aavishkar Actually Works: The Brutal Funnel
              </h2>

              < p className = "text-sm sm:text-base text-white/60 font-sans mt-3 leading-relaxed" >
                Aavishkar is not an open symposium where anyone can register.It is Maharashtra’s official state inter - university research championship governed by the Governor’s Secretariat.At every step, you < strong className = "text-white" > only face the winners of the previous tier </strong>:
                  </p>

                  < div className = "grid grid-cols-1 md:grid-cols-4 gap-3 mt-8" >
                    <div className="p-4 rounded-xl bg-black border border-white/[0.08] relative" >
                      <span className="text-[10px] font-mono text-[#D9A441] block mb-1" > STAGE 1 </span>
                        < h4 className = "font-display text-base font-bold text-white" > College Round </h4>
                          < p className = "text-xs text-white/50 mt-2" >
                            Compete against teams inside your own engineering college.Only the < strong className = "text-white" > 1st prize winner </strong> advances to district representation.
                              </p>
                              </div>

                              < div className = "p-4 rounded-xl bg-black border border-white/[0.08] relative" >
                                <span className="text-[10px] font-mono text-[#D9A441] block mb-1" > STAGE 2 </span>
                                  < h4 className = "font-display text-base font-bold text-white" > District Round </h4>
                                    < p className = "text-xs text-white/50 mt-2" >
                                      All college winners from across the entire district clash.Only the single district winner advances to the university round.
              </p>
                                        </div>

                                        < div className = "p-4 rounded-xl bg-black border border-white/[0.08] relative" >
                                          <span className="text-[10px] font-mono text-[#D9A441] block mb-1" > STAGE 3 </span>
                                            < h4 className = "font-display text-base font-bold text-white" > University Round </h4>
                                              < p className = "text-xs text-white/50 mt-2" >
                                                Every district’s champions across SGBAU compete.Winner earns the coveted university representation to the 7 - day State Convention.
              </p>
                                                  </div>

                                                  < div className = "p-4 rounded-xl bg-[#D9A441]/[0.08] border border-[#D9A441]/40 relative shadow-[0_0_25px_rgba(217,164,65,0.08)]" >
                                                    <span className="text-[10px] font-mono text-[#D9A441] block mb-1" > STAGE 4 </span>
                                                      < h4 className = "font-display text-base font-bold text-white" > State Finals(DBATU) </h4>
                  <p className="text-xs text-white/60 mt-2">
                    47 University Champions from all of Maharashtra. <strong>Poster Round</strong> slashes 47 down to 8. <strong>Podium Round</strong> decides the State Runner-Up and Winner.
                  </p>
                                                            </div>
                                                            </div>
                                                            </div>
                                                            </section>

{/* ━━━ VERTICAL TIMELINE ━━━ */ }
<section id="timeline" ref = { timelineRef } className = "relative z-10 px-6 sm:px-10 lg:px-20 py-16 sm:py-24" >
  {/* Vertical connecting line */ }
  < div className = "absolute left-[29px] sm:left-[39px] lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-[2px] bg-white/[0.06]" >
    <div className="timeline-line-fill absolute inset-0 bg-gradient-to-b from-[#D9A441] via-[#D9A441] to-[#C0C0C0] origin-top" />
      </div>

      < div className = "relative max-w-5xl mx-auto space-y-16 sm:space-y-24" >
      {
        STAGES.map((stage, i) => {
          const isLeft = i % 2 === 0;
          const isClimax = stage.id === 'state-final';

          return (
            <div
                key= { stage.id }
          className = {`relative flex flex-col lg:flex-row items-start gap-6 lg:gap-12 ${!isLeft ? 'lg:flex-row-reverse' : ''
            }`
        }
              >
          {/* Timeline node */ }
          < div
                  className = {`timeline-node absolute left-[20px] sm:left-[30px] lg:left-1/2 lg:-translate-x-1/2 z-20 flex items-center justify-center w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] rounded-full border-2 ${stage.resultType === 'gold'
              ? 'border-[#D9A441] bg-[#D9A441]/20 shadow-[0_0_15px_rgba(217,164,65,0.4)]'
              : 'border-[#C0C0C0] bg-[#C0C0C0]/20 shadow-[0_0_15px_rgba(192,192,192,0.4)]'
            }`}
        >
        <div
                    className={
  `w-2 h-2 rounded-full ${stage.resultType === 'gold' ? 'bg-[#D9A441]' : 'bg-[#C0C0C0]'
  }`
}
                  />
  </div>

{/* Timeline Card */ }
<div
                  className={
  `timeline-card ml-14 sm:ml-16 lg:ml-0 lg:w-[calc(50%-40px)] ${isLeft ? 'lg:pr-0' : 'lg:pl-0'
  }`
}
                >
  <div
                    className={
  `relative rounded-2xl border overflow-hidden transition-all duration-300 ${isClimax
    ? 'border-[#C0C0C0]/40 bg-[#0e1018] shadow-[0_0_40px_rgba(192,192,192,0.12)]'
    : 'border-white/[0.08] bg-[#0a0a0c] hover:border-white/20'
  }`
}
                  >
  {/* Top gradient highlight */ }
  < div
className = {`h-[2px] w-full ${isClimax
    ? 'bg-gradient-to-r from-transparent via-[#C0C0C0] to-transparent'
    : 'bg-gradient-to-r from-transparent via-[#D9A441]/70 to-transparent'
  }`}
                    />

{/* Stage Header Info */ }
<div className="px-5 sm:px-6 pt-5 pb-3 flex items-center justify-between border-b border-white/[0.05]" >
  <div className="flex items-center gap-2" >
    <span
                          className={
  `text-[10px] font-mono tracking-widest uppercase font-semibold ${stage.resultType === 'gold' ? 'text-[#D9A441]' : 'text-[#C0C0C0]'
  }`
}
                        >
  { stage.stageBadge } · { stage.level }
</span>
  </div>
  < div className = "flex items-center gap-1.5 text-[11px] font-mono text-white/40" >
    <MapPin className="w-3 h-3 text-[#D9A441]" />
      <span className="truncate max-w-[130px]" > { stage.location } </span>
        </div>
        </div>

{/* Title & Result Badge */ }
<div className="px-5 sm:px-6 pt-4 pb-3" >
  <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight leading-snug" >
    { stage.title }
    </h3>

    < div className = "flex flex-wrap items-center gap-2 mt-2.5" >
      <span
                          className={
  `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold ${isClimax
    ? 'text-white bg-gradient-to-r from-[#C0C0C0]/20 to-[#A0A0A0]/10 border border-[#C0C0C0]/40 shadow-[0_0_20px_rgba(192,192,192,0.2)]'
    : 'text-[#D9A441] bg-[#D9A441]/10 border border-[#D9A441]/30'
  }`
}
                        >
  { stage.result }
  </span>

{
  stage.teammateNote && (
    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-white/50 bg-white/[0.04] px-2.5 py-1 rounded border border-white/[0.05]" >
      <Users className="w-3 h-3 text-[#D9A441]" />
        { stage.teammateNote }
        </span>
                        )
}
</div>
  </div>

{/* Image with zoom action */ }
<div
                      className="mx-4 sm:mx-5 mb-4 rounded-xl overflow-hidden border border-white/[0.06] cursor-pointer group/img relative bg-black"
onClick = {() => setModalImg({ src: stage.image, alt: stage.title, caption: stage.takeaway })}
                    >
  <img
                        src={ stage.image }
alt = { stage.title }
className = "w-full h-48 sm:h-56 object-cover brightness-[0.88] group-hover/img:brightness-100 group-hover/img:scale-[1.02] transition-all duration-500"
loading = "lazy"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
    <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 text-[#D9A441] text-[10px] font-mono flex items-center gap-1 shadow-lg" >
      <Maximize2 className="w-3 h-3" />
        <span>Inspect Photo </span>
          </div>
          </div>

{/* Story description */ }
<div className="px-5 sm:px-6 pb-4" >
  <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed" >
    { stage.story }
    </p>
    </div>

{/* Takeaway footer */ }
<div className="px-5 sm:px-6 py-2.5 bg-white/[0.02] border-t border-white/[0.05] flex items-center gap-2 text-[11px] font-mono text-[#D9A441]/80" >
  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-[#D9A441]" />
    <span>{ stage.takeaway } </span>
    </div>
    </div>
    </div>
    </div>
            );
          })}
</div>
  </section>

{/* ━━━ NEWSPAPER & MEDIA COVERAGE SECTION ━━━ */ }
<section id="press" className = "relative z-10 px-6 sm:px-10 lg:px-20 py-16 sm:py-24 border-t border-b border-white/[0.06] bg-[#07080c]" >
  <div className="max-w-5xl mx-auto reveal-section" >
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10" >
      <div>
      <div className="flex items-center gap-2 mb-2" >
        <Newspaper className="w-4 h-4 text-[#D9A441]" />
          <span className="text-[11px] font-mono tracking-widest text-[#D9A441] uppercase" > Regional & State Press </span>
            </div>
            < h2 className = "font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight" >
              Newspaper Clippings < span className = "text-[#D9A441]" >.</span>
                </h2>
                <p className="text-sm text-white/50 font-sans mt-2 max-w-xl">
                  Featured across leading Marathi dailies including <em>Tarun Bharat</em>, <em>Dainik Pudhari</em>, and regional state presses celebrating the state podium win and agricultural AI research.
                </p>
                    </div>

{/* Quick selector tabs */ }
<div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08]" >
{
  NEWS_CLIPPINGS.map((clip, idx) => (
    <button
                  key= { clip.id }
                  onClick = {() => setActiveNewsIdx(idx)}
className = {`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${activeNewsIdx === idx
    ? 'bg-[#D9A441] text-black font-bold shadow-[0_0_12px_rgba(217,164,65,0.4)]'
    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
  }`}
                >
  Clip 0{ idx + 1 }
</button>
              ))}
</div>
  </div>

{/* Featured newspaper spotlight viewer */ }
<div className="rounded-2xl border border-white/[0.08] bg-[#0d0e14] overflow-hidden p-5 sm:p-7 shadow-2xl" >
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center" >
    {/* Newspaper Image with click-to-zoom */ }
    < div
className = "lg:col-span-7 relative rounded-xl overflow-hidden border border-white/[0.08] bg-black group/news cursor-pointer max-h-[460px] flex items-center justify-center"
onClick = {() =>
setModalImg({
  src: NEWS_CLIPPINGS[activeNewsIdx].image,
  alt: NEWS_CLIPPINGS[activeNewsIdx].headline,
  caption: `${NEWS_CLIPPINGS[activeNewsIdx].publication} · ${NEWS_CLIPPINGS[activeNewsIdx].description}`,
})
                }
              >
  <img
                  src={ NEWS_CLIPPINGS[activeNewsIdx].image }
alt = { NEWS_CLIPPINGS[activeNewsIdx].headline }
className = "w-full h-full max-h-[440px] object-contain object-center group-hover/news:scale-[1.02] transition-transform duration-500"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/news:opacity-100 transition-opacity flex items-end justify-between p-4" >
    <span className="text-xs font-mono text-white/80" > Click to view full high - res cutting </span>
      < div className = "p-2 rounded-lg bg-[#D9A441] text-black" >
        <ZoomIn className="w-4 h-4" />
          </div>
          </div>
          </div>

{/* Newspaper Details */ }
<div className="lg:col-span-5 flex flex-col justify-between" >
  <div>
  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#D9A441]/10 border border-[#D9A441]/30 text-[#D9A441] text-[10px] font-mono uppercase tracking-wider mb-3" >
    <Sparkles className="w-3 h-3" />
      { NEWS_CLIPPINGS[activeNewsIdx].tag }
      </div>

      < span className = "text-xs font-mono text-white/40 block mb-1" >
        Publication: <strong className="text-white font-sans" > { NEWS_CLIPPINGS[activeNewsIdx].publication } </strong>
          </span>

          < h3 className = "font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mt-2" >
            { NEWS_CLIPPINGS[activeNewsIdx].headline }
            </h3>

            < p className = "text-sm text-white/60 font-sans mt-4 leading-relaxed" >
              { NEWS_CLIPPINGS[activeNewsIdx].description }
              </p>
              </div>

              < div className = "mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between" >
                <button
                    onClick={
  () =>
    setModalImg({
      src: NEWS_CLIPPINGS[activeNewsIdx].image,
      alt: NEWS_CLIPPINGS[activeNewsIdx].headline,
      caption: `${NEWS_CLIPPINGS[activeNewsIdx].publication} · ${NEWS_CLIPPINGS[activeNewsIdx].description}`,
    })
}
className = "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-mono transition-all border border-white/10"
  >
  <Maximize2 className="w-3.5 h-3.5 text-[#D9A441]" />
    <span>Expand Article </span>
      </button>

      < span className = "text-xs font-mono text-white/30" >
        0{ activeNewsIdx + 1 } / 0{NEWS_CLIPPINGS.length}
          </span>
          </div>
          </div>
          </div>
          </div>

{/* Thumbnail strip of all 5 news cuttings */ }
<div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4" >
{
  NEWS_CLIPPINGS.map((clip, idx) => (
    <div
                key= { clip.id }
                onClick = {() => setActiveNewsIdx(idx)}
className = {`group/thumb relative rounded-xl overflow-hidden border p-1 cursor-pointer transition-all ${activeNewsIdx === idx
    ? 'border-[#D9A441] bg-[#D9A441]/10 scale-[1.02] shadow-[0_0_15px_rgba(217,164,65,0.25)]'
    : 'border-white/[0.06] bg-black/60 hover:border-white/20'
  }`}
              >
  <div className="h-20 w-full overflow-hidden rounded-lg bg-black" >
    <img
                    src={ clip.image }
alt = { clip.publication }
className = "w-full h-full object-cover object-top opacity-75 group-hover/thumb:opacity-100 transition-opacity"
  />
  </div>
  < div className = "pt-2 px-1 pb-1" >
    <span className="text-[10px] font-mono text-white/40 block truncate" > { clip.publication } </span>
      < span className = "text-[11px] font-sans font-semibold text-white/90 truncate block" > { clip.tag } </span>
        </div>
        </div>
            ))}
</div>
  </div>
  </section>

{/* ━━━ STATE LEVEL PHOTO GALLERY ━━━ */ }
<section className="relative z-10 px-6 sm:px-10 lg:px-20 py-16 sm:py-20 bg-black" >
  <div className="reveal-section max-w-5xl mx-auto" >
    <div className="flex items-center gap-2 mb-6" >
      <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441]" />
        <span className="text-[11px] font-mono tracking-widest text-[#D9A441] uppercase" >
          Photo Archive — State Finals & Honors
            </span>
            </div>

            < div className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" >
            {
              [
              { src: stateLevel1, alt: 'At Maharashtra State Aavishkar Convention — DBATU Lonere', caption: 'Representing SGBAU at the 7-day State Convention in Konkan' },
              { src: statePresentation, alt: 'State Level Podium Presentation', caption: 'Final podium presentation before state jury and vice-chancellors' },
              { src: aavishkarTrophy, alt: 'Aavishkar Trophy & Certificate', caption: 'The official state trophy brought back home to PRMITR Badnera' },
              { src: colorCoatPic, alt: 'University Color Coat Holder Honor', caption: 'Awarded the prestigious SGBAU University Color Coat for State Podium Achievement' },
              { src: districtPic, alt: 'District Level Aavishkar Winner', caption: 'Winner among all engineering colleges across Amravati District' },
              { src: collegePic, alt: 'PRMITR College Level Aavishkar', caption: 'Where the journey started: 1st prize at PRMITR college round' },
            ].map((img, i) => (
                <div
                key= { i }
                className = "relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0c0d12] cursor-pointer group/g"
                onClick = {() => setModalImg({ src: img.src, alt: img.alt, caption: img.caption })}
              >
              <div className="h-52 w-full overflow-hidden" >
                <img
                    src={ img.src }
alt = { img.alt }
className = "w-full h-full object-cover brightness-[0.88] group-hover/g:brightness-100 group-hover/g:scale-[1.03] transition-all duration-500"
loading = "lazy"
  />
  </div>
  < div className = "p-3 border-t border-white/[0.06] bg-[#08090d]" >
    <p className="text-xs font-sans font-semibold text-white truncate" > { img.alt } </p>
      < p className = "text-[11px] font-mono text-white/40 truncate mt-0.5" > { img.caption } </p>
        </div>
        < div className = "absolute top-2.5 right-2.5 opacity-0 group-hover/g:opacity-100 transition-opacity bg-black/80 backdrop-blur-md p-1.5 rounded-lg border border-white/15 text-white/80" >
          <Maximize2 className="w-3.5 h-3.5" />
            </div>
            </div>
            ))}
</div>
  </div>
  </section>

      {/* ━━━ FLORA VISION AI — SYSTEM ARCHITECTURE & RESEARCH ━━━ */}
      <section id="project" className="relative z-10 px-6 sm:px-10 lg:px-20 py-16 sm:py-20 border-t border-white/[0.08] bg-black">
        <div className="reveal-section max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/10 border border-[#D9A441]/25 text-[#D9A441] text-[11px] font-mono tracking-widest uppercase font-semibold mb-3">
                <Leaf className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>State Innovation · Research Project</span>
              </div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  Flora Vision AI
                </h2>
                <span className="text-xs sm:text-sm font-mono text-white/40">
                  (also known as Eco Vision AI)
                </span>
              </div>
              <p className="text-sm sm:text-base text-white/70 font-sans mt-3 max-w-2xl leading-relaxed">
                An intelligent agricultural assistant empowering farmers with real-time leaf disease detection, Gemini 2.5 Flash multimodal verification, agronomic chatbot advisory, and localized weather insights.
              </p>
            </div>

            {/* Actions: Video Demo + GitHub */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://drive.google.com/file/d/13WUYGxPct7PhA6W_8Sl8TqGqQQwUKz9D/view"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D9A441] hover:bg-[#e4b356] text-black font-mono font-bold text-xs transition-all shadow-[0_0_20px_rgba(217,164,65,0.3)] hover:scale-[1.02]"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>Watch Video Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/devloperYash/Flora-Vision-Ai"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#D9A441]/50 text-white font-mono text-xs transition-all"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white/80">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-white/40" />
              </a>
            </div>
          </div>

          {/* Pipeline Flow Strip */}
          <div className="mt-8 py-5 px-5 sm:px-6 rounded-2xl bg-[#09090b] border border-white/[0.08]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
              <span className="text-[10px] font-mono tracking-widest text-[#D9A441] uppercase font-semibold">
                Inference &amp; Diagnostic Pipeline
              </span>
              <span className="text-[10px] font-mono text-white/30 hidden sm:inline">
                End-to-End Execution Flow
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { num: '01', title: 'Leaf Image Upload', detail: 'Farmer captures leaf via Streamlit UI or field camera' },
                { num: '02', title: 'TensorFlow CNN', detail: 'Custom deep neural net classifies species & flags disease' },
                { num: '03', title: 'Gemini 2.5 Flash', detail: 'Multimodal AI cross-verifies symptoms & generates cure' },
                { num: '04', title: 'Voice & Advisory', detail: 'Interactive Flora chatbot reads aloud via pyttsx3 TTS' },
              ].map((step) => (
                <div key={step.num} className="relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-[#D9A441]">{step.num}</span>
                      <span className="text-xs font-semibold text-white tracking-tight">{step.title}</span>
                    </div>
                    <p className="text-[11px] text-white/50 font-sans leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2-Column Bento Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            {/* Left 7 Columns: Core Capabilities */}
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#D9A441] uppercase font-semibold block mb-2">
                Core Capabilities
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-[#08080a] border border-white/[0.07] hover:border-[#D9A441]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span className="text-xs font-mono font-bold text-white">Plant Disease Detection</span>
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed font-sans">
                    Custom-trained TensorFlow/Keras neural model predicts pathological anomalies from leaf image uploads in real time.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#08080a] border border-white/[0.07] hover:border-[#D9A441]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span className="text-xs font-mono font-bold text-white">Gemini 2.5 Flash</span>
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed font-sans">
                    Multimodal generative AI validates image fidelity, double-checks pathology, and generates actionable treatment plans.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#08080a] border border-white/[0.07] hover:border-[#D9A441]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Bot className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span className="text-xs font-mono font-bold text-white">Chat with Flora</span>
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed font-sans">
                    Specialized agricultural AI chatbot answering follow-ups on botanical care, pesticide dosages, and preventive measures.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#08080a] border border-white/[0.07] hover:border-[#D9A441]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CloudSun className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span className="text-xs font-mono font-bold text-white">Real-Time Weather</span>
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed font-sans">
                    Location-aware climate analytics via Geocoder to assist farmers in timing irrigation, fertilization, and harvesting.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#08080a] border border-white/[0.07] hover:border-[#D9A441]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Leaf className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span className="text-xs font-mono font-bold text-white">Soil &amp; Crop Advisory</span>
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed font-sans">
                    Intelligent recommendations tailored to specific regional soil types, microclimates, and agricultural zones.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#08080a] border border-white/[0.07] hover:border-[#D9A441]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span className="text-xs font-mono font-bold text-white">Offline TTS Engine</span>
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed font-sans">
                    Built-in pyttsx3 text-to-speech reads out diagnoses and advice aloud, ensuring complete accessibility directly in the fields.
                  </p>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Video Showcase & Tech Specs */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              {/* Video Showcase Card */}
              <div className="p-5 rounded-2xl bg-[#09090c] border border-white/[0.08] relative overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D9A441]/50 to-transparent" />
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/[0.06]">
                  <span className="text-[10px] font-mono text-[#D9A441] uppercase tracking-wider font-semibold">
                    Live Video Walkthrough
                  </span>
                  <span className="text-[10px] font-mono text-white/30">Google Drive HD</span>
                </div>

                <p className="text-xs text-white/70 font-sans leading-relaxed mb-4">
                  Full demonstration of leaf disease diagnosis, Gemini AI multimodal reasoning, live chatbot consultation, and audio synthesis.
                </p>

                <a
                  href="https://drive.google.com/file/d/13WUYGxPct7PhA6W_8Sl8TqGqQQwUKz9D/view"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#D9A441] hover:bg-[#e4b356] text-black font-mono font-bold text-xs transition-all shadow-[0_0_20px_rgba(217,164,65,0.25)] hover:scale-[1.01]"
                >
                  <Play className="w-4 h-4 fill-black" />
                  <span>Open Video Demonstration</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Technical Stack Specifications */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#08080a] border border-white/[0.08]">
                <span className="text-[10px] font-mono tracking-widest text-[#D9A441] uppercase font-semibold block mb-3">
                  Technical Specifications
                </span>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-white/40">Frontend UI</span>
                    <span className="text-white font-semibold">Streamlit · Custom CSS</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-white/40">Machine Learning</span>
                    <span className="text-white font-semibold">TensorFlow · Keras</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-white/40">Generative AI</span>
                    <span className="text-white font-semibold">Google Gemini 2.5 Flash</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-white/40">Libraries &amp; Audio</span>
                    <span className="text-white font-semibold">OpenCV · pyttsx3 · Geocoder</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ GAURI GAROLE — TEAMMATE & BEST FRIEND TRIBUTE ━━━ */}
      <section id="teammate" className="relative z-10 px-6 sm:px-10 lg:px-20 py-16 sm:py-24 bg-black border-t border-white/[0.08]">
        <div className="reveal-section max-w-5xl mx-auto">
          {/* Header Tag */}
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#D9A441]/20 text-[#D9A441]" />
            <span className="text-[11px] font-mono tracking-widest text-[#D9A441] uppercase font-semibold">
              The Person Behind It All
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Behind Every Great Project is an Unstoppable Team<span className="text-[#D9A441]">.</span>
          </h2>

          {/* Two-Column Editorial Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 items-start">
            {/* Left 4-5 Columns: Profile & Honors */}
            <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-[#09090b] border border-white/[0.08]">
              <div className="flex items-center gap-4">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-neutral-950 border border-[#D9A441]/30 flex items-center justify-center font-display font-bold text-lg sm:text-xl text-[#D9A441] shrink-0 shadow-lg">
                  GG
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white tracking-tight">
                    Gauri Garole
                  </h3>
                  <p className="text-xs text-white/50 font-sans mt-0.5">
                    Teammate · PPT Expert · Developer
                  </p>
                </div>
              </div>

              {/* LinkedIn Button */}
              <a
                href="https://www.linkedin.com/in/gauri-garole-a96411256/"
                target="_blank"
                rel="noreferrer"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-[#0077B5]/20 border border-white/10 hover:border-[#0077B5]/60 text-white text-xs font-mono transition-all duration-300 shadow-md group"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#0077B5] group-hover:scale-110 transition-transform">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>Connect on LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-white transition-colors" />
              </a>

              {/* Track Record List */}
              <div className="mt-6 pt-5 border-t border-white/[0.06] space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D9A441] block mb-2 font-semibold">
                  Shared Track Record
                </span>
                <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
                  <span>4× Inter-College Project Expo Wins</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
                  <span>2× National Level Hackathons</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
                  <span>SGBAU University Champions</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-white/40 pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 ml-1 mr-1" />
                  <span>PRMITR CSE · 2024–2025</span>
                </div>
              </div>
            </div>

            {/* Right 7-8 Columns: Quote & Narrative */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              {/* Gold border quote */}
              <div className="border-l-2 border-[#D9A441] pl-5 sm:pl-6 py-1">
                <blockquote className="font-display text-lg sm:text-xl font-medium text-white leading-relaxed italic">
                  “I took part in Aavishkar because of one person — <span className="text-[#D9A441] not-italic font-semibold">Gauri Garole, my best friend</span>. The competition rules permitted a maximum team size of two, and she was the reason we entered and pushed each other every step of the way.”
                </blockquote>
              </div>

              {/* Personal Story paragraphs */}
              <div className="mt-6 space-y-4 text-sm sm:text-base text-white/70 font-sans leading-relaxed">
                <p>
                  Gauri was with me as my official teammate up to the Aavishkar but after this also we won <strong className="text-white font-semibold">4 project expo and 2 National level hackathon</strong>. We competed side-by-side winning the College Level, winning the District Level, and triumphing at the SGBAU University Level Championship.
                </p>
                <p>
                  She poured her heart into the project — designing every presentation deck with world-class narrative clarity, crafting the original handmade poster that later earned our spot at state, and assisting relentlessly during preparation and technical testing.
                </p>
                <p>
                  Her design instincts, fierce encouragement, and dedication laid the absolute foundation that allowed Flora Vision AI to reach the Maharashtra State Finals at DBATU. You cannot survive a tournament this brutal alone — and having Gauri as my teammate and best friend made all the difference in the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ MINIMAL FOOTER ━━━ */}
      <footer className="relative z-10 w-full bg-black border-t border-white/[0.08] text-white py-8 sm:py-10 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand & Minimal Back Button */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="font-display font-black text-lg tracking-tight text-white">
              YL<span className="text-[#D9A441]">.</span>
            </span>

            <span className="text-white/20 hidden sm:inline">•</span>

            <Link
              to="/"
              onClick={() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-[#D9A441] text-white/80 hover:text-black border border-white/10 hover:border-[#D9A441] font-mono text-xs transition-all group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Portfolio</span>
            </Link>

            <span className="text-white/20 hidden md:inline">•</span>

            <span className="text-xs font-mono text-white/40 hidden md:inline">
              © {new Date().getFullYear()} Yash Lawankar · Aavishkar State Runner-Up
            </span>
          </div>

          {/* Center: Section Anchor Jump Links */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-white/40">
            <a href="#tournament" onClick={(e) => handleAnchorClick(e, 'tournament')} className="hover:text-[#D9A441] transition-colors">
              Format
            </a>
            <span className="text-white/15">•</span>
            <a href="#timeline" onClick={(e) => handleAnchorClick(e, 'timeline')} className="hover:text-[#D9A441] transition-colors">
              Timeline
            </a>
            <span className="text-white/15">•</span>
            <a href="#press" onClick={(e) => handleAnchorClick(e, 'press')} className="hover:text-[#D9A441] transition-colors">
              Press
            </a>
            <span className="text-white/15">•</span>
            <a href="#project" onClick={(e) => handleAnchorClick(e, 'project')} className="hover:text-[#D9A441] transition-colors">
              Flora Vision AI
            </a>
            <span className="text-white/15">•</span>
            <a href="#teammate" onClick={(e) => handleAnchorClick(e, 'teammate')} className="hover:text-[#D9A441] transition-colors">
              Gauri Garole
            </a>
          </div>

          {/* Right: Social Channels & Back to Top */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
                title="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>

              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-[#4C7EFF] hover:bg-[#4C7EFF]/10 transition-colors"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href={SOCIAL_LINKS.credly}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-[#D9A441] hover:bg-[#D9A441]/10 transition-colors"
                title="Credly"
              >
                <Award className="w-4 h-4" />
              </a>

              <a
                href={SOCIAL_LINKS.kyndle}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-orange-400 hover:bg-orange-500/10 transition-colors"
                title="Kyndle"
              >
                <Briefcase className="w-4 h-4" />
              </a>
            </div>

            <span className="w-px h-4 bg-white/10 mx-1" />

            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-[#D9A441] hover:text-black border border-white/[0.08] hover:border-[#D9A441] flex items-center justify-center text-white/50 transition-all cursor-pointer group"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </footer>

{/* ━━━ LIGHTBOX MODAL ━━━ */ }
{
  modalImg && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          onClick={() => setModalImg(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#0d0d0f] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
              <div>
                <h3 className="font-display text-lg font-bold text-white">{modalImg.alt}</h3>
                {modalImg.caption && (
                  <p className="text-xs text-white/50 font-sans mt-0.5">{modalImg.caption}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setModalImg(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

    < div className = "flex-1 overflow-auto rounded-xl bg-black/90 border border-white/[0.05] p-3 flex items-center justify-center" >
      <img
                src={ modalImg.src }
alt = { modalImg.alt }
className = "max-h-[72vh] w-auto object-contain rounded-lg shadow-2xl"
  />
  </div>

  < div className = "mt-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-white/40" >
    <span>Press ESC or click anywhere outside to close </span>
      < button
onClick = {() => setModalImg(null)}
className = "px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
  >
  Close
  </button>
  </div>
  </div>
  </div>
      )}
</div>
  );
};

export default AavishkarPage;
