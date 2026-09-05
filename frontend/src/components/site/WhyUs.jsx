import { ArrowUpRight } from "lucide-react";
import { Chapter, Reveal } from "./Reveal";

const REASONS = [
  ["15+ Years of Experience", "A decade and a half of quietly solving hard machining problems for demanding industries."],
  ["Trusted by Leading Brands", "Third-party manufacturing partner to L&T, JCB, Dynabac and other major OEMs."],
  ["Multi-Industry Expertise", "Construction & drilling equipment, mining, automobiles and industrial machinery under one roof."],
  ["Flexible Custom Manufacturing", "From prototype development to batch production, built to your drawing."],
  ["Consistent Quality & Reliability", "Inspected, documented and delivered on schedule — a partner you can plan around."],
];

export const WhyUs = ({ onQuote }) => (
  <section id="why-us" className="py-24 lg:py-36 bg-coal-deep" data-testid="why-us-section">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-14">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-32">
          <Reveal>
            <Chapter index="07" label="Why Customers Choose Us" />
            <h2 className="font-display font-semibold uppercase leading-[1.02] text-4xl sm:text-5xl text-bone">
              The Partner Behind the <span className="text-copper">Parts</span>
            </h2>
            <p className="mt-6 text-sm text-steel leading-relaxed">
              No noise, no slogans. Just steady engineering work that keeps
              our customers coming back.
            </p>
            <button
              onClick={onQuote}
              data-testid="why-us-quote-button"
              className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold tracking-[0.14em] uppercase text-bone hover:text-copper transition-colors duration-300"
            >
              <span className="border-b border-copper pb-1">Request a Quote</span>
              <ArrowUpRight size={16} className="text-copper transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </Reveal>
        </div>
      </div>

      <div className="lg:col-span-7 lg:col-start-6">
        <ul className="border-t border-line">
          {REASONS.map(([title, desc], i) => (
            <Reveal key={title} delay={0.06 * i} y={28}>
              <li
                className="group flex gap-8 py-8 border-b border-line hover:pl-4 transition-all duration-300"
                data-testid={`why-us-item-${i}`}
              >
                <span className="font-display font-medium text-2xl text-ash group-hover:text-copper transition-colors duration-300 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display uppercase tracking-[0.05em] text-xl lg:text-2xl text-bone">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-steel leading-relaxed max-w-lg">{desc}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
