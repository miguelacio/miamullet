import { PRODUCTS } from '../data/products';
import GalleryCard from './GalleryCard';
import styles from './GallerySection.module.css';

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
