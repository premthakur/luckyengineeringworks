import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export const FinalCTA = ({ onQuote }) => (
  <section
    className="relative py-28 lg:py-44 overflow-hidden border-t border-line"
    data-testid="final-cta-section"
  >
    <span
      aria-hidden
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold uppercase text-[22vw] leading-none text-outline select-none pointer-events-none whitespace-nowrap"
    >
      Precision
    </span>

    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
      <Reveal>
        <h2 className="font-display font-semibold uppercase leading-[1.02] text-4xl sm:text-5xl lg:text-6xl text-bone">
          Looking for a Reliable{" "}
          <span className="text-copper">Precision Manufacturing</span> Partner?
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mt-7 text-sm md:text-base text-steel leading-relaxed max-w-xl mx-auto">
          Tell us what you need. Our team can help you develop and manufacture
          the right component for your application.
        </p>
      </Reveal>
      <Reveal delay={0.22}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <button
            onClick={onQuote}
            data-testid="final-cta-quote-button"
            className="group inline-flex items-center gap-3 bg-copper hover:bg-copper-hover text-white text-sm font-semibold tracking-[0.12em] uppercase px-9 py-4 transition-colors duration-300"
          >
            Request a Quote
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <a
            href="#contact"
            data-testid="final-cta-contact-button"
            className="inline-flex items-center border border-line-strong hover:border-copper text-bone text-sm font-semibold tracking-[0.12em] uppercase px-9 py-4 transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);
