import {
  SiteSettings,
  ServiceDetail,
  Branch,
  Project,
} from '../types';
import { SERVICES, BRANCHES, PORTFOLIO } from '../data';

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
      'Integrator solusi survey satu pintu di Jawa Barat. Jual Alat Bergaransi · Sewa & Rental · Servis Tersertifikasi · Kalibrasi KAN · Jasa Mapping Udara.',
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
    whyTitle: 'Mengapa Harus Geometri Bandung?',
    whySubtitle:
      'Kami bukan sekadar toko retail alat pemetaan melainkan mitra andal lapangan (#TemanSurveyor) yang mengerti tantangan kondisi bumi Indonesia.',
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
          'Setiap pembelian unit alat di kota Bandung menyertakan kelas bimbingan pengoperasian (free training) hingga surveyor Anda mahir merekam koordinat pertama di lapangan.',
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
      'Peralatan penunjang pengukuran tanah yang paling dominan dioperasikan di lokasi konstruksi Jawa Barat.',
    branchesTitle: 'Jaringan Terdistribusi di Seluruh Indonesia',
    branchesNote:
      'Di Jawa Barat, Kantor Pusat kami di Batununggal, Bandung siap menyuplai, servis kilat dan kalibrasi tuntas untuk instansi swasta lokal, perguruan tinggi, maupun instansi kedinasan.',
    ctaTitle: 'Butuh Penawaran Legal Resmi (Quotation)?',
    ctaSubtitle:
      'Hubungi Geometri Bandung untuk mendapatkan PDF penawaran dalam 15 menit.',
  },
  contact: {
    pageTitle: 'Hubungi Juru Hubung Kami',
    pageSubtitle:
      'Tim sales dan teknisi kami siap merespons pertanyaan Anda secepat mungkin melalui WhatsApp, telepon, atau email resmi.',
    address: 'Jl. Libra III No.14B, Kec. Batununggal, Kota Bandung, Jawa Barat 40275',
    phone: '+62 822-6286-5676',
    email: 'geometriindonesia@gmail.com',
    website: 'https://geo-metri.com',
    whatsapp: '6282262865676',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7986!2d107.632!3d-6.917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTUnMDEuMiJTIDEwN8KwMzcnNTUuMiJF!5e0!3m2!1sid!2sid!4v1',
  },
  about: {
    pageTitle: 'Tentang PT Geo Metri Indonesia',
    pageSubtitle:
      'Perjalanan kami sebagai distributor alat survey terpercaya sejak 2019, dengan jaringan cabang nasional dan komitmen pada presisi pengukuran.',
    companyDescription:
      'PT Geo Metri Indonesia (Geometri Bandung) didirikan pada tahun 2019 sebagai pusat distribusi alat survey orisinal di Jawa Barat. Kami melayani penjualan, sewa, servis, kalibrasi, dan jasa pemetaan untuk instansi pemerintah, BUMN, kontraktor, dan perguruan tinggi.',
    vision:
      'Menjadi mitra geospasial terdepan di Indonesia yang menghadirkan solusi pengukuran presisi, terjangkau, dan terpercaya bagi setiap juru ukur.',
    mission:
      'Mendistribusikan instrumen survey berkualitas internasional, menyediakan layanan kalibrasi bersertifikat, serta mendampingi surveyor Indonesia melalui pelatihan dan dukungan teknis berkelanjutan.',
    timeline: [
      {
        year: '2019',
        title: 'Pendirian Kantor Pusat Bandung',
        description:
          'Memulai operasional sebagai distributor alat survey dengan fokus layanan Jawa Barat.',
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
