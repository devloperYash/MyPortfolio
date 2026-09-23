import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { AchievementsReveal } from './components/AchievementsReveal';
import { Projects } from './components/Projects';
import { AavishkarPage } from './pages/AavishkarPage';

import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function Portfolio() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#D9A441]/20 selection:text-white overflow-x-hidden">
      {/* Top Navigation Bar */}
      <Navbar />

      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <AchievementsReveal />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

/* Aavishkar page with its own Lenis instance */
function AavishkarWithLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  return <AavishkarPage />;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/aavishkar" element={<AavishkarWithLenis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

