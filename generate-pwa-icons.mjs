import sharp from './node_modules/sharp/lib/index.js';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#0A2463"/>
    <stop offset="100%" stop-color="#1756C8"/>
  </linearGradient></defs>
  <rect x="0" y="0" width="512" height="512" rx="115" fill="url(#g)"/>
  <text x="256" y="340" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="260" text-anchor="middle">
    <tspan fill="#FFFFFF">Yo</tspan><tspan fill="#FFD93D">!</tspan>
  </text>
</svg>`;

const buf = Buffer.from(svg);
await Promise.all([
  sharp(buf).resize(192,192).png().toFile('public/pwa-192x192.png'),
  sharp(buf).resize(512,512).png().toFile('public/pwa-512x512.png'),
  sharp(buf).resize(180,180).png().toFile('public/apple-touch-icon.png'),
]);
console.log('✅ Icônes PWA générées !');
