import React from 'react';
import { Mail, Phone, Globe, MapPin, Youtube, Instagram, Facebook, Linkedin, ArrowRight, Star } from 'lucide-react';
import brandLogoLight from '../../assets/Logo Bolong-01.png';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

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
              PT Geo Metri Indonesia berdiri sejak 2019, berkomitmen mendistribusikan kebutuhan instrumen pemetaan orisinal, andal, dengan akurasi standar internasional untuk menyokong infrastruktur nasional.
            </p>
            
            {/* Social channels */}
            <div className="flex items-center gap-2.5">
              <a href="https://www.youtube.com/@geometrichannel" target="_blank" rel="noreferrer" className="w-9 h-9 border border-white/10 hover:border-brand-red hover:bg-brand-red rounded-full flex items-center justify-center text-brand-gray-3 hover:text-white transition-all duration-200" title="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/geometri.id/" target="_blank" rel="noreferrer" className="w-9 h-9 border border-white/10 hover:border-brand-red hover:bg-brand-red rounded-full flex items-center justify-center text-brand-gray-3 hover:text-white transition-all duration-200" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61572071534432" target="_blank" rel="noreferrer" className="w-9 h-9 border border-white/10 hover:border-brand-red hover:bg-brand-red rounded-full flex items-center justify-center text-brand-gray-3 hover:text-white transition-all duration-200" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/company/geometri-indonesia/" target="_blank" rel="noreferrer" className="w-9 h-9 border border-white/10 hover:border-brand-red hover:bg-brand-red rounded-full flex items-center justify-center text-brand-gray-3 hover:text-white transition-all duration-200" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
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
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span>
                <span>Penjualan Alat Survey</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span>
                <span>Sewa & Rental GPS/TS</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span>
                <span>Servis Alat Presisi</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span>
                <span>Sertifikasi Kalibrasi KAN</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span>
                <span>Pemetaan Jasa Survey Udara</span>
              </li>
            </ul>
          </div>

          {/* Main Headquarters Contact */}
          <div>
            <h3 className="font-display font-black text-xs uppercase tracking-wider text-brand-gray-3 border-l-2 border-brand-red pl-3.5 mb-6">
              Kantor Pusat Bandung
            </h3>
            <ul className="space-y-4 text-sm text-brand-gray-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-1" />
                <span>Jl. Libra III No.14B, Batununggal, Bandung, Jawa Barat 40275</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-red flex-shrink-0" />
                <a href="tel:+6282262865676" className="hover:text-brand-red transition-colors font-medium">
                  +62 822-6286-5676
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                <a href="mailto:geometriindonesia@gmail.com" className="hover:text-brand-red transition-colors">
                  geometriindonesia@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-brand-red flex-shrink-0" />
                <a href="https://geo-metri.com" target="_blank" rel="noreferrer" className="hover:text-brand-red transition-colors">
                  www.geo-metri.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Separator row */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-gray-3">
          <p className="text-center md:text-left">
            &copy; {currentYear !== 2026 ? `2019 - ${currentYear}` : '2019 - 2026'} <strong className="text-white font-black">PT Geo Metri Indonesia</strong>. Kantor Pusat Bandung. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1">
              Primary: <strong className="text-brand-red">#FF0013</strong>
            </span>
            <span>&bull;</span>
            <span>White Dominant Minimalist</span>
            <span>&bull;</span>
            <span>Jawa Barat Surveyor Network</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
