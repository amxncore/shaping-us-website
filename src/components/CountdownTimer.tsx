import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const TARGET_DATE = new Date("2026-07-18T00:00:00").getTime();
const cineEase = [0.22, 1, 0.36, 1] as const;

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calcTimeLeft = (): TimeLeft => {
  const diff = TARGET_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const CubeDigit = ({ value, label, index }: { value: number; label: string; index: number }) => {
  const [current, setCurrent] = useState(value);
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const [glowing, setGlowing] = useState(false);

  useEffect(() => {
    if (value !== current) {
      setPrev(current);
      setCurrent(value);
      setFlipping(true);
      setGlowing(true);
      const t1 = setTimeout(() => setFlipping(false), 800); // Extended for smoother ease
      const t2 = setTimeout(() => setGlowing(false), 400);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [value, current]);

  const formatted = String(current).padStart(2, "0");
  const prevFormatted = String(prev).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.15 * (index + 1), ease: cineEase }}
      className="flex flex-col items-center"
    >
      <div
        className={`cube-container relative transition-shadow duration-500 ${glowing ? "cube-glow-pulse" : ""}`}
        style={{
          boxShadow: glowing
            ? "0 0 50px rgba(230,43,30,0.5)"
            : "0 0 30px rgba(230,43,30,0.08)",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          borderRadius: "1rem",
        }}
      >
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden rounded-2xl">
          {/* Previous number (slides up and out) */}
          <motion.span
            key={`prev-${prev}-${label}`}
            className="font-display font-black text-[3rem] sm:text-[5rem] absolute tracking-tighter"
            style={{ color: "#E62B1E" }}
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={flipping ? { y: -80, opacity: 0, scale: 0.9 } : { y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.5, 0, 0.2, 1] }} // Smooth accelerate out
          >
            {prevFormatted}
          </motion.span>

          {/* Current number (slides in from below) */}
          <motion.span
            key={`curr-${current}-${label}`}
            className="font-display font-black text-[3rem] sm:text-[5rem] absolute tracking-tighter"
            style={{ color: "#E62B1E" }}
            initial={flipping ? { y: 80, opacity: 0, scale: 1.1 } : { y: 0, opacity: 1, scale: 1 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: cineEase, delay: flipping ? 0.1 : 0 }}
          >
            {formatted}
          </motion.span>
        </div>
      </div>
      <span className="text-white/50 text-[0.65rem] sm:text-xs mt-4 uppercase tracking-[0.25em] font-body font-medium">
        {label}
      </span>
    </motion.div>
  );
};

const CountdownTimer = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft);

  const tick = useCallback(() => {
    setTimeLeft(calcTimeLeft());
  }, []);

  useEffect(() => {
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [tick]);

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <section ref={ref} className="py-24 relative">
      <div className="section-underglow" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: cineEase }}
          className="text-center mb-12"
        >
          <p className="text-primary text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 font-body font-medium">Mark Your Calendar</p>
          <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight">July 18, 2026</h2>
        </motion.div>

        <div className="flex items-center justify-center gap-3 sm:gap-6 lg:gap-8">
          {units.map((unit, i) => (
            <CubeDigit key={unit.label} value={unit.value} label={unit.label} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
