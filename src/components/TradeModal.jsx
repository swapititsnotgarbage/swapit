import React, { useState } from 'react';

export default function TradeModal({ targetItem, myItems, onClose, onSuccess }) {
  const [selectedMyItem, setSelectedMyItem] = useState(null);

  if (!targetItem) return null;

  const handleSendTrade = () => {
    if (!selectedMyItem) {
      alert('נא לבחור פריט שלך להצעה!');
      return;
    }
    alert(`הצעת ברטר נשלחה בהצלחה! הצעת את "${selectedMyItem.title}" תמורת "${targetItem.title}" 🤝`);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-gray-700 pb-4">
          <h3 className="text-xl font-bold text-emerald-400">🤝 בחר פריט שלך להציע תמורת: {targetItem.title}</h3>
          <button 
            onClick={onClose}
            className="bg-gray-900 hover:bg-gray-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-gray-300">
          בחר איזה מן הפריטים שלך (מהאיזור האישי) תרצה לתת בברטר תמורת הפריט הנבחר:
        </p>

        {myItems.length === 0 ? (
          <div className="bg-gray-900/60 p-6 rounded-2xl text-center space-y-3 border border-gray-700">
            <p className="text-sm text-yellow-400">אין לך עדיין מוצרים זמינים להחלפה באיזור האישי.</p>
            <p className="text-xs text-gray-400">עליך להעלות לפחות פריט אחד דרך כפתור "+ העלה פריט להחלפה" כדי שתוכל להציע אותו בברטר!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1">
            {myItems.map(item => (
              <div 
                key={item.id}
                onClick={() => setSelectedMyItem(item)}
                className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                  selectedMyItem?.id === item.id 
                    ? 'border-emerald-500 bg-emerald-950/40' 
                    : 'border-gray-700 bg-gray-900/60 hover:border-gray-500'
                }`}
              >
                <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-xl flex-shrink-0" />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm text-white truncate">{item.title}</h4>
                  <span className="text-xs text-gray-400">📍 {item.location}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedMyItem && (
          <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-2xl flex items-center justify-between text-sm">
            <span>בחרת להציע: <strong className="text-emerald-400">{selectedMyItem.title}</strong></span>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-lg">מוכן לשליחה</span>
          </div>
        )}

        <div className="pt-2 flex gap-3">
          <button 
            onClick={handleSendTrade}
            disabled={!selectedMyItem || myItems.length === 0}
            className={`flex-1 font-extrabold py-3 rounded-xl transition-all text-center cursor-pointer ${
              selectedMyItem && myItems.length > 0
                ? 'bg-emerald-500 hover:bg-emerald-600 text-gray-950 shadow-lg shadow-emerald-500/20' 
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            שלח הצעת ברטר 🚀
          </button>
          <button 
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-5 py-3 rounded-xl transition-all cursor-pointer"
          >
            ביטול
          </button>
        </div>

      </div>
    </div>
  );
}