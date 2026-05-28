const fs = require('fs');
const path = 'src/app/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add framer-motion import
if (!content.includes('import { motion }')) {
  content = content.replace(
    'import { Button } from "@/components/ui/button";',
    'import { Button } from "@/components/ui/button";\nimport { motion } from "framer-motion";'
  );
}

// 2. Replace static line and arrow with animated ones
const staticLineCode = `{/* Continuous connector track (desktop only) */}
          <div className="hidden md:block absolute top-[51px] left-[8.33%] right-[8.33%] h-[2px] rounded-full pointer-events-none overflow-hidden"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.07)",
            }}
          >
            {/* Animated fill progress */}
            <div className="absolute inset-y-0 left-0 w-full timeline-progress-fill"
              style={{
                background: "linear-gradient(90deg, rgba(139,92,246,0.8), rgba(59,130,246,0.9), rgba(6,182,212,0.9), rgba(20,184,166,0.8), rgba(16,185,129,0.8))",
              }}
            />
          </div>

          {/* Arrow-head that travels along the line */}
          <div className="hidden md:block absolute top-[44px] pointer-events-none timeline-arrow">`;

const animatedLineCode = `{/* Continuous connector track (desktop only) */}
          <div className="hidden md:block absolute top-[51px] left-[8.33%] right-[8.33%] h-[2px] rounded-full pointer-events-none overflow-hidden"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.07)",
            }}
          >
            {/* Animated fill progress */}
            <motion.div 
              className="absolute inset-y-0 left-0 w-full origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              style={{
                background: "linear-gradient(90deg, rgba(139,92,246,0.8), rgba(59,130,246,0.9), rgba(6,182,212,0.9), rgba(20,184,166,0.8), rgba(16,185,129,0.8))",
              }}
            />
          </div>

          {/* Arrow-head that travels along the line */}
          <motion.div 
            className="hidden md:block absolute top-[44px] pointer-events-none"
            initial={{ left: "8.33%", opacity: 0 }}
            whileInView={{ left: "90%", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          >`;

content = content.replace(staticLineCode, animatedLineCode);

// 3. Animate the step circles popping in
const staticStepStart = `<div key={step.label} className="flex flex-col items-center group cursor-default" style={{ animationDelay: \`\${i * 80}ms\` }}>`;
const animatedStepStart = `<motion.div 
                  key={step.label} 
                  className="flex flex-col items-center group cursor-default"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.4 + 0.2, type: "spring", stiffness: 100 }}
                >`;

content = content.replace(/<div key=\{step\.label\} className="flex flex-col items-center group cursor-default" style=\{\{ animationDelay: `\$\{i \* 80\}ms` \}\}>/g, animatedStepStart);

// Note: since we changed the step wrapper to motion.div, we need to change its closing tag from </div> to </motion.div>
// The closing tag for this map loop is inside `return ( ... ); })}`
// The structure is:
// return (
//   <motion.div ...>
//      ...
//   </div>
// );

content = content.replace(
  /<\/div>\n              \);\n            \}\)\}/g,
  '</motion.div>\n              );\n            })}'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Landing page timeline animated successfully!');
