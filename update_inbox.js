const fs = require('fs');
const path = 'src/app/dashboard/inbox/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const targetMsgStart = `<motion.div 
                key={msg.id}`;
const targetMsgEnd = `                </div>
              </motion.div>`;

// Extract the old map body
let oldChunk = "";
const startIdx = content.indexOf(targetMsgStart);
if (startIdx !== -1) {
  const nextDivEnd = content.indexOf('</motion.div>', startIdx);
  oldChunk = content.substring(startIdx, nextDivEnd + 13);
}

const newMapBody = `<motion.div 
                key={msg.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className={\`flex items-start p-4 transition-all duration-300 cursor-pointer group hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 hover:shadow-[inset_4px_0_0_rgba(99,102,241,1)] \${msg.status === 'unread' ? 'bg-purple-50/40 dark:bg-purple-900/10 shadow-[inset_3px_0_0_rgba(147,51,234,0.6)]' : ''}\`}
              >
                <div className="shrink-0 mr-4 mt-1 relative">
                  {/* Unread indicator dot */}
                  {msg.status === 'unread' && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-purple-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse shadow-[0_0_8px_rgba(147,51,234,0.8)]" />
                  )}
                  <div className={\`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold shadow-inner group-hover:scale-105 transition-transform duration-300 \${msg.avatarColor}\`}>
                    {msg.sender.charAt(0)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center space-x-2">
                      <span className={\`text-sm font-extrabold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors \${msg.status === 'unread' ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}\`}>
                        {msg.sender}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-semibold group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                        {msg.company}
                      </span>
                    </div>
                    <span className={\`text-[10px] font-bold \${msg.status === 'unread' ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground'}\`}>
                      {msg.time}
                    </span>
                  </div>
                  
                  <p className={\`text-xs font-bold mb-1 truncate \${msg.status === 'unread' ? 'text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'}\`}>
                    {msg.subject}
                  </p>
                  
                  <p className="text-xs text-muted-foreground truncate max-w-3xl font-medium group-hover:text-slate-500 dark:group-hover:text-slate-300 transition-colors">
                    {msg.snippet}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-2.5">
                    <Badge variant="outline" className={\`text-[9px] font-bold px-2 py-0 border-none transition-all duration-300 \${
                      msg.category === 'Positive Reply' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/20' :
                      msg.category === 'Interested' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/20' :
                      msg.category === 'Demo Request' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500/20' :
                      msg.category === 'Opt-Out' || msg.category === 'Archive' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-500/20' :
                      'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300 group-hover:bg-slate-200 dark:group-hover:bg-white/20'
                    }\`}>
                      {msg.category}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ml-4">
                   <button className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-white/20 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer" title="Reply">
                     <Reply className="h-4 w-4" />
                   </button>
                   <button className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-white/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer" title="Archive">
                     <Archive className="h-4 w-4" />
                   </button>
                </div>
              </motion.div>`;

if (oldChunk && oldChunk.length > 500) {
  content = content.replace(oldChunk, newMapBody);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Inbox UI updated successfully!');
} else {
  console.error('Failed to locate old message block.');
}
