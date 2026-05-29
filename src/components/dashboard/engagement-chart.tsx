"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
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

export function EngagementChart() {
  return (
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
  );
}
