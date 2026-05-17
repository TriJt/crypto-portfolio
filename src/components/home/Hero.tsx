import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import data from "../../data/portfolioData.json";

/* ── Particle generation ── */
const COLORS  = ["rgba(0,245,255,.6)", "rgba(139,92,246,.6)", "rgba(240,171,252,.6)", "rgba(16,185,129,.6)"];
const SYMBOLS = [
  "₿",      // BTC
  "Ξ",      // ETH
  "◎",      // SOL
  "₳",      // ADA
  "●",      // DOT
  "Ð",      // DOGE
  "Ł",      // LTC
  "🪙",     // General crypto
  "⟠",      // ETH alt
  "⚡",     // Lightning
  "🚀",     // Moon
  "⧫"      // Diamond - thường dùng cho NFT/DeFi
];

interface Particle { id: number; left: number; size: number; dur: number; delay: number; color: string; symbol: string; }

function useParticles(count = 20): Particle[] {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id:     i,
        left:   Math.random() * 100,
        size:   Math.random() * 40 + 8,
        dur:    Math.random() * 15 + 10,
        delay:  Math.random() * 10,
        color:  COLORS[Math.floor(Math.random() * COLORS.length)],
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      })),
    []
  );
}

/* ── Framer Motion stagger ── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  const navigate  = useNavigate();
  const particles = useParticles();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute pointer-events-none rounded-full blur-[80px] w-[600px] h-[600px] top-[-200px] left-[-200px] bg-[rgba(0,245,255,.04)]" />
      <div className="absolute pointer-events-none rounded-full blur-[80px] w-[500px] h-[500px] bottom-[-100px] right-[-100px] bg-[rgba(139,92,246,.05)]" />
      <div className="absolute pointer-events-none rounded-full blur-[80px] w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(240,171,252,.03)]" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle flex items-center justify-center font-bold"
            style={{
              left:            `${p.left}%`,
              width:           p.size,
              height:          p.size,
              background:      p.color,
              animationDuration: `${p.dur}s`,
              animationDelay:  `${p.delay}s`,
              fontSize:        p.size * 0.7,
              color:           "rgba(255,255,255,.8)",
              boxShadow:       `0 0 ${p.size}px ${p.color}`,
            }}
          >
            {p.symbol}
          </div>
        ))}
      </div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center"
      >
        {/* Status badge */}
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 font-mono text-[.75rem] px-4 py-1.5 mb-6 text-[var(--cyan)] border"
          style={{ animation: "pulse-border 2s ease-in-out infinite", background: "rgba(0,245,255,.05)", borderColor: "rgba(0,245,255,.3)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-[var(--emerald)]"
            style={{ boxShadow: "0 0 8px var(--emerald)", animation: "blink 1.5s ease-in-out infinite" }}
          />
          AVAILABLE FOR AMBASSADOR ROLES
        </motion.div>

        {/* Name with glitch */}
        <motion.h1
          variants={item}
          className="glitch gradient-text font-display font-black leading-none tracking-[-0.02em] mb-2"
          style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)" }}
          data-text={data.personalInfo.name}
        >
          {data.personalInfo.name}
        </motion.h1>

        {/* Title */}
        <motion.div
          variants={item}
          className="font-display font-normal tracking-[.2em] uppercase text-[var(--violet-glow)] mb-6"
          style={{ fontSize: "clamp(.9rem, 2.5vw, 1.3rem)" }}
        >
          {data.personalInfo.title}
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-[var(--text-muted)] max-w-[520px] mb-10"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)" }}
        >
          <strong className="text-[var(--emerald-glow)] font-semibold">Building Web3 Communities Across Vietnam</strong>
          <br />
          Connect tens of thousands of Vietnamese people with your project.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex gap-4 flex-wrap justify-center mb-10">
          <Button variant="primary" onClick={() => navigate("/projects")}>
            List Projects ›
          </Button>
          <Button variant="outline" onClick={() => navigate("/about")}>
            About me
          </Button>
        </motion.div>

        {/* Social row */}
        <motion.div variants={item} className="flex gap-6 flex-wrap justify-center">
          {Object.entries(data.socials).map(([key, s]) => (
            <a
              key={key}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[.75rem] text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors duration-200"
            >
              <img
                src={s.icon}
                alt={s.username}
                className="w-4 h-4 object-contain drop-shadow-md"
                style={{ filter: s.color ? `drop-shadow(0 0 6px ${s.color})` : undefined }}
              />
              {s.username}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
