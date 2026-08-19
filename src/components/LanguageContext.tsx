"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

import Script from 'next/script';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  isAuto: boolean;
  setIsAuto: (auto: boolean) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<string>('en');
  const [isAuto, setIsAutoState] = useState<boolean>(true);

  useEffect(() => {
    // On load, check localStorage
    const storedLang = localStorage.getItem('user_language');
    const storedAuto = localStorage.getItem('user_language_auto');

    if (storedAuto === 'false' && storedLang) {
      setIsAutoState(false);
      setLanguageState(storedLang);
    } else {
      // Auto detect
      setIsAutoState(true);
      const browserLang = navigator.language.split('-')[0];
      if (['en', 'hi', 'es', 'fr'].includes(browserLang)) {
        setLanguageState(browserLang);
      } else {
        setLanguageState('en');
      }
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('user_language', lang);
    if (lang === 'en') {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + location.hostname;
    } else {
      document.cookie = `googtrans=/en/${lang}; path=/`;
      document.cookie = `googtrans=/en/${lang}; path=/; domain=${location.hostname}`;
    }
    window.location.reload();
  };

  const setIsAuto = (auto: boolean) => {
    setIsAutoState(auto);
    localStorage.setItem('user_language_auto', String(auto));
    if (auto) {
      const browserLang = navigator.language.split('-')[0];
      if (['en', 'hi', 'es', 'fr'].includes(browserLang)) {
        setLanguageState(browserLang);
        localStorage.setItem('user_language', browserLang);
        if (browserLang !== 'en') {
          document.cookie = `googtrans=/en/${browserLang}; path=/`;
          document.cookie = `googtrans=/en/${browserLang}; path=/; domain=${location.hostname}`;
        } else {
          document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
        window.location.reload();
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isAuto, setIsAuto }}>
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="lazyOnload" />
      <Script id="google-translate-init" strategy="lazyOnload" dangerouslySetInnerHTML={{__html: `
        function googleTranslateElementInit() {
          new google.translate.TranslateElement({pageLanguage: 'en', autoDisplay: false}, 'google_translate_element');
        }
      `}} />
      <style>{`
        .goog-te-banner-frame.skiptranslate { display: none !important; }
        body { top: 0px !important; }
        #goog-gt-tt { display: none !important; }
        .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
      `}</style>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
