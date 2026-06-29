import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Phone, ChevronLeft, ChevronRight, MapPin, Building2 } from 'lucide-react';
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

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      className="relative min-h-[72vh] flex items-center overflow-hidden"
    >

      {/* Background image — zoomed out */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/img/bg-hero.jpg"
          alt=""
          aria-hidden="true"
          className="absolute w-full h-full"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scale(0.85)',
            transformOrigin: 'center center',
            minWidth: '120%',
            minHeight: '120%',
            top: '50%',
            left: '50%',
            translate: '-50% -50%',
          }}
        />
      </div>

      {/* Subtle dark vignette */}
      <div className="absolute inset-0 bg-brand-black/25 pointer-events-none z-[1]" />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 sm:px-8 lg:px-10 xl:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — text content */}
          <div className="flex flex-col items-start text-left">

            {/* Branch badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-white text-brand-red px-4 py-1.5 rounded-full font-display font-black text-xs uppercase tracking-widest shadow-md">
                <Building2 className="w-3.5 h-3.5" />
                Cabang Papua
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white px-3.5 py-1.5 rounded-full font-display font-semibold text-xs uppercase tracking-wider backdrop-blur-sm">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                Jayapura · Abepura
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-[3.25rem] text-white leading-[1.08] tracking-tight mb-4">
              {hero.headlineLine1}
              <span className="block mt-1.5 relative">
                {hero.headlineLine2}
                <span className="absolute -bottom-2 left-0 h-1 w-20 bg-white/50 rounded-full hidden lg:block" />
              </span>
            </h1>

            {/* Tagline */}
            <div className="border-l-4 border-white/40 pl-4 mt-5 mb-5">
              <p className="text-white/75 font-display font-bold text-xs uppercase tracking-[0.15em]">
                {hero.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-white/80 text-sm leading-relaxed max-w-md mb-8">
              Cabang Papua siap melayani Anda di Jayapura &amp; sekitarnya.
              Jual Alat Bergaransi · Sewa &amp; Rental · Servis Tersertifikasi · Kalibrasi KAN · Jasa Mapping Udara.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => navigate('product')}
                className={cn(
                  'bg-white hover:bg-brand-gray-5 text-brand-red',
                  'px-6 py-2.5 rounded-lg shadow-lg shadow-brand-black/20',
                  'font-display font-extrabold text-sm uppercase tracking-wider',
                  'flex items-center gap-2',
                  'transition-all duration-200 hover:-translate-y-0.5 cursor-pointer'
                )}>
                <Grid className="w-4 h-4" />
                Lihat Katalog
              </button>
              <button
                onClick={() => navigate('contact')}
                className={cn(
                  'border-2 border-white/60 hover:border-white hover:bg-white/10',
                  'text-white px-6 py-2.5 rounded-lg',
                  'font-display font-extrabold text-sm uppercase tracking-wider',
                  'flex items-center gap-2',
                  'transition-all duration-200 hover:-translate-y-0.5 cursor-pointer'
                )}>
                <Phone className="w-4 h-4" />
                Konsultasi Gratis
              </button>
            </div>

            {/* Address */}
            <div className="flex items-start gap-2 text-white/50 text-xs font-medium leading-relaxed">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              <span>Jl. Kakatua No.Blok 6, Wai Mhorock, Abepura, Jayapura — Papua 99225</span>
            </div>

          </div>

          {/* RIGHT — image slideshow */}
          <div className="relative flex flex-col items-center">

            {/* Glassmorphism frame wrapper */}
            <div
              className="relative w-full max-w-[28rem] mx-auto p-3 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,0.12) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.25)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(255,255,255,0.08)',
              }}
            >
              {/* Subtle inner shimmer top edge */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full" />

            {/* Slide container */}
            <div className="relative w-full rounded-2xl shadow-xl shadow-brand-black/40 overflow-hidden bg-brand-black">

              {/* Slide counter — top right corner */}
              <div className="absolute top-3 right-3 z-20 bg-brand-black/55 backdrop-blur-sm rounded-full px-3 py-1 border border-white/15">
                <span className="text-white text-xs font-display font-bold tabular-nums">
                  {current + 1} / {slides.length}
                </span>
              </div>

              {slides.map((slide, i) => (
                <div
                  key={slide.id}
                  className={cn(
                    'w-full transition-all duration-700 ease-in-out',
                    i === current
                      ? 'opacity-100 scale-100 z-10 relative'
                      : 'opacity-0 scale-105 z-0 absolute inset-0'
                  )}>
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                  {slide.caption && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-brand-black/75 to-transparent px-5 py-4">
                      <p className="text-white font-display font-bold text-sm uppercase tracking-wider">
                        {slide.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {/* Nav arrows */}
              {slides.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous slide"
                    className={cn(
                      'absolute left-3 top-1/2 -translate-y-1/2 z-20',
                      'w-9 h-9 rounded-full bg-brand-black/35 hover:bg-brand-black/60 backdrop-blur-sm',
                      'flex items-center justify-center text-white border border-white/20',
                      'transition-all duration-200 cursor-pointer'
                    )}>
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next slide"
                    className={cn(
                      'absolute right-3 top-1/2 -translate-y-1/2 z-20',
                      'w-9 h-9 rounded-full bg-brand-black/35 hover:bg-brand-black/60 backdrop-blur-sm',
                      'flex items-center justify-center text-white border border-white/20',
                      'transition-all duration-200 cursor-pointer'
                    )}>
                    <ChevronRight className="size-4" />
                  </button>
                </>
              )}
            </div>

            {/* Dot indicators — inside glass frame */}
            {slides.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-3 pb-1">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={cn(
                      'rounded-full transition-all duration-300 cursor-pointer',
                      i === current
                        ? 'w-7 h-2 bg-white'
                        : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                    )}
                  />
                ))}
              </div>
            )}

            </div>{/* end glassmorphism wrapper */}

          </div>

        </div>
      </div>

    </section>
  );
}