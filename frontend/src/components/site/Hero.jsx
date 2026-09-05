import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE } from "./Reveal";
import { IMAGES } from "@/data/images";

const MaskLine = ({ children, delay, className = "" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block"
      initial={{ y: "112%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.15, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

export const Hero = ({ onQuote }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      data-testid="hero-section"
    >
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Precision machined steel component"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-coal via-coal/75 to-coal/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-coal/50" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-36 pb-28"
      >
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="flex items-center gap-3 mb-10"
          data-testid="hero-credibility"
        >
          <span className="w-2 h-2 bg-copper" />
          <span className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-bone/80 font-medium">
            15+ Years of Engineering Excellence
          </span>
        </motion.div>

        <h1
          className="font-display font-semibold uppercase leading-[0.98] tracking-tight text-[12.5vw] sm:text-7xl lg:text-8xl xl:text-[7.5rem] text-bone"
          data-testid="hero-headline"
        >
          <MaskLine delay={0.35}>Precision</MaskLine>
          <MaskLine delay={0.47}>Engineering.</MaskLine>
          <MaskLine delay={0.59} className="text-bone/60">
            Built for the Industries
          </MaskLine>
          <MaskLine delay={0.71}>
            That Move <span className="text-copper">the World.</span>
          </MaskLine>
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.95, ease: EASE }}
          className="origin-left h-[3px] w-28 bg-copper mt-10"
        />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
          className="mt-8 max-w-xl text-sm md:text-base text-steel leading-relaxed"
          data-testid="hero-subtext"
        >
          Since 2010, delivering reliable CNC precision components for heavy
          equipment, railways, pharmaceutical machinery, and industrial
          applications — trusted as a third-party manufacturer by brands like
          L&T, JCB and Dynabac.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <button
            onClick={onQuote}
            data-testid="hero-quote-button"
            className="group inline-flex items-center gap-3 bg-copper hover:bg-copper-hover text-white text-sm font-semibold tracking-[0.12em] uppercase px-8 py-4 transition-colors duration-300"
          >
            Request a Quote
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <a
            href="#capabilities"
            data-testid="hero-capabilities-button"
            className="inline-flex items-center gap-3 border border-line-strong hover:border-copper text-bone text-sm font-semibold tracking-[0.12em] uppercase px-8 py-4 transition-colors duration-300"
          >
            Explore Our Capabilities
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 right-8 lg:right-12 z-10 hidden md:flex items-center gap-4"
        data-testid="hero-scroll-indicator"
      >
        <span className="text-[10px] tracking-[0.45em] uppercase text-steel [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="w-px h-16 bg-gradient-to-b from-copper to-transparent" />
      </motion.div>
    </section>
  );
};
