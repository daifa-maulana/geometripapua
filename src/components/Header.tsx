import React, { useState } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';
import brandLogoDark from '../../assets/Logo Geometri Hitam.png';

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
    <header className="w-full sticky top-0 z-40">
      {/* Main Bar Sticky-Capable */}
      <div className="w-full bg-white border-b-3 border-brand-red shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => handleNavClick('home')}>
            <img
              src={brandLogoDark}
              alt="Geometri Indonesia"
              className="h-11 w-auto object-contain"
            />
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
            <img
              src={brandLogoDark}
              alt="Geometri Indonesia"
              className="h-9 w-auto object-contain"
            />
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
            <p className="text-xs text-brand-gray-2 mb-3">Geometri Papua — Cabang Jayapura</p>
            <a
              href="https://wa.me/6285135716279"
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
