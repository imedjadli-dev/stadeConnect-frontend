import React, { useState, useMemo } from "react";
import { useTranslation } from "../context/TranslationContext";
import {
  Search,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Wifi,
  Car,
  Award,
  Users,
  CheckCircle,
  Clock,
  ChevronRight,
  Filter,
  DollarSign,
  Smartphone,
  Check,
  X,
  CreditCard,
  Flame,
  Star,
  Tv,
  Utensils,
  Footprints,
  SlidersHorizontal,
  ThumbsUp,
  AlertCircle
} from "lucide-react";

// Bilingual translating resources to maintain premium look in both languages
const componentTranslations = {
  fr: {
    section_tag: "EXPLOREZ NOTRE RÉSEAU",
    section_title: "Trouvez le terrain idéal près de chez vous",
    section_sub: "Découvrez des complexes de football d'élite dotés de technologies connectées StadeConnect. Réservez un créneau en quelques clics.",
    search_placeholder: "Rechercher par nom, ville, quartier...",
    filter_all_cities: "Toutes les villes",
    filter_all_surfaces: "Toutes les surfaces",
    filter_amenities: "Équipements & Services",
    price_range: "Tarif max (€/h)",
    stadiums_found: "{count} complexes sportifs disponibles",
    no_stadiums_found: "Aucun stade ne correspond à vos critères de recherche.",
    reset_filters: "Réinitialiser les filtres",
    
    // Card labels
    rating: "Étoiles",
    reviews: "Avis",
    per_hour: "h",
    surface_lbl: "Surface",
    book_now: "Réserver ce terrain",
    features: "Équipements",
    
    // Booking modal labels
    book_title: "Récupération de votre créneau - {name}",
    book_subtitle: "Configurez votre match, personnalisez les options et réservez instantanément.",
    select_pitch: "Étape 1 : Choisir le Terrain",
    select_time: "Étape 2 : Sélectionner l'Horaire d'Aujourd'hui",
    select_extras: "Étape 3 : Services & Extras (Optionnel)",
    select_split: "Étape 4 : Division de Facture & Copains (Split Payment)",
    select_payment: "Étape 5 : Paiement Sécurisé Stripe",
    
    // Extras
    extra_video: "Enregistrement vidéo HD du match (+15 €)",
    extra_video_desc: "Caméras automatisées avec résumé vidéo et statistiques live.",
    extra_shoes: "Location de chasubles & ballons (+10 €)",
    extra_shoes_desc: "Chasubles propres et 2 ballons officiels Nike Flight.",
    extra_ref: "Arbitre officiel StadeConnect (+20 €)",
    extra_ref_desc: "Un arbitre certifié pour encadrer votre match avec rigueur.",
    extra_water: "Pack hydratation (+12 €)",
    extra_water_desc: "12 bouteilles d'eau mineralisée fraîche et gourdes.",

    // Split payment
    split_toggle: "Activer le paiement partagé (Diviser l'addition)",
    split_desc: "Invitez jusqu'à 9 amis. Chacun recevra un lien unique pour régler sa part. Votre réservation est bloquée dès que vous payez votre acompte.",
    friend_email: "E-mail de l'ami #{num}",
    your_share: "Votre part à payer maintenant :",
    friends_share: "Part pour chaque ami :",
    
    // Payment form
    card_holder: "Nom sur la carte",
    card_number: "Numéro de carte bancaire",
    card_expiry: "Date d'expiration",
    card_cvc: "Code CVC",
    pay_btn: "Confirmer et Payer {amount} €",
    payment_processing: "Traitement de la caution sécurisée...",
    payment_success: "Votre réservation a été validée avec succès ! Le QR code d'accès au complexe a été envoyé sur votre mobile.",
    payment_success_subtitle: "Un email contenant les liens de partage a été envoyé à vos coéquipiers.",
    download_receipt: "Télécharger le reçu fiscal",
    close: "Fermer la fenêtre",
    
    // Interactive time slots
    vacant: "Disponible",
    occupied: "Complet",
    
    // Amenities list translation
    wifi: "Wi-Fi Gratuit",
    parking: "Parking Sécurisé",
    shower: "Douches & Vestiaires",
    cafe: "Cafétéria / Snack",
    lighting: "Éclairage Nocturne Pro",
    tribune: "Tribunes spectateurs"
  },
  ar: {
    section_tag: "استكشف شبكة الملاعب الكبرى",
    section_title: "ابحث عن الملعب المثالي الأقرب إليك",
    section_sub: "اكتشف مجمعات كرة القدم المتميزة المزودة بأنظمة تكنولوجية متصلة بمنصة إستاد كونكت. احجز حصتك الرياضية مباشرة الآن.",
    search_placeholder: "ابحث باسم الملعب، المدينة، الحي الرقمي...",
    filter_all_cities: "كل المدن والمحافظات",
    filter_all_surfaces: "جميع أنواع العشب",
    filter_amenities: "المرافق والخدمات المتاحة",
    price_range: "السعر الأقصى بالساعة (€)",
    stadiums_found: "{count} مجمع رياضي متاح حالياً",
    no_stadiums_found: "لم نجد أي ملعب يطابق خيارات البحث الحالية الخاص بك.",
    reset_filters: "إعادة ضبط الفلاتر",
    
    // Card labels
    rating: "التقييم",
    reviews: "تقييمات",
    per_hour: "ساعة",
    surface_lbl: "الأرضية",
    book_now: "احجز هذا الملعب فوراً",
    features: "المرافق والامتيازات",
    
    // Booking modal labels
    book_title: "تأمين وحجز حِصتك - {name}",
    book_subtitle: "قم بتهيئة مواصفات المباراة، أضف الخدمات الإضافية، وادفع بشكل آمن ومبتكر.",
    select_pitch: "الخطوة 1: تحديد أرضية الملعب",
    select_time: "الخطوة 2: تحديد موعد اللعب اليوم",
    select_extras: "الخطوة 3: الخدمات والخيارات الملحقة (اختياري)",
    select_split: "الخطوة 4: تفعيل الدفع المشترك وتقسيم الحساب",
    select_payment: "الخطوة 5: بوابة الدفع الآمنة Stripe Connect",
    
    // Extras
    extra_video: "تسجيل HD وتصوير جوي للمباراة (+15 €)",
    extra_video_desc: "كاميرات ذكية تسجل المباراة بالكامل مع توليد ملخص لأبرز الأهداف.",
    extra_shoes: "كراء كرات رسمية وصدريات ملونة (+10 €)",
    extra_shoes_desc: "صدريات معقمة وكرات نايكي المعتمدة للمباريات.",
    extra_ref: "حكم معتمد من منصة كونكت (+20 €)",
    extra_ref_desc: "حكم مؤهل لإدارة وتسيير اللقاء الرياضي بكل روح رياضية.",
    extra_water: "باقة ترطيب وتبريد المياه (+12 €)",
    extra_water_desc: "12 قارورة ماء معدني مبرد لتعزيز طاقة اللاعبين.",

    // Split payment
    split_toggle: "تفعيل تقسيم الفاتورة (الدفع الجماعي بين الأصدقاء)",
    split_desc: "يمكنك دعوة حتى 9 لاعبين. سيتلقى كل صديق رابطًا مخصصًا لدفع حصته. يتم تأكيد الحجز فور تسديد الدفعة الأولى الخاص بك بمثابة وديعة حجز.",
    friend_email: "البريد الإلكتروني للصديق #{num}",
    your_share: "حصتك للدفع الآن:",
    friends_share: "حصة كل صديق:",
    
    // Payment form
    card_holder: "اسم صاحب البطاقة",
    card_number: "رقم البطاقة الائتمانية",
    card_expiry: "تاريخ انتهاء الصلاحية",
    card_cvc: "رمز الأمان خلف البطاقة",
    pay_btn: "تأكيد وتحويل {amount} €",
    payment_processing: "جاري تأمين المعاملة المالية وحجز الملعب بالكامل...",
    payment_success: "تهانينا! تم تأكيد وتفعيل حجزك بنجاح. تم إرسال رمز QR الخاص بك للملعب على رقم هاتفك المحمول تلقائيًا.",
    payment_success_subtitle: "تم إرسال بريد إلكتروني يحتوي على روابط تقسيم الدفع لكافة اللاعبين.",
    download_receipt: "تنزيل وإصدار الفاتورة الرسمية",
    close: "إغلاق النافذة",
    
    // Interactive time slots
    vacant: "متاح",
    occupied: "محجوز",
    
    // Amenities list translation
    wifi: "إنترنت مجاني سريع",
    parking: "موقف سيارات محروس",
    shower: "حمامات وغرف تبديل الملابس",
    cafe: "مقهى ومشروبات رياضية",
    lighting: "إضاءة ليلية احترافية",
    tribune: "مدرجات لجمهور الفريقين"
  }
};

