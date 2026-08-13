const fs = require('fs');
const path = require('path');

const showcaseDir = path.join(__dirname, 'public/images/showcase');
const files = fs.readdirSync(showcaseDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

const pagePath = path.join(__dirname, 'src/app/showcase/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

const replacement = `const showcaseImages = [\n  ${files.map(f => `"${f}"`).join(',\n  ')}\n];`;

content = content.replace(/const showcaseImages = \[\s*[\s\S]*?\s*\];/m, replacement);
fs.writeFileSync(pagePath, content);
console.log('Updated showcaseImages in page.tsx');
