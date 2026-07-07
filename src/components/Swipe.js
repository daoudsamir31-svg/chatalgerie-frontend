import React, { useState, useEffect } from 'react';
import { FaHeart, FaTimes, FaCrown, FaUser, FaComments, FaBell, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import LanguageSwitcher from './LanguageSwitcher';
import { generateMockUsers } from '../utils/images';

function Swipe({ 
  user, 
  onProfile, 
  onChat, 
  onFilter, 
  onNotifications, 
  onLogout, 
  onSubscribe, 
  isSubscribed,
  onNearby,
  filters 
}) {
  const [messagesLeft, setMessagesLeft] = useState(5);
  const [likesLeft, setLikesLeft] = useState(50);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const users = generateMockUsers(30);
    setAllUsers(users);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (allUsers.length === 0) return;
    let result = [...allUsers];
    if (filters?.gender) {
      result = result.filter(u => u.gender === filters.gender);
    }
    if (filters?.ageMin) {
      result = result.filter(u => u.age >= filters.ageMin);
    }
    if (filters?.ageMax) {
      result = result.filter(u => u.age <= filters.ageMax);
    }
    if (filters?.city) {
      result = result.filter(u => u.city.toLowerCase() === filters.city.toLowerCase());
    }
    setFilteredUsers(result);
    setIndex(0);
    if (result.length === 0) {
      alert('😕 Aucun utilisateur ne correspond à vos critères. Affichage de tous les utilisateurs.');
      setFilteredUsers(allUsers);
    }
  }, [filters, allUsers]);

  useEffect(() => {
    if (filteredUsers.length > 0) {
      setCurrentUser(filteredUsers[index % filteredUsers.length]);
    } else if (allUsers.length > 0) {
      setCurrentUser(allUsers[index % allUsers.length]);
    }
  }, [index, filteredUsers, allUsers]);

  const totalMessages = messagesLeft + (user?.extraMessages || 0);
  const list = filteredUsers.length > 0 ? filteredUsers : allUsers;
  const displayUser = currentUser || allUsers[0];

  const next = () => setIndex((i) => (i + 1) % list.length);

  const handleLike = () => {
    const user = list[index % list.length];
    if (!user) return;
    if (likesLeft <= 0 && !isSubscribed) {
      alert('💎 Vous avez épuisé vos 50 likes gratuits. Abonnez-vous pour des likes illimités!');
      return;
    }
    if (totalMessages <= 0 && !isSubscribed) {
      alert('💬 Vous avez épuisé vos 5 messages gratuits. Abonnez-vous ou ajoutez des photos pour plus de messages!');
      return;
    }
    setLikesLeft(l => l - 1);
    if (user?.extraMessages > 0) {
      const updatedUser = { ...user, extraMessages: user.extraMessages - 1 };
      if (onProfile) onProfile(updatedUser);
    } else {
      setMessagesLeft((m) => m - 1);
    }
    alert(`❤️ Vous avez aimé ${user.name} (${likesLeft - 1} likes restants)`);
    next();
  };

  const handleDislike = () => {
    const user = list[index % list.length];
    if (user) alert(`👎 Vous avez passé ${user.name}`);
    next();
  };

  if (loading) {
    return <div style={styles.container}><div style={styles.card}><p>⏳ Chargement...</p></div></div>;
  }

  if (!displayUser && allUsers.length === 0) {
    return <div style={styles.container}><div style={styles.card}><p>😕 Aucun profil disponible</p></div></div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaHeart style={styles.logoIcon} />
          <h1 style={styles.title}>Chatalgerie</h1>
          <LanguageSwitcher />
        </div>
        <div style={styles.headerRight}>
          <button onClick={onNearby} style={styles.iconBtn} title="Utilisateurs proches"><FaMapMarkerAlt /></button>
          <button onClick={onFilter} style={styles.iconBtn} title="Filtrer"><FaSearch /></button>
          <button onClick={onNotifications} style={styles.iconBtn} title="Notifications"><FaBell /></button>
          <button onClick={onChat} style={styles.iconBtn} title="Chat"><FaComments /></button>
          <button onClick={onProfile} style={styles.iconBtn} title="Profil"><FaUser /></button>
          <button onClick={onLogout} style={styles.iconBtn} title="Déconnexion"><BiLogOut /></button>
        </div>
      </div>

      <div style={styles.statsBar}>
        <div style={styles.statItem}>
          <span style={styles.statValue}>❤️ {likesLeft}</span>
          <span style={styles.statLabel}>Likes</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statValue}>💬 {totalMessages}</span>
          <span style={styles.statLabel}>Messages</span>
        </div>
        {displayUser?.imageCount > 0 && (
          <div style={styles.statItem}>
            <span style={styles.statValue}>📸 {displayUser.imageCount}</span>
            <span style={styles.statLabel}>Photos</span>
          </div>
        )}
        {filters?.gender && (
          <div style={styles.statItem}>
            <span style={styles.statValue}>🎯 {list.length}</span>
            <span style={styles.statLabel}>Profilés</span>
          </div>
        )}
      </div>

      <div style={styles.card}>
        <div style={styles.imageContainer}>
          <img src={displayUser.image} alt={displayUser.name} style={styles.userImage} />
          {isSubscribed && (
            <div style={styles.premiumBadge}>
              <FaCrown style={styles.crownIcon} /> Premium
            </div>
          )}
        </div>
        <div style={styles.userInfo}>
          <h2 style={styles.userName}>{displayUser.name}, <span style={styles.userAge}>{displayUser.age}</span></h2>
          <p style={styles.userCity}>📍 {displayUser.city}</p>
          <p style={styles.userBio}>{displayUser.bio}</p>
          {filters?.gender && (
            <p style={styles.filterBadge}>
              🎯 {filters.gender === 'femme' ? '👩 Femmes' : '👨 Hommes'}
            </p>
          )}
        </div>

        <div style={styles.actions}>
          <button onClick={handleDislike} style={styles.dislikeBtn}><FaTimes /></button>
          <button onClick={handleLike} style={styles.likeBtn}><FaHeart /></button>
        </div>

        {!isSubscribed && (
          <button onClick={onSubscribe} style={styles.premiumBtn}>
            <FaCrown style={{ marginRight: '8px' }} /> Devenir Premium
          </button>
        )}
        
        {displayUser?.imageCount < 10 && (
          <p style={styles.addPhotoHint} onClick={onProfile}>
            📸 Ajoutez des photos pour +5 messages chacune ({displayUser?.imageCount || 0}/10)
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'var(--gradient-main)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '10px 15px',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    flexWrap: 'wrap',
    gap: '8px',
  },
  logoIcon: {
    fontSize: '1.8rem',
    color: 'var(--primary-teal)',
  },
  headerRight: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  iconBtn: {
    background: 'rgba(255,255,255,0.9)',
    border: 'none',
    borderRadius: '50%',
    width: '38px',
    height: '38px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-primary)',
    transition: 'all 0.3s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  title: {
    background: 'var(--gradient-main)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '1.4rem',
    margin: 0,
    fontWeight: 'bold',
  },
  statsBar: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: '500px',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: '15px',
    padding: '10px',
    marginBottom: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    flexWrap: 'wrap',
    gap: '5px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 10px',
  },
  statValue: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: 'var(--text-primary)',
  },
  statLabel: {
    fontSize: '0.65rem',
    color: 'var(--text-secondary)',
    marginTop: '2px',
  },
  card: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '28px',
    maxWidth: '420px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '280px',
    borderRadius: '20px',
    overflow: 'hidden',
    marginBottom: '15px',
    backgroundColor: '#f0f0f0',
  },
  userImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  premiumBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'var(--gradient-accent)',
    padding: '6px 14px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    boxShadow: '0 4px 15px rgba(17, 153, 142, 0.4)',
  },
  crownIcon: {
    fontSize: '0.9rem',
  },
  userInfo: {
    marginBottom: '15px',
  },
  userName: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    margin: 0,
    color: 'var(--text-primary)',
  },
  userAge: {
    color: 'var(--text-secondary)',
    fontWeight: 'normal',
  },
  userCity: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    margin: '4px 0',
  },
  userBio: {
    color: '#666',
    fontSize: '0.95rem',
    fontStyle: 'italic',
    margin: '6px 0 0',
  },
  filterBadge: {
    marginTop: '8px',
    padding: '4px 12px',
    borderRadius: '12px',
    backgroundColor: 'var(--primary-dark)',
    color: 'white',
    fontSize: '0.75rem',
    display: 'inline-block',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginTop: '20px',
  },
  dislikeBtn: {
    background: '#f0f0f0',
    border: 'none',
    fontSize: '28px',
    borderRadius: '50%',
    width: '65px',
    height: '65px',
    cursor: 'pointer',
    color: '#FF6B6B',
    transition: 'all 0.3s',
    boxShadow: '0 4px 20px rgba(255,107,107,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeBtn: {
    background: 'var(--gradient-accent)',
    border: 'none',
    fontSize: '28px',
    borderRadius: '50%',
    width: '65px',
    height: '65px',
    cursor: 'pointer',
    color: 'white',
    transition: 'all 0.3s',
    boxShadow: '0 4px 20px rgba(17, 153, 142, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumBtn: {
    marginTop: '20px',
    background: 'var(--gradient-accent)',
    padding: '14px 24px',
    borderRadius: '14px',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1.05rem',
    color: 'white',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(17, 153, 142, 0.3)',
    transition: 'transform 0.2s',
  },
  addPhotoHint: {
    marginTop: '10px',
    fontSize: '0.8rem',
    color: 'var(--primary-teal)',
    cursor: 'pointer',
    fontWeight: '500',
  },
};

export default Swipe;