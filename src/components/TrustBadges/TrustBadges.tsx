import styles from './TrustBadges.module.css';

const badges = [
  'Медична освіта',
  'Доказова медицина',
  'Міжнародні протоколи',
  '13 років досвіду',
];

export default function TrustBadges() {
  const items = [...badges, ...badges];

  return (
    <section className={styles.section}>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {items.map((label, i) => (
            <span key={i} className={styles.item}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
