import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", reason: "" });
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitState("loading");

      // Simulate submission
      setTimeout(() => {
        setSubmitState("success");
        toast.success("Registration submitted! We'll be in touch soon.");
        setTimeout(() => {
          setSubmitState("idle");
          setForm({ name: "", email: "", phone: "", reason: "" });
        }, 2000);
      }, 1500);
    },
    []
  );

  // Ripple effect on button
  const btnRef = useRef<HTMLButtonElement>(null);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRipple(null);
  }, []);

  return (
    <Layout>
      <section className="pt-32 pb-24 relative">
        <div className="section-underglow" />

        <div className="container mx-auto px-6 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Join Us</p>
            <h1 className="font-display font-bold text-4xl sm:text-5xl">Register</h1>
            <p className="text-muted-foreground mt-4">
              Secure your spot at TEDxICEAS — What Shapes Us.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="space-y-6 glass-card rounded-2xl p-8"
          >
            {[
              { key: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
              { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              { key: "phone", label: "Phone", type: "tel", placeholder: "+91 98765 43210" },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-sm font-medium mb-2 block">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  required
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full bg-card card-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200"
                />
              </div>
            ))}
            <div>
              <label className="text-sm font-medium mb-2 block">Why do you want to attend?</label>
              <textarea
                placeholder="Tell us what excites you about TEDxICEAS..."
                rows={4}
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className="w-full bg-card card-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200 resize-none"
              />
            </div>

            {/* Submit button with states */}
            <button
              ref={btnRef}
              type="submit"
              disabled={submitState !== "idle"}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`w-full py-3.5 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden ripple-btn ${
                submitState === "success"
                  ? "bg-green-600 text-white"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
              }`}
            >
              {/* Ripple effect */}
              {ripple && submitState === "idle" && (
                <span
                  className="ripple-effect"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: 20,
                    height: 20,
                    marginLeft: -10,
                    marginTop: -10,
                  }}
                />
              )}

              {submitState === "idle" && "Submit Registration"}
              {submitState === "loading" && (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" strokeLinecap="round" />
                  </svg>
                  Submitting...
                </span>
              )}
              {submitState === "success" && (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Registration Received!
                </span>
              )}
            </button>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
