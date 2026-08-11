import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import miaRectangleLogo from '../assets/mia_rectangle.png';
import styles from './Navbar.module.css';

const NAV_LINKS = ['Blouses', 'Skirts', 'Accessories'];

export default function Navbar({ activePage, onNavigate }) {
  const navigate = useNavigate();
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

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (link) => {
    if (onNavigate) {
      onNavigate(link);
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              id={`nav-${link.toLowerCase()}`}
              className={`text-label-sm ${styles.navLink} ${activePage === link ? styles.navLinkActive : ''}`}
              onClick={() => handleNavClick(link)}
            >
              {link}
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

        {/* Right: Search icon */}
        <div className={styles.trailingIcons}>
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
            placeholder="Search pieces..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
          />
          {searchQuery && (
            <button className={styles.iconBtn} onClick={() => setSearchQuery('')} aria-label="Clear search">
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav className={styles.mobileMenu} aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              id={`mobile-nav-${link.toLowerCase()}`}
              className={`text-label-sm ${styles.mobileLink} ${activePage === link ? styles.mobileLinkActive : ''}`}
              onClick={() => { handleNavClick(link); setMobileOpen(false); }}
            >
              {link}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
