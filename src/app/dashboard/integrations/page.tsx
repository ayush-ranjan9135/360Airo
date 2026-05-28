"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronDown,
  ExternalLink,
  Key,
  ShieldCheck,
  CheckCircle2,
  Sliders
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntegrationsPage() {
  const [crmStep, setCrmStep] = React.useState(2);
  const [crmConnected, setCrmConnected] = React.useState(false);
  const [connectionLabel, setConnectionLabel] = React.useState("Pipedrive - Sales Team");
  const [workspaceUrl, setWorkspaceUrl] = React.useState("company.pipedrive.com");
  const [apiKey, setApiKey] = React.useState("");
  const [isVerifying, setIsVerifying] = React.useState(false);

  const handleVerifyCRM = () => {
    if (!apiKey) return;
    setIsVerifying(true);
    // Simulate connection checking status
    setTimeout(() => {
      setIsVerifying(false);
      setCrmConnected(true);
      setCrmStep(3);
    }, 2500);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-3.5">
          {/* Pipedrive Premium SVG Logo */}
          <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-center shadow-inner overflow-hidden">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#020813" />
              <path d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12" stroke="#00B55B" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="12" cy="12" r="3" fill="#00B55B" />
            </svg>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Pipedrive Integration
              </h1>
              <Badge className="bg-emerald-50 dark:bg-[#0b1b1a] text-emerald-600 dark:text-[#00b55b] border-emerald-200 dark:border-[#00b55b]/20 text-[9px] font-black py-0.5 px-2.5 rounded-full uppercase tracking-wider">
                360Airo - CRM
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
              Connect Pipedrive and control how contacts, deals, and conversations sync with 360Airo.
            </p>
          </div>
        </div>

        {/* Top Right Status Badge */}
        <div className="bg-slate-50 dark:bg-[#0b1329] border border-slate-800 rounded-xl px-4 py-2 flex items-center space-x-2 self-start md:self-center shadow-md">
          <span className="text-xs font-bold text-slate-900 dark:text-white">Pipedrive</span>
          <span className={`h-1.5 w-1.5 rounded-full ${crmConnected ? "bg-emerald-500" : isVerifying ? "bg-amber-500 animate-pulse" : "bg-slate-500"}`} />
          <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {crmConnected ? "Connected" : isVerifying ? "Checking" : "Not connected"}
          </span>
        </div>
      </div>

      {/* Stepper Card Main Container */}
      <Card className="border-slate-200 dark:border-slate-800/80 bg-white dark:bg-gradient-to-b dark:from-[#0b1329] dark:to-[#080d1e] backdrop-blur-md rounded-2xl shadow-sm dark:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
        {/* Stepper Wizard Progress Indicators */}
        <div className="px-8 py-6 border-b border-slate-800/60 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 bg-slate-50 dark:bg-[#090e1a]/40">
          
          {/* Step 1 */}
          <div className="flex items-center space-x-3.5 flex-1 cursor-pointer" onClick={() => setCrmStep(1)}>
            <div className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold bg-[#00b55b] text-slate-900 dark:text-white shrink-0 shadow-md">
              <Check className="h-4.5 w-4.5 stroke-[3]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-extrabold text-slate-900 dark:text-white">
                Choose CRM
              </span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                Select the provider to connect first
              </span>
            </div>
          </div>

          {/* Green Connector Line */}
          <div className="hidden md:flex items-center flex-1 px-2">
            <div className="h-[1px] bg-emerald-500/80 flex-1 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-emerald-500 transform rotate-45" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center space-x-3.5 flex-1 relative cursor-pointer" onClick={() => setCrmStep(2)}>
            <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-md transition-colors ${
              crmStep >= 2 ? "bg-blue-600 text-white" : "bg-slate-800 border border-slate-700 text-slate-500 dark:text-slate-400"
            }`}>
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col text-left">
              <span className={`text-[11px] font-extrabold ${crmStep === 2 ? "text-blue-400" : "text-slate-900 dark:text-white"}`}>
                Credentials
              </span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                Add and validate the Pipedrive API key
              </span>
            </div>
            {crmStep === 2 && (
              <div className="absolute -bottom-6 left-0 right-0 h-[2px] bg-blue-500 hidden md:block" />
            )}
          </div>

          {/* Grey Connector Line */}
          <div className="hidden md:flex items-center flex-1 px-2">
            <div className="h-[1px] bg-slate-800 flex-1 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-slate-700 transform rotate-45" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-center space-x-3.5 flex-1 cursor-pointer" onClick={() => crmConnected && setCrmStep(3)}>
            <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              crmStep === 3 ? "bg-blue-600 text-white" : "bg-slate-800 border border-slate-700 text-slate-500 dark:text-slate-400"
            }`}>
              <Sliders className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col text-left">
              <span className={`text-[11px] font-extrabold ${crmStep === 3 ? "text-blue-400" : "text-slate-500"}`}>
                Sync Settings
              </span>
              <span className="text-[9px] text-slate-500 font-semibold mt-0.5">
                Control forwarding, sync behavior, and mappings
              </span>
            </div>
          </div>
        </div>

        {/* Wizard Content Body */}
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            {crmStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h4 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
                  Select a CRM Provider
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold pl-1">
                  Choose the platform you want to connect. Only one CRM can be active at a time.
                </p>

                <div className="grid gap-4 sm:grid-cols-2 pt-2">
                  {/* Pipedrive */}
                  <div className="border-2 border-blue-600 bg-blue-600/[0.02] p-5 rounded-2xl flex items-start justify-between cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className="h-9 w-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#000" />
                          <path d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12" stroke="#00B55B" strokeWidth="2.5" strokeLinecap="round" />
                          <circle cx="12" cy="12" r="3" fill="#00B55B" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="flex items-center space-x-2">
                          <span className="font-extrabold text-slate-900 dark:text-white text-xs">Pipedrive</span>
                          <Badge variant="secondary" className="bg-[#0b1b1a] text-[#00b55b] text-[8px] font-black px-2 py-0 rounded-md">Available</Badge>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal font-semibold">
                          Interested lead sync, deal creation, and conversation forwarding.
                        </p>
                      </div>
                    </div>
                    <Check className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                  </div>

                  {/* HubSpot */}
                  <div className="border border-slate-800 bg-slate-900/20 p-5 rounded-2xl flex items-start justify-between opacity-50 cursor-not-allowed">
                    <div className="flex items-start space-x-3">
                      <div className="h-9 w-9 rounded-xl bg-slate-950 flex items-center justify-center font-bold text-xs text-slate-600">
                        hs
                      </div>
                      <div className="text-left">
                        <div className="flex items-center space-x-2">
                          <span className="font-extrabold text-slate-500 text-xs">HubSpot</span>
                          <Badge variant="outline" className="text-[8px] px-1.5 py-0 rounded-md border-slate-800 text-slate-500">Coming soon</Badge>
                        </div>
                        <p className="text-[10px] text-slate-600 mt-1 leading-normal font-semibold">
                          Planned CRM integration.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {crmStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 text-left"
              >
                {/* Internal container box for form */}
                <div className="border border-slate-800 bg-white dark:bg-[#040812]/90 rounded-2xl p-6 space-y-6 shadow-inner">
                  {/* Credentials Header */}
                  <div className="flex items-start space-x-4 pb-5 border-b border-slate-800/80">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[#00b55b] flex items-center justify-center shadow-inner">
                      <Key className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center">
                        Pipedrive credentials
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                        Save and validate a Pipedrive API key. This implementation is API-key based end to end.
                      </p>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Connection label */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
                        Connection label
                      </label>
                      <Input
                        type="text"
                        placeholder="Pipedrive - Sales Team"
                        value={connectionLabel}
                        onChange={(e) => setConnectionLabel(e.target.value)}
                        className="text-xs h-10 border-slate-800 bg-slate-50 dark:bg-[#0b1329] text-slate-900 dark:text-white rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-500"
                      />
                    </div>

                    {/* Workspace URL */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
                        Pipedrive workspace URL (optional)
                      </label>
                      <Input
                        type="text"
                        placeholder="company.pipedrive.com"
                        value={workspaceUrl}
                        onChange={(e) => setWorkspaceUrl(e.target.value)}
                        className="text-xs h-10 border-slate-800 bg-slate-50 dark:bg-[#0b1329] text-slate-900 dark:text-white rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-500"
                      />
                      <p className="text-[9px] text-slate-500 font-semibold pl-1 leading-normal">
                        Leave blank unless you want to use your Pipedrive workspace host. Do not enter your company website.
                      </p>
                    </div>
                  </div>

                  {/* API Key field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
                      API key
                    </label>
                    <Input
                      type="password"
                      placeholder="Paste Pipedrive API key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="text-xs h-10 border-slate-800 bg-slate-50 dark:bg-[#0b1329] text-slate-900 dark:text-white rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-500"
                    />
                  </div>

                  {/* Persistence Note Banner */}
                  <div className="flex items-start gap-3 p-4 bg-[#0a182b] border border-blue-500/20 rounded-xl">
                    <ShieldCheck className="h-4.5 w-4.5 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-[11px] font-semibold text-blue-300 leading-normal">
                      Credentials should only be persisted server-side. The frontend collects them, but the backend owns validation, storage, and live sync execution.
                    </span>
                  </div>

                  {/* Form Buttons */}
                  <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800/80">
                    <button
                      type="button"
                      onClick={handleVerifyCRM}
                      disabled={!apiKey || isVerifying}
                      className="flex h-9 px-4 items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-transparent text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:text-white transition-all cursor-pointer text-xs font-bold disabled:opacity-50"
                    >
                      <span>{isVerifying ? "Verifying..." : "Test connection"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCrmConnected(true);
                        setCrmStep(3);
                      }}
                      disabled={!apiKey || isVerifying}
                      className="flex h-9 px-4 items-center justify-center gap-1.5 rounded-xl bg-[#00b55b] hover:bg-[#009b4e] text-slate-900 dark:text-white text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      <span>Save API key</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {crmStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 text-left"
              >
                <h4 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
                  Sync Configuration Settings
                </h4>

                <div className="space-y-4">
                  {/* Auto Deal Creation */}
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-white dark:bg-[#040812] shadow-inner">
                    <div className="space-y-1">
                      <span className="font-extrabold text-slate-900 dark:text-white text-xs">Auto Deal Creation</span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Instantly create deals when a positive reply is detected.</p>
                    </div>
                    <Badge className="bg-emerald-50 dark:bg-[#0b1b1a] text-emerald-600 dark:text-[#00b55b] border-emerald-200 dark:border-[#00b55b]/20 font-bold px-2.5 py-0.5 rounded-md text-[9px] uppercase">Enabled</Badge>
                  </div>

                  {/* Direct Contacts Sync */}
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-white dark:bg-[#040812] shadow-inner">
                    <div className="space-y-1">
                      <span className="font-extrabold text-slate-900 dark:text-white text-xs">Direct Contacts Sync</span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Forward new interested contacts to Pipedrive contact lists.</p>
                    </div>
                    <Badge className="bg-emerald-50 dark:bg-[#0b1b1a] text-emerald-600 dark:text-[#00b55b] border-emerald-200 dark:border-[#00b55b]/20 font-bold px-2.5 py-0.5 rounded-md text-[9px] uppercase">Enabled</Badge>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        {/* Stepper Footer Controls */}
        <div className="px-8 py-5 border-t border-slate-800/60 flex items-center justify-between bg-slate-50 dark:bg-[#090e1a]/40">
          <button
            onClick={() => {
              if (crmStep > 1) {
                setCrmStep(crmStep - 1);
              }
            }}
            disabled={crmStep === 1}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors cursor-pointer disabled:opacity-30"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-5">
            <span className="text-xs font-mono font-bold text-slate-500">
              Step {crmStep} / 3
            </span>

            <button
              onClick={() => {
                if (crmStep < 3) {
                  setCrmStep(crmStep + 1);
                }
              }}
              disabled={crmStep === 2 && !crmConnected}
              className="flex h-9 px-5 items-center justify-center gap-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50 transition-all shadow-md shadow-blue-500/10"
            >
              <span>{crmStep === 3 ? "Complete Sync" : crmStep === 2 ? "Connect CRM first" : "Continue"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </Card>

      {/* Bottom Status bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-bold font-mono text-slate-500 border-t border-slate-800/80 pt-4 px-2">
        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-slate-900 dark:text-white">Pipedrive</span>
          <span className="h-1 w-1 rounded-full bg-slate-600" />
          <span className={isVerifying ? "text-amber-500 font-bold" : crmConnected ? "text-emerald-500" : "text-slate-500"}>
            {isVerifying ? "Checking connection" : crmConnected ? "Connected" : "Not connected"}
          </span>
          <span>|</span>
          <span>Forward: Note</span>
          <span>|</span>
          <span>Import: 7</span>
          <span>|</span>
          <span>Export: 4</span>
        </div>
        
        <a 
          href="https://developers.pipedrive.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-blue-400 transition-colors mt-2 sm:mt-0"
        >
          <span>API docs</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

