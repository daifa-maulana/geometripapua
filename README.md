# Geometri Papua Web App

## Prerequisites

- Node.js 18+
- Supabase project

## Setup

1. Install dependencies:
   npm install
2. Copy env template and fill values:
   cp .env.example .env.local
3. In Supabase SQL Editor, run:
   supabase/schema.sql
4. Create admin account (optional script):
   npm run create:admin
5. Run app:
   npm run dev

## Required Environment Variables

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_SUPABASE_SERVICE_ROLE_KEY (for create-admin script only)

Optional:

- ADMIN_EMAIL
- ADMIN_PASSWORD

## What Is Connected To Supabase

- Login admin menggunakan Supabase Auth
- Konten website (produk, artikel, layanan, cabang, portofolio, site settings) di tabel site_content
- Analitik pengunjung per halaman di tabel page_views

## Notes

- Halaman admin sekarang berdiri sendiri tanpa Header dan Footer.
- Grafik pengunjung 7 hari muncul di dashboard admin.
