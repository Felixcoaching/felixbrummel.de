/*
  FuerDich Page (Lead Magnet, erreichbar unter /fuerdich)
  Design Philosophy: "Dark Forest Ritual" – schlicht, ruhig, ein Ziel: das Formular.
  - Eine Spalte, viel Weißraum
  - Gleiche Farben, Schriften und Formularstile wie Home.tsx
  - Ablauf: Formular -> Bestätigungs-E-Mail (Double-Opt-in) -> Link auf diese Seite -> PDF-Download
*/

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";

// ---------------------------------------------------------------------------
// EINSTELLUNGEN
// ---------------------------------------------------------------------------

// URL der Google-Apps-Script-Web-App (siehe Anleitung, Schritt "Bereitstellen")
const API_URL = https://script.google.com/macros/s/AKfycbxvZHaEw_cN5cLIggGENZTQ4_rYMxTJZJV7pJUew3nIQjZ05vhdx-TrprNfNxSbOHS7/exec;

// Version des Einwilligungstexts. Bei JEDER Änderung der Texte unten hochzählen.
// Sie wird mit jeder Anmeldung im Sheet gespeichert und dient als Nachweis.
const CONSENT_VERSION = "2026-10-28-v1";

// false = Newsletter-Haken ist freiwillig (rechtlich der sicherere Weg)
const NEWSLETTER_PFLICHT = false;

// ---------------------------------------------------------------------------

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const labelStyle: React.CSSProperties = {
  color: "rgba(217,229,175,0.6)",
  fontFamily: "DM Sans, sans-serif",
};

const inputStyle: React.CSSProperties = {
  background: "rgba(45,77,68,0.12)",
  border: "1px solid rgba(45,77,68,0.4)",
  color: "#DED5C8",
  fontFamily: "DM Sans, sans-serif",
};

const onFocusInput = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = "rgba(217,229,175,0.5)";
  e.currentTarget.style.background = "rgba(45,77,68,0.2)";
};
const onBlurInput = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = "rgba(45,77,68,0.4)";
  e.currentTarget.style.background = "rgba(45,77,68,0.12)";
};

type Phase = "form" | "sending" | "mailSent" | "confirming" | "confirmed" | "error" | "tokenInvalid";

