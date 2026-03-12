import { useState, useCallback } from 'react';
import styles from './PasswordGate.module.css';

const PASSWORD_HASH = '80ea4c9ce8a27985ea6d551619c041f247aa4c756b121d2e0a1e02656bdb224b';

async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

interface PasswordGateProps {
  onSuccess: () => void;
}

export default function PasswordGate({ onSuccess }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (checking) return;
      setChecking(true);
      setError(false);

      const hash = await sha256(password.trim());
      if (hash === PASSWORD_HASH) {
        localStorage.setItem('toolkit_auth', String(Date.now()));
        onSuccess();
      } else {
        setError(true);
        setChecking(false);
      }
    },
    [password, checking, onSuccess],
  );

  return (
    <div className={styles.gate}>
      <div className={styles.card}>
        <h1 className={styles.title}>ШI-помiчник лiкаря</h1>
        <p className={styles.subtitle}>
          Введiть пароль, який ви отримали пiсля покупки
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="password"
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Пароль"
            autoFocus
            autoComplete="off"
          />
          {error && (
            <p className={styles.error}>Невiрний пароль. Спробуйте ще раз.</p>
          )}
          <button type="submit" className={styles.button} disabled={checking || !password.trim()}>
            {checking ? 'Перевiрка...' : 'Вiдкрити довiдник'}
          </button>
        </form>

        <p className={styles.hint}>
          Забули пароль? Напишiть нам у{' '}
          <a href="https://t.me/medicalforua" target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
        </p>
      </div>
    </div>
  );
}
