// Gunakan ESM dari CDN untuk kemudahan (atau instal @supabase/supabase-js jika ada build bundler)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Pastikan <script src="/_env.js"></script> dimuat sebelum modul ini di index.html
const env = window.__env || {};
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
