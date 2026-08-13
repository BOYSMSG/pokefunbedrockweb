const fs = require('fs');
const path = require('path');

const NEW_LINK = 'https://discord.gg/9AU3kHZZDT';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') {
        walkDir(dirPath, callback);
      }
    } else {
      if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.js') || f.endsWith('.html')) {
        callback(path.join(dir, f));
      }
    }
  });
}

walkDir(path.join(__dirname, 'src'), (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  const regex = /https:\/\/discord\.gg\/[a-zA-Z0-9]+/g;
  if (regex.test(content)) {
    console.log(`Updating in: ${filePath}`);
    content = content.replace(regex, NEW_LINK);
    fs.writeFileSync(filePath, content);
  }
});
console.log('Update complete.');
