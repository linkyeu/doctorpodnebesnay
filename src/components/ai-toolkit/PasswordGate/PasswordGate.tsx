import { useState, useCallback } from 'react';
import styles from './PasswordGate.module.css';

const PASSWORD_HASH = '253efbf52a2797a2546e87b6a6fd1e4e86926f7a2094a0d10ac8caca24bd3dac';

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
    <div className={`${styles.gate} toolkit-scope`}>
      <div className={styles.inner}>
        <img
          className={styles.hero}
          src="/images/toolkit/illustrations/gate-hero.png"
          alt=""
          aria-hidden="true"
          width="400"
          height="225"
        />
        <h1 className={styles.title}>ШІ-помічник лікаря</h1>
        <p className={styles.subtitle}>
          Готові рішення для щоденної практики
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
            placeholder="Введіть пароль"
            autoFocus
            autoComplete="off"
          />
          {error && (
            <p className={styles.error}>Невірний пароль. Спробуйте ще раз.</p>
          )}
          <button type="submit" className={styles.button} disabled={checking || !password.trim()}>
            {checking ? 'Перевірка...' : 'Відкрити'}
          </button>
        </form>

        <p className={styles.hint}>
          Пароль у листі після оплати
        </p>
      </div>
    </div>
  );
}
