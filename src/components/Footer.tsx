import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const footerLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Speakers", path: "/speakers" },
  { label: "Venue", path: "/venue" },
  { label: "Gallery", path: "/gallery" },
  { label: "Team", path: "/team" },
  { label: "Sponsors", path: "/sponsors" },
  { label: "Register", path: "/register" },
];

const SocialIcon = ({ children, href, label }: { children: React.ReactNode; href: string; label: string }) => (
  <motion.a
    href={href}
    className="text-muted-foreground hover:text-primary transition-colors relative"
    aria-label={label}
    whileHover={{ scale: 1.2 }}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
  >
    {children}
    {/* Red glow underneath on hover */}
    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-3 bg-primary/0 hover:bg-primary/30 blur-sm rounded-full transition-colors pointer-events-none" />
  </motion.a>
);

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-background"
      style={{ borderTop: "1px solid rgba(230,43,30,0.3)" }}
    >
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <img
              src={logo}
              alt="TEDxICEAS Logo"
              className="h-10 w-auto object-contain mb-4"
              loading="lazy"
            />
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Ideas Worth Spreading. An independently organized TEDx event at Impact College of Engineering and Applied Sciences, Bengaluru.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">Navigate</h4>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <a
              href="mailto:tedx@iceas.edu.in"
              className="text-muted-foreground text-sm hover:text-primary transition-colors"
            >
              tedx@iceas.edu.in
            </a>
            <div className="flex gap-4 mt-6">
              <SocialIcon href="#" label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </SocialIcon>
              <SocialIcon href="#" label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              </SocialIcon>
              <SocialIcon href="#" label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </SocialIcon>
            </div>

            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mt-8 mb-3">Follow TED</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/ted/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">Instagram</a>
              <a href="https://twitter.com/TEDTalks" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">Twitter</a>
              <a href="https://www.youtube.com/ted" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">YouTube</a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs text-center md:text-left">
            This independent TEDx event is operated under license from TED.
          </p>
          <a
            href="https://www.ted.com/tedx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline"
          >
            Learn more about the TEDx program
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
