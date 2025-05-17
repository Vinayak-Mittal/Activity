import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Random Activity Generator',
  description: 'Find fun things to do with our random activity generator!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-950`}>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="mt-10 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2025 Random Activity Generator. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}