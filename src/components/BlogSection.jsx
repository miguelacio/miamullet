import { useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';
import { useLanguage } from '../context/LanguageContext';
import styles from './BlogSection.module.css';

export default function BlogSection() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const handlePostClick = (postId) => {
    navigate(`/blog/${postId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllClick = () => {
    navigate('/blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className={styles.section} aria-labelledby="blog-section-heading">
      <div className="container">
        <header className={styles.header}>
          <div>
            <span className={`text-label-sm ${styles.categoryLabel}`}>
              {t('blogSection.categoryLabel')}
            </span>
            <h2 id="blog-section-heading" className={`text-headline-lg ${styles.heading}`}>
              {t('blogSection.heading')}
            </h2>
          </div>
          <button
            id="view-all-posts-btn"
            className={styles.viewAllBtn}
            onClick={handleViewAllClick}
          >
            <span>{t('blogSection.viewAll')}</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </header>

        <div className={styles.grid}>
          {BLOG_POSTS.map((post) => {
            const title = typeof post.title === 'object' ? post.title[language] || post.title.es : post.title;
            const excerpt = typeof post.excerpt === 'object' ? post.excerpt[language] || post.excerpt.es : post.excerpt;
            const date = typeof post.date === 'object' ? post.date[language] || post.date.es : post.date;
            const readTime = typeof post.readTime === 'object' ? post.readTime[language] || post.readTime.es : post.readTime;
            const tag = Array.isArray(post.tags) ? post.tags[0] : (post.tags[language] ? post.tags[language][0] : '');

            return (
              <article
                key={post.id}
                className={styles.card}
                onClick={() => handlePostClick(post.id)}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={post.coverImage}
                    alt={title}
                    className={styles.image}
                    loading="lazy"
                  />
                  <span className={styles.tagBadge}>{tag}</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.meta}>
                    <span>{date}</span>
                    <span className={styles.dot}>•</span>
                    <span>{readTime}</span>
                  </div>
                  <h3 className={`text-title-lg ${styles.cardTitle}`}>{title}</h3>
                  <p className={`text-body-md ${styles.cardExcerpt}`}>{excerpt}</p>
                  <div className={styles.readMore}>
                    <span>{t('blogSection.readArticle')}</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
