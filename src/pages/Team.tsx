import Layout from "@/components/Layout";
import { motion } from "framer-motion";

// Different geometric shapes for each team member
const geometricShapes = [
  // Crystal / Diamond
  (
    <svg viewBox="0 0 80 80" className="w-16 h-16">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E62B1E" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8B0000" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <polygon points="40,5 75,40 40,75 5,40" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
      <polygon points="40,15 65,40 40,65 15,40" fill="none" stroke="#E62B1E" strokeWidth="0.8" opacity="0.5" />
      <circle cx="40" cy="40" r="6" fill="#E62B1E" opacity="0.3" />
    </svg>
  ),
  // Hexagonal
  (
    <svg viewBox="0 0 80 80" className="w-16 h-16">
      <polygon points="40,5 72,22 72,58 40,75 8,58 8,22" fill="none" stroke="#E62B1E" strokeWidth="1.5" opacity="0.7" />
      <polygon points="40,18 60,28 60,52 40,62 20,52 20,28" fill="none" stroke="#E62B1E" strokeWidth="0.8" opacity="0.4" />
      <line x1="40" y1="5" x2="40" y2="75" stroke="#E62B1E" strokeWidth="0.5" opacity="0.3" />
    </svg>
  ),
  // Triangle mesh
  (
    <svg viewBox="0 0 80 80" className="w-16 h-16">
      <polygon points="40,5 75,70 5,70" fill="none" stroke="#E62B1E" strokeWidth="1.5" opacity="0.7" />
      <polygon points="40,20 62,60 18,60" fill="none" stroke="#E62B1E" strokeWidth="0.8" opacity="0.4" />
      <polygon points="40,35 50,50 30,50" fill="#E62B1E" opacity="0.2" />
    </svg>
  ),
  // Concentric circles
  (
    <svg viewBox="0 0 80 80" className="w-16 h-16">
      <circle cx="40" cy="40" r="35" fill="none" stroke="#E62B1E" strokeWidth="1.5" opacity="0.7" />
      <circle cx="40" cy="40" r="25" fill="none" stroke="#E62B1E" strokeWidth="1" opacity="0.5" />
      <circle cx="40" cy="40" r="15" fill="none" stroke="#E62B1E" strokeWidth="0.8" opacity="0.3" />
      <circle cx="40" cy="40" r="5" fill="#E62B1E" opacity="0.4" />
    </svg>
  ),
  // Star burst
  (
    <svg viewBox="0 0 80 80" className="w-16 h-16">
      {[0, 45, 90, 135].map((angle) => (
        <line
          key={angle}
          x1="40" y1="5" x2="40" y2="75"
          stroke="#E62B1E" strokeWidth="1" opacity="0.5"
          transform={`rotate(${angle} 40 40)`}
        />
      ))}
      <circle cx="40" cy="40" r="12" fill="none" stroke="#E62B1E" strokeWidth="1.5" opacity="0.7" />
      <circle cx="40" cy="40" r="4" fill="#E62B1E" opacity="0.4" />
    </svg>
  ),
  // Pentagon
  (
    <svg viewBox="0 0 80 80" className="w-16 h-16">
      <polygon points="40,5 75,30 63,70 17,70 5,30" fill="none" stroke="#E62B1E" strokeWidth="1.5" opacity="0.7" />
      <polygon points="40,20 60,35 53,60 27,60 20,35" fill="none" stroke="#E62B1E" strokeWidth="0.8" opacity="0.4" />
      <circle cx="40" cy="42" r="6" fill="#E62B1E" opacity="0.25" />
    </svg>
  ),
];

const teamMembers = [
  { name: "Coming Soon", role: "Organizer & Licensee", shapeIdx: 0 },
  { name: "Coming Soon", role: "Co-Organizer", shapeIdx: 1 },
  { name: "Coming Soon", role: "Speaker Curation Lead", shapeIdx: 2 },
  { name: "Coming Soon", role: "Creative Director", shapeIdx: 3 },
  { name: "Coming Soon", role: "Marketing Lead", shapeIdx: 4 },
  { name: "Coming Soon", role: "Website Manager", shapeIdx: 5 },
];

const Team = () => {
  return (
    <Layout>
      <section className="pt-32 pb-24 relative">
        <div className="section-underglow" />

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">The People Behind</p>
            <h1 className="font-display font-bold text-4xl sm:text-5xl">Our Team</h1>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              The passionate individuals organizing TEDxICEAS.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, i) => (
              <motion.div
                key={`team-${i}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  rotateY: 5,
                  rotateX: -3,
                  transition: { duration: 0.3 },
                }}
                style={{ perspective: "800px" }}
                className="text-center group"
              >
                {/* Avatar with rotating border on hover */}
                <div className="w-32 h-32 rounded-full mx-auto mb-4 relative flex items-center justify-center">
                  {/* Rotating conic-gradient border */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[2px]"
                  >
                    <div className="w-full h-full rounded-full rotating-border p-[2px]">
                      <div className="w-full h-full rounded-full bg-secondary" />
                    </div>
                  </div>
                  {/* Default border */}
                  <div className="absolute inset-0 rounded-full card-border group-hover:border-transparent transition-colors" />
                  {/* Geometric shape */}
                  <div className="relative z-10 flex items-center justify-center">
                    {geometricShapes[member.shapeIdx]}
                  </div>
                </div>
                <h3 className="font-display font-semibold italic text-muted-foreground">{member.name}</h3>
                <p className="text-primary text-sm mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
