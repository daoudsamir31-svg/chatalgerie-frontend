// ====== الملف: src/App.js ======
// المسار: C:\Users\hp\Desktop\chatalgerie-app\src\App.js

import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Subscription from './components/Subscription';
import Swipe from './components/Swipe';
import Profile from './components/Profile';
import Chat from './components/Chat';
import Filter from './components/Filter';
import Notifications from './components/Notifications';
import NearbyUsers from './components/NearbyUsers';
import AdminPanel from './components/AdminPanel';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNearby, setShowNearby] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [filters, setFilters] = useState(null);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsSubscribed(userData.isSubscribed || false);
    setShowLogin(false);
    setShowSignup(false);
    setShowProfile(false);
    setShowChat(false);
    setShowNearby(false);
    setShowAdmin(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowLogin(true);
    setShowSignup(false);
    setShowProfile(false);
    setShowChat(false);
    setShowNearby(false);
    setShowAdmin(false);
  };

  const handleSubscribe = (plan) => {
    alert(`✅ Abonnement ${plan.name} activé`);
    setIsSubscribed(true);
    setShowSubscription(false);
  };

  const handleUpdateProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  const handleApplyFilter = (filters) => {
    setFilters(filters);
  };

  // زر لوحة التحكم يظهر فقط إذا كان المستخدم مسؤولاً (isAdmin === true)
  const showAdminButton = currentUser?.isAdmin === true;

  return (
    <div className="app-container">
      {showLogin && (
        <Login 
          switchToSignup={() => { 
            setShowLogin(false); 
            setShowSignup(true); 
          }} 
          onLogin={handleLogin} 
        />
      )}
      
      {showSignup && (
        <Signup 
          switchToLogin={() => { 
            setShowSignup(false); 
            setShowLogin(true); 
          }} 
        />
      )}
      
      {!showLogin && !showSignup && currentUser && (
        <>
          {showAdmin && (
            <AdminPanel 
              user={currentUser} 
              onLogout={() => { 
                setShowAdmin(false); 
                handleLogout(); 
              }} 
            />
          )}
          
          {!showAdmin && showProfile && (
            <Profile 
              user={currentUser} 
              onUpdate={handleUpdateProfile} 
              onBack={() => setShowProfile(false)} 
            />
          )}
          
          {!showAdmin && showChat && (
            <Chat 
              user={currentUser} 
              onBack={() => setShowChat(false)} 
            />
          )}
          
          {!showAdmin && showFilter && (
            <Filter 
              onClose={() => setShowFilter(false)}
              onApplyFilter={handleApplyFilter}
            />
          )}
          
          {!showAdmin && showNotifications && (
            <Notifications 
              onClose={() => setShowNotifications(false)} 
            />
          )}
          
          {!showAdmin && showNearby && (
            <NearbyUsers 
              user={currentUser} 
              onClose={() => setShowNearby(false)} 
              onChat={(u) => { 
                setShowNearby(false); 
                alert(`💬 Conversation avec ${u.name}`); 
              }} 
            />
          )}
          
          {!showAdmin && showSubscription && (
            <Subscription 
              onSubscribe={handleSubscribe} 
              onClose={() => setShowSubscription(false)} 
            />
          )}
          
          {!showAdmin && !showProfile && !showChat && !showFilter && !showNotifications && !showNearby && !showSubscription && (
            <>
              {showAdminButton && (
                <button 
                  onClick={() => setShowAdmin(true)} 
                  style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    background: 'var(--gradient-accent)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(17,153,142,0.4)',
                    zIndex: 999,
                  }}
                >
                  🔐
                </button>
              )}
              <Swipe 
                user={currentUser} 
                onLogout={handleLogout} 
                isSubscribed={isSubscribed} 
                onSubscribe={() => setShowSubscription(true)} 
                onProfile={() => setShowProfile(true)} 
                onChat={() => setShowChat(true)} 
                onFilter={() => setShowFilter(true)} 
                onNotifications={() => setShowNotifications(true)} 
                onNearby={() => setShowNearby(true)}
                filters={filters}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;