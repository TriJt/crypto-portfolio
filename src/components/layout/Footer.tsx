import data from "../../data/portfolioData.json";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--border-cyan)] px-6 pt-10 pb-6 text-center bg-gradient-to-b from-transparent to-black/50">
      {/* Logo */}
      <div className="font-display text-[.9rem] tracking-widest text-[var(--cyan)] mb-4"
        style={{ textShadow: "var(--glow-cyan)" }}>
        [ {data.personalInfo.name} ]
      </div>

      {/* Social icons */}
      <div className="flex justify-center gap-3 mb-4 flex-wrap">
        {Object.entries(data.socials).map(([key, s]) => (
          <a
            key={key}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            title={s.username}
            className="w-11 h-11 flex items-center justify-center border border-[var(--border)] bg-[var(--bg3)] text-[var(--text-muted)] text-lg transition-all duration-200 hover:text-[var(--cyan)] hover:border-[var(--cyan)] hover:shadow-[var(--glow-cyan)]"
            style={{ color: s.color, borderColor: `${s.color}33` }}
          >
             <img
              src={s.icon}        // ưu tiên s.image, nếu không có thì dùng s.icon cũ
              alt={s.username}
              className="w-7 h-7 object-contain"   // điều chỉnh kích thước ảnh phù hợp
              style={{ filter: s.color ? `drop-shadow(0 0 4px ${s.color})` : undefined }}
            />
          </a>
        ))}
      </div>

      {/* Copy */}
      <p className="font-mono text-[.75rem] text-[var(--text-muted)]">
        {data.personalInfo.name} — {data.personalInfo.title}
      </p>
      <p className="font-mono text-[.7rem] text-[var(--text-muted)] opacity-50 mt-1">
        Built with ♥ for Web3 Vietnam · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
