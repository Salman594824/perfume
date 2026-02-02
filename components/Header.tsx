
import React from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <nav className="hidden md:flex gap-8 text-xs font-medium tracking-[0.2em] uppercase">
          <a href="#collection" className="hover:text-amber-700 transition-colors">Collection</a>
          <a href="#consultant" className="hover:text-amber-700 transition-colors">AI Consultant</a>
          <a href="#" className="hover:text-amber-700 transition-colors">House</a>
        </nav>
        
        <div className="text-2xl font-serif font-light tracking-widest uppercase">
          L'Essence
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={onOpenCart}
            className="relative group p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-stone-600 group-hover:stroke-amber-800 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-amber-800 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
