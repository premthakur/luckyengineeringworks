import { Chapter, Reveal } from "./Reveal";

const WireBox = ({ name, role, cred, testId, wide = false }) => (
  <div
    data-testid={testId}
    className={`relative border border-dashed border-line-strong bg-surface/40 px-6 py-5 text-center hover:border-copper transition-colors duration-300 ${
      wide ? "w-full max-w-sm" : "w-full max-w-xs"
    }`}
  >
    <span className="absolute -top-1.5 -left-1.5 text-copper text-xs font-light select-none">+</span>
    <span className="absolute -top-1.5 -right-1.5 text-copper text-xs font-light select-none">+</span>
    <span className="absolute -bottom-1.5 -left-1.5 text-copper text-xs font-light select-none">+</span>
    <span className="absolute -bottom-1.5 -right-1.5 text-copper text-xs font-light select-none">+</span>
    <h3 className="font-display uppercase tracking-[0.08em] text-lg text-bone">{name}</h3>
    <p className="mt-1 text-[11px] tracking-[0.25em] uppercase text-copper font-semibold">{role}</p>
    {cred && <p className="mt-1 text-xs text-steel">{cred}</p>}
  </div>
);

const VLine = ({ h = "h-10" }) => <div className={`w-px ${h} bg-line-strong/70`} />;

export const Team = () => (
  <section id="team" className="py-24 lg:py-36" data-testid="team-section">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="max-w-2xl mb-16">
        <Reveal>
          <Chapter index="08" label="Meet The Team" />
          <h2 className="font-display font-semibold uppercase leading-[1.02] text-4xl sm:text-5xl lg:text-6xl text-bone">
            The People Behind the <span className="text-copper">Precision</span>
          </h2>
          <p className="mt-6 text-sm md:text-base text-steel leading-relaxed">
            A small, hands-on team where engineering talent runs the floor —
            leadership, quality and production under one roof in Vasai.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="flex flex-col items-center" data-testid="team-org-chart">
          <WireBox
            name="Mr. Dilip Singh"
            role="Managing Director"
            cred="Founder — leads the works since 2010"
            testId="team-member-dilip"
          />
          <VLine />
          <div className="relative w-full max-w-2xl">
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-line-strong/70" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16 pt-10 justify-items-center">
              <div className="flex flex-col items-center w-full">
                <div className="hidden sm:block absolute top-0 left-1/4 w-px h-10 bg-line-strong/70" />
                <WireBox
                  name="Mr. Aman Singh"
                  role="Quality & Production"
                  cred="BE Mechanical"
                  testId="team-member-aman"
                />
              </div>
              <div className="flex flex-col items-center w-full">
                <div className="hidden sm:block absolute top-0 right-1/4 w-px h-10 bg-line-strong/70" />
                <WireBox
                  name="Mr. Gaurav Singh"
                  role="Accounts"
                  cred="BSc IT"
                  testId="team-member-gaurav"
                />
              </div>
            </div>
          </div>
          <VLine />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16 w-full max-w-2xl justify-items-center">
            <div
              data-testid="team-operators-cnc"
              className="w-full max-w-xs border border-line bg-transparent px-6 py-4 text-center hover:border-copper transition-colors duration-300"
            >
              <span className="font-display font-semibold text-2xl text-copper">06</span>
              <p className="mt-1 text-[11px] tracking-[0.25em] uppercase text-steel font-semibold">
                CNC Operators
              </p>
            </div>
            <div
              data-testid="team-operators-conventional"
              className="w-full max-w-xs border border-line bg-transparent px-6 py-4 text-center hover:border-copper transition-colors duration-300"
            >
              <span className="font-display font-semibold text-2xl text-copper">04</span>
              <p className="mt-1 text-[11px] tracking-[0.25em] uppercase text-steel font-semibold">
                Conventional Machine Operators
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
