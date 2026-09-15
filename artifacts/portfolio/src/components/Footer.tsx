import { smoothScrollTo } from "@/lib/utils";

const links = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-rule py-10 bg-panel">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-signal inline-block rounded-[2px]" />
            <button
              onClick={() => smoothScrollTo("home")}
              className="font-heading font-bold text-lg text-ink hover:text-signal transition-colors"
            >
              AHMED BOURMECHE
            </button>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => smoothScrollTo(l.id)}
                className="font-sans text-xs sm:text-sm text-ink-soft hover:text-ink transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <p className="font-sans text-xs text-ink-soft">
            © {new Date().getFullYear()} Ahmed Bourmeche · All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
