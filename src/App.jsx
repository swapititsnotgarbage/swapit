import React, { useState } from 'react';
import { useSwapitState } from './useSwapitState';
import { useCloudData } from './useCloudData';
import OnboardingWizard from './components/OnboardingWizard';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import CategoryGrid from './components/CategoryGrid';
import CategoryRow from './components/CategoryRow';
import ItemModal from './components/ItemModal';
import UploadModal from './components/UploadModal';
import TradeModal from './components/TradeModal';
import ProfileModal from './components/ProfileModal';
import MyItemsModal from './components/MyItemsModal';
import SidebarMenu from './components/SidebarMenu';
import FloatingChat from './components/FloatingChat';
import LiveActivity from './components/LiveActivity'; 

export default function App() {
  const state = useSwapitState() || {};
  
  const categories = Array.isArray(state.categories) ? state.categories : [];
  const myItems = Array.isArray(state.myItems) ? state.myItems : [];
  const localTrades = Array.isArray(state.trades) ? state.trades : [];
  const localMessages = Array.isArray(state.messages) ? state.messages : [];
  const favorites = Array.isArray(state.favorites) ? state.favorites : [];
  const isDarkMode = !!state.isDarkMode;
  const searchQuery = state.searchQuery || '';
  const selectedRegion = state.selectedRegion || 'הכל';
  const selectedCondition = state.selectedCondition || 'הכל';
  const minRating = state.minRating || 0;
  const selectedCategory = state.selectedCategory || 'הכל';
  
  const selectedItem = state.selectedItem || null;
  const isUploadOpen = !!state.isUploadOpen;
  const isProfileOpen = !!state.isProfileOpen;
  const isMenuOpen = !!state.isMenuOpen;
  const tradeTargetItem = state.tradeTargetItem || null;
  const activeFloatingTrade = state.activeFloatingTrade || null;

  const setSearchQuery = state.setSearchQuery || (() => {});
  const setSelectedRegion = state.setSelectedRegion || (() => {});
  const setSelectedCondition = state.setSelectedCondition || (() => {});
  const setMinRating = state.setMinRating || (() => {});
  const setSelectedCategory = state.setSelectedCategory || (() => {});
  const setSelectedItem = state.setSelectedItem || (() => {});
  const setIsUploadOpen = state.setIsUploadOpen || (() => {});
  const setIsProfileOpen = state.setIsProfileOpen || (() => {});
  const setIsMenuOpen = state.setIsMenuOpen || (() => {});
  const setTradeTargetItem = state.setTradeTargetItem || (() => {});
  const setActiveFloatingTrade = state.setActiveFloatingTrade || (() => {});
  const handleToggleFavorite = state.handleToggleFavorite || (() => {});

  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('swapit_user_profile');
      return saved ? JSON.parse(saved) : { name: 'יובל לוי', location: 'כפר מונש', phone: '050-1234567' };
    } catch (e) { return { name: 'יובל לוי', location: 'כפר מונש', phone: '050-1234567' }; }
  });

  const [isRegistered, setIsRegistered] = useState(() => {
    try {
      const isRemembered = localStorage.getItem('swapit_remember_me') === 'true';
      const isV3Registered = localStorage.getItem('swapit_is_registered_v3') === 'true';
      return isRemembered || isV3Registered || !!localStorage.getItem('swapit_user_profile');
    } catch (e) { return true; }
  });

  // ייבוא פונקציות הענן מהקובץ החדש
  const {
    firestoreItems, firestoreTrades, firestoreMessages, firestoreRatings,
    handleCloudAddItem, handleCloudDeleteItem, handleCloudUpdateItem,
    handleCloudSendTradeOffer, handleCloudUpdateTradeStatus,
    handleCloudSendMessage, handleCloudReportItem, handleCloudAddRating
  } = useCloudData(userProfile, state);

  const handleCompleteOnboarding = (details) => {
    const newProfile = { name: details?.name || 'יובל לוי', location: details?.location || 'כפר מונש', phone: details?.phone || '050-1234567' };
    setUserProfile(newProfile);
    try {
      localStorage.setItem('swapit_remember_me', 'true');
      localStorage.setItem('swapit_is_registered_v3', 'true');
      localStorage.setItem('swapit_user_profile', JSON.stringify(newProfile));
    } catch (e) {}
    setIsRegistered(true);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('swapit_remember_me');
      localStorage.removeItem('swapit_is_registered_v3');
      localStorage.removeItem('swapit_user_profile');
    } catch (e) {}
    setIsRegistered(false);
    setUserProfile({ name: 'יובל לוי', location: 'כפר מונש', phone: '050-1234567' });
    if (state.handleLogout) state.handleLogout();
  };

  const handleUpdateProfile = (updated) => {
    setUserProfile(updated);
    try { localStorage.setItem('swapit_user_profile', JSON.stringify(updated)); } catch (e) {}
  };

  const [isMyItemsOpen, setIsMyItemsOpen] = useState(false);

  const mergedCategories = categories.map((cat, index) => {
    const cloudItemsForCat = firestoreItems.filter(item => {
      const matchId = String(item.categoryId || '').toLowerCase() === String(cat.id || '').toLowerCase();
      const matchName = String(item.category || '').toLowerCase() === String(cat.name || '').toLowerCase();
      const isOrphan = !categories.some(c => String(c.id || '').toLowerCase() === String(item.categoryId || '').toLowerCase() || String(c.name || '').toLowerCase() === String(item.category || '').toLowerCase());
      return matchId || matchName || (index === 0 && isOrphan);
    });
    return { ...cat, items: [...cloudItemsForCat, ...(Array.isArray(cat.items) ? cat.items : [])] };
  });

  const allMyItems = [...myItems, ...firestoreItems.filter(item => !myItems.some(mi => mi.id === item.id))];
  const activeTrades = [...localTrades, ...firestoreTrades.filter(ft => !localTrades.some(lt => lt.id === ft.id))];
  const activeMessages = [...localMessages, ...firestoreMessages.filter(fm => !localMessages.some(lm => lm.id === fm.id))];
  const unreadCount = activeTrades.filter(t => t.status === 'ממתין' && t.senderName !== userProfile?.name).length;

  const filteredCategories = mergedCategories.map(cat => ({
    ...cat,
    items: (Array.isArray(cat.items) ? cat.items : []).filter(item => {
      if (!item) return false;
      const matchesSearch = !searchQuery || item.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'הכל' || cat.id === selectedCategory || cat.name === selectedCategory;
      const matchesRegion = selectedRegion === 'הכל' || item.location === selectedRegion;
      const matchesCondition = selectedCondition === 'הכל' || item.condition === selectedCondition;
      const matchesRating = !minRating || (item.rating >= minRating);
      return matchesSearch && matchesCategory && matchesRegion && matchesCondition && matchesRating;
    })
  })).filter(cat => Array.isArray(cat.items) && cat.items.length > 0);

  const completedTradesCount = activeTrades.filter(t => t?.status === 'אושר').length;

  return (
    <div dir="rtl" className={`min-h-screen w-full font-sans pb-16 transition-colors relative ${isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {!isRegistered && <OnboardingWizard onComplete={handleCompleteOnboarding} isDarkMode={isDarkMode} />}
      <Navbar onOpenUpload={() => setIsUploadOpen(true)} onOpenProfile={() => setIsProfileOpen(true)} onOpenMenu={() => setIsMenuOpen(true)} onOpenMyItems={() => setIsMyItemsOpen(true)} userName={userProfile?.name || ''} isDarkMode={isDarkMode} onToggleDarkMode={() => state.setIsDarkMode ? state.setIsDarkMode(!isDarkMode) : {}} unreadCount={unreadCount} />
      <Banner searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} selectedCondition={selectedCondition} setSelectedCondition={setSelectedCondition} minRating={minRating} setMinRating={setMinRating} isDarkMode={isDarkMode} />
      <CategoryGrid categories={mergedCategories} selectedCategory={selectedCategory} onSelectCategory={(catId) => setSelectedCategory(selectedCategory === catId ? 'הכל' : catId)} isDarkMode={isDarkMode} />
      <main className="max-w-7xl mx-auto px-6 space-y-10 mt-6">
        {filteredCategories.map((category) => (
          <CategoryRow key={category.id} category={category} onSelectItem={setSelectedItem} favorites={favorites} onToggleFavorite={handleToggleFavorite} isDarkMode={isDarkMode} />
        ))}
      </main>
      <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} onStartTrade={(item) => { setSelectedItem(null); setTradeTargetItem(item); }} onReport={handleCloudReportItem} isDarkMode={isDarkMode} />
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} onAdd={(item) => handleCloudAddItem(item, setIsUploadOpen)} isDarkMode={isDarkMode} userLocation={userProfile?.location} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} userProfile={userProfile} onUpdateProfile={handleUpdateProfile} ratings={firestoreRatings} completedTradesCount={completedTradesCount} onLogout={handleLogout} isDarkMode={isDarkMode} />
      <MyItemsModal isOpen={isMyItemsOpen} onClose={() => setIsMyItemsOpen(false)} myItems={allMyItems} onDeleteMyItem={handleCloudDeleteItem} onUpdateMyItem={handleCloudUpdateItem} isDarkMode={isDarkMode} />
      <SidebarMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} trades={activeTrades} onUpdateTradeStatus={handleCloudUpdateTradeStatus} messages={activeMessages} onSendMessage={handleCloudSendMessage} onAddRating={handleCloudAddRating} myItems={allMyItems} isDarkMode={isDarkMode} onOpenFloatingChat={(trade) => setActiveFloatingTrade(trade)} userName={userProfile?.name} />
      <TradeModal targetItem={tradeTargetItem} myItems={allMyItems} onClose={() => setTradeTargetItem(null)} onSuccess={(myItem) => handleCloudSendTradeOffer(myItem, tradeTargetItem, setTradeTargetItem)} isDarkMode={isDarkMode} />
      <FloatingChat isOpen={!!activeFloatingTrade} onClose={() => setActiveFloatingTrade(null)} trade={activeFloatingTrade} messages={activeMessages} onSendMessage={handleCloudSendMessage} isDarkMode={isDarkMode} />
      <LiveActivity isDarkMode={isDarkMode} />
    </div>
  );
}