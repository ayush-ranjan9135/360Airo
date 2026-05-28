"use client";

import * as React from "react";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { 
  FolderSync, Users, Mail, Percent, Send, ShieldAlert,
  Plus, Search, SlidersHorizontal, Download, ArrowRight,
  TrendingUp, Layers, Sparkles, Inbox, RefreshCw, ChevronDown, BarChart3
} from "lucide-react";
import Link from "next/link";
import { BarChart2 } from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const engagementData = [
  { name: 'Mon', opens: 145, replies: 42 },
  { name: 'Tue', opens: 252, replies: 68 },
  { name: 'Wed', opens: 218, replies: 55 },
  { name: 'Thu', opens: 311, replies: 92 },
  { name: 'Fri', opens: 288, replies: 89 },
  { name: 'Sat', opens: 95, replies: 18 },
  { name: 'Sun', opens: 120, replies: 25 },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [timeRange, setTimeRange] = React.useState("7");
  const [showAnalyticsModal, setShowAnalyticsModal] = React.useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = React.useState(false);
  const [templateTab, setTemplateTab] = React.useState("email");

  const stats = [
    {
      title: "Total Campaigns",
      value: "0",
      change: "0",
      changeType: "neutral",
      icon: Users,
      subtitle: "Active & completed",
      targetText: "0% of target",
      bgClass: "bg-blue-50/50 dark:bg-gradient-to-b dark:from-[#0b1329] dark:to-[#080d1e]",
      iconBgClass: "bg-blue-50 dark:bg-blue-900/20",
      iconColorClass: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Recipients",
      value: "0",
      change: "0",
      changeType: "neutral",
      icon: Users,
      subtitle: "Reached contacts",
      targetText: "0% of target",
      bgClass: "bg-purple-50/50 dark:bg-gradient-to-b dark:from-[#0b1329] dark:to-[#080d1e]",
      iconBgClass: "bg-purple-50 dark:bg-purple-900/20",
      iconColorClass: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Avg Open Rate",
      value: "0.0%",
      change: "-1.2%",
      changeType: "negative",
      icon: Mail,
      subtitle: "Email engagement",
      targetText: "0% of target",
      bgClass: "bg-emerald-50/50 dark:bg-gradient-to-b dark:from-[#0b1329] dark:to-[#080d1e]",
      iconBgClass: "bg-emerald-50 dark:bg-emerald-900/20",
      iconColorClass: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Avg Click Rate",
      value: "0.0%",
      change: "-0.3%",
      changeType: "negative",
      icon: Percent,
      subtitle: "Link interactions",
      targetText: "0% of target",
      bgClass: "bg-amber-50/50 dark:bg-gradient-to-b dark:from-[#0b1329] dark:to-[#080d1e]",
      iconBgClass: "bg-amber-50 dark:bg-amber-900/20",
      iconColorClass: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Emails Delivered",
      value: "0",
      change: "0",
      changeType: "neutral",
      icon: Send,
      subtitle: "Successfully sent",
      targetText: "0% of target",
      bgClass: "bg-cyan-50/50 dark:bg-gradient-to-b dark:from-[#0b1329] dark:to-[#080d1e]",
      iconBgClass: "bg-cyan-50 dark:bg-cyan-900/20",
      iconColorClass: "text-cyan-600 dark:text-cyan-400",
    },
    {
      title: "Bounce Rate",
      value: "0.0%",
      change: "-0.5%",
      changeType: "positive",
      icon: ShieldAlert,
      subtitle: "Failed deliveries",
      targetText: "100% of target",
      bgClass: "bg-rose-50/50 dark:bg-gradient-to-b dark:from-[#0b1329] dark:to-[#080d1e]",
      iconBgClass: "bg-rose-50 dark:bg-rose-900/20",
      iconColorClass: "text-rose-600 dark:text-rose-400",
      showProgressBar: true,
    },
  ];

  const quickActions = [
    {
      title: "Create Campaign",
      desc: "Design stunning email campaigns",
      icon: Plus,
      badge: "Popular",
      badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      link: "/dashboard/campaigns/create",
      bgClass: "bg-blue-50/50 dark:bg-slate-900",
      iconBgClass: "bg-blue-50 dark:bg-blue-900/20",
      iconColorClass: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Import Contacts",
      desc: "Add new subscribers easily",
      icon: Users,
      link: "/dashboard/prospects",
      bgClass: "bg-purple-50/50 dark:bg-slate-900",
      iconBgClass: "bg-purple-50 dark:bg-purple-900/20",
      iconColorClass: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "View Analytics",
      desc: "Track performance metrics",
      icon: TrendingUp,
      onClick: () => setShowAnalyticsModal(true),
      bgClass: "bg-emerald-50/50 dark:bg-slate-900",
      iconBgClass: "bg-emerald-50 dark:bg-emerald-900/20",
      iconColorClass: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Browse Templates",
      desc: "Professional email templates",
      icon: Layers,
      badge: "New",
      badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      onClick: () => setShowTemplatesModal(true),
      bgClass: "bg-amber-50/50 dark:bg-slate-900",
      iconBgClass: "bg-amber-50 dark:bg-amber-900/20",
      iconColorClass: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Segment Lists",
      desc: "Target specific audiences",
      icon: Sparkles,
      link: "/dashboard/prospects",
      bgClass: "bg-indigo-50/50 dark:bg-slate-900",
      iconBgClass: "bg-indigo-50 dark:bg-indigo-900/20",
      iconColorClass: "text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "Email Accounts",
      desc: "Manage sender accounts",
      icon: FolderSync,
      badge: "Pro",
      badgeColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      link: "/dashboard/mailboxes",
      bgClass: "bg-rose-50/50 dark:bg-slate-900",
      iconBgClass: "bg-rose-50 dark:bg-rose-900/20",
      iconColorClass: "text-rose-600 dark:text-rose-400",
    },
  ];

  return (
    <div className="space-y-10">
      
      {/* Welcome Header bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            Welcome back, {user?.name?.split(" ")[0] || "Ayush"}! 👋
          </h1>
          <p className="text-xs font-semibold text-muted-foreground mt-1">
            Here's what's happening with your campaigns today.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start md:self-auto">
          {/* Time range selector */}
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-slate-50 dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl px-3.5 py-1.5 pr-8 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-purple-500 cursor-pointer shadow-sm min-w-[120px]"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Refresh button */}
          <button 
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 dark:border-border/30 bg-slate-50 dark:bg-card text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shadow-sm"
            title="Refresh dashboard data"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ── PERFORMANCE OVERVIEW ── */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-muted-foreground font-mono">
          Performance Overview
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const isNegative = stat.changeType === "negative";
            const isPositive = stat.changeType === "positive";

            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Card className={`border-slate-200/60 dark:border-slate-800/80 ${stat.bgClass} backdrop-blur-md transition-all duration-300 relative group overflow-hidden hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 cursor-pointer`}>
                  {/* Top gradient glow line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <CardHeader className="flex flex-row items-center justify-between pb-3 p-5">
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-black text-slate-900 dark:text-white">
                        {stat.title}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">
                        {stat.subtitle}
                      </span>
                    </div>

                    <div className={`h-10 w-10 rounded-2xl flex items-center justify-center shadow-md ${stat.iconBgClass} ${stat.iconColorClass} transition-transform group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:-translate-y-1 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </CardHeader>

                  <CardContent className="px-5 pb-5 pt-0 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {stat.value}
                      </span>
                      {stat.change !== "0" && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          isPositive ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                          isNegative ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" :
                          "bg-slate-100 text-slate-500"
                        }`}>
                          {stat.change}
                        </span>
                      )}
                    </div>

                    {/* Bounce rate custom progress bar */}
                    {stat.showProgressBar && (
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500 rounded-full" style={{ width: "65%" }} />
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold pt-1 border-t border-slate-100 dark:border-white/5">
                      <span>Target Goal</span>
                      <span>{stat.targetText}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* ── QUICK ACTIONS ── */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-muted-foreground font-mono">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action, i) => {
            const Icon = action.icon;

            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
              >
                {action.link ? (
                  <Link href={action.link} className="block group">
                  <Card className={`border-slate-200/60 dark:border-border/30 ${action.bgClass} backdrop-blur-md hover:shadow-lg transition-all duration-300 relative overflow-hidden h-[100px] flex flex-col justify-center`}>
                    <CardContent className="p-5 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center shadow-md ${action.iconBgClass} ${action.iconColorClass} group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:-translate-y-1 group-hover:rotate-6 transition-all duration-300 duration-200`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col text-left">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {action.title}
                            </h4>
                            {action.badge && (
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${action.badgeColor}`}>
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
                  </Link>
                ) : (
                  <div onClick={action.onClick} className="block group cursor-pointer">
                    <Card className={`border-slate-200/60 dark:border-border/30 ${action.bgClass} backdrop-blur-md hover:shadow-lg transition-all duration-300 relative overflow-hidden h-[100px] flex flex-col justify-center`}>
                      <CardContent className="p-5 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center shadow-md ${action.iconBgClass} ${action.iconColorClass} group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-6 transition-all duration-300`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex flex-col text-left">
                            <div className="flex items-center space-x-2">
                              <h4 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {action.title}
                              </h4>
                              {action.badge && (
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${action.badgeColor}`}>
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
                {action.link ? "" : ""}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── RECENT CAMPAIGNS ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-muted-foreground font-mono">
            Recent Campaigns
          </h2>

          <div className="flex items-center space-x-2 self-start sm:self-auto w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64 max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs border-slate-200 dark:border-border/30 bg-slate-50 dark:bg-card placeholder:text-slate-400"
              />
            </div>

            {/* Filter buttons */}
            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-border/30 bg-slate-50 dark:bg-card text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shadow-sm">
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-border/30 bg-slate-50 dark:bg-card text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shadow-sm">
              <Download className="h-3.5 w-3.5" />
            </button>

            {/* Add campaign */}
            <Link href="/dashboard/campaigns/create">
              <Button size="sm" className="font-semibold text-xs h-9 flex items-center space-x-1.5 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md shadow-purple-500/10">
                <Plus className="h-4 w-4" />
                <span>New Campaign</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Empty state illustration upgraded */}
        <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md py-14 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center text-center space-y-5">
            <div className="h-16 w-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-inner animate-pulse">
              <Inbox className="h-7 w-7" />
            </div>

            <div className="space-y-1.5 max-w-[320px]">
              <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                No campaigns yet
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                Create your first campaign to start engaging with your audience.
              </p>
            </div>

            <Link href="/dashboard/campaigns/create">
              <Button size="sm" className="font-bold text-xs h-10 px-5 flex items-center space-x-2 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg shadow-purple-500/15">
                <Plus className="h-4.5 w-4.5" />
                <span>Create Campaign</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>


      {/* ── ENGAGEMENT GRAPH ── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="space-y-4 pt-4"
      >
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-muted-foreground font-mono">
          Weekly Engagement
        </h2>
        
        <Card className="border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-card/40 backdrop-blur-md transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-purple-500" />
                  Opens vs Replies
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Campaign performance over the last 7 days</p>
              </div>
              <div className="flex items-center space-x-4 text-xs font-bold">
                <div className="flex items-center space-x-1.5">
                  <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                  <span className="text-slate-600 dark:text-slate-300">Opens</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-slate-600 dark:text-slate-300">Replies</span>
                </div>
              </div>
            </div>
            
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOpens" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorReplies" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.9)', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                    itemStyle={{ fontWeight: 800 }}
                  />
                  <Area type="monotone" dataKey="opens" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorOpens)" />
                  <Area type="monotone" dataKey="replies" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorReplies)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      

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
    </div>
  );
}
