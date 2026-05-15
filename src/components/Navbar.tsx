import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Speakers", path: "/speakers" },
  { label: "Venue", path: "/venue" },
  { label: "Gallery", path: "/gallery" },
  { label: "Team", path: "/team" },
  { label: "Sponsors", path: "/sponsors" },
];

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const activePath = hoveredPath || location.pathname;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-between items-start py-6 px-6 sm:px-12">
      {/* Logo on top left */}
      <Link to="/" className="pointer-events-auto flex items-center">
        <motion.img
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          src={logo}
          alt="TEDxICEAS Logo"
          className="h-10 sm:h-12 w-auto object-contain drop-shadow-2xl"
        />
      </Link>

      {/* Desktop Right Side Hover Pill */}
      <div className="hidden md:flex flex-col items-end pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`flex items-center overflow-hidden rounded-full border transition-all duration-300 ease-out ${
            scrolled || isHovered
              ? "backdrop-blur-[20px] bg-[rgba(10,10,10,0.8)] border-[rgba(255,255,255,0.06)] shadow-lg shadow-black/20"
              : "bg-transparent border-transparent"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setHoveredPath(null);
          }}
          layout
        >
          <div className="flex items-center h-[56px] px-5">
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.8 }}
                  className="flex items-center gap-6 whitespace-nowrap overflow-hidden"
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onMouseEnter={() => setHoveredPath(item.path)}
                      onMouseLeave={() => setHoveredPath(null)}
                      className={`text-sm font-medium transition-colors duration-200 hover:text-primary relative py-1 ${
                        location.pathname === item.path
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                      {activePath === item.path && (
                        <motion.div
                          layoutId="navUnderline"
                          className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  ))}
                  
                  <button
                    onClick={() => window.dispatchEvent(new Event('open-ai-chat'))}
                    className="text-sm font-medium transition-colors duration-200 hover:text-primary relative py-1 text-muted-foreground flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    Ask AI
                  </button>

                  <Link
                    to="/register"
                    className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Register
                  </Link>
                  {/* Divider */}
                  <div className="w-px h-6 bg-white/20 mx-2" />
                </motion.div>
              )}
            </AnimatePresence>
            <Menu className="w-6 h-6 text-foreground shrink-0 cursor-pointer" />
          </div>
        </motion.div>
      </div>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden text-foreground pointer-events-auto bg-black/50 p-3 rounded-full glass border border-white/10"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu — slides in from right with clip-path */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 0 100%)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            exit={{ clipPath: "inset(0 0 0 100%)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 md:hidden bg-black z-[60] pointer-events-auto flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMobileOpen(false)}
                className="text-foreground p-3"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    to={item.path}
                    className={`text-2xl font-display font-semibold transition-colors ${
                      location.pathname === item.path
                        ? "text-primary"
                        : "text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + navItems.length * 0.06, duration: 0.4 }}
              >
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setTimeout(() => window.dispatchEvent(new Event('open-ai-chat')), 300);
                  }}
                  className="text-2xl font-display font-semibold transition-colors text-white flex items-center gap-2 hover:text-primary"
                >
                  <Sparkles className="w-6 h-6" />
                  Ask AI
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + (navItems.length + 1) * 0.06, duration: 0.4 }}
              >
                <Link
                  to="/register"
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-lg font-semibold mt-4 inline-block"
                >
                  Register
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
