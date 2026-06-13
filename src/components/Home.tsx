import React from 'react';
import { ArrowUpRight, MapPin, Star, ShieldCheck, Zap, HeartHandshake, Eye, Award, Phone } from 'lucide-react';
import { PRODUCTS, BRANDS } from '../data';
import { BrandLogoRenderer } from './BrandLogos';
import { Product, SiteSettings, ServiceDetail, Branch } from '../types';
import { HeroSection } from './blocks/hero-section-6';

const CATEGORY_IMAGES: Record<string, string> = {
  'Total Station': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
  'GPS / GNSS': 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?w=800',
  'Theodolite': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
  'Drone': 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800',
  'Waterpass': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
  'Aksesoris': 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800'
};

interface HomeProps {
  setCurrentPage: (page: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  products?: Product[];
  siteSettings: SiteSettings;
  services: ServiceDetail[];
  branches: Branch[];
}

function BrandCardItem({ br, setCurrentPage }: { br: typeof BRANDS[0]; setCurrentPage: (page: string) => void }) {
  return (
    <div 
      className="bg-white border border-brand-gray-4 p-5 rounded-lg flex flex-col items-center justify-between h-40 group hover:border-brand-red hover:shadow-md transition-all cursor-pointer"
      onClick={() => setCurrentPage('product')}
    >
      <div className="w-full h-20 flex items-center justify-center p-3 bg-brand-gray-5 group-hover:bg-brand-gray-5/20 rounded-md transition-colors overflow-hidden relative">
        <BrandLogoRenderer name={br.name} />
      </div>
      <div className="text-center mt-2.5">
        <span className="block font-display font-black text-xs text-brand-black uppercase tracking-wider group-hover:text-brand-red transition-colors">
          {br.name}
        </span>
        <span className="block text-[8px] uppercase font-bold tracking-widest text-brand-gray-2 mt-0.5">
          {br.origin}
        </span>
      </div>
    </div>
  );
}

export default function Home({ setCurrentPage, setSelectedProduct, products, siteSettings, services, branches }: HomeProps) {
  const { hero, home } = siteSettings;

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const displayProducts = products && products.length > 0 ? products : PRODUCTS;
  const featuredProducts = displayProducts.slice(0, 4);
  const tickerItems = [...home.tickerItems, ...home.tickerItems];

  return (
    <div className="w-full relative page-enter page-enter-active page-red-bg">
      
      {/* 1. HERO SECTION — new branded layout */}
      <HeroSection setCurrentPage={setCurrentPage} hero={hero} />



      {/* 2. INFINITE TICKER MARQUEE */}
      <div className="bg-brand-red py-4 overflow-hidden border-y border-brand-red-hover select-none shadow-inner relative z-20">
        <div className="flex whitespace-nowrap gap-12 font-display text-sm font-extrabold uppercase tracking-wider text-white">
          <div className="animate-[mq_40s_linear_infinite] flex items-center gap-12 flex-shrink-0">
            {tickerItems.map((txt, index) => (
              <span key={index} className="flex items-center gap-4">
                <span>{txt}</span>
                <span className="w-2 h-2 bg-white/40 rounded-full"></span>
              </span>
            ))}
          </div>
          <div className="animate-[mq_40s_linear_infinite] flex items-center gap-12 flex-shrink-0" aria-hidden="true">
            {tickerItems.map((txt, index) => (
              <span key={index} className="flex items-center gap-4">
                <span>{txt}</span>
                <span className="w-2 h-2 bg-white/40 rounded-full"></span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2.5 TRUST BARRIER BANNER FOR BAPAK-BAPAK TARGET MARKET */}
      <div className="bg-white border-b border-brand-gray-4 py-8 px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 shadow-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          
          <div className="flex flex-col items-center p-4 bg-brand-surface rounded-xl border border-brand-gray-4/70 hover:border-brand-red/30 transition-all shadow-2xs">
            <span className="text-3xl mb-2" role="img" aria-label="shield">🛡️</span>
            <span className="font-display font-black text-xs sm:text-sm text-brand-black uppercase tracking-wide">Garansi Resmi 1 Tahun</span>
            <span className="text-[10px] text-brand-gray-2 mt-1 font-semibold leading-relaxed">Jaminan unit original, aman, &amp; terproteksi resmi</span>
          </div>

          <div className="flex flex-col items-center p-4 bg-brand-surface rounded-xl border border-brand-gray-4/70 hover:border-brand-red/30 transition-all shadow-2xs">
            <span className="text-3xl mb-2" role="img" aria-label="balance">⚖️</span>
            <span className="font-display font-black text-xs sm:text-sm text-brand-black uppercase tracking-wide">Sertifikat Kalibrasi</span>
            <span className="text-[10px] text-brand-gray-2 mt-1 font-semibold leading-relaxed">Tiap alat diuji kelayakan &amp; akurasi di lab internal</span>
          </div>

          <div className="flex flex-col items-center p-4 bg-brand-surface rounded-xl border border-brand-gray-4/70 hover:border-brand-red/30 transition-all shadow-2xs">
            <span className="text-3xl mb-2" role="img" aria-label="graduation cap">🎓</span>
            <span className="font-display font-black text-xs sm:text-sm text-brand-black uppercase tracking-wide">Gratis Training Alat</span>
            <span className="text-[10px] text-brand-gray-2 mt-1 font-semibold leading-relaxed">Bimbingan dasar operasional oleh instruktur ahli kami</span>
          </div>

          <div className="flex flex-col items-center p-4 bg-brand-surface rounded-xl border border-brand-gray-4/70 hover:border-brand-red/30 transition-all shadow-2xs">
            <span className="text-3xl mb-2" role="img" aria-label="truck">🚚</span>
            <span className="font-display font-black text-xs sm:text-sm text-brand-black uppercase tracking-wide">COD &amp; Demo Kantor</span>
            <span className="text-[10px] text-brand-gray-2 mt-1 font-semibold leading-relaxed">Bisa request demo unit langsung ke kantor / proyek Anda</span>
          </div>

        </div>
      </div>

      {/* 3. FOUR CORE SERVICES SECTION */}
      <section className="py-20 section-muted brand-pattern-subtle px-4 sm:px-6 lg:px-8 xl:px-12 border-b border-brand-gray-4">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-black tracking-tight leading-tight">
              {home.servicesTitle}
            </h2>
            <p className="text-sm text-brand-gray-2 leading-relaxed">
              {home.servicesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc) => (
              <div
                key={svc.id}
                onClick={() => setCurrentPage('service')}
                className="card-elevated p-8 rounded-xl relative overflow-hidden cursor-pointer hover:-translate-y-1.5 duration-200 group active:scale-[0.99] flex flex-col justify-between"
              >
                {/* Top border highlight on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-red transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                <span className="absolute top-4 right-5 font-display font-black text-4xl text-brand-gray-4 leading-none select-none">
                  {svc.num}
                </span>

                <div>
                  <div className="h-40 w-full rounded-lg overflow-hidden border border-brand-gray-4 bg-brand-gray-5 mb-5 relative select-none">
                    {svc.image ? (
                      <img 
                        src={svc.image} 
                        alt={svc.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-brand-red/10 text-brand-red">
                        {svc.iconName === 'ShoppingBag' && <ShieldCheck className="w-8 h-8" />}
                        {svc.iconName === 'RefreshCw' && <Zap className="w-8 h-8" />}
                        {svc.iconName === 'Wrench' && <Award className="w-8 h-8" />}
                        {svc.iconName === 'Map' && <Eye className="w-8 h-8" />}
                      </div>
                    )}
                  </div>

                  <h3 className="font-display font-extrabold text-lg text-brand-black mb-3">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-brand-gray-2 leading-relaxed mb-6">
                    {svc.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-extrabold text-brand-red uppercase tracking-wider mt-2 group-hover:gap-2 transition-all">
                  <span>Lihat Detil</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. CHOOSE GEOMETRI KEY ADVANTAGES */}
      <section className="py-20 section-surface brand-pattern-subtle px-4 sm:px-6 lg:px-8 xl:px-12 border-y border-brand-red/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Why Left */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-black tracking-tight leading-tight">
                {home.whyTitle}
              </h2>
              <p className="text-sm text-brand-gray-2 leading-relaxed">
                {home.whySubtitle}
              </p>
            </div>

            <div className="space-y-4">
              {home.advantages.map((adv, i) => {
                const icons = [ShieldCheck, Zap, HeartHandshake];
                const Icon = icons[i % icons.length];
                return (
                  <div key={i} className="flex gap-4 p-5 card-elevated rounded-lg hover:bg-brand-red-pale/20 transition-colors">
                    <div className="w-11 h-11 bg-brand-red text-white rounded flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-brand-black text-base mb-1">
                        {adv.title}
                      </h4>
                      <p className="text-xs text-brand-gray-1 leading-relaxed">
                        {adv.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Metric Panel Card Right */}
          <div className="lg:col-span-6">
            <div className="border border-brand-gray-4 rounded-xl overflow-hidden shadow-md">
              <div className="bg-brand-black text-white p-6 border-b border-brand-gray-1">
                <h3 className="font-display font-black text-base uppercase tracking-wide">
                  {home.metricsTitle}
                </h3>
                <p className="text-xs text-brand-gray-3 mt-1">
                  {home.metricsSubtitle}
                </p>
              </div>

              <div className="divide-y divide-brand-gray-4 bg-white">
                {home.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className={`p-6 flex items-center justify-between gap-4 ${metric.highlighted ? 'border-l-4 border-brand-red' : ''}`}
                  >
                    <div className={`font-display font-black text-4xl ${metric.highlighted ? 'text-brand-red' : 'text-brand-black'}`}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-brand-gray-1 text-right max-w-sm">
                      {metric.description}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. DISTRIBUTED BRANDS LOGO GRID */}
      <section className="py-16 section-muted brand-pattern-subtle px-4 sm:px-6 lg:px-8 border-y border-brand-gray-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12">
            <div className="text-center sm:text-left">
              <h2 className="font-display font-black text-2xl text-brand-black tracking-tight mt-1">
                {home.brandsTitle}
              </h2>
            </div>
            <button 
              onClick={() => setCurrentPage('product')}
              className="text-xs font-black text-brand-red uppercase tracking-wide hover:text-brand-red-hover flex items-center gap-1.5 cursor-pointer"
            >
              Cek Filter Katalog &rarr;
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BRANDS.map((br, idx) => (
              <div key={idx}>
                <BrandCardItem br={br} setCurrentPage={setCurrentPage} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED PRODUCTS PREVIEW SCROLL */}
      <section className="py-20 section-surface brand-pattern-subtle px-4 sm:px-6 lg:px-8 xl:px-12 border-y border-brand-red/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="text-left space-y-2">
              <h2 className="font-display font-black text-3xl text-brand-black tracking-tight leading-none">
                {home.productsTitle}
              </h2>
              <p className="text-xs text-brand-gray-2">
                {home.productsSubtitle}
              </p>
            </div>
            
            <button
              onClick={() => setCurrentPage('product')}
              className="text-xs font-black text-brand-red uppercase tracking-wider border-b-2 border-brand-red pb-1 flex items-center gap-1.5 hover:gap-2.5 transition-all self-start sm:self-auto cursor-pointer"
            >
              Lihat Seluruh Katalog
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Grid Products list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => handleViewProduct(prod)}
                className="card-elevated rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 bg-brand-gray-5 flex items-center justify-center text-5xl relative border-b border-brand-gray-4 overflow-hidden">
                    <img 
                      src={prod.image || CATEGORY_IMAGES[prod.category] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'} 
                      alt={prod.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-2.5 right-3.5 bg-white text-[9px] font-extrabold px-2.5 py-1 text-brand-black border border-brand-gray-4 rounded uppercase tracking-wider">
                      {prod.brand}
                    </span>
                  </div>

                  <div className="p-5">
                    <span className="text-[10px] font-extrabold text-brand-red tracking-widest uppercase block mb-1">
                      {prod.category}
                    </span>
                    <h3 className="font-display font-black text-brand-black text-base leading-tight mb-2 group-hover:text-brand-red transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-brand-gray-2 line-clamp-3 leading-relaxed mb-4">
                      {prod.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-1">
                  <div className="w-full text-center border border-brand-gray-4 text-brand-gray-1 hover:border-brand-red hover:text-brand-red bg-white hover:bg-brand-red-pale py-2.5 rounded-md font-display font-black text-xs uppercase tracking-wider transition-colors">
                    Lihat Spesifikasi &rarr;
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. NATIONAL NETWORK MAP PREVIEW */}
      <section className="py-20 section-muted brand-pattern-subtle px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-brand-gray-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-black tracking-tight leading-tight">
              {home.branchesTitle}
            </h2>
            <div className="p-5 bg-brand-red-pale/45 border-l-4 border-brand-red rounded-r-lg">
              <p className="text-xs text-brand-gray-1 font-semibold leading-relaxed">
                {home.branchesNote}
              </p>
            </div>
            
            <button
              onClick={() => setCurrentPage('about')}
              className="bg-brand-black hover:bg-brand-red text-white py-3.5 px-6 rounded-md font-display font-extrabold text-xs uppercase tracking-widest inline-flex items-center gap-2 shadow transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              Cari Cabang Terdekat &rarr;
            </button>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {branches.map((br) => {
                const isHQ = br.isHQ;
                return (
                  <div 
                    key={br.id}
                    onClick={() => setCurrentPage('about')}
                    className={`group border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col h-28 relative bg-white ${
                      isHQ 
                        ? 'border-brand-red ring-1 ring-brand-red/15' 
                        : 'border-brand-gray-4 hover:border-brand-red'
                    }`}
                  >
                    {/* Cover image or map fallback icon layout */}
                    <div className="w-full h-14 relative overflow-hidden bg-brand-gray-5 shrink-0">
                      {br.image ? (
                        <img 
                          src={br.image} 
                          alt={br.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-95 group-hover:brightness-100"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-gray-5 to-brand-gray-4">
                          <MapPin className="w-4 h-4 text-brand-gray-3" />
                        </div>
                      )}
                      
                      {isHQ && (
                        <span className="absolute top-1 left-1.5 bg-brand-red text-[7.5px] font-black uppercase tracking-widest text-white px-1.5 py-0.5 rounded shadow-sm">
                          HQ
                        </span>
                      )}
                    </div>
                    {/* Text Details */}
                    <div className="p-1.5 flex-grow flex flex-col justify-center text-center z-10 leading-none">
                      <span className="font-display font-black text-[11px] text-brand-black group-hover:text-brand-red transition-colors block truncate">
                        {br.name}
                      </span>
                      <span className="text-[7.5px] uppercase font-bold tracking-wider text-brand-gray-2 mt-0.5 block truncate">
                        {br.region}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 8. PERSISTENT FLOATING BAR */}
      <div className="bg-brand-red-pale border-t-2 border-brand-red py-6 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-sm animate-bounce">
            <Phone className="w-5 h-5 fill-white" />
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-display font-extrabold text-sm text-brand-black">{home.ctaTitle}</h4>
            <p className="text-xs text-brand-gray-2">{home.ctaSubtitle}</p>
          </div>
        </div>
        <a
          href="https://wa.me/6282262865676?text=Halo%20Admin%20Geometri%20Bandung,%20kami%20memerlukan%20dokumen%20penawaran%20harga%20alat%20survey%20secepatnya."
          target="_blank"
          rel="noreferrer"
          className="bg-brand-red hover:bg-brand-red-hover text-white font-display font-black text-xs uppercase tracking-wider px-6 py-3 rounded-md shadow-md transition-colors"
        >
          Minta Penawaran Sekarang
        </a>
      </div>

    </div>
  );
}
