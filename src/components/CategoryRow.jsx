import React from 'react';
import ItemCard from './ItemCard';

export default function CategoryRow({ category, onSelectItem, favorites, onToggleFavorite, isDarkMode }) {
  if (category.items.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className={`text-xl font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {category.title}
        </h3>
      </div>

      <div className="flex space-x-4 space-x-reverse overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300">
        {category.items.map((item) => (
          <ItemCard 
            key={item.id} 
            item={item} 
            onSelect={onSelectItem} 
            favorites={favorites}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={onToggleFavorite}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
}