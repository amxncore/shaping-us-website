import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import SpeakerCard from "./SpeakerCard";

const speakers = [
  {
    name: "Speaker TBA",
    role: "Coming Soon",
    talkTitle: "To Be Announced",
    bio: "Our speaker lineup is being carefully curated. Stay tuned for exciting announcements.",
  },
  {
    name: "Speaker TBA",
    role: "Coming Soon",
    talkTitle: "To Be Announced",
    bio: "Our speaker lineup is being carefully curated. Stay tuned for exciting announcements.",
  },
  {
    name: "Speaker TBA",
    role: "Coming Soon",
    talkTitle: "To Be Announced",
    bio: "Our speaker lineup is being carefully curated. Stay tuned for exciting announcements.",
  },
];

const SpeakersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative">
      {/* Ambient underglow */}
      <div className="section-underglow" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Featured</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">Speakers</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Visionary thinkers sharing ideas that shape our understanding of the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-800">
          {speakers.map((speaker, i) => (
            <SpeakerCard key={`speaker-${i}`} {...speaker} index={i} isTBA={true} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/speakers"
            className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold text-sm hover:bg-secondary transition-colors inline-block"
          >
            View All Speakers
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SpeakersSection;
