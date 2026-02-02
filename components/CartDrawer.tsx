
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, q: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-stone-50 shadow-2xl flex flex-col animate-slide-in">
        <div className="p-8 border-b border-stone-200 flex justify-between items-center">
          <h2 className="text-2xl font-serif">Shopping Bag</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-400">
              <p className="mb-4">Your bag is currently empty.</p>
              <button onClick={onClose} className="text-amber-800 font-medium hover:underline">Continue Exploring</button>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-24 h-24 bg-stone-200 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg">{item.name}</h3>
                    <p className="text-xs text-stone-500 mb-2">{item.brand}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-stone-200">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-stone-100 disabled:opacity-20"
                          disabled={item.quantity <= 1}
                        >-</button>
                        <span className="px-3 text-xs">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-stone-100"
                        >+</button>
                      </div>
                      <span className="font-medium text-sm">${item.price * item.quantity}</span>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-[10px] text-stone-400 hover:text-red-600 mt-2 uppercase tracking-widest"
                    >Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 bg-white border-t border-stone-200">
            <div className="flex justify-between items-center mb-6">
              <span className="text-stone-500 uppercase tracking-widest text-xs">Subtotal</span>
              <span className="text-2xl font-serif">${total}</span>
            </div>
            <button className="w-full bg-stone-900 text-white py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-stone-800 transition-all">
              Checkout
            </button>
            <p className="text-center text-[10px] text-stone-400 mt-4 uppercase tracking-widest">
              Complimentary shipping on all orders
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
