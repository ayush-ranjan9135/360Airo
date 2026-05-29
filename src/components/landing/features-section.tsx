"use client";

import * as React from "react";
import { useTheme } from "@/lib/theme-context";
import {
  LayoutDashboard,
  Target,
  Send,
  Sparkles,
  Flame,
  ShieldCheck,
  Database,
  Layers,
  Trophy,
  Calendar,
  Globe,
  FolderSync,
  Settings,
  Zap,
  Inbox,
  Users
} from "lucide-react";

const features = [
  {
    title: "Analytics Dashboard",
    desc: "Real-time performance overview with campaign stats, open rates, click rates, bounce rates, and quick-action shortcuts.",
    icon: LayoutDashboard,
    color: "text-indigo-400 bg-indigo-500/10",
  },
  {
    title: "Email Campaign Manager",
    desc: "Create, track, pause, and delete campaigns. Filter by status or type (manual vs AI). Grid and list view modes with bulk actions.",
    icon: Target,
    color: "text-blue-400 bg-blue-500/10",
  },
  {
    title: "Sequence Builder",
    desc: "4-step wizard: Details → Sequence → Audience → Schedule. Multi-step email editor with delay controls and live Gmail-style preview.",
    icon: Send,
    color: "text-purple-400 bg-purple-500/10",
  },
  {
    title: "AI Outreach Assistant",
    desc: "Generate context-aware cold email copy, icebreakers, and follow-ups from a prompt. Merge tokens like {{firstName}} and {{companyName}} dynamically.",
    icon: Sparkles,
    color: "text-pink-400 bg-pink-500/10",
  },
  {
    title: "Smart Warmup Engine",
    desc: "Toggle warmup per mailbox. Automatically trade messages inside a high-reputation network to build healthy domain behavior and inbox placement.",
    icon: Flame,
    color: "text-amber-400 bg-amber-500/10",
  },
  {
    title: "DNS Verification Checker",
    desc: "Real-time MX, SPF, DKIM, DMARC, and custom tracking domain validation per connected mailbox with fix guidance.",
    icon: ShieldCheck,
    color: "text-emerald-400 bg-emerald-500/10",
  },
  {
    title: "Email Lists & Contacts",
    desc: "Upload CSV/XLSX contact lists, manage master contact database with 13-column table, advanced filters, and unsubscribe tracking.",
    icon: Database,
    color: "text-cyan-400 bg-cyan-500/10",
  },
  {
    title: "Template Library",
    desc: "54 ready-to-use templates (34 email + 20 LinkedIn) across 13 categories and 7 tones. Copy, preview, and filter by open/reply rates.",
    icon: Layers,
    color: "text-violet-400 bg-violet-500/10",
  },
  {
    title: "Sales Pipeline (Kanban)",
    desc: "Drag-and-drop prospect board across Contact → Interested → Meeting → Closed stages. Track pipeline value and win rate.",
    icon: Trophy,
    color: "text-orange-400 bg-orange-500/10",
  },
  {
    title: "Scheduled Events Calendar",
    desc: "Month/week/day/agenda calendar views for all scheduled LinkedIn and email campaign events with status tracking.",
    icon: Calendar,
    color: "text-rose-400 bg-rose-500/10",
  },
  {
    title: "CRM Integrations",
    desc: "3-step wizard to connect Pipedrive (active), HubSpot, Salesforce, and Zoho CRM. Auto deal creation and contact sync on positive replies.",
    icon: Globe,
    color: "text-teal-400 bg-teal-500/10",
  },
  {
    title: "Mailbox Management",
    desc: "Connect SMTP/IMAP accounts, set daily send caps, monitor utilization, and access professional email plans (Microsoft 365, Google Workspace, GoDaddy).",
    icon: FolderSync,
    color: "text-sky-400 bg-sky-500/10",
  },
  {
    title: "API Keys & Settings",
    desc: "Generate and revoke API tokens, configure workspace quotas, manage notification preferences, and toggle CRM integrations (HubSpot, Salesforce, Zapier).",
    icon: Settings,
    color: "text-slate-400 bg-slate-500/10",
  },
  {
    title: "Command Bar",
    desc: "Raycast-style Ctrl+K overlay for instant page navigation and actions across the entire platform.",
    icon: Zap,
    color: "text-yellow-400 bg-yellow-500/10",
  },
  {
    title: "Inbox Rotation",
    desc: "Distribute outreach volume across multiple sender addresses to stay under daily provider limits and protect domain reputation.",
    icon: Inbox,
    color: "text-lime-400 bg-lime-500/10",
  },
  {
    title: "LinkedIn Outreach (Premium)",
    desc: "Automate LinkedIn connection requests, profile visits, and messages. 20 ready-made LinkedIn templates across all outreach categories.",
    icon: Users,
    color: "text-blue-300 bg-blue-400/10",
  },
];

