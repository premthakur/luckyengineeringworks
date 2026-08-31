import { Mail, MapPin, Phone } from "lucide-react";

const EXPLORE = [
  { label: "About", href: "#about" },
  { label: "Industries", href: "#industries" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Quality", href: "#quality" },
  { label: "Gallery", href: "#gallery" },
];

const INDUSTRIES = [
  "JCB & Heavy Equipment",
  "Railways",
  "Pharmaceutical Machinery",
  "Industrial Engineering",
];

export const Footer = () => (
  <footer id="contact" className="bg-coal-deep border-t border-line" data-testid="footer">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-8">
      <div className="grid md:grid-cols-12 gap-12 pb-16">
        <div className="md:col-span-4">
          <a href="#top" className="flex items-center gap-3" data-testid="footer-logo">
            <span className="w-2.5 h-2.5 bg-copper" />
            <span className="font-display font-semibold text-lg tracking-[0.22em] text-bone">
              PRECITECH
            </span>
          </a>
          <p className="mt-6 text-sm text-steel leading-relaxed max-w-xs">
            An engineering company manufacturing precision components for
            heavy equipment, railways, pharmaceutical machinery and industrial
            applications — for over 30 years.
          </p>
          <p className="mt-6 text-[11px] tracking-[0.3em] uppercase text-ash">
            Precision Components · Since 1993
          </p>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-[11px] tracking-[0.3em] uppercase text-ash font-semibold">Explore</h4>
          <ul className="mt-6 space-y-3">
            {EXPLORE.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  data-testid={`footer-link-${l.label.toLowerCase()}`}
                  className="text-sm text-steel hover:text-copper transition-colors duration-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-[11px] tracking-[0.3em] uppercase text-ash font-semibold">Industries</h4>
          <ul className="mt-6 space-y-3">
            {INDUSTRIES.map((i) => (
              <li key={i} className="text-sm text-steel">
                {i}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-[11px] tracking-[0.3em] uppercase text-ash font-semibold">Contact</h4>
          <ul className="mt-6 space-y-4 text-sm text-steel">
            <li className="flex items-start gap-3" data-testid="footer-location">
              <MapPin size={16} className="text-copper mt-0.5 shrink-0" />
              <span>Industrial Area, Faridabad,<br />Haryana, India</span>
            </li>
            <li className="flex items-center gap-3" data-testid="footer-phone">
              <Phone size={16} className="text-copper shrink-0" />
              <span>+91 98XXX XXXXX</span>
            </li>
            <li className="flex items-center gap-3" data-testid="footer-email">
              <Mail size={16} className="text-copper shrink-0" />
              <span>sales@precitech.example</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        aria-hidden
        className="font-display font-bold uppercase leading-none text-center text-[16.5vw] text-outline select-none pointer-events-none -mb-2 lg:-mb-6"
      >
        Precitech
      </div>

      <div className="border-t border-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ash">
        <span data-testid="footer-copyright">
          © 2026 Precitech Engineering Pvt. Ltd. All rights reserved.
        </span>
        <span className="tracking-[0.2em] uppercase">Website Prototype</span>
      </div>
    </div>
  </footer>
);
