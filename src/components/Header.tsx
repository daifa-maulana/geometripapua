import React, { useState } from 'react';
import { Phone, Mail, Instagram, Youtube, Menu, X, Globe, MapPin, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [isMobMenuOpen, setIsMobMenuOpen] = useState(false);

  const navItems = [
    { label: 'Beranda', id: 'home' },
    { label: 'Tentang Kami', id: 'about' },
    { label: 'Layanan', id: 'service' },
    { label: 'Katalog Produk', id: 'product' },
    { label: 'Portofolio', id: 'portfolio' },
    { label: 'Blog & Edukasi', id: 'blog' },
    { label: 'Kontak', id: 'contact' },
  ];

  const displayNavItems = currentPage === 'admin' 
    ? [...navItems, { label: 'Admin Panel', id: 'admin' }]
    : navItems;

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setIsMobMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full relative z-40">
      {/* Main Bar Sticky-Capable */}
      <div className="w-full bg-white border-b-3 border-brand-red shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Brand Guide Compliance */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => handleNavClick('home')}>
            {/* Authentic Geometri Indonesia corporate logo */}
            <svg className="w-11 h-11 flex-shrink-0 drop-shadow-sm" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer Charcoal Star */}
              <path d="M 50 2 L 64 16 L 84 16 L 84 36 L 98 50 L 84 64 L 84 84 L 64 84 L 50 98 L 36 84 L 16 84 L 16 64 L 2 50 L 16 36 L 16 16 L 36 16 Z" fill="#231F20" />
              {/* Inner White Spacer Star */}
              <path d="M 50 6 L 63 19 L 81 19 L 81 37 L 94 50 L 81 63 L 81 81 L 63 81 L 50 94 L 37 81 L 19 81 L 19 63 L 6 50 L 19 37 L 19 19 L 37 19 Z" fill="#FFFFFF" />
              {/* Red Star with turbine pattern */}
              <path d="M 50 11 L 61 22 L 77 22 L 77 38 L 88 50 L 77 62 L 77 77 L 61 77 L 50 88 L 39 77 L 23 77 L 23 62 L 12 50 L 23 38 L 23 23 L 38 23 Z" fill="#FF0013" />
              {/* White swastika carving strokes */}
              <path d="M 41.5 22.5 L 41.5 41.5 L 50 41.5" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="square" fill="none" />
              <path d="M 77.5 41.5 L 58.5 41.5 L 58.5 50" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="square" fill="none" />
              <path d="M 58.5 77.5 L 58.5 58.5 L 50 58.5" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="square" fill="none" />
              <path d="M 22.5 58.5 L 41.5 58.5 L 41.5 50" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="square" fill="none" />
            </svg>
            <div className="flex flex-col justify-center select-none">
              <span className="font-display font-black text-xl tracking-tight text-brand-black leading-tight">
                GEOMETRI
              </span>
              <span className="font-display font-extrabold text-[9px] text-brand-red tracking-[0.16em] leading-none">
                BANDUNG · JAWA BARAT
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link-List */}
          <nav className="hidden lg:flex items-center gap-1">
            {displayNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-md font-bold text-sm tracking-wide transition-all duration-150 cursor-pointer ${
                  currentPage === item.id
                    ? 'text-brand-red bg-brand-red-pale'
                    : 'text-brand-gray-1 hover:text-brand-red hover:bg-brand-gray-5'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Call To Action Direct WhatsApp */}
            <a
              href="https://wa.me/6282262865676?text=Halo%20Geometri%20Bandung,%20saya%20tertarik%20dengan%20layanan%20alat%20survey."
              target="_blank"
              rel="noreferrer"
              className="ml-4 bg-brand-red hover:bg-brand-red-hover text-white px-4 py-2.5 rounded-md font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 duration-100"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Hubungi Kami
            </a>
          </nav>

          {/* Mobile Navigation Hamburger button */}
          <button
            onClick={() => setIsMobMenuOpen(!isMobMenuOpen)}
            className="lg:hidden p-2 text-brand-black hover:text-brand-red focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Slide-in */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobMenuOpen(false)} />
        <div 
          className={`absolute top-0 right-0 w-4/5 max-w-sm h-full bg-white shadow-2xl border-l-[6px] border-brand-red p-6 flex flex-col transition-transform duration-300 transform ${
            isMobMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <span className="font-display font-black text-xl text-brand-black">GEOMETRI</span>
            <button onClick={() => setIsMobMenuOpen(false)} className="p-2"><X className="w-6 h-6 text-brand-gray-1" /></button>
          </div>

          <div className="flex flex-col gap-3 flex-grow my-auto">
            {displayNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-3 px-4 text-left font-display font-extrabold text-lg rounded-lg transition-colors cursor-pointer ${
                  currentPage === item.id
                    ? 'text-brand-red bg-brand-red-pale border-l-4 border-brand-red'
                    : 'text-brand-gray-1 hover:text-brand-red hover:bg-brand-gray-5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-auto border-t pt-5">
            <p className="text-xs text-brand-gray-2 mb-3">Kantor Pusat PT Geo Metri Indonesia</p>
            <a
              href="https://wa.me/6282262865676"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg text-center font-bold text-sm block"
            >
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
