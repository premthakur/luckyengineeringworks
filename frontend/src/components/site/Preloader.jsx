import { motion } from "framer-motion";
import { EASE } from "./Reveal";

const LETTERS = "LUCKY ENGINEERING".split("");

export const Preloader = () => (
  <motion.div
    exit={{ y: "-100%" }}
    transition={{ duration: 0.9, ease: EASE }}
    className="fixed inset-0 z-[200] bg-coal-deep flex flex-col items-center justify-center"
    data-testid="preloader"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="w-14 h-14 border-2 border-copper flex items-center justify-center font-display font-semibold text-copper text-xl tracking-[0.1em]"
    >
      LEW
    </motion.div>
    <div className="mt-6 flex overflow-hidden">
      {LETTERS.map((l, i) => (
        <motion.span
          key={i}
          initial={{ y: "115%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 + i * 0.035, ease: EASE }}
          className="font-display font-semibold tracking-[0.3em] text-bone text-sm md:text-base"
        >
          {l === " " ? "\u00A0" : l}
        </motion.span>
      ))}
    </div>
    <div className="mt-7 w-40 h-px bg-line relative overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.35, ease: "easeInOut" }}
        className="absolute inset-0 bg-copper origin-left"
      />
    </div>
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="mt-4 text-[10px] tracking-[0.4em] uppercase text-ash"
    >
      Est. 2010 · Vasai
    </motion.span>
  </motion.div>
);
