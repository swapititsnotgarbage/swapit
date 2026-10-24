import React, { useState } from 'react';
import { ALLOWED_CITIES } from '../Locations/cities'; 

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
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  // פונקציה לכיווץ התמונה לפני ההמרה ל-Base64 כדי שלא נעבור את מגבלת ה-1MB של Firestore
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // שמירה כ-JPEG באיכות 60% כדי להבטיח משקל נמוך מ-1MB
          const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
          resolve(dataUrl);
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
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

    setIsUploading(true);

    try {
      // כיווץ התמונה והמרתה לטקסט 
      const compressedBase64Image = await compressImage(image);

      onAdd({
        title,
        category,
        location,
        condition,
        wanted,
        description,
        image: compressedBase64Image 
      });

      setIsUploading(false);
    } catch (error) {
      console.error("שגיאה בהמרת התמונה:", error);
      alert("אירעה שגיאה בעיבוד התמונה. נסה שוב.");
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto" dir="rtl">
      <div className={`border rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative my-8 ${
        isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-stone-200 text-stone-800'
      }`}>
        
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
            disabled={isUploading}
            className={`w-full font-extrabold py-3.5 rounded-xl transition-all shadow-md cursor-pointer ${
              isUploading ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-amber-700 hover:bg-amber-800 text-white'
            }`}
          >
            {isUploading ? 'מעלה פריט ותמונה לענן...' : 'פרסם פריט 🌱'}
          </button>

        </form>
      </div>
    </div>
  );
}