import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../components/layout/SectionWrapper";
import SectionLabel from "../components/ui/SectionLabel";
import FilterBar from "../components/projects/FilterBar";
import data from "../data/portfolioData.json";
import type { Post } from "../types";
import ExperienceCard from "../components/Post/ExperienceCard";

export default function Post() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredPosts = (data.post as Post[]).filter(
    (p) => activeFilter === "all" || p.typeCategory === activeFilter
  );

  const categoriesPost = ["all", ...Array.from(new Set(data.post.map((p) => p.typeCategory)))];

  return (
    <SectionWrapper>
      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionLabel>Post</SectionLabel>

        <h1 className="font-display font-black leading-tight mb-3" style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}>
          Project <span className="gradient-text">Posts</span>
        </h1>
        <p className="text-[var(--text-muted)] text-lg max-w-xl mb-8">
          All the post I have represented —{" "}
          <span className="text-[var(--cyan)]">{data.post.length} projects</span>
        </p>

        {/* Sửa ở đây: thêm item={data.post} hoặc item={filteredPosts} */}
        <FilterBar 
          categories={categoriesPost} 
          active={activeFilter} 
          onChange={setActiveFilter}
          item={data.post}          
        />

        {/* Grid tự động co giãn */}
        <div className="grid grid-cols-1 gap-8 mt-10">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((project) => (
              <motion.div
                key={`${project.id}-${project.name}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.3 }}
              >
                <ExperienceCard post={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-[var(--text-muted)] font-mono">
            No post found for this category.
          </div>
        )}
      </section>
    </SectionWrapper>
  );
}