const fs = require('fs');
const path = 'src/app/auth/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add TiltCard import
if (!content.includes('import { TiltCard }')) {
  content = content.replace(
    'import { cn } from "@/lib/utils";',
    'import { cn } from "@/lib/utils";\nimport { TiltCard } from "@/components/ui/tilt-card";'
  );
}

// Replace the FEATURES map
const targetFeaturesMap = `          {/* Features */}
          <div className="grid gap-2.5">
            {FEATURES.map(({ icon: Icon, color, bg, border, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
                style={{ background: t.featureBg, borderWidth: "1px", borderStyle: "solid", borderColor: t.featureBorder, transition: TS }}
                className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-200">
                <div style={{ background: bg, borderWidth: "1px", borderStyle: "solid", borderColor: border, transition: TS }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                  <Icon className="h-4 w-4" style={{ color }} />
                </div>
                <div>
                  <p style={{ color: t.text, transition: TS }} className="text-sm font-bold">{title}</p>
                  <p style={{ color: t.textMuted, transition: TS }} className="text-xs mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>`;

const newFeaturesMap = `          {/* Features */}
          <div className="grid gap-3 group/features">
            {FEATURES.map(({ icon: Icon, color, bg, border, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
                <TiltCard className="block w-full">
                  <div 
                    style={{ background: t.featureBg, transition: TS }}
                    className="flex items-start gap-4 p-4 rounded-2xl border border-transparent hover:border-indigo-500/30 dark:hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group/card"
                  >
                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-purple-500/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div style={{ background: bg, borderWidth: "1px", borderStyle: "solid", borderColor: border, transition: TS }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl relative z-10">
                      <Icon className="h-4 w-4 group-hover/card:scale-110 transition-transform duration-300" style={{ color }} />
                    </div>
                    <div className="relative z-10">
                      <p style={{ color: t.text, transition: TS }} className="text-sm font-bold group-hover/card:text-indigo-400 dark:group-hover/card:text-indigo-300 transition-colors">{title}</p>
                      <p style={{ color: t.textMuted, transition: TS }} className="text-xs mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>`;

content = content.replace(targetFeaturesMap, newFeaturesMap);

fs.writeFileSync(path, content, 'utf8');
console.log('Auth features animated successfully!');
