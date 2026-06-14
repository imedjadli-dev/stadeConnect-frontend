import React, { useState } from "react";
import { useTranslation } from "../context/TranslationContext";
import { Search, CalendarDays, CheckSquare, Trophy, Smartphone, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const { t, isRtl } = useTranslation();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      icon: <Search className="w-6 h-6 text-green-600" />,
      color: "from-green-500 to-emerald-400",
      shadow: "shadow-green-500/10",
      svgIllustration: (
        <svg className="w-16 h-16 text-green-500/80" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="10" fill="currentColor" className="animate-pulse" />
          <path d="M70 70 L90 90" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 2,
      icon: <CalendarDays className="w-6 h-6 text-blue-600" />,
      color: "from-blue-500 to-indigo-400",
      shadow: "shadow-blue-500/10",
      svgIllustration: (
        <svg className="w-16 h-16 text-blue-500/80" viewBox="0 0 100 100" fill="none">
          <rect x="25" y="25" width="50" height="50" rx="8" stroke="currentColor" strokeWidth="3" />
          <line x1="25" y1="42" x2="75" y2="42" stroke="currentColor" strokeWidth="3" />
          <circle cx="40" cy="56" r="4" fill="currentColor" />
          <circle cx="60" cy="56" r="4" fill="currentColor" />
          <circle cx="40" cy="66" r="4" fill="currentColor" />
          <circle cx="60" cy="66" r="4" fill="currentColor" className="animate-ping" />
        </svg>
      )
    },
    {
      id: 3,
      icon: <CheckSquare className="w-6 h-6 text-emerald-600" />,
      color: "from-emerald-500 to-teal-400",
      shadow: "shadow-emerald-500/10",
      svgIllustration: (
        <svg className="w-16 h-16 text-emerald-500/80" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" />
          <path d="M35 52 L45 62 L65 40" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 4,
      icon: <Trophy className="w-6 h-6 text-amber-600" />,
      color: "from-amber-500 to-yellow-400",
      shadow: "shadow-amber-500/10",
      svgIllustration: (
        <svg className="w-16 h-16 text-amber-500/80" viewBox="0 0 100 100" fill="none">
          <path d="M30 30 H70 V50 C70 60 60 70 50 70 C40 70 30 60 30 50 Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="3" />
          <path d="M50 70 V85 M40 85 H60" stroke="currentColor" strokeWidth="3" />
          <circle cx="50" cy="45" r="3" fill="currentColor" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden scroll-reveal" id="how_it_works">
      {/* Decorative gradient blur */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-green-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Group */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            {t("how_it_works.tag")}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mt-4 mb-6 leading-tight">
            {t("how_it_works.title")}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            {t("how_it_works.subtitle")}
          </p>
        </div>

        {/* 4-Step Interactive Timeline */}
        <div className="relative">
          
          {/* Horizontal connection line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-green-100 via-emerald-100 to-amber-100 -translate-y-20 -z-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative scroll-reveal-container">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center text-center group cursor-pointer transition-all duration-300 scroll-reveal-item"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  
                  {/* Step Interactive Vector Bubble */}
                  <div className={`w-36 h-36 rounded-[2rem] bg-slate-55 border border-slate-200 flex flex-col justify-center items-center mb-8 relative transition-all duration-500 ${isActive ? "border-green-300 scale-105 bg-white shadow-xl shadow-green-500/5" : "bg-slate-50"} group-hover:-translate-y-1`}>
                    
                    {/* SVG graphic inside */}
                    <div className="transition-transform duration-500 group-hover:scale-110">
                      {step.svgIllustration}
                    </div>

                    {/* Step badge indicator circle */}
                    <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r ${step.color} text-white font-mono text-xs font-bold flex items-center justify-center shadow-md ${step.shadow}`}>
                      {step.id}
                    </div>

                    {/* Inner miniature icon */}
                    <div className="absolute -bottom-2 border border-slate-200 bg-white p-1.5 rounded-lg shadow-sm">
                      {step.icon}
                    </div>
                  </div>

                  {/* Text labels */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-green-600 transition-colors mb-3">
                    {t(`how_it_works.step${step.id}_title`)}
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed font-normal px-2">
                    {t(`how_it_works.step${step.id}_desc`)}
                  </p>

                  {/* Horizontal Arrow indicator between items */}
                  {index < 3 && (
                    <div className={`hidden lg:flex absolute top-12 left-[calc(100%_-_16px)] text-slate-300 transition-colors items-center justify-center ${isActive ? "text-green-500" : ""}`}>
                      <ArrowRight className={`w-6 h-6 transition-transform duration-300 ${isRtl ? "rotate-180" : ""}`} />
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
