import React, { useState } from 'react';
import { sendEmailCode } from '../api/api';
import LanguageSwitcher from './LanguageSwitcher';

function Verify({ user, onVerified, onBack }) {
  const [code, setCode] = useState('');
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [realCode, setRealCode] = useState('');

  const handleSendCode = async () => {
    setLoading(true);
    try {
      const result = await sendEmailCode(user.email);
      setRealCode(String(result.code));
      setMessage('📧 Code envoyé à votre email');
    } catch (error) {
      setMessage('❌ Erreur lors de l\'envoi');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = () => {
    if (code.length !== 6) {
      setMessage('❌ Le code doit contenir 6 chiffres');
      return;
    }
    
    if (code === realCode && realCode !== '') {
      setVerified(true);
      setMessage('✅ Email vérifié avec succès');
    } else {
      setMessage('❌ Code invalide. Veuillez réessayer.');
    }
  };

  const handleContinue = () => {
    if (verified) {
      onVerified();
    } else {
      setMessage('❌ Veuillez vérifier votre email');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <button style={styles.backBtn} onClick={onBack}>← Retour</button>
        <h1 style={styles.title}>🔐 Vérification</h1>
        <LanguageSwitcher />
        <p style={styles.subtitle}>Vérifiez votre adresse email</p>

        <div style={styles.verifyBox}>
          <h3>📧 Vérification Email</h3>
          <p style={styles.info}>Email: <strong>{user.email}</strong></p>
          
          <button 
            onClick={handleSendCode} 
            style={styles.sendBtn}
            disabled={loading || verified}
          >
            {verified ? '✅ Vérifié' : '📨 Envoyer le code'}
          </button>

          {!verified && (
            <div style={styles.codeInput}>
              <input
                type="text"
                placeholder="Code 6 chiffres"
                maxLength="6"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                style={styles.input}
              />
              <button 
                onClick={handleVerify} 
                style={styles.verifyBtn}
                disabled={loading}
              >
                🔑 Vérifier
              </button>
            </div>
          )}
          
          {verified && <p style={styles.verifiedText}>✅ Email vérifié avec succès</p>}
        </div>

        {message && <p style={message.includes('✅') ? styles.successMessage : styles.errorMessage}>{message}</p>}

        <button 
          onClick={handleContinue} 
          style={{
            ...styles.continueBtn,
            opacity: verified ? 1 : 0.5,
            cursor: verified ? 'pointer' : 'not-allowed'
          }}
          disabled={!verified}
        >
          {verified ? '🚀 Continuer' : '⏳ Vérification en cours...'}
        </button>
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
    background: 'linear-gradient(135deg, #FFB6C1, #87CEEB)',
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '24px',
    maxWidth: '450px',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    top: '15px',
    left: '20px',
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: '#888',
  },
  title: {
    fontSize: '2rem',
    background: 'linear-gradient(45deg, #FF69B4, #4A90D9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#888',
    marginBottom: '25px',
  },
  verifyBox: {
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    padding: '25px',
    marginBottom: '20px',
    textAlign: 'left',
  },
  info: {
    margin: '10px 0',
    color: '#555',
  },
  sendBtn: {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    background: '#4A90D9',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },
  codeInput: {
    display: 'flex',
    gap: '10px',
    marginTop: '12px',
  },
  input: {
    flex: 1,
    padding: '12px',
    borderRadius: '10px',
    border: '2px solid #ddd',
    fontSize: '1.1rem',
    textAlign: 'center',
    letterSpacing: '5px',
  },
  verifyBtn: {
    padding: '12px 20px',
    borderRadius: '10px',
    border: 'none',
    background: '#4CAF50',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  verifiedText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: '12px',
    textAlign: 'center',
  },
  errorMessage: {
    color: '#FF1493',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  successMessage: {
    color: '#4CAF50',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  continueBtn: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(45deg, #FF6B6B, #FF1493)',
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default Verify;