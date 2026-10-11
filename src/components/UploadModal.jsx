import React, { useState } from 'react';

// 🗺️ רשימת היישובים המורשית
const ALLOWED_CITIES = [
  "כפר מונש",
  "תל אביב - יפו",
  "ירושלים",
  "חיפה",
  "נתניה",
  "רמת גן",
  "גבעתיים",
  "פתח תקווה",
  "ראשון לציון",
  "רחובות",
  "נס ציונה",
  "הרצליה",
  "רמת השרון",
  "כפר סבא",
  "רעננה",
  "הוד השרון",
  "חדרה",
  "זכרון יעקב",
  "בנימינה",
  "קיסריה",
  "פרדס חנה-כרכור",
  "עמק חפר",
  "מגדים",
  "חיפה והקריות",
  "באר שבע",
  "אשדוד",
  "אשקלון",
  "מודיעין-מכבים-רעות",
  "צפון (גליל/גולן)",
  "דרום (אילת/נגב)"
].sort();

// 🏷️ קטגוריות ראשיות להעלאה
const CATEGORY_ICONS = {
  furniture: '🛋️ ריהוט וציוד לבית',
  kitchen: '🍳 מטבח ובישול',
  tools: '🔨 כלי עבודה וגינון',
  electronics: '💻 מוצרי חשמל',
  garden: '🪴 גינה וצמחים',
  plants: '🌿 צמחים ופרחים',
  sports: '⚽ ספורט ופנאי',
  fitness: '🧘‍♂️ כושר ויוגה',
  kids: '👶 תינוקות וילדים',
  boardgames: '🎲 משחקי קופסה',
  books: '📚 ספרים',
  fashion: '👗 ביגוד והנעלה',
  art: '🎨 אמנות ויצירה',
  music: '🎸 מוזיקה וכלי נגינה',
  camping: '🏕️ קמפינג וטיולים',
  gaming: '🎮 גיימינג',
  office: '🖥️ ציוד משרדי',
  photography: '📸 צילום',
  decor: '💡 תאורה ועיצוב',
  baking: '🧁 אפייה',
  auto: '🚗 רכב ומוטוריקה',
  pets: '🐾 חיות מחמד',
  beauty: '🕯️ טיפוח',
  hobbies: '🎯 תחביבים',
  other: '📦 שונות'
};

export default function UploadModal({ isOpen, onClose, onAdd, isDarkMode }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState('כמו חדש (שמור ללא פגמים)');
  const [wanted, setWanted] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location) {
      alert('חובה לבחור יישוב אמיתי מתוך הרשימה!');
      return;
    }
    if (!category) {
      alert('חובה לבחור קטגוריה!');
      return;
    }
    if (!image) {
      alert('חובה להעלות תמונה של הפריט לפני הפרסום! 📷');
      return;
    }

    const imageUrl = URL.createObjectURL(image);

    onAdd({
      title,
      category,
      location,
      condition,
      wanted,
      description,
      image: imageUrl
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto" dir="rtl">
      <div className={`border rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative my-8 ${
        isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-stone-200 text-stone-800'
      }`}>
        
        {/* כפתור סגירה */}
        <button 
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 text-stone-400 hover:text-stone-100 text-xl font-bold cursor-pointer w-8 h-8 rounded-full flex items-center justify-center bg-stone-800/40"
        >
          ✕
        </button>

        <div className="text-center space-y-1">
          <h3 className="text-xl font-black">העלאת פריט חדש להחלפה 🌱</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* שם הפריט */}
          <div>
            <label className="block text-xs font-bold mb-1">שם הפריט *</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="למשל: מכונת קפה / שטיח לסלון"
              className={`w-full border rounded-xl p-3 text-sm text-right focus:outline-none focus:border-amber-600 ${
                isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
              }`}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* מיקום */}
            <div>
              <label className="block text-xs font-bold mb-1">מיקום (עיר/אזור) *</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`w-full border rounded-xl p-3 text-sm text-right focus:outline-none focus:border-amber-600 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                }`}
                required
              >
                <option value="" disabled>למשל: תל אביב</option>
                {ALLOWED_CITIES.map((city, idx) => (
                  <option key={idx} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* קטגוריה */}
            <div>
              <label className="block text-xs font-bold mb-1">קטגוריה *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full border rounded-xl p-3 text-sm text-right focus:outline-none focus:border-amber-600 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                }`}
                required
              >
                <option value="" disabled>בחר קטגוריה...</option>
                {Object.entries(CATEGORY_ICONS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* מצב הפריט */}
          <div>
            <label className="block text-xs font-bold mb-1">מצב הפריט *</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className={`w-full border rounded-xl p-3 text-sm text-right focus:outline-none focus:border-amber-600 ${
                isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
              }`}
            >
              <option value="חדש באריזה">✨ חדש באריזה</option>
              <option value="כמו חדש (שמור ללא פגמים)">⭐ כמו חדש (שמור ללא פגמים)</option>
              <option value="בשימוש במצב טוב">👍 בשימוש במצב טוב</option>
              <option value="דורש תיקון קל">🔧 דורש תיקון קל</option>
            </select>
          </div>

          {/* מה תרצה לקבל בתמורה */}
          <div>
            <label className="block text-xs font-bold mb-1">מה תרצה לקבל בתמורה?</label>
            <input 
              type="text" 
              value={wanted}
              onChange={(e) => setWanted(e.target.value)}
              placeholder="למשל: מחפש כלי עבודה או ספרים"
              className={`w-full border rounded-xl p-3 text-sm text-right focus:outline-none focus:border-amber-600 ${
                isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
              }`}
            />
          </div>

          {/* תמונה - חובה */}
          <div>
            <label className="block text-xs font-bold mb-1">העלה תמונה מהמחשב / פלאפון (חובה) 📷 *</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className={`w-full border rounded-xl p-2 text-sm text-right ${
                isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
              }`}
              required
            />
          </div>

          {/* תיאור */}
          <div>
            <label className="block text-xs font-bold mb-1">תיאור קצר על הפריט</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ספר קצת על הפריט, סיבת המסירה, וכדומה..."
              rows={2}
              className={`w-full border rounded-xl p-3 text-sm text-right focus:outline-none focus:border-amber-600 ${
                isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
              }`}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-800 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
          >
            פרסם פריט 🌱
          </button>

        </form>
      </div>
    </div>
  );
}