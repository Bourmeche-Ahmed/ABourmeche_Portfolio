import { smoothScrollTo } from "@/lib/utils";

const links = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Timeline", id: "timeline" },
  { label: "Contact", id: "contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/8 py-12 mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <button
            onClick={() => smoothScrollTo("home")}
            className="font-bold text-base text-foreground hover:text-cyan-400 transition-colors"
          >
            <span className="text-cyan-400">&lt;</span>
            AB
            <span className="text-cyan-400">/&gt;</span>
          </button>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => smoothScrollTo(l.id)}
                className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <p className="text-xs text-muted-foreground">
            Built with{" "}
            <span className="text-cyan-400">React + Vite + Framer Motion</span>
          </p>
        </div>
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} Ahmed BOURMECHE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
