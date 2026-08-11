import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';
import miaRectangleLogo from '../assets/mia_rectangle.png';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { key: 'blouses', slug: 'blouses' },
  { key: 'skirts', slug: 'skirts' },
  { key: 'accessories', slug: 'accessories' },
  { key: 'blog', slug: 'blog', isBlog: true },
];

export default function Navbar({ activePage, onNavigate }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (item) => {
    if (onNavigate) {
      onNavigate(item.slug);
    } else {
      if (item.isBlog) {
        navigate('/blog');
      } else {
        navigate(`/category/${item.slug}`);
      }
    }
  };

  const handleLogoClick = () => {
    if (onNavigate) {
      onNavigate('home');
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <header className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <div className={`container ${styles.navInner}`}>
        {/* Left: Desktop nav links */}
        <nav className={styles.desktopLinks} aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              id={`nav-${item.key}`}
              className={`text-label-sm ${styles.navLink} ${activePage === item.slug ? styles.navLinkActive : ''}`}
              onClick={() => handleNavClick(item)}
            >
              {t(`nav.${item.key}`)}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-btn"
          className={styles.mobileMenuBtn}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
        </button>

        {/* Center: Brand logo */}
        <button
          id="brand-logo"
          className={styles.brand}
          onClick={handleLogoClick}
          aria-label="MIAMULLET Home"
        >
          <img src={miaRectangleLogo} alt="MIAMULLET" className={styles.brandLogo} />
        </button>

        {/* Right: Language toggle & search icon */}
        <div className={styles.trailingIcons}>
          <LanguageToggle />
          <button
            id="search-btn"
            className={styles.iconBtn}
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>

      {/* Search bar dropdown */}
      <div className={`${styles.searchBar} ${searchOpen ? styles.searchBarOpen : ''}`}>
        <div className={`container ${styles.searchBarInner}`}>
          <span className="material-symbols-outlined" style={{ color: 'var(--color-secondary)' }}>search</span>
          <input
            ref={searchRef}
            id="search-input"
            type="text"
            className={`text-body-md ${styles.searchInput}`}
            placeholder={t('nav.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
          />
          {searchQuery && (
            <button className={styles.iconBtn} onClick={() => setSearchQuery('')} aria-label={t('nav.clearSearch')}>
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav className={styles.mobileMenu} aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              id={`mobile-nav-${item.key}`}
              className={`text-label-sm ${styles.mobileLink} ${activePage === item.slug ? styles.mobileLinkActive : ''}`}
              onClick={() => { handleNavClick(item); setMobileOpen(false); }}
            >
              {t(`nav.${item.key}`)}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
