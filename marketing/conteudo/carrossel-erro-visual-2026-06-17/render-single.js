const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1080, height: 1350 });
  
  const htmlPath = path.resolve(__dirname, 'single-slide.html');
  const fileUrl = `file://${htmlPath}`;
  
  console.log(`Abrindo HTML: ${fileUrl}`);
  await page.goto(fileUrl);
  
  const slide = await page.$('.slide');
  if (slide) {
    const outputPath = path.resolve(__dirname, 'instagram', 'single-preview.png');
    console.log(`Renderizando single-preview.png...`);
    await slide.screenshot({
      path: outputPath,
      type: 'png'
    });
    console.log(`Concluído! Salvo em: ${outputPath}`);
  } else {
    console.error('Elemento .slide não encontrado.');
  }
  
  await browser.close();
})();
