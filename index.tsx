
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './components/Navbar.tsx';
import ProductCard from './components/ProductCard.tsx';
import Footer from './components/Footer.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import ProductModal from './components/ProductModal.tsx';
import PolicyModal from './components/PolicyModal.tsx';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS, INITIAL_POLICIES } from './constants.ts';
import { Product, SiteSettings, PolicyPage } from './types.ts';

const SCENTS = [
  { name: 'FROSTED SERENITY', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200' },
  { name: 'WILD HEART', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200' },
  { name: 'SILENT GRACE', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1200' },
  { name: 'MIDNIGHT REVERIE', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1200' },
  { name: 'VELVET DOMINION', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200' }
];

const App = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [policies, setPolicies] = useState<PolicyPage[]>(INITIAL_POLICIES);
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);
  const [activePage, setActivePage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyPage | null>(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const filteredProducts = activePage === 'home' || activePage === 'shop' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === activePage.toLowerCase());

  const featuredProducts = products.filter(p => p.featured);

  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onNavigate={handleNavigate}
        isAdmin={isAdmin}
        onAdminToggle={() => setIsAdmin(!isAdmin)}
      />

      <main className="flex-grow">
        {isAdmin ? (
          <AdminPanel 
            products={products}
            settings={settings}
            policies={policies}
            onUpdateProducts={setProducts}
            onUpdateSettings={setSettings}
            onUpdatePolicies={setPolicies}
          />
        ) : (
          <>
            {activePage === 'home' && (
              <>
                {/* 5-Panel Hero Section */}
                <section className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-black flex">
                  {SCENTS.map((scent, idx) => (
                    <div 
                      key={idx}
                      className="group relative flex-1 h-full overflow-hidden transition-all duration-700 ease-in-out hover:flex-[1.5]"
                    >
                      <img 
                        src={scent.image} 
                        alt={scent.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      
                      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 [writing-mode:vertical-rl] rotate-180 z-10 pointer-events-none">
                        <span className="text-white text-lg md:text-2xl serif tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                          {scent.name}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none">
                    <div className="text-center animate-fadeIn px-4">
                      <h1 className="text-5xl md:text-9xl text-white serif mb-4 tracking-[0.1em] leading-tight">
                        MONTCL<span className="relative inline-block"><span className="opacity-0">A</span><span className="absolute inset-0 flex items-center justify-center text-[#D4AF37] font-sans font-light">△</span></span>IRÉ
                      </h1>
                      
                      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
                         {SCENTS.map((s, i) => (
                           <React.Fragment key={i}>
                             <span className="text-[9px] md:text-xs text-white uppercase tracking-[0.4em] font-light">{s.name}</span>
                             {i < SCENTS.length - 1 && <span className="text-white opacity-40">•</span>}
                           </React.Fragment>
                         ))}
                      </div>

                      <div className="pointer-events-auto">
                        <button 
                          onClick={() => handleNavigate('shop')}
                          className="group relative px-12 py-4 bg-black/30 backdrop-blur-sm border border-white/40 text-white overflow-hidden transition-all duration-500 hover:bg-white hover:text-black hover:border-white"
                        >
                          <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.4em]">Explore Collection</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                <AIAssistant />

                <section className="py-20 px-4 bg-white">
                  <div className="max-w-7xl mx-auto text-center mb-12">
                     <span className="text-[#D4AF37] text-[9px] font-bold uppercase tracking-[0.5em] block mb-3">Meticulously Curated</span>
                     <h2 className="text-4xl md:text-5xl serif">The Masterpieces</h2>
                  </div>
                  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {featuredProducts.map(p => (
                      <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />
                    ))}
                  </div>
                </section>

                {/* Secondary Feature with Video (Masculine) - Emerald Aura */}
                <section className="video-banner-container h-[70vh]">
                  <div className="video-overlay bg-[#041A13]/80 mix-blend-multiply" />
                  <div className="video-overlay bg-black/40" />
                  <video autoPlay muted loop playsInline className="opacity-80">
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-businessman-adjusting-his-suit-in-slow-motion-42586-large.mp4" type="video/mp4" />
                  </video>
                  <div className="video-content px-4 text-left items-start max-w-7xl mx-auto w-full">
                    <div className="max-w-xl">
                        <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.5em] block mb-5">Masculine Mastery</span>
                        <h2 className="text-5xl md:text-6xl serif mb-6 leading-tight">The Alchemist's <br/>Prayer</h2>
                        <p className="text-sm opacity-85 leading-relaxed font-light mb-8 tracking-wide max-w-md">
                          A moment of profound contemplation. For the man who values precision, depth, and the quiet power of a lingering signature.
                        </p>
                        <button onClick={() => handleNavigate('men')} className="bg-[#D4AF37] text-white px-10 py-4 text-[9px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl">Discover Men's Privé</button>
                    </div>
                  </div>
                </section>

                {/* Secondary Feature with Video (Feminine) - Amber Aura */}
                <section className="video-banner-container h-[70vh]">
                  <div className="video-overlay bg-[#1A0F0B]/80 mix-blend-multiply" />
                  <div className="video-overlay bg-black/40" />
                  <video autoPlay muted loop playsInline className="opacity-80">
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-for-the-camera-in-slow-motion-42588-large.mp4" type="video/mp4" />
                  </video>
                  <div className="video-content px-4 text-left items-start max-w-7xl mx-auto w-full">
                    <div className="max-w-xl">
                        <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.5em] block mb-5">Feminine Elegance</span>
                        <h2 className="text-5xl md:text-6xl serif mb-6 leading-tight">The Muse's <br/>Secret</h2>
                        <p className="text-sm opacity-85 leading-relaxed font-light mb-8 tracking-wide max-w-md">
                          An ethereal dance of light and floral whispers. For the woman who embodies timeless beauty and the subtle art of an invisible signature.
                        </p>
                        <button onClick={() => handleNavigate('women')} className="bg-[#D4AF37] text-white px-10 py-4 text-[9px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl">Discover Women's Privé</button>
                    </div>
                  </div>
                </section>
              </>
            )}

            {(activePage === 'shop' || activePage === 'men' || activePage === 'women' || activePage === 'unisex') && (
              <section className="pt-28 pb-20 px-4 bg-white min-h-screen">
                <div className="max-w-7xl mx-auto">
                  <header className="mb-12 text-center">
                    <h2 className="text-4xl md:text-5xl serif mb-3 capitalize">{activePage}</h2>
                    <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto opacity-60" />
                  </header>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map(p => (
                      <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <Footer 
        settings={settings} 
        policies={policies} 
        onPolicyClick={setSelectedPolicy} 
        onNavigate={handleNavigate}
      />

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p) => { addToCart(p); setSelectedProduct(null); }}
        />
      )}

      {selectedPolicy && (
        <PolicyModal 
            policy={selectedPolicy} 
            onClose={() => setSelectedPolicy(null)} 
        />
      )}
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
