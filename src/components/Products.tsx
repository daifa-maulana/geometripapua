import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { Search, SlidersHorizontal, Info, CheckCircle, Tag, Phone, ShieldCheck, X, Filter } from 'lucide-react';

const CATEGORY_IMAGES: Record<string, string> = {
  'Total Station': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
  'GPS / GNSS': 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?w=800',
  'Theodolite': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
  'Drone': 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800',
  'Waterpass': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
  'Aksesoris': 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800'
};

interface ProductsProps {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  products?: Product[];
}

export default function Products({ selectedProduct, setSelectedProduct, products }: ProductsProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [activeBrand, setActiveBrand] = useState<string>('Semua');
  const [sortBy, setSortBy] = useState<string>('default');

  const categories = ['Semua', 'Total Station', 'GPS / GNSS', 'Theodolite', 'Drone', 'Waterpass', 'Aksesoris'];

  const displayProducts = products !== undefined ? products : PRODUCTS;

  // Extract unique brands present in current dataset dynamically
  const availableBrands = ['Semua', ...Array.from(new Set(displayProducts.map((p) => p.brand))).filter(Boolean)];

  // Filter products
  const filteredProducts = displayProducts.filter((p) => {
    const matchesCategory = activeCategory === 'Semua' || p.category === activeCategory;
    const matchesBrand = activeBrand === 'Semua' || p.brand.toLowerCase() === activeBrand.toLowerCase();
    
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      p.name.toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      (p.specs || []).some(s => s.toLowerCase().includes(term));
      
    return matchesCategory && matchesBrand && matchesSearch;
  });

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'nameAsc') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'nameDesc') {
      return b.name.localeCompare(a.name);
    }
    return 0; // Default order
  });

  const handleOpenModal = (p: Product) => {
    setSelectedProduct(p);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleSendWAOrder = (p: Product) => {
    const msg = `Halo Geometri Bandung, saya mencari informasi harga dan ketersediaan unit alat survey melalui katalog website:\n\n` +
                `- Nama Alat: ${p.name}\n` +
                `- Kategori: ${p.category}\n` +
                `- Brand: ${p.brand}\n\n` +
                `Apakah unit ini ready di cabang terdekat atau perlu indent? Mohon dikirimkan harga nett beserta kelengkapan aksesorisnya. Terima kasih.`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/6282262865676?text=${encoded}`, '_blank');
  };

  return (
    <div className="w-full relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 page-enter page-enter-active section-surface brand-pattern-subtle">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="border-b border-brand-gray-4 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-left">
          <div className="space-y-2">
            <h1 className="font-display font-black text-3xl sm:text-4xl text-brand-black tracking-tight leading-none pt-4">
              Instrumen &amp; Alat Survey Pemetaan
            </h1>
          </div>
          <p className="text-xs text-brand-gray-2 max-w-sm leading-relaxed">
            Semua unit bersertifikasi original, berpaspor nomor serial orisinil pabrikan, serta didukung kalibrasi awal mandiri gratis dari tim lab Bandung kami.
          </p>
        </div>

        {/* Searching & Filter Navigation Row */}
        <div className="bg-brand-gray-5 border border-brand-gray-4 rounded-2xl p-6 mb-10 space-y-4">
          
          {/* Top Search & Dropdown Row */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar Input */}
            <div className="relative w-full md:w-1/2 text-left">
              <label className="block text-[10px] font-black uppercase text-brand-gray-2 tracking-wider mb-1">Cari Kata Kunci</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari nama alat, spesifikasi, atau seri..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-brand-gray-4 p-3 pl-11 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red text-brand-gray-1 font-semibold"
                />
                <Search className="w-4 h-4 text-brand-gray-3 absolute left-4 top-3.5" />
              </div>
            </div>

            {/* Brand Dropdown Selector */}
            <div className="w-full md:w-1/4 text-left">
              <label className="block text-[10px] font-black uppercase text-brand-gray-2 tracking-wider mb-1">Pilih Pabrikan (Brand)</label>
              <select
                value={activeBrand}
                onChange={(e) => setActiveBrand(e.target.value)}
                className="w-full bg-white border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none font-semibold text-brand-gray-1"
              >
                {availableBrands.map((brandName) => (
                  <option key={brandName} value={brandName}>
                    {brandName === 'Semua' ? 'Semua Brand' : brandName}
                  </option>
                ))}
              </select>
            </div>

            {/* Sorting Dropdown */}
            <div className="w-full md:w-1/4 text-left">
              <label className="block text-[10px] font-black uppercase text-brand-gray-2 tracking-wider mb-1">Urutkan Koleksi</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none font-semibold text-brand-gray-1"
              >
                <option value="default">Terbaru / Default</option>
                <option value="nameAsc">Nama (A-Z)</option>
                <option value="nameDesc">Nama (Z-A)</option>
              </select>
            </div>
          </div>

          {/* Filter Pills (Category) */}
          <div className="pt-2 border-t border-brand-gray-4/70 text-left">
            <span className="block text-[10px] font-black uppercase text-brand-gray-2 tracking-wider mb-2.5">Kategori Utama</span>
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`py-2 px-4 rounded-md text-xs font-display font-extrabold uppercase tracking-wider cursor-pointer whitespace-nowrap border transition-colors ${
                    activeCategory === cat
                      ? 'bg-brand-red border-brand-red text-white font-black'
                      : 'bg-white border-brand-gray-4 text-brand-gray-1 hover:border-brand-red'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Catalog Grid View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {sortedProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => handleOpenModal(p)}
              className="bg-white border border-brand-gray-4 hover:border-brand-red rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-48 bg-brand-gray-5 flex items-center justify-center text-6xl relative border-b border-brand-gray-4 select-none overflow-hidden">
                  <img 
                    src={p.image || CATEGORY_IMAGES[p.category] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'} 
                    alt={p.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2.5 right-3.5 bg-white text-[9px] font-extrabold px-2.5 py-1 text-brand-black border border-brand-gray-4 rounded uppercase tracking-wider shadow-sm">
                    {p.brand}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest text-[#930033]">
                    <span>{p.category}</span>
                  </div>
                  <h3 className="font-display font-black text-brand-black text-base leading-tight group-hover:text-brand-red transition-colors line-clamp-1">
                    {p.name}
                  </h3>
                  <p className="text-xs text-brand-gray-2 leading-relaxed line-clamp-3">
                    {p.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(p);
                  }}
                  className="w-full border border-brand-gray-4 hover:border-brand-red hover:text-brand-red hover:bg-brand-red-pale text-brand-gray-1 font-display font-black text-xs uppercase tracking-widest py-3 rounded-lg transition-colors cursor-pointer"
                >
                  Lihat Spesifikasi
                </button>
              </div>
            </div>
          ))}

          {sortedProducts.length === 0 && (
            <div className="col-span-full text-center py-20 border border-dashed border-brand-gray-4 bg-brand-gray-5/40 rounded-xl space-y-4">
              <span className="text-4xl block">🔍</span>
              <h4 className="font-display font-black text-lg text-brand-gray-1">Tidak ada produk ditemukan</h4>
              <p className="text-xs text-brand-gray-2 max-w-sm mx-auto">Silakan kosongkan pencarian Anda atau gunakan filter kategori alternatif di panel atas.</p>
              <button 
                onClick={() => { setSearchTerm(''); setActiveCategory('Semua'); setActiveBrand('Semua'); }}
                className="bg-brand-black hover:bg-brand-red text-white py-2 px-4 rounded text-xs font-bold font-display uppercase tracking-wider cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* 3. PRODUCT DETAIL OVERLAY MODAL */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
            {/* Background backdrop blur */}
            <div className="fixed inset-0 bg-brand-black/75 backdrop-blur-sm transition-opacity" onClick={handleCloseModal}></div>

            {/* Modal Box */}
            <div className="flex min-h-screen items-center justify-center p-4 text-center">
              <div className="relative transform overflow-hidden rounded-2xl bg-white border border-brand-gray-3 p-6 sm:p-10 text-left shadow-2xl transition-all my-8 max-w-3xl w-full">
                
                {/* Close Button top-right */}
                <button
                  onClick={handleCloseModal}
                  className="absolute right-4 top-4 sm:right-6 sm:top-6 p-2 rounded-full hover:bg-brand-gray-5 text-brand-gray-2 hover:text-brand-black transition-colors focus:outline-none cursor-pointer"
                  aria-label="Tutup"
                >
                  <X className="w-5.5 h-5.5" />
                </button>

                {/* Grid Split inside Modal */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Left product visual */}
                  <div className="md:col-span-4 bg-brand-gray-5 border border-brand-gray-4 rounded-xl h-56 md:h-full min-h-[220px] flex flex-col justify-center items-center relative overflow-hidden">
                    <img 
                      src={selectedProduct.image || CATEGORY_IMAGES[selectedProduct.category] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'} 
                      alt={selectedProduct.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Right description section fields */}
                  <div className="md:col-span-8 flex flex-col justify-between h-full space-y-6">
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-red">
                        <Tag className="w-3.5 h-3.5 text-brand-red" />
                        <span>Katalog &bull; {selectedProduct.category}</span>
                      </div>
                      <h2 className="font-display font-black text-2xl text-brand-black leading-tight">
                        {selectedProduct.name}
                      </h2>
                      <p className="text-xs text-brand-gray-2 leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>

                    {/* Detailed Specifications list */}
                    <div className="bg-brand-gray-5 border border-brand-gray-4 rounded-lg p-5">
                      <h4 className="font-display font-black text-xs uppercase tracking-wide text-brand-black border-b border-brand-gray-4 pb-2 mb-3">
                        Rincian Spesifikasi Teknis:
                      </h4>
                      <ul className="space-y-2 text-xs text-brand-gray-1">
                        {selectedProduct.specs.map((item, index) => (
                          <li key={index} className="flex gap-2.5 items-start">
                            <span className="w-1.5 h-1.5 bg-brand-red rounded-full mt-1.5 flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Core Features bullets */}
                    {selectedProduct.features && selectedProduct.features.length > 0 && (
                      <div className="space-y-2.5">
                        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-black">Keunggulan Fitur Unggulan:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-brand-gray-1">
                          {selectedProduct.features.map((feat, i) => (
                            <div key={i} className="flex gap-2 items-center bg-brand-red-pale/20 border border-brand-red-light/60 p-2 rounded">
                              <ShieldCheck className="w-4 h-4 text-brand-red flex-shrink-0" />
                              <span className="line-clamp-1">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pricing estimation direct action bar */}
                    <div className="bg-brand-red-pale border border-brand-red-light p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="text-[10px] font-bold text-brand-red uppercase tracking-wider block">Harga Jual &amp; Sewa Est:</span>
                        <span className="font-display font-black text-[15px] sm:text-[17px] text-brand-black leading-none block mt-1">
                          {selectedProduct.priceRange}
                        </span>
                      </div>

                      <button
                        onClick={() => handleSendWAOrder(selectedProduct)}
                        className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-display font-black uppercase tracking-wider px-5 py-3 rounded-md flex items-center gap-2 shadow cursor-pointer w-full sm:w-auto justify-center"
                      >
                        <Phone className="w-4 h-4" />
                        Pesan via WhatsApp
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
