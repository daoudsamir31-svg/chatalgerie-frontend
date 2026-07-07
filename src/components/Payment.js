import React, { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

function Payment({ plan, onSuccess, onCancel, user }) {
  const [phone, setPhone] = useState('');
  const [reference, setReference] = useState('');
  const [receiptImage, setReceiptImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const prices = { monthly: 3000, yearly: 15000 };
  const price = prices[plan] || 3000;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setReceiptImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!phone || !receiptImage) {
      alert('❌ يرجى إدخال رقم الهاتف وإرفاق صورة الإيصال');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://chatalgerie-backend.onrender.com/api/admin/payment-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          userName: user?.name,
          userEmail: user?.email,
          phone,
          price,
          plan,
          reference,
          receiptImage
        })
      });

      const result = await response.json();
      if (response.ok) {
        alert('✅ تم إرسال طلب الدفع بنجاح! سيتم تفعيل اشتراكك بعد التحقق من الإيصال.');
        onSuccess();
      } else {
        alert('❌ حدث خطأ: ' + (result.message || 'يرجى المحاولة مرة أخرى'));
      }
    } catch (error) {
      alert('❌ خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onCancel} style={styles.closeBtn}>✕</button>
        <h2 style={styles.title}>💳 الدفع عبر بريدي موب</h2>
        <LanguageSwitcher />

        <div style={styles.ripBox}>
          <h3>📌 معلومات التحويل</h3>
          <p><strong>RIP:</strong> <span style={styles.ripNumber}>00799999000632185290</span></p>
          <p><strong>المبلغ:</strong> {price} DA</p>
          <p><strong>المرجع:</strong> CHAT-{Date.now()}</p>
          <p style={styles.ripNote}>📝 قم بالتحويل إلى هذا الحساب ثم أرفق صورة الإيصال</p>
        </div>

        <input
          type="tel"
          placeholder="📱 رقم الهاتف المستخدم للتحويل"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="📝 مرجع العملية (اختياري)"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          style={styles.input}
        />

        <div style={styles.uploadBox}>
          <label style={styles.uploadBtn}>
            📷 إرفاق صورة الإيصال
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={styles.fileInput}
            />
          </label>
          {receiptImage && (
            <p style={styles.uploadStatus}>✅ تم رفع الصورة</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          style={styles.sendBtn}
          disabled={loading}
        >
          {loading ? '⏳ جاري الإرسال...' : '📧 إرسال طلب الدفع'}
        </button>

        <p style={styles.hint}>
          📧 سيتم إرسال طلبك إلى المسؤول للمراجعة
        </p>
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
    padding: '35px',
    maxWidth: '450px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    textAlign: 'center',
    position: 'relative',
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
  title: {
    fontSize: '1.8rem',
    fontWeight: 700,
    background: 'var(--gradient-main)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '15px',
  },
  ripBox: {
    background: '#f0f8ff',
    borderRadius: '15px',
    padding: '20px',
    margin: '15px 0',
    border: '2px solid var(--primary-teal)',
    textAlign: 'left',
  },
  ripNumber: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#006233',
    letterSpacing: '2px',
    wordBreak: 'break-all',
  },
  ripNote: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    marginTop: '10px',
    fontStyle: 'italic',
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
    outline: 'none',
  },
  uploadBox: {
    marginTop: '15px',
    padding: '15px',
    border: '2px dashed #ddd',
    borderRadius: '12px',
    textAlign: 'center',
  },
  uploadBtn: {
    display: 'inline-block',
    padding: '10px 20px',
    background: 'var(--primary-teal)',
    color: 'white',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  fileInput: {
    display: 'none',
  },
  uploadStatus: {
    marginTop: '10px',
    color: 'var(--primary-teal)',
    fontWeight: 'bold',
  },
  sendBtn: {
    width: '100%',
    padding: '14px',
    marginTop: '20px',
    background: 'var(--gradient-accent)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(17, 153, 142, 0.4)',
    transition: 'all 0.3s ease',
  },
  hint: {
    color: 'var(--text-secondary)',
    fontSize: '0.85rem',
    marginTop: '15px',
  },
};

export default Payment;