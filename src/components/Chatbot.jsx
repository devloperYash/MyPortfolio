// FILE: src/components/Chatbot.jsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const GREETING = {
  role: 'assistant',
  content: "Hey! 👋 I'm Yash's AI assistant. Ask me anything about his skills, projects, achievements, or experience!"
};

const SYSTEM_CONTEXT = `You are an AI assistant on Yash Lawankar's portfolio website. Answer questions about Yash based on the following information. Be friendly, concise, and professional. If someone asks something unrelated to Yash, politely redirect them. Keep responses short (2-4 sentences max).

ABOUT YASH LAWANKAR:
- Computer Science Engineering student at PRMITR Badnera (Prof. Ram Meghe Institute of Technology & Research)
- University: Sant Gadge Baba Amravati University (SGBAU)
- Graduating: August 2026
- CGPA: 8.72
- From Amravati, Maharashtra, India
- Passionate about Java backend development, AI/ML, and building scalable systems

TECHNICAL SKILLS:
- Languages: Java, Python, SQL, JavaScript
- Backend: Spring Boot, REST APIs, JWT Security, FastAPI
- AI/ML: YOLOv8, Deep Learning, Computer Vision, NLP, LLM Integration
- CRM: Salesforce (Apex, Lightning Web Components, SOQL), 130k+ Trailhead Points, 21 Superbadges
- Tools: Git, GitHub, Redis Streams, MySQL, React
- DSA: 150+ LeetCode problems solved, 200+ problems on Take U Forward DSA Sheet

PROJECTS:
1. Purplle Tech Challenge 2026 - Store Intelligence Pipeline: High-throughput computer vision pipeline using YOLOv8 for retail store analytics. Real-time crowd dynamics, heatmaps, queue-waiting estimation. (Hackathon Finalist)
2. PRAYS - AI Mock Interview Platform: Full-stack AI assistant for candidate screening using NLP to score responses, analyze sentiments, and ask adaptive follow-up questions. (Final Year Project)
3. Flora Vision - AI Plant Disease Detection: Deep neural network for crop leaf pathogen identification with diagnostic predictions and treatment schedules. (Research & AI)
4. Knowledge Representation - Intel Unnati AI Pipeline: Data preprocessing, LLM integration, custom prompting, automated Knowledge Graph generation with React UI dashboard. (Intel Unnati Program)
5. EventEase - AI-Powered Salesforce CRM: Enterprise event system with Lightning Web Components, Apex automation, registration workflows, recommendations, and lead scoring.
6. Spring Boot Job Portal: Enterprise recruitment platform backend with JWT security, robust logging, exception handling, and relational schemas.

ACHIEVEMENTS:
- University Color Coat Holder - SGBAU (2024-25) for FloraVision AI project - prestigious university-level recognition
- National Ecothon Hackathon Winner at Sipna COET (2025)
- Devothon Hackathon Winner at Sipna COET (2025)
- 4+ Project Expo Wins across inter-college and intra-college competitions
- Purplle Tech Challenge 2026 Finalist
- NPTEL Elite Certification in Programming in Java
- Infosys Springboard - DBMS Verified Coursework
- SmartBridge - Salesforce Developer Certification
- Conducted Git & GitHub workshops for 100+ B.Tech students under GDG PRMITR

CONTACT:
- GitHub: github.com/devloperYash
- LinkedIn: linkedin.com/in/yash-lawankar-17a752259
- Available for Software Engineering roles focused on backend development

PERSONALITY:
- Builder, Problem Solver, AI Enthusiast
- Quote: "I didn't come from a tech city. I brought the tech to where I came from."`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      let replyText = '';

      // Local development fallback to direct client call if VITE_GEMINI_API_KEY is configured
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const localKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (isLocalhost && localKey) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${localKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                system_instruction: {
                  parts: [{ text: SYSTEM_CONTEXT }]
                },
                contents: [
                  {
                    role: 'user',
                    parts: [{ text: text }]
                  }
                ],
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 300,
                }
              })
            }
          );

          if (response.ok) {
            const data = await response.json();
            replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          }
        } catch (e) {
          console.warn("Direct Gemini call failed, falling back to serverless function...", e);
        }
      }

      // Secure serverless route fallback
      if (!replyText) {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text }),
        });

        const data = await res.json();
        if (res.ok) {
          replyText = data.reply;
        } else {
          throw new Error(data.error || 'Failed to fetch reply');
        }
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: replyText }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: "Sorry, something went wrong. Please try again!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-[#6366f1]/20 border border-white/10"
        style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', bounce: 0.5 }}
        data-cursor="hover"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} color="white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={22} color="white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-[199] w-[360px] max-w-[calc(100vw-48px)] rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40"
            style={{ background: 'rgba(12, 12, 14, 0.95)', backdropFilter: 'blur(24px)' }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)' }}>
                <Bot size={16} color="white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Ask about Yash</p>
                <p className="text-white/30 text-[10px] font-mono tracking-wider">Powered by Gemini AI</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400/60 text-[10px] font-mono">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[340px] overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Avatar */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                      msg.role === 'user' ? 'bg-white/10' : ''
                    }`}
                    style={msg.role === 'assistant' ? { background: 'linear-gradient(135deg, #6366f1, #22d3ee)' } : {}}
                  >
                    {msg.role === 'assistant' ? <Bot size={12} color="white" /> : <User size={12} className="text-white/60" />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#6366f1]/20 text-white/90 rounded-br-md'
                        : 'bg-white/[0.04] text-white/70 rounded-bl-md border border-white/[0.04]'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  className="flex gap-2.5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)' }}>
                    <Bot size={12} color="white" />
                  </div>
                  <div className="bg-white/[0.04] border border-white/[0.04] px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t border-white/[0.04]">
              <div className="flex items-center gap-2 bg-white/[0.04] rounded-xl border border-white/[0.06] px-3 py-1 focus-within:border-[#6366f1]/40 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Yash..."
                  className="flex-1 bg-transparent text-white/90 text-sm outline-none placeholder:text-white/20 py-2 font-light"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-20 hover:bg-[#6366f1]/20"
                  data-cursor="hover"
                >
                  <Send size={15} className="text-[#6366f1]" />
                </button>
              </div>
              <p className="text-white/15 text-[9px] font-mono text-center mt-2 tracking-wider">
                AI can make mistakes · Powered by Gemini
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
