import React, { useState } from 'react';
import { Project, SiteSettings } from '../types';
import { Info, MapPin, Search, Calendar, User } from 'lucide-react';

interface PortfolioProps {
  portfolio: Project[];
  siteSettings: SiteSettings;
}

export default function Portfolio({ portfolio, siteSettings }: PortfolioProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredProjects = portfolio.filter((p) => {
    return (
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="w-full relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 page-enter page-enter-active section-muted brand-pattern-subtle">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="border-b border-brand-gray-4 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-left">
          <div className="space-y-2">
            <h1 className="font-display font-black text-3xl sm:text-4xl text-brand-black tracking-tight leading-none pt-4">
              {siteSettings.portfolioPage.pageTitle}
            </h1>
          </div>
          <p className="text-xs text-brand-gray-2 max-w-sm leading-relaxed">
            {siteSettings.portfolioPage.pageSubtitle}
          </p>
        </div>

        {/* Searching input bar */}
        <div className="bg-brand-gray-5 border border-brand-gray-4 rounded-xl p-4 mb-10 text-left">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Cari kata kunci proyek, klien, atau lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-brand-gray-4 p-3 pl-10 text-xs rounded-lg focus:border-brand-red focus:outline-none"
            />
            <Search className="w-4 h-4 text-brand-gray-3 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Projects Grid Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="card-elevated rounded-xl overflow-hidden transition-all duration-200 p-6 sm:p-8 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {p.image && (
                  <div className="w-full h-36 rounded-lg overflow-hidden border border-brand-gray-4">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex justify-between items-start gap-4">
                  <div className="w-14 h-14 bg-brand-gray-5 border border-brand-gray-4 rounded-lg flex items-center justify-center text-3xl flex-shrink-0 select-none">
                    {p.emoji}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] bg-brand-red-pale border border-brand-red-light font-black tracking-widest text-brand-red uppercase py-1 px-2.5 rounded-full inline-block">
                      {p.category}
                    </span>
                    <span className="block text-[10px] text-brand-gray-2 font-bold uppercase mt-1">
                      Progres: 100% Selesai
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display font-black text-brand-black text-[17px] sm:text-[19px] tracking-tight leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-brand-gray-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Sub-details list */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-brand-gray-4.5 text-xs text-brand-gray-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                    <span className="line-clamp-1" title={p.location}>{p.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                    <span className="line-clamp-1" title={p.client}>{p.client}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                    <span>Tahun {p.year}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-brand-gray-4">
                <div className="p-3 bg-brand-gray-5 rounded text-[10px] text-brand-gray-2 leading-relaxed flex gap-2 items-start">
                  <Info className="w-3.5 h-3.5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>Pengukuran diikat dengan BenchMark (BM) referensi BIG (Badan Informasi Geospasial) bersertifikat ortogonal penuh.</span>
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-20 border border-dashed border-brand-gray-4 bg-brand-gray-5/40 rounded-xl space-y-4">
              <span className="text-4xl block">📊</span>
              <h4 className="font-display font-black text-lg text-brand-gray-1">Tidak ada proyek pemetaan ditemukan</h4>
              <p className="text-xs text-brand-gray-2 max-w-sm mx-auto">Silakan coba menggunakan istilah pencarian alternatif, seperti "Topografi" atau "Drone".</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="bg-brand-black hover:bg-brand-red text-white py-2 px-4 rounded text-xs font-bold"
              >
                Tampilkan Semua Portofolio
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
