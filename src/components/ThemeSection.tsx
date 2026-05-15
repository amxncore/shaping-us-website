import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const cineEase = [0.22, 1, 0.36, 1] as const;

const ThemeSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Ambient underglow */}
      <div className="section-underglow" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-border" />

      {/* Smooth animated blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, rgba(139,0,0,0.6) 0%, transparent 70%)",
            filter: "blur(100px)",
            animation: "blobMove1 10s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, rgba(230,43,30,0.5) 0%, transparent 70%)",
            filter: "blur(100px)",
            animation: "blobMove2 14s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, rgba(139,0,0,0.5) 0%, transparent 70%)",
            filter: "blur(100px)",
            animation: "blobMove3 18s ease-in-out infinite",
          }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: cineEase }}
          className="text-primary text-xs sm:text-sm tracking-[0.3em] uppercase mb-6 font-body font-medium"
        >
          The Theme
        </motion.p>

        {/* "What Shapes Us" — smooth 3D word reveals */}
        <div className="font-display font-black text-4xl sm:text-5xl lg:text-6xl flex items-center justify-center gap-3 sm:gap-4 flex-wrap" style={{ perspective: "800px" }}>
          <motion.span
            initial={{ opacity: 0, rotateX: 60, y: 20 }}
            animate={inView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.2, ease: cineEase }}
            style={{ display: "inline-block", transformOrigin: "center bottom" }}
          >
            What
          </motion.span>

          <motion.span
            initial={{ opacity: 0, rotateY: 60, x: -20 }}
            animate={inView ? { opacity: 1, rotateY: 0, x: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.4, ease: cineEase }}
            style={{ display: "inline-block" }}
          >
            Shapes
          </motion.span>

          <motion.span
            className="relative inline-block"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: cineEase }}
          >
            Us
            {/* Soft expanding ring */}
            <motion.div
              className="absolute pointer-events-none"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 2.5, opacity: [0, 0.25, 0] } : {}}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
              style={{
                border: "1.5px solid rgba(230,43,30,0.5)",
                borderRadius: "50%",
                inset: "-10px",
              }}
            />
          </motion.span>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.9, ease: cineEase }}
          className="text-muted-foreground text-base sm:text-lg leading-relaxed mt-10 max-w-2xl mx-auto"
        >
          Every individual, community, and generation is shaped by ideas, experiences, challenges, and innovation. TEDxICEAS explores the forces that shape who we are and who we will become — from technology and science to culture, creativity, and human resilience.
        </motion.p>
      </div>
    </section>
  );
};

export default ThemeSection;
