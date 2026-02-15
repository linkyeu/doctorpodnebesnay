import { TELEGRAM_CHANNEL } from '../../data/links';
import { useCountUp } from '../../hooks/useCountUp';
import styles from './Community.module.css';

export default function Community() {
  const { count, ref: counterRef } = useCountUp(30000);

  return (
    <section className={styles.community} id="community">
      <div className={styles.container}>
        <div className={styles.stat} ref={counterRef}>
          <p className={styles.number}>{count.toLocaleString('uk-UA')}+</p>
          <p className={styles.label}>батьків у Telegram-спільноті</p>
          <p className={styles.description}>
            Щодня — доказові пости про здоров'я дітей, розбори випадків та
            відповіді на запитання підписників.
          </p>
          <a
            href={TELEGRAM_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.channelCta}
          >
            Приєднатися до каналу
            <span className="sr-only"> (відкриється в новій вкладці)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
