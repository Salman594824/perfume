
import React from 'react';
import { PolicyPage } from '../types';
import { X, ShieldCheck } from 'lucide-react';

interface PolicyModalProps {
  policy: PolicyPage;
  onClose: () => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ policy, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-xl shadow-2xl animate-fadeIn p-8 md:p-12">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 hover:rotate-90 transition-transform bg-gray-50 p-2 rounded-full"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="text-[#D4AF37]" size={24} />
          <div>
            <h2 className="text-3xl serif">{policy.title}</h2>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Last Updated: {policy.lastUpdated}</p>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-4 whitespace-pre-wrap font-light tracking-wide">
          {policy.content}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
            <button 
                onClick={onClose}
                className="bg-black text-white px-10 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-all"
            >
                Return to Boutique
            </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
