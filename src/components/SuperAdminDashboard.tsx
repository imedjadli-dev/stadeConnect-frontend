import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "../context/TranslationContext";
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  Activity,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ShieldCheck,
  TrendingUp,
  Coins,
  CalendarDays,
  Globe,
  Search,
  Plus,
  Star,
  Trash2,
  UserMinus,
  UserCheck,
  RefreshCw,
  FileText,
  Sliders,
  Eye,
  Check,
  ExternalLink,
  MapPin,
  Ban
} from "lucide-react";

// Localized translation dictionaries inside the component for perfect modular alignment
const dashboardTranslations = {
  fr: {
    super_admin_title: "Super Admin StadeConnect",
    system_status: "Statut Système",
    online: "En Ligne & Sécurisé",
    version: "v4.2.0 (Production)",
    exit_dashboard: "Quitter le Mode Admin",
    search_placeholder: "Rechercher un complexe, un utilisateur, une ville...",
    active_now: "En Direct : 42 joueurs sur le terrain",
    commission_saved: "Commission mise à jour avec succès !",
    complex_added: "Nouveau complexe ajouté avec succès !",
    
    // Tabs
    tab_overview: "Statistiques Globales",
    tab_registrations: "Inscriptions Propriétaires",
    tab_listings: "Complexes Partenaires",
    tab_users: "Annuaire Joueurs",
    tab_settings: "Configuration Plateforme",
    tab_logs: "Journaux d'Audit",

    // Stat cards
    card_volume: "Volume d'Affaire Global",
    card_commission: "Commission StadeConnect (12%)",
    card_venues: "Stades & Complexes",
    card_bookings: "Réservations Validées",
    card_trend: "+14% ce mois",
    card_growth: "+8% d'inscriptions",
    
    // Owner Registrations tab
    owner_reg_title: "Dossiers d'Inscription en attente de vérification",
    owner_reg_sub: "Validez les informations juridiques et techniques avant d'ouvrir les réservations publiques.",
    owner_table_name: "Nom Propriétaire",
    owner_table_stadium: "Nom du Complexe",
    owner_table_location: "Ville & Pays",
    owner_table_type: "Type Pelouse",
    owner_table_status: "Statut",
    owner_table_actions: "Actions",
    btn_approve: "Approuver",
    btn_reject: "Rejeter",
    reg_status_pending: "En attente",
    reg_status_approved: "Approuvé",
    reg_status_rejected: "Refusé",

    // Listings tab
    listings_title: "Complexes Sportifs Référencés",
    listings_sub: "Supervisez et mettez en avant les meilleurs terrains de football de la plateforme.",
    add_complex_btn: "Créer un Nouveau Complexe",
    modal_add_title: "Référencer un Nouveau Complexe de Football",
    modal_field_name: "Nom du complexe",
    modal_field_city: "Ville",
    modal_field_rating: "Note",
    modal_field_pitches: "Nombre de terrains",
    modal_field_price: "Tarif horaire (€)",
    modal_submit: "Enregistrer le Complexe",
    table_complex_name: "Complexe",
    table_pitches: "Terrains",
    table_rate: "Note",
    table_price: "Tarif",
    table_featured: "Mis en Avant",
    featured_active: "VIP Actif",
    featured_inactive: "Standard",

    // Users tab
    users_title: "Annuaire National des Joueurs",
    users_sub: "Gérez la base des fidèles de la communauté, appliquez des sanctions ou offrez des privilèges.",
    table_user: "Joueur",
    table_join_date: "Date d'Urgence",
    table_bookings_count: "Réservations",
    table_spent: "Dépenses",
    table_status: "Statut du Compte",
    status_active: "Actif",
    status_banned: "Suspendu",
    btn_ban: "Bannir",
    btn_activate: "Réactiver",

    // Platform settings
    settings_title: "Paramètres Globaux de la Plateforme (SaaS)",
    settings_sub: "Ajustez les conditions économiques et techniques appliquées sur tout le réseau StadeConnect.",
    set_commission: "Taux de Commission Plateforme (%)",
    set_deposit: "Dépôt de Garantie Standard (€)",
    set_taxes: "Montant des Taxes Locales (%)",
    set_payout_schedule: "Calendrier des Virements Stripe",
    set_daily: "Chaque jour à 04:00",
    set_save_btn: "Appliquer la nouvelle configuration financière",

    // Logs
    logs_title: "Journal d'Audit de Sécurité en Temps Réel",
    logs_sub: "Toutes les actions système sont cryptées et horodatées de manière immuable.",
    log_filter_all: "Tous les types",
    log_file_download: "Exporter les journaux (.CSV)"
  },
  ar: {
    super_admin_title: "لوحة التحكم للمشرف العام",
    system_status: "حالة النظام",
    online: "متصل وآمن",
    version: "v4.2.0 (الإنتاج)",
    exit_dashboard: "الخروج من لوحة الإدارة",
    search_placeholder: "ابحث عن مجمع، لاعب، مدينة...",
    active_now: "مباشر: 42 لاعباً في الملاعب الآن",
    commission_saved: "تم تحديث العمولة بنجاح!",
    complex_added: "تم إضافة المجمع الجديد بنجاح!",

    // Tabs
    tab_overview: "الإحصائيات العامة",
    tab_registrations: "تسجيلات الملاك الجدد",
    tab_listings: "المجمعات الشريكة",
    tab_users: "دليل اللاعبين",
    tab_settings: "إعدادات المنصة",
    tab_logs: "سجلات الرقابة والنظام",

    // Stat cards
    card_volume: "إجمالي المعاملات المالية",
    card_commission: "عمولة منصة استاد كونكت (12%)",
    card_venues: "الملاعب والمجمعات",
    card_bookings: "الحجوزات المؤكدة",
    card_trend: "+14% هذا الشهر",
    card_growth: "+8% تسجيلات جديدة",

    // Owner Registrations tab
    owner_reg_title: "ملفات التسجيل في انتظار المراجعة",
    owner_reg_sub: "صادق على المعلومات القانونية والفنية قبل فتح الملعب للحجز العام.",
    owner_table_name: "اسم المالك",
    owner_table_stadium: "اسم المجمع",
    owner_table_location: "المدينة والدولة",
    owner_table_type: "نوع العشب",
    owner_table_status: "الحالة",
    owner_table_actions: "الإجراءات",
    btn_approve: "قبول",
    btn_reject: "رفض",
    reg_status_pending: "قيد الانتظار",
    reg_status_approved: "مقبول",
    reg_status_rejected: "مرفوض",

    // Listings tab
    listings_title: "المجمعات الرياضية المسجلة",
    listings_sub: "أشرف وميز أفضل ملاعب كرة القدم على المنصة لجذب اللاعبين.",
    add_complex_btn: "إضافة مجمع ملاعب جديد",
    modal_add_title: "تسجيل مجمع ملاعب كرة قدم جديد",
    modal_field_name: "اسم المجمع",
    modal_field_city: "المدينة",
    modal_field_rating: "التقييم",
    modal_field_pitches: "عدد الملاعب",
    modal_field_price: "السعر في الساعة (€)",
    modal_submit: "حفظ المجمع في النظام",
    table_complex_name: "المجمع الرياضي",
    table_pitches: "الملاعب",
    table_rate: "التقييم",
    table_price: "السعر",
    table_featured: "تميز في الواجهة",
    featured_active: "مميز VIP",
    featured_inactive: "عادي",

    // Users tab
    users_title: "دليل اللاعبين الوطني",
    users_sub: "أشرف على مجتمع اللاعبين، افصل المخالفين أو امنح امتيازات خاصة للحسابات.",
    table_user: "اللاعب",
    table_join_date: "تاريخ الانضمام",
    table_bookings_count: "عدد الحجوزات",
    table_spent: "الإنفاق",
    table_status: "حالة الحساب",
    status_active: "نشط",
    status_banned: "محظور",
    btn_ban: "حظر الحساب",
    btn_activate: "إعادة تفعيل",

    // Platform settings
    settings_title: "الإعدادات العامة العالية للمنصة (SaaS)",
    settings_sub: "تحكم بالعمولات والسياسات المالية والصحيحة المطبقة على شبكة استاد كونكت.",
    set_commission: "نسبة عمولة المنصة (%)",
    set_deposit: "مبلغ التأمين الافتراضي (€)",
    set_taxes: "قيمة الضرائب المحلية (%)",
    set_payout_schedule: "جدولة تحويلات Stripe المالية",
    set_daily: "يومياً في الساعة 04:00 صباحاً",
    set_save_btn: "تطبيق وحفظ الإعدادات المالية الجديدة",

    // Logs
    logs_title: "سجل الرقابة والأمان الفوري للنظام",
    logs_sub: "كل عمليات النظام مشفرة ومسجلة زمنياً بشكل محكم وغير قابل للتعديل.",
    log_filter_all: "جميع العمليات",
    log_file_download: "تصدير السجلات بصيغة (.CSV)"
  }
};

