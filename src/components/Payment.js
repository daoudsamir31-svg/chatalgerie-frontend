import React, { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

function Payment({ plan, onSuccess, onCancel }) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [showRIP, setShowRIP] = useState(false);

  // RIP الخاص بك
  const MY_RIP = '00799999000632185290';

  const prices = { monthly: 3000, yearly: 15000 };
  const price = prices[plan] || 3000;

  const sendCode = () => {
    if (phone.length < 10) return alert('📱 Numéro invalide');
    const random = Math.floor(100000 + Math.random() * 900000);
    setCode(random);
    setShowRIP(true);
    alert(
      `📲 Code envoyé à ${phone}\n` +
      `Code: ${random}\n` +
      `Montant: ${price} DA\n\n` +
      `💳 Paiement par بريدي موب:\n` +
      `📌 RIP: ${MY_RIP}\n` +
      `💰 Montant: ${price} DA\n` +
      `📝 Référence: CHAT-${Date.now()}\n\n` +
      `✅ Après paiement, entrez le code reçu`
    );
    setStep(2);
  };

  const verify = () => {
    const input = prompt('📲 Entrez le code reçu par SMS:');
    if (input === String(code)) {
      alert('✅ Paiement réussi!\n🎉 Abonnement activé!');
      onSuccess();
    } else {
      alert('❌ Code incorrect. Veuillez réessayer.');
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onCancel} style={styles.closeBtn}>✕</button>
        <h2>💳 Paiement بريدي موب</h2>
        <LanguageSwitcher />
        
        {showRIP && (
          <div style={styles.ripBox}>
            <h3>📌 Informations de paiement</h3>
            <p><strong>RIP:</strong> <span style={styles.ripNumber}>{MY_RIP}</span></p>
            <p><strong>Montant:</strong> {price} DA</p>
            <p><strong>Référence:</strong> CHAT-{Date.now()}</p>
            <p style={styles.ripNote}>📝 Envoyez le montant via بريدي موب</p>
          </div>
        )}

        <p style={styles.price}>{price} DA</p>
        
        {step === 1 ? (
          <>
            <input 
              type="tel" 
              placeholder="📱 0555123456" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              style={styles.input} 
            />
            <button onClick={sendCode} style={styles.sendBtn}>
              📲 Envoyer le code
            </button>
            <p style={styles.hint}>📌 Entrez votre numéro pour recevoir le code</p>
          </>
        ) : (
          <>
            <button onClick={verify} style={styles.verifyBtn}>
              🔑 Vérifier le code
            </button>
            <button 
              onClick={() => setShowRIP(true)} 
              style={styles.showRIPBtn}
            >
              📋 Voir le RIP
            </button>
          </>
        )}
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    background: 'white',
    borderRadius: '30px',
    padding: '40px',
    maxWidth: '450px',
    width: '100%',
    textAlign: 'center',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  closeBtn: {
    float: 'right',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#999',
  },
  price: {
    fontSize: '2.5rem',
    color: '#FF1493',
    fontWeight: 'bold',
    margin: '15px 0',
  },
  input: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: '2px solid #ddd',
    fontSize: '1rem',
    marginTop: '10px',
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  sendBtn: {
    width: '100%',
    padding: '14px',
    marginTop: '15px',
    background: 'linear-gradient(45deg, #FF6B6B, #FF1493)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    cursor: 'pointer',
  },
  verifyBtn: {
    width: '100%',
    padding: '14px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginTop: '10px',
  },
  ripBox: {
    background: '#f0f8ff',
    borderRadius: '15px',
    padding: '20px',
    margin: '15px 0',
    border: '2px solid #4A90D9',
  },
  ripNumber: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#006233',
    letterSpacing: '2px',
    wordBreak: 'break-all',
  },
  ripNote: {
    color: '#666',
    fontSize: '0.9rem',
    marginTop: '10px',
    fontStyle: 'italic',
  },
  hint: {
    color: '#888',
    fontSize: '0.8rem',
    marginTop: '8px',
  },
  showRIPBtn: {
    width: '100%',
    padding: '12px',
    marginTop: '10px',
    background: '#FFD700',
    color: '#333',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default Payment;