import React, { useState } from "react";
import { useTranslation } from "../context/TranslationContext";
import { TrendingUp, Calendar, Users, BarChart, CheckCircle, ChevronRight, DollarSign, ShieldAlert } from "lucide-react";

type OwnerTab = "revenue" | "calendar" | "occupancy" | "customers";

export default function OwnerDashboard() {
  const { t, isRtl } = useTranslation();
  const [activeTab, setActiveTab] = useState<OwnerTab>("revenue");

  // Mock revenue chart data points
  const revenueStats = [
    { month: "Jan", revenue: 5200 },
    { month: "Feb", revenue: 6400 },
    { month: "Mar", revenue: 8100 },
    { month: "Apr", revenue: 9800 },
    { month: "May", revenue: 12400 },
    { month: "Jun", revenue: 14200 },
  ];

  // Mock calendar reservations
  const calendarBookings = [
    { time: "17:00", field: "Field A (Vip)", customer: "Zinedine Z.", paid: true },
    { time: "18:30", field: "Field B (Classic)", customer: "Yassine S.", paid: true },
    { time: "20:00", field: "Field A (Vip)", customer: "Karim B.", paid: true },
    { time: "21:30", field: "Field C (Futsal)", customer: "Thomas M.", paid: false },
  ];

  // Mock customers log
  const customersList = [
    { name: "Sami Al-Jaber", bookings: 42, loyalty: "Platinum", spent: "1,260 €" },
    { name: "Hugo Lloris", bookings: 28, loyalty: "Gold", spent: "840 €" },
    { name: "Mohamed S.", bookings: 51, loyalty: "Platinum", spent: "1,530 €" },
    { name: "Kylian M.", bookings: 14, loyalty: "Silver", spent: "420 €" },
  ];

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden scroll-reveal" id="owners">
      {/* Soft orb glow behind container */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-green-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header content Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            {t("owner.tag")}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mt-4 mb-6 leading-tight">
            {t("owner.title")}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            {t("owner.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Benefits bullet list */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick interactive Selector Tabs */}
            <div className="grid grid-cols-2 gap-3 pb-4">
              <button
                onClick={() => setActiveTab("revenue")}
                className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wide border transition-all cursor-pointer text-center flex items-center justify-center gap-2 ${
                  activeTab === "revenue"
                    ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-600/15"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>{t("owner.revenue_analytics")}</span>
              </button>

              <button
                onClick={() => setActiveTab("calendar")}
                className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wide border transition-all cursor-pointer text-center flex items-center justify-center gap-2 ${
                  activeTab === "calendar"
                    ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-600/15"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>{t("owner.booking_calendar")}</span>
              </button>

              <button
                onClick={() => setActiveTab("occupancy")}
                className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wide border transition-all cursor-pointer text-center flex items-center justify-center gap-2 ${
                  activeTab === "occupancy"
                    ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-600/15"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <BarChart className="w-4 h-4" />
                <span>{t("owner.occupancy_rate")}</span>
              </button>

              <button
                onClick={() => setActiveTab("customers")}
                className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wide border transition-all cursor-pointer text-center flex items-center justify-center gap-2 ${
                  activeTab === "customers"
                    ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-600/15"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>{t("owner.customer_management")}</span>
              </button>
            </div>

            {/* Benefit Items */}
            <div className="space-y-6">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex gap-4 p-5 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">
                      {t(`owner.pro_benefits.item${num}_title`)}
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-normal">
                      {t(`owner.pro_benefits.item${num}_desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Owner CTA button */}
            <button className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-full flex items-center justify-center gap-2 transition-all hover:shadow-lg cursor-pointer">
              <span>{t("owner.owner_cta")}</span>
              <ChevronRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
            </button>

          </div>

          {/* Right Column - Scenic Realistic SaaS Dashboard Mockup */}
          <div className="lg:col-span-7">
            
            <div className="w-full bg-slate-950 rounded-3xl p-5 border border-white/10 shadow-2xl overflow-hidden text-slate-100 font-sans">
              
              {/* Dashboard Layout Header bar */}
              <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
                  <span className="text-[11px] font-mono text-slate-500 ml-2">stadeconnect_dashboard_v4.app</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900 border border-white/10 px-3 py-1 rounded-lg text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
                  <span className="text-slate-300 font-bold">STADE_HQ</span>
                </div>
              </div>

              {/* Dynamic Panel Content - dependent on Active Tab state */}
              <div className="min-h-[280px]">
                
                {/* 1. REVENUE PANEL */}
                {activeTab === "revenue" && (
                  <div className="animate-fadeIn">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-xs text-slate-400 font-mono tracking-wider uppercase">{t("owner.revenue_analytics")}</h4>
                        <p className="text-2xl font-extrabold text-white mt-1 font-mono">14,200 {t("common.currency")}</p>
                      </div>
                      <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-lg flex items-center gap-1 font-mono">
                        +24.8%
                      </span>
                    </div>

                    {/* Simple geometric simulated Bar Chart representing Monthly earnings */}
                    <div className="flex items-end justify-between h-40 pt-4 px-2 bg-slate-900/40 rounded-xl border border-white/5">
                      {revenueStats.map((item, i) => (
                        <div key={i} className="flex flex-col items-center flex-1 group">
                          {/* Floating amount label tooltip on hover */}
                          <span className="text-[10px] font-mono font-semibold bg-slate-800 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity absolute -translate-y-8">
                            {item.revenue}
                          </span>
                          <div 
                            style={{ height: `${(item.revenue / 15000) * 100}%` }}
                            className="w-8 xs:w-10 bg-gradient-to-t from-green-600 to-emerald-400 rounded-t-md transition-all duration-500 hover:from-green-500 hover:to-emerald-300 pointer-events-auto"
                          />
                          <span className="text-[10px] text-slate-500 font-mono mt-2">{item.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. BOOKING CALENDAR PANEL */}
                {activeTab === "calendar" && (
                  <div className="animate-fadeIn">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-xs text-slate-400 font-mono tracking-wider uppercase">{t("owner.booking_calendar")}</h4>
                        <p className="text-sm text-slate-300 mt-1">{t("navbar.pulse")} • Today's Matches</p>
                      </div>
                      <span className="text-xs font-bold text-blue-400 font-mono">4 Matchs</span>
                    </div>

                    {/* Table-like entries */}
                    <div className="space-y-3">
                      {calendarBookings.map((b, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-slate-900 border border-white/5 hover:border-white/10 transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono font-bold text-green-400 bg-green-950/40 border border-green-500/20 px-2 py-1 rounded">
                              {b.time}
                            </span>
                            <div>
                              <p className="text-xs font-bold text-white">{b.customer}</p>
                              <p className="text-[10px] text-slate-400">{b.field}</p>
                            </div>
                          </div>
                          
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            b.paid ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-500"
                          }`}>
                            {b.paid ? "PAID" : "PENDING"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. OCCUPANCY RATE PANEL */}
                {activeTab === "occupancy" && (
                  <div className="animate-fadeIn">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-xs text-slate-400 font-mono tracking-wider uppercase">{t("owner.occupancy_rate")}</h4>
                        <p className="text-2xl font-extrabold text-white mt-1 font-mono">84%</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg font-mono">Peak Period</span>
                    </div>

                    {/* Interactive circular/linear gauges */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Sub-Card 1: Field Occupancy breakdown */}
                      <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-3">
                        <div className="flex justify-between text-xs text-slate-400 font-mono">
                          <span>Field A (Premium)</span>
                           <span className="font-bold text-white">92%</span>
                        </div>
                        <div className="relative w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="absolute top-0 left-0 bg-green-500 h-full rounded-full" style={{ width: "92%" }} />
                        </div>

                        <div className="flex justify-between text-xs text-slate-400 font-mono pt-1">
                          <span>Field B (Classic)</span>
                          <span className="font-bold text-white">78%</span>
                        </div>
                        <div className="relative w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="absolute top-0 left-0 bg-green-500 h-full rounded-full" style={{ width: "78%" }} />
                        </div>
                      </div>

                      {/* Sub-Card 2: Operational alert */}
                      <div className="p-4 rounded-xl bg-slate-900 border border-white/5 flex flex-col justify-center items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
                          <DollarSign className="w-5 h-5 animate-pulse" />
                        </div>
                        <h5 className="text-xs font-bold font-display">{isRtl ? "تنبيه الوقت الشاغر" : "Alerte Heure Creuse"}</h5>
                        <p className="text-[10px] text-slate-400 mt-1">{isRtl ? "تخفيض تلقائي مفعل" : "Promotion automatique à 14:00"}</p>
                      </div>

                    </div>
                  </div>
                )}

                {/* 4. CUSTOMERS PANEL */}
                {activeTab === "customers" && (
                  <div className="animate-fadeIn">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xs text-slate-400 font-mono tracking-wider uppercase">{t("owner.customer_management")}</h4>
                        <p className="text-sm text-slate-300 mt-1">Direct Client database</p>
                      </div>
                      <span className="text-xs font-bold text-slate-400 font-mono">142 Members</span>
                    </div>

                    {/* Table element */}
                    <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
                      {customersList.map((customer, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900 border border-white/5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center font-bold text-xs uppercase font-mono text-slate-300">
                              {customer.name[0]}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white">{customer.name}</p>
                              <p className="text-[9px] text-slate-400 font-mono">{customer.bookings} bookings • {customer.loyalty}</p>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-white">{customer.spent}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
