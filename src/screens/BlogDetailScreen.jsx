import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';
import { useLanguage } from '../context/LanguageContext';
import styles from './BlogDetailScreen.module.css';

export default function BlogDetailScreen() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const post = BLOG_POSTS.find((p) => p.id === postId);
  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== postId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  if (!post) {
    return (
      <main className={styles.notFoundPage}>
        <div className="container">
          <h2>{t('blogDetail.notFoundTitle')}</h2>
          <p>{t('blogDetail.notFoundText')}</p>
          <button className={styles.backBtn} onClick={() => navigate('/blog')}>
            <span className="material-symbols-outlined">arrow_back</span>
            <span>{t('blogDetail.backToBlog')}</span>
          </button>
        </div>
      </main>
    );
  }

  const title = typeof post.title === 'object' ? post.title[language] || post.title.es : post.title;
  const subtitle = typeof post.subtitle === 'object' ? post.subtitle[language] || post.subtitle.es : post.subtitle;
  const content = typeof post.content === 'object' ? post.content[language] || post.content.es : post.content;
  const date = typeof post.date === 'object' ? post.date[language] || post.date.es : post.date;
  const readTime = typeof post.readTime === 'object' ? post.readTime[language] || post.readTime.es : post.readTime;
  const tags = Array.isArray(post.tags) ? post.tags : (post.tags[language] || post.tags.es || []);

  return (
    <main className={styles.page}>
      <article className="container">
        {/* Navigation back */}
        <button
          id="back-to-blog-btn"
          className={styles.backBtn}
          onClick={() => navigate('/blog')}
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span>{t('blogDetail.backToBlog')}</span>
        </button>

        {/* Article Header */}
        <header className={styles.header}>
          <div className={styles.tagsContainer}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tagBadge}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className={`text-headline-xl ${styles.title}`}>{title}</h1>
          <p className={`text-body-lg ${styles.subtitle}`}>{subtitle}</p>

          <div className={styles.metaRow}>
            <div className={styles.authorGroup}>
              <div className={styles.authorAvatar}>
                {post.author.charAt(0)}
              </div>
              <div>
                <span className={styles.authorName}>{post.author}</span>
                <span className={styles.metaSub}>{t('blogDetail.writtenFor')}</span>
              </div>
            </div>
            <div className={styles.timeGroup}>
              <span>{date}</span>
              <span className={styles.dot}>•</span>
              <span>{readTime}</span>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className={styles.coverWrapper}>
          <img src={post.coverImage} alt={title} className={styles.coverImage} />
        </div>

        {/* Article Content */}
        <div className={styles.contentBody}>
          {content.map((paragraph, idx) => (
            <p key={idx} className={`text-body-lg ${styles.paragraph}`}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Article Footer */}
        <footer className={styles.articleFooter}>
          <div className={styles.footerTags}>
            <span className={styles.footerTagsLabel}>{t('blogDetail.tagsLabel')}</span>
            {tags.map((tag) => (
              <span key={tag} className={styles.footerTag}>
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className={styles.relatedSection}>
          <div className="container">
            <h3 className={`text-headline-lg ${styles.relatedHeading}`}>{t('blogDetail.moreStories')}</h3>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((relPost) => {
                const relTitle = typeof relPost.title === 'object' ? relPost.title[language] || relPost.title.es : relPost.title;
                const relDate = typeof relPost.date === 'object' ? relPost.date[language] || relPost.date.es : relPost.date;

                return (
                  <div
                    key={relPost.id}
                    className={styles.relatedCard}
                    onClick={() => navigate(`/blog/${relPost.id}`)}
                  >
                    <div className={styles.relatedImageWrapper}>
                      <img src={relPost.coverImage} alt={relTitle} className={styles.relatedImage} />
                    </div>
                    <div className={styles.relatedBody}>
                      <span className={styles.relatedMeta}>{relDate}</span>
                      <h4 className={styles.relatedTitle}>{relTitle}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
