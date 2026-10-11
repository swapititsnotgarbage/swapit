import React, { useState } from 'react';

export default function Banner({ searchQuery, setSearchQuery, selectedRegion, setSelectedRegion, selectedCondition, setSelectedCondition, minRating, setMinRating, isDarkMode }) {
  const [showFilters, setShowFilters] = useState(false);
  const regions = ['הכל', 'שרון', 'מרכז', 'צפון', 'דרום', 'ירושלים'];
  const conditions = ['הכל', 'חדש לגמרי', 'כמו חדש', 'משומש'];

  return (
    <section className="px-6 py-8 max-w-7xl mx-auto">
      <div className={`border rounded-3xl p-8 md:p-12 relative overflow-hidden space-y-6 text-center flex flex-col items-center shadow-xs transition-colors ${
        isDarkMode 
          ? 'bg-gradient-to-l from-gray-900 via-gray-900 to-gray-800 border-gray-800 text-white' 
          : 'bg-gradient-to-l from-stone-100 via-amber-50/50 to-white border-amber-200/50 text-gray-900'
      }`}>
        
        {/* 🌿 תגית קהילתית ייחודית - בצבע חום-אדמה עדין */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${
          isDarkMode ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-amber-100/70 border-amber-200 text-amber-800'
        }`}>
          <span>חברי הקהילה חסכו השבוע 142 ק"ג פריטים מזריקה לאשפה</span>
        </div>

        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            האוצר של מישהו אחר <br/>
            מחכה בדיוק לך.
          </h2>
          <p className={`text-sm md:text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            בלי כסף, בלי תיווך, ובלי כאב ראש. <br/>
            מחליפים פריטים שיושבים במחסן בדברים שבאמת צריך.
          </p>
          
          <div className="flex gap-3 pt-2">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="מה בא לך למצוא או להחליף היום?" 
              className={`border rounded-xl px-4 py-3 text-sm w-full focus:outline-none text-right shadow-xs ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-amber-400 placeholder-gray-400' 
                  : 'bg-white border-stone-300 text-gray-800 focus:border-amber-500 placeholder-stone-400'
              }`}
            />
          </div>
        </div>

        {/* כפתור סינון מתקדם וכפתור מועדפים - בצבע חום-עץ חם */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-amber-700 hover:bg-amber-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>סינון מתקדם ⚙️</span>
          </button>

          <button
            onClick={() => setSelectedRegion(selectedRegion === '❤️ המועדפים שלי' ? 'הכל' : '❤️ המועדפים שלי')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedRegion === '❤️ המועדפים שלי'
                ? 'bg-amber-700 text-white shadow-sm' 
                : isDarkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700' 
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-300'
            }`}
          >
            <span>המועדפים שלי 🤍</span>
          </button>
        </div>

        {/* פאנל סינון מתקדם נפתח */}
        {showFilters && (
          <div className={`w-full max-w-2xl p-5 rounded-2xl border flex flex-col md:flex-row gap-4 items-center justify-around text-xs animate-in fade-in duration-200 ${
            isDarkMode ? 'bg-gray-800/95 border-gray-700 text-gray-200' : 'bg-white border-amber-200 shadow-md text-gray-700'
          }`}>
            <div className="space-y-1.5 w-full md:w-auto text-right">
              <label className="font-bold block">אזור בארץ:</label>
              <select 
                value={selectedRegion === '❤️ המועדפים שלי' ? 'הכל' : selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className={`w-full p-2 rounded-xl border text-xs focus:outline-none focus:border-amber-400 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-stone-50 border-stone-300'}`}
              >
                <option value="הכל">הכל (כל הארץ)</option>
                {regions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="space-y-1.5 w-full md:w-auto text-right">
              <label className="font-bold block">מצב הפריט:</label>
              <select 
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className={`w-full p-2 rounded-xl border text-xs focus:outline-none focus:border-amber-400 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-stone-50 border-stone-300'}`}
              >
                {conditions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-1.5 w-full md:w-auto text-right">
              <label className="font-bold block">דירוג מוכר מינימלי ⭐:</label>
              <select 
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className={`w-full p-2 rounded-xl border text-xs focus:outline-none focus:border-amber-400 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-stone-50 border-stone-300'}`}
              >
                <option value={0}>הכל (ללא הגבלה)</option>
                <option value={4.0}>4.0 ומעלה ⭐</option>
                <option value={4.5}>4.5 ומעלה ⭐</option>
              </select>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}