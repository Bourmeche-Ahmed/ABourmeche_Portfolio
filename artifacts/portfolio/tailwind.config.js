/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-alt": "var(--bg-alt)",
        surface: "var(--surface)",
        "surface-hover": "var(--surface-hover)",
        border: "var(--border)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-soft": "var(--accent-soft)",
        highlight: "var(--highlight)",
        "highlight-text": "var(--highlight-text)",
        "on-accent": "var(--on-accent)",

        // Circuit Teal Base Palette
        ink: "var(--color-ink)",
        "deep-teal": "var(--color-deep-teal)",
        mint: "var(--color-mint)",
        amber: "var(--color-amber)",
        mist: "var(--color-mist)",

        // Backward compatibility mappings
        surface2: "var(--surface2)",
        hairline: "var(--border)",
        soft: "var(--text-muted)",
        "accent-text": "var(--accent)",
        "accent-ink": "var(--on-accent)",
        panel: "var(--bg)",
        "panel-sunk": "var(--bg-alt)",
        "panel-raised": "var(--surface)",
        "ink-soft": "var(--text-muted)",
        rule: "var(--border)",
        signal: "var(--accent)",
        "signal-tint": "var(--accent-soft)",
        telemetry: "var(--accent)",
        hardware: "var(--accent)",
        "hardware-text": "var(--accent)",
      },
      fontFamily: {
        heading: ['"Inter"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "4px",
        sm: "2px",
        md: "4px",
        lg: "6px",
        xl: "8px",
        "2xl": "12px",
        "3xl": "16px",
        full: "9999px",
      },
      boxShadow: {
        card: "var(--card-shadow)",
      },
    },
  },
  plugins: [],
}
