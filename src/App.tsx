/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Products from './components/Products';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Admin from './components/Admin';
import { Product, Article, SiteSettings, ServiceDetail, Branch, Project, BrandItem, Partner } from './types';
import { PRODUCTS, ARTICLES, SERVICES, BRANCHES, PORTFOLIO } from './data';
import {
  DEFAULT_SITE_SETTINGS,
} from './lib/siteContent';
import { loadAllContent, trackPageVisit } from './lib/supabaseContent';

export default function App() {
  const [currentPage, setCurrentPageInternal] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoaderActive, setIsLoaderActive] = useState<boolean>(true);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [isContentLoading, setIsContentLoading] = useState<boolean>(true);

  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [articles, setArticles] = useState<Article[]>(ARTICLES);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [services, setServices] = useState<ServiceDetail[]>(SERVICES);
  const [branches, setBranches] = useState<Branch[]>(BRANCHES);
  const [portfolio, setPortfolio] = useState<Project[]>(PORTFOLIO);
  const [brands, setBrands] = useState<BrandItem[]>(DEFAULT_SITE_SETTINGS.brands ?? []);
  const [partners, setPartners] = useState<Partner[]>(DEFAULT_SITE_SETTINGS.partners ?? []);

  useEffect(() => {
    let isMounted = true;

    const initContent = async () => {
      try {
        const content = await loadAllContent();
        if (!isMounted) {
          return;
        }

        setProducts(content.products);
        setArticles(content.articles);
        setSiteSettings(content.siteSettings);
        setServices(content.services);
        setBranches(content.branches);
        setPortfolio(content.portfolio);
        setBrands(content.brands);
        setPartners(content.partners);
      } catch (error) {
        console.error('Failed to initialize app content:', error);
        // Ensure we still set default content even if Supabase fails
        const fallback = {
          products: PRODUCTS,
          articles: ARTICLES,
          siteSettings: DEFAULT_SITE_SETTINGS,
          services: SERVICES,
          branches: BRANCHES,
          portfolio: PORTFOLIO,
          brands: DEFAULT_SITE_SETTINGS.brands ?? [],
          partners: DEFAULT_SITE_SETTINGS.partners ?? [],
        };
        if (isMounted) {
          setProducts(fallback.products);
          setArticles(fallback.articles);
          setSiteSettings(fallback.siteSettings);
          setServices(fallback.services);
          setBranches(fallback.branches);
          setPortfolio(fallback.portfolio);
          setBrands(fallback.brands);
          setPartners(fallback.partners);
        }
      } finally {
        if (isMounted) {
          setIsContentLoading(false);
        }
      }
    };

    initContent();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fallback: Always ensure content is loaded even if async fails
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setIsContentLoading(false);
    }, 3000); // 3 second timeout
    return () => clearTimeout(fallbackTimer);
  }, []);

  // Initialize page state based on current URL hash and bind hashchange listener
  useEffect(() => {
    const handleHashChange = () => {
      // Allow direct route match for /admin pathname block as well as #admin hash
      const pathname = window.location.pathname;
      const hash = window.location.hash.replace('#', '');
      
      const validPages = ['home', 'about', 'service', 'product', 'portfolio', 'blog', 'contact', 'admin'];
      
      if (pathname === '/admin' || pathname === 'admin' || hash === 'admin') {
        setCurrentPageInternal('admin');
        if (window.location.hash !== '#admin') {
          window.history.replaceState(null, '', '#admin');
        }
      } else if (validPages.includes(hash)) {
        setCurrentPageInternal(hash);
      } else if (!hash) {
        // Default to home hash if empty
        window.history.replaceState(null, '', '#home');
        setCurrentPageInternal('home');
      }
    };

    // Run on initial mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update browser document.title dynamically on page change (Genuine Multi-page experience)
  useEffect(() => {
    const titles: Record<string, string> = {
      home: 'Geometri Papua | Cabang Jayapura — Jual, Sewa, Servis & Kalibrasi Alat Survey',
      about: 'Tentang Kami - Geometri Papua Cabang Jayapura',
      service: 'Layanan Survey & Geospasial - Geometri Papua',
      product: 'Katalog Alat Survey Papua Bergaransi - Geometri Papua',
      portfolio: 'Portofolio Proyek Papua - Geometri Papua',
      blog: 'Edukasi & Blog Surveyor - Geometri Papua',
      contact: 'Hubungi Geometri Papua — Cabang Jayapura',
      admin: 'Sistem Manajemen Konten | Admin Geometri Papua',
    };
    document.title = titles[currentPage] || 'Geometri Papua | Jual, Sewa, Servis & Kalibrasi Alat Survey';
  }, [currentPage]);

  // Setter function passed to components to change page smoothly with hash update
  const setCurrentPage = (page: string) => {
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initialize and close loader on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaderActive(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Ensure loader is always removed after a maximum timeout
  useEffect(() => {
    const maxLoadingTimer = setTimeout(() => {
      setIsContentLoading(false);
    }, 5000); // Maximum 5 seconds loading time
    return () => clearTimeout(maxLoadingTimer);
  }, []);

  useEffect(() => {
    if (currentPage === 'admin') {
      return;
    }

    trackPageVisit(currentPage);
  }, [currentPage]);

  // Monitor scroll for "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            setCurrentPage={setCurrentPage}
            setSelectedProduct={setSelectedProduct}
            products={products}
            articles={articles}
            siteSettings={siteSettings}
            services={services}
            branches={branches}
            brands={brands}
            partners={partners}
          />
        );
      case 'about':
        return <About siteSettings={siteSettings} branches={branches} />;
      case 'service':
        return <Services services={services} siteSettings={siteSettings} />;
      case 'product':
        return (
          <Products
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            products={products}
          />
        );
      case 'portfolio':
        return <Portfolio portfolio={portfolio} siteSettings={siteSettings} />;
      case 'blog':
        return <Blog articles={articles} />;
      case 'contact':
        return <Contact siteSettings={siteSettings} />;
      case 'admin':
        return (
        <Admin
            products={products}
            setProducts={setProducts}
            articles={articles}
            setArticles={setArticles}
            siteSettings={siteSettings}
            setSiteSettings={setSiteSettings}
            services={services}
            setServices={setServices}
            branches={branches}
            setBranches={setBranches}
            portfolio={portfolio}
            setPortfolio={setPortfolio}
            brands={brands}
            setBrands={setBrands}
            partners={partners}
            setPartners={setPartners}
            setCurrentPage={setCurrentPage}
          />
        );
      default:
        return (
          <Home
            setCurrentPage={setCurrentPage}
            setSelectedProduct={setSelectedProduct}
            products={products}
            siteSettings={{ ...siteSettings, brands, partners }}
            services={services}
            branches={branches}
          />
        );
    }
  };

  return (
    <div className="min-h-screen page-surface brand-pattern-subtle text-brand-gray-1 font-sans flex flex-col justify-between selection:bg-brand-red selection:text-white">
      
      {/* 1. INITIAL MOUNT BRAND LOADER */}
      {(isLoaderActive || isContentLoading) && (
        <div 
          className="fixed inset-0 bg-white z-9999 flex flex-col items-center justify-center gap-5 transition-opacity duration-300"
          id="global-loader"
        >
          <div className="w-14 h-14 border-4 border-brand-gray-4 border-t-brand-red rounded-full animate-spin"></div>
          <span className="font-display font-black text-xs text-brand-gray-2 uppercase tracking-[0.2em] animate-pulse">
            Memuat Geometri Papua Cabang Jayapura...
          </span>
        </div>
      )}

      {/* 2. PERSISTENT FLOATING QUICK ACTIONS */}
      {currentPage !== 'admin' && showBackToTop && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={scrollToTop}
            title="Kembali ke atas"
            className="w-11 h-11 bg-brand-red hover:bg-brand-red-hover text-white rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer border border-brand-red-light focus:outline-none"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* 3. CORE LAYOUT WRAPPERS */}
      <div>
        {currentPage !== 'admin' && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />}
        <main className="w-full">
          {renderPage()}
        </main>
      </div>

      {currentPage !== 'admin' && <Footer setCurrentPage={setCurrentPage} siteSettings={siteSettings} />}
    </div>
  );
}

