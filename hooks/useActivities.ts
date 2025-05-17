"use client";

import { useState, useEffect } from 'react';
import type { Activity } from '@/components/ActivityCard';
import type { Category } from '@/components/CategoryFilter';

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [isLoading, setIsLoading] = useState(true);

  // Load activities from JSON file
  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch('/data/activities.json');
        const data = await response.json();
        setActivities(data.activities);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load activities:', error);
        setIsLoading(false);
      }
    }

    loadActivities();
  }, []);

  // Filter activities based on selected category
  useEffect(() => {
    const filtered = selectedCategory === 'All'
      ? activities
      : activities.filter(activity => activity.category === selectedCategory);
    
    setFilteredActivities(filtered);
    
    // Select a random activity from filtered list
    if (filtered.length > 0) {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      setCurrentActivity(filtered[randomIndex]);
    } else {
      setCurrentActivity(null);
    }
  }, [selectedCategory, activities]);

  // Function to get a new random activity
  const getRandomActivity = () => {
    if (filteredActivities.length === 0) return;
    
    let newActivity: Activity;
    // Make sure we don't get the same activity twice in a row if possible
    if (filteredActivities.length > 1 && currentActivity) {
      let availableActivities = filteredActivities.filter(
        activity => activity.id !== currentActivity.id
      );
      
      // If filter removed all activities, just use all of them
      if (availableActivities.length === 0) {
        availableActivities = filteredActivities;
      }
      
      const randomIndex = Math.floor(Math.random() * availableActivities.length);
      newActivity = availableActivities[randomIndex];
    } else {
      const randomIndex = Math.floor(Math.random() * filteredActivities.length);
      newActivity = filteredActivities[randomIndex];
    }
    
    setCurrentActivity(newActivity);
  };

  return {
    activities,
    filteredActivities,
    currentActivity,
    selectedCategory,
    isLoading,
    setSelectedCategory,
    getRandomActivity
  };
}