// High-fidelity Mock Stadiums Database
const stadiumDatabase = [
  {
    id: "stadium_1",
    name: "Carthage Football Club VIP",
    city: "Tunis",
    area: "Les Berges du Lac 2",
    rating: 4.9,
    reviewsCount: 142,
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop",
    surfaces: ["Synthestic", "Pelouse Naturelle"],
    cheapestPrice: 70,
    pitches: [
      { id: "s1_p1", name: "Terrain Pro Elite - 4G", surface: "Synthestic", price: 80 },
      { id: "s1_p2", name: "Lakeside Sand Cage", surface: "Indoor", price: 60 },
      { id: "s1_p3", name: "Olympic Natural Grass", surface: "Pelouse Naturelle", price: 110 }
    ],
    amenities: ["wifi", "parking", "shower", "cafe", "lighting", "tribune"],
    bestFor: "Competitions et Matchs de Gala",
    bestForAr: "البطولات والمباريات الاحتفالية",
    isPopular: true
  },
  {
    id: "stadium_2",
    name: "Marseille Foot Five Arena",
    city: "Marseille",
    area: "Prado / Le Rouet",
    rating: 4.8,
    reviewsCount: 98,
    imageUrl: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=600&auto=format&fit=crop",
    surfaces: ["Indoor", "Synthestic"],
    cheapestPrice: 65,
    pitches: [
      { id: "s2_p1", name: "Indoor Pitch A - Velodrome View", surface: "Indoor", price: 90 },
      { id: "s2_p2", name: "Outdoor Classic 5vs5", surface: "Synthestic", price: 65 }
    ],
    amenities: ["wifi", "parking", "shower", "cafe", "lighting"],
    bestFor: "Match amical rapide après le travail",
    bestForAr: "مباريات ودية سريعة بعد العمل",
    isPopular: true
  },
  {
    id: "stadium_3",
    name: "Camp des Aigles Premium complex",
    city: "Paris",
    area: "Neuilly-sur-Seine",
    rating: 4.9,
    reviewsCount: 215,
    imageUrl: "https://images.unsplash.com/photo-1575361204480-aadea2d107a9?q=80&w=600&auto=format&fit=crop",
    surfaces: ["Pelouse Naturelle", "Synthestic"],
    cheapestPrice: 100,
    pitches: [
      { id: "s3_p1", name: "L'Arène Royale SG", surface: "Pelouse Naturelle", price: 140 },
      { id: "s3_p2", name: "Underground Cage 5vos5", surface: "Indoor", price: 100 }
    ],
    amenities: ["wifi", "parking", "shower", "cafe", "lighting", "tribune"],
    bestFor: "Ambiance Ultra Professionnelle",
    bestForAr: "تجربة اللعب الاحترافية الكاملة",
    isPopular: true
  },
  {
    id: "stadium_4",
    name: "Olympic Dome Sousse Foot",
    city: "Sousse",
    area: "Kantaoui Marina",
    rating: 4.7,
    reviewsCount: 74,
    imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6edd1d141d?q=80&w=600&auto=format&fit=crop",
    surfaces: ["Synthestic"],
    cheapestPrice: 50,
    pitches: [
      { id: "s4_p1", name: "Sousse Beachfront Arena 1", surface: "Synthestic", price: 50 },
      { id: "s4_p2", name: "Sousse Beachfront Arena 2", surface: "Synthestic", price: 50 }
    ],
    amenities: ["parking", "shower", "cafe", "lighting"],
    bestFor: "Jeux sous le coucher de soleil",
    bestForAr: "مباريات ممتعة وقت غروب الشمس",
    isPopular: false
  },
  {
    id: "stadium_5",
    name: "Sfax Soccer Center",
    city: "Sfax",
    area: "Route de Teniour",
    rating: 4.6,
    reviewsCount: 51,
    imageUrl: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=600&auto=format&fit=crop",
    surfaces: ["Synthestic", "Indoor"],
    cheapestPrice: 45,
    pitches: [
      { id: "s5_p1", name: "Sfax Center - Court 1", surface: "Synthestic", price: 45 },
      { id: "s5_p2", name: "Sfax Center - Court 2 (Indoor)", surface: "Indoor", price: 60 }
    ],
    amenities: ["wifi", "parking", "shower", "lighting"],
    bestFor: "Entraînement tactique et physique",
    bestForAr: "تطوير المهارات التكتيكية واللياقة البدنية",
    isPopular: false
  },
  {
    id: "stadium_6",
    name: "El Menzah Soccer Club",
    city: "Tunis",
    area: "El Menzah 1",
    rating: 4.8,
    reviewsCount: 119,
    imageUrl: "https://images.unsplash.com/photo-1504156069813-w2e2329d7583?q=80&w=600&auto=format&fit=crop",
    surfaces: ["Pelouse Naturelle", "Synthestic"],
    cheapestPrice: 55,
    pitches: [
      { id: "s6_p1", name: "Terrain Historique Menzah", surface: "Pelouse Naturelle", price: 85 },
      { id: "s6_p2", name: "Futsal Menzah Cage 1", surface: "Synthestic", price: 55 }
    ],
    amenities: ["wifi", "parking", "shower", "lighting", "tribune"],
    bestFor: "Matchs inter-quartiers animés",
    bestForAr: "مباريات الأحياء التنافسية الحماسية",
    isPopular: false
  }
];

