"use client";

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Activity } from '@/components/ActivityCard';
import { cn } from '@/lib/utils';

interface FavoritesListProps {
  favorites: Activity[];
  onRemoveFromFavorites: (activityId: number) => void;
  className?: string;
}

export function FavoritesList({
  favorites,
  onRemoveFromFavorites,
  className
}: FavoritesListProps) {
  if (favorites.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <div className="text-6xl mb-4">💭</div>
        <h2 className="text-2xl font-bold mb-3">No favorites yet</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          When you find activities you love, save them here for easy access!
        </p>
        <Button href="/" variant="gradient" asChild>
          <a href="/">Find Activities</a>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-2xl font-bold mb-6">Your Favorite Activities</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {favorites.map((activity) => (
          <div 
            key={activity.id}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 flex items-center justify-between group hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center">
              <div className="text-3xl mr-3">{activity.emoji}</div>
              <div>
                <p className="font-medium">{activity.name}</p>
                <p className="text-sm text-purple-600 dark:text-purple-400">{activity.category}</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveFromFavorites(activity.id)}
              className="text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove from favorites</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}