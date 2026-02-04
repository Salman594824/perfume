
import React, { useState } from 'react';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onNavigate: (page: string) => void;
  isAdmin: boolean;
  onAdminToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onNavigate, isAdmin, onAdminToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 transition-all shadow-sm">
      {/* Top Bar - Ultra Compact */}
      <div className="bg-[#FFFFF0] border-b border-gray-100 py-1 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center text-[9px] font-bold uppercase tracking-[0.25em] text-gray-400">
          <div className="flex items-center">
             <span className="flex items-center gap-1.5">
               <span className="w-1 h-1 bg-[#D4AF37] rounded-full"></span> 
               Free Shipping Across Pakistan - On Orders Above Rs. 3,000
             </span>
          </div>
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-18">
            {/* Left Nav */}
            <div className="hidden md:flex items-center space-x-10 text-[10px] font-bold uppercase tracking-[0.15em]">
              <button onClick={() => onNavigate('shop')} className="hover:text-[#D4AF37] transition-colors">Shop All</button>
              <button onClick={() => onNavigate('men')} className="hover:text-[#D4AF37] transition-colors">Men</button>
              <button onClick={() => onNavigate('women')} className="hover:text-[#D4AF37] transition-colors">Women</button>
            </div>

            {/* Center Logo */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <button onClick={() => onNavigate('home')} className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase leading-none">
                MONTCL<span className="text-[#D4AF37]">△</span>IRÉ
              </button>
              <span className="text-[8px] uppercase tracking-[0.4em] text-gray-400 mt-0.5 font-bold">Montclaire</span>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-5">
              <button onClick={onAdminToggle} className={`hidden sm:block text-[9px] uppercase font-bold tracking-tighter px-2 py-0.5 border ${isAdmin ? 'bg-black text-white border-black' : 'border-black hover:bg-black hover:text-white transition-colors'}`}>
                {isAdmin ? 'ADMIN' : 'ADMIN'}
              </button>
              <button className="hidden sm:block hover:text-[#D4AF37] transition-colors text-gray-700"><Search size={18} /></button>
              <button className="hidden sm:block hover:text-[#D4AF37] transition-colors text-gray-700"><User size={18} /></button>
              <button onClick={() => onNavigate('cart')} className="relative hover:text-[#D4AF37] transition-colors text-gray-700">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-slideDown shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-4 text-center">
            <button onClick={() => { onNavigate('shop'); setIsOpen(false); }} className="block w-full py-2 text-xs uppercase font-bold tracking-widest border-b border-gray-50">Shop All</button>
            <button onClick={() => { onNavigate('men'); setIsOpen(false); }} className="block w-full py-2 text-xs uppercase font-bold tracking-widest border-b border-gray-50">Men</button>
            <button onClick={() => { onNavigate('women'); setIsOpen(false); }} className="block w-full py-2 text-xs uppercase font-bold tracking-widest border-b border-gray-50">Women</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
