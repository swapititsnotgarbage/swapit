import React, { useState } from 'react';

export default function ProfileModal({ isOpen, onClose, userProfile, onUpdateProfile, ratings = [], completedTradesCount = 0, onLogout, isDarkMode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userProfile || { name: '', location: '', phone: '' });

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateProfile(editForm);
    setIsEditing(false);
  };

  const isTrustedUser = completedTradesCount >= 3;
  const ecoImpactKg = (completedTradesCount * 5.5).toFixed(1); 

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4" dir="rtl">
      <div className={`border rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl relative ${
        isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-stone-200 text-stone-800'
      }`}>
        
        <div className="relative h-24 bg-gradient-to-r from-amber-700 to-amber-900">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center font-bold cursor-pointer">✕</button>
        </div>

        <div className="px-6 pb-6 relative">
          
          {/* הזרקת תמונת גוגל אל תוך אזור הפרופיל */}
          <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 bg-stone-100 dark:bg-gray-800 -mt-12 mb-3 mx-auto flex items-center justify-center text-3xl shadow-md overflow-hidden z-10 relative">
            {userProfile?.photoURL ? (
              <img src={userProfile.photoURL} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span>👤</span>
            )}
          </div>

          {!isEditing ? (
            <div className="text-center space-y-4">
              <div>
                <h3 className="text-2xl font-black flex items-center justify-center gap-1.5">
                  {userProfile?.name}
                  {isTrustedUser && (
                    <span title="משתמש אמין (מעל 3 החלפות)" className="text-emerald-500 text-lg cursor-help">✅</span>
                  )}
                </h3>
                <p className="text-sm font-medium text-stone-500 dark:text-gray-400 mt-1">📍 {userProfile?.location}</p>
                <p className="text-sm text-stone-500 dark:text-gray-400 mt-0.5">📞 {userProfile?.phone || 'לא הוזן טלפון'}</p>
              </div>

              <div className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-1 shadow-sm ${
                isDarkMode ? 'bg-emerald-900/10 border-emerald-800/30' : 'bg-emerald-50 border-emerald-100'
              }`}>
                <span className="text-2xl">🌍</span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">מדד השפעה סביבתית</span>
                <span className="text-lg font-black text-emerald-800 dark:text-emerald-300 mt-0.5">
                  חסכת {ecoImpactKg} ק"ג של פסולת!
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-500 mt-1">דרך {completedTradesCount} עסקאות בקהילה</span>
              </div>

              <div className="flex gap-2 justify-center pt-2">
                <button onClick={() => setIsEditing(true)} className="px-4 py-2 border rounded-xl text-xs font-bold shadow-sm dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:bg-stone-50 dark:hover:bg-gray-700 transition-colors">ערוך פרופיל ✏️</button>
                <button onClick={onLogout} className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-xs font-bold shadow-sm cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">התנתק</button>
              </div>

              <div className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-stone-100'} text-right`}>
                <h4 className="font-bold text-sm mb-3 flex items-center gap-1"><span>ביקורות מהקהילה (Live)</span><span>⭐</span></h4>
                <div className="space-y-3 max-h-40 overflow-y-auto pr-1">
                  {ratings.length === 0 ? (
                    <p className="text-xs text-stone-400 text-center py-2">עדיין לא נכתבו ביקורות בענן.</p>
                  ) : (
                    ratings.map((r, i) => (
                      <div key={i} className={`p-3 rounded-xl border ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-stone-50 border-stone-200'}`}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold text-stone-500">{r.reviewer || 'אנונימי'}</span>
                          <span className="text-amber-400 text-xs">{'★'.repeat(r.score)}</span>
                        </div>
                        <p className="text-xs font-medium">{r.comment}</p>
                        <span className="text-[10px] text-stone-400 block mt-1">{r.date}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">שם מלא</label>
                <input type="text" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className={`w-full border rounded-xl p-2.5 text-sm ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-stone-50 border-stone-300'}`} />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">יישוב</label>
                <input type="text" value={editForm.location} onChange={(e) => setEditForm({...editForm, location: e.target.value})} className={`w-full border rounded-xl p-2.5 text-sm ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-stone-50 border-stone-300'}`} />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">טלפון</label>
                <input type="text" value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} className={`w-full border rounded-xl p-2.5 text-sm ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-stone-50 border-stone-300'}`} />
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={handleSave} className="flex-1 bg-amber-700 hover:bg-amber-800 text-white font-bold py-2.5 rounded-xl text-sm shadow-md transition-colors cursor-pointer">שמור שינויים</button>
                <button onClick={() => setIsEditing(false)} className="px-4 border rounded-xl font-bold text-sm dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:bg-stone-50 dark:hover:bg-gray-700 transition-colors">ביטול</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}