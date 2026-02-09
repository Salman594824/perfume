
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './components/Navbar.tsx';
import ProductCard from './components/ProductCard.tsx';
import Footer from './components/Footer.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import ProductModal from './components/ProductModal.tsx';
import PolicyModal from './components/PolicyModal.tsx';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS, INITIAL_POLICIES } from './constants.ts';
import { Product, SiteSettings, PolicyPage, Order, OrderStatus } from './types.ts';
import { Lock, X, ShoppingBag, ArrowRight, MapPin, CheckCircle, Truck, User, Home, Loader2, MessageCircle } from 'lucide-react';

const SCENTS = [
  { name: 'FROSTED SERENITY', image: 'https://instasize.com/p/c49007578ec658169c01762bf9e2ddff475e8a98088a9975036c3a61e2266bdd' },
  { name: 'WILD HEART', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200' },
  { name: 'SILENT GRACE', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1200' },
  { name: 'MIDNIGHT REVERIE', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1200' },
  { name: 'VELVET DOMINION', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200' }
];

const ADMIN_PASSWORD = "@nnh#gg/*dd;)Allahoakber_|!kkahi--n3335266"; 

const App = () => {
  // Persistence for Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('montclaire_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Persistence for Settings
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('montclaire_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  // Persistence for Policies
  const [policies, setPolicies] = useState<PolicyPage[]>(() => {
    const saved = localStorage.getItem('montclaire_policies');
    return saved ? JSON.parse(saved) : INITIAL_POLICIES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('montclaire_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);
  const [activePage, setActivePage] = useState('home');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'processing' | 'success'>('cart');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyPage | null>(null);
  const [trackingIdInput, setTrackingIdInput] = useState('');
  const [lastOrderRef, setLastOrderRef] = useState('');
  const [processingStatus, setProcessingStatus] = useState('');
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: ''
  });

  // Effect hooks for automatic background saving
  useEffect(() => {
    localStorage.setItem('montclaire_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('montclaire_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('montclaire_policies', JSON.stringify(policies));
  }, [policies]);

  useEffect(() => {
    localStorage.setItem('montclaire_orders', JSON.stringify(orders));
  }, [orders]);

  const handleManualSave = () => {
    localStorage.setItem('montclaire_products', JSON.stringify(products));
    localStorage.setItem('montclaire_settings', JSON.stringify(settings));
    localStorage.setItem('montclaire_policies', JSON.stringify(policies));
    localStorage.setItem('montclaire_orders', JSON.stringify(orders));
    alert("Vault Synchronized: All catalog changes and boutique configurations have been secured for future sessions.");
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPass === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginPass('');
      setLoginError(false);
    } else {
      setLoginError(true);
      setLoginPass('');
    }
  };

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setShowLogin(true);
    }
  };

  const handleNavigate = (page: string) => {
    setActivePage(page);
    setCheckoutStep('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('processing');
    
    const steps = [
      "Securing boutique ledger...",
      "Generating unique tracking protocol...",
      "Preparing WhatsApp Order Manifest..."
    ];

    for (const step of steps) {
      setProcessingStatus(step);
      await new Promise(r => setTimeout(r, 600));
    }

    const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const tracking = `MNT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    const newOrder: Order = {
      id: Date.now().toString(),
      trackingNumber: tracking,
      status: OrderStatus.PENDING,
      items: cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      subtotal,
      shipping: 0,
      total: subtotal,
      date: new Date().toISOString()
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setLastOrderRef(tracking);
    setCheckoutStep('success');
    setCart([]);
  };

  const redirectToWhatsApp = () => {
    const order = orders[0];
    if (!order) return;

    const itemsList = order.items.map(i => `• ${i.name} (x${i.quantity})`).join('%0A');
    const message = `Greetings MONTCL△IRÉ,%0A%0AAn acquisition has been placed via WhatsApp.%0A%0A*Order Reference:* ${order.trackingNumber}%0A*Client Name:* ${customerInfo.name}%0A*Delivery Location:* ${customerInfo.address}%0A%0A*Acquisition Details:*%0A${itemsList}%0A%0A*Total Value:* $${order.total}%0A%0APlease confirm my deployment progress.`;
    
    const whatsappUrl = `https://wa.me/923371292112?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredProducts = activePage === 'home' || activePage === 'shop' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === activePage.toLowerCase());

  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFF0] relative overflow-x-hidden selection:bg-[#D4AF37] selection:text-white">
      <div className="fixed top-[-10%] left-[-10%] w-[45%] h-[45%] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-[#041A13]/5 rounded-full blur-[140px] pointer-events-none z-0"></div>

      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onNavigate={handleNavigate}
        isAdmin={isAdmin}
        onAdminToggle={handleAdminToggle}
      />

      <main className="flex-grow relative z-10">
        {isAdmin ? (
          <AdminPanel 
            products={products}
            settings={settings}
            policies={policies}
            orders={orders}
            onUpdateProducts={setProducts}
            onUpdateSettings={setSettings}
            onUpdatePolicies={setPolicies}
            onUpdateOrders={setOrders}
            onSave={handleManualSave}
          />
        ) : (
          <>
            {activePage === 'home' && (
              <>
                <section className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-black flex">
                  {SCENTS.map((scent, idx) => (
                    <div key={idx} className="group relative flex-1 h-full overflow-hidden transition-all duration-700 ease-in-out hover:flex-[1.8]">
                      <img src={scent.image} alt={scent.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 [writing-mode:vertical-rl] rotate-180 z-10 pointer-events-none">
                        <span className="text-white text-lg md:text-3xl serif tracking-[0.3em] opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-2xl">{scent.name}</span>
                      </div>
                    </div>
                  ))}
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none text-center animate-fadeIn px-4">
                      <h1 className="text-6xl md:text-[11rem] text-white serif mb-4 tracking-[0.15em] leading-none drop-shadow-2xl">
                        MONTCL<span className="relative inline-block"><span className="opacity-0">A</span><span onClick={handleAdminToggle} className="absolute inset-0 flex items-center justify-center text-[#D4AF37] font-sans font-light cursor-pointer pointer-events-auto active:scale-90 transition-transform hover:scale-110">★</span></span>IRÉ
                      </h1>
                      <div className="flex flex-wrap justify-center gap-4 mb-12">
                         {SCENTS.map((s, i) => <span key={i} className="text-[10px] text-white uppercase tracking-[0.5em] font-bold opacity-80">{s.name} {i < SCENTS.length - 1 ? '•' : ''}</span>)}
                      </div>
                      <div className="pointer-events-auto flex gap-6 justify-center">
                        <button onClick={() => handleNavigate('shop')} className="px-14 py-5 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all rounded-sm shadow-2xl">Explore Vault</button>
                        <button onClick={() => handleNavigate('track')} className="px-14 py-5 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-white/20 transition-all rounded-sm">Logistics</button>
                      </div>
                  </div>
                </section>
                
                <AIAssistant />

                {/* Pour Femme Section */}
                <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
                   <img src="https://images.unsplash.com/photo-1503104834685-7205e8607eb9?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover grayscale-[20%] contrast-[1.1]" alt="Pour Femme Showcase" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                   <div className="relative z-10 text-center px-6 animate-fadeIn max-w-4xl">
                      <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.6em] block mb-6">MONTCL△IRÉ POUR FEMME</span>
                      <h2 className="text-5xl md:text-8xl text-white serif mb-8 tracking-wide">The Eternal Muse</h2>
                      <p className="text-white/70 text-base md:text-lg font-light tracking-widest mb-12 leading-relaxed max-w-2xl mx-auto italic">"A fragrance that defines the feminine spirit — delicate, powerful, and utterly unforgettable."</p>
                      <button onClick={() => handleNavigate('women')} className="px-16 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-[#D4AF37] hover:text-white transition-all rounded-sm shadow-2xl">Explore Women's Vault</button>
                   </div>
                </section>

                {/* Masterpieces Section */}
                <section className="py-32 px-4 bg-white">
                  <div className="max-w-7xl mx-auto text-center mb-16">
                     <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.6em] block mb-4">Meticulously Curated</span>
                     <h2 className="text-5xl md:text-6xl serif tracking-tight">The Masterpieces</h2>
                  </div>
                  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                    {featuredProducts.map(p => <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />)}
                  </div>
                </section>

                {/* Pour Homme Section - Restored */}
                <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
                   <img 
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2000" 
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.2]" 
                    alt="Pour Homme Showcase"
                   />
                   <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
                   <div className="relative z-10 text-center px-6 animate-fadeIn max-w-4xl">
                      <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.6em] block mb-6">MONTCL△IRÉ POUR HOMME</span>
                      <h2 className="text-5xl md:text-8xl text-white serif mb-8 tracking-wide">Commanding Presence</h2>
                      <p className="text-white/70 text-base md:text-lg font-light tracking-widest mb-12 leading-relaxed max-w-2xl mx-auto italic">
                        "For the gentleman who speaks with quiet authority. A legacy in every drop."
                      </p>
                      <button 
                        onClick={() => handleNavigate('men')}
                        className="px-16 py-5 bg-black text-white border border-white/20 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-[#D4AF37] transition-all rounded-sm shadow-2xl"
                      >
                        Explore Men's Vault
                      </button>
                   </div>
                </section>
              </>
            )}

            {(activePage === 'shop' || activePage === 'men' || activePage === 'women' || activePage === 'unisex') && (
              <section className="pt-32 pb-24 px-4 bg-white/50 backdrop-blur-sm min-h-screen">
                <div className="max-w-7xl mx-auto">
                  <header className="mb-20 text-center">
                    <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.6em] block mb-4">Montclaire Vault</span>
                    <h2 className="text-5xl md:text-6xl serif mb-3 capitalize tracking-tight">{activePage}</h2>
                  </header>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {filteredProducts.map(p => <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />)}
                  </div>
                </div>
              </section>
            )}

            {activePage === 'cart' && (
              <section className="relative min-h-screen flex items-center justify-center py-32 px-4 overflow-hidden">
                <div className="absolute inset-0 z-0 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=100&w=2000" className="w-full h-full object-cover opacity-90 contrast-[1.1]" alt="Luxury Cart Background" />
                   <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="max-w-4xl w-full relative z-10 transition-all duration-700">
                  {checkoutStep === 'cart' && (
                    <div className="bg-[#FFFFF0]/95 backdrop-blur-[60px] border border-white rounded-[4rem] p-12 md:p-20 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.5)] animate-fadeIn">
                      {cart.length === 0 ? (
                        <div className="text-center py-12 space-y-12">
                          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mx-auto border border-white shadow-xl animate-pulse"><ShoppingBag size={40} className="text-[#D4AF37] opacity-80" /></div>
                          <div>
                            <h2 className="text-5xl md:text-6xl serif mb-6 tracking-tight text-center">Selection Empty</h2>
                            <p className="text-gray-500 font-bold tracking-[0.4em] uppercase text-[10px] max-w-xs mx-auto leading-relaxed text-center">Luxury is defined by choice. Begin your sensory acquisition today.</p>
                          </div>
                          <button onClick={() => handleNavigate('shop')} className="px-20 py-6 bg-[#041A13] text-white text-[11px] font-bold uppercase tracking-[0.5em] hover:bg-[#D4AF37] transition-all rounded-full shadow-2xl mx-auto block hover:scale-105 active:scale-95">Browse Collection</button>
                        </div>
                      ) : (
                        <div className="text-left">
                          <h2 className="text-5xl serif mb-12 border-b border-black/5 pb-10 tracking-tight">Your Collection</h2>
                          <div className="space-y-10">
                            {cart.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-10 border-b border-black/5 pb-10 group transition-all">
                                <div className="relative overflow-hidden rounded-[2.5rem] w-32 h-32 shadow-2xl flex-shrink-0"><img src={item.product.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /></div>
                                <div className="flex-grow">
                                  <h3 className="text-2xl serif mb-1 tracking-tight">{item.product.name}</h3>
                                  <p className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold mb-3">{item.product.brand}</p>
                                  <p className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">Quantity: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-3xl font-bold tracking-tighter mb-1">${item.product.price * item.quantity}</p>
                                  <button onClick={() => setCart(prev => prev.filter(i => i.product.id !== item.product.id))} className="text-red-400 text-[9px] uppercase font-bold tracking-widest hover:text-red-600 transition-colors">Remove</button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-black/5">
                            <div className="text-center md:text-left">
                              <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-2 font-bold">Subtotal Value</p>
                              <p className="text-6xl font-bold tracking-tighter">${cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)}</p>
                            </div>
                            <div className="flex flex-col gap-4 w-full md:w-auto text-center">
                              <button onClick={() => { setCheckoutStep('shipping'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="px-20 py-6 bg-[#041A13] text-white text-[11px] font-bold uppercase tracking-[0.6em] hover:bg-[#D4AF37] transition-all rounded-full shadow-2xl flex items-center justify-center gap-4 hover:scale-105 active:scale-95 group">Proceed to Handshake <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></button>
                              <button onClick={() => handleNavigate('shop')} className="text-[9px] uppercase tracking-[0.4em] font-bold text-gray-400 hover:text-black transition-colors">Continue Discovering</button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {checkoutStep === 'shipping' && (
                    <div className="bg-[#FFFFF0]/95 backdrop-blur-[60px] border border-white rounded-[4rem] p-12 md:p-24 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.5)] animate-fadeIn max-w-2xl mx-auto">
                       <header className="text-center mb-16">
                         <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto border border-white shadow-xl mb-8"><Truck className="text-[#D4AF37]" size={32} /></div>
                         <h2 className="text-5xl serif mb-3 tracking-tight">Client Handshake</h2>
                         <p className="text-[11px] uppercase tracking-[0.4em] text-gray-400 font-bold">Direct WhatsApp Acquisition</p>
                       </header>
                       <form onSubmit={handleCompleteOrder} className="space-y-10">
                          <div className="space-y-4">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-6">Full Name</label>
                            <div className="relative group">
                              <User className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
                              <input required type="text" placeholder="Sterling Montgomery" value={customerInfo.name} onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})} className="w-full bg-white border border-black/5 px-20 py-6 rounded-full outline-none focus:ring-1 focus:ring-[#D4AF37] shadow-inner transition-all" />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-6">Delivery Location</label>
                            <div className="relative group">
                              <Home className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
                              <input required type="text" placeholder="House #, Street, City" value={customerInfo.address} onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})} className="w-full bg-white border border-black/5 px-20 py-6 rounded-full outline-none focus:ring-1 focus:ring-[#D4AF37] shadow-inner transition-all" />
                            </div>
                          </div>
                          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                            <button type="button" onClick={() => setCheckoutStep('cart')} className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Return to Review</button>
                            <button type="submit" className="px-20 py-6 bg-[#041A13] text-white text-[11px] font-bold uppercase tracking-[0.6em] hover:bg-[#D4AF37] transition-all rounded-full shadow-2xl flex items-center gap-4">Finalize Acquisition <CheckCircle size={18} /></button>
                          </div>
                       </form>
                    </div>
                  )}

                  {checkoutStep === 'processing' && (
                    <div className="bg-[#FFFFF0]/95 backdrop-blur-[60px] border border-white rounded-[4rem] p-24 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.5)] animate-fadeIn text-center max-w-2xl mx-auto">
                       <Loader2 className="mx-auto text-[#D4AF37] animate-spin mb-10" size={60} />
                       <h2 className="text-4xl serif mb-6 tracking-tight">Initializing Secure Handshake</h2>
                       <p className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-[12px] animate-pulse">{processingStatus}</p>
                       <div className="mt-12 max-w-xs mx-auto h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#D4AF37] transition-all duration-700 w-3/4 animate-[progress_3s_ease-in-out_infinite]" />
                       </div>
                    </div>
                  )}

                  {checkoutStep === 'success' && (
                    <div className="max-w-xl mx-auto space-y-16 animate-fadeIn py-12">
                       <div className="bg-white/95 backdrop-blur-[40px] border border-white rounded-[4rem] p-16 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] text-center">
                          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9CA3AF] mb-8">Your Tracking Reference</p>
                          <div className="space-y-2">
                             <p className="text-4xl md:text-5xl font-bold tracking-[0.2em] text-[#D4AF37] leading-tight break-all uppercase drop-shadow-sm px-4">
                                {lastOrderRef.split('-').map((part, i) => (
                                  <React.Fragment key={i}>{part}{i < lastOrderRef.split('-').length - 1 ? '-\n' : ''}</React.Fragment>
                                ))}
                             </p>
                          </div>
                       </div>

                       <div className="text-center space-y-10">
                          <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-gray-400">Final Step Required</p>
                          <button 
                            onClick={redirectToWhatsApp}
                            className="w-full bg-[#25D366] text-white py-8 rounded-[2.5rem] text-[11px] font-bold uppercase tracking-[0.5em] flex items-center justify-center gap-5 hover:scale-[1.03] active:scale-[0.97] transition-all shadow-[0_20px_40px_-10px_rgba(37,211,102,0.4)]"
                          >
                            <MessageCircle size={24} /> Send Order via WhatsApp
                          </button>
                          <p className="text-[9px] text-gray-400 uppercase tracking-[0.4em] leading-relaxed max-w-[280px] mx-auto font-medium">
                            Complete your order by sending your manifest to our boutique specialists via WhatsApp.
                          </p>
                       </div>

                       <div className="flex justify-center gap-12 pt-4">
                          <button onClick={() => handleNavigate('home')} className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300 hover:text-black transition-colors">Return Home</button>
                          <button onClick={() => handleNavigate('track')} className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300 hover:text-black transition-colors">Track Shipment</button>
                       </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {activePage === 'track' && (
              <section className="pt-32 pb-24 px-4 min-h-screen flex items-center justify-center relative">
                <div className="max-w-2xl w-full bg-white/40 backdrop-blur-[50px] border border-white rounded-[4rem] p-12 md:p-24 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] relative z-10 text-center animate-fadeIn">
                   <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto border border-white shadow-xl mb-10"><MapPin size={32} className="text-[#D4AF37]" /></div>
                   <h2 className="text-6xl serif mb-6 tracking-tight">Track Progress</h2>
                   <p className="text-gray-500 font-bold tracking-[0.4em] uppercase text-[11px] mb-14">Real-time Logistics Monitoring</p>
                   <div className="space-y-8">
                      <div className="relative">
                        <input type="text" value={trackingIdInput} onChange={(e) => setTrackingIdInput(e.target.value.toUpperCase())} placeholder="MNT-XXXXXXXX" className="w-full bg-white border-b border-[#D4AF37]/50 py-6 outline-none focus:border-[#D4AF37] text-center tracking-[0.4em] uppercase font-bold text-2xl placeholder:opacity-30 placeholder:font-normal transition-all" />
                      </div>
                      <button onClick={() => {
                        const order = orders.find(o => o.trackingNumber === trackingIdInput);
                        if(order) {
                          alert(`Order Status: ${order.status}. Deployment date: ${new Date(order.date).toLocaleDateString()}`);
                        } else {
                          alert("Reference ID not found in the global vault.");
                        }
                      }} className="w-full bg-[#041A13] text-white py-6 rounded-full text-[12px] font-bold uppercase tracking-[0.6em] hover:bg-[#D4AF37] transition-all shadow-2xl">Retrieve Dispatch Status</button>
                   </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <Footer settings={settings} policies={policies} onPolicyClick={setSelectedPolicy} onNavigate={handleNavigate} />
      
      {showLogin && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowLogin(false)} />
          <div className="relative bg-[#041A13]/95 backdrop-blur-xl w-full max-w-md rounded-[3rem] p-12 border border-[#D4AF37]/20 animate-fadeIn text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)]">
            <button onClick={() => setShowLogin(false)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"><X size={24} /></button>
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6 border border-[#D4AF37]/20 shadow-inner"><Lock className="text-[#D4AF37]" size={30} /></div>
              <h2 className="text-3xl serif mb-3">Vault Authentication</h2>
              <p className="text-[11px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold opacity-80">Restricted Access Protocol</p>
            </div>
            <form onSubmit={handleAdminAuth} className="space-y-8">
              <input type="password" autoFocus value={loginPass} onChange={(e) => { setLoginPass(e.target.value); setLoginError(false); }} placeholder="AUTHENTICATION PASSKEY" className={`w-full bg-white/5 border-b ${loginError ? 'border-red-500' : 'border-[#D4AF37]/50'} py-6 outline-none focus:border-[#D4AF37] text-white transition-all text-center tracking-[0.6em] placeholder:tracking-widest placeholder:opacity-20 text-lg`} />
              {loginError && <p className="text-[11px] text-red-400 mt-2 text-center uppercase font-bold tracking-widest animate-pulse">Access Denied</p>}
              <button type="submit" className="w-full bg-[#D4AF37] text-white py-6 rounded-full text-[12px] font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all shadow-2xl">Decrypt & Access</button>
            </form>
          </div>
        </div>
      )}

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={(p) => { addToCart(p); setSelectedProduct(null); }} />}
      {selectedPolicy && <PolicyModal policy={selectedPolicy} onClose={() => setSelectedPolicy(null)} />}
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
