/*
  Design Philosophy: "Dark Forest Ritual" – Organic Dark Luxury / Biophilic Minimalism
  - Dark background (#263238 / #2D4D44) with warm beige text (#DED5C8)
  - Olive green (#D9E5AF) as glow accent, terracotta (#795548) for dividers
  - Cormorant Garamond for headlines, DM Sans for body
  - Full-viewport sections, slow scroll, fade-in animations
  - Asymmetric layouts, decorative elements, smooth transitions
*/

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

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
        <Link href="/">
          <button
            className="font-['Cormorant_Garamond'] text-xl font-semibold tracking-widest uppercase"
            style={{ color: "#D9E5AF", letterSpacing: "0.2em" }}
          >
            Felix Brummel
          </button>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/">
            <button
              className="text-sm tracking-wider uppercase transition-colors duration-300"
              style={{ color: "rgba(222,213,200,0.7)", fontFamily: "DM Sans, sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D9E5AF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(222,213,200,0.7)")}
            >
              Coaching
            </button>
          </Link>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
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
              <Link href="/">
                <button className="text-left text-sm tracking-wider uppercase py-2" style={{ color: "rgba(222,213,200,0.8)", fontFamily: "DM Sans, sans-serif" }}>
                  Coaching
                </button>
              </Link>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
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
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663466973256/jLBoYwDRJvqxjE94tEjX9y/breathwork-hero-forest-6eFTCK5G42BEByRgxmR56m.webp')",
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

      {/* Content */}
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
              Breathwork · 1:1 · 90 Minuten
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-['Cormorant_Garamond'] leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#F8F8F8", fontWeight: 300 }}
          >
            Dein Raum.
            <br />
            <em style={{ color: "#D9E5AF", fontStyle: "italic" }}>Für das, was unter der Oberfläche wartet.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg mb-10 max-w-xl leading-relaxed"
            style={{ color: "rgba(222,213,200,0.75)", fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}
          >
            Eine geführte 1:1 Breathwork Journey. Für Menschen die sich selbst wieder spüren wollen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://tidycal.com/breathworkmitfelix/kostenloses-erstgesprach"
              target="_blank"
              rel="noopener noreferrer"
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
              Kostenloses Kennenlerngespräch
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
                Ich bin Felix.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(222,213,200,0.8)", fontFamily: "DM Sans, sans-serif" }}>
                Breathwork hat mich aus einem Loch geholt, aus dem ich anders nicht herausgekommen wäre. Mein Körper brauchte diesen Raum, um wieder anzukommen. Und nach meiner ersten Journey wusste ich sofort: Das ist mein Weg.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-base leading-relaxed" style={{ color: "rgba(222,213,200,0.8)", fontFamily: "DM Sans, sans-serif" }}>
                Aus dieser Erfahrung heraus bin ich Breathwork Facilitator geworden. Nicht um eine Methode zu unterrichten, sondern um anderen den Zugang zu geben, den ich selbst gesucht habe.
              </p>
            </FadeIn>
          </div>

          {/* Right: Image */}
          <FadeIn delay={0.2} className="relative">
            <div className="relative overflow-hidden" style={{ aspectRatio: "3/4", maxHeight: "580px" }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663466973256/jLBoYwDRJvqxjE94tEjX9y/felix-brummel_75872c70.jpg"
                alt="Felix Brummel – Breathwork Facilitator"
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

// What is a Session Section
function SessionSection() {
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: "#2D4D44" }}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image */}
          <FadeIn className="relative">
            <div className="relative overflow-hidden" style={{ aspectRatio: "3/4", maxHeight: "600px" }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663466973256/jLBoYwDRJvqxjE94tEjX9y/breathwork-session_8873b7e6.jpg"
                alt="Breathwork Session"
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
                Die Session
              </span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2
                className="font-['Cormorant_Garamond'] mb-8 leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#F8F8F8", fontWeight: 300 }}
              >
                Was ist eine 1:1 Breathwork Journey?
              </h2>
            </FadeIn>

            <div className="space-y-4 mb-10">
              <FadeIn delay={0.3}>
                <p className="text-base leading-relaxed" style={{ color: "rgba(222,213,200,0.8)", fontFamily: "DM Sans, sans-serif" }}>
                  Du legst dich hin. Du schließt die Augen. Du weißt, dass du in eienm sicheren Raum bist ohne Bewertung. Du atmest.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <p className="text-base leading-relaxed" style={{ color: "rgba(222,213,200,0.8)", fontFamily: "DM Sans, sans-serif" }}>
                  Und irgendwann, ohne dass du weißt wann genau, wird der Kopf leiser und dein Körper übernimmt. Du kannst ihn zuhören.
                </p>
              </FadeIn>

              <FadeIn delay={0.5}>
                <p className="text-base leading-relaxed" style={{ color: "rgba(222,213,200,0.8)", fontFamily: "DM Sans, sans-serif" }}>
                  Dein Körper weiß Dinge, die dein Kopf nicht weiß oder noch nicht zulassen konnte. Breathwork gibt ihm den Raum, sie zu zeigen.
                </p>
              </FadeIn>

              <FadeIn delay={0.6}>
                <p className="text-base leading-relaxed" style={{ color: "#D9E5AF", fontFamily: "DM Sans, sans-serif", fontStyle: "italic" }}>
                  Aber ich kann hier viel beschreiben: Das lässt sich nicht erklären. Nur erleben.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Process Section
