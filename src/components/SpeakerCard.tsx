import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const cineEase = [0.22, 1, 0.36, 1] as const;

interface SpeakerCardProps {
  name: string;
  role: string;
  talkTitle: string;
  bio: string;
  index: number;
  isTBA?: boolean;
}

const SpeakerCard = ({ name, role, talkTitle, bio, index, isTBA = false }: SpeakerCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Subtler cinematic tilt
    setTransform(`perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)");
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        ease: cineEase,
        delay: index * 0.1,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className="rounded-2xl bg-card overflow-hidden group relative min-h-[420px] flex flex-col justify-end"
    >
      {/* Hover border — SVG clockwise draw, slower and more elegant */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-30 rounded-2xl"
        style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.5s" }}
      >
        <rect
          x="1" y="1"
          width="calc(100% - 2px)" height="calc(100% - 2px)"
          rx="15" ry="15"
          fill="none"
          stroke="rgba(230,43,30,0.4)"
          strokeWidth="1"
          strokeDasharray="2000"
          strokeDashoffset={isHovered ? "0" : "2000"}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>

      {/* Background — geometric placeholder or image */}
      <div className="absolute inset-0 overflow-hidden bg-secondary">
        {isTBA ? (
          /* Abstract geometric avatar placeholder with soft cinematic feel */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#111] to-[#050505]">
            <motion.svg 
              viewBox="0 0 120 120" 
              className="w-32 h-32 opacity-[0.15] mix-blend-screen"
              animate={isHovered ? { scale: 1.05, opacity: 0.25 } : { scale: 1, opacity: 0.15 }}
              transition={{ duration: 1.5, ease: cineEase }}
            >
              <polygon points="60,10 110,40 110,90 60,120 10,90 10,40" fill="none" stroke="#E62B1E" strokeWidth="1" />
              <polygon points="60,25 95,45 95,85 60,105 25,85 25,45" fill="none" stroke="#E62B1E" strokeWidth="0.5" opacity="0.6" />
              <circle cx="60" cy="60" r="12" fill="#E62B1E" opacity="0.2" />
            </motion.svg>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#111] to-[#050505]" />
        )}

        {/* Elegant Red gradient overlay — slides up smoothly on hover */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? "translateY(0)" : "translateY(100%)" }}
        />

        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      <div className="relative p-8 z-10 w-full transform transition-transform duration-700 cubic-bezier(0.22, 1, 0.36, 1) group-hover:-translate-y-2">
        <h3 className="font-display font-bold text-2xl text-white tracking-tight">{name}</h3>
        <p className="text-primary text-sm mt-1.5 font-medium tracking-wide uppercase">{role}</p>

        {/* Hidden on initial state, expands smoothly on hover */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100">
          <div className="overflow-hidden">
            <div className="pt-4 mt-4 border-t border-white/10">
              <p className="text-white/90 text-sm font-medium italic">"{talkTitle}"</p>
              <p className="text-white/60 text-xs mt-3 line-clamp-3 leading-relaxed font-body">{bio}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpeakerCard;
