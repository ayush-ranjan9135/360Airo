const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('src/app/dashboard', function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Replace <Card className=\"...\"> or <Card className={\`...\`}> with added hover effects
    content = content.replace(/<Card\s+className=(\"|\`)([\s\S]*?)(\"|\`)/g, (match, p1, p2, p3) => {
      // If it already has hover:-translate-y, skip
      if (p2.includes('hover:-translate-y')) return match;
      
      let newClasses = p2;
      // Make sure transition-all and duration-300 exist
      if (!newClasses.includes('transition-all')) {
        newClasses += ' transition-all';
      }
      if (!newClasses.includes('duration-300') && !newClasses.includes('duration-')) {
        newClasses += ' duration-300';
      }
      
      // Add the translation and strong glow
      if (!newClasses.includes('hover:-translate-y-1')) {
        newClasses += ' hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)] cursor-pointer';
      }
      changed = true;
      return '<Card className=' + p1 + newClasses + p3;
    });

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
