import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import styles from './AntiGridHero.module.css';

const HERO_LOOKS = [
  {
    id: 'look-1',
    lookNumber: 'LOOK 01',
    titleKey: 'hero.slide1Title',
    subtitleKey: 'hero.slide1Subtitle',
    navCategory: 'blouses',
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBliaydC9YNBdZ8usGINXDjcQYXPkegtA44r8atV9RL2nedwV_uP3Ikno14PJ8fNMYaSqYvCjF3zQMpYPNpCk8QUuntRvimHws2-M3WoilsDS8chMJ4K7O8z9MBboMp3XX8H6c6q5LW0dxqnAJW3fJ4FTg1bcTaAW1HdG4mFCnAFCNbG4E_WxTIsisL2xoYt2S8zgmmi974G9hE8fgkgfKTNQ-0aUqsdYOwgE3lbNXYmbvenPvoZzAK',
    secondaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf8DpRdglknXmK29iaCfUSTeYfveK_6XFBLD4XFMWFP-jDRpW8-86FT-LouuymXKQ8wrZjagBxLKF4TEhukkqXXeYjUNVqdgu70JURc5xnScn0QTTkXBnMazMMrzWfumaS8PCvT270jgUG1B3Tif2AbiYY2IA74MkCJGmh-2uxp-WK4_EHZMrNcf-tsHJ1nfEcFJYmyro19m5aueWdIIGgXbRXClIt58FGbj2oj4OUxIoCa6E69N9l',
    alt: 'La Minnus Silk Blouse editorial portrait',
  },
  {
    id: 'look-2',
    lookNumber: 'LOOK 02',
    titleKey: 'hero.slide2Title',
    subtitleKey: 'hero.slide2Subtitle',
    navCategory: 'skirts',
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRw8pIaIoGpGJs_10KiPR0yYjv6jSgeszGwjCCiCsg584t2R7K8nHz96qv6P3yaHizQrqJ-WoNbyCf7TKVyFnsKpPAA-Rzx_BJPf-QdOR3Po9De8WWm1CD2KPzApM087Yw2MPokhZ8lqtyeqlu-i2HxV6x3XKDGNDyCu1NL0UvzSLy1a47_1qzhzZ62-KnOWmIty3RHjceF0gHQUNY5KLMy5MJmruxTTCT6Zq-4jy05T1lCENucFoB',
    secondaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxZ_pwzriNB0ylgTlKoS2JgTOyoK8y2iZMAzZBc4qp8uz3gilj5ce3pSGClmE701Y9sLuSVmZxHgTUGm78QDVL-IWVdY7yULtFZ4qage_DwxTb2cSmn-sBSjFm--O0b2qZp_aL3NdBkC-uPHHx0sUBc1wbPfZiDRlQbUhUOPABL1AFG1CGcVRCZOI2tV3yEQFxzJkaHvyNrpkCKDKH6GGoP_w9jqmBrz_dd01BT29P9R1nyGjn4utn',
    alt: 'Minimalist skirt organic movement editorial',
  },
  {
    id: 'look-3',
    lookNumber: 'LOOK 03',
    titleKey: 'hero.slide3Title',
    subtitleKey: 'hero.slide3Subtitle',
    navCategory: 'accessories',
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfaMdc4GrXPMZ-jNxHX-2XNS60ig6BLfYhdrm2T67z7ftRURxjF-K_ovIVdGZe3tmO5tEJhRXI71_nDCVs1uHh8pLautKqfgs4SQk2njbICMCQ6SBtV3jnifqIV9qqVZTSF_atEffOqNGrrfwmdkmdk_Kw4iJrKXkLmBvFcbEipOeLm6oXEUPrkgKZDcDCSyYYyVh1VREryLRNh2rpw-V-tzgkmgil1Ifp0i6HCPrvpkh2Dd-hYQh1',
    secondaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkBwQ7DMrb6gClUCcC3_zpCHyafbXRCM0LRPRb-0rH3hxCoBzYF8XHsZde94UyD8T50v9L0a-mdG9P0V-AodzaOA2xX9LF6UFPiNJBIPleRSpqHvFhOaA6KIFU7QuQpzq38y1TcrSi6V4lTxaFY_IvZWWneKHo0WxVHdWpcGMJBTOWQSoTWfHyofx6asZn2-kGMIcZNx0tzovPriKbd6cAPvrb6mIpxzvvy9CBBDL3Lc8c_jTZr5OS',
    alt: 'Sculptural accessories detail focus',
  },
];

export default function AntiGridHero() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_LOOKS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeLook = HERO_LOOKS[activeIndex];

  return (
    <section className={styles.heroSection}>
      {/* Background Kinetic Typography */}
      <div className={`kinetic-bg-text ${styles.bgWatermark}`}>
        MIAMULLET EDITORIAL
      </div>

      <div className="anti-grid-container">
        <div className={styles.canvasGrid}>
          {/* Primary Visual Frame & Offset Secondary Image */}
          <div className={styles.primaryFrameWrapper}>
            <div className={`vertical-text ${styles.verticalBadge}`}>
              COLLECTION 2026 — AUTUMN / WINTER
            </div>
            
            <div className={styles.primaryFrame}>
              <img
                src={activeLook.primaryImage}
                alt={activeLook.alt}
                className={styles.primaryImage}
              />
            </div>

            {/* Elevated Secondary Card */}
            <div className={styles.secondaryFrame}>
              <img
                src={activeLook.secondaryImage}
                alt="Detail close-up"
                className={styles.secondaryImage}
              />
            </div>
          </div>

          {/* Overlapping Glassmorphic Content Card */}
          <div className={`glass-panel ${styles.contentCard}`}>
            <span className={styles.editorialTag}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>auto_awesome</span>
              {activeLook.lookNumber} — {t('gallery.editorialTag')}
            </span>

            <h1 className={styles.title}>{t(activeLook.titleKey)}</h1>
            <p className={styles.subtitle}>{t(activeLook.subtitleKey)}</p>

            <div className={styles.actionRow}>
              <Link to={`/category/${activeLook.navCategory}`} className={styles.ctaBtn}>
                <span>{t('hero.shopBtn')}</span>
                <span className={`material-symbols-outlined ${styles.ctaArrow}`}>arrow_forward</span>
              </Link>
            </div>

            {/* Interactive Look Switching Pills */}
            <div className={styles.lookSelector}>
              {HERO_LOOKS.map((look, idx) => (
                <button
                  key={look.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`${styles.lookPill} ${idx === activeIndex ? styles.lookPillActive : ''}`}
                >
                  {look.lookNumber}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
