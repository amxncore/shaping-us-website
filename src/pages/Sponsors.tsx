import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const SponsorTier = ({
  title,
  count,
  delay,
}: {
  title: string;
  count: number;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="mb-16"
  >
    {/* Tier label with red underline draw */}
    <div className="relative text-center mb-8">
      <h3 className="font-display font-semibold text-lg text-muted-foreground inline-block relative">
        {title}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3, duration: 0.5, ease: "easeOut" }}
        />
      </h3>
    </div>
    <div className="flex flex-wrap justify-center gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`${title}-${i}`}
          className="shimmer-card card-border rounded-xl p-8 bg-card flex flex-col items-center justify-center min-w-[160px] hover:border-primary/30 transition-colors group"
        >
          {/* Placeholder icon */}
          <svg viewBox="0 0 60 60" className="w-12 h-12 mb-3 opacity-30 group-hover:opacity-50 transition-opacity">
            <rect x="5" y="5" width="50" height="50" rx="8" fill="none" stroke="#E62B1E" strokeWidth="1.5" />
            <line x1="15" y1="30" x2="45" y2="30" stroke="#E62B1E" strokeWidth="1" opacity="0.5" />
            <line x1="30" y1="15" x2="30" y2="45" stroke="#E62B1E" strokeWidth="1" opacity="0.5" />
          </svg>
          <span className="font-display font-bold text-sm text-primary">Become a Sponsor</span>
          <span className="text-xs text-muted-foreground mt-1">Your brand here</span>
        </div>
      ))}
    </div>
  </motion.div>
);

const Sponsors = () => {
  return (
    <Layout>
      <section className="pt-32 pb-24 relative">
        <div className="section-underglow" />

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8"
          >
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Our Partners</p>
            <h1 className="font-display font-bold text-4xl sm:text-5xl">Sponsors</h1>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              TEDxICEAS is made possible by the generous support of our sponsors.
            </p>
          </motion.div>

          {/* TEDx logo prominence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-center mb-20"
          >
            <span className="font-display font-bold text-5xl">
              TEDx<span className="text-primary">ICEAS</span>
            </span>
          </motion.div>

          <SponsorTier title="Gold Sponsors" count={2} delay={0.2} />
          <SponsorTier title="Silver Sponsors" count={3} delay={0.3} />

          {/* Partner with us CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16 pt-12 border-t border-border"
          >
            <h3 className="font-display font-semibold text-2xl mb-4">Partner With Us</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Interested in sponsoring TEDxICEAS? We'd love to hear from you.
            </p>
            <a
              href="mailto:tedx@iceas.edu.in"
              className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(230,43,30,0.3)] inline-block"
            >
              Become a Sponsor
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Sponsors;
