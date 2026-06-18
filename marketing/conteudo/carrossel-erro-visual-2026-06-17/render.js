const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport to the exact slide dimensions
  await page.setViewportSize({ width: 1080, height: 1350 });
  
  const htmlPath = path.resolve(__dirname, 'carrossel.html');
  const fileUrl = `file://${htmlPath}`;
  
  console.log(`Abrindo HTML: ${fileUrl}`);
  await page.goto(fileUrl);
  
  // Cria a pasta instagram se não existir
  const outputDir = path.resolve(__dirname, 'instagram');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Seleciona todos os slides
  const slides = await page.$$('.slide');
  console.log(`Encontrados ${slides.length} slides.`);
  
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const index = String(i + 1).padStart(2, '0');
    const outputPath = path.join(outputDir, `slide-${index}.png`);
    
    console.log(`Renderizando slide ${index}...`);
    await slide.screenshot({
      path: outputPath,
      type: 'png'
    });
  }
  
  await browser.close();
  console.log('Renderização concluída com sucesso!');
})();
