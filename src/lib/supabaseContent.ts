import { ARTICLES, BRANCHES, PORTFOLIO, PRODUCTS, SERVICES } from '../data';
import { Article, BrandItem, Branch, Partner, Product, Project, ServiceDetail, SiteSettings } from '../types';
import { DEFAULT_SITE_SETTINGS } from './siteContent';
import { isSupabaseConfigured, supabase } from './supabase';

type ContentKey =
  | 'products'
  | 'articles'
  | 'siteSettings'
  | 'services'
  | 'branches'
  | 'portfolio'
  | 'brands'
  | 'partners';

interface ContentBundle {
  products: Product[];
  articles: Article[];
  siteSettings: SiteSettings;
  services: ServiceDetail[];
  branches: Branch[];
  portfolio: Project[];
  brands: BrandItem[];
  partners: Partner[];
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
  brands: DEFAULT_SITE_SETTINGS.brands ?? [],
  partners: DEFAULT_SITE_SETTINGS.partners ?? [],
};

function getDefaultContent(): ContentBundle {
  return {
    products: structuredClone(DEFAULT_CONTENT.products),
    articles: structuredClone(DEFAULT_CONTENT.articles),
    siteSettings: structuredClone(DEFAULT_CONTENT.siteSettings),
    services: structuredClone(DEFAULT_CONTENT.services),
    branches: structuredClone(DEFAULT_CONTENT.branches),
    portfolio: structuredClone(DEFAULT_CONTENT.portfolio),
    brands: structuredClone(DEFAULT_CONTENT.brands),
    partners: structuredClone(DEFAULT_CONTENT.partners),
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

// Detects if stored siteSettings still contains stale Bandung contact data
function isStaleContactData(loaded: Partial<SiteSettings> | undefined | null): boolean {
  if (!loaded?.contact) return false;
  const c = loaded.contact as { phone?: string; email?: string; whatsapp?: string };
  const STALE_PHONE_FRAGMENTS = ['6282262865676', '62822-6286', 'Bandung', 'bandung', '40275'];
  const STALE_EMAIL_FRAGMENTS = ['geometriindonesia@', 'geometribandung@'];
  const phone = (c.phone ?? '') + (c.whatsapp ?? '');
  const email = c.email ?? '';
  return (
    STALE_PHONE_FRAGMENTS.some((f) => phone.includes(f)) ||
    STALE_EMAIL_FRAGMENTS.some((f) => email.includes(f))
  );
}

function mergeSiteSettings(loaded: Partial<SiteSettings> | undefined | null, fallback: SiteSettings): SiteSettings {
  if (!loaded) return fallback;
  // If Supabase still has stale Bandung contact, force fallback (Papua) contact data
  const contactData = isStaleContactData(loaded) ? fallback.contact : { ...fallback.contact, ...loaded.contact };
  return {
    hero: { ...fallback.hero, ...loaded.hero },
    home: { ...fallback.home, ...loaded.home },
    contact: contactData,
    about: { ...fallback.about, ...loaded.about },
    servicesPage: { ...fallback.servicesPage, ...loaded.servicesPage },
    portfolioPage: { ...fallback.portfolioPage, ...loaded.portfolioPage },
    brands: loaded.brands ?? fallback.brands,
    partners: loaded.partners ?? fallback.partners,
    footer: isStaleContactData(loaded) ? fallback.footer : (loaded.footer ?? fallback.footer),
  };
}

export async function loadAllContent(): Promise<ContentBundle> {
  const fallback = getDefaultContent();

  if (!isSupabaseConfigured || !supabase) {
    console.info('Supabase not configured, using default content');
    return fallback;
  }

  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('key,payload')
      .in('key', ['products', 'articles', 'siteSettings', 'services', 'branches', 'portfolio', 'brands', 'partners']);

    if (error) {
      console.error('Failed to load content from Supabase:', error.message);
      return fallback;
    }

    const lookup = new Map((data ?? []).map((row) => [row.key as ContentKey, row.payload]));

    // Check if siteSettings in Supabase has stale/Bandung contact data — override with Papua defaults.
    // The reseed write to Supabase may fail if the user is not authenticated (RLS), which is fine —
    // the correct local defaults will still be used for display. After admin login + "Reset Bawaan",
    // Supabase will be permanently updated.
    const rawSiteSettings = lookup.get('siteSettings') as Partial<SiteSettings> | undefined;
    if (isStaleContactData(rawSiteSettings)) {
      console.info('[Geometri] Stale Bandung contact detected — using Papua defaults. Login as admin and click "Reset Bawaan" to permanently sync Supabase.');
      // Always override the lookup so correct defaults are used for rendering
      lookup.set('siteSettings', fallback.siteSettings as unknown as Record<string, unknown>);
      // Attempt reseed silently — will succeed only if user is authenticated (admin)
      upsertContentRecord('siteSettings', fallback.siteSettings).catch(() => {
        // RLS may block unauthenticated writes — this is expected. Admin login will fix permanently.
      });
    }

    const merged: ContentBundle = {
      products: (lookup.get('products') as Product[]) ?? fallback.products,
      articles: (lookup.get('articles') as Article[]) ?? fallback.articles,
      siteSettings: mergeSiteSettings(lookup.get('siteSettings') as Partial<SiteSettings> | undefined, fallback.siteSettings),
      services: (lookup.get('services') as ServiceDetail[]) ?? fallback.services,
      branches: (lookup.get('branches') as Branch[]) ?? fallback.branches,
      portfolio: (lookup.get('portfolio') as Project[]) ?? fallback.portfolio,
      brands: (lookup.get('brands') as BrandItem[]) ?? fallback.brands,
      partners: (lookup.get('partners') as Partner[]) ?? fallback.partners,
    };

    const missingKeys = (['products', 'articles', 'siteSettings', 'services', 'branches', 'portfolio', 'brands', 'partners'] as ContentKey[])
      .filter((key) => !lookup.has(key));

    if (missingKeys.length > 0) {
      await Promise.all(
        missingKeys.map((key) => upsertContentRecord(key, merged[key as keyof ContentBundle]))
      );
    }

    return merged;
  } catch (error) {
    console.error('Unexpected error loading content:', error);
    return fallback;
  }
}

/**
 * Force-reseed ALL content to the current default values.
 * Use this from Admin panel to push latest defaults to Supabase.
 */
export async function forceReseedToDefault(): Promise<ContentBundle> {
  return resetAllContentToDefault();
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

export async function saveBrandsData(brands: BrandItem[]): Promise<void> {
  await upsertContentRecord('brands', brands);
}

export async function savePartnersData(partners: Partner[]): Promise<void> {
  await upsertContentRecord('partners', partners);
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
    saveBrandsData(defaults.brands),
    savePartnersData(defaults.partners),
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
