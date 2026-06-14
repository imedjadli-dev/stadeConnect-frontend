import React, { createContext, useContext, useState, useEffect } from "react";
import frTranslations from "../locales/fr.json";
import arTranslations from "../locales/ar.json";

type Language = "fr" | "ar";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Helper to access nested JSON keys like "navbar.pricing"
function getNestedValue(obj: any, path: string): string {
  if (!obj || !path) return path;
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    if (current[part] === undefined) {
      return path; // Fallback to key if not found
    }
    current = current[part];
  }
  return typeof current === "string" ? current : path;
}

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Default to 'fr' unless saved or browser prefers Arabic
    const saved = localStorage.getItem("stadeconnect_lang");
    if (saved === "ar" || saved === "fr") return saved;
    return "fr";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("stadeconnect_lang", lang);
  };

  const isRtl = language === "ar";

  useEffect(() => {
    // Update HTML dir and lang attributes dynamic for RTL/LTR compatibility
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = language;
    
    // Also add fonts styles depending on language for optimum beauty
    if (isRtl) {
      document.body.classList.add("font-arabic");
      document.body.classList.remove("font-latin");
    } else {
      document.body.classList.add("font-latin");
      document.body.classList.remove("font-arabic");
    }
  }, [language, isRtl]);

  const t = (key: string): string => {
    const translations = language === "ar" ? arTranslations : frTranslations;
    return getNestedValue(translations, key);
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, isRtl }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
