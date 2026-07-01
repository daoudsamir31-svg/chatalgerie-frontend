import React, { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { generateMockUsers } from '../utils/images';

function NearbyUsers({ user, onClose, onChat }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(user?.city || 'Tous');

  const algerianCities = [
    'Tous', 'Alger', 'Oran', 'Constantine', 'Annaba', 'Blida',
    'Batna', 'Setif', 'Sidi Bel Abbes', 'Tizi Ouzou', 'Tlemcen',
    'Bejaia', 'Biskra', 'Chlef', 'Skikda', 'Tiaret', 'Boumerdes',
    'Msila', 'Bechar', 'Medea', 'Tebessa', 'Saida', 'El Tarf',
    'Mostaganem', 'Jijel', 'Guelma', 'Ain Temouchent', 'Relizane',
    'Laghouat', 'Ouargla', 'Bordj Bou Arreridj', 'Khenchela'
  ];

  useEffect(() => {
    setLoading(true);
    const mockUsers = generateMockUsers(20);
    setUsers(mockUsers);
    setLoading(false);
  }, []);

  const filteredUsers = users.filter(u => {
    const cityMatch = selectedCity === 'Tous' || u.city === selectedCity;
    const onlineMatch = u.online === true;
    return cityMatch && onlineMatch;
  });

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>
        <h2 style={styles.title}>📍 Utilisateurs en ligne près de vous</h2>
        <LanguageSwitcher />

        <div style={styles.filterContainer}>
          <label style={styles.filterLabel}>🏙️ Filtrer par ville:</label>
          <select 
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
            style={styles.filterSelect}
          >
            {algerianCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div style={styles.usersContainer}>
          {loading ? (
            <p style={styles.loading}>⏳ Chargement...</p>
          ) : filteredUsers.length === 0 ? (
            <p style={styles.empty}>😕 Aucun utilisateur en ligne dans cette région</p>
          ) : (
            filteredUsers.map(u => (
              <div key={u.id} style={styles.userCard}>
                <div style={styles.userAvatar}>
                  <img src={u.image} alt={u.name} style={styles.avatarImage} />
                  <span style={styles.onlineDot}></span>
                </div>
                <div style={styles.userInfo}>
                  <h3 style={styles.userName}>{u.name}, {u.age}</h3>
                  <p style={styles.userCity}>📍 {u.city}</p>
                  <p style={styles.userBio}>{u.bio}</p>
                </div>
                <button 
                  style={styles.chatBtn}
                  onClick={() => {
                    alert(`💬 Conversation avec ${u.name}`);
                    if (onChat) onChat(u);
                  }}
                >
                  💬
                </button>
              </div>
            ))
          )}
        </div>

        <div style={styles.stats}>
          <span>🟢 {filteredUsers.length} en ligne</span>
          <span>📍 {selectedCity}</span>
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
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    background: 'white',
    borderRadius: '30px',
    padding: '30px',
    maxWidth: '550px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
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
    fontSize: '1.8rem',
    background: 'linear-gradient(45deg, #FF69B4, #4A90D9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '15px',
    textAlign: 'center',
  },
  filterContainer: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  filterLabel: {
    fontWeight: 'bold',
    color: '#555',
  },
  filterSelect: {
    flex: 1,
    padding: '10px',
    borderRadius: '12px',
    border: '2px solid #ddd',
    fontSize: '1rem',
    outline: 'none',
    backgroundColor: 'white',
  },
  usersContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxHeight: '400px',
    overflowY: 'auto',
    paddingRight: '5px',
  },
  loading: {
    textAlign: 'center',
    color: '#888',
    padding: '30px 0',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    padding: '30px 0',
    fontSize: '1.1rem',
  },
  userCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    transition: 'transform 0.2s',
    border: '1px solid #eee',
  },
  userAvatar: {
    position: 'relative',
    width: '55px',
    height: '55px',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  onlineDot: {
    position: 'absolute',
    bottom: '2px',
    right: '2px',
    width: '14px',
    height: '14px',
    backgroundColor: '#4CAF50',
    borderRadius: '50%',
    border: '2px solid white',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    margin: 0,
    fontSize: '1.1rem',
    color: '#333',
  },
  userCity: {
    margin: '2px 0',
    fontSize: '0.85rem',
    color: '#888',
  },
  userBio: {
    margin: '2px 0',
    fontSize: '0.85rem',
    color: '#666',
    fontStyle: 'italic',
  },
  chatBtn: {
    background: '#FF1493',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: 'white',
    transition: 'transform 0.2s',
  },
  stats: {
    marginTop: '15px',
    padding: '12px',
    backgroundColor: '#f0f8ff',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    color: '#555',
    fontWeight: 'bold',
  },
};

export default NearbyUsers;