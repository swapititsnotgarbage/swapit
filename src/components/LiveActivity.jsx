import React, { useState, useEffect } from 'react';

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
      const randomMsg = simulatedEvents[Math.floor(Math.random() * simulatedEvents.length)];
      setCurrentEvent(randomMsg);
      setIsVisible(true);

      // ההודעה נשארת על המסך 5 שניות
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // הודעה ראשונה קופצת שנייה אחת אחרי שהאתר עולה (מיידי)
    const initialTimer = setTimeout(triggerRandomEvent, 1000);
    // הודעה נוספת קופצת כל 8 שניות כדי לייצר תחושת תנועה ערה
    const interval = setInterval(triggerRandomEvent, 8000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`fixed bottom-24 left-6 z-[100] transition-all duration-700 transform ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
    }`}>
      {currentEvent && (
        <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border-2 ${
          isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-emerald-100 text-stone-800'
        }`}>
          {/* נקודה ירוקה מהבהבת גדולה יותר */}
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <span className="text-sm font-bold">{currentEvent}</span>
        </div>
      )}
    </div>
  );
}