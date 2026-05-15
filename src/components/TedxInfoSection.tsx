import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import MagneticButton from "./MagneticButton";

const fullText = "What is TEDx?";

const TedxInfoSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [typedText, setTypedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => setTypingDone(true), 300);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Ambient underglow */}
      <div className="section-underglow" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        {/* Section tag — clip reveal left to right */}
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">About</p>
        </motion.div>

        {/* Typing heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl">
            {typedText}
            {!typingDone && <span className="typing-cursor" />}
          </h2>
        </motion.div>

        {/* 3D Wireframe Globe — CSS only */}
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="hidden lg:block flex-shrink-0" style={{ perspective: "600px" }}>
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
              className="w-40 h-40 relative"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full" style={{ opacity: 0.4 }}>
                {/* Latitude lines */}
                {[30, 60, 90, 120, 150].map((y) => (
                  <ellipse
                    key={`lat-${y}`}
                    cx="100"
                    cy={y}
                    rx={Math.sin((y / 200) * Math.PI) * 90}
                    ry="8"
                    fill="none"
                    stroke="#E62B1E"
                    strokeWidth="0.8"
                  />
                ))}
                {/* Longitude lines */}
                {[0, 30, 60, 90, 120, 150].map((angle) => (
                  <ellipse
                    key={`lon-${angle}`}
                    cx="100"
                    cy="100"
                    rx={Math.cos((angle / 180) * Math.PI) * 90}
                    ry="90"
                    fill="none"
                    stroke="#E62B1E"
                    strokeWidth="0.8"
                    transform={`rotate(${angle} 100 100)`}
                  />
                ))}
                {/* Outer circle */}
                <circle cx="100" cy="100" r="90" fill="none" stroke="#E62B1E" strokeWidth="1" />
              </svg>
            </motion.div>
          </div>

          <div className="flex-1">
            {/* Paragraph — fade in after typing */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={typingDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed text-center lg:text-left"
            >
              In the spirit of discovering and spreading ideas, TED has created a program called TEDx. TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. Our event is called TEDxICEAS, where x = independently organized TED event. At our TEDxICEAS event, TED Talks video and live speakers will combine to spark deep discussion and connection in a small group. The TED Conference provides general guidance for the TEDx program, but individual TEDx events, including ours, are self-organized.
            </motion.p>
          </div>
        </div>

        {/* Learn more button with magnetic hover */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-10"
        >
          <MagneticButton radius={60} className="inline-block">
            <a
              href="https://www.ted.com/tedx"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary/30 text-primary px-8 py-3 rounded-full font-semibold text-sm hover:bg-primary/10 hover:border-primary transition-colors block relative group overflow-hidden"
            >
              <span className="relative z-10">Learn more about TEDx</span>
              {/* SVG border draw on hover */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 50" preserveAspectRatio="none">
                <rect
                  x="1" y="1" width="198" height="48" rx="25"
                  fill="none" stroke="#E62B1E" strokeWidth="2"
                  className="draw-border-svg"
                />
              </svg>
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default TedxInfoSection;
