const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('src/app', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // enhance group-hover:scale-110 to add rotate and translation for a better pop animation
    content = content.replace(/group-hover:scale-110(\s+duration-200|\s+transition-transform)?/g, 'group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-6 transition-all duration-300');
    
    // In case there's another format
    content = content.replace(/group-hover:scale-110/g, 'group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-6');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
