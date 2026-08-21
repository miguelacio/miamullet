import { useState, useEffect } from 'react';
import { fetchSlides } from '../services/productService';
import trimmedVideo from '../assets/trimmed 1.mp4';
import styles from './AntiGridHero.module.css';

const HERO_LOOKS = [
  {
    id: 'look-1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf8DpRdglknXmK29iaCfUSTeYfveK_6XFBLD4XFMWFP-jDRpW8-86FT-LouuymXKQ8wrZjagBxLKF4TEhukkqXXeYjUNVqdgu70JURc5xnScn0QTTkXBnMazMMrzWfumaS8PCvT270jgUG1B3Tif2AbiYY2IA74MkCJGmh-2uxp-WK4_EHZMrNcf-tsHJ1nfEcFJYmyro19m5aueWdIIGgXbRXClIt58FGbj2oj4OUxIoCa6E69N9l',
  },
  {
    id: 'look-2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRw8pIaIoGpGJs_10KiPR0yYjv6jSgeszGwjCCiCsg584t2R7K8nHz96qv6P3yaHizQrqJ-WoNbyCf7TKVyFnsKpPAA-Rzx_BJPf-QdOR3Po9De8WWm1CD2KPzApM087Yw2MPokhZ8lqtyeqlu-i2HxV6x3XKDGNDyCu1NL0UvzSLy1a47_1qzhzZ62-KnOWmIty3RHjceF0gHQUNY5KLMy5MJmruxTTCT6Zq-4jy05T1lCENucFoB',
  },
  {
    id: 'look-3',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfaMdc4GrXPMZ-jNxHX-2XNS60ig6BLfYhdrm2T67z7ftRURxjF-K_ovIVdGZe3tmO5tEJhRXI71_nDCVs1uHh8pLautKqfgs4SQk2njbICMCQ6SBtV3jnifqIV9qqVZTSF_atEffOqNGrrfwmdkmdk_Kw4iJrKXkLmBvFcbEipOeLm6oXEUPrkgKZDcDCSyYYyVh1VREryLRNh2rpw-V-tzgkmgil1Ifp0i6HCPrvpkh2Dd-hYQh1',
  },
];

export default function AntiGridHero() {
  const [slides, setSlides] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);

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

  return (
    <section className={styles.heroSection}>
      {/* Background Kinetic Typography */}
      <div className={`kinetic-bg-text ${styles.bgWatermark}`}>
        MIAMULLET
      </div>

      <div className={styles.fullWidthContainer}>
        <div className={styles.primaryFrameWrapper}>
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

          {/* Elevated Card 4: Top Left 30px Right (4th item, larger size) */}
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
      </div>
    </section>
  );
}
