// Component unused after digital product pivot — kept for potential re-enabling
import { useState, type FormEvent } from 'react';
import styles from './EmailForm.module.css';
import { useUtmParams } from '../../../hooks/useUtmParams';

const emailFormContent = {
  heading: 'Забронюйте місце з ранньою знижкою −30%',
  subtitle:
    'Залишіть email — ми повідомимо про старт курсу та надішлемо бонус: PDF «5 ШІ-промптів для лікаря, які зекономлять годину щодня».',
  placeholder: 'ваш@email.com',
  button: 'Отримати знижку −30%',
  fomoText: 'Знижка −30% діє до 7 березня 2026',
  microtext: 'Ми не спамимо. Тільки інформація про курс та корисні матеріали.',
  successMessage: 'Дякуємо! Ми надішлемо вам деталі на email.',
  errorMessage: 'Щось пішло не так. Спробуйте ще раз.',
};

const specialtyOptions = [
  'Сімейна медицина',
  'Терапія',
  'Педіатрія',
  'Хірургія',
  'Інше',
];

export default function EmailForm() {
  const [email, setEmail] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const utm = useUtmParams();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Log to console for now — backend integration later
    console.log('Form submission:', { email, specialty, ...utm });
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <section className={styles.section} id="email-form">
        <div className={styles.container}>
          <div className={styles.successBox}>
            <p className={styles.successText}>{emailFormContent.successMessage}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} id="email-form">
      <div className={styles.container}>
        <h2 className={styles.heading}>{emailFormContent.heading}</h2>
        <p className={styles.subtitle}>{emailFormContent.subtitle}</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fields}>
            <select
              className={styles.select}
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              aria-label="Ваша спеціальність"
            >
              <option value="">Ваша спеціальність</option>
              {specialtyOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div className={styles.inputRow}>
              <input
                type="email"
                className={styles.input}
                placeholder={emailFormContent.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email"
              />
              <button type="submit" className={styles.button}>
                {emailFormContent.button}
              </button>
            </div>
          </div>
          {/* Hidden UTM fields */}
          <input type="hidden" name="utm_source" value={utm.utm_source} />
          <input type="hidden" name="utm_medium" value={utm.utm_medium} />
          <input type="hidden" name="utm_campaign" value={utm.utm_campaign} />
        </form>
        {status === 'error' && (
          <p className={styles.error}>{emailFormContent.errorMessage}</p>
        )}
        <div className={styles.fomo}>
          <span className={styles.fomoText}>{emailFormContent.fomoText}</span>
        </div>
        <p className={styles.microtext}>{emailFormContent.microtext}</p>
      </div>
    </section>
  );
}
