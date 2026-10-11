import React, { useState } from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// רשימת היישובים המורשית (כמו בהעלאת פריט)
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

export default function OnboardingWizard({ onComplete, isDarkMode }) {
  const [step, setStep] = useState('welcome');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setName(user.displayName || 'משתמש גוגל');
      setPhone(user.phoneNumber || '');
      setStep('details');
    } catch (error) {
      console.error("שגיאה בהתחברות עם Google:", error);
      alert("שגיאה בהתחברות עם Google: " + error.message);
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !location) {
      alert('נא למלא שם מלא ולבחור יישוב מתוך הרשימה');
      return;
    }

    onComplete({ 
      name: name.trim(), 
      location: location, 
      phone: phone || '050-0000000',
      rememberMe
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4" dir="rtl">
      <div className={`border rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl relative ${
        isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-stone-200 text-stone-800'
      }`}>
        
        <div className="text-center space-y-2">
          <span className="text-4xl">🌱</span>
          <h3 className="text-2xl font-black">הצטרפות לקהילת SWAPIT</h3>
          <p className="text-xs text-stone-400">פלטפורמת הברטר הישראלית – זה לא זבל 🌱</p>
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

              {/* בחירת יישוב מרשימה סגורה */}
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
                  <option value="" disabled>למשל: תל אביב</option>
                  {ALLOWED_CITIES.map((city, idx) => (
                    <option key={idx} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* תיבת סימון: זכור אותי להתחברות אוטומטית */}
              <div className="flex items-center gap-2 pt-2 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-amber-700 rounded cursor-pointer"
                />
                <label className="text-xs font-bold text-stone-600 dark:text-stone-300 cursor-pointer">
                  זכור אותי במכשיר זה (התחברות אוטומטית) 🔐
                </label>
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