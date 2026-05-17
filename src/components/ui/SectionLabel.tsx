interface SectionLabelProps {
  children: React.ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="block w-8 h-px bg-[var(--violet-glow)] opacity-50" />
      <span className="font-display text-[.65rem] font-bold tracking-[.3em] uppercase text-[var(--violet-glow)]">
        {children}
      </span>
    </div>
  );
}
