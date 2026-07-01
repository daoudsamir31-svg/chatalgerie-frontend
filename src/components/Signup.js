import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { signup } from '../api/api';
import LanguageSwitcher from './LanguageSwitcher';
import Verify from './Verify';

function Signup({ switchToLogin }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ 
    name: '', email: '', password: '', gender: '', age: '', city: '', phone: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showVerify, setShowVerify] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const requiredFields = ['name', 'email', 'password', 'gender', 'age', 'city'];
    const missing = requiredFields.some(field => !form[field]);
    if (missing) return setError(t('fill_fields') || 'Veuillez remplir tous les champs obligatoires');
    
    const age = parseInt(form.age);
    if (age < 18) {
      setError('❌ Désolé, vous devez avoir au moins 18 ans pour vous inscrire');
      return;
    }
    if (age > 99) {
      setError('❌ Âge invalide');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const result = await signup({ 
        ...form, 
        age: age,
        phone: form.phone || '' 
      });
      setUserData(result.user);
      setShowVerify(true);
      alert('📧 Un code de vérification a été envoyé à votre email');
    } catch (err) {
      setError(err.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  if (showVerify && userData) {
    return <Verify 
      user={{ ...userData, phone: form.phone || 'Non renseigné' }} 
      onVerified={() => {
        alert('✅ Compte vérifié avec succès!');
        switchToLogin();
      }}
      onBack={() => setShowVerify(false)}
    />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>💕 {t('create_account')}</h1>
        <LanguageSwitcher />
        <p style={styles.subtitle}>📧 {t('verification_email') || 'Vérification par email'} • ⚠️ +18 ans requis</p>
        
        <input name="name" placeholder={`👤 ${t('name')} *`} value={form.name} onChange={handleChange} style={styles.input} />
        <input name="email" placeholder={`📧 ${t('email')} *`} value={form.email} onChange={handleChange} style={styles.input} />
        <input name="password" type="password" placeholder={`🔒 ${t('password')} *`} value={form.password} onChange={handleChange} style={styles.input} />
        <input name="age" type="number" placeholder="🎂 Âge * (18+)" value={form.age} onChange={handleChange} style={styles.input} min="18" max="99" />
        <input name="city" placeholder={`📍 ${t('city')} *`} value={form.city} onChange={handleChange} style={styles.input} />
        <input name="phone" placeholder="📱 Téléphone (optionnel)" value={form.phone} onChange={handleChange} style={styles.input} />

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setForm({ ...form, gender: 'femme' })} style={{ flex: 1, padding: 10, borderRadius: 10, background: form.gender === 'femme' ? '#FF69B4' : '#f0f0f0', color: form.gender === 'femme' ? 'white' : '#333', border: 'none', fontWeight: 'bold' }}>{t('female')}</button>
          <button onClick={() => setForm({ ...form, gender: 'homme' })} style={{ flex: 1, padding: 10, borderRadius: 10, background: form.gender === 'homme' ? '#4A90D9' : '#f0f0f0', color: form.gender === 'homme' ? 'white' : '#333', border: 'none', fontWeight: 'bold' }}>{t('male')}</button>
        </div>

        {error && <p style={styles.error}>{error}</p>}
        
        <button onClick={handleSubmit} style={styles.button} disabled={loading}>
          {loading ? '⏳...' : `💕 ${t('signup')}`}
        </button>
        
        <p style={styles.link} onClick={switchToLogin}>🔙 {t('already_account')}</p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #FFB6C1, #87CEEB)', padding: 20 },
  card: { backgroundColor: 'white', padding: 30, borderRadius: 24, maxWidth: 400, width: '100%', textAlign: 'center' },
  title: { fontSize: '2rem', background: 'linear-gradient(45deg, #FF69B4, #4A90D9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  subtitle: { color: '#888', fontSize: '0.9rem', marginBottom: 15 },
  input: { width: '100%', padding: 12, margin: '8px 0', borderRadius: 12, border: '2px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' },
  button: { width: '100%', padding: 14, background: 'linear-gradient(45deg, #FF6B6B, #FF1493)', color: 'white', border: 'none', borderRadius: 12, fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', marginTop: 10 },
  link: { color: '#4A90D9', cursor: 'pointer', marginTop: 10 },
  error: { color: 'red', fontSize: '0.9rem' },
};

export default Signup;