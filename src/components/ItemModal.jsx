import React from 'react';

export default function ItemModal({ item, onClose, onStartTrade, onReport, isDarkMode }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200" dir="rtl">
      <div className={`rounded-3xl max-w-lg w-full shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-stone-800'
      }`}>
        
        <div className="relative h-64 sm:h-72 w-full bg-stone-100 dark:bg-gray-800 shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center font-bold transition-all cursor-pointer"
          >
            ✕
          </button>
          
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <span className="bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold border border-white/10 shadow-lg">
              📍 {item.location}
            </span>
          </div>

          <div className="absolute bottom-4 left-4">
            <span className="bg-amber-700/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
              ✨ {item.condition}
            </span>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-black">{item.title}</h2>
            <button 
              onClick={() => onReport && onReport(item)}
              className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-full font-bold hover:bg-red-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              דיווח 🚨
            </button>
          </div>

          {item.wanted && (
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-amber-900/10 border-amber-900/30' : 'bg-amber-50/50 border-amber-100'}`}>
              <h4 className="text-sm font-bold text-amber-700 mb-1">מה בעל הפריט מחפש בתמורה?</h4>
              <p className="text-sm font-medium">{item.wanted} 🎯</p>
            </div>
          )}

          {item.description && (
            <div>
              <h4 className="text-sm font-bold mb-2 text-stone-500">תיאור הפריט:</h4>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{item.description}</p>
            </div>
          )}
        </div>

        <div className={`p-4 border-t flex gap-3 shrink-0 ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-stone-100 bg-white'}`}>
          <button 
            onClick={() => onStartTrade(item)}
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-black py-3.5 rounded-2xl transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer text-sm md:text-base flex items-center justify-center gap-2"
          >
            הצע החלפה לפריט זה 🤝
          </button>
          <button 
            onClick={onClose}
            className={`px-6 font-bold rounded-2xl text-sm transition-all cursor-pointer ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            סגור
          </button>
        </div>

      </div>
    </div>
  );
}