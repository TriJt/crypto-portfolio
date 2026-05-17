import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "../ui/SectionLabel";
import Button from "../ui/Button";
import ProjectCard from "../projects/ProjectCard";
import data from "../../data/portfolioData.json";
import type { Project } from "../../types";

const FEATURED = data.projects.slice(0, 5) as Project[];

function useVisibleCount() {
  const get = () => (window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
  const [count, setCount] = useState(get);
  useEffect(() => {
    const h = () => setCount(get());
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return count;
}

export default function FeaturedCarousel() {
  const navigate     = useNavigate();
  const visibleCount = useVisibleCount();
  const [index, setIndex] = useState(0);

  const maxIndex = Math.max(0, FEATURED.length - visibleCount);

  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);

  // Reset index when visible count changes
  useEffect(() => { setIndex((i) => Math.min(i, maxIndex)); }, [maxIndex]);

  const cardWidthPct = 100 / visibleCount;
  const translatePct = -(index * cardWidthPct);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <SectionLabel>Projects</SectionLabel>
      <h2 className="font-display font-black leading-tight mb-3" style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}>
        Featured <span className="gradient-text">Ambassador Projects</span>
      </h2>
      <p className="text-[var(--text-muted)] text-lg mb-4">
        {data.title.featuredCarousel}
      </p>
      <div className="neon-divider mb-0" />

      {/* Track */}
      <div className="overflow-hidden mt-8">
        <div
          className="flex gap-6 transition-transform duration-400"
          style={{ transform: `translateX(calc(${translatePct}% - ${index * 24}px))` }}
        >
          {FEATURED.map((project) => (
            <div
              key={project.id}
              style={{ flex: `0 0 calc(${cardWidthPct}% - ${(visibleCount - 1) * 24 / visibleCount}px)` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={prev}
          disabled={index === 0}
          className="w-11 h-11 flex items-center justify-center border border-[var(--border-cyan)] bg-[var(--bg3)] text-[var(--cyan)] text-xl transition-all duration-200 hover:bg-[rgba(0,184,212,.1)] hover:shadow-[var(--glow-cyan)] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ←
        </button>

        {/* Dots */}
        <div className="flex gap-2 items-center">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`carousel-dot ${i === index ? "active" : ""}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={index === maxIndex}
          className="w-11 h-11 flex items-center justify-center border border-[var(--border-cyan)] bg-[var(--bg3)] text-[var(--cyan)] text-xl transition-all duration-200 hover:bg-[rgba(0,184,212,.1)] hover:shadow-[var(--glow-cyan)] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          →
        </button>
      </div>

      {/* See all */}
      <div className="text-center mt-8">
        <Button variant="outline" onClick={() => navigate("/projects")}>
          See all Projects →
        </Button>
      </div>
    </section>
  );
}
