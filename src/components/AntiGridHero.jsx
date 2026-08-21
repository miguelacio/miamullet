import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { fetchSlides } from '../services/productService';
import trimmedVideo from '../assets/trimmed 1.mp4';
import styles from './AntiGridHero.module.css';

const HERO_LOOKS = [
  {
    id: 'look-1',
    lookNumber: 'LOOK 01',
    titleKey: 'hero.slide1Title',
    subtitleKey: 'hero.slide1Subtitle',
    navCategory: 'blouses',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf8DpRdglknXmK29iaCfUSTeYfveK_6XFBLD4XFMWFP-jDRpW8-86FT-LouuymXKQ8wrZjagBxLKF4TEhukkqXXeYjUNVqdgu70JURc5xnScn0QTTkXBnMazMMrzWfumaS8PCvT270jgUG1B3Tif2AbiYY2IA74MkCJGmh-2uxp-WK4_EHZMrNcf-tsHJ1nfEcFJYmyro19m5aueWdIIGgXbRXClIt58FGbj2oj4OUxIoCa6E69N9l',
  },
  {
    id: 'look-2',
    lookNumber: 'LOOK 02',
    titleKey: 'hero.slide2Title',
    subtitleKey: 'hero.slide2Subtitle',
    navCategory: 'skirts',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRw8pIaIoGpGJs_10KiPR0yYjv6jSgeszGwjCCiCsg584t2R7K8nHz96qv6P3yaHizQrqJ-WoNbyCf7TKVyFnsKpPAA-Rzx_BJPf-QdOR3Po9De8WWm1CD2KPzApM087Yw2MPokhZ8lqtyeqlu-i2HxV6x3XKDGNDyCu1NL0UvzSLy1a47_1qzhzZ62-KnOWmIty3RHjceF0gHQUNY5KLMy5MJmruxTTCT6Zq-4jy05T1lCENucFoB',
  },
  {
    id: 'look-3',
    lookNumber: 'LOOK 03',
    titleKey: 'hero.slide3Title',
    subtitleKey: 'hero.slide3Subtitle',
    navCategory: 'accessories',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfaMdc4GrXPMZ-jNxHX-2XNS60ig6BLfYhdrm2T67z7ftRURxjF-K_ovIVdGZe3tmO5tEJhRXI71_nDCVs1uHh8pLautKqfgs4SQk2njbICMCQ6SBtV3jnifqIV9qqVZTSF_atEffOqNGrrfwmdkmdk_Kw4iJrKXkLmBvFcbEipOeLm6oXEUPrkgKZDcDCSyYYyVh1VREryLRNh2rpw-V-tzgkmgil1Ifp0i6HCPrvpkh2Dd-hYQh1',
  },
];

