const fs = require('fs');
const path = require('path');

const env = {
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || ''
};

const outDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const contents = `window.__env = ${JSON.stringify(env, null, 2)};`;
fs.writeFileSync(path.join(outDir, '_env.js'), contents, 'utf8');
console.log('Wrote public/_env.js');
