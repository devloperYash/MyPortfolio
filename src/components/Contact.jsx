// FILE: src/components/Contact.jsx
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

const socials = [
  { label: 'GitHub', href: 'https://github.com/devloperYash' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yash-lawankar-17a752259/' },
  { label: 'Email', href: 'mailto:yashlawankar@gmail.com' },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 md:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#f472b6] text-xs font-mono tracking-[0.3em] uppercase">05 / Contact</span>
        </motion.div>

        {/* Giant heading */}
        <motion.h2
          className="text-outline font-black tracking-tighter leading-[0.85] select-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 12rem)' }}
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          {"LET'S"}
          <br />
          TALK
        </motion.h2>

        {/* Email — magnetic reveal */}
        <motion.div
          className="mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-white/20 text-xs font-mono tracking-[0.3em] uppercase mb-4">Drop a line</p>
          <MagneticButton
            as="a"
            href="mailto:yashlawankar@gmail.com"
            className="inline-block text-2xl md:text-4xl font-light text-white/80 hover:text-white transition-colors duration-300 underline-draw tracking-tight"
          >
            yashlawankar@gmail.com
          </MagneticButton>
        </motion.div>


        {/* Social links */}
        <motion.div
          className="mt-16 md:mt-20 flex flex-wrap gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {socials.map((social) => (
            <MagneticButton
              key={social.label}
              as="a"
              href={social.href}
              target={social.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-white/30 hover:text-white transition-colors duration-300"
            >
              <span className="text-sm font-medium tracking-wider underline-draw">{social.label}</span>
              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MagneticButton>
          ))}
        </motion.div>

        {/* Availability badge */}
        <motion.div
          className="mt-16 flex items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/20 text-xs font-mono tracking-wider">
            Available for opportunities &middot; Graduating Aug 2026
          </span>
        </motion.div>

        {/* Personal Quote */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="font-mono text-[13px] tracking-wider italic text-white">
            "I didn't come from a tech city. I brought the tech to where I came from."
          </p>
          <p className="font-mono text-[13px] tracking-wider mt-2 text-white">
            — Yash Lawankar
          </p>
        </motion.div>
      </div>
    </section>
  );
}
