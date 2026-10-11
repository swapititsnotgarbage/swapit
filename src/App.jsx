import React, { useState, useEffect } from 'react';
import { useSwapitState } from './useSwapitState';
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
import { db } from './firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function App() {
  const state = useSwapitState() || {};
  
  const categories = Array.isArray(state.categories) ? state.categories : [];
  const myItems = Array.isArray(state.myItems) ? state.myItems : [];
  const localTrades = Array.isArray(state.trades) ? state.trades : [];
  const localMessages = Array.isArray(state.messages) ? state.messages : [];
  const favorites = Array.isArray(state.favorites) ? state.favorites : [];
  const ratings = Array.isArray(state.ratings) ? state.ratings : [];
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
  const handleDeleteMyItem = state.handleDeleteMyItem || (() => {});
  const handleUpdateMyItem = state.handleUpdateMyItem || (() => {});
  const handleSendTradeOffer = state.handleSendTradeOffer || (() => {});
  const handleUpdateTradeStatus = state.handleUpdateTradeStatus || (() => {});
  const handleSendMessage = state.handleSendMessage || (() => {});
  const handleAddRating = state.handleAddRating || (() => {});
  const originalHandleLogout = state.handleLogout || (() => {});

  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('swapit_user_profile');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [isRegistered, setIsRegistered] = useState(() => {
    try {
      const isRemembered = localStorage.getItem('swapit_remember_me') === 'true';
      const savedProfile = localStorage.getItem('swapit_user_profile');
      return isRemembered && !!savedProfile;
    } catch (e) {
      return false;
    }
  });

  const handleCompleteOnboarding = (details) => {
    const newProfile = { 
      name: details?.name || 'משתמש', 
      location: details?.location || 'כפר מונש', 
      phone: details?.phone || '050-0000000' 
    };
    setUserProfile(newProfile);
    try {
      localStorage.setItem('swapit_remember_me', 'true');
      localStorage.setItem('swapit_user_profile', JSON.stringify(newProfile));
    } catch (e) {}
    setIsRegistered(true);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('swapit_remember_me');
      localStorage.removeItem('swapit_user_profile');
    } catch (e) {}
    setIsRegistered(false);
    setUserProfile({});
    originalHandleLogout();
  };

  const handleUpdateProfile = (updated) => {
    setUserProfile(updated);
    try {
      localStorage.setItem('swapit_user_profile', JSON.stringify(updated));
    } catch (e) {}
  };

  const [isMyItemsOpen, setIsMyItemsOpen] = useState(false);
  const [firestoreItems, setFirestoreItems] = useState([]);
  const [firestoreTrades, setFirestoreTrades] = useState([]);
  const [firestoreMessages, setFirestoreMessages] = useState([]);

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(collection(db, 'items'), (snapshot) => {
        const itemsData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setFirestoreItems(itemsData);
      });
      return () => unsubscribe();
    } catch (err) {}
  }, []);

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(collection(db, 'trades'), (snapshot) => {
        const tradesData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setFirestoreTrades(tradesData);
      });
      return () => unsubscribe();
    } catch (err) {}
  }, []);

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
        const messagesData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setFirestoreMessages(messagesData);
      });
      return () => unsubscribe();
    } catch (err) {}
  }, []);

  const handleAddCloudItem = async (newItem) => {
    try {
      const cleanedItem = Object.fromEntries(
        Object.entries(newItem).filter(([_, v]) => v !== undefined && v !== null && v !== '')
      );
      await addDoc(collection(db, 'items'), { ...cleanedItem, createdAt: new Date().toISOString() });
      setIsUploadOpen(false);
      alert("הפריט הועלה בהצלחה לענן! 🚀");
    } catch (error) {}
  };

  const handleCloudDeleteItem = async (itemId) => {
    try {
      if (itemId && String(itemId).length > 10) {
        await deleteDoc(doc(db, 'items', itemId));
      }
      handleDeleteMyItem(itemId);
      alert("הפריט נמחק בהצלחה! 🗑️");
    } catch (error) {
      handleDeleteMyItem(itemId);
    }
  };

  const handleCloudUpdateItem = async (updatedItem) => {
    try {
      if (updatedItem?.id && String(updatedItem.id).length > 10) {
        await updateDoc(doc(db, 'items', updatedItem.id), {
          title: updatedItem.title,
          wanted: updatedItem.wanted,
          condition: updatedItem.condition,
          description: updatedItem.description
        });
      }
      handleUpdateMyItem(updatedItem);
      alert("הפריט עודכן בהצלחה בענן! 🔄");
    } catch (error) {
      handleUpdateMyItem(updatedItem);
    }
  };

  const handleCloudSendTradeOffer = async (myItem, targetItem) => {
    try {
      if (targetItem) {
        await addDoc(collection(db, 'trades'), {
          itemId: targetItem.id || '',
          itemTitle: targetItem.title || '',
          itemImage: targetItem.image || '',
          offeredItemTitle: myItem?.title || '',
          offeredItemImage: myItem?.image || '',
          status: 'ממתין',
          senderName: userProfile?.name || 'שכן אלמוני',
          createdAt: new Date().toISOString()
        });
        alert("הצעת החלפה נשלחה בהצלחה לענן! 🤝");
      }
      setTradeTargetItem(null);
    } catch (error) {
      handleSendTradeOffer(myItem, targetItem);
    }
  };

  const handleCloudUpdateTradeStatus = async (tradeId, newStatus) => {
    try {
      if (tradeId && String(tradeId).length > 10) {
        await updateDoc(doc(db, 'trades', tradeId), { status: newStatus });
      }
      handleUpdateTradeStatus(tradeId, newStatus);
    } catch (error) {
      handleUpdateTradeStatus(tradeId, newStatus);
    }
  };

  const handleCloudSendMessage = async (tradeId, text) => {
    try {
      if (tradeId && text) {
        await addDoc(collection(db, 'messages'), {
          tradeId: tradeId,
          sender: userProfile?.name || 'אני',
          text: text,
          timestamp: new Date().toISOString()
        });
      }
      handleSendMessage(tradeId, text);
    } catch (error) {
      handleSendMessage(tradeId, text);
    }
  };

  const safeInitialCategories = Array.isArray(categories) ? categories : [];
  const safeFirestoreItems = Array.isArray(firestoreItems) ? firestoreItems : [];

  const mergedCategories = safeInitialCategories.map((cat, index) => {
    const cloudItemsForCat = safeFirestoreItems.filter(item => {
      if (!item) return false;
      const matchId = String(item.categoryId || '').toLowerCase() === String(cat.id || '').toLowerCase();
      const matchName = String(item.category || '').toLowerCase() === String(cat.name || '').toLowerCase();
      const isOrphan = !safeInitialCategories.some(c => 
        String(c.id || '').toLowerCase() === String(item.categoryId || '').toLowerCase() || 
        String(c.name || '').toLowerCase() === String(item.category || '').toLowerCase()
      );
      return matchId || matchName || (index === 0 && isOrphan);
    });

    return {
      ...cat,
      items: [...cloudItemsForCat, ...(Array.isArray(cat.items) ? cat.items : [])]
    };
  });

  const allMyItems = [...myItems, ...safeFirestoreItems.filter(item => !myItems.some(mi => mi.id === item.id))];
  const activeTrades = [...localTrades, ...firestoreTrades.filter(ft => !localTrades.some(lt => lt.id === ft.id))];
  const activeMessages = [...localMessages, ...firestoreMessages.filter(fm => !localMessages.some(lm => lm.id === fm.id))];

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
    <div dir="rtl" className={`min-h-screen w-full font-sans pb-16 transition-colors ${
      isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-800'
    }`}>
      
      {!isRegistered && (
        <OnboardingWizard 
          onComplete={handleCompleteOnboarding}
          isDarkMode={isDarkMode}
        />
      )}

      <Navbar 
        onOpenUpload={() => setIsUploadOpen(true)} 
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenMyItems={() => setIsMyItemsOpen(true)}
        userName={userProfile?.name || ''}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => state.setIsDarkMode ? state.setIsDarkMode(!isDarkMode) : {}}
      />
      
      <Banner 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedCondition={selectedCondition}
        setSelectedCondition={setSelectedCondition}
        minRating={minRating}
        setMinRating={setMinRating}
        isDarkMode={isDarkMode}
      />

      <CategoryGrid 
        categories={mergedCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onSelectCategory={(catId) => setSelectedCategory(selectedCategory === catId ? 'הכל' : catId)}
        isDarkMode={isDarkMode}
      />

      <main className="max-w-7xl mx-auto px-6 space-y-10 mt-6">
        {filteredCategories.map((category) => (
          <CategoryRow 
            key={category.id} 
            category={category} 
            onSelectItem={setSelectedItem} 
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            isDarkMode={isDarkMode}
          />
        ))}
      </main>

      <ItemModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
        onStartTrade={(item) => { setSelectedItem(null); setTradeTargetItem(item); }}
        isDarkMode={isDarkMode}
      />

      <UploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
        onAdd={handleAddCloudItem}
        isDarkMode={isDarkMode}
      />

      <ProfileModal 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
        ratings={ratings}
        completedTradesCount={completedTradesCount}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
      />

      <MyItemsModal 
        isOpen={isMyItemsOpen}
        onClose={() => setIsMyItemsOpen(false)}
        myItems={allMyItems}
        onDeleteMyItem={handleCloudDeleteItem}
        onUpdateMyItem={handleCloudUpdateItem}
        isDarkMode={isDarkMode}
      />

      <SidebarMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        trades={activeTrades}
        onUpdateTradeStatus={handleCloudUpdateTradeStatus}
        messages={activeMessages}
        onSendMessage={handleCloudSendMessage}
        onAddRating={handleAddRating}
        myItems={allMyItems}
        allCategories={mergedCategories}
        isDarkMode={isDarkMode}
        onOpenFloatingChat={(trade) => setActiveFloatingTrade(trade)}
      />

      <TradeModal 
        targetItem={tradeTargetItem}
        myItems={allMyItems}
        onClose={() => setTradeTargetItem(null)}
        onSuccess={(myItem) => handleCloudSendTradeOffer(myItem, tradeTargetItem)}
      />

      <FloatingChat 
        isOpen={!!activeFloatingTrade}
        onClose={() => setActiveFloatingTrade(null)}
        trade={activeFloatingTrade}
        messages={activeMessages}
        onSendMessage={handleCloudSendMessage}
        isDarkMode={isDarkMode}
      />

    </div>
  );
}