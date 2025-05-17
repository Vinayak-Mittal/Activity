"use client";

import { useFavorites } from '@/hooks/useFavorites';
import { FavoritesList } from '@/components/FavoritesList';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Your Favorite Activities
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Quick access to the activities you love most
        </p>
      </div>

      <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <FavoritesList 
          favorites={favorites}
          onRemoveFromFavorites={removeFromFavorites}
        />
      </div>
    </div>
  );
}