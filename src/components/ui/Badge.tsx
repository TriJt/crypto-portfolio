import type { BadgeVariant } from "../../types";

const variantClasses: Record<BadgeVariant, string> = {
  cyan:    "text-[var(--cyan)]    border-[rgba(0,184,212,.35)]    bg-[rgba(0,184,212,.08)]",
  violet:  "text-[var(--violet-glow)] border-[rgba(124,58,237,.35)] bg-[rgba(124,58,237,.08)]",
  pink:    "text-[var(--fuchsia-bright)] border-[rgba(236,72,153,.35)] bg-[rgba(236,72,153,.08)]",
  emerald: "text-[var(--emerald-glow)] border-[rgba(16,185,129,.35)] bg-[rgba(16,185,129,.08)]",
  amber:   "text-amber-600       border-[rgba(245,158,11,.35)]    bg-[rgba(245,158,11,.08)]",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = "cyan", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-block font-display text-[0.6rem] font-bold tracking-[.12em] uppercase
        px-3 py-1 border ${variantClasses[variant]} ${className}
      `}
    >
      {children}
    </span>
  );
}
