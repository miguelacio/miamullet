import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import styles from './GallerySection.module.css';

function GalleryCard({ item, onSelect }) {
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

export default function GallerySection({ onSelectProduct }) {
  return (
    <section className={styles.section} aria-labelledby="gallery-heading">
      <div className="container">
        <header className={styles.sectionHeader}>
          <h3 id="gallery-heading" className={`text-headline-lg ${styles.heading}`}>
            Curated Selections
          </h3>
          <p className={`text-body-md ${styles.subheading}`}>
            Discover pieces that define understated elegance, crafted for the discerning eye.
          </p>
        </header>

        <div className={styles.grid}>
          {/* Featured large card (8 cols) */}
          <div className={styles.gridFeatured}>
            <GalleryCard
              item={PRODUCTS[0]}
              onSelect={onSelectProduct}
            />
          </div>

          {/* Small stacked cards (4 cols) */}
          <div className={styles.gridStack}>
            {PRODUCTS.slice(1).map((item) => (
              <GalleryCard key={item.id} item={item} onSelect={onSelectProduct} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
