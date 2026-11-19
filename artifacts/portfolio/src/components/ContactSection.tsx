import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Download, Copy, Check, AlertCircle, Loader2, Linkedin, Github } from "lucide-react";
import emailjs from "emailjs-com";
import { ASSET_PATHS, triggerResumeDownload } from "@/lib/paths";
import { copyToClipboard } from "@/lib/utils";
import { store } from "@/store";

const TARGET_EMAIL = "ahmed.bourmeche@insat.ucar.tn";

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "CttQF4TAsxgsNuuOg";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_l6rmlzb";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_2364qte";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [validationErrors, setValidationErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  const handleCopyEmail = async () => {
    await copyToClipboard(TARGET_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      errs.name = "Please provide your name (minimum 2 characters).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
      errs.email = "Please provide a valid email address.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = "Please enter a descriptive message (minimum 10 characters).";
    }
    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setError(null);
    setLoading(true);

    const emailSubject = encodeURIComponent(`Portfolio Inquiry from ${form.name}`);
    const emailBody = encodeURIComponent(
      `From: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    try {
      if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            to_email: TARGET_EMAIL,
            email_to: TARGET_EMAIL,
            recipient: TARGET_EMAIL,
            user_email: TARGET_EMAIL,
            to_name: "Ahmed Bourmeche",
            from_name: form.name,
            from_email: form.email,
            message: form.message,
            reply_to: form.email,
          },
          EMAILJS_PUBLIC_KEY
        );
      } else {
        window.location.href = `mailto:${TARGET_EMAIL}?subject=${emailSubject}&body=${emailBody}`;
      }

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setValidationErrors({});

      // Trigger 3D robot nod and green LED
      store.setState({
        formSuccessCount: store.getState().formSuccessCount + 1,
        robotBalanceImpulse: 0.15,
      });
    } catch (err: any) {
      console.error("EmailJS Error:", err);
      const detail = err?.text || err?.message || "";
      setError(
        `Email service notification: ${detail ? `"${detail}"` : "Service unreachable"}. Opening direct mailto client...`
      );
      window.location.href = `mailto:${TARGET_EMAIL}?subject=${emailSubject}&body=${emailBody}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-b border-hairline relative">
      {/* Background oversized numeral 06 */}
      <div className="absolute right-4 top-10 text-[18vw] font-heading font-extrabold numeral-outlined opacity-15 select-none pointer-events-none">
        06
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-hairline">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-accent mb-1">
              <span>06 // TRANSMISSION CHANNEL</span>
              <span className="text-soft">·</span>
              <span>LET'S BUILD SOMETHING</span>
            </div>
            <h2 className="font-heading font-black text-4xl sm:text-5xl text-ink tracking-tight uppercase">
              Contact & Inquiry
            </h2>
          </div>
          <p className="font-mono text-[11px] text-soft max-w-xs text-left md:text-right">
            Open for Final-Year Engineering Projects (PFE), embedded firmware development, and international relocation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-hairline bg-surface p-6 sm:p-7 rounded-[2px] space-y-4">
              <h3 className="font-heading font-bold text-2xl text-ink">
                Let's Build Something
              </h3>
              <p className="font-sans text-sm text-soft leading-relaxed">
                Whether you need a dedicated engineer for automotive electronics, multi-protocol edge gateways, bare-metal robotics, or closed-loop digital twin systems, my inbox is open.
              </p>

              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={ASSET_PATHS.cv()}
                  download="Ahmed_Bourmeche_RESUME.pdf"
                  onClick={triggerResumeDownload}
                  className="btn-primary w-full text-center inline-flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="btn-secondary w-full text-xs inline-flex items-center justify-center gap-2 min-h-[44px]"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-accent" />
                      <span>Copied: {TARGET_EMAIL}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-soft" />
                      <span>Copy Direct Email Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Communication Channels */}
            <div className="border border-hairline bg-surface p-6 rounded-[2px] space-y-3 font-mono text-xs">
              <div className="text-soft uppercase tracking-wider text-[10px] pb-1 border-b border-hairline">
                Direct Engineering Channels
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-accent" />
                  <a href={`mailto:${TARGET_EMAIL}`} className="text-ink hover:text-accent truncate">
                    {TARGET_EMAIL}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-accent" />
                  <a
                    href="https://linkedin.com/in/ahmed-bourmeche"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-accent truncate"
                  >
                    linkedin.com/in/ahmed-bourmeche
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-accent" />
                  <a
                    href="https://github.com/Bourmeche-Ahmed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-accent truncate"
                  >
                    github.com/Bourmeche-Ahmed
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Transmission Form */}
          <div className="lg:col-span-7">
            <div className="border border-hairline bg-surface p-6 sm:p-8 rounded-[2px]">
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-hairline">
                <div>
                  <h3 className="font-heading font-bold text-xl text-ink">
                    Dispatch Message
                  </h3>
                  <p className="font-sans text-xs text-soft mt-0.5">
                    Direct transmission to <span className="text-ink font-medium">{TARGET_EMAIL}</span>
                  </p>
                </div>
                <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-[1px] bg-surface2 border border-hairline text-accent font-semibold">
                  ENCRYPTED TLS
                </span>
              </div>

              {submitted ? (
                <div className="p-6 border border-hairline bg-surface2 rounded-[2px] flex items-center gap-4">
                  <div className="w-10 h-10 rounded-[2px] bg-accent/15 border border-accent/40 flex items-center justify-center text-accent shrink-0">
                    <Check className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-heading font-bold text-lg text-ink">
                      Message Dispatched Successfully
                    </p>
                    <p className="font-sans text-xs text-soft mt-0.5">
                      Your inquiry has been received. The 3D robot acknowledged your transmission.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-3 text-xs font-mono text-accent underline underline-offset-2 hover:text-ink transition-colors"
                    >
                      Send Another Transmission
                    </button>
                  </div>
                </div>
              ) : error ? (
                <div className="p-4 border border-hairline bg-surface2 rounded-[2px] mb-4 flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-xs text-ink">{error}</p>
                    <button
                      onClick={() => setError(null)}
                      className="font-sans text-[11px] text-soft underline mt-1"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-soft mb-1 uppercase">
                      Name / Identification
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, name: e.target.value }));
                        if (validationErrors.name) setValidationErrors((v) => ({ ...v, name: undefined }));
                      }}
                      placeholder="Lead Engineer / Hiring Manager"
                      className={`w-full px-3 py-2.5 rounded-[2px] bg-surface2 border text-sm text-ink placeholder:text-soft focus-visible:outline-none min-h-[44px] ${
                        validationErrors.name ? "border-red-500" : "border-hairline"
                      }`}
                    />
                    {validationErrors.name && (
                      <p className="text-[11px] font-mono text-red-500 mt-1">{validationErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-soft mb-1 uppercase">
                      Email Address (For Reply)
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, email: e.target.value }));
                        if (validationErrors.email) setValidationErrors((v) => ({ ...v, email: undefined }));
                      }}
                      placeholder="engineer@company.com"
                      className={`w-full px-3 py-2.5 rounded-[2px] bg-surface2 border text-sm text-ink placeholder:text-soft focus-visible:outline-none min-h-[44px] ${
                        validationErrors.email ? "border-red-500" : "border-hairline"
                      }`}
                    />
                    {validationErrors.email && (
                      <p className="text-[11px] font-mono text-red-500 mt-1">{validationErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-soft mb-1 uppercase">
                      Project Scope & Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, message: e.target.value }));
                        if (validationErrors.message) setValidationErrors((v) => ({ ...v, message: undefined }));
                      }}
                      placeholder="Describe the technical scope, timeline, or opportunity..."
                      className={`w-full px-3 py-2 rounded-[2px] bg-surface2 border text-sm text-ink placeholder:text-soft focus-visible:outline-none resize-none ${
                        validationErrors.message ? "border-red-500" : "border-hairline"
                      }`}
                    />
                    {validationErrors.message && (
                      <p className="text-[11px] font-mono text-red-500 mt-1">{validationErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full min-h-[44px] flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-accent-ink" />
                        <span>Transmitting Packet...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        <span>Transmit Message</span>
                      </div>
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

export default ContactSection;