export default function AntiGridHero() {
  const { t } = useLanguage();
  const [slides, setSlides] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const timers = [];

    async function loadHeroData() {
      try {
        const data = await fetchSlides();
        const slideList = (data && data.length > 0) ? data : HERO_LOOKS;
        
        if (isMounted) {
          setSlides(slideList);
          
          // Reveal cards sequentially every 1 second
          slideList.slice(0, 4).forEach((_, idx) => {
            const tId = setTimeout(() => {
              if (isMounted) {
                setVisibleCount((prev) => Math.max(prev, idx + 1));
              }
            }, (idx + 1) * 1000);
            timers.push(tId);
          });
        }
      } catch (err) {
        console.warn('Error fetching slides:', err);
        if (isMounted) {
          setSlides(HERO_LOOKS);
          HERO_LOOKS.slice(0, 4).forEach((_, idx) => {
            const tId = setTimeout(() => {
              if (isMounted) {
                setVisibleCount((prev) => Math.max(prev, idx + 1));
              }
            }, (idx + 1) * 1000);
            timers.push(tId);
          });
        }
      }
    }

    loadHeroData();

    return () => {
      isMounted = false;
      timers.forEach((tId) => clearTimeout(tId));
    };
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const activeLook = slides[activeIndex] || HERO_LOOKS[0];
  const lookNum = activeLook.lookNumber || activeLook.look_number || `LOOK 0${activeIndex + 1}`;
  const titleText = activeLook.titleKey ? t(activeLook.titleKey) : (activeLook.title || t('hero.slide1Title'));
  const subtitleText = activeLook.subtitleKey ? t(activeLook.subtitleKey) : (activeLook.subtitle || t('hero.slide1Subtitle'));
  const navCategory = activeLook.navCategory || activeLook.cta_nav || activeLook.ctaNav || 'blouses';

  return (
    <section className={styles.heroSection}>
      {/* Background Kinetic Typography */}
      <div className={`kinetic-bg-text ${styles.bgWatermark}`}>
        MIAMULLET EDITORIAL
      </div>

      <div className={styles.fullWidthContainer}>
        <div className={styles.canvasGrid}>
          {/* Primary Visual Frame & Dynamic Elevated Cards */}
          <div className={styles.primaryFrameWrapper}>
            <div className={`vertical-text ${styles.verticalBadge}`}>
              COLLECTION 2026 — AUTUMN / WINTER
            </div>

            {/* Permanent Looping Muted Video */}
            <div className={styles.primaryFrame}>
              <video
                src={trimmedVideo}
                autoPlay
                loop
                muted
                playsInline
                className={styles.primaryVideo}
              />
            </div>

            {/* Elevated Card 1: Top Right (1st item) */}
            {slides.length >= 1 && visibleCount >= 1 && (
              <div className={styles.secondaryFrame}>
                <img
                  src={slides[0].image || slides[0].secondaryImage || slides[0].primaryImage}
                  alt="Slide 1 highlight"
                  className={styles.secondaryImage}
                />
              </div>
            )}

            {/* Elevated Card 2: Mid/Lower Left (2nd item) */}
            {slides.length >= 2 && visibleCount >= 2 && (
              <div className={styles.thirdFrame}>
                <img
                  src={slides[1].image || slides[1].primaryImage || slides[1].secondaryImage}
                  alt="Slide 2 highlight"
                  className={styles.thirdImage}
                />
              </div>
            )}

            {/* Elevated Card 3: Bottom Right (3rd item, larger size) */}
            {slides.length >= 3 && visibleCount >= 3 && (
              <div className={styles.fourthFrame}>
                <img
                  src={slides[2].image || slides[2].primaryImage || slides[2].secondaryImage}
                  alt="Slide 3 highlight"
                  className={styles.fourthImage}
                />
              </div>
            )}

            {/* Elevated Card 4: Center Left (4th item, larger size) */}
            {slides.length >= 4 && visibleCount >= 4 && (
              <div className={styles.fifthFrame}>
                <img
                  src={slides[3].image || slides[3].primaryImage || slides[3].secondaryImage}
                  alt="Slide 4 highlight"
                  className={styles.fifthImage}
                />
              </div>
            )}
          </div>

          {/* Overlapping Glassmorphic Content Card */}
          <div className={`glass-panel ${styles.contentCard}`}>
            <span className={styles.editorialTag}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>auto_awesome</span>
              {lookNum} — {t('gallery.editorialTag')}
            </span>

            <h1 className={styles.title}>{titleText}</h1>
            <p className={styles.subtitle}>{subtitleText}</p>

            <div className={styles.actionRow}>
              <Link to={`/category/${navCategory}`} className={styles.ctaBtn}>
                <span>{t('hero.shopBtn')}</span>
                <span className={`material-symbols-outlined ${styles.ctaArrow}`}>arrow_forward</span>
              </Link>
            </div>

            {/* Interactive Look Switching Pills */}
            {slides.length > 1 && (
              <div className={styles.lookSelector}>
                {slides.map((slide, idx) => {
                  const pillLabel = slide.lookNumber || slide.look_number || `LOOK 0${idx + 1}`;
                  return (
                    <button
                      key={slide.id || idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`${styles.lookPill} ${idx === activeIndex ? styles.lookPillActive : ''}`}
                    >
                      {pillLabel}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
