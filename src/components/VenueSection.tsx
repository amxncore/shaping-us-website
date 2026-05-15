import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const cineEase = [0.22, 1, 0.36, 1] as const;

const VenueSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 relative">
      <div className="section-underglow" />

      <div className="container mx-auto px-6">
        {/* "The Venue" — elegant fade up and subtle spacing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: cineEase }}
          className="text-center mb-20"
        >
          <p className="text-primary text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 font-medium font-body">Location</p>
          <h2 className="font-display font-black text-4xl sm:text-5xl tracking-tight">
            {"The Venue".split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.04,
                  duration: 0.8,
                  ease: cineEase,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Map with cinematic wipe reveal */}
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: cineEase }}
            className="card-border rounded-2xl overflow-hidden relative shadow-2xl shadow-black/50"
          >
            <div className="absolute inset-0 bg-black/20 pointer-events-none z-10" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.5!3d12.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzAwLjAiTiA3N8KwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue Location"
              className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 ease-in-out"
            />
            {/* Elegant Red pin animation */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-20"
              initial={{ y: -60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0, duration: 1.0, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="w-5 h-5 bg-primary rounded-full border-2 border-background shadow-[0_0_20px_rgba(230,43,30,0.6)] relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary"
                  animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.4, ease: cineEase }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-display font-bold text-3xl mb-6 tracking-tight leading-tight">
              Impact College of Engineering and Applied Sciences
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
              Located in the vibrant city of Bengaluru, India's tech capital, our venue provides the perfect setting for a day of inspiration and connection. The modern auditorium offers an intimate space where ideas can truly resonate.
            </p>
            <div className="flex items-center gap-3 text-muted-foreground font-medium">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-xl">📍</span>
              </div>
              <span className="tracking-wide">Bengaluru, Karnataka, India</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VenueSection;
