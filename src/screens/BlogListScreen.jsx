import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';
import { useLanguage } from '../context/LanguageContext';
import styles from './BlogListScreen.module.css';

export default function BlogListScreen() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <main className={styles.page}>
      {/* Header / Hero */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className={`text-label-sm ${styles.badge}`}>{t('blogList.badge')}</span>
            <h1 className={`text-headline-xl ${styles.heroTitle}`}>
              {t('blogList.heroTitle')}
            </h1>
            <p className={`text-body-lg ${styles.heroSubtitle}`}>
              {t('blogList.heroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.grid}>
            {BLOG_POSTS.map((post) => {
              const title = typeof post.title === 'object' ? post.title[language] || post.title.es : post.title;
              const excerpt = typeof post.excerpt === 'object' ? post.excerpt[language] || post.excerpt.es : post.excerpt;
              const date = typeof post.date === 'object' ? post.date[language] || post.date.es : post.date;
              const readTime = typeof post.readTime === 'object' ? post.readTime[language] || post.readTime.es : post.readTime;
              const tags = Array.isArray(post.tags) ? post.tags : (post.tags[language] || post.tags.es || []);

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
                    <div className={styles.tagsContainer}>
                      {tags.map((tag) => (
                        <span key={tag} className={styles.tagBadge}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.meta}>
                      <span>{post.author}</span>
                      <span className={styles.dot}>•</span>
                      <span>{date}</span>
                      <span className={styles.dot}>•</span>
                      <span>{readTime}</span>
                    </div>
                    <h2 className={`text-title-lg ${styles.title}`}>{title}</h2>
                    <p className={`text-body-md ${styles.excerpt}`}>{excerpt}</p>
                    <div className={styles.readLink}>
                      <span>{t('blogList.readArticle')}</span>
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
