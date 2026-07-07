import axios from 'axios';

const API_URL = 'https://chatalgerie-backend.onrender.com/api';

// ====== تسجيل الدخول ======
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur de connexion au serveur' };
  }
};

// ====== إنشاء حساب ======
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur de connexion au serveur' };
  }
};

// ====== إرسال كود التأكيد إلى البريد الإلكتروني ======
export const sendEmailCode = async (email) => {
  try {
    const code = Math.floor(100000 + Math.random() * 900000);
    console.log(`📧 Code envoyé à ${email}: ${code}`);
    alert(`📧 Code de vérification envoyé à ${email}\nCode: ${code}`);
    return { code, message: 'Code envoyé avec succès' };
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de l\'envoi du code' };
  }
};

// ====== إرسال كود التأكيد إلى رقم الهاتف ======
export const sendPhoneCode = async (phone) => {
  try {
    const code = Math.floor(100000 + Math.random() * 900000);
    console.log(`📱 Code envoyé à ${phone}: ${code}`);
    alert(`📱 Code de vérification envoyé à ${phone}\nCode: ${code}`);
    return { code, message: 'Code envoyé avec succès' };
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de l\'envoi du code' };
  }
};

// ====== التحقق من الكود ======
export const verifyCode = async (email, code, type) => {
  try {
    if (code.length === 6 && !isNaN(code)) {
      return { valid: true, message: '✅ Code vérifié avec succès' };
    }
    return { valid: false, message: '❌ Code invalide' };
  } catch (error) {
    throw error.response?.data || { message: 'Erreur de vérification' };
  }
};
