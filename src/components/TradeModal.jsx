import React, { useState } from 'react';

export default function TradeModal({ targetItem, myItems, onClose, onSuccess, isDarkMode }) {
  const [selectedMyItem, setSelectedMyItem] = useState(null);

  if (!targetItem) return null;

  const handleSendTrade = () => {
    if (!selectedMyItem) {
      alert('נא לבחור פריט שלך להצעה!');
      return;
    }
    alert(`הצעת ברטר נשלחה בהצלחה! הצעת את "${selectedMyItem.title}" תמורת "${targetItem.title}" 🤝`);
    onSuccess(selectedMyItem); // כאן תוקן - מעביר את הפריט שבחרנו ל-App.jsx
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" dir="rtl">
      <div className={`border rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative p-6 space-y-6 max-h-[90vh] overflow-y-auto ${
        isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-stone-200 text-stone-800'
      }`}>
        
        <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-gray-800' : 'border-stone-100'}`}>
          <h3 className="text-xl font-bold text-amber-700">🤝 בחר פריט שלך להציע תמורת: {targetItem.title}</h3>
          <button 
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-pointer transition-all ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            ✕
          </button>
        </div>

        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-stone-600'}`}>
          בחר איזה מן הפריטים שלך (מהאיזור האישי) תרצה לתת בברטר תמורת הפריט הנבחר:
        </p>

        {myItems.length === 0 ? (
          <div className={`p-6 rounded-2xl text-center space-y-3 border ${
            isDarkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-amber-50/50 border-amber-200'
          }`}>
            <p className="text-sm text-amber-600 font-bold">אין לך עדיין מוצרים זמינים להחלפה באיזור האישי.</p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-stone-500'}`}>עליך להעלות לפחות פריט אחד דרך כפתור "+ העלה פריט להחלפה" כדי שתוכל להציע אותו בברטר!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1">
            {myItems.map(item => (
              <div 
                key={item.id}
                onClick={() => setSelectedMyItem(item)}
                className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                  selectedMyItem?.id === item.id 
                    ? 'border-amber-600 bg-amber-600/10 shadow-sm' 
                    : isDarkMode 
                      ? 'border-gray-700 bg-gray-800 hover:border-gray-500' 
                      : 'border-stone-200 bg-stone-50 hover:border-amber-300'
                }`}
              >
                <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-xl flex-shrink-0" />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm truncate">{item.title}</h4>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-stone-500'}`}>📍 {item.location}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedMyItem && (
          <div className={`p-4 rounded-2xl flex items-center justify-between text-sm border ${
            isDarkMode ? 'bg-amber-900/20 border-amber-700/30' : 'bg-amber-50 border-amber-200'
          }`}>
            <span>בחרת להציע: <strong className="text-amber-700">{selectedMyItem.title}</strong></span>
            <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-lg font-bold">מוכן לשליחה</span>
          </div>
        )}

        <div className="pt-2 flex gap-3">
          <button 
            onClick={handleSendTrade}
            disabled={!selectedMyItem || myItems.length === 0}
            className={`flex-1 font-extrabold py-3 rounded-xl transition-all text-center cursor-pointer ${
              selectedMyItem && myItems.length > 0
                ? 'bg-amber-700 hover:bg-amber-800 text-white shadow-md' 
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
          >
            שלח הצעת ברטר 🚀
          </button>
          <button 
            onClick={onClose}
            className={`font-bold px-5 py-3 rounded-xl transition-all cursor-pointer border ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700 text-white' : 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-700'
            }`}
          >
            ביטול
          </button>
        </div>

      </div>
    </div>
  );
}