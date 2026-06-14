import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "../context/TranslationContext";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Coins,
  Activity,
  Plus,
  Trash2,
  Check,
  X,
  CreditCard,
  MapPin,
  Clock,
  Sparkles,
  Percent,
  Search,
  Bell,
  CheckCircle,
  FileText,
  Sliders,
  DollarSign,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight,
  Shield,
  HelpCircle,
  AlertCircle
} from "lucide-react";

// Localized translations dictionaries for complete self-contained consistency
const ownerConsoleTranslations = {
  fr: {
    title: "Espace Propriétaire StadeConnect",
    sub_title: "Tableau de Bord & Gestionnaire d'Équipement",
    stadium_status: "Statut Complexe",
    status_open: "Ouvert au Public",
    status_maintenance: "Fermetures Partielles",
    exit_dashboard: "Retour Accueil",
    search_placeholder: "Rechercher réservation, joueur, promotion...",
    revenue_net: "Revenus Nets (Après Commission)",
    platform_cut: "Commission StadeConnect (12.5% incluse)",
    ready_payout: "Solde Stripe Transférable",
    initiate_payout: "Demander Virement Immédiat",
    payout_triggered: "Virement de {amount} € envoyé vers votre compte bancaire enregistré !",
    payout_progress: "Processing virement...",

    // Tabs
    tab_workspace: "Terrains & Planning",
    tab_bookings: "Réservations",
    tab_financials: "Finance & Stripe Connect",
    tab_marketing: "Codes Promos & Clientèle",
    tab_pulse_live: "Sensors & Matchs Live",

    // Pitch Management
    add_pitch_btn: "Ajouter un Terrain",
    modal_add_pitch: "Enregistrer un Nouveau Terrain",
    field_pitch_name: "Nom du terrain",
    field_pitch_type: "Type de surface",
    field_pitch_price: "Tarif horaire (€)",
    pitch_created: "Nouveau terrain ajouté avec succès !",
    pitch_deleted: "Le terrain a été archivé.",

    // Time Slot Grid
    grid_title: "Planificateur de Créneaux d'Aujourd'hui",
    grid_sub: "Cliquez sur un créneau vacant pour enregistrer manuellement un joueur hors-ligne (téléphone, comptoir).",
    vacant: "Disponible",
    occupied: "Occupé",
    add_booking_manual: "Création d'Hébergement Manuel",
    customer_fullname: "Nom Complet du Joueur",
    customer_phone: "Numéro de Téléphone",
    save_booking: "Confirmer la Réservation",
    manual_booking_success: "Réservation manuelle ajoutée avec succès !",

    // Bookings log
    table_customer: "Joueur / Équipe",
    table_pitch: "Terrain",
    table_time: "Horaire",
    table_price: "Montant",
    table_type: "Type d'Origine",
    type_online: "En Ligne (App)",
    type_offline: "Manuel (Téléphone)",
    actions: "Actions",
    btn_approve: "Accepter",
    btn_cancel: "Annuler",
    booking_status_confirmed: "Confirmé",
    booking_status_pending: "En attente",
    booking_status_cancelled: "Annulé",
    booking_approved: "La réservation a été acceptée et enregistrée !",
    booking_cancelled: "La réservation a été annulée et remboursée.",

    // Payout widget
    payout_history: "Historique des transferts Stripe Connect",
    payout_table_ref: "Référence Virement",
    payout_table_amount: "Montant",
    payout_table_date: "Date",
    payout_table_status: "Statut virement",
    payout_status_success: "Succès",
    payout_status_pending: "Traitement",

    // Marketing UI
    promo_title: "Générateur de Coupons Promotionnels",
    promo_sub: "Offrez des remises sur vos créneaux aux heures creuses pour booster votre taux d'occupation.",
    promo_code: "Code Promo",
    promo_discount: "Remise (%)",
    promo_create_btn: "Générer le Coupon",
    promo_active: "Coupons Actifs du Complexe",
    promo_none: "Aucun coupon actif pour le moment.",
    promo_created: "Coupon de réduction créé avec succès !",
    promo_deleted: "Le coupon a été désactivé.",

    // Active Live Matches
    live_header: "Réseau de Capteurs de Terrain",
    live_sub: "Télémétrie en direct des matchs en cours sur vos terrains connectés StadeConnect.",
    sensor_active: "Flux Capteur Actif",
    match_duration: "Temps Écoulé",
    match_score: "Score Live"
  },
  ar: {
    title: "بوابة المالك إستاد كونكت",
    sub_title: "لوحة التحكم وإدارة المرافق الرياضية",
    stadium_status: "حالة المركّب",
    status_open: "مفتوح للعموم",
    status_maintenance: "صيانة جزئية",
    exit_dashboard: "الخروج للرئيسية",
    search_placeholder: "ابحث عن حجز، لاعب، رمز ترويجي...",
    revenue_net: "الأرباح الصافية (بعد العمولة)",
    platform_cut: "عمولة منصة ستاد كونكت (12.5% مشمولة)",
    ready_payout: "رصيد Stripe القابل للتحويل",
    initiate_payout: "طلب حسم وتحويل فوري",
    payout_triggered: "تم إرسال حوالة بقيمة {amount} € إلى حسابك المصرفي المسجل بنجاح!",
    payout_progress: "جاري معالجة التحويل البنكي...",

    // Tabs
    tab_workspace: "الملاعب وجدول الحصص",
    tab_bookings: "سجل الحجوزات",
    tab_financials: "المالية وتحويلات Stripe",
    tab_marketing: "الكوبونات الترويجية وقاعدة العملاء",
    tab_pulse_live: "المستشعرات والمباريات الحية",

    // Pitch Management
    add_pitch_btn: "إضافة ملعب جديد",
    modal_add_pitch: "تسجيل ملعب جديد في المجمع",
    field_pitch_name: "اسم الملعب",
    field_pitch_type: "نوع الأرضية (العشب)",
    field_pitch_price: "السعر بالساعة (€)",
    pitch_created: "تمت إضافة الملعب الجديد بنجاح!",
    pitch_deleted: "تم إرسال الملعب إلى الأرشيف المالي.",

    // Time Slot Grid
    grid_title: "منظم ومخطط الحصص اليومي المباشر",
    grid_sub: "انقر فوق أي حصة فارغة لتسجيل لاعب يدويًا بدون استخدام الإنترنت (قادم عبر الهاتف أو الاستقبال).",
    vacant: "متاح للحجز",
    occupied: "محجوز",
    add_booking_manual: "إنشاء حجز يدوي مباشر",
    customer_fullname: "اسم اللاعب الكامل",
    customer_phone: "رقم هاتف الاتصال",
    save_booking: "تأكيد وتسجيل الحجز",
    manual_booking_success: "تم إضافة الحجز اليدوي بنجاح لتأمين الملعب!",

    // Bookings log
    table_customer: "اللاعب / الفريق",
    table_pitch: "الملعب",
    table_time: "الوقت",
    table_price: "المبلغ",
    table_type: "قناة الحجز",
    type_online: "أونلاين (التطبيق)",
    type_offline: "يدوي (الهاتف)",
    actions: "الإجراءات",
    btn_approve: "قبول الحجز",
    btn_cancel: "إلغاء",
    booking_status_confirmed: "مؤكد",
    booking_status_pending: "قيد الانتظار",
    booking_status_cancelled: "ملغي",
    booking_approved: "تم تفعيل وتأكيد الحجز بنجاح وإرسال إشعار SMS للاعب !",
    booking_cancelled: "تم إلغاء الحجز وإعادة المال لمحفظة اللاعب بنجاح.",

    // Payout widget
    payout_history: "سجل تحويلات Stripe Connect التاريخية",
    payout_table_ref: "مرجع التحويل",
    payout_table_amount: "المبلغ",
    payout_table_date: "التاريخ",
    payout_table_status: "حالة الحوالة",
    payout_status_success: "مكتملة بنجاح",
    payout_status_pending: "جاري التحويل",

    // Marketing UI
    promo_title: "مولد الكوبونات الرمزية والخصومات",
    promo_sub: "قم بإنشاء كود خصم في الأوقات الهادئة لزيادة معدل حجز الملاعب لشبكتك الخاصة.",
    promo_code: "كود الخصم",
    promo_discount: "النسبة المئوية (%)",
    promo_create_btn: "توليد الكود الترويجي",
    promo_active: "الكوبونات المفعلة حالياً بالمجمع",
    promo_none: "لا توجد أي خصومات نشطة حالياً بالنظام.",
    promo_created: "تم إنشاء كود الخصم بنجاح وجاهز للاستخدام مع اللاعبين !",
    promo_deleted: "تم إلغاء وتجميد كود الخصم الرياضي بنجاح.",

    // Active Live Matches
    live_header: "شبكة مستشعرات الملاعب المباشرة",
    live_sub: "اتصال بالإنترنت لمعرفة حالة الحركة والسرعة في المباريات على ملاعبك المتصلة.",
    sensor_active: "إشارة الاستشعار نشطة 100%",
    match_duration: "الوقت المنقضي",
    match_score: "النتيجة الفورية"
  }
};

