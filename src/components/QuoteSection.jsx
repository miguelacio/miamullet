import styles from './QuoteSection.module.css';

export default function QuoteSection() {
  return (
    <section className={styles.section} aria-label="Brand philosophy">
      <div className={styles.inner}>
        <span className={`material-symbols-outlined ${styles.icon}`} aria-hidden="true">
          all_inclusive
        </span>
        <blockquote className={`text-headline-lg ${styles.quote}`}>
          &ldquo;True luxury is found in the spaces between—in the deliberate pause,
          the carefully considered stitch, and the quiet confidence of form.&rdquo;
        </blockquote>
        <cite className={`text-label-sm ${styles.cite}`}>The Maison Philosophy</cite>
      </div>
    </section>
  );
}
