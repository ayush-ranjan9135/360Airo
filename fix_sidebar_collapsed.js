const fs = require('fs');
const path = 'src/components/layout/sidebar.tsx';
let content = fs.readFileSync(path, 'utf8');

// The Link container
const oldLinkClass = `"relative flex items-center justify-between px-3 py-3 rounded-xl text-[13px] font-bold tracking-tight",`;
const newLinkClass = `"relative flex items-center rounded-xl text-[13px] font-bold tracking-tight",
                      isCollapsed ? "justify-center py-3 px-0 w-10 h-10 mx-auto" : "justify-between px-3 py-3 w-full",`;

if (content.includes(oldLinkClass)) {
  content = content.replace(oldLinkClass, newLinkClass);
} else {
  console.log("Could not find oldLinkClass");
}

// We need to remove the w-full from the next line because we handled it above
const oldLinkClass2 = `"transition-all duration-300 group overflow-hidden w-full hover:shadow-[0_0_15px_rgba(124,58,237,0.05)]",`;
const newLinkClass2 = `"transition-all duration-300 group hover:shadow-[0_0_15px_rgba(124,58,237,0.05)]",`;

if (content.includes(oldLinkClass2)) {
  content = content.replace(oldLinkClass2, newLinkClass2);
} else {
  console.log("Could not find oldLinkClass2");
}

// Remove space-x-3 if collapsed so icon is perfectly centered
const oldIconContainer = `<div className="flex items-center space-x-3 truncate relative z-10 min-w-0">`;
const newIconContainer = `<div className={cn("flex items-center truncate relative z-10 min-w-0", !isCollapsed && "space-x-3")}>`;

if (content.includes(oldIconContainer)) {
  content = content.replace(oldIconContainer, newIconContainer);
} else {
  console.log("Could not find oldIconContainer");
}

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed collapsed sidebar UI clipping issues!');
