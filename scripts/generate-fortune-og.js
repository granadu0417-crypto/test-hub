const fs = require('fs');
const path = require('path');

// 운세 페이지별 데이터
const fortunePages = [
  {
    slug: 'fortune',
    title: '오늘의 운세',
    subtitle: '별자리·띠별·타로 운세',
    icon: '🌙',
    filename: 'og-fortune.svg'
  },
  {
    slug: 'fortune-zodiac',
    title: '별자리 운세',
    subtitle: '12별자리 오늘의 운세',
    icon: '♈',
    filename: 'og-fortune-zodiac.svg'
  },
  {
    slug: 'fortune-chinese-zodiac',
    title: '띠별 운세',
    subtitle: '12띠 오늘의 운세',
    icon: '🐭',
    filename: 'og-fortune-chinese-zodiac.svg'
  },
  {
    slug: 'fortune-tarot',
    title: '타로 운세',
    subtitle: '원카드 타로 리딩',
    icon: '🃏',
    filename: 'og-fortune-tarot.svg'
  }
];

// 운세 테마 색상 (nightsky theme)
const fortuneColors = {
  start: '#1e1b4b', // indigo-950
  middle: '#312e81', // indigo-900
  end: '#4c1d95', // purple-900
  accent: '#fbbf24', // amber-400
  textColor: '#FFFFFF'
};

// SVG 생성 함수
function generateFortuneSVG(pageData) {
  const { title, subtitle, icon } = pageData;
  const colors = fortuneColors;

  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <!-- 그라데이션 배경 -->
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.start};stop-opacity:1" />
      <stop offset="50%" style="stop-color:${colors.middle};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.end};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.accent};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- 배경 -->
  <rect width="1200" height="630" fill="url(#grad)"/>

  <!-- 별 패턴 장식 -->
  <circle cx="150" cy="100" r="3" fill="${colors.accent}" opacity="0.8"/>
  <circle cx="200" cy="150" r="2" fill="${colors.accent}" opacity="0.6"/>
  <circle cx="180" cy="180" r="2.5" fill="${colors.accent}" opacity="0.7"/>
  <circle cx="1050" cy="120" r="3" fill="${colors.accent}" opacity="0.8"/>
  <circle cx="1000" cy="80" r="2" fill="${colors.accent}" opacity="0.6"/>
  <circle cx="1080" cy="100" r="2.5" fill="${colors.accent}" opacity="0.7"/>
  <circle cx="100" cy="500" r="2.5" fill="${colors.accent}" opacity="0.6"/>
  <circle cx="150" cy="520" r="2" fill="${colors.accent}" opacity="0.5"/>
  <circle cx="1100" cy="520" r="2.5" fill="${colors.accent}" opacity="0.6"/>
  <circle cx="1050" cy="550" r="2" fill="${colors.accent}" opacity="0.5"/>

  <!-- 반투명 원형 장식 -->
  <circle cx="200" cy="200" r="120" fill="rgba(251, 191, 36, 0.05)"/>
  <circle cx="1000" cy="450" r="150" fill="rgba(251, 191, 36, 0.05)"/>
  <circle cx="950" cy="120" r="100" fill="rgba(255, 255, 255, 0.03)"/>

  <!-- 이모지 아이콘 -->
  <text x="600" y="200" text-anchor="middle" font-size="140" font-family="'Noto Color Emoji', 'Apple Color Emoji', 'Segoe UI Emoji', Arial, sans-serif">${icon}</text>

  <!-- 제목 -->
  <text x="600" y="330" text-anchor="middle" font-size="72" font-weight="900" fill="url(#textGrad)" font-family="'Noto Sans KR', 'Malgun Gothic', sans-serif">${title}</text>

  <!-- 부제목 -->
  <text x="600" y="390" text-anchor="middle" font-size="38" font-weight="600" fill="rgba(203, 213, 225, 0.9)" font-family="'Noto Sans KR', 'Malgun Gothic', sans-serif">${subtitle}</text>

  <!-- 장식 라인 -->
  <line x1="380" y1="440" x2="820" y2="440" stroke="${colors.accent}" stroke-width="3" opacity="0.3"/>

  <!-- 브랜드 로고 -->
  <text x="600" y="520" text-anchor="middle" font-size="32" fill="${colors.accent}" font-weight="700" font-family="'Noto Sans KR', Arial, sans-serif">✨ natest.kr</text>
  <text x="600" y="560" text-anchor="middle" font-size="24" fill="rgba(203, 213, 225, 0.7)" font-weight="500" font-family="'Noto Sans KR', Arial, sans-serif">무료 운세 · 매일 업데이트</text>
</svg>`;

  return svg;
}

// 메인 실행
const outputDir = path.join(__dirname, '../static/images/og');

// 출력 디렉토리 생성
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🌙 운세 OG 이미지 생성 시작...\n');

let generated = 0;

fortunePages.forEach(pageData => {
  const svg = generateFortuneSVG(pageData);
  const outputPath = path.join(outputDir, pageData.filename);

  fs.writeFileSync(outputPath, svg);
  generated++;

  console.log(`✅ Generated: ${pageData.filename} (${pageData.title})`);
});

console.log(`\n🎉 총 ${generated}개 운세 OG 이미지 생성 완료!`);
console.log(`📁 저장 경로: ${outputDir}`);
