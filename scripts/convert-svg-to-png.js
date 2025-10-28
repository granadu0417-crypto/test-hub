const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const OG_DIR = path.join(__dirname, '..', 'static', 'images', 'og');

console.log('🎨 SVG를 PNG로 변환 시작 (Resvg 사용)...\n');

// OG 디렉토리의 모든 SVG 파일 찾기
const files = fs.readdirSync(OG_DIR).filter(file => file.endsWith('.svg'));

console.log(`📁 찾은 SVG 파일: ${files.length}개\n`);

let converted = 0;
let failed = 0;

// 각 SVG 파일을 PNG로 변환
async function convertAllSvgs() {
  for (const file of files) {
    const svgPath = path.join(OG_DIR, file);
    const pngPath = path.join(OG_DIR, file.replace('.svg', '.png'));

    try {
      // SVG 파일 읽기
      const svgBuffer = fs.readFileSync(svgPath);

      // Resvg로 SVG를 PNG로 변환
      const resvg = new Resvg(svgBuffer, {
        fitTo: {
          mode: 'width',
          value: 1200,
        },
        font: {
          loadSystemFonts: true,
        },
      });

      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();

      // PNG 파일 저장
      fs.writeFileSync(pngPath, pngBuffer);

      converted++;
      console.log(`✅ ${file} → ${file.replace('.svg', '.png')}`);
    } catch (error) {
      failed++;
      console.error(`❌ ${file} 변환 실패:`, error.message);
    }
  }

  console.log(`\n🎉 변환 완료!`);
  console.log(`   성공: ${converted}개`);
  console.log(`   실패: ${failed}개`);
  console.log(`\n📁 저장 위치: ${OG_DIR}`);
}

convertAllSvgs().catch(error => {
  console.error('❌ 변환 중 오류 발생:', error);
  process.exit(1);
});
