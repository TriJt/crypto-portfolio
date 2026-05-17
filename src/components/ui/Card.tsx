interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`
        bg-[var(--bg3)] border border-[var(--border)] relative overflow-hidden
        ${hover ? "transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(0,184,212,.4)] hover:shadow-[var(--card-hover)]" : ""}
        ${className}
      `}
    >
      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </div>
  );
}
