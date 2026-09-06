import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import "@/App.css";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { About } from "@/components/site/About";
import { Industries } from "@/components/site/Industries";
import { Manufacture } from "@/components/site/Manufacture";
import { Capabilities } from "@/components/site/Capabilities";
import { Quality } from "@/components/site/Quality";
import { Gallery } from "@/components/site/Gallery";
import { WhyUs } from "@/components/site/WhyUs";
import { Team } from "@/components/site/Team";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { QuoteModal } from "@/components/site/QuoteModal";
import { Preloader } from "@/components/site/Preloader";
import { Blog } from "@/components/site/Blog";

function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const openQuote = useCallback(() => setQuoteOpen(true), []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, anchors: true });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App bg-coal text-bone font-sans antialiased">
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>
      <div className="grain" aria-hidden />
      <Navbar onQuote={openQuote} />
      <main>
        <Hero onQuote={openQuote} start={!loading} />
        <Marquee />
        <About />
        <Industries />
        <Manufacture onQuote={openQuote} />
        <Capabilities />
        <Quality />
        <Gallery />
        <WhyUs onQuote={openQuote} />
        <Team />
        <Blog />
        <FinalCTA onQuote={openQuote} />
      </main>
      <Footer />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}

export default App;
