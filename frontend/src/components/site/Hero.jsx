import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EASE } from "./Reveal";

const SLIDES = [
  {
    img: "/images/hero-factory.jpg",
    kicker: "15+ Years of Engineering Excellence",
    title: "Precision CNC Components, Built on Our Own Shop Floor",
    text: "Since 2010, delivering reliable precision components for heavy equipment, railways, pharmaceutical machinery, and industrial applications.",
  },
  {
    img: "/images/slide-excavator.jpg",
    kicker: "JCB & Heavy Equipment",
    title: "Components That Keep Heavy Machines Working",
    text: "Pins, bushes, shafts and machined parts built to survive the toughest construction and mining sites.",
  },
  {
    img: "/images/slide-railway.jpg",
    kicker: "Railways",
    title: "Engineered for the Demands of the Rail",
    text: "Reliable, inspected components for railway applications — where consistency is not negotiable.",
  },
  {
    img: "/images/slide-pharma.jpg",
    kicker: "Pharmaceutical & Industrial Machinery",
    title: "Precision Parts for Processing Machinery",
    text: "Clean, tight-tolerance components for pharmaceutical and industrial processing equipment.",
  },
];

const MaskLine = ({ children, delay, start, className = "" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block"
      initial={{ y: "112%" }}
      animate={start ? { y: 0 } : { y: "112%" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

export const Hero = ({ onQuote, start = true }) => {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18 });
  const sy = useSpring(my, { stiffness: 55, damping: 18 });
  const imgMX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const imgMY = useTransform(sy, [-0.5, 0.5], [-12, 12]);

  const handleMouse = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearTimeout(t);
  }, [index, start]);

  const go = (d) => setIndex((i) => (i + d + SLIDES.length) % SLIDES.length);
  const slide = SLIDES[index];

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={handleMouse}
      className="relative h-screen min-h-[620px] overflow-hidden"
      data-testid="hero-section"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        {SLIDES.map((s, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="absolute inset-0"
            style={{ zIndex: i === index ? 1 : 0 }}
            data-testid={`hero-slide-${i}`}
          >
            <motion.div style={{ x: imgMX, y: imgMY }} className="absolute -inset-8">
              <motion.img
                src={s.img}
                alt={s.title}
                initial={false}
                animate={i === index ? { scale: [1.05, 1.13] } : { scale: 1.13 }}
                transition={{ duration: 7.5, ease: "linear" }}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-coal via-coal/60 to-coal/15" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-coal via-transparent to-coal/40" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center"
      >
        <motion.div key={index} className="max-w-2xl pt-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={start ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="flex items-center gap-3 mb-6"
            data-testid="hero-credibility"
          >
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 bg-copper shrink-0"
            />
            <span className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-bone/80 font-medium">
              {slide.kicker}
            </span>
          </motion.div>

          <h1
            className="font-display font-semibold uppercase leading-[1.06] tracking-tight text-3xl sm:text-4xl lg:text-5xl text-bone"
            data-testid="hero-headline"
          >
            <MaskLine delay={0.3} start={start}>{slide.title}</MaskLine>
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={start ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
            className="origin-left h-[2px] w-20 bg-copper mt-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={start ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="mt-6 max-w-lg text-sm md:text-base text-steel leading-relaxed"
            data-testid="hero-subtext"
          >
            {slide.text}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={start ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onQuote}
              data-testid="hero-quote-button"
              className="group inline-flex items-center gap-3 bg-copper hover:bg-copper-hover text-white text-[13px] font-semibold tracking-[0.12em] uppercase px-7 py-3.5 transition-colors duration-300"
            >
              Request a Quote
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href="#capabilities"
              data-testid="hero-capabilities-button"
              className="inline-flex items-center border border-line-strong hover:border-copper text-bone text-[13px] font-semibold tracking-[0.12em] uppercase px-7 py-3.5 transition-colors duration-300"
            >
              Explore Our Capabilities
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <button
        onClick={() => go(-1)}
        data-testid="hero-prev-button"
        aria-label="Previous slide"
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-bone/25 flex items-center justify-center text-bone/60 hover:border-copper hover:text-copper transition-colors duration-300"
      >
        <ArrowLeft size={17} />
      </button>
      <button
        onClick={() => go(1)}
        data-testid="hero-next-button"
        aria-label="Next slide"
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-bone/25 flex items-center justify-center text-bone/60 hover:border-copper hover:text-copper transition-colors duration-300"
      >
        <ArrowRight size={17} />
      </button>

      <div
        className="absolute bottom-10 left-6 lg:left-12 z-20 flex items-center gap-4"
        data-testid="hero-slide-indicator"
      >
        <span className="font-display text-copper text-sm tracking-[0.2em]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="w-24 h-px bg-line relative overflow-hidden">
          <motion.div
            key={index}
            initial={{ scaleX: 0 }}
            animate={start ? { scaleX: 1 } : {}}
            transition={{ duration: 6, ease: "linear" }}
            className="absolute inset-0 bg-copper origin-left"
          />
        </div>
        <span className="font-display text-steel text-sm tracking-[0.2em]">
          {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 right-8 lg:right-12 z-20 hidden md:flex items-center gap-4"
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
