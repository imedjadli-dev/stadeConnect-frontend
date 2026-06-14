import React from "react";
import { useTranslation } from "../context/TranslationContext";
import { Check, Dot, Sparkles, Building2, Store, Landmark } from "lucide-react";

export default function Pricing() {
  const { t, isRtl } = useTranslation();

  const plans = [
    {
      key: "starter",
      price: "49",
      icon: <Store className="w-5 h-5 text-slate-600" />,
      features: ["starter_feature1", "starter_feature2", "starter_feature3", "starter_feature4"],
      popular: false,
      border: "border-slate-200",
      buttonStyle: "bg-slate-900 text-white hover:bg-slate-800"
    },
    {
      key: "pro",
      price: "129",
      icon: <Sparkles className="w-5 h-5 text-green-600 animate-spin-slow" />,
      features: ["starter_feature2", "pro_feature1", "pro_feature2", "pro_feature3", "pro_feature4", "pro_feature5"],
      popular: true,
      border: "border-green-500 shadow-glow shadow-green-500ScaleRing",
      buttonStyle: "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20"
    },
    {
      key: "enterprise",
      price: "299",
      icon: <Landmark className="w-5 h-5 text-slate-600" />,
      features: ["enterprise_feature1", "enterprise_feature2", "enterprise_feature3", "enterprise_feature4", "enterprise_feature5"],
      popular: false,
      border: "border-slate-200",
      buttonStyle: "bg-slate-900 text-white hover:bg-slate-800"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-slate-50/50 border-y border-slate-200 scroll-reveal" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            {t("pricing.tag")}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mt-4 mb-6 leading-tight">
            {t("pricing.title")}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            {t("pricing.subtitle")}
          </p>
        </div>

        {/* Pricing Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-stretch scroll-reveal-container">
          {plans.map((p) => (
            <div
              key={p.key}
              className={`relative bg-white border rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-premium-elevated hover:-translate-y-1 scroll-reveal-item ${p.border}`}
            >
              
              {/* Highlight Badge */}
              {p.popular && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  {t("common.popular")}
                </div>
              )}

              {/* Card Header information */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {p.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 tracking-widest uppercase">STAD_PRO</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {t(`pricing.${p.key}_name`)}
                </h3>
                
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  {t(`pricing.${p.key}_desc`)}
                </p>

                {/* Pricing Number indicator */}
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 font-mono">
                    {p.price}
                  </span>
                  <span className="text-sm font-semibold text-slate-400 ml-1 mr-1">
                    {t("common.currency")}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 ml-1.5 mr-1.5 font-mono">
                    {t("common.per_month")}
                  </span>
                </div>

                <hr className="border-slate-100 mb-8" />

                {/* Features Checklist */}
                <ul className="space-y-4 mb-8">
                  {p.features.map((featKey, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-slate-600 font-normal">
                      <div className="w-5 h-5 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span>{t(`pricing.${featKey}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Action trigger button */}
              <button className={`w-full py-4 px-6 rounded-full font-bold tracking-wide transition-all active:scale-[0.98] cursor-pointer text-center text-sm ${p.buttonStyle}`}>
                {t("common.get_started")}
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
