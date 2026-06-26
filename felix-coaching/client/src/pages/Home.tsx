/*
  Design Philosophy: "Dark Forest Ritual" – Organic Dark Luxury / Biophilic Minimalism
  - Dark background (#263238 / #2D4D44) with warm beige text (#DED5C8)
  - Olive green (#D9E5AF) as glow accent, terracotta (#795548) for dividers
  - Cormorant Garamond for headlines, DM Sans for body
  - Full-viewport sections, slow scroll, fade-in animations
  - Asymmetric layouts, no centered grid monotony
*/

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663466973256/jLBoYwDRJvqxjE94tEjX9y/hero-bg-gq3jUDavks2hcQaGg4qWU2.webp";
const PRESENCE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663466973256/jLBoYwDRJvqxjE94tEjX9y/presence-section-JxxU3FL4D5XnXtrsfM8RSH.webp";
const ABSTRACT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663466973256/jLBoYwDRJvqxjE94tEjX9y/transformation-abstract-8YvBcDUcxLraufwRZXaQV2.webp";
const PORTRAIT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663466973256/jLBoYwDRJvqxjE94tEjX9y/coaching-portrait-dLvLTQ8HFPFMi8tuh7G6Hk.webp";

// Reusable fade-in animation wrapper
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Navigation
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(22, 32, 36, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(45,77,68,0.3)" : "none",
      }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-['Cormorant_Garamond'] text-xl font-semibold tracking-widest uppercase"
          style={{ color: "#D9E5AF", letterSpacing: "0.2em" }}
        >
          Felix Brummel
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/breathwork-1zu1">
            <button
              className="text-sm tracking-wider uppercase transition-colors duration-300"
              style={{ color: "rgba(222,213,200,0.7)", fontFamily: "DM Sans, sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D9E5AF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(222,213,200,0.7)")}
            >
              Breathwork
            </button>
          </Link>
          <button
            onClick={() => scrollTo("problem")}
            className="text-sm tracking-wider uppercase transition-colors duration-300"
            style={{ color: "rgba(222,213,200,0.7)", fontFamily: "DM Sans, sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#D9E5AF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(222,213,200,0.7)")}
          >
            Coaching
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-5 py-2 text-sm tracking-wider uppercase transition-all duration-300"
            style={{
              border: "1px solid rgba(217,229,175,0.5)",
              color: "#D9E5AF",
              fontFamily: "DM Sans, sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(217,229,175,0.12)";
              e.currentTarget.style.borderColor = "#D9E5AF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(217,229,175,0.5)";
            }}
          >
            Gespräch anfragen
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü öffnen"
        >
          <span className="block w-6 h-0.5 transition-all duration-300" style={{ background: "#D9E5AF", transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none" }} />
          <span className="block w-6 h-0.5 transition-all duration-300" style={{ background: "#D9E5AF", opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-6 h-0.5 transition-all duration-300" style={{ background: "#D9E5AF", transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none" }} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: "rgba(22, 32, 36, 0.97)", borderBottom: "1px solid rgba(45,77,68,0.3)" }}
          >
            <div className="container px-6 py-6 flex flex-col gap-4">
              <Link href="/breathwork-1zu1">
                <button className="text-left text-sm tracking-wider uppercase py-2" style={{ color: "rgba(222,213,200,0.8)", fontFamily: "DM Sans, sans-serif" }}>
                  Breathwork
                </button>
              </Link>
              <button
                onClick={() => scrollTo("problem")}
                className="text-left text-sm tracking-wider uppercase py-2"
                style={{ color: "rgba(222,213,200,0.8)", fontFamily: "DM Sans, sans-serif" }}
              >
                Coaching
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="mt-2 px-5 py-3 text-sm tracking-wider uppercase text-center"
                style={{ border: "1px solid rgba(217,229,175,0.5)", color: "#D9E5AF", fontFamily: "DM Sans, sans-serif" }}
              >
                Gespräch anfragen
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#162024" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663466973256/jLBoYwDRJvqxjE94tEjX9y/evgeni-evgeniev-LPKk3wtkC-g-unsplash_166376f5.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: 0.4,
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(22,32,36,0.5) 0%, rgba(22,32,36,0.6) 50%, rgba(22,32,36,0.98) 100%)",
        }}
      />

      {/* Content – centered */}
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-20 flex items-center justify-center">
        <div className="max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "#D9E5AF", fontFamily: "DM Sans, sans-serif" }}
            >
              Coaching für alle, die sich präsent führen wollen
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-['Cormorant_Garamond'] leading-[1.05] mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#F8F8F8", fontWeight: 300 }}
          >
            Du bist
            <br />
            <em style={{ color: "#D9E5AF", fontStyle: "italic" }}>erfolgreich.</em>
            <br />
            Aber spürst
            <br />
            <em style={{ color: "#D9E5AF", fontStyle: "italic" }} className="olive-glow">da ist noch mehr.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg mb-10 max-w-xl leading-relaxed"
            style={{ color: "rgba(222,213,200,0.75)", fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}
          >
            Du funktionierst, erreichst, lieferst –<br />
            aber das Gefühl von Lebendigkeit fehlt.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-block px-8 py-4 text-sm tracking-widest uppercase transition-all duration-400 text-center"
              style={{
                background: "rgba(217,229,175,0.12)",
                border: "1px solid rgba(217,229,175,0.6)",
                color: "#D9E5AF",
                fontFamily: "DM Sans, sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(217,229,175,0.22)";
                e.currentTarget.style.borderColor = "#D9E5AF";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(217,229,175,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(217,229,175,0.12)";
                e.currentTarget.style.borderColor = "rgba(217,229,175,0.6)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Gespräch anfragen
            </a>
            <a
              href="#offer"
              onClick={(e) => { e.preventDefault(); document.getElementById("offer")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-block px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 text-center"
              style={{
                color: "rgba(222,213,200,0.6)",
                fontFamily: "DM Sans, sans-serif",
                border: "1px solid rgba(222,213,200,0.15)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(222,213,200,0.9)"; e.currentTarget.style.borderColor = "rgba(222,213,200,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(222,213,200,0.6)"; e.currentTarget.style.borderColor = "rgba(222,213,200,0.15)"; }}
            >
              Das Angebot
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(217,229,175,0.4)", fontFamily: "DM Sans, sans-serif" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, rgba(217,229,175,0.4), transparent)" }}
        />
      </motion.div>
    </section>
  );
}


// Problem Section
function ProblemSection() {
  const problems = [
    { icon: "○", text: "Du funktionierst - aber lebst du wirklich?" },
    { icon: "○", text: "Du weißt viel - aber handelst du nicht aus dir heraus" },
    { icon: "○", text: "Du spürst mehr als du nach außen zeigst" },
    { icon: "○", text: "Du hast den Kontakt zu dir verloren" },
    { icon: "○", text: "Du gehst einen Weg - aber bist dir unsicher ob es wirklich deiner ist" },
  ];

  return (
    <section id="problem" className="relative py-32 overflow-hidden" style={{ 
      background: "#1a2428",
      backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663466973256/jLBoYwDRJvqxjE94tEjX9y/evgeni-evgeniev-LPKk3wtkC-g-unsplash_166376f5.webp')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed"
    }}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(22,32,36,0.95) 0%, rgba(22,32,36,0.85) 50%, rgba(22,32,36,0.7) 100%)" }} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image */}
          <FadeIn className="relative">
            <div className="relative overflow-hidden" style={{ aspectRatio: "3/4", maxHeight: "600px" }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663466973256/jLBoYwDRJvqxjE94tEjX9y/DA-Luzern18-FINALE-73_87092fb4.webp"
                alt="Felix – Rudersport"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.9) saturate(1)" }}
              />
              {/* Overlay gradient */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(26,36,40,0.8) 0%, transparent 50%)" }}
              />
            </div>
            {/* Decorative line */}
            <div
              className="absolute -right-4 top-8 bottom-8 w-px hidden lg:block"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(121,85,72,0.5), transparent)" }}
            />
          </FadeIn>

          {/* Right: Content */}
          <div>
            <FadeIn delay={0.1}>
              <span className="text-xs tracking-[0.3em] uppercase mb-4 block" style={{ color: "#D9E5AF", fontFamily: "DM Sans, sans-serif" }}>
                Das Problem
              </span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2
                className="font-['Cormorant_Garamond'] mb-8 leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#F8F8F8", fontWeight: 300 }}
              >
                Die meisten verlieren nicht
                <br />
                gegen äußere Umstände –
                <br />
                <em style={{ color: "#DED5C8" }}>sondern gegen sich selbst.</em>
              </h2>
            </FadeIn>

            <div className="space-y-4 mb-10">
              {problems.map((p, i) => (
                <FadeIn key={i} delay={0.3 + i * 0.1}>
                  <div className="flex items-center gap-4 py-3" style={{ borderBottom: "1px solid rgba(45,77,68,0.3)" }}>
                    <span style={{ color: "#795548", fontSize: "0.6rem" }}>◆</span>
                    <span className="text-base" style={{ color: "rgba(222,213,200,0.8)", fontFamily: "DM Sans, sans-serif" }}>
                      {p.text}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.7}>
              <p className="text-base leading-relaxed" style={{ color: "rgba(222,213,200,0.6)", fontFamily: "DM Sans, sans-serif", fontStyle: "italic" }}>
                Und je mehr du leistest, ohne dich selbst zu kennen –
                <br />
                <span style={{ color: "#D9E5AF" }}>desto leiser wird die Stimme, die dir wirklich wichtig ist.</span>
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section after Problem
function ProblemCTASection() {
  return (
    <section className="relative py-16 overflow-hidden" style={{ background: "#1a2428" }}>
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div
              className="p-8 md:p-12 rounded-lg text-center"
              style={{
                background: "linear-gradient(135deg, rgba(45,77,68,0.15) 0%, rgba(45,77,68,0.08) 100%)",
                border: "1px solid rgba(217,229,175,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <p className="text-sm tracking-wider uppercase mb-3" style={{ color: "#D9E5AF", fontFamily: "DM Sans, sans-serif" }}>
                Bereit, dich selbst wieder zu spüren?
              </p>
              <button
                onClick={() => window.location.href = 'https://tidycal.com/breathworkmitfelix/kostenloses-erstgesprach'}
                className="text-sm tracking-wider uppercase transition-all duration-300 mt-6 px-6 py-3"
                style={{
                  color: "#F8F8F8",
                  fontFamily: "DM Sans, sans-serif",
                  background: "rgba(217,229,175,0.15)",
                  border: "1px solid rgba(217,229,175,0.3)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(217,229,175,0.25)";
                  e.currentTarget.style.borderColor = "#D9E5AF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(217,229,175,0.15)";
                  e.currentTarget.style.borderColor = "rgba(217,229,175,0.3)";
                }}
              >
                Kostenloses Gespräch buchen
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// Realisation / Statement Section
function RealisationSection() {
  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ background: "#162024" }}
    >
      {/* Abstract background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ABSTRACT_BG})`, opacity: 0.2 }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(22,32,36,0.7)" }} />

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="text-xs tracking-[0.3em] uppercase mb-8 block" style={{ color: "#D9E5AF", fontFamily: "DM Sans, sans-serif" }}>
              Die Wahrheit
            </span>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2
              className="font-['Cormorant_Garamond'] mb-8 leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", color: "#F8F8F8", fontWeight: 300 }}
            >
              Mehr erreichen wird dich
              <br />
              <em style={{ color: "#D9E5AF" }}>nicht erfüllen. Mehr Tiefe schon</em>
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-lg mb-12 leading-relaxed" style={{ color: "rgba(222,213,200,0.7)", fontFamily: "DM Sans, sans-serif" }}>
              Sobald deine Grundbedürfnisse gedeckt sind, bringt mehr Geld,
              <br className="hidden sm:block" />
              mehr Status, mehr Leistung – keine echte Erfüllung.
            </p>
          </FadeIn>



          <FadeIn delay={0.7}>
            <div className="divider-terracotta mb-12" />
          </FadeIn>

          <FadeIn delay={0.8}>
            <h3
              className="font-['Cormorant_Garamond'] leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#F8F8F8", fontWeight: 300 }}
            >
              Was dir fehlt, ist kein Erfolg.
              <br />
              <em style={{ color: "#D9E5AF" }}>Sondern Verbindung.</em>
            </h3>
          </FadeIn>

          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto mt-10">
            {["zu deinem Körper", "zu deinen Emotionen", "zu deiner inneren Klarheit"].map((item, i) => {
              const icons = ["🫀", "💫", "✨"];
              return (
                <FadeIn key={i} delay={0.9 + i * 0.1}>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">{icons[i]}</span>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(222,213,200,0.6)", fontFamily: "DM Sans, sans-serif" }}>
                      {item}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section after Realisation
function RealisationCTASection() {
  return (
    <section className="relative py-16 overflow-hidden" style={{ background: "#1a2428" }}>
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div
              className="p-8 md:p-12 rounded-lg text-center"
              style={{
                background: "linear-gradient(135deg, rgba(45,77,68,0.15) 0%, rgba(45,77,68,0.08) 100%)",
                border: "1px solid rgba(217,229,175,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <p className="text-sm tracking-wider uppercase mb-3" style={{ color: "#D9E5AF", fontFamily: "DM Sans, sans-serif" }}>
                Du spürst, dass da noch mehr ist?
              </p>
              <button
                onClick={() => window.location.href = 'https://tidycal.com/breathworkmitfelix/kostenloses-erstgesprach'}
                className="text-sm tracking-wider uppercase transition-all duration-300 mt-6 px-6 py-3"
                style={{
                  color: "#F8F8F8",
                  fontFamily: "DM Sans, sans-serif",
                  background: "rgba(217,229,175,0.15)",
                  border: "1px solid rgba(217,229,175,0.3)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(217,229,175,0.25)";
                  e.currentTarget.style.borderColor = "#D9E5AF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(217,229,175,0.15)";
                  e.currentTarget.style.borderColor = "rgba(217,229,175,0.3)";
                }}
              >
                Kostenloses Gespräch buchen
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// Offer Section
function OfferSection() {
  const results = [
    "Du reagierst nicht mehr impulsiv",
    "Du fühlst dich klar & stabil",
    "Du hast wieder Energie & Drive",
    "Du trittst ruhig und präsent auf",
  ];

  const learnings = [
    { title: "Emotionale Regulation", desc: "Deine Emotionen sind keine Gegner – du lernst, mit ihnen zu navigieren und für dich funktional zu nutzen" },
    { title: "Wieder fühlen", desc: "Du findest Zugang zu Lebendigkeit, Freude und innerer Wärme - nicht aus dem außen sondern aus der Rückkehr zu dir selbst" },
    { title: "Klare Entscheidungen", desc: "Du handelst aus dir heraus – nicht weil du musst, sondern weil du weißt, was für dich und dein System am besten ist" },
    { title: "Souveränes Auftreten", desc: "Präsenz, die andere spüren – ganz ohne Anstrengung oder schauspielen" },
  ];

  return (
    <section id="offer" className="relative py-32 overflow-hidden" style={{ background: "#1e2c30" }}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <FadeIn>
            <span className="text-xs tracking-[0.3em] uppercase mb-4 block" style={{ color: "#D9E5AF", fontFamily: "DM Sans, sans-serif" }}>
              Das Angebot
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2
              className="font-['Cormorant_Garamond'] mb-6 leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", color: "#F8F8F8", fontWeight: 300 }}
            >
              Self-Leadership: Presence in Action
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(222,213,200,0.7)", fontFamily: "DM Sans, sans-serif" }}>
              Ein Coaching, das dich zurückbringt zu dir selbst – zu echter Präsenz, innerer Stabilität und einer Führung, die aus dir heraus entsteht.
            </p>
          </FadeIn>
        </div>

        {/* Differentiator */}
        <FadeIn delay={0.3}>
          <div
            className="mb-16 p-8 max-w-2xl"
            style={{
              background: "rgba(45,77,68,0.15)",
              border: "1px solid rgba(45,77,68,0.4)",
              borderLeft: "3px solid #D9E5AF",
            }}
          >
            <p className="text-sm tracking-wider uppercase mb-3" style={{ color: "#D9E5AF", fontFamily: "DM Sans, sans-serif" }}>
              Das ist kein Mindset Coaching.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "rgba(222,213,200,0.75)", fontFamily: "DM Sans, sans-serif" }}>
              Du arbeitest nicht nur mit Gedanken – sondern mit deinem <strong style={{ color: "#DED5C8" }}>Nervensystem und Körper</strong>. Breathwork, somatische Arbeit und Coaching fließen ineinander. Nicht um dich zu optimieren. Sondern um dich wieder zu dir zu bringen.
            </p>
          </div>
        </FadeIn>

        {/* What you learn */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {learnings.map((item, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <div
                className="p-6 transition-all duration-400 group"
                style={{
                  background: "rgba(38,50,56,0.6)",
                  border: "1px solid rgba(45,77,68,0.3)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(217,229,175,0.3)"; e.currentTarget.style.background = "rgba(45,77,68,0.2)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(45,77,68,0.3)"; e.currentTarget.style.background = "rgba(38,50,56,0.6)"; }}
              >
                <h3
                  className="font-['Cormorant_Garamond'] text-xl mb-3"
                  style={{ color: "#DED5C8", fontWeight: 500 }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(222,213,200,0.6)", fontFamily: "DM Sans, sans-serif" }}>
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Results */}
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h3
              className="font-['Cormorant_Garamond'] mb-8"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "#F8F8F8", fontWeight: 300 }}
            >
              Was sich verändert und wie sich das anfühlt:
            </h3>
          </FadeIn>
          <div className="space-y-3">
            {results.map((r, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="flex items-center gap-5 py-4"
                  style={{ borderBottom: "1px solid rgba(45,77,68,0.25)" }}
                >
                  <span style={{ color: "#D9E5AF", fontSize: "0.5rem" }}>◆</span>
                  <span className="text-base" style={{ color: "rgba(222,213,200,0.85)", fontFamily: "DM Sans, sans-serif" }}>
                    {r}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section after Offer
function OfferCTASection() {
  return (
    <section className="relative py-16 overflow-hidden" style={{ background: "#1a2428" }}>
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div
              className="p-8 md:p-12 rounded-lg text-center"
              style={{
                background: "linear-gradient(135deg, rgba(45,77,68,0.15) 0%, rgba(45,77,68,0.08) 100%)",
                border: "1px solid rgba(217,229,175,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <p className="text-sm tracking-wider uppercase mb-3" style={{ color: "#D9E5AF", fontFamily: "DM Sans, sans-serif" }}>
                Bereit für Veränderung?
              </p>
              <button
                onClick={() => window.location.href = 'https://tidycal.com/breathworkmitfelix/kostenloses-erstgesprach'}
                className="text-sm tracking-wider uppercase transition-all duration-300 mt-6 px-6 py-3"
                style={{
                  color: "#F8F8F8",
                  fontFamily: "DM Sans, sans-serif",
                  background: "rgba(217,229,175,0.15)",
                  border: "1px solid rgba(217,229,175,0.3)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(217,229,175,0.25)";
                  e.currentTarget.style.borderColor = "#D9E5AF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(217,229,175,0.15)";
                  e.currentTarget.style.borderColor = "rgba(217,229,175,0.3)";
                }}
              >
                Kostenloses Gespräch buchen
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// Identity Shift / Quote Section
function IdentitySection() {
  return (
    <section
      className="relative py-40 overflow-hidden"
      style={{ background: "#162024" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(45,77,68,0.15) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 container mx-auto px-6 text-center">
        <FadeIn>
          <div className="divider-terracotta max-w-xs mx-auto mb-16" />
        </FadeIn>
        <FadeIn delay={0.2}>
          <blockquote
            className="font-['Cormorant_Garamond'] leading-tight mx-auto"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)", color: "#F8F8F8", fontWeight: 300, maxWidth: "900px" }}
          >
            „Du wirst zu jemandem,
            <br />
            der nicht mehr kämpft –
            <br />
            <em style={{ color: "#D9E5AF" }}>sondern spielerisch lebt."</em>
          </blockquote>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="divider-terracotta max-w-xs mx-auto mt-16" />
        </FadeIn>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden" style={{ background: "#1a2428" }}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div>
            <FadeIn>
              <span className="text-xs tracking-[0.3em] uppercase mb-4 block" style={{ color: "#D9E5AF", fontFamily: "DM Sans, sans-serif" }}>
                Über mich
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2
                className="font-['Cormorant_Garamond'] mb-8 leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#F8F8F8", fontWeight: 300 }}
              >
                Ich helfe dir,
                <br />
                wieder etwas zu fühlen –
                <br />
                <em style={{ color: "#DED5C8" }}>und daraus echte Selbstführung zu entwickeln.</em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(222,213,200,0.7)", fontFamily: "DM Sans, sans-serif" }}>
                Elf Jahre internationaler Rudersport haben mir gezeigt, was es bedeutet, alles auf ein Ziel auszurichten. Disziplin, Fokus, Leistung. Ich kannte nichts anderes.


Als meine Karriere endete, fiel ich in ein tiefes Loch. Ich dachte, ich hätte alles verloren. Meine Identität, meinen Sinn, meine Richtung.


Aber genau dort begann das Wertvollste. Ich entdeckte, wie viel ich in Wirklichkeit gewonnen hatte. Und wie viele neue Erfahrungen das Leben für mich bereithielt, sobald ich aufhörte, nur zu leisten.


Breathwork, somatische Körperarbeit und Neuroresonanz wurden nicht zu Methoden, die ich studierte. Sie wurden zu Erfahrungen, die mich verwandelt haben.

Heute begleite ich Menschen, die spüren, dass es mehr gibt als Funktionieren. Die wieder in Kontakt kommen wollen mit ihrem Körper, ihrer Lebendigkeit, ihrer inneren Führung.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(222,213,200,0.7)", fontFamily: "DM Sans, sans-serif" }}>
                Meine Arbeit basiert auf der Überzeugung: Menschen sind nicht unglücklich, weil sie zu wenig erreichen – sondern weil sie den Kontakt zu sich selbst verloren haben.
              </p>
            </FadeIn>
          </div>

          {/* Right: Portrait */}
          <FadeIn delay={0.2} className="relative">
            <div className="relative overflow-hidden" style={{ aspectRatio: "3/4", maxHeight: "580px" }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663466973256/jLBoYwDRJvqxjE94tEjX9y/felix-brummel_75872c70.jpg"
                alt="Felix Brummel – Coach"
                className="w-full h-full object-cover object-top"
                style={{ filter: "brightness(0.95) saturate(1)" }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(26,36,40,0.7) 0%, transparent 60%)" }}
              />
            </div>
            {/* Decorative element */}
            <div
              className="absolute -left-4 top-8 bottom-8 w-px hidden lg:block"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(121,85,72,0.5), transparent)" }}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// Breathwork Connection Section
function BreathworkConnectionSection() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: "#162024" }}>
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div
              className="p-8 md:p-12 rounded-lg"
              style={{
                background: "linear-gradient(135deg, rgba(45,77,68,0.15) 0%, rgba(45,77,68,0.08) 100%)",
                border: "1px solid rgba(217,229,175,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <p className="text-sm tracking-wider uppercase mb-3" style={{ color: "#D9E5AF", fontFamily: "DM Sans, sans-serif" }}>
                Noch nicht sicher?
              </p>
              <h3
                className="font-['Cormorant_Garamond'] mb-4 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#F8F8F8", fontWeight: 300 }}
              >
                Lerne mich zuerst in einer 1:1 Breathwork Journey kennen.
              </h3>
              <Link href="/breathwork-1zu1">
                <button
                  className="text-sm tracking-wider uppercase transition-all duration-300 mt-6"
                  style={{
                    color: "#D9E5AF",
                    fontFamily: "DM Sans, sans-serif",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                    textDecorationColor: "rgba(217,229,175,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecorationColor = "#D9E5AF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecorationColor = "rgba(217,229,175,0.3)";
                  }}
                >
                  Zur Breathwork-Seite →
                </button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// Contact / CTA Section
function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Opens mailto as fallback
    const subject = encodeURIComponent("Coaching Gespräch anfragen");
    const body = encodeURIComponent(`Name: ${formData.name}\nE-Mail: ${formData.email}\n\nNachricht:\n${formData.message}`);
    window.location.href = `mailto:felix@breathworkmitfelix.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden" style={{ background: "#162024" }}>
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at bottom center, rgba(45,77,68,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <span className="text-xs tracking-[0.3em] uppercase mb-4 block text-center" style={{ color: "#D9E5AF", fontFamily: "DM Sans, sans-serif" }}>
              Nächster Schritt
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2
              className="font-['Cormorant_Garamond'] mb-4 leading-tight text-center"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#F8F8F8", fontWeight: 300 }}
            >
              Bereit
              <br />
              <em style={{ color: "#D9E5AF" }}>mit dem Leben zu spielen?</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base leading-relaxed mb-12 text-center" style={{ color: "rgba(222,213,200,0.65)", fontFamily: "DM Sans, sans-serif" }}>
              Schreib mir eine kurze Nachricht. Wir klären in einem kostenlosen Erstgespräch,
              ob und wie ich dir helfen kann.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-wider uppercase mb-2" style={{ color: "rgba(217,229,175,0.6)", fontFamily: "DM Sans, sans-serif" }}>
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-300"
                      style={{
                        background: "rgba(45,77,68,0.12)",
                        border: "1px solid rgba(45,77,68,0.4)",
                        color: "#DED5C8",
                        fontFamily: "DM Sans, sans-serif",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(217,229,175,0.5)"; e.currentTarget.style.background = "rgba(45,77,68,0.2)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(45,77,68,0.4)"; e.currentTarget.style.background = "rgba(45,77,68,0.12)"; }}
                      placeholder="Dein Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase mb-2" style={{ color: "rgba(217,229,175,0.6)", fontFamily: "DM Sans, sans-serif" }}>
                      E-Mail
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-300"
                      style={{
                        background: "rgba(45,77,68,0.12)",
                        border: "1px solid rgba(45,77,68,0.4)",
                        color: "#DED5C8",
                        fontFamily: "DM Sans, sans-serif",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(217,229,175,0.5)"; e.currentTarget.style.background = "rgba(45,77,68,0.2)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(45,77,68,0.4)"; e.currentTarget.style.background = "rgba(45,77,68,0.12)"; }}
                      placeholder="deine@email.de"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase mb-2" style={{ color: "rgba(217,229,175,0.6)", fontFamily: "DM Sans, sans-serif" }}>
                    Was bewegt dich gerade?
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none transition-all duration-300 resize-none"
                    style={{
                      background: "rgba(45,77,68,0.12)",
                      border: "1px solid rgba(45,77,68,0.4)",
                      color: "#DED5C8",
                      fontFamily: "DM Sans, sans-serif",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(217,229,175,0.5)"; e.currentTarget.style.background = "rgba(45,77,68,0.2)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(45,77,68,0.4)"; e.currentTarget.style.background = "rgba(45,77,68,0.12)"; }}
                    placeholder="Beschreib kurz, was dich bewegt und was du dir wünschst…"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 text-sm tracking-widest uppercase transition-all duration-400"
                  style={{
                    background: "rgba(217,229,175,0.12)",
                    border: "1px solid rgba(217,229,175,0.5)",
                    color: "#D9E5AF",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(217,229,175,0.2)";
                    e.currentTarget.style.borderColor = "#D9E5AF";
                    e.currentTarget.style.boxShadow = "0 0 30px rgba(217,229,175,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(217,229,175,0.12)";
                    e.currentTarget.style.borderColor = "rgba(217,229,175,0.5)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Jetzt Gespräch anfragen
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
                style={{
                  border: "1px solid rgba(217,229,175,0.3)",
                  background: "rgba(45,77,68,0.12)",
                }}
              >
                <p className="font-['Cormorant_Garamond'] text-2xl mb-3" style={{ color: "#D9E5AF" }}>
                  Danke für deine Nachricht.
                </p>
                <p className="text-sm" style={{ color: "rgba(222,213,200,0.6)", fontFamily: "DM Sans, sans-serif" }}>
                  Ich melde mich in Kürze bei dir.
                </p>
              </motion.div>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer
      className="py-12 border-t"
      style={{ background: "#0f1a1e", borderColor: "rgba(45,77,68,0.3)" }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span
              className="font-['Cormorant_Garamond'] text-lg tracking-widest uppercase"
              style={{ color: "#D9E5AF" }}
            >
              Felix Brummel
            </span>
            <p className="text-xs mt-1" style={{ color: "rgba(222,213,200,0.35)", fontFamily: "DM Sans, sans-serif" }}>
              Self-Leadership - Presence in Action
            </p>
          </div>
          <div className="flex items-center gap-8">
            <button
              onClick={() => window.location.href = '/impressum'}
              className="text-xs tracking-wider uppercase transition-colors duration-300"
              style={{ color: "rgba(222,213,200,0.4)", fontFamily: "DM Sans, sans-serif", background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(217,229,175,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(222,213,200,0.4)")}
            >
              Impressum
            </button>
            <button
              onClick={() => window.location.href = '/datenschutz'}
              className="text-xs tracking-wider uppercase transition-colors duration-300"
              style={{ color: "rgba(222,213,200,0.4)", fontFamily: "DM Sans, sans-serif", background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(217,229,175,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(222,213,200,0.4)")}
            >
              Datenschutz
            </button>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-wider uppercase transition-colors duration-300"
              style={{ color: "rgba(222,213,200,0.4)", fontFamily: "DM Sans, sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(217,229,175,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(222,213,200,0.4)")}
            >
              Instagram
            </a>
          </div>
          <p className="text-xs" style={{ color: "rgba(222,213,200,0.25)", fontFamily: "DM Sans, sans-serif" }}>
            © 2026 Felix. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main Page
export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#162024" }}>
      <Nav />
      <HeroSection />
      <ProblemSection />
      <ProblemCTASection />
      <RealisationSection />
      <RealisationCTASection />
      <OfferSection />
      <OfferCTASection />
      <IdentitySection />
      <AboutSection />
      <ContactSection />
      <BreathworkConnectionSection />
      <Footer />
    </div>
  );
}
