# Deploy & Integrasi Vercel + Supabase

Langkah singkat:
1. Di Supabase: catat `SUPABASE_URL` dan `SUPABASE_ANON_KEY` (anon/public key).
2. Di Vercel: import repository `rizuzaman-Aceh/Profil` dan pilih branch `setup/vercel-supabase` atau `main` setelah merge.
   - Build Command: `npm run build`
   - Output Directory: `public`
   - Tambahkan Environment Variables:
     - SUPABASE_URL
     - SUPABASE_ANON_KEY
   Pastikan variabel di-set untuk Production, Preview, dan Development sesuai kebutuhan.
3. Deploy di Vercel. Skrip build akan membuat `public/_env.js` berisi nilai dari environment variables sehingga JS client bisa mengaksesnya.

Pengembangan lokal:
- Pasang Node.js (>=14).
- Salin `.env.example` jadi `.env` dan isi nilai Supabase untuk pengujian.
- Jalankan `npm run build` untuk menghasilkan `public/_env.js`.
