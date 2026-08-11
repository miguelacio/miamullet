import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryBySlug, getProductsByCategory } from '../data/products';
import GalleryCard from '../components/GalleryCard';
import styles from './CategoryScreen.module.css';

export default function CategoryScreen() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const category = getCategoryBySlug(categorySlug);
  const products = useMemo(
    () => (category ? getProductsByCategory(category.name) : []),
    [category]
  );

  // Pick a random product for the hero image (stable per mount)
  const heroProduct = useMemo(() => {
    if (products.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex];
  }, [products]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [categorySlug]);

  // If category slug is invalid, redirect home
  if (!category) {
    return (
      <main className={`container ${styles.main}`}>
        <div className={styles.emptyState}>
          <h2 className="text-headline-lg">Category not found</h2>
          <p className="text-body-md" style={{ marginTop: '16px' }}>
            The category you're looking for doesn't exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className={`container ${styles.main}`}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <button
          id="back-to-home-btn"
          onClick={() => navigate('/')}
          className={`text-label-sm ${styles.backBtn}`}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
          Home
        </button>
        <span className={styles.breadcrumbDivider}>/</span>
        <span className={`text-label-sm ${styles.breadcrumbCurrent}`}>{category.name}</span>
      </nav>

      {/* Hero Banner */}
      {heroProduct && (
        <div className={styles.heroBanner}>
          <img
            src={heroProduct.image}
            alt={heroProduct.alt}
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay}>
            <h1 className={`text-display-xl ${styles.heroTitle}`}>{category.name}</h1>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <section className={styles.gridSection}>
        <h2 className={`text-headline-md ${styles.gridHeading}`}>
          All {category.name} ({products.length})
        </h2>

        {products.length > 0 ? (
          <div className={styles.productGrid}>
            {products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <GalleryCard item={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p className="text-body-lg">No products in this category yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}
