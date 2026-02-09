
import React from 'react';
import { SiteSettings, PolicyPage } from '../types';
import { Instagram, Send, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  settings: SiteSettings;
  policies: PolicyPage[];
  onPolicyClick: (policy: PolicyPage) => void;
  onNavigate: (page: string) => void;
}

const PinterestIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 22c.666-3.333 2.333-10 2.333-10S8.667 9.333 8.667 7c0-3.333 2.666-5 4.666-5s6 2.333 6 6.333c0 4-3.333 7.334-6.666 7.334a3.333 3.333 0 0 1-3.334-3.334c0-2 1.334-4.666 4-4.666" />
    <circle cx="12" cy="12" r="10" stroke="none" />
    <path d="M12.3 7.3c-.7 0-1.2.6-1.2 1.4 0 .9.8 2.6.8 2.6s-.5.2-.8.2c-.9 0-1.6-.8-1.6-1.7 0-1.6 1.4-2.9 3.1-2.9 1.8 0 3.3 1.3 3.3 3.2 0 2.2-1.5 4.2-3.7 4.2-.8 0-1.6-.4-1.9-1.1L9.6 16c-.3.9-.9 1.8-1.1 2.1 1.1.3 2.3.5 3.5.5 5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12c0 2.4 1.1 4.6 2.8 6.1.1-.3.3-1.1.4-1.7l.6-3.6" fill="currentColor" stroke="none"/>
  </svg>
);

const TikTokIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-12.7 8.38 8.38 0 0 1 3.8.9L21 3z" />
    <path d="M15.4 12.1a.5.5 0 0 0-.7 0l-.8.8a1.2 1.2 0 0 1-1.4 0l-1.6-1.6a1.2 1.2 0 0 1 0-1.4l.8-.8a.5.5 0 0 0 0-.7l-2-2a.5.5 0 0 0-.7 0l-.7.7a2.6 2.6 0 0 0 0 3.7l3.7 3.7a2.6 2.6 0 0 0 3.7 0l.7-.7a.5.5 0 0 0 0-.7z" />
  </svg>
);

const Footer: React.FC<FooterProps> = ({ settings, policies, onPolicyClick, onNavigate }) => {
  return (
    <footer className="bg-[#050505] text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold tracking-[0.25em] uppercase serif text-white leading-none">
                MONTCL<span className="text-[#D4AF37]">△</span>IRÉ
              </h2>
              <span className="text-[8px] uppercase tracking-[0.4em] text-gray-500 mt-1 font-bold">Montclaire Luxury</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed max-w-xs font-light tracking-wider">
              An exquisite destination for the world's most luxurious scents. Crafting sensory experiences that linger long after the moment passes.
            </p>
            <div className="flex space-x-5 items-center pt-2">

  {settings.social?.instagram && (
    <a
      href={settings.social.instagram}
      className="text-gray-500 hover:text-[#D4AF37] transition-all"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Instagram size={18} />
    </a>
  )}

  {settings.social?.pinterest && (
    <a
      href={settings.social.pinterest}
      className="text-gray-500 hover:text-[#D4AF37] transition-all"
      target="_blank"
      rel="noopener noreferrer"
    >
      <PinterestIcon size={18} />
    </a>
  )}

  {settings.social?.whatsapp && (
    <a
      href={settings.social.whatsapp}
      className="text-gray-500 hover:text-[#D4AF37] transition-all"
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon size={18} />
    </a>
  )}

  {settings.social?.tiktok && (
    <a
      href={settings.social.tiktok}
      className="text-gray-500 hover:text-[#D4AF37] transition-all"
      target="_blank"
      rel="noopener noreferrer"
    >
      <TikTokIcon size={18} />
    </a>
  )}

</div>
          {/* Nav Col 1 */}
          <div className="md:col-span-2">
            <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] mb-8 text-[#D4AF37]">The Boutique</h4>
            <ul className="space-y-3 text-gray-500 font-medium">
              <li><button onClick={() => onNavigate('men')} className="hover:text-white transition-colors tracking-widest uppercase text-[9px]">Men's Collection</button></li>
              <li><button onClick={() => onNavigate('women')} className="hover:text-white transition-colors tracking-widest uppercase text-[9px]">Women's Collection</button></li>
              <li><button onClick={() => onNavigate('unisex')} className="hover:text-white transition-colors tracking-widest uppercase text-[9px]">Niche & Rare</button></li>
              <li><button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors tracking-widest uppercase text-[9px]">New Arrivals</button></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="md:col-span-3">
            <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] mb-8 text-[#D4AF37]">Information</h4>
            <ul className="space-y-3 text-gray-500 font-medium">
              {policies.filter(p => p.enabled).map(policy => (
                <li key={policy.id}>
                  <button 
                    onClick={() => onPolicyClick(policy)}
                    className="hover:text-white transition-colors tracking-widest uppercase text-[9px] text-left"
                  >
                    {policy.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="md:col-span-3">
            <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] mb-8 text-[#D4AF37]">Stay Connected</h4>
            <p className="text-[11px] text-gray-600 mb-6 font-light tracking-wide">Join our inner circle for exclusive early access and fragrance insights.</p>
            <form className="relative" onSubmit={(e) => { e.preventDefault(); alert(settings.newsletter.successMessage); }}>
              <div className="border-b border-gray-800 flex items-center group transition-all focus-within:border-[#D4AF37]">
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full bg-transparent py-3 text-[11px] text-white placeholder:text-gray-700 outline-none font-light"
                  required
                />
                <button type="submit" className="text-gray-600 hover:text-[#D4AF37] transition-all">
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-[9px] text-gray-600 uppercase font-bold tracking-[0.25em] text-center md:text-left">
          <div className="flex items-center gap-2.5 justify-center md:justify-start">
            <Mail size={12} className="text-[#D4AF37]" /> {settings.contact.email}
          </div>
          <div className="flex items-center gap-2.5 justify-center">
            <MapPin size={12} className="text-[#D4AF37]" /> {settings.contact.address}
          </div>
          <div className="flex items-center justify-center md:justify-end">
             &copy; 2026 MONTCL<span className="text-[#D4AF37] mx-px">△</span>IRÉ. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
