import React, { useState } from "react";
import { useTranslation } from "../context/TranslationContext";
import { Send, CheckCircle, Sparkles } from "lucide-react";

export default function CTA() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 5000);
    }
  };

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden scroll-reveal" id="cta_section">
      
      {/* Immersive centered capsule design */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative bg-neutral-900 text-white rounded-[3rem] p-8 md:p-16 lg:p-24 overflow-hidden border border-white/10 shadow-glow shadow-green-950/10">
          
          {/* Radial grid and particle glows */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/25 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold uppercase tracking-wider mb-8 animate-float">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span>STADECONNECT 2.0</span>
            </div>

            {/* Title */}
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-6 leading-tight">
              {t("cta_section.title")}
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t("cta_section.subtitle")}
            </p>

            {/* Registration Input Form */}
            {isSubmitted ? (
              <div className="glass-surface-dark max-w-md mx-auto p-6 rounded-2xl border border-green-500/30 text-center animate-fadeIn">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h4 className="text-base font-bold text-white mb-1">
                  {t("common.brand")} - Success!
                </h4>
                <p className="text-xs text-neutral-300">
                  Welcome to StadeConnect. Check your email to schedule your onboarding walkthrough.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto relative mb-4">
                <div className="flex flex-col sm:flex-row gap-2.5 p-2 bg-slate-950/80 border border-white/10 rounded-full shadow-lg">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("cta_section.placeholder")}
                    className="flex-1 bg-transparent px-5 py-3 placeholder-neutral-500 focus:outline-none text-sm text-neutral-100 rounded-full"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-full flex items-center justify-center gap-2 transition-all shadow-md shadow-green-600/10 active:scale-95 cursor-pointer"
                  >
                    <span>{t("cta_section.button")}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            <p className="text-xs text-neutral-400 mt-4 leading-relaxed">
              {t("cta_section.badge_sub")}
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
