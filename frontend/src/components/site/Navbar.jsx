import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { EASE } from "./Reveal";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Industries", href: "#industries" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Quality", href: "#quality" },
  { label: "Gallery", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = ({ onQuote }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        className={`fixed top-0 left-0 right-0 z-[70] transition-colors duration-500 ${
          scrolled
            ? "bg-coal/70 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
        data-testid="main-header"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <a href="#top" data-testid="nav-logo" className="flex items-center gap-3 group">
            <span className="w-9 h-9 border-2 border-copper flex items-center justify-center font-display font-semibold text-copper text-[13px] tracking-[0.1em] transition-colors duration-500 group-hover:bg-copper group-hover:text-coal">
              LEW
            </span>
            <span className="font-display font-semibold text-sm tracking-[0.2em] text-bone leading-tight">
              LUCKY ENGINEERING
              <span className="block text-[9px] tracking-[0.35em] text-steel font-medium">WORKS · EST. 2010</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-9" data-testid="nav-links">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className="relative text-[13px] tracking-[0.14em] uppercase text-steel hover:text-bone transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-copper after:transition-[width] after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={onQuote}
              data-testid="nav-quote-button"
              className="hidden sm:inline-flex items-center gap-2 bg-copper hover:bg-copper-hover text-white text-[13px] font-semibold tracking-[0.12em] uppercase px-6 py-3 transition-colors duration-300"
            >
              Request a Quote
              <ArrowUpRight size={15} />
            </button>
            <button
              onClick={() => setOpen(true)}
              data-testid="nav-menu-button"
              className="lg:hidden text-bone p-2"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[90] bg-coal/95 backdrop-blur-2xl flex flex-col"
            data-testid="mobile-menu"
          >
            <div className="h-20 px-6 flex items-center justify-between">
              <span className="font-display font-semibold text-lg tracking-[0.22em]">LEW · LUCKY ENGINEERING</span>
              <button
                onClick={() => setOpen(false)}
                data-testid="mobile-menu-close"
                className="text-bone p-2"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.6, ease: EASE }}
                  className="font-display uppercase text-4xl py-3 text-bone/80 hover:text-copper transition-colors duration-300 border-b border-line"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => {
                  setOpen(false);
                  onQuote();
                }}
                data-testid="mobile-quote-button"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
                className="mt-10 inline-flex items-center justify-center gap-2 bg-copper text-white text-sm font-semibold tracking-[0.12em] uppercase px-8 py-4"
              >
                Request a Quote
                <ArrowUpRight size={16} />
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
