import { useRef, useEffect, useState, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
  vx: number;
  vy: number;
  driftAngle: number;
  driftSpeed: number;
  driftRadius: number;
  layer: number; // 0 = far, 1 = mid, 2 = close
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

interface HeroParticleCanvasProps {
  onReady?: () => void;
}

const HeroParticleCanvas = ({ onReady }: HeroParticleCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, smoothX: 0, smoothY: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const readyCalledRef = useRef(false);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isMobile) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    const createParticles = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = [];
      const count = Math.min(2000, Math.floor((width * height) / 500));
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < count; i++) {
        // Layer distribution: 40% far, 35% mid, 25% close
        const rand = Math.random();
        const layer = rand < 0.4 ? 0 : rand < 0.75 ? 1 : 2;

        // Distribute in a soft elliptical cloud
        const angle = Math.random() * Math.PI * 2;
        const maxDist = Math.min(width, height) * 0.55;
        const dist = Math.pow(Math.random(), 0.6) * maxDist;

        const tx = cx + Math.cos(angle) * dist * (width / height);
        const ty = cy + Math.sin(angle) * dist;

        // Color: subtle red spectrum
        const colorMix = Math.random();
        const r = Math.floor(100 + colorMix * 130); // 100-230
        const g = Math.floor(10 + colorMix * 20);   // 10-30
        const b = Math.floor(8 + colorMix * 18);    // 8-26

        // Size based on layer
        const sizes = [0.5, 1.2, 2.2];
        const alphas = [0.25, 0.45, 0.7];

        particles.push({
          x: cx,
          y: cy,
          targetX: tx,
          targetY: ty,
          size: sizes[layer] + Math.random() * 0.4,
          r, g, b,
          alpha: alphas[layer] + Math.random() * 0.1,
          vx: 0,
          vy: 0,
          driftAngle: Math.random() * Math.PI * 2,
          driftSpeed: 0.0003 + Math.random() * 0.0008,
          driftRadius: 1 + Math.random() * 2.5,
          layer,
        });
      }

      startTimeRef.current = performance.now();
      readyCalledRef.current = false;
    };

    createParticles();

    const handleResize = () => createParticles();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / width - 0.5) * 2;
      mouseRef.current.y = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let visible = true;
    const handleVisibility = () => { visible = !document.hidden; };
    document.addEventListener("visibilitychange", handleVisibility);

    const animate = () => {
      if (!visible) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const now = performance.now();
      const elapsed = (now - startTimeRef.current) / 1000;

      // 0.6s darkness
      if (elapsed < 0.6) {
        ctx.clearRect(0, 0, width, height);
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      if (!readyCalledRef.current && onReadyRef.current) {
        onReadyRef.current();
        readyCalledRef.current = true;
      }

      // Smooth expansion: 2.5s cinematic bloom
      const expandT = Math.min((elapsed - 0.6) / 2.5, 1);
      const expandEase = easeOutExpo(expandT);

      // Smooth mouse lerp (0.03 = very smooth, cinematic follow)
      mouseRef.current.smoothX += (mouseRef.current.x - mouseRef.current.smoothX) * 0.03;
      mouseRef.current.smoothY += (mouseRef.current.y - mouseRef.current.smoothY) * 0.03;
      const mx = mouseRef.current.smoothX;
      const my = mouseRef.current.smoothY;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (const p of particles) {
        // Smooth expansion from center
        const baseX = cx + (p.targetX - cx) * expandEase;
        const baseY = cy + (p.targetY - cy) * expandEase;

        // Gentle orbital drift
        p.driftAngle += p.driftSpeed;
        const dx = Math.cos(p.driftAngle) * p.driftRadius;
        const dy = Math.sin(p.driftAngle) * p.driftRadius;

        // Parallax: deeper layers move less
        const parallaxScales = [8, 18, 32];
        const px = mx * parallaxScales[p.layer];
        const py = my * parallaxScales[p.layer];

        p.x = baseX + dx + px;
        p.y = baseY + dy + py;

        // Fade in with expansion
        const fadeAlpha = p.alpha * Math.min(expandEase * 1.5, 1);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${fadeAlpha})`;
        ctx.fill();
      }

      // Soft central glow that fades as particles expand
      if (expandT < 1) {
        const glowAlpha = (1 - expandEase) * 0.3;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 150);
        gradient.addColorStop(0, `rgba(230, 43, 30, ${glowAlpha})`);
        gradient.addColorStop(1, `rgba(139, 0, 0, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isMobile]);

  if (isMobile) {
    return <div className="absolute inset-0 hero-mobile-gradient" />;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default HeroParticleCanvas;
