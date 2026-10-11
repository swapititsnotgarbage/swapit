import { useState, useEffect } from 'react';
import { initialCategories } from './data/initialData';

export function useSwapitState() {
  const [isRegistered, setIsRegistered] = useState(() => {
    try {
      return localStorage.getItem('swapit_is_registered_v3') === 'true';
    } catch (e) {
      return false;
    }
  });

  const handleLogout = () => {
    setIsRegistered(false);
    try {
      localStorage.removeItem('swapit_is_registered_v3');
    } catch (e) {}
  };

  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('swapit_categories_v3');
      return saved ? JSON.parse(saved) : initialCategories;
    } catch (e) {
      return initialCategories;
    }
  });

  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('swapit_profile_v3');
      return saved ? JSON.parse(saved) : { name: 'יובל לוי', location: 'כפר מונש', phone: '050-1234567' };
    } catch (e) {
      return { name: 'יובל לוי', location: 'כפר מונש', phone: '050-1234567' };
    }
  });

  const [myItems, setMyItems] = useState(() => {
    try {
      const saved = localStorage.getItem('swapit_my_items_v3');
      return saved ? JSON.parse(saved) : [
        { 
          id: 999, 
          title: 'אופני הרים ישנים', 
          location: 'כפר מונש', 
          region: 'שרון',
          image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=500&q=80', 
          wanted: 'מחפש כלי עבודה או כסא בר', 
          condition: 'משומש',
          description: 'אופניים במצב נסיעה טוב, דורשים החלפת פנימיות קלה.' 
        }
      ];
    } catch (e) {
      return [];
    }
  });

  const [trades, setTrades] = useState(() => {
    try {
      const saved = localStorage.getItem('swapit_trades_v3');
      return saved ? JSON.parse(saved) : [
        { id: 101, myItemTitle: 'אופני הרים ישנים', targetItemTitle: 'שטיח סלון וינטג׳ (דנה)', status: 'אושר' }
      ];
    } catch (e) {
      return [];
    }
  });

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('swapit_messages_v3');
      return saved ? JSON.parse(saved) : {
        101: [
          { sender: 'dana', text: 'היי יובל! ראיתי שאישרת את הברטר על השטיח. מתי נוח לך להיפגש להחלפה?', time: '18:30' }
        ]
      };
    } catch (e) {
      return {};
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('swapit_favorites_v3');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [ratings, setRatings] = useState(() => {
    try {
      const saved = localStorage.getItem('swapit_ratings_v3');
      return saved ? JSON.parse(saved) : [
        { score: 5, comment: 'אמינות גבוהה ועמידה בזמנים!', date: '01/10/2026' }
      ];
    } catch (e) {
      return [];
    }
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('swapit_dark_mode_v3');
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      return false;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('הכל');
  const [selectedCondition, setSelectedCondition] = useState('הכל');
  const [minRating, setMinRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('הכל');

  const [selectedItem, setSelectedItem] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tradeTargetItem, setTradeTargetItem] = useState(null);
  const [activeFloatingTrade, setActiveFloatingTrade] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('swapit_is_registered_v3', isRegistered);
      localStorage.setItem('swapit_categories_v3', JSON.stringify(categories));
      localStorage.setItem('swapit_profile_v3', JSON.stringify(userProfile));
      localStorage.setItem('swapit_my_items_v3', JSON.stringify(myItems));
      localStorage.setItem('swapit_trades_v3', JSON.stringify(trades));
      localStorage.setItem('swapit_messages_v3', JSON.stringify(messages));
      localStorage.setItem('swapit_favorites_v3', JSON.stringify(favorites));
      localStorage.setItem('swapit_ratings_v3', JSON.stringify(ratings));
      localStorage.setItem('swapit_dark_mode_v3', JSON.stringify(isDarkMode));
    } catch (e) {}
  }, [isRegistered, categories, userProfile, myItems, trades, messages, favorites, ratings, isDarkMode]);

  const handleToggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(id => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  const handleAddItem = (categoryKey, newItem) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryKey) {
        return { ...cat, items: [newItem, ...(cat.items || [])] };
      }
      return cat;
    }));
    setMyItems([newItem, ...myItems]);
  };

  const handleDeleteMyItem = (itemId) => {
    setMyItems(myItems.filter(item => item.id !== itemId));
  };

  const handleUpdateMyItem = (updatedItem) => {
    setMyItems(myItems.map(i => i.id === updatedItem.id ? updatedItem : i));
    setCategories(categories.map(cat => ({
      ...cat,
      items: (cat.items || []).map(i => i.id === updatedItem.id ? updatedItem : i)
    })));
  };

  const handleSendTradeOffer = (myItem, targetItem) => {
    const newTrade = {
      id: Date.now(),
      myItemTitle: myItem.title,
      targetItemTitle: `${targetItem.title} (${targetItem.location || 'שכן'})`,
      status: 'אושר'
    };
    setTrades([newTrade, ...trades]);
    
    setMessages(prev => ({
      ...prev,
      [newTrade.id]: [
        { sender: 'other', text: `איזה כיף! אשמח להחליף את ${targetItem.title} תמורת ${myItem.title}. מתי נוח לך?`, time: 'עכשיו' }
      ]
    }));

    setActiveFloatingTrade(newTrade);
    setTradeTargetItem(null);
  };

  const handleUpdateTradeStatus = (tradeId, newStatus) => {
    setTrades(trades.map(t => t.id === tradeId ? { ...t, status: newStatus } : t));
  };

  const handleSendMessage = (tradeId, text) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = { sender: 'me', text, time: timeStr };

    setMessages(prev => ({
      ...prev,
      [tradeId]: [...(prev[tradeId] || []), newMsg]
    }));

    setTimeout(() => {
      const autoReply = {
        sender: 'other',
        text: 'מעולה! נשמע קבוע. נתראה בשעה שקבענו 👍',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => ({
        ...prev,
        [tradeId]: [...(prev[tradeId] || []), autoReply]
      }));
    }, 1500);
  };

  const handleAddRating = (newRating) => {
    setRatings([newRating, ...ratings]);
  };

  const filteredCategories = categories
    .filter(cat => selectedCategory === 'הכל' || cat.id === selectedCategory)
    .map(cat => ({
      ...cat,
      items: (cat.items || []).filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (selectedRegion === '❤️ המועדפים שלי') {
          return matchesSearch && favorites.includes(item.id);
        }

        const matchesRegion = selectedRegion === 'הכל' || item.region === selectedRegion;
        const matchesCondition = selectedCondition === 'הכל' || item.condition === selectedCondition;
        const itemRating = item.rating || 4.8;
        const matchesRating = itemRating >= minRating;

        return matchesSearch && matchesRegion && matchesCondition && matchesRating;
      })
    }));

  return {
    isRegistered, setIsRegistered, handleLogout,
    categories, userProfile, myItems, trades, messages, favorites, ratings, isDarkMode, setIsDarkMode,
    searchQuery, setSearchQuery, selectedRegion, setSelectedRegion,
    selectedCondition, setSelectedCondition, minRating, setMinRating,
    selectedCategory, setSelectedCategory, selectedItem, setSelectedItem,
    isUploadOpen, setIsUploadOpen, isProfileOpen, setIsProfileOpen,
    isMenuOpen, setIsMenuOpen, tradeTargetItem, setTradeTargetItem,
    activeFloatingTrade, setActiveFloatingTrade,
    handleToggleFavorite, handleAddItem, handleDeleteMyItem, handleUpdateMyItem,
    handleSendTradeOffer, handleUpdateTradeStatus, handleSendMessage, handleAddRating,
    setUserProfile, filteredCategories
  };
}