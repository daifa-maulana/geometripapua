import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });
dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@geometri-papua.id';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin12345!';

if (!SUPABASE_URL) {
  console.error('Missing required env var: VITE_SUPABASE_URL');
  process.exit(1);
}

if (ADMIN_PASSWORD.length < 6) {
  console.error('ADMIN_PASSWORD must be at least 6 characters.');
  process.exit(1);
}

if (SERVICE_ROLE_KEY) {
  const adminSupabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await adminSupabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
  });

  if (error) {
    if (error.message.toLowerCase().includes('already')) {
      console.log(`Admin account already exists: ${ADMIN_EMAIL}`);
      process.exit(0);
    }

    console.error('Failed to create admin account:', error.message);
    process.exit(1);
  }

  console.log('Admin account created successfully (admin API).');
  console.log(`User ID: ${data.user?.id}`);
  console.log(`Email: ${data.user?.email}`);
  process.exit(0);
}

if (!ANON_KEY) {
  console.error('Missing VITE_SUPABASE_SERVICE_ROLE_KEY and VITE_SUPABASE_ANON_KEY. At least one is required.');
  process.exit(1);
}

const anonSupabase = createClient(SUPABASE_URL, ANON_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data, error } = await anonSupabase.auth.signUp({
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
});

if (error) {
  const msg = error.message.toLowerCase();
  if (msg.includes('already') || msg.includes('registered')) {
    console.log(`Admin account already exists: ${ADMIN_EMAIL}`);
    process.exit(0);
  }

  console.error('Failed to create admin account:', error.message);
  process.exit(1);
}

console.log('Admin account created via signUp.');
console.log(`User ID: ${data.user?.id}`);
console.log(`Email: ${data.user?.email}`);
if (!data.session) {
  console.log('No session returned. If email confirmation is enabled, confirm the email in Supabase Auth before login.');
}
