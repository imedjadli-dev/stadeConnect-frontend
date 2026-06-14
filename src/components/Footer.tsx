import React from "react";
import { useTranslation } from "../context/TranslationContext";
import { Mail, Phone, MapPin, Globe, Twitter, Linkedin, Github, Instagram } from "lucide-react";

export default function Footer() {
  const { language, setLanguage, t, isRtl } = useTranslation();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "ar" : "fr");
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-12 font-sans relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper footer grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 pb-16 border-b border-slate-200">
          
          {/* Col 1 - Brand Identity info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-green-600/10">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-slate-900">
                {t("common.brand")}
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              {t("footer.desc")}
            </p>

            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-200/50 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-200/50 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-200/50 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-200/50 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>

            {/* Language switcher */}
            <div className="pt-2">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-200/40 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>{language === "fr" ? "العربية" : "Français"}</span>
              </button>
            </div>
          </div>

          {/* Col 2 - Product */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">
              {t("footer.col1_title")}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleScroll("features")} className="text-slate-500 hover:text-green-600 cursor-pointer">
                  {t("footer.links.features")}
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll("pricing")} className="text-slate-500 hover:text-green-600 cursor-pointer">
                  {t("footer.links.pricing")}
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll("pulse")} className="text-slate-500 hover:text-green-600 cursor-pointer">
                  {t("footer.links.pulse")}
                </button>
              </li>
              <li>
                <a href="#cta_section" className="text-slate-500 hover:text-green-600">
                  {t("footer.links.mobile_app")}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 - Solutions */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">
              {t("footer.col2_title")}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleScroll("owners")} className="text-slate-500 hover:text-green-600 cursor-pointer">
                  {t("footer.links.stadium_owners")}
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll("owners")} className="text-slate-500 hover:text-green-600 cursor-pointer">
                  {t("footer.links.pro_dashboard")}
                </button>
              </li>
              <li>
                <a href="#owners" className="text-slate-500 hover:text-green-600">
                  {t("footer.links.integrations")}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 - Company */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">
              {t("footer.col3_title")}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#hero" className="text-slate-500 hover:text-green-600">
                  {t("footer.links.about")}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-green-600">
                  {t("footer.links.careers")}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-green-600">
                  {t("footer.links.press")}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5 - Legal / Contact info */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">
              {t("footer.col4_title")}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#" className="text-slate-500 hover:text-green-600">
                  {t("footer.links.privacy")}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-green-600">
                  {t("footer.links.terms")}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-green-600">
                  {t("footer.links.cookies")}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-green-600">
                  {t("footer.links.security")}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower footer copyright block */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-slate-400 text-xs">
          <p>© 2026 StadeConnect. {t("common.all_rights_reserved")}</p>
          <div className="flex gap-4 mt-4 sm:mt-0 font-medium font-mono">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>contact@stadeconnect.io</span>
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>+33 1 82 28 92 10</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
