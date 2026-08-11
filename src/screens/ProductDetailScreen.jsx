import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, PRODUCTS } from '../data/products';
import styles from './ProductDetailScreen.module.css';

const ACCORDIONS = [
  {
    id: 'care',
    title: 'Composition & Care',
    content: '100% Italian Double Georgette Silk. Dry clean only. Cool iron on reverse if needed. Do not tumble dry.',
  },
  {
    id: 'sizing',
    title: 'Sizing & Fit',
    content: 'Designed for a relaxed, fluid silhouette. Fits true to size. Model is 5\'10" (178cm) wearing size Small.',
  },
  {
    id: 'shipping',
    title: 'Shipping & Delivery',
    content: 'Complimentary express worldwide shipping on all orders over $300. Orders delivered in Signature Maison Box.',
  },
];

export default function ProductDetailScreen({ product: propProduct, onBack }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [inquireModal, setInquireModal] = useState(false);

  const product = propProduct || getProductById(productId) || PRODUCTS[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSelectedImage(0);
  }, [productId]);

  const images = product?.gallery || [];
  const title = product?.title || 'Product Detail';
  const price = product?.price || '';
  const description = product?.description || '';

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  const toggleAccordion = (id) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <main className={`container ${styles.main}`}>
      {/* Breadcrumb / Back button */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <button id="back-to-gallery-btn" onClick={handleBack} className={`text-label-sm ${styles.backBtn}`}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
          Back to Gallery
        </button>
        <span className={styles.breadcrumbDivider}>/</span>
        <span className={`text-label-sm ${styles.breadcrumbCurrent}`}>{title}</span>
      </nav>

      <div className={styles.productGrid}>
        {/* Left Column: Image Gallery */}
        <div className={styles.galleryCol}>
          {/* Main Display Image */}
          <div className={styles.mainImageWrapper}>
            <img
              src={images[selectedImage]?.url || ''}
              alt={images[selectedImage]?.alt || ''}
              className={styles.mainImage}
            />
          </div>

          {/* Thumbnail Strip */}
          <div className={styles.thumbnailStrip}>
            {images.map((img, index) => (
              <button
                key={img.id || index}
                id={`thumb-${index}`}
                className={`${styles.thumbBtn} ${selectedImage === index ? styles.thumbBtnActive : ''}`}
                onClick={() => setSelectedImage(index)}
                aria-label={`View detail image ${index + 1}`}
              >
                <img src={img.url} alt={img.alt} className={styles.thumbImage} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className={styles.infoCol}>
          <h1 className={`text-headline-lg ${styles.title}`}>{title}</h1>
          <div className={`text-body-lg ${styles.price}`}>{price}</div>
          <p className={`text-body-md ${styles.description}`}>{description}</p>

          {/* Action Buttons */}
          <div className={styles.actionSection}>
            <button
              id="where-to-buy-btn"
              className={`text-label-sm ${styles.primaryBtn}`}
              onClick={() => setInquireModal(true)}
            >
              Where to Buy
            </button>
          </div>

          {/* Accordion list */}
          <div className={styles.accordionSection}>
            {ACCORDIONS.map((acc) => {
              const isOpen = openAccordion === acc.id;
              return (
                <div key={acc.id} className={styles.accordionItem}>
                  <button
                    id={`accordion-btn-${acc.id}`}
                    className={styles.accordionHeader}
                    onClick={() => toggleAccordion(acc.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-label-sm">{acc.title}</span>
                    <span className="material-symbols-outlined">
                      {isOpen ? 'remove' : 'add'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className={styles.accordionContent}>
                      <p className="text-body-md">{acc.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {inquireModal && (
        <div className={styles.modalOverlay} onClick={() => setInquireModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className="text-headline-md">Boutique Availability</h3>
              <button className={styles.closeBtn} onClick={() => setInquireModal(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-body-md" style={{ color: 'var(--color-secondary)', marginBottom: '24px' }}>
              The {title} is available at select MAISON flagship stores worldwide.
            </p>
            <ul className={styles.storeList}>
              <li className={styles.storeItem}>
                <strong>New York Flagship</strong> — 740 Madison Ave, NY 10065
              </li>
              <li className={styles.storeItem}>
                <strong>Paris Boutique</strong> — 12 Rue du Faubourg Saint-Honoré
              </li>
              <li className={styles.storeItem}>
                <strong>Tokyo Ginza</strong> — 6-10-1 Ginza, Chuo-ku, Tokyo
              </li>
            </ul>
            <button
              className={`text-label-sm ${styles.primaryBtn}`}
              style={{ marginTop: '24px' }}
              onClick={() => setInquireModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
