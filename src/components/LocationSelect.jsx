import React, { useState } from 'react';

// רשימת יישובים לדוגמה (ניתן להרחיב לכל יישובי הארץ)
const ISRAEL_CITIES = [
  "כפר מונש", "תל אביב - יפו", "ירושלים", "חיפה", "ראשון לציון", "פתח תקווה",
  "אשדוד", "נתניה", "באר שבע", "חולון", "בני ברק", "רמת גן", "רחובות",
  "אשקלון", "הרצליה", "חדרה", "כפר סבא", "רעננה", "מודיעין-מכבים-רעות",
  "רמת השרון", "מגדים", "קרית גת", "עכו", "נהריה", "עפולה", "זכרון יעקב"
].sort();

export default function LocationSelect({ value, onChange, isDarkMode }) {
  const [query, setQuery] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);

  const filteredCities = query === '' 
    ? ISRAEL_CITIES 
    : ISRAEL_CITIES.filter(city => city.includes(query));

  const handleSelect = (city) => {
    setQuery(city);
    onChange(city);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="חפש או בחר יישוב..."
        className={`w-full border rounded-xl p-3 text-sm text-right focus:outline-none focus:border-orange-500 ${
          isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
        }`}
        required
      />

      {isOpen && filteredCities.length > 0 && (
        <ul className={`absolute z-50 w-full mt-1 max-h-48 overflow-y-auto rounded-xl border shadow-lg text-sm text-right ${
          isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'
        }`}>
          {filteredCities.map((city, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(city)}
              className={`p-2.5 hover:bg-orange-500 hover:text-white cursor-pointer transition-colors ${
                city === value ? 'font-bold text-orange-500' : ''
              }`}
            >
              📍 {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}