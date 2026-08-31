import { ArrowRight } from "lucide-react";
import { Chapter, Reveal } from "./Reveal";
import { IMAGES } from "@/data/images";

export const About = () => (
  <section id="about" className="py-24 lg:py-36" data-testid="about-section">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16 lg:gap-12 items-center">
      <div className="lg:col-span-5">
        <Reveal>
          <Chapter index="01" label="Who We Are" />
          <h2 className="font-display font-semibold uppercase leading-[1.02] text-4xl sm:text-5xl lg:text-6xl text-bone">
            Three Decades of Precision.{" "}
            <span className="text-steel">Built on Trust.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-8 text-sm md:text-base text-steel leading-relaxed">
            For more than thirty years, we have manufactured precision
            components for some of the most demanding industrial applications —
            heavy construction equipment, railway systems, pharmaceutical
            machinery, and industrial engineering.
          </p>
          <p className="mt-5 text-sm md:text-base text-steel leading-relaxed">
            We are a hands-on engineering company. Our focus has never changed:
            consistent quality, honest engineering, and dependable delivery.
            Most of our customers have been with us for years — some for
            decades.
          </p>
          <a
            href="#quality"
            data-testid="about-more-button"
            className="group mt-10 inline-flex items-center gap-3 text-sm font-semibold tracking-[0.14em] uppercase text-bone hover:text-copper transition-colors duration-300"
          >
            <span className="border-b border-copper pb-1">More About Us</span>
            <ArrowRight size={16} className="text-copper transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </Reveal>
      </div>

      <div className="lg:col-span-6 lg:col-start-7 relative">
        <Reveal delay={0.15} y={60}>
          <div className="img-frame">
            <div className="overflow-hidden">
              <img
                src={IMAGES.about}
                alt="Machinist operating a lathe in the Precitech workshop"
                className="w-full aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] object-cover hover:scale-105 transition-transform duration-[1200ms]"
              />
            </div>
          </div>
          <div className="absolute -bottom-8 -left-4 sm:-left-8 bg-copper text-coal px-7 py-6">
            <div className="font-display font-semibold text-4xl leading-none">30+</div>
            <div className="mt-2 text-[11px] tracking-[0.25em] uppercase font-semibold">
              Years of Engineering
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
