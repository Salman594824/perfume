
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ScentConsultant } from './components/ScentConsultant';
import { CartDrawer } from './components/CartDrawer';
import { PERFUMES } from './constants';
import { Perfume, CartItem } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const addToCart = (perfume: Perfume) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === perfume.id);
      if (existing) {
        return prev.map(item => item.id === perfume.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...perfume, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, q: number) => {
    if (q < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: q } : item));
  };

  const filteredPerfumes = activeFilter === 'all' 
    ? PERFUMES 
    : PERFUMES.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen">
      <Header cartCount={cart.reduce((s, i) => s + i.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-transparent to-stone-50" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <span className="text-white text-xs font-medium uppercase tracking-[0.4em] mb-6 block drop-shadow-lg">Artisanal Perfumery</span>
          <h1 className="text-white text-6xl md:text-8xl font-serif font-light mb-8 drop-shadow-xl">
            Montclaire
          </h1>
          <p className="text-white/90 max-w-xl mx-auto text-lg md:text-xl font-light leading-relaxed mb-10">
            A celebration of the ephemeral. Crafted in small batches, infused with emotion, and discovered through intelligence.
          </p>
          <a 
            href="#collection" 
            className="inline-block bg-white text-stone-900 px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-stone-100 transition-all transform hover:-translate-y-1"
          >
            Explore Collection
          </a>
        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">The Collection</h2>
            <p className="text-stone-500 max-w-md">Refined scents for the modern connoisseur. Each bottle is hand-poured and numbered.</p>
          </div>
          <div className="flex gap-4 border-b border-stone-200">
            {['all', 'floral', 'woody', 'oriental', 'fresh'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`pb-4 text-[10px] uppercase tracking-[0.2em] transition-all relative ${
                  activeFilter === cat ? 'text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                {cat}
                {activeFilter === cat && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredPerfumes.map(perfume => (
            <div key={perfume.id} className="group">
              <div className="aspect-[4/5] bg-stone-100 mb-6 overflow-hidden relative">
                <img 
                  src={perfume.image} 
                  alt={perfume.name} 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors" />
                <button 
                  onClick={() => addToCart(perfume)}
                  className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm text-stone-900 py-6 font-bold uppercase tracking-widest text-[10px] translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                  Add to Bag
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-serif group-hover:text-amber-900 transition-colors">{perfume.name}</h3>
                  <p className="text-xs text-stone-400 uppercase tracking-widest mt-1">{perfume.brand}</p>
                </div>
                <span className="font-medium text-stone-600">${perfume.price}</span>
              </div>
              <div className="mt-3 flex gap-2">
                {perfume.notes.map(note => (
                  <span key={note} className="text-[9px] text-stone-400 border border-stone-200 px-1.5 py-0.5 rounded-full uppercase">
                    {note}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ScentConsultant />

      {/* Philosophy Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square">
            <img 
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover" 
              alt="Process" 
            />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 border-[20px] border-stone-100 -z-10 hidden lg:block" />
          </div>
          <div>
            <span className="text-stone-400 text-xs font-medium uppercase tracking-[0.3em] block mb-6">Our Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Beyond Fragrance: A Journey for the Senses</h2>
            <p className="text-stone-600 leading-relaxed mb-8">
              At Montclaire, we believe that perfume is the most intimate form of memory. We don't just blend molecules; we translate emotions into olfactory compositions. 
            </p>
            <p className="text-stone-600 leading-relaxed mb-10">
              Each raw material is ethically sourced from small independent farmers worldwide, ensuring that every drop tells a story of craftsmanship and respect for the earth.
            </p>
            <div className="flex gap-12 border-t border-stone-100 pt-10">
              <div>
                <div className="text-2xl font-serif">100%</div>
                <div className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">Natural Concentrates</div>
              </div>
              <div>
                <div className="text-2xl font-serif">72hr</div>
                <div className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">Maceration Period</div>
              </div>
              <div>
                <div className="text-2xl font-serif">6</div>
                <div className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">Master Perfumers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-stone-50 border-t border-stone-200 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="text-2xl font-serif tracking-widest uppercase mb-8">Montclaire</div>
            <p className="text-stone-500 max-w-sm mb-8">Sign up for exclusive access to small-batch releases and private collection previews.</p>
            <form className="flex max-w-sm">
              <input type="email" placeholder="Email Address" className="flex-1 bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-stone-900 transition-colors" />
              <button className="px-6 py-3 border-b border-stone-300 hover:text-amber-800 transition-colors uppercase text-[10px] font-bold tracking-widest">Join</button>
            </form>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-stone-500">
              <li><a href="#" className="hover:text-stone-900">The Collection</a></li>
              <li><a href="#" className="hover:text-stone-900">Scent Finder</a></li>
              <li><a href="#" className="hover:text-stone-900">Samples & Sets</a></li>
              <li><a href="#" className="hover:text-stone-900">Home Fragrance</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-6">Client Care</h4>
            <ul className="space-y-4 text-sm text-stone-500">
              <li><a href="#" className="hover:text-stone-900">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-stone-900">Private Consultations</a></li>
              <li><a href="#" className="hover:text-stone-900">Ingredient Sourcing</a></li>
              <li><a href="#" className="hover:text-stone-900">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-stone-400 uppercase tracking-widest">
          <span>&copy; 2024 Montclaire Private Blend. All rights reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-stone-900">Privacy Policy</a>
            <a href="#" className="hover:text-stone-900">Terms of Service</a>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
};

export default App;
