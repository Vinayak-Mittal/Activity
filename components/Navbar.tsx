import Link from 'next/link';
import { Home, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <nav className={cn("w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md", className)}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-xl font-bold flex items-center transition-transform hover:scale-105"
          >
            <span className="mr-2 text-2xl">🎯</span>
            Activity Generator
          </Link>
          <div className="flex space-x-4">
            <Link 
              href="/" 
              className="flex items-center px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
            >
              <Home className="w-5 h-5 mr-1" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link 
              href="/favorites" 
              className="flex items-center px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
            >
              <Heart className="w-5 h-5 mr-1" />
              <span className="hidden sm:inline">Favorites</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}