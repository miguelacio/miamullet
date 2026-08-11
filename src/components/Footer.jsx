import styles from './Footer.module.css';

const FOOTER_LINKS = ['Brand Story', 'Sustainability', 'Journal', 'Contact', 'Terms'];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={`text-headline-md ${styles.brandName}`}>MIAMULLET</div>
          <p className={`text-body-md ${styles.copyright} ${styles.copyrightDesktop}`}>
            © 2024 MIAMULLET. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Links */}
        <nav className={styles.links} aria-label="Footer navigation">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              id={`footer-${link.toLowerCase().replace(' ', '-')}`}
              className={`text-body-md ${styles.link}`}
              onClick={(e) => e.preventDefault()}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Mobile copyright */}
        <p className={`text-body-md ${styles.copyright} ${styles.copyrightMobile}`}>
          © 2024 MIAMULLET. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
