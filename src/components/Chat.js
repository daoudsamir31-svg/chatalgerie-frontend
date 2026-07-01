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
          <div key={i} style={{ ...styles.message, alignSelf: msg.user === user.name ? 'flex-end' : 'flex-start', backgroundColor: msg.user === user.name ? '#FF69B4' : '#f0f0f0', color: msg.user === user.name ? 'white' : '#333' }}>
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
  container: { display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(135deg, #FFB6C1, #87CEEB)', padding: 20 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: 'white', borderRadius: 15, marginBottom: 20 },
  backBtn: { background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#888' },
  title: { fontSize: '1.5rem', background: 'linear-gradient(45deg, #FF69B4, #4A90D9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  messagesContainer: { flex: 1, backgroundColor: 'white', borderRadius: 20, padding: 20, maxHeight: 500, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 },
  empty: { textAlign: 'center', color: '#888', marginTop: 50 },
  message: { maxWidth: '70%', padding: 12, borderRadius: 15 },
  msgName: { fontSize: '0.8rem', fontWeight: 'bold', marginBottom: 5, color: '#666' },
  msgTime: { fontSize: '0.7rem', color: '#999', textAlign: 'right' },
  inputContainer: { display: 'flex', gap: 10, backgroundColor: 'white', padding: 10, borderRadius: 15, marginTop: 20 },
  input: { flex: 1, padding: 12, borderRadius: 10, border: '2px solid #ddd', fontSize: '1rem', outline: 'none' },
  sendBtn: { padding: '12px 20px', borderRadius: 10, border: 'none', backgroundColor: '#FF1493', color: 'white', fontSize: '1.2rem', cursor: 'pointer' },
};

export default Chat;