function ProcessSection() {
  const steps = [
    { num: "01", title: "Ankommen", desc: "Wir schaffen einen sicheren Raum. Wir sprechen kurz über deine Intention." },
    { num: "02", title: "Atemarbeit", desc: "Ich führe dich durch eine spezifische Atemtechnik, durch die du Zugang zu vielen Informationen bekommst." },
    { num: "03", title: "Körper sprechen lassen", desc: "Ohne Anstrengung – nur durch deinen Atem – beginnt dein Körper zu zeigen, was er braucht." },
    { num: "04", title: "Integration", desc: "Nach der Session nehmen wir uns Zeit, das Erlebte zu integrieren. Keine Analyse, sondern nur Raum für das, was sich gezeigt hat." },
  ];

  return (
    <section id="process" className="relative py-32 overflow-hidden" style={{ background: "#263238" }}>
      <div className="container mx-auto px-6">
        <FadeIn>
          <span className="text-xs tracking-[0.3em] uppercase mb-4 block" style={{ color: "#D9E5AF", fontFamily: "DM Sans, sans-serif" }}>
            Der Ablauf
          </span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2
            className="font-['Cormorant_Garamond'] mb-16 leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#F8F8F8", fontWeight: 300 }}
          >
            So läuft eine Session ab
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={0.2 + i * 0.1}>
              <div
                className="p-8 transition-all duration-400 group"
                style={{
                  background: "rgba(45,77,68,0.15)",
                  border: "1px solid rgba(45,77,68,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(217,229,175,0.3)";
                  e.currentTarget.style.background = "rgba(45,77,68,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(45,77,68,0.3)";
                  e.currentTarget.style.background = "rgba(45,77,68,0.15)";
                }}
              >
                <span
                  className="text-3xl font-['Cormorant_Garamond'] mb-3 block"
                  style={{ color: "#D9E5AF", fontWeight: 300 }}
                >
                  {step.num}
                </span>
                <h3
                  className="font-['Cormorant_Garamond'] text-xl mb-3"
                  style={{ color: "#DED5C8", fontWeight: 500 }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(222,213,200,0.6)", fontFamily: "DM Sans, sans-serif" }}>
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Section
function PricingSection() {
  return (
    <section id="pricing" className="relative py-32 overflow-hidden" style={{ background: "#1a2428" }}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <span className="text-xs tracking-[0.3em] uppercase mb-4 block" style={{ color: "#D9E5AF", fontFamily: "DM Sans, sans-serif" }}>
              Investment
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2
              className="font-['Cormorant_Garamond'] mb-8 leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", color: "#F8F8F8", fontWeight: 300 }}
            >
              1:1 Breathwork Session
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div
              className="inline-block p-12 mb-12"
              style={{
                background: "rgba(45,77,68,0.2)",
                border: "1px solid rgba(45,77,68,0.4)",
              }}
            >
              <div className="text-6xl font-['Cormorant_Garamond'] mb-3" style={{ color: "#D9E5AF", fontWeight: 300 }}>
                180€
              </div>
              <p className="text-base" style={{ color: "rgba(222,213,200,0.7)", fontFamily: "DM Sans, sans-serif" }}>
                90 Minuten · 1:1 · Inklusive Nachbesprechung
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="divider-terracotta max-w-xs mx-auto mb-12" />
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(222,213,200,0.7)", fontFamily: "DM Sans, sans-serif" }}>
              Bereit, dich selbst wieder zu spüren? Buche ein kostenloses Kennenlerngespräch und wir schauen gemeinsam, ob Breathwork für dich der richtige Weg ist.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <a
              href="https://tidycal.com/breathworkmitfelix/kostenloses-erstgesprach"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 text-sm tracking-widest uppercase transition-all duration-400"
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
              Kostenloses Gespräch buchen
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// Coaching Connection Section
function CoachingConnectionSection() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: "#1a2428" }}>
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
                Du spürst dass da noch mehr ist?
              </p>
              <h3
                className="font-['Cormorant_Garamond'] mb-4 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#F8F8F8", fontWeight: 300 }}
              >
                Das Self-Leadership Coaching geht tiefer.
              </h3>
              <Link href="/">
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
                  Mehr erfahren →
                </button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden" style={{ background: "#162024" }}>
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at bottom center, rgba(45,77,68,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <span className="text-xs tracking-[0.3em] uppercase mb-4 block" style={{ color: "#D9E5AF", fontFamily: "DM Sans, sans-serif" }}>
              Kontakt
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2
              className="font-['Cormorant_Garamond'] mb-8 leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#F8F8F8", fontWeight: 300 }}
            >
              Fragen?
              <br />
              <em style={{ color: "#D9E5AF" }}>Schreib mir.</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(222,213,200,0.65)", fontFamily: "DM Sans, sans-serif" }}>
              Du hast Fragen zur Session oder möchtest mehr über Breathwork erfahren? Kontaktiere mich direkt.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <a
              href="mailto:breathworkmitfelix@gmail.com"
              className="inline-block text-base tracking-wider transition-all duration-300"
              style={{ color: "rgba(217,229,175,0.6)", fontFamily: "DM Sans, sans-serif", borderBottom: "1px solid rgba(217,229,175,0.3)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#D9E5AF";
                e.currentTarget.style.borderBottomColor = "#D9E5AF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(217,229,175,0.6)";
                e.currentTarget.style.borderBottomColor = "rgba(217,229,175,0.3)";
              }}
            >
              breathworkmitfelix@gmail.com
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="relative py-12 overflow-hidden" style={{ background: "#0f1517" }}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="font-['Cormorant_Garamond'] text-lg mb-4" style={{ color: "#D9E5AF", fontWeight: 500 }}>
                Felix Brummel
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(222,213,200,0.5)", fontFamily: "DM Sans, sans-serif" }}>
                Breathwork & Self-Leadership Coaching
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "rgba(222,213,200,0.6)", fontFamily: "DM Sans, sans-serif" }}>
                Navigation
              </h4>
              <div className="space-y-2">
                <Link href="/">
                  <button className="text-sm transition-colors" style={{ color: "rgba(222,213,200,0.5)", fontFamily: "DM Sans, sans-serif" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#D9E5AF")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(222,213,200,0.5)")}>
                    Coaching
                  </button>
                </Link>
                <button onClick={() => window.location.href = '/impressum'} className="block text-sm transition-colors" style={{ color: "rgba(222,213,200,0.5)", fontFamily: "DM Sans, sans-serif", background: "none", border: "none", cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#D9E5AF")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(222,213,200,0.5)")}>\n                  Impressum\n                </button>
                <button onClick={() => window.location.href = '/datenschutz'} className="block text-sm transition-colors" style={{ color: "rgba(222,213,200,0.5)", fontFamily: "DM Sans, sans-serif", background: "none", border: "none", cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#D9E5AF")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(222,213,200,0.5)")}>\n                  Datenschutz\n                </button>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "rgba(222,213,200,0.6)", fontFamily: "DM Sans, sans-serif" }}>
                Sozial
              </h4>
              <a
                href="https://instagram.com/felixbrummel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors"
                style={{ color: "rgba(222,213,200,0.5)", fontFamily: "DM Sans, sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D9E5AF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(222,213,200,0.5)")}
              >
                @felixbrummel
              </a>
            </div>
          </div>

          <div className="divider-terracotta mb-8" />

          <div className="text-center">
            <p className="text-xs" style={{ color: "rgba(222,213,200,0.4)", fontFamily: "DM Sans, sans-serif" }}>
              © 2025 Felix Brummel. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Breathwork() {
  return (
    <div style={{ backgroundColor: "#263238" }}>
      <Nav />
      <HeroSection />
      <AboutSection />
      <SessionSection />
      <ProcessSection />
      <PricingSection />
      <CoachingConnectionSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
