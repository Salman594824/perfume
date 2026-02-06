
import React, { useState } from 'react';
import { getFragranceRecommendation } from '../services/geminiService';
import { Sparkles, Send, Loader2, Quote } from 'lucide-react';

const AIAssistant = () => {
  const [input, setInput] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    const result = await getFragranceRecommendation(input);
    setRecommendation(result || 'Our specialists recommend exploring our Oriental Collection for your unique profile.');
    setLoading(false);
  };

  return (
    <section className="py-32 px-4 bg-[#0B4635] text-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 border border-white/30 px-5 py-2 rounded-full mb-10 bg-white/5 backdrop-blur-sm">
            <Sparkles size={16} className="text-[#D4AF37]" />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white">AI Scent Sommelier</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl serif mb-8 tracking-wide">Find Your Signature Essence</h2>
          
          <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto leading-relaxed font-light mb-16">
            Describe a mood, a memory, or an occasion. Our artificial intelligence will curate the perfect fragrance profile for you.
          </p>
        </div>

        <form onSubmit={handleConsultation} className="relative max-w-3xl mx-auto mb-20 group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., I'm looking for something smoky for a rainy evening in Paris..."
            className="w-full bg-[#1A4F40] border border-[#D4AF37]/60 rounded-full px-10 py-6 pr-20 outline-none focus:border-[#D4AF37] text-white placeholder:text-white/40 text-lg transition-all shadow-2xl"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#D4AF37] text-white p-4 rounded-full hover:bg-[#E5C257] hover:scale-105 transition-all shadow-lg flex items-center justify-center disabled:opacity-50"
          >
            {loading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} className="translate-x-[1px] -translate-y-[1px]" />}
          </button>
        </form>

        {recommendation && (
          <div className="animate-fadeIn bg-white/10 backdrop-blur-xl p-12 rounded-[2.5rem] border border-white/20 relative shadow-inner">
            <Quote className="text-[#D4AF37] absolute -top-5 left-12" size={40} />
            <div className="text-xl md:text-2xl italic serif leading-relaxed tracking-wide text-center px-4">
              {recommendation}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIAssistant;
