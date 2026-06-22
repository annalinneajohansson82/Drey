// Rasterise the SVG mark into the PNG icons the PWA manifest references.
// Run with `npm run icons` after changing public/icon.svg.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
const svg = await readFile(join(publicDir, 'icon.svg'));

/** @type {Array<{ name: string, size: number }>} */
const targets = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'icon-512-maskable.png', size: 512 },
];

for (const { name, size } of targets) {
  const png = await sharp(svg).resize(size, size).png().toBuffer();
  await writeFile(join(publicDir, name), png);
  console.log(`wrote public/${name}`);
}
