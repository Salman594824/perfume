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
  Download,
  Database,
  RefreshCw,
  Code,
  Copy,
  Check
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
  onUpdateOrders,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'settings' | 'policies'>('dashboard');
  const [isEditingProduct, setIsEditingProduct] = useState<Product | null>(null);
  const [showCodeGen, setShowCodeGen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importFileRef = useRef<HTMLInputElement>(null);

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
    if (confirm("Are you sure you want to remove this fragrance from the vault?")) {
      onUpdateProducts(prev => prev.filter(p => String(p.id) !== String(id)));
    }
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
    
    // CORRECTED LOGIC: Use the field NAMES ('instagram', 'pinterest', etc)
    // instead of hardcoding the URLs inside the get() function.
    const newSettings: SiteSettings = {
      ...settings,
      contact: {
        email: formData.get('email') as string || settings.contact.email,
        address: formData.get('address') as string || settings.contact.address,
        phone: settings.contact.phone,
      },
      social: {
        instagram: formData.get('instagram') as string || settings.social.instagram,
        pinterest: formData.get('pinterest') as string || settings.social.pinterest,
        whatsapp: formData.get('whatsapp') as string || settings.social.whatsapp,
        tiktok: formData.get('tiktok') as string || settings.social.tiktok,
      }
    };
    onUpdateSettings(newSettings);
    alert("Global Settings Updated Successfully.");
  };

  const handleExportVault = () => {
    const vaultData = { products, settings, policies, orders, timestamp: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(vaultData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `montclaire_vault_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportVault = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.products) onUpdateProducts(data.products);
        if (data.settings) onUpdateSettings(data.settings);
        if (data.policies) onUpdatePolicies(data.policies);
        alert("Vault Restored Successfully.");
      } catch (err) { alert("Invalid manifest file."); }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const generateConstantsCode = () => {
    const code = `import { Product, StockStatus, SiteSettings, PolicyPage } from './types';

export const INITIAL_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};

export const INITIAL_SETTINGS: SiteSettings = ${JSON.stringify(settings, null, 2)};

export const INITIAL_POLICIES: PolicyPage[] = ${JSON.stringify(policies, null, 2)};`;
    return code;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateConstantsCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] pt-24 pb-12 font-sans text-[#1A1A1A]">
      <div className="max-w-[1440px] mx-auto px-6 lg:flex gap-10">
        
        <div className="lg:w-72 mb-8 lg:mb-0 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-3">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37] mb-8 px-2">Management Console</h2>
          <button onClick={() => setActiveTab('dashboard')} className={`flex items-center space-x-4 w-full px-5 py-4 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-[#041A13] text-white shadow-lg' : 'text-[#6B7280] hover:bg-gray-50'}`}>
            <LayoutDashboard size={20} /> <span className="text-[13px] font-semibold">Dashboard</span>
          </button>
          <button onClick={() => setActiveTab('products')} className={`flex items-center space-x-4 w-full px-5 py-4 rounded-xl transition-all ${activeTab === 'products' ? 'bg-[#041A13] text-white shadow-lg' : 'text-[#6B7280] hover:bg-gray-50'}`}>
            <Package size={20} /> <span className="text-[13px] font-semibold">Catalog</span>
          </button>
          <button onClick={() => setActiveTab('policies')} className={`flex items-center space-x-4 w-full px-5 py-4 rounded-xl transition-all ${activeTab === 'policies' ? 'bg-[#041A13] text-white shadow-lg' : 'text-[#6B7280] hover:bg-gray-50'}`}>
            <FileText size={20} /> <span className="text-[13px] font-semibold">Legal Pages</span>
          </button>
          <button onClick={() => setActiveTab('settings')} className={`flex items-center space-x-4 w-full px-5 py-4 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-[#041A13] text-white shadow-lg' : 'text-[#6B7280] hover:bg-gray-50'}`}>
            <Settings size={20} /> <span className="text-[13px] font-semibold">Storefront</span>
          </button>
        </div>

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
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1">Live Status</p>
                  <p className="text-4xl font-bold text-[#1A1A1A] serif">Active</p>
                </div>
              </div>
              
              <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-10 rounded-[2rem]">
                 <div className="flex items-center gap-4 mb-4">
                    <Database className="text-[#D4AF37]" size={24} />
                    <h3 className="text-xl serif text-[#041A13]">Project Permanent Save Guide</h3>
                 </div>
                 <p className="text-sm text-[#041A13]/80 leading-relaxed mb-6">
                   To save changes permanently for all users (on GitHub), follow these steps:
                 </p>
                 <ol className="text-xs text-[#041A13]/70 space-y-2 list-decimal ml-4 font-medium uppercase tracking-wider">
                    <li>Edit everything as you want in this Admin Panel.</li>
                    <li>Go to the <strong>"Storefront Settings"</strong> tab.</li>
                    <li>Click <strong>"Generate Source Code"</strong>.</li>
                    <li>Copy that code and replace the entire content of your <strong>constants.ts</strong> file on GitHub.</li>
                 </ol>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fadeIn">
              <div className="px-10 py-8 border-b flex justify-between items-center">
                <h3 className="text-2xl serif">Product Catalog</h3>
                <div className="flex gap-4">
                  <button onClick={onSave} className="bg-black text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-all flex items-center gap-2">
                    <Save size={16} /> Save Changes
                  </button>
                  <button onClick={handleAddNewProduct} className="bg-[#D4AF37] text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all">
                    + Add New Fragrance
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#F9FAFB] text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF] font-bold border-b">
                    <tr>
                      <th className="px-10 py-6">Information</th>
                      <th className="px-10 py-6">Price ($)</th>
                      <th className="px-10 py-6">Stock</th>
                      <th className="px-10 py-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50/50">
                        <td className="px-10 py-8 flex items-center gap-6">
                          <img src={p.images[0]} className="w-16 h-16 object-cover rounded-xl shadow-sm border border-gray-100" alt={p.name} />
                          <div><h4 className="font-bold">{p.name}</h4><p className="text-[10px] font-bold uppercase text-[#D4AF37]">{p.brand}</p></div>
                        </td>
                        <td className="px-10 py-8"><input type="number" value={p.price} onChange={(e) => handlePriceChange(p.id, e.target.value)} className="w-20 bg-gray-50 border-b border-gray-200 px-2 py-1 outline-none text-sm font-bold" /></td>
                        <td className="px-10 py-8">
                          <select value={p.stockStatus} onChange={(e) => handleStockChange(p.id, e.target.value as StockStatus)} className={`text-[10px] font-bold uppercase tracking-widest rounded-full px-4 py-2 border ${p.stockStatus === StockStatus.IN_STOCK ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                            {Object.values(StockStatus).map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className="px-10 py-8 text-center"><button onClick={() => setIsEditingProduct({...p})} className="text-gray-400 hover:text-black mr-4"><Edit3 size={18} /></button><button onClick={() => handleDeleteProduct(p.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={18} /></button></td>
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
                  <h3 className="text-2xl serif mb-1">{p.title}</h3>
                  <textarea value={p.content} onChange={(e) => handlePolicyUpdate(p.id, e.target.value)} className="w-full bg-[#F9FAFB] border border-gray-100 rounded-2xl p-6 min-h-[160px] text-sm outline-none focus:ring-1 focus:ring-[#D4AF37] mt-4" />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12">
                <h3 className="text-2xl serif mb-12">Global Site Settings</h3>
                <form onSubmit={handleGlobalSettingsUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Contact</h4>
                    <input name="email" defaultValue={settings.contact.email} placeholder="Support Email" className="w-full bg-[#F9FAFB] px-6 py-4 rounded-xl outline-none border border-gray-50 focus:ring-1 focus:ring-[#D4AF37] text-sm" />
                    <textarea name="address" defaultValue={settings.contact.address} placeholder="Address" className="w-full bg-[#F9FAFB] px-6 py-4 rounded-xl outline-none border border-gray-50 focus:ring-1 focus:ring-[#D4AF37] text-sm h-32" />
                  </div>
                  <div className="space-y-8">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Social Links</h4>
                    {['instagram', 'pinterest', 'whatsapp', 'tiktok'].map(s => (
                      <input key={s} name={s} defaultValue={(settings.social as any)[s]} placeholder={`${s} URL`} className="w-full bg-[#F9FAFB] px-6 py-4 rounded-xl outline-none border border-gray-50 focus:ring-1 focus:ring-[#D4AF37] text-sm" />
                    ))}
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button type="submit" className="bg-black text-white px-12 py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-all flex items-center gap-3">
                      <Save size={18} /> Update Locally
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-[#041A13] rounded-2xl shadow-xl p-12 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="flex items-center gap-4 mb-6">
                  <RefreshCw className="text-[#D4AF37]" size={28} />
                  <h3 className="text-2xl serif">Permanent Sync Tool</h3>
                </div>
                <p className="text-sm opacity-70 leading-relaxed max-w-2xl mb-10">
                  To save your changes permanently to GitHub, click below to generate the code for <strong>constants.ts</strong>.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setShowCodeGen(true)} className="bg-[#D4AF37] text-white px-10 py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-3">
                    <Code size={18} /> Generate Source Code
                  </button>
                  <button onClick={handleExportVault} className="bg-white/10 border border-white/20 text-white px-10 py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-3">
                    <Download size={18} /> Backup JSON
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showCodeGen && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowCodeGen(false)} />
          <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] p-12 shadow-2xl animate-fadeIn max-h-[90vh] flex flex-col">
            <button onClick={() => setShowCodeGen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black"><X size={24} /></button>
            <h3 className="text-3xl serif mb-4">Source Code for constants.ts</h3>
            <p className="text-sm text-gray-500 mb-8">Copy this code and replace the content of <strong>constants.ts</strong> on GitHub.</p>
            
            <div className="flex-1 bg-gray-900 rounded-2xl p-6 overflow-y-auto mb-8 font-mono text-[11px] text-green-400 relative group">
               <button 
                  onClick={copyToClipboard}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
               >
                 {copied ? <Check size={14} /> : <Copy size={14} />}
                 {copied ? "Copied!" : "Copy Code"}
               </button>
               <pre className="whitespace-pre-wrap">{generateConstantsCode()}</pre>
            </div>
            <button onClick={() => setShowCodeGen(false)} className="bg-black text-white py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-all">Close</button>
          </div>
        </div>
      )}

      {isEditingProduct && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsEditingProduct(null)} />
          <div className="relative bg-white w-full max-w-2xl rounded-3xl p-10 shadow-2xl animate-fadeIn max-h-[90vh] flex flex-col">
            <button onClick={() => setIsEditingProduct(null)} className="absolute top-8 right-8 text-gray-400 hover:text-black z-10"><X size={24} /></button>
            <h3 className="text-3xl serif mb-8">Fragrance Details</h3>
            <div className="space-y-6 overflow-y-auto pr-2 flex-1 pb-4">
              <input value={isEditingProduct.name} onChange={e => setIsEditingProduct({...isEditingProduct, name: e.target.value})} className="w-full bg-gray-50 p-4 rounded-xl outline-none border border-transparent focus:border-[#D4AF37]" placeholder="Name" />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" value={isEditingProduct.price} onChange={e => setIsEditingProduct({...isEditingProduct, price: parseFloat(e.target.value) || 0})} className="w-full bg-gray-50 p-4 rounded-xl outline-none border" placeholder="Price" />
                <select value={isEditingProduct.category} onChange={e => setIsEditingProduct({...isEditingProduct, category: e.target.value})} className="w-full bg-gray-50 p-4 rounded-xl outline-none border">
                  <option value="Men">Men</option><option value="Women">Women</option><option value="Unisex">Unisex</option>
                </select>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                   <img src={isEditingProduct.images[0]} className="w-24 h-24 object-cover rounded-2xl border" alt="Preview" />
                   <div className="flex-grow space-y-2">
                      <input value={isEditingProduct.images[0]} onChange={e => setIsEditingProduct({...isEditingProduct, images: [e.target.value]})} className="w-full bg-gray-50 px-4 py-3 rounded-xl border text-xs" placeholder="URL" />
                      <button onClick={() => fileInputRef.current?.click()} className="bg-black text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Upload size={14} /> Upload Image</button>
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                   </div>
                </div>
              </div>
              <textarea value={isEditingProduct.description} onChange={e => setIsEditingProduct({...isEditingProduct, description: e.target.value})} className="w-full bg-gray-50 p-4 rounded-xl outline-none h-32 border" placeholder="Description..." />
            </div>
            <button onClick={handleSaveProduct} className="w-full bg-[#041A13] text-white py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-all mt-4">Save Locally</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
