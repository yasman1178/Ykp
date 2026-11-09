/**
 * Static Site Export Script for Render, Netlify, Vercel, and Static Hosts
 * 
 * Takes the pre-rendered Next.js pages from .next and creates:
 * 1. 'out/' directory (standard Next.js export format)
 * 2. 'build/' directory (copy/symlink to fix Render's default "Publish directory build does not exist!")
 * 
 * Works with full i18n support (Arabic & English), images, assets, and clean URLs.
 */

const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const nextDir = path.join(rootDir, '.next');
const pagesDir = path.join(nextDir, 'server', 'pages');
const staticDir = path.join(nextDir, 'static');
const publicDir = path.join(rootDir, 'public');
const outDir = path.join(rootDir, 'out');
const buildDir = path.join(rootDir, 'build');

console.log('🚀 Starting Static Site Export...');

if (!fs.existsSync(pagesDir)) {
  console.error('❌ Error: .next/server/pages not found. Run "next build" first.');
  process.exit(1);
}

// 1. Clean existing out and build directories
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true, force: true });
}

fs.mkdirSync(outDir, { recursive: true });

// 2. Copy public directory contents to out/
if (fs.existsSync(publicDir)) {
  console.log('📦 Copying public assets...');
  fs.cpSync(publicDir, outDir, { recursive: true });
}

// 3. Copy .next/static to out/_next/static
const outNextStatic = path.join(outDir, '_next', 'static');
fs.mkdirSync(outNextStatic, { recursive: true });
if (fs.existsSync(staticDir)) {
  console.log('⚡ Copying Next.js static bundles (_next/static)...');
  fs.cpSync(staticDir, outNextStatic, { recursive: true });
}

// 4. Find build ID for _next/data
let buildId = '';
const buildIdPath = path.join(nextDir, 'BUILD_ID');
if (fs.existsSync(buildIdPath)) {
  buildId = fs.readFileSync(buildIdPath, 'utf8').trim();
}

// 5. Recursively copy HTML and JSON files from .next/server/pages
function copyPages(currentDir, relativePath = '') {
  const items = fs.readdirSync(currentDir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(currentDir, item.name);
    const relItemPath = path.join(relativePath, item.name);

    if (item.isDirectory()) {
      // Skip api directory in static export
      if (item.name === 'api') continue;
      copyPages(fullPath, relItemPath);
    } else if (item.isFile()) {
      if (item.name.endsWith('.html')) {
        // Place HTML in target
        const targetHtmlPath = path.join(outDir, relItemPath);
        fs.mkdirSync(path.dirname(targetHtmlPath), { recursive: true });
        fs.copyFileSync(fullPath, targetHtmlPath);

        // Also create clean URL directory: /about.html -> /about/index.html
        if (item.name !== 'index.html' && item.name !== '404.html' && item.name !== '500.html') {
          const cleanDirName = item.name.replace(/\.html$/, '');
          const cleanDirPath = path.join(outDir, relativePath, cleanDirName);
          fs.mkdirSync(cleanDirPath, { recursive: true });
          fs.copyFileSync(fullPath, path.join(cleanDirPath, 'index.html'));
        }
      } else if (item.name.endsWith('.json')) {
        // SSG page data for client-side routing
        if (buildId) {
          const targetDataPath = path.join(outDir, '_next', 'data', buildId, relItemPath);
          fs.mkdirSync(path.dirname(targetDataPath), { recursive: true });
          fs.copyFileSync(fullPath, targetDataPath);
        }
      }
    }
  }
}

console.log('📄 Exporting pre-rendered HTML & SSG JSON routes...');
copyPages(pagesDir);

// 6. Ensure default index.html exists at root of out/
const defaultIndex = path.join(outDir, 'index.html');
const arIndex = path.join(outDir, 'ar', 'index.html');
const enIndex = path.join(outDir, 'en', 'index.html');

if (!fs.existsSync(defaultIndex)) {
  if (fs.existsSync(arIndex)) {
    fs.copyFileSync(arIndex, defaultIndex);
    console.log('✅ Created root index.html from Arabic homepage');
  } else if (fs.existsSync(enIndex)) {
    fs.copyFileSync(enIndex, defaultIndex);
    console.log('✅ Created root index.html from English homepage');
  }
}

// 7. Create 404.html at root if missing
const out404 = path.join(outDir, '404.html');
const en404 = path.join(outDir, 'en', '404.html');
const ar404 = path.join(outDir, 'ar', '404.html');
if (!fs.existsSync(out404)) {
  if (fs.existsSync(ar404)) {
    fs.copyFileSync(ar404, out404);
  } else if (fs.existsSync(en404)) {
    fs.copyFileSync(en404, out404);
  }
}

// 8. Create build/ directory as an exact clone of out/
// This permanently eliminates "Publish directory build does not exist!" on Render
console.log('🔄 Creating build/ directory mirror for Render compatibility...');
fs.cpSync(outDir, buildDir, { recursive: true });

// 9. Create _redirects for Render / Netlify
const redirectsPath = path.join(outDir, '_redirects');
const redirectsContent = `
# Static redirect rules
/ /ar 302! Language=ar
/ /en 302
`;
fs.writeFileSync(redirectsPath, redirectsContent.trim());
fs.writeFileSync(path.join(buildDir, '_redirects'), redirectsContent.trim());

console.log('✨ Static export complete!');
console.log(`📁 Both "out/" and "build/" directories are ready for publishing.`);
