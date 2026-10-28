import React, { useState, useEffect } from 'react';
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

export default function UploadModal({ isOpen, onClose, onAdd, isDarkMode, userLocation }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState('כמו חדש (שמור ללא פגמים)');
  const [wanted, setWanted] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen && userLocation) {
      setLocation(userLocation);
    }
  }, [isOpen, userLocation]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // יצירת תצוגה מקדימה לתמונה כדי שהמשתמש יראה מה הוא העלה
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
          resolve(dataUrl);
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) return alert('חובה לבחור יישוב אמיתי מתוך הרשימה!');
    if (!category) return alert('חובה לבחור קטגוריה!');
    if (!image) return alert('חובה להעלות תמונה של הפריט לפני הפרסום! 📷');

    setIsUploading(true);

    try {
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
      setTitle('');
      setCategory('');
      setWanted('');
      setDescription('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("שגיאה בהמרת התמונה:", error);
      alert("אירעה שגיאה בעיבוד התמונה. נסה שוב.");
      setIsUploading(false);
    }
  };

  // סגנונות לשדות הקלט לקוד נקי יותר
  const inputStyles = `w-full border-2 rounded-2xl p-3.5 text-sm transition-all focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 ${
    isDarkMode 
      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 hover:border-gray-600' 
      : 'bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400 hover:border-stone-300'
  }`;

  return (
    /* כאן מגדירים ltr לרקע כדי שהגלילה תהיה בימין */
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200" dir="ltr">
      
      {/* כאן מחזירים את התוכן ל-rtl */}
      <div 
        dir="rtl" 
        className={`border-0 rounded-[2rem] max-w-lg w-full p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200 ${
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-stone-800'
        }`}
      >
        
        <button 
          type="button"
          onClick={onClose}
          className={`absolute left-5 top-5 text-xl font-bold cursor-pointer w-9 h-9 rounded-full flex items-center justify-center transition-all z-10 ${
            isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-stone-100 hover:bg-stone-200 text-stone-500'
          }`}
        >
          ✕
        </button>

        <div className="text-center space-y-2 mb-8 mt-2">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-3 shadow-inner">
            📦
          </div>
          <h3 className="text-2xl font-black text-stone-800 dark:text-white">העלאת פריט חדש</h3>
          <p className="text-sm text-stone-500 dark:text-gray-400">שתף חפצים שאתה לא צריך ותמצא דברים שאתה רוצה.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-xs font-black mb-1.5 text-stone-700 dark:text-gray-300">שם הפריט <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="למשל: מכונת קפה נספרסו שמורה"
              className={inputStyles}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black mb-1.5 text-stone-700 dark:text-gray-300">יישוב <span className="text-red-500">*</span></label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={inputStyles}
                required
              >
                <option value="" disabled>בחר עיר / אזור...</option>
                {ALLOWED_CITIES.map((city, idx) => (
                  <option key={idx} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black mb-1.5 text-stone-700 dark:text-gray-300">קטגוריה <span className="text-red-500">*</span></label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputStyles}
                required
              >
                <option value="" disabled>לאן זה שייך?</option>
                {Object.entries(CATEGORY_ICONS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black mb-1.5 text-stone-700 dark:text-gray-300">מצב הפריט <span className="text-red-500">*</span></label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className={inputStyles}
            >
              <option value="חדש באריזה">✨ חדש באריזה</option>
              <option value="כמו חדש (שמור ללא פגמים)">⭐ כמו חדש (שמור ללא פגמים)</option>
              <option value="בשימוש במצב טוב">👍 בשימוש במצב טוב</option>
              <option value="דורש תיקון קל">🔧 דורש תיקון קל</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black mb-1.5 text-stone-700 dark:text-gray-300">מה תרצה בתמורה? (אופציונלי)</label>
            <input 
              type="text" 
              value={wanted}
              onChange={(e) => setWanted(e.target.value)}
              placeholder="למשל: מחפש כלי עבודה, צמחים, או הצעות פתוחות"
              className={inputStyles}
            />
          </div>

          <div>
            <label className="block text-xs font-black mb-1.5 text-stone-700 dark:text-gray-300">תמונה של הפריט <span className="text-red-500">*</span></label>
            
            {/* אזור העלאת התמונה המעוצב החדש */}
            <div className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
              imagePreview 
                ? (isDarkMode ? 'border-amber-600 bg-amber-900/10' : 'border-amber-500 bg-amber-50')
                : (isDarkMode ? 'border-gray-700 bg-gray-800 hover:bg-gray-750' : 'border-stone-300 bg-stone-50 hover:bg-stone-100')
            }`}>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                required={!imagePreview}
              />
              
              {imagePreview ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-md">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-500">לחץ להחלפת תמונה</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-stone-500 dark:text-gray-400">
                  <span className="text-4xl">📸</span>
                  <span className="text-sm font-bold text-stone-700 dark:text-gray-300">לחץ כאן או גרור תמונה</span>
                  <span className="text-xs">פורמטים נתמכים: JPG, PNG</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-black mb-1.5 text-stone-700 dark:text-gray-300">תיאור קצר (אופציונלי)</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ספר קצת על הפריט, סיבת המסירה, למה הוא שווה..."
              rows={2}
              className={`${inputStyles} resize-none`}
            />
          </div>

          <button 
            type="submit"
            disabled={isUploading}
            className={`w-full font-black text-base py-4 rounded-2xl transition-all shadow-lg mt-4 cursor-pointer flex items-center justify-center gap-2 ${
              isUploading 
                ? 'bg-stone-300 dark:bg-gray-700 text-stone-500 cursor-not-allowed shadow-none' 
                : 'bg-amber-600 hover:bg-amber-700 hover:-translate-y-0.5 text-white'
            }`}
          >
            {isUploading ? (
              <>
                <span className="animate-spin text-xl">⏳</span> מעלה לענן...
              </>
            ) : (
              <>
                פרסם את הפריט לקהילה 🚀
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}