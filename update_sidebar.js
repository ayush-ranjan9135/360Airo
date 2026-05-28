const fs = require('fs');
const path = 'src/components/layout/sidebar.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Update the link rendering for better hover animation
const targetLinkStart = `<Link
                    href={item.isPremium ? "#" : item.href}
                    onClick={(e) => handleItemClick(e, item)}
                    className={cn(
                      "relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold",
                      "transition-colors duration-200 group overflow-hidden w-full",
                      isActive
                        ? isDark
                          ? "text-white"
                          : "text-purple-900"
                        : isDark
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-700 hover:text-slate-900"
                    )}
                  >`;

const newLinkStart = `<Link
                    href={item.isPremium ? "#" : item.href}
                    onClick={(e) => handleItemClick(e, item)}
                    className={cn(
                      "relative flex items-center justify-between px-3 py-3 rounded-xl text-[13px] font-bold tracking-tight",
                      "transition-all duration-300 group overflow-hidden w-full hover:shadow-[0_0_15px_rgba(124,58,237,0.05)]",
                      isActive
                        ? isDark
                          ? "text-white"
                          : "text-indigo-900"
                        : isDark
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/50"
                    )}
                  >`;

content = content.replace(targetLinkStart, newLinkStart);

// 2. Update active pill and accent bar
const oldActivePill = `                      <motion.span
                        layoutId="sidebar-active-pill"
                        className={cn(
                          "absolute inset-0 rounded-xl pointer-events-none z-0",
                          isDark
                            ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/10"
                            : "bg-gradient-to-r from-purple-100 to-indigo-50"
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                        }}
                      />`;
const newActivePill = `                      <motion.span
                        layoutId="sidebar-active-pill"
                        className={cn(
                          "absolute inset-0 rounded-xl pointer-events-none z-0 shadow-sm",
                          isDark
                            ? "bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-transparent"
                            : "bg-gradient-to-r from-indigo-50 via-purple-50/50 to-white"
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />`;
content = content.replace(oldActivePill, newActivePill);

const oldAccentBar = `                      <motion.span
                        layoutId="sidebar-active-bar"
                        className={cn(
                          "absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-r-full pointer-events-none z-10",
                          isDark ? "bg-purple-500" : "bg-purple-600"
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                        }}
                      />`;
const newAccentBar = `                      <motion.span
                        layoutId="sidebar-active-bar"
                        className={cn(
                          "absolute left-0 top-[15%] bottom-[15%] w-[4px] rounded-r-full pointer-events-none z-10 shadow-[0_0_10px_rgba(79,70,229,0.5)]",
                          isDark ? "bg-indigo-500" : "bg-indigo-600"
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />`;
content = content.replace(oldAccentBar, newAccentBar);

// 3. Update icon animation and color
content = content.replace(
  `                          isActive
                              ? isDark
                                ? "text-purple-400"
                                : "text-purple-600"
                              : isDark
                              ? "text-slate-500 group-hover:text-slate-200"
                              : "text-slate-400 group-hover:text-slate-700"`,
  `                          isActive
                              ? isDark
                                ? "text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]"
                                : "text-indigo-600"
                              : isDark
                              ? "text-slate-500 group-hover:text-indigo-400"
                              : "text-slate-400 group-hover:text-indigo-600"`
);

// 4. Wrap linkContent inside an outer motion.div for x-axis hover translation
const oldLinkContentDef = `              const linkContent = (
                <motion.div
                  variants={itemVariants}
                  key={item.name}
                  className="relative"
                >`;
const newLinkContentDef = `              const linkContent = (
                <motion.div
                  variants={itemVariants}
                  key={item.name}
                  className="relative origin-left"
                  whileHover={{ x: 4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                >`;
content = content.replace(oldLinkContentDef, newLinkContentDef);

fs.writeFileSync(path, content, 'utf8');
console.log('Sidebar UI enhanced successfully!');
