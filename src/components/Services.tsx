import React, { useState } from 'react';
import { Award, Eye, ShieldCheck, Zap } from 'lucide-react';
import { ServiceDetail, SiteSettings } from '../types';

interface ServicesProps {
  services: ServiceDetail[];
  siteSettings: SiteSettings;
}

export default function Services({ services, siteSettings }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<string>(services[0]?.id || 'svc-1');

  const activeSvc = services.find(s => s.id === activeTab) || services[0];

  if (!activeSvc) {
    return (
      <div className="w-full py-20 text-center text-brand-gray-2 text-sm">
        Belum ada layanan. Tambahkan melalui Admin &rarr; Halaman Website &rarr; Layanan.
      </div>
    );
  }

  return (
    <div className="w-full relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 page-enter page-enter-active section-surface brand-pattern-subtle">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="border-b border-brand-gray-4 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-left">
          <div className="space-y-2">
            <h1 className="font-display font-black text-3xl sm:text-4xl text-brand-black tracking-tight leading-none pt-4">
              {siteSettings.servicesPage.pageTitle}
            </h1>
          </div>
          <p className="text-xs text-brand-gray-2 max-w-sm leading-relaxed">
            {siteSettings.servicesPage.pageSubtitle}
          </p>
        </div>

        {/* 1. SERVICES DETAILED TABS TENTATIVE DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20 text-left">
          
          {/* Tab Selection */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`w-full p-5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between group ${
                  activeTab === s.id
                    ? 'bg-white border-brand-red shadow-md ring-1 ring-brand-red-light'
                    : 'bg-brand-gray-5/60 hover:bg-white border-brand-gray-4'
                }`}
              >
                <div className="flex gap-4 items-center">
                  <div className={`w-10 h-10 rounded flex items-center justify-center font-bold text-sm ${
                    activeTab === s.id ? 'bg-brand-red text-white' : 'bg-brand-gray-4 text-brand-gray-1'
                  }`}>
                    {s.num}
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-sm text-brand-black">{s.title}</h4>
                    <p className="text-[10px] text-brand-gray-2 font-semibold uppercase tracking-wide">Ready & Berkualitas</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Tab Information Content Display */}
          <div className="lg:col-span-8 bg-white border border-brand-gray-3 p-6 sm:p-10 rounded-2xl shadow-sm relative min-h-[400px] flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center gap-3.5 border-b border-brand-gray-4 pb-4">
                <div className="w-12 h-12 bg-brand-red text-white rounded-lg flex items-center justify-center">
                  {activeSvc.iconName === 'ShoppingBag' && <ShieldCheck className="w-6 h-6" />}
                  {activeSvc.iconName === 'RefreshCw' && <Zap className="w-6 h-6" />}
                  {activeSvc.iconName === 'Wrench' && <Award className="w-6 h-6" />}
                  {activeSvc.iconName === 'Map' && <Eye className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-brand-black leading-tight">
                    {activeSvc.title}
                  </h3>
                  <p className="text-xs text-brand-red font-bold uppercase tracking-wider">Layanan Terpadu PT Geo Metri Indonesia</p>
                </div>
              </div>

              {activeSvc.image && (
                <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-brand-gray-4 bg-brand-gray-5 shadow-sm">
                  <img 
                    src={activeSvc.image} 
                    alt={activeSvc.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <p className="text-sm text-brand-gray-1 leading-relaxed">
                {activeSvc.description}
              </p>

              <div>
                <strong className="text-xs font-black text-brand-black uppercase block mb-3.5 tracking-wider">Cakupan Keuntungan & Standar Kerja:</strong>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-brand-gray-1">
                  {activeSvc.bullets.map((bullet, index) => (
                    <li key={index} className="flex gap-2.5 items-start bg-brand-gray-5/50 border border-brand-gray-4/75 p-3 rounded">
                      <span className="w-5 h-5 bg-brand-red/10 border border-brand-red-light text-brand-red text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            <div className="pt-8 border-t border-brand-gray-4 mt-8 flex flex-wrap justify-between items-center gap-4">
              <span className="text-[10px] text-brand-gray-3 font-semibold uppercase tracking-wider">
                Mekanisme Garansi Servis Prioritas
              </span>
              <a
                href={`https://wa.me/6285135716279?text=Halo%20Geometri%20Papua,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(activeSvc.title)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-xs uppercase tracking-wider px-5 py-3 border border-emerald-500 rounded shadow transition-colors"
              >
                Konsultasi Layanan via WA
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
