// Rasterize public/og.svg -> public/og.png (1200x630) for social link previews.
// Social scrapers (Slack, iMessage, X, Facebook) don't render SVG, so we ship a PNG.
//
// Run with:  npm run og
//
// Text in og.svg uses Georgia (serif) + Segoe UI (sans), which exist on Windows
// and most systems. resvg loads system fonts; tweak the SVG and re-run anytime.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(resolve(root, 'public/og.svg'), 'utf8');

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: {
    loadSystemFonts: true,
    defaultFontFamily: 'Georgia',
  },
  background: '#faf8f3',
});

const png = resvg.render().asPng();
writeFileSync(resolve(root, 'public/og.png'), png);
console.log(`Wrote public/og.png (${(png.length / 1024).toFixed(1)} KB)`);
