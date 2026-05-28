const fs = require('fs');

// 1. Update theme-context.tsx to make light mode text darker and feature backgrounds more visible
let themePath = 'src/lib/theme-context.tsx';
let themeContent = fs.readFileSync(themePath, 'utf8');

// textMuted from slate-400 to slate-500/600 for better contrast in light mode
themeContent = themeContent.replace('textMuted:      "#94a3b8"', 'textMuted:      "#64748b"');
themeContent = themeContent.replace('textSub:        "#64748b"', 'textSub:        "#475569"');
themeContent = themeContent.replace('featureBg:      "rgba(99,102,241,0.035)"', 'featureBg:      "rgba(99,102,241,0.08)"');
themeContent = themeContent.replace('featureBorder:  "rgba(99,102,241,0.1)"', 'featureBorder:  "rgba(99,102,241,0.2)"');
// Also strengthen the divider
themeContent = themeContent.replace('divider:        "#e2e6f5"', 'divider:        "#cbd5e1"');

fs.writeFileSync(themePath, themeContent, 'utf8');


// 2. Update auth/page.tsx to use dynamic gradients based on isDark
let authPath = 'src/app/auth/page.tsx';
let authContent = fs.readFileSync(authPath, 'utf8');

// Replace "primary inbox" gradient
const targetHeroGrad = `from-indigo-400 via-violet-400 to-purple-400`;
const newHeroGrad = `\${isDark ? "from-indigo-400 via-violet-400 to-purple-400" : "from-indigo-600 via-violet-600 to-purple-700"}`;

// We need to change the className string to a template literal for the hero span.
// Find: className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent"
authContent = authContent.replace(
  'className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent"',
  'className={`bg-gradient-to-r ${isDark ? "from-indigo-400 via-violet-400 to-purple-400" : "from-indigo-600 via-violet-600 to-purple-700"} bg-clip-text text-transparent`}'
);

// Replace Stats gradient
authContent = authContent.replace(
  /className="text-\[22px\] font-black bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent tracking-tight group-hover:drop-shadow-\[0_0_12px_rgba\(139,92,246,0\.6\)\] transition-all duration-300"/g,
  'className={`text-[22px] font-black bg-gradient-to-r ${isDark ? "from-indigo-400 via-violet-400 to-purple-400" : "from-indigo-600 via-violet-600 to-purple-700"} bg-clip-text text-transparent tracking-tight group-hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.6)] transition-all duration-300`}'
);

// Replace Stats label textMuted to be stronger
// Wait, textMuted in theme-context is now stronger, so that might be enough.
// We can also make the stats numbers larger if needed, but 22px is okay. Let's make it 24px for a bit more impact.
authContent = authContent.replace(/text-\[22px\]/g, 'text-[26px]');

fs.writeFileSync(authPath, authContent, 'utf8');
console.log('Light mode UI fixed successfully!');
