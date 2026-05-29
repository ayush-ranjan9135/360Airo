"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, Mail, Percent, Send, ShieldAlert } from "lucide-react";

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

export function StatsOverview() {
  return (
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

                  <div className={`h-10 w-10 rounded-2xl flex items-center justify-center shadow-md ${stat.iconBgClass} ${stat.iconColorClass} transition-transform group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-6 transition-all duration-300`}>
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
  );
}
