import React from 'react';
import { ArrowUp, Award, Briefcase } from 'lucide-react';
import { SOCIAL_LINKS, SITE_METADATA } from '../constants/links';

/* ─── Social SVGs matching Hero ─── */

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

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 w-full bg-black border-t border-white/[0.08] text-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-10 md:px-14 lg:px-20 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Brand & Year */}
          <div className="flex items-center gap-3">
            <span className="font-display font-black text-lg tracking-tight text-white">
              YL<span className="text-[#D9A441]">.</span>
            </span>
            <span className="text-white/20">•</span>
            <span className="text-xs font-mono text-white/40">
              © {currentYear} {SITE_METADATA.author}
            </span>
          </div>

          {/* Right: Social channels & Back to Top */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
                aria-label="GitHub"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-[#4C7EFF] hover:bg-[#4C7EFF]/10 transition-colors"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>

              <a
                href={SOCIAL_LINKS.credly}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-[#D9A441] hover:bg-[#D9A441]/10 transition-colors"
                aria-label="Credly"
                title="Credly"
              >
                <Award className="w-4 h-4" />
              </a>

              <a
                href={SOCIAL_LINKS.kyndle}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-orange-400 hover:bg-orange-500/10 transition-colors"
                aria-label="Kyndle"
                title="Kyndle"
              >
                <Briefcase className="w-4 h-4" />
              </a>
            </div>

            <span className="w-px h-4 bg-white/10 mx-1" />

            <button
              type="button"
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-[#D9A441] hover:text-black border border-white/[0.08] hover:border-[#D9A441] flex items-center justify-center text-white/50 transition-all cursor-pointer group"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
