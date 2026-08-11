import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/productService';
import { PRODUCTS } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import GalleryCard from './GalleryCard';
import styles from './GallerySection.module.css';

export default function GallerySection({ onSelectProduct }) {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        const data = await fetchProducts();
        if (isMounted && data && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        console.warn('Error loading products for GallerySection:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredProduct = products[0];
  const remainingProducts = products.slice(1);

  return (
    <section className={styles.section} aria-labelledby="gallery-heading">
      <div className="container">
        <header className={styles.sectionHeader}>
          <h3 id="gallery-heading" className={`text-headline-lg ${styles.heading}`}>
            {t('gallery.heading')}
          </h3>
          <p className={`text-body-md ${styles.subheading}`}>
            {t('gallery.subheading')}
          </p>
        </header>

        {featuredProduct && (
          <div className={styles.grid}>
            {/* Featured large card (8 cols) */}
            <div className={styles.gridFeatured}>
              <GalleryCard
                item={featuredProduct}
                onSelect={onSelectProduct}
              />
            </div>

            {/* Small stacked cards (4 cols) */}
            {remainingProducts.length > 0 && (
              <div className={styles.gridStack}>
                {remainingProducts.map((item) => (
                  <GalleryCard key={item.id} item={item} onSelect={onSelectProduct} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
