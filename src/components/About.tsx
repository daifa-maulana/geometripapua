import React, { useState } from 'react';
import { MapPin, Building, Milestone, Check } from 'lucide-react';
import { Branch, SiteSettings } from '../types';

interface AboutProps {
  siteSettings: SiteSettings;
  branches: Branch[];
}

function BranchImage({ src, name, type = 'thumbnail' }: { src?: string; name: string; type?: 'thumbnail' | 'large' }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    if (type === 'thumbnail') {
      return (
        <div className="w-16 h-16 rounded-md overflow-hidden bg-gradient-to-br from-brand-gray-5 to-brand-gray-4 shrink-0 shadow-xs border border-brand-gray-4/40 flex flex-col items-center justify-center p-1 relative text-center leading-none">
          <Building className="w-4 h-4 text-brand-red opacity-80 mb-0.5" />
          <span className="text-[7px] font-black tracking-tighter text-brand-black uppercase block max-w-full truncate">
            {name}
          </span>
        </div>
      );
    } else {
      return (
        <div className="w-full min-h-[200px] rounded-lg overflow-hidden border border-brand-gray-4 bg-gradient-to-br from-brand-gray-5 via-brand-gray-4 to-brand-gray-3/30 relative select-none flex flex-col items-center justify-center p-6 text-center shadow-inner">
          <div className="p-3 bg-brand-red-pale border border-brand-red-light rounded-full text-brand-red mb-2 shadow-xs">
            <Building className="w-6 h-6 animate-pulse" />
          </div>
          <p className="text-xs font-black tracking-widest text-[#111] uppercase">
            KANTOR GEOMETRI {name}
          </p>
          <p className="text-[9px] text-brand-gray-2 uppercase font-black tracking-wider mt-0.5">
            Layanan Kalibrasi & Penjualan Alat Survey
          </p>
          <div className="absolute top-3 left-3 bg-brand-black/75 backdrop-blur-xs text-white text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded border border-white/10 shadow-sm">
            Fasilitas Geometri {name}
          </div>
        </div>
      );
    }
  }

  return (
    <div className={type === 'thumbnail' ? "w-16 h-16 rounded-md overflow-hidden bg-brand-gray-4 shrink-0 shadow-xs border border-brand-gray-4/40 relative" : "w-full rounded-lg overflow-hidden border border-brand-gray-4 bg-brand-gray-5 relative select-none"}>
      <img
        src={src}
        alt={`Geometri ${name}`}
        className="w-full object-contain max-h-[400px]"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
      />
      {type === 'large' && (
        <div className="absolute top-3 left-3 bg-brand-black/75 backdrop-blur-xs text-white text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded border border-white/15">
          Fasilitas Geometri {name}
        </div>
      )}
    </div>
  );
}

