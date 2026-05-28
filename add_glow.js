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
    
    // Replace the old generic drop shadow with a strong colored glow effect
    const oldShadow = "hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)]";
    const newGlow = "hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1";
    
    if (content.includes(oldShadow)) {
      content = content.replace(new RegExp(oldShadow.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newGlow);
      changed = true;
    }

    // Also look for any remaining Cards that might not have this glow, or clean up extra hover:-translate-y-1
    content = content.replace(/hover:-translate-y-1\s+hover:-translate-y-1/g, 'hover:-translate-y-1');

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Added glow to', filePath);
    }
  }
});
