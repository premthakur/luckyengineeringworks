import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { EASE } from "./Reveal";

const inputCls =
  "w-full bg-transparent border border-line focus:border-copper outline-none px-4 py-3 text-sm text-bone placeholder:text-ash transition-colors duration-300";
const labelCls = "block text-[10px] tracking-[0.25em] uppercase text-steel font-semibold mb-2";

const SCRIPT_URL = process.env.REACT_APP_APPS_SCRIPT_URL;

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const QuoteModal = ({ open, onClose }) => {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (open) {
      setSent(false);
      setError("");
      setFile(null);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = {
      name: fd.get("name"),
      company: fd.get("company"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      requirement: fd.get("requirement"),
    };
    if (!SCRIPT_URL) {
      setSent(true);
      return;
    }
    setSending(true);
    setError("");
    try {
      if (file) {
        payload.fileName = file.name;
        payload.fileData = await fileToBase64(file);
      }
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      setSent(true);
    } catch (err) {
      setError("Could not send your enquiry. Please try again or email us at contact@luckyengineeringwork.com.");
    } finally {
      setSending(false);
    }
  };

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
                {!SCRIPT_URL && (
                  <p className="mt-6 text-[11px] tracking-[0.2em] uppercase text-ash">
                    Demo mode — form goes live once connected to Google Sheets
                  </p>
                )}
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
                  onSubmit={handleSubmit}
                  data-testid="quote-form"
                >
                  <div>
                    <label className={labelCls} htmlFor="q-name">Name *</label>
                    <input id="q-name" name="name" required placeholder="Your name" className={inputCls} data-testid="quote-name-input" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="q-company">Company Name *</label>
                    <input id="q-company" name="company" required placeholder="Company name" className={inputCls} data-testid="quote-company-input" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="q-email">Email *</label>
                    <input id="q-email" name="email" type="email" required placeholder="you@company.com" className={inputCls} data-testid="quote-email-input" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="q-phone">Phone *</label>
                    <input id="q-phone" name="phone" required placeholder="+91" className={inputCls} data-testid="quote-phone-input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls} htmlFor="q-message">Requirement</label>
                    <textarea
                      id="q-message"
                      name="requirement"
                      rows={4}
                      placeholder="Describe the component, material, quantity or drawing details..."
                      className={`${inputCls} resize-none`}
                      data-testid="quote-message-input"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls} htmlFor="q-file">Upload Drawing (PDF — optional)</label>
                    <label
                      htmlFor="q-file"
                      className="flex items-center justify-between gap-4 border border-dashed border-line-strong hover:border-copper px-4 py-3.5 cursor-pointer transition-colors duration-300"
                    >
                      <span className="text-sm text-steel truncate">
                        {file ? file.name : "Choose a PDF drawing to attach"}
                      </span>
                      <span className="text-[10px] tracking-[0.25em] uppercase text-copper font-semibold shrink-0">
                        Browse
                      </span>
                    </label>
                    <input
                      id="q-file"
                      type="file"
                      accept="application/pdf,.pdf"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      data-testid="quote-file-input"
                    />
                  </div>
                  {error && (
                    <p className="sm:col-span-2 text-sm text-red-400" data-testid="quote-error-message">
                      {error}
                    </p>
                  )}
                  <div className="sm:col-span-2 flex items-center justify-between gap-4 flex-wrap">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-ash">
                      {SCRIPT_URL ? "Goes straight to our team" : "Demo mode — not connected yet"}
                    </p>
                    <button
                      type="submit"
                      disabled={sending}
                      data-testid="quote-submit-button"
                      className="inline-flex items-center bg-copper hover:bg-copper-hover disabled:opacity-60 text-white text-[13px] font-semibold tracking-[0.12em] uppercase px-8 py-3.5 transition-colors duration-300"
                    >
                      {sending ? "Sending..." : "Submit Enquiry"}
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
