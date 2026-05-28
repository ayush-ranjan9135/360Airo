"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Inbox, Search, Filter, MessageSquare, Star, Archive, MoreHorizontal,
  RefreshCw, Send, CheckCircle2, AlertTriangle, TrendingUp, BarChart3, ChevronDown, Reply
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from "recharts";

const analyticsData = [
  { name: 'Mon', received: 145, replied: 82, bounced: 12 },
  { name: 'Tue', received: 210, replied: 130, bounced: 5 },
  { name: 'Wed', received: 180, replied: 105, bounced: 8 },
  { name: 'Thu', received: 250, replied: 160, bounced: 3 },
  { name: 'Fri', received: 290, replied: 195, bounced: 15 },
  { name: 'Sat', received: 90, replied: 45, bounced: 2 },
  { name: 'Sun', received: 110, replied: 60, bounced: 4 },
];

const messages = [
  {
    id: 1,
    sender: "Sarah Jenkins",
    company: "Acme Corp",
    subject: "Re: Operational efficiency at Acme Corp",
    snippet: "Hi Ayush, thanks for reaching out. Yes, we are currently evaluating our infrastructure and...",
    time: "10:42 AM",
    status: "unread",
    category: "Positive Reply",
    avatarColor: "bg-blue-500",
  },
  {
    id: 2,
    sender: "Michael Chang",
    company: "TechFlow Inc",
    subject: "Re: Migrating from Legacy Systems",
    snippet: "We might be interested next quarter. Can you send over some documentation regarding...",
    time: "09:15 AM",
    status: "read",
    category: "Interested",
    avatarColor: "bg-emerald-500",
  },
  {
    id: 3,
    sender: "Emily Roberts",
    company: "GlobalNet",
    subject: "Re: Resolving spam placement",
    snippet: "I'd love to see a demo of your diagnostic tool. Are you free tomorrow at 2 PM EST?",
    time: "Yesterday",
    status: "unread",
    category: "Demo Request",
    avatarColor: "bg-purple-500",
  },
  {
    id: 4,
    sender: "David Smith",
    company: "Pied Piper",
    subject: "Re: Private Pilot Request",
    snippet: "Please take me off your mailing list. We do not use external vendors for this.",
    time: "Yesterday",
    status: "read",
    category: "Opt-Out",
    avatarColor: "bg-rose-500",
  },
  {
    id: 5,
    sender: "Jessica Alba",
    company: "Honest Company",
    subject: "Re: Introduction via LinkedIn",
    snippet: "Thanks for the note! Let's connect next week when I'm back from the conference.",
    time: "Mar 12",
    status: "read",
    category: "Follow-Up",
    avatarColor: "bg-amber-500",
  },
  {
    id: 6,
    sender: "Robert Ford",
    company: "Delos Inc",
    subject: "Re: Strategic Disengagement",
    snippet: "We're not ready to move forward at this time. I will archive this thread.",
    time: "Mar 10",
    status: "read",
    category: "Archive",
    avatarColor: "bg-slate-500",
  },
  {
    id: 7,
    sender: "Erlich Bachman",
    company: "Aviato",
    subject: "Re: Value-Add Insights",
    snippet: "Please reach out to me again in Q3. We are currently fundraising.",
    time: "Mar 09",
    status: "read",
    category: "Follow-Up",
    avatarColor: "bg-indigo-500",
  }
];

