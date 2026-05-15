import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import CustomCursor from "./CustomCursor";
import FilmGrain from "./FilmGrain";
import { ReactLenis } from "@studio-freight/react-lenis";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ReactLenis root options={{ lerp: 0.15, smoothWheel: true }}>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
        {/* Film Grain Overlay */}
        <FilmGrain />

        {/* Ambient Gradient Lights */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-primary/5 rounded-full blur-[120px] mix-blend-screen opacity-50 -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[100px] mix-blend-screen opacity-30 translate-y-1/4 -translate-x-1/4" />
        </div>

        <CustomCursor />
        <Navbar />
        <motion.main
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </ReactLenis>
  );
};

export default Layout;
