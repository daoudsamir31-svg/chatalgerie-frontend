import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Subscription from './components/Subscription';
import Swipe from './components/Swipe';
import Profile from './components/Profile';
import Chat from './components/Chat';
import Filter from './components/Filter';
import Notifications from './components/Notifications';
import NearbyUsers from './components/NearbyUsers';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNearby, setShowNearby] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [filters, setFilters] = useState(null);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsSubscribed(false);
    setShowLogin(false);
    setShowSignup(false);
    setShowProfile(false);
    setShowChat(false);
    setShowNearby(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowLogin(true);
    setShowSignup(false);
    setShowProfile(false);
    setShowChat(false);
    setShowNearby(false);
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

  return (
    <div>
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
          {showProfile && (
            <Profile 
              user={currentUser} 
              onUpdate={handleUpdateProfile} 
              onBack={() => setShowProfile(false)} 
            />
          )}
          
          {showChat && (
            <Chat 
              user={currentUser} 
              onBack={() => setShowChat(false)} 
            />
          )}
          
          {showFilter && (
            <Filter 
              onClose={() => setShowFilter(false)}
              onApplyFilter={handleApplyFilter}
            />
          )}
          
          {showNotifications && (
            <Notifications 
              onClose={() => setShowNotifications(false)} 
            />
          )}
          
          {showNearby && (
            <NearbyUsers 
              user={currentUser} 
              onClose={() => setShowNearby(false)} 
              onChat={(u) => { 
                setShowNearby(false); 
                alert(`💬 Conversation avec ${u.name}`); 
              }} 
            />
          )}
          
          {showSubscription && (
            <Subscription 
              onSubscribe={handleSubscribe} 
              onClose={() => setShowSubscription(false)} 
            />
          )}
          
          {!showProfile && !showChat && !showFilter && !showNotifications && !showNearby && !showSubscription && (
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
          )}
        </>
      )}
    </div>
  );
}

export default App;