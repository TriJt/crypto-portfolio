import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-[var(--cyan)] to-[var(--violet)] text-black border-none " +
    "hover:-translate-y-0.5 hover:shadow-[var(--glow-cyan)]",
  outline:
    "bg-transparent border border-[var(--violet-glow)] text-[var(--violet-glow)] " +
    "hover:bg-[rgba(139,92,246,.12)] hover:-translate-y-0.5 hover:shadow-[var(--glow-violet)]",
  ghost:
    "bg-transparent border border-white/10 text-[var(--text-muted)] " +
    "hover:border-[var(--cyan)] hover:text-[var(--cyan)]",
};

export default function Button({
  variant = "primary",
  as: Tag = "button",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-block font-display text-[.75rem] font-bold tracking-[.15em] uppercase " +
    "px-8 py-3 cursor-pointer transition-all duration-200";

  // Cast to any to allow polymorphic "as" pattern
  const Comp = Tag as any;
  return (
    <Comp className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </Comp>
  );
}