export default function FuerDich() {
  const [phase, setPhase] = useState<Phase>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [consentNewsletter, setConsentNewsletter] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  // Seite aus Suchmaschinen heraushalten und Titel setzen
  useEffect(() => {
    document.title = "Drei Atemübungen für stressige Arbeitstage | Felix Brummel";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  // Kommt jemand über den Link aus der Bestätigungs-E-Mail (?token=...)?
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) return;

    setPhase("confirming");
    fetch(`${API_URL}?action=confirm&token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.ok && data.downloadUrl) {
          setDownloadUrl(data.downloadUrl);
          setPhase("confirmed");
        } else {
          setPhase("tokenInvalid");
        }
      })
      .catch(() => setPhase("error"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: Bots füllen das versteckte Feld aus. Wir tun so, als wäre alles gut.
    if (honeypot) {
      setPhase("mailSent");
      return;
    }

    setPhase("sending");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        // text/plain vermeidet eine CORS-Vorabprüfung bei Google Apps Script
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          consentPrivacy,
          consentNewsletter,
          consentVersion: CONSENT_VERSION,
        }),
      });
      const data = await res.json();
      if (!data || !data.ok) throw new Error("Anmeldung fehlgeschlagen");
      setPhase("mailSent");
    } catch {
      setPhase("error");
    }
  };

  const ctaButtonStyle: React.CSSProperties = {
    background: "rgba(217,229,175,0.12)",
    border: "1px solid rgba(217,229,175,0.5)",
    color: "#D9E5AF",
    fontFamily: "DM Sans, sans-serif",
  };
  const ctaHoverOn = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = "rgba(217,229,175,0.2)";
    e.currentTarget.style.borderColor = "#D9E5AF";
    e.currentTarget.style.boxShadow = "0 0 30px rgba(217,229,175,0.12)";
  };
  const ctaHoverOff = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = "rgba(217,229,175,0.12)";
    e.currentTarget.style.borderColor = "rgba(217,229,175,0.5)";
    e.currentTarget.style.boxShadow = "none";
  };

  const messageBox = (title: string, text: string, extra?: React.ReactNode) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 px-6"
      style={{ border: "1px solid rgba(217,229,175,0.3)", background: "rgba(45,77,68,0.12)" }}
      role="status"
    >
      <p className="font-['Cormorant_Garamond'] text-2xl mb-3" style={{ color: "#D9E5AF" }}>
        {title}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(222,213,200,0.65)", fontFamily: "DM Sans, sans-serif" }}>
        {text}
      </p>
      {extra}
    </motion.div>
  );

  const crossLinks = [
    { href: "/", label: "Self-Leadership Coaching", desc: "Wenn Leisten allein nicht reicht" },
    { href: "/breathwork-1zu1", label: "1:1 Breathwork Journey", desc: "Eine Session, in der dein Atem führt" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#162024" }}>
      {/* Kopfzeile */}
      <header className="container mx-auto px-6 py-6">
        <Link href="/">
          <span
            className="font-['Cormorant_Garamond'] text-xl font-semibold tracking-widest uppercase cursor-pointer"
            style={{ color: "#D9E5AF", letterSpacing: "0.2em" }}
          >
            Felix Brummel
          </span>
        </Link>
      </header>

      <main className="flex-grow relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top center, rgba(45,77,68,0.14) 0%, transparent 65%)" }}
        />
        <div className="relative z-10 container mx-auto px-6 pt-10 pb-24">
          <div className="max-w-xl mx-auto">
            <FadeIn>
              <span className="text-xs tracking-[0.3em] uppercase mb-4 block text-center" style={{ color: "#D9E5AF", fontFamily: "DM Sans, sans-serif" }}>
                Kostenloses PDF
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1
                className="font-['Cormorant_Garamond'] mb-6 leading-tight text-center"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#F8F8F8", fontWeight: 300 }}
              >
                Drei Atemübungen
                <br />
                <em style={{ color: "#D9E5AF" }}>für stressige Arbeitstage</em>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base leading-relaxed mb-12 text-center" style={{ color: "rgba(222,213,200,0.65)", fontFamily: "DM Sans, sans-serif" }}>
                Kurz. Sofort anwendbar. Zwischen zwei Terminen.
                <br />
                Trag dich ein und hol dir das PDF.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              {phase === "confirming" && messageBox("Einen Moment.", "Ich bestätige deine Anmeldung.")}

              {phase === "confirmed" &&
                messageBox(
                  "Bestätigt. Danke dir.",
                  "Dein PDF liegt bereit.",
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-8 px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300"
                    style={ctaButtonStyle}
                    onMouseEnter={ctaHoverOn}
                    onMouseLeave={ctaHoverOff}
                  >
                    PDF herunterladen
                  </a>
                )}

              {phase === "tokenInvalid" &&
                messageBox(
                  "Dieser Link ist nicht mehr gültig.",
                  "Trag dich einfach unten noch einmal ein. Du bekommst eine neue E-Mail."
                )}

              {phase === "mailSent" &&
                messageBox(
                  "Fast geschafft.",
                  "Ich habe dir eine E-Mail geschickt. Klick darin auf den Bestätigungslink, dann bekommst du dein PDF. Nichts angekommen? Schau kurz im Spam-Ordner nach."
                )}

              {(phase === "form" || phase === "sending" || phase === "error" || phase === "tokenInvalid") && (
                <form onSubmit={handleSubmit} className={`space-y-5 ${phase === "tokenInvalid" ? "mt-8" : ""}`}>
                  {phase === "error" && (
                    <p
                      className="text-sm text-center py-3 px-4"
                      style={{ color: "#DED5C8", border: "1px solid rgba(217,229,175,0.3)", fontFamily: "DM Sans, sans-serif" }}
                      role="alert"
                    >
                      Das hat gerade nicht geklappt. Versuch es bitte gleich noch einmal.
                    </p>
                  )}

                  <div>
                    <label htmlFor="gm-name" className="block text-xs tracking-wider uppercase mb-2" style={labelStyle}>
                      Name
                    </label>
                    <input
                      id="gm-name"
                      type="text"
                      required
                      autoComplete="given-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-300"
                      style={inputStyle}
                      onFocus={onFocusInput}
                      onBlur={onBlurInput}
                      placeholder="Dein Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="gm-email" className="block text-xs tracking-wider uppercase mb-2" style={labelStyle}>
                      E-Mail
                    </label>
                    <input
                      id="gm-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-300"
                      style={inputStyle}
                      onFocus={onFocusInput}
                      onBlur={onBlurInput}
                      placeholder="deine@email.de"
                    />
                  </div>

                  {/* Honeypot gegen Bots: für Menschen unsichtbar */}
                  <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
                    <label htmlFor="gm-website">Website</label>
                    <input
                      id="gm-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Einwilligung 1: Pflicht */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={consentPrivacy}
                      onChange={(e) => setConsentPrivacy(e.target.checked)}
                      className="mt-1 shrink-0"
                      style={{ accentColor: "#D9E5AF", width: 16, height: 16 }}
                    />
                    <span className="text-xs leading-relaxed" style={{ color: "rgba(222,213,200,0.6)", fontFamily: "DM Sans, sans-serif" }}>
                      Ich habe die{" "}
                      <Link href="/datenschutz">
                        <span className="underline cursor-pointer" style={{ color: "#D9E5AF" }}>
                          Datenschutzerklärung
                        </span>
                      </Link>{" "}
                      gelesen. Ich bin einverstanden, dass Felix Brummel meinen Namen und meine E-Mail-Adresse speichert, um mir das PDF zuzusenden.
                    </span>
                  </label>

                  {/* Einwilligung 2: Newsletter */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required={NEWSLETTER_PFLICHT}
                      checked={consentNewsletter}
                      onChange={(e) => setConsentNewsletter(e.target.checked)}
                      className="mt-1 shrink-0"
                      style={{ accentColor: "#D9E5AF", width: 16, height: 16 }}
                    />
                    <span className="text-xs leading-relaxed" style={{ color: "rgba(222,213,200,0.6)", fontFamily: "DM Sans, sans-serif" }}>
                      Ich möchte zusätzlich den Newsletter mit Impulsen zu Atmung, Körper und Präsenz erhalten. Ich kann mich jederzeit mit einem Klick abmelden.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={phase === "sending"}
                    className="w-full py-4 text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-60"
                    style={ctaButtonStyle}
                    onMouseEnter={ctaHoverOn}
                    onMouseLeave={ctaHoverOff}
                  >
                    {phase === "sending" ? "Einen Moment …" : "PDF jetzt holen"}
                  </button>

                  <p className="text-xs text-center leading-relaxed" style={{ color: "rgba(222,213,200,0.35)", fontFamily: "DM Sans, sans-serif" }}>
                    Du bekommst eine E-Mail mit einem Bestätigungslink. Erst danach erhältst du das PDF.
                  </p>
                </form>
              )}
            </FadeIn>

            {/* Querverlinkung */}
            <FadeIn delay={0.2}>
              <div className="mt-20">
                <div
                  className="w-12 h-px mx-auto mb-10"
                  style={{ background: "linear-gradient(to right, transparent, #D9E5AF, transparent)" }}
                />
                <p className="text-xs tracking-[0.3em] uppercase mb-6 text-center" style={{ color: "rgba(217,229,175,0.6)", fontFamily: "DM Sans, sans-serif" }}>
                  Mehr von mir
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {crossLinks.map((l) => (
                    <Link key={l.href} href={l.href}>
                      <div
                        className="p-5 rounded-lg transition-all duration-300 cursor-pointer h-full"
                        style={{
                          background: "linear-gradient(135deg, rgba(45,77,68,0.1) 0%, rgba(45,77,68,0.05) 100%)",
                          border: "1px solid rgba(217,229,175,0.15)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "linear-gradient(135deg, rgba(45,77,68,0.2) 0%, rgba(45,77,68,0.12) 100%)";
                          e.currentTarget.style.borderColor = "rgba(217,229,175,0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "linear-gradient(135deg, rgba(45,77,68,0.1) 0%, rgba(45,77,68,0.05) 100%)";
                          e.currentTarget.style.borderColor = "rgba(217,229,175,0.15)";
                        }}
                      >
                        <h3 className="text-base font-medium" style={{ color: "#F8F8F8", fontFamily: "DM Sans, sans-serif" }}>
                          {l.label}
                        </h3>
                        <p className="text-xs mt-2" style={{ color: "rgba(217,229,175,0.6)", fontFamily: "DM Sans, sans-serif" }}>
                          {l.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>

      {/* Fußzeile */}
      <footer className="py-8 border-t" style={{ background: "#0f1a1e", borderColor: "rgba(45,77,68,0.3)" }}>
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            {[
              { href: "/impressum", label: "Impressum" },
              { href: "/datenschutz", label: "Datenschutz" },
            ].map((l) => (
              <Link key={l.href} href={l.href}>
                <span
                  className="text-xs tracking-wider uppercase cursor-pointer transition-colors duration-300"
                  style={{ color: "rgba(222,213,200,0.4)", fontFamily: "DM Sans, sans-serif" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(217,229,175,0.7)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(222,213,200,0.4)")}
                >
                  {l.label}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-xs" style={{ color: "rgba(222,213,200,0.25)", fontFamily: "DM Sans, sans-serif" }}>
            © 2026 Felix Brummel
          </p>
        </div>
      </footer>
    </div>
  );
}
