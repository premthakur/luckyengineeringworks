import { Chapter, Reveal } from "./Reveal";
import { IMAGES } from "@/data/images";

const LEFT = [
  "Precision Shafts",
  "Bushings & Couplings",
  "Pins & Studs",
  "Spacers & Sleeves",
  "Threaded Components",
];
const RIGHT = [
  "Hydraulic Fittings",
  "Valve & Cylinder Parts",
  "Mounting Flanges",
  "Bearing Housings",
  "Custom OEM Parts",
];

const CategoryList = ({ items, offset = 0, testPrefix }) => (
  <ul className="divide-y divide-line border-t border-b border-line">
    {items.map((item, i) => (
      <li
        key={item}
        data-testid={`${testPrefix}-${i}`}
        className="group flex items-center justify-between gap-4 py-5 hover:bg-surface/60 transition-colors duration-300 px-2 -mx-2"
      >
        <span className="font-display uppercase tracking-[0.08em] text-base lg:text-lg text-bone/85 group-hover:text-copper transition-colors duration-300">
          {item}
        </span>
        <span className="font-display text-xs text-ash group-hover:text-copper transition-colors duration-300">
          {String(offset + i + 1).padStart(2, "0")}
        </span>
      </li>
    ))}
  </ul>
);

export const Manufacture = () => (
  <section id="manufacture" className="py-24 lg:py-36" data-testid="manufacture-section">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="max-w-2xl mb-16">
        <Reveal>
          <Chapter index="03" label="What We Manufacture" />
          <h2 className="font-display font-semibold uppercase leading-[1.02] text-4xl sm:text-5xl lg:text-6xl text-bone">
            Components Made <span className="text-steel">to Drawing,</span>{" "}
            Made to Last
          </h2>
          <p className="mt-6 text-[11px] tracking-[0.3em] uppercase text-ash">
            Representative examples of our manufacturing scope
          </p>
        </Reveal>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        <Reveal className="lg:col-span-3 order-2 lg:order-1" delay={0.1}>
          <CategoryList items={LEFT} testPrefix="manufacture-item-left" />
        </Reveal>

        <Reveal className="lg:col-span-6 order-1 lg:order-2" delay={0.05} y={60}>
          <div className="img-frame" data-testid="manufacture-central-image">
            <div className="overflow-hidden">
              <img
                src={IMAGES.components}
                alt="Arrangement of precision machined shafts, bushes, pins and flanges"
                className="w-full aspect-[4/3] lg:aspect-[3/3.2] object-cover hover:scale-105 transition-transform duration-[1200ms]"
              />
            </div>
          </div>
          <p className="mt-4 text-xs text-ash text-center tracking-[0.15em] uppercase">
            Turned · Milled · Ground · Assembled
          </p>
        </Reveal>

        <Reveal className="lg:col-span-3 order-3" delay={0.2}>
          <CategoryList items={RIGHT} offset={LEFT.length} testPrefix="manufacture-item-right" />
        </Reveal>
      </div>
    </div>
  </section>
);
