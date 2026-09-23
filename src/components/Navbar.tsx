import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  ArrowUpRight,
  Send,
  Award,
  Briefcase,
} from 'lucide-react';
import { SOCIAL_LINKS } from '../constants/links';

/* ─── Social SVGs matching Hero/Footer ─── */

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

interface NavLinkItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
  isRoute?: boolean;
  badge?: string;
}

const NAV_ITEMS: NavLinkItem[] = [
  { id: 'hero', label: 'Overview', href: '#hero' },
  { id: 'about', label: 'About & Skills', href: '#about' },
  { id: 'achievements', label: 'Milestones', href: '#achievements' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'aavishkar', label: 'Aavishkar', href: '/aavishkar', isRoute: true, badge: 'State Story' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track scroll position for navbar styling & active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // ScrollSpy
      const sections = ['hero', 'about', 'achievements', 'projects', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Smooth scroll handler for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setIsMobileOpen(false);
      }
    }
  };

  return (
    <>
      {/* ━━━ MAIN FIXED NAVBAR ━━━ */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3 sm:py-3.5'
            : 'bg-black/40 backdrop-blur-md border-b border-white/[0.03] py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-14 lg:px-20 flex items-center justify-between">
          {/* Brand Logo & Status */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              onClick={(e) => handleAnchorClick(e, '#hero')}
              className="font-display font-black text-xl tracking-tight text-white hover:text-[#D9A441] transition-colors flex items-center gap-1 group"
              aria-label="Yash Lawankar Homepage"
            >
              <span>YL</span>
              <span className="text-[#D9A441] group-hover:scale-125 transition-transform duration-200">.</span>
              <span className="sr-only">Yash Lawankar · Yash Lavankar · Yash Law · Yash Lav</span>
            </a>

        
          </div>

          {/* ━━━ DESKTOP NAVIGATION ━━━ */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;

              if (item.isRoute) {
                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    className="relative px-3.5 py-1.5 rounded-full text-xs font-mono text-white/60 hover:text-white transition-all flex items-center gap-1.5 group"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-[#D9A441]/15 text-[#D9A441] border border-[#D9A441]/30">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              }

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-white/[0.10] font-medium shadow-[0_0_12px_rgba(255,255,255,0.05)]'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-[2px] rounded-full bg-[#D9A441]"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Contact CTA & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Desktop Contact CTA */}
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, '#contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D9A441] hover:bg-[#e4b356] text-black font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_16px_rgba(217,164,65,0.25)] hover:shadow-[0_0_24px_rgba(217,164,65,0.45)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Get in Touch</span>
              <Send className="w-3 h-3" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441]"
              aria-label={isMobileOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? (
                <X className="w-5 h-5 text-[#D9A441]" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ━━━ MOBILE FULLSCREEN MENU DRAWER ━━━ */}
      {isMobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto animate-fade-in"
        >
          {/* Subtle gold glow behind mobile menu */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#D9A441]/[0.05] blur-3xl pointer-events-none" />

          {/* Navigation Links List */}
          <div className="space-y-4 relative z-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-2">
              Navigation
            </span>

            {NAV_ITEMS.map((item, index) => {
              if (item.isRoute) {
                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-between py-3 border-b border-white/[0.06] group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#D9A441]">0{index + 1}</span>
                      <span className="font-display text-2xl font-bold text-white group-hover:text-[#D9A441] transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D9A441]/10 text-[#D9A441] border border-[#D9A441]/30">
                      Deep Dive ↗
                    </span>
                  </Link>
                );
              }

              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className="flex items-center justify-between py-3 border-b border-white/[0.06] group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-white/30">0{index + 1}</span>
                    <span
                      className={`font-display text-2xl font-bold transition-colors ${
                        isActive ? 'text-[#D9A441]' : 'text-white group-hover:text-[#D9A441]'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#D9A441] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              );
            })}

            {/* Mobile Contact Link in List */}
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, '#contact')}
              className="flex items-center justify-between py-3 border-b border-white/[0.06] group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-emerald-400">06</span>
                <span className="font-display text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Contact
                </span>
              </div>
              <Send className="w-4 h-4 text-emerald-400" />
            </a>
          </div>

          {/* Bottom Info & Socials inside Mobile Menu */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] relative z-10 space-y-4">
            {/* Availability status */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono text-white/60">
                Available for SDE Roles · 2026
              </span>
            </div>

            {/* Social Channels Strip */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/70 hover:text-white text-xs font-mono transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4 mb-1" />
                <span className="text-[10px]">GitHub</span>
              </a>

              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#4C7EFF] text-xs font-mono transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4 mb-1" />
                <span className="text-[10px]">LinkedIn</span>
              </a>

              <a
                href={SOCIAL_LINKS.credly}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#D9A441] text-xs font-mono transition-colors"
                aria-label="Credly"
              >
                <Award className="w-4 h-4 mb-1" />
                <span className="text-[10px]">Credly</span>
              </a>

              <a
                href={SOCIAL_LINKS.kyndle}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-orange-400 text-xs font-mono transition-colors"
                aria-label="Kyndle"
              >
                <Briefcase className="w-4 h-4 mb-1" />
                <span className="text-[10px]">Kyndle</span>
              </a>
            </div>

            <p className="text-[10px] font-mono text-white/30 text-center pt-2">
              Yash Lawankar · Computer Science Engineer
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
