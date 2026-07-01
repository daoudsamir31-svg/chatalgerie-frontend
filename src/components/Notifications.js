import React, { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

function Notifications({ onClose }) {
  const [notifications] = useState([
    { id: 1, message: '❤️ Sarah a aimé votre profil!', time: 'Il y a 5 min' },
    { id: 2, message: '💬 Karim vous a envoyé un message!', time: 'Il y a 15 min' },
  ]);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>
        <h2 style={styles.title}>🔔 Notifications</h2>
        <LanguageSwitcher />
        {notifications.map(n => (
          <div key={n.id} style={styles.notification}>
            <p>{n.message}</p>
            <p style={styles.time}>{n.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999, padding: 20 },
  modal: { background: 'white', borderRadius: 30, padding: 40, maxWidth: 450, width: '100%', position: 'relative' },
  closeBtn: { position: 'absolute', top: 15, right: 20, background: 'none', border: 'none', fontSize: 30, cursor: 'pointer', color: '#999' },
  title: { fontSize: '2rem', fontWeight: 'bold', marginBottom: 10, background: 'linear-gradient(45deg, #FF69B4, #4A90D9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textAlign: 'center' },
  notification: { padding: 15, borderRadius: 12, backgroundColor: '#fafafa', marginBottom: 10, borderLeft: '4px solid #FF1493' },
  time: { fontSize: '0.8rem', color: '#999', marginTop: 5 },
};

export default Notifications;