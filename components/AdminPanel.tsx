
import React, { useState, useRef } from 'react';
import { Product, SiteSettings, PolicyPage, StockStatus, Order, OrderStatus } from '../types';
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  FileText, 
  Edit3, 
  Trash2, 
  Plus, 
  Globe, 
  ShieldCheck, 
  Save, 
  X, 
  Upload,
  Link as LinkIcon
} from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  settings: SiteSettings;
  policies: PolicyPage[];
  orders: Order[];
  onUpdateProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onUpdateSettings: (settings: SiteSettings) => void;
  onUpdatePolicies: (policies: PolicyPage[]) => void;
  onUpdateOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  onSave?: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  products, 
  settings, 
  policies, 
  orders,
  onUpdateProducts, 
  onUpdateSettings, 
  onUpdatePolicies,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'settings' | 'policies'>('dashboard');
  const [isEditingProduct, setIsEditingProduct] = useState<Product | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePriceChange = (id: string, newPrice: string) => {
    const val = parseFloat(newPrice);
    if (!isNaN(val)) {
      onUpdateProducts(prev => prev.map(p => String(p.id) === String(id) ? { ...p, price: val } : p));
    }
  };

  const handleStockChange = (id: string, status: StockStatus) => {
    onUpdateProducts(prev => prev.map(p => String(p.id) === String(id) ? { ...p, stockStatus: status } : p));
  };

  const handleDeleteProduct = (id: string) => {
    // Immediate removal logic
    onUpdateProducts(prev => prev.filter(p => String(p.id) !== String(id)));
  };

  const handleAddNewProduct = () => {
    const newId = Date.now().toString();
    const template: Product = {
      id: newId,
      name: 'New Fragrance',
      brand: 'MONTCL△IRÉ',
      price: 0,
      category: 'Unisex',
      stockStatus: StockStatus.IN_STOCK,
      images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800'],
      notes: { top: [], middle: [], base: [] },
      description: '',
      reviews: [],
      featured: false,
      seo: { 
        title: '', 
        description: '', 
        slug: `new-fragrance-${newId}` 
      }
    };
    setIsEditingProduct(template);
  };

  const handleSaveProduct = () => {
    if (!isEditingProduct) return;
    
    onUpdateProducts(prev => {
      const exists = prev.find(p => String(p.id) === String(isEditingProduct.id));
      if (exists) {
        return prev.map(p => String(p.id) === String(isEditingProduct.id) ? isEditingProduct : p);
      } else {
        return [...prev, isEditingProduct];
      }
    });
    setIsEditingProduct(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isEditingProduct) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setIsEditingProduct({
          ...isEditingProduct,
          images: [base64String]
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePolicyUpdate = (id: string, newContent: string) => {
    onUpdatePolicies(policies.map(p => p.id === id ? { ...p, content: newContent, lastUpdated: new Date().toISOString().split('T')[0] } : p));
  };

  const handleGlobalSettingsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newSettings: SiteSettings = {
      ...settings,
      contact: {
        email: formData.get('email') as string,
        address: formData.get('address') as string,
        phone: settings.contact.phone,
      },
      social: {
        instagram: formData.get('instagram') as string,
        pinterest: formData.get('pinterest') as string,
        whatsapp: formData.get('whatsapp') as string,
        tiktok: formData.get('tiktok') as string,
      }
    };
    onUpdateSettings(newSettings);
    alert("Global Settings Deployed Successfully.");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] pt-24 pb-12 font-sans text-[#1A1A1A]">
      <div className="max-w-[1440px] mx-auto px-6 lg:flex gap-10">
        
        {/* SIDEBAR NAVIGATION */}
        <div className="lg:w-72 mb-8 lg:mb-0 bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 h-fit space-y-3">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37] mb-8 px-2">Management Console</h2>
          
          <button onClick={() => setActiveTab('dashboard')} className={`flex items-center space-x-4 w-full px-5 py-4 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-[#041A13] text-white shadow-lg' : 'text-[#6B7280] hover:bg-gray-50'}`}>
            <LayoutDashboard size={20} />
            <span className="text-[13px] font-semibold tracking-wide">Dashboard</span>
          </button>

          <button onClick={() => setActiveTab('products')} className={`flex items-center space-x-4 w-full px-5 py-4 rounded-xl transition-all ${activeTab === 'products' ? 'bg-[#041A13] text-white shadow-lg' : 'text-[#6B7280] hover:bg-gray-50'}`}>
            <Package size={20} />
            <span className="text-[13px] font-semibold tracking-wide">Catalog</span>
          </button>

          <button onClick={() => setActiveTab('policies')} className={`flex items-center space-x-4 w-full px-5 py-4 rounded-xl transition-all ${activeTab === 'policies' ? 'bg-[#041A13] text-white shadow-lg' : 'text-[#6B7280] hover:bg-gray-50'}`}>
            <FileText size={20} />
            <span className="text-[13px] font-semibold tracking-wide">Legal Pages</span>
          </button>

          <button onClick={() => setActiveTab('settings')} className={`flex items-center space-x-4 w-full px-5 py-4 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-[#041A13] text-white shadow-lg' : 'text-[#6B7280] hover:bg-gray-50'}`}>
            <Settings size={20} />
            <span className="text-[13px] font-semibold tracking-wide">Storefront</span>
          </button>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1">
          {activeTab === 'dashboard' && (
            <div className="animate-fadeIn space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                  <Package className="text-[#D4AF37] mb-4" size={24} />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1">Total SKUs</p>
                  <p className="text-4xl font-bold text-[#1A1A1A] serif">{products.length}</p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                  <ShieldCheck className="text-green-600 mb-4" size={24} />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1">Active Policies</p>
                  <p className="text-4xl font-bold text-[#1A1A1A] serif">{policies.length}</p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                  <Globe className="text-blue-600 mb-4" size={24} />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1">Live SEO</p>
                  <p className="text-4xl font-bold text-[#1A1A1A] serif">Ready</p>
                </div>
              </div>
              <div className="bg-[#041A13] p-12 rounded-[2rem] text-white">
                <h3 className="text-3xl serif mb-4">Welcome Back, Admin</h3>
                <p className="text-sm opacity-70 leading-relaxed font-light tracking-wide max-w-xl">
                  Manage your luxury fragrance boutique from one central location. All changes are reflected instantly on the storefront.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fadeIn">
              <div className="px-10 py-8 border-b flex justify-between items-center">
                <h3 className="text-2xl serif">Product Catalog</h3>
                <div className="flex gap-4">
                  <button 
                    onClick={onSave}
                    className="bg-black text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-all flex items-center gap-2"
                  >
                    <Save size={16} /> Save Changes
                  </button>
                  <button 
                    onClick={handleAddNewProduct}
                    className="bg-[#D4AF37] text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all"
                  >
                    + Add New Fragrance
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#F9FAFB] text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF] font-bold border-b">
                    <tr>
                      <th className="px-10 py-6">Product Information</th>
                      <th className="px-10 py-6">Price ($)</th>
                      <th className="px-10 py-6">Inventory</th>
                      <th className="px-10 py-6 text-center">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50/50">
                        <td className="px-10 py-8 flex items-center gap-6">
                          <img src={p.images[0]} className="w-16 h-16 object-cover rounded-xl shadow-sm border border-gray-100" alt={p.name} />
                          <div>
                            <h4 className="font-bold text-[#1A1A1A]">{p.name}</h4>
                            <p className="text-[10px] font-bold uppercase text-[#D4AF37]">{p.brand}</p>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <input 
                            type="number" 
                            value={p.price} 
                            onChange={(e) => handlePriceChange(p.id, e.target.value)}
                            className="w-20 bg-gray-50 border-b border-gray-200 px-2 py-1 outline-none text-sm font-bold"
                          />
                        </td>
                        <td className="px-10 py-8">
                          <select 
                            value={p.stockStatus}
                            onChange={(e) => handleStockChange(p.id, e.target.value as StockStatus)}
                            className={`text-[10px] font-bold uppercase tracking-widest rounded-full px-4 py-2 outline-none border cursor-pointer ${
                              p.stockStatus === StockStatus.IN_STOCK ? 'text-green-600 bg-green-50 border-green-100' :
                              p.stockStatus === StockStatus.LIMITED_STOCK ? 'text-orange-600 bg-orange-50 border-orange-100' :
                              'text-red-600 bg-red-50 border-red-100'
                            }`}
                          >
                            {Object.values(StockStatus).map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex justify-center gap-4 text-[#9CA3AF]">
                            <button onClick={() => setIsEditingProduct({...p})} className="hover:text-black transition-colors"><Edit3 size={18} /></button>
                            <button onClick={() => handleDeleteProduct(p.id)} className="hover:text-red-500 transition-colors p-2"><Trash2 size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="space-y-6 animate-fadeIn">
              {policies.map(p => (
                <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-2xl serif text-[#1A1A1A] mb-1">{p.title}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">Last Updated: {p.lastUpdated}</p>
                    </div>
                    <span className="bg-green-50 text-green-600 px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">Published</span>
                  </div>
                  <textarea 
                    value={p.content}
                    onChange={(e) => handlePolicyUpdate(p.id, e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-gray-100 rounded-2xl p-6 min-h-[160px] text-sm text-[#4B5563] outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                  <div className="mt-8">
                    <button className="bg-[#D4AF37] text-white px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2">
                      <Save size={16} /> Update Content
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 animate-fadeIn">
              <h3 className="text-2xl serif text-[#1A1A1A] mb-12">Global Site Settings</h3>
              <form onSubmit={handleGlobalSettingsUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Contact Information</h4>
                  <div className="space-y-4">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] block">Support Email</label>
                    <input name="email" defaultValue={settings.contact.email} className="w-full bg-[#F9FAFB] px-6 py-4 rounded-xl outline-none border border-gray-50 focus:ring-1 focus:ring-[#D4AF37] text-sm" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] block">Headquarters Address</label>
                    <textarea name="address" defaultValue={settings.contact.address} className="w-full bg-[#F9FAFB] px-6 py-4 rounded-xl outline-none border border-gray-50 focus:ring-1 focus:ring-[#D4AF37] text-sm h-32" />
                  </div>
                </div>
                <div className="space-y-8">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Social Profiles</h4>
                  {['instagram', 'pinterest', 'whatsapp', 'tiktok'].map(s => (
                    <div key={s} className="space-y-4">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] block capitalize">{s} URL</label>
                      <input name={s} defaultValue={(settings.social as any)[s]} className="w-full bg-[#F9FAFB] px-6 py-4 rounded-xl outline-none border border-gray-50 focus:ring-1 focus:ring-[#D4AF37] text-sm" />
                    </div>
                  ))}
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button type="submit" className="bg-black text-white px-12 py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-all flex items-center gap-3">
                    <Save size={18} /> Deploy Global Settings
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {isEditingProduct && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsEditingProduct(null)} />
          <div className="relative bg-white w-full max-w-2xl rounded-3xl p-10 shadow-2xl animate-fadeIn max-h-[90vh] flex flex-col">
            <button onClick={() => setIsEditingProduct(null)} className="absolute top-8 right-8 text-gray-400 hover:text-black z-10"><X size={24} /></button>
            <h3 className="text-3xl serif mb-8">Fragrance Details</h3>
            
            <div className="space-y-6 overflow-y-auto pr-2 flex-1 pb-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Product Name</label>
                <input value={isEditingProduct.name} onChange={e => setIsEditingProduct({...isEditingProduct, name: e.target.value})} className="w-full bg-gray-50 p-4 rounded-xl outline-none border border-transparent focus:border-[#D4AF37] transition-all" placeholder="Enter name" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Price ($)</label>
                  <input type="number" value={isEditingProduct.price} onChange={e => setIsEditingProduct({...isEditingProduct, price: parseFloat(e.target.value) || 0})} className="w-full bg-gray-50 p-4 rounded-xl outline-none border border-transparent focus:border-[#D4AF37] transition-all" placeholder="Price" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Category</label>
                  <select value={isEditingProduct.category} onChange={e => setIsEditingProduct({...isEditingProduct, category: e.target.value})} className="w-full bg-gray-50 p-4 rounded-xl outline-none border border-transparent focus:border-[#D4AF37] transition-all">
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Product Visuals</label>
                <div className="flex gap-4">
                   <div className="w-24 h-24 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
                      <img src={isEditingProduct.images[0]} className="w-full h-full object-cover" alt="Preview" />
                   </div>
                   <div className="flex-grow space-y-3">
                      <div className="flex gap-2">
                        <input value={isEditingProduct.images[0]} onChange={e => setIsEditingProduct({...isEditingProduct, images: [e.target.value]})} className="flex-1 bg-gray-50 px-4 py-3 rounded-xl outline-none border border-transparent focus:border-[#D4AF37] text-xs" placeholder="Paste Image URL" />
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-[#041A13] text-white px-4 py-3 rounded-xl hover:bg-[#D4AF37] transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                        >
                          <Upload size={14} /> Choose File
                        </button>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleImageUpload} 
                          className="hidden" 
                          accept="image/*"
                        />
                      </div>
                      <p className="text-[9px] text-gray-400 italic">Portrait shots recommended (e.g. 800x1000px).</p>
                   </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Description</label>
                <textarea value={isEditingProduct.description} onChange={e => setIsEditingProduct({...isEditingProduct, description: e.target.value})} className="w-full bg-gray-50 p-4 rounded-xl outline-none h-32 resize-none border border-transparent focus:border-[#D4AF37] transition-all text-sm" placeholder="Describe the scent journey..." />
              </div>
            </div>

            <div className="pt-6 border-t mt-4">
              <button 
                onClick={handleSaveProduct}
                className="w-full bg-[#041A13] text-white py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Save size={18} /> Deploy to Vault
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
