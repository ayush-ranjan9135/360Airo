"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, Mail, ChevronDown, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function CreateCampaignPage() {
  const [campaignName, setCampaignName] = React.useState("");

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f8fafc] dark:bg-[#0b1329] p-6 lg:p-10 transition-colors duration-300 -m-6 lg:-m-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <Link href="/dashboard/campaigns" className="inline-flex items-center text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-6 group cursor-pointer">
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Campaigns
          </Link>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300">Step 1 of 3</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Create New Campaign</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Set up your campaign name and choose which audience to target</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Details Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-xl dark:bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden">
              <div className="p-8 space-y-8">
                
                {/* Section Header */}
                <div className="flex items-center space-x-3 pb-6 border-b border-slate-100 dark:border-white/5">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Campaign Details</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Enter your campaign information and select your target audience</p>
                  </div>
                </div>

                {/* Campaign Name Field */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Campaign Name</label>
                  <input 
                    type="text" 
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="Enter a memorable campaign name..."
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">Choose a descriptive name that helps you identify this campaign later</p>
                </div>

                {/* Target Audience Field */}
                <div className="space-y-3 pt-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Target Audience</label>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Select which email list to send this campaign to</p>
                  
                  <div className="relative">
                    <select className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 dark:text-slate-300 appearance-none cursor-pointer">
                      <option value="">No email lists available</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Warning Banner */}
                <div className="bg-[#fff9f0] dark:bg-amber-500/10 border border-[#ffe0b2] dark:border-amber-500/20 rounded-xl p-5 flex flex-col items-start space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5 text-amber-600 dark:text-amber-500">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-amber-900 dark:text-amber-500">No Email Lists Available</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-600/80 mt-1 leading-relaxed">
                        You need to create an email list with contacts before you can start a campaign.
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 bg-[#f58220] hover:bg-[#e0701b] text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors ml-8 shadow-sm">
                    <Plus className="h-4 w-4" />
                    <span>Create Email List</span>
                  </button>
                </div>

                {/* Footer Action */}
                <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex justify-end">
                  <button className="bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center space-x-2">
                    <span>Next</span>
                    <span className="text-lg leading-none mt-[-2px]">→</span>
                  </button>
                </div>

              </div>
            </Card>
          </div>

          {/* Right Column - Campaign Preview */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-xl dark:bg-card/40 backdrop-blur-md rounded-2xl sticky top-6">
              <div className="p-6 space-y-8">
                
                {/* Preview Header */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Campaign Preview</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review your campaign setup</p>
                </div>

                {/* Fields Summary */}
                <div className="space-y-5">
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-1">Campaign Name</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{campaignName || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-1">Target Audience</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">No list selected</p>
                  </div>
                </div>

                <div className="h-px w-full bg-slate-100 dark:bg-white/5" />

                {/* Progress */}
                <div>
                  <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-3">Progress</p>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-slate-700 dark:text-slate-300">Step 1 of 3</span>
                    <span className="text-slate-500">33%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: "33%" }} />
                  </div>
                </div>

                <div className="h-px w-full bg-slate-100 dark:bg-white/5" />

                {/* Next Steps */}
                <div>
                  <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-4">Next Steps</p>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <div className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">2</div>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Choose Your Approach</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 flex items-center justify-center text-[10px] font-bold">3</div>
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Review & Launch</span>
                    </li>
                  </ul>
                </div>

                <div className="h-px w-full bg-slate-100 dark:bg-white/5" />

                {/* Credits */}
                <div>
                  <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-4">Credits</p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-900 dark:text-white">Manual Campaigns (Monthly)</span>
                        <span className="text-slate-500">0/100</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-1">
                        <div className="h-full bg-slate-300 dark:bg-slate-600 rounded-full" style={{ width: "0%" }} />
                      </div>
                      <p className="text-[10px] text-slate-500">100 messages remaining this month</p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-900 dark:text-white">AI-Personalized (Daily)</span>
                        <span className="text-slate-500">0/50</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-1">
                        <div className="h-full bg-slate-300 dark:bg-slate-600 rounded-full" style={{ width: "0%" }} />
                      </div>
                      <p className="text-[10px] text-slate-500">50 messages remaining today</p>
                    </div>
                  </div>
                </div>

              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
