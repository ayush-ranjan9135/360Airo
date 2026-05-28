"use client";

import * as React from "react";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  User as UserIcon, 
  Settings as SettingsIcon, 
  Key, 
  Bell, 
  Globe, 
  Sparkles, 
  Clipboard, 
  Check, 
  RefreshCw,
  FolderOpen,
  ArrowRight,
  Database,
  Unlink
} from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
}

export default function SettingsPage() {
  const { user } = useAuth();
  
  // Profile settings state
  const [profileName, setProfileName] = React.useState(user?.name || "Ayush Ranjan");
  const [profileEmail, setProfileEmail] = React.useState(user?.email || "ayushranjan9531@gmail.com");
  const [profileCountry, setProfileCountry] = React.useState(user?.country || "India");

  // Workspace settings state
  const [workspaceName, setWorkspaceName] = React.useState("Globopersona Workspace");
  const [dailyQuota, setDailyQuota] = React.useState("150");

  // API keys state
  const [apiKeys, setApiKeys] = React.useState<ApiKey[]>([
    { id: "1", name: "Production API Sync", key: "gp_live_d843a8df8f23789a741cde30", created: "2026-05-12" },
  ]);
  const [newKeyName, setNewKeyName] = React.useState("");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Notifications preferences
  const [notifyDailyReport, setNotifyDailyReport] = React.useState(true);
  const [notifyBounceAlert, setNotifyBounceAlert] = React.useState(true);
  const [notifyWarmupComplete, setNotifyWarmupComplete] = React.useState(false);

  // Integrations state
  const [integrations, setIntegrations] = React.useState([
    { id: "hubspot", name: "Hubspot CRM", desc: "Sync leads and delivery logs.", connected: true, icon: Database },
    { id: "salesforce", name: "Salesforce", desc: "Automate task pipelines on replies.", connected: false, icon: Database },
    { id: "zapier", name: "Zapier", desc: "Push outbound events to 5,000+ apps.", connected: true, icon: Sparkles },
  ]);

  const handleCopyKey = (id: string, keyText: string) => {
    navigator.clipboard.writeText(keyText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleCreateApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const randomHex = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    const newKeyItem: ApiKey = {
      id: String(Date.now()),
      name: newKeyName,
      key: `gp_live_${randomHex}`,
      created: new Date().toISOString().split("T")[0]
    };

    setApiKeys([...apiKeys, newKeyItem]);
    setNewKeyName("");
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(prev => prev.filter(k => k.id !== id));
  };

  const handleToggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(item => 
      item.id === id ? { ...item, connected: !item.connected } : item
    ));
  };

  const handleSaveProfile = () => {
    // Mimic saving profile data
    alert("Profile configurations saved successfully.");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-900 dark:text-white">Workspace Settings</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1.5 font-medium">
          Configure security, manage integration tokens, and edit email delivery limits.
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Left Side: Profile & Workspace Details */}
        <div className="space-y-6">
          
          {/* Profile Card */}
          <Card className="border-slate-200 dark:border-border/30 shadow-sm bg-white dark:bg-card/45 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">User Profile Settings</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 font-medium mt-1">Update your personal account credentials.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 font-bold">Display Name</label>
                <Input 
                  type="text" 
                  value={profileName} 
                  onChange={(e) => setProfileName(e.target.value)} 
                  icon={<UserIcon className="h-4 w-4" />}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 font-bold">Login Email Address</label>
                <Input 
                  type="email" 
                  value={profileEmail} 
                  onChange={(e) => setProfileEmail(e.target.value)} 
                  icon={<Globe className="h-4 w-4" />}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 font-bold">Country / Location</label>
                <Input 
                  type="text" 
                  value={profileCountry} 
                  onChange={(e) => setProfileCountry(e.target.value)} 
                  icon={<Globe className="h-4 w-4" />}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="primary" size="sm" className="font-semibold text-xs cursor-pointer ml-auto" onClick={handleSaveProfile}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          {/* Workspace quota / rules */}
          <Card className="border-slate-200 dark:border-border/30 shadow-sm bg-white dark:bg-card/45 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">Outreach Controls</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 font-medium mt-1">Throttling parameters applied to connected domains.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 font-bold">Workspace Label</label>
                <Input 
                  type="text" 
                  value={workspaceName} 
                  onChange={(e) => setWorkspaceName(e.target.value)} 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 font-bold">Daily Combined Sending Cap</label>
                <Input 
                  type="number" 
                  value={dailyQuota} 
                  onChange={(e) => setDailyQuota(e.target.value)} 
                />
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Side: API Keys & Integration Synclists */}
        <div className="space-y-6">
          
          {/* API Keys Panel */}
          <Card className="border-slate-200 dark:border-border/30 shadow-sm bg-white dark:bg-card/45 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">API Access Tokens</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 font-medium mt-1">Authentication tokens for syncing custom workflows.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Existing keys list */}
              <div className="space-y-2.5">
                {apiKeys.length === 0 ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic py-2">No active API keys found.</p>
                ) : (
                  apiKeys.map((k) => (
                    <div key={k.id} className="flex items-center justify-between p-3 rounded-lg border border-border/20 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-border/20">
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{k.name}</span>
                        <code className="text-[10px] text-purple-600 dark:text-purple-300 font-mono mt-1 select-all">{k.key}</code>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:text-slate-900 dark:text-white cursor-pointer"
                          onClick={() => handleCopyKey(k.id, k.key)}
                        >
                          {copiedId === k.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Clipboard className="h-3.5 w-3.5" />}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 cursor-pointer"
                          onClick={() => handleRevokeKey(k.id)}
                        >
                          <Unlink className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Generate new key form */}
              <form onSubmit={handleCreateApiKey} className="flex gap-2 border-t border-slate-100 dark:border-border/10 pt-4 mt-2">
                <Input
                  type="text"
                  placeholder="Key name, e.g. Zapier hook"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="text-xs h-9"
                  required
                />
                <Button type="submit" variant="outline" className="h-9 px-4 text-xs font-semibold cursor-pointer shrink-0">
                  <Key className="h-3.5 w-3.5 mr-1" />
                  <span>Generate</span>
                </Button>
              </form>

            </CardContent>
          </Card>

          {/* Integrations settings list */}
          <Card className="border-slate-200 dark:border-border/30 shadow-sm bg-white dark:bg-card/45 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-border/10">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">B2B Synced Integrations</CardTitle>
              <CardDescription className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">Export campaign metrics to third-party CRM systems.</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 p-0">
              <div className="divide-y divide-slate-100 dark:divide-border/10">
                {integrations.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="flex items-center justify-between p-4 text-left text-xs">
                      <div className="flex items-start space-x-3.5 pr-4">
                        <div className={`p-2 rounded-lg bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-border/20 border border-slate-100 dark:border-border/10 text-slate-700 dark:text-slate-300 font-bold`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                          <span className="font-bold text-slate-900 dark:text-white block">{item.name}</span>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal font-medium">{item.desc}</p>
                        </div>
                      </div>

                      <Button
                        variant={item.connected ? "outline" : "primary"}
                        size="sm"
                        className="h-8 text-xs font-semibold cursor-pointer shrink-0"
                        onClick={() => handleToggleIntegration(item.id)}
                      >
                        {item.connected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
