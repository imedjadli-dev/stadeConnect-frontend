import React, { useState, useEffect } from "react";
import { useTranslation } from "../context/TranslationContext";
import { Menu, X, Globe, Calendar, Check, ShieldCheck, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onEnterAdmin, onEnterOwner }: { onEnterAdmin: () => void; onEnterOwner: () => void }) {
  const { language, setLanguage, t, isRtl } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const navigate = useNavigate();

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["features", "how_it_works", "pulse", "stadiums_section", "owners", "pricing"];

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Scroll handler to section
  const handleScroll = (id: string) => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "ar" : "fr");
  };

  // Class helpers
  const navLinkClass = (id: string) =>
    activeSection === id
      ? "text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-150 flex items-center gap-1.5 hover:bg-green-100 transition-colors cursor-pointer"
      : "text-sm font-medium text-slate-600 hover:text-green-600 transition-colors cursor-pointer";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-surface border-b border-slate-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo Brand / Identity */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-green-600/20">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-slate-900">
              Stade<span className="text-green-600">Connect</span>
            </span>
          </div>

          {/* Desktop Navigation Link-List */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { id: "features", label: t("navbar.features"), scroll: true },
              { id: "how_it_works", label: t("navbar.how_it_works"), scroll: true },
              { id: "pulse", label: t("navbar.pulse"), scroll: true },
              { id: "stadiums_section", label: language === "fr" ? "Nos Terrains" : "استكشاف الملاعب", scroll: false },
              { id: "owners", label: t("navbar.owners"), scroll: true },
              { id: "pricing", label: t("navbar.pricing"), scroll: true },
            ].map(({ id, label, scroll }) => (
              <button
                key={id}
                onClick={() =>
                  scroll
                    ? handleScroll(id)
                    : (navigate("/terrains"), window.scrollTo({ top: 0, behavior: "smooth" }))
                }
                className={navLinkClass(id)}
              >
                {activeSection === id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                )}
                {label}
              </button>
            ))}
          </div>

          {/* Settings & Language Selectors */}
          <div className="hidden md:flex items-center gap-4">
            {/* Main Premium reservation CTA */}
            <button
              onClick={() => handleScroll("cta_section")}
              className="relative px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-bold shadow-md shadow-green-600/20 active:scale-95 duration-150 cursor-pointer flex items-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>{t("navbar.cta_button")}</span>
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 flex items-center gap-1"
            >
              <Globe className="w-4 h-4 text-slate-500" />
              <span className="text-[11px] uppercase font-bold">{language === "fr" ? "ar" : "fr"}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-green-600 transition-colors rounded-lg bg-slate-50"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden glass-surface border-b border-slate-200 absolute left-0 right-0 py-6 px-4 flex flex-col gap-4 shadow-xl z-40 animate-fadeIn animate-duration-200">
          {[
            { id: "features", label: t("navbar.features") },
            { id: "how_it_works", label: t("navbar.how_it_works") },
            { id: "pulse", label: t("navbar.pulse") },
            { id: "stadiums_section", label: language === "fr" ? "Nos Terrains" : "استكشاف الملاعب" },
            { id: "owners", label: t("navbar.owners") },
            { id: "pricing", label: t("navbar.pricing") },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleScroll(id)}
              className={`py-2 border-b border-slate-100 font-medium flex items-center gap-2 ${
                activeSection === id ? "text-green-700" : "text-slate-800"
              }`}
              style={{ textAlign: isRtl ? "right" : "left" }}
            >
              {id === "pulse" && (
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              )}
              {activeSection === id && id !== "pulse" && (
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
              )}
              {label}
            </button>
          ))}

          {/* Mobile Owner Trigger */}
          <button
            onClick={() => {
              setIsOpen(false);
              onEnterOwner();
            }}
            className="w-full mb-2 py-3 bg-green-950 text-green-400 font-bold text-xs rounded-xl border border-green-500/20 hover:bg-green-900 cursor-pointer flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4 text-green-500 animate-pulse" />
            <span>{language === "fr" ? "Console Propriétaire" : "بوابة المالك"}</span>
          </button>

          {/* Mobile Admin Trigger */}
          <button
            onClick={() => {
              setIsOpen(false);
              onEnterAdmin();
            }}
            className="w-full py-3 bg-slate-900 text-amber-400 font-bold text-xs rounded-xl border border-amber-500/20 hover:bg-slate-850 cursor-pointer flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>{language === "fr" ? "Console Super Admin" : "لوحة تحكم المدير العام"}</span>
          </button>

          <button
            onClick={() => handleScroll("cta_section")}
            className="w-full mt-2 py-3 bg-green-600 text-white rounded-full font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
          >
            <Calendar className="w-4 h-4" />
            <span>{t("navbar.cta_button")}</span>
          </button>
        </div>
      )}
    </nav>
  );
}