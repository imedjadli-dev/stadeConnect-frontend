import React from "react";
import { useTranslation } from "../context/TranslationContext";
import { Star, MessageSquareQuote, Check } from "lucide-react";

export default function Testimonials() {
  const { t } = useTranslation();

  const reviews = [
    {
      key: "user1",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    },
    {
      key: "user2",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
    },
    {
      key: "user3",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden scroll-reveal" id="testimonials">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-green-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            {t("testimonials.tag")}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mt-4 mb-6 leading-tight">
            {t("testimonials.title")}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            {t("testimonials.subtitle")}
          </p>
        </div>

        {/* 3 Grid Rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 scroll-reveal-container">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="relative bg-slate-50/50 border border-slate-200 p-8 rounded-3xl flex flex-col justify-between shadow-premium-soft hover:shadow-premium-elevated hover:bg-white transition-all duration-300 scroll-reveal-item"
            >
              <div>
                {/* Quotation icon */}
                <div className="w-10 h-10 rounded-xl bg-green-50/50 text-green-600 flex items-center justify-center mb-6">
                  <MessageSquareQuote className="w-5 h-5 stroke-[1.8]" />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm font-normal text-slate-705 leading-relaxed italic mb-8">
                  "{t(`testimonials.${rev.key}_comment`)}"
                </p>
              </div>

              {/* User details */}
              <div className="flex items-center gap-3.5 border-t border-slate-100 pt-6">
                <img
                  src={rev.avatar}
                  alt={t(`testimonials.${rev.key}_name`)}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 bg-slate-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                    <span>{t(`testimonials.${rev.key}_name`)}</span>
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[8px] font-bold">
                      ✓
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {t(`testimonials.${rev.key}_role`)}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
