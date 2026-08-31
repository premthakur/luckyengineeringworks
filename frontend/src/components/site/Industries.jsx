import { ArrowUpRight } from "lucide-react";
import { Chapter, Reveal } from "./Reveal";
import { IMAGES } from "@/data/images";

const INDUSTRIES = [
  {
    n: "01",
    title: "JCB & Heavy Equipment",
    desc: "Precision components for construction and heavy machinery.",
    img: IMAGES.indHeavy,
  },
  {
    n: "02",
    title: "Railways",
    desc: "Reliable engineering components designed for demanding railway applications.",
    img: IMAGES.indRail,
  },
  {
    n: "03",
    title: "Pharmaceutical Machinery",
    desc: "Precision-manufactured parts for pharmaceutical and processing equipment.",
    img: IMAGES.indPharma,
  },
  {
    n: "04",
    title: "Industrial Engineering",
    desc: "Custom components for a wide range of industrial machinery and engineering applications.",
    img: IMAGES.indEng,
  },
];

export const Industries = () => (
  <section id="industries" className="py-24 lg:py-36 bg-coal-deep" data-testid="industries-section">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid lg:grid-cols-12 gap-8 mb-16 items-end">
        <div className="lg:col-span-8">
          <Reveal>
            <Chapter index="02" label="Industries We Serve" />
            <h2 className="font-display font-semibold uppercase leading-[1.02] text-4xl sm:text-5xl lg:text-6xl text-bone">
              Critical Parts for <span className="text-copper">Demanding</span> Industries
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-4">
          <p className="text-sm text-steel leading-relaxed lg:text-right">
            Four industries. One standard: components that perform where
            failure is not an option.
          </p>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {INDUSTRIES.map((ind, i) => (
          <Reveal key={ind.n} delay={0.08 * i}>
            <div
              className="group relative h-[340px] lg:h-[440px] overflow-hidden cursor-pointer"
              data-testid={`industry-panel-${ind.n}`}
            >
              <img
                src={ind.img}
                alt={ind.title}
                className="absolute inset-0 w-full h-full object-cover grayscale-[45%] group-hover:grayscale-0 group-hover:scale-[1.06] transition-all duration-[1100ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/45 to-coal/10 group-hover:opacity-80 transition-opacity duration-700" />
              <div className="absolute top-6 right-6 w-11 h-11 border border-bone/30 flex items-center justify-center text-bone/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ArrowUpRight size={18} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-9">
                <span className="font-display text-copper text-sm tracking-[0.3em]">{ind.n}</span>
                <h3 className="font-display font-semibold uppercase text-2xl lg:text-3xl text-bone mt-2">
                  {ind.title}
                </h3>
                <p className="mt-2 text-sm text-bone/60 max-w-xs">{ind.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
