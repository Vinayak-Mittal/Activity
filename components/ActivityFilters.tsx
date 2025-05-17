"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Category, Mood, Duration, ActivityFilters } from '@/types/activity';
import { Button } from '@/components/ui/button';
import {
  Clock,
  Brain,
  Layout,
} from 'lucide-react';

interface ActivityFiltersProps {
  filters: ActivityFilters;
  onFilterChange: (filters: ActivityFilters) => void;
}

export function ActivityFilters({ filters, onFilterChange }: ActivityFiltersProps) {
  const categories: Category[] = ['All', 'Indoor', 'Creative', 'Social', 'Physical'];
  const moods: Mood[] = ['Bored', 'Energetic', 'Stressed'];
  const durations: Duration[] = [15, 30, 60, 120];

  const handleCategoryChange = (category: Category) => {
    onFilterChange({ ...filters, category });
  };

  const handleMoodChange = (mood: Mood) => {
    onFilterChange({ ...filters, mood: filters.mood === mood ? null : mood });
  };

  const handleDurationChange = (duration: Duration) => {
    onFilterChange({ ...filters, duration: filters.duration === duration ? null : duration });
  };

  return (
    <div className="space-y-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
      <div>
        <h3 className="flex items-center text-lg font-medium mb-3">
          <Layout className="mr-2 h-5 w-5" />
          Category
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryChange(category)}
              variant={filters.category === category ? "default" : "outline"}
              size="sm"
              className="transition-all duration-200"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="flex items-center text-lg font-medium mb-3">
          <Brain className="mr-2 h-5 w-5" />
          Current Mood
        </h3>
        <div className="flex flex-wrap gap-2">
          {moods.map((mood) => (
            <Button
              key={mood}
              onClick={() => handleMoodChange(mood)}
              variant={filters.mood === mood ? "default" : "outline"}
              size="sm"
              className="transition-all duration-200"
            >
              {mood}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="flex items-center text-lg font-medium mb-3">
          <Clock className="mr-2 h-5 w-5" />
          Time Available
        </h3>
        <div className="flex flex-wrap gap-2">
          {durations.map((duration) => (
            <Button
              key={duration}
              onClick={() => handleDurationChange(duration)}
              variant={filters.duration === duration ? "default" : "outline"}
              size="sm"
              className="transition-all duration-200"
            >
              {duration} min
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}