const fs = require('fs');

const filePath = 'src/app/dashboard/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const graphStart = content.indexOf('{/* ── ENGAGEMENT GRAPH ── */}');
const quickActionsStart = content.indexOf('{/* ── QUICK ACTIONS ── */}');

if (graphStart === -1 || quickActionsStart === -1) {
  console.log('Could not find sections.');
  process.exit(1);
}

const graphContent = content.substring(graphStart, quickActionsStart);

content = content.replace(graphContent, '');

const insertPos = content.lastIndexOf('    </div>\n  );');

if (insertPos !== -1) {
  content = content.substring(0, insertPos) + '\n      ' + graphContent + content.substring(insertPos);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Graph moved successfully!');
} else {
  console.log('Could not find insert position.');
}
