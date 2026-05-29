"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, Download, Plus, Inbox } from "lucide-react";

export function RecentCampaigns() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
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
  );
}
