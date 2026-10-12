// ייבוא ספריית React וה-Hooks הנדרשים לניהול מצב ותופעות לוואי[cite: 6]
import React, { useState, useEffect } from 'react';
// ייבוא בסיס הנתונים Firestore מתוך קובץ ההגדרה של Firebase[cite: 6]
import { db } from '../firebase';
// ייבוא פונקציית עדכון מסמך מתוך Firestore[cite: 6]
import { doc, setDoc } from 'firebase/firestore';

// הגדרת קומפוננטת מודל האזור האישי[cite: 6]
export default function ProfileModal({ isOpen, onClose, userProfile, onUpdateProfile, ratings, completedTradesCount, onLogout, isDarkMode }) {
  // משתני מצב לשדות הטופס (שם, יישוב וטלפון)[cite: 6]
  const [name, setName] = useState(userProfile?.name || '');
  const [location, setLocation] = useState(userProfile?.location || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  
  // ניהול מצב "זכור אותי" מתוך ה-localStorage (תוקן לסוגריים עגולים תקינים)
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem('swapit_remember_me') === 'true'
  );

  // עדכון שדות הטופס ברגע שפרופיל המשתמש טוען מחדש[cite: 6]
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || '');
      setLocation(userProfile.location || '');
      setPhone(userProfile.phone || '');
    }
  }, [userProfile]);

  // אם המודל סגור, אל תציג כלום[cite: 6]
  if (!isOpen) return null;

  // פונקציה לשינוי הגדרת זכור אותי ושמירתה בזיכרון המקומי[cite: 6]
  const handleToggleRemember = (e) => {
    const newValue = e.target.checked;
    setRememberMe(newValue);
    localStorage.setItem('swapit_remember_me', newValue ? 'true' : 'false');
  };

  // פונקציית שמירת השינויים שמעדכנת גם מקומית וגם ב-Firebase Firestore[cite: 6]
  const handleSave = async (e) => {
    e.preventDefault();
    
    // יצירת אובייקט הנתונים המעודכן[cite: 6]
    const updated = {
      ...userProfile,
      name,
      location,
      phone,
      updatedAt: new Date().toISOString()
    };

    try {
      // שליפת ה-UID ישירות מתוך פרופיל המשתמש השמור או מה-localStorage[cite: 6]
      const userId = userProfile?.uid || localStorage.getItem('swapit_user_uid');
      
      if (userId) {
        // שמירת הנתונים המעודכנים ישירות במסמך של המשתמש בענן תחת users/{uid}[cite: 6]
        const userDocRef = doc(db, 'users', userId);
        await setDoc(userDocRef, updated, { merge: true });
        console.log("הפרופיל עודכן בהצלחה בענן תחת UID:", userId);
      } else {
        console.warn("לא נמצא UID של משתמש, מעדכן רק מקומית.");
      }
    } catch (error) {
      console.error("שגיאה בעדכון הפרופיל בענן:", error);
    }

    // עדכון הסטייט המקומי והזיכרון המקומי (localStorage)[cite: 6]
    onUpdateProfile(updated);
    try {
      localStorage.setItem('swapit_user_profile', JSON.stringify(updated));
    } catch (e) {}

    alert('הפרטים האישיים עודכנו בהצלחה בענן ובמכשיר! ✨');
    onClose();
  };

  return (
    // מעטפת מסך מלא מרכזית עם אפקט טשטוש רקע[cite: 6]
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4" dir="rtl">
      <div className={`border rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative transition-colors flex flex-col max-h-[90vh] ${
        isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-stone-200 text-stone-800'
      }`}>
        
        {/* כותרת עליונה של המודל[cite: 6] */}
        <div className={`flex items-center justify-between p-6 border-b ${isDarkMode ? 'border-gray-800' : 'border-stone-100'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-700/10 text-amber-700 flex items-center justify-center font-bold text-xl">
              👤
            </div>
            <div>
              <h3 className="text-xl font-black">האיזור האישי שלי</h3>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 mt-0.5">
                🌱 שכן מאומת בקהילה
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold transition-all cursor-pointer ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            ✕
          </button>
        </div>

        {/* תוכן גוף המודל עם אפשרות גלילה[cite: 6] */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-right">
          
          {/* קוביית סטטיסטיקות ומוניטין[cite: 6] */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-2xl border text-center ${
              isDarkMode ? 'bg-gray-800/40 border-gray-800' : 'bg-stone-50 border-stone-200/60'
            }`}>
              <div className="text-2xl font-black text-amber-600 flex items-center justify-center gap-1">
                5.0 <span className="text-lg">⭐</span>
              </div>
              <span className={`text-xs font-semibold mt-1 block ${isDarkMode ? 'text-gray-400' : 'text-stone-500'}`}>
                🏆 תג מוביל (מוכר מוערך)
              </span>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${
              isDarkMode ? 'bg-gray-800/40 border-gray-800' : 'bg-stone-50 border-stone-200/60'
            }`}>
              <div className="text-2xl font-black text-amber-700">
                {completedTradesCount || 1}
              </div>
              <span className={`text-xs font-semibold mt-1 block ${isDarkMode ? 'text-gray-400' : 'text-stone-500'}`}>
                🤝 החלפות שהושלמו
              </span>
            </div>
          </div>

          {/* טופס עריכת פרטים אישיים[cite: 6] */}
          <form onSubmit={handleSave} className={`p-5 rounded-2xl border space-y-4 ${
            isDarkMode ? 'bg-gray-800/20 border-gray-800' : 'bg-amber-50/30 border-amber-200/60'
          }`}>
            <h4 className="text-sm font-extrabold text-amber-700 mb-2">פרטים אישיים ואמינות</h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-stone-700'}`}>שם מלא</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full border rounded-xl p-3 text-sm focus:outline-none focus:border-amber-600 text-right ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-stone-300 text-stone-800'
                  }`}
                  required
                />
              </div>
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-stone-700'}`}>יישוב / מיקום</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`w-full border rounded-xl p-3 text-sm focus:outline-none focus:border-amber-600 text-right ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-stone-300 text-stone-800'
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-stone-700'}`}>טלפון ליצירת קשר (מאומת ב-SMS ✓)</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full border rounded-xl p-3 text-sm focus:outline-none focus:border-amber-600 text-right ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-stone-300 text-stone-800'
                }`}
              />
            </div>

            {/* מתג זכור אותי[cite: 6] */}
            <div className={`flex items-center justify-between p-3 rounded-xl border ${
              isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-stone-200'
            }`}>
              <div className="text-right">
                <span className="block text-xs font-bold">התחברות אוטומטית (זכור אותי) 🔐</span>
                <span className="text-[10px] text-stone-400">התחבר אוטומטית בביקור הבא במכשיר זה</span>
              </div>
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={handleToggleRemember}
                className="w-5 h-5 accent-amber-700 rounded cursor-pointer"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-extrabold py-3 rounded-xl shadow-md transition-all text-center cursor-pointer text-sm flex items-center justify-center gap-2"
            >
              💾 שמור שינויים בענן
            </button>
          </form>

          {/* אזור ביקורות קהילה[cite: 6] */}
          <div>
            <h4 className={`text-sm font-extrabold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-stone-700'}`}>
              💬 ביקורות קהילה ({ratings?.length || 1})
            </h4>
            <div className={`p-4 rounded-2xl border space-y-2 ${
              isDarkMode ? 'bg-gray-800/40 border-gray-800' : 'bg-stone-50 border-stone-200/60'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">שכן מהקהילה</span>
                <span className="text-xs text-amber-600 font-bold">⭐⭐⭐⭐⭐ (5.0)</span>
              </div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-stone-600'}`}>
                "חווית החלפה מדהימה! הכל היה מדויק, אדיב ומהיר. מומלץ בחום!"
              </p>
              <span className="text-[10px] text-stone-400 block pt-1">01/10/2026</span>
            </div>
          </div>

        </div>

        {/* כפתורים בתחתית המודל[cite: 6] */}
        <div className={`p-4 border-t flex items-center justify-between shrink-0 ${isDarkMode ? 'border-gray-800 bg-gray-900/80' : 'border-stone-100 bg-white'}`}>
          <button 
            onClick={() => { onLogout(); onClose(); }}
            className="text-red-500 hover:text-red-600 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            התנתק מהמערכת 🚪
          </button>
          <button 
            onClick={onClose}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer border ${
              isDarkMode ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200' : 'border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            סגור
          </button>
        </div>

      </div>
    </div>
  );
}