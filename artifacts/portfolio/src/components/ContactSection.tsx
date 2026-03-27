import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, CheckCircle } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { MagneticButton } from "./MagneticButton";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", message: "" });
    }, 4000);
  };

  const socials = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Bourmeche-Ahmed",
      color: "hover:text-white",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/ahmed-bourmeche",
      color: "hover:text-blue-400",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:ahmed.bourmeche.eng@gmail.com",
      color: "hover:text-cyan-400",
    },
  ];

  return (
    <section id="contact" className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <SectionHeader
        tag="Contact"
        title="Get In Touch"
        subtitle="Interested in working together or have a project in mind? Let's connect."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <p className="text-muted-foreground leading-relaxed">
            I'm open to freelance projects, full-time opportunities, and collaborations
            on interesting engineering challenges — especially in real-time systems,
            IIoT dashboards, and TypeScript/React applications.
          </p>

          <div className="space-y-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 text-muted-foreground ${s.color} transition-colors group`}
              >
                <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-current/30 transition-colors">
                  <s.icon className="w-4 h-4" />
                </span>
                <span className="text-sm font-medium">{s.label}</span>
              </a>
            ))}
          </div>

          <div className="pt-2">
            <MagneticButton
              variant="outline"
              href="/cv/AhmedBourmeche_CV.pdf"
              download="AhmedBourmeche_CV.pdf"
            >
              Download CV
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-4 p-10 rounded-2xl border border-green-500/30 bg-green-500/5 text-center"
            >
              <CheckCircle className="w-12 h-12 text-green-400" />
              <div>
                <p className="font-semibold text-green-400 text-lg">Message queued</p>
                <p className="text-sm text-muted-foreground mt-1">(Demo mode — no data is sent)</p>
              </div>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-white/8 bg-card/40 backdrop-blur-sm p-6"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent rounded-t-2xl" />
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about your project..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
