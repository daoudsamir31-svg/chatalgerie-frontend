import React, { useState } from 'react';
import Payment from './Payment';
import LanguageSwitcher from './LanguageSwitcher';

function Subscription({ onSubscribe, onClose, user }) {
  const [plan, setPlan] = useState(null);
  const [pay, setPay] = useState(false);

  const plans = [
    { id: 'monthly', name: '💕 Mensuel', price: '3,000 DA', value: 3000 },
    { id: 'yearly', name: '💖 Annuel', price: '15,000 DA', value: 15000 },
  ];

  if (pay) {
    return <Payment 
      plan={plan} 
      onSuccess={() => { 
        alert('✅ تم إرسال طلب الدفع بنجاح'); 
        onSubscribe(plan); 
        onClose(); 
      }} 
      onCancel={() => setPay(false)} 
      user={user}
    />;
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeBtn}>✕</button>
        <h1 style={styles.title}>💕 Chatalgerie Premium</h1>
        <LanguageSwitcher />
        <p style={styles.subtitle}>اختر خطتك المناسبة</p>
        {plans.map(p => (
          <div key={p.id} style={styles.planCard}>
            <h3>{p.name}</h3>
            <p style={styles.price}>{p.price}</p>
            <button 
              onClick={() => { 
                setPlan(p.id); 
                setPay(true); 
              }} 
              style={styles.payBtn}
            >
              💳 الدفع عبر بريدي موب
            </button>
          </div>
        ))}
        <p style={styles.footer}>📸 أرفق صورة الإيصال لإتمام الاشتراك</p>
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
    padding: '40px',
    maxWidth: '500px',
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
  title: {
    background: 'var(--gradient-main)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '2rem',
    fontWeight: 700,
  },
  subtitle: {
    color: 'var(--text-secondary)',
    marginBottom: '20px',
  },
  planCard: {
    border: '2px solid #ddd',
    borderRadius: '20px',
    padding: '20px',
    margin: '10px',
    transition: 'all 0.3s ease',
  },
  price: {
    fontSize: '2rem',
    color: 'var(--primary-teal)',
    fontWeight: 'bold',
  },
  payBtn: {
    background: 'var(--gradient-accent)',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '12px',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(17, 153, 142, 0.4)',
  },
  footer: {
    color: 'var(--text-secondary)',
    fontSize: '0.85rem',
    marginTop: '20px',
    fontStyle: 'italic',
  },
};

export default Subscription;