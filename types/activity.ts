export type Mood = 'Bored' | 'Energetic' | 'Stressed';
export type Category = 'All' | 'Indoor' | 'Creative' | 'Social' | 'Physical';
export type Duration = 15 | 30 | 60 | 120;
export type Intensity = 'Low' | 'Medium' | 'High';

export interface Activity {
  id: number;
  name: string;
  category: Category;
  mood: Mood[];
  duration: number;
  emoji: string;
  intensity: Intensity;
}

export interface ActivityFilters {
  category: Category;
  mood: Mood | null;
  duration: Duration | null;
}