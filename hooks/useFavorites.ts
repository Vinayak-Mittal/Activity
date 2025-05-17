"use client";

import { useState, useEffect } from 'react';
import type { Activity } from '@/components/ActivityCard';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Activity[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('activityFavorites');
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
        // If parsing fails, reset localStorage
        localStorage.setItem('activityFavorites', JSON.stringify([]));
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('activityFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Check if an activity is in favorites
  const isFavorite = (activityId: number): boolean => {
    return favorites.some(fav => fav.id === activityId);
  };

  // Add an activity to favorites
  const addToFavorites = (activity: Activity) => {
    if (!isFavorite(activity.id)) {
      setFavorites(prev => [...prev, activity]);
    }
  };

  // Remove an activity from favorites
  const removeFromFavorites = (activityId: number) => {
    setFavorites(prev => prev.filter(fav => fav.id !== activityId));
  };

  return {
    favorites,
    isFavorite,
    addToFavorites,
    removeFromFavorites
  };
}