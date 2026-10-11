import React from 'react';

export default function ItemModal({ item, onClose, onStartTrade, isDarkMode }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4" dir="rtl">
      <div className={`border rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative transition-colors flex flex-col max-h-[90vh] ${
        isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-800'
      }`}>
        
        {/* תמונת הפריט ותגיות צפות */}
        <div className="relative h-72 w-full bg-gray-900 shrink-0">
          <img 
            src={item.image || 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80'} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* כפתור סגירה צף */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center font-bold text-lg backdrop-blur-md transition-all cursor-pointer z-10"
          >
            ✕
          </button>

          {/* תגיות צפות על התמונה */}
          <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between pointer-events-none">
            <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5">
              📍 {item.location || 'ישראל'}
            </span>
            <span className="bg-emerald-600/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
              ✨ {item.condition || 'כמו חדש'}
            </span>
          </div>
        </div>

        {/* תוכן המודל */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 text-right">
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-black tracking-tight">{item.title}</h2>
            <button className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              isDarkMode ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300' : 'border-gray-200 bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}>
              🚨 דיווח
            </button>
          </div>

          {/* מה מחפש בתמורה */}
          <div className={`p-4 rounded-2xl border ${
            isDarkMode ? 'bg-gray-800/50 border-gray-800' : 'bg-orange-50/50 border-orange-100'
          }`}>
            <span className="text-xs font-bold text-orange-500 block mb-1">מה בעל הפריט מחפש בתמורה?</span>
            <p className="text-sm font-medium flex items-center gap-2">
              🎯 {item.wanted || 'פתוח להצעות מעניינות'}
            </p>
          </div>

          {/* תיאור הפריט */}
          <div>
            <span className={`text-xs font-semibold block mb-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>תיאור הפריט:</span>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {item.description || 'אין תיאור נוסף.'}
            </p>
          </div>
        </div>

        {/* כפתורי פעולה בתחתית */}
        <div className={`p-4 border-t flex gap-3 shrink-0 ${isDarkMode ? 'border-gray-800 bg-gray-900/80' : 'border-gray-100 bg-white'}`}>
          <button 
            onClick={onClose}
            className={`px-6 py-3.5 rounded-2xl font-bold text-sm transition-all cursor-pointer border ${
              isDarkMode ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200' : 'border-gray-200 bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            סגור
          </button>
          <button 
            onClick={() => onStartTrade(item)}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all text-center cursor-pointer text-base flex items-center justify-center gap-2"
          >
            🤝 הצע החלפה לפריט זה
          </button>
        </div>

      </div>
    </div>
  );
}