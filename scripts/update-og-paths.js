const fs = require('fs');
const path = require('path');

const testsDir = path.join(__dirname, '../content/tests');
const files = fs.readdirSync(testsDir).filter(f => f.endsWith('.md') && !fs.statSync(path.join(testsDir, f)).isDirectory());

let updated = 0;

files.forEach(file => {
  const filePath = path.join(testsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // ogImage 필드를 올바른 경로로 변경 (Hugo 템플릿이 images/를 추가하므로 og/만 필요)
  const originalContent = content;

  // 기존 패턴 찾기: ogImage: "og-xxx.jpg" 또는 ogImage: "/images/og/og-xxx.svg"
  content = content.replace(
    /^ogImage:\s*"(.+?)"/gm,
    (match, oldPath) => {
      // 파일명만 추출
      const basename = path.basename(oldPath, path.extname(oldPath));
      return `ogImage: "og/${basename}.svg"`;
    }
  );

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    updated++;
    console.log(`✅ Updated: ${file}`);
  } else {
    console.log(`⏭️  Skipped: ${file} (no change needed)`);
  }
});

console.log(`\n🎉 Total updated: ${updated} files`);
