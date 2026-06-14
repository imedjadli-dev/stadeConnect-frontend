import React, { useState, useEffect } from "react";
import { useTranslation } from "../context/TranslationContext";
import { Activity, Flame, Users, Calendar, HelpCircle, Check, Info } from "lucide-react";

interface PulseNode {
  id: number;
  name: string;
  intensity: "HIGH" | "MEDIUM" | "LOW";
  activePlayers: number;
  occupancy: number; // 0-100
  x: number; // percentage
  y: number; // percentage
}

export default function SmartMatchPulse() {
  const { t, isRtl } = useTranslation();
  const [selectedHub, setSelectedHub] = useState<number>(1);
  const [pulseWaveRate, setPulseWaveRate] = useState<boolean>(true);

  // Auto pulsing wave animation switcher
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseWaveRate(prev => !prev);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const sampleStadiumHubs: PulseNode[] = [
    { id: 1, name: "Cité Foot Arena", intensity: "HIGH", activePlayers: 18, occupancy: 95, x: 25, y: 35 },
    { id: 2, name: "Stade de la Rose", intensity: "MEDIUM", activePlayers: 10, occupancy: 70, x: 70, y: 20 },
    { id: 3, name: "الرباط الكروي المجمع", intensity: "HIGH", activePlayers: 22, occupancy: 100, x: 45, y: 65 },
    { id: 4, name: "Arena des Gones", intensity: "LOW", activePlayers: 4, occupancy: 40, x: 80, y: 75 },
    { id: 5, name: "Olympia Soccer Hub", intensity: "HIGH", activePlayers: 16, occupancy: 90, x: 15, y: 80 }
  ];

  const currentHub = sampleStadiumHubs.find(h => h.id === selectedHub) || sampleStadiumHubs[0];

  return (
    <section className="py-24 md:py-32 bg-[#0a0f0a] text-white relative overflow-hidden scroll-reveal" id="pulse">
      {/* Heavy mesh grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Decorative large green glowing background spots */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-xs font-bold uppercase tracking-widest text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full">
            {t("pulse.tag")}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mt-4 mb-6 leading-tight">
            {t("pulse.title")}
          </h2>
          <p className="text-base sm:text-lg text-slate-350">
            {t("pulse.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Dynamic Map/SVG Radar (Pulse Visual Identity) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* The Interactive Pulse Matrix Block */}
            <div className="relative w-full aspect-square md:aspect-[4/3] bg-slate-950/85 rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-4 sm:p-6 backdrop-blur-xl">
              
              {/* Radar Sweeper Animation */}
              <div className="absolute inset-0 bg-[#030603]">
                {/* Simulated football fields wireframe patterns */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 border border-white/5 rounded-full pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 h-2/5 border border-white/5 rounded-full pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-1px bg-white/5 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1px h-4/5 bg-white/5 pointer-events-none" />
              </div>

              {/* Connecting laser lines between fields using absolute high tech styling SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" fill="none">
                {/* Bezier paths representing mesh connecting waves */}
                <path d="M 25,35 Q 45,65 70,20" stroke="#22C55E" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="5,5" className="animate-pulse" />
                <path d="M 45,65 Q 80,75 70,20" stroke="#22C55E" strokeWidth="1.5" strokeOpacity="0.3" />
                <path d="M 25,35 Q 15,80 45,65" stroke="#10B981" strokeWidth="2" strokeOpacity="0.5" strokeDasharray="3,3" />
                <path d="M 15,80 Q 45,65 80,75" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.3" />
                
                {/* Laser nodes tracing connections */}
                <circle cx={`${pulseWaveRate ? "25%" : "70%"}`} cy={`${pulseWaveRate ? "35%" : "20%"}`} r="4" fill="#22C55E">
                  <animateMotion dur="5s" repeatCount="indefinite" path="M 25,35 Q 45,65 70,20" />
                </circle>
                <circle cx={`${pulseWaveRate ? "15%" : "45%"}`} cy={`${pulseWaveRate ? "80%" : "65%"}`} r="4" fill="#10B981">
                  <animateMotion dur="4s" repeatCount="indefinite" path="M 15,80 Q 45,65 80,75" />
                </circle>
              </svg>

              {/* Individual Arena Pulse HUD Nodes */}
              {sampleStadiumHubs.map((hub) => {
                const isSelected = hub.id === selectedHub;
                return (
                  <div
                    key={hub.id}
                    style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/node"
                  >
                    
                    {/* Pulsing visual core button */}
                    <button
                      onClick={() => setSelectedHub(hub.id)}
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isSelected 
                          ? "bg-green-500 shadow-glow shadow-green-500Scale scale-125 border-4 border-black" 
                          : "bg-slate-800 hover:bg-slate-700 border-2 border-white/20"
                      }`}
                    >
                      {/* Active green breathing outer ring */}
                      {isSelected && (
                        <span className="absolute inset-0 rounded-full bg-green-500/60 animate-pulse-ring" />
                      )}
                      
                      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </button>

                    {/* Popover tooltip with name of field */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 glass-surface-dark px-2.5 py-1 rounded-lg text-[10px] font-bold text-white whitespace-nowrap opacity-60 group-hover/node:opacity-100 transition-opacity pointer-events-none shadow-md">
                      {hub.name}
                    </div>

                  </div>
                );
              })}

              {/* Floating Map Indicators Footer */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/5 z-20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[11px] font-mono font-bold text-slate-300">
                    {t("pulse.active_pulse_radar")}
                  </span>
                </div>
                <div className="text-[10px] font-medium text-slate-400">
                  {t("pulse.interactive_indicator")}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column - Smart Match Pulse AI stats card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Tagline */}
            <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white mb-4">
              {currentHub.name}
            </h3>

            {/* Platform Description text */}
            <p className="text-sm sm:text-base text-slate-350 leading-relaxed mb-8">
              {t("pulse.desc")}
            </p>

            {/* Smart stats dashboard blocks */}
            <div className="space-y-4 mb-8">
              
              {/* Stat 1 - Live Map Intensity */}
              <div className="flex justify-between items-center p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs text-slate-450 uppercase font-mono">{t("pulse.match_intensity")}</h5>
                    <p className="text-sm font-bold text-white mt-0.5">{currentHub.intensity}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                  currentHub.intensity === "HIGH" 
                    ? "bg-red-500/10 text-red-400" 
                    : currentHub.intensity === "MEDIUM" 
                      ? "bg-amber-500/10 text-amber-400" 
                      : "bg-green-500/10 text-green-400"
                }`}>
                  {currentHub.intensity === "HIGH" ? "BURNING" : "NORMAL"}
                </span>
              </div>

              {/* Stat 2 - Live Occupancy */}
              <div className="flex justify-between items-center p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs text-slate-455 uppercase font-mono">{t("pulse.field_occupancy")}</h5>
                    <p className="text-sm font-bold text-white mt-0.5">{currentHub.occupancy}%</p>
                  </div>
                </div>
                {/* Miniature gauge */}
                <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${currentHub.occupancy}%` }}
                  />
                </div>
              </div>

              {/* Stat 3 - Popular clock hours */}
              <div className="flex justify-between items-center p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs text-slate-460 uppercase font-mono">{t("pulse.popular_hours")}</h5>
                    <p className="text-sm font-bold text-white mt-0.5">18:00 - 22:00</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold">UTC +2</span>
              </div>

            </div>

            {/* Connections generated micro-tag */}
            <div className="p-4 bg-green-950/20 border border-green-500/20 rounded-2xl flex items-center gap-3 text-sm text-green-400 font-medium">
              <Activity className="w-5 h-5 animate-pulse flex-shrink-0" />
              <span>{t("pulse.connections_generated")}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
