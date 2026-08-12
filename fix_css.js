const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css = css.replace(/url\([^)]*flags\.png\)/g, 'none');
fs.writeFileSync('src/app/globals.css', css);
console.log('Fixed CSS');
