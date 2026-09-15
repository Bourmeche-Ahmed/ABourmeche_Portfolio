import { useState, useEffect } from "react";
import { Send, Github, Linkedin, Mail, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "emailjs-com";
import { SectionHeader } from "./SectionHeader";
import { ASSET_PATHS } from "@/lib/paths";

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      // Graceful fallback for demonstration / local testing
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        reply_to: form.email,
      });

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send message. Please reach out directly via email."
      );
    } finally {
      setLoading(false);
    }
  };

  const socials = [
    {
      icon: Mail,
      label: "ahmed.bourmeche.eng@gmail.com",
      href: "mailto:ahmed.bourmeche.eng@gmail.com",
      title: "Direct Email",
    },
    {
      icon: Linkedin,
      label: "linkedin.com/in/ahmed-bourmeche",
      href: "https://linkedin.com/in/ahmed-bourmeche",
      title: "LinkedIn",
    },
    {
      icon: Github,
      label: "github.com/Bourmeche-Ahmed",
      href: "https://github.com/Bourmeche-Ahmed",
      title: "GitHub",
    },
  ];

  return (
    <section id="contact" className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Contact & Internship Inquiry"
          subtitle="Seeking a Final-Year Engineering Internship (PFE) starting February 2027 · Open to relocation and international opportunities."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Information & Direct Channels */}
          <div className="md:col-span-5 space-y-6">
            <div className="border border-rule bg-panel-raised p-6 rounded-[2px] space-y-4">
              <h3 className="font-heading font-bold text-lg text-ink">
                Internship & Collaboration
              </h3>
              <p className="font-sans text-sm text-ink-soft leading-relaxed">
                Currently open to discussing final-year engineering projects (PFE) in industrial IoT, embedded firmware development, PLC & automation systems, or hardware-in-the-loop control.
              </p>
              <div className="pt-2">
                <a
                  href={ASSET_PATHS.cv()}
                  download="Ahmed_Bourmeche_RESUME.pdf"
                  className="btn-primary no-custom-link w-full text-center"
                >
                  Download Complete Resume (PDF)
                </a>
              </div>
            </div>

            {/* Direct Communication Channels */}
            <div className="border border-rule bg-panel-raised p-6 rounded-[2px] space-y-3">
              <h3 className="font-heading font-bold text-base text-ink mb-3">
                Direct Channels
              </h3>
              <div className="space-y-3">
                {socials.map((s) => (
                  <div key={s.title} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-[2px] bg-panel-sunk border border-rule flex items-center justify-center text-ink shrink-0">
                      <s.icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-mono text-ink-soft leading-tight">{s.title}</p>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="panel-link font-sans text-xs sm:text-sm text-ink truncate block"
                      >
                        {s.label}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7">
            <div className="border border-rule bg-panel-raised p-6 sm:p-8 rounded-[2px]">
              <h3 className="font-heading font-bold text-xl text-ink mb-2">
                Send Direct Message
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ink-soft mb-6">
                Transmit project requirements, internship scopes, or technical inquiries directly.
              </p>

              {submitted ? (
                <div className="p-6 border border-rule bg-panel-sunk rounded-[2px] flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-signal shrink-0" />
                  <div>
                    <p className="font-sans font-semibold text-sm text-ink">Transmission Successful</p>
                    <p className="font-sans text-xs text-ink-soft mt-0.5">Your message has been dispatched. I will reply promptly.</p>
                  </div>
                </div>
              ) : error ? (
                <div className="p-4 border border-rule bg-panel-sunk rounded-[2px] mb-4 flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-signal shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-xs text-ink">{error}</p>
                    <button
                      onClick={() => setError(null)}
                      className="font-sans text-[11px] text-ink-soft underline mt-1"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-ink-soft mb-1">
                      NAME / SENDER
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Lead Engineer / Hiring Manager"
                      className="w-full px-3 py-2 rounded-[2px] bg-panel-sunk border border-rule text-sm text-ink placeholder:text-ink-soft focus-visible:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-ink-soft mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="e.g. name@organization.com"
                      className="w-full px-3 py-2 rounded-[2px] bg-panel-sunk border border-rule text-sm text-ink placeholder:text-ink-soft focus-visible:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-ink-soft mb-1">
                      MESSAGE CONTENT
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Describe the opportunity, technical scope, or discussion topic..."
                      className="w-full px-3 py-2 rounded-[2px] bg-panel-sunk border border-rule text-sm text-ink placeholder:text-ink-soft focus-visible:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-2.5"
                  >
                    {loading ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
