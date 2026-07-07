import React, { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

function Filter({ onClose, onApplyFilter }) {
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(50);
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');

  const handleApply = () => {
    const filters = { ageMin: parseInt(ageMin), ageMax: parseInt(ageMax), city: city.trim(), gender: gender };
    if (onApplyFilter) onApplyFilter(filters);
    alert(`🔍 Filtres appliqués:\n📅 Âge: ${ageMin} - ${ageMax}\n📍 Ville: ${city || 'Toutes'}\n👤 Genre: ${gender === 'homme' ? 'Homme' : gender === 'femme' ? 'Femme' : 'Tous'}`);
    onClose();
  };

  const resetFilters = () => {
    setAgeMin(18);
    setAgeMax(50);
    setCity('');
    setGender('');
    alert('🔄 Filtres réinitialisés');
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>
        <h2 style={styles.title}>🔍 Filtrer</h2>
        <LanguageSwitcher />
        
        <div style={styles.group}>
          <label style={styles.label}>📅 Âge</label>
          <div style={styles.rangeContainer}>
            <input type="number" value={ageMin} onChange={(e) => setAgeMin(Math.min(Number(e.target.value), ageMax))} style={styles.rangeInput} min="18" max="99" />
            <span style={styles.rangeSeparator}>-</span>
            <input type="number" value={ageMax} onChange={(e) => setAgeMax(Math.max(Number(e.target.value), ageMin))} style={styles.rangeInput} min="18" max="99" />
          </div>
        </div>

        <div style={styles.group}>
          <label style={styles.label}>📍 Ville</label>
          <input type="text" placeholder="Toutes les villes" value={city} onChange={(e) => setCity(e.target.value)} style={styles.input} />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>👤 Genre</label>
          <div style={styles.genderContainer}>
            <button onClick={() => setGender('femme')} style={{ ...styles.genderBtn, background: gender === 'femme' ? 'var(--primary-teal)' : '#f0f0f0', color: gender === 'femme' ? 'white' : '#333', border: gender === 'femme' ? '2px solid var(--primary-teal)' : '2px solid #ddd' }}>👩 Femme</button>
            <button onClick={() => setGender('homme')} style={{ ...styles.genderBtn, background: gender === 'homme' ? 'var(--primary-dark)' : '#f0f0f0', color: gender === 'homme' ? 'white' : '#333', border: gender === 'homme' ? '2px solid var(--primary-dark)' : '2px solid #ddd' }}>👨 Homme</button>
            <button onClick={() => setGender('')} style={{ ...styles.genderBtn, background: gender === '' ? '#6C63FF' : '#f0f0f0', color: gender === '' ? 'white' : '#333', border: gender === '' ? '2px solid #6C63FF' : '2px solid #ddd' }}>🌍 Tous</button>
          </div>
        </div>

        <div style={styles.actions}>
          <button style={styles.resetBtn} onClick={resetFilters}>🔄 Réinitialiser</button>
          <button style={styles.applyBtn} onClick={handleApply}>🔍 Appliquer</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    padding: '20px',
  },
  modal: {
    background: 'white',
    borderRadius: '30px',
    padding: '35px',
    maxWidth: '450px',
    width: '100%',
    position: 'relative',
    boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
  },
  closeBtn: {
    position: 'absolute',
    top: '15px',
    right: '20px',
    background: 'none',
    border: 'none',
    fontSize: '28px',
    cursor: 'pointer',
    color: '#999',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    background: 'var(--gradient-main)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
  },
  group: { marginBottom: '20px' },
  label: { fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' },
  rangeContainer: { display: 'flex', gap: '10px', alignItems: 'center' },
  rangeInput: { flex: 1, padding: '12px', borderRadius: '10px', border: '2px solid #ddd', fontSize: '1rem', textAlign: 'center', outline: 'none', width: '80px' },
  rangeSeparator: { fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-secondary)' },
  input: { width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #ddd', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' },
  genderContainer: { display: 'flex', gap: '10px' },
  genderBtn: { flex: 1, padding: '12px', borderRadius: '10px', border: '2px solid #ddd', fontSize: '0.95rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' },
  actions: { display: 'flex', gap: '10px', marginTop: '10px' },
  resetBtn: { flex: 1, padding: '14px', borderRadius: '12px', border: '2px solid #ddd', background: 'white', color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' },
  applyBtn: { flex: 2, padding: '14px', borderRadius: '12px', border: 'none', background: 'var(--gradient-accent)', color: 'white', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 20px rgba(17, 153, 142, 0.3)' },
};

export default Filter;