import React from 'react';
import { Mail, Phone, Globe, MapPin, Youtube, Instagram, Facebook, Linkedin, ArrowRight, Star } from 'lucide-react';
import brandLogoLight from '../../assets/Logo Bolong-01.png';
import { SiteSettings } from '../types';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  siteSettings: SiteSettings;
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Youtube: <Youtube className="w-4 h-4" />,
  Instagram: <Instagram className="w-4 h-4" />,
  Facebook: <Facebook className="w-4 h-4" />,
  Linkedin: <Linkedin className="w-4 h-4" />,
};

export default function Footer({ setCurrentPage, siteSettings }: FooterProps) {
  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const contact = siteSettings?.contact;
  const footer = siteSettings?.footer;

  return (
    <footer className="bg-brand-black text-white border-t-4 border-brand-red pt-16 pb-8 relative overflow-hidden brand-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid split */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Main info company */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src={brandLogoLight}
                alt="Geometri Indonesia"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="text-[10px] bg-brand-red/20 text-brand-red-light border border-brand-red/30 py-1 px-2.5 rounded-full inline-flex items-center gap-1.5 font-bold uppercase tracking-wider mb-4">
              <Star className="w-3 h-3 fill-brand-red text-brand-red" />
              #TemanSurveyor Indonesia
            </div>
            <p className="text-sm text-brand-gray-3 leading-relaxed mb-6">
              {footer?.companyDescription}
            </p>
            
            {/* Social channels */}
            <div className="flex items-center gap-2.5">
              {(footer?.socialLinks ?? []).map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 border border-white/10 hover:border-brand-red hover:bg-brand-red rounded-full flex items-center justify-center text-brand-gray-3 hover:text-white transition-all duration-200"
                  title={link.platform}
                >
                  {SOCIAL_ICONS[link.icon] || <Globe className="w-4 h-4" />}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-black text-xs uppercase tracking-wider text-brand-gray-3 border-l-2 border-brand-red pl-3.5 mb-6">
              Navigasi Site
            </h3>
            <ul className="space-y-3.5 text-sm text-brand-gray-3">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-brand-red flex items-center gap-1.5 transition-colors cursor-pointer text-left">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  Beranda Utama
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-brand-red flex items-center gap-1.5 transition-colors cursor-pointer text-left">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  Profil & Cabang
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('service')} className="hover:text-brand-red flex items-center gap-1.5 transition-colors pointer-events-auto cursor-pointer text-left">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  Layanan Survey
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('product')} className="hover:text-brand-red flex items-center gap-1.5 transition-colors cursor-pointer text-left">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  Katalog Alat Survey
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('portfolio')} className="hover:text-brand-red flex items-center gap-1.5 transition-colors cursor-pointer text-left">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  Portofolio Kerja
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('blog')} className="hover:text-brand-red flex items-center gap-1.5 transition-colors cursor-pointer text-left">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  Blog & Edukasi
                </button>
              </li>
            </ul>
          </div>

          {/* Business Core */}
          <div>
            <h3 className="font-display font-black text-xs uppercase tracking-wider text-brand-gray-3 border-l-2 border-brand-red pl-3.5 mb-6">
              Layanan Utama
            </h3>
            <ul className="space-y-3.5 text-sm text-brand-gray-3">
              {(footer?.services ?? []).map((svc, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span>
                  <span>{svc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Headquarters Contact */}
          <div>
            <h3 className="font-display font-black text-xs uppercase tracking-wider text-brand-gray-3 border-l-2 border-brand-red pl-3.5 mb-6">
              Kontak Cabang Papua
            </h3>
            <ul className="space-y-4 text-sm text-brand-gray-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-1" />
                <span>{contact?.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-red flex-shrink-0" />
                <a href={`tel:${contact?.phone}`} className="hover:text-brand-red transition-colors font-medium">
                  {contact?.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                <a href={`mailto:${contact?.email}`} className="hover:text-brand-red transition-colors">
                  {contact?.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-brand-red flex-shrink-0" />
                <a href={contact?.website} target="_blank" rel="noreferrer" className="hover:text-brand-red transition-colors">
                  {contact?.website?.replace('https://', 'www.')}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Separator row */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-gray-3">
          <p className="text-center md:text-left">
            &copy; {currentYear !== 2026 ? `2019 - ${currentYear}` : '2019 - 2026'} <strong className="text-white font-black">PT Geo Metri Indonesia</strong>. Cabang Papua (Jayapura). All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1">
              Primary: <strong className="text-brand-red">#FF0013</strong>
            </span>
            <span>&bull;</span>
            <span>White Dominant Minimalist</span>
            <span>&bull;</span>
            <span>Papua Surveyor Network — Melayani Lokal</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
