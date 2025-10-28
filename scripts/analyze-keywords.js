const fs = require('fs');
const path = require('path');

// 검색량 높은 키워드 패턴
const highVolumeKeywords = {
  personality: ['무료', '정확한', '2025', '최신', '심리테스트', '성격유형', '성격분석'],
  romance: ['연애', '궁합', '사랑', '이상형', '썸', '짝사랑', '연애스타일'],
  fun: ['재미있는', '웃긴', 'BTI', '유형', '테스트', '밸런스게임'],
  healing: ['자가진단', '테스트', '지수', '측정', '자기분석', '힐링'],
  career: ['직업', '적성', '진로', '취업', '커리어', '성향']
};

const testsDir = path.join(__dirname, '../content/tests');
const files = fs.readdirSync(testsDir).filter(f => f.endsWith('.md') && !fs.statSync(path.join(testsDir, f)).isDirectory());

console.log('📊 키워드 최적화 분석\n');
console.log('='.repeat(80));

const recommendations = [];

files.forEach(file => {
  const filePath = path.join(testsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  let title = '';
  let description = '';
  let keywords = [];
  let category = '';
  let inFrontmatter = false;

  for (const line of lines) {
    if (line.trim() === '---') {
      inFrontmatter = !inFrontmatter;
      continue;
    }

    if (inFrontmatter) {
      if (line.startsWith('title:')) {
        title = line.replace(/^title:\s*"(.+)"/, '$1');
      } else if (line.startsWith('description:')) {
        description = line.replace(/^description:\s*"(.+)"/, '$1');
      } else if (line.startsWith('category:')) {
        category = line.replace(/^category:\s*"?(.+?)"?$/, '$1');
      } else if (line.startsWith('keywords:')) {
        const keywordsMatch = line.match(/\[(.*)\]/);
        if (keywordsMatch) {
          keywords = keywordsMatch[1].split(',').map(k => k.trim().replace(/"/g, ''));
        }
      }
    }
  }

  // 분석
  const missingKeywords = [];
  const categoryKeywords = highVolumeKeywords[category] || highVolumeKeywords.personality;

  // 제목에 "무료", "테스트" 있는지 확인
  const hasTest = title.includes('테스트') || title.includes('BTI');
  const hasFree = description.includes('무료');
  const hasYear = description.includes('2025');
  const hasTime = description.includes('분');

  if (!hasFree) missingKeywords.push('무료');
  if (!hasYear) missingKeywords.push('2025년');
  if (!hasTime && !description.includes('빠른')) missingKeywords.push('소요 시간');

  console.log(`\n📄 ${file}`);
  console.log(`   제목: ${title}`);
  console.log(`   카테고리: ${category}`);
  console.log(`   설명 길이: ${description.length}자`);

  if (missingKeywords.length > 0) {
    console.log(`   ⚠️  누락된 키워드: ${missingKeywords.join(', ')}`);
    recommendations.push({
      file,
      title,
      missingKeywords,
      suggestion: `설명에 "${missingKeywords.join('", "')}" 추가 권장`
    });
  } else {
    console.log(`   ✅ 키워드 최적화 양호`);
  }

  // 설명이 너무 짧거나 긴 경우
  if (description.length < 100) {
    console.log(`   ⚠️  설명이 너무 짧음 (${description.length}자) - 최소 120자 권장`);
  } else if (description.length > 200) {
    console.log(`   ⚠️  설명이 너무 길 수 있음 (${description.length}자) - 160자 권장`);
  }
});

console.log('\n' + '='.repeat(80));
console.log('\n📝 개선 권장 사항:');
if (recommendations.length === 0) {
  console.log('✅ 모든 테스트가 키워드 최적화되어 있습니다!');
} else {
  recommendations.forEach((rec, idx) => {
    console.log(`\n${idx + 1}. ${rec.file}`);
    console.log(`   ${rec.suggestion}`);
  });
}

console.log('\n💡 일반 권장사항:');
console.log('- 모든 설명에 "무료" 포함');
console.log('- "2025년 최신" 같은 시의성 키워드 추가');
console.log('- 소요 시간 명시 ("2분 완성", "3분 소요")');
console.log('- 혜택 명시 ("정확한", "과학적", "재미있는")');
console.log('- 행동 유도 ("지금 바로", "친구와 함께")');
