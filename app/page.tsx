"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCw, CheckCircle, Layout, Brain, Clock } from 'lucide-react';

// Types
type Mood = 'Bored' | 'Energetic' | 'Stressed';
type Category = 'All' | 'Indoor' | 'Creative' | 'Social' | 'Physical';
type Duration = 15 | 30 | 60 | 120;
type Intensity = 'Low' | 'Medium' | 'High';

interface Activity {
  id: number;
  name: string;
  category: Category;
  mood: Mood[];
  duration: number;
  emoji: string;
  intensity: Intensity;
}

interface ActivityFilters {
  category: Category;
  mood: Mood | null;
  duration: Duration | null;
}

// Sample activities data
const activities: Activity[] = [
  {
    id: 1,
    name: "Go for a 30-minute walk",
    category: "Physical",
    mood: ["Stressed", "Energetic"],
    duration: 30,
    emoji: "🚶",
    intensity: "Medium"
  },
  {
    id: 2,
    name: "Read a chapter of a book",
    category: "Indoor",
    mood: ["Bored", "Stressed"],
    duration: 20,
    emoji: "📚",
    intensity: "Low"
  },
  // Add more activities as needed
];

export default function Home() {
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [filters, setFilters] = useState<ActivityFilters>({
    category: 'All',
    mood: null,
    duration: null,
  });
  const [favorites, setFavorites] = useState<Activity[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);

  // Filter activities based on selected filters
  const filteredActivities = activities.filter(activity => {
    if (filters.category !== 'All' && activity.category !== filters.category) return false;
    if (filters.mood && !activity.mood.includes(filters.mood)) return false;
    if (filters.duration && activity.duration > filters.duration) return false;
    return true;
  });

  // Set initial activity
  useEffect(() => {
    if (filteredActivities.length > 0) {
      const randomActivity = filteredActivities[Math.floor(Math.random() * filteredActivities.length)];
      setCurrentActivity(randomActivity);
    }
  }, [filters]);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSpin = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const randomActivity = filteredActivities[Math.floor(Math.random() * filteredActivities.length)];
      setCurrentActivity(randomActivity);
      setIsSpinning(false);
    }, 1000);
  };

  const toggleFavorite = (activity: Activity) => {
    if (favorites.some(fav => fav.id === activity.id)) {
      setFavorites(favorites.filter(fav => fav.id !== activity.id));
    } else {
      setFavorites([...favorites, activity]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-950">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Find Your Next Adventure
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Discover the perfect activity based on your mood and available time
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-[1fr,2fr]">
            {/* Filters */}
            <div className="space-y-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              {/* Category Filter */}
              <div>
                <h3 className="flex items-center text-lg font-medium mb-3">
                  <Layout className="mr-2 h-5 w-5" />
                  Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Indoor', 'Creative', 'Social', 'Physical'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setFilters({ ...filters, category: category as Category })}
                      className={`px-4 py-2 rounded-md transition-all duration-200 ${
                        filters.category === category
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood Filter */}
              <div>
                <h3 className="flex items-center text-lg font-medium mb-3">
                  <Brain className="mr-2 h-5 w-5" />
                  Current Mood
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Bored', 'Energetic', 'Stressed'].map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setFilters({ ...filters, mood: mood as Mood })}
                      className={`px-4 py-2 rounded-md transition-all duration-200 ${
                        filters.mood === mood
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Filter */}
              <div>
                <h3 className="flex items-center text-lg font-medium mb-3">
                  <Clock className="mr-2 h-5 w-5" />
                  Time Available
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[15, 30, 60, 120].map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setFilters({ ...filters, duration: duration as Duration })}
                      className={`px-4 py-2 rounded-md transition-all duration-200 ${
                        filters.duration === duration
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                      }`}
                    >
                      {duration} min
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity Display */}
            {currentActivity && (
              <motion.div
                className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentActivity.id}
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
                      {currentActivity.emoji}
                    </motion.div>
                    
                    <h2 className="text-2xl font-bold mb-3">{currentActivity.name}</h2>
                    
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100">
                        {currentActivity.category}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
                        {currentActivity.duration} min
                      </span>
                      <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100">
                        {currentActivity.intensity}
                      </span>
                    </div>

                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={handleSpin}
                        className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        disabled={isSpinning}
                      >
                        <RotateCw className={`mr-2 h-4 w-4 ${isSpinning ? 'animate-spin' : ''}`} />
                        Surprise Me
                      </button>
                      
                      <button
                        onClick={() => toggleFavorite(currentActivity)}
                        className={`flex items-center px-6 py-2 rounded-lg transition-colors ${
                          favorites.some(fav => fav.id === currentActivity.id)
                            ? 'bg-pink-600 text-white hover:bg-pink-700'
                            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                        }`}
                      >
                        <Heart
                          className={`mr-2 h-4 w-4 ${
                            favorites.some(fav => fav.id === currentActivity.id) ? 'fill-current' : ''
                          }`}
                        />
                        {favorites.some(fav => fav.id === currentActivity.id) ? 'Saved' : 'Save'}
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}