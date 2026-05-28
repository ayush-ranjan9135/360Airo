const fs = require('fs');
const path = 'src/app/dashboard/pipeline/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add import
if (!content.includes('import { ProspectCard }')) {
  content = content.replace(
    'import { TiltCard } from "@/components/ui/tilt-card";',
    'import { TiltCard } from "@/components/ui/tilt-card";\nimport { ProspectCard } from "@/components/pipeline/ProspectCard";'
  );
}

// Ensure the local PipelineStage and Prospect interfaces don't conflict, 
// actually since they are defined in page.tsx we can leave them or import them.
// Let's just use ProspectCard.

// We have 4 blocks of this exact structure:
/*
<TiltCard key={p.id} className="w-full block">
  <motion.div
  ... lots of code ...
  </motion.div>
</TiltCard>
*/

// Let's replace the map functions for the 4 stages.

// 1. Contact Stage (themeColor: blue)
const contactRegex = /<TiltCard key=\{p\.id\} className="w-full block">[\s\S]*?<\/TiltCard>/;
content = content.replace(contactRegex, `<ProspectCard 
                      key={p.id} 
                      prospect={p} 
                      themeColor="blue" 
                      shadowColor="hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
                      handleDragStart={handleDragStart} 
                      moveStage={moveStage} 
                      handleEditProspect={handleEditProspect} 
                      handleDeleteProspect={handleDeleteProspect} 
                    />`);

// 2. Interested Stage (themeColor: orange/purple? The code had shadow: rgba(124,58,237...) which is purple)
// Wait, the previous shadows were manually set per column or all purple?
// Let's just replace all remaining 3 TiltCards.
let match;
while ((match = contactRegex.exec(content)) !== null) {
  content = content.replace(contactRegex, `<ProspectCard 
                      key={p.id} 
                      prospect={p} 
                      themeColor="purple" 
                      shadowColor="hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)]"
                      handleDragStart={handleDragStart} 
                      moveStage={moveStage} 
                      handleEditProspect={handleEditProspect} 
                      handleDeleteProspect={handleDeleteProspect} 
                    />`);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Pipeline page refactored!');
