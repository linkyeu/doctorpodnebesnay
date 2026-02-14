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
            <img
              src="/photo.jpg"
              alt="Др. Люба — сімейний лікар"
              className={styles.photoImg}
            />
          </div>
          <img
            src="/images/bio-frame.png"
            alt=""
            className={styles.frame}
            aria-hidden="true"
          />
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
                <span className={styles.dot} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
