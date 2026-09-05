import { Chapter, Reveal } from "./Reveal";
import { IMAGES } from "@/data/images";

const CAPS = [
  ["CNC Turning", "Precision shafts, pins and threaded components"],
  ["CNC Milling", "Prismatic parts and complex features"],
  ["Traub & Automat Turning", "High-volume small precision parts"],
  ["Conventional Lathe Work", "Job-work and large-diameter turning"],
  ["Drilling & Tapping", "Holes, threads and secondary operations"],
  ["Inspection & Quality Control", "Measured, documented, verified"],
  ["Custom Component Manufacturing", "Prototype development to batch production"],
];

export const Capabilities = () => (
  <section id="capabilities" className="py-24 lg:py-36 bg-coal-deep" data-testid="capabilities-section">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid lg:grid-cols-12 gap-8 mb-16 items-end">
        <div className="lg:col-span-8">
          <Reveal>
            <Chapter index="04" label="Manufacturing Capabilities" />
            <h2 className="font-display font-semibold uppercase leading-[1.02] text-4xl sm:text-5xl lg:text-6xl text-bone">
              From Raw Stock to <span className="text-copper">Finished Component</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-4">
          <p className="text-sm text-steel leading-relaxed lg:text-right">
            Capabilities shown are representative of our shop-floor scope.
          </p>
        </Reveal>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-6" y={60}>
          <div className="relative h-full min-h-[380px] overflow-hidden group" data-testid="capabilities-image">
            <img
              src={IMAGES.cnc}
              alt="CNC milling machine cutting metal"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coal/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-7">
              <span className="inline-block bg-copper text-coal text-[10px] font-semibold tracking-[0.25em] uppercase px-3 py-1.5">
                On the Shop Floor
              </span>
              <p className="mt-3 text-sm text-bone/70 max-w-xs">
                A 1,500 sq. ft. shop floor with CNC lathes, Traub automats and
                conventional machines — component capacity up to 40 tons.
              </p>
              <p className="mt-3 text-[10px] tracking-[0.2em] uppercase text-bone/40 max-w-xs leading-relaxed">
                4× CNC Lathe 250×500 · 10× Traub · 7× Conventional Lathe · Drilling · Tapping · Bandsaw
              </p>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <ul className="border-t border-line">
            {CAPS.map(([title, desc], i) => (
              <Reveal key={title} delay={0.06 * i} y={24}>
                <li
                  className="group flex items-baseline gap-6 py-5 border-b border-line hover:pl-3 transition-all duration-300"
                  data-testid={`capability-item-${i}`}
                >
                  <span className="font-display text-copper text-sm w-8 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display uppercase tracking-[0.06em] text-lg lg:text-xl text-bone group-hover:text-copper transition-colors duration-300">
                      {title}
                    </h3>
                    <p className="text-sm text-steel mt-1">{desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);
