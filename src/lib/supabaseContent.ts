import { ARTICLES, BRANCHES, PORTFOLIO, PRODUCTS, SERVICES } from '../data';
import { Article, Branch, Product, Project, ServiceDetail, SiteSettings } from '../types';
import { DEFAULT_SITE_SETTINGS } from './siteContent';
import { isSupabaseConfigured, supabase } from './supabase';

type ContentKey =
  | 'products'
  | 'articles'
  | 'siteSettings'
  | 'services'
  | 'branches'
  | 'portfolio';

interface ContentBundle {
  products: Product[];
  articles: Article[];
  siteSettings: SiteSettings;
  services: ServiceDetail[];
  branches: Branch[];
  portfolio: Project[];
}

export interface VisitorPoint {
  date: string;
  count: number;
}

const DEFAULT_CONTENT: ContentBundle = {
  products: PRODUCTS,
  articles: ARTICLES,
  siteSettings: DEFAULT_SITE_SETTINGS,
  services: SERVICES,
  branches: BRANCHES,
  portfolio: PORTFOLIO,
};

function getDefaultContent(): ContentBundle {
  return {
    products: structuredClone(DEFAULT_CONTENT.products),
    articles: structuredClone(DEFAULT_CONTENT.articles),
    siteSettings: structuredClone(DEFAULT_CONTENT.siteSettings),
    services: structuredClone(DEFAULT_CONTENT.services),
    branches: structuredClone(DEFAULT_CONTENT.branches),
    portfolio: structuredClone(DEFAULT_CONTENT.portfolio),
  };
}

async function upsertContentRecord<T>(key: ContentKey, payload: T): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    return;
  }

  const { error } = await supabase
    .from('site_content')
    .upsert({ key, payload }, { onConflict: 'key' });

  if (error) {
    throw error;
  }
}

export async function loadAllContent(): Promise<ContentBundle> {
  const fallback = getDefaultContent();

  if (!isSupabaseConfigured || !supabase) {
    return fallback;
  }

  const { data, error } = await supabase
    .from('site_content')
    .select('key,payload')
    .in('key', ['products', 'articles', 'siteSettings', 'services', 'branches', 'portfolio']);

  if (error) {
    console.error('Failed to load content from Supabase:', error.message);
    return fallback;
  }

  const lookup = new Map((data ?? []).map((row) => [row.key as ContentKey, row.payload]));

  const merged: ContentBundle = {
    products: (lookup.get('products') as Product[]) ?? fallback.products,
    articles: (lookup.get('articles') as Article[]) ?? fallback.articles,
    siteSettings: (lookup.get('siteSettings') as SiteSettings) ?? fallback.siteSettings,
    services: (lookup.get('services') as ServiceDetail[]) ?? fallback.services,
    branches: (lookup.get('branches') as Branch[]) ?? fallback.branches,
    portfolio: (lookup.get('portfolio') as Project[]) ?? fallback.portfolio,
  };

  const missingKeys = (['products', 'articles', 'siteSettings', 'services', 'branches', 'portfolio'] as ContentKey[])
    .filter((key) => !lookup.has(key));

  if (missingKeys.length > 0) {
    await Promise.all(
      missingKeys.map((key) => upsertContentRecord(key, merged[key]))
    );
  }

  return merged;
}

export async function saveProducts(products: Product[]): Promise<void> {
  await upsertContentRecord('products', products);
}

export async function saveArticles(articles: Article[]): Promise<void> {
  await upsertContentRecord('articles', articles);
}

export async function saveSiteSettings(siteSettings: SiteSettings): Promise<void> {
  await upsertContentRecord('siteSettings', siteSettings);
}

export async function saveServices(services: ServiceDetail[]): Promise<void> {
  await upsertContentRecord('services', services);
}

export async function saveBranches(branches: Branch[]): Promise<void> {
  await upsertContentRecord('branches', branches);
}

export async function savePortfolio(portfolio: Project[]): Promise<void> {
  await upsertContentRecord('portfolio', portfolio);
}

export async function resetAllContentToDefault(): Promise<ContentBundle> {
  const defaults = getDefaultContent();

  await Promise.all([
    saveProducts(defaults.products),
    saveArticles(defaults.articles),
    saveSiteSettings(defaults.siteSettings),
    saveServices(defaults.services),
    saveBranches(defaults.branches),
    savePortfolio(defaults.portfolio),
  ]);

  return defaults;
}

export async function trackPageVisit(page: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    return;
  }

  const { error } = await supabase
    .from('page_views')
    .insert({ page, viewed_at: new Date().toISOString() });

  if (error) {
    console.error('Failed to track page visit:', error.message);
  }
}

export async function getVisitorSeries(days = 7): Promise<VisitorPoint[]> {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - (days - 1));

  const points: VisitorPoint[] = Array.from({ length: days }, (_, index) => {
    const d = new Date(start);
    d.setDate(start.getDate() + index);
    return {
      date: d.toISOString().slice(0, 10),
      count: 0,
    };
  });

  if (!isSupabaseConfigured || !supabase) {
    return points;
  }

  const { data, error } = await supabase
    .from('page_views')
    .select('viewed_at')
    .gte('viewed_at', `${points[0].date}T00:00:00.000Z`)
    .order('viewed_at', { ascending: true });

  if (error) {
    console.error('Failed to load visitor series:', error.message);
    return points;
  }

  for (const row of data ?? []) {
    const key = String(row.viewed_at).slice(0, 10);
    const point = points.find((item) => item.date === key);
    if (point) {
      point.count += 1;
    }
  }

  return points;
}
