const fs = require('fs');
const path = 'src/app/dashboard/pipeline/page.tsx';
let pipeline = fs.readFileSync(path, 'utf8');

// The closing tags are currently just `</motion.div>\n                  ))`
// But wait, there are 4 of them. Let's fix them.
pipeline = pipeline.replace(
  /<\/motion\.div>\n\s*\)\)}/g,
  '</motion.div>\n                    </TiltCard>\n                  ))}'
);

fs.writeFileSync(path, pipeline, 'utf8');
console.log('Fixed missing TiltCard closing tags.');
