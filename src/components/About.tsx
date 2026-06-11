import React, { useState } from 'react';
import { MapPin, Phone, Building, Check, Milestone } from 'lucide-react';
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
        <div className="w-14 h-14 rounded-md overflow-hidden bg-gradient-to-br from-brand-gray-5 to-brand-gray-4 shrink-0 shadow-xs border border-brand-gray-4/40 flex flex-col items-center justify-center p-1 relative text-center leading-none">
          <Building className="w-4 h-4 text-brand-red opacity-80 mb-0.5" />
          <span className="text-[7px] font-black tracking-tighter text-brand-black uppercase block max-w-full truncate">
            {name}
          </span>
        </div>
      );
    } else {
      return (
        <div className="w-full h-44 rounded-lg overflow-hidden border border-brand-gray-4 bg-gradient-to-br from-brand-gray-5 via-brand-gray-4 to-brand-gray-3/30 relative select-none flex flex-col items-center justify-center p-6 text-center shadow-inner">
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
    <div className={type === 'thumbnail' ? "w-14 h-14 rounded-md overflow-hidden bg-brand-gray-4 shrink-0 shadow-xs border border-brand-gray-4/40 relative" : "w-full h-44 rounded-lg overflow-hidden border border-brand-gray-4 bg-brand-gray-5 relative select-none"}>
      <img
        src={src}
        alt={`Geometri ${name}`}
        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
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
  const [selectedBranch, setSelectedBranch] = useState<Branch>(branches[0]);
  const [regionFilter, setRegionFilter] = useState<string>('Semua');

  const regions = ['Semua', 'Jawa Barat', 'DKI Jakarta', 'Jawa Timur', 'Jawa Tengah', 'Sumatera', 'Sulawesi', 'Kalimantan', 'Bali'];

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
              Dengan filosofi dasar <strong>#TemanSurveyor</strong>, kami tidak sekadar melakukan transaksi jual-beli instrumen industri dambaan Anda, namun mendampingi penuh siklus hidup peralatan vital tersebut dari awal kalibrasi presisi di lab hingga pelatihan dasar pengoperasian cuma-cuma juru ukur Anda di lapangan.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-2.5 items-start">
                <div className="p-1 bg-brand-red text-white rounded mt-0.5"><Check className="w-4 h-4" /></div>
                <div>
                  <h4 className="font-display font-extrabold text-[13px] text-brand-black uppercase">Badan Hukum Legal Sah</h4>
                  <p className="text-xs text-brand-gray-2">PT Geo Metri Indonesia memiliki akta pendirian, sertifikat KPA, SK Kemenkumham, serta dokumen NIB terdaftar resmi.</p>
                </div>
              </div>
              
              <div className="flex gap-2.5 items-start">
                <div className="p-1 bg-brand-red text-white rounded mt-0.5"><Check className="w-4 h-4" /></div>
                <div>
                  <h4 className="font-display font-extrabold text-[13px] text-brand-black uppercase">Standardisasi ISO</h4>
                  <p className="text-xs text-brand-gray-2">Setiap alur penanganan servis instrumen di lab Bandung melalui uji kalibrasi ISO 17025.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-brand-gray-5 border-2 border-brand-gray-4 rounded-xl p-8 space-y-6 relative overflow-hidden">
            <div className="absolute right-[-40px] top-[-40px] w-48 h-48 brand-pattern-dense rounded-full pointer-events-none opacity-20"></div>
            
            <h3 className="font-display font-black text-lg text-brand-black uppercase tracking-wide">
              Visi & Misi Kami
            </h3>
            
            <div className="space-y-4 text-xs text-brand-gray-1 leading-relaxed">
              <div className="p-4 bg-white border border-brand-gray-4 rounded-md">
                <strong className="text-brand-red block mb-1">VISI UTAMA</strong>
                {about.vision}
              </div>

              <div className="p-4 bg-white border border-brand-gray-4 rounded-md">
                <strong className="text-brand-black block mb-1">MISI OPERASIONAL</strong>
                {about.mission}
              </div>
            </div>
          </div>

        </div>

        {/* INTERACTIVE BRANCH LOCATOR GRID DESIGN */}
        <section className="bg-brand-gray-5 border border-brand-gray-4 rounded-2xl p-6 sm:p-10 mb-20 text-left">
          
          <div className="max-w-2xl mb-8 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-brand-red text-xs font-black uppercase tracking-widest">
              <MapPin className="w-4 h-4" />
              Interactive Locator
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-black tracking-tight leading-none">
              Jaringan {branches.length} Kantor Cabang Resmi
            </h2>
            <p className="text-xs text-brand-gray-2 leading-relaxed">
              Silakan pilih wilayah dan klik kartu cabang untuk melihat info kontak serta alamat operasional legal resmi instansi kami.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-brand-gray-4 mb-8">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setRegionFilter(reg)}
                className={`px-4 py-2 text-xs font-display font-extrabold uppercase tracking-wider rounded border cursor-pointer whitespace-nowrap transition-all ${
                  regionFilter === reg
                    ? 'bg-brand-red border-brand-red text-white'
                    : 'bg-white border-brand-gray-4 text-brand-gray-1 hover:border-brand-red'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Interactive Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left list of filtered branches */}
            <div className="lg:col-span-5 space-y-3 max-h-[480px] overflow-y-auto pr-2 no-scrollbar">
              {filteredBranches.map((br) => (
                <div
                  key={br.id}
                  onClick={() => setSelectedBranch(br)}
                  className={`p-3 rounded-lg border-2 text-left cursor-pointer transition-all flex items-center gap-3.5 ${
                    selectedBranch.id === br.id
                      ? 'bg-white border-brand-red shadow-md'
                      : 'bg-white/60 hover:bg-white border-brand-gray-4 hover:border-brand-gray-3'
                  }`}
                >
                  <BranchImage src={br.image} name={br.name} type="thumbnail" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-display font-black text-sm text-brand-black flex items-center gap-1.5">
                        {br.name}
                        {br.isHQ && <span className="bg-brand-red-pale text-[9px] font-black tracking-widest text-brand-red uppercase px-1.5 py-0.5 rounded border border-brand-red-light">HQ</span>}
                      </span>
                      <span className="text-[9px] text-brand-gray-2 font-black uppercase tracking-wider bg-brand-gray-4 px-2 py-0.5 rounded">
                        {br.region}
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-gray-2 line-clamp-1 leading-relaxed">
                      {br.address}
                    </p>
                  </div>
                </div>
              ))}
              
              {filteredBranches.length === 0 && (
                <div className="p-8 text-center bg-white border border-brand-gray-4 rounded-lg text-xs text-brand-gray-2">
                  Tidak ada cabang terdaftar di filter wilayah ini.
                </div>
              )}
            </div>

            {/* Right detailed information display panel */}
            <div className="lg:col-span-7 bg-white border border-brand-gray-3 rounded-xl p-6 sm:p-8 space-y-6 relative shadow-sm min-h-[350px] flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-brand-gray-4 pb-4">
                  <div>
                    <h3 className="font-display font-black text-xl text-brand-black flex items-center gap-2">
                      <Building className="w-5 h-5 text-brand-red" />
                      Geometri {selectedBranch.name}
                    </h3>
                    <p className="text-xs text-brand-gray-2">PT Geo Metri Indonesia Regional {selectedBranch.region}</p>
                  </div>
                  {selectedBranch.isHQ && (
                    <span className="bg-brand-red text-white text-[10px] font-black tracking-wider px-3 py-1 rounded select-none">
                      KANTOR PUSAT UTAMA
                    </span>
                  )}
                </div>

                <BranchImage src={selectedBranch.image} name={selectedBranch.name} type="large" />

                <div className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <strong className="text-brand-black block mb-1 font-extrabold uppercase text-[10px] tracking-wider text-brand-gray-2">Alamat Fisik Operasional:</strong>
                    <p className="text-brand-gray-1 bg-brand-gray-5 p-3 rounded border border-brand-gray-4">
                      {selectedBranch.address}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <strong className="text-brand-black block mb-1 font-extrabold uppercase text-[10px] tracking-wider text-brand-gray-2">Telepon / WhatsApp:</strong>
                      <p className="text-brand-black font-bold p-3 bg-brand-gray-5 rounded border border-brand-gray-4 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-brand-red" />
                        {selectedBranch.phone}
                      </p>
                    </div>

                    <div>
                      <strong className="text-brand-black block mb-1 font-extrabold uppercase text-[10px] tracking-wider text-brand-gray-2">Jam Kerja Cabang:</strong>
                      <p className="text-brand-gray-1 p-3 bg-brand-gray-5 rounded border border-brand-gray-4">
                        Senin - Sabtu: 08:30 - 17:00 WIB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-gray-4 flex justify-between items-center flex-wrap gap-4">
                <span className="text-[10px] text-brand-gray-3 italic font-semibold">
                  #TemanSurveyor Indonesia Jual Sewa Servis Kalibrasi
                </span>
                
                <a
                  href={`https://wa.me/6282262865676?text=Halo%20Geometri%20${selectedBranch.name},%20saya%20ingin%20berkonsultasi%20mengenai%20alat%20survey.`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-brand-red hover:bg-brand-red-hover text-white px-5 py-2.5 rounded text-xs font-display font-extrabold uppercase tracking-wide flex items-center gap-1.5 shadow"
                >
                  <Phone className="w-4.5 h-4.5" />
                  Hubungi Cabang
                </a>
              </div>

            </div>

          </div>

        </section>

        {/* HISTORICAL MILESTONE TIMELINE */}
        <div className="text-left max-w-3xl mx-auto space-y-8">
          <h3 className="font-display font-black text-2xl text-brand-black text-center mb-10 tracking-tight">
            Perjalanan Sejarah Kita
          </h3>
          
          <div className="relative border-l-2 border-brand-gray-4 pl-6 space-y-12">
            {about.timeline.map((item) => (
              <div key={item.year} className="relative">
                <div className="absolute left-[-32px] top-1.5 w-4 h-4 bg-brand-red rounded-full border-4 border-white shadow-sm"></div>
                <div>
                  <span className="font-display font-black text-lg text-brand-red">{item.year}</span>
                  <h4 className="font-display font-extrabold text-sm text-brand-black uppercase mt-1 mb-2">{item.title}</h4>
                  <p className="text-xs text-brand-gray-1 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
