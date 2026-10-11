import React from 'react';

export default function Navbar({ onOpenUpload, onOpenProfile, onOpenMenu, onOpenMyItems, userName, isDarkMode, onToggleDarkMode }) {
  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b px-6 py-4 flex items-center justify-between transition-colors ${
      isDarkMode ? 'bg-gray-900/95 border-gray-800 text-white' : 'bg-white/95 border-stone-200 text-gray-800 shadow-xs'
    }`}>
      
      {/* כפתורים מצד ימין */}
      <div className="flex items-center space-x-3 space-x-reverse">
        {/* תפריט ובקשות */}
        <button 
          onClick={onOpenMenu}
          className={`font-bold px-3 py-2 rounded-xl text-sm transition-all border flex items-center gap-2 cursor-pointer ${
            isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700 text-gray-200' : 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-700'
          }`}
        >
          <span>☰</span> <span>תפריט ובקשות</span>
        </button>

        <button 
          onClick={onOpenProfile}
          className={`font-bold px-4 py-2 rounded-xl text-sm transition-all border flex items-center gap-2 cursor-pointer ${
            isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700 text-gray-200' : 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-700'
          }`}
        >
          <span>{userName || 'האיזור האישי'}</span> <span>👤</span>
        </button>

        {/* הפריטים שלי */}
        <button 
          onClick={onOpenMyItems}
          className={`font-bold px-3 py-2 rounded-xl text-sm transition-all border flex items-center gap-1.5 cursor-pointer ${
            isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700 text-gray-200' : 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-700'
          }`}
        >
          <span>הפריטים שלי</span> <span>📦</span>
        </button>

        {/* העלה פריט להחלפה - בצבע חום-עץ חם */}
        <button 
          onClick={onOpenUpload}
          className="bg-amber-700 hover:bg-amber-800 text-white font-bold px-4 py-2 rounded-xl text-sm transition-all shadow-md shadow-amber-900/10 cursor-pointer flex items-center gap-1.5"
        >
          <span>העלה פריט להחלפה</span> <span>+</span>
        </button>

        {/* כפתור החלפת מצב תאורה */}
        <button 
          onClick={onToggleDarkMode}
          className={`p-2 rounded-xl border text-sm transition-all cursor-pointer ${
            isDarkMode ? 'bg-gray-800 border-gray-700 text-amber-400' : 'bg-stone-100 border-stone-300 text-stone-700'
          }`}
          title="החלף מצב תאורה"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* לוגו האתר משמאל */}
      <div className="flex items-center space-x-3 space-x-reverse">
        <span className={`text-xs px-3 py-1 rounded-full border hidden sm:inline-block font-medium ${
          isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-amber-50 border-amber-200 text-amber-800'
        }`}>
          זה לא זבל 🌱 (It's Not Garbage)
        </span>
        <h1 className="text-2xl font-black tracking-wider text-amber-700 flex items-center gap-1.5">
          <span>🌱</span>
          <span>SWAP<span className={isDarkMode ? 'text-white' : 'text-stone-800'}>IT</span></span>
        </h1>
      </div>
      
    </header>
  );
}