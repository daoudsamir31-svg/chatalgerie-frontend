import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { login } from '../api/api';
import LanguageSwitcher from './LanguageSwitcher';

function Login({ switchToSignup, onLogin }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) return setError(t('fill_fields') || 'Veuillez remplir tous les champs');
    setLoading(true);
    setError('');
    try {
      const result = await login(email, password);
      if (result.user && result.user.age < 18) {
        setError('❌ Désolé, vous devez avoir au moins 18 ans pour utiliser Chatalgerie');
        setLoading(false);
        return;
      }
      alert(`✅ ${t('login_success')} ${result.user.name}`);
      onLogin(result.user);
    } catch (err) {
      setError(err.message || t('error') || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <LanguageSwitcher />
        <h1 style={styles.title}>💕 {t('app_name')}</h1>
        <p style={styles.subtitle}>{t('find_love')}</p>
        <p style={styles.ageWarning}>⚠️ {t('age_restriction') || 'Réservé aux +18 ans'}</p>
        <input 
          type="email" 
          placeholder={t('email')} 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={styles.input} 
        />
        <input 
          type="password" 
          placeholder={t('password')} 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={styles.input} 
        />
        {error && <p style={styles.error}>{error}</p>}
        <button onClick={handleLogin} style={styles.button}>
          {loading ? '⏳...' : `💕 ${t('login')}`}
        </button>
        <p style={styles.link} onClick={switchToSignup}>
          ✨ {t('no_account')} ✨
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'var(--gradient-main)',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 24,
    width: '100%',
    maxWidth: 400,
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: 5,
    background: 'var(--gradient-main)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    color: 'var(--text-secondary)',
    marginBottom: 5,
  },
  ageWarning: {
    color: '#FF6B6B',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 12,
    margin: '10px 0',
    borderRadius: 12,
    border: '2px solid #ddd',
    fontSize: '1rem',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: 14,
    background: 'var(--gradient-accent)',
    color: 'white',
    border: 'none',
    borderRadius: 12,
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: 10,
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(17, 153, 142, 0.4)',
  },
  link: {
    color: 'var(--primary-teal)',
    cursor: 'pointer',
    marginTop: 15,
    fontSize: '1rem',
    fontWeight: 600,
    transition: 'color 0.3s',
  },
  error: {
    color: '#FF6B6B',
    fontSize: '0.9rem',
    marginTop: 5,
  },
};

export default Login;