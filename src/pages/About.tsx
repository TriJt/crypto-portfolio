import { motion } from "framer-motion";
import SectionWrapper from "../components/layout/SectionWrapper";
import SectionLabel from "../components/ui/SectionLabel";
import Button from "../components/ui/Button";
import data from "../data/portfolioData.json";

/* ── Avatar ── */
function Avatar() {
  const { name, title, location, avatar, emoji } = data.personalInfo;
  return (
    <div className="text-center md:sticky md:top-24">
      {/* Spinning ring */}
      <div
        className="w-[200px] h-[200px] rounded-full mx-auto mb-6 p-1 animate-spin-slow"
        style={{ border: "2px solid rgba(0,184,212,.3)" }}
      >
        <div
          className="w-full h-full rounded-full flex items-center justify-center overflow-hidden animate-spin-reverse"
          style={{ border: "2px solid rgba(124,58,237,.2)", background: "linear-gradient(135deg, var(--bg3), var(--bg4))" }}
        >
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="text-6xl">{emoji}</span>
          )}
        </div>
      </div>

      <div className="font-display text-lg font-bold mb-1">{name}</div>
      <div className="font-mono text-[.75rem] text-[var(--cyan)] mb-1">{title}</div>
      <div className="text-[.85rem] text-[var(--text-muted)] mb-5">📍 {location}</div>

      {/* Social icons */}
      <div className="flex justify-center gap-2 flex-wrap mb-6">
        {Object.entries(data.socials).map(([key, s]) => (
          <a
            key={key}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            title={s.username}
            className="w-11 h-11 flex items-center justify-center border text-lg transition-all duration-200 hover:shadow-[var(--glow-cyan)]"
            style={{
              color:        s.color,
              borderColor:  `${s.color}33`,
              background:   "var(--bg3)",
            }}
          >
                <img
                src={s.icon}
                alt={s.username}
                className="w-6 h-6 object-contain drop-shadow-md"
                style={{ filter: s.color ? `drop-shadow(0 0 6px ${s.color})` : undefined }}
              />
          </a>
        ))}
      </div>

      {/* Mini stat grid */}
      <div className="grid grid-cols-2 gap-2">
        {data.stats.map((s) => (
          <div key={s.key} className="border border-[var(--border)] bg-[var(--bg3)] py-3 px-2 text-center">
            <div className="font-display text-lg font-bold text-[var(--cyan)]">{s.display}</div>
            <div className="font-display text-[.6rem] tracking-[.08em] uppercase text-[var(--text-muted)] leading-tight mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Bio ── */
function Bio() {
  return (
    <div>
      {data.personalInfo.bio.map((para, i) => (
        <p key={i} className="text-[var(--text-muted)] leading-[1.8] text-[1.05rem] mb-4">
          {para}
        </p>
      ))}
    </div>
  );
}

/* ── Skills grid ── */
function Skills() {
  return (
    <>
      <SectionLabel>Skills</SectionLabel>
      <h3 className="font-display text-lg font-bold mb-5">
        Core <span className="gradient-text">Competencies</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        {data.skills.map((s) => (
          <motion.div
            key={s.name}
            whileHover={{ borderColor: "rgba(0,184,212,.3)" }}
            className="flex items-center gap-3 border border-[var(--border)] bg-[var(--bg3)] px-5 py-4 transition-colors duration-200"
          >
            <span className="text-2xl w-8 text-center">{s.icon}</span>
            <div>
              <div className="font-display text-[.75rem] font-semibold tracking-[.08em]">{s.name}</div>
              <div className="text-[.75rem] text-[var(--text-muted)]">{s.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

/* ── Timeline ── */
function Timeline() {
  return (
    <>
      <SectionLabel>Journey</SectionLabel>
      <h3 className="font-display text-lg font-bold mb-6">
        My Web3 <span className="gradient-text">Timeline</span>
      </h3>
      <div className="relative pl-8 mb-10">
        {/* Vertical line */}
        <div className="timeline-line absolute left-0 top-0 bottom-0 w-px" />
        {data.timeline.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="relative mb-8 last:mb-0"
          >
            {/* Dot */}
            <div
              className="absolute left-[-2.375rem] top-1 w-2.5 h-2.5 rounded-full bg-[var(--cyan)] border-2 border-[var(--bg)]"
              style={{ boxShadow: "0 0 12px var(--cyan)" }}
            />
            <div className="font-mono text-[.7rem] text-[var(--cyan)] mb-1">{t.date}</div>
            <div className="font-display text-[.9rem] font-semibold mb-1">{t.title}</div>
            <div className="text-[.9rem] text-[var(--text-muted)] leading-relaxed">{t.desc}</div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

/* ── Collaboration CTA ── */
function CollabCTA() {
  return (
    <div className="relative overflow-hidden border border-[var(--border-cyan)] bg-[var(--bg3)] p-8">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent" />
      <div className="font-display text-[.75rem] tracking-[.2em] text-[var(--cyan)] mb-2">COLLABORATION</div>
      <h3 className="font-display text-lg font-bold mb-2">Contract</h3>
      <p className="text-[var(--text-muted)] text-[.95rem] mb-6 leading-relaxed">
        If your project needs a dedicated ambassador for the Vietnamese market, please contact me via Telegram or Twitter.
      </p>
      <div className="flex gap-3 flex-wrap">
        <Button as="a" href={data.socials.telegram.url} target="_blank" rel="noopener noreferrer" variant="primary">
          Message on Telegram ✈
        </Button>
        <Button as="a" href={data.socials.x.url} target="_blank" rel="noopener noreferrer" variant="outline">
          Follow on 𝕏
        </Button>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function About() {
  return (
    <SectionWrapper>
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 md:gap-16 items-start">
          {/* Left */}
          <Avatar />

          {/* Right */}
          <div>
            <SectionLabel>About Me</SectionLabel>
            <h2 className="font-display font-black leading-tight mb-6" style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}>
              The <span className="gradient-text">Story</span>
            </h2>
            <Bio />
            <div className="neon-divider my-8" />
            <Skills />
            <Timeline />
            <CollabCTA />
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
