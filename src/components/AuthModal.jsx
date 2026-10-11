import React, { useState } from 'react';

export default function AuthModal({ isOpen, onSuccess, isDarkMode }) {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' או 'code'
  const [code, setCode] = useState('');

  if (!isOpen) return null;

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 9) {
      alert('נא להזין מספר טלפון נייד תקין');
      return;
    }
    setStep('code');
    alert('קוד אימות בן 4 ספרות נשלח בהצלחה ב-SMS (לצרכי בדיקה ניתן להקיש: 1234)');
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (code.length !== 4) {
      alert('נא להזין קוד אימות תקין בן 4 ספרות');
      return;
    }
    onSuccess(phone);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4" dir="rtl">
      <div className={`border rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl relative ${
        isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-stone-200 text-stone-800'
      }`}>
        
        <div className="text-center space-y-2">
          <span className="text-4xl">🌱</span>
          <h3 className="text-2xl font-black">ברוכים הבאים ל-SWAPIT</h3>
          <p className="text-xs text-stone-400">קהילת הברטר הישראלית – זה לא זבל!</p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1.5">הכנס מספר נייד להרשמה ואימות SMS:</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="050-0000000"
                className={`w-full border rounded-xl p-3 text-sm text-right focus:outline-none focus:border-amber-600 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                }`}
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-extrabold py-3 rounded-xl transition-all shadow-lg shadow-amber-900/10 cursor-pointer"
            >
              שלח קוד אימות SMS 📱
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1.5">הכנס את קוד ה-SMS שנשלח לנייד שלך:</label>
              <input 
                type="text" 
                maxLength={4}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="1234"
                className={`w-full border rounded-xl p-3 text-center text-xl font-bold tracking-widest focus:outline-none focus:border-amber-600 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                }`}
                required
              />
              <p className="text-[11px] text-stone-400 mt-1 text-center">קוד לדוגמה לבדיקה מהירה: 1234</p>
            </div>
            <button 
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-extrabold py-3 rounded-xl transition-all shadow-lg shadow-amber-900/10 cursor-pointer"
            >
              אמת מספר והכנס לקהילה ✓
            </button>
          </form>
        )}

      </div>
    </div>
  );
}