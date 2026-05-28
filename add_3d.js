const fs = require('fs');

// 1. Update dashboard/page.tsx
const dashboardPath = 'src/app/dashboard/page.tsx';
let dashboard = fs.readFileSync(dashboardPath, 'utf8');

if (!dashboard.includes('import { TiltCard }')) {
  dashboard = dashboard.replace(
    'import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";',
    'import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";\nimport { TiltCard } from "@/components/ui/tilt-card";'
  );
  
  // Wrap Quick Actions in TiltCard
  dashboard = dashboard.replace(
    /<Card className="border-border\/30 bg-card\/45/g,
    '<TiltCard><Card className="border-border/30 bg-card/45 h-full'
  );
  // Find closing tags for those cards: it's followed by </div> or just closing tag.
  // There are 3 quick action cards. Let's do it manually via a smart regex or split.
  
  const parts = dashboard.split('<TiltCard><Card className="border-border/30 bg-card/45 h-full');
  // parts[0] is everything before first card
  // parts[1] is inside card 1, ending at </Card>
  // parts[2] is inside card 2...
  
  if (parts.length === 4) { // 3 cards
    for (let i = 1; i <= 3; i++) {
      parts[i] = parts[i].replace('</Card>', '</Card></TiltCard>');
    }
    dashboard = parts.join('<TiltCard><Card className="border-border/30 bg-card/45 h-full');
  }

  // Also stagger animate the main grid container for polishing
  // The quick actions grid is `<div className="grid gap-6 md:grid-cols-3">`
  // We can wrap it with framer motion staggered entry, but that might be too complex for a script. Let's stick to TiltCard.
  
  fs.writeFileSync(dashboardPath, dashboard, 'utf8');
}

// 2. Update pipeline/page.tsx
const pipelinePath = 'src/app/dashboard/pipeline/page.tsx';
let pipeline = fs.readFileSync(pipelinePath, 'utf8');

if (!pipeline.includes('import { TiltCard }')) {
  pipeline = pipeline.replace(
    'import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";',
    'import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";\nimport { TiltCard } from "@/components/ui/tilt-card";'
  );

  // We have 4 mapped blocks where we use <motion.div ...> for cards.
  // We can wrap them in TiltCard: <TiltCard className="w-full"><motion.div ...> ... </motion.div></TiltCard>
  // Let's replace `<motion.div\n                      key={p.id}\n                      draggable` 
  // with `<TiltCard key={p.id} className="w-full"><motion.div\n                      draggable`
  
  pipeline = pipeline.replace(
    /<motion\.div\n\s*key=\{p\.id\}\n\s*draggable/g,
    '<TiltCard key={p.id} className="w-full block">\n                    <motion.div\n                      draggable'
  );
  
  // Replace the closing `</motion.div>\n                  ))} ` with `</motion.div>\n                  </TiltCard>\n                  ))`
  pipeline = pipeline.replace(
    /<\/motion\.div>\n\s*\}\)\}/g,
    '</motion.div>\n                    </TiltCard>\n                  ))}'
  );

  fs.writeFileSync(pipelinePath, pipeline, 'utf8');
}

console.log('Added TiltCard wrapping to Dashboard and Pipeline.');
