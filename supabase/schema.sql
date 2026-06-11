create table if not exists public.site_content (
  key text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  page text not null,
  viewed_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
alter table public.page_views enable row level security;

-- Public website can read content, only authenticated users can modify.
create policy "Public can read site_content"
  on public.site_content
  for select
  using (true);

create policy "Authenticated can write site_content"
  on public.site_content
  for all
  to authenticated
  using (true)
  with check (true);

-- Public website can push page view records, analytics read is admin-only.
create policy "Public can insert page_views"
  on public.page_views
  for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated can read page_views"
  on public.page_views
  for select
  to authenticated
  using (true);
