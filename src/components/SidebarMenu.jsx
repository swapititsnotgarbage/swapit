import React, { useState } from 'react';

export default function SidebarMenu({ isOpen, onClose, trades = [], onUpdateTradeStatus, messages = [], onSendMessage, isDarkMode }) {
  const [activeTab, setActiveTab] = useState('trades'); // 'trades' | 'chats' | 'triple' | 'terms'
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [chatText, setChatText] = useState('');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!chatText.trim() || !selectedTrade) return;
    onSendMessage(selectedTrade.id, chatText.trim());
    setChatText('');
  };

  // סינון הודעות שייכות לעסקה הנבחרת
  const tradeMessages = selectedTrade 
    ? (messages || []).filter(m => String(m.tradeId) === String(selectedTrade.id))
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs" dir="rtl">
      {/* תפריט נעול בצד ימין */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md h-full shadow-2xl flex flex-col transition-colors z-50 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-stone-800'
      }`}>
        
        {/* כותרת התפריט */}
        <div className={`p-5 border-b flex items-center justify-between shrink-0 ${isDarkMode ? 'border-gray-800' : 'border-stone-100'}`}>
          <h3 className="text-xl font-bold text-amber-700 flex items-center gap-2">
            <span>תפריט ניהול ואזור אישי</span>
            <span>📋</span>
          </h3>
          <button 
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all cursor-pointer ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            ✕
          </button>
        </div>

        {/* 4 לשוניות ניווט */}
        {!selectedTrade && (
          <div className={`grid grid-cols-4 p-2 border-b gap-1 shrink-0 ${isDarkMode ? 'border-gray-800 bg-gray-950/40' : 'border-stone-100 bg-stone-50'}`}>
            <button 
              onClick={() => { setActiveTab('trades'); setSelectedTrade(null); }}
              className={`py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'trades' 
                  ? 'bg-amber-700 text-white shadow-sm' 
                  : isDarkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-stone-600 hover:bg-stone-200/50'
              }`}
            >
              <span>הצעות ({trades?.length || 0})</span>
              <span>🤝</span>
            </button>

            <button 
              onClick={() => { setActiveTab('chats'); setSelectedTrade(null); }}
              className={`py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'chats' 
                  ? 'bg-amber-700 text-white shadow-sm' 
                  : isDarkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-stone-600 hover:bg-stone-200/50'
              }`}
            >
              <span>צ'אטים</span>
              <span>💬</span>
            </button>

            <button 
              onClick={() => { setActiveTab('triple'); setSelectedTrade(null); }}
              className={`py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'triple' 
                  ? 'bg-amber-700 text-white shadow-sm' 
                  : isDarkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-stone-600 hover:bg-stone-200/50'
              }`}
            >
              <span>משולשת</span>
              <span>🔄</span>
            </button>

            <button 
              onClick={() => { setActiveTab('terms'); setSelectedTrade(null); }}
              className={`py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'terms' 
                  ? 'bg-amber-700 text-white shadow-sm' 
                  : isDarkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-stone-600 hover:bg-stone-200/50'
              }`}
            >
              <span>תקנון</span>
              <span>📜</span>
            </button>
          </div>
        )}

        {/* תוכן התפריט */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* תצוגת צ'אט בתוך התפריט */}
          {selectedTrade ? (
            <div className="flex flex-col h-full space-y-3">
              <div className={`flex items-center justify-between pb-3 border-b ${isDarkMode ? 'border-gray-800' : 'border-stone-100'}`}>
                <button 
                  onClick={() => setSelectedTrade(null)}
                  className="text-xs font-bold text-amber-700 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>חזרה לרשימה</span>
                  <span>➔</span>
                </button>
                <span className="text-xs font-bold truncate flex items-center gap-1">
                  <span>{selectedTrade.itemTitle || selectedTrade.title || 'שיחת ברטר'}</span>
                  <span>💬</span>
                </span>
              </div>

              {/* רשימת ההודעות */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {tradeMessages.length === 0 ? (
                  <div className="text-center py-16 text-stone-400 text-xs flex flex-col items-center gap-1">
                    <span>אין עדיין הודעות בשיחה זו. כותבים הודעה ראשונה לשכן!</span>
                    <span>👇</span>
                  </div>
                ) : (
                  tradeMessages.map((msg, idx) => (
                    <div key={msg.id || idx} className={`flex flex-col ${msg.sender === 'אני' ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                        msg.sender === 'אני'
                          ? 'bg-amber-700 text-white rounded-bl-none'
                          : isDarkMode ? 'bg-gray-800 text-gray-200 rounded-br-none' : 'bg-stone-100 text-stone-800 rounded-br-none'
                      }`}>
                        <span className="block text-[10px] opacity-75 mb-0.5 font-bold">{msg.sender}</span>
                        {msg.text}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* טופס שליחה */}
              <form onSubmit={handleSend} className="pt-2 border-t flex gap-2 shrink-0 border-stone-200">
                <input 
                  type="text" 
                  placeholder="כתוב הודעה..."
                  value={chatText}
                  onChange={(e) => setChatText(e.target.value)}
                  className={`flex-1 border rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-600 text-right ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-stone-50 border-stone-300 text-stone-800'
                  }`}
                />
                <button 
                  type="submit"
                  className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-md"
                >
                  שלח
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* 1. הצעות ברטר */}
              {activeTab === 'trades' && (
                <div className="space-y-3">
                  {(!trades || trades.length === 0) ? (
                    <div className="text-center py-10 text-stone-400 text-sm flex items-center justify-center gap-1">
                      <span>אין הצעות ברטר כרגע</span>
                      <span>📭</span>
                    </div>
                  ) : (
                    trades.map((trade) => {
                      const displayTitle = trade.itemTitle || trade.title || trade.targetItemTitle || 'פריט להחלפה';
                      const displayOffered = trade.offeredItemTitle || trade.offeredTitle || '';

                      return (
                        <div key={trade.id} className={`p-4 rounded-2xl border space-y-3 ${
                          isDarkMode ? 'bg-gray-800/40 border-gray-800' : 'bg-stone-50 border-stone-200'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-700">
                              {trade.senderName ? `מאת: ${trade.senderName}` : 'הצעת החלפה'}
                            </span>
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                              trade.status === 'אושר' ? 'bg-amber-500/10 text-amber-700' :
                              trade.status === 'נדחה' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-700'
                            }`}>
                              {trade.status || 'ממתין'}
                            </span>
                          </div>

                          <div className="text-sm font-medium flex items-center gap-1">
                            <span>מבוקש:</span>
                            <span className="font-bold text-amber-700">{displayTitle}</span>
                            <span>🎁</span>
                          </div>

                          {displayOffered && (
                            <div className="text-xs text-stone-400 flex items-center gap-1">
                              <span>מוצע בתמורה:</span>
                              <span className="font-bold text-stone-700">{displayOffered}</span>
                              <span>🔄</span>
                            </div>
                          )}

                          <div className="flex items-center gap-2 pt-2 border-t border-stone-200">
                            {trade.status === 'ממתין' && (
                              <>
                                <button 
                                  onClick={() => onUpdateTradeStatus(trade.id, 'אושר')}
                                  className="flex-1 bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1"
                                >
                                  <span>אשר</span>
                                  <span>✅</span>
                                </button>
                                <button 
                                  onClick={() => onUpdateTradeStatus(trade.id, 'נדחה')}
                                  className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1"
                                >
                                  <span>דחה</span>
                                  <span>❌</span>
                                </button>
                              </>
                            )}
                            <button 
                              onClick={() => setSelectedTrade(trade)}
                              className="flex-1 bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1"
                            >
                              <span>צ'אט</span>
                              <span>💬</span>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* 2. צ'אטים פעילים */}
              {activeTab === 'chats' && (
                <div className="space-y-3">
                  {(!trades || trades.length === 0) ? (
                    <div className="text-center py-10 text-stone-400 text-sm flex items-center justify-center gap-1">
                      <span>אין שיחות פעילות כרגע</span>
                      <span>💬</span>
                    </div>
                  ) : (
                    trades.map((trade) => {
                      const displayTitle = trade.itemTitle || trade.title || 'שיחת ברטר';
                      return (
                        <div 
                          key={trade.id}
                          onClick={() => setSelectedTrade(trade)}
                          className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                            isDarkMode ? 'bg-gray-800/40 border-gray-800 hover:bg-gray-800' : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-700/10 text-amber-700 flex items-center justify-center font-bold">
                              💬
                            </div>
                            <div>
                              <h4 className="font-bold text-sm">{displayTitle}</h4>
                              <span className="text-xs text-stone-400">לחץ לפתיחת הצ'אט</span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-amber-700">הכנס ➔</span>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* 3. החלפה משולשת */}
              {activeTab === 'triple' && (
                <div className="space-y-4 text-center py-6">
                  <div className="w-16 h-16 rounded-3xl bg-amber-700/10 text-amber-700 flex items-center justify-center font-bold text-3xl mx-auto mb-2">
                    🔄
                  </div>
                  <h4 className="font-black text-base">מנוע החלפות משולשות SmartSwap</h4>
                  <p className="text-xs text-stone-400 leading-relaxed px-4">
                    המערכת מזהה מעגלי החלפה חכמים בקהילה (א' נותן לב', ב' נותן לג', ג' נותן לא') כדי שכולם יקבלו בדיוק את מה שהם מחפשים!
                  </p>
                  <div className={`p-4 rounded-2xl border text-xs text-right space-y-2 ${
                    isDarkMode ? 'bg-gray-800/40 border-gray-800' : 'bg-stone-50 border-stone-200'
                  }`}>
                    <span className="font-bold text-amber-700 flex items-center gap-1">
                      <span>מנוע ההתאמות סורק כעת...</span>
                      <span>✨</span>
                    </span>
                    <p className="text-stone-400">ברגע שיזוהה מעגל החלפה מתאים עבור הפריטים שלך, תתקבל התראה מיידית.</p>
                  </div>
                </div>
              )}

              {/* 4. תקנון ותנאי שימוש */}
              {activeTab === 'terms' && (
                <div className="space-y-4 text-xs leading-relaxed text-right">
                  <h4 className="font-bold text-sm text-amber-700 border-b pb-2 border-stone-200 flex items-center gap-1">
                    <span>תקנון קהילת SWAPIT</span>
                    <span>📜</span>
                  </h4>
                  
                  <div className="space-y-2">
                    <h5 className="font-bold text-stone-700">1. כבוד והוגנות</h5>
                    <p className="text-stone-400">קהילת SWAPIT מושתתת על אמון הדדי. יש להקפיד על שיח מכבד והוגן בכל אינטראקציה וצ'אט.</p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-bold text-stone-700">2. אמינות תיאור הפריט</h5>
                    <p className="text-stone-400">חל איסור להעלות מוצרים פגומים ללא דיווח מפורש. יש לתאר את מצב המוצר בצורה המדויקת ביותר.</p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-bold text-stone-700">3. פריטים אסורים</h5>
                    <p className="text-stone-400">אין להעלות מוצרים בלתי חוקיים, נשק, תרופות או פריטים המפרים זכויות יוצרים.</p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-bold text-stone-700">4. אחריות העסקה</h5>
                    <p className="text-stone-400">עסקאות הברטר מבוצעות במישרין בין משתמשי הקהילה ובאחריותם הבלעדית.</p>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* כפתור סגירה בתחתית */}
        <div className={`p-4 border-t shrink-0 ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-stone-100 bg-white'}`}>
          <button 
            onClick={onClose}
            className={`w-full font-bold py-3 rounded-xl text-sm transition-all cursor-pointer border ${
              isDarkMode ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200' : 'border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            סגור תפריט
          </button>
        </div>

      </div>
    </div>
  );
}