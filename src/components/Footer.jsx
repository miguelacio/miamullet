import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import miaRectangleLogo from '../assets/mia_rectangle.png';
import styles from './Footer.module.css';

const FOOTER_ITEMS = [
  { key: 'brandStory', isBlog: false },
  { key: 'sustainability', isBlog: false },
  { key: 'blog', isBlog: true },
  { key: 'contact', isBlog: false },
  { key: 'terms', isBlog: false },
];

export default function Footer() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLinkClick = (e, item) => {
    e.preventDefault();
    if (item.isBlog) {
      navigate('/blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <img src={miaRectangleLogo} alt="MIAMULLET" className={styles.brandLogo} />
          <p className={`text-body-md ${styles.copyright} ${styles.copyrightDesktop}`}>
            {t('footer.copyright')}
          </p>
        </div>

        {/* Links */}
        <nav className={styles.links} aria-label="Footer navigation">
          {FOOTER_ITEMS.map((item) => (
            <a
              key={item.key}
              href="#"
              id={`footer-${item.key}`}
              className={`text-body-md ${styles.link}`}
              onClick={(e) => handleLinkClick(e, item)}
            >
              {t(`footer.${item.key}`)}
            </a>
          ))}
        </nav>

        {/* Mobile copyright */}
        <p className={`text-body-md ${styles.copyright} ${styles.copyrightMobile}`}>
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
