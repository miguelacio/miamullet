import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GalleryCard.module.css';

export default function GalleryCard({ item, onSelect }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

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
      aria-label={`${item.title} – ${item.category}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <img
        src={item.image}
        alt={item.alt}
        className={`${styles.cardImage} ${hovered ? styles.cardImageHovered : ''}`}
      />
      <div className={styles.cardOverlay}>
        <span className={`text-label-sm ${styles.cardCategory}`}>{item.category}</span>
        <h4 className={`${item.size === 'featured' ? 'text-headline-md' : 'text-body-lg'} ${styles.cardTitle}`}>
          {item.title}
        </h4>
      </div>
    </article>
  );
}