export default function About({ siteSettings, branches }: AboutProps) {
  const { about } = siteSettings;
  const [regionFilter, setRegionFilter] = useState<string>('Semua');

  const regions = ['Semua', 'Papua', 'Jawa Barat', 'DKI Jakarta', 'Jawa Timur', 'Jawa Tengah', 'DIY', 'Sumatera', 'Sulawesi', 'Kalimantan', 'Bali'];

  const filteredBranches = branches.filter(b => {
    if (regionFilter === 'Semua') return true;
    if (regionFilter === 'Sumatera') {
      return b.region.includes('Sumatera') || b.region.includes('Riau');
    }
    if (regionFilter === 'Sulawesi') {
      return b.region.includes('Sulawesi');
    }
    if (regionFilter === 'Kalimantan') {
      return b.region.includes('Kalimantan');
    }
    return b.region === regionFilter;
  });

  return (
    <div className="w-full relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 page-enter page-enter-active section-muted brand-pattern-subtle">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Head */}
        <div className="border-b border-brand-gray-4 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-left">
          <div className="space-y-2">
            <h1 className="font-display font-black text-3xl sm:text-4xl text-brand-black tracking-tight leading-none pt-4">
              {about.pageTitle}
            </h1>
          </div>
          <p className="text-xs text-brand-gray-2 max-w-sm leading-relaxed">
            {about.pageSubtitle}
          </p>
        </div>

        {/* Brand Core History Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 text-left">
          
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display font-black text-2xl text-brand-black tracking-tight border-l-4 border-brand-red pl-4">
              Puncak Komitmen Sejak 2019
            </h2>
            <p className="text-sm text-brand-gray-1 leading-relaxed">
              {about.companyDescription}
            </p>
            <p className="text-sm text-brand-gray-1 leading-relaxed">
              Dengan filosofi dasar <strong>#TemanSurveyor</strong>, Cabang Papua hadir khusus untuk memenuhi kebutuhan juru ukur, kontraktor, dan instansi pemerintah di wilayah Papua — dari kalibrasi di lab hingga pelatihan pengoperasian alat gratis di lapangan.
            </p>
            

          </div>

          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-display font-black text-xl text-brand-black uppercase tracking-wide">
              Visi & Misi
            </h3>
            
            <div className="space-y-3">
              <div className="bg-white border border-brand-gray-4 rounded-xl p-5 hover:border-brand-red transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center">
                    <Milestone className="w-4 h-4 text-white" />
                  </div>
                  <strong className="text-sm font-bold text-brand-black uppercase tracking-wider">Visi</strong>
                </div>
                <p className="text-xs text-brand-gray-1 leading-relaxed pl-10">
                  {about.vision}
                </p>
              </div>

              <div className="bg-white border border-brand-gray-4 rounded-xl p-5 hover:border-brand-red transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <strong className="text-sm font-bold text-brand-black uppercase tracking-wider">Misi</strong>
                </div>
                <p className="text-xs text-brand-gray-1 leading-relaxed pl-10">
                  {about.mission}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* BRANCH LOCATOR - CARD GRID DESIGN */}
        <section className="mb-20">
          
          <div className="max-w-2xl mx-auto mb-10 space-y-3 text-center">
            <div className="inline-flex items-center justify-center gap-1.5 text-brand-red text-xs font-black uppercase tracking-widest">
              <MapPin className="w-4 h-4" />
              Network Locations
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-black tracking-tight leading-none">
              Jaringan {branches.length} Kantor Cabang Resmi
            </h2>
            <p className="text-sm text-brand-gray-2 leading-relaxed">
              Kami bagian dari jaringan nasional PT Geo Metri Indonesia. Pilih cabang terdekat atau langsung kunjungi Cabang Papua (Jayapura) sebagai kantor utama layanan kami di wilayah timur Indonesia.
            </p>
          </div>

          {/* Region Filter - Horizontal Scroll */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setRegionFilter(reg)}
                className={`px-5 py-2.5 text-xs font-display font-extrabold uppercase tracking-wider rounded-full cursor-pointer whitespace-nowrap transition-all border-2 ${
                  regionFilter === reg
                    ? 'bg-brand-red border-brand-red text-white'
                    : 'bg-white border-brand-gray-4 text-brand-gray-1 hover:border-brand-red hover:text-brand-red'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Branch Logo Grid - Glassmorphism Frames */}
          <div className="flex flex-wrap justify-center gap-4">
            {filteredBranches.map((br) => (
              <a
                key={br.id}
                href={`https://maps.google.com/?q=${encodeURIComponent(br.address)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1rem)] flex flex-col items-center gap-2 p-4 rounded-xl bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg transition-all duration-300 hover:bg-white/80 hover:border-brand-red/30 hover:shadow-xl hover:-translate-y-1 group"
              >
                {br.image ? (
                  <img
                    src={br.image}
                    alt={`Geometri ${br.name}`}
                    className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-xl bg-white/80 border border-white/40 flex items-center justify-center">
                    <Building className="w-5 h-5 text-brand-red/70" />
                  </div>
                )}
                <span className="text-[10px] font-semibold text-brand-gray-1 text-center leading-tight">
                  Geometri {br.name}
                </span>
              </a>
            ))}
          </div>

          {filteredBranches.length === 0 && (
            <div className="p-12 text-center bg-white border-2 border-dashed border-brand-gray-4 rounded-xl">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-brand-gray-5 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-brand-gray-3" />
              </div>
              <p className="text-sm font-semibold text-brand-gray-2">Belum ada cabang</p>
              <p className="text-xs text-brand-gray-3 mt-0.5">Tidak ada cabang terdaftar di filter wilayah ini.</p>
            </div>
          )}

        </section>

      </div>
    </div>
  );
}
