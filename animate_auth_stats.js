const fs = require('fs');
const path = 'src/app/auth/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const targetStats = `          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            style={{ borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: t.divider, transition: TS }}
            className="flex items-center gap-10 pt-5">
            {[["2.4M+", "Emails Sent"], ["98.7%", "Inbox Rate"], ["12K+", "Teams"]].map(([v, l]) => (
              <div key={l}>
                <p className="text-xl font-black bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent tracking-tight">{v}</p>
                <p style={{ color: t.textMuted, transition: TS }} className="text-[11px] mt-0.5 font-semibold uppercase tracking-wider">{l}</p>
              </div>
            ))}
          </motion.div>`;

const newStats = `          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            style={{ borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: t.divider, transition: TS }}
            className="flex items-center gap-10 pt-5">
            {[["2.4M+", "Emails Sent"], ["98.7%", "Inbox Rate"], ["12K+", "Teams"]].map(([v, l], i) => (
              <motion.div 
                key={l}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 100, damping: 12 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group cursor-pointer"
              >
                <p className="text-[22px] font-black bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent tracking-tight group-hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.6)] transition-all duration-300">
                  {v}
                </p>
                <p style={{ color: t.textMuted, transition: TS }} className="text-[10px] mt-1 font-bold uppercase tracking-[0.15em] group-hover:text-indigo-300 dark:group-hover:text-indigo-400 transition-colors">
                  {l}
                </p>
              </motion.div>
            ))}
          </motion.div>`;

content = content.replace(targetStats, newStats);

fs.writeFileSync(path, content, 'utf8');
console.log('Stats animated successfully!');
