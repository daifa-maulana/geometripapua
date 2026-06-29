import {
  SiteSettings,
  ServiceDetail,
  Branch,
  Project,
} from '../types';
import { BRANDS, PARTNERS, SERVICES, BRANCHES, PORTFOLIO } from '../data';

export const STORAGE_KEYS = {
  products: 'geometri_products',
  articles: 'geometri_articles',
  services: 'geometri_services',
  branches: 'geometri_branches',
  portfolio: 'geometri_portfolio',
  siteSettings: 'geometri_site_settings',
} as const;

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  hero: {
    headlineLine1: 'Solusi Alat Survey',
    headlineLine2: 'Terpercaya Indonesia',
    tagline: '#TemanSurveyor Indonesia',
    description:
      'Cabang Papua siap melayani Anda di Jayapura & sekitarnya. Jual Alat Bergaransi · Sewa & Rental · Servis Tersertifikasi · Kalibrasi KAN · Jasa Mapping Udara.',
    slides: [
      {
        id: 1,
        src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
        alt: 'Surveyors di lapangan konstruksi',
        caption: 'Layanan Jasa Pengukuran Lapangan',
      },
      {
        id: 2,
        src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80',
        alt: 'Total Station profesional',
        caption: 'Total Station Bergaransi Resmi',
      },
      {
        id: 3,
        src: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?w=1200&q=80',
        alt: 'GPS RTK Geodetis',
        caption: 'GPS / GNSS RTK Presisi Tinggi',
      },
      {
        id: 4,
        src: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&q=80',
        alt: 'Drone mapping udara',
        caption: 'Drone Mapping & Fotogrametri',
      },
      {
        id: 5,
        src: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80',
        alt: 'Pengukuran presisi di lapangan',
        caption: 'Kalibrasi Standar KAN Terakreditasi',
      },
    ],
  },
  home: {
    tickerItems: [
      'Total Station',
      'GPS Geodetis RTK',
      'Digital Theodolite',
      'Penyewaan Alat',
      'Servis Resmi',
      'Laboratorium Kalibrasi',
      'Automatic Level',
      'Drone Mapping',
      'Tim Jasa Pemetaan',
    ],
    servicesTitle: 'Layanan Penilaian Presisi Tinggi',
    servicesSubtitle:
      'Kami mendukung penuh operasional konstruksi dan survei kadastral Anda di mana pun di Indonesia dengan komitmen efisiensi tingkat tinggi.',
    whyTitle: 'Mengapa Pilih Geometri Papua (Cabang Jayapura)?',
    whySubtitle:
      'Kami hadir khusus di Jayapura sebagai mitra lapangan (#TemanSurveyor) yang paham kondisi geografis dan tantangan operasional di Papua.',
    advantages: [
      {
        title: 'Jaminan Alat Orisinal Bergaransi',
        description:
          'Setiap modul alat (Total Station/GPS RTK) yang kami distribusikan disertai dengan nomor serial terverifikasi dan garansi resmi pabrikan selama 12 bulan penuh.',
      },
      {
        title: 'Uji Kalibrasi & Laboratorium Kolimasi Standar KAN',
        description:
          'Kami memiliki fasilitas laboratorium uji internal dengan alat berskala mikrometer. Setiap hasil kalibrasi sah untuk konsultan pengawas dan dokumen tender.',
      },
      {
        title: 'Dukungan Pelatihan Juru Ukur Pemula',
        description:
          'Setiap pembelian unit alat di Jayapura menyertakan kelas bimbingan pengoperasian (free training) hingga surveyor Anda mahir merekam koordinat pertama di lapangan.',
      },
    ],
    metricsTitle: 'Angka Kepatuhan & Jangkauan',
    metricsSubtitle:
      'Audit kualitas komprehensif Geometri Indonesia berskala nasional',
    metrics: [
      {
        value: '99.7%',
        description:
          'Akurasi Presisi Alat Terjaga berdasarkan data kalibrasi tahunan klien kami.',
        highlighted: true,
      },
      {
        value: '1.200+',
        description:
          'Sertifikat Kalibrasi Terbit untuk Total Station & Waterpass per tahun secara legal.',
      },
      {
        value: '15+',
        description:
          'Tahun Pengalaman Kolektif tim teknisi bersertifikasi brand Leica & Topcon Jepang.',
        highlighted: true,
      },
    ],
    brandsTitle: 'Distributor & Vendor Resmi Global',
    productsTitle: 'Instrumen Terlaris Minggu Ini',
    productsSubtitle:
      'Peralatan penunjang pengukuran tanah yang paling dominan dioperasikan di lokasi konstruksi Papua & sekitarnya.',
    branchesTitle: 'Cabang Papua & Jaringan Nasional Kami',
    branchesNote:
      'Cabang kami di Abepura, Jayapura siap menyuplai, servis kilat dan kalibrasi tuntas untuk instansi swasta lokal, perguruan tinggi, maupun instansi kedinasan di wilayah Papua.',
    ctaTitle: 'Butuh Penawaran Legal Resmi (Quotation)?',
    ctaSubtitle:
      'Hubungi Geometri Papua Cabang Jayapura untuk mendapatkan PDF penawaran dalam 15 menit.',
  },
  contact: {
    pageTitle: 'Hubungi Juru Hubung Kami',
    pageSubtitle:
      'Tim sales dan teknisi kami siap merespons pertanyaan Anda secepat mungkin melalui WhatsApp, telepon, atau email resmi.',
    address: 'Jl. Kakatua No.Blok 6, Wai Mhorock, Kec. Abepura, Kota Jayapura, Papua 99225',
    phone: '+62 851-3571-6279',
    email: 'geometripapua@gmail.com',
    website: 'https://geo-metri.com',
    whatsapp: '6285135716279',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.0!2d140.713!3d-2.592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMzUnMzEuMiJTIDE0MMKwNDInNDYuOCJF!5e0!3m2!1sid!2sid!4v1',
  },
  about: {
    pageTitle: 'Tentang Geometri Papua — Cabang Jayapura',
    pageSubtitle:
      'Kami bagian dari jaringan nasional PT Geo Metri Indonesia, hadir khusus melayani Jayapura dan seluruh wilayah Papua sejak 2019.',
    companyDescription:
      'PT Geo Metri Indonesia — Cabang Papua (Jayapura) beroperasi sejak 2019 sebagai pusat distribusi alat survey orisinal di wilayah Papua. Kami melayani penjualan, sewa, servis, kalibrasi, dan jasa pemetaan untuk instansi pemerintah, BUMN, kontraktor, dan perguruan tinggi di Papua.',
    vision:
      'Menjadi mitra geospasial terdepan di Indonesia yang menghadirkan solusi pengukuran presisi, terjangkau, dan terpercaya bagi setiap juru ukur.',
    mission:
      'Mendistribusikan instrumen survey berkualitas internasional, menyediakan layanan kalibrasi bersertifikat, serta mendampingi surveyor Indonesia melalui pelatihan dan dukungan teknis berkelanjutan.',
    timeline: [
      {
        year: '2019',
        title: 'Pendirian Cabang Papua',
        description:
          'Membuka operasional Cabang Papua sebagai distributor alat survey resmi dengan fokus pelayanan Jayapura dan sekitarnya.',
      },
      {
        year: '2021',
        title: 'Ekspansi Jaringan Nasional',
        description:
          'Membuka cabang di kota-kota strategis untuk mendekatkan layanan ke pelanggan di seluruh Indonesia.',
      },
      {
        year: '2024',
        title: 'Laboratorium Kalibrasi & Jasa Pemetaan',
        description:
          'Meluncurkan fasilitas kalibrasi internal dan tim jasa pemetaan drone & topografi profesional.',
      },
    ],
  },
  servicesPage: {
    pageTitle: 'Solusi Survey & Geospasial',
    pageSubtitle:
      'Dari penyediaan unit terjangkau, lab kalibrasi bersertifikasi hingga tim lapangan ahli survei batimetri dan kontur topografis.',
  },
  portfolioPage: {
    pageTitle: 'Portofolio Proyek Jasa Pemetaan',
    pageSubtitle:
      'Kumpulan komitmen kerja nyata tim engineering & geodesi PT Geo Metri Indonesia dalam menyukseskan proyek infrastruktur bupati, BUMN, maupun industri swasta.',
  },
  brands: BRANDS.map(b => ({ ...b })),
  partners: PARTNERS.map(p => ({ ...p })),
  footer: {
    companyDescription: 'Cabang Papua (Jayapura) — PT Geo Metri Indonesia melayani kebutuhan instrumen pemetaan orisinal, andal, dan bersertifikasi sejak 2019 untuk mendukung pembangunan infrastruktur di Papua.',
    services: [
      'Penjualan Alat Survey',
      'Sewa & Rental GPS/TS',
      'Servis Alat Presisi',
      'Sertifikasi Kalibrasi KAN',
      'Pemetaan Jasa Survey Udara',
    ],
    socialLinks: [
      { platform: 'YouTube', url: 'https://www.youtube.com/@geometrichannel', icon: 'Youtube' },
      { platform: 'Instagram', url: 'https://www.instagram.com/geometri.id/', icon: 'Instagram' },
      { platform: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61572071534432', icon: 'Facebook' },
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/geometri-indonesia/', icon: 'Linkedin' },
    ],
  },
};

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function saveToStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadSiteSettings(): SiteSettings {
  return loadFromStorage(STORAGE_KEYS.siteSettings, DEFAULT_SITE_SETTINGS);
}

export function loadServices(): ServiceDetail[] {
  return loadFromStorage(STORAGE_KEYS.services, SERVICES);
}

export function loadBranches(): Branch[] {
  return loadFromStorage(STORAGE_KEYS.branches, BRANCHES);
}

export function loadPortfolio(): Project[] {
  return loadFromStorage(STORAGE_KEYS.portfolio, PORTFOLIO);
}

export function resetAllContent(): void {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
}
