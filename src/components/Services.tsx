import React, { useEffect, useRef, useState } from 'react';
import { ServiceDetail, SiteSettings } from '../types';

interface ServicesProps {
  services: ServiceDetail[];
  siteSettings: SiteSettings;
}

export default function Services({ services, siteSettings }: ServicesProps) {
  const [activeId, setActiveId] = useState<string>(services[0]?.id || '');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const isClickScrolling = useRef(false);

  const scrollToService = (id: string) => {
    isClickScrolling.current = true;
    setActiveId(id);
    const el = document.getElementById(`service-${id}`);
    if (el) {
      const offset = 96;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    // Re-enable scrollspy updates shortly after the smooth scroll settles
    window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);
  };

  const toggleExpanded = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Scrollspy: highlight the sidebar item matching the section currently in view
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;

    const sections = services
      .map((service) => document.getElementById(`service-${service.id}`))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.id.replace('service-', '');
          setActiveId(id);
        }
      },
      {
        root: null,
        rootMargin: '-120px 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [services]);

  if (!services.length) {
    return (
      <div className="w-full py-20 text-center text-brand-gray-2 text-sm">
        Belum ada layanan. Tambahkan melalui Admin &rarr; Halaman Website &rarr; Layanan.
      </div>
    );
  }

  return (
    <div className="w-full relative py-10 px-4 sm:px-6 lg:px-8 xl:px-12 page-enter page-enter-active section-surface brand-pattern-subtle">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.35em] text-brand-red font-black mb-3">
            Solusi Survey & Geospasial
          </p>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-brand-black tracking-tight leading-tight">
            {siteSettings.servicesPage.pageTitle}
          </h1>
          <p className="mt-4 text-sm text-brand-gray-2 leading-relaxed max-w-2xl mx-auto">
            {siteSettings.servicesPage.pageSubtitle}
          </p>
        </header>

        {/* MOBILE: card list, tap to expand detail inline */}
        <div className="lg:hidden space-y-4">
          {services.map((service) => (
            <div key={service.id}>
              <article
                role="button"
                tabIndex={0}
                onClick={() => toggleExpanded(service.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpanded(service.id);
                  }
                }}
                className={`rounded-[28px] border bg-white shadow-sm overflow-hidden cursor-pointer transition-shadow ${
                  expandedId === service.id
                    ? 'border-brand-red shadow-[0_12px_45px_rgba(220,38,38,0.14)]'
                    : 'border-brand-gray-4'
                }`}
              >
                <div className="relative overflow-hidden bg-brand-red/95 h-64 sm:h-72">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/90 bg-black/20 px-2 py-1 rounded-full">
                    {service.num}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-black text-lg text-brand-black leading-snug">
                    {service.title}
                  </h3>
                </div>
              </article>

              {expandedId === service.id && (
                <div className="mt-3 rounded-[28px] border border-brand-gray-4/75 bg-white p-5 text-sm text-brand-gray-1 shadow-sm">
                  <p className="leading-relaxed mb-4">{service.description}</p>
                  <div className="space-y-3 mb-5">
                    {service.bullets.map((bullet, index) => (
                      <div key={index} className="rounded-2xl border border-brand-gray-4/75 bg-brand-gray-5/70 p-3">
                        <span className="block text-[10px] font-black uppercase tracking-[0.28em] text-brand-red mb-1">
                          {`0${index + 1}`}
                        </span>
                        <p>{bullet}</p>
                      </div>
                    ))}
                  </div>
                  <a
                    href={`https://wa.me/6285135716279?text=Halo%20Geometri%20Papua,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-xs uppercase tracking-wider px-5 py-3 shadow-sm transition-colors"
                  >
                    Konsultasi via WA
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* DESKTOP: sidebar + sticky-image sections */}
        <div className="hidden lg:grid grid-cols-[260px_1fr] gap-8">
          <aside>
            <div className="sticky top-24 bg-white border border-brand-gray-4 rounded-[28px] p-6 shadow-sm">
              <h2 className="font-display font-black text-lg text-brand-black mb-4">
                Daftar Layanan
              </h2>
              <div className="h-px bg-brand-gray-4 mb-4" />
              <nav className="space-y-1">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => scrollToService(service.id)}
                    className={`w-full flex items-center gap-2 text-left text-sm font-semibold py-2 px-2 rounded-xl transition-colors ${
                      activeId === service.id
                        ? 'text-brand-red bg-brand-red/5'
                        : 'text-brand-gray-1 hover:bg-brand-gray-5'
                    }`}
                  >
                    <span className="text-brand-red">&rsaquo;</span>
                    {service.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <div>
            {services.map((service, index) => (
              <section
                key={service.id}
                id={`service-${service.id}`}
                className={`grid grid-cols-2 gap-10 py-8 ${
                  index !== services.length - 1 ? 'border-b border-brand-gray-4' : ''
                }`}
              >
                <div className="sticky top-24 self-start">
                  <div className="relative rounded-[28px] overflow-hidden bg-brand-red/95 shadow-sm h-[420px]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-[28px] border border-brand-gray-4 shadow-sm p-8">
                  <span className="inline-block text-[10px] font-black uppercase tracking-[0.28em] text-brand-red bg-brand-red/10 rounded-full px-3 py-1 mb-4">
                    Layanan Kami
                  </span>
                  <h2 className="font-display font-black text-3xl text-brand-black leading-tight mb-4">
                    {service.title}
                  </h2>
                  <p className="text-sm text-brand-gray-2 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {service.bullets.map((bullet, bIndex) => (
                      <div
                        key={bIndex}
                        className="rounded-2xl border border-brand-gray-4/75 bg-brand-gray-5/70 p-3 text-sm text-brand-gray-1"
                      >
                        <span className="block text-[10px] font-black uppercase tracking-[0.28em] text-brand-red mb-1">
                          {`0${bIndex + 1}`}
                        </span>
                        <p>{bullet}</p>
                      </div>
                    ))}
                  </div>

                  <a
                    href={`https://wa.me/6285135716279?text=Halo%20Geometri%20Papua,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-xs uppercase tracking-wider px-5 py-3 shadow-sm transition-colors"
                  >
                    Konsultasi via WA
                  </a>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}