interface StadiumOwnerDashboardProps {
  onClose: () => void;
}

export default function StadiumOwnerDashboard({ onClose }: StadiumOwnerDashboardProps) {
  const { language, isRtl } = useTranslation();

  // Local state for translation dictionary
  const d = useMemo(() => {
    return language === "ar" ? ownerConsoleTranslations.ar : ownerConsoleTranslations.fr;
  }, [language]);

  // Dashboard configuration states
  const [activeTab, setActiveTab] = useState<"workspace" | "bookings" | "financials" | "marketing" | "live">("workspace");
  const [selectedStadium, setSelectedStadium] = useState("stadium_1");
  const [stadiumStatus, setStadiumStatus] = useState<"open" | "maintenance">("open");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Payout progress states
  const [isPayoutProcessing, setIsPayoutProcessing] = useState(false);
  const [payoutProgressStep, setPayoutProgressStep] = useState(0);

  // Modal State: Pitch Creation
  const [isAddPitchOpen, setIsAddPitchOpen] = useState(false);
  const [newPitchName, setNewPitchName] = useState("");
  const [newPitchType, setNewPitchType] = useState("Gazon Synthétique 4G");
  const [newPitchPrice, setNewPitchPrice] = useState("75");

  // Modal State: Offline Handshake Manual Booking
  const [isManualBookingOpen, setIsManualBookingOpen] = useState(false);
  const [manualSlotTime, setManualSlotTime] = useState("");
  const [manualSlotPitch, setManualSlotPitch] = useState("");
  const [manualPlayerName, setManualPlayerName] = useState("");
  const [manualPlayerPhone, setManualPlayerPhone] = useState("");

  // Marketing states
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState("15");

  // Player Pass Verification State
  const [verificationCodeInput, setVerificationCodeInput] = useState("");
  const [verifiedBookingResult, setVerifiedBookingResult] = useState<any>(null);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "success" | "not_found">("idle");

  // 1. Pitches List Data Flow
  const [pitches, setPitches] = useState([
    { id: "p1", name: "Terrain Pro 1 - Camp des Aigles", type: "Gazon Synthétique 4G", price: 80, isAvailable: true },
    { id: "p2", name: "Terrain VIP 2 - Indoor Arena", type: "Indoor Synthétique", price: 100, isAvailable: true },
    { id: "p3", name: "Terrain Junior 3 - Classic Turf", type: "Pelouse Naturelle", price: 65, isAvailable: true },
    { id: "p4", name: "Futbolito Cage - 5vs5", type: "Gazon Synthétique 3G", price: 50, isAvailable: false }
  ]);

  // 2. Bookings state with status management initialized with localStorage dynamic sync and premium codes
  const [bookings, setBookings] = useState(() => {
    const defaultList = [
      { id: "b1", bookingCode: "SC-KICK-8192-A", customerName: "Karim Benzema", customerPhone: "+33 6 45 89 23 10", customerEmail: "kb9@nineten.com", pitchId: "p1", pitchName: "Terrain Pro 1", time: "17:00 - 18:30", price: 80, type: "online", status: "confirmed", date: "Today" },
      { id: "b2", bookingCode: "SC-KICK-7341-X", customerName: "Yassine Sassi", customerPhone: "+216 98 123 456", customerEmail: "sassi@goldfoot.tn", pitchId: "p2", pitchName: "Terrain VIP 2", time: "18:30 - 20:00", price: 100, type: "online", status: "pending", date: "Today" },
      { id: "b3", bookingCode: "SC-KICK-2049-M", customerName: "Omar Bakayoko", customerPhone: "+33 7 11 02 44 99", customerEmail: "bakayoko@futsal.en", pitchId: "p3", pitchName: "Terrain Junior 3", time: "20:00 - 21:30", price: 65, type: "offline", status: "confirmed", date: "Today" },
      { id: "b4", bookingCode: "SC-KICK-9942-Z", customerName: "Zinedine Zidane", customerPhone: "+33 6 98 77 66 55", customerEmail: "zizou@madrid.io", pitchId: "p1", pitchName: "Terrain Pro 1", time: "21:30 - 23:00", price: 80, type: "online", status: "pending", date: "Today" },
      { id: "b5", bookingCode: "SC-KICK-5521-G", customerName: "Smail Slimani", customerPhone: "+213 770 12 34 56", customerEmail: "slimani@fennec.dz", pitchId: "p4", pitchName: "Futbolito Cage", time: "17:00 - 18:30", price: 50, type: "offline", status: "cancelled", date: "Yesterday" }
    ];
    try {
      const stored = localStorage.getItem("stadeconnect_bookings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...parsed, ...defaultList];
        }
      }
    } catch (e) {
      console.error("Failed to parse stored bookings list", e);
    }
    return defaultList;
  });

  // 3. Financial parameters and Stripe Payouts Tracker
  const [availableBalance, setAvailableBalance] = useState(1480);
  const [payoutsList, setPayoutsList] = useState([
    { id: "pay_101", reference: "STRIPE-OUT-44919", amount: 2450, date: "2026-06-01", status: "success" },
    { id: "pay_102", reference: "STRIPE-OUT-48210", amount: 1890, date: "2026-06-08", status: "success" }
  ]);

  // 4. Promo codes state list
  const [coupons, setCoupons] = useState([
    { id: "c1", code: "RAMADAN20", discount: 20, usageCount: 42 },
    { id: "c2", code: "NIGHTKICK", discount: 15, usageCount: 28 },
    { id: "c3", code: "OPENING50", discount: 50, usageCount: 110 }
  ]);

  // 5. Live match pulse simulator data (Countdown and score ticking)
  const [liveMatches, setLiveMatches] = useState([
    { id: "l1", pitchName: "Terrain Pro 1", teamA: "Les Fennecs FC", teamB: "Carthage Eagles", scoreA: 3, scoreB: 2, minutesElapsed: 68, activePlayers: 10, isLive: true },
    { id: "l2", pitchName: "Terrain VIP 2", teamA: "Marseille Foot Five", teamB: "Paris Soccer Team", scoreA: 7, scoreB: 7, minutesElapsed: 82, activePlayers: 10, isLive: true }
  ]);

  // Keep live matches ticking for realistic visual feel of sensor and action
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveMatches(prev => prev.map(match => {
        if (!match.isLive) return match;
        
        let newMin = match.minutesElapsed + 1;
        if (newMin > 90) {
          newMin = 1; // Restart cycle
          return { ...match, minutesElapsed: newMin, scoreA: 0, scoreB: 0 };
        }

        // Randomly score some goals
        const ran = Math.random();
        let newScoreA = match.scoreA;
        let newScoreB = match.scoreB;
        if (ran > 0.95) {
          newScoreA += 1;
        } else if (ran > 0.90) {
          newScoreB += 1;
        }

        return { ...match, minutesElapsed: newMin, scoreA: newScoreA, scoreB: newScoreB };
      }));
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  // Update Clock UTC Every Second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Quick Action: Show floating notification banner
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4500);
  };

  // Actions: Approve Booking request
  const handleApproveBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "confirmed" } : b));
    const item = bookings.find(b => b.id === id);
    if (item) {
      triggerToast(d.booking_approved);
    }
  };

  // Actions: Cancel / refund booking
  const handleCancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "cancelled" } : b));
    const item = bookings.find(b => b.id === id);
    if (item) {
      triggerToast(d.booking_cancelled);
    }
  };

  // Actions: Verify player access codes at entrance gates
  const handleVerifyAccessCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCodeInput.trim()) return;

    const codeToFind = verificationCodeInput.toUpperCase().trim();
    const found = bookings.find(b => {
      const code = b.bookingCode || "";
      return code.toUpperCase().trim() === codeToFind;
    });

    if (found) {
      setVerifiedBookingResult(found);
      setVerificationStatus("success");
    } else {
      setVerifiedBookingResult(null);
      setVerificationStatus("not_found");
    }
  };

  const handleCheckInVerifiedPlayer = (bookingId: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: "confirmed" } : b));
    triggerToast(language === "fr" ? "Joueur enregistré à l'entrée avec succès !" : "تم تأشر دخول الفريق بنجاح إلى أرضية الملعب !");
    setVerificationStatus("idle");
    setVerificationCodeInput("");
    setVerifiedBookingResult(null);

    // Persist status change to local storage to preserve integrity
    try {
      const stored = localStorage.getItem("stadeconnect_bookings");
      if (stored) {
        let bookingList = JSON.parse(stored);
        if (Array.isArray(bookingList)) {
          bookingList = bookingList.map(b => b.id === bookingId ? { ...b, status: "confirmed" } : b);
          localStorage.setItem("stadeconnect_bookings", JSON.stringify(bookingList));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Actions: Toggle Pitch operational availability
  const togglePitchAvailability = (id: string) => {
    setPitches(prev => prev.map(p => p.id === id ? { ...p, isAvailable: !p.isAvailable } : p));
  };

  // Actions: Add manual Pitch
  const handleAddPitchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPitchName.trim()) return;

    const newObj = {
      id: "pitch_" + Date.now(),
      name: newPitchName,
      type: newPitchType,
      price: parseFloat(newPitchPrice) || 75,
      isAvailable: true
    };

    setPitches(prev => [...prev, newObj]);
    setNewPitchName("");
    setIsAddPitchOpen(false);
    triggerToast(d.pitch_created);
  };

  // Actions: Delete Pitch
  const handleDeletePitch = (id: string) => {
    setPitches(prev => prev.filter(p => p.id !== id));
    triggerToast(d.pitch_deleted);
  };

  // Actions: Open Vacant slot manual drawer form
  const handleOpenManualBooking = (pitchId: string, time: string) => {
    const isOccupied = bookings.some(b => b.pitchId === pitchId && b.time === time && b.status === "confirmed");
    if (isOccupied) return;

    setManualSlotPitch(pitchId);
    setManualSlotTime(time);
    setIsManualBookingOpen(true);
  };

  // Actions: Save Offline manual booking
  const handleSaveManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualPlayerName.trim()) return;

    const pitchDetails = pitches.find(p => p.id === manualSlotPitch);
    if (!pitchDetails) return;

    const manualBook = {
      id: "b_man_" + Date.now(),
      customerName: manualPlayerName,
      customerPhone: manualPlayerPhone || "N/A",
      customerEmail: "offline@stadeconnect-counter.io",
      pitchId: manualSlotPitch,
      pitchName: pitchDetails.name.split("-")[0].trim(),
      time: manualSlotTime,
      price: pitchDetails.price,
      type: "offline",
      status: "confirmed",
      date: "Today"
    };

    setBookings(prev => [manualBook, ...prev]);
    setIsManualBookingOpen(false);
    setManualPlayerName("");
    setManualPlayerPhone("");
    triggerToast(d.manual_booking_success);
  };

  // Actions: Create Promotion Code Voucher
  const handleCreateCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    const newCoupon = {
      id: "coup_" + Date.now(),
      code: promoCode.toUpperCase().replace(/\s+/g, ""),
      discount: parseInt(promoDiscount) || 15,
      usageCount: 0
    };

    setCoupons(prev => [newCoupon, ...prev]);
    setPromoCode("");
    triggerToast(d.promo_created);
  };

  // Actions: Delete Promotion discount voucher
  const handleDeleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    triggerToast(d.promo_deleted);
  };

  // Actions: Stripe balance transfers trigger
  const handleInitiatePayout = () => {
    if (availableBalance <= 0) return;
    setIsPayoutProcessing(true);
    setPayoutProgressStep(1);

    setTimeout(() => {
      setPayoutProgressStep(2);
    }, 1500);

    setTimeout(() => {
      setPayoutProgressStep(3);
    }, 3000);

    setTimeout(() => {
      const payoutAmount = availableBalance;
      const refCode = "STRIPE-OUT-" + Math.floor(10000 + Math.random() * 90000);
      const todayString = new Date().toISOString().split("T")[0];

      const newPayoutRecord = {
        id: "pay_" + Date.now(),
        reference: refCode,
        amount: payoutAmount,
        date: todayString,
        status: "success"
      };

      setPayoutsList(prev => [newPayoutRecord, ...prev]);
      setAvailableBalance(0);
      setIsPayoutProcessing(false);
      setPayoutProgressStep(0);
      triggerToast(d.payout_triggered.replace("{amount}", payoutAmount.toString()));
    }, 4500);
  };

  // Calculate high-performance dynamic statistics based on bookings
  const calculations = useMemo(() => {
    const activeConfirmedBookings = bookings.filter(b => b.status === "confirmed");
    const grossIncome = activeConfirmedBookings.reduce((sum, current) => sum + current.price, 0);
    const platformFee = grossIncome * 0.125;
    const netIncome = grossIncome - platformFee;
    
    // Live vacancy calculation
    const possibleSlots = pitches.length * 6; // 6 time slots per pitch
    const occupiedCount = activeConfirmedBookings.filter(b => b.date === "Today").length;
    const occupancyRatePercent = possibleSlots > 0 ? Math.round((occupiedCount / possibleSlots) * 100) : 0;

    return {
      grossIncome,
      platformFee,
      netIncome,
      occupancyRatePercent
    };
  }, [bookings, pitches]);

  // Pre-configured operating hours planning slots
  const operatingTimeSlots = ["16:00 - 17:30", "17:30 - 19:00", "19:00 - 20:30", "20:30 - 22:00", "22:00 - 23:30", "23:30 - 01:00"];

  // Search Filter Query
  const matchSearchQuery = (text: string) => {
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const filteredBookingsList = bookings.filter(b => 
    matchSearchQuery(b.customerName) || 
    matchSearchQuery(b.pitchName) || 
    matchSearchQuery(b.time)
  );

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans ${isRtl ? "rtl" : "ltr"}`}>
      
      {/* Floating System Status Toast Banner */}
      {toastMessage && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 p-4 rounded-xl flex items-center gap-3 bg-green-600 text-white font-bold text-sm shadow-xl shadow-green-950/40 border border-green-500/20 max-w-md w-[90%] transition-all duration-300 transform scale-100 animate-fadeIn`}>
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Deluxe Portal Navigation Sub-header bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            
            {/* Owner Identity details block */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-950/30">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg font-black tracking-tight text-white">
                    {d.title}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-green-500/15 border border-green-500/20 text-green-400 px-2.5 py-0.5 rounded-full">
                    SaaS Portal
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>{d.sub_title}</span>
                </div>
              </div>
            </div>

            {/* Middle Arena Profile Selector */}
            <div className="hidden lg:flex items-center gap-2.5">
              <select
                value={selectedStadium}
                onChange={(e) => setSelectedStadium(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:border-green-500 transition-all cursor-pointer font-sans"
              >
                <option value="stadium_1">🏟️ Carthage Football Club (Tunis)</option>
                <option value="stadium_2">🏟️ Marseille Foot Five (Marseille)</option>
                <option value="stadium_3">🏟️ Camp des Aigles Arena (Paris)</option>
              </select>

              {/* Quick Status toggle button */}
              <button
                onClick={() => setStadiumStatus(prev => prev === "open" ? "maintenance" : "open")}
                className={`px-3 py-2.5 rounded-xl border text-xs font-bold font-mono transition-all cursor-pointer ${
                  stadiumStatus === "open"
                    ? "bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20"
                    : "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20"
                }`}
              >
                ● {stadiumStatus === "open" ? d.status_open : d.status_maintenance}
              </button>
            </div>

            {/* Exit/Return button */}
            <div className="flex items-center gap-3">
              {/* UTC clock indicators */}
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-400">
                <span className="text-slate-600">TIME:</span>
                <span className="font-bold text-white tracking-widest">{currentTime}</span>
              </div>

              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white rounded-full text-xs font-bold transition-all border border-slate-700/80 cursor-pointer"
              >
                {d.exit_dashboard}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Global search entry bar */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          
          <div className="md:col-span-3 relative">
            <div className={`absolute inset-y-0 ${isRtl ? "left-auto right-4" : "left-4 right-auto"} flex items-center pointer-events-none`}>
              <Search className="h-4.5 w-4.5 text-slate-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={d.search_placeholder}
              className={`w-full outline-none bg-slate-900 border border-slate-800 focus:border-green-500 rounded-2xl py-3.5 ${isRtl ? "pr-12 pl-4" : "pl-12 pr-4"} text-sm placeholder-slate-500 text-white transition-all`}
            />
          </div>

          <div className="bg-gradient-to-tr from-green-500/10 to-emerald-500/5 border border-green-500/15 p-3.5 rounded-2xl flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">{language === "fr" ? "Taux Occupé" : "معدل الحجز اليومي"}</span>
            <span className="text-xs font-mono font-bold text-green-400">{calculations.occupancyRatePercent}%</span>
          </div>

        </div>

        {/* Dashboard Sections Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-3 mb-8 border-b border-slate-800 scrollbar-none">
          {[
            { id: "workspace", icon: <SlidersHorizontal className="w-4 h-4" />, label: d.tab_workspace },
            { id: "bookings", icon: <Calendar className="w-4 h-4" />, label: d.tab_bookings, count: bookings.filter(b => b.status === "pending").length },
            { id: "financials", icon: <Coins className="w-4 h-4" />, label: d.tab_financials },
            { id: "marketing", icon: <Percent className="w-4 h-4" />, label: d.tab_marketing },
            { id: "live", icon: <Activity className="w-4 h-4" />, label: d.tab_pulse_live, activePing: true }
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
              {!!tab.count && (
                <span className="bg-amber-500 text-slate-950 font-mono text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
              {tab.activePing && (
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: WORKSPACE & PITCH PLANNING CRENEAUX */}
        {activeTab === "workspace" && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Pitches listing HUD row with dynamic creation */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {language === "fr" ? "Vos Terrains Référencés" : "ملاعبك المسجلة بالمركب"}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {language === "fr" ? "Supervisez vos pelouses et ajustez les prix en fonction de la demande." : "تحكم في أسعار وتوفر أرضيات الملاعب المسجلة حالياً."}
                </p>
              </div>
              <button
                onClick={() => setIsAddPitchOpen(true)}
                className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{d.add_pitch_btn}</span>
              </button>
            </div>

            {/* Pitches Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pitches.map((pitch) => (
                <div key={pitch.id} className="relative bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 bg-slate-950 rounded-xl text-green-400 border border-slate-800">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    
                    {/* Toggle availability checkbox */}
                    <button
                      onClick={() => togglePitchAvailability(pitch.id)}
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded leading-none border transition-all ${
                        pitch.isAvailable
                          ? "bg-green-500/10 border-green-500/20 text-green-400"
                          : "bg-red-500/10 border-red-500/20 text-red-400"
                      }`}
                    >
                      {pitch.isAvailable ? "ACTIVE" : "DISABLED"}
                    </button>
                  </div>

                  <h4 className="text-sm font-bold text-white font-display truncate">
                    {pitch.name}
                  </h4>
                  <p className="text-xs font-mono text-slate-500 mt-1">{pitch.type}</p>
                  
                  <div className="border-t border-slate-800/80 my-4 pt-3 flex justify-between items-center font-mono">
                    <div>
                      <span className="text-[10px] text-slate-500 block">TARIF</span>
                      <span className="text-sm font-bold text-white">{pitch.price} € / H</span>
                    </div>

                    <button
                      onClick={() => handleDeletePitch(pitch.id)}
                      className="p-2 rounded-lg bg-slate-950 text-slate-500 hover:text-red-400 hover:bleed shadow-sm cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Operating Hours Interactive Time Slot Grid */}
            <div className="bg-slate-900 border border-slate-850 p-6 rounded-3xl">
              <div>
                <h3 className="text-base font-bold text-white">
                  {d.grid_title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {d.grid_sub}
                </p>
              </div>

              <hr className="border-slate-800 my-6" />

              {/* Time slots scheduler matrix representation */}
              <div className="space-y-4">
                {pitches.map((p) => {
                  if (!p.isAvailable) return null;
                  return (
                    <div key={p.id} className="grid grid-cols-1 lg:grid-cols-4 items-center bg-slate-950/40 border border-slate-800/60 rounded-2xl p-4 gap-4">
                      
                      {/* Left: Pitch info */}
                      <div>
                        <span className="text-xs font-bold text-slate-400 block truncate font-display">
                          {p.name.split("-")[0]}
                        </span>
                        <span className="text-[10px] text-slate-600 font-mono block mt-0.5">
                          {p.type} • {p.price}€/h
                        </span>
                      </div>

                      {/* Right: Interactive slots */}
                      <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                        {operatingTimeSlots.map((timeString) => {
                          const associatedBooking = bookings.find(
                            b => b.pitchId === p.id && b.time === timeString && b.status === "confirmed"
                          );
                          const isBooked = !!associatedBooking;

                          return (
                            <button
                              key={timeString}
                              onClick={() => handleOpenManualBooking(p.id, timeString)}
                              disabled={isBooked}
                              className={`p-3.5 rounded-xl border text-center transition-all flex flex-col justify-between items-center h-20 ${
                                isBooked
                                  ? "bg-red-500/10 border-red-500/20 text-red-400 cursor-not-allowed opacity-90"
                                  : "bg-slate-900/60 border-slate-800 text-slate-350 hover:bg-green-500/10 hover:border-green-500/30 hover:text-green-400 cursor-pointer"
                              }`}
                            >
                              <span className="text-[10px] font-mono font-bold">
                                {timeString.split(" - ")[0]}
                              </span>
                              
                              <span className="text-[9px] uppercase font-bold tracking-wider opacity-85 leading-none">
                                {isBooked ? associatedBooking.customerName.split(" ")[0] : d.vacant}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

            {/* Modal: Register Offline Player Handshake manual booking */}
            {isManualBookingOpen && (
              <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl animate-scaleUp">
                  
                  <button
                    onClick={() => setIsManualBookingOpen(false)}
                    className="absolute top-5 right-5 text-slate-500 hover:text-slate-300 p-2 rounded-xl hover:bg-slate-800 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h3 className="text-lg font-bold text-white mb-6">
                    {d.add_booking_manual}
                  </h3>

                  <div className="p-3.5 bg-slate-950 border border-slate-800/80 rounded-xl mb-6 font-mono text-xs">
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">CRENEAU:</span>
                      <span className="text-green-400 font-bold">{manualSlotTime}</span>
                    </div>
                    <div className="flex justify-between py-1 border-t border-slate-800/40 mt-1 pt-1">
                      <span className="text-slate-500">TERRAIN ID:</span>
                      <span className="text-white font-bold">
                        {pitches.find(p => p.id === manualSlotPitch)?.name.split("-")[0]}
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSaveManualBooking} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        {d.customer_fullname}
                      </label>
                      <input
                        type="text"
                        required
                        value={manualPlayerName}
                        onChange={(e) => setManualPlayerName(e.target.value)}
                        placeholder="Ex: Yacine Brahimi"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        {d.customer_phone}
                      </label>
                      <input
                        type="text"
                        required
                        value={manualPlayerPhone}
                        onChange={(e) => setManualPlayerPhone(e.target.value)}
                        placeholder="Ex: +213 671 20 19 88"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg mt-4"
                    >
                      {d.save_booking}
                    </button>
                  </form>

                </div>
              </div>
            )}

            {/* Modal: Pitch Registration Popup Form */}
            {isAddPitchOpen && (
              <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl animate-scaleUp">
                  
                  <button
                    onClick={() => setIsAddPitchOpen(false)}
                    className="absolute top-5 right-5 text-slate-500 hover:text-slate-300 p-2 rounded-xl hover:bg-slate-800 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h3 className="text-lg font-bold text-white mb-6">
                    {d.modal_add_pitch}
                  </h3>

                  <form onSubmit={handleAddPitchSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        {d.field_pitch_name}
                      </label>
                      <input
                        type="text"
                        required
                        value={newPitchName}
                        onChange={(e) => setNewPitchName(e.target.value)}
                        placeholder="Ex: Terrain Pro 5 - Wembley"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                          {d.field_pitch_type}
                        </label>
                        <select
                          value={newPitchType}
                          onChange={(e) => setNewPitchType(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 cursor-pointer"
                        >
                          <option value="Gazon Synthétique 4G">Gazon 4G</option>
                          <option value="Pelouse Naturelle">Pelouse Pro</option>
                          <option value="Indoor Synthétique">Indoor</option>
                          <option value="Sable & Ciment">Futsal Hard</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                          {d.field_pitch_price}
                        </label>
                        <input
                          type="number"
                          required
                          value={newPitchPrice}
                          onChange={(e) => setNewPitchPrice(e.target.value)}
                          placeholder="Ex: 85"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg mt-4"
                    >
                      {language === "fr" ? "Enregistrer le terrain" : "تسجيل وحفظ الملعب في المجمع"}
                    </button>
                  </form>

                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: BOOKINGS REGISTRY WITH SEARCH */}
        {activeTab === "bookings" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-500" />
                <span>{language === "fr" ? "Dossiers de Réservations Connectées" : "إدارة الحجوزات التاريخية واليومية"}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {language === "fr" ? "Gérez les réservations de créneaux faites en ligne par les joueurs ou enregistrées sur place." : "صادق على حجوزات اللاعبين في الوقت الحقيقي أو قم بالتعديل والإلغاء الفوري."}
              </p>
            </div>

            <hr className="border-slate-800 my-6" />

            {/* PLAY PASS QUICK SCANNER & CODE VERIFICATION WIDGET */}
            <div className="mb-8 p-6 bg-slate-950/85 border border-slate-800/80 rounded-2xl shadow-inner text-right">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3.5 flex items-center gap-1.5 justify-end">
                <Shield className="w-4.5 h-4.5 text-green-500" />
                <span>{language === "fr" ? "Scanner de Vérification de Pass de Match (Gate Control)" : "بوابة التحقق وتأشير دخول اللاعبين (التحكم في الدخول)"}</span>
              </h3>
              
              <form onSubmit={handleVerifyAccessCode} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <span className="absolute inset-y-0 left-4 flex items-center text-slate-500 font-mono text-[10px] font-bold uppercase tracking-wider">PASS CODE:</span>
                  <input
                    type="text"
                    required
                    value={verificationCodeInput}
                    onChange={(e) => setVerificationCodeInput(e.target.value)}
                    placeholder="SC-KICK-..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-green-500 rounded-xl py-3 pl-28 pr-4 text-xs font-mono font-bold tracking-widest placeholder-slate-600 outline-none text-white uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-lg shadow-green-950/25"
                >
                  {language === "fr" ? "Vérifier le Code" : "التحقق من الكود"}
                </button>
              </form>

              {/* VERIFICATION STATE DISPLAY */}
              {verificationStatus === "success" && verifiedBookingResult && (
                <div className="mt-4 p-5 bg-emerald-500/5 border border-emerald-500/25 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fadeIn text-left">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-green-500 text-slate-950 font-black rounded text-[9px] uppercase tracking-wider">
                        {language === "fr" ? "PASS ACCÈS VALIDÉ" : "كود صحيح ومؤمن"}
                      </span>
                      <span className="font-mono font-bold text-green-400">{verifiedBookingResult.bookingCode || "SC-ONLINE"}</span>
                    </div>
                    <p className="text-white font-mono font-black text-sm">{verifiedBookingResult.customerName}</p>
                    <div className="text-slate-400 space-y-0.5 font-mono text-[11px] leading-relaxed">
                      <p>📍 {verifiedBookingResult.stadiumName || ("Carthage Club")} • {verifiedBookingResult.pitchName}</p>
                      <p>⏰ {verifiedBookingResult.time} • Today</p>
                      <p>💰 {verifiedBookingResult.price} € Paid (Caution Validée)</p>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                    {verifiedBookingResult.status !== "confirmed" ? (
                      <button
                        onClick={() => handleCheckInVerifiedPlayer(verifiedBookingResult.id)}
                        className="px-4 py-3 bg-green-600 hover:bg-green-500 text-white font-bold text-[11px] rounded-lg shadow cursor-pointer transition-all uppercase flex-grow md:flex-grow-0"
                      >
                        {language === "fr" ? "Valider l'Entrée & Check-In" : "تأشير دخول اللاعب للملعب"}
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-green-400 font-bold text-xs px-3 py-2.5 bg-green-500/10 border border-green-500/20 rounded-lg flex-grow md:flex-grow-0">
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>{language === "fr" ? "VALIDÉ / INSCRIT" : "تم تسجيل الدخول مسبقاً"}</span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setVerificationStatus("idle");
                        setVerificationCodeInput("");
                        setVerifiedBookingResult(null);
                      }}
                      className="px-3.5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[11px] rounded-lg cursor-pointer"
                    >
                      {language === "fr" ? "Fermer" : "إغلاق"}
                    </button>
                  </div>
                </div>
              )}

              {verificationStatus === "not_found" && (
                <div className="mt-4 p-5 bg-red-500/5 border border-red-500/20 rounded-xl flex items-start gap-3.5 animate-fadeIn text-left text-xs">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-red-400 uppercase tracking-wider">{language === "fr" ? "Code Inconnu ou Invalide" : "كود الحجز غير مدرج بالنظام"}</h4>
                    <p className="text-slate-400 mt-1 leading-relaxed">
                      {language === "fr"
                        ? "Cette référence de réservation n'a pas pu être trouvée dans la base de données du complexe. Veuillez vérifier l'exactitude des caractères saisis ou demander au joueur de présenter son reçu officiel de match."
                        : "لم يتم العثور على أي حجز مطابق لهذا الرمز في المجمع الرياضي. يرجى مراجعة الرمز مجدداً أو تفقد شاشة هاتف اللاعب لطلب ورقة المباراة المباشرة."}
                    </p>
                    <button
                      type="button"
                      onClick={() => setVerificationStatus("idle")}
                      className="mt-2.5 text-[11px] font-bold text-red-400 hover:underline cursor-pointer"
                    >
                      {language === "fr" ? "Réessayer" : "إعادة المحاولة"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono font-medium">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-505 text-slate-450">
                    <th className="pb-3 text-right">{d.table_customer}</th>
                    <th className="pb-3 text-right">{d.table_pitch}</th>
                    <th className="pb-3 text-right">{d.table_time}</th>
                    <th className="pb-3 text-right">{d.table_price}</th>
                    <th className="pb-3 text-right">{d.table_type}</th>
                    <th className="pb-3 text-right">STATUT</th>
                    <th className="pb-3 text-right text-slate-300">{d.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {filteredBookingsList.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-850/40 transition-colors">
                      
                      {/* Customer context info */}
                      <td className="py-4 text-right font-bold text-white">
                        <div>
                          <span className="block">{b.customerName}</span>
                          <span className="block text-[10px] text-green-400 font-mono font-black tracking-wider mt-0.5">{b.bookingCode || "SC-KICK-9942-Z"}</span>
                          <span className="block text-[10px] text-slate-550 text-slate-450 font-normal mt-0.5">{b.customerPhone}</span>
                        </div>
                      </td>

                      {/* Pitch reference */}
                      <td className="py-4 text-slate-300 text-right">{b.pitchName}</td>

                      {/* Hourly time window */}
                      <td className="py-4 text-slate-400 text-right">{b.time}</td>

                      {/* Pricing sum */}
                      <td className="py-4 text-emerald-400 font-bold text-right">{b.price} €</td>

                      {/* Online vs offline tracking source */}
                      <td className="py-4 text-right">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${
                          b.type === "online"
                            ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                            : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                        }`}>
                          {b.type === "online" ? d.type_online : d.type_offline}
                        </span>
                      </td>

                      {/* Current workflow status */}
                      <td className="py-4 text-right">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          b.status === "confirmed"
                            ? "bg-green-500/10 border-green-500/25 text-green-400"
                            : b.status === "cancelled"
                            ? "bg-red-500/10 border-red-500/25 text-red-400"
                            : "bg-amber-500/10 border-amber-500/25 text-amber-400"
                        }`}>
                          {b.status === "confirmed" ? d.booking_status_confirmed : b.status === "cancelled" ? d.booking_status_cancelled : d.booking_status_pending}
                        </span>
                      </td>

                      {/* Inline control triggers */}
                      <td className="py-4 text-right">
                        {b.status === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApproveBooking(b.id)}
                              className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded-lg cursor-pointer transition-colors"
                            >
                              {d.btn_approve}
                            </button>
                            <button
                              onClick={() => handleCancelBooking(b.id)}
                              className="px-3 py-1 bg-slate-800 text-red-400 rounded-lg cursor-pointer hover:bg-red-950/20 transition-colors"
                            >
                              {d.btn_cancel}
                            </button>
                          </div>
                        ) : b.status === "confirmed" ? (
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            className="text-[11px] underline text-slate-500 hover:text-red-400 cursor-pointer"
                          >
                            {language === "fr" ? "Annuler le match" : "إلغاء المباراة"}
                          </button>
                        ) : (
                          <span className="text-slate-650 italic">Closed</span>
                        )}
                      </td>

                    </tr>
                  ))}

                  {filteredBookingsList.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-500 italic">
                        {language === "fr" ? "Aucune réservation trouvée pour le terme recherché." : "لم يتم العثور على أي حجز مطابق للبحث."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: FINANCIALS & STRIPE BANK PAYOUT SETTLEMENTS */}
        {activeTab === "financials" && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* SaaS Revenue Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-2xl" />
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-green-500/15 rounded-2xl text-green-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  {d.revenue_net}
                </h4>
                <p className="text-3xl font-extrabold text-white mt-1.5 font-mono">
                  {calculations.netIncome} €
                </p>
                <span className="text-[10px] text-slate-500 block mt-2 font-mono">
                  {d.platform_cut}
                </span>
              </div>

              {/* platform fees */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-400">
                    <Sliders className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Frais de Service Commission
                </h4>
                <p className="text-2xl font-extrabold text-white mt-2 font-mono">
                  - {calculations.platformFee} €
                </p>
                <span className="text-[10px] text-slate-500 block mt-2 font-mono">
                  Taux négocié et bloqué à 12.5%
                </span>
              </div>

              {/* transferable Balance Card (Stripe Connect Widget) */}
              <div className="bg-slate-900 border-2 border-emerald-500/20 p-6 rounded-3xl relative overflow-hidden bg-gradient-to-tr from-slate-900 to-emerald-950/20">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-emerald-500/15 rounded-2xl text-emerald-400">
                    <CreditCard className="w-6 h-6 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Stripe Live
                  </span>
                </div>
                <h4 className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
                  {d.ready_payout}
                </h4>
                <p className="text-3xl font-extrabold text-white mt-2 font-mono">
                  {availableBalance} €
                </p>

                {availableBalance > 0 ? (
                  <button
                    onClick={handleInitiatePayout}
                    disabled={isPayoutProcessing}
                    className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg flex items-center justify-center gap-1.5"
                  >
                    {isPayoutProcessing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>{d.payout_progress}</span>
                      </>
                    ) : (
                      <>
                        <span>{d.initiate_payout}</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                ) : (
                  <div className="mt-4 p-3 bg-slate-950 rounded-xl text-center text-xs text-slate-500 italic">
                    {language === "fr" ? "Solde transféré ou vide" : "تم تحويل الرصيد بالكامل"}
                  </div>
                )}
              </div>

            </div>

            {/* Payout Progress Stepper Visualizer */}
            {isPayoutProcessing && (
              <div className="bg-slate-900 border border-emerald-500/10 p-5 rounded-2xl animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-emerald-400">Stripe Instant Payout Engine</span>
                  <span className="text-[10px] font-mono text-slate-500">Node Status: routing to regional gateway</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className={`h-1.5 rounded-full ${payoutProgressStep >= 1 ? "bg-emerald-500" : "bg-slate-800"}`} />
                  <div className={`h-1.5 rounded-full ${payoutProgressStep >= 2 ? "bg-emerald-500" : "bg-slate-800"}`} />
                  <div className={`h-1.5 rounded-full ${payoutProgressStep >= 3 ? "bg-emerald-500" : "bg-slate-800"}`} />
                </div>
              </div>
            )}

            {/* Historic Stripe payout records */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-base font-bold text-white mb-6">
                {d.payout_history}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono font-medium">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500">
                      <th className="pb-3 text-right">{d.payout_table_ref}</th>
                      <th className="pb-3 text-right">{d.payout_table_amount}</th>
                      <th className="pb-3 text-right">{d.payout_table_date}</th>
                      <th className="pb-3 text-right">{d.payout_table_status}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {payoutsList.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-850/40 transition-colors">
                        <td className="py-3 text-white text-right font-bold">{p.reference}</td>
                        <td className="py-3 text-right text-emerald-400 font-bold">{p.amount} €</td>
                        <td className="py-3 text-right text-slate-400">{p.date}</td>
                        <td className="py-3 text-right">
                          <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full text-[10px]">
                            {d.payout_status_success}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        )}

        {/* TAB 4: MARKETING, PROMO GENERATOR & CLIENTELE */}
        {activeTab === "marketing" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
            
            {/* Box 1: Promo Voucher creation */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Percent className="w-5 h-5 text-amber-500" />
                  <span>{d.promo_title}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {d.promo_sub}
                </p>
              </div>

              <hr className="border-slate-800 my-6" />

              <form onSubmit={handleCreateCouponSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {d.promo_code}
                  </label>
                  <input
                    type="text"
                    required
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Ex: SUNDAYREDUC"
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {d.promo_discount}
                  </label>
                  <select
                    value={promoDiscount}
                    onChange={(e) => setPromoDiscount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none cursor-pointer"
                  >
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                    <option value="20">20%</option>
                    <option value="30">30%</option>
                    <option value="50">50%</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg mt-4"
                >
                  {d.promo_create_btn}
                </button>
              </form>

            </div>

            {/* Box 2: list of generated promo coupons */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-6">
                  {d.promo_active}
                </h3>

                <div className="space-y-3.5">
                  {coupons.map((c) => (
                    <div key={c.id} className="p-4 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/15 rounded-lg text-amber-500">
                          <Percent className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-mono font-bold text-white tracking-widest">{c.code}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">USED {c.usageCount} TIMES</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-lg">
                          - {c.discount}%
                        </span>
                        
                        <button
                          onClick={() => handleDeleteCoupon(c.id)}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-500 hover:text-red-400 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {coupons.length === 0 && (
                    <div className="py-8 text-center text-slate-500 italic text-xs">
                      {d.promo_none}
                    </div>
                  )}
                </div>

              </div>

              {/* CRM Loyalty Database */}
              <div className="border-t border-slate-850 pt-5 mt-6">
                <span className="text-[10px] font-mono text-slate-500 block mb-1">STADECONNECT CRM MATRIX</span>
                <span className="text-xs text-slate-300 leading-relaxed font-sans">
                  {language === "fr" ? "Créez également des remises cumulables pour fidéliser vos clients les plus réguliers." : "العملاء الأوفياء يحصلون على رموز الخصم تلقائياً عبر الإشعارات السحابية."}
                </span>
              </div>

            </div>

          </div>
        )}

        {/* TAB 5: SENSORS MATRIX & STADIUM PULSE LIVE */}
        {activeTab === "live" && (
          <div className="space-y-6 animate-fadeIn">
            
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-500" />
                <span>{d.live_header}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {d.live_sub}
              </p>
            </div>

            {/* Grid of monitored active fields live games */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {liveMatches.map((m) => (
                <div key={m.id} className="bg-slate-900 border border-slate-850 rounded-3xl p-6 relative overflow-hidden">
                  
                  {/* Heavy mesh radar grid backing */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:25px_25px]" />

                  {/* Header info */}
                  <div className="relative z-10 flex justify-between items-center pb-4 border-b border-slate-800 mb-6">
                    <div>
                      <span className="text-xs font-bold text-white font-display">
                        {m.pitchName}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                        {d.sensor_active}
                      </span>
                    </div>

                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                  </div>

                  {/* Scoreboard visual design */}
                  <div className="relative z-10 grid grid-cols-3 items-center text-center my-6">
                    
                    {/* Team A */}
                    <div>
                      <p className="text-xs font-mono font-bold text-white truncate max-w-[120px] mx-auto">
                        {m.teamA}
                      </p>
                      <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 font-mono block mt-1">
                        TEAM HOME
                      </span>
                    </div>

                    {/* Big Score counter */}
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-4xl font-extrabold text-white tracking-widest font-mono">
                        {m.scoreA} : {m.scoreB}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-green-400 bg-green-950/20 border border-green-500/20 px-2.5 py-0.5 rounded-full mt-2.5">
                        {d.match_duration}: {m.minutesElapsed}'
                      </span>
                    </div>

                    {/* Team B */}
                    <div>
                      <p className="text-xs font-mono font-bold text-white truncate max-w-[120px] mx-auto">
                        {m.teamB}
                      </p>
                      <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 font-mono block mt-1">
                        TEAM AWAY
                      </span>
                    </div>

                  </div>

                  {/* Animated simulated radar ripple wave indicator bar */}
                  <div className="relative z-10 border-t border-slate-850/60 pt-4 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span>BANDWIDTH: 14.8 Kbps</span>
                    <span>PACKET TRANSMISSION: SEALED</span>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

      </main>
      
    </div>
  );
}
