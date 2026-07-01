import React, { useState } from 'react';
import Payment from './Payment';
import LanguageSwitcher from './LanguageSwitcher';

function Subscription({ onSubscribe, onClose }) {
  const [plan, setPlan] = useState(null);
  const [pay, setPay] = useState(false);

  const plans = [
    { id: 'monthly', name: '💕 Mensuel', price: '3,000 DA', value: 3000 },
    { id: 'yearly', name: '💖 Annuel', price: '15,000 DA', value: 15000 },
  ];

  if (pay) return <Payment plan={plan} onSuccess={() => { alert('✅ Paiement réussi'); onSubscribe(plan); onClose(); }} onCancel={() => setPay(false)} />;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeBtn}>✕</button>
        <h1 style={styles.title}>💕 Chatalgerie Premium</h1>
        <LanguageSwitcher />
        {plans.map(p => (
          <div key={p.id} style={styles.planCard}>
            <h3>{p.name}</h3>
            <p style={styles.price}>{p.price}</p>
            <button onClick={() => { setPlan(p.id); setPay(true); }} style={styles.payBtn}>💳 Payer avec بريدي موب</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999, padding: 20 },
  modal: { background: 'white', borderRadius: 30, padding: 40, maxWidth: 500, width: '100%', textAlign: 'center' },
  closeBtn: { float: 'right', background: 'none', border: 'none', fontSize: 24, cursor: 'pointer' },
  title: { background: 'linear-gradient(45deg, #FF69B4, #4A90D9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  planCard: { border: '2px solid #ddd', borderRadius: 20, padding: 20, margin: 10 },
  price: { fontSize: '2rem', color: '#FF1493' },
  payBtn: { background: '#FF1493', color: 'white', padding: 12, borderRadius: 12, border: 'none', fontWeight: 'bold', cursor: 'pointer' },
};

export default Subscription;