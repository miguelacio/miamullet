import { useState, useEffect } from 'react';
import { fetchSlides } from '../services/productService';
import trimmedVideo from '../assets/trimmed 1.mp4';
import styles from './AntiGridHero.module.css';

export default function AntiGridHero() {
  const [slides, setSlides] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const timers = [];

    async function loadHeroData() {
      try {
        const data = await fetchSlides();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setSlides(data);
          
          // Reveal cards sequentially every 1 second
          data.slice(0, 4).forEach((_, idx) => {
            const tId = setTimeout(() => {
              if (isMounted) {
                setVisibleCount((prev) => Math.max(prev, idx + 1));
              }
            }, (idx + 1) * 1000);
            timers.push(tId);
          });
        }
      } catch (err) {
        console.warn('Error fetching hero slides:', err);
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
