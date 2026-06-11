import React from 'react';

export function TopconLogo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-lg font-black tracking-widest text-[#004B87] font-sans select-none">
        TOPCON
      </div>
      <div className="w-10 h-[3px] bg-[#FFD100] mt-1 rounded-full"></div>
    </div>
  );
}

export function SokkiaLogo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-lg font-black tracking-wide text-[#E30613] font-sans select-none">
        SOKKIA
      </div>
      <div className="text-[7px] font-bold text-gray-400 tracking-widest uppercase mt-0.5">
        Precision Optics
      </div>
    </div>
  );
}

export function LeicaLogo() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <div className="w-8 h-8 rounded-full bg-[#E10613] flex items-center justify-center shadow-inner shrink-0">
        <span className="text-white text-[10px] font-serif font-black italic tracking-tighter">Leica</span>
      </div>
      <div className="text-left leading-none">
        <span className="text-xs font-black text-gray-900 tracking-tight block">LEICA</span>
        <span className="text-[7.5px] text-[#E10613] font-bold uppercase tracking-wider block">Geosystems</span>
      </div>
    </div>
  );
}

export function TrimbleLogo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <svg className="w-7 h-7 text-[#007CA6] shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 22h20L12 2zm0 4.8L18.5 19H5.5L12 6.8z" />
        <path d="M12 10.5L15.5 17H8.5l3.5-6.5z" />
      </svg>
      <div className="text-left leading-none">
        <span className="text-xs font-black tracking-widest text-[#007CA6] uppercase block">Trimble</span>
      </div>
    </div>
  );
}

export function NikonLogo() {
  return (
    <div className="bg-[#FFE000] px-3 py-1 rounded border border-yellow-400 flex items-center justify-center shadow-sm transform -skew-x-6 select-none">
      <span className="text-black font-sans font-black italic text-xs tracking-tighter uppercase">
        Nikon
      </span>
    </div>
  );
}

export function SpectraLogo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-1">
        <svg className="w-3.5 h-3.5 text-[#C8102E]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10C6.48 22 2 17.52 2 12S6.48 2 12 2zm1 10h5c0-3.31-2.69-6-6-6v6h1z" />
        </svg>
        <span className="text-xs font-black text-gray-900 tracking-tight">SPECTRA</span>
      </div>
      <span className="text-[6px] text-brand-red font-black uppercase tracking-widest mt-0.5">GEOSPATIAL</span>
    </div>
  );
}

export function DjiLogo() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <svg className="w-5 h-5 text-gray-900 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2 5H10v2h4V7zm0 4H10v2h4v-2zm0 4H10v2h4v-2z" />
      </svg>
      <div className="text-left leading-none">
        <span className="text-xs font-black tracking-tighter text-gray-900 uppercase">dji</span>
        <span className="text-[6px] text-gray-400 font-bold uppercase tracking-widest block">ENTERPRISE</span>
      </div>
    </div>
  );
}

export function GarminLogo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-0.5">
        <span className="text-xs font-black tracking-widest text-[#000000] font-sans">
          GARMIN
        </span>
        <svg className="w-2.5 h-2.5 text-[#000000]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 22h20L12 2z" />
        </svg>
      </div>
      <span className="text-[6px] text-gray-400 font-bold tracking-wider uppercase mt-0.5">
        GPS Navigation
      </span>
    </div>
  );
}

export function BrandLogoRenderer({ name }: { name: string }) {
  const normName = name.toLowerCase();
  if (normName.includes('topcon')) return <TopconLogo />;
  if (normName.includes('sokkia')) return <SokkiaLogo />;
  if (normName.includes('leica')) return <LeicaLogo />;
  if (normName.includes('trimble')) return <TrimbleLogo />;
  if (normName.includes('nikon')) return <NikonLogo />;
  if (normName.includes('spectra')) return <SpectraLogo />;
  if (normName.includes('dji')) return <DjiLogo />;
  if (normName.includes('garmin')) return <GarminLogo />;
  
  return (
    <div className="text-sm font-black tracking-wider text-gray-500 uppercase">
      {name}
    </div>
  );
}
