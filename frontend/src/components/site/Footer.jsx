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
            <span className="w-9 h-9 border-2 border-copper flex items-center justify-center font-display font-semibold text-copper text-[13px] tracking-[0.1em]">
              LEW
            </span>
            <span className="font-display font-semibold text-sm tracking-[0.2em] text-bone leading-tight">
              LUCKY ENGINEERING
              <span className="block text-[9px] tracking-[0.35em] text-steel font-medium">WORKS · EST. 2010</span>
            </span>
          </a>
          <p className="mt-6 text-sm text-steel leading-relaxed max-w-xs">
            A CNC precision components manufacturer in Vasai, Maharashtra — a
            trusted third-party manufacturing partner to L&amp;T, JCB and
            Dynabac, serving industry since 2010.
          </p>
          <p className="mt-6 text-[11px] tracking-[0.3em] uppercase text-ash">
            CNC Precision Components · Since 2010
          </p>
          <div className="mt-8">
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-ash font-semibold">Downloads</h4>
            <div className="mt-4 space-y-3">
              <a
                href="/downloads/Lucky-Engineering-Works-Profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-download-profile"
                className="flex items-center gap-3 text-sm text-steel hover:text-copper transition-colors duration-300"
              >
                <span className="w-1.5 h-1.5 bg-copper shrink-0" />
                Company Profile (PDF)
              </a>
              <a
                href="/downloads/Lucky-Engineering-Product-Range.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-download-products"
                className="flex items-center gap-3 text-sm text-steel hover:text-copper transition-colors duration-300"
              >
                <span className="w-1.5 h-1.5 bg-copper shrink-0" />
                Product Range (PDF)
              </a>
            </div>
          </div>
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
              <a
                href="https://www.google.com/maps/dir/19.1430656,72.8399872/Lucky+Engineering+Works,+Gala+No.+04,+Ganesh+Industrial+Estate,+near+Parmar+talav,+Dhaniv,+Vasai+Phata,+Vasai+East,+Vasai-Virar,+Maharashtra+401208"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-directions-link"
                className="hover:text-copper transition-colors duration-300"
              >
                Gala No. 04, Ganesh Industrial Estate,<br />
                Near Parmar Talav, Dhaniv, Vasai Phata,<br />
                Vasai East, Vasai-Virar, Maharashtra 401208
              </a>
            </li>
            <li className="flex items-center gap-3" data-testid="footer-phone">
              <Phone size={16} className="text-copper shrink-0" />
              <span>+91 82752 92405 · +91 99224 07816</span>
            </li>
            <li className="flex items-center gap-3" data-testid="footer-email">
              <Mail size={16} className="text-copper shrink-0" />
              <span>contact@luckyengineeringwork.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        aria-hidden
        className="font-display font-bold uppercase leading-none text-center text-[16.5vw] text-outline select-none pointer-events-none -mb-2 lg:-mb-6"
      >
        Lucky
      </div>

      <div className="border-t border-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ash">
        <span data-testid="footer-copyright">
          © 2026 Lucky Engineering Works. All rights reserved.
        </span>
      </div>
    </div>
  </footer>
);
