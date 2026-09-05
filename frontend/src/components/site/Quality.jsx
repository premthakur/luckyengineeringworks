import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Chapter, Reveal } from "./Reveal";
import { IMAGES } from "@/data/images";

const PILLARS = [
  ["Consistent Quality", "The same standard on the first part and the ten-thousandth."],
  ["Experienced Engineering Team", "Deep machining judgement behind every setup."],
  ["Inspection & Quality Control", "Every batch measured, documented and verified."],
  ["Long-Term Relationships", "Customers who have trusted us for years — some for decades."],
];

export const Quality = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="quality"
      ref={ref}
      className="relative py-28 lg:py-44 overflow-hidden"
      data-testid="quality-section"
    >
      <motion.img
        style={{ y }}
        src={IMAGES.quality}
        alt=""
        className="absolute inset-0 w-full h-[120%] object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-coal via-coal/70 to-coal" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <Chapter index="05" label="Quality & Reliability" />
          <h2 className="font-display font-semibold uppercase leading-[1.0] text-4xl sm:text-5xl lg:text-7xl text-bone max-w-5xl">
            Quality That Has Stood the{" "}
            <span className="text-copper">Test of Time.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-sm md:text-base text-steel leading-relaxed">
            Precision is not a department here — it is the culture. Every
            component leaves our floor only after it meets the drawing, the
            tolerance, and our own standard.
          </p>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {PILLARS.map(([title, desc], i) => (
            <Reveal key={title} delay={0.08 * i}>
              <div className="border-l-2 border-copper pl-6" data-testid={`quality-pillar-${i}`}>
                <h3 className="font-display uppercase tracking-[0.06em] text-lg text-bone">
                  {title}
                </h3>
                <p className="mt-3 text-sm text-steel leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
