const fs = require('fs');

function makeColorful(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  const blocks = content.split(/(?=\{)/); 
  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i];
    const bgClassMatch = block.match(/bgClass:\s*"bg-white (dark:bg-[^"]+)"/);
    const iconBgClassMatch = block.match(/iconBgClass:\s*"bg-([a-z]+)-50/);
    
    if (bgClassMatch && iconBgClassMatch) {
      const color = iconBgClassMatch[1];
      const newBgClass = `bgClass: "bg-${color}-50/50 ${bgClassMatch[1]}"`;
      blocks[i] = block.replace(bgClassMatch[0], newBgClass);
    }
  }

  content = blocks.join('');
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

makeColorful('src/app/dashboard/page.tsx');
makeColorful('src/app/dashboard/prospects/page.tsx');
