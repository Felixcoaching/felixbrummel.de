/*
  Linktree Page
  Design Philosophy: "Dark Forest Ritual" – Minimal, focused, Instagram-friendly
  - Centered layout with stacked link buttons
  - Soft hover effects and smooth transitions
  - Mobile-optimized for Instagram Bio links
*/

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Reusable fade-in animation wrapper
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Linktree() {
  const links = [
    {
      label: "Kostenloses Erstgespräch",
      href: "https://tidycal.com/breathworkmitfelix/kostenloses-erstgesprach",
      target: "_blank",
      description: "Dein erster Schritt",
    },
    {
      label: "Self-Leadership Coaching",
      href: "/",
      description: "Entdecke dein volles Potenzial",
    },
    {
      label: "1:1 Breathwork Journey",
      href: "/breathwork-1zu1",
      description: "Lerne mich kennen",
    },
    {
      label: "Workshops",
      href: "https://tidycal.com/breathworkmitfelix",
      target: "_blank",
      description: "Entdecke meine Workshops",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/felixbrummel",
      target: "_blank",
      description: "Folge mir",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      style={{ background: "#162024" }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <h1
              className="font-['Cormorant_Garamond'] mb-3"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#F8F8F8", fontWeight: 300 }}
            >
              Felix Brummel
            </h1>
            <p
              className="text-sm tracking-widest uppercase"
              style={{ color: "#D9E5AF", fontFamily: "DM Sans, sans-serif", letterSpacing: "0.15em" }}
            >
              Self-Leadership & Breathwork
            </p>
            <div
              className="w-12 h-px mx-auto mt-6"
              style={{ background: "linear-gradient(to right, transparent, #D9E5AF, transparent)" }}
            />
          </div>
        </FadeIn>

        {/* Links */}
        <div className="space-y-4">
          {links.map((link, index) => (
            <FadeIn key={index} delay={0.1 * (index + 1)}>
              <a
                href={link.href}
                target={link.target}
                rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                className="block group"
              >
                <div
                  className="p-5 rounded-lg transition-all duration-300 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, rgba(45,77,68,0.1) 0%, rgba(45,77,68,0.05) 100%)",
                    border: "1px solid rgba(217,229,175,0.15)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "linear-gradient(135deg, rgba(45,77,68,0.2) 0%, rgba(45,77,68,0.12) 100%)";
                    el.style.borderColor = "rgba(217,229,175,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "linear-gradient(135deg, rgba(45,77,68,0.1) 0%, rgba(45,77,68,0.05) 100%)";
                    el.style.borderColor = "rgba(217,229,175,0.15)";
                  }}
                >
                  <h3
                    className="text-base font-medium transition-colors duration-300"
                    style={{ color: "#F8F8F8", fontFamily: "DM Sans, sans-serif" }}
                  >
                    {link.label}
                  </h3>
                  <p
                    className="text-xs mt-2 transition-colors duration-300"
                    style={{ color: "rgba(217,229,175,0.6)", fontFamily: "DM Sans, sans-serif" }}
                  >
                    {link.description}
                  </p>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        {/* Footer */}
        <FadeIn delay={0.5}>
          <div className="mt-16 text-center">
            <p
              className="text-xs"
              style={{ color: "rgba(222,213,200,0.35)", fontFamily: "DM Sans, sans-serif" }}
            >
              © 2025 Felix Brummel
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
