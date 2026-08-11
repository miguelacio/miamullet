import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import styles from './GalleryCard.module.css';

export default function GalleryCard({ item, onSelect }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [hovered, setHovered] = useState(false);

  const title = typeof item.title === 'object' ? item.title[language] || item.title.es : item.title;
  const category = typeof item.category === 'object' ? item.category[language] || item.category.es : item.category;
  const alt = typeof item.alt === 'object' ? item.alt[language] || item.alt.es : item.alt;

  const handleClick = () => {
    if (onSelect) {
      onSelect(item);
    } else {
      navigate(`/${item.id}`);
    }
  };

  return (
    <article
      id={`gallery-card-${item.id}`}
      className={`${styles.card} ${item.size === 'featured' ? styles.cardFeatured : styles.cardSmall}`}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${title} – ${category}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <img
        src={item.image}
        alt={alt}
        className={`${styles.cardImage} ${hovered ? styles.cardImageHovered : ''}`}
      />
      <div className={styles.cardOverlay}>
        <span className={`text-label-sm ${styles.cardCategory}`}>{category}</span>
        <h4 className={`${item.size === 'featured' ? 'text-headline-md' : 'text-body-lg'} ${styles.cardTitle}`}>
          {title}
        </h4>
      </div>
    </article>
  );
}
