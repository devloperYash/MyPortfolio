// FILE: src/components/Contact.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Send, CheckCircle, AlertCircle } from 'lucide-react';
import MagneticButton from './MagneticButton';

const socials = [
  { label: 'GitHub', href: 'https://github.com/devloperYash' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yash-lawankar-17a752259/' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // Replace with your Web3Forms access key
          name: form.name,
          email: form.email,
          message: form.message,
          from_name: 'Portfolio Contact Form',
          subject: `New message from ${form.name} via Portfolio`,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputClasses = "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white/90 placeholder:text-white/20 font-light outline-none focus:border-[#6366f1]/50 transition-colors duration-300";

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

        {/* Two-column layout: Heading & Info on left, Form on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-12 md:mt-16">
          
          {/* Left Column: Heading & Info */}
          <div className="space-y-12">
            {/* Giant heading */}
            <motion.h2
              className="text-outline font-black tracking-tighter leading-[0.85] select-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            >
              {"LET'S"}
              <br />
              TALK
            </motion.h2>

            {/* Social links & availability under heading */}
            <motion.div
              className="space-y-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Social links */}
              <div>
                <p className="text-white/20 text-xs font-mono tracking-[0.3em] uppercase mb-6">Find me on</p>
                <div className="flex flex-wrap gap-8">
                  {socials.map((social) => (
                    <MagneticButton
                      key={social.label}
                      as="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-white/30 hover:text-white transition-colors duration-300"
                    >
                      <span className="text-sm font-medium tracking-wider underline-draw">{social.label}</span>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </MagneticButton>
                  ))}
                </div>
              </div>

              {/* Availability badge & Quote */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/20 text-xs font-mono tracking-wider">
                    Available for opportunities &middot; Graduating Aug 2026
                  </span>
                </div>

                {/* Personal Quote */}
                <div className="mt-8">
                  <p className="font-mono text-[13px] tracking-wider italic text-white">
                    "I didn't come from a tech city. I brought the tech to where I came from."
                  </p>
                  <p className="font-mono text-[13px] tracking-wider mt-2 text-white font-normal">
                    — Yash Lawankar
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-white/20 text-xs font-mono tracking-[0.3em] uppercase mb-6">Drop a message</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className={inputClasses}
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className={inputClasses}
                />
              </div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message..."
                required
                rows={5}
                className={`${inputClasses} resize-none`}
              />

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 text-white/80 text-xs font-semibold tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                data-cursor="hover"
              >
                {status === 'idle' && (
                  <>
                    Send Message
                    <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                {status === 'sending' && (
                  <>
                    Sending...
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                      <Send size={14} />
                    </motion.div>
                  </>
                )}
                {status === 'sent' && (
                  <>
                    <CheckCircle size={14} className="text-emerald-400" />
                    <span className="text-emerald-400">Message Sent!</span>
                  </>
                )}
                {status === 'error' && (
                  <>
                    <AlertCircle size={14} className="text-red-400" />
                    <span className="text-red-400">Failed — Try Again</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
