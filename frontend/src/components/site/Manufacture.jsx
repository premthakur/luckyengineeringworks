import { ArrowRight } from "lucide-react";
import { Chapter, Reveal } from "./Reveal";

const CATEGORIES = [
  {
    n: "01",
    name: "CNC Turned Components",
    items: [
      ["Precision Shafts", "shafts"],
      ["Threaded Components", "threaded"],
      ["Bushings & Couplings", "bushings"],
      ["Spacers & Sleeves", "spacers"],
      ["Pins & Studs", "pins"],
    ],
  },
  {
    n: "02",
    name: "Automotive Machined Parts",
    items: [
      ["Engine Components", "engine"],
      ["Transmission Shafts", "transmission"],
      ["Gearbox Components", "gearbox"],
      ["Steering Components", "steering"],
      ["Suspension Parts", "suspension"],
    ],
  },
  {
    n: "03",
    name: "Hydraulic & Pneumatic Components",
    items: [
      ["Hydraulic Fittings", "hydraulic-fittings"],
      ["Valve Components", "valve"],
      ["Cylinder Parts", "cylinder"],
      ["Adapter Fittings", "adapters"],
      ["Connector Components", "connectors"],
    ],
  },
  {
    n: "04",
    name: "Industrial Machine Components",
    items: [
      ["Machine Shafts", "machine-shafts"],
      ["Rollers", "rollers"],
      ["Bearing Housings", "bearing-housings"],
      ["Coupling Hubs", "coupling-hubs"],
      ["Mounting Flanges", "flanges"],
    ],
  },
];

const ProductCard = ({ name, img, testId }) => (
  <div className="group" data-testid={testId}>
    <div className="relative overflow-hidden aspect-square border border-line group-hover:border-copper/60 transition-colors duration-500 bg-coal-deep">
      <img
        src={img}
        alt={name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.06] transition-all duration-[900ms] ease-out"
      />
    </div>
    <p className="mt-3 text-[12px] tracking-[0.14em] uppercase text-steel group-hover:text-bone transition-colors duration-300 font-medium">
      {name}
    </p>
  </div>
);

export const Manufacture = ({ onQuote }) => (
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

      <div className="space-y-16 lg:space-y-20">
        {CATEGORIES.map((cat) => (
          <Reveal key={cat.n}>
            <div data-testid={`manufacture-category-${cat.n}`}>
              <div className="flex items-baseline gap-5 mb-8">
                <span className="font-display text-copper text-sm tracking-[0.3em]">{cat.n}</span>
                <h3 className="font-display font-semibold uppercase text-2xl lg:text-3xl text-bone">
                  {cat.name}
                </h3>
                <span className="hidden sm:block flex-1 h-px bg-line" />
                <span className="hidden sm:block text-[11px] tracking-[0.25em] uppercase text-ash">
                  {cat.items.length} Product Lines
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6">
                {cat.items.map(([name, key]) => (
                  <ProductCard
                    key={key}
                    name={name}
                    img={`/images/products/${key}.jpg`}
                    testId={`product-card-${key}`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div
          className="mt-20 lg:mt-24 border border-line px-8 py-10 lg:px-12 flex flex-col lg:flex-row lg:items-center gap-8 justify-between"
          data-testid="custom-cnc-strip"
        >
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-copper font-semibold">
              Custom CNC Machined Parts
            </span>
            <p className="mt-3 font-display uppercase text-xl lg:text-2xl text-bone leading-snug max-w-2xl">
              Prototype Development · Tight-Tolerance Machining · Batch
              Production · OEM Custom Parts
            </p>
          </div>
          <button
            onClick={onQuote}
            data-testid="manufacture-quote-button"
            className="group inline-flex items-center gap-3 bg-copper hover:bg-copper-hover text-white text-sm font-semibold tracking-[0.12em] uppercase px-8 py-4 transition-colors duration-300 shrink-0"
          >
            Request a Quote
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </Reveal>
    </div>
  </section>
);
