"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Plus, Users, TrendingUp, Layers, Sparkles, FolderSync, ArrowRight } from "lucide-react";

interface QuickActionsGridProps {
  onShowAnalytics: () => void;
  onShowTemplates: () => void;
}

export function QuickActionsGrid({ onShowAnalytics, onShowTemplates }: QuickActionsGridProps) {
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
      onClick: onShowAnalytics,
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
      onClick: onShowTemplates,
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
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center shadow-md ${action.iconBgClass} ${action.iconColorClass} group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-6 transition-all duration-200`}>
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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
