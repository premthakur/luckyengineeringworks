const ITEMS = [
  "15+ Years of Experience",
  "CNC Precision Components",
  "Trusted by L&T, JCB & Dynabac",
  "Quality-Focused Manufacturing",
];

export const Marquee = () => (
  <section
    className="bg-copper text-coal overflow-hidden py-4 select-none"
    data-testid="trust-marquee"
    aria-label="15 plus years of experience, CNC precision components, trusted by L&T, JCB and Dynabac, quality-focused manufacturing"
  >
    <div className="flex w-max animate-marquee">
      {[0, 1].map((dup) => (
        <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
          {ITEMS.concat(ITEMS).map((t, i) => (
            <span key={i} className="flex items-center">
              <span className="font-display uppercase tracking-[0.22em] text-sm md:text-base font-medium px-10 whitespace-nowrap">
                {t}
              </span>
              <span className="w-2 h-2 bg-coal rotate-45 shrink-0" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </section>
);
