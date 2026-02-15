import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Bio.module.css';

export default function Bio() {
  const ref = useScrollReveal<HTMLDivElement>();

  const credentials = [
    'Сімейний лікар вищої категорії',
    '12 років клінічного досвіду',
    'Доказова медицина та міжнародні протоколи',
    'Мама доньки — розумію вас як ніхто',
  ];

  return (
    <section className={styles.bio} id="about">
      <div className={`${styles.container} reveal`} ref={ref}>
        {/* Photo */}
        <div className={styles.photoWrapper}>
          <div className={styles.photo}>
            <img
              src="/photo.jpg"
              alt="Др. Люба — сімейний лікар"
              className={styles.photoImg}
            />
          </div>
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
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  className={styles.checkIcon}
                >
                  <circle cx="10" cy="10" r="9" fill="var(--color-text-muted)" opacity="0.15" />
                  <path
                    d="M6 10l3 3 5-6"
                    stroke="var(--color-text-muted)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
