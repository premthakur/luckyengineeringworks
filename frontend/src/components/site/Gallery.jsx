import { Chapter, Reveal } from "./Reveal";
import { IMAGES } from "@/data/images";

const ITEMS = [
  { img: IMAGES.galFactory, caption: "The Shop Floor", span: "md:col-span-7", h: "h-[300px] md:h-[440px]" },
  { img: IMAGES.rail, caption: "Railway Components", span: "md:col-span-5", h: "h-[300px] md:h-[440px]" },
  { img: IMAGES.galLaser, caption: "Fabrication & Cutting", span: "md:col-span-4", h: "h-[280px] md:h-[360px]" },
  { img: IMAGES.galOperator, caption: "Machining Operations", span: "md:col-span-4", h: "h-[280px] md:h-[360px]" },
  { img: IMAGES.galComponent, caption: "Machined Components", span: "md:col-span-4", h: "h-[280px] md:h-[360px]" },
  { img: IMAGES.galPipes, caption: "Process & Pharma Lines", span: "md:col-span-12", h: "h-[260px] md:h-[340px]" },
];

export const Gallery = () => (
  <section id="gallery" className="py-24 lg:py-36" data-testid="gallery-section">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid lg:grid-cols-12 gap-8 mb-16 items-end">
        <div className="lg:col-span-8">
          <Reveal>
            <Chapter index="06" label="Manufacturing Gallery" />
            <h2 className="font-display font-semibold uppercase leading-[1.02] text-4xl sm:text-5xl lg:text-6xl text-bone">
              Steel, Sparks <span className="text-steel">&</span>{" "}
              <span className="text-copper">Craftsmanship</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-4">
          <p className="text-sm text-steel leading-relaxed lg:text-right">
            A look inside the workshop — machines, components, and the people
            behind them.
          </p>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-12 gap-5">
        {ITEMS.map((item, i) => (
          <Reveal key={item.caption} delay={0.05 * i} className={item.span}>
            <div
              className={`group relative overflow-hidden ${item.h}`}
              data-testid={`gallery-item-${i}`}
            >
              <img
                src={item.img}
                alt={item.caption}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.05] transition-all duration-[1100ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute bottom-5 left-5 text-[11px] tracking-[0.3em] uppercase text-bone font-medium translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                {item.caption}
              </span>
              <span className="absolute top-5 left-5 w-2 h-2 bg-copper opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
