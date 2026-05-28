const fs = require('fs');
const path = 'src/app/dashboard/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const linkedinPlaceholder = `<div className="py-12 text-center">
                <p className="text-slate-500 text-sm font-medium">LinkedIn templates coming soon...</p>
              </div>`;

const linkedinTemplates = `<>
                <Card className="border-blue-200 dark:border-blue-900/50 shadow-sm overflow-hidden rounded-xl">
                  <div className="p-5 border-b border-slate-100 dark:border-slate-800/50 bg-white dark:bg-card">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <h4 className="font-bold text-slate-900 dark:text-white">Connection Request</h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">High-converting LinkedIn connection request for engaging prospects.</p>
                  </div>
                  <div className="p-5 bg-slate-50/80 dark:bg-slate-900/50 font-mono text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
{\`Hi {{name}},

I saw your recent work at {{company_name}} and was really impressed with your approach to growth. I'd love to connect and follow your journey!

Best,
Ayush\`}
                  </div>
                </Card>
                <Card className="border-purple-200 dark:border-purple-900/50 shadow-sm overflow-hidden rounded-xl mt-4">
                  <div className="p-5 border-b border-slate-100 dark:border-slate-800/50 bg-white dark:bg-card">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-purple-500" />
                      <h4 className="font-bold text-slate-900 dark:text-white">Follow-up Message</h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Gentle nudge message for prospects who accepted your connection but haven't replied.</p>
                  </div>
                  <div className="p-5 bg-slate-50/80 dark:bg-slate-900/50 font-mono text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
{\`Thanks for connecting, {{name}}! 

I noticed {{company_name}} is scaling rapidly. If you're ever looking for ways to streamline your outreach, I have a few ideas that might help.

Let me know if you're open to a quick chat.

Cheers,
Ayush\`}
                  </div>
                </Card>
              </>`;

content = content.replace(linkedinPlaceholder, linkedinTemplates);

// Update "Your Team" to "Ayush" or a name in the email templates
content = content.replace('Best regards,\nYour Team', 'Best regards,\nAyush');
content = content.replace('Best,\nSupport Team', 'Best,\nAyush');

fs.writeFileSync(path, content, 'utf8');
console.log('LinkedIn templates and names added!');
