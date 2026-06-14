import React, { useState, useEffect } from "react";
import { useTranslation } from "../context/TranslationContext";
import { Calendar, Shield, Users, MapPin, Award, CheckCircle2, ChevronRight, Play, Star } from "lucide-react";
import headImage from "../assets/images/stadeconnect_hero_mockup_1781369850861.jpg";
// Helper for counting animation simulation
function CountingStat({ end, suffix = "", delay = 0 }: { end: number; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16); // ~60fps
    
    const timer = setTimeout(() => {
      const handle = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(handle);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(handle);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, delay]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const { t, isRtl } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  // Smooth scroll helpers
  const handleScrollToCta = () => {
    const element = document.getElementById("cta_section");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleScrollToStadiums = () => {
    const element = document.getElementById("stadiums_section");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 bg-slate-50 overflow-hidden/clip" id="hero">
      {/* Background radial gradient glow (Soft Apple style) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-green-100/30 to-transparent rounded-full blur-[120px] pointer-events-none" />
      
      {/* Absolute decorative orbiting circles */}
      <div className="absolute top-20 right-[5%] w-64 h-64 border border-green-150/40 rounded-full pointer-events-none animate-float-slow hidden md:block"></div>
      <div className="absolute top-64 left-[3%] w-96 h-96 border border-slate-200 rounded-full pointer-events-none animate-float hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Lft Column - Copywriting & Action */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Top Badge Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-semibold uppercase tracking-wider mb-6 animate-fadeIn">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              {t("hero.badge")}
            </div>

            {/* Massive Heading */}
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-slate-900 leading-[1.1] mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent block">
                {t("hero.headline_main")}
              </span>
              <span className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 bg-clip-text text-transparent block mt-1">
                {t("hero.headline_sub")}
              </span>
            </h1>

            {/* Premium Subheadline description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-normal">
              {t("hero.subheadline")}
            </p>

            {/* CTAs section */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={handleScrollToStadiums}
                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold tracking-wide shadow-lg shadow-green-600/20 hover:shadow-green-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>{t("hero.cta_primary")}</span>
                <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isRtl ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"}`} />
              </button>
              
              <button
                onClick={handleScrollToCta}
                className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-full font-bold tracking-wide shadow-sm hover:border-slate-300 transition-all text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t("hero.cta_secondary")}</span>
              </button>
            </div>

            {/* Social Proof rating with dynamic stars */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-t border-slate-100 pt-8 w-full">
              <div className="flex -space-x-3">
                {[
                  "https://picsum.photos/seed/k/100/100",
                  "https://picsum.photos/seed/b/100/100",
                  "https://picsum.photos/seed/m/100/100",
                  "https://picsum.photos/seed/a/100/100",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Avatar ${i}`}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm bg-slate-100"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="flex flex-col text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-0.5 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                  <span className="text-xs font-bold text-slate-800 ml-1.5 mr-1.5 font-mono">4.9 / 5</span>
                </div>
                <span className="text-xs font-medium text-slate-500">
                  {t("hero.social_proof")}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column - Scenic 3D Product Mockup Composition */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* The primary stadium/app image inside an Apple/Stripe-styled container frame */}
            <div 
              className="relative w-full max-w-[560px] aspect-[16/10] rounded-2xl bg-white border border-slate-200 p-2.5 shadow-2xl shadow-green-950/5 transition-transform duration-500 hover:scale-[1.01]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Dynamic glass gloss overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-white/20 pointer-events-none z-10"></div>
              
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner bg-slate-50">
                <img
                  src={headImage}
                  alt="StadeConnect 3D Stadium & App Mockup"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Element 1 - Reservation Card (Glassmorphism) */}
              <div className="absolute top-[8%] -right-[6%] md:-right-[8%] glass-surface px-4 py-3 rounded-2xl shadow-premium-elevated border border-white/60 flex items-center gap-3 animate-float pointer-events-none max-w-[200px] z-20">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Arena 5 - Paris</h4>
                  <p className="text-[10px] text-green-600 font-bold">20:00 - {t("common.book")}</p>
                </div>
              </div>

              {/* Floating Element 2 - Interactive Playing Calendar Card */}
              <div className="absolute -bottom-[12%] -left-[4%] md:-left-[6%] glass-surface px-4 py-3.5 rounded-2xl shadow-premium-elevated border border-white/60 flex items-center gap-3.5 animate-float-slow pointer-events-none max-w-[220px] z-20">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{isRtl ? "تأكيد الموعد" : "Créneau Réservé"}</h4>
                  <p className="text-[10px] text-slate-500 font-mono">13 Juin, 2026 - 18:00</p>
                </div>
              </div>

              {/* Floating Element 3 - Location Pin Widget */}
              <div className="absolute -bottom-[6%] right-[8%] glass-surface p-2.5 rounded-xl shadow-premium-soft border border-white/60 flex items-center gap-2 animate-float pointer-events-none z-20">
                <div className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center text-white">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-slate-800">Cité Foot Arena</span>
              </div>

              {/* Floating Element 4 - Mini Trophy rating block */}
              <div className="absolute -top-[10%] left-[15%] glass-surface px-3 py-2 rounded-xl shadow-premium-soft border border-white/60 flex items-center gap-2.5 animate-float-fast pointer-events-none z-20">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="text-[10px] font-bold text-slate-800 tracking-wide uppercase">No. 1 Booking SaaS</span>
              </div>
            </div>

          </div>

        </div>

        {/* Live numerical statistics row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-slate-200 bg-white rounded-3xl p-8 mt-24 shadow-sm">
          <div className="text-center md:border-r md:last:border-r-0 border-slate-100">
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mb-1 font-mono tracking-tight">
              <span className="text-green-600">+</span>
              <CountingStat end={10000} suffix="" delay={100} />
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
              {t("hero.stats_reservations")}
            </p>
          </div>
          <div className="text-center md:border-r md:last:border-r-0 border-slate-100">
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mb-1 font-mono tracking-tight">
              <span className="text-green-600">+</span>
              <CountingStat end={500} suffix="" delay={200} />
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
              {t("hero.stats_stadiums")}
            </p>
          </div>
          <div className="text-center md:border-r md:last:border-r-0 border-slate-100">
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mb-1 font-mono tracking-tight">
              <CountingStat end={98} suffix="%" delay={300} />
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
              {t("hero.stats_satisfaction")}
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mb-1 font-mono tracking-tight">
              <span className="text-green-600">+</span>
              <CountingStat end={50} suffix="" delay={400} />
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
              {t("hero.stats_partners")}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
