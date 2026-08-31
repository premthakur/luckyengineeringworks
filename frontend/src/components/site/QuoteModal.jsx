import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { EASE } from "./Reveal";

const inputCls =
  "w-full bg-transparent border border-line focus:border-copper outline-none px-4 py-3 text-sm text-bone placeholder:text-ash transition-colors duration-300";
const labelCls = "block text-[10px] tracking-[0.25em] uppercase text-steel font-semibold mb-2";

export const QuoteModal = ({ open, onClose }) => {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (open) setSent(false);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="absolute inset-0 bg-coal/85 backdrop-blur-sm"
            data-testid="quote-modal-backdrop"
          />
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative w-full max-w-xl bg-surface border border-line p-8 md:p-10 max-h-[90vh] overflow-y-auto"
            data-testid="quote-modal"
          >
            <button
              onClick={onClose}
              data-testid="quote-close-button"
              aria-label="Close"
              className="absolute top-5 right-5 text-steel hover:text-copper transition-colors duration-300"
            >
              <X size={20} />
            </button>

            {sent ? (
              <div className="py-10 text-center" data-testid="quote-success-message">
                <span className="mx-auto w-14 h-14 border-2 border-copper flex items-center justify-center">
                  <Check size={26} className="text-copper" />
                </span>
                <h3 className="mt-7 font-display font-semibold uppercase text-2xl text-bone">
                  Enquiry Received
                </h3>
                <p className="mt-3 text-sm text-steel max-w-xs mx-auto leading-relaxed">
                  Thank you. Our team will get back to you shortly to discuss
                  your requirement.
                </p>
                <p className="mt-6 text-[11px] tracking-[0.2em] uppercase text-ash">
                  Prototype demo — enquiries are not stored or sent
                </p>
                <button
                  onClick={onClose}
                  data-testid="quote-success-close-button"
                  className="mt-8 inline-flex items-center bg-copper hover:bg-copper-hover text-white text-[13px] font-semibold tracking-[0.12em] uppercase px-8 py-3.5 transition-colors duration-300"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <span className="text-[10px] tracking-[0.35em] uppercase text-copper font-semibold">
                  Request a Quote
                </span>
                <h3 className="mt-3 font-display font-semibold uppercase text-3xl text-bone leading-tight">
                  Tell Us What You Need
                </h3>
                <p className="mt-3 text-sm text-steel leading-relaxed">
                  Share a few details about your component or application and
                  we will take it from there.
                </p>

                <form
                  className="mt-8 grid sm:grid-cols-2 gap-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  data-testid="quote-form"
                >
                  <div>
                    <label className={labelCls} htmlFor="q-name">Name</label>
                    <input id="q-name" required placeholder="Your name" className={inputCls} data-testid="quote-name-input" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="q-company">Company</label>
                    <input id="q-company" placeholder="Company name" className={inputCls} data-testid="quote-company-input" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="q-email">Email</label>
                    <input id="q-email" type="email" required placeholder="you@company.com" className={inputCls} data-testid="quote-email-input" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="q-phone">Phone</label>
                    <input id="q-phone" placeholder="+91" className={inputCls} data-testid="quote-phone-input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls} htmlFor="q-industry">Industry</label>
                    <select id="q-industry" className={`${inputCls} appearance-none`} data-testid="quote-industry-select" defaultValue="JCB & Heavy Equipment">
                      <option className="bg-surface">JCB & Heavy Equipment</option>
                      <option className="bg-surface">Railways</option>
                      <option className="bg-surface">Pharmaceutical Machinery</option>
                      <option className="bg-surface">Industrial Engineering</option>
                      <option className="bg-surface">Other</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls} htmlFor="q-message">Requirement</label>
                    <textarea
                      id="q-message"
                      rows={4}
                      placeholder="Describe the component, material, quantity or drawing details..."
                      className={`${inputCls} resize-none`}
                      data-testid="quote-message-input"
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-center justify-between gap-4 flex-wrap">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-ash">
                      Prototype demo form
                    </p>
                    <button
                      type="submit"
                      data-testid="quote-submit-button"
                      className="inline-flex items-center bg-copper hover:bg-copper-hover text-white text-[13px] font-semibold tracking-[0.12em] uppercase px-8 py-3.5 transition-colors duration-300"
                    >
                      Submit Enquiry
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
