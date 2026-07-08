import React, { useState } from 'react';

function DeleteAccountModal({ user, onClose, onConfirm }) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    if (!password) {
      setError('يرجى إدخال كلمة المرور');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://chatalgerie-backend.onrender.com/api/auth/delete-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          password: password
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert('✅ تم حذف حسابك بنجاح');
        onConfirm();
      } else {
        setError(result.message || '❌ كلمة المرور غير صحيحة');
      }
    } catch (error) {
      setError('❌ خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeBtn}>✕</button>
        
        <div style={styles.icon}>⚠️</div>
        <h2 style={styles.title}>تأكيد حذف الحساب</h2>
        <p style={styles.message}>
          هل أنت متأكد من رغبتك في حذف حسابك؟
          <br />
          <span style={{ color: 'red', fontWeight: 'bold' }}>هذا الإجراء لا يمكن التراجع عنه!</span>
        </p>

        <input
          type="password"
          placeholder="🔒 أدخل كلمة المرور للتأكيد"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.actions}>
          <button onClick={onClose} style={styles.cancelBtn}>إلغاء</button>
          <button onClick={handleConfirm} style={styles.deleteBtn} disabled={loading}>
            {loading ? '⏳ جاري الحذف...' : '🗑️ حذف الحساب'}
          </button>
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
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    padding: '20px',
  },
  modal: {
    background: 'white',
    borderRadius: '30px',
    padding: '40px',
    maxWidth: '420px',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    boxShadow: '0 30px 80px rgba(0,0,0,0.2)',
  },
  closeBtn: {
    position: 'absolute',
    top: '15px',
    right: '20px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#999',
  },
  icon: {
    fontSize: '3rem',
    marginBottom: '10px',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#FF6B6B',
    marginBottom: '10px',
  },
  message: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: '2px solid #ddd',
    fontSize: '1rem',
    marginBottom: '10px',
    boxSizing: 'border-box',
    outline: 'none',
    textAlign: 'center',
  },
  error: {
    color: '#FF6B6B',
    fontSize: '0.9rem',
    marginBottom: '15px',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  cancelBtn: {
    flex: 1,
    padding: '12px',
    borderRadius: '12px',
    border: '2px solid #ddd',
    background: 'white',
    color: 'var(--text-secondary)',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  deleteBtn: {
    flex: 2,
    padding: '12px',
    borderRadius: '12px',
    border: 'none',
    background: '#FF6B6B',
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(255,107,107,0.4)',
    transition: 'all 0.3s ease',
  },
};

export default DeleteAccountModal;