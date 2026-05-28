const fs = require('fs');
const path = 'src/app/dashboard/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add Dialog imports
if (!content.includes('import { Dialog')) {
  content = content.replace(
    'import { Badge } from "@/components/ui/badge";',
    'import { Badge } from "@/components/ui/badge";\nimport { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";'
  );
}

// Add X icon to lucide-react if needed
if (!content.includes('BarChart2')) {
  content = content.replace(
    'import { \n  AreaChart',
    'import { BarChart2 } from "lucide-react";\nimport { \n  AreaChart'
  );
}

// Add states
if (!content.includes('showAnalyticsModal')) {
  content = content.replace(
    'const [timeRange, setTimeRange] = React.useState("7");',
    'const [timeRange, setTimeRange] = React.useState("7");\n  const [showAnalyticsModal, setShowAnalyticsModal] = React.useState(false);\n  const [showTemplatesModal, setShowTemplatesModal] = React.useState(false);\n  const [templateTab, setTemplateTab] = React.useState("email");'
  );
}

// Update the Quick Actions to open modals instead of linking to /dashboard for Analytics and /campaigns/create for Templates
content = content.replace(
  'link: "/dashboard",',
  'onClick: () => setShowAnalyticsModal(true),'
);
content = content.replace(
  'link: "/dashboard/campaigns/create",\n      bgClass: "bg-amber-50/50',
  'onClick: () => setShowTemplatesModal(true),\n      bgClass: "bg-amber-50/50'
);

// We need to change QuickActions render to support onClick if link is missing
content = content.replace(
  '<Link href={action.link} className="block group">',
  '{action.link ? (\n                  <Link href={action.link} className="block group">'
);

// Find </Card> ending for action link
const cardEnding = `                      <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        Get started <ArrowRight className="h-3 w-3" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>`;

const replacement = `                      <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        Get started <ArrowRight className="h-3 w-3" />
                      </span>
                    </CardContent>
                  </Card>
                ) : (
                  <div onClick={action.onClick} className="block group cursor-pointer">
                    <Card className={\`border-slate-200/60 dark:border-border/30 \${action.bgClass} backdrop-blur-md hover:shadow-lg transition-all duration-300 relative overflow-hidden h-[100px] flex flex-col justify-center\`}>
                      <CardContent className="p-5 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={\`h-10 w-10 rounded-xl flex items-center justify-center shadow-md \${action.iconBgClass} \${action.iconColorClass} group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-6 transition-all duration-300\`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex flex-col text-left">
                            <div className="flex items-center space-x-2">
                              <h4 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {action.title}
                              </h4>
                              {action.badge && (
                                <span className={\`text-[9px] font-bold px-1.5 py-0.5 rounded-md border \${action.badgeColor}\`}>
                                  {action.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                              {action.desc}
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          Get started <ArrowRight className="h-3 w-3" />
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                )}
                {action.link ? "" : ""}`; // Just to close out cleanly

content = content.replace(cardEnding, replacement);

// Now we insert the Modals right before the final `</div>\n  );\n}`
const modalsStr = `

      {/* Analytics Modal */}
      <Dialog open={showAnalyticsModal} onOpenChange={setShowAnalyticsModal}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 shadow-2xl rounded-2xl">
          <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">Campaign Analytics</DialogTitle>
            <DialogDescription className="text-slate-500 mt-1 text-sm font-medium">Select a campaign to view detailed analytics</DialogDescription>
          </div>
          <div className="flex flex-col items-center justify-center p-12 space-y-4">
            <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
              <BarChart2 className="h-8 w-8 text-slate-400 dark:text-slate-500" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No campaigns yet</h3>
              <p className="text-sm text-slate-500">Create a campaign to view analytics</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Templates Modal */}
      <Dialog open={showTemplatesModal} onOpenChange={setShowTemplatesModal}>
        <DialogContent className="sm:max-w-3xl p-0 overflow-hidden border-0 shadow-2xl rounded-2xl max-h-[85vh] flex flex-col">
          <div className="p-6 pb-0 border-b border-slate-100 dark:border-slate-800 shrink-0">
            <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">Email & Message Templates</DialogTitle>
            <DialogDescription className="text-slate-500 mt-1 text-sm font-medium">Choose a template and customize with placeholders</DialogDescription>
            
            <div className="flex space-x-2 mt-6">
              <button 
                onClick={() => setTemplateTab("email")}
                className={\`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors flex items-center space-x-2 \${templateTab === "email" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}\`}
              >
                <Mail className="h-4 w-4" />
                <span>Email Templates</span>
              </button>
              <button 
                onClick={() => setTemplateTab("linkedin")}
                className={\`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors flex items-center space-x-2 \${templateTab === "linkedin" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}\`}
              >
                <Users className="h-4 w-4" />
                <span>LinkedIn Templates</span>
              </button>
            </div>
          </div>
          
          <div className="p-6 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-black/20 flex-1">
            {templateTab === "email" ? (
              <>
                <Card className="border-blue-200 dark:border-blue-900/50 shadow-sm overflow-hidden rounded-xl">
                  <div className="p-5 border-b border-slate-100 dark:border-slate-800/50 bg-white dark:bg-card">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      <h4 className="font-bold text-slate-900 dark:text-white">Complete Email Automation</h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">End-to-end automated email response flow. Perfect for handling customer inquiries with AI-powered personalized responses.</p>
                  </div>
                  <div className="p-5 bg-slate-50/80 dark:bg-slate-900/50 font-mono text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
{\`Subject: Follow-up on Your {{company_name}} Inquiry

Hi {{name}},

Thank you for reaching out! I noticed you're interested in {{company_name}}.

I'd love to help. Your email: {{email}}

Best regards,
Your Team\`}
                  </div>
                </Card>
                <Card className="border-amber-200 dark:border-amber-900/50 shadow-sm overflow-hidden rounded-xl">
                  <div className="p-5 border-b border-slate-100 dark:border-slate-800/50 bg-white dark:bg-card">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-amber-500" />
                      <h4 className="font-bold text-slate-900 dark:text-white">Quick Email Reply</h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Fast automated response template. Ideal for quick acknowledgments and immediate engagement with prospects.</p>
                  </div>
                  <div className="p-5 bg-slate-50/80 dark:bg-slate-900/50 font-mono text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
{\`Subject: Re: Your Message

Hi {{name}},

We received your message and our team will get back to you shortly.

Best,
Support Team\`}
                  </div>
                </Card>
              </>
            ) : (
              <div className="py-12 text-center">
                <p className="text-slate-500 text-sm font-medium">LinkedIn templates coming soon...</p>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
              <strong className="text-slate-700 dark:text-slate-300">Available Placeholders:</strong> name (Recipient's name) • company_name (Company name) • email (Email address). These will be automatically filled from your contact lists.
            </p>
          </div>
        </DialogContent>
      </Dialog>
`;

const insertPos = content.lastIndexOf('    </div>\n  );\n}');
if (insertPos !== -1) {
  content = content.substring(0, insertPos) + modalsStr + content.substring(insertPos);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Modals added successfully!');
} else {
  console.log('Could not find insert pos');
}
