import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/productService';
import { PRODUCTS } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import styles from './AntiGridGallery.module.css';

export default function AntiGridGallery() {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState(PRODUCTS);

  useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        if (isMounted && data && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        console.warn('Using local fallback products:', err);
      }
    }
    loadProducts();
    return () => { isMounted = false; };
  }, []);

  const p1 = products[0] || PRODUCTS[0];
  const p2 = products[1] || PRODUCTS[1] || PRODUCTS[0];
  const p3 = products[2] || PRODUCTS[2] || PRODUCTS[0];

  const getTitle = (item) => (typeof item.title === 'object' ? item.title[language] || item.title.en : item.title);
  const getCategory = (item) => (typeof item.category === 'object' ? item.category[language] || item.category.en : item.category);

  return (
    <section className={styles.section} id="gallery">
      <div className="anti-grid-container">
        {/* Editorial Section Header */}
        <header className={styles.headerRow}>
          <div>
            <div className={styles.badgeRow}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>grid_goldenratio</span>
              <span>{t('gallery.editorialTag')}</span>
            </div>
            <h2 className={styles.heading}>{t('gallery.heading')}</h2>
          </div>
          <p className={styles.subheading}>{t('gallery.antiGridSubtitle')}</p>
        </header>

        {/* Freeform Asymmetric Canvas */}
        <div className={styles.freeformGrid}>
          {/* Card 1: Primary Large Feature (Spans 7 cols) */}
          {p1 && (
            <article className={styles.cardPrimary}>
              <Link to={`/${p1.id}`}>
                <div className={styles.imageFrame}>
                  <img
                    src={p1.images?.[0]?.url || p1.image}
                    alt={getTitle(p1)}
                    loading="lazy"
                  />
                  <div className={`glass-panel ${styles.overlayBadge}`}>
                    <div className={styles.productMeta}>
                      <span>{getCategory(p1)}</span>
                      <span>•</span>
                      <span className={styles.priceTag}>{p1.price}</span>
                    </div>
                    <h3 className={styles.productTitle}>{getTitle(p1)}</h3>
                    <span className={styles.viewBtn}>
                      {t('gallery.viewProduct')}
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          )}

          {/* Card 2: Off-Set Staggered Card (Spans 5 cols, elevated top margin) */}
          {p2 && (
            <article className={styles.cardElevated}>
              <Link to={`/${p2.id}`}>
                <div className={styles.imageFrame}>
                  <img
                    src={p2.images?.[0]?.url || p2.image}
                    alt={getTitle(p2)}
                    loading="lazy"
                  />
                  <div className={`glass-panel ${styles.overlayBadge}`}>
                    <div className={styles.productMeta}>
                      <span>{getCategory(p2)}</span>
                      <span>•</span>
                      <span className={styles.priceTag}>{p2.price}</span>
                    </div>
                    <h3 className={styles.productTitle}>{getTitle(p2)}</h3>
                    <span className={styles.viewBtn}>
                      {t('gallery.viewProduct')}
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          )}

          {/* Intersecting Editorial Quote Card (Spans 4 cols) */}
          <aside className={`dark-glass-panel ${styles.quoteIntersectCard}`}>
            <span className="material-symbols-outlined" style={{ fontSize: 28, color: 'var(--color-primary-fixed-dim)', marginBottom: 12 }}>
              format_quote
            </span>
            <blockquote className={styles.quoteText}>
              "Form follows posture; luxury lies in the quiet balance between structural clarity and weightless silk."
            </blockquote>
            <cite className={styles.quoteAuthor}>— MILANO ATELIER NOTE</cite>
          </aside>

          {/* Card 3: Wide Panoramic Feature (Spans 8 cols) */}
          {p3 && (
            <article className={styles.cardWide}>
              <Link to={`/${p3.id}`}>
                <div className={styles.imageFrame}>
                  <img
                    src={p3.images?.[0]?.url || p3.image}
                    alt={getTitle(p3)}
                    loading="lazy"
                  />
                  <div className={`glass-panel ${styles.overlayBadge}`}>
                    <div className={styles.productMeta}>
                      <span>{getCategory(p3)}</span>
                      <span>•</span>
                      <span className={styles.priceTag}>{p3.price}</span>
                    </div>
                    <h3 className={styles.productTitle}>{getTitle(p3)}</h3>
                    <span className={styles.viewBtn}>
                      {t('gallery.viewProduct')}
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
