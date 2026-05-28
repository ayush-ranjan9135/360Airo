"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Inbox, 
  Flame, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  TrendingUp, 
  ShieldCheck, 
  Mail, 
  Globe, 
  Lock,
  ChevronRight,
  Server,
  Settings,
  RefreshCw,
  Sparkles,
  Trash2,
  Activity,
  ArrowLeft,
  Building2,
  Briefcase,
  ExternalLink,
  Check,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DNSStatus {
  mx: boolean;
  spf: boolean;
  dkim: boolean;
  dmarc: boolean;
  tracking: boolean;
}

interface Mailbox {
  id: string;
  email: string;
  domain: string;
  health: number;
  warmupActive: boolean;
  warmupSentToday: number;
  warmupReplyToday: number;
  dailyCap: number;
  dns: DNSStatus;
}

const initialMailboxes: Mailbox[] = [
  {
    id: "1",
    email: "ayushranjan9531@gmail.com",
    domain: "gmail.com",
    health: 99.4,
    warmupActive: true,
    warmupSentToday: 24,
    warmupReplyToday: 8,
    dailyCap: 50,
    dns: { mx: true, spf: true, dkim: true, dmarc: true, tracking: true }
  },
  {
    id: "2",
    email: "ayush.outbound@globopersona.com",
    domain: "globopersona.com",
    health: 94.6,
    warmupActive: true,
    warmupSentToday: 18,
    warmupReplyToday: 4,
    dailyCap: 40,
    dns: { mx: true, spf: true, dkim: true, dmarc: false, tracking: false }
  },
  {
    id: "3",
    email: "sales.sender@outboundsend-2.org",
    domain: "outboundsend-2.org",
    health: 74.2,
    warmupActive: false,
    warmupSentToday: 0,
    warmupReplyToday: 0,
    dailyCap: 30,
    dns: { mx: true, spf: false, dkim: true, dmarc: false, tracking: false }
  }
];

