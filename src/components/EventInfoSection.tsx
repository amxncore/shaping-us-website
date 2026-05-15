import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { MapPin, Calendar, Users, Clock } from "lucide-react";

const cineEase = [0.22, 1, 0.36, 1] as const;

const eventDetails = [
  { icon: Calendar, label: "Date", value: "July 18, 2026" },
  { icon: MapPin, label: "Venue", value: "Impact College of Engineering and Applied Sciences" },
  { icon: Users, label: "City", value: "Bengaluru, India" },
];

const schedule = [
  { time: "9:00 AM", title: "Registration & Check-in", description: "Arrival, networking, and welcome refreshments" },
  { time: "10:00 AM", title: "Opening Ceremony", description: "Welcome address and event kick-off" },
  { time: "10:30 AM", title: "Session 1 — Ideas That Shape", description: "First round of speaker talks" },
  { time: "12:00 PM", title: "Lunch & Networking", description: "Connect with speakers and attendees" },
  { time: "1:30 PM", title: "Session 2 — Forces of Change", description: "Second round of speaker talks" },
  { time: "3:00 PM", title: "Interactive Break", description: "Workshops and collaborative activities" },
  { time: "3:45 PM", title: "Session 3 — Shaping Tomorrow", description: "Final round of speaker talks" },
  { time: "5:00 PM", title: "Closing & After-Party", description: "Closing remarks and celebration" },
];

// 3D Tilt card
const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Smoother, subtler tilt
    setTransform(`perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)");
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform,
        transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
};

const EventInfoSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 50%"], // Tighter offset for more visible drawing
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="py-32 relative">
      <div className="section-underglow" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: cineEase }}
          className="text-center mb-20"
        >
          <p className="text-primary text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 font-body font-medium">Event Details</p>
          <h2 className="font-display font-black text-4xl sm:text-5xl tracking-tight">TEDxICEAS</h2>
        </motion.div>

        {/* Info Cards with subtle 3D tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {eventDetails.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 * (i + 1), ease: cineEase }}
            >
              <TiltCard className="card-border rounded-2xl p-8 bg-card text-center hover:border-primary/20 transition-colors duration-500 group relative overflow-hidden">
                <motion.div
                  initial={{ scale: 1 }}
                  whileInView={{ scale: [1, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease: cineEase }}
                  className="mb-6 relative z-10"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors duration-500">
                    <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                </motion.div>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-2 font-medium relative z-10">{item.label}</p>
                <p className="font-display font-semibold text-base relative z-10 leading-tight">{item.value}</p>
                
                {/* Elegant top border glow on hover */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-700 opacity-0 group-hover:opacity-100" />
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: cineEase }}
          className="text-muted-foreground text-center mt-16 max-w-2xl mx-auto leading-relaxed text-lg"
        >
          TEDxICEAS brings together visionary thinkers, creators, and change-makers to explore the ideas, innovations, and experiences that shape our world. Join us for a day of powerful talks and deep connections.
        </motion.p>

        {/* Event Schedule / Timeline */}
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: cineEase }}
          className="mt-32"
        >
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-primary" strokeWidth={1.5} />
              <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium">Schedule</p>
            </div>
            <h3 className="font-display font-black text-3xl sm:text-4xl tracking-tight">Event Day Timeline</h3>
          </div>

          <div className="max-w-4xl mx-auto relative px-4 sm:px-0">
            {/* Timeline line — cinematic draw */}
            <div className="absolute left-[24px] sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/5 overflow-hidden">
              <motion.div
                className="w-full bg-gradient-to-b from-primary via-primary/50 to-transparent"
                style={{ height: lineHeight }}
              />
            </div>

            <div className="space-y-12 sm:space-y-24">
              {schedule.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={item.time}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: cineEase }}
                    className={`flex flex-col sm:flex-row relative group ${isLeft ? 'sm:justify-start' : 'sm:justify-end'}`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-[6px] sm:left-1/2 sm:-translate-x-1/2 top-0 mt-1.5 sm:mt-0 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-background border-[2px] border-primary/30 group-hover:border-primary group-hover:scale-125 transition-all duration-500 z-10" />
                      <div className="absolute w-8 h-8 rounded-full bg-primary/0 group-hover:bg-primary/10 scale-0 group-hover:scale-100 transition-all duration-700 ease-out blur-sm" />
                    </div>

                    {/* Content Card */}
                    <div className={`ml-12 sm:ml-0 sm:w-[45%] ${isLeft ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'}`}>
                      <div className="flex flex-col sm:inline-flex">
                        <span className="text-primary font-display font-semibold text-sm mb-1 tracking-wide">{item.time}</span>
                        <h4 className="font-display font-bold text-lg sm:text-xl text-white/90 mb-2">{item.title}</h4>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventInfoSection;
