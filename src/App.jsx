// FILE: src/App.jsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';

// ─── Scroll Progress Bar ──────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
    />
  );
}

// ─── Footer ───────────────────────────────
function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.04] py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-white/60 text-xs tracking-wider">
          YL<span className="text-[#6366f1]">.</span> &copy; {new Date().getFullYear()}
        </span>
        <p className="text-white/50 text-[10px] font-mono tracking-widest uppercase">
          Designed &amp; built by Yash Lawankar
        </p>
        <div className="flex gap-6">
          {[
            { label: 'GitHub', href: 'https://github.com/devloperYash' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yash-lawankar-17a752259/' },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="text-white/50 text-xs hover:text-white transition-colors duration-300 font-mono tracking-wider underline-draw"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Konami Code Easter Egg ───────────────
function useKonami(callback) {
  useEffect(() => {
    const code = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA',
    ];
    let index = 0;

    const handler = (e) => {
      if (e.code === code[index]) {
        index++;
        if (index === code.length) {
          callback();
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callback]);
}

// ─── Main App ─────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [glitchMsg, setGlitchMsg] = useState(false);

  const canvasRef = useRef(null);
  const rendererRef = useRef(null);

  // Parallax positioning
  const mousePos = useRef({ x: 0, y: 0 });
  const lerpedPos = useRef({ x: 0, y: 0 });

  const triggerGlitch = useCallback(() => {
    setGlitch(true);
    setTimeout(() => {
      setGlitch(false);
      setGlitchMsg(true);
      setTimeout(() => setGlitchMsg(false), 3000);
    }, 3000);
  }, []);

  useKonami(triggerGlitch);

  // ─── Mouse move listener for parallax ───
  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2) * 50;
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2) * 50;
      mousePos.current = { x, y };
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // ─── Dynamic Parallax Layers Animation ───
  useEffect(() => {
    let raf;
    const update = () => {
      const dx = mousePos.current.x - lerpedPos.current.x;
      const dy = mousePos.current.y - lerpedPos.current.y;
      lerpedPos.current.x += dx * 0.08;
      lerpedPos.current.y += dy * 0.08;

      const l1 = document.getElementById('bg-layer-1');
      const l2 = document.getElementById('bg-layer-2');
      const l3 = document.getElementById('bg-layer-3');

      if (l1) l1.style.transform = `translate3d(${lerpedPos.current.x}px, ${lerpedPos.current.y}px, 0)`;
      if (l2) l2.style.transform = `translate3d(${lerpedPos.current.x * 0.3}px, ${lerpedPos.current.y * 0.3}px, 0)`;
      if (l3) l3.style.transform = `translate3d(${lerpedPos.current.x * 0.1}px, ${lerpedPos.current.y * 0.1}px, 0)`;

      raf = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(raf);
  }, []);

  // ─── Three.js Background Initialization (Strict Mode Lifecycle Proof) ───
  useEffect(() => {
    let active = true;
    let cleanupFn = null;
    let loadListener = null;

    const loadScript = () => {
      // If THREE is already loaded globally, initialize directly
      if (window.THREE) {
        if (active) {
          cleanupFn = initThree();
        }
        return;
      }

      // Check if script is already present in document
      let script = document.querySelector('script[src*="three.min.js"]');
      if (!script) {
        script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.async = true;
        document.head.appendChild(script);
      }

      loadListener = () => {
        if (active) {
          cleanupFn = initThree();
        }
      };

      script.addEventListener('load', loadListener);
    };

    loadScript();

    return () => {
      active = false;
      if (loadListener) {
        const script = document.querySelector('script[src*="three.min.js"]');
        if (script) {
          script.removeEventListener('load', loadListener);
        }
      }
      if (cleanupFn) {
        cleanupFn();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  const initThree = () => {
    if (!canvasRef.current) return () => { };
    const THREE = window.THREE;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 250;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // 1. Particle Field (3000+ particles)
    const particleCount = 3000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color('#ffffff'), // White
      new THREE.Color('#6366f1'), // Indigo
      new THREE.Color('#22d3ee')  // Cyan
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 600;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circular glowing dot texture
    const createDotTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
      return new THREE.CanvasTexture(canvas);
    };

    const texture = createDotTexture();
    const material = new THREE.PointsMaterial({
      size: 2.2,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 2. Plexus Network Connections (using a small subset of 100 particles for performance)
    const plexusCount = 100;
    const lineGeometry = new THREE.BufferGeometry();
    const plexusPoints = [];
    const plexusVelocities = [];

    for (let i = 0; i < plexusCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 450,
        (Math.random() - 0.5) * 450,
        (Math.random() - 0.5) * 450
      );
      plexusPoints.push(pos);
      plexusVelocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2
      ));
    }

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSystem);

    // 3. Floating 3D wireframe Shapes
    const shapes = [];
    const shapeGeometries = [
      new THREE.IcosahedronGeometry(15, 0),
      new THREE.OctahedronGeometry(12, 0),
      new THREE.TorusGeometry(10, 2, 8, 24)
    ];

    const shapeMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.05 }),
      new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.06 }),
      new THREE.MeshBasicMaterial({ color: 0xf472b6, wireframe: true, transparent: true, opacity: 0.05 })
    ];

    for (let i = 0; i < 6; i++) {
      const geo = shapeGeometries[i % shapeGeometries.length];
      const mat = shapeMaterials[i % shapeMaterials.length];
      const mesh = new THREE.Mesh(geo, mat);

      mesh.position.set(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 200
      );

      mesh.userData = {
        rx: (Math.random() - 0.5) * 0.008,
        ry: (Math.random() - 0.5) * 0.008
      };
      scene.add(mesh);
      shapes.push(mesh);
    }

    // Animation variables
    let cameraTimer = 0;
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Camera base rotation over time
      cameraTimer += 0.0004;

      // Slow particle warp forward drift
      const positionsArray = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positionsArray[i * 3 + 2] += 0.2; // Move forward in Z
        if (positionsArray[i * 3 + 2] > 300) {
          positionsArray[i * 3 + 2] = -300; // Recoil back into depth
        }
      }
      geometry.attributes.position.needsUpdate = true;

      // Update plexus nodes
      for (let i = 0; i < plexusCount; i++) {
        plexusPoints[i].add(plexusVelocities[i]);
        if (Math.abs(plexusPoints[i].x) > 225) plexusVelocities[i].x *= -1;
        if (Math.abs(plexusPoints[i].y) > 225) plexusVelocities[i].y *= -1;
        if (Math.abs(plexusPoints[i].z) > 225) plexusVelocities[i].z *= -1;
      }

      // Rebuild plexus paths
      const linesArray = [];
      for (let i = 0; i < plexusCount; i++) {
        for (let j = i + 1; j < plexusCount; j++) {
          const dist = plexusPoints[i].distanceTo(plexusPoints[j]);
          if (dist < 65) {
            linesArray.push(
              plexusPoints[i].x, plexusPoints[i].y, plexusPoints[i].z,
              plexusPoints[j].x, plexusPoints[j].y, plexusPoints[j].z
            );
          }
        }
      }
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linesArray), 3));

      // Rotate geometric wireframes
      shapes.forEach(shape => {
        shape.rotation.x += shape.userData.rx;
        shape.rotation.y += shape.userData.ry;
      });

      // Smooth camera tilt follow cursor (max ±15deg -> Math.PI / 12)
      const targetRotX = -(mousePos.current.y / 50) * (Math.PI / 12);
      const targetRotY = (mousePos.current.x / 50) * (Math.PI / 12);

      camera.rotation.x += (targetRotX - camera.rotation.x) * 0.06;
      camera.rotation.y += (targetRotY - camera.rotation.y) * 0.06;
      camera.position.x = Math.sin(cameraTimer) * 50;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Clean up WebGL resources
      geometry.dispose();
      material.dispose();
      texture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();

      shapeGeometries.forEach(g => g.dispose());
      shapeMaterials.forEach(m => m.dispose());

      scene.clear();
    };
  };

  return (
    <div
      className={`min-h-screen bg-[#080808] text-white font-sans overflow-x-hidden relative ${glitch ? 'glitch-mode glitch-active' : ''
        }`}
    >
      {/* ─── GLOBAL BACKGROUND SYSTEM (Fixed Layers) ─── */}

      {/* Base background color */}
      <div className="fixed inset-0 bg-[#080808] -z-30 pointer-events-none" />

      {/* Layer 0: Three.js Canvas (Particles + Shapes) */}
      <div id="bg-layer-1" className="fixed inset-0 pointer-events-none z-0 overflow-hidden will-change-transform">
        <canvas ref={canvasRef} className="w-full h-full block opacity-70" />
      </div>

      {/* Layer 1: Aurora Background Layers */}
      <div id="bg-layer-2" className="fixed inset-0 pointer-events-none overflow-hidden z-1 will-change-transform">
        <div className="aurora-layer aurora-1" />
        <div className="aurora-layer aurora-2" />
        <div className="aurora-layer aurora-3" />
      </div>

      {/* Layer 2: 3D Grid Floor */}
      <div className="grid-floor-3d z-2" />

      {/* Layer 3: Dot Grid Overlay */}
      <div id="bg-layer-3" className="fixed inset-0 pointer-events-none z-3 dot-grid-overlay will-change-transform" />

      {/* Layer 4: Noise Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-4 noise-grain-overlay" />

      {/* Layer 5: Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none z-5 vignette-overlay" />

      {/* Layer 6: Depth Fog */}
      <div className="fixed bottom-0 left-0 right-0 h-[30vh] pointer-events-none z-6 bg-gradient-to-t from-[#080808] to-transparent" />

      {/* Scanlines (visible during glitch) */}
      <div className="scanlines" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* AI Chatbot */}
      {loaded && <Chatbot />}

      {/* Scroll progress bar */}
      {loaded && <ScrollProgress />}

      {/* Loading screen */}
      <AnimatePresence mode="wait">
        {!loaded && <LoadingScreen key="loader" onFinish={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Main content */}
      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10"
        >
          <Navbar />
          <main className="relative z-10">
            {/* Hero Wrapper */}
            <div className="relative z-10">
              <Hero />
              {/* Hero accent: slight indigo tint bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-96 bg-[#6366f1] opacity-[0.03] blur-[120px] pointer-events-none -z-10" />
            </div>

            {/* About Wrapper */}
            <div className="relative z-10">
              <About />
              {/* About accent: slight cyan tint right side */}
              <div className="absolute top-0 bottom-0 right-0 w-[500px] bg-[#22d3ee] opacity-[0.03] blur-[120px] pointer-events-none -z-10" />
            </div>

            {/* Skills Wrapper */}
            <div className="relative z-10">
              <Skills />
              {/* Skills accent: slight indigo tint top */}
              <div className="absolute top-0 left-0 right-0 h-96 bg-[#6366f1] opacity-[0.03] blur-[120px] pointer-events-none -z-10" />
            </div>

            {/* Projects Wrapper */}
            <div className="relative z-10">
              <Projects />
              {/* Projects accent: slight pink tint left side */}
              <div className="absolute top-0 bottom-0 left-0 w-[500px] bg-[#f472b6] opacity-[0.03] blur-[120px] pointer-events-none -z-10" />
            </div>

            {/* Achievements Wrapper */}
            <div className="relative z-10">
              <Achievements />
            </div>

            {/* Contact Wrapper */}
            <div className="relative z-10">
              <Contact />
            </div>
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
