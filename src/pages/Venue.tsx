import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Counter animation hook
const useCountUp = (target: number, duration: number, inView: boolean) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return count;
};

const Venue = () => {
  const cardsRef = useRef(null);
  const [cardsInView, setCardsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCardsInView(true); },
      { threshold: 0.3 }
    );
    if (cardsRef.current) observer.observe(cardsRef.current);
    return () => observer.disconnect();
  }, []);

  const capacity = useCountUp(500, 1.5, cardsInView);

  const facilityCards = [
    { label: "Capacity", value: `${capacity}+`, suffix: "Attendees" },
    { label: "Facilities", value: "Modern", suffix: "Auditorium" },
    { label: "Accessibility", value: "Fully", suffix: "Accessible" },
  ];

  return (
    <Layout>
      <section className="pt-32 pb-24 relative">
        <div className="section-underglow" />

        <div className="container mx-auto px-6">
          {/* Heading — letters drop from above */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Location</p>
            <h1 className="font-display font-bold text-4xl sm:text-5xl">
              {"The Venue".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3 + i * 0.05,
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-center"
            >
              <h2 className="font-display font-bold text-2xl mb-4">
                Impact College of Engineering and Applied Sciences
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Located in the vibrant city of Bengaluru, India's technology capital, our venue provides the perfect setting for a day of inspiration, innovation, and connection. The modern auditorium and campus facilities offer an intimate space where powerful ideas can truly resonate.
              </p>
            </motion.div>

            {/* Map with wipe reveal */}
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="card-border rounded-xl overflow-hidden relative"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.5!3d12.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzAwLjAiTiA3N8KwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue Map"
                className="grayscale opacity-80"
              />
            </motion.div>

            {/* 3D flip reveal cards */}
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {facilityCards.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, rotateY: 90 }}
                  whileInView={{ opacity: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.2,
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                  }}
                  style={{ perspective: "600px" }}
                  className="card-border rounded-xl p-6 bg-card text-center"
                >
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{item.label}</p>
                  <p className="font-display font-bold text-2xl text-primary">{item.value}</p>
                  <p className="font-display font-semibold text-sm mt-1">{item.suffix}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Venue;
