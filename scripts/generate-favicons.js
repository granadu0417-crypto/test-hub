const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const SOURCE_SVG = path.join(__dirname, '..', 'static', 'images', 'favicon-source.svg');
const OUTPUT_DIR = path.join(__dirname, '..', 'static', 'images');

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' }
];

console.log('🎨 파비콘 생성 시작...\n');

async function generateFavicons() {
  // SVG 파일 읽기
  const svgBuffer = fs.readFileSync(SOURCE_SVG);

  let generated = 0;

  for (const { size, name } of sizes) {
    try {
      const resvg = new Resvg(svgBuffer, {
        fitTo: {
          mode: 'width',
          value: size,
        },
        font: {
          loadSystemFonts: true,
        },
      });

      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();

      const outputPath = path.join(OUTPUT_DIR, name);
      fs.writeFileSync(outputPath, pngBuffer);

      generated++;
      console.log(`✅ ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ ${name} 생성 실패:`, error.message);
    }
  }

  console.log(`\n🎉 생성 완료! ${generated}개 파비콘 생성됨`);
  console.log(`📁 저장 위치: ${OUTPUT_DIR}\n`);
}

generateFavicons().catch(error => {
  console.error('❌ 생성 중 오류 발생:', error);
  process.exit(1);
});
