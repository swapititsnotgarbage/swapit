import React, { useState } from 'react';

export default function SidebarMenu({ 
  isOpen, 
  onClose, 
  trades = [], 
  onUpdateTradeStatus, 
  messages = [], 
  onSendMessage, 
  onAddRating,
  myItems = [],
  isDarkMode 
}) {
  const [activeTab, setActiveTab] = useState('trades'); 
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [chatText, setChatText] = useState('');
  const [ratingTradeId, setRatingTradeId] = useState(null);
  const [ratingScore, setRatingScore] = useState(5);
  const [ratingComment, setRatingComment] = useState('');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!chatText.trim() || !selectedTrade) return;
    onSendMessage(selectedTrade.id, chatText.trim());
    setChatText('');
  };

  const handleSubmitRating = (tradeId) => {
    if (!ratingComment.trim()) {
      alert('נא לכתוב ביקורת קצרה על ההחלפה.');
      return;
    }
    onAddRating({
      score: ratingScore,
      comment: ratingComment,
      date: new Date().toLocaleDateString('he-IL')
    });
    alert('הדירוג נשמר בהצלחה! תודה על תרומתך לקהילה ⭐');
    setRatingTradeId(null);
    setRatingComment('');
    setRatingScore(5);
  };

  const tradeMessages = selectedTrade 
    ? (messages || []).filter(m => String(m.tradeId) === String(selectedTrade.id))
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs" dir="rtl">
      <div className={`fixed inset-y-0 right-0 w-full max-w-md h-full shadow-2xl flex flex-col transition-colors z-50 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-stone-800'
      }`}>
        
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

        {!selectedTrade && (
          <div className={`grid grid-cols-4 p-2 border-b gap-1 shrink-0 ${isDarkMode ? 'border-gray-800 bg-gray-950/40' : 'border-stone-100 bg-stone-50'}`}>
            <button 
              onClick={() => { setActiveTab('trades'); setRatingTradeId(null); }}
              className={`py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'trades' ? 'bg-amber-700 text-white shadow-sm' : isDarkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-stone-600 hover:bg-stone-200/50'
              }`}
            >
              <span>הצעות ({trades?.length || 0})</span>
            </button>
            <button 
              onClick={() => { setActiveTab('chats'); setRatingTradeId(null); }}
              className={`py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'chats' ? 'bg-amber-700 text-white shadow-sm' : isDarkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-stone-600 hover:bg-stone-200/50'
              }`}
            >
              <span>צ'אטים</span>
            </button>
            <button 
              onClick={() => { setActiveTab('triple'); setRatingTradeId(null); }}
              className={`py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'triple' ? 'bg-amber-700 text-white shadow-sm' : isDarkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-stone-600 hover:bg-stone-200/50'
              }`}
            >
              <span>משולשת</span>
            </button>
            <button 
              onClick={() => { setActiveTab('terms'); setRatingTradeId(null); }}
              className={`py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'terms' ? 'bg-amber-700 text-white shadow-sm' : isDarkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-stone-600 hover:bg-stone-200/50'
              }`}
            >
              <span>תקנון</span>
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
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

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {tradeMessages.length === 0 ? (
                  <div className="text-center py-16 text-stone-400 text-xs flex flex-col items-center gap-1">
                    <span>אין עדיין הודעות בשיחה זו. כותבים הודעה ראשונה לשכן!</span>
                    <span>👇</span>
                  </div>
                ) : (
                  tradeMessages.map((msg, idx) => (
                    <div key={msg.id || idx} className={`flex flex-col ${msg.sender === 'me' || msg.sender === 'אני' ? 'items-start' : 'items-end'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                        msg.sender === 'me' || msg.sender === 'אני'
                          ? 'bg-amber-700 text-white rounded-br-none'
                          : isDarkMode ? 'bg-gray-800 text-gray-200 rounded-bl-none' : 'bg-stone-100 text-stone-800 rounded-bl-none'
                      }`}>
                        <span className="block text-[10px] opacity-75 mb-0.5 font-bold">{msg.sender === 'me' || msg.sender === 'אני' ? 'אני' : msg.sender}</span>
                        {msg.text}
                      </div>
                    </div>
                  ))
                )}
              </div>

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
                      const displayOffered = trade.offeredItemTitle || trade.offeredTitle || trade.myItemTitle || '';
                      const isApproved = trade.status === 'אושר';

                      return (
                        <div key={trade.id} className={`p-4 rounded-2xl border space-y-3 ${
                          isDarkMode ? 'bg-gray-800/40 border-gray-800' : 'bg-stone-50 border-stone-200'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-700">
                              {trade.senderName ? `מאת: ${trade.senderName}` : 'הצעת החלפה'}
                            </span>
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                              isApproved ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' :
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
                            <div className="text-xs text-stone-500 flex items-center gap-1">
                              <span>מוצע בתמורה:</span>
                              <span className="font-bold text-stone-700 dark:text-stone-300">{displayOffered}</span>
                              <span>🔄</span>
                            </div>
                          )}

                          <div className="flex items-center gap-2 pt-2 border-t border-stone-200/50">
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
                              className="flex-1 bg-stone-200 hover:bg-stone-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-stone-800 dark:text-white font-bold py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1"
                            >
                              <span>צ'אט</span>
                              <span>💬</span>
                            </button>
                          </div>

                          {isApproved && ratingTradeId !== trade.id && (
                            <button 
                              onClick={() => setRatingTradeId(trade.id)}
                              className="w-full mt-2 bg-emerald-50/50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-bold py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1"
                            >
                              <span>איך הייתה ההחלפה? דרג את השכן</span>
                              <span>⭐</span>
                            </button>
                          )}

                          {ratingTradeId === trade.id && (
                            <div className="mt-3 p-3 bg-white dark:bg-gray-900 rounded-xl border border-stone-200 dark:border-gray-700 space-y-3 animate-in fade-in zoom-in duration-200">
                              <h5 className="text-xs font-bold text-center">דירוג קהילתי</h5>
                              <div className="flex justify-center gap-2 flex-row-reverse">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <button 
                                    key={star}
                                    type="button"
                                    onClick={() => setRatingScore(star)}
                                    className={`text-2xl transition-transform hover:scale-110 ${star <= ratingScore ? 'text-amber-400' : 'text-stone-300 dark:text-gray-600'}`}
                                  >
                                    ★
                                  </button>
                                ))}
                              </div>
                              <textarea 
                                value={ratingComment}
                                onChange={(e) => setRatingComment(e.target.value)}
                                placeholder="שתף איך הייתה החוויה..."
                                className={`w-full border rounded-lg p-2 text-xs text-right resize-none focus:outline-none focus:border-amber-600 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-stone-50 border-stone-200'}`}
                                rows="2"
                              />
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => handleSubmitRating(trade.id)}
                                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-xs transition-all"
                                >
                                  שלח דירוג
                                </button>
                                <button 
                                  onClick={() => setRatingTradeId(null)}
                                  className="px-3 bg-stone-200 dark:bg-gray-700 hover:bg-stone-300 text-stone-700 dark:text-white font-bold py-2 rounded-lg text-xs transition-all"
                                >
                                  ביטול
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}

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

              {activeTab === 'triple' && (
                <div className="space-y-4 py-4">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-3xl bg-amber-700/10 text-amber-700 flex items-center justify-center font-bold text-3xl mx-auto mb-2 animate-bounce">
                      🔄
                    </div>
                    <h4 className="font-black text-base">מנוע SmartSwap</h4>
                    <p className="text-xs text-stone-400 px-4 mt-1">המערכת מזהה מעגלי החלפה קהילתיים שבהם 3 אנשים יכולים לקבל בדיוק את מה שהם צריכים.</p>
                  </div>

                  {myItems.length > 0 ? (
                    <div className={`p-5 rounded-2xl border text-center space-y-4 shadow-lg ${
                      isDarkMode ? 'bg-emerald-900/10 border-emerald-800/30' : 'bg-emerald-50 border-emerald-200'
                    }`}>
                      <div className="inline-flex items-center justify-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-[10px] font-black mb-2 animate-pulse">
                        ✨ נמצאה התאמה משולשת מושלמת!
                      </div>
                      
                      <div className="flex flex-col gap-3 relative">
                        <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-emerald-200 dark:bg-emerald-800/50 -translate-x-1/2 -z-10"></div>
                        
                        <div className={`p-3 rounded-xl border flex items-center justify-between shadow-sm z-10 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-stone-200'}`}>
                          <div className="text-right">
                            <span className="text-[10px] text-stone-400 font-bold block mb-0.5">אתה נותן:</span>
                            <span className="text-xs font-bold text-amber-700 truncate max-w-[120px] block">{myItems[0].title}</span>
                          </div>
                          <span className="text-xl">📦</span>
                        </div>

                        <div className="flex justify-center z-10">
                          <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 p-1.5 rounded-full text-xs">⬇️</span>
                        </div>

                        <div className={`p-3 rounded-xl border flex items-center justify-between shadow-sm z-10 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-stone-200'}`}>
                          <div className="text-right">
                            <span className="text-[10px] text-stone-400 font-bold block mb-0.5">שכן ב' יעביר לשכן ג':</span>
                            <span className="text-xs font-bold text-stone-700 dark:text-stone-300">אופני הרים</span>
                          </div>
                          <span className="text-xl">🚲</span>
                        </div>

                        <div className="flex justify-center z-10">
                          <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 p-1.5 rounded-full text-xs">⬇️</span>
                        </div>

                        <div className={`p-3 rounded-xl border border-emerald-500 shadow-md z-10 ${isDarkMode ? 'bg-emerald-950/40' : 'bg-emerald-50/80'}`}>
                          <div className="flex items-center justify-between">
                            <div className="text-right">
                              <span className="text-[10px] text-emerald-600 font-black block mb-0.5">ואתה תקבל משכן ג':</span>
                              <span className="text-sm font-black text-emerald-700 dark:text-emerald-400">גיטרה קלאסית</span>
                            </div>
                            <span className="text-2xl">🎸</span>
                          </div>
                        </div>
                      </div>

                      <button onClick={() => alert('אישרת השתתפות במעגל! הודעה נשלחה לשאר המשתתפים. 🔄')} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl text-sm transition-all shadow-md mt-2">
                        אשר והצטרף למעגל ההחלפה
                      </button>
                    </div>
                  ) : (
                    <div className={`p-4 rounded-2xl border text-center ${isDarkMode ? 'bg-gray-800/40 border-gray-800' : 'bg-stone-50 border-stone-200'}`}>
                      <span className="text-xs text-stone-400 block mb-2">מנוע הסריקה פועל ברקע...</span>
                      <span className="text-xs font-bold">העלה פריטים לאזור האישי כדי שנוכל לחבר אותך למעגלי החלפה בקהילה!</span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'terms' && (
                <div className="space-y-4 text-xs leading-relaxed text-right">
                  <h4 className="font-bold text-sm text-amber-700 border-b pb-2 border-stone-200 flex items-center gap-1">
                    <span>תקנון משפטי ותנאי שימוש</span>
                    <span>📜</span>
                  </h4>
                  <div className="space-y-2">
                    <h5 className="font-bold text-stone-700 dark:text-stone-300">1. היעדר אחריות והגבלת חבות (As-Is)</h5>
                    <p className="text-stone-500">האתר ופלטפורמת SWAPIT מסופקים "כמות שהם" (As-Is). הנהלת האתר אינה נושאת באחריות כלשהי לטיב, איכות, תקינות או חוקיות הפריטים המוחלפים. כל עסקה מבוצעת באחריותם הבלעדית של המשתמשים בלבד.</p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-stone-700 dark:text-stone-300">2. לוח מודעות ופטור מתביעות</h5>
                    <p className="text-stone-500">מובהר בזאת כי האתר מהווה פלטפורמת תיווך וללוח מודעות בלבד, ואינו צד לשום עסקה. המשתמש פוטר את מפעילי האתר מכל דרישה, טענה או תביעה בגין כל נזק, ישיר או עקיף, שייגרם כתוצאה משימוש בפלטפורמה, לרבות עוגמת נפש או נזק כספי.</p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-stone-700 dark:text-stone-300">3. בדיקת מוצרים ואחריות אישית</h5>
                    <p className="text-stone-500">חובה על המשתמש המקבל לבדוק את הפריט בעת המסירה. אי-גילוי נאות מצד המוסר אינו מטיל כל חבות על הנהלת האתר.</p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-stone-700 dark:text-stone-300">4. שיפוי בגין נזקים</h5>
                    <p className="text-stone-500">המשתמש מתחייב לשפות את הנהלת האתר בגין כל נזק, הוצאה או תביעה מצד שלישי שתנבע משימוש בלתי ראוי, העלאת תוכן פוגעני או הפרת זכויות במסגרת הפלטפורמה.</p>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

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