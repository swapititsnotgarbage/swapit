import React from 'react';

export default function ItemCard({ item, onSelect, isFavorite, onToggleFavorite, isDarkMode }) {
  return (
    <div 
      onClick={() => onSelect(item)}
      className={`min-w-[260px] max-w-[260px] border rounded-2xl overflow-hidden flex-shrink-0 hover:shadow-md transition-all group cursor-pointer relative ${
        isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}
    >
      {/* כפתור מועדפים (לב) */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(item.id);
        }}
        className={`absolute top-2 left-2 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-xs ${
          isFavorite 
            ? 'bg-emerald-700 text-white' 
            : isDarkMode 
              ? 'bg-gray-800/90 text-gray-300 hover:text-white border border-gray-700' 
              : 'bg-white/90 text-gray-600 hover:text-gray-900 border border-gray-200'
        }`}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      <div className={`h-44 w-full overflow-hidden relative ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className={`absolute bottom-2 right-2 backdrop-blur-sm text-xs px-2.5 py-1 rounded-lg font-medium border ${
          isDarkMode 
            ? 'bg-gray-900/90 border-gray-700 text-gray-300' 
            : 'bg-white/90 border-gray-200/60 text-gray-700'
        }`}>
          <span>{item.location}</span> <span>📍</span>
        </span>
      </div>

      <div className="p-4 space-y-2.5">
        <h4 className={`font-bold text-base truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
        <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium line-clamp-1">
          <span>מחפש: {item.wanted}</span> <span>🎯</span>
        </p>
        <button className={`w-full mt-1 text-xs font-bold py-2 rounded-xl transition-all border ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-emerald-700 hover:text-white hover:border-emerald-700' 
            : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-emerald-700 hover:text-white hover:border-emerald-700'
        }`}>
          <span>הצג פרטים והצע החלפה</span> <span>🤝</span>
        </button>
      </div>
    </div>
  );
}