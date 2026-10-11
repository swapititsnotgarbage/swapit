import React, { useState } from 'react';

export default function FloatingChat({ isOpen, onClose, trade, messages, onSendMessage, isDarkMode }) {
  const [text, setText] = useState('');

  if (!isOpen || !trade) return null;

  const chatMessages = messages[trade.id] || [];

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(trade.id, text);
    setText('');
  };

  return (
    <div className={`fixed bottom-0 left-6 z-50 w-80 rounded-t-2xl shadow-2xl border flex flex-col overflow-hidden transition-all animate-in slide-in-from-bottom duration-300 ${
      isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'
    }`}>
      
      {/* כותרת הצ'אט */}
      <div className="bg-orange-500 text-white p-3 flex items-center justify-between font-bold text-xs">
        <div className="flex items-center gap-2 truncate">
          <span>💬</span>
          <span className="truncate">תיאום ברטר: {trade.targetItemTitle}</span>
        </div>
        <button 
          onClick={onClose}
          className="w-6 h-6 rounded-full hover:bg-orange-600 flex items-center justify-center cursor-pointer text-white"
        >
          ✕
        </button>
      </div>

      {/* 🛡️ פס אזהרת בטיחות מובנה בצ'אט */}
      <div className={`px-3 py-1.5 text-[10px] font-medium border-b flex items-center gap-1.5 ${
        isDarkMode ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-700'
      }`}>
        <span>🛡️</span>
        <span>זכור: ברטר טהור בלבד! מומלץ להיפגש במקום ציבורי ומואר.</span>
      </div>

      {/* גוף הודעות */}
      <div className="h-56 p-3 overflow-y-auto space-y-2 text-xs flex flex-col">
        {chatMessages.length === 0 ? (
          <p className="text-gray-400 text-center my-auto">
            זה הזמן לתאם את איסוף הפריט או שעת המפגש! 🤝
          </p>
        ) : (
          chatMessages.map((msg, idx) => (
            <div key={idx} className={`p-2.5 rounded-2xl max-w-[85%] ${
              msg.sender === 'me' 
                ? 'bg-orange-500 text-white mr-auto' 
                : isDarkMode ? 'bg-gray-800 text-gray-200 ml-auto' : 'bg-gray-100 text-gray-800 ml-auto'
            }`}>
              <p>{msg.text}</p>
              <span className="text-[9px] opacity-70 block mt-1 text-left">{msg.time}</span>
            </div>
          ))
        )}
      </div>

      {/* שורת שליחה */}
      <form onSubmit={handleSend} className={`p-2 border-t flex gap-2 ${isDarkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'}`}>
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="כתוב הודעה..."
          className={`flex-1 border rounded-xl px-3 py-2 text-xs text-right focus:outline-none ${
            isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'
          }`}
        />
        <button 
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-2 rounded-xl text-xs cursor-pointer transition-all"
        >
          שלח
        </button>
      </form>

    </div>
  );
}