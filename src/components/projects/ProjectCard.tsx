import { useState } from "react";
import { motion } from "framer-motion";
import Badge from "../ui/Badge";
import type { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
}

/** Returns true if the string looks like a URL (for project emojis that are image URLs) */
function isUrl(str: string) {
  return str.startsWith("http") || str.startsWith("/");
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="project-card flex flex-col relative overflow-hidden border border-[var(--border)] bg-[var(--bg3)] transition-all duration-300"
      style={
        hovered
          ? {
              borderColor: "rgba(0,184,212,.5)",
              boxShadow:
                "0 0 0 1px rgba(0,184,212,.2), 0 16px 48px rgba(0,184,212,.1), inset 0 1px 0 rgba(0,184,212,.15)",
              transform: "translateY(-4px)",
            }
          : {}
      }
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Scanline reveal */}
      <div className="card-scanline" />

      {/* ── IMAGE / PLACEHOLDER ── */}
      <div className="relative overflow-hidden h-[180px] flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, var(--bg4), var(--surface))" }}>
        {isUrl(project.emoji) ? (
          <img
            src={project.emoji}
            alt={project.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-[var(--border-cyan)] transition-transform duration-400"
            style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
          />
        ) : (
          <span className="text-6xl">{project.emoji}</span>
        )}

        {/* Overlay on hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: "linear-gradient(135deg, rgba(0,184,212,.04), rgba(124,58,237,.04))",
          }}
        />

        {/* Top bar: badge + visit link */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
          <Badge variant={project.badgeVariant}>{project.projectType}</Badge>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[.68rem] text-[var(--cyan)] bg-[rgba(0,184,212,.08)] px-3 py-1 border border-[rgba(0,184,212,.3)] rounded-md transition-all duration-200 hover:bg-[rgba(0,184,212,.15)]"
            >
              ↗ Visit
            </a>
          ) : (
            <span className="font-mono text-[.68rem] text-[var(--text-muted)] bg-[var(--surface)] px-3 py-1 border border-[var(--border)] rounded-md">
              # Private
            </span>
          )}
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="flex flex-col flex-1 h-600 p-6 relative z-10">
        {/* Title */}
        <div className="font-display text-[1rem] font-bold tracking-[.05em] mb-1">
          {project.name}
        </div>

        {/* Role */}
        <div className="font-mono text-[.75rem] text-[var(--cyan)] mb-1">
          ◆ {project.role}
        </div>

        {/* Period */}
        <div className="font-mono text-[.75rem] text-[var(--text-muted)] mb-4">
          📅 {project.period}
        </div>

        {/* Activities */}
        <ul className="flex-1 mb-4 space-y-1">
          {project.activities.map((act, i) => (
            <li key={i} className="flex gap-2 items-start text-[.85rem] text-[var(--text-muted)] pb-1.5 border-b border-white/[.04] last:border-0">
              <span className="text-[var(--cyan)] text-[.7rem] flex-shrink-0 mt-0.5">▸</span>
              {act}
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[.65rem] px-2 py-1 bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] transition-colors duration-200"
              style={hovered ? { borderColor: "rgba(0,184,212,.2)", color: "var(--text-dim)" } : {}}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-[.65rem] font-bold tracking-[.12em] uppercase text-[var(--cyan)] flex items-center gap-1.5 transition-all duration-200 hover:gap-3"
            >
              Project details →
            </a>
          ) : (
            <span className="font-display text-[.65rem] font-bold tracking-[.12em] uppercase text-[var(--text-muted)]">
              Ended
            </span>
          )}
          <span className="font-mono text-[.65rem] text-[var(--text-muted)]">
            #{String(project.id).padStart(3, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
