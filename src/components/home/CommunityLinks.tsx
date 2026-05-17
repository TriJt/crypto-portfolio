import { motion } from "framer-motion";
import SectionLabel from "../ui/SectionLabel";
import data from "../../data/portfolioData.json";

export default function CommunityLinks() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <SectionLabel>Connection</SectionLabel>
      <h2 className="font-display font-black leading-tight mb-3" style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}>
        Join the <span className="gradient-text">Community</span>
      </h2>
      <p className="text-[var(--text-muted)] text-lg max-w-xl mb-10">
        Join the Web3 Vietnam community — a place to share knowledge, opportunities, and connections.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {Object.entries(data.socials).map(([key, s], i) => (
          <motion.a
            key={key}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ y: -3 }}
            className="community-card relative overflow-hidden border border-[var(--border)] bg-[var(--bg3)] p-8 text-center transition-all duration-250 hover:border-[rgba(0,184,212,.3)]"
          >
            <span className="block text-4xl mb-4" style={{ color: s.color }}>{s.icon}</span>
            <div className="font-display text-[.8rem] font-bold tracking-[.1em] uppercase mb-1">
              {key.toUpperCase()}
            </div>
            <div className="font-mono text-[.75rem] text-[var(--cyan)]">{s.username}</div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
