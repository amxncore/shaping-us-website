import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

let particleId = 0;

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 80ms lerp delay via spring config
  const springConfig = { stiffness: 200, damping: 25, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleClick = useCallback(() => {
    const { x, y } = lastMousePos.current;
    const newParticles: Particle[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI * 2 * i) / 6 + (Math.random() - 0.5) * 0.5;
      newParticles.push({
        id: particleId++,
        x,
        y,
        vx: Math.cos(angle) * (40 + Math.random() * 30),
        vy: Math.sin(angle) * (40 + Math.random() * 30),
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 400);
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor dot — red glowing 12px */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "#E62B1E",
          boxShadow: "0 0 12px 4px rgba(230,43,30,0.6), 0 0 24px 8px rgba(230,43,30,0.3)",
        }}
      />

      {/* Click particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            initial={{
              x: p.x,
              y: p.y,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: p.x + p.vx,
              y: p.y + p.vy,
              opacity: 0,
              scale: 0.3,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: "#E62B1E",
              boxShadow: "0 0 6px rgba(230,43,30,0.8)",
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
