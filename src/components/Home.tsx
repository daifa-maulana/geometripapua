import React from 'react';
import { ArrowUpRight, MapPin, ShieldCheck, Zap, Eye, Award, Globe } from 'lucide-react';
import { ARTICLES } from '../data';
import { Article, SiteSettings, ServiceDetail, Branch, BrandItem, Product, Partner } from '../types';
import { HeroSection } from './blocks/hero-section-6';

const ARTICLE_FALLBACK_IMAGES: Record<string, string> = {
  'Tips': 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800',
  'Teknologi': 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800',
  'Edukasi': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
  'Produk': 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?w=800',
};

interface HomeProps {
  setCurrentPage: (page: string) => void;
  setSelectedProduct?: (product: Product | null) => void;
  products?: Product[];
  articles?: Article[];
  siteSettings: SiteSettings;
  services: ServiceDetail[];
  branches: Branch[];
  brands?: BrandItem[];
  partners?: Partner[];
}

export default function Home({ setCurrentPage, articles, siteSettings, services, branches, brands, partners }: HomeProps) {
  const { hero, home } = siteSettings;
  const displayBrands = brands || siteSettings.brands || [];
  const displayPartners = partners || siteSettings.partners || [];

  const displayArticles = articles && articles.length > 0 ? articles : ARTICLES;
  const latestArticles = displayArticles.slice(0, 3);

  return (
    <div className="w-full relative page-enter page-enter-active page-red-bg">
      
      {/* 1. HERO SECTION — new branded layout */}
      <HeroSection setCurrentPage={setCurrentPage} hero={hero} />



      {/* INFINITE TICKER MARQUEE - REMOVED */}

      {/* 2.5 TRUST BARRIER BANNER FOR BAPAK-BAPAK TARGET MARKET - REMOVED */}

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
                  <div className="h-64 w-full rounded-lg overflow-hidden border border-brand-gray-4 bg-brand-gray-5 mb-5 relative select-none">
                    {svc.image ? (
                      <img 
                        src={svc.image} 
                        alt={svc.title} 
                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
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



      {/* 5. DISTRIBUTED BRANDS LOGO MARQUEE */}
      <section className="py-12 section-muted border-y border-brand-gray-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="font-display font-black text-xl text-brand-black tracking-tight">
              {home.brandsTitle}
            </h2>
            <button 
              onClick={() => setCurrentPage('product')}
              className="text-xs font-black text-brand-red uppercase tracking-wide hover:text-brand-red-hover flex items-center gap-1.5 cursor-pointer"
            >
              Cek Filter Katalog &rarr;
            </button>
          </div>
        </div>

        {/* Marquee Container */}
        <div className="marquee-container relative w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}>
          {/* Single track — items duplicated inside for seamless loop */}
          <div
            className="flex items-center gap-20 animate-marquee w-max"
            style={{ animationDuration: `${Math.max(25, displayBrands.length * 5)}s` }}
          >
            {/* Set 1 */}
            {displayBrands.map((br, idx) => (
              <div
                key={`a-${idx}`}
                className="flex flex-col items-center justify-center gap-1 cursor-pointer group shrink-0 px-4 py-2"
                onClick={() => setCurrentPage('product')}
                title={br.name}
              >
                {br.logo ? (
                  <img
                    src={br.logo}
                    alt={br.name}
                    className="h-20 w-auto max-w-[180px] object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                ) : (
                  <span className="font-display font-black text-3xl text-brand-gray-3 group-hover:text-brand-red transition-colors tracking-wider uppercase whitespace-nowrap">
                    {br.name}
                  </span>
                )}
              </div>
            ))}
            {/* Set 2 — duplicate for seamless loop */}
            {displayBrands.map((br, idx) => (
              <div
                key={`b-${idx}`}
                aria-hidden="true"
                className="flex flex-col items-center justify-center gap-1 cursor-pointer group shrink-0 px-4 py-2"
                onClick={() => setCurrentPage('product')}
                title={br.name}
              >
                {br.logo ? (
                  <img
                    src={br.logo}
                    alt={br.name}
                    className="h-20 w-auto max-w-[180px] object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                ) : (
                  <span className="font-display font-black text-3xl text-brand-gray-3 group-hover:text-brand-red transition-colors tracking-wider uppercase whitespace-nowrap">
                    {br.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BERITA & ARTIKEL TERUPDATE */}
      <section className="py-20 section-surface brand-pattern-subtle px-4 sm:px-6 lg:px-8 xl:px-12 border-y border-brand-red/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="text-left space-y-2">
              <h2 className="font-display font-black text-3xl text-brand-black tracking-tight leading-none">
                Berita &amp; Artikel Terbaru
              </h2>
              <p className="text-xs text-brand-gray-2">
                Informasi terkini seputar alat survey, tips lapangan, dan edukasi geodesi
              </p>
            </div>
            
            <button
              onClick={() => setCurrentPage('blog')}
              className="text-xs font-black text-brand-red uppercase tracking-wider border-b-2 border-brand-red pb-1 flex items-center gap-1.5 hover:gap-2.5 transition-all self-start sm:self-auto cursor-pointer"
            >
              Lihat Semua Artikel
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((art) => (
              <article
                key={art.id}
                onClick={() => setCurrentPage('blog')}
                className="card-elevated rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col"
              >
                <div className="h-52 bg-brand-gray-5 relative border-b border-brand-gray-4 overflow-hidden">
                  <img
                    src={art.image || ARTICLE_FALLBACK_IMAGES[art.category] || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800'}
                    alt={art.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-brand-red text-white text-[9px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider">
                    {art.category}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-[10px] font-bold text-brand-gray-3 uppercase tracking-wider mb-2">{art.date} · {art.author}</span>
                  <h3 className="font-display font-black text-brand-black text-base leading-tight mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-brand-gray-2 leading-relaxed line-clamp-3 flex-grow">
                    {art.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-black text-brand-red uppercase tracking-wider group-hover:gap-2 transition-all">
                    <span>Baca Selengkapnya</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>


      {/* 7. NATIONAL NETWORK MAP PREVIEW */}
      <section className="py-20 section-muted px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-brand-gray-4">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-black tracking-tight leading-tight">
              {home.branchesTitle}
            </h2>
            <p className="text-sm text-brand-gray-2 leading-relaxed">
              {home.branchesNote}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {branches.map((br) => {
                const isHQ = br.isHQ;
                return (
                  <div 
                    key={br.id}
                    onClick={() => setCurrentPage('about')}
                    className={`group rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(220,38,38,0.2)] hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-center p-5 sm:p-6 relative bg-white/50 backdrop-blur-xl border border-white shadow-xl ${
                      isHQ ? 'ring-2 ring-brand-red/50 shadow-[0_0_30px_rgba(220,38,38,0.15)]' : ''
                    }`}
                  >
                    {/* Glass highlight effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/0 to-white/20 pointer-events-none"></div>

                    {/* Logo Image */}
                    <div className="w-full h-24 sm:h-[104px] mb-4 relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-brand-red/10 blur-[20px] rounded-full scale-50 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700"></div>
                      
                      {br.image ? (
                        <img 
                          src={br.image} 
                          alt={br.name}
                          className="w-full h-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-110 drop-shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <MapPin className="w-8 h-8 text-brand-gray-3 relative z-10" />
                      )}
                      
                      {isHQ && (
                        <span className="absolute -top-3 -left-3 bg-gradient-to-r from-brand-red to-brand-red-hover text-[8px] font-black uppercase tracking-widest text-white px-2.5 py-1 rounded-br-lg rounded-tl-lg shadow-md border border-white z-20">
                          HQ Utama
                        </span>
                      )}
                    </div>
                    
                    {/* Branch Name */}
                    <span className="font-display font-black text-[14px] sm:text-[15px] text-brand-black mb-5 text-center line-clamp-1 relative z-10 tracking-wide">
                      {br.name.toLowerCase().includes('geometri') ? br.name : `Geometri ${br.name}`}
                    </span>

                    {/* Action Buttons - Frosted Pills */}
                    <div className="flex items-center gap-2.5 mt-auto relative z-10">
                      <button 
                        onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/${br.phone.replace(/\D/g, '') || '6285135716279'}`, '_blank'); }}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 border border-brand-gray-4 flex items-center justify-center text-brand-black hover:bg-brand-red hover:border-brand-red hover:text-white hover:shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:-translate-y-1 transition-all duration-300"
                        title="WhatsApp"
                      >
                        <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); window.open(`https://maps.google.com/?q=${encodeURIComponent(br.address)}`, '_blank'); }}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 border border-brand-gray-4 flex items-center justify-center text-brand-black hover:bg-brand-red hover:border-brand-red hover:text-white hover:shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:-translate-y-1 transition-all duration-300"
                        title="Maps"
                      >
                        <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); window.open(`https://geo-metri.com`, '_blank'); }}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 border border-brand-gray-4 flex items-center justify-center text-brand-black hover:bg-brand-red hover:border-brand-red hover:text-white hover:shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:-translate-y-1 transition-all duration-300"
                        title="Website"
                      >
                        <Globe className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>
      </section>

      {/* 8. MITRA KAMI SECTION */}
      <section className="py-12 section-surface brand-pattern-subtle border-y border-brand-gray-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="font-display font-black text-xl text-brand-black tracking-tight">
              Mitra Kami
            </h2>
            <button 
              onClick={() => setCurrentPage('contact')}
              className="text-xs font-black text-brand-red uppercase tracking-wide hover:text-brand-red-hover flex items-center gap-1.5 cursor-pointer"
            >
              Hubungi Kami &rarr;
            </button>
          </div>
        </div>

        {/* Marquee Container - Same style as brands */}
        <div className="marquee-container relative w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}>
          {/* Single track — items duplicated inside for seamless loop */}
          <div
            className="flex items-center gap-20 animate-marquee w-max"
            style={{ animationDuration: `${Math.max(25, displayPartners.length * 5)}s` }}
          >
            {/* Set 1 */}
            {displayPartners.map((partner, idx) => (
              <div
                key={`a-${idx}`}
                className="flex flex-col items-center justify-center gap-1 cursor-pointer group shrink-0 px-4 py-2"
                onClick={() => setCurrentPage('contact')}
                title={partner.name}
              >
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-20 w-auto max-w-[180px] object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                ) : (
                  <span className="font-display font-black text-3xl text-brand-gray-3 group-hover:text-brand-red transition-colors tracking-wider uppercase whitespace-nowrap">
                    {partner.name.slice(0,4)}
                  </span>
                )}
                {partner.category && (
                  <span className="text-[10px] font-bold text-brand-gray-2 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    {partner.category}
                  </span>
                )}
              </div>
            ))}
            {/* Set 2 — duplicate for seamless loop */}
            {displayPartners.map((partner, idx) => (
              <div
                key={`b-${idx}`}
                aria-hidden="true"
                className="flex flex-col items-center justify-center gap-1 cursor-pointer group shrink-0 px-4 py-2"
                onClick={() => setCurrentPage('contact')}
                title={partner.name}
              >
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-20 w-auto max-w-[180px] object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                ) : (
                  <span className="font-display font-black text-3xl text-brand-gray-3 group-hover:text-brand-red transition-colors tracking-wider uppercase whitespace-nowrap">
                    {partner.name.slice(0,4)}
                  </span>
                )}
                {partner.category && (
                  <span className="text-[10px] font-bold text-brand-gray-2 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    {partner.category}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
