
import React, { useState } from 'react';
import { getScentConsultation } from '../services/geminiService';
import { ScentRecommendation } from '../types';

export const ScentConsultant: React.FC = () => {
  const [input, setInput] = useState('');
  const [recommendation, setRecommendation] = useState<ScentRecommendation | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const result = await getScentConsultation(input);
      setRecommendation(result);
    } catch (error) {
      console.error("Consultation failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="consultant" className="py-24 bg-stone-900 text-stone-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-amber-400 text-xs font-medium uppercase tracking-[0.3em] block mb-4">Personalized Experience</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">AI Scent Consultant</h2>
          <p className="text-stone-400 leading-relaxed max-w-2xl mx-auto">
            Our neural-powered perfumer analyzes your memories, moods, and preferences to define your unique olfactory signature.
          </p>
        </div>

        {!recommendation ? (
          <form onSubmit={handleConsult} className="space-y-6">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell us about the scents you love, the memories they evoke, or the mood you want to project..."
              className="w-full bg-stone-800 border border-stone-700 p-6 rounded-none focus:outline-none focus:border-amber-400 text-lg min-h-[150px] transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-full bg-amber-500 hover:bg-amber-600 text-stone-900 py-4 uppercase tracking-[0.2em] font-bold text-sm transition-all disabled:opacity-50"
            >
              {loading ? 'Consulting the Oracle...' : 'Discover Your Signature'}
            </button>
          </form>
        ) : (
          <div className="bg-stone-800/50 p-8 md:p-12 border border-stone-700/50">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-amber-400 font-serif text-3xl mb-2">{recommendation.scentProfile}</h3>
                <div className="flex gap-2 mb-6">
                  {recommendation.suggestedNotes.map(note => (
                    <span key={note} className="text-[10px] uppercase tracking-widest bg-amber-500/10 text-amber-500 px-2 py-1 border border-amber-500/20">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => setRecommendation(null)}
                className="text-stone-500 hover:text-stone-300 transition-colors"
              >
                Reset
              </button>
            </div>
            <p className="text-stone-300 font-light leading-relaxed italic text-lg mb-8">
              "{recommendation.explanation}"
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-amber-500 text-stone-900 py-4 font-bold uppercase tracking-widest text-xs hover:bg-amber-600 transition-all">
                View Similar Products
              </button>
              <button className="border border-stone-600 text-stone-100 py-4 font-bold uppercase tracking-widest text-xs hover:bg-stone-700 transition-all">
                Book a Private Fitting
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
