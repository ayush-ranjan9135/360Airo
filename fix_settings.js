const fs = require('fs');
const path = 'src/app/dashboard/settings/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Title
content = content.replace('text-3xl font-extrabold tracking-tight text-white', 'text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white');

// Subtitle
content = content.replace(/text-muted-foreground mt-1\.5/g, 'text-slate-600 dark:text-slate-400 mt-1.5 font-medium');

// Cards
content = content.replace(/bg-card\/45/g, 'bg-white dark:bg-card/45');
content = content.replace(/border-border\/30/g, 'border-slate-200 dark:border-border/30 shadow-sm');
content = content.replace(/hover:shadow-\[0_0_25px_rgba\(124,58,237,0\.25\)\]/g, 'hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.25)]');

// Card Headers
content = content.replace(/text-muted-foreground font-mono/g, 'text-slate-500 dark:text-slate-400 font-mono');
content = content.replace(/<CardDescription>Update your personal account credentials.<\/CardDescription>/g, '<CardDescription className="text-slate-600 dark:text-slate-400 font-medium mt-1">Update your personal account credentials.</CardDescription>');
content = content.replace(/<CardDescription>Throttling parameters applied to connected domains.<\/CardDescription>/g, '<CardDescription className="text-slate-600 dark:text-slate-400 font-medium mt-1">Throttling parameters applied to connected domains.</CardDescription>');
content = content.replace(/<CardDescription>Authentication tokens for syncing custom workflows.<\/CardDescription>/g, '<CardDescription className="text-slate-600 dark:text-slate-400 font-medium mt-1">Authentication tokens for syncing custom workflows.</CardDescription>');
content = content.replace(/<CardDescription className="text-xs">Export campaign metrics to third-party CRM systems.<\/CardDescription>/g, '<CardDescription className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">Export campaign metrics to third-party CRM systems.</CardDescription>');

// Form labels
content = content.replace(/text-slate-300/g, 'text-slate-700 dark:text-slate-300 font-bold');

// Empty state
content = content.replace(/text-muted-foreground italic/g, 'text-slate-500 dark:text-slate-400 italic');

// API Key items
content = content.replace(/bg-white\/2/g, 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-border/20');
content = content.replace(/text-white/g, 'text-slate-900 dark:text-white');
content = content.replace(/text-purple-300/g, 'text-purple-600 dark:text-purple-300');
content = content.replace(/hover:text-white/g, 'hover:text-slate-900 dark:hover:text-white');

// Integrations
content = content.replace(/text-muted-foreground leading-normal/g, 'text-slate-500 dark:text-slate-400 leading-normal font-medium');
// Note: `text-white` was already replaced to `text-slate-900 dark:text-white`, so integration names are handled.
// `bg-white/2` was replaced to `bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-border/20`.
content = content.replace(/border-border\/10/g, 'border-slate-100 dark:border-border/10');
content = content.replace(/divide-border\/10/g, 'divide-slate-100 dark:divide-border/10');

// Inputs border styling
// Add dark mode border to Input explicitly if it's not handled by global UI component. 
// Assuming global UI component is fine, but maybe let's wrap Input in a div or just rely on global css. 

fs.writeFileSync(path, content, 'utf8');
console.log('Settings page UI updated for better legibility and contrast.');
