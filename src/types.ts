export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Total Station' | 'GPS / GNSS' | 'Theodolite' | 'Drone' | 'Aksesoris' | 'Waterpass';
  emoji: string;
  image?: string;
  description: string;
  specs: string[];
  features?: string[];
  priceRange?: string;
}

export interface Article {
  id: string;
  title: string;
  category: 'Teknologi' | 'Tips' | 'Edukasi' | 'Produk';
  date: string;
  excerpt: string;
  content: string;
  emoji: string;
  image?: string;
  author: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  num: string;
  iconName: string;
  image?: string;
  description: string;
  bullets: string[];
}

export interface Branch {
  id: string;
  name: string;
  region: string;
  isHQ?: boolean;
  image?: string;
  address: string;
  phone: string;
}

export interface Partner {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  category?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  client: string;
  year: string;
  emoji: string;
  image?: string;
  description: string;
}

export interface HeroSlide {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

export interface HeroContent {
  headlineLine1: string;
  headlineLine2: string;
  tagline: string;
  description: string;
  slides: HeroSlide[];
}

export interface AdvantageItem {
  title: string;
  description: string;
}

export interface MetricItem {
  value: string;
  description: string;
  highlighted?: boolean;
}

export interface HomeContent {
  tickerItems: string[];
  servicesTitle: string;
  servicesSubtitle: string;
  whyTitle: string;
  whySubtitle: string;
  advantages: AdvantageItem[];
  metricsTitle: string;
  metricsSubtitle: string;
  metrics: MetricItem[];
  brandsTitle: string;
  productsTitle: string;
  productsSubtitle: string;
  branchesTitle: string;
  branchesNote: string;
  ctaTitle: string;
  ctaSubtitle: string;
}

export interface ContactContent {
  pageTitle: string;
  pageSubtitle: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  whatsapp: string;
  mapEmbedUrl: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface AboutContent {
  pageTitle: string;
  pageSubtitle: string;
  companyDescription: string;
  vision: string;
  mission: string;
  timeline: TimelineItem[];
}

export interface PageHeader {
  pageTitle: string;
  pageSubtitle: string;
}

export interface BrandItem {
  name: string;
  origin: string;
  logo: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface FooterContent {
  companyDescription: string;
  services: string[];
  socialLinks: SocialLink[];
}

export interface SiteSettings {
  hero: HeroContent;
  home: HomeContent;
  contact: ContactContent;
  about: AboutContent;
  servicesPage: PageHeader;
  portfolioPage: PageHeader;
  brands: BrandItem[];
  partners: Partner[];
  footer: FooterContent;
}
