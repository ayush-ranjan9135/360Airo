const fs = require('fs');
const path = 'src/app/dashboard/campaigns/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const targetTableMapStart = `<motion.tr variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } } }} key={c.id} className="hover:bg-slate-50 dark:hover:bg-white/2 transition-colors group">`;
const targetTableMapEnd = `                        </motion.tr>`;

const oldChunk = content.substring(
  content.indexOf(targetTableMapStart),
  content.indexOf(targetTableMapEnd) + targetTableMapEnd.length
);

const newTableMapBody = `                        <motion.tr 
                          variants={{ hidden: { opacity: 0, x: -15 }, show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } } }}
                          key={c.id} 
                          className="hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 hover:shadow-[inset_4px_0_0_rgba(99,102,241,1)] transition-all group cursor-pointer"
                        >
                          <td className="px-6 py-4 text-left">
                            <div className="flex flex-col text-left">
                              <span className="font-bold text-slate-800 dark:text-slate-200 text-xs group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {c.name}
                              </span>
                              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                                Created on {c.created}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Badge variant={c.type === "ai" ? "premium" : "secondary"} className="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase group-hover:shadow-sm">
                              {c.type === "ai" ? "AI" : "Manual"}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="inline-flex items-center space-x-1.5">
                              <span className={\`h-1.5 w-1.5 rounded-full \${
                                c.status === "active" ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" :
                                c.status === "paused" ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" :
                                c.status === "completed" ? "bg-blue-500" : "bg-slate-400"
                              }\`} />
                              <span className="font-bold text-xs capitalize text-slate-700 dark:text-slate-300">
                                {c.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center font-mono text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {c.sent.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-center font-mono text-emerald-600 dark:text-emerald-400 font-bold group-hover:drop-shadow-[0_0_4px_rgba(16,185,129,0.3)]">
                            {c.sent > 0 ? \`\${c.openRate}%\` : "—"}
                          </td>
                          <td className="px-6 py-4 text-center font-mono text-purple-600 dark:text-purple-400 font-bold group-hover:drop-shadow-[0_0_4px_rgba(147,51,234,0.3)]">
                            {c.sent > 0 ? \`\${c.clickRate}%\` : "—"}
                          </td>
                          <td className="px-6 py-4 text-right pr-6">
                            <div className="flex items-center justify-end space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              {c.status === "active" ? (
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handleStatusChange(c.id, "paused"); }}
                                  className="p-1 hover:text-amber-500 text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                                  title="Pause"
                                >
                                  <Pause className="h-3.5 w-3.5" />
                                </button>
                              ) : c.status === "paused" ? (
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handleStatusChange(c.id, "active"); }}
                                  className="p-1 hover:text-emerald-500 text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                                  title="Resume"
                                >
                                  <Play className="h-3.5 w-3.5" />
                                </button>
                              ) : null}
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleDelete(c.id); }}
                                className="p-1 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-500/5 transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>`;

if (oldChunk.includes('motion.tr') && oldChunk.length > 500) {
  content = content.replace(oldChunk, newTableMapBody);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully applied missing hover animations to table rows!');
} else {
  console.error('Could not find old table map body correctly.');
}
