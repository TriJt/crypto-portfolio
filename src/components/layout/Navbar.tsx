import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import data from "../../data/portfolioData.json";

const NAV_LINKS = [
  { to: "/",         label: "Home"     },
  { to: "/projects", label: "Projects" },
  { to: "/about",    label: "About"    },
  { to: "/post",    label: "Post"    },
];

const WALLETS = ["MetaMask 🦊", "WalletConnect 🔵", "Coinbase Wallet 🔷", "Phantom 👻"];

export default function Navbar() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `font-display text-[.7rem] font-medium tracking-[.15em] uppercase transition-colors duration-200 ${
      isActive ? "text-[var(--cyan)]" : "text-[var(--text-muted)] hover:text-[var(--cyan)]"
    }`;

  return (
    <>
      {/* ── NAV BAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16 bg-[rgba(3,7,18,.85)] backdrop-blur-xl border-b border-[var(--border-cyan)]">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-1 font-display text-[1.05rem] font-bold tracking-widest text-[var(--cyan)]"
          style={{ textShadow: "var(--glow-cyan)" }}
        >
          <span className="text-[var(--violet-glow)] opacity-70">[</span>
          {data.personalInfo.nameShort}
          <span className="text-[var(--violet-glow)] opacity-70">]</span>
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === "/"} className={linkClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          {/* <button
            onClick={() => setWalletOpen(true)}
            className="hidden md:flex items-center gap-2 font-display text-[.65rem] font-bold tracking-[.15em] uppercase px-5 py-2 border border-[var(--cyan)] text-[var(--cyan)] bg-[rgba(0,245,255,.05)] hover:bg-[rgba(0,245,255,.12)] hover:shadow-[var(--glow-cyan)] transition-all duration-200"
          >
            ⬡ CONTRACT ME 
          </button> */}
          <button
            className="md:hidden text-[var(--cyan)] p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[rgba(3,7,18,.97)] border-b border-[var(--border-cyan)] flex flex-col gap-5 px-8 py-6 md:hidden"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === "/"} className={linkClass} onClick={() => setMenuOpen(false)}>
                {label}
              </NavLink>
            ))}
            {/* <button
              onClick={() => { setMenuOpen(false); setWalletOpen(true); }}
              className="self-start font-display text-[.65rem] font-bold tracking-[.15em] uppercase px-5 py-2 border border-[var(--cyan)] text-[var(--cyan)] bg-[rgba(0,245,255,.05)]"
            >
              ⬡ CONTRACT ME
            </button> */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── WALLET MODAL ── */}
      <AnimatePresence>
        {walletOpen && (
          <motion.div
            key="wallet-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={(e) => { if (e.target === e.currentTarget) setWalletOpen(false); }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative bg-[var(--bg3)] border border-[rgba(0,184,212,.4)] p-10 w-[360px] max-w-[90vw] text-center shadow-[var(--glow-cyan)]"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent" />
              <div className="text-5xl mb-4">⬡</div>
              <p className="font-display text-[.7rem] tracking-[.2em] text-[var(--cyan)] mb-1">CONNECT WALLET</p>
              <h3 className="font-display text-lg mb-2">Choose Your Wallet</h3>
              <p className="text-[var(--text-muted)] text-sm mb-5">Demo portfolio — wallet connection is not functional.</p>
              {WALLETS.map((w) => (
                <div
                  key={w}
                  onClick={() => setWalletOpen(false)}
                  className="border border-[var(--border)] hover:border-[rgba(0,184,212,.5)] px-4 py-3 mb-2 font-display text-[.75rem] tracking-[.1em] cursor-pointer transition-colors duration-200 hover:bg-[rgba(0,184,212,.05)]"
                >
                  {w}
                </div>
              ))}
              <button
                onClick={() => setWalletOpen(false)}
                className="mt-3 font-display text-[.65rem] tracking-[.15em] text-[var(--text-muted)] hover:text-[var(--text)] uppercase bg-transparent border-none cursor-pointer transition-colors"
              >
                CLOSE ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
