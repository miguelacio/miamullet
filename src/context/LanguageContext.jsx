import { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('miamullet_lang') || 'es';
  });

  useEffect(() => {
    localStorage.setItem('miamullet_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  const t = (keyPath) => {
    const keys = keyPath.split('.');
    let result = TRANSLATIONS[language];
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        // Fallback to English if translation key is missing in active language
        let fallback = TRANSLATIONS['en'];
        for (const fk of keys) {
          fallback = fallback?.[fk];
        }
        return fallback || keyPath;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
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
