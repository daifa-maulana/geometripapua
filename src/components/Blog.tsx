import React, { useState } from 'react';
import { ARTICLES } from '../data';
import { Article } from '../types';
import { Search, Calendar, User, Tag, ArrowRight, BookOpen, X, Sparkles } from 'lucide-react';

const ARTICLE_CATEGORY_IMAGES: Record<string, string> = {
  'Teknologi': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
  'Tips': 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800',
  'Edukasi': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
  'Produk': 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?w=800'
};

interface BlogProps {
  articles?: Article[];
}

export default function Blog({ articles }: BlogProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = ['Semua', 'Teknologi', 'Tips', 'Edukasi'];

  const displayArticles = articles !== undefined ? articles : ARTICLES;

  const filteredArticles = displayArticles.filter((art) => {
    const matchesCategory = activeCategory === 'Semua' || art.category === activeCategory;
    const matchesSearch = 
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenArticle = (art: Article) => {
    setSelectedArticle(art);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="w-full relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 page-enter page-enter-active section-surface brand-pattern-subtle">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="border-b border-brand-gray-4 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-left">
          <div className="space-y-2">
            <h1 className="font-display font-black text-3xl sm:text-4xl text-brand-black tracking-tight leading-none pt-4">
              Blog Edukasi Juru Ukur
            </h1>
          </div>
          <p className="text-xs text-brand-gray-2 max-w-sm leading-relaxed">
            Tips praktis merawat total station, mengoperasikan drone RTK, dan memahami standardisasi kalibrasi internasional secara gratis dari ahlinya.
          </p>
        </div>

        {/* Filters and Search toolbar */}
        <div className="bg-brand-gray-5 border border-brand-gray-4 rounded-xl p-5 mb-10 flex flex-col lg:flex-row gap-4 items-center">
          
          <div className="relative w-full lg:w-1/3 text-left">
            <input
              type="text"
              placeholder="Cari berita atau artikel ilmiah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-brand-gray-4 p-3.5 pl-11 text-xs rounded-lg focus:border-brand-red focus:outline-none"
            />
            <Search className="w-4 h-4 text-brand-gray-3 absolute left-4 top-4" />
          </div>

          <div className="flex gap-2 overflow-x-auto w-full lg:w-2/3 no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-2 px-4 rounded-md text-xs font-display font-extrabold uppercase tracking-wider cursor-pointer whitespace-nowrap border transition-colors ${
                  activeCategory === cat
                    ? 'bg-brand-red border-brand-red text-white'
                    : 'bg-white border-brand-gray-4 text-brand-gray-1 hover:border-brand-red'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Articles List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => handleOpenArticle(art)}
              className="bg-white border border-brand-gray-4 hover:border-brand-red rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="h-44 bg-brand-gray-5 flex items-center justify-center text-6xl relative border-b border-brand-gray-4 select-none overflow-hidden">
                  <img 
                    src={art.image || ARTICLE_CATEGORY_IMAGES[art.category] || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800'} 
                    alt={art.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-brand-red text-white text-[9px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider">
                    {art.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-[10px] text-brand-gray-2 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-red" />
                      {art.date}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-brand-red" />
                      Oleh: {art.author.split(' ')[0]}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-brand-black text-base leading-tight group-hover:text-brand-red transition-colors line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-brand-gray-2 leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenArticle(art);
                  }}
                  className="text-xs font-display font-black text-brand-red uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer bg-transparent border-0"
                >
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </article>
          ))}

          {filteredArticles.length === 0 && (
            <div className="col-span-full text-center py-20 border border-dashed border-brand-gray-4 bg-brand-gray-5/40 rounded-xl space-y-4">
              <span className="text-4xl block">📚</span>
              <h4 className="font-display font-black text-lg text-brand-gray-1">Tidak ada artikel edukasi ditemukan</h4>
              <p className="text-xs text-brand-gray-2 max-w-sm mx-auto">Silakan kosongkan filter pencarian Anda atau kembalilah di lain hari.</p>
              <button 
                onClick={() => { setSearchTerm(''); setActiveCategory('Semua'); }}
                className="bg-brand-black hover:bg-brand-red text-white py-2 px-4 rounded text-xs font-bold"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* 3. FULL ARTICLE READER OVERLAY MODAL */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
            {/* Background backdrop blur */}
            <div className="fixed inset-0 bg-brand-black/80 backdrop-blur-sm transition-opacity" onClick={handleCloseArticle}></div>

            {/* Reading Box Modal */}
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="relative transform overflow-hidden rounded-2xl bg-white border border-brand-gray-3 p-6 sm:p-10 text-left shadow-2xl transition-all my-8 max-w-3xl w-full">
                
                {/* Close Button top-right */}
                <button
                  onClick={handleCloseArticle}
                  className="absolute right-4 top-4 sm:right-6 sm:top-6 p-2 rounded-full hover:bg-brand-gray-5 text-brand-gray-2 hover:text-brand-black transition-colors focus:outline-none cursor-pointer"
                  aria-label="Tutup"
                >
                  <X className="w-5.5 h-5.5" />
                </button>

                {/* Article Header */}
                <div className="space-y-4 border-b border-brand-gray-4 pb-6 mb-6">
                  
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-red">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Portal Geodesi &bull; {selectedArticle.category}</span>
                  </div>

                  <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-black leading-tight tracking-tight">
                    {selectedArticle.title}
                  </h2>

                  <div className="flex items-center gap-4 text-xs text-brand-gray-2 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-brand-red" />
                      {selectedArticle.date}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4 text-brand-red" />
                      Penulis: {selectedArticle.author}
                    </span>
                  </div>

                </div>

                {/* Visual Cover Banner */}
                <div className="w-full h-48 sm:h-60 rounded-xl overflow-hidden mb-6 border border-brand-gray-4 bg-brand-gray-5">
                  <img 
                    src={selectedArticle.image || ARTICLE_CATEGORY_IMAGES[selectedArticle.category] || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800'} 
                    alt={selectedArticle.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Content formatted text */}
                <div className="text-sm text-brand-gray-1 leading-relaxed space-y-4 max-h-[50vh] overflow-y-auto pr-3 no-scrollbar prose prose-slate">
                  {selectedArticle.content.split('\n\n').map((para, i) => {
                    if (para.startsWith('###')) {
                      return (
                        <h4 key={i} className="font-display font-black text-base text-brand-black uppercase tracking-wide pt-4 border-l-2 border-brand-red pl-2.5">
                          {para.replace('###', '').trim()}
                        </h4>
                      );
                    }
                    if (para.startsWith('-') || para.startsWith('*')) {
                      // list items parsing
                      return (
                        <ul key={i} className="list-disc pl-5 space-y-2 mt-2">
                          {para.split('\n').map((li, idx) => (
                            <li key={idx} className="text-xs">{li.replace(/^[\s-*]+/, '').trim()}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (para.match(/^\d+\./)) {
                      return (
                        <ol key={i} className="list-decimal pl-5 space-y-2 mt-2">
                          {para.split('\n').map((li, idx) => (
                            <li key={idx} className="text-xs">{li.replace(/^\s*\d+\.\s*/, '').trim()}</li>
                          ))}
                        </ol>
                      );
                    }

                    return <p key={i}>{para}</p>;
                  })}
                </div>

                {/* Reader Footer action block */}
                <div className="border-t border-brand-gray-4 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-brand-gray-5 p-5 rounded-lg">
                  <div className="flex gap-2 items-center text-center sm:text-left">
                    <Sparkles className="w-4.5 h-4.5 text-brand-red flex-shrink-0 animate-spin" />
                    <div>
                      <strong className="text-xs font-black uppercase text-brand-black block">Bagikan Ilmu Pemetaan Ini:</strong>
                      <span className="text-[10px] text-brand-gray-2 block">Dukung sesama juru ukur tanah Indonesia</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const shareText = `Baca "${selectedArticle.title}" oleh ${selectedArticle.author} di Geometri Bandung`;
                      navigator.clipboard.writeText(`${shareText}\nhttps://geo-metri.com`);
                      alert('Teks tautan artikel berhasil disalin ke clipboard!');
                    }}
                    className="bg-brand-black hover:bg-brand-red text-white py-2 px-5 rounded font-display font-extrabold text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Salin Link Artikel
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
