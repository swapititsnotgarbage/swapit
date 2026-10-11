import React, { useState } from 'react';

// מילון אייקונים ושמות מלא לכל הקטגוריות
const categoryData = {
  furniture: { name: 'ריהוט וציוד לבית', icon: '🛋️' },
  kitchen: { name: 'מטבח ובישול', icon: '🍳' },
  tools: { name: 'כלי עבודה וגינון', icon: '🔨' },
  electronics: { name: 'מוצרי חשמל', icon: '💻' },
  garden: { name: 'גינה וצמחים', icon: '🪴' },
  plants: { name: 'צמחים ופרחים', icon: '🌿' },
  sports: { name: 'ספורט ופנאי', icon: '⚽' },
  fitness: { name: 'כושר ויוגה', icon: '🧘‍♂️' },
  kids: { name: 'תינוקות וילדים', icon: '👶' },
  boardgames: { name: 'משחקי קופסה', icon: '🎲' },
  books: { name: 'ספרים', icon: '📚' },
  fashion: { name: 'ביגוד והנעלה', icon: '👗' },
  art: { name: 'אמנות ויצירה', icon: '🎨' },
  music: { name: 'מוזיקה וכלי נגינה', icon: '🎸' },
  camping: { name: 'קמפינג וטיולים', icon: '🏕️' },
  gaming: { name: 'גיימינג', icon: '🎮' },
  office: { name: 'ציוד משרדי', icon: '🖥️' },
  photography: { name: 'צילום', icon: '📸' },
  decor: { name: 'תאורה ועיצוב', icon: '💡' },
  baking: { name: 'אפייה', icon: '🧁' },
  auto: { name: 'רכב ומוטוריקה', icon: '🚗' },
  pets: { name: 'חיות מחמד', icon: '🐾' },
  beauty: { name: 'טיפוח', icon: '🕯️' },
  hobbies: { name: 'תחביבים', icon: '🎯' },
  other: { name: 'שונות', icon: '📦' }
};

export default function CategoryGrid({ items = [], selectedCategory, onSelectCategory, isDarkMode }) {
  const [showAll, setShowAll] = useState(false);

  // ספירת כמות הפריטים לכל קטגוריה מתוך מערך הפריטים
  const counts = items.reduce((acc, item) => {
    const cat = item.category;
    if (cat) {
      acc[cat] = (acc[cat] || 0) + 1;
    }
    return acc;
  }, {});

  // מיון הקטגוריות: מהפופולרית ביותר (עם הכי הרבה פריטים) לפחותה
  const sortedCategories = Object.keys(categoryData).sort((a, b) => {
    const countA = counts[a] || 0;
    const countB = counts[b] || 0;
    return countB - countA;
  });

  // הצגת 8 הראשונות כברירת מחדל, או את כולן בלחיצה
  const visibleCategories = showAll ? sortedCategories : sortedCategories.slice(0, 8);

  return (
    <div className="w-full py-4 space-y-3" dir="rtl">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-stone-800'}`}>
          קטגוריות מובילות לפי פופולריות 🏷️
        </h2>
        {sortedCategories.length > 8 && (
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-bold text-amber-700 hover:underline cursor-pointer"
          >
            {showAll ? 'הצג פחות ▲' : 'הצג את כל הקטגוריות ▼'}
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
        {visibleCategories.map((key) => {
          const isSelected = selectedCategory === key;
          const catInfo = categoryData[key] || { name: key, icon: '📦' };
          const itemCnt = counts[key] || 0;

          return (
            <button
              key={key}
              onClick={() => onSelectCategory(isSelected ? null : key)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer relative ${
                isSelected 
                  ? 'bg-amber-700 border-amber-700 text-white shadow-lg scale-105' 
                  : isDarkMode 
                    ? 'bg-gray-800/80 border-gray-700 text-gray-200 hover:bg-gray-700' 
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-amber-50 hover:border-amber-200'
              }`}
            >
              {/* תגית מספר הפריטים בקטגוריה */}
              <span className={`absolute top-1.5 left-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-xs ${
                isSelected 
                  ? 'bg-white text-amber-800' 
                  : 'bg-amber-700 text-white'
              }`}>
                {itemCnt}
              </span>

              <span className="text-2xl mb-1">{catInfo.icon}</span>
              <span className="text-xs font-medium text-center truncate w-full">
                {catInfo.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}