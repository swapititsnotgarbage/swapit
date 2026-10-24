import React, { useState, useEffect } from 'react';

// מאגר ההודעות הפיקטיביות שירוצו באתר
const simulatedEvents = [
  "דנה מתל אביב הרגע העלתה פריט חדש 📦",
  "הצעת החלפה (SmartSwap) אושרה עכשיו בחיפה 🤝",
  "12 אנשים צופים כרגע בקטגוריית ריהוט 👀",
  "עידן מכפר סבא בדיוק קיבל דירוג 5 כוכבים ⭐",
  "פריט חדש בקטגוריית 'כלי עבודה' נחטף תוך 3 דקות! ⚡",
  "23 משתמשים פעילים כרגע באזור המרכז 🟢",
  "יעל מירושלים הרגע הצטרפה לקהילה 🌱",
  "ברטר משולש הושלם בהצלחה באזור השרון 🔄",
  "מישהו הרגע חיפש 'אופניים' 🚲"
];

export default function LiveActivity({ isDarkMode }) {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const triggerRandomEvent = () => {
      // בחירת הודעה רנדומלית מתוך המאגר
      const randomMsg = simulatedEvents[Math.floor(Math.random() * simulatedEvents.length)];
      setCurrentEvent(randomMsg);
      setIsVisible(true);

      // ההודעה נעלמת אחרי 4 שניות
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // הודעה ראשונה קופצת 3 שניות אחרי שהאתר עולה
    const initialTimer = setTimeout(triggerRandomEvent, 3000);

    // הודעה נוספת קופצת כל 12 שניות
    const interval = setInterval(triggerRandomEvent, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!currentEvent) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
    }`}>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border ${
        isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-stone-200 text-stone-700'
      }`}>
        {/* נקודה ירוקה מהבהבת */}
        <div className="relative flex items-center justify-center">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>
        <span className="text-xs font-bold">{currentEvent}</span>
      </div>
    </div>
  );
}