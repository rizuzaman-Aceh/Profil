const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else if (exists) {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function main() {
  const root = path.join(__dirname, '..');
  const out = path.join(root, 'public');
  if (!fs.existsSync(out)) fs.mkdirSync(out, { recursive: true });

  // Copy index.html
  const indexSrc = path.join(root, 'index.html');
  if (fs.existsSync(indexSrc)) {
    copyRecursiveSync(indexSrc, path.join(out, 'index.html'));
    console.log('Copied index.html');
  } else {
    console.warn('index.html not found in root, skipping');
  }

  // Copy directories: css, js, assets (if they exist)
  ['css', 'js', 'assets', 'images'].forEach(dir => {
    const src = path.join(root, dir);
    const dest = path.join(out, dir);
    if (fs.existsSync(src) && fs.statSync(src).isDirectory()) {
      copyRecursiveSync(src, dest);
      console.log(`Copied ${dir}/`);
    }
  });

  // Ensure _env.js exists (generate-env.js should create it)
  const envFile = path.join(out, '_env.js');
  if (!fs.existsSync(envFile)) {
    console.warn('_env.js not found in public — make sure build generated it');
  } else {
    console.log('_env.js present');
  }
}

main();
