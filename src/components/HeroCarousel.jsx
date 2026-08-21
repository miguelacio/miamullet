import { useState, useEffect, useCallback } from 'react';
import { fetchSlides } from '../services/productService';
import { useLanguage } from '../context/LanguageContext';
import loadingVideo from '../assets/trimmed 1.mp4';
import styles from './HeroCarousel.module.css';

const FALLBACK_SLIDES = [
  {
    id: 'slide-1',
    titleKey: 'hero.slide1Title',
    subtitleKey: 'hero.slide1Subtitle',
    ctaNav: 'Blouses',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBliaydC9YNBdZ8usGINXDjcQYXPkegtA44r8atV9RL2nedwV_uP3Ikno14PJ8fNMYaSqYvCjF3zQMpYPNpCk8QUuntRvimHws2-M3WoilsDS8chMJ4K7O8z9MBboMp3XX8H6c6q5LW0dxqnAJW3fJ4FTg1bcTaAW1HdG4mFCnAFCNbG4E_WxTIsisL2xoYt2S8zgmmi974G9hE8fgkgfKTNQ-0aUqsdYOwgE3lbNXYmbvenPvoZzAK',
    alt: 'Editorial photograph of model in avant-garde blouse in minimalist studio',
  },
  {
    id: 'slide-2',
    titleKey: 'hero.slide2Title',
    subtitleKey: 'hero.slide2Subtitle',
    ctaNav: 'Skirts',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRw8pIaIoGpGJs_10KiPR0yYjv6jSgeszGwjCCiCsg584t2R7K8nHz96qv6P3yaHizQrqJ-WoNbyCf7TKVyFnsKpPAA-Rzx_BJPf-QdOR3Po9De8WWm1CD2KPzApM087Yw2MPokhZ8lqtyeqlu-i2HxV6x3XKDGNDyCu1NL0UvzSLy1a47_1qzhzZ62-KnOWmIty3RHjceF0gHQUNY5KLMy5MJmruxTTCT6Zq-4jy05T1lCENucFoB',
    alt: 'Elegant monochromatic fashion shot with flowing skirt in minimalist space',
  },
];

const AUTO_ADVANCE_MS = 5000;

export default function HeroCarousel({ onNavigate }) {
  const { t } = useLanguage();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadSlides() {
      try {
        const data = await fetchSlides();
        if (isMounted) {
          if (data && data.length > 0) {
            setSlides(data);
          } else {
            setSlides(FALLBACK_SLIDES);
          }
        }
      } catch (err) {
        console.warn('Error fetching slides from Supabase:', err);
        if (isMounted) {
          setSlides(FALLBACK_SLIDES);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadSlides();

    return () => {
      isMounted = false;
    };
  }, []);

  const goToSlide = useCallback((index) => {
    if (index === current || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 50);
  }, [current, isTransitioning]);

  useEffect(() => {
    if (loading || slides.length === 0) return;
    const timer = setInterval(() => {
      const next = (current + 1) % slides.length;
      goToSlide(next);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [current, goToSlide, loading, slides.length]);

  const handlePrev = () => {
    if (slides.length === 0) return;
    const prev = (current - 1 + slides.length) % slides.length;
    goToSlide(prev);
  };

  const handleNext = () => {
    if (slides.length === 0) return;
    const next = (current + 1) % slides.length;
    goToSlide(next);
  };

  if (loading) {
    return (
      <section className={styles.videoLoadingHero} aria-label="Loading carousel video">
        <video
          className={styles.heroVideo}
          src={loadingVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className={styles.slideOverlay} />
      </section>
    );
  }

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <section className={styles.hero} aria-label="Hero carousel">
      {/* Side Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            id="hero-prev-btn"
            className={`${styles.navArrow} ${styles.prevArrow}`}
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            id="hero-next-btn"
            className={`${styles.navArrow} ${styles.nextArrow}`}
            onClick={handleNext}
            aria-label="Next slide"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </>
      )}

      <div className={styles.slidesWrapper}>
        {slides.map((slide, idx) => {
          const slideTitle = slide.titleKey ? t(slide.titleKey) : slide.title;
          const slideSubtitle = slide.subtitleKey ? t(slide.subtitleKey) : slide.subtitle;
          const ctaText = slide.cta_text || t('hero.shopBtn');
          const targetNav = slide.cta_nav || slide.ctaNav || 'Blouses';

          return (
            <div
              key={slide.id || idx}
              className={`${styles.slide} ${idx === current ? styles.slideActive : ''}`}
              aria-hidden={idx !== current}
            >
              <img
                src={slide.image}
                alt={slide.alt || ''}
                className={styles.slideImage}
              />
              <div className={styles.slideOverlay} />
              <div className={styles.slideContent}>
                <h2 className={`text-display-xl ${styles.slideTitle}`}>{slideTitle}</h2>
                <p className={`text-body-lg ${styles.slideSubtitle}`}>{slideSubtitle}</p>
                <button
                  id={`hero-cta-${idx}`}
                  className={`text-label-sm ${styles.slideCta}`}
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate(targetNav);
                    } else {
                      const gallery = document.getElementById('gallery-heading');
                      if (gallery) {
                        gallery.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  {ctaText}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className={styles.indicators} role="tablist" aria-label="Slide indicators">
          {slides.map((slide, idx) => (
            <button
              key={slide.id || idx}
              id={`carousel-indicator-${idx}`}
              role="tab"
              aria-selected={idx === current}
              aria-label={`Go to slide ${idx + 1}`}
              className={`${styles.indicator} ${idx === current ? styles.indicatorActive : ''}`}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
