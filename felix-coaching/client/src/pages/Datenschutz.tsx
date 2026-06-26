/*
  Datenschutzerklärung (Privacy Policy) Page
  Design Philosophy: "Dark Forest Ritual" – Organic Dark Luxury / Biophilic Minimalism
  - Dark background (#263238 / #2D4D44) with warm beige text (#DED5C8)
  - Olive green (#D9E5AF) as glow accent, terracotta (#795548) for dividers
  - Cormorant Garamond for headlines, DM Sans for body
*/

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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
          <span className="font-['Cormorant_Garamond'] text-xl tracking-widest uppercase cursor-pointer" style={{ color: "#D9E5AF" }}>
            Felix Brummel
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/breathwork-1zu1">
            <span className="text-sm tracking-wider uppercase cursor-pointer transition-colors" style={{ color: "rgba(222,213,200,0.6)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#D9E5AF")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(222,213,200,0.6)")}>
              Breathwork
            </span>
          </Link>
          <Link href="/">
            <span className="text-sm tracking-wider uppercase cursor-pointer transition-colors" style={{ color: "rgba(222,213,200,0.6)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#D9E5AF")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(222,213,200,0.6)")}>
              Coaching
            </span>
          </Link>
          <button onClick={() => window.location.href = 'https://tidycal.com/breathworkmitfelix/kostenloses-erstgesprach'} className="text-sm tracking-wider uppercase px-4 py-2 transition-all" style={{ color: "#F8F8F8", background: "rgba(217,229,175,0.15)", border: "1px solid rgba(217,229,175,0.3)", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(217,229,175,0.25)"; e.currentTarget.style.borderColor = "#D9E5AF"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(217,229,175,0.15)"; e.currentTarget.style.borderColor = "rgba(217,229,175,0.3)"; }}>
            Gespräch anfragen
          </button>
        </div>
      </div>
    </nav>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 border-t" style={{ background: "#0f1a1e", borderColor: "rgba(45,77,68,0.3)" }}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-['Cormorant_Garamond'] text-lg tracking-widest uppercase" style={{ color: "#D9E5AF" }}>
              Felix Brummel
            </span>
            <p className="text-xs mt-1" style={{ color: "rgba(222,213,200,0.35)", fontFamily: "DM Sans, sans-serif" }}>
              Self-Leadership - Presence in Action
            </p>
          </div>
          <div className="flex items-center gap-8">
            <button onClick={() => window.location.href = '/impressum'} className="text-xs tracking-wider uppercase transition-colors duration-300" style={{ color: "rgba(222,213,200,0.4)", fontFamily: "DM Sans, sans-serif", background: "none", border: "none", cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(217,229,175,0.7)")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(222,213,200,0.4)")}>
              Impressum
            </button>
            <button onClick={() => window.location.href = '/datenschutz'} className="text-xs tracking-wider uppercase transition-colors duration-300" style={{ color: "rgba(222,213,200,0.4)", fontFamily: "DM Sans, sans-serif", background: "none", border: "none", cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(217,229,175,0.7)")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(222,213,200,0.4)")}>
              Datenschutz
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Datenschutz() {
  return (
    <div className="min-h-screen" style={{ background: "#162024" }}>
      <Nav />
      <section className="pt-32 pb-16 px-6" style={{ background: "#162024" }}>
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <h1 className="font-['Cormorant_Garamond'] text-5xl mb-8 leading-tight" style={{ color: "#F8F8F8", fontWeight: 300 }}>
              Datenschutzerklärung
            </h1>
          </FadeIn>

          <div className="space-y-8" style={{ color: "rgba(222,213,200,0.8)", fontFamily: "DM Sans, sans-serif" }}>
            <FadeIn delay={0.1}>
              <div>
                <h2 className="font-['Cormorant_Garamond'] text-2xl mb-4" style={{ color: "#DED5C8", fontWeight: 500 }}>
                  1. Datenschutz auf einen Blick
                </h2>
                <p className="text-base leading-relaxed">
                  Die Betreiber dieser Seiten nehmen den Schutz deiner persönlichen Daten sehr ernst. Wir behandeln deine personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <h2 className="font-['Cormorant_Garamond'] text-2xl mb-4" style={{ color: "#DED5C8", fontWeight: 500 }}>
                  2. Allgemeine Hinweise
                </h2>
                <p className="text-base leading-relaxed">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen personenbezogenen Daten passiert, wenn du unsere Website besuchst. Personenbezogene Daten sind alle Daten, mit denen du persönlich identifiziert werden kannst.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div>
                <h2 className="font-['Cormorant_Garamond'] text-2xl mb-4" style={{ color: "#DED5C8", fontWeight: 500 }}>
                  3. Datenerfassung auf unserer Website
                </h2>
                <h3 className="font-['Cormorant_Garamond'] text-lg mb-2" style={{ color: "#D9E5AF", fontWeight: 400 }}>
                  Wer ist verantwortlich für die Datenerfassung?
                </h3>
                <p className="text-base leading-relaxed mb-4">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Webseitenbetreiber. Dessen Kontaktdaten kannst du im Impressum dieser Website entnehmen.
                </p>
                <h3 className="font-['Cormorant_Garamond'] text-lg mb-2" style={{ color: "#D9E5AF", fontWeight: 400 }}>
                  Wie erfassen wir deine Daten?
                </h3>
                <p className="text-base leading-relaxed">
                  Deine Daten werden zum einen dadurch erhoben, dass du sie uns mitteilst. Hierbei kann es sich z.B. um Daten handeln, die du in ein Kontaktformular eingibst. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst, insbesondere technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenzugriffs).
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div>
                <h2 className="font-['Cormorant_Garamond'] text-2xl mb-4" style={{ color: "#DED5C8", fontWeight: 500 }}>
                  4. Wofür nutzen wir deine Daten?
                </h2>
                <p className="text-base leading-relaxed">
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse deines Nutzerverhaltens verwendet werden.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div>
                <h2 className="font-['Cormorant_Garamond'] text-2xl mb-4" style={{ color: "#DED5C8", fontWeight: 500 }}>
                  5. Welche Rechte hast du bezüglich deiner Daten?
                </h2>
                <p className="text-base leading-relaxed">
                  Du hast jederzeit das Recht auf unentgeltliche Auskunft über deine gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz kannst du dich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div>
                <h2 className="font-['Cormorant_Garamond'] text-2xl mb-4" style={{ color: "#DED5C8", fontWeight: 500 }}>
                  6. Kontakt
                </h2>
                <p className="text-base leading-relaxed">
                  Für Fragen zur Datenschutzerklärung oder zum Datenschutz allgemein, kontaktiere uns bitte unter den Angaben im Impressum.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
