// ייבוא ספריית React וה-Hooks לניהול מצב[cite: 3]
import React, { useState } from 'react';
// ייבוא אובייקט ה-Auth ובסיס הנתונים Firestore מתוך קובץ ההגדרה של Firebase[cite: 3]
import { auth, db } from '../firebase';
// ייבוא פונקציות ההתחברות של Google[cite: 3]
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// ייבוא פונקציות עבודה מול Firestore לבדיקה ושמירת מסמכים בענן[cite: 3]
import { doc, getDoc, setDoc } from 'firebase/firestore';
// ייבוא רשימת היישובים המרכזית מהקובץ החיצוני
import { ALLOWED_CITIES } from '../Locations/cities';

// הגדרת קומפוננטת אשף ההרשמה[cite: 3]
export default function OnboardingWizard({ onComplete, isDarkMode }) {
  // משתנה מצב לניהול השלב הנוכחי באשף[cite: 3]
  const [step, setStep] = useState('welcome');
  // משתני מצב לשמירת הפרטים בטופס[cite: 3]
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // פונקציה לטיפול בהתחברות עם Google ובדיקה בענן האם המשתמש כבר רשום[cite: 3]
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setCurrentUser(user);

      // שמירת ה-UID של המשתמש בזיכרון המקומי לשימוש עתידי באזור האישי[cite: 3]
      localStorage.setItem('swapit_user_uid', user.uid);

      // בדיקה בענן האם קיים כבר מסמך עבור ה-UID של המשתמש[cite: 3]
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        onComplete({
          uid: user.uid,
          name: userData.name || user.displayName || 'יובל לוי',
          location: userData.location || 'כפר מונש',
          phone: userData.phone || '050-1234567'
        });
      } else {
        setName(user.displayName || 'יובל לוי');
        setStep('details');
      }
    } catch (error) {
      console.error("שגיאה בהתחברות עם Google:", error);
      alert("שגיאה בהתחברות עם Google: " + error.message);
    }
  };

  // פונקציה לשמירת הפרטים החדשים בענן בסיום מילוי הטופס בפעם הראשונה[cite: 3]
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !location) {
      alert('נא למלא שם מלא ולבחור יישוב מתוך הרשימה');
      return;
    }

    const profileData = {
      uid: currentUser?.uid || localStorage.getItem('swapit_user_uid'),
      name: name.trim(),
      location: location,
      phone: '050-1234567',
      email: currentUser?.email || '',
      updatedAt: new Date().toISOString()
    };

    try {
      if (profileData.uid) {
        const userDocRef = doc(db, 'users', profileData.uid);
        await setDoc(userDocRef, profileData, { merge: true });
        console.log("הנתונים נשמרו בהצלחה בענן!");
      }
    } catch (error) {
      console.error("שגיאה בשמירת הפרופיל בענן:", error);
      alert("שגיאה בשמירת הפרופיל בענן: " + error.message);
      return;
    }

    // מעבר לאתר[cite: 3]
    onComplete(profileData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4" dir="rtl">
      <div className={`border rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl relative ${
        isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-stone-200 text-stone-800'
      }`}>
        
        <div className="text-center space-y-2">
          <span className="text-4xl">🌱</span>
          <h3 className="text-2xl font-black">הצטרפות לקהילת SWAPIT</h3>
          <p className="text-xs text-stone-400">פלטפורמת הברטר הישראלית – זה לא זבל 🌱[cite: 3]</p>
        </div>

        {step === 'welcome' && (
          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              type="button"
              className={`w-full border rounded-2xl py-3.5 px-4 font-bold text-sm flex items-center justify-center gap-3 transition-all cursor-pointer ${
                isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-white' : 'bg-stone-50 border-stone-300 hover:bg-stone-100 text-stone-800'
              }`}
            >
              <span>🌐</span>
              <span>המשך באמצעות חשבון Google</span>
            </button>
          </div>
        )}

        {step === 'details' && (
          <form onSubmit={handleFinalSubmit} className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">שם מלא:</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full border rounded-xl p-3 text-sm text-right focus:outline-none focus:border-amber-600 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">יישוב / מיקום (בחר מהרשימה) *</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`w-full border rounded-xl p-3 text-sm text-right focus:outline-none focus:border-amber-600 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                  required
                >
                  <option value="" disabled>בחר יישוב מהרשימה...</option>
                  {ALLOWED_CITIES.map((city, idx) => (
                    <option key={idx} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
            >
              סיים הרשמה וכנס לאתר 🚀
            </button>
          </form>
        )}

      </div>
    </div>
  );
}