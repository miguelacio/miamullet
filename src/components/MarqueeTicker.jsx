import { useLanguage } from '../context/LanguageContext';
import styles from './MarqueeTicker.module.css';

export default function MarqueeTicker() {
  const { t } = useLanguage();

  const items = [
    t('marquee.item1'),
    t('marquee.item2'),
    t('marquee.item3'),
    t('marquee.item4'),
  ];

  // Repeat twice for seamless infinite looping
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={styles.tickerContainer} aria-hidden="true">
      <div className={styles.tickerTrack}>
        {repeatedItems.map((text, idx) => (
          <div key={idx} className={styles.tickerItem}>
            <span>{text}</span>
            <span className={styles.starDot}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
