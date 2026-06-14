import React from "react";
import { useTranslation } from "../context/TranslationContext";
import { Zap, CalendarRange, Dribbble, BarChart3, BellRing, ShieldCheck } from "lucide-react";

export default function Features() {
  const { t } = useTranslation();

  const featuresList = [
    {
      key: "feat1",
      icon: <Zap className="w-6 h-6 text-green-600" />,
      gradient: "from-green-500/20 to-emerald-400/5",
      border: "hover:border-green-300"
    },
    {
      key: "feat2",
      icon: <CalendarRange className="w-6 h-6 text-blue-600" />,
      gradient: "from-blue-500/20 to-indigo-400/5",
      border: "hover:border-blue-300"
    },
    {
      key: "feat3",
      icon: <Dribbble className="w-6 h-6 text-emerald-600" />,
      gradient: "from-emerald-500/20 to-teal-400/5",
      border: "hover:border-emerald-300"
    },
    {
      key: "feat4",
      icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
      gradient: "from-purple-500/20 to-fuchsia-400/5",
      border: "hover:border-purple-300"
    },
    {
      key: "feat5",
      icon: <BellRing className="w-6 h-6 text-amber-600" />,
      gradient: "from-amber-500/20 to-yellow-400/5",
      border: "hover:border-amber-300"
    },
    {
      key: "feat6",
      icon: <ShieldCheck className="w-6 h-6 text-rose-600" />,
      gradient: "from-rose-500/20 to-pink-400/5",
      border: "hover:border-rose-300"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-slate-50/70 border-y border-slate-200 scroll-reveal" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            {t("features.tag")}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mt-4 mb-6 leading-tight">
            {t("features.title")}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-reveal-container">
          {featuresList.map((feature, idx) => (
            <div
              key={idx}
              className={`group relative bg-white border border-slate-200 rounded-3xl p-8 shadow-premium-soft transition-all duration-300 hover:shadow-premium-elevated hover:-translate-y-1 scroll-reveal-item ${feature.border}`}
            >
              {/* Radial gradient backing accent */}
              <div className={`absolute top-0 left-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} rounded-tl-3xl opacity-30 group-hover:opacity-75 blur-2xl transition-opacity duration-300 pointer-events-none`} />

              {/* Icon layout block */}
              <div className="relative w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300">
                {feature.icon}
              </div>

              {/* Card headers & texts */}
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-green-600 transition-colors mb-3">
                {t(`features.${feature.key}_title`)}
              </h3>
              
              <p className="text-sm text-slate-500 leading-relaxed font-normal">
                {t(`features.${feature.key}_desc`)}
              </p>

              {/* Decorative Arrow indicator at the corner of each card */}
              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-green-600 transition-colors">
                <span>{t("common.learn_more")}</span>
                <svg className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1 duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
