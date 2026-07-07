import React, { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

function Chat({ user, onBack }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { user: user.name, message: newMessage, time: new Date().toLocaleTimeString() }]);
      setNewMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={onBack}>← Retour</button>
        <h1 style={styles.title}>💬 Chat</h1>
        <LanguageSwitcher />
      </div>
      <div style={styles.messagesContainer}>
        {messages.length === 0 ? <p style={styles.empty}>💕 Aucun message</p> : messages.map((msg, i) => (
          <div key={i} style={{ ...styles.message, alignSelf: msg.user === user.name ? 'flex-end' : 'flex-start', backgroundColor: msg.user === user.name ? 'var(--primary-teal)' : '#f0f0f0', color: msg.user === user.name ? 'white' : 'var(--text-primary)' }}>
            <p style={styles.msgName}>{msg.user}</p>
            <p>{msg.message}</p>
            <p style={styles.msgTime}>{msg.time}</p>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input type="text" placeholder="💬 Écrire..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} style={styles.input} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} />
        <button onClick={sendMessage} style={styles.sendBtn}>📤</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: 'var(--gradient-main)',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '15px',
    marginBottom: '20px',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
    fontWeight: 'bold',
  },
  title: {
    background: 'var(--gradient-main)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '1.5rem',
    fontWeight: 700,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '20px',
    maxHeight: '500px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  empty: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    marginTop: '50px',
  },
  message: {
    maxWidth: '70%',
    padding: '12px',
    borderRadius: '15px',
  },
  msgName: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: 'var(--text-secondary)',
  },
  msgTime: {
    fontSize: '0.7rem',
    color: '#999',
    textAlign: 'right',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '15px',
    marginTop: '20px',
  },
  input: {
    flex: 1,
    padding: '12px',
    borderRadius: '10px',
    border: '2px solid #ddd',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  sendBtn: {
    padding: '12px 20px',
    borderRadius: '10px',
    border: 'none',
    background: 'var(--gradient-accent)',
    color: 'white',
    fontSize: '1.2rem',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(17, 153, 142, 0.4)',
    transition: 'all 0.3s ease',
  },
};

export default Chat;