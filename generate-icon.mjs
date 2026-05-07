import sharp from 'sharp';
import fs from 'fs';

const size = 1024;

const svg = `<svg width="${size}" height="${size}" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Fond plein sans coins arrondis (Apple les ajoute) -->
  <rect width="1024" height="1024" fill="#0F1F4E"/>

  <!-- Yo en blanc centré légèrement à gauche -->
  <text x="430" y="620" font-family="'Helvetica Neue', Arial Black, sans-serif" font-weight="900" font-size="520" fill="white" text-anchor="middle" letter-spacing="-8">Yo</text>

  <!-- ! en jaune -->
  <text x="840" y="620" font-family="'Helvetica Neue', Arial Black, sans-serif" font-weight="900" font-size="520" fill="#FFD93D" text-anchor="middle">!</text>
</svg>`;

fs.writeFileSync('icon-source.svg', svg);

await sharp(Buffer.from(svg))
  .resize(1024, 1024)
  .png()
  .toFile('icon-1024.png');

// Générer toutes les tailles iOS
const sizes = [20, 29, 40, 58, 60, 76, 80, 87, 120, 152, 167, 180, 1024];
for (const s of sizes) {
  await sharp(Buffer.from(svg))
    .resize(s, s)
    .png()
    .toFile(`icon-${s}.png`);
  console.log(`✅ icon-${s}.png généré`);
}

console.log('\n🎉 Toutes les icônes générées !');
