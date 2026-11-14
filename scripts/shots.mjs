// Screenshot-Prüfung: startet das Spiel mit Software-WebGL, lässt einige Spielminuten im
// Schnelldurchlauf laufen und speichert Bilder der Übersicht, des Lagerhauses und einer Straßenszene.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const port = 4179;
const outDir = process.env.SHOTS_DIR || 'shots';
mkdirSync(outDir, { recursive: true });

const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(port), '--strictPort'], { stdio: 'pipe' });
await new Promise((resolve) => {
  server.stdout.on('data', (d) => String(d).includes('http') && resolve());
  setTimeout(resolve, 5000);
});

const launchOpts = { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] };
if (process.env.CHROMIUM_PATH) launchOpts.executablePath = process.env.CHROMIUM_PATH;
const browser = await chromium.launch(launchOpts);
const viewports = [
  { name: 'desktop', width: 1280, height: 720, scale: 1, touch: false },
  { name: 'phone', width: 844, height: 390, scale: 2, touch: true },
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
try {
  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.scale,
      hasTouch: vp.touch,
      isMobile: vp.touch,
    });
    page.on('console', (m) => m.type() === 'error' && console.log('[browser]', m.text()));
    page.on('pageerror', (e) => console.log('[pageerror]', e.message));
    await page.goto(`http://localhost:${port}/`);
    await sleep(2500);
    await page.screenshot({ path: `${outDir}/${vp.name}-menu.png` });
    await page.getByText('Neues Spiel').click();
    await sleep(500);
    // Schnelldurchlauf: einige Spielminuten
    await page.evaluate(() => {
      const g = window.__game;
      g.setSpeed(3);
    });
    await sleep(8000);
    await page.evaluate(() => {
      const g = window.__game;
      g.setSpeed(1);
      g.view.rig.zoomIndex = 4;
      g.view.rig.lookAt(30, 30);
    });
    await sleep(1500);
    await page.screenshot({ path: `${outDir}/${vp.name}-overview.png` });
    await page.evaluate(() => {
      const g = window.__game;
      g.view.rig.zoomIndex = 1;
      g.view.rig.lookAt(g.world.warehouse.x + 6, g.world.warehouse.y + 4);
    });
    await sleep(1500);
    await page.screenshot({ path: `${outDir}/${vp.name}-warehouse.png` });
    await page.evaluate(() => {
      const g = window.__game;
      g.view.rig.zoomIndex = 1;
      g.view.rig.lookAt(40, 26);
    });
    await sleep(1500);
    await page.screenshot({ path: `${outDir}/${vp.name}-street.png` });
    if (process.env.SHOTS_EXTRA) {
      const extra = await import(process.env.SHOTS_EXTRA);
      await extra.default(page, outDir, vp.name, sleep);
    }
    await page.close();
  }
} finally {
  await browser.close();
  server.kill('SIGTERM');
}
console.log('Screenshots gespeichert in', outDir);
process.exit(0);
