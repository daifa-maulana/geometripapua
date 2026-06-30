import React, { useEffect, useMemo, useState } from 'react';
import { Product, Article, SiteSettings, ServiceDetail, Branch, Project, BrandItem, Partner } from '../types';
import AdminSiteContent from './admin/AdminSiteContent';
import { supabase } from '../lib/supabase';
import {
  getVisitorSeries,
  resetAllContentToDefault,
  saveArticles,
  saveProducts,
} from '../lib/supabaseContent';
import { 
  Plus, Edit, Trash2, Tag, BookOpen, AlertCircle, RefreshCw, CheckCircle, 
  ArrowLeft, Search, User, X, Sparkles, Save
} from 'lucide-react';

interface AdminProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  services: ServiceDetail[];
  setServices: React.Dispatch<React.SetStateAction<ServiceDetail[]>>;
  branches: Branch[];
  setBranches: React.Dispatch<React.SetStateAction<Branch[]>>;
  portfolio: Project[];
  setPortfolio: React.Dispatch<React.SetStateAction<Project[]>>;
  brands: BrandItem[];
  setBrands: React.Dispatch<React.SetStateAction<BrandItem[]>>;
  partners: Partner[];
  setPartners: React.Dispatch<React.SetStateAction<Partner[]>>;
  setCurrentPage: (page: string) => void;
}

