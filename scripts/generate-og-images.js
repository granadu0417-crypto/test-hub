const fs = require('fs');
const path = require('path');

// 카테고리별 색상 정의 (그라데이션)
const categoryColors = {
  personality: {
    start: '#8B5CF6',
    end: '#6366F1',
    textColor: '#FFFFFF'
  },
  fun: {
    start: '#F59E0B',
    end: '#EF4444',
    textColor: '#FFFFFF'
  },
  romance: {
    start: '#EC4899',
    end: '#F43F5E',
    textColor: '#FFFFFF'
  },
  healing: {
    start: '#3B82F6',
    end: '#06B6D4',
    textColor: '#FFFFFF'
  },
  career: {
    start: '#10B981',
    end: '#059669',
    textColor: '#FFFFFF'
  }
};

// SVG 생성 함수
function generateSVG(title, icon, category) {
  const colors = categoryColors[category] || categoryColors.personality;

  // 제목을 적절한 길이로 자르기 (너무 길면 두 줄로)
  const maxLength = 30;
  let titleLines = [];
  if (title.length > maxLength) {
    // 중간에 적절한 위치에서 나누기
    const words = title.split(' ');
    let line1 = '';
    let line2 = '';
    let switching = false;

    for (const word of words) {
      if (!switching && (line1 + word).length < maxLength / 2) {
        line1 += word + ' ';
      } else {
        switching = true;
        line2 += word + ' ';
      }
    }

    if (line2.trim()) {
      titleLines = [line1.trim(), line2.trim()];
    } else {
      titleLines = [title.substring(0, maxLength), title.substring(maxLength)];
    }
  } else {
    titleLines = [title];
  }

  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <!-- 그라데이션 배경 -->
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.start};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.end};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- 배경 -->
  <rect width="1200" height="630" fill="url(#grad)"/>

  <!-- 반투명 오버레이 패턴 -->
  <circle cx="150" cy="150" r="100" fill="rgba(255,255,255,0.05)"/>
  <circle cx="1050" cy="480" r="120" fill="rgba(255,255,255,0.05)"/>
  <circle cx="950" cy="100" r="80" fill="rgba(0,0,0,0.05)"/>

  <!-- 이모지 아이콘 (중앙 상단) -->
  <text x="600" y="220" text-anchor="middle" font-size="140" font-family="'Noto Color Emoji', 'Apple Color Emoji', 'Segoe UI Emoji', Arial, sans-serif">${icon}</text>

  <!-- 테스트 제목 -->
  ${titleLines.length === 1 ? `
  <text x="600" y="360" text-anchor="middle" font-size="58" font-weight="bold" fill="${colors.textColor}" font-family="'Noto Sans KR', 'Malgun Gothic', sans-serif">${titleLines[0]}</text>
  ` : `
  <text x="600" y="340" text-anchor="middle" font-size="52" font-weight="bold" fill="${colors.textColor}" font-family="'Noto Sans KR', 'Malgun Gothic', sans-serif">${titleLines[0]}</text>
  <text x="600" y="405" text-anchor="middle" font-size="52" font-weight="bold" fill="${colors.textColor}" font-family="'Noto Sans KR', 'Malgun Gothic', sans-serif">${titleLines[1]}</text>
  `}

  <!-- 브랜드 로고 (하단) -->
  <text x="600" y="540" text-anchor="middle" font-size="32" fill="rgba(255,255,255,0.9)" font-weight="500" font-family="'Noto Sans KR', Arial, sans-serif">natest.kr</text>
  <line x1="480" y1="560" x2="720" y2="560" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
</svg>`;

  return svg;
}

// 메인 실행
const testsDir = path.join(__dirname, '../content/tests');
const outputDir = path.join(__dirname, '../static/images/og');

// 출력 디렉토리 생성
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 테스트 파일 읽기
const files = fs.readdirSync(testsDir).filter(f => f.endsWith('.md') && !fs.statSync(path.join(testsDir, f)).isDirectory());

let generated = 0;

files.forEach(file => {
  const content = fs.readFileSync(path.join(testsDir, file), 'utf-8');
  const lines = content.split('\n');

  const metadata = {};
  let inFrontmatter = false;

  for (const line of lines) {
    if (line.trim() === '---') {
      inFrontmatter = !inFrontmatter;
      continue;
    }

    if (inFrontmatter) {
      const match = line.match(/^(\w+):\s*"(.+)"|^(\w+):\s*(.+)/);
      if (match) {
        const key = match[1] || match[3];
        const value = match[2] || match[4];
        metadata[key] = value;
      }
    }
  }

  const title = metadata.title || '';
  const icon = metadata.icon || '📝';
  const category = metadata.category || 'personality';
  const ogImage = metadata.ogImage || `og-${file.replace('.md', '')}.jpg`;

  // SVG 생성
  const svg = generateSVG(title, icon, category);

  // SVG 파일로 저장 (og/ 경로 제거 후 파일명만 추출)
  let outputFilename = ogImage.replace('.jpg', '.svg').replace('.png', '.svg');
  // og/ 접두사가 있다면 제거
  if (outputFilename.startsWith('og/')) {
    outputFilename = outputFilename.substring(3);
  }
  const outputPath = path.join(outputDir, outputFilename);

  fs.writeFileSync(outputPath, svg);
  generated++;

  console.log(`✅ Generated: ${outputFilename}`);
});

console.log(`\n🎉 Total generated: ${generated} images`);
console.log(`📁 Output directory: ${outputDir}`);
