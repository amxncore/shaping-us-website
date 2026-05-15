import Layout from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";

const cineEase = [0.22, 1, 0.36, 1] as const;

const galleryItems = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  title: `TEDxICEAS 2024 — Coming Soon`,
  sizeClass: i % 5 === 0 ? "tall" : i % 7 === 0 ? "wide" : "",
}));

const Gallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prevImage = () =>
    setLightbox((prev) => (prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null));
  const nextImage = () =>
    setLightbox((prev) => (prev !== null ? (prev + 1) % galleryItems.length : null));

  return (
    <Layout>
      <section className="pt-32 pb-32 relative">
        <div className="section-underglow" />

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: cineEase }}
            className="text-center mb-24"
          >
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight">
              {"HIGHLIGHTS".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 1.0, ease: cineEase }}
                  style={{ textShadow: "none" }}
                >
                  <motion.span
                    animate={{
                      textShadow: [
                        "0 0 30px rgba(230,43,30,0.5)",
                        "0 0 0px rgba(230,43,30,0)",
                      ],
                      color: ["#E62B1E", "#ffffff"],
                    }}
                    transition={{
                      delay: 0.2 + i * 0.05,
                      duration: 1.5,
                      ease: cineEase,
                    }}
                  >
                    {char}
                  </motion.span>
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 1.0, ease: cineEase }}
              className="text-muted-foreground mt-6 max-w-md mx-auto text-lg"
            >
              Moments captured from TEDxICEAS events.
            </motion.p>
          </motion.div>

          <div className="gallery-grid max-w-6xl mx-auto">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: (i % 4) * 0.1,
                  duration: 0.8,
                  ease: cineEase,
                }}
                onClick={() => openLightbox(i)}
                className={`${item.sizeClass} rounded-2xl overflow-hidden relative group cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#111] via-[#0a0a0a] to-[#1a0505]">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
                </div>

                <div className="absolute inset-0 bg-black/80 group-hover:bg-black/20 transition-all duration-700 ease-out flex flex-col items-center justify-center">
                  <Camera className="w-8 h-8 text-white/20 group-hover:text-primary/80 transition-colors duration-500" />
                  <p className="text-white/40 text-xs mt-3 font-body group-hover:text-white/90 transition-colors duration-500 tracking-wide">
                    {item.title}
                  </p>
                </div>

                <div className="absolute inset-0 border border-white/5 group-hover:border-primary/30 rounded-2xl transition-colors duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: cineEase }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-10"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-8 text-white/50 hover:text-white transition-colors z-10"
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-8 text-white/50 hover:text-white transition-colors z-10"
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            <motion.div
              key={lightbox}
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: cineEase }}
              onClick={(e) => e.stopPropagation()}
              className="w-[85vw] h-[75vh] max-w-5xl rounded-3xl overflow-hidden bg-gradient-to-br from-[#111] to-[#050505] flex items-center justify-center shadow-2xl"
            >
              <div className="text-center">
                <Camera className="w-16 h-16 text-white/10 mx-auto mb-6" strokeWidth={1} />
                <p className="text-white/60 font-body text-lg tracking-wide">
                  TEDxICEAS 2024 — Photo {lightbox + 1}
                </p>
                <p className="text-white/30 text-sm mt-2 uppercase tracking-widest">Coming Soon</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
