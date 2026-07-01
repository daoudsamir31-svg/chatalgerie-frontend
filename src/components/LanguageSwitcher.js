import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    // لا نستخدم window.location.reload() حتى لا نعيد تحميل الصفحة
  };

  const getButtonStyle = (lang) => ({
    padding: '6px 14px',
    borderRadius: '20px',
    border: 'none',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s',
    background: i18n.language === lang ? '#6C63FF' : '#f0f0f0',
    color: i18n.language === lang ? 'white' : '#555',
    boxShadow: i18n.language === lang ? '0 2px 10px rgba(108,99,255,0.3)' : 'none',
  });

  return (
    <div style={styles.container}>
      <button onClick={() => changeLanguage('ar')} style={getButtonStyle('ar')}>
        🇩🇿 ع
      </button>
      <button onClick={() => changeLanguage('fr')} style={getButtonStyle('fr')}>
        🇫🇷 F
      </button>
      <button onClick={() => changeLanguage('en')} style={getButtonStyle('en')}>
        🇬🇧 E
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
  },
};

export default LanguageSwitcher;