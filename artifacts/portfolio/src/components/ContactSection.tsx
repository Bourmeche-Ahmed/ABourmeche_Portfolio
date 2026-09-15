import { useState, useEffect } from "react";
import { Send, Github, Linkedin, Mail, CheckCircle, AlertCircle, Download, Copy, Check, ExternalLink } from "lucide-react";
import emailjs from "emailjs-com";
import { SectionHeader } from "./SectionHeader";
import { ASSET_PATHS, triggerResumeDownload } from "@/lib/paths";
import { copyToClipboard } from "@/lib/utils";

const TARGET_EMAIL = "ahmed.bourmeche@insat.ucar.tn";

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "CttQF4TAsxgsNuuOg";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_l6rmlzb";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_2364qte";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const emailSubject = encodeURIComponent(`Portfolio Inquiry from ${form.name}`);
    const emailBody = encodeURIComponent(
      `From: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    // If EmailJS credentials exist, transmit via EmailJS service
    if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
      try {
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

        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } catch (err: any) {
        console.error("EmailJS Error:", err);
        const errDetail = err?.text || err?.message || "";
        setError(
          `Email service notification: ${errDetail ? `"${errDetail}"` : "Service unreachable"}. Opening direct email to ${TARGET_EMAIL}...`
        );
        window.location.href = `mailto:${TARGET_EMAIL}?subject=${emailSubject}&body=${emailBody}`;
      } finally {
        setLoading(false);
      }
    } else {
      // Direct mailto transmission fallback
      window.location.href = `mailto:${TARGET_EMAIL}?subject=${emailSubject}&body=${emailBody}`;
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const socials = [
    {
      icon: Mail,
      label: TARGET_EMAIL,
      href: `mailto:${TARGET_EMAIL}`,
      title: "Direct Academic & Professional Email",
    },
    {
      icon: Linkedin,
      label: "linkedin.com/in/ahmed-bourmeche",
      href: "https://linkedin.com/in/ahmed-bourmeche",
      title: "LinkedIn Profile",
    },
    {
      icon: Github,
      label: "github.com/Bourmeche-Ahmed",
      href: "https://github.com/Bourmeche-Ahmed",
      title: "GitHub Repositories",
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
          {/* Left Column: Direct Inquiries & Channels */}
          <div className="md:col-span-5 space-y-6">
            <div className="border border-rule bg-panel-raised p-6 rounded-[2px] space-y-4 shadow-sm">
              <h3 className="font-heading font-bold text-lg text-ink">
                Internship & Engineering Inquiries
              </h3>
              <p className="font-sans text-sm text-ink-soft leading-relaxed">
                Currently open to discussing final-year engineering projects (PFE) in industrial IoT, embedded firmware development, PLC & automation systems, or hardware-in-the-loop control.
              </p>
              
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={ASSET_PATHS.cv()}
                  download="Ahmed_Bourmeche_RESUME.pdf"
                  onClick={triggerResumeDownload}
                  className="btn-primary w-full text-center inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-signal" />
                  <span>Download Resume (PDF)</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="btn-secondary w-full text-xs inline-flex items-center justify-center gap-1.5"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-signal" />
                      <span>Copied: {TARGET_EMAIL}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Communication Channels */}
            <div className="border border-rule bg-panel-raised p-6 rounded-[2px] space-y-3.5 shadow-sm">
              <h3 className="font-heading font-bold text-base text-ink mb-3">
                Direct Communication Channels
              </h3>
              <div className="space-y-3.5">
                {socials.map((s) => (
                  <div key={s.title} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[2px] bg-panel-sunk border border-rule flex items-center justify-center text-ink shrink-0">
                      <s.icon className="w-4 h-4 text-signal" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-mono text-ink-soft leading-tight">{s.title}</p>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="panel-link font-sans text-xs sm:text-sm text-ink font-medium truncate block"
                      >
                        {s.label}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Transmission Form */}
          <div className="md:col-span-7">
            <div className="border border-rule bg-panel-raised p-6 sm:p-8 rounded-[2px] shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-rule">
                <div>
                  <h3 className="font-heading font-bold text-xl text-ink">
                    Send Direct Message
                  </h3>
                  <p className="font-sans text-xs text-ink-soft mt-0.5">
                    Transmits directly to <span className="text-ink font-medium">{TARGET_EMAIL}</span>
                  </p>
                </div>
                <span className="text-[10px] font-mono text-signal bg-signal/10 border border-signal/30 px-2 py-0.5 rounded-[2px]">
                  SECURE FORM
                </span>
              </div>

              {submitted ? (
                <div className="p-6 border border-rule bg-panel-sunk rounded-[2px] flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-signal shrink-0" />
                  <div>
                    <p className="font-sans font-semibold text-sm text-ink">Message Transmitted Successfully</p>
                    <p className="font-sans text-xs text-ink-soft mt-0.5">
                      Your inquiry has been dispatched to {TARGET_EMAIL}. I will reply promptly.
                    </p>
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
                      YOUR EMAIL ADDRESS (FOR REPLY)
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="e.g. yourname@company.com"
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
                        <span>Send Message to {TARGET_EMAIL}</span>
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
