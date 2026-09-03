# Rizu Zaman — Cyber Security Portfolio

Premium mobile-first cyber security portfolio.

## Struktur

Profil/
├── index.html
├── vercel.json
├── css/
│   └── style.css
├── js/
│   └── app.js
├── api/
│   └── contact.js
├── migrations/
│   └── portfolio_messages.sql
└── README.md

## Environment Variables

Tambahkan pada Vercel:

SUPABASE_URL
SUPABASE_SERVICE_ROLE

JANGAN commit service-role key ke GitHub.

## Supabase

Jalankan:

migrations/portfolio_messages.sql

pada project Supabase yang digunakan.

## Contact Flow

Browser
→ /api/contact
→ Vercel Serverless Function
→ Supabase REST API
→ portfolio_messages

## Deployment

GitHub
→ Vercel
→ Production

## Security

Service-role key hanya berada pada environment server.

Public visitor tidak mendapatkan akses
SELECT terhadap portfolio_messages.