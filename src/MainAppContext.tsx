import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import SmartMatchPulse from "./components/SmartMatchPulse";
import OwnerDashboard from "./components/OwnerDashboard";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import SuperAdminDashboard from "./components/SuperAdminDashboard";
import StadiumOwnerDashboard from "./components/StadiumOwnerDashboard";

export default function MainAppContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const [isAdminView, setIsAdminView] = useState(false);
  const [isOwnerView, setIsOwnerView] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        containerRef.current.style.setProperty("--x", `${x}px`);
        containerRef.current.style.setProperty("--y", `${y}px`);
      }
    };

    const container = containerRef.current;

    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
  if (location.hash) {
    const id = location.hash.replace("#", "");
    // Small delay so the page renders first
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const offsetPosition = elementRect - bodyRect - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 100);
  }
}, [location.hash]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    const elements = document.querySelectorAll(
      ".scroll-reveal, .scroll-reveal-container"
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  if (isOwnerView) {
    return (
      <StadiumOwnerDashboard
        onClose={() => setIsOwnerView(false)}
      />
    );
  }

  if (isAdminView) {
    return (
      <SuperAdminDashboard
        onClose={() => setIsAdminView(false)}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
    >
      <Navbar
        onEnterAdmin={() => setIsAdminView(true)}
        onEnterOwner={() => setIsOwnerView(true)}
      />

      <Hero />
      <Features />
      <HowItWorks />
      <SmartMatchPulse />
      <OwnerDashboard />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}