export function FeaturesSection() {
  const { isDark } = useTheme();

  // Semantic color tokens
  const tx = isDark ? "text-white" : "text-slate-900";
  const txm = isDark ? "text-slate-400" : "text-slate-600";
  const bdrS = isDark ? "border-white/5" : "border-slate-100";

  return (
    <section id="features" className={`relative max-w-7xl mx-auto px-6 py-24 border-t ${bdrS} z-10 overflow-hidden`}>

      {/* Section ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 left-1/3 w-[600px] h-[300px] rounded-full blur-[120px] ${isDark ? "bg-purple-700/[0.07]" : "bg-purple-400/[0.06]"}`} />
        <div className={`absolute bottom-0 right-1/3 w-[500px] h-[260px] rounded-full blur-[100px] ${isDark ? "bg-blue-700/[0.06]" : "bg-blue-400/[0.05]"}`} />
      </div>

      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-bold tracking-widest uppercase"
          style={{
            background: isDark ? "rgba(124,58,237,0.08)" : "rgba(124,58,237,0.06)",
            borderColor: isDark ? "rgba(124,58,237,0.25)" : "rgba(124,58,237,0.2)",
            color: isDark ? "#a78bfa" : "#7c3aed",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
          Platform Highlights
        </div>
        <h2 className={`text-3xl md:text-4xl font-black tracking-tight leading-tight ${tx}`}>
          Everything you need to{" "}
          <span className="bg-gradient-to-r from-violet-500 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
            scale outreach
          </span>
        </h2>
        <p className={`text-sm leading-relaxed max-w-lg mx-auto ${txm}`}>
          From AI-powered sequences and warmup engines to Kanban pipelines, template libraries,
          and CRM integrations — all in one platform.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
        {features.map((item, idx) => {
          const Icon = item.icon;
          // extract the base color token (e.g. "indigo", "blue" …)
          const colorToken = item.color.split("-")[1];
          // map to rgba glow values for the hover radial
          const glowMap: Record<string, string> = {
            indigo:  "99,102,241",
            blue:    "59,130,246",
            purple:  "168,85,247",
            pink:    "236,72,153",
            amber:   "245,158,11",
            emerald: "16,185,129",
            cyan:    "6,182,212",
            violet:  "139,92,246",
            orange:  "249,115,22",
            rose:    "244,63,94",
            teal:    "20,184,166",
            sky:     "14,165,233",
            slate:   "148,163,184",
            yellow:  "234,179,8",
            lime:    "132,204,22",
          };
          const rgb = glowMap[colorToken] ?? "139,92,246";

          return (
            <div
              key={idx}
              className="feature-card group relative rounded-2xl p-[1px] cursor-pointer"
              style={{
                animationDelay: `${idx * 55}ms`,
                // CSS vars for the per-card hover glow colour
                ["--glow-rgb" as string]: rgb,
              }}
            >
              {/* Animated gradient border */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, rgba(${rgb},0.6) 0%, transparent 65%)`,
                  zIndex: 0,
                }}
              />

              {/* Card surface */}
              <div
                className={`relative rounded-2xl p-5 h-full flex flex-col gap-4 overflow-hidden transition-transform duration-300 group-hover:-translate-y-1 ${
                  isDark
                    ? "bg-[#0f0f13] border border-white/[0.07] group-hover:border-white/[0.14]"
                    : "bg-white border border-slate-200 group-hover:border-slate-300 shadow-sm group-hover:shadow-lg"
                }`}
                style={{
                  boxShadow: undefined,
                }}
              >
                {/* Top shine sweep on hover */}
                <span
                  className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, rgba(${rgb},0.8) 50%, transparent 100%)`,
                  }}
                />

                {/* Radial glow inside card on hover */}
                <div
                  className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
                  style={{ background: `rgba(${rgb},0.18)` }}
                />

                {/* Icon */}
                <div
                  className={`relative h-11 w-11 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:-translate-y-1 group-hover:rotate-6 transition-all duration-300 group-hover:-rotate-3 ${item.color}`}
                  style={{
                    boxShadow: `0 0 0 0 rgba(${rgb},0)`,
                  }}
                >
                  {/* Icon glow ring on hover */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                    style={{ background: `rgba(${rgb},0.25)` }}
                  />
                  <Icon className="h-5 w-5 relative z-10" />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className={`font-bold text-sm leading-snug transition-colors duration-200 group-hover:text-[rgb(${rgb})] ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${txm}`}>
                    {item.desc}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 inset-x-0 h-[2px] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-x-0 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, transparent, rgba(${rgb},0.7), transparent)` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
