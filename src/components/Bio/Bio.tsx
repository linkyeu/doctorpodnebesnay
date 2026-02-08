import styles from './Bio.module.css';

export default function Bio() {
  const credentials = [
    'Сімейний лікар вищої категорії',
    '12 років клінічного досвіду',
    'Доказова медицина та міжнародні протоколи',
    'Мама доньки — розумію вас як ніхто',
  ];

  return (
    <section className={styles.bio} id="about">
      <div className={styles.container}>
        {/* Photo placeholder */}
        <div className={styles.photoWrapper}>
          <div className={styles.photo}>
            <div className={styles.photoPlaceholder}>
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="40" cy="30" r="14" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M16 68c0-13.255 10.745-24 24-24s24 10.745 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span>Фото</span>
            </div>
          </div>
          {/* Botanical frame decoration */}
          <svg
            className={styles.frame}
            viewBox="0 0 300 300"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M30 150C30 80 80 30 150 30C220 30 270 80 270 150C270 220 220 270 150 270C80 270 30 220 30 150Z"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.15"
            />
            <path
              d="M20 150C20 74 74 20 150 20"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.1"
            />
            <path
              d="M150 280C226 280 280 226 280 150"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.1"
            />
            {/* Small leaf accents */}
            <path
              d="M40 100C35 90 38 78 48 75C42 85 44 95 40 100Z"
              fill="currentColor"
              opacity="0.08"
            />
            <path
              d="M260 200C265 210 262 222 252 225C258 215 256 205 260 200Z"
              fill="currentColor"
              opacity="0.08"
            />
          </svg>
        </div>

        {/* Text content */}
        <div className={styles.content}>
          <h2 className={styles.heading}>Лікар Люба</h2>
          <p className={styles.role}>Сімейний лікар · Науковий навігатор батьківства</p>

          <p className={styles.text}>
            Я — Люба, сімейний лікар з 12-річним досвідом та мама чудової доньки.
            Моя місія — допомогти батькам приймати впевнені рішення, спираючись на
            сучасну доказову медицину, а не на страхи та застарілі поради.
          </p>
          <p className={styles.text}>
            Кожна родина унікальна, і мій підхід — це індивідуальний план, що
            враховує саме вашу ситуацію. Жодних універсальних рецептів — тільки
            наука, емпатія та здоровий глузд.
          </p>

          <ul className={styles.credentials}>
            {credentials.map((item) => (
              <li key={item} className={styles.credentialItem}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                  className={styles.leafIcon}
                >
                  <path
                    d="M9 16C9 16 3 11 3 7C3 3 9 1 9 1C9 1 15 3 15 7C15 11 9 16 9 16Z"
                    fill="var(--color-primary)"
                    opacity="0.2"
                  />
                  <path
                    d="M9 14V3"
                    stroke="var(--color-primary)"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
