"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from '@/types/activity';
import { Button } from '@/components/ui/button';
import { Heart, RotateCw, CheckCircle } from 'lucide-react';
import { useActivityStore } from '@/hooks/useActivityStore';

interface ActivityRouletteProps {
  activity: Activity | null;
  onNext: () => void;
}

export function ActivityRoulette({ activity, onNext }: ActivityRouletteProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const { favorites, addToFavorites, removeFromFavorites, incrementStat } = useActivityStore();
  
  const isFavorite = activity ? favorites.some(fav => fav.id === activity.id) : false;

  const handleSpin = () => {
    setIsSpinning(true);
    setTimeout(() => {
      onNext();
      setIsSpinning(false);
      incrementStat('viewed');
    }, 1000);
  };

  const handleComplete = () => {
    if (activity) {
      incrementStat('completed');
    }
  };

  const handleFavoriteToggle = () => {
    if (!activity) return;
    
    if (isFavorite) {
      removeFromFavorites(activity.id);
    } else {
      addToFavorites(activity);
    }
  };

  if (!activity) {
    return (
      <div className="text-center p-8">
        <p>No activities match your filters</p>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8 max-w-md mx-auto"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activity.id}
          className="text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
        >
          <motion.div
            className="text-6xl mb-6"
            animate={{ rotate: isSpinning ? 360 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {activity.emoji}
          </motion.div>
          
          <h2 className="text-2xl font-bold mb-3">{activity.name}</h2>
          
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100">
              {activity.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
              {activity.duration} min
            </span>
            <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100">
              {activity.intensity}
            </span>
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              onClick={handleSpin}
              variant="default"
              size="lg"
              className="group"
              disabled={isSpinning}
            >
              <RotateCw className={`mr-2 h-4 w-4 ${isSpinning ? 'animate-spin' : ''}`} />
              Surprise Me
            </Button>
            
            <Button
              onClick={handleFavoriteToggle}
              variant={isFavorite ? "destructive" : "outline"}
              size="lg"
            >
              <Heart
                className={`mr-2 h-4 w-4 transition-all ${isFavorite ? 'fill-current' : ''}`}
              />
              {isFavorite ? 'Saved' : 'Save'}
            </Button>

            <Button
              onClick={handleComplete}
              variant="outline"
              size="lg"
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Complete
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}