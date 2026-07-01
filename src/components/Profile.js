import React, { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

function Profile({ user, onUpdate, onBack }) {
  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState(user?.age || '');
  const [city, setCity] = useState(user?.city || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profilePic, setProfilePic] = useState(user?.profilePic || null);
  const [extraMessages, setExtraMessages] = useState(user?.extraMessages || 0);
  const [imageCount, setImageCount] = useState(user?.imageCount || 0);
  const [uploadedImages, setUploadedImages] = useState(user?.uploadedImages || []);

  const MAX_IMAGES = 10;
  const BONUS_MESSAGES_PER_IMAGE = 5;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // التحقق من عدد الصور
    if (imageCount >= MAX_IMAGES) {
      alert(`❌ Vous avez atteint la limite de ${MAX_IMAGES} photos`);
      return;
    }

    // التحقق من حجم الصورة (max 5 Mo)
    if (file.size > 5 * 1024 * 1024) {
      alert('❌ Image trop grande (max 5 Mo)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      
      // تحديث عدد الصور والرسائل الإضافية
      const newImageCount = imageCount + 1;
      const newExtraMessages = extraMessages + BONUS_MESSAGES_PER_IMAGE;
      
      setProfilePic(imageData);
      setImageCount(newImageCount);
      setExtraMessages(newExtraMessages);
      setUploadedImages([...uploadedImages, imageData]);
      
      alert(`✅ Photo ajoutée!\n📸 ${newImageCount}/${MAX_IMAGES} photos\n💬 +${BONUS_MESSAGES_PER_IMAGE} messages bonus (Total: ${newExtraMessages})`);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!name || !age || !city) return alert('❌ Veuillez remplir tous les champs');
    
    const updatedUser = { 
      ...user, 
      name, 
      age: parseInt(age), 
      city, 
      bio, 
      profilePic,
      imageCount,
      extraMessages,
      uploadedImages
    };
    
    alert(`✅ Profil mis à jour!\n📸 ${imageCount} photos\n💬 ${extraMessages} messages bonus`);
    onUpdate(updatedUser);
    onBack();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <button style={styles.backBtn} onClick={onBack}>← Retour</button>
        <h1 style={styles.title}>👤 Mon Profil</h1>
        <LanguageSwitcher />

        {/* Stats */}
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <span style={styles.statValue}>{imageCount}</span>
            <span style={styles.statLabel}>📸 Photos</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statValue}>{extraMessages}</span>
            <span style={styles.statLabel}>💬 Messages bonus</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statValue}>{MAX_IMAGES - imageCount}</span>
            <span style={styles.statLabel}>📸 Restantes</span>
          </div>
        </div>

        {/* Photo principale */}
        <div style={styles.imageContainer}>
          {profilePic ? (
            <img src={profilePic} alt="Profile" style={styles.profileImage} />
          ) : (
            <div style={styles.profilePlaceholder}>📸</div>
          )}
          <label style={styles.uploadBtn}>
            📷 Ajouter une photo (+5 messages)
            <input type="file" accept="image/*" onChange={handleImageUpload} style={styles.fileInput} />
          </label>
          <p style={styles.hint}>
            {imageCount}/{MAX_IMAGES} photos • +{BONUS_MESSAGES_PER_IMAGE} messages par photo
          </p>
        </div>

        {/* Miniatures des photos uploadées */}
        {uploadedImages.length > 0 && (
          <div style={styles.thumbnails}>
            {uploadedImages.map((img, idx) => (
              <img key={idx} src={img} alt={`Photo ${idx + 1}`} style={styles.thumbnail} />
            ))}
          </div>
        )}

        <input type="text" placeholder="👤 Nom" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
        <input type="number" placeholder="🎂 Âge" value={age} onChange={(e) => setAge(e.target.value)} style={styles.input} />
        <input type="text" placeholder="📍 Ville" value={city} onChange={(e) => setCity(e.target.value)} style={styles.input} />
        <textarea placeholder="💕 Bio" value={bio} onChange={(e) => setBio(e.target.value)} style={styles.textarea} rows="3" />
        
        <button style={styles.saveBtn} onClick={handleSave}>💾 Enregistrer</button>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #FFB6C1, #87CEEB)', padding: 20 },
  card: { backgroundColor: 'white', padding: 30, borderRadius: 24, maxWidth: 500, width: '100%', textAlign: 'center', position: 'relative' },
  backBtn: { position: 'absolute', top: 15, left: 20, background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#888' },
  title: { fontSize: '2rem', background: 'linear-gradient(45deg, #FF69B4, #4A90D9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 15 },
  
  stats: { display: 'flex', justifyContent: 'space-around', marginBottom: 20, background: '#f8f9fa', borderRadius: 15, padding: 15 },
  statItem: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  statValue: { fontSize: '1.8rem', fontWeight: 'bold', color: '#FF1493' },
  statLabel: { fontSize: '0.8rem', color: '#888' },

  imageContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 15 },
  profileImage: { width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', border: '4px solid #FF69B4' },
  profilePlaceholder: { width: 120, height: 120, borderRadius: '50%', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '4px solid #FF69B4', fontSize: 50 },
  uploadBtn: { marginTop: 10, padding: '10px 20px', backgroundColor: '#4CAF50', borderRadius: 10, cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold', color: 'white' },
  fileInput: { display: 'none' },
  hint: { fontSize: '0.8rem', color: '#888', marginTop: 5 },
  
  thumbnails: { display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 15 },
  thumbnail: { width: 60, height: 60, borderRadius: 10, objectFit: 'cover', border: '2px solid #ddd' },

  input: { width: '100%', padding: 12, margin: '8px 0', borderRadius: 12, border: '2px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: 12, margin: '8px 0', borderRadius: 12, border: '2px solid #ddd', fontSize: '1rem', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'Arial' },
  saveBtn: { width: '100%', padding: 14, marginTop: 15, borderRadius: 12, border: 'none', background: 'linear-gradient(45deg, #FF6B6B, #FF1493)', color: 'white', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' },
};

export default Profile;