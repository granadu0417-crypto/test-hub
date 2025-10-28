const pngToIco = require('png-to-ico');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'static', 'images');
const OUTPUT_PATH = path.join(__dirname, '..', 'static', 'favicon.ico');

console.log('🎨 favicon.ico 생성 시작...\n');

async function createFaviconIco() {
  try {
    // 32x32 PNG를 ICO로 변환 (단일 사이즈로 시도)
    const inputFile = path.join(IMAGES_DIR, 'favicon-32x32.png');
    const buf = await pngToIco(inputFile);

    fs.writeFileSync(OUTPUT_PATH, buf);

    console.log('✅ favicon.ico 생성 완료!');
    console.log(`📁 저장 위치: ${OUTPUT_PATH}\n`);
  } catch (error) {
    console.error('❌ favicon.ico 생성 실패:', error.message);
    console.error('대신 32x32 PNG를 favicon.ico로 복사합니다...');

    // 실패시 그냥 PNG를 ICO로 복사
    const pngPath = path.join(IMAGES_DIR, 'favicon-32x32.png');
    fs.copyFileSync(pngPath, OUTPUT_PATH);
    console.log('✅ favicon.ico (PNG 형식) 생성 완료!');
  }
}

createFaviconIco();
