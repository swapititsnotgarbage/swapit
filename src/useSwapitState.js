import { useState, useEffect } from 'react';

export function useSwapitState() {
  // נשאר רק המבנה הבסיסי של הקטגוריות, בלי פריטי הדמה!
  const [categories, setCategories] = useState([
    { id: 'furniture', name: 'ריהוט וציוד לבית', icon: '🛋️', items: [] },
    { id: 'electronics', name: 'מוצרי חשמל', icon: '💻', items: [] },
    { id: 'tools', name: 'כלי עבודה וגינון', icon: '🔨', items: [] },
    { id: 'kitchen', name: 'מטבח ובישול', icon: '🍳', items: [] },
    { id: 'plants', name: 'צמחים ופרחים', icon: '🌿', items: [] },
    { id: 'sports', name: 'ספורט ופנאי', icon: '⚽', items: [] }
  ]);
  
  const [myItems, setMyItems] = useState([]);
  const [trades, setTrades] = useState([]);
  const [messages, setMessages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState([]);
  
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  // טעינת מועדפים ומצב לילה מהזיכרון המקומי
  useEffect(() => {
    try {
      const localFavs = JSON.parse(localStorage.getItem('swapit_favorites')) || [];
      setFavorites(localFavs);
      const localDark = localStorage.getItem('swapit_dark_mode') === 'true';
      setIsDarkMode(localDark);
    } catch(e) {}
  }, []);

  const handleToggleFavorite = (itemId) => {
    const newFavs = favorites.includes(itemId) ? favorites.filter(id => id !== itemId) : [...favorites, itemId];
    setFavorites(newFavs);
    localStorage.setItem('swapit_favorites', JSON.stringify(newFavs));
  };

  // פונקציות ריקות - הפעולות האמיתיות קורות עכשיו ב-useCloudData!
  const handleDeleteMyItem = () => {};
  const handleUpdateMyItem = () => {};
  const handleSendTradeOffer = () => {};
  const handleUpdateTradeStatus = () => {};
  const handleSendMessage = () => {};
  const handleAddRating = () => {};
  const handleLogout = () => {};

  return {
    categories, myItems, trades, messages, favorites, ratings,
    isDarkMode, searchQuery, selectedRegion, selectedCondition, minRating, selectedCategory,
    selectedItem, isUploadOpen, isProfileOpen, isMenuOpen, tradeTargetItem, activeFloatingTrade,
    setIsDarkMode, setSearchQuery, setSelectedRegion, setSelectedCondition, setMinRating, setSelectedCategory,
    setSelectedItem, setIsUploadOpen, setIsProfileOpen, setIsMenuOpen, setTradeTargetItem, setActiveFloatingTrade,
    handleToggleFavorite, handleDeleteMyItem, handleUpdateMyItem, handleSendTradeOffer,
    handleUpdateTradeStatus, handleSendMessage, handleAddRating, handleLogout
  };
}