export default function MailboxesPage() {
  const [mailboxes, setMailboxes] = React.useState<Mailbox[]>(initialMailboxes);
  const [selectedMailboxId, setSelectedMailboxId] = React.useState<string>("2");
  
  // viewMode state to toggle between accounts list and plans page
  const [viewMode, setViewMode] = React.useState<"accounts" | "pricing">("accounts");
  
  // FAQ accordion open index state
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  // Connect Mailbox Modal inputs
  const [newEmail, setNewEmail] = React.useState("");
  const [newPass, setNewPass] = React.useState("");
  const [newLimit, setNewLimit] = React.useState("50");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const selectedMailbox = mailboxes.find(m => m.id === selectedMailboxId) || mailboxes[0];

  const handleWarmupToggle = (id: string) => {
    setMailboxes(prev => prev.map(m => 
      m.id === id ? { ...m, warmupActive: !m.warmupActive } : m
    ));
  };

  const handleConnectMailbox = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;

    const parts = newEmail.split("@");
    const domain = parts[1] || "unknown.com";

    const newMb: Mailbox = {
      id: String(Date.now()),
      email: newEmail,
      domain: domain,
      health: 100.0,
      warmupActive: false,
      warmupSentToday: 0,
      warmupReplyToday: 0,
      dailyCap: Number(newLimit) || 50,
      dns: { mx: true, spf: true, dkim: false, dmarc: false, tracking: false }
    };

    setMailboxes([...mailboxes, newMb]);
    setSelectedMailboxId(newMb.id);
    setNewEmail("");
    setNewPass("");
    setIsModalOpen(false);
  };

  const handleDeleteMailbox = (id: string) => {
    const updated = mailboxes.filter(m => m.id !== id);
    setMailboxes(updated);
    if (selectedMailboxId === id && updated.length > 0) {
      setSelectedMailboxId(updated[0].id);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Dynamic calculations for Stats Cards
  const totalCount = mailboxes.length;
  const activeCount = mailboxes.filter(m => m.warmupActive).length;
  const dailyLimitSum = mailboxes.reduce((acc, curr) => acc + curr.dailyCap, 0);
  const sentTodaySum = mailboxes.reduce((acc, curr) => acc + curr.warmupSentToday, 0);
  const utilizationPercent = dailyLimitSum > 0 ? Math.round((sentTodaySum / dailyLimitSum) * 100) : 0;

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        
        {viewMode === "accounts" ? (
          /* ──────────────────────────────────────────────────────── */
          /* ── EMAIL ACCOUNTS DASHBOARD ──                          */
          /* ──────────────────────────────────────────────────────── */
          <motion.div
            key="accounts-dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >

            {/* Email Configuration Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 pb-1">
              <div className="text-left">
                <h2 className="text-base font-extrabold text-slate-950 dark:text-slate-100">
                  Email Configuration
                </h2>
              </div>

              <div className="flex items-center space-x-2 self-start sm:self-auto">
                {/* Refresh */}
                <button className="flex h-9 px-4 items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-border/30 bg-white dark:bg-card text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shadow-sm text-xs font-bold">
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Refresh</span>
                </button>

                {/* Get Professional Email (Switches to Pricing View) */}
                <button 
                  onClick={() => setViewMode("pricing")}
                  className="flex h-9 px-4 items-center justify-center gap-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Get Professional Email</span>
                </button>

                {/* Add Email Account */}
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <button className="flex h-9 px-4 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer">
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Email Account</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="border border-border/40 bg-[#121215] max-w-md">
                    <form onSubmit={handleConnectMailbox}>
                      <DialogHeader>
                        <DialogTitle className="text-md text-white">Connect Sender Mailbox</DialogTitle>
                        <DialogDescription className="text-xs">
                          Integrate SMTP and IMAP channels to start queueing campaigns.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 my-4 text-left">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-300">Email Address</label>
                          <Input
                            type="email"
                            placeholder="hello@company.com"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            required
                            className="text-xs"
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-300">App Password / SMTP Password</label>
                          <Input
                            type="password"
                            placeholder="••••••••••••"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                            required
                            className="text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-300">Daily Send Cap Limit</label>
                          <Input
                            type="number"
                            min="10"
                            max="1000"
                            value={newLimit}
                            onChange={(e) => setNewLimit(e.target.value)}
                            required
                            className="text-xs"
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="h-9 text-xs"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          variant="primary" 
                          className="h-9 text-xs font-semibold"
                        >
                          Verify & Connect
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Stats Metrics Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Active Accounts */}
              <Card className="border-emerald-500/20 dark:border-emerald-500/10 bg-emerald-500/[0.02] dark:bg-emerald-950/[0.05] shadow-sm relative group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-5">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      Active Accounts
                    </span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white mt-1.5">
                      {activeCount}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-1">
                      of {totalCount} total
                    </span>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <ShieldCheck className="h-4.5 w-4.5" />
                  </div>
                </CardHeader>
              </Card>

              {/* Daily Limit */}
              <Card className="border-blue-500/20 dark:border-blue-500/10 bg-blue-500/[0.02] dark:bg-blue-950/[0.05] shadow-sm relative group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-5">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      Daily Limit
                    </span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white mt-1.5">
                      {dailyLimitSum}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-1">
                      emails per day
                    </span>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                </CardHeader>
              </Card>

              {/* Sent Today */}
              <Card className="border-purple-500/20 dark:border-purple-500/10 bg-purple-500/[0.02] dark:bg-purple-950/[0.05] shadow-sm relative group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-5">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                      Sent Today
                    </span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white mt-1.5">
                      {sentTodaySum}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-1">
                      across all accounts
                    </span>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <Activity className="h-4.5 w-4.5" />
                  </div>
                </CardHeader>
              </Card>

              {/* Utilization */}
              <Card className="border-orange-500/20 dark:border-orange-500/10 bg-orange-500/[0.02] dark:bg-orange-950/[0.05] shadow-sm relative group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-5">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                      Utilization
                    </span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white mt-1.5">
                      {utilizationPercent}%
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-1">
                      of daily capacity
                    </span>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                    <Settings className="h-4.5 w-4.5" />
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Workspace Empty / Populated toggle container */}
            <AnimatePresence mode="wait">
              {totalCount === 0 ? (
                <motion.div
                  key="empty-view"
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                >
                  <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md overflow-hidden shadow-sm rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between p-6 pb-4 border-b border-slate-100 dark:border-border/10">
                      <div className="text-left">
                        <CardTitle className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                          Email Accounts
                        </CardTitle>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                          Manage your configured email accounts
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-slate-300 font-bold px-2.5 py-1 text-[11px] rounded-lg">
                          0 accounts
                        </Badge>
                        <Badge variant="destructive" className="bg-rose-50 text-rose-600 border border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-950/30 font-bold px-2.5 py-1 text-[11px] rounded-lg">
                          Limit Reached
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center text-center py-20 space-y-6">
                      <div className="h-16 w-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500 shadow-inner">
                        <Mail className="h-7 w-7" />
                      </div>
                      <div className="space-y-1.5 max-w-[320px]">
                        <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                          No email accounts configured
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                          Add your first email account to start sending campaigns.
                        </p>
                      </div>
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="h-10 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-bold shadow-lg shadow-purple-500/15 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Your First Account</span>
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="populated-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-6 lg:grid-cols-5"
                >
                  {/* Connected Mailboxes List */}
                  <div className="lg:col-span-2 space-y-4 text-left">
                    <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
                      <CardHeader className="pb-3 border-b border-slate-100 dark:border-border/10 flex flex-row items-center justify-between">
                        <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
                          Connected Mailboxes
                        </CardTitle>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-slate-300 font-bold px-2 py-0.5 text-[10px] rounded-lg">
                          {totalCount} accounts
                        </Badge>
                      </CardHeader>
                      <CardContent className="p-2 space-y-1">
                        {mailboxes.map((mb) => {
                          const isSelected = selectedMailboxId === mb.id;
                          return (
                            <div
                              key={mb.id}
                              onClick={() => setSelectedMailboxId(mb.id)}
                              className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer text-left ${
                                isSelected 
                                  ? "border-purple-500 bg-purple-500/5 text-slate-900 dark:text-white" 
                                  : "border-transparent hover:bg-slate-50 dark:hover:bg-white/3 text-slate-600 dark:text-slate-400"
                              }`}
                            >
                              <div className="flex items-center space-x-3 overflow-hidden">
                                <div className={`p-2 rounded-lg ${isSelected ? "bg-purple-500/10 text-purple-600 dark:text-purple-400" : "bg-slate-100 dark:bg-white/3"}`}>
                                  <Inbox className="h-4 w-4 shrink-0" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className="text-xs font-bold truncate text-slate-900 dark:text-white">
                                    {mb.email}
                                  </span>
                                  <span className="text-[10px] text-muted-foreground mt-0.5 font-mono">
                                    domain: {mb.domain}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2 shrink-0">
                                <div className="flex flex-col items-end leading-none">
                                  <span className={`text-xs font-bold font-mono ${
                                    mb.health >= 95 ? "text-emerald-500" : mb.health >= 90 ? "text-blue-500" : "text-amber-500"
                                  }`}>{mb.health}%</span>
                                  <span className="text-[8px] text-muted-foreground font-mono mt-0.5">HEALTH</span>
                                </div>
                                {mb.warmupActive && (
                                  <Flame className="h-4 w-4 text-amber-500 animate-pulse" />
                                )}
                                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                              </div>
                            </div>
                          );
                        })}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Deliverability Details & DNS Checklist */}
                  <div className="lg:col-span-3 space-y-6 text-left">
                    <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
                      <CardHeader className="pb-4 border-b border-slate-100 dark:border-border/10">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="text-left">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-mono">
                              Deliverability Node
                            </span>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                              {selectedMailbox.email}
                            </h3>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Warmup Engine</span>
                              <button
                                onClick={() => handleWarmupToggle(selectedMailbox.id)}
                                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                                  selectedMailbox.warmupActive ? "bg-purple-600" : "bg-slate-200 dark:bg-white/10"
                                }`}
                              >
                                <span
                                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ${
                                    selectedMailbox.warmupActive ? "translate-x-4" : "translate-x-0"
                                  }`}
                                />
                              </button>
                            </div>

                            <button 
                              onClick={() => handleDeleteMailbox(selectedMailbox.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-500/5 transition-colors cursor-pointer"
                              title="Delete Mailbox"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="p-4 rounded-xl border border-slate-100 dark:border-border/10 bg-slate-50/50 dark:bg-white/2 space-y-1">
                            <Flame className="h-5 w-5 text-amber-500 mx-auto animate-pulse" />
                            <span className="text-[10px] font-semibold text-muted-foreground uppercase block font-mono">Warmup Sent</span>
                            <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">{selectedMailbox.warmupSentToday}</span>
                          </div>
                          <div className="p-4 rounded-xl border border-slate-100 dark:border-border/10 bg-slate-50/50 dark:bg-white/2 space-y-1">
                            <Inbox className="h-5 w-5 text-purple-500 mx-auto" />
                            <span className="text-[10px] font-semibold text-muted-foreground uppercase block font-mono">Replies Recv</span>
                            <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">{selectedMailbox.warmupReplyToday}</span>
                          </div>
                          <div className="p-4 rounded-xl border border-slate-100 dark:border-border/10 bg-slate-50/50 dark:bg-white/2 space-y-1">
                            <ShieldCheck className="h-5 w-5 text-emerald-500 mx-auto" />
                            <span className="text-[10px] font-semibold text-muted-foreground uppercase block font-mono">Inbox Placement</span>
                            <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">{selectedMailbox.health}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* DNS Checker */}
                    <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
                      <CardHeader className="pb-3 border-b border-slate-100 dark:border-border/10">
                        <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
                          DNS Verification Checker
                        </CardTitle>
                        <CardDescription className="text-[11px] text-muted-foreground">
                          Ensure your email domain MX, SPF, DKIM, and DMARC alignments are valid.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4 p-0">
                        <div className="divide-y divide-slate-100 dark:divide-border/10 text-xs">
                          <div className="flex items-center justify-between p-4 text-left">
                            <div className="space-y-1 pr-4">
                              <span className="font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono">MX Record (Mail Exchange)</span>
                              <p className="text-[11px] text-muted-foreground">Points domain mail delivery to receiver nodes.</p>
                            </div>
                            {selectedMailbox.dns.mx ? (
                              <Badge variant="success" className="h-6 flex items-center space-x-1"><CheckCircle2 className="h-3.5 w-3.5" /> <span>Valid</span></Badge>
                            ) : (
                              <Badge variant="destructive" className="h-6 flex items-center space-x-1"><AlertTriangle className="h-3.5 w-3.5" /> <span>Missing</span></Badge>
                            )}
                          </div>

                          <div className="flex items-center justify-between p-4 text-left">
                            <div className="space-y-1 pr-4">
                              <span className="font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono">SPF Record (Sender Policy Framework)</span>
                              <p className="text-[11px] text-muted-foreground">Authorizes relays to deliver on behalf of your domain.</p>
                            </div>
                            {selectedMailbox.dns.spf ? (
                              <Badge variant="success" className="h-6 flex items-center space-x-1"><CheckCircle2 className="h-3.5 w-3.5" /> <span>Valid</span></Badge>
                            ) : (
                              <Badge variant="destructive" className="h-6 flex items-center space-x-1"><AlertTriangle className="h-3.5 w-3.5" /> <span>Missing</span></Badge>
                            )}
                          </div>

                          <div className="flex items-center justify-between p-4 text-left">
                            <div className="space-y-1 pr-4">
                              <span className="font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono">DKIM (DomainKeys Identified Mail)</span>
                              <p className="text-[11px] text-muted-foreground">Cryptographically signs outbound mail headers to prevent spoofing.</p>
                            </div>
                            {selectedMailbox.dns.dkim ? (
                              <Badge variant="success" className="h-6 flex items-center space-x-1"><CheckCircle2 className="h-3.5 w-3.5" /> <span>Valid</span></Badge>
                            ) : (
                              <Badge variant="destructive" className="h-6 flex items-center space-x-1"><AlertTriangle className="h-3.5 w-3.5" /> <span>Missing</span></Badge>
                            )}
                          </div>

                          <div className="flex items-center justify-between p-4 text-left">
                            <div className="space-y-1 pr-4">
                              <span className="font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono">DMARC Policy Alignment</span>
                              <p className="text-[11px] text-muted-foreground">Specifies validation instructions for receiving mail servers.</p>
                            </div>
                            {selectedMailbox.dns.dmarc ? (
                              <Badge variant="success" className="h-6 flex items-center space-x-1"><CheckCircle2 className="h-3.5 w-3.5" /> <span>Valid</span></Badge>
                            ) : (
                              <div className="flex flex-col items-end space-y-1">
                                <Badge variant="warning" className="h-6 flex items-center space-x-1"><AlertTriangle className="h-3.5 w-3.5" /> <span>Fix Required</span></Badge>
                                <span className="text-[9px] text-amber-500 font-mono">Expected: p=quarantine or p=reject</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between p-4 text-left">
                            <div className="space-y-1 pr-4">
                              <span className="font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono">Custom Tracking Domain</span>
                              <p className="text-[11px] text-muted-foreground">Replaces tracking pixels with your white-labeled domain name.</p>
                            </div>
                            {selectedMailbox.dns.tracking ? (
                              <Badge variant="success" className="h-6 flex items-center space-x-1"><CheckCircle2 className="h-3.5 w-3.5" /> <span>Valid</span></Badge>
                            ) : (
                              <div className="flex flex-col items-end space-y-1">
                                <Badge variant="warning" className="h-6 flex items-center space-x-1"><AlertTriangle className="h-3.5 w-3.5" /> <span>Unverified</span></Badge>
                                <span className="text-[9px] text-muted-foreground font-mono">Add CNAME for tracking.{selectedMailbox.domain}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* ──────────────────────────────────────────────────────── */
          /* ── GET PROFESSIONAL EMAIL PLANS ──                      */
          /* ──────────────────────────────────────────────────────── */
          <motion.div
            key="pricing-plans"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Top Back Action Button */}
            <div className="flex justify-start">
              <button 
                onClick={() => setViewMode("accounts")}
                className="flex items-center justify-center gap-2 h-9 px-4 rounded-xl border border-slate-200 dark:border-border/30 bg-white dark:bg-card text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Email Accounts</span>
              </button>
            </div>

            {/* Plans Top Banner & Header */}
            <div className="flex flex-col items-center justify-center text-center space-y-3.5">
              <Badge variant="secondary" className="bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-950/30 font-bold px-3 py-1 text-[11px] rounded-full flex items-center space-x-1.5">
                <Sparkles className="h-3 w-3" />
                <span>Professional Email Plans</span>
              </Badge>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight max-w-xl">
                Get Professional Email for Your Business
              </h1>
              <p className="text-xs font-semibold text-muted-foreground max-w-lg leading-relaxed">
                Choose from Microsoft 365, Google Workspace, or GoDaddy Email. All plans integrate seamlessly with 360AIRO.
              </p>
            </div>

            {/* Why use professional email info bar */}
            <Card className="border-blue-500/10 dark:border-blue-500/10 bg-blue-500/[0.02] dark:bg-blue-950/[0.03] rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6 flex flex-col md:flex-row items-start gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex-1 text-left space-y-3">
                  <div>
                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">
                      Why use professional email?
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Professional email accounts provide better deliverability, higher inbox placement rates, and enhanced sender reputation compared to free email services.
                    </p>
                  </div>
                  
                  {/* Badge Row */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      "Better deliverability",
                      "Higher daily limits",
                      "Professional branding",
                      "Advanced security"
                    ].map((badge) => (
                      <Badge 
                        key={badge}
                        variant="secondary" 
                        className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 font-bold px-2.5 py-1 text-[10px] rounded-lg flex items-center space-x-1"
                      >
                        <Check className="h-3 w-3 shrink-0" />
                        <span>{badge}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ── PRICING CARDS ── */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Microsoft 365 */}
              <Card className="border-slate-200 dark:border-border/30 bg-white dark:bg-card/45 relative overflow-hidden shadow-sm flex flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-950/30 dark:text-blue-400 font-bold px-2 py-0.5 text-[9px] rounded-full">
                    Recommended
                  </Badge>
                </div>
                
                <CardHeader className="p-6 pb-4 text-left flex flex-col items-start">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner mb-4">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base font-extrabold text-slate-900 dark:text-white">
                    Microsoft 365
                  </CardTitle>
                  <CardDescription className="text-[10px] font-semibold text-muted-foreground mt-0.5">
                    Enterprise-Grade Email Solution
                  </CardDescription>
                  <div className="flex items-baseline mt-4 space-x-1">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">$6</span>
                    <span className="text-[11px] text-muted-foreground font-semibold">/user/month</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-4 leading-relaxed font-medium">
                    Professional email with Microsoft Teams, OneDrive, and Office apps
                  </p>
                </CardHeader>

                <CardContent className="p-6 pt-0 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Badge Row */}
                    <div className="flex flex-wrap gap-1.5">
                      {["Best for teams", "Enterprise security", "High deliverability"].map((tag) => (
                        <span key={tag} className="bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400 text-[9px] font-bold px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Feature list */}
                    <ul className="space-y-2 text-left text-[11px] font-medium text-slate-600 dark:text-slate-300">
                      {[
                        "50 GB mailbox storage",
                        "Custom email domain",
                        "Microsoft Teams included",
                        "Office 365 web & mobile apps",
                        "1 TB OneDrive cloud storage",
                        "99.9% uptime guarantee",
                        "Advanced security & compliance",
                        "24/7 phone & web support"
                      ].map((feat) => (
                        <li key={feat} className="flex items-center space-x-2">
                          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 text-center space-y-2">
                    <a 
                      href="https://www.microsoft.com/microsoft-365/business/compare-all-microsoft-365-business-products"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <span>Get Microsoft 365</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <span className="text-[9px] text-muted-foreground block">
                      Secure checkout on Microsoft 365
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Google Workspace */}
              <Card className="border-slate-200 dark:border-border/30 bg-white dark:bg-card/45 relative overflow-hidden shadow-sm flex flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 font-bold px-2 py-0.5 text-[9px] rounded-full">
                    Most Popular
                  </Badge>
                </div>
                
                <CardHeader className="p-6 pb-4 text-left flex flex-col items-start">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner mb-4">
                    <Globe className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base font-extrabold text-slate-900 dark:text-white">
                    Google Workspace
                  </CardTitle>
                  <CardDescription className="text-[10px] font-semibold text-muted-foreground mt-0.5">
                    Smart Collaboration Platform
                  </CardDescription>
                  <div className="flex items-baseline mt-4 space-x-1">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">$6</span>
                    <span className="text-[11px] text-muted-foreground font-semibold">/user/month</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-4 leading-relaxed font-medium">
                    Professional Gmail with Google Drive, Meet, and Workspace apps
                  </p>
                </CardHeader>

                <CardContent className="p-6 pt-0 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Badge Row */}
                    <div className="flex flex-wrap gap-1.5">
                      {["Global infrastructure", "Easy collaboration", "Trusted by millions"].map((tag) => (
                        <span key={tag} className="bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400 text-[9px] font-bold px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Feature list */}
                    <ul className="space-y-2 text-left text-[11px] font-medium text-slate-600 dark:text-slate-300">
                      {[
                        "30 GB cloud storage",
                        "Custom business email",
                        "Google Meet video conferencing",
                        "Shared drives & calendars",
                        "Google Docs, Sheets, Slides",
                        "Mobile device management",
                        "Advanced admin controls",
                        "24/7 support"
                      ].map((feat) => (
                        <li key={feat} className="flex items-center space-x-2">
                          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 text-center space-y-2">
                    <a 
                      href="https://workspace.google.com/pricing.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <span>Get Google Workspace</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <span className="text-[9px] text-muted-foreground block">
                      Secure checkout on Google Workspace
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* GoDaddy Email */}
              <Card className="border-slate-200 dark:border-border/30 bg-white dark:bg-card/45 relative overflow-hidden shadow-sm flex flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-orange-50 text-orange-600 border border-orange-100 dark:bg-orange-950/30 dark:text-orange-400 font-bold px-2 py-0.5 text-[9px] rounded-full">
                    Best Value
                  </Badge>
                </div>
                
                <CardHeader className="p-6 pb-4 text-left flex flex-col items-start">
                  <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shadow-inner mb-4">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base font-extrabold text-slate-900 dark:text-white">
                    GoDaddy Email
                  </CardTitle>
                  <CardDescription className="text-[10px] font-semibold text-muted-foreground mt-0.5">
                    Budget-Friendly Business Email
                  </CardDescription>
                  <div className="flex items-baseline mt-4 space-x-1">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">$3.99</span>
                    <span className="text-[11px] text-muted-foreground font-semibold">/user/month</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-4 leading-relaxed font-medium">
                    Affordable professional email with essential features
                  </p>
                </CardHeader>

                <CardContent className="p-6 pt-0 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Badge Row */}
                    <div className="flex flex-wrap gap-1.5">
                      {["Most affordable", "Quick setup", "For small business"].map((tag) => (
                        <span key={tag} className="bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400 text-[9px] font-bold px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Feature list */}
                    <ul className="space-y-2 text-left text-[11px] font-medium text-slate-600 dark:text-slate-300">
                      {[
                        "10 GB email storage",
                        "Professional email address",
                        "Webmail & mobile access",
                        "Calendar & contacts sync",
                        "99.9% uptime guarantee",
                        "Spam & virus protection",
                        "SSL security",
                        "Email support"
                      ].map((feat) => (
                        <li key={feat} className="flex items-center space-x-2">
                          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 text-center space-y-2">
                    <a 
                      href="https://www.godaddy.com/email/professional-email"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <span>Get GoDaddy Email</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <span className="text-[9px] text-muted-foreground block">
                      Secure checkout on GoDaddy Email
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── FEATURE COMPARISON TABLE ── */}
            <div className="space-y-4 text-left">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight text-center">
                Feature Comparison
              </h2>
              
              <Card className="border-slate-200 dark:border-border/30 bg-white dark:bg-card/45 overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px] font-medium text-slate-600 dark:text-slate-300">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-border/10 uppercase tracking-wider text-[10px] font-bold text-slate-400 dark:text-muted-foreground">
                        <th className="px-6 py-4 text-left">Feature</th>
                        <th className="px-6 py-4 text-center">Microsoft 365</th>
                        <th className="px-6 py-4 text-center">Google Workspace</th>
                        <th className="px-6 py-4 text-center">GoDaddy Email</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-border/10">
                      <tr>
                        <td className="px-6 py-4 text-left font-bold text-slate-800 dark:text-slate-200">Storage per user</td>
                        <td className="px-6 py-4 text-center">50 GB</td>
                        <td className="px-6 py-4 text-center">30 GB</td>
                        <td className="px-6 py-4 text-center">10 GB</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-left font-bold text-slate-800 dark:text-slate-200">Custom domain</td>
                        <td className="px-6 py-4 text-center"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                        <td className="px-6 py-4 text-center"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                        <td className="px-6 py-4 text-center"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-left font-bold text-slate-800 dark:text-slate-200">Daily sending limit</td>
                        <td className="px-6 py-4 text-center">2,000</td>
                        <td className="px-6 py-4 text-center">2,000</td>
                        <td className="px-6 py-4 text-center">500</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-left font-bold text-slate-800 dark:text-slate-200">Mobile apps</td>
                        <td className="px-6 py-4 text-center"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                        <td className="px-6 py-4 text-center"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                        <td className="px-6 py-4 text-center"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-left font-bold text-slate-800 dark:text-slate-200">Collaboration tools</td>
                        <td className="px-6 py-4 text-center">Teams, Office</td>
                        <td className="px-6 py-4 text-center">Meet, Drive</td>
                        <td className="px-6 py-4 text-center">Basic</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-left font-bold text-slate-800 dark:text-slate-200">Best for</td>
                        <td className="px-6 py-4 text-center">Enterprise teams</td>
                        <td className="px-6 py-4 text-center">Growing businesses</td>
                        <td className="px-6 py-4 text-center">Small businesses</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* ── FREQUENTLY ASKED QUESTIONS ── */}
            <div className="space-y-4 text-left">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-3 max-w-4xl mx-auto">
                {[
                  {
                    q: "How do I connect my email after purchase?",
                    a: "After purchasing your email plan, return to 360AIRO and go to Settings → Email Accounts → Add Email Account. Enter your new professional email credentials to connect seamlessly."
                  },
                  {
                    q: "Can I use multiple email providers?",
                    a: "Yes! 360AIRO supports connecting email accounts from multiple providers. You can mix Microsoft 365, Google Workspace, and GoDaddy accounts for maximum flexibility."
                  },
                  {
                    q: "Do you offer any discounts or special deals?",
                    a: "360AIRO users may receive special promotional offers from our email provider partners. Check each provider's website for current promotions when purchasing."
                  },
                  {
                    q: "Which provider do you recommend?",
                    a: "For enterprises and teams, we recommend Microsoft 365 for its robust features. Google Workspace is excellent for businesses prioritizing collaboration. GoDaddy Email is perfect for budget-conscious small businesses starting out."
                  }
                ].map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <Card key={index} className="border-slate-100 dark:border-border/20 bg-slate-50/50 dark:bg-card/10 overflow-hidden rounded-xl">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-4 text-left text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-white/5 cursor-pointer transition-all"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  );
                })}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
