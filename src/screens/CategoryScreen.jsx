import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryBySlug, getProductsByCategory } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import GalleryCard from '../components/GalleryCard';
import styles from './CategoryScreen.module.css';

export default function CategoryScreen() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const category = getCategoryBySlug(categorySlug);
  const products = useMemo(
    () => (category ? getProductsByCategory(category.id) : []),
    [category]
  );

  const heroProduct = useMemo(() => {
    if (products.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex];
  }, [products]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [categorySlug]);

  if (!category) {
    return (
      <main className={`container ${styles.main}`}>
        <div className={styles.emptyState}>
          <h2 className="text-headline-lg">
            {language === 'es' ? 'Categoría no encontrada' : 'Category not found'}
          </h2>
        </div>
      </main>
    );
  }

  const categoryName = typeof category.name === 'object' ? category.name[language] || category.name.es : category.name;

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
          {language === 'es' ? 'Inicio' : 'Home'}
        </button>
        <span className={styles.breadcrumbDivider}>/</span>
        <span className={`text-label-sm ${styles.breadcrumbCurrent}`}>{categoryName}</span>
      </nav>

      {/* Hero Banner */}
      {heroProduct && (
        <div className={styles.heroBanner}>
          <img
            src={heroProduct.image}
            alt={typeof heroProduct.alt === 'object' ? heroProduct.alt[language] || heroProduct.alt.es : heroProduct.alt}
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay}>
            <h1 className={`text-display-xl ${styles.heroTitle}`}>{categoryName}</h1>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <section className={styles.gridSection}>
        <h2 className={`text-headline-md ${styles.gridHeading}`}>
          {categoryName} ({products.length})
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
            <p className="text-body-lg">
              {language === 'es' ? 'No hay productos en esta categoría.' : 'No products in this category yet.'}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
