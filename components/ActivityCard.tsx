"use client";

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Activity {
  id: number;
  name: string;
  category: string;
  emoji: string;
}

interface ActivityCardProps {
  activity: Activity | null;
  isFavorite: boolean;
  onAddToFavorites: (activity: Activity) => void;
  onRemoveFromFavorites: (activityId: number) => void;
  onTryAnother: () => void;
  className?: string;
}

export function ActivityCard({
  activity,
  isFavorite,
  onAddToFavorites,
  onRemoveFromFavorites,
  onTryAnother,
  className
}: ActivityCardProps) {
  // Animation states
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTryAnother = () => {
    setIsAnimating(true);
    // Reset animation after it completes
    setTimeout(() => {
      onTryAnother();
      setIsAnimating(false);
    }, 300);
  };

  const handleFavoriteToggle = () => {
    if (!activity) return;
    
    if (isFavorite) {
      onRemoveFromFavorites(activity.id);
    } else {
      onAddToFavorites(activity);
    }
  };

  if (!activity) {
    return (
      <div className={cn(
        "bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 max-w-md w-full mx-auto text-center",
        className
      )}>
        <p>No activity found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 max-w-md w-full mx-auto text-center transition-opacity duration-300",
        isAnimating ? "opacity-0" : "opacity-100",
        className
      )}
    >
      <div className="mb-6">
        <div className="text-6xl mb-4 mx-auto transform hover:scale-110 transition-transform duration-300 cursor-default">
          {activity.emoji}
        </div>
        <h2 className="text-2xl font-bold mb-2">{activity.name}</h2>
        <div className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 px-3 py-1 rounded-full text-sm font-medium">
          {activity.category}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
        <Button 
          onClick={handleTryAnother}
          variant="gradient" 
          size="lg"
          className="flex-1 group"
        >
          <span className="inline-block group-hover:rotate-180 transition-transform duration-300 mr-2">🔄</span>
          Try Another
        </Button>
        
        <Button
          onClick={handleFavoriteToggle}
          variant={isFavorite ? "destructive" : "outline"}
          size="lg"
          className={cn(
            "flex-1 transition-all duration-300",
            isFavorite ? "bg-pink-500 hover:bg-pink-600" : "hover:border-pink-500 hover:text-pink-500"
          )}
        >
          <Heart 
            className={cn(
              "mr-2 h-5 w-5 transition-transform duration-500",
              isFavorite ? "fill-current animate-pulse" : "",
              "group-hover:scale-110"
            )} 
          />
          {isFavorite ? "Saved" : "Save Activity"}
        </Button>
      </div>
    </div>
  );
}