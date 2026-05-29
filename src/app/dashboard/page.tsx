"use client";

import * as React from "react";
import { useAuth } from "@/lib/auth-context";
import { RefreshCw, ChevronDown } from "lucide-react";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { QuickActionsGrid } from "@/components/dashboard/quick-actions";
import { RecentCampaigns } from "@/components/dashboard/recent-campaigns";
import { EngagementChart } from "@/components/dashboard/engagement-chart";
import { DashboardModals } from "@/components/dashboard/dashboard-modals";

export default function DashboardPage() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = React.useState("7");
  const [showAnalyticsModal, setShowAnalyticsModal] = React.useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = React.useState(false);

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

      <StatsOverview />

      <QuickActionsGrid 
        onShowAnalytics={() => setShowAnalyticsModal(true)} 
        onShowTemplates={() => setShowTemplatesModal(true)} 
      />

      <RecentCampaigns />

      <EngagementChart />

      <DashboardModals 
        showAnalyticsModal={showAnalyticsModal}
        setShowAnalyticsModal={setShowAnalyticsModal}
        showTemplatesModal={showTemplatesModal}
        setShowTemplatesModal={setShowTemplatesModal}
      />
    </div>
  );
}
