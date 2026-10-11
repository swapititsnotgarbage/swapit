import React, { useState } from 'react';

export default function MyItemsModal({ isOpen, onClose, myItems, onDeleteMyItem, onUpdateMyItem, isDarkMode }) {
  const [editingItem, setEditingItem] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editWanted, setEditWanted] = useState('');
  const [editCondition, setEditCondition] = useState('');
  const [editDescription, setEditDescription] = useState('');

  if (!isOpen) return null;

  const startEditing = (item) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditWanted(item.wanted);
    setEditCondition(item.condition || 'כמו חדש');
    setEditDescription(item.description || '');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editTitle) return;
    onUpdateMyItem({
      ...editingItem,
      title: editTitle,
      wanted: editWanted,
      condition: editCondition,
      description: editDescription
    });
    setEditingItem(null);
    alert('הפריט עודכן בהצלחה! 🔄');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" dir="rtl">
      <div className={`border rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative p-6 space-y-6 max-h-[90vh] overflow-y-auto ${
        isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-stone-300 text-stone-800'
      }`}>
        
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-xl font-bold text-amber-700 flex items-center gap-2">
            <span>📦 הפריטים שהעלאתי להחלפה</span> <span>({myItems.length})</span>
          </h3>
          <button 
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-pointer ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            ✕
          </button>
        </div>

        {editingItem ? (
          <form onSubmit={handleSaveEdit} className={`p-4 rounded-2xl space-y-3 border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-amber-50/50 border-amber-200'
          }`}>
            <h4 className="font-bold text-sm text-amber-700">✏️ עריכת פריט: {editingItem.title}</h4>
            
            <div>
              <label className="block text-xs font-semibold mb-1">שם הפריט</label>
              <input 
                type="text" 
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className={`w-full border rounded-xl p-2.5 text-sm text-right ${
                  isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-stone-300 text-stone-800'
                }`}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold mb-1">מה מחפש?</label>
                <input 
                  type="text" 
                  value={editWanted}
                  onChange={(e) => setEditWanted(e.target.value)}
                  className={`w-full border rounded-xl p-2.5 text-sm text-right ${
                    isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-stone-300 text-stone-800'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">מצב הפריט</label>
                <select 
                  value={editCondition}
                  onChange={(e) => setEditCondition(e.target.value)}
                  className={`w-full border rounded-xl p-2.5 text-sm text-right cursor-pointer ${
                    isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-stone-300 text-stone-800'
                  }`}
                >
                  <option value="חדש לגמרי">חדש לגמרי</option>
                  <option value="כמו חדש">כמו חדש</option>
                  <option value="משומש">משומש</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">תיאור</label>
              <textarea 
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows="2"
                className={`w-full border rounded-xl p-2.5 text-sm text-right resize-none ${
                  isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-stone-300 text-stone-800'
                }`}
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button type="submit" className="bg-amber-700 hover:bg-amber-800 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer">
                שמור שינויים ✓
              </button>
              <button type="button" onClick={() => setEditingItem(null)} className={`px-4 py-2 rounded-xl text-xs cursor-pointer border ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-stone-200 border-stone-300 text-stone-700'
              }`}>
                ביטול
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            {myItems.length === 0 ? (
              <p className={`text-xs text-center py-12 rounded-2xl p-4 ${
                isDarkMode ? 'bg-gray-800/40 text-gray-400' : 'bg-stone-50 text-stone-500'
              }`}>
                עדיין לא העלאת מוצרים להחלפה. לחץ על "+ העלה פריט להחלפה" למעלה כדי להתחיל!
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto p-1">
                {myItems.map(item => (
                  <div key={item.id} className={`flex items-center justify-between border p-3.5 rounded-2xl ${
                    isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-stone-50 border-stone-200 shadow-xs'
                  }`}>
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-xl flex-shrink-0" />
                      <div className="overflow-hidden space-y-0.5">
                        <h5 className="font-bold text-sm truncate">{item.title}</h5>
                        <span className="text-xs text-amber-700 font-medium block">🎯 מחפש: {item.wanted}</span>
                        <span className="text-[11px] text-stone-400 block">📍 {item.location} | ✨ {item.condition}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 flex-shrink-0">
                      <button 
                        onClick={() => startEditing(item)}
                        className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer border ${
                          isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white' : 'bg-white border-stone-300 hover:bg-stone-100 text-stone-700'
                        }`}
                      >
                        ערוך
                      </button>
                      <button 
                        onClick={() => onDeleteMyItem(item.id)}
                        className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer border border-red-500/30"
                      >
                        מחק
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="pt-2">
          <button 
            onClick={onClose}
            className={`w-full font-bold py-3 rounded-xl transition-all cursor-pointer border ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700 text-white' : 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800'
            }`}
          >
            סגור
          </button>
        </div>

      </div>
    </div>
  );
}