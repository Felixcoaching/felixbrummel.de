/*
  Design Philosophy: "Dark Forest Ritual" – Organic Dark Luxury / Biophilic Minimalism
  - Dark background (#263238 / #2D4D44) with warm beige text (#DED5C8)
  - Olive green (#D9E5AF) as glow accent, terracotta (#795548) for dividers
  - Cormorant Garamond for headlines, DM Sans for body
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
              <Link href="/breathwork-1zu1">
                <button className="text-left text-sm tracking-wider uppercase py-2" style={{ color: "rgba(222,213,200,0.8)", fontFamily: "DM Sans, sans-serif" }}>
                  Breathwork
                </button>
              </Link>
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
      className="relative min-h-[50vh] flex items-center overflow-hidden"
      style={{ background: "#162024" }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(22,32,36,0.5) 0%, rgba(22,32,36,0.8) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 flex items-center justify-center">
        <div className="max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-['Cormorant_Garamond'] leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#F8F8F8", fontWeight: 300 }}
          >
            Impressum
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg leading-relaxed"
            style={{ color: "rgba(222,213,200,0.75)", fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}
          >
            Rechtliche Informationen und Kontaktdaten
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// Content Section
function ContentSection() {
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: "#1a2428" }}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="mb-16">
              <h2 className="font-['Cormorant_Garamond'] mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "#F8F8F8", fontWeight: 300 }}>
                Angaben gemäß § 5 TMG
              </h2>
              <div className="space-y-4">
                <p style={{ color: "rgba(222,213,200,0.8)", fontFamily: "DM Sans, sans-serif", lineHeight: "1.8" }}>
                  <strong style={{ color: "#DED5C8" }}>Felix Brummel</strong>
                  <br />
                  Hegerskamp 30
                  <br />
                  48155 Münster
                  <br />
                  <br />
                  <strong style={{ color: "#DED5C8" }}>Kontakt:</strong>
                  <br />
                  E-Mail: breathworkmitfelix@gmail.com
                  <br />
                  Telefon: 015734689267
                  <br />
                  <br />
                  <strong style={{ color: "#DED5C8" }}>Steuernummer:</strong>
                  <br />
                  Umsatzsteuer-Identifikationsnummer: DE461737546
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="divider-terracotta mb-16" />
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mb-16">
              <h2 className="font-['Cormorant_Garamond'] mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "#F8F8F8", fontWeight: 300 }}>
                Haftungsausschluss
              </h2>
              <div className="space-y-4">
                <p style={{ color: "rgba(222,213,200,0.8)", fontFamily: "DM Sans, sans-serif", lineHeight: "1.8" }}>
                  <strong style={{ color: "#DED5C8" }}>Haftung für Inhalte</strong>
                  <br />
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 des TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mb-16">
              <h2 className="font-['Cormorant_Garamond'] mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "#F8F8F8", fontWeight: 300 }}>
                Haftung für Links
              </h2>
              <div className="space-y-4">
                <p style={{ color: "rgba(222,213,200,0.8)", fontFamily: "DM Sans, sans-serif", lineHeight: "1.8" }}>
                  Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mb-16">
              <h2 className="font-['Cormorant_Garamond'] mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "#F8F8F8", fontWeight: 300 }}>
                Urheberrecht
              </h2>
              <div className="space-y-4">
                <p style={{ color: "rgba(222,213,200,0.8)", fontFamily: "DM Sans, sans-serif", lineHeight: "1.8" }}>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Autors oder Schöpfers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="mb-16">
              <h2 className="font-['Cormorant_Garamond'] mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "#F8F8F8", fontWeight: 300 }}>
                Datenschutz
              </h2>
              <div className="space-y-4">
                <p style={{ color: "rgba(222,213,200,0.8)", fontFamily: "DM Sans, sans-serif", lineHeight: "1.8" }}>
                  Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div>
              <h2 className="font-['Cormorant_Garamond'] mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "#F8F8F8", fontWeight: 300 }}>
                Rechtswirksamkeit
              </h2>
              <div className="space-y-4">
                <p style={{ color: "rgba(222,213,200,0.8)", fontFamily: "DM Sans, sans-serif", lineHeight: "1.8" }}>
                  Dieses Impressum gilt für alle Domains und Subdomains der Website von Felix Brummel. Sollten einzelne Regelungen oder Formulierungen dieses Impressums unwirksam sein oder werden, bleiben die übrigen Regelungen in ihrem Bestand und ihrer Gültigkeit unberührt.
                </p>
              </div>
            </div>
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
                <Link href="/breathwork-1zu1">
                  <button className="text-sm transition-colors" style={{ color: "rgba(222,213,200,0.5)", fontFamily: "DM Sans, sans-serif" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#D9E5AF")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(222,213,200,0.5)")}>
                    Breathwork
                  </button>
                </Link>
                <Link href="/impressum">
                  <button className="text-sm transition-colors" style={{ color: "rgba(222,213,200,0.5)", fontFamily: "DM Sans, sans-serif" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#D9E5AF")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(222,213,200,0.5)")}>
                    Impressum
                  </button>
                </Link>
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

export default function Impressum() {
  return (
    <div style={{ backgroundColor: "#263238" }}>
      <Nav />
      <HeroSection />
      <ContentSection />
      <Footer />
    </div>
  );
}
