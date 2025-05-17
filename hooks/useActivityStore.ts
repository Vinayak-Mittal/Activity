"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Activity } from '@/types/activity';

interface ActivityStats {
  viewed: number;
  favorited: number;
  completed: number;
}

interface ActivityState {
  favorites: Activity[];
  customActivities: Activity[];
  stats: ActivityStats;
  currentActivity: Activity | null;
  addToFavorites: (activity: Activity) => void;
  removeFromFavorites: (id: number) => void;
  addCustomActivity: (activity: Activity) => void;
  removeCustomActivity: (id: number) => void;
  incrementStat: (stat: keyof ActivityStats) => void;
  setCurrentActivity: (activity: Activity | null) => void;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      favorites: [],
      customActivities: [],
      stats: {
        viewed: 0,
        favorited: 0,
        completed: 0,
      },
      currentActivity: null,
      addToFavorites: (activity) =>
        set((state) => ({
          favorites: [...state.favorites, activity],
          stats: {
            ...state.stats,
            favorited: state.stats.favorited + 1,
          },
        })),
      removeFromFavorites: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== id),
        })),
      addCustomActivity: (activity) =>
        set((state) => ({
          customActivities: [...state.customActivities, activity],
        })),
      removeCustomActivity: (id) =>
        set((state) => ({
          customActivities: state.customActivities.filter((act) => act.id !== id),
        })),
      incrementStat: (stat) =>
        set((state) => ({
          stats: {
            ...state.stats,
            [stat]: state.stats[stat] + 1,
          },
        })),
      setCurrentActivity: (activity) =>
        set(() => ({
          currentActivity: activity,
        })),
    }),
    {
      name: 'activity-storage',
    }
  )
);