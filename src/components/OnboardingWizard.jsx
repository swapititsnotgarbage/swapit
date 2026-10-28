import React, { useState } from 'react';
import { ALLOWED_CITIES } from '../Locations/cities';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

export default function OnboardingWizard({ onComplete, isDarkMode }) {
  const [step, setStep] = useState(1);
  const [googleUser, setGoogleUser] = useState(null);
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setGoogleUser(result.user);
      setStep(2); // מעבר לבחירת עיר אחרי התחברות מוצלחת
    } catch (error) {
      console.error("שגיאה בהתחברות:", error);
      alert("ההתחברות לא צלחה, נסה שוב.");
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location) {
      alert('חובה לבחור עיר מגורים כדי למצוא החלפות באזורך');
      return;
    }
    onComplete({
      name: googleUser?.displayName || 'שכן חדש',
      email: googleUser?.email || '',
      photoURL: googleUser?.photoURL || '',
      location: location,
      phone: phone
    });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" dir="rtl">
      <div className={`max-w-md w-full rounded-3xl p-8 shadow-2xl transition-all ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-stone-800'}`}>
        
        {step === 1 ? (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
              🌱
            </div>
            <div>
              <h2 className="text-2xl font-black mb-2">ברוכים הבאים ל-SwapIT</h2>
              <p className="text-sm text-stone-500 dark:text-gray-400">קהילת הברטר וההחלפות של ישראל. התחברו בצורה מאובטחת כדי להתחיל.</p>
            </div>
            
            <button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 font-bold py-3.5 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              {isLoading ? 'מתחבר מול גוגל...' : 'המשך עם Google'}
            </button>
          </div>
        ) : (
          <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-amber-500 shadow-lg">
              <img src={googleUser?.photoURL} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-black mb-1">איזה כיף שהצטרפת, {googleUser?.displayName?.split(' ')[0]}! 👋</h2>
              <p className="text-sm text-stone-500 dark:text-gray-400">עוד שלב אחד קטן ואנחנו בפנים.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 text-right">
              <div>
                <label className="block text-xs font-bold mb-1">עיר מגורים (חובה)</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`w-full border rounded-xl p-3 text-sm focus:outline-none focus:border-amber-600 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-stone-50 border-stone-200'}`}
                  required
                >
                  <option value="" disabled>בחר יישוב...</option>
                  {ALLOWED_CITIES.map((city, idx) => (
                    <option key={idx} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">טלפון לתיאום (אופציונלי)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="למשל: 050-1234567"
                  className={`w-full border rounded-xl p-3 text-sm focus:outline-none focus:border-amber-600 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-stone-50 border-stone-200'}`}
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-black py-3.5 rounded-xl transition-all shadow-md mt-2 cursor-pointer"
              >
                כניסה לקהילה 🚀
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}