export default function StadiumList() {
  const { language, isRtl } = useTranslation();

  // Selected language translation shortcuts
  const d = useMemo(() => {
    return language === "ar" ? componentTranslations.ar : componentTranslations.fr;
  }, [language]);

  // Filtering criteria states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedSurface, setSelectedSurface] = useState("all");
  const [maxPrice, setMaxPrice] = useState(150);
  
  // Custom facilities filter toggles
  const [filterWifi, setFilterWifi] = useState(false);
  const [filterParking, setFilterParking] = useState(false);
  const [filterShower, setFilterShower] = useState(false);
  const [filterLighting, setFilterLighting] = useState(false);

  // Deep interactive booking states
  const [bookingStadium, setBookingStadium] = useState<any>(null);
  const [selectedPitch, setSelectedPitch] = useState<any>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  // Services extra toggles
  const [extraVideo, setExtraVideo] = useState(false);
  const [extraShoes, setExtraShoes] = useState(false);
  const [extraRef, setExtraRef] = useState(false);
  const [extraWater, setExtraWater] = useState(false);

  // Friends split states
  const [isSplitEnabled, setIsSplitEnabled] = useState(false);
  const [friendEmails, setFriendEmails] = useState<string[]>(["", ""]);

  // Checkout simulation states
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [reservationCode, setReservationCode] = useState("");

  // Time slots for interactive reservation
  const availableHours = ["16:00 - 17:30", "17:30 - 19:00", "19:00 - 20:30", "20:30 - 22:00", "22:00 - 23:30", "23:30 - 01:00"];

  // Filter computation logic
  const filteredStadiums = useMemo(() => {
    return stadiumDatabase.filter((stadium) => {
      // 1. Search Query text validation
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        stadium.name.toLowerCase().includes(query) ||
        stadium.city.toLowerCase().includes(query) ||
        stadium.area.toLowerCase().includes(query);

      // 2. City Filter
      const matchesCity = selectedCity === "all" || stadium.city === selectedCity;

      // 3. Surface type Filter
      const matchesSurface =
        selectedSurface === "all" || stadium.surfaces.includes(selectedSurface);

      // 4. Pricing boundaries
      const matchesPrice = stadium.cheapestPrice <= maxPrice;

      // 5. Amenities checklists
      if (filterWifi && !stadium.amenities.includes("wifi")) return false;
      if (filterParking && !stadium.amenities.includes("parking")) return false;
      if (filterShower && !stadium.amenities.includes("shower")) return false;
      if (filterLighting && !stadium.amenities.includes("lighting")) return false;

      return matchesSearch && matchesCity && matchesSurface && matchesPrice;
    });
  }, [searchQuery, selectedCity, selectedSurface, maxPrice, filterWifi, filterParking, filterShower, filterLighting]);

  // Open booking modal
  const handleOpenBooking = (stadium: any) => {
    setBookingStadium(stadium);
    setSelectedPitch(stadium.pitches[0]); // Defaut to first pitch
    setSelectedTimeSlot("");
    setExtraVideo(false);
    setExtraShoes(false);
    setExtraRef(false);
    setExtraWater(false);
    setIsSplitEnabled(false);
    setCardHolder("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    setIsProcessingPayment(false);
    setIsPaymentConfirmed(false);
  };

  // Pricing calculation inside modal
  const bookingPrices = useMemo(() => {
    if (!selectedPitch) return { total: 0, myShare: 0, friendShare: 0 };
    
    let base = selectedPitch.price;
    if (extraVideo) base += 15;
    if (extraShoes) base += 10;
    if (extraRef) base += 20;
    if (extraWater) base += 12;

    const friendlyEmailsFiltered = friendEmails.filter(email => email.trim().length > 0);
    const playerCount = 1 + (isSplitEnabled ? friendlyEmailsFiltered.length : 0);

    const total = base;
    const friendShare = isSplitEnabled ? Math.round((total / playerCount) * 10) / 10 : 0;
    const myShare = isSplitEnabled ? total - (friendShare * (playerCount - 1)) : total;

    return {
      total,
      myShare: Math.round(myShare * 10) / 10,
      friendShare
    };
  }, [selectedPitch, extraVideo, extraShoes, extraRef, extraWater, isSplitEnabled, friendEmails]);

  // Add friend field for split billing helper
  const addFriendField = () => {
    if (friendEmails.length < 9) {
      setFriendEmails([...friendEmails, ""]);
    }
  };

  const removeFriendField = (index: number) => {
    if (friendEmails.length > 1) {
      const updated = [...friendEmails];
      updated.splice(index, 1);
      setFriendEmails(updated);
    }
  };

  const handleFriendEmailChange = (index: number, val: string) => {
    const updated = [...friendEmails];
    updated[index] = val;
    setFriendEmails(updated);
  };

  // Reset filter values
  const handleReset = () => {
    setSearchQuery("");
    setSelectedCity("all");
    setSelectedSurface("all");
    setMaxPrice(150);
    setFilterWifi(false);
    setFilterParking(false);
    setFilterShower(false);
    setFilterLighting(false);
  };

  // Submit checkout simulation
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTimeSlot) {
      alert(language === "fr" ? "Veuillez sélectionner un horaire de match." : "سجل تحديد موعد اللقاء أولاً.");
      return;
    }

    setIsProcessingPayment(true);
    
    // Generate a unique high-fidelity reservation code
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const num = Math.floor(1000 + Math.random() * 9000);
    const randChar = letters.charAt(Math.floor(Math.random() * letters.length));
    const generatedCode = `SC-KICK-${num}-${randChar}`;
    setReservationCode(generatedCode);

    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsPaymentConfirmed(true);

      // Save to localStorage so it syncs with active bookings in the owner dashboard!
      try {
        const storedBookings = localStorage.getItem("stadeconnect_bookings");
        let bookingList = [];
        if (storedBookings) {
          bookingList = JSON.parse(storedBookings);
        }

        const newOnlineBooking = {
          id: "b_online_" + Date.now(),
          bookingCode: generatedCode,
          customerName: cardHolder.trim() || (language === "fr" ? "Joueur StadeConnect" : "لاعب ستاد كونكت"),
          customerPhone: "+33 6 12 34 56 78",
          customerEmail: "player@stadeconnect.io",
          pitchId: selectedPitch?.id || "p1",
          pitchName: selectedPitch?.displayName || selectedPitch?.name || "Terrain Elite",
          time: selectedTimeSlot,
          price: bookingPrices.total,
          type: "online",
          status: "confirmed",
          date: "Today",
          stadiumName: bookingStadium.name
        };

        bookingList = [newOnlineBooking, ...bookingList];
        localStorage.setItem("stadeconnect_bookings", JSON.stringify(bookingList));
      } catch (err) {
        console.error("Failed to write reservation to localStorage", err);
      }
    }, 3000);
  };

  return (
    <section id="stadiums_section" className="pb-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      
      {/* Visual background details */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-green-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-24">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-wider text-green-700 bg-green-100/70 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            {d.section_tag}
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none">
            {d.section_title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {d.section_sub}
          </p>
        </div>

        {/* Filters and Stadiums listing layout container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT: Filters Panel */}
          <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm h-fit sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4.5 h-4.5 text-green-600" />
                <span>{language === "fr" ? "Filtres de recherche" : "فلاتر وتصنيفات الملاعب"}</span>
              </h3>
              <button
                onClick={handleReset}
                className="text-[11px] font-bold text-green-600 hover:text-green-700 hover:underline transition-all cursor-pointer"
              >
                {d.reset_filters}
              </button>
            </div>

            {/* Input Search Text */}
            <div className="mb-6">
              <label className="block text-[11px] font-display font-extrabold uppercase tracking-wide text-slate-500 mb-2">
                {language === "fr" ? "Filtrer par texte" : "بحث سريع بالاسم"}
              </label>
              <div className="relative">
                <Search className={`absolute inset-y-0 ${isRtl ? "right-3.5 left-auto" : "left-3.5 right-auto"} my-auto w-4 h-4 text-slate-400`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={d.search_placeholder}
                  className={`w-full outline-none bg-slate-50 border border-slate-200/80 focus:border-green-500 rounded-xl py-2.5 ${isRtl ? "pr-10 pl-3" : "pl-10 pr-3"} text-xs text-slate-800 placeholder-slate-400 transition-all`}
                />
              </div>
            </div>

            {/* City Selector */}
            <div className="mb-6">
              <label className="block text-[11px] font-display font-extrabold uppercase tracking-wide text-slate-500 mb-2">
                {language === "fr" ? "Ville" : "المدينة"}
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-green-500 cursor-pointer"
              >
                <option value="all">{d.filter_all_cities}</option>
                <option value="Tunis">Tunis (تونس العاصمة)</option>
                <option value="Marseille">Marseille (مارسيليا)</option>
                <option value="Paris">Paris (باريس)</option>
                <option value="Sousse">Sousse (سوسة)</option>
                <option value="Sfax">Sfax (صفاقس)</option>
              </select>
            </div>

            {/* Surface Select */}
            <div className="mb-6">
              <label className="block text-[11px] font-display font-extrabold uppercase tracking-wide text-slate-500 mb-2">
                {d.surface_lbl}
              </label>
              <select
                value={selectedSurface}
                onChange={(e) => setSelectedSurface(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-green-500 cursor-pointer"
              >
                <option value="all">{d.filter_all_surfaces}</option>
                <option value="Synthestic">Gazon Synthétique</option>
                <option value="Pelouse Naturelle">Pelouse Pro</option>
                <option value="Indoor">Indoor (Futsal)</option>
              </select>
            </div>

            {/* Range pricing bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] font-display font-extrabold uppercase tracking-wide text-slate-500">
                  {d.price_range}
                </label>
                <span className="text-xs font-mono font-bold text-green-700">{maxPrice} €</span>
              </div>
              <input
                type="range"
                min="40"
                max="150"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-green-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Custom Amenities Filter Toggles */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <span className="block text-[11px] font-display font-extrabold uppercase tracking-wide text-slate-500 mb-1">
                {d.filter_amenities}
              </span>

              {[
                { label: d.wifi, state: filterWifi, setState: setFilterWifi, icon: <Wifi className="w-3.5 h-3.5" /> },
                { label: d.parking, state: filterParking, setState: setFilterParking, icon: <Car className="w-3.5 h-3.5" /> },
                { label: d.shower, state: filterShower, setState: setFilterShower, icon: <Footprints className="w-3.5 h-3.5" /> },
                { label: d.lighting, state: filterLighting, setState: setFilterLighting, icon: <Flame className="w-3.5 h-3.5" /> }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => item.setState(!item.state)}
                  className="w-full flex items-center justify-between text-left py-1 text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  style={{ textAlign: isRtl ? "right" : "left" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                    item.state ? "bg-green-600 border-green-600 text-white" : "bg-slate-50 border-slate-200"
                  }`}>
                    {item.state && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT: Stadium Cards Grid list */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Headers statistics for stadiums */}
            <div className="flex justify-between items-center bg-slate-100/70 border border-slate-200/50 p-4 rounded-2xl">
              <span className="text-xs font-bold text-slate-700">
                {d.stadiums_found.replace("{count}", filteredStadiums.length.toString())}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-white border border-slate-150 px-3 py-1 rounded-full">
                {language === "fr" ? "Réservation Directe Stripe" : "حجز مباشر متصل بـ Stripe"}
              </span>
            </div>

            {/* Stadium Grid list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStadiums.map((stadium) => (
                <div
                  key={stadium.id}
                  className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col group"
                >
                  
                  {/* Photo area with popular tags */}
                  <div className="h-52 relative overflow-hidden bg-slate-100">
                    <img
                      src={stadium.imageUrl}
                      alt={stadium.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-all"
                    />
                    
                    {/* Dark gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    {stadium.isPopular && (
                      <span className="absolute top-4 left-4 bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 font-sans font-black text-[9px] uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        <span>{language === "fr" ? "Sélection Elite" : "خيار النخبة الغالي"}</span>
                      </span>
                    )}

                    <span className="absolute top-4 right-4 bg-slate-900/85 backdrop-blur-md text-white font-mono font-bold text-[10px] px-3 py-1 rounded-full border border-white/10">
                      📍 {stadium.city}
                    </span>

                    {/* Quick Badge Details bottom of photo */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div>
                        <span className="text-[10px] text-green-400 bg-green-950/80 backdrop-blur-sm border border-green-500/20 rounded font-mono font-black px-2 py-0.5 uppercase tracking-wide">
                          {language === "fr" ? stadium.bestFor : stadium.bestForAr}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-800">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{stadium.rating}</span>
                        <span className="text-slate-400 text-[10px]">({stadium.reviewsCount})</span>
                      </div>
                    </div>

                  </div>

                  {/* Body textual specs */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-display text-lg font-bold text-slate-900 group-hover:text-green-700 transition-colors">
                            {stadium.name}
                          </h4>
                          <span className="text-xs text-slate-500 flex items-center gap-1 mt-1 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{stadium.area}, {stadium.city}</span>
                          </span>
                        </div>
                      </div>

                      {/* Pitch list brief summary */}
                      <div className="mt-4 bg-slate-50 rounded-2xl p-3.5 border border-slate-100 flex justify-between items-center">
                        <div>
                          <span className="text-[9px] text-slate-400 block tracking-wider uppercase font-extrabold">{language === "fr" ? "Terrains disponibles" : "أرضيات الملاعب المتاحة"}</span>
                          <span className="text-xs font-bold text-slate-700 mt-0.5 block">{stadium.pitches.length} {language === "fr" ? "Pelouses" : "مساحات مختلفة"}</span>
                        </div>

                        <div className="text-right">
                          <span className="text-[9px] text-slate-400 block tracking-wider uppercase font-extrabold">{language === "fr" ? "À partir de" : "تبدأ من"}</span>
                          <span className="text-sm font-mono font-bold text-green-700 mt-0.5 block">{stadium.cheapestPrice} € / {d.per_hour}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features checklist and checkout Action button */}
                    <div className="mt-6">
                      
                      {/* Icons representation */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {stadium.amenities.map((amenity) => {
                          let name = "";
                          if (amenity === "wifi") name = d.wifi;
                          if (amenity === "parking") name = d.parking;
                          if (amenity === "shower") name = name = d.shower;
                          if (amenity === "cafe") name = d.cafe;
                          if (amenity === "lighting") name = d.lighting;
                          if (amenity === "tribune") name = d.tribune;

                          return (
                            <span
                              key={amenity}
                              className="text-[9px] font-bold text-slate-505 text-slate-600 bg-slate-100 border border-slate-200/50 px-2 py-0.5 rounded flex items-center gap-1"
                            >
                              {amenity === "wifi" && <Wifi className="w-2.5 h-2.5 text-slate-500" />}
                              {amenity === "parking" && <Car className="w-2.5 h-2.5 text-slate-500" />}
                              {amenity === "shower" && <Footprints className="w-2.5 h-2.5 text-slate-500" />}
                              {amenity === "cafe" && <Utensils className="w-2.5 h-2.5 text-slate-500" />}
                              {amenity === "lighting" && <Flame className="w-2.5 h-2.5 text-slate-500" />}
                              {amenity === "tribune" && <Tv className="w-2.5 h-2.5 text-slate-500" />}
                              <span>{name}</span>
                            </span>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => handleOpenBooking(stadium)}
                        className="w-full py-3 bg-slate-900 group-hover:bg-green-600 transition-all duration-300 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{d.book_now}</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-all" />
                      </button>

                    </div>

                  </div>

                </div>
              ))}

              {filteredStadiums.length === 0 && (
                <div className="col-span-full py-16 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-300 p-8">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-4">
                    <Search className="w-6 h-6" />
                  </div>
                  <p className="text-slate-600 font-bold text-sm">
                    {d.no_stadiums_found}
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg cursor-pointer shadow"
                  >
                    {language === "fr" ? "Afficher tous les stades" : "عرض جميع الملاعب بدون شروط"}
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* MODAL: STADECONNECT PRESTIGE BOOKING SIMULATOR */}
      {bookingStadium && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 relative shadow-2xl animate-scaleUp text-slate-800">
            
            {/* Close trigger */}
            <button
              onClick={() => setBookingStadium(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Custom Modal Header */}
            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded inline-block font-mono mb-2">
                🏠 StadeConnect Booking System
              </span>
              <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
                {d.book_title.replace("{name}", bookingStadium.name)}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {d.book_subtitle}
              </p>
            </div>

            <hr className="border-slate-100 mb-6" />

            {/* Modal Body: Completed Simulation */}
            {isPaymentConfirmed ? (
              <div className="text-center py-6 animate-fadeIn max-w-sm mx-auto">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                
                <h4 className="text-base font-black text-slate-900">
                  {language === "fr" ? "Réservation Confirmée !" : "تم تأكيد الحجز بنجاح !"}
                </h4>
                
                <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                  {language === "fr" 
                    ? "Votre caution est validée. Présentez le pass ci-dessous au propriétaire à votre arrivée au stade."
                    : "تم تأمين الحجز والملعب جاهز للقاء! يرجى إبراز بطاقة الدخول المرفقة أدناه لمالك الملعب عند وصولكم."}
                </p>

                {/* GORGEOUS DIGITAL ACCESS TICKET / MATCH PASS */}
                <div className="relative bg-white border border-slate-200/80 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 my-6 overflow-hidden text-left font-sans">
                  
                  {/* Decorative Ticket Side Notches */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-slate-100 border border-slate-205 shadow-inner" style={{ transform: "translateY(-50%)" }} />
                  <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-slate-100 border border-slate-205 shadow-inner" style={{ transform: "translateY(-50%)" }} />

                  {/* Header */}
                  <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-5 py-3.5 text-white flex justify-between items-center">
                    <div>
                      <span className="text-[10px] uppercase font-black tracking-widest text-green-300 block">StadeConnect®</span>
                      <span className="text-xs font-black tracking-tight block">PASS ACCÈS MATCH</span>
                    </div>
                    <div className="px-2 py-0.5 bg-white/20 rounded-full border border-white/20 text-[9px] font-bold tracking-wider">
                      {language === "fr" ? "RÉSERVÉ" : "مؤكد"}
                    </div>
                  </div>

                  {/* Main Ticket Info */}
                  <div className="p-5 space-y-3.5 text-xs text-slate-600">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">COMPLEXE / STADIUM</span>
                      <span className="text-slate-900 font-black text-sm tracking-tight">{bookingStadium.name}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">TERRAIN / PITCH</span>
                        <span className="text-slate-850 font-extrabold">{selectedPitch?.name || "Terrain Principal"}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">HORAIRE / TIME</span>
                        <span className="text-slate-850 font-bold font-mono text-[11px] text-green-700">{selectedTimeSlot}</span>
                      </div>
                    </div>

                    <hr className="border-dashed border-slate-200" />

                    <div>
                      <span className="text-[9px] text-indigo-500 font-black tracking-wider block text-center mb-1">
                        {language === "fr" ? "CODE DE VÉRIFICATION DU PROPRIÉTAIRE" : "رمز تأشير الدخول السريع للمالك"}
                      </span>
                      
                      {/* Interactive Copyable Code Box */}
                      <div className="flex gap-1.5 items-center bg-slate-50 border border-slate-200 rounded-xl p-2.5 justify-between">
                        <span className="font-mono text-sm font-black text-slate-900 tracking-wider">
                          {reservationCode}
                        </span>
                        
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(reservationCode);
                            alert(language === "fr" ? "Code copié dans le presse-papiers !" : "تم نسخ الرمز بنجاح !");
                          }}
                          className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1 shrink-0"
                        >
                          {language === "fr" ? "Copier" : "نسخ"}
                        </button>
                      </div>
                    </div>

                    {/* Dynamic Barcode element */}
                    <div className="pt-2 text-center">
                      <div className="flex items-center justify-center gap-[1.5px] h-10 w-full bg-slate-50 p-1.5 rounded-lg border border-slate-150 overflow-hidden">
                        {[...Array(32)].map((_, i) => (
                          <div
                            key={i}
                            className="bg-slate-900 rounded-sm"
                            style={{
                              width: i % 3 === 0 ? "3px" : i % 5 === 0 ? "1px" : i % 2 === 0 ? "2px" : "1.5px",
                              height: "100%",
                              opacity: i % 7 === 2 ? 0.35 : 1
                            }}
                          />
                        ))}
                      </div>
                      <span className="font-mono text-[9px] text-slate-400 mt-1 block tracking-widest">{reservationCode}</span>
                    </div>

                    {/* Warning detail */}
                    <p className="text-[9px] text-slate-500 leading-normal text-center mt-1">
                      {language === "fr"
                        ? "⚠️ Présentez ce pass d'accès numérique au gérant du complexe dès votre arrivée pour activer le capteur de terrain."
                        : "⚠️ يرجى إظهار الرمز عند البوابة الرياضية لمالك المجمع لتمرير الحضور للمباراة والبدء الفوري."}
                    </p>

                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <button
                    onClick={() => {
                      alert(language === "fr" 
                        ? `Reçu Téléchargé [${reservationCode}]\nComplexe: ${bookingStadium.name}\nTarif: ${bookingPrices.myShare} €`
                        : `تم تنزيل الفاتورة الاستخدامية [${reservationCode}]\nالملعب: ${bookingStadium.name}\nالمبلغ: ${bookingPrices.myShare} €`);
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl cursor-pointer transition-colors"
                  >
                    {d.download_receipt}
                  </button>
                  <button
                    onClick={() => setBookingStadium(null)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow transition-all animate-pulse"
                  >
                    {d.close}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-6 text-xs max-h-[60vh] overflow-y-auto pr-2">
                
                {/* STEP 1: Pitch Select */}
                <div>
                  <span className="block font-bold text-slate-900 uppercase tracking-wider mb-2 font-display text-[10px]">
                    {d.select_pitch}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {bookingStadium.pitches.map((pitch: any) => (
                      <button
                        key={pitch.id}
                        type="button"
                        onClick={() => setSelectedPitch(pitch)}
                        className={`p-3.5 rounded-xl border text-center transition-all flex flex-col justify-between h-20 ${
                          selectedPitch?.id === pitch.id
                            ? "bg-green-50 border-green-600 text-green-700"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                        }`}
                      >
                        <span className="font-bold text-[11px] font-display truncate w-full">{pitch.name}</span>
                        <span className="font-mono text-xs font-bold block mt-1">{pitch.price} € / {d.per_hour}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* STEP 2: Time Slot grid */}
                <div>
                  <span className="block font-bold text-slate-900 uppercase tracking-wider mb-2 font-display text-[10px]">
                    {d.select_time}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableHours.map((hour) => {
                      const isOccupied = hour === "19:00 - 20:30" || hour === "23:30 - 01:00"; // Mock occupancy stats
                      const isSelected = selectedTimeSlot === hour;

                      return (
                        <button
                          key={hour}
                          type="button"
                          disabled={isOccupied}
                          onClick={() => setSelectedTimeSlot(hour)}
                          className={`p-3.5 rounded-xl border text-center transition-all flex flex-col justify-between h-16 ${
                            isOccupied
                              ? "bg-slate-100 border-slate-150 text-slate-400 cursor-not-allowed opacity-60"
                              : isSelected
                              ? "bg-green-600 border-green-600 text-white"
                              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
                          }`}
                        >
                          <span className="font-mono font-bold text-[11px] block">{hour.split(" - ")[0]}</span>
                          <span className="text-[9px] uppercase tracking-wider mt-0.5 block opacity-80 font-bold">
                            {isOccupied ? d.occupied : d.vacant}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 3: Extras Toggles */}
                <div>
                  <span className="block font-bold text-slate-900 uppercase tracking-wider mb-2 font-display text-[10px]">
                    {d.select_extras}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {[
                      { state: extraVideo, setState: setExtraVideo, label: d.extra_video, desc: d.extra_video_desc },
                      { state: extraShoes, setState: setExtraShoes, label: d.extra_shoes, desc: d.extra_shoes_desc },
                      { state: extraRef, setState: setExtraRef, label: d.extra_ref, desc: d.extra_ref_desc },
                      { state: extraWater, setState: setExtraWater, label: d.extra_water, desc: d.extra_water_desc }
                    ].map((ext, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => ext.setState(!ext.state)}
                        className={`p-3.5 rounded-xl border text-left flex gap-3 items-start transition-all cursor-pointer ${
                          ext.state
                            ? "bg-green-50 border-green-600/60"
                            : "bg-slate-50 border-slate-200/60 hover:bg-slate-100"
                        }`}
                        style={{ textAlign: isRtl ? "right" : "left" }}
                      >
                        <div className={`w-4 h-4 rounded border mt-0.5 flex-shrink-0 flex items-center justify-center ${
                          ext.state ? "bg-green-600 border-green-600 text-white" : "bg-white border-slate-300"
                        }`}>
                          {ext.state && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <div>
                          <span className="font-bold text-slate-850 block leading-tight">{ext.label}</span>
                          <span className="text-[10px] text-slate-500 mt-0.5 block leading-normal">{ext.desc}</span>
                        </div>
                      </button>
                    ))}

                  </div>
                </div>

                {/* STEP 4: Split billing (division) */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 uppercase tracking-wider font-display text-[10px]">
                      {d.select_split}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsSplitEnabled(!isSplitEnabled)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                        isSplitEnabled
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-slate-650 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {isSplitEnabled ? "ACTIVE" : "DISABLED"}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500 mb-3 leading-relaxed">
                    {d.split_desc}
                  </p>

                  {isSplitEnabled && (
                    <div className="space-y-2 pt-2 border-t border-slate-200/60 animate-fadeIn">
                      {friendEmails.map((email, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <input
                            type="email"
                            value={email}
                            required
                            onChange={(e) => handleFriendEmailChange(index, e.target.value)}
                            placeholder={d.friend_email.replace("{num}", (index + 1).toString()) + " (ex: ali@stade.com)"}
                            className="bg-white border border-slate-205 border-slate-200 rounded-lg px-3 py-1.5 text-[11px] outline-none text-slate-800 focus:border-green-500 flex-grow"
                          />
                          {friendEmails.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFriendField(index)}
                              className="p-1 px-2.5 text-red-500 bg-red-50 rounded hover:bg-red-100 text-xs font-bold font-sans cursor-pointer"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}

                      {friendEmails.length < 9 && (
                        <button
                          type="button"
                          onClick={addFriendField}
                          className="mt-2 text-[10px] font-bold text-green-700 hover:underline cursor-pointer flex items-center gap-1"
                        >
                          + {language === "fr" ? "Ajouter un autre coéquipier" : "إضافة لاعب مشارك آخر"}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Pricing totals HUD */}
                <div className="bg-green-900 text-white rounded-2xl p-4.5 font-mono flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <span className="text-[10px] opacity-80 block font-sans">{language === "fr" ? "MONTANT TOTAL DU MATCH" : "المبلغ الإجمالي للمباراة"}</span>
                    <span className="text-xl font-bold">{bookingPrices.total} €</span>
                  </div>

                  {isSplitEnabled ? (
                    <div className="flex gap-4">
                      <div className="py-1 px-3 bg-white/10 rounded-lg">
                        <span className="text-[9px] block opacity-95 text-green-300 font-sans">{d.your_share}</span>
                        <span className="text-sm font-bold text-white">{bookingPrices.myShare} €</span>
                      </div>
                      <div className="py-1 px-3 bg-white/10 rounded-lg">
                        <span className="text-[9px] block opacity-95 text-green-300 font-sans">{d.friends_share}</span>
                        <span className="text-sm font-bold text-white">{bookingPrices.friendShare} € <span className="text-[9px]">/ p</span></span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[10px] opacity-90 block max-w-xs leading-tight font-sans">
                      {language === "fr" ? "Facturation classique. Payer l'intégralité du créneau aujourd'hui." : "حساب الفاتورة المعتاد لشخص واحد لتأمين وحجز الملعب كاملاً."}
                    </div>
                  )}
                </div>

                {/* STEP 5: Payment card details form */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <span className="block font-bold text-slate-900 uppercase tracking-wider mb-2 font-display text-[10px] flex items-center gap-1.5">
                    <CreditCard className="w-4.5 h-4.5 text-slate-650 text-slate-500" />
                    <span>{d.select_payment}</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">
                        {d.card_holder}
                      </label>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="Zinedine Zidane"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">
                        {d.card_number}
                      </label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="••••  ••••  ••••  4242"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-green-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">
                        {d.card_expiry}
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM / YY"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-green-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">
                        {d.card_cvc}
                      </label>
                      <input
                        type="text"
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        maxLength={3}
                        placeholder="CVC"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-green-500 font-mono"
                      />
                    </div>

                  </div>

                  {/* Warning advice security disclaimer */}
                  <div className="flex gap-2 p-3 bg-blue-50 text-blue-800 border border-blue-100 rounded-xl leading-relaxed text-[10px] items-start mt-2">
                    <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>
                      {language === "fr" 
                        ? "Système d'arrhes sécurisé. Vous ne serez débité de la totalité du créneau que si vos coéquipiers ne règlent pas leur part de paiement sous 12h." 
                        : "نظام حجز وتأمين موثوق. سيتم سحب الكلفة بالكامل فقط في حال عجز أصدقائك عن دفع حصصهم الملحقة قبل مرور 12 ساعة."}
                    </span>
                  </div>
                </div>

                {/* Confirm Pay Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessingPayment || !selectedTimeSlot}
                  className={`w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-green-600/10 hover:shadow-green-600/20 active:scale-95 flex items-center justify-center gap-2 mt-4 ${
                    (!selectedTimeSlot) ? "opacity-40 cursor-not-allowed" : ""
                  }`}
                >
                  {isProcessingPayment ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{d.payment_processing}</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>{d.pay_btn.replace("{amount}", bookingPrices.myShare.toString())}</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
