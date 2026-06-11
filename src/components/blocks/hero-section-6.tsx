import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { HeroContent } from '../../types';

interface HeroSectionProps {
  setCurrentPage?: (page: string) => void;
  hero: HeroContent;
}

export function HeroSection({ setCurrentPage, hero }: HeroSectionProps) {
  const slides = hero.slides.length > 0 ? hero.slides : [{
    id: 1,
    src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    alt: 'Surveyors di lapangan',
    caption: 'Layanan Survey',
  }];
  const [email, setEmail] = useState('');
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigate = (page: string) => {
    if (setCurrentPage) setCurrentPage(page);
  };

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo, slides.length]);

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative overflow-hidden min-h-[88vh] flex items-center bg-brand-red">

      {/* ── Brand geometric pattern overlay (white strokes, visible on red) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 100 100'%3E%3Cg fill='none' stroke='%23FFFFFF' stroke-width='1.6' stroke-opacity='0.12'%3E%3Cpath d='M 50 4 L 63.5 17.5 L 82.5 17.5 L 82.5 36.5 L 96 50 L 82.5 63.5 L 82.5 82.5 L 63.5 82.5 L 50 96 L 36.5 82.5 L 17.5 82.5 L 17.5 63.5 L 4 50 L 17.5 36.5 L 17.5 17.5 L 36.5 17.5 Z'/%3E%3Cpath d='M 50 11 L 61 22 L 77 22 L 77 38 L 88 50 L 77 62 L 77 77 L 61 77 L 50 88 L 39 77 L 23 77 L 23 62 L 12 50 L 23 38 L 23 23 L 38 23 Z'/%3E%3Cpath d='M 41.5 22.5 L 41.5 41.5 L 50 41.5 M 77.5 41.5 L 58.5 41.5 L 58.5 50 M 58.5 77.5 L 58.5 58.5 L 50 58.5 M 22.5 58.5 L 41.5 58.5 L 41.5 50'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* ── Soft dark vignette so text pops ── */}
      <div className="absolute inset-0 bg-brand-black/15 pointer-events-none z-[1]" />


      {/* ── Content grid ── */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 sm:px-8 lg:px-12 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ════════════════════════
              LEFT — text content
          ════════════════════════ */}
          <div className="flex flex-col items-start text-left">

            {/* Badge removed per request */}

            {/* Headline */}
            <h1 className="font-display font-black text-4xl sm:text-5xl xl:text-6xl text-white leading-[1.05] tracking-tight text-balance">
              {hero.headlineLine1}
              <span className="block text-white relative mt-2">
                {hero.headlineLine2}
                <span className="absolute -bottom-2 left-0 h-1.5 w-24 bg-white/60 rounded-full hidden lg:block" />
              </span>
            </h1>

            {/* Tagline bar */}
            <div className="border-l-4 border-white/50 pl-4 mt-6 mb-6">
              <p className="text-white/80 font-display font-black text-sm uppercase tracking-widest">
                {hero.tagline}
              </p>
            </div>

            {/* Sub */}
            <p className="text-white/80 text-base leading-relaxed max-w-lg mb-8">
              {hero.description}
            </p>

            {/* Email form removed per request */}

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => navigate('product')}
                className={cn(
                  'bg-white hover:bg-brand-gray-5 text-brand-red px-6 py-3.5 rounded-xl',
                  'font-display font-extrabold text-sm uppercase tracking-wider',
                  'flex items-center gap-2 shadow-lg shadow-brand-black/20',
                  'transition-all duration-200 hover:-translate-y-0.5 cursor-pointer'
                )}>
                <Grid className="w-4 h-4" />
                Lihat Katalog
              </button>
              <button
                onClick={() => navigate('contact')}
                className={cn(
                  'bg-transparent hover:bg-white/10 border-2 border-white/60 hover:border-white',
                  'text-white px-6 py-3.5 rounded-xl',
                  'font-display font-extrabold text-sm uppercase tracking-wider',
                  'flex items-center gap-2 transition-all duration-200 cursor-pointer'
                )}>
                <Phone className="w-4 h-4" />
                Konsultasi Gratis
              </button>
            </div>

            {/* Stats strip removed per request */}

          </div>

          {/* ════════════════════════
              RIGHT — image slideshow
          ════════════════════════ */}
          <div className="relative flex flex-col items-center">

            {/* Slideshow frame */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-brand-black/40 border border-white/20">

              {/* Slides */}
              {slides.map((slide, i) => (
                <div
                  key={slide.id}
                  className={cn(
                    'absolute inset-0 transition-all duration-700 ease-in-out',
                    i === current
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-0 scale-105 z-0'
                  )}>
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                  {/* Caption overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-brand-black/70 to-transparent px-6 py-5">
                    <p className="text-white font-display font-extrabold text-sm uppercase tracking-wider">
                      {slide.caption}
                    </p>
                  </div>
                </div>
              ))}

              {/* Prev / Next arrows */}
              <button
                onClick={prev}
                aria-label="Previous slide"
                className={cn(
                  'absolute left-3 top-1/2 -translate-y-1/2 z-20',
                  'w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm',
                  'flex items-center justify-center text-white border border-white/30',
                  'transition-all duration-200 cursor-pointer'
                )}>
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next slide"
                className={cn(
                  'absolute right-3 top-1/2 -translate-y-1/2 z-20',
                  'w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm',
                  'flex items-center justify-center text-white border border-white/30',
                  'transition-all duration-200 cursor-pointer'
                )}>
                <ChevronRight className="size-5" />
              </button>

              {/* Slide counter badge */}
              <div className="absolute top-4 right-4 z-20 bg-brand-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                <span className="text-white text-xs font-display font-extrabold">
                  {current + 1} / {slides.length}
                </span>
              </div>
            </div>

            {/* Dot navigation */}
            <div className="flex items-center gap-2.5 mt-5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={cn(
                    'rounded-full transition-all duration-300 cursor-pointer border border-white/30',
                    i === current
                      ? 'w-8 h-2.5 bg-white'
                      : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                  )}
                />
              ))}
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2 mt-4 w-full">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => goTo(i)}
                  className={cn(
                    'flex-1 aspect-video rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer',
                    i === current
                      ? 'border-white shadow-lg scale-105'
                      : 'border-white/20 opacity-60 hover:opacity-80 hover:border-white/50'
                  )}>
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

          </div>
          {/* end right column */}

        </div>
      </div>

    </section>
  );
}
