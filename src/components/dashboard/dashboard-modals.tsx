"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { BarChart2, Mail, Users, Sparkles, TrendingUp } from "lucide-react";

interface DashboardModalsProps {
  showAnalyticsModal: boolean;
  setShowAnalyticsModal: (show: boolean) => void;
  showTemplatesModal: boolean;
  setShowTemplatesModal: (show: boolean) => void;
}

export function DashboardModals({
  showAnalyticsModal,
  setShowAnalyticsModal,
  showTemplatesModal,
  setShowTemplatesModal
}: DashboardModalsProps) {
  const [templateTab, setTemplateTab] = React.useState("email");

  return (
    <>
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
                className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors flex items-center space-x-2 ${templateTab === "email" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
              >
                <Mail className="h-4 w-4" />
                <span>Email Templates</span>
              </button>
              <button 
                onClick={() => setTemplateTab("linkedin")}
                className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors flex items-center space-x-2 ${templateTab === "linkedin" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
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
{`Subject: Partnership Opportunity: Scaling Operations at Acme Corp

Hi Sarah,

Thank you for reaching out! I noticed your team at Acme Corp is currently expanding its outbound sales infrastructure. 

We've recently helped similar enterprise companies increase their deliverability rates by over 30%. I've sent a detailed case study to your inbox: sarah.jenkins@acmecorp.com.

I'd love to schedule a brief 10-minute introduction call next Tuesday to discuss how we can align with your Q3 goals. Let me know what time works best for you.

Best regards,
Ayush Ranjan
Head of Growth, 360Airo`}
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
{`Subject: Re: Enterprise Licensing Inquiry

Hi David,

We've successfully received your message regarding the enterprise licensing tiers for TechFlow Solutions.

Our enterprise sales team is currently reviewing your infrastructure requirements and will follow up with a customized pricing breakdown within 2 hours.

Best regards,
Ayush Ranjan
Head of Growth, 360Airo`}
                  </div>
                </Card>
              </>
            ) : (
              <>
                <Card className="border-blue-200 dark:border-blue-900/50 shadow-sm overflow-hidden rounded-xl">
                  <div className="p-5 border-b border-slate-100 dark:border-slate-800/50 bg-white dark:bg-card">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <h4 className="font-bold text-slate-900 dark:text-white">Connection Request</h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">High-converting LinkedIn connection request for engaging prospects.</p>
                  </div>
                  <div className="p-5 bg-slate-50/80 dark:bg-slate-900/50 font-mono text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
{`Hi Michael,

I saw your recent post about scaling infrastructure at GlobalTech and was really impressed with your approach to cloud migration. I'd love to connect and follow your journey!

Best,
Ayush Ranjan`}
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
{`Thanks for connecting, Michael! 

I noticed GlobalTech is rapidly expanding its engineering team. If you're ever looking for ways to streamline your technical recruitment outreach, I have a few ideas that might help you find senior talent faster.

Let me know if you're open to a quick 10-minute chat this week.

Cheers,
Ayush Ranjan`}
                  </div>
                </Card>
              </>
            )}
          </div>
          
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
              <strong className="text-slate-700 dark:text-slate-300">Available Placeholders:</strong> name (Recipient's name) • company_name (Company name) • email (Email address). These will be automatically filled from your contact lists.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
