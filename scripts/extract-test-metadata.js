const fs = require('fs');
const path = require('path');

const testsDir = path.join(__dirname, '../content/tests');
const files = fs.readdirSync(testsDir).filter(f => f.endsWith('.md') && !fs.statSync(path.join(testsDir, f)).isDirectory());

const tests = [];

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

  tests.push({
    filename: file.replace('.md', ''),
    title: metadata.title || '',
    icon: metadata.icon || '📝',
    category: metadata.category || 'personality',
    ogImage: metadata.ogImage || `og-${file.replace('.md', '')}.jpg`
  });
});

console.log(JSON.stringify(tests, null, 2));
