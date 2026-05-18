import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../components/layout/SectionWrapper";
import SectionLabel from "../components/ui/SectionLabel";
import FilterBar from "../components/projects/FilterBar";
import ProjectCard from "../components/projects/ProjectCard";
import data from "../data/portfolioData.json";
import type { Project } from "../types";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = (data.projects as Project[]).filter(
    (p) => activeFilter === "all" || p.typeCategory === activeFilter
  );

    // Derive unique categories from data
  const categoriesProject = ["all", ...Array.from(new Set(data.projects.map((p) => p.typeCategory)))];

  const itemProject = data.projects;

  return (
    <SectionWrapper>
      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionLabel>Portfolio</SectionLabel>

        <h1 className="font-display font-black leading-tight mb-3" style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}>
          Ambassador <span className="gradient-text">Projects</span>
        </h1>
        <p className="text-[var(--text-muted)] text-lg max-w-xl mb-2">
          All the projects I have represented and am currently representing —{" "}
          <span className="text-[var(--cyan)]">{data.projects.length} projects</span> in the Web3 ecosystem.
        </p>

        <FilterBar categories={categoriesProject} active={activeFilter} onChange={setActiveFilter} item={itemProject}/>

        <motion.div
          layout
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--text-muted)] font-mono">
            No projects found for this category.
          </div>
        )}
      </section>
    </SectionWrapper>
  );
}
