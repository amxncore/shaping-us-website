import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FluidBackground = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    // Initial check
    setIsDark(root.classList.contains("dark") || window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    // Observer for class changes
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    
    // Listener for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!root.classList.contains("dark") && !root.classList.contains("light")) {
        setIsDark(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // TEDxBangalore inspired fluid colors
  const colors = isDark
    ? {
        c1: "#3b0764", // Deep purple
        c2: "#6b21a8", // Purple
        c3: "#9d174d", // Deep pink/magenta
        c4: "#1e1b4b", // Very dark indigo
      }
    : {
        c1: "#e9d5ff", // Light purple
        c2: "#d8b4fe", // Light violet
        c3: "#fbcfe8", // Light pink
        c4: "#f3e8ff", // Very light purple
      };

  return (
    <div className="absolute inset-0 overflow-hidden w-full h-full -z-10 bg-background transition-colors duration-700">
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors.c1} 0%, transparent 70%)`,
          filter: "blur(60px)",
          transform: "translate3d(0,0,0)",
        }}
      />
      
      {/* Animated blob 1 */}
      <motion.div
        animate={{
          x: ["-20%", "20%", "-10%", "-20%"],
          y: ["-20%", "10%", "30%", "-20%"],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full mix-blend-normal opacity-70"
        style={{
          background: `radial-gradient(circle, ${colors.c2} 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Animated blob 2 */}
      <motion.div
        animate={{
          x: ["20%", "-20%", "10%", "20%"],
          y: ["20%", "-10%", "-30%", "20%"],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] right-[10%] w-[55vw] h-[55vw] rounded-full mix-blend-normal opacity-60"
        style={{
          background: `radial-gradient(circle, ${colors.c3} 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Animated blob 3 */}
      <motion.div
        animate={{
          x: ["0%", "30%", "-20%", "0%"],
          y: ["0%", "30%", "10%", "0%"],
          scale: [0.9, 1.1, 1, 0.9],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[10%] left-[30%] w-[70vw] h-[70vw] rounded-full mix-blend-normal opacity-50"
        style={{
          background: `radial-gradient(circle, ${colors.c4} 0%, transparent 70%)`,
          filter: "blur(90px)",
        }}
      />
      
      {/* Glass overlay to blend everything smoothly */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-[30px]" />
    </div>
  );
};

export default FluidBackground;