export default function Admin({
  products, setProducts, articles, setArticles,
  siteSettings, setSiteSettings, services, setServices,
  branches, setBranches, portfolio, setPortfolio,
  brands, setBrands, partners, setPartners,
  setCurrentPage,
}: AdminProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [isCheckingSession, setIsCheckingSession] = useState<boolean>(true);
  const [isAuthSubmitting, setIsAuthSubmitting] = useState<boolean>(false);
  const [visitorSeries, setVisitorSeries] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    let mounted = true;

    const bootstrapAuth = async () => {
      if (!supabase) {
        setLoginError('Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.');
        setIsCheckingSession(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (!mounted) {
        return;
      }

      setIsLoggedIn(Boolean(data.session));
      setIsCheckingSession(false);
    };

    bootstrapAuth();

    const { data: authListener } = supabase
      ? supabase.auth.onAuthStateChange((_event, session) => {
          if (!mounted) {
            return;
          }
          setIsLoggedIn(Boolean(session));
        })
      : { data: { subscription: { unsubscribe: () => undefined } } };

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const loadVisitors = async () => {
      const points = await getVisitorSeries(7);
      setVisitorSeries(points);
    };

    loadVisitors();
  }, [isLoggedIn]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!supabase) {
      setLoginError('Supabase belum dikonfigurasi.');
      return;
    }

    setIsAuthSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (!error) {
      setLoginError('');
      showNotif('Login berhasil! Selamat datang di dashboard admin.');
    } else {
      setLoginError(error.message || 'Email atau password salah.');
    }

    setIsAuthSubmitting(false);
  };

  const handleLogout = async () => {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
  };

  const [activeTab, setActiveTab] = useState<'products' | 'articles' | 'site'>('products');
  const [productSearch, setProductSearch] = useState<string>('');
  const [productFilterBrand, setProductFilterBrand] = useState<string>('');
  const [productFilterCategory, setProductFilterCategory] = useState<string>('');
  const [articleSearch, setArticleSearch] = useState<string>('');
  
  // Product Form holds
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [prodForm, setProdForm] = useState<{
    id: string;
    name: string;
    brand: string;
    category: 'Total Station' | 'GPS / GNSS' | 'Theodolite' | 'Drone' | 'Aksesoris' | 'Waterpass';
    image: string;
    description: string;
    specsText: string;
    featuresText: string;
    priceRange: string;
  }>({
    id: '',
    name: '',
    brand: 'Topcon',
    category: 'Total Station',
    image: '',
    description: '',
    specsText: '',
    featuresText: '',
    priceRange: 'Hubungi Sales'
  });

  // Article Form holds
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isArticleFormOpen, setIsArticleFormOpen] = useState(false);
  const [artForm, setArtForm] = useState<{
    id: string;
    title: string;
    category: 'Teknologi' | 'Tips' | 'Edukasi' | 'Produk';
    date: string;
    excerpt: string;
    content: string;
    emoji: string;
    image: string;
    author: string;
  }>({
    id: '',
    title: '',
    category: 'Teknologi',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    excerpt: '',
    content: '',
    emoji: '',
    image: '',
    author: 'Tim Geometri Indonesia'
  });

  const [notif, setNotif] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotif = (message: string, type: 'success' | 'error' = 'success') => {
    setNotif({ message, type });
    setTimeout(() => {
      setNotif(null);
    }, 4500);
  };

  const handleImageUpload = (file: File, type: 'product' | 'article') => {
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      showNotif('File harus berupa berkas gambar!', 'error');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scale = Math.min(MAX_WIDTH / img.width, 1);
        
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const base64 = canvas.toDataURL('image/jpeg', 0.75);
          
          if (type === 'product') {
            setProdForm(prev => ({ ...prev, image: base64 }));
            showNotif('Foto produk dari perangkat berhasil dimuat!');
          } else {
            setArtForm(prev => ({ ...prev, image: base64 }));
            showNotif('Foto artikel dari perangkat berhasil dimuat!');
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // PRODUCT ACTIONS
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProdForm({
      id: `prod-${Date.now()}`,
      name: '',
      brand: 'Topcon',
      category: 'Total Station',
      image: '',
      description: '',
      specsText: '',
      featuresText: '',
      priceRange: 'Hubungi Sales'
    });
    setIsProductFormOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProdForm({
      id: prod.id,
      name: prod.name,
      brand: prod.brand,
      category: prod.category,
      image: prod.image || '',
      description: prod.description,
      specsText: (prod.specs || []).join('\n'),
      featuresText: (prod.features || []).join('\n'),
      priceRange: prod.priceRange || 'Hubungi Sales'
    });
    setIsProductFormOpen(true);
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus produk "${name}"?`)) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      try {
        await saveProducts(updated);
        showNotif(`Produk "${name}" berhasil dihapus.`);
      } catch {
        showNotif('Gagal menghapus produk di Supabase.', 'error');
      }
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name.trim()) {
      showNotif('Nama alat wajib diisi!', 'error');
      return;
    }

    const payload: Product = {
      id: prodForm.id,
      name: prodForm.name.trim(),
      brand: prodForm.brand.trim(),
      category: prodForm.category,
      emoji: '🔭',
      image: prodForm.image.trim() || undefined,
      description: prodForm.description.trim(),
      specs: prodForm.specsText.split('\n').map(s => s.trim()).filter(s => s !== ''),
      features: prodForm.featuresText.split('\n').map(s => s.trim()).filter(s => s !== ''),
      priceRange: prodForm.priceRange.trim()
    };

    let updatedList: Product[];
    if (editingProduct) {
      updatedList = products.map(p => p.id === editingProduct.id ? payload : p);
      showNotif('Perubahan produk berhasil disimpan!');
    } else {
      updatedList = [payload, ...products];
      showNotif('Produk baru berhasil ditambahkan!');
    }

    setProducts(updatedList);
    try {
      await saveProducts(updatedList);
      setIsProductFormOpen(false);
      setEditingProduct(null);
    } catch {
      showNotif('Gagal menyimpan produk ke Supabase.', 'error');
    }
  };

  // ARTICLE ACTIONS
  const handleOpenAddArticle = () => {
    setEditingArticle(null);
    setArtForm({
      id: `art-${Date.now()}`,
      title: '',
      category: 'Teknologi',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      excerpt: '',
      content: '',
      emoji: '',
      image: '',
      author: 'Tim Geometri Indonesia'
    });
    setIsArticleFormOpen(true);
  };

  const handleOpenEditArticle = (art: Article) => {
    setEditingArticle(art);
    setArtForm({
      id: art.id,
      title: art.title,
      category: art.category,
      date: art.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      excerpt: art.excerpt,
      content: art.content,
      emoji: art.emoji || '',
      image: art.image || '',
      author: art.author || 'Tim Geometri Indonesia'
    });
    setIsArticleFormOpen(true);
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus artikel "${title}"?`)) {
      const updated = articles.filter(a => a.id !== id);
      setArticles(updated);
      try {
        await saveArticles(updated);
        showNotif(`Artikel "${title}" berhasil dihapus.`);
      } catch {
        showNotif('Gagal menghapus artikel di Supabase.', 'error');
      }
    }
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artForm.title.trim()) {
      showNotif('Judul artikel wajib diisi!', 'error');
      return;
    }

    const payload: Article = {
      id: artForm.id,
      title: artForm.title.trim(),
      category: artForm.category,
      date: artForm.date.trim() || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      excerpt: artForm.excerpt.trim(),
      content: artForm.content.trim(),
      emoji: editingArticle?.emoji || artForm.emoji.trim(),
      image: artForm.image.trim() || undefined,
      author: artForm.author.trim()
    };

    let updatedList: Article[];
    if (editingArticle) {
      updatedList = articles.map(a => a.id === editingArticle.id ? payload : a);
      showNotif('Artikel berhasil diperbarui!');
    } else {
      updatedList = [payload, ...articles];
      showNotif('Artikel baru diterbitkan!');
    }

    setArticles(updatedList);
    try {
      await saveArticles(updatedList);
      setIsArticleFormOpen(false);
      setEditingArticle(null);
    } catch {
      showNotif('Gagal menyimpan artikel ke Supabase.', 'error');
    }
  };

  // Reset all to system defaults
  const handleFactoryReset = async () => {
    if (window.confirm('Peringatan: Semua data yang Anda kelola akan dihapus dan dikembalikan ke konten awal bawaan pabrikan. Lanjutkan?')) {
      try {
        const defaults = await resetAllContentToDefault();
        setProducts(defaults.products);
        setArticles(defaults.articles);
        setSiteSettings(defaults.siteSettings);
        setServices(defaults.services);
        setBranches(defaults.branches);
        setPortfolio(defaults.portfolio);
        setBrands(defaults.brands);
        setPartners(defaults.partners);
        showNotif('Semua data berhasil dikembalikan ke bawaan awal.');
      } catch {
        showNotif('Gagal reset data bawaan di Supabase.', 'error');
      }
    }
  };

  // Filter lists inside admin display
  const dispProducts = products.filter(p => {
    const matchSearch = 
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase());
    const matchBrand = !productFilterBrand || p.brand.toLowerCase() === productFilterBrand.toLowerCase();
    const matchCategory = !productFilterCategory || p.category.toLowerCase() === productFilterCategory.toLowerCase();
    return matchSearch && matchBrand && matchCategory;
  });

  // Get unique brands and categories for filters
  const uniqueBrands = useMemo(() => 
    Array.from(new Set(products.map(p => p.brand))).sort(),
    [products]
  );

  const uniqueCategories = useMemo(() => 
    ['Total Station', 'GPS / GNSS', 'Theodolite', 'Drone', 'Waterpass', 'Aksesoris'],
    []
  );

  const dispArticles = articles.filter(a => 
    a.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
    a.category.toLowerCase().includes(articleSearch.toLowerCase()) ||
    a.excerpt.toLowerCase().includes(articleSearch.toLowerCase())
  );

  const maxVisitors = useMemo(
    () => Math.max(...visitorSeries.map((point) => point.count), 1),
    [visitorSeries]
  );

  if (!isLoggedIn) {
    if (isCheckingSession) {
      return (
        <div className="w-full relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-center min-h-[75vh]">
          <div className="w-14 h-14 border-4 border-brand-gray-4 border-t-brand-red rounded-full animate-spin"></div>
        </div>
      );
    }

    return (
      <div className="w-full relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 page-enter page-enter-active flex items-center justify-center min-h-[75vh]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(224,36,36,0.10),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(17,24,39,0.06),transparent_35%)]" />
        <div className="relative max-w-md w-full bg-white/95 backdrop-blur border border-brand-gray-4 rounded-3xl shadow-[0_20px_70px_-20px_rgba(17,24,39,0.35)] overflow-hidden p-8 sm:p-10 text-left">
          
          <div className="text-center space-y-3 mb-8">
            <div className="w-12 h-12 bg-brand-red-pale rounded-full flex items-center justify-center mx-auto mb-2 text-brand-red">
              <User className="w-6 h-6" />
            </div>
            <div className="text-brand-red text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-1">PT Geo Metri Indonesia</div>
            <h2 className="font-display font-black text-2xl text-brand-black tracking-tight leading-none pt-1">
              Login Administrator
            </h2>
            <p className="text-xs text-brand-gray-2 max-w-xs mx-auto">
              Silakan masukkan kredensial akun administrator Anda untuk mengelola produk, artikel, gambar, dan seluruh konten halaman website.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginError && (
              <div className="bg-rose-50 border border-rose-300 text-rose-800 p-4 rounded-lg text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black uppercase text-brand-gray-2 tracking-wider mb-1">Email Admin</label>
              <input
                type="email"
                required
                placeholder="admin@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red font-semibold text-brand-black"
                id="login-email"
              />
            </div>

            <div className="relative">
              <label className="block text-[10px] font-black uppercase text-brand-gray-2 tracking-wider mb-1">Kata Sandi / Password</label>
              <input
                type="password"
                required
                placeholder="Kata sandi admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red font-semibold text-brand-black"
                id="login-password"
              />
            </div>

            <button
              type="submit"
              disabled={isAuthSubmitting}
              className="w-full bg-brand-red hover:bg-brand-red-hover text-white py-3 px-4 rounded-lg text-xs font-display font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer mt-6"
              id="btn-login-submit"
            >
              {isAuthSubmitting ? 'Memproses...' : 'Masuk Dashboard'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-brand-gray-4/70 text-center">
            <span className="text-[10px] text-brand-gray-2 leading-relaxed block">
              Login menggunakan akun admin Supabase yang sudah dibuat di project Anda.
            </span>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-xs text-brand-gray-2 hover:text-brand-red hover:underline transition-colors flex items-center gap-1 justify-center mx-auto cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke Beranda
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 page-enter page-enter-active section-muted brand-pattern-subtle">
      <div className="max-w-7xl mx-auto">
        
        {/* Notification Banner */}
        {notif && (
          <div className={`fixed top-24 right-6 z-90 p-4 rounded-xl shadow-xl border flex items-center gap-3 transition-all duration-300 transform translate-y-0 ${
            notif.type === 'success' 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
              : 'bg-rose-50 border-rose-300 text-rose-800'
          }`}>
            {notif.type === 'success' ? <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
            <span className="text-xs font-semibold">{notif.message}</span>
          </div>
        )}

        {/* Header Admin Panel */}
        <div className="bg-white/90 border border-brand-gray-4 rounded-3xl p-6 sm:p-8 shadow-sm mb-8 text-left">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-brand-red text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>Sistem Manajemen Konten</span>
              </div>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-brand-black tracking-tight leading-none">
                Dashboard Admin Geometri
              </h1>
              <p className="text-sm text-brand-gray-2 max-w-2xl">
                Kelola katalog, artikel, dan konten website dari satu panel yang lebih rapi dan mudah dipantau.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button 
                onClick={() => setCurrentPage('home')}
                className="bg-white border border-brand-gray-4 hover:border-brand-black text-brand-gray-1 hover:text-brand-black py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Lihat Website
              </button>
              <button 
                onClick={handleLogout}
                className="bg-brand-black hover:bg-brand-red text-white py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                title="Keluar dari sesi administrator"
              >
                <User className="w-4 h-4" />
                Logout
              </button>
              <button 
                onClick={handleFactoryReset}
                className="bg-transparent hover:bg-brand-red/10 text-brand-red hover:text-brand-red border border-brand-red/30 hover:border-brand-red/50 py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide transition-colors flex items-center gap-2 cursor-pointer"
                title="Kembalikan semua modifikasi data ke bawaan awal"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Bawaan
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Stat Counter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
          
          <div className="group bg-gradient-to-br from-white via-brand-gray-5/70 to-brand-red-pale/35 border border-brand-gray-4 p-6 rounded-2xl relative overflow-hidden hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
            <div className="absolute right-4 top-4 text-brand-red bg-brand-red-pale p-3 rounded-xl">
              <Tag className="w-6 h-6" />
            </div>
            <span className="text-brand-gray-2 text-[10px] font-black uppercase tracking-widest block">Total Produk Aktif</span>
            <span className="text-3xl font-display font-black text-brand-black mt-2 block">{products.length}</span>
            <div className="text-[11px] text-brand-gray-2 mt-2 leading-none flex items-center gap-1">
              <span>Mengisi menu katalog instrumen secara otomatis</span>
            </div>
          </div>

          <div className="group bg-linear-to-br from-white via-brand-gray-5/70 to-brand-red-pale/35 border border-brand-gray-4 p-6 rounded-2xl relative overflow-hidden hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
            <div className="absolute right-4 top-4 text-brand-red bg-brand-red-pale p-3 rounded-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-brand-gray-2 text-[10px] font-black uppercase tracking-widest block">Artikel Edukasi Juru Ukur</span>
            <span className="text-3xl font-display font-black text-brand-black mt-2 block">{articles.length}</span>
            <div className="text-[11px] text-brand-gray-2 mt-2 leading-none flex items-center gap-1">
              <span>Kategori portal berita, tips perbaikan & edukasi</span>
            </div>
          </div>

          <div className="group bg-linear-to-br from-white via-brand-gray-5/70 to-brand-red-pale/35 border border-brand-gray-4 p-6 rounded-2xl relative overflow-hidden hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
            <div className="absolute right-4 top-4 text-brand-red bg-brand-red-pale p-3 rounded-xl">
              <User className="w-6 h-6" />
            </div>
            <span className="text-brand-gray-2 text-[10px] font-black uppercase tracking-widest block">Sesi Autentikasi Admin</span>
            <span className="text-lg font-display font-black text-emerald-600 mt-3 inline-flex items-center gap-1.5 leading-none">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
              Admin Terautentikasi
            </span>
            <div className="text-[11px] text-brand-gray-2 mt-2 leading-none">
              <span>Sesi Anda aktif di browser ini</span>
            </div>
          </div>

        </div>

        <div className="bg-gradient-to-br from-white via-brand-gray-5/70 to-brand-red-pale/20 border border-brand-gray-4 p-6 rounded-3xl shadow-sm mb-10 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
            <h3 className="font-display font-black text-lg text-brand-black tracking-tight">
              Grafik Pengunjung Website (7 Hari)
            </h3>
            <button
              onClick={async () => setVisitorSeries(await getVisitorSeries(7))}
              className="text-[11px] font-bold text-brand-red hover:text-brand-red-hover uppercase tracking-wider"
            >
              Refresh Data
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 items-end h-54 bg-white/80 rounded-2xl p-4 border border-brand-gray-4 shadow-inner">
            {visitorSeries.map((point) => (
              <div key={point.date} className="flex flex-col items-center justify-end h-full gap-2">
                <div className="text-[10px] font-black text-brand-gray-2">{point.count}</div>
                <div
                  className="w-full max-w-10 rounded-t-md bg-brand-red/85 hover:bg-brand-red transition-colors"
                  style={{ height: `${Math.max(12, (point.count / maxVisitors) * 140)}px` }}
                  title={`${point.date}: ${point.count} pengunjung`}
                ></div>
                <div className="text-[10px] font-semibold text-brand-gray-2">
                  {new Date(point.date).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Controls */}
        <div className="bg-white/90 border border-brand-gray-4 rounded-2xl px-4 sm:px-6 py-3 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 py-2 rounded-xl text-xs uppercase tracking-wider font-display font-extrabold transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-brand-red text-white shadow-sm'
                  : 'bg-brand-gray-5 text-brand-gray-2 hover:bg-brand-gray-4 hover:text-brand-black'
              }`}
            >
              Kelola Produk ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-3 py-2 rounded-xl text-xs uppercase tracking-wider font-display font-extrabold transition-all cursor-pointer ${
                activeTab === 'articles'
                  ? 'bg-brand-red text-white shadow-sm'
                  : 'bg-brand-gray-5 text-brand-gray-2 hover:bg-brand-gray-4 hover:text-brand-black'
              }`}
            >
              Kelola Artikel ({articles.length})
            </button>
            <button
              onClick={() => setActiveTab('site')}
              className={`px-3 py-2 rounded-xl text-xs uppercase tracking-wider font-display font-extrabold transition-all cursor-pointer ${
                activeTab === 'site'
                  ? 'bg-brand-red text-white shadow-sm'
                  : 'bg-brand-gray-5 text-brand-gray-2 hover:bg-brand-gray-4 hover:text-brand-black'
              }`}
            >
              Halaman Website
            </button>
          </div>

          <div>
            {activeTab === 'products' ? (
              <button
                onClick={handleOpenAddProduct}
                className="bg-brand-red hover:bg-brand-red-hover text-white py-2 px-4 rounded-xl text-xs font-display font-extrabold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Tambah Produk
              </button>
            ) : activeTab === 'articles' ? (
              <button
                onClick={handleOpenAddArticle}
                className="bg-brand-red hover:bg-brand-red-hover text-white py-2 px-4 rounded-xl text-xs font-display font-extrabold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Terbitkan Artikel
              </button>
            ) : null}
          </div>
        </div>

        {/* TAB 1: MANAGE PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Search and Filter Inputs for Administrator */}
            <div className="bg-white/90 border border-brand-gray-4 rounded-2xl p-4 sm:p-5 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="relative max-w-md flex-1 text-left">
                <input
                  type="text"
                  placeholder="Cari produk berdasarkan nama, brand, atau kategori..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-white border border-brand-gray-4 p-3 pl-11 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red text-brand-gray-1 font-semibold"
                />
                <Search className="w-4.5 h-4.5 text-brand-gray-3 absolute left-4 top-3.5" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <select
                  value={productFilterBrand}
                  onChange={(e) => setProductFilterBrand(e.target.value)}
                  className="bg-white border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red text-brand-gray-1 font-semibold cursor-pointer"
                >
                  <option value="">Semua Brand</option>
                  {uniqueBrands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
                <select
                  value={productFilterCategory}
                  onChange={(e) => setProductFilterCategory(e.target.value)}
                  className="bg-white border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red text-brand-gray-1 font-semibold cursor-pointer"
                >
                  <option value="">Semua Kategori</option>
                  {uniqueCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              </div>
            </div>

            {/* List Table container */}
            <div className="bg-white border border-brand-gray-4 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-gray-5 border-b border-brand-gray-4 text-brand-gray-2 text-[10px] font-black uppercase tracking-widest">
                          <th className="py-4 px-6">Nama Alat &amp; Seri</th>
                      <th className="py-4 px-6 w-32">Pabrikan</th>
                      <th className="py-4 px-6 w-36">Kategori</th>
                      <th className="py-4 px-6 w-40">Estimasi Jual / Sewa</th>
                      <th className="py-4 px-6 w-28 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-gray-4 text-xs font-medium text-brand-gray-1">
                    {dispProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-brand-red-pale/20 transition-colors">
                        <td className="py-4 px-6">
                          <span className="font-display font-black text-brand-black block text-sm">{p.name}</span>
                          <span className="text-[10px] text-brand-gray-2 block mt-0.5 line-clamp-1">{p.description}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="bg-brand-gray-5 border border-brand-gray-4 px-2.5 py-1 rounded text-[10px] font-extrabold uppercase text-brand-black">{p.brand}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-[10px] font-black uppercase text-brand-red tracking-wider">{p.category}</span>
                        </td>
                        <td className="py-4 px-6 font-semibold text-brand-black">
                          {p.priceRange || 'Hubungi Sales'}
                        </td>
                        <td className="py-4 px-6 flex justify-center items-center gap-2">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="bg-brand-gray-5 hover:bg-brand-black text-brand-gray-1 hover:text-white p-2 border border-brand-gray-4 rounded-lg transition-colors cursor-pointer"
                            title="Edit data alat"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="bg-rose-50 hover:bg-brand-red text-brand-red hover:text-white p-2 border border-rose-100 rounded-lg transition-colors cursor-pointer"
                            title="Hapus alat dari katalog"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {dispProducts.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-12 px-6 text-center text-brand-gray-2 italic font-semibold">
                          Tidak ada produk survey ditemukan yang cocok dengan kriteria pencarian "{productSearch}".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: MANAGE SITE CONTENT */}
        {activeTab === 'site' && (
          <AdminSiteContent
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
            showNotif={showNotif}
          />
        )}

        {/* TAB 2: MANAGE ARTICLES */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            
            {/* Search Input for Article */}
            <div className="bg-white/90 border border-brand-gray-4 rounded-2xl p-4 shadow-sm">
              <div className="relative max-w-md text-left">
                <input
                  type="text"
                  placeholder="Cari artikel ilmiah, tips, kategori..."
                  value={articleSearch}
                  onChange={(e) => setArticleSearch(e.target.value)}
                  className="w-full bg-white border border-brand-gray-4 p-3 pl-11 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red text-brand-gray-1 font-semibold"
                />
                <Search className="w-4.5 h-4.5 text-brand-gray-3 absolute left-4 top-3.5" />
              </div>
            </div>

            {/* Table Container */}
            <div className="bg-white border border-brand-gray-4 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-gray-5 border-b border-brand-gray-4 text-brand-gray-2 text-[10px] font-black uppercase tracking-widest">
                      <th className="py-4 px-6">Judul Artikel &amp; Blog</th>
                      <th className="py-4 px-6 w-36">Kategori</th>
                      <th className="py-4 px-6 w-32">Tanggal</th>
                      <th className="py-4 px-6 w-40">Penulis</th>
                      <th className="py-4 px-6 w-28 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-gray-4 text-xs font-medium text-brand-gray-1">
                    {dispArticles.map((a) => (
                      <tr key={a.id} className="hover:bg-brand-red-pale/20 transition-colors">
                        <td className="py-4 px-6">
                          <span className="font-display font-black text-brand-black block text-sm leading-snug line-clamp-1">{a.title}</span>
                          <span className="text-[10px] text-brand-gray-2 block mt-0.5 line-clamp-1">{a.excerpt}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="bg-brand-red-pale text-brand-red px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider">{a.category}</span>
                        </td>
                        <td className="py-4 px-6 text-brand-gray-2">
                          {a.date}
                        </td>
                        <td className="py-4 px-6 font-semibold">
                          {a.author}
                        </td>
                        <td className="py-4 px-6 flex justify-center items-center gap-2">
                          <button
                            onClick={() => handleOpenEditArticle(a)}
                            className="bg-brand-gray-5 hover:bg-brand-black text-brand-gray-1 hover:text-white p-2 border border-brand-gray-4 rounded-lg transition-colors cursor-pointer"
                            title="Edit isi artikel"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(a.id, a.title)}
                            className="bg-rose-50 hover:bg-brand-red text-brand-red hover:text-white p-2 border border-rose-100 rounded-lg transition-colors cursor-pointer"
                            title="Hapus artikel"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {dispArticles.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-12 px-6 text-center text-brand-gray-2 italic font-semibold">
                          Tidak ada artikel yang cocok dengan pencarian "{articleSearch}".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* MODAL 1: PRODUCT EDIT/ADD FORM */}
      {isProductFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-brand-black/75 backdrop-blur-sm transition-opacity" onClick={() => setIsProductFormOpen(false)}></div>
          
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-3xl bg-white border border-brand-gray-4 p-6 sm:p-8 text-left shadow-[0_24px_90px_-25px_rgba(17,24,39,0.45)] transition-all my-6 max-w-3xl w-full">
              
              <button
                onClick={() => setIsProductFormOpen(false)}
                className="absolute right-4 top-4 sm:right-6 sm:top-6 p-2 rounded-full hover:bg-brand-gray-5 text-brand-gray-2 hover:text-brand-black transition-colors focus:outline-none cursor-pointer"
              >
                <X className="w-5.5 h-5.5" />
              </button>

              <h2 className="font-display font-black text-2xl text-brand-black border-b border-brand-gray-4 pb-4 mb-6">
                {editingProduct ? 'Edit Unit Alat Survey' : 'Tambah Unit Alat Baru'}
              </h2>

              <form onSubmit={handleSaveProduct} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-left text-[11px] font-black uppercase text-brand-gray-1 tracking-wider mb-1">Nama Alat &amp; Seri *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Contoh: Garmin GPSmap 65s GPS"
                      value={prodForm.name}
                      onChange={e => setProdForm({...prodForm, name: e.target.value})}
                      className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red font-semibold text-brand-black"
                    />
                  </div>
                  <div>
                    <label className="block text-left text-[11px] font-black uppercase text-brand-gray-1 tracking-wider mb-1">Brand / Pabrikan *</label>
                    <input 
                      type="text" 
                      required
                      list="brandList"
                      placeholder="Contoh: Topcon, Sokkia, Leica, Trimble, DJI, dll"
                      value={prodForm.brand}
                      onChange={e => setProdForm({...prodForm, brand: e.target.value})}
                      className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red font-semibold text-brand-black"
                    />
                    <datalist id="brandList">
                      {uniqueBrands.map(brand => (
                        <option key={brand} value={brand} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-left text-[11px] font-black uppercase text-brand-gray-1 tracking-wider mb-1">Kategori Alat</label>
                    <input 
                      type="text"
                      list="categoryList"
                      placeholder="Contoh: Total Station, GPS / GNSS, dll"
                      value={prodForm.category}
                      onChange={e => setProdForm({...prodForm, category: e.target.value as any})}
                      className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red font-semibold text-brand-black"
                    />
                    <datalist id="categoryList">
                      {uniqueCategories.map(cat => (
                        <option key={cat} value={cat} />
                      ))}
                    </datalist>
                  </div>
                  <div>
                    <label className="block text-left text-[11px] font-black uppercase text-brand-gray-1 tracking-wider mb-1">Kisaran Harga / Info</label>
                    <input 
                      type="text" 
                      placeholder="Rp 45.000.000 atau Hubungi Sales"
                      value={prodForm.priceRange}
                      onChange={e => setProdForm({...prodForm, priceRange: e.target.value})}
                      className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red font-semibold text-brand-black"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-left text-[11px] font-black uppercase text-brand-gray-1 tracking-wider">Foto Produk</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-left text-[10px] font-semibold text-brand-gray-2 mb-1">Opsi A: Tulis Link / URL Gambar</span>
                      <input 
                        type="text" 
                        placeholder="Contoh: https://images.unsplash.com/photo-... atau kosongkan"
                        value={prodForm.image}
                        onChange={e => setProdForm({...prodForm, image: e.target.value})}
                        className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red font-semibold text-brand-black"
                      />
                    </div>
                    <div>
                      <span className="block text-left text-[10px] font-semibold text-brand-gray-2 mb-1">Opsi B: Unggah Berkas dari Perangkat</span>
                      <div className="relative flex items-center justify-center border border-dashed border-brand-gray-3 hover:border-brand-red rounded-lg p-2 bg-brand-gray-5 h-[46px] transition-colors overflow-hidden">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={e => {
                            if (e.target.files && e.target.files[0]) {
                              handleImageUpload(e.target.files[0], 'product');
                            }
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                        />
                        <div className="text-[11px] font-bold text-brand-gray-1">
                          Pilih / Tarik Gambar Ke Sini
                        </div>
                      </div>
                    </div>
                  </div>
                  {prodForm.image && (
                    <div className="mt-2 text-left flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden border border-brand-gray-4 bg-brand-gray-5">
                        <img src={prodForm.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-xs">
                        <span className="text-[10px] font-black text-brand-gray-2 uppercase block">Preview Aktif</span>
                        <button
                          type="button"
                          onClick={() => setProdForm({...prodForm, image: ''})}
                          className="text-brand-red hover:underline font-extrabold text-[10px] uppercase cursor-pointer"
                        >
                          Hapus Foto
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-left text-[11px] font-black uppercase text-brand-gray-1 tracking-wider mb-1">Deskripsi Pemasaran</label>
                  <textarea 
                    rows={3}
                    placeholder="Tuliskan ulasan ringkas mengenai alat, ketahanan fisik, ketelitian pengukuran, dan wilayah target survei proyek..."
                    value={prodForm.description}
                    onChange={e => setProdForm({...prodForm, description: e.target.value})}
                    className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red text-brand-black font-medium"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-left text-[11px] font-black uppercase text-brand-gray-1 tracking-wider mb-1">Spesifikasi Teknis (Satu per baris)</label>
                    <textarea 
                      rows={5}
                      placeholder="Akurasi Sudut: 2 detik&#10;Jangkauan Teropong: 3.5 km&#10;Baterai lithium rechargeable"
                      value={prodForm.specsText}
                      onChange={e => setProdForm({...prodForm, specsText: e.target.value})}
                      className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 text-[11px] rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red text-brand-black font-mono leading-relaxed"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-left text-[11px] font-black uppercase text-brand-gray-1 tracking-wider mb-1">Kelebihan Fitur Utama (Satu per baris)</label>
                    <textarea 
                      rows={5}
                      placeholder="Kompensator magnetik ultra-stabil&#10;Sertifikat IP66 anti debu udara&#10;Port transfer data via Flaskdisk USB"
                      value={prodForm.featuresText}
                      onChange={e => setProdForm({...prodForm, featuresText: e.target.value})}
                      className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 text-[11px] rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red text-brand-black font-mono leading-relaxed"
                    ></textarea>
                  </div>
                </div>

                <div className="border-t border-brand-gray-4 pt-5 mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => { setIsProductFormOpen(false); setEditingProduct(null); }}
                    className="bg-brand-gray-5 hover:bg-brand-gray-4 text-brand-gray-1 border border-brand-gray-4 py-3 px-6 rounded-lg text-xs font-bold tracking-wide transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-red hover:bg-brand-red-hover text-white py-3 px-8 rounded-lg text-xs font-display font-black uppercase tracking-wider flex items-center gap-1.5 shadow cursor-pointer"
                  >
                    <Save className="w-4.5 h-4.5" />
                    Simpan Alat Survey
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ARTICLE EDIT/ADD FORM */}
      {isArticleFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-brand-black/75 backdrop-blur-sm transition-opacity" onClick={() => setIsArticleFormOpen(false)}></div>
          
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-3xl bg-white border border-brand-gray-4 p-6 sm:p-8 text-left shadow-[0_24px_90px_-25px_rgba(17,24,39,0.45)] transition-all my-6 max-w-3xl w-full">
              
              <button
                onClick={() => setIsArticleFormOpen(false)}
                className="absolute right-4 top-4 sm:right-6 sm:top-6 p-2 rounded-full hover:bg-brand-gray-5 text-brand-gray-2 hover:text-brand-black transition-colors focus:outline-none cursor-pointer"
              >
                <X className="w-5.5 h-5.5" />
              </button>

              <h2 className="font-display font-black text-2xl text-brand-black border-b border-brand-gray-4 pb-4 mb-6">
                {editingArticle ? 'Edit Artikel Edukasi' : 'Tulis Artikel Komparasi / Baru'}
              </h2>

              <form onSubmit={handleSaveArticle} className="space-y-5">
                
                <div>
                  <label className="block text-left text-[11px] font-black uppercase text-brand-gray-1 tracking-wider mb-1">Judul Utama Berita / Artikel *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: 5 Tips Mengenal Koordinat Geodetis"
                    value={artForm.title}
                    onChange={e => setArtForm({...artForm, title: e.target.value})}
                    className="w-full bg-brand-gray-5 border border-brand-gray-2/20 p-3.5 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red font-semibold text-brand-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-left text-[11px] font-black uppercase text-brand-gray-1 tracking-wider mb-1">Kategori Artikel</label>
                    <select
                      value={artForm.category}
                      onChange={e => setArtForm({...artForm, category: e.target.value as any})}
                      className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red font-semibold text-brand-black"
                    >
                      <option value="Teknologi">Teknologi</option>
                      <option value="Tips">Tips &amp; Trik</option>
                      <option value="Edukasi">Edukasi Teori</option>
                      <option value="Produk">Ulasan Produk</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-left text-[11px] font-black uppercase text-brand-gray-1 tracking-wider mb-1">Tanggal Terbit</label>
                    <input 
                      type="text" 
                      placeholder="Hari, Tanggal Bulan Tahun"
                      value={artForm.date}
                      onChange={e => setArtForm({...artForm, date: e.target.value})}
                      className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red font-semibold text-brand-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-left text-[11px] font-black uppercase text-brand-gray-1 tracking-wider mb-1">Penulis (Author)</label>
                    <input 
                      type="text" 
                      placeholder="Tim Litbang Geometri"
                      value={artForm.author}
                      onChange={e => setArtForm({...artForm, author: e.target.value})}
                      className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red font-semibold text-brand-black"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-left text-[11px] font-black uppercase text-brand-gray-1 tracking-wider">Foto Artikel</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-left text-[10px] font-semibold text-brand-gray-2 mb-1">Opsi A: Tulis Link / URL Gambar</span>
                      <input 
                        type="text" 
                        placeholder="Contoh: https://images.unsplash.com/photo-... atau kosongkan"
                        value={artForm.image}
                        onChange={e => setArtForm({...artForm, image: e.target.value})}
                        className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red font-semibold text-brand-black"
                      />
                    </div>
                    <div>
                      <span className="block text-left text-[10px] font-semibold text-brand-gray-2 mb-1">Opsi B: Unggah Berkas dari Perangkat</span>
                      <div className="relative flex items-center justify-center border border-dashed border-brand-gray-3 hover:border-brand-red rounded-lg p-2 bg-brand-gray-5 h-11.5 transition-colors overflow-hidden">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={e => {
                            if (e.target.files && e.target.files[0]) {
                              handleImageUpload(e.target.files[0], 'article');
                            }
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                        />
                        <div className="text-[11px] font-bold text-brand-gray-1">
                          Pilih / Tarik Gambar Ke Sini
                        </div>
                      </div>
                    </div>
                  </div>
                  {artForm.image && (
                    <div className="mt-2 text-left flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden border border-brand-gray-4 bg-brand-gray-5">
                        <img src={artForm.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-xs">
                        <span className="text-[10px] font-black text-brand-gray-2 uppercase block">Preview Aktif</span>
                        <button
                          type="button"
                          onClick={() => setArtForm({...artForm, image: ''})}
                          className="text-brand-red hover:underline font-extrabold text-[10px] uppercase cursor-pointer"
                        >
                          Hapus Foto
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-left text-[11px] font-black uppercase text-brand-gray-1 tracking-wider mb-1">Rangkuman Singkat (Excerpt)</label>
                  <textarea 
                    rows={2}
                    placeholder="Tuliskan 1-2 kalimat pemikat yang meringkas isi berita untuk pemirsa umum..."
                    value={artForm.excerpt}
                    onChange={e => setArtForm({...artForm, excerpt: e.target.value})}
                    className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red text-brand-black font-medium"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-left text-[11px] font-black uppercase text-brand-gray-1 tracking-wider mb-1">Isi Konten Artikel Lengkap</label>
                  <textarea 
                    rows={8}
                    placeholder="Tuliskan seluruh isi artikel ilmiah di sini. Pisahkan dengan jeda spasi baris untuk menetapkan paragraph baru. Gunakan ### untuk menyisipkan subjudul bagian terperinci."
                    value={artForm.content}
                    onChange={e => setArtForm({...artForm, content: e.target.value})}
                    className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3.5 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red text-brand-black font-medium leading-relaxed"
                  ></textarea>
                </div>

                <div className="border-t border-brand-gray-4 pt-5 mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => { setIsArticleFormOpen(false); setEditingArticle(null); }}
                    className="bg-brand-gray-5 hover:bg-brand-gray-4 text-brand-gray-1 border border-brand-gray-4 py-3 px-6 rounded-lg text-xs font-bold tracking-wide transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-red hover:bg-brand-red-hover text-white py-3 px-8 rounded-lg text-xs font-display font-black uppercase tracking-wider flex items-center gap-1.5 shadow cursor-pointer"
                  >
                    <Save className="w-4.5 h-4.5" />
                    Terbitkan Artikel Baru
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
