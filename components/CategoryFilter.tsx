"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type Category = 'All' | 'Indoor' | 'Creative' | 'Social' | 'Physical';

interface CategoryFilterProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  className?: string;
}

export function CategoryFilter({ 
  selectedCategory, 
  onSelectCategory, 
  className 
}: CategoryFilterProps) {
  const categories: Category[] = ['All', 'Indoor', 'Creative', 'Social', 'Physical'];
  
  // Category icons/emojis
  const categoryEmojis: Record<Category, string> = {
    'All': '🔍',
    'Indoor': '🏠',
    'Creative': '🎨',
    'Social': '👥',
    'Physical': '🏃'
  };

  return (
    <div className={cn("w-full", className)}>
      <h2 className="text-lg font-medium mb-3">Filter by Category</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onSelectCategory(category)}
            variant={selectedCategory === category ? "gradient" : "outline"}
            className={cn(
              "transition-all duration-300 flex items-center",
              selectedCategory === category 
                ? "shadow-md transform scale-105" 
                : "hover:scale-105"
            )}
          >
            <span className="mr-1">{categoryEmojis[category]}</span>
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}