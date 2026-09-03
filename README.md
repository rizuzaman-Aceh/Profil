# Deploy & Integrasi Vercel + Supabase

Langkah singkat:
1. Di Supabase: catat `SUPABASE_URL` dan `SUPABASE_ANON_KEY` (anon/public key) serta `SUPABASE_SERVICE_ROLE` (service role, simpan rahasia).
2. Di Vercel: import repository `rizuzaman-Aceh/Profil` atau hubungkan project yang sama.
   - Build Command: `npm run build`
   - Output Directory: `public`
   - Tambahkan Environment Variables (Production & Preview):
     - SUPABASE_URL
     - SUPABASE_ANON_KEY
     - SUPABASE_SERVICE_ROLE (HANYA untuk server-side functions)
3. Deploy di Vercel. Skrip build akan membuat `public/_env.js` berisi nilai dari environment variables sehingga JS client bisa mengaksesnya.

Pengembangan lokal:
- Pasang Node.js (>=14).
- Salin `.env.example` jadi `.env` dan isi nilai Supabase untuk pengujian.
- Jalankan `npm run build` untuk menghasilkan `public/_env.js`.

Serverless (opsional):
- Contoh serverless function `api/contact` dibuat untuk menerima form contact secara server-side dan meng-insert ke tabel `contacts` menggunakan `SUPABASE_SERVICE_ROLE`.

Database (Supabase) — migrasi cepat:
- Buat tabel contacts dengan SQL di `sql/migrations/contacts.sql`.
- Jika menggunakan RLS (Row Level Security), jangan izinkan anon key untuk menulis ke `contacts`; gunakan fungsi server-side dengan `SUPABASE_SERVICE_ROLE`.

Keamanan:
- Jangan pernah commit `SUPABASE_SERVICE_ROLE` ke repo. Simpan di Vercel Environment Variables.
- Terapkan RLS & policies di Supabase agar data client aman.
