import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './WhenToContact.module.css';

const cards = [
  {
    title: 'В очікуванні малюка',
    description:
      'Тисяча питань і тривог — разом розберемо: харчування, аналізи, підготовку до пологів.',
    illustration: '/images/when-to-contact/pregnancy-new.webp',
    emoji: '🤰',
  },
  {
    title: 'Температура у дитини',
    description:
      'Не знаєте, коли збивати і чи потрібно взагалі? Розберемо за протоколами.',
    illustration: '/images/when-to-contact/temperature-new.webp',
    emoji: '🌡️',
  },
  {
    title: 'Введення прикорму',
    description:
      'З чого починати, коли і скільки давати — індивідуальний план для вашого малюка.',
    illustration: '/images/when-to-contact/feeding-new.webp',
    emoji: '🍎',
  },
  {
    title: 'Вакцинація',
    description:
      'Сумніви, страхи, індивідуальний графік — все обговоримо з посиланням на дослідження.',
    illustration: '/images/when-to-contact/vaccination-new.webp',
    emoji: '🛡️',
  },
  {
    title: 'Проблеми зі сном',
    description:
      'Дитина не спить, ви не спите. Розберемо причини та знайдемо рішення без «залишити плакати».',
    illustration: '/images/when-to-contact/sleep-new.webp',
    emoji: '🌙',
  },
  {
    title: 'Виховання та розвиток',
    description:
      'Істерики, кризи, межі — як реагувати, спираючись на науку, а не на «мене так виховували».',
    illustration: '/images/when-to-contact/development-new.webp',
    emoji: '🧩',
  },
  {
    title: 'Здоров\'я дорослих',
    description:
      'Аналізи чужою мовою? Незрозумілі результати обстежень? Допоможу розібратися, поясню простою мовою та дам рекомендації.',
    illustration: '/images/when-to-contact/adult-health-new.webp',
    emoji: '❤️',
  },
  {
    title: 'Ви за кордоном',
    description:
      'Переїхали й не знаєте, кому довіряти? Консультую українських батьків у будь-якій країні — зрозумілою мовою, за міжнародними протоколами.',
    illustration: '/images/when-to-contact/abroad-new.webp',
    emoji: '🌍',
  },
];

export default function WhenToContact() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setActiveCard((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.whenToContact} id="when-to-contact">
      <div className={`${styles.container} reveal`} ref={ref}>
        <h2 className={styles.heading}>Коли варто написати</h2>
        <p className={styles.subtitle}>
          Не чекайте, поки тривога переросте в паніку. Напишіть — розберемося разом.
        </p>

        <div className={styles.grid}>
          {cards.map((card, index) => {
            const isExpanded = activeCard === index;
            return (
              <button
                key={card.title}
                type="button"
                className={styles.card}
                aria-expanded={isExpanded}
                onClick={() => toggleCard(index)}
              >
                <div className={styles.illustrationWrapper}>
                  {card.illustration ? (
                    <>
                      <img
                        src={card.illustration}
                        alt=""
                        aria-hidden="true"
                        width="80"
                        height="80"
                        loading="lazy"
                        className={styles.illustration}
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling;
                          if (fallback instanceof HTMLElement) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                      <span
                        className={styles.emojiFallback}
                        aria-hidden="true"
                        style={{ display: 'none' }}
                      >
                        {card.emoji}
                      </span>
                    </>
                  ) : (
                    <span
                      className={styles.emojiFallback}
                      aria-hidden="true"
                      style={{ display: 'flex' }}
                    >
                      {card.emoji}
                    </span>
                  )}
                </div>

                <h3 className={styles.cardTitle}>{card.title}</h3>

                <div
                  className={`${styles.descriptionWrapper} ${isExpanded ? styles.expanded : ''}`}
                >
                  <p className={styles.cardDescription}>{card.description}</p>
                </div>

                <svg
                  className={`${styles.chevron} ${isExpanded ? styles.chevronRotated : ''}`}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

    </section>
  );
}
