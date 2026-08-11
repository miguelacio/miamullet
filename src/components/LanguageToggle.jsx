import { useLanguage } from '../context/LanguageContext';
import styles from './LanguageToggle.module.css';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={styles.toggleContainer} role="group" aria-label="Language selection">
      <button
        id="lang-btn-es"
        className={`${styles.langBtn} ${language === 'es' ? styles.active : ''}`}
        onClick={() => setLanguage('es')}
        aria-pressed={language === 'es'}
      >
        ES
      </button>
      <span className={styles.divider}>/</span>
      <button
        id="lang-btn-en"
        className={`${styles.langBtn} ${language === 'en' ? styles.active : ''}`}
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  );
}
