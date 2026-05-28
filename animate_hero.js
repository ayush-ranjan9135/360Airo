const fs = require('fs');
const path = 'src/app/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add TiltCard import
if (!content.includes('import { TiltCard }')) {
  content = content.replace(
    'import { motion } from "framer-motion";',
    'import { motion } from "framer-motion";\nimport { TiltCard } from "@/components/ui/tilt-card";'
  );
}

// 2. Animate the right panel entrance and add TiltCard
const targetPanelStart = `<div className="relative hidden md:block">

            {/* Breathing rings behind card */}`;

const newPanelStart = `<motion.div 
            className="relative hidden md:block"
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 50 }}
          >
            <TiltCard>
            {/* Breathing rings behind card */}`;

content = content.replace(targetPanelStart, newPanelStart);

// Now I need to find the closing tag for this panel.
// The panel starts at line 681 and ends around line 813.
// The structure is:
//           {/* RIGHT — Live metrics panel */}
//           <div className="relative hidden md:block">  <-- Replaced with <motion.div><TiltCard>
//              ...
//              <div className={\`px-4 py-3 border-t \${bdrS} flex items-center justify-between\`}>
//                ...
//              </div>
//            </div>
//          </div>
//        </div>

const targetPanelEnd = `              </div>
            </div>
          </div>
        </div>

        {/* — Mobile email capture`;

const newPanelEnd = `              </div>
            </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* — Mobile email capture`;

content = content.replace(targetPanelEnd, newPanelEnd);

fs.writeFileSync(path, content, 'utf8');
console.log('Hero dashboard animated successfully!');
