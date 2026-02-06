
import React, { useState } from 'react';
import { Product, StockStatus } from '../types';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'notes' | 'shipping'>('details');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl animate-modalUp">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 z-20 hover:rotate-90 transition-transform bg-white/80 p-2 rounded-full shadow-lg"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Image Gallery */}
          <div className="lg:w-1/2 bg-gray-50 flex items-center justify-center p-12">
            <img 
              src={product.images[0]} 
              className="w-full aspect-[4/5] object-cover shadow-2xl rounded-lg"
              alt={product.name}
            />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
            <div className="mb-10">
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em] block mb-2">{product.brand}</span>
              <h2 className="text-4xl md:text-5xl serif mb-4">{product.name}</h2>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold">${product.discountPrice || product.price}</span>
                {product.discountPrice && (
                  <span className="text-lg text-gray-400 line-through">${product.price}</span>
                )}
                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 border rounded-full ${
                  product.stockStatus === StockStatus.OUT_OF_STOCK ? 'border-red-200 text-red-500 bg-red-50' : 'border-green-200 text-green-600 bg-green-50'
                }`}>
                  {product.stockStatus}
                </span>
              </div>
            </div>

            <div className="flex border-b mb-8">
              {['details', 'notes', 'shipping'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-6 py-4 text-[10px] uppercase font-bold tracking-[0.2em] transition-all relative ${
                    activeTab === tab ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#D4AF37]" />}
                </button>
              ))}
            </div>

            <div className="mb-12 min-h-[150px]">
              {activeTab === 'details' && (
                <p className="text-gray-600 leading-relaxed text-sm tracking-wide animate-fadeIn">{product.description}</p>
              )}
              {activeTab === 'notes' && (
                <div className="grid grid-cols-3 gap-4 animate-fadeIn">
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-[#D4AF37]">Top Notes</h5>
                    <ul className="text-xs space-y-1 opacity-80">{product.notes.top.map(n => <li key={n}>{n}</li>)}</ul>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-[#D4AF37]">Middle Notes</h5>
                    <ul className="text-xs space-y-1 opacity-80">{product.notes.middle.map(n => <li key={n}>{n}</li>)}</ul>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-[#D4AF37]">Base Notes</h5>
                    <ul className="text-xs space-y-1 opacity-80">{product.notes.base.map(n => <li key={n}>{n}</li>)}</ul>
                  </div>
                </div>
              )}
              {activeTab === 'shipping' && (
                <p className="text-gray-600 leading-relaxed text-sm tracking-wide animate-fadeIn">
                  Ships globally with tracked courier. Delivered in luxury sustainable packaging within 3-7 business days across Pakistan.
                </p>
              )}
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex items-center border border-gray-200 rounded-full px-4 py-2">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="hover:text-[#D4AF37]"><Minus size={14}/></button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="hover:text-[#D4AF37]"><Plus size={14}/></button>
              </div>
              <button 
                onClick={() => onAddToCart(product)}
                disabled={product.stockStatus === StockStatus.OUT_OF_STOCK}
                className="flex-grow bg-black text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-[#D4AF37] transition-all disabled:opacity-50"
              >
                <ShoppingBag size={18} /> Add To Cart
              </button>
            </div>
            
            <div className="mt-8 flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              <ArrowRight size={12} className="text-[#D4AF37]" />
              Authenticity Guaranteed • Secure Checkout • Free Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
