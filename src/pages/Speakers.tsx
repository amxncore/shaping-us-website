import Layout from "@/components/Layout";
import SpeakerCard from "@/components/SpeakerCard";
import { motion } from "framer-motion";

const allSpeakers = [
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

const Speakers = () => {
  return (
    <Layout>
      <section className="pt-32 pb-24 relative">
        {/* Ambient underglow */}
        <div className="section-underglow" />

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Meet Our</p>
            <h1 className="font-display font-bold text-4xl sm:text-5xl">Speakers</h1>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Visionary thinkers sharing ideas that shape our understanding of the world.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto perspective-800">
            {allSpeakers.map((speaker, i) => (
              <SpeakerCard key={`speaker-page-${i}`} {...speaker} index={i} isTBA={true} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Speakers;
