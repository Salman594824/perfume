
import React, { useState } from 'react';
import { Product, SiteSettings, PolicyPage, StockStatus } from '../types';
import { LayoutDashboard, Package, Settings, FileText, Save, Plus, Trash2, Edit3, Globe, ShieldCheck, X, AlertCircle, CheckCircle } from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  settings: SiteSettings;
  policies: PolicyPage[];
  onUpdateProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onUpdateSettings: (settings: SiteSettings) => void;
  onUpdatePolicies: (policies: PolicyPage[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  products, 
  settings, 
  policies, 
  onUpdateProducts, 
  onUpdateSettings, 
  onUpdatePolicies 
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'settings' | 'policies'>('dashboard');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState<string | null>(null); // To show "Saved!" on buttons

  const handlePriceChange = (id: string, newPrice: string) => {
    const val = parseFloat(newPrice);
    if (!isNaN(val)) {
      onUpdateProducts(prev => prev.map(p => p.id === id ? { ...p, price: val } : p));
    }
  };

  const handleStockChange = (id: string, status: StockStatus) => {
    onUpdateProducts(prev => prev.map(p => p.id === id ? { ...p, stockStatus: status } : p));
  };

  const handleSettingsChange = (category: keyof SiteSettings, field: string, value: string) => {
    const updated = { ...settings };
    (updated[category] as any)[field] = value;
    onUpdateSettings(updated);
  };

  const triggerSavedFeedback = (id: string) => {
    setSavedStatus(id);
    setTimeout(() => setSavedStatus(null), 2000);
  };

  const handlePolicyContentUpdate = (id: string, content: string) => {
    const updated = policies.map(p => 
      p.id === id ? { ...p, content, lastUpdated: new Date().toISOString().split('T')[0] } : p
    );
    onUpdatePolicies(updated);
    triggerSavedFeedback(id);
  };

  const togglePolicy = (id: string) => {
    const updated = policies.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p);
    onUpdatePolicies(updated);
  };

  const openAddForm = () => {
    setEditingProduct({
      id: Date.now().toString(),
      name: '',
      brand: 'MONTCL△IRÉ',
      price: 0,
      category: 'Unisex',
      stockStatus: StockStatus.IN_STOCK,
      images: ['https://picsum.photos/seed/new/800/1000'],
      notes: { top: [], middle: [], base: [] },
      description: '',
      reviews: [],
      featured: false,
      seo: { title: '', description: '', slug: '' }
    });
    setIsFormOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const newProduct = editingProduct as Product;
    if (!newProduct.name || !newProduct.price) {
        alert("Please fill in the product name and price.");
        return;
    }

    onUpdateProducts(prev => {
        const exists = prev.find(p => p.id === newProduct.id);
        if (exists) {
            return prev.map(p => p.id === newProduct.id ? newProduct : p);
        }
        return [...prev, newProduct];
    });

    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteClick = (id: string) => {
    if (confirmDeleteId === id) {
      onUpdateProducts(prev => prev.filter(p => p.id !== id));
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
      setTimeout(() => setConfirmDeleteId(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:flex gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 mb-8 lg:mb-0 bg-white p-6 rounded-xl shadow-sm h-fit space-y-2 border border-gray-100">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-6 px-3">Management Console</h2>
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'products', icon: Package, label: 'Catalog' },
            { id: 'policies', icon: FileText, label: 'Legal Pages' },
            { id: 'settings', icon: Settings, label: 'Storefront' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-300 ${activeTab === tab.id ? 'bg-[#064E3B] text-white shadow-lg' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              <tab.icon size={18} />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <Package className="text-[#D4AF37] mb-4" size={24} />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Total SKUs</p>
                  <p className="text-4xl font-bold serif">{products.length}</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <ShieldCheck className="text-[#064E3B] mb-4" size={24} />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Active Policies</p>
                  <p className="text-4xl font-bold serif">{policies.filter(p => p.enabled).length}</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <Globe className="text-blue-600 mb-4" size={24} />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Live SEO</p>
                  <p className="text-4xl font-bold serif">Ready</p>
                </div>
              </div>
              <div className="bg-[#064E3B] text-white p-10 rounded-xl relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <h3 className="text-2xl serif mb-2">Welcome Back, Admin</h3>
                  <p className="text-sm opacity-80 max-w-md tracking-wide">Manage your luxury fragrance boutique from one central location. All changes are reflected instantly on the storefront.</p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-fadeIn">
              <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
                <h3 className="text-lg serif">Product Catalog</h3>
                <button 
                    onClick={openAddForm}
                    className="bg-[#D4AF37] hover:bg-black transition-colors text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-sm"
                >
                  <Plus size={14} /> Add New Fragrance
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-[10px] uppercase tracking-[0.2em] bg-gray-50 text-gray-400">
                    <tr>
                      <th className="p-6">Product Information</th>
                      <th className="p-6 text-center">Price ($)</th>
                      <th className="p-6 text-center">Inventory</th>
                      <th className="p-6 text-right">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-16 bg-gray-100 rounded overflow-hidden shadow-sm">
                              <img src={p.images[0]} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{p.name}</p>
                              <p className="text-[10px] uppercase tracking-widest text-gray-400">{p.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-center">
                          <input 
                            type="number" 
                            value={p.price} 
                            onChange={(e) => handlePriceChange(p.id, e.target.value)}
                            className="w-20 bg-transparent border-b border-gray-200 focus:border-[#D4AF37] outline-none text-center font-medium"
                          />
                        </td>
                        <td className="p-6 text-center">
                          <select 
                            value={p.stockStatus}
                            onChange={(e) => handleStockChange(p.id, e.target.value as StockStatus)}
                            className={`text-[10px] font-bold uppercase tracking-widest rounded-full px-3 py-1 outline-none border ${
                              p.stockStatus === StockStatus.IN_STOCK ? 'text-green-600 bg-green-50 border-green-100' :
                              p.stockStatus === StockStatus.LIMITED_STOCK ? 'text-orange-600 bg-orange-50 border-orange-100' :
                              'text-red-600 bg-red-50 border-red-100'
                            }`}
                          >
                            {Object.values(StockStatus).map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className="p-6 text-right space-x-2">
                          <button 
                            onClick={() => { setEditingProduct(p); setIsFormOpen(true); }}
                            className="text-gray-400 hover:text-black transition-colors p-2 inline-flex items-center"
                            title="Edit"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(p.id)}
                            className={`transition-all p-2 rounded-lg inline-flex items-center gap-1 ${
                              confirmDeleteId === p.id 
                                ? 'bg-red-50 text-red-600 scale-110' 
                                : 'text-gray-400 hover:text-red-600'
                            }`}
                            title={confirmDeleteId === p.id ? "Confirm Delete" : "Delete"}
                          >
                            {confirmDeleteId === p.id ? (
                              <>
                                <AlertCircle size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-tighter">Sure?</span>
                              </>
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
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
              {policies.map(policy => (
                <div key={policy.id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl serif">{policy.title}</h3>
                      <p className="text-xs text-gray-400 mt-1 italic uppercase tracking-widest">Last Updated: {policy.lastUpdated}</p>
                    </div>
                    <button 
                      onClick={() => togglePolicy(policy.id)}
                      className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                        policy.enabled ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {policy.enabled ? 'Published' : 'Draft'}
                    </button>
                  </div>
                  <textarea 
                    id={`policy-textarea-${policy.id}`}
                    className="w-full h-40 bg-gray-50 border border-gray-100 rounded-lg p-6 text-sm text-gray-600 leading-relaxed outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
                    defaultValue={policy.content}
                  />
                  <div className="mt-4 flex gap-4">
                    <button 
                      onClick={() => {
                        const textarea = document.getElementById(`policy-textarea-${policy.id}`) as HTMLTextAreaElement;
                        handlePolicyContentUpdate(policy.id, textarea.value);
                      }}
                      className={`flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                        savedStatus === policy.id ? 'bg-green-600 text-white' : 'bg-[#D4AF37] text-white hover:bg-black'
                      }`}
                    >
                      {savedStatus === policy.id ? (
                        <><CheckCircle size={14} /> Saved!</>
                      ) : (
                        <><Save size={14} /> Update Content</>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 animate-fadeIn">
              <h3 className="text-2xl serif mb-10 border-b pb-6">Global Site Settings</h3>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-4 block">Contact Information</label>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Support Email</span>
                        <input 
                          type="email" 
                          value={settings.contact.email} 
                          onChange={(e) => handleSettingsChange('contact', 'email', e.target.value)}
                          className="w-full bg-gray-50 border-b p-3 outline-none focus:border-[#D4AF37] text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Headquarters Address</span>
                        <textarea 
                          value={settings.contact.address} 
                          onChange={(e) => handleSettingsChange('contact', 'address', e.target.value)}
                          className="w-full bg-gray-50 border-b p-3 outline-none focus:border-[#D4AF37] text-sm h-24 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-4 block">Social Profiles</label>
                    <div className="space-y-4">
                      {Object.keys(settings.social).map(platform => (
                        <div key={platform} className="space-y-2">
                          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{platform} URL</span>
                          <input 
                            type="text" 
                            value={(settings.social as any)[platform]} 
                            onChange={(e) => handleSettingsChange('social', platform, e.target.value)}
                            className="w-full bg-gray-50 border-b p-3 outline-none focus:border-[#D4AF37] text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t flex justify-end">
                <button 
                  onClick={() => triggerSavedFeedback('global-settings')}
                  className={`px-12 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 transition-all ${
                    savedStatus === 'global-settings' ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-[#D4AF37]'
                  }`}
                >
                  {savedStatus === 'global-settings' ? (
                    <><CheckCircle size={16} /> Changes Deployed</>
                  ) : (
                    <><Save size={16} /> Deploy Global Settings</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Form Modal */}
      {isFormOpen && editingProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />
            <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl p-8 animate-fadeIn max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl serif">Fragrance Details</h3>
                    <button onClick={() => setIsFormOpen(false)}><X size={20}/></button>
                </div>
                <form onSubmit={handleSaveProduct} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Name</label>
                            <input 
                                required
                                value={editingProduct.name} 
                                onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                                className="w-full border-b p-2 outline-none focus:border-[#D4AF37]" 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Brand</label>
                            <input 
                                value={editingProduct.brand} 
                                onChange={e => setEditingProduct({...editingProduct, brand: e.target.value})}
                                className="w-full border-b p-2 outline-none focus:border-[#D4AF37]" 
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Price ($)</label>
                            <input 
                                type="number"
                                required
                                value={editingProduct.price} 
                                onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                                className="w-full border-b p-2 outline-none focus:border-[#D4AF37]" 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Category</label>
                            <select 
                                value={editingProduct.category} 
                                onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                                className="w-full border-b p-2 outline-none focus:border-[#D4AF37]"
                            >
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Image URL</label>
                        <input 
                            value={editingProduct.images?.[0]} 
                            onChange={e => setEditingProduct({...editingProduct, images: [e.target.value]})}
                            className="w-full border-b p-2 outline-none focus:border-[#D4AF37]" 
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Description</label>
                        <textarea 
                            value={editingProduct.description} 
                            onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                            className="w-full border p-2 rounded outline-none focus:border-[#D4AF37] h-24" 
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-[#064E3B] text-white py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all"
                    >
                        Save Fragrance
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
