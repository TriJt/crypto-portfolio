/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // — Neon palette (dark theme only) —
        cyan:    { DEFAULT: "#00b8d4", dim: "#06b6d4", dark: "#0e7490", glow: "#00f5ff" },
        violet:  { DEFAULT: "#7c3aed", dim: "#6d28d9", glow: "#a78bfa" },
        fuchsia: { DEFAULT: "#db2777", bright: "#f472b6", dark: "#9f1239" },
        emerald: { DEFAULT: "#10b981", dim: "#059669", glow: "#34d399" },
        pink:    { DEFAULT: "#ec4899", dim: "#db2777" },
        // — Background layers —
        bg: {
          DEFAULT: "#030712",
          2: "#060d1a",
          3: "#0a1628",
          4: "#0f1f38",
        },
        surface: { DEFAULT: "#111827", 2: "#1f2937", 3: "#374151" },
        // — Text —
        ink:    { DEFAULT: "#0f172a", dim: "#334155", muted: "#64748b" },
      },
      fontFamily: {
        display: ["Orbitron", "monospace"],
        body:    ["Rajdhani", "sans-serif"],
        mono:    ["'Share Tech Mono'", "monospace"],
      },
      boxShadow: {
        "neon-cyan":   "0 0 15px rgba(0,184,212,.35), 0 0 35px rgba(0,184,212,.15)",
        "neon-violet": "0 0 15px rgba(124,58,237,.35), 0 0 35px rgba(124,58,237,.15)",
        "neon-pink":   "0 0 15px rgba(236,72,153,.35), 0 0 35px rgba(236,72,153,.15)",
        "card-hover":  "0 0 0 1px rgba(0,184,212,.2), 0 16px 48px rgba(0,184,212,.1), inset 0 1px 0 rgba(0,184,212,.15)",
      },
      keyframes: {
        float: {
          "0%":   { transform: "translateY(100vh) rotate(0deg)", opacity: "0" },
          "10%":  { opacity: "1" },
          "90%":  { opacity: "1" },
          "100%": { transform: "translateY(-100px) rotate(720deg)", opacity: "0" },
        },
        pulseBorder: {
          "0%,100%": { borderColor: "rgba(0,245,255,.3)" },
          "50%":     { borderColor: "rgba(0,245,255,.7)" },
        },
        blink:   { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.3" } },
        glitch1: {
          "0%,92%,100%": { transform: "translate(0)", opacity: "0" },
          "93%":          { transform: "translate(-2px,1px)", opacity: ".7" },
          "96%":          { transform: "translate(2px,-1px)", opacity: ".7" },
        },
        glitch2: {
          "0%,94%,100%": { transform: "translate(0)", opacity: "0" },
          "95%":          { transform: "translate(2px,-1px)", opacity: ".6" },
          "98%":          { transform: "translate(-2px,1px)", opacity: ".6" },
        },
        loadBar: {
          from: { transform: "scaleX(0)", transformOrigin: "left" },
          to:   { transform: "scaleX(1)", transformOrigin: "left" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        spinReverse: {
          from: { transform: "rotate(360deg)" },
          to:   { transform: "rotate(0deg)" },
        },
      },
      animation: {
        float:        "float linear infinite",
        pulseBorder:  "pulseBorder 2s ease-in-out infinite",
        blink:        "blink 1.5s ease-in-out infinite",
        glitch1:      "glitch1 3s infinite",
        glitch2:      "glitch2 3s infinite",
        loadBar:      "loadBar 1.5s ease-in-out forwards",
        spinSlow:     "spinSlow 20s linear infinite",
        spinReverse:  "spinReverse 20s linear infinite",
      },
    },
  },
  plugins: [],
};
