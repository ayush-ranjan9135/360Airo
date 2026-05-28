const fs = require('fs');
const path = 'src/app/dashboard/campaigns/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Refactor the stats metric grid to use a mapped array so we can animate it easily
const targetStatsSection = content.substring(
  content.indexOf('{/* ── STATS METRIC GRID ── */}'),
  content.indexOf('{/* ── WORKSPACE CONTROLS ROW ── */}')
);

const newStatsSection = `{/* ── STATS METRIC GRID ── */}
      <motion.div 
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden" animate="show"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6"
      >
        {[
          { label: "Total Campaigns", sub: "All campaigns", val: totalCampaigns, icon: Target, color: "blue" },
          { label: "Manual Campaigns", sub: "User created", val: manualCount, icon: Edit2, color: "emerald" },
          { label: "AI Campaigns", sub: "AI personalized", val: aiCount, icon: Cpu, color: "purple" },
          { label: "Total Recipients", sub: "Email contacts", val: totalRecipients.toLocaleString(), icon: Users, color: "orange" },
          { label: "Open Rate", sub: "Unique opens", val: \`\${avgOpenRate}%\`, icon: Mail, color: "pink" },
          { label: "Click Rate", sub: "Average clicks", val: \`\${avgClickRate}%\`, icon: Compass, color: "cyan" },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }} 
            whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.2 } }}
            className="h-full cursor-pointer"
          >
            <Card className={\`h-full border-\${stat.color}-500/15 dark:border-\${stat.color}-500/10 bg-\${stat.color}-500/[0.01] dark:bg-\${stat.color}-950/[0.04] shadow-sm rounded-2xl transition-colors hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60\`}> 
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
                <div className="flex flex-col text-left">
                  <span className={\`text-[10px] font-bold text-\${stat.color}-600 dark:text-\${stat.color}-400 uppercase tracking-wider\`}>
                    {stat.label}
                  </span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white mt-1.5">
                    {stat.val}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-1">
                    {stat.sub}
                  </span>
                </div>
                <div className={\`h-8 w-8 rounded-lg bg-\${stat.color}-500 text-white flex items-center justify-center shadow-lg shadow-\${stat.color}-500/25\`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      `;

content = content.replace(targetStatsSection, newStatsSection);

// 2. Add stagger entrance animation to the table rows
content = content.replace(
  '<tbody className="divide-y divide-slate-100 dark:divide-border/10">',
  '<motion.tbody variants={{ show: { transition: { staggerChildren: 0.05 } } }} initial="hidden" animate="show" className="divide-y divide-slate-100 dark:divide-border/10">'
);
content = content.replace(
  '</tbody',
  '</motion.tbody'
);

// We need to make the TR into a motion.tr
content = content.replace(
  /<tr key=\{c\.id\} className="hover:bg-slate-50 dark:hover:bg-white\/2 transition-colors">/g,
  '<motion.tr variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } } }} key={c.id} className="hover:bg-slate-50 dark:hover:bg-white/2 transition-colors group">'
);
content = content.replace(
  /<\/tr>/g,
  '</motion.tr>'
);
// Note: we need to replace </motion.tr> back to </tr> for the table header, which we didn't touch but the global regex might have replaced if it had </tr>.
// Let's ensure the head </tr> is correct. The head <tr> doesn't match the regex, so it's fine.
// BUT the global regex for `</tr>` replaced all of them!
// Let's fix that string replace approach.

let fixContent = content.replace(/<\/motion.tr>/g, '</tr>'); // Reset
// Only replace </tr> that is inside the tbody map.
// Let's do it safely.
fixContent = fixContent.replace(
  /<tr key=\{c\.id\}/g,
  '<motion.tr key={c.id} variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } } }}'
);
// We will leave the closing tags as </tr> in jsx, actually motion.tr REQUIRES </motion.tr>.
// Let's write a regex that only replaces the </tr> following a key={c.id} row.
// Since React requires matching tags, we can just replace the specific map block.

const tableMapStart = `{filteredCampaigns.map((c) => (`;
const oldTableMapBody = `                        <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
                          <td className="px-6 py-4 text-left">
                            <div className="flex flex-col text-left">
                              <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                                {c.name}
                              </span>
                              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                                Created on {c.created}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Badge variant={c.type === "ai" ? "premium" : "secondary"} className="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase">
                              {c.type === "ai" ? "AI" : "Manual"}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="inline-flex items-center space-x-1.5">
                              <span className={\`h-1.5 w-1.5 rounded-full \${
                                c.status === "active" ? "bg-emerald-500 animate-pulse" :
                                c.status === "paused" ? "bg-amber-500" :
                                c.status === "completed" ? "bg-blue-500" : "bg-slate-400"
                              }\`} />
                              <span className="font-bold text-xs capitalize text-slate-700 dark:text-slate-300">
                                {c.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center font-mono text-slate-700 dark:text-slate-300">
                            {c.sent.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-center font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                            {c.sent > 0 ? \`\${c.openRate}%\` : "—"}
                          </td>
                          <td className="px-6 py-4 text-center font-mono text-purple-600 dark:text-purple-400 font-bold">
                            {c.sent > 0 ? \`\${c.clickRate}%\` : "—"}
                          </td>
                          <td className="px-6 py-4 text-right pr-6">
                            <div className="flex items-center justify-end space-x-1.5">
                              {c.status === "active" ? (
                                <button 
                                  onClick={() => handleStatusChange(c.id, "paused")}
                                  className="p-1 hover:text-amber-500 text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                                  title="Pause"
                                >
                                  <Pause className="h-3.5 w-3.5" />
                                </button>
                              ) : c.status === "paused" ? (
                                <button 
                                  onClick={() => handleStatusChange(c.id, "active")}
                                  className="p-1 hover:text-emerald-500 text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                                  title="Resume"
                                >
                                  <Play className="h-3.5 w-3.5" />
                                </button>
                              ) : null}
                              <button 
                                onClick={() => handleDelete(c.id)}
                                className="p-1 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-500/5 transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>`;

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
                            <div className="flex items-center justify-end space-x-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                              {c.status === "active" ? (
                                <button 
                                  onClick={() => handleStatusChange(c.id, "paused")}
                                  className="p-1 hover:text-amber-500 text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                                  title="Pause"
                                >
                                  <Pause className="h-3.5 w-3.5" />
                                </button>
                              ) : c.status === "paused" ? (
                                <button 
                                  onClick={() => handleStatusChange(c.id, "active")}
                                  className="p-1 hover:text-emerald-500 text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                                  title="Resume"
                                >
                                  <Play className="h-3.5 w-3.5" />
                                </button>
                              ) : null}
                              <button 
                                onClick={() => handleDelete(c.id)}
                                className="p-1 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-500/5 transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>`;

content = fixContent.replace(oldTableMapBody, newTableMapBody);

fs.writeFileSync(path, content, 'utf8');
console.log('Campaigns page made highly interactive successfully!');
