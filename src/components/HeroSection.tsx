import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FluidBackground from "./FluidBackground";
import MagneticButton from "./MagneticButton";

// Cinematic easing
const cineEase = [0.22, 1, 0.36, 1] as const;

const HeroSection = () => {

  // Pre-compute subtle random offsets for TEDxICEAS letters
  const tedxOffsets = useMemo(() => {
    return "TEDxICEAS".split("").map(() => ({
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 80,
      rotate: (Math.random() - 0.5) * 30,
    }));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Fluid Background */}
      <FluidBackground />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">

        {/* IDEAS WORTH SPREADING — smooth letter fade with vertical reveal */}
        <div className="mb-8 overflow-hidden">
          <motion.p
            className="text-foreground/50 text-xs sm:text-sm tracking-[0.35em] uppercase font-body font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: cineEase }}
          >
            {"IDEAS WORTH SPREADING".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8 + i * 0.035,
                  duration: 0.6,
                  ease: cineEase,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* TEDxICEAS — cinematic letter assembly */}
        <div className="flex justify-center mb-4">
          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl xl:text-[9rem] tracking-tight relative leading-none">
            {"TEDxICEAS".split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{
                  opacity: 0,
                  x: tedxOffsets[i].x,
                  y: tedxOffsets[i].y,
                  rotate: tedxOffsets[i].rotate,
                  filter: "blur(12px)",
                  scale: 0.5,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  filter: "blur(0px)",
                  scale: 1,
                }}
                transition={{
                  delay: 1.8 + i * 0.06,
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1], // very smooth out
                }}
                className={i >= 4 ? "text-[#E62B1E]" : "text-foreground"}
              >
                {char}
              </motion.span>
            ))}

            {/* Subtle red pulse glow after letters assemble */}
            <motion.div
              className="absolute inset-[-20px] pointer-events-none rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.15, 0], scale: [0.98, 1.02, 1] }}
              transition={{
                delay: 2.8,
                duration: 1.2,
                ease: "easeInOut",
              }}
              style={{
                background: "radial-gradient(ellipse at center, rgba(230,43,30,0.3) 0%, transparent 70%)",
              }}
            />
          </h1>
        </div>

        {/* What Shapes Us — elegant fade-up with stagger */}
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.8 }}
        >
          <motion.p
            className="font-display text-xl sm:text-2xl lg:text-3xl text-foreground/70 font-light tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 3.0,
              duration: 1.4,
              ease: cineEase,
            }}
          >
            {"What Shapes Us".split(" ").map((word, wi) => (
              <motion.span
                key={wi}
                className="inline-block mr-[0.3em]"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 3.0 + wi * 0.15,
                  duration: 1.0,
                  ease: cineEase,
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        {/* Buttons — smooth delayed fade up */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 1.0, ease: cineEase }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton radius={50}>
            <Link
              to="/register"
              className="bg-primary text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(230,43,30,0.25)] inline-block"
            >
              Register Now
            </Link>
          </MagneticButton>
          <MagneticButton radius={50}>
            <Link
              to="/speakers"
              className="border border-foreground/15 text-foreground/80 px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-foreground/5 hover:border-foreground/25 transition-all duration-300 inline-block"
            >
              View Speakers
            </Link>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator — appears last */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 4.5, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-foreground/20 rounded-full flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-1.5 bg-foreground/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
