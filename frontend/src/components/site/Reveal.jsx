import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 44, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Chapter = ({ index, label }) => (
  <div className="flex items-center gap-4 mb-8">
    <span className="font-display text-copper text-sm tracking-[0.35em] font-medium">
      {index}
    </span>
    <span className="h-px w-12 bg-copper/60" />
    <span className="text-xs tracking-[0.35em] uppercase text-steel font-medium">
      {label}
    </span>
  </div>
);
