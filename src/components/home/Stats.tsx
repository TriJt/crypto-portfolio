import { motion } from "framer-motion";
import { useCountUp, useIntersection } from "../../hooks/useCountUp";
import SectionLabel from "../ui/SectionLabel";
import data from "../../data/portfolioData.json";
import type { Stat } from "../../types";

function StatCard({ stat, trigger }: { stat: Stat; trigger: boolean }) {
  const count = useCountUp(stat.value, 1800, trigger);

  const display = () => {
    if (!trigger) return stat.display;
    if (stat.value >= 10000) return count.toLocaleString();
    if (stat.value >= 1000) return `${(count / 1000).toFixed(count >= 1000 ? 0 : 1)}K`;
    return `${count}${stat.display.includes("+") ? "+" : ""}`;
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative overflow-hidden border border-[var(--border-cyan)] px-6 py-8 text-center transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,184,212,.12)]"
      style={{ background: "linear-gradient(135deg, var(--bg3), var(--bg4))" }}
    >
      {/* Top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent" />
      {/* Inner glow overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(0,245,255,.03), rgba(139,92,246,.03))" }} />

      <span className="block text-2xl mb-3">{stat.icon}</span>
      <div
        className="font-display font-black leading-none mb-2 text-[var(--cyan)]"
        style={{ fontSize: "2rem", textShadow: "var(--glow-cyan)" }}
      >
        {display()}
      </div>
      <div className="font-display text-[.65rem] font-medium tracking-[.2em] uppercase text-[var(--text-muted)]">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const { ref, visible } = useIntersection(0.3);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20" ref={ref}>
      <SectionLabel>Achievements</SectionLabel>
      <h2 className="font-display font-black leading-tight mb-12" style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}>
        Impressive{" "}
        <span className="gradient-text">Statistics</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {data.stats.map((stat) => (
          <StatCard key={stat.key} stat={stat} trigger={visible} />
        ))}
      </div>
    </section>
  );
}
