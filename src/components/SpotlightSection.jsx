import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import styles from './SpotlightSection.module.css';

export default function SpotlightSection() {
  const { t } = useLanguage();
  const [activePin, setActivePin] = useState(0);

  const hotspots = [
    {
      id: 0,
      top: '18%',
      left: '48%',
      textKey: 'spotlight.feature1',
      icon: 'strikethrough_s',
    },
    {
      id: 1,
      top: '42%',
      left: '52%',
      textKey: 'spotlight.feature2',
      icon: 'brightness_7',
    },
    {
      id: 2,
      top: '72%',
      left: '38%',
      textKey: 'spotlight.feature3',
      icon: 'architecture',
    },
  ];

  return (
    <section className={styles.section}>
      {/* Background Dim Watermark */}
      <div className={`kinetic-bg-text ${styles.bgWatermark}`}>
        CRAFT & TECHNIQUE
      </div>

      <div className="anti-grid-container">
        <div className={styles.spotlightGrid}>
          {/* Garment Image with Hotspots */}
          <div className={styles.imageContainer}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkBwQ7DMrb6gClUCcC3_zpCHyafbXRCM0LRPRb-0rH3hxCoBzYF8XHsZde94UyD8T50v9L0a-mdG9P0V-AodzaOA2xX9LF6UFPiNJBIPleRSpqHvFhOaA6KIFU7QuQpzq38y1TcrSi6V4lTxaFY_IvZWWneKHo0WxVHdWpcGMJBTOWQSoTWfHyofx6asZn2-kGMIcZNx0tzovPriKbd6cAPvrb6mIpxzvvy9CBBDL3Lc8c_jTZr5OS"
              alt="La Minnus Editorial Garment Spotlight"
              className={styles.spotlightImage}
            />

            {/* Interactive Pins */}
            {hotspots.map((pin) => (
              <button
                key={pin.id}
                style={{ top: pin.top, left: pin.left }}
                className={`${styles.hotspotPin} ${activePin === pin.id ? styles.hotspotPinActive : ''}`}
                onClick={() => setActivePin(pin.id)}
                aria-label={`Highlight feature ${pin.id + 1}`}
              >
                <div className={styles.hotspotPulse} />
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                  {activePin === pin.id ? 'check' : 'add'}
                </span>
              </button>
            ))}
          </div>

          {/* Info & Detail Highlights */}
          <div className={styles.infoCard}>
            <span className={styles.badge}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>insights</span>
              {t('spotlight.badge')}
            </span>

            <h2 className={styles.title}>{t('spotlight.title')}</h2>
            <p className={styles.description}>{t('spotlight.subtitle')}</p>

            {/* Interactive Features List */}
            <div className={styles.featureList}>
              {hotspots.map((pin) => (
                <div
                  key={pin.id}
                  onClick={() => setActivePin(pin.id)}
                  className={`${styles.featureItem} ${activePin === pin.id ? styles.featureItemActive : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <span className={`material-symbols-outlined ${styles.featureIcon}`}>
                    {pin.icon}
                  </span>
                  <span className={styles.featureText}>{t(pin.textKey)}</span>
                </div>
              ))}
            </div>

            <Link to="/minnus" className={styles.ctaLink}>
              <span>{t('spotlight.exploreBtn')}</span>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