interface SuperAdminDashboardProps {
  onClose: () => void;
}

export default function SuperAdminDashboard({ onClose }: SuperAdminDashboardProps) {
  const { language, isRtl } = useTranslation();
  
  // Set current translations dictionary based on active language (French or Arabic)
  const d = useMemo(() => {
    return language === "ar" ? dashboardTranslations.ar : dashboardTranslations.fr;
  }, [language]);

  const [activeTab, setActiveTab ] = useState<"overview" | "registrations" | "listings" | "users" | "settings" | "logs">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  
  // Custom Dynamic Platform States
  const [commissionRate, setCommissionRate] = useState("12.5");
  const [standardDeposit, setStandardDeposit] = useState("30");
  const [localTaxRate, setLocalTaxRate] = useState("20");
  const [notification, setNotification] = useState("");

  // Search filter query
  const queryFilter = (text: string) => {
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  // State 1: Owner Verification Registrations
  const [ownerRegistrations, setOwnerRegistrations] = useState([
    { id: 1, name: "Youssef El Arabi", stadium: "Olympique Sports Arena", city: "Tunis", type: "Gazon Synthétique 3G", date: "2026-06-12", status: "pending" },
    { id: 2, name: "Anis Hadj", stadium: "Camp des Aigles", city: "Lyon", type: "Pelouse Naturelle", date: "2026-06-13", status: "pending" },
    { id: 3, name: "Karim Ziani", stadium: "Stade du Phare", city: "Marseille", type: "Indoor Synthétique", date: "2026-06-11", status: "approved" },
    { id: 4, name: "Sofia Meriem", stadium: "Meriem Multisports", city: "Paris", type: "Hybride Pro", date: "2026-06-10", status: "pending" },
    { id: 5, name: "Fares Chaibi", stadium: "Club Casbah Foot", city: "Alger", type: "Gazon Synthétique 4G", date: "2026-06-09", status: "rejected" }
  ]);

  // State 2: Complexes Partners Listings
  const [complexes, setComplexes] = useState([
    { id: 101, name: "Parc des Princes d'Or", city: "Paris", pitches: 5, rating: 4.9, price: "90", isFeatured: true },
    { id: 102, name: "Marseille Foot Five", city: "Marseille", pitches: 8, rating: 4.7, price: "75", isFeatured: true },
    { id: 103, name: "Carthage Football Club", city: "Tunis", pitches: 4, rating: 4.8, price: "60", isFeatured: false },
    { id: 104, name: "Lyon Arena Cup", city: "Lyon", pitches: 6, rating: 4.5, price: "80", isFeatured: false },
    { id: 105, name: "Alger Dely Ibrahim Five", city: "Alger", pitches: 3, rating: 4.6, price: "50", isFeatured: false }
  ]);

  // State 3: Users/Players List
  const [users, setUsers] = useState([
    { id: 201, name: "Ryad Mahrez", email: "ryad@mahrez.com", joinDate: "2026-01-15", bookings: 32, spent: "2,880 €", isBanned: false },
    { id: 202, name: "Zinédine Zidane", email: "zizou@madrid.io", joinDate: "2026-02-10", bookings: 45, spent: "4,050 €", isBanned: false },
    { id: 203, name: "Mohammed Salah", email: "mo.salah@reds.eg", joinDate: "2026-03-01", bookings: 28, spent: "2,520 €", isBanned: false },
    { id: 204, name: "Nabil Bentaleb", email: "nabil@lille.fr", joinDate: "2026-04-18", bookings: 12, spent: "1,080 €", isBanned: true },
    { id: 205, name: "Yasmin Belkhira", email: "yasmin@soccer.tn", joinDate: "2026-05-02", bookings: 19, spent: "1,710 €", isBanned: false }
  ]);

  // State 4: Modal state for manual complex creation
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newComplexName, setNewComplexName] = useState("");
  const [newComplexCity, setNewComplexCity] = useState("Paris");
  const [newComplexPitches, setNewComplexPitches] = useState("4");
  const [newComplexRating, setNewComplexRating] = useState("4.8");
  const [newComplexPrice, setNewComplexPrice] = useState("70");

  // State 5: System Audit Logs state
  const [auditLogs, setAuditLogs] = useState([
    { id: 1001, timestamp: "21:34:02", category: "Auth", message: "Super Admin [admin@stadeconnect.io] successfully authenticated via SSH/JWT console token." },
    { id: 1002, timestamp: "21:32:15", category: "Billing", message: "Payout batch processed for Marseille Foot Five via Connected Stripe account: 4,120.00 €." },
    { id: 1003, timestamp: "21:30:11", category: "Application", message: "Youssef El Arabi submitted validation dossier for Olympique Sports Arena in Tunis." },
    { id: 1004, timestamp: "21:28:44", category: "System", message: "Backup routine successfully executed. Daily database snapshots preserved on Firebase Cold Storage." },
    { id: 1005, timestamp: "21:15:32", category: "Moderation", message: "User Nabil Bentaleb suspended globally by system sentinel for repetitive no-shows." }
  ]);

  // Trigger a temporary styled banner alert
  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification("");
    }, 4500);
  };

  // 1. Actions: Approve/Reject owner submissions
  const handleRegistrationStatus = (id: number, status: "approved" | "rejected") => {
    setOwnerRegistrations(prev => prev.map(reg => reg.id === id ? { ...reg, status } : reg));
    
    const item = ownerRegistrations.find(r => r.id === id);
    if (item) {
      // Add a dynamic entry to the live Audit Logs
      const logMsg = `Super Admin verified and ${status === "approved" ? "APPROVED" : "REJECTED"} stadium complex reservation request for "${item.stadium}" owned by ${item.name}.`;
      setAuditLogs(prev => [
        { id: Date.now(), timestamp: new Date().toLocaleTimeString(), category: status === "approved" ? "Security" : "Warning", message: logMsg },
        ...prev
      ]);
      triggerNotification(`${item.stadium} : ${status === "approved" ? d.reg_status_approved : d.reg_status_rejected}`);
    }
  };

  // 2. Actions: Toggle featured status of stadium complex
  const toggleFeatured = (id: number) => {
    setComplexes(prev => prev.map(c => c.id === id ? { ...c, isFeatured: !c.isFeatured } : c));
    const comp = complexes.find(c => c.id === id);
    if (comp) {
      const isNowFeatured = !comp.isFeatured;
      const logMsg = `Listing "${comp.name}" in ${comp.city} ${isNowFeatured ? "PROMOTED to VIP Featured list" : "DEMOTED to standard directory list"}.`;
      setAuditLogs(prev => [
        { id: Date.now(), timestamp: new Date().toLocaleTimeString(), category: "Application", message: logMsg },
        ...prev
      ]);
    }
  };

  // 3. Actions: Ban/unban users from platform
  const toggleBanUser = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, isBanned: !u.isBanned } : u));
    const targetUser = users.find(u => u.id === id);
    if (targetUser) {
      const isNowBanned = !targetUser.isBanned;
      const logMsg = `Status change: Global ban for player ${targetUser.name} (${targetUser.email}) set to ${isNowBanned.toString().toUpperCase()}.`;
      setAuditLogs(prev => [
        { id: Date.now(), timestamp: new Date().toLocaleTimeString(), category: "Moderation", message: logMsg },
        ...prev
      ]);
      triggerNotification(`${targetUser.name} : ${isNowBanned ? d.status_banned : d.status_active}`);
    }
  };

  // 4. Actions: Submit and save manual complex creation
  const handleAddComplex = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComplexName.trim()) return;

    const newObj = {
      id: Date.now(),
      name: newComplexName,
      city: newComplexCity,
      pitches: parseInt(newComplexPitches) || 4,
      rating: parseFloat(newComplexRating) || 4.7,
      price: newComplexPrice || "75",
      isFeatured: false
    };

    setComplexes(prev => [newObj, ...prev]);
    
    // Add layout audit trace logs
    const logMsg = `Manual reference: Built complex record "${newComplexName}" inside city registry [${newComplexCity}].`;
    setAuditLogs(prev => [
      { id: Date.now(), timestamp: new Date().toLocaleTimeString(), category: "Database", message: logMsg },
      ...prev
    ]);

    setNewComplexName("");
    setIsAddModalOpen(false);
    triggerNotification(d.complex_added);
  };

  // 5. Actions: Save Platform global constants
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    
    const logMsg = `System configuration rewritten: Global Commission = ${commissionRate}%, Deposit Hold = ${standardDeposit} €, Local VAT = ${localTaxRate}%.`;
    setAuditLogs(prev => [
      { id: Date.now(), timestamp: new Date().toLocaleTimeString(), category: "Settings", message: logMsg },
      ...prev
    ]);

    triggerNotification(d.commission_saved);
  };

  // UTC clock updating logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter complexes on search Query
  const filteredComplexes = complexes.filter(c => queryFilter(c.name) || queryFilter(c.city));
  const filteredUsers = users.filter(u => queryFilter(u.name) || queryFilter(u.email));
  const filteredRegistrations = ownerRegistrations.filter(r => queryFilter(r.name) || queryFilter(r.stadium) || queryFilter(r.city));

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans ${isRtl ? "rtl" : "ltr"}`}>
      
      {/* Dynamic system notification banner alert toast */}
      {notification && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 p-4 rounded-xl flex items-center gap-3 bg-green-600 text-white font-bold text-sm shadow-xl shadow-green-950/40 border border-green-500/20 max-w-md w-[90%] transition-all duration-300 transform scale-100 animate-fadeIn`}>
          <ShieldCheck className="w-5 h-5 flex-shrink-0 animate-bounce" />
          <span>{notification}</span>
        </div>
      )}

      {/* High-Contrast Luxury Super Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            
            {/* Left aligned: Super credentials layout */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center shadow-lg shadow-red-950/30">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg font-black tracking-tight text-white">
                    {d.super_admin_title}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-red-500/15 border border-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                    ROOT
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                  <span>{d.online}</span>
                  <span className="text-slate-600">•</span>
                  <span>{d.version}</span>
                </div>
              </div>
            </div>

            {/* Middle aligned: Clock indicator */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-400">
              <span className="text-slate-600">TIME:</span>
              <span className="font-bold text-white tracking-widest">{currentTime}</span>
            </div>

            {/* Right aligned: Exit button */}
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-350 hover:text-white rounded-full text-xs font-bold transition-all border border-slate-700/80 cursor-pointer flex items-center gap-1.5"
              >
                <span>{d.exit_dashboard}</span>
                <span className="text-lg">↩</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container Wrapper */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Quick Search Hub and Banner HUD */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
          
          {/* Global search entry bar */}
          <div className="lg:col-span-2 relative">
            <div className={`absolute inset-y-0 ${isRtl ? "left-auto right-4" : "left-4 right-auto"} flex items-center pointer-events-none`}>
              <Search className="h-4.5 w-4.5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={d.search_placeholder}
              className={`w-full outline-none bg-slate-900 border border-slate-800 focus:border-green-500 rounded-2xl py-3.5 ${isRtl ? "pr-12 pl-4" : "pl-12 pr-4"} text-sm placeholder-slate-500 text-white transition-all`}
            />
          </div>

          {/* Quick HUD details */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/15 p-3.5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold text-green-400 font-mono">
                {d.active_now}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-900/60 border border-slate-800/85 px-2.5 py-1 rounded-lg font-mono">
              EU-CENTRAL-1
            </span>
          </div>

        </div>

        {/* Dashboard Sections Navigation Tabs (Horizontal Scrollable for clean mobile layouts) */}
        <div className="flex overflow-x-auto gap-2 pb-3 mb-8 border-b border-slate-800 scrollbar-none">
          {[
            { id: "overview", icon: <LayoutDashboard className="w-4 h-4" />, label: d.tab_overview },
            { id: "registrations", icon: <ShieldCheck className="w-4 h-4" />, label: d.tab_registrations, badge: ownerRegistrations.filter(r => r.status === "pending").length },
            { id: "listings", icon: <Building2 className="w-4 h-4" />, label: d.tab_listings },
            { id: "users", icon: <Users className="w-4 h-4" />, label: d.tab_users },
            { id: "settings", icon: <Settings className="w-4 h-4" />, label: d.tab_settings },
            { id: "logs", icon: <Activity className="w-4 h-4" />, label: d.tab_logs }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold whitespace-nowrap border transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-green-600 border-green-600 text-white shadow-lg shadow-green-500/10"
                  : "bg-slate-900 border-slate-800/80 text-slate-400 hover:bg-slate-850 hover:text-white"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {!!tab.badge && (
                <span className="bg-red-500 text-white font-mono text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ml-1">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB CONTENT PANEL 1: OVERVIEW STATISTICS */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Bento Grid Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Stat card: Volume */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-300" />
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-green-500/15 rounded-2xl text-green-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-lg">
                    {d.card_trend}
                  </span>
                </div>
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  {d.card_volume}
                </h4>
                <p className="text-3xl font-extrabold text-white mt-2 font-mono">
                  128,450 {language === "ar" ? "€" : "€"}
                </p>
              </div>

              {/* Stat card: Commission */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-300" />
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-amber-500/15 rounded-2xl text-amber-500">
                    <Coins className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    SaaS Cut
                  </span>
                </div>
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  {d.card_commission}
                </h4>
                <p className="text-3xl font-extrabold text-white mt-2 font-mono">
                  16,056 {language === "ar" ? "€" : "€"}
                </p>
              </div>

              {/* Stat card: Complexes */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-300" />
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-500/15 rounded-2xl text-blue-400">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-lg">
                    {d.card_growth}
                  </span>
                </div>
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  {d.card_venues}
                </h4>
                <p className="text-3xl font-extrabold text-white mt-2 font-mono">
                  {complexes.length} + 12 Pending
                </p>
              </div>

              {/* Stat card: Bookings */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-300" />
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-indigo-500/15 rounded-2xl text-indigo-400">
                    <CalendarDays className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    Conversion: 94%
                  </span>
                </div>
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  {d.card_bookings}
                </h4>
                <p className="text-3xl font-extrabold text-white mt-2 font-mono">
                  1,482 Matchs
                </p>
              </div>

            </div>

            {/* Custom SVG Data Visualization Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Box 1: Platform Revenue Growth Over the week */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {language === "ar" ? "حجم الحجوزات ونمو العوائد اليومية" : "Flux d'affaires et croissance des réservations"}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {language === "ar" ? "عمولة المنصة وشركاء الدفع Stripe" : "Enregistrement sécurisé des flux financiers"}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-green-400 bg-green-950/30 border border-green-500/20 px-2.5 py-1 rounded-lg">
                    Realtime Feed
                  </span>
                </div>

                {/* SVG Analytical Line Graph representing dynamic stats mockup */}
                <div className="relative pt-4 h-64 w-full">
                  <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Grid lines */}
                    <line x1="0" y1="40" x2="500" y2="40" stroke="#1e293b" strokeDasharray="3" />
                    <line x1="0" y1="100" x2="500" y2="100" stroke="#1e293b" strokeDasharray="3" />
                    <line x1="0" y1="160" x2="500" y2="160" stroke="#1e293b" strokeDasharray="3" />
                    
                    {/* Fill Area */}
                    <path
                      d="M 0 170 C 50 140, 100 160, 150 110 C 200 60, 250 130, 300 80 C 350 30, 400 90, 450 50 C 480 30, 500 40, 500 40 L 500 200 L 0 200 Z"
                      fill="url(#chartGlow)"
                    />

                    {/* Smooth Spline Vector Curve Line */}
                    <path
                      d="M 0 170 C 50 140, 100 160, 150 110 C 200 60, 250 130, 300 80 C 350 30, 400 90, 450 50 C 480 30, 500 40, 500 40"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3.5"
                    />

                    {/* Nodes */}
                    <circle cx="150" cy="110" r="5" fill="#34d399" stroke="#090d16" strokeWidth="2" />
                    <circle cx="300" cy="80" r="5" fill="#34d399" stroke="#090d16" strokeWidth="2" />
                    <circle cx="450" cy="50" r="5" fill="#34d399" stroke="#090d16" strokeWidth="2" />
                  </svg>
                  
                  {/* Axis indicators */}
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-4">
                    <span>{language === "ar" ? "الإثنين" : "Lun"}</span>
                    <span>{language === "ar" ? "الثلاثاء" : "Mar"}</span>
                    <span>{language === "ar" ? "الأربعاء" : "Mer"}</span>
                    <span>{language === "ar" ? "الخميس" : "Jeu"}</span>
                    <span>{language === "ar" ? "الجمعة" : "Ven"}</span>
                    <span>{language === "ar" ? "السبت" : "Sam"}</span>
                    <span>{language === "ar" ? "الأحد" : "Dim"}</span>
                  </div>
                </div>
              </div>

              {/* Box 2: Live Platform activity logs ticker preview */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {language === "ar" ? "أحدث النشاطات على خادم الإدارة" : "Sonde d'Activité Globale Proactive"}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {language === "ar" ? "مراقبة مستمرة للأحداث الهامة على النظام" : "Surveillance des événements importants du cluster"}
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveTab("logs")}
                      className="text-xs font-bold text-green-400 hover:underline flex items-center gap-1"
                    >
                      <span>{language === "ar" ? "عرض المزيد" : "Détails"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3.5 max-h-56 overflow-y-auto scrollbar-none">
                    {auditLogs.slice(0, 4).map((log) => (
                      <div key={log.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60 flex items-start gap-3">
                        <span className="text-[10px] font-bold font-mono text-slate-500 mt-0.5">
                          [{log.timestamp}]
                        </span>
                        <div>
                          <div className="flex gap-1.5 items-center">
                            <span className="text-[9px] font-extrabold uppercase font-mono tracking-widest bg-slate-800 text-slate-350 px-1.5 py-0.5 rounded leading-none">
                              {log.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 leading-normal font-mono">
                            {log.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-3 mt-4 text-[10px] text-slate-500 flex justify-between font-mono">
                  <span>SYSTEM KERNEL: ONLINE</span>
                  <span>CPU LOAD: 2.14%</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB CONTENT PANEL 2: PENDING OWNER REGISTRATIONS */}
        {activeTab === "registrations" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <span>{d.owner_reg_title}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                {d.owner_reg_sub}
              </p>
            </div>

            <hr className="border-slate-800 my-6" />

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono font-medium">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500">
                    <th className="pb-3 text-right">{d.owner_table_name}</th>
                    <th className="pb-3 text-right">{d.owner_table_stadium}</th>
                    <th className="pb-3 text-right">{d.owner_table_location}</th>
                    <th className="pb-3 text-right">{d.owner_table_type}</th>
                    <th className="pb-3 text-right">{d.owner_table_status}</th>
                    <th className="pb-3 text-right text-slate-300">{d.owner_table_actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-slate-850/40 transition-colors">
                      <td className="py-4 font-bold text-white flex items-center gap-2 text-right">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center font-bold text-xs uppercase text-slate-350">
                          {reg.name[0]}
                        </div>
                        <span>{reg.name}</span>
                      </td>
                      <td className="py-4 text-slate-300 text-right">{reg.stadium}</td>
                      <td className="py-4 text-slate-400 text-right">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{reg.city}</span>
                        </span>
                      </td>
                      <td className="py-4 text-slate-400 text-right">{reg.type}</td>
                      <td className="py-4 text-right">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          reg.status === "approved"
                            ? "bg-green-500/10 border-green-500/20 text-green-400"
                            : reg.status === "rejected"
                            ? "bg-red-500/10 border-red-500/20 text-red-400"
                            : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                        }`}>
                          {reg.status === "approved" ? d.reg_status_approved : reg.status === "rejected" ? d.reg_status_rejected : d.reg_status_pending}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        {reg.status === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleRegistrationStatus(reg.id, "approved")}
                              className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{d.btn_approve}</span>
                            </button>
                            <button
                              onClick={() => handleRegistrationStatus(reg.id, "rejected")}
                              className="px-3 py-1.5 bg-slate-800 hover:bg-red-950/40 hover:text-red-400 text-slate-400 font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>{d.btn_reject}</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-600 italic">No actions needed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredRegistrations.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500 italic">
                        {language === "ar" ? "لم يتم العثور على أي طلبات مطابقة" : "Aucun dossier trouvé pour le terme recherché."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB CONTENT PANEL 3: PARTNER COMPLEXES MANAGEMENT */}
        {activeTab === "listings" && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header with manual addition option */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-green-500" />
                  <span>{d.listings_title}</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {d.listings_sub}
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-5 py-3 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{d.add_complex_btn}</span>
              </button>
            </div>

            {/* Stadiums Table List */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono font-medium">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500">
                      <th className="pb-3 text-right">{d.table_complex_name}</th>
                      <th className="pb-3 text-right">{d.table_pitches}</th>
                      <th className="pb-3 text-right">{d.table_rate}</th>
                      <th className="pb-3 text-right">{d.table_price}</th>
                      <th className="pb-3 text-right">{d.table_featured}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {filteredComplexes.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-850/40 transition-colors">
                        <td className="py-4 font-bold text-white text-right">
                          <div className="flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                            <div>
                              <span>{c.name}</span>
                              <span className="block text-[10px] text-slate-500 font-normal mt-0.5">{c.city}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-slate-350 text-right">{c.pitches} {language === "ar" ? "ملاعب" : "pistes"}</td>
                        <td className="py-4 text-right">
                          <span className="flex items-center gap-1 text-amber-400 font-bold">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{c.rating}</span>
                          </span>
                        </td>
                        <td className="py-4 text-white font-bold text-right">{c.price} €/h</td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() => toggleFeatured(c.id)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                              c.isFeatured
                                ? "bg-amber-500/10 border-amber-500/25 text-amber-500 hover:bg-amber-500/20"
                                : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750"
                            }`}
                          >
                            <span>{c.isFeatured ? d.featured_active : d.featured_inactive}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredComplexes.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-500 italic">
                          {language === "ar" ? "لا توجد مجمعات مطابقة للبحث" : "Aucun complexe référencé pour le terme recherché."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Addition Modal Window */}
            {isAddModalOpen && (
              <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl animate-scaleUp">
                  
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="absolute top-5 right-5 text-slate-500 hover:text-slate-300 p-2 rounded-xl hover:bg-slate-800 cursor-pointer"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>

                  <h3 className="text-lg font-bold text-white mb-6">
                    {d.modal_add_title}
                  </h3>

                  <form onSubmit={handleAddComplex} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        {d.modal_field_name}
                      </label>
                      <input
                        type="text"
                        required
                        value={newComplexName}
                        onChange={(e) => setNewComplexName(e.target.value)}
                        placeholder="Ex: Camp Nou Five"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                          {d.modal_field_city}
                        </label>
                        <select
                          value={newComplexCity}
                          onChange={(e) => setNewComplexCity(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                        >
                          <option value="Paris">Paris</option>
                          <option value="Marseille">Marseille</option>
                          <option value="Lyon">Lyon</option>
                          <option value="Tunis">Tunis</option>
                          <option value="Alger">Alger</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                          {d.modal_field_pitches}
                        </label>
                        <input
                          type="number"
                          value={newComplexPitches}
                          onChange={(e) => setNewComplexPitches(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                          {d.modal_field_rating}
                        </label>
                        <input
                          type="text"
                          value={newComplexRating}
                          onChange={(e) => setNewComplexRating(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                          {d.modal_field_price}
                        </label>
                        <input
                          type="number"
                          value={newComplexPrice}
                          onChange={(e) => setNewComplexPrice(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-6 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-950/20 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      {d.modal_submit}
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB CONTENT PANEL 4: USER DIRECTORY AND ACCOUNT SENTINEL */}
        {activeTab === "users" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" />
                <span>{d.users_title}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                {d.users_sub}
              </p>
            </div>

            <hr className="border-slate-800 my-6" />

            {/* Players directory TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono font-medium">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500">
                    <th className="pb-3 text-right">{d.table_user}</th>
                    <th className="pb-3 text-right">{d.table_join_date}</th>
                    <th className="pb-3 text-right">{d.table_bookings_count}</th>
                    <th className="pb-3 text-right">{d.table_spent}</th>
                    <th className="pb-3 text-right">{d.table_status}</th>
                    <th className="pb-3 text-right text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-850/40 transition-colors">
                      <td className="py-4 font-bold text-white flex items-center gap-2.5 text-right">
                        <div className="w-7.5 h-7.5 rounded-full bg-slate-800 border border-slate-750 flex items-center justify-center font-bold text-xs uppercase text-slate-330">
                          {user.name[0]}
                        </div>
                        <div>
                          <span>{user.name}</span>
                          <span className="block text-[10px] text-slate-500 font-normal mt-0.5 font-mono">{user.email}</span>
                        </div>
                      </td>
                      <td className="py-4 text-slate-400 text-right">{user.joinDate}</td>
                      <td className="py-4 text-white text-right">{user.bookings} matchs</td>
                      <td className="py-4 text-slate-200 text-right font-bold">{user.spent}</td>
                      <td className="py-4 text-right">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          user.isBanned
                            ? "bg-red-500/10 border-red-500/20 text-red-400"
                            : "bg-green-500/10 border-green-500/20 text-green-400"
                        }`}>
                          {user.isBanned ? d.status_banned : d.status_active}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => toggleBanUser(user.id)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border cursor-pointer flex items-center gap-1 ${
                            user.isBanned
                              ? "bg-emerald-600/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-600/20"
                              : "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                          }`}
                        >
                          <Ban className="w-3.5 h-3.5" />
                          <span>{user.isBanned ? d.btn_activate : d.btn_ban}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500 italic">
                        {language === "ar" ? "لم يتم العثور على أي لاعب" : "Aucun joueur recensé pour ce terme de recherche."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB CONTENT PANEL 5: DYNAMIC VARIABLES & COMMISSIONS SETTINGS */}
        {activeTab === "settings" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-500" />
                <span>{d.settings_title}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                {d.settings_sub}
              </p>
            </div>

            <hr className="border-slate-800 my-6" />

            <form onSubmit={handleSaveSettings} className="space-y-6 max-w-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {d.set_commission}
                  </label>
                  <input
                    type="text"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {d.set_deposit}
                  </label>
                  <input
                    type="text"
                    value={standardDeposit}
                    onChange={(e) => setStandardDeposit(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {d.set_taxes}
                  </label>
                  <input
                    type="text"
                    value={localTaxRate}
                    onChange={(e) => setLocalTaxRate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {d.set_payout_schedule}
                  </label>
                  <select
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  >
                    <option value="daily">{d.set_daily}</option>
                    <option value="weekly">Chaque Lundi à 00:00</option>
                    <option value="monthly">Mensuel le 1er du mois</option>
                  </select>
                </div>
              </div>

              {/* Toggle features for demo */}
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 space-y-4">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Features Access Control</span>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Stripe Payment Gateway</p>
                    <p className="text-[10px] text-slate-500">Enable split payments split warning holds</p>
                  </div>
                  <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded">Active</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Email & SMS Automated Alerts</p>
                    <p className="text-[10px] text-slate-500">Using standard Twilio and Resend SDK hooks</p>
                  </div>
                  <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded">Active</span>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer"
              >
                {d.set_save_btn}
              </button>
            </form>
          </div>
        )}

        {/* TAB CONTENT PANEL 6: COMPREHENSIVE AUDIT LOGS */}
        {activeTab === "logs" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span>{d.logs_title}</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                  {d.logs_sub}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => triggerNotification("logs_export.csv generated")}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700/80 cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>{d.log_file_download}</span>
                </button>
              </div>
            </div>

            <hr className="border-slate-800 my-6" />

            {/* Logs Terminal view */}
            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 font-mono text-xs max-h-[480px] overflow-y-auto space-y-4">
              {auditLogs.map((log) => (
                <div key={log.id} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 pb-3.5 border-b border-slate-900/60 last:border-none">
                  
                  {/* Category badging */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-slate-500 text-[10px] whitespace-nowrap">
                      [{log.timestamp}]
                    </span>
                    <span className="text-[9px] font-extrabold uppercase bg-slate-800/80 border border-slate-700/60 text-slate-300 px-1.5 py-0.5 rounded leading-none">
                      {log.category}
                    </span>
                  </div>

                  {/* Message body */}
                  <span className="text-slate-400 leading-relaxed break-normal">
                    {log.message}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-600 font-mono mt-4 text-center">
              SECURE SHA-256 LEDGER PRESERVER • POWERED BY STADECONNECT ENGINE
            </p>
          </div>
        )}

      </main>

    </div>
  );
}
