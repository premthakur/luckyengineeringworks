import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE } from "./Reveal";
import { IMAGES } from "@/data/images";

const MaskLine = ({ children, delay, start, className = "" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block"
      initial={{ y: "112%" }}
      animate={start ? { y: 0 } : { y: "112%" }}
      transition={{ duration: 1.15, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

export const Hero = ({ onQuote, start = true }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18 });
  const sy = useSpring(my, { stiffness: 55, damping: 18 });
  const imgMX = useTransform(sx, [-0.5, 0.5], [-22, 22]);
  const imgMY = useTransform(sy, [-0.5, 0.5], [-14, 14]);
  const txtMX = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const txtMY = useTransform(sy, [-0.5, 0.5], [8, -8]);

  const handleMouse = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={handleMouse}
      className="relative min-h-screen flex items-center overflow-hidden"
      data-testid="hero-section"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <motion.div style={{ x: imgMX, y: imgMY }} className="absolute -inset-8">
          <motion.img
            src={IMAGES.hero}
            alt="Precision machined steel component"
            initial={{ scale: 1.08 }}
            animate={{ scale: [1.08, 1.16, 1.08] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-coal via-coal/75 to-coal/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-coal/50" />
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 0.3 } : {}}
        transition={{ delay: 1.7, duration: 1.4 }}
        className="absolute -right-28 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none z-10"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        >
          <svg width="520" height="520" viewBox="0 0 520 520" fill="none">
            <circle cx="260" cy="260" r="258" stroke="#4A4D54" strokeWidth="1" strokeDasharray="4 10" />
            <circle cx="260" cy="260" r="200" stroke="#E65C24" strokeWidth="1" strokeDasharray="2 14" />
            <circle cx="260" cy="260" r="140" stroke="#4A4D54" strokeWidth="1" />
            {Array.from({ length: 24 }).map((_, i) => (
              <line
                key={i}
                x1="260"
                y1="6"
                x2="260"
                y2={i % 2 === 0 ? "20" : "13"}
                stroke="#78828A"
                strokeWidth="1"
                transform={`rotate(${i * 15} 260 260)`}
              />
            ))}
            <circle cx="260" cy="260" r="3" fill="#E65C24" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: fade, x: txtMX, y: txtMY }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-36 pb-28"
      >
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={start ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="flex items-center gap-3 mb-10"
          data-testid="hero-credibility"
        >
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 bg-copper"
          />
          <span className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-bone/80 font-medium">
            15+ Years of Engineering Excellence
          </span>
        </motion.div>

        <h1
          className="font-display font-semibold uppercase leading-[0.98] tracking-tight text-[12.5vw] sm:text-7xl lg:text-8xl xl:text-[7.5rem] text-bone"
          data-testid="hero-headline"
        >
          <MaskLine delay={0.35} start={start}>Precision</MaskLine>
          <MaskLine delay={0.47} start={start}>Engineering.</MaskLine>
          <MaskLine delay={0.59} start={start} className="text-bone/60">
            Built for the Industries
          </MaskLine>
          <MaskLine delay={0.71} start={start}>
            That Move <span className="text-shimmer">the World.</span>
          </MaskLine>
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={start ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.95, ease: EASE }}
          className="origin-left h-[3px] w-28 bg-copper mt-10"
        />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={start ? { opacity: 1, y: 0 } : {}}
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
          animate={start ? { opacity: 1, y: 0 } : {}}
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
        animate={start ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 right-8 lg:right-12 z-10 hidden md:flex items-center gap-4"
        data-testid="hero-scroll-indicator"
      >
        <span className="text-[10px] tracking-[0.45em] uppercase text-steel [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative w-px h-16 bg-line overflow-hidden">
          <motion.span
            animate={{ y: ["-100%", "220%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 h-1/3 bg-copper"
          />
        </span>
      </motion.div>
    </section>
  );
};
