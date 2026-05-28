"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  Play, 
  Pause, 
  Trash2, 
  SlidersHorizontal,
  Mail,
  RefreshCw,
  Target,
  Edit2,
  Cpu,
  Users,
  Compass,
  ChevronDown,
  LayoutGrid,
  List,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Campaign {
  id: string;
  name: string;
  type: "manual" | "ai";
  created: string;
  status: "active" | "paused" | "draft" | "completed";
  sent: number;
  openRate: number;
  replyRate: number;
  clickRate: number;
  progress: number;
}

const initialCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Automated Seed Outreach",
    type: "ai",
    created: "2026-05-10",
    status: "active",
    sent: 4820,
    openRate: 72.4,
    replyRate: 15.8,
    clickRate: 24.3,
    progress: 85,
  },
  {
    id: "2",
    name: "SaaS Follow-up Flow",
    type: "manual",
    created: "2026-05-15",
    status: "paused",
    sent: 3500,
    openRate: 64.0,
    replyRate: 9.2,
    clickRate: 18.5,
    progress: 40,
  },
  {
    id: "3",
    name: "Enterprise Cold Pitch",
    type: "ai",
    created: "2026-05-20",
    status: "draft",
    sent: 0,
    openRate: 0,
    replyRate: 0,
    clickRate: 0,
    progress: 0,
  },
  {
    id: "4",
    name: "Product Launch Outbound",
    type: "manual",
    created: "2026-04-01",
    status: "completed",
    sent: 6500,
    openRate: 78.1,
    replyRate: 22.4,
    clickRate: 31.0,
    progress: 100,
  },
];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = React.useState<Campaign[]>(initialCampaigns);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [typeFilter, setTypeFilter] = React.useState<string>("all");
  const [layoutMode, setLayoutMode] = React.useState<"grid" | "list">("list");
  
  // Custom dropdown states
  const [showStatusDropdown, setShowStatusDropdown] = React.useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);

  // Extra slide-out filter options
  const [qualityFilter, setQualityFilter] = React.useState("all");
  const [dateFilter, setDateFilter] = React.useState("all");
  const [showQualityDropdown, setShowQualityDropdown] = React.useState(false);
  const [showDateDropdown, setShowDateDropdown] = React.useState(false);

  // Closing refs
  const statusRef = React.useRef<HTMLDivElement>(null);
  const typeRef = React.useRef<HTMLDivElement>(null);
  const qualityRef = React.useRef<HTMLDivElement>(null);
  const dateRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false);
      }
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) {
        setShowTypeDropdown(false);
      }
      if (qualityRef.current && !qualityRef.current.contains(event.target as Node)) {
        setShowQualityDropdown(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setShowDateDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusChange = (id: string, newStatus: Campaign["status"]) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const handleDelete = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  const handleCreateDemoCampaign = () => {
    const newCamp: Campaign = {
      id: String(Date.now()),
      name: `Outreach Run #${campaigns.length + 1}`,
      type: Math.random() > 0.5 ? "manual" : "ai",
      created: new Date().toISOString().split("T")[0],
      status: "draft",
      sent: 0,
      openRate: 0,
      replyRate: 0,
      clickRate: 0,
      progress: 0
    };
    setCampaigns([...campaigns, newCamp]);
  };

  // Filter logic
  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesType = typeFilter === "all" || c.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Dynamic calculations
  const totalCampaigns = campaigns.length;
  const manualCount = campaigns.filter(c => c.type === "manual").length;
  const aiCount = campaigns.filter(c => c.type === "ai").length;
  const totalRecipients = campaigns.reduce((acc, curr) => acc + curr.sent, 0);
  const avgOpenRate = totalCampaigns > 0 ? Math.round(campaigns.reduce((acc, curr) => acc + curr.openRate, 0) / totalCampaigns) : 0;
  const avgClickRate = totalCampaigns > 0 ? Math.round(campaigns.reduce((acc, curr) => acc + curr.clickRate, 0) / totalCampaigns) : 0;

  return (
    <div className="space-y-6">
      

      {/* ── EMAIL CAMPAIGNS TITLE BAR ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 pb-1">
        <div className="flex items-center space-x-3 text-left">
          <div className="h-9 w-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-inner">
            <Target className="h-4.5 w-4.5" />
          </div>
          <h2 className="text-base font-extrabold text-slate-950 dark:text-slate-100">
            Email Campaigns
          </h2>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          {/* Refresh */}
          <button 
            onClick={() => setCampaigns(initialCampaigns)}
            className="flex h-9 px-4 items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-border/30 bg-white dark:bg-card text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shadow-sm text-xs font-bold"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </button>

          {/* New Campaign */}
          <button 
            onClick={handleCreateDemoCampaign}
            className="flex h-9 px-4 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* ── STATS METRIC GRID ── */}
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
          { label: "Open Rate", sub: "Unique opens", val: `${avgOpenRate}%`, icon: Mail, color: "pink" },
          { label: "Click Rate", sub: "Average clicks", val: `${avgClickRate}%`, icon: Compass, color: "cyan" },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }} 
            whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.2 } }}
            className="h-full cursor-pointer"
          >
            <Card className={`h-full border-${stat.color}-500/15 dark:border-${stat.color}-500/10 bg-${stat.color}-500/[0.01] dark:bg-${stat.color}-950/[0.04] shadow-sm rounded-2xl transition-colors hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60`}> 
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
                <div className="flex flex-col text-left">
                  <span className={`text-[10px] font-bold text-${stat.color}-600 dark:text-${stat.color}-400 uppercase tracking-wider`}>
                    {stat.label}
                  </span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white mt-1.5">
                    {stat.val}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-1">
                    {stat.sub}
                  </span>
                </div>
                <div className={`h-8 w-8 rounded-lg bg-${stat.color}-500 text-white flex items-center justify-center shadow-lg shadow-${stat.color}-500/25`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* ── WORKSPACE CONTROLS ROW ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        {/* Left search */}
        <div className="relative w-full md:w-80 max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search campaigns by name, description, or email list..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs border-slate-200 dark:border-border/30 bg-slate-50 dark:bg-card placeholder:text-slate-400 rounded-xl"
          />
        </div>

        {/* Right controls */}
        <div className="flex items-center space-x-2 self-start md:self-auto w-full md:w-auto justify-end">
          {/* Status selector */}
          <div className="relative" ref={statusRef}>
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="flex h-9 items-center justify-between bg-white dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none hover:bg-slate-50 dark:hover:bg-card/85 cursor-pointer shadow-sm min-w-[110px] transition-all"
            >
              <span>
                {statusFilter === "all" && "All Status"}
                {statusFilter === "active" && "Active"}
                {statusFilter === "paused" && "Paused"}
                {statusFilter === "completed" && "Completed"}
                {statusFilter === "draft" && "Draft"}
              </span>
              <ChevronDown className={`ml-2 h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${showStatusDropdown ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {showStatusDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 4, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full z-50 w-40 bg-white dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl shadow-xl p-1.5 focus:outline-none text-left"
                >
                  {[
                    { value: "all", label: "All Status" },
                    { value: "active", label: "Active" },
                    { value: "paused", label: "Paused" },
                    { value: "completed", label: "Completed" },
                    { value: "draft", label: "Draft" }
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => {
                        setStatusFilter(item.value);
                        setShowStatusDropdown(false);
                      }}
                      className={`flex items-center w-full px-3 py-1.5 text-left text-xs rounded-lg transition-colors cursor-pointer ${
                        statusFilter === item.value
                          ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                      }`}
                    >
                      {statusFilter === item.value ? (
                        <span className="mr-2 text-blue-600 dark:text-blue-400 text-sm leading-none font-bold">✓</span>
                      ) : (
                        <span className="w-4" />
                      )}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Types Selector */}
          <div className="relative" ref={typeRef}>
            <button
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
              className="flex h-9 items-center justify-between bg-white dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none hover:bg-slate-50 dark:hover:bg-card/85 cursor-pointer shadow-sm min-w-[110px] transition-all"
            >
              <span>
                {typeFilter === "all" && "All Types"}
                {typeFilter === "manual" && "Manual"}
                {typeFilter === "ai" && "AI Personalized"}
              </span>
              <ChevronDown className={`ml-2 h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${showTypeDropdown ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {showTypeDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 4, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full z-50 w-44 bg-white dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl shadow-xl p-1.5 focus:outline-none text-left"
                >
                  {[
                    { value: "all", label: "All Types" },
                    { value: "manual", label: "Manual" },
                    { value: "ai", label: "AI Personalized" }
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => {
                        setTypeFilter(item.value);
                        setShowTypeDropdown(false);
                      }}
                      className={`flex items-center w-full px-3 py-1.5 text-left text-xs rounded-lg transition-colors cursor-pointer ${
                        typeFilter === item.value
                          ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                      }`}
                    >
                      {typeFilter === item.value ? (
                        <span className="mr-2 text-blue-600 dark:text-blue-400 text-sm leading-none font-bold">✓</span>
                      ) : (
                        <span className="w-4" />
                      )}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Filters Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex h-9 px-3 items-center justify-center gap-1.5 rounded-xl border transition-all cursor-pointer text-xs font-bold ${
              showFilters 
                ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-sm" 
                : "border-slate-200 dark:border-border/30 bg-slate-50 dark:bg-card text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filters</span>
          </button>

          {/* Layout Mode Toggles */}
          <div className="flex items-center space-x-0.5 bg-slate-100 dark:bg-white/5 p-0.5 rounded-xl border border-slate-200 dark:border-border/20">
            <button 
              onClick={() => setLayoutMode("grid")}
              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${layoutMode === "grid" ? "bg-white dark:bg-card text-blue-600 dark:text-white shadow-sm" : "text-slate-400 hover:text-slate-700 dark:hover:text-white"}`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button 
              onClick={() => setLayoutMode("list")}
              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${layoutMode === "list" ? "bg-white dark:bg-card text-blue-600 dark:text-white shadow-sm" : "text-slate-400 hover:text-slate-700 dark:hover:text-white"}`}
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Filters Drawer */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            animate={{ height: "auto", opacity: 1, marginBottom: 16 }}
            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden bg-slate-50/50 dark:bg-card/10 border border-slate-200 dark:border-border/20 rounded-2xl p-4 shadow-inner"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Extra Quality Filter */}
              <div className="flex flex-col space-y-1.5 text-left" ref={qualityRef}>
                <label className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider pl-1">
                  Quality
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowQualityDropdown(!showQualityDropdown)}
                    className="w-full flex items-center justify-between bg-white dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none hover:bg-slate-50 dark:hover:bg-card/80 cursor-pointer shadow-sm"
                  >
                    <span>
                      {qualityFilter === "all" && "All Quality"}
                      {qualityFilter === "high" && "High (>80%)"}
                      {qualityFilter === "medium" && "Medium (50-80%)"}
                      {qualityFilter === "low" && "Low (<50%)"}
                    </span>
                    <ChevronDown className={`ml-2 h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${showQualityDropdown ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {showQualityDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 4, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 right-0 top-full z-40 bg-white dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl shadow-xl p-1.5 focus:outline-none"
                      >
                        {[
                          { value: "all", label: "All Quality" },
                          { value: "high", label: "High (>80%)" },
                          { value: "medium", label: "Medium (50-80%)" },
                          { value: "low", label: "Low (<50%)" },
                        ].map((item) => (
                          <button
                            key={item.value}
                            onClick={() => {
                              setQualityFilter(item.value);
                              setShowQualityDropdown(false);
                            }}
                            className={`flex items-center w-full px-3 py-1.5 text-left text-xs rounded-lg transition-colors cursor-pointer ${
                              qualityFilter === item.value
                                ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold"
                                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                            }`}
                          >
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Extra Date Range Filter */}
              <div className="flex flex-col space-y-1.5 text-left" ref={dateRef}>
                <label className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider pl-1">
                  Date Range
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowDateDropdown(!showDateDropdown)}
                    className="w-full flex items-center justify-between bg-white dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none hover:bg-slate-50 dark:hover:bg-card/80 cursor-pointer shadow-sm"
                  >
                    <span>
                      {dateFilter === "all" && "All Time"}
                      {dateFilter === "today" && "Today"}
                      {dateFilter === "7days" && "Last 7 Days"}
                      {dateFilter === "30days" && "Last 30 Days"}
                    </span>
                    <ChevronDown className={`ml-2 h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${showDateDropdown ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {showDateDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 4, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 right-0 top-full z-40 bg-white dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl shadow-xl p-1.5 focus:outline-none"
                      >
                        {[
                          { value: "all", label: "All Time" },
                          { value: "today", label: "Today" },
                          { value: "7days", label: "Last 7 Days" },
                          { value: "30days", label: "Last 30 Days" },
                        ].map((item) => (
                          <button
                            key={item.value}
                            onClick={() => {
                              setDateFilter(item.value);
                              setShowDateDropdown(false);
                            }}
                            className={`flex items-center w-full px-3 py-1.5 text-left text-xs rounded-lg transition-colors cursor-pointer ${
                              dateFilter === item.value
                                ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold"
                                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                            }`}
                          >
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── WORKSPACE CONTENT ── */}
      <AnimatePresence mode="wait">
        {filteredCampaigns.length === 0 ? (
          /* Empty state view matching the mockup */
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="rounded-2xl border border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center text-center py-20 px-6 space-y-6">
              <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500 shadow-inner">
                <Mail className="h-7 w-7" />
              </div>
              <div className="space-y-2 max-w-sm">
                <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                  No Campaigns Yet
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed font-semibold">
                  Get started by creating your first email campaign. Choose between manual or AI-personalized campaigns.
                </p>
              </div>
              <button 
                onClick={handleCreateDemoCampaign}
                className="h-10 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-bold shadow-lg shadow-purple-500/15 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>Create Your First Campaign</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Populated state list view */
          <motion.div
            key="populated"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {layoutMode === "list" ? (
              <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px] font-medium text-slate-600 dark:text-slate-300">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-border/10 uppercase tracking-wider text-[10px] font-bold text-slate-400 dark:text-muted-foreground">
                        <th className="px-6 py-4 text-left">Campaign Name</th>
                        <th className="px-6 py-4 text-center">Type</th>
                        <th className="px-6 py-4 text-center">Status</th>
                        <th className="px-6 py-4 text-center">Sent</th>
                        <th className="px-6 py-4 text-center">Open Rate</th>
                        <th className="px-6 py-4 text-center">Click Rate</th>
                        <th className="px-6 py-4 text-right pr-6">Actions</th>
                      </tr>
                    </thead>
                    <motion.tbody variants={{ show: { transition: { staggerChildren: 0.05 } } }} initial="hidden" animate="show" className="divide-y divide-slate-100 dark:divide-border/10">
                      {filteredCampaigns.map((c) => (
                                                <motion.tr 
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
                              <span className={`h-1.5 w-1.5 rounded-full ${
                                c.status === "active" ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" :
                                c.status === "paused" ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" :
                                c.status === "completed" ? "bg-blue-500" : "bg-slate-400"
                              }`} />
                              <span className="font-bold text-xs capitalize text-slate-700 dark:text-slate-300">
                                {c.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center font-mono text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {c.sent.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-center font-mono text-emerald-600 dark:text-emerald-400 font-bold group-hover:drop-shadow-[0_0_4px_rgba(16,185,129,0.3)]">
                            {c.sent > 0 ? `${c.openRate}%` : "—"}
                          </td>
                          <td className="px-6 py-4 text-center font-mono text-purple-600 dark:text-purple-400 font-bold group-hover:drop-shadow-[0_0_4px_rgba(147,51,234,0.3)]">
                            {c.sent > 0 ? `${c.clickRate}%` : "—"}
                          </td>
                          <td className="px-6 py-4 text-right pr-6">
                            <div className="flex items-center justify-end space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              {c.status === "active" ? (
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handleStatusChange(c.id, "paused"); }}
                                  className="p-1 hover:text-amber-500 text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                                  title="Pause"
                                >
                                  <Pause className="h-3.5 w-3.5" />
                                </button>
                              ) : c.status === "paused" ? (
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handleStatusChange(c.id, "active"); }}
                                  className="p-1 hover:text-emerald-500 text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                                  title="Resume"
                                >
                                  <Play className="h-3.5 w-3.5" />
                                </button>
                              ) : null}
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleDelete(c.id); }}
                                className="p-1 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-500/5 transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </motion.tbody>
                  </table>
                </div>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredCampaigns.map((c) => (
                  <Card key={c.id} className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md rounded-2xl p-5 text-left space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="font-black text-slate-900 dark:text-white text-sm">{c.name}</span>
                        <p className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">Created on {c.created}</p>
                      </div>
                      <Badge variant={c.type === "ai" ? "premium" : "secondary"} className="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase">
                        {c.type === "ai" ? "AI" : "Manual"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center py-2 border-y border-slate-100 dark:border-border/10">
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider block">Sent</span>
                        <span className="text-xs font-black text-slate-800 dark:text-slate-200 font-mono">{c.sent.toLocaleString()}</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider block">Open</span>
                        <span className="text-xs font-black text-emerald-500 font-mono">{c.sent > 0 ? `${c.openRate}%` : "—"}</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider block">Click</span>
                        <span className="text-xs font-black text-purple-500 font-mono">{c.sent > 0 ? `${c.clickRate}%` : "—"}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center space-x-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          c.status === "active" ? "bg-emerald-500 animate-pulse" :
                          c.status === "paused" ? "bg-amber-500" :
                          c.status === "completed" ? "bg-blue-500" : "bg-slate-400"
                        }`} />
                        <span className="font-bold text-xs capitalize text-slate-700 dark:text-slate-300">
                          {c.status}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1">
                        {c.status === "active" ? (
                          <button 
                            onClick={() => handleStatusChange(c.id, "paused")}
                            className="p-1.5 hover:text-amber-500 text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                          >
                            <Pause className="h-3.5 w-3.5" />
                          </button>
                        ) : c.status === "paused" ? (
                          <button 
                            onClick={() => handleStatusChange(c.id, "active")}
                            className="p-1.5 hover:text-emerald-500 text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                          >
                            <Play className="h-3.5 w-3.5" />
                          </button>
                        ) : null}
                        <button 
                          onClick={() => handleDelete(c.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-500/5 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