export default function InboxPage() {
  const [activeTab, setActiveTab] = React.useState("Primary");
  
  const filteredMessages = messages.filter(msg => {
    if (activeTab === "Interested") return ["Interested", "Positive Reply", "Demo Request"].includes(msg.category);
    if (activeTab === "Follow-up") return msg.category === "Follow-Up";
    if (activeTab === "Archive") return msg.category === "Archive" || msg.category === "Opt-Out";
    // Primary tab (default)
    return !["Archive", "Opt-Out", "Follow-Up"].includes(msg.category);
  });
  
  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            Master Inbox 📥
          </h1>
          <p className="text-xs font-semibold text-muted-foreground mt-1">
            Manage replies, analyze engagement, and close deals directly.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" className="h-9 px-4 text-xs font-bold rounded-xl shadow-sm border-slate-200 dark:border-border/30 bg-white dark:bg-card">
            <RefreshCw className="h-3.5 w-3.5 mr-2" />
            Sync
          </Button>
          <Button className="h-9 px-4 text-xs font-bold rounded-xl shadow-md bg-purple-600 hover:bg-purple-700 text-white border-transparent cursor-pointer">
            <Send className="h-3.5 w-3.5 mr-2" />
            Compose
          </Button>
        </div>
      </div>

      {/* Analytics Section */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid gap-6 lg:grid-cols-3"
      >
        <Card className="lg:col-span-2 border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden relative transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
          <CardHeader className="pb-2 flex flex-row items-center justify-between border-b border-slate-100 dark:border-border/10">
            <div>
              <CardTitle className="text-sm font-extrabold flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-500" />
                Reply Analytics
              </CardTitle>
              <CardDescription className="text-[11px] font-semibold">Weekly engagement metrics</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-none font-bold text-[10px]">
              +14% vs last week
            </Badge>
          </CardHeader>
          <CardContent className="pt-6 pb-2">
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(139, 92, 246, 0.05)' }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.9)', color: '#fff', fontSize: '11px', fontWeight: '600' }}
                  />
                  <Bar dataKey="received" fill="#6366f1" radius={[4, 4, 0, 0]} name="Emails Received" />
                  <Bar dataKey="replied" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Replies Sent" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
           <CardHeader className="pb-2 border-b border-slate-100 dark:border-border/10">
            <CardTitle className="text-sm font-extrabold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              Inbox Health
            </CardTitle>
            <CardDescription className="text-[11px] font-semibold">Sentiment & Engagement</CardDescription>
          </CardHeader>
          <CardContent className="pt-5 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-800 dark:text-slate-100">Positive Replies</p>
                  <p className="text-[10px] text-muted-foreground font-semibold">High intent responses</p>
                </div>
              </div>
              <span className="text-sm font-black text-emerald-500">24%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-800 dark:text-slate-100">Info Requests</p>
                  <p className="text-[10px] text-muted-foreground font-semibold">Needs follow-up</p>
                </div>
              </div>
              <span className="text-sm font-black text-blue-500">42%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-800 dark:text-slate-100">Opt-Outs</p>
                  <p className="text-[10px] text-muted-foreground font-semibold">Unsubscribes</p>
                </div>
              </div>
              <span className="text-sm font-black text-amber-500">3%</span>
            </div>
            
            <div className="pt-2">
              <Button className="w-full text-xs font-bold h-9 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-xl shadow-none cursor-pointer">
                View Detailed Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Messages List */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-slate-100 dark:border-border/10 space-y-3 sm:space-y-0">
            <div className="flex space-x-2">
              {['Primary', 'Interested', 'Follow-up', 'Archive'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === tab 
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm" 
                      : "text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input 
                placeholder="Search messages..." 
                className="pl-9 h-9 text-xs rounded-xl border-slate-200 dark:border-border/30 bg-slate-50 dark:bg-card/50"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-border/10">
            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm font-semibold">
                No messages in this section.
              </div>
            ) : (
              filteredMessages.map((msg, idx) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className={`flex items-start p-4 transition-all duration-300 cursor-pointer group hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 hover:shadow-[inset_4px_0_0_rgba(99,102,241,1)] ${msg.status === 'unread' ? 'bg-purple-50/40 dark:bg-purple-900/10 shadow-[inset_3px_0_0_rgba(147,51,234,0.6)]' : ''}`}
              >
                <div className="shrink-0 mr-4 mt-1 relative">
                  {/* Unread indicator dot */}
                  {msg.status === 'unread' && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-purple-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse shadow-[0_0_8px_rgba(147,51,234,0.8)]" />
                  )}
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold shadow-inner group-hover:scale-105 transition-transform duration-300 ${msg.avatarColor}`}>
                    {msg.sender.charAt(0)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-extrabold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${msg.status === 'unread' ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                        {msg.sender}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-semibold group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                        {msg.company}
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold ${msg.status === 'unread' ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground'}`}>
                      {msg.time}
                    </span>
                  </div>
                  
                  <p className={`text-xs font-bold mb-1 truncate ${msg.status === 'unread' ? 'text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'}`}>
                    {msg.subject}
                  </p>
                  
                  <p className="text-xs text-muted-foreground truncate max-w-3xl font-medium group-hover:text-slate-500 dark:group-hover:text-slate-300 transition-colors">
                    {msg.snippet}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-2.5">
                    <Badge variant="outline" className={`text-[9px] font-bold px-2 py-0 border-none transition-all duration-300 ${
                      msg.category === 'Positive Reply' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/20' :
                      msg.category === 'Interested' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/20' :
                      msg.category === 'Demo Request' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500/20' :
                      msg.category === 'Opt-Out' || msg.category === 'Archive' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-500/20' :
                      'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300 group-hover:bg-slate-200 dark:group-hover:bg-white/20'
                    }`}>
                      {msg.category}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ml-4">
                   <button className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-white/20 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer" title="Reply">
                     <Reply className="h-4 w-4" />
                   </button>
                   <button className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-white/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer" title="Archive">
                     <Archive className="h-4 w-4" />
                   </button>
                </div>
              </motion.div>
            ))
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
