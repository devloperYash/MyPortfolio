import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUpRight,
  Award,
  Briefcase,
} from 'lucide-react';
import { SOCIAL_LINKS } from '../constants/links';

gsap.registerPlugin(ScrollTrigger);

/* ─── Minimal Icons matching site design ─── */

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

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    botcheck: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Scroll Reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(containerRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Validation
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Minimum 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please write at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    if (formData.botcheck) {
      setStatus('success');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey || 'your_key_here',
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          subject: `Portfolio Message from ${formData.name.trim()}`,
        }),
      });

      const result = await response.json();

      if (response.ok && (result.success || result.message?.toLowerCase().includes('success'))) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', botcheck: false });
        setErrors({});
      } else {
        setStatus('error');
        setErrorMessage(
          result.message || 'Could not send message. Please try again or reach out on LinkedIn.'
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error while sending. Please try again later.');
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 w-full px-5 sm:px-10 md:px-14 lg:px-20 py-20 sm:py-28 bg-black border-t border-white/[0.08]"
    >
      <div ref={containerRef} className="max-w-5xl mx-auto">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441]" />
          <span className="text-[11px] font-mono tracking-widest text-[#D9A441] uppercase">
            Contact
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ━━━ LEFT COLUMN: Direct & Personal ━━━ */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Get in touch<span className="text-[#D9A441]">.</span>
            </h2>

            <p className="text-sm sm:text-base text-white/50 font-sans mt-4 leading-relaxed">
              Have an open role, an engineering project, or want to collaborate? Send a message through the form and I'll get back to you.
            </p>

            <div className="mt-8 pt-8 border-t border-white/[0.08] space-y-4">
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/30 block">
                Find me online
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#090909] hover:bg-[#121212] border border-white/[0.08] hover:border-white/20 text-xs font-mono text-white/70 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                    <span>github.com/devloperYash</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#090909] hover:bg-[#121212] border border-white/[0.08] hover:border-[#4C7EFF]/40 text-xs font-mono text-white/70 hover:text-[#4C7EFF] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <LinkedInIcon className="w-4 h-4 text-[#4C7EFF]" />
                    <span>linkedin.com/in/yash-lawankar</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href={SOCIAL_LINKS.kyndle}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#090909] hover:bg-[#121212] border border-white/[0.08] hover:border-orange-500/40 text-xs font-mono text-white/70 hover:text-orange-400 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-orange-400" />
                    <span>kyndle.vercel.app</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href={SOCIAL_LINKS.credly}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#090909] hover:bg-[#121212] border border-white/[0.08] hover:border-[#D9A441]/40 text-xs font-mono text-white/70 hover:text-[#D9A441] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-[#D9A441]" />
                    <span>credly.com/users/yash-lawankar</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>
          </div>

          {/* ━━━ RIGHT COLUMN: Pitch-Black Form ━━━ */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-white/[0.08] bg-[#090909] p-6 sm:p-8">
              {/* Subtle gold line on top */}
              <div
                className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D9A441]/50 to-transparent"
                aria-hidden="true"
              />

              {status === 'success' ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-white/[0.05] border border-[#D9A441]/40 flex items-center justify-center text-[#D9A441] mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-white">
                    Message sent.
                  </h4>
                  <p className="text-sm text-white/50 font-sans mt-2 max-w-sm">
                    Thank you — I received your message and will reply to your email soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setFormData({ name: '', email: '', message: '', botcheck: false });
                    }}
                    className="mt-6 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white/80 hover:text-white font-mono text-xs transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Honeypot */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    checked={formData.botcheck}
                    onChange={handleChange}
                    className="hidden"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {status === 'error' && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5 text-rose-300 text-xs font-sans">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      disabled={status === 'submitting'}
                      className={`w-full px-4 py-3 rounded-xl bg-[#000000] text-white text-sm font-sans placeholder-white/20 border transition-colors focus:outline-none ${
                        errors.name
                          ? 'border-rose-500/60 focus:border-rose-500'
                          : 'border-white/[0.10] hover:border-white/20 focus:border-[#D9A441]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-rose-400 font-mono">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      disabled={status === 'submitting'}
                      className={`w-full px-4 py-3 rounded-xl bg-[#000000] text-white text-sm font-sans placeholder-white/20 border transition-colors focus:outline-none ${
                        errors.email
                          ? 'border-rose-500/60 focus:border-rose-500'
                          : 'border-white/[0.10] hover:border-white/20 focus:border-[#D9A441]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-400 font-mono">{errors.email}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="What are you working on or looking for?"
                      disabled={status === 'submitting'}
                      className={`w-full px-4 py-3 rounded-xl bg-[#000000] text-white text-sm font-sans placeholder-white/20 border transition-colors focus:outline-none resize-y min-h-[110px] ${
                        errors.message
                          ? 'border-rose-500/60 focus:border-rose-500'
                          : 'border-white/[0.10] hover:border-white/20 focus:border-[#D9A441]'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-400 font-mono">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D9A441] hover:bg-[#e4b356] disabled:bg-neutral-800 disabled:text-white/30 disabled:cursor-not-allowed text-black font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
