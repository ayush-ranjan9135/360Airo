"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/lib/theme-context";
import { 
  Sparkles, 
  Send, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Zap, 
  Inbox,
  Lock,
  Menu,
  X,
  Mail,
  TrendingUp,
  LayoutDashboard,
  Target,
  Database,
  Calendar,
  Layers,
  Globe,
  Settings,
  BarChart2,
  FolderSync,
  Cpu,
  Trophy,
  FileText,
  ChevronDown,
  ExternalLink,
  Sun,
  Moon
} from "lucide-react";

export default function LandingPage() {
  const { isDark, toggle } = useTheme();
  const [emailInput, setEmailInput] = React.useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [featuresOpen, setFeaturesOpen] = React.useState(false);
  const [activeNav, setActiveNav] = React.useState("");
  const featuresRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const doc = document.documentElement;
      const progress = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (featuresRef.current && !featuresRef.current.contains(e.target as Node)) {
        setFeaturesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const quickFeatures = [
    { icon: Target,        label: "Campaigns",       desc: "Launch & track outreach",   color: "text-blue-400"   },
    { icon: Flame,         label: "Warmup Engine",   desc: "Build domain reputation",   color: "text-amber-400"  },
    { icon: Sparkles,      label: "AI Assistant",    desc: "Generate email copy",        color: "text-pink-400"   },
    { icon: ShieldCheck,   label: "DNS Checker",     desc: "MX, SPF, DKIM, DMARC",      color: "text-emerald-400"},
    { icon: Layers,        label: "Templates",       desc: "54 proven templates",        color: "text-violet-400" },
    { icon: Globe,         label: "Integrations",    desc: "Pipedrive, Zapier & more",   color: "text-teal-400"   },
  ];

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

  // Shorthand helpers for light/dark conditional classes
  const tx  = isDark ? "text-white"        : "text-slate-900";       // primary text
  const txs = isDark ? "text-slate-300"    : "text-slate-600";       // secondary text
  const txm = isDark ? "text-slate-400"    : "text-slate-500";       // muted text
  const txd = isDark ? "text-slate-500"    : "text-slate-400";       // dimmed text
  const bdr = isDark ? "border-white/8"    : "border-slate-200";     // standard border
  const bdrS= isDark ? "border-white/5"    : "border-slate-100";     // subtle border
  const bg  = isDark ? "bg-white/[0.03]"   : "bg-white";             // card bg
  const bgS = isDark ? "bg-white/[0.02]"   : "bg-slate-50";          // subtle bg
  const bgH = isDark ? "hover:bg-white/[0.05]" : "hover:bg-slate-100"; // hover bg

  return (
    <div className={`min-h-screen selection:bg-purple-500/30 overflow-x-hidden relative flex flex-col justify-between transition-colors duration-300 ${
      isDark ? "bg-[#0A0A0B] text-slate-100" : "bg-slate-50 text-slate-900"
    }`}>
      
      {/* Background radial highlights */}
      <div className={`absolute top-0 left-1/4 w-[60%] h-[40%] rounded-full blur-[140px] pointer-events-none ${
        isDark ? "bg-purple-600/[0.04]" : "bg-purple-600/[0.06]"
      }`} />
      <div className={`absolute top-[20%] right-1/4 w-[50%] h-[30%] rounded-full blur-[120px] pointer-events-none ${
        isDark ? "bg-blue-600/[0.03]" : "bg-blue-600/[0.04]"
      }`} />
      <div className={`absolute bottom-[10%] left-[10%] w-[40%] h-[30%] rounded-full blur-[120px] pointer-events-none ${
        isDark ? "bg-indigo-600/[0.03]" : "bg-indigo-600/[0.04]"
      }`} />

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 z-50 h-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 transition-all duration-150 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Sticky Header Nav */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? isDark
            ? "border-b border-white/8 bg-[#0A0A0B]/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            : "border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
          : "border-b border-transparent bg-transparent"
      }`}>

        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14" : "h-16"
        }`}>

          {/* ── LOGO ── */}
          <div className="flex items-center space-x-2.5">
            <div className={`flex shrink-0 items-center justify-center rounded-xl overflow-hidden transition-all duration-300 ${
              scrolled ? "h-8 w-8" : "h-9 w-9"
            }`}
              style={{ background: "linear-gradient(135deg, #1e1b2e 0%, #2d1f4e 100%)" }}
            >
              <Image src="/logo.png" alt="360Airo Logo" width={30} height={30} className="object-contain" />
            </div>
            <span className={`font-extrabold tracking-tight transition-all duration-300 ${
              scrolled ? "text-[15px]" : "text-base"
            } ${ isDark ? "text-white" : "text-slate-900" }`}>
              360Airo
            </span>
          </div>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden md:flex items-center space-x-1">

            {/* Features dropdown */}
            <div className="relative" ref={featuresRef}>
              <button
                onClick={() => setFeaturesOpen(!featuresOpen)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  featuresOpen
                    ? isDark ? "bg-white/10 text-white" : "bg-purple-50 text-purple-700 border border-purple-200"
                    : isDark
                      ? "text-slate-300 hover:text-white hover:bg-white/8"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent hover:border-slate-200"
                }`}
              >
                <span>Features</span>
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${
                  featuresOpen
                    ? isDark ? "rotate-180 text-purple-400" : "rotate-180 text-purple-600"
                    : ""
                }`} />
              </button>

              {/* Mega dropdown — fully theme-aware */}
              {featuresOpen && (
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[420px] rounded-2xl border backdrop-blur-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 z-50 ${
                  isDark
                    ? "border-white/10 bg-[#0E0E12]/95 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                    : "border-slate-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                }`}>
                  {/* Dropdown header */}
                  <div className={`px-5 pt-4 pb-3 border-b ${
                    isDark ? "border-white/5" : "border-slate-100"
                  }`}>
                    <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}>Platform Features</span>
                  </div>
                  {/* Feature grid */}
                  <div className={`grid grid-cols-2 gap-px p-2 ${
                    isDark ? "bg-white/[0.03]" : "bg-slate-50"
                  }`}>
                    {quickFeatures.map((f) => {
                      const Icon = f.icon;
                      return (
                        <a
                          key={f.label}
                          href="#features"
                          onClick={() => setFeaturesOpen(false)}
                          className={`flex items-center space-x-3 p-3 rounded-xl transition-colors group ${
                            isDark ? "hover:bg-white/5" : "hover:bg-slate-100"
                          }`}
                        >
                          <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isDark
                              ? "bg-white/5 border border-white/8 group-hover:border-white/15"
                              : "bg-slate-100 border border-slate-200 group-hover:border-slate-300 group-hover:bg-white"
                          }`}>
                            <Icon className={`h-4 w-4 ${
                              isDark ? f.color : f.color.replace("-400", "-600")
                            }`} />
                          </div>
                          <div className="min-w-0">
                            <span className={`text-xs font-bold block ${
                              isDark ? "text-white" : "text-slate-800"
                            }`}>{f.label}</span>
                            <span className={`text-[10px] truncate block ${
                              isDark ? "text-slate-500" : "text-slate-400"
                            }`}>{f.desc}</span>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                  {/* Dropdown footer CTA */}
                  <div className={`px-4 py-3 border-t flex items-center justify-between ${
                    isDark ? "border-white/5" : "border-slate-100"
                  }`}>
                    <span className={`text-[10px] font-mono ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}>16 features total</span>
                    <a href="#features" onClick={() => setFeaturesOpen(false)}
                      className={`flex items-center space-x-1 text-[10px] font-bold transition-colors ${
                        isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"
                      }`}>
                      <span>View all features</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Regular nav links */}
            {[
              { label: "Deliverability", href: "#deliverability" },
              { label: "Integrations",   href: "#pricing"        },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveNav(item.label)}
                className={`relative px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeNav === item.label
                    ? isDark
                      ? "text-white bg-white/10 border border-white/10"
                      : "text-purple-700 bg-purple-50 border border-purple-200"
                    : isDark
                      ? "text-slate-300 hover:text-white hover:bg-white/8 border border-transparent hover:border-white/10"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent hover:border-slate-200"
                }`}
              >
                {item.label}
                {activeNav === item.label && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" />
                )}
              </a>
            ))}

            {/* External link with icon */}
            <a
              href="https://app.360airo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 border border-transparent ${
                isDark
                  ? "text-slate-300 hover:text-white hover:bg-white/8 hover:border-white/10"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-200"
              }`}
            >
              <span>360Airo</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </nav>

          {/* ── ACTION BUTTONS ── */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Live status pill */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 mr-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-400 font-mono">99.4% uptime</span>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`relative h-8 w-8 flex items-center justify-center rounded-lg border transition-all duration-200 cursor-pointer group ${
                isDark
                  ? "border-white/10 bg-white/5 text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/10"
                  : "border-slate-300 bg-white text-slate-600 hover:border-indigo-400/40 hover:bg-indigo-50"
              }`}
            >
              <Sun className={`h-3.5 w-3.5 absolute transition-all duration-300 ${
                isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
              }`} />
              <Moon className={`h-3.5 w-3.5 absolute transition-all duration-300 ${
                isDark ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
              }`} />
            </button>

            <Link href="/auth">
              <button className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isDark ? "text-slate-300 hover:text-white hover:bg-white/5" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}>
                Sign In
              </button>
            </Link>

            <Link href="/auth">
              <button className="relative flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white cursor-pointer overflow-hidden group transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
              >
                {/* Shimmer sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                <Sparkles className="h-3.5 w-3.5 relative z-10" />
                <span className="relative z-10">Start Free Trial</span>
                <ArrowRight className="h-3.5 w-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </Link>
          </div>

          {/* ── MOBILE HAMBURGER ── */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden relative h-9 w-9 flex items-center justify-center rounded-lg border transition-all cursor-pointer ${
              isDark
                ? "border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/10"
                : "border-slate-300 bg-white text-slate-500 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-100"
            }`}
            aria-label="Toggle menu"
          >
            <span className={`absolute transition-all duration-200 ${
              mobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
            }`}><X className="h-4 w-4" /></span>
            <span className={`absolute transition-all duration-200 ${
              mobileMenuOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
            }`}><Menu className="h-4 w-4" /></span>
          </button>
        </div>

        {/* ── MOBILE DRAWER ── */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 ${
            isDark ? "border-white/5 bg-[#0A0A0B]/98" : "border-slate-200 bg-white/98"
          }`}>
            <div className="max-w-7xl mx-auto px-6 py-5 space-y-1">

              {/* Mobile nav links */}
              {[
                { label: "Features",      href: "#features",      icon: Layers      },
                { label: "Deliverability",href: "#deliverability", icon: ShieldCheck  },
                { label: "Integrations",  href: "#pricing",        icon: Globe        },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isDark ? "text-slate-300 hover:text-white hover:bg-white/5" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-slate-500" />
                    <span>{item.label}</span>
                  </a>
                );
              })}

              <a
                href="https://app.360airo.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isDark ? "text-slate-300 hover:text-white hover:bg-white/5" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <ExternalLink className="h-4 w-4 text-slate-500" />
                <span>Official 360Airo Site</span>
              </a>

              {/* Divider */}
              <div className={`h-px my-2 ${ isDark ? "bg-white/5" : "bg-slate-200" }`} />

              {/* Theme toggle row */}
              <button
                onClick={toggle}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isDark ? "text-slate-300 hover:text-white hover:bg-white/5" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {isDark ? (
                  <>
                    <Sun className="h-4 w-4 text-amber-400" />
                    <span>Switch to Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 text-indigo-500" />
                    <span>Switch to Dark Mode</span>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className={`h-px my-2 ${ isDark ? "bg-white/5" : "bg-slate-200" }`} />

              {/* Mobile CTA buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <button className={`w-full py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isDark ? "border-white/10 text-slate-300 hover:text-white hover:border-white/20" : "border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400"
                  }`}>
                    Sign In
                  </button>
                </Link>
                <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer flex items-center justify-center space-x-1.5"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Start Free Trial</span>
                  </button>
                </Link>
              </div>

              {/* Mobile status strip */}
              <div className="flex items-center justify-center space-x-4 pt-3 pb-1">
                <div className="flex items-center space-x-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className={`text-[10px] font-mono ${ isDark ? "text-slate-500" : "text-slate-400" }`}>99.4% deliverability</span>
                </div>
                <span className={isDark ? "text-slate-700" : "text-slate-300"}>·</span>
                <span className={`text-[10px] font-mono ${ isDark ? "text-slate-500" : "text-slate-400" }`}>5-min setup</span>
                <span className={isDark ? "text-slate-700" : "text-slate-300"}>·</span>
                <span className={`text-[10px] font-mono ${ isDark ? "text-slate-500" : "text-slate-400" }`}>No credit card</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ═══ HERO — Redesigned ═══════════════════════════════════════════ */}
      <section className="relative z-10 overflow-hidden">

        {/* — Background: dot-grid texture + deep radial glow — */}
        <div className={`absolute inset-0 hero-dot-grid pointer-events-none ${isDark ? "opacity-100" : "opacity-30"}`} />
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[120px] ${
            isDark ? "bg-purple-700/[0.12]" : "bg-purple-500/[0.08]"
          }`} />
          <div className={`absolute top-1/3 -right-40 w-[500px] h-[400px] rounded-full blur-[100px] ${
            isDark ? "bg-indigo-600/[0.08]" : "bg-indigo-400/[0.06]"
          }`} />
          <div className={`absolute bottom-0 -left-20 w-[400px] h-[300px] rounded-full blur-[90px] ${
            isDark ? "bg-blue-700/[0.06]" : "bg-blue-400/[0.05]"
          }`} />
        </div>

        {/* — Scrolling social-proof ticker — */}
        <div className={`border-b overflow-hidden ${isDark ? "border-white/[0.06] bg-white/[0.015]" : "border-slate-200 bg-slate-50/80"}`}>
          <div className="flex whitespace-nowrap py-2.5">
            <div className="ticker-track flex shrink-0 gap-0">
              {Array(2).fill([
                "🔥 Inbox placement 99.4%",
                "⚡ 5-minute setup",
                "📬 Smart warmup engine",
                "🛡️ SPF · DKIM · DMARC validated",
                "🤖 AI-personalized sequences",
                "📊 5.2× reply rate",
                "🔄 Inbox rotation built-in",
                "🔗 Pipedrive + Zapier live",
                "💬 18.4% average reply rate",
                "✅ No credit card required",
              ]).flat().map((item, i) => (
                <span key={i} className={`inline-flex items-center mx-6 text-[11px] font-semibold tracking-wide shrink-0 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  {item}
                  <span className={`mx-6 opacity-30 ${isDark ? "text-slate-600" : "text-slate-400"}`}>·</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* — Main hero grid — */}
        <div className="max-w-7xl mx-auto px-6 pt-14 md:pt-20 pb-14 grid md:grid-cols-[1fr_420px] lg:grid-cols-[1fr_480px] gap-10 md:gap-16 items-center">

          {/* LEFT — Copy */}
          <div className="space-y-8 text-left">

            {/* Label pill */}
            <div className="badge-pop inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-[11px] font-bold tracking-wider uppercase"
              style={{
                background: isDark ? "rgba(124,58,237,0.08)" : "rgba(124,58,237,0.06)",
                borderColor: isDark ? "rgba(124,58,237,0.25)" : "rgba(124,58,237,0.2)",
                color: isDark ? "#a78bfa" : "#7c3aed",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse shrink-0" />
              Globopersona · by 360Airo
            </div>

            {/* Headline — staggered word reveal */}
            <div className="space-y-1">
              <h1 className={`text-[2.6rem] sm:text-5xl md:text-[3.6rem] lg:text-[4rem] font-black leading-[1.05] tracking-[-0.03em] ${tx}`}>
                <span className="block overflow-hidden">
                  <span className="hero-word-in inline-block" style={{ animationDelay: "0ms" }}>
                    Your emails
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="hero-word-in inline-block" style={{ animationDelay: "90ms" }}>
                    deserve the{" "}
                  </span>
                  <span className="hero-word-in hero-glitch inline-block relative" style={{ animationDelay: "160ms" }}>
                    <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                      primary
                    </span>
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="hero-word-in inline-block" style={{ animationDelay: "240ms" }}>
                    inbox.
                  </span>
                  <span className="hero-cursor text-purple-500 ml-2" />
                </span>
              </h1>
            </div>

            {/* Sub-copy — more direct, less buzzword */}
            <p className={`hero-word-in text-base md:text-lg leading-[1.7] max-w-[440px] ${isDark ? "text-slate-300" : "text-slate-600"}`}
              style={{ animationDelay: "340ms" }}>
              Stop landing in spam. Globopersona rotates your senders, warms your domains, and writes your cold emails — so you focus on closing, not configuring.
            </p>

            {/* CTA row */}
            <div className="hero-word-in flex flex-col sm:flex-row gap-3 pt-1" style={{ animationDelay: "420ms" }}>
              <Link href="/auth">
                <button className="group relative flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/20"
                  style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 60%, #2563eb 100%)" }}>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Sparkles className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">Start for free</span>
                  <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              </Link>
              <a href="#deliverability">
                <button className={`flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.01] border ${
                  isDark
                    ? "border-white/10 text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/20"
                    : "border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-400"
                }`}>
                  See it live <BarChart2 className="h-4 w-4" />
                </button>
              </a>
            </div>

            {/* Trust signals row */}
            <div className="hero-word-in flex flex-wrap gap-x-6 gap-y-2 pt-2" style={{ animationDelay: "500ms" }}>
              {[
                { icon: ShieldCheck, label: "99.4% deliverability", color: "text-emerald-500" },
                { icon: Zap,         label: "5-min onboarding",     color: "text-amber-500"  },
                { icon: Lock,        label: "No credit card",       color: "text-sky-500"    },
                { icon: Users,       label: "2,400+ teams",         color: "text-violet-500" },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className={`flex items-center gap-1.5 text-[12px] font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  <Icon className={`h-3.5 w-3.5 ${color}`} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Live metrics panel */}
          <motion.div 
            className="relative hidden md:block"
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 50 }}
          >
            <TiltCard>
            {/* Breathing rings behind card */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="ring-breathe absolute h-[120%] w-[120%] rounded-3xl border border-purple-500/20" />
              <div className="ring-breathe absolute h-[140%] w-[140%] rounded-3xl border border-indigo-500/10" style={{ animationDelay: "1.5s" }} />
            </div>

            <div className={`relative rounded-2xl border overflow-hidden shadow-2xl ${
              isDark
                ? "border-white/10 bg-[#0D0D11]/90 shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
                : "border-slate-200 bg-white shadow-[0_32px_80px_rgba(0,0,0,0.12)]"
            }`}>

              {/* Scan line sweeping the panel */}
              <div className="hero-scan-line" />

              {/* Top bar */}
              <div className={`flex items-center justify-between px-4 py-3 border-b ${bdrS} ${isDark ? "bg-white/[0.025]" : "bg-slate-50"}`}>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  <span className={`text-[10px] font-mono ml-2 ${txd}`}>globopersona.outreach</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-wider">Live</span>
                </div>
              </div>

              <div className="p-4 space-y-4">

                {/* Big stat — inbox rate */}
                <div className={`rounded-xl p-4 border ${bdrS} ${isDark ? "bg-white/[0.03]" : "bg-slate-50"}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${txd}`}>Inbox Placement Today</span>
                    <span className="text-[10px] text-emerald-500 font-mono font-bold">↑ +0.4%</span>
                  </div>
                  <div className="flex items-end gap-3">
                    <span className="stat-rise text-3xl font-black font-mono text-emerald-500" style={{ animationDelay: "300ms" }}>99.2%</span>
                    <div className="flex-1 mb-1">
                      <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? "bg-white/5" : "bg-slate-200"}`}>
                        <div className="metric-bar-fill h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: "99%" }} />
                      </div>
                    </div>
                  </div>
                  {/* Mini chart */}
                  <div className="flex items-end gap-1 mt-3 h-10">
                    {[62,71,75,82,88,93,99].map((v, i) => (
                      <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-emerald-600/80 to-emerald-400/40 hover:from-emerald-500 transition-colors"
                        style={{ height: `${(v/100)*40}px` }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1">
                    {["M","T","W","T","F","S","S"].map((d, i) => (
                      <span key={i} className={`text-[8px] font-mono flex-1 text-center ${txd}`}>{d}</span>
                    ))}
                  </div>
                </div>

                {/* 3-metric row */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Reply rate",  value: "18.4%",  color: "text-amber-500",  sub: "5.2× avg"   },
                    { label: "Spam rate",   value: "0.3%",   color: "text-blue-500",   sub: "Safe zone"  },
                    { label: "Warmup/day",  value: "45",     color: "text-violet-500", sub: "3 accounts" },
                  ].map((m, i) => (
                    <div key={m.label} className={`rounded-lg p-3 border text-center ${bdrS} ${isDark ? "bg-white/[0.03]" : "bg-slate-50"}`}>
                      <span className={`stat-rise block text-lg font-black font-mono ${m.color}`} style={{ animationDelay: `${350 + i * 60}ms` }}>{m.value}</span>
                      <span className={`block text-[8px] font-mono mt-0.5 ${txd}`}>{m.label}</span>
                      <span className={`block text-[8px] font-bold mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{m.sub}</span>
                    </div>
                  ))}
                </div>

                {/* DNS health quick view */}
                <div className={`rounded-xl border ${bdrS} ${isDark ? "bg-white/[0.03]" : "bg-slate-50"} p-3 space-y-2`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-bold uppercase tracking-widest font-mono ${txd}`}>DNS Health</span>
                    <span className="text-[9px] text-emerald-500 font-mono font-bold">4/5 Passing</span>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { label: "MX",    ok: true  },
                      { label: "SPF",   ok: true  },
                      { label: "DKIM",  ok: true  },
                      { label: "DMARC", ok: true  },
                      { label: "CNAME", ok: false },
                    ].map((r) => (
                      <div key={r.label} className="flex items-center gap-2">
                        <span className={`h-4 w-4 rounded-full flex items-center justify-center text-[9px] shrink-0 font-bold ${
                          r.ok ? "bg-emerald-500/15 text-emerald-500" : "bg-amber-500/15 text-amber-500"
                        }`}>{r.ok ? "✓" : "!"}</span>
                        <span className={`text-[10px] font-mono font-bold ${txs}`}>{r.label}</span>
                        <div className={`flex-1 h-px ${isDark ? "bg-white/5" : "bg-slate-200"}`} />
                        <span className={`text-[9px] font-bold uppercase ${r.ok ? "text-emerald-500" : "text-amber-500"}`}>
                          {r.ok ? "OK" : "Fix"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live activity log */}
                <div className={`space-y-1.5 rounded-xl border ${bdrS} ${isDark ? "bg-white/[0.02]" : "bg-slate-50"} p-3`}>
                  <span className={`text-[9px] font-bold uppercase tracking-widest font-mono ${txd} block mb-2`}>Activity Log</span>
                  {[
                    { dot: "bg-emerald-500", time: "2m",  msg: "Warmup reply received · peer node" },
                    { dot: "bg-blue-500",    time: "8m",  msg: "SPF validated · globopersona.com"   },
                    { dot: "bg-purple-500",  time: "15m", msg: "Batch dispatched · 120 emails"       },
                  ].map((log, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${log.dot}`} />
                      <span className={`text-[8px] font-mono font-bold ${txd} shrink-0 w-5`}>{log.time}</span>
                      <span className={`text-[9px] font-mono ${isDark ? "text-slate-400" : "text-slate-500"} truncate`}>{log.msg}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom CTA strip */}
              <div className={`px-4 py-3 border-t ${bdrS} flex items-center justify-between`}>
                <span className={`text-[10px] font-mono ${txd}`}>No credit card · 5-min setup</span>
                <Link href="/auth">
                  <span className={`text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                    isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"
                  }`}>Get started <ArrowRight className="h-3 w-3" /></span>
                </Link>
              </div>
            </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* — Mobile email capture (below grid on small screens) — */}
        <div className="md:hidden max-w-7xl mx-auto px-6 pb-12">
          <div className="flex flex-col gap-2">
            <Input
              type="email"
              placeholder="Enter your work email..."
              className="h-11 text-sm"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <Link href="/auth">
              <Button variant="premium" className="w-full h-11 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer">
                <Sparkles className="h-4 w-4" />
                Start for free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* — Stats strip — */}
        <div id="deliverability" className={`border-t ${bdrS}`}>
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-3 md:grid-cols-6 gap-6">
            {[
              { val: "99.4%",  label: "Avg Deliverability",   color: "text-emerald-500" },
              { val: "5.2×",   label: "Reply Multiplier",      color: "text-amber-500"   },
              { val: "18.4%",  label: "Avg Reply Rate",        color: "text-blue-500"    },
              { val: "45/day", label: "Warmup Messages",       color: "text-violet-500"  },
              { val: "0.3%",   label: "Spam Rate",             color: "text-pink-500"    },
              { val: "5 min",  label: "Onboarding Time",       color: "text-teal-500"    },
            ].map((s, i) => (
              <div key={s.label} className="text-center stat-rise" style={{ animationDelay: `${i * 80}ms` }}>
                <span className={`block text-xl md:text-2xl font-black font-mono ${s.color}`}>{s.val}</span>
                <span className={`text-[10px] uppercase tracking-widest font-mono block mt-1 ${txd}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* — Full-width dashboard mockup — */}
        <div className="max-w-7xl mx-auto px-6 pb-16 pt-6">
          <div className="flex items-center justify-center mb-6 space-x-3">
            <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${isDark ? "to-white/10" : "to-slate-300"}`} />
            <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/8 text-[10px] font-mono uppercase tracking-wider px-3">
              ● Live Deliverability Monitor
            </Badge>
            <div className={`h-px flex-1 bg-gradient-to-l from-transparent ${isDark ? "to-white/10" : "to-slate-300"}`} />
          </div>

          <div className={`relative rounded-2xl border ${bdr} backdrop-blur-xl shadow-[0_0_80px_rgba(139,92,246,0.08)] overflow-hidden ${
            isDark ? "bg-[#0C0C0F]/80" : "bg-white"
          }`}>
            <div className={`flex items-center justify-between px-5 py-3 border-b ${bdrS} ${isDark ? "bg-white/[0.02]" : "bg-slate-50"}`}>
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/60" />
                <span className="h-3 w-3 rounded-full bg-amber-500/60" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
                <span className={`text-[11px] font-mono ml-3 ${txd}`}>outreach-cluster-3.globopersona.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-600 font-mono font-bold uppercase tracking-wider">Warmup Active</span>
              </div>
            </div>

            <div className="p-5 space-y-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Inbox Placement", value: "99.2%", sub: "+0.4% this week", color: "text-emerald-600", bar: "bg-emerald-500", pct: "99%", icon: "📥" },
                  { label: "Warmup Messages", value: "45/day", sub: "Across 3 mailboxes", color: "text-purple-600", bar: "bg-purple-500", pct: "70%", icon: "🔥" },
                  { label: "Spam Rate",       value: "0.3%",  sub: "Well below 1% limit", color: "text-blue-600",   bar: "bg-blue-500",   pct: "3%",  icon: "🛡️" },
                  { label: "Reply Rate",      value: "18.4%", sub: "5.2x industry avg",  color: "text-amber-600", bar: "bg-amber-500", pct: "74%", icon: "💬" },
                ].map((kpi) => (
                  <div key={kpi.label} className={`p-4 rounded-xl border ${bdrS} ${bgS} text-left space-y-2.5 transition-colors`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] uppercase font-mono tracking-wider ${txd}`}>{kpi.label}</span>
                      <span className="text-base">{kpi.icon}</span>
                    </div>
                    <span className={`text-xl font-black font-mono block ${kpi.color}`}>{kpi.value}</span>
                    <div className="space-y-1">
                      <div className={`w-full h-1 rounded-full overflow-hidden ${isDark ? "bg-white/5" : "bg-slate-200"}`}>
                        <div className={`${kpi.bar} h-full rounded-full`} style={{ width: kpi.pct }} />
                      </div>
                      <span className={`text-[9px] font-mono ${txd}`}>{kpi.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className={`rounded-xl border ${bdrS} ${bgS} p-4 space-y-3 text-left`}>
                  <div className={`flex items-center justify-between pb-2 border-b ${bdrS}`}>
                    <span className={`text-[10px] font-bold uppercase tracking-wider font-mono ${txd}`}>DNS Health Check</span>
                    <Badge variant="success" className="text-[9px] px-2 py-0.5">4/5 Passing</Badge>
                  </div>
                  <div className="space-y-2">
                    {[
                      { record: "MX Record",       desc: "Mail exchange routing",      ok: true  },
                      { record: "SPF",             desc: "Sender policy framework",    ok: true  },
                      { record: "DKIM",            desc: "DomainKeys identified mail", ok: true  },
                      { record: "DMARC",           desc: "Policy alignment",           ok: true  },
                      { record: "Custom Tracking", desc: "White-label CNAME",          ok: false },
                    ].map((item) => (
                      <div key={item.record} className="flex items-center justify-between py-1.5">
                        <div className="flex items-center space-x-2.5">
                          <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                            item.ok ? "bg-emerald-500/15 text-emerald-600" : "bg-amber-500/15 text-amber-600"
                          }`}>{item.ok ? "✓" : "!"}</div>
                          <div>
                            <span className={`text-[11px] font-bold block ${txs}`}>{item.record}</span>
                            <span className={`text-[9px] font-mono ${txd}`}>{item.desc}</span>
                          </div>
                        </div>
                        <span className={`text-[9px] font-bold uppercase tracking-wider ${
                          item.ok ? "text-emerald-600" : "text-amber-600"
                        }`}>{item.ok ? "Valid" : "Fix"}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`rounded-xl border ${bdrS} ${bgS} p-4 space-y-3 text-left`}>
                  <div className={`flex items-center justify-between pb-2 border-b ${bdrS}`}>
                    <span className={`text-[10px] font-bold uppercase tracking-wider font-mono ${txd}`}>7-Day Inbox Rate</span>
                    <span className="text-[10px] text-emerald-600 font-mono font-bold">↑ Trending up</span>
                  </div>
                  <div className="flex items-end justify-between gap-1.5 h-16 pt-2">
                    {[72,78,81,85,91,96,99].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full rounded-sm bg-gradient-to-t from-purple-600 to-indigo-400 opacity-80 hover:opacity-100 transition-opacity"
                          style={{ height: `${(val/100)*56}px` }} />
                        <span className={`text-[8px] font-mono ${txd}`}>{["M","T","W","T","F","S","S"][i]}</span>
                      </div>
                    ))}
                  </div>
                  <div className={`space-y-1.5 pt-1 border-t ${bdrS}`}>
                    {[
                      { time: "2m ago",  msg: "Warmup reply received from peer node",         dot: "bg-emerald-500" },
                      { time: "8m ago",  msg: "SPF record validated for globopersona.com",     dot: "bg-blue-500"   },
                      { time: "15m ago", msg: "Campaign batch dispatched — 120 emails",        dot: "bg-purple-500" },
                    ].map((log, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <span className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 ${log.dot}`} />
                        <span className={`text-[10px] font-mono leading-relaxed ${txd}`}>
                          <span className={txd}>{log.time} — </span>{log.msg}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`rounded-xl border ${bdrS} ${bgS} p-4 text-left`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider font-mono ${txd}`}>Connected Sender Accounts</span>
                  <span className={`text-[10px] font-mono ${txd}`}>3 active · 120 emails/day cap</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { email: "ayush@globopersona.com",    health: 99, warmup: true  },
                    { email: "outbound@globopersona.com", health: 94, warmup: true  },
                    { email: "sales@outboundsend.org",    health: 74, warmup: false },
                  ].map((acc) => (
                    <div key={acc.email} className={`flex items-center justify-between p-3 rounded-lg border ${bdrS} ${isDark ? "bg-white/[0.02]" : "bg-white"}`}>
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <div className={`h-7 w-7 rounded-lg border ${bdrS} flex items-center justify-center shrink-0 ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                          <Mail className={`h-3.5 w-3.5 ${txd}`} />
                        </div>
                        <div className="min-w-0">
                          <span className={`text-[10px] font-bold block truncate ${txs}`}>{acc.email}</span>
                          <div className="flex items-center space-x-1.5 mt-0.5">
                            {acc.warmup && <Flame className="h-2.5 w-2.5 text-amber-500" />}
                            <span className={`text-[9px] font-mono ${txd}`}>{acc.warmup ? "Warmup on" : "Warmup off"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <span className={`text-xs font-black font-mono ${
                          acc.health >= 95 ? "text-emerald-600" : acc.health >= 85 ? "text-blue-600" : "text-amber-600"
                        }`}>{acc.health}%</span>
                        <span className={`text-[8px] font-mono block ${txd}`}>health</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────────
           FEATURES GRID  —  Redesigned with hover glow + animated borders
      ───────────────────────────────────────────────────────────────────── */}
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

      {/* ═══ HOW IT WORKS — Redesigned ══════════════════════════════════════ */}
      <section className={`relative max-w-7xl mx-auto px-6 py-24 border-t ${bdrS} z-10 overflow-hidden`}>

        {/* Ambient background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-0 right-0 w-[500px] h-[400px] rounded-full blur-[130px] ${isDark ? "bg-blue-700/[0.07]" : "bg-blue-400/[0.05]"}`} />
          <div className={`absolute bottom-0 left-0 w-[500px] h-[300px] rounded-full blur-[120px] ${isDark ? "bg-purple-700/[0.06]" : "bg-purple-400/[0.05]"}`} />
        </div>

        {/* ── Heading ── */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-bold tracking-widest uppercase"
            style={{
              background: isDark ? "rgba(59,130,246,0.08)" : "rgba(59,130,246,0.06)",
              borderColor: isDark ? "rgba(59,130,246,0.25)" : "rgba(59,130,246,0.2)",
              color: isDark ? "#60a5fa" : "#2563eb",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            Workflow
          </div>
          <h2 className={`text-3xl md:text-4xl font-black tracking-tight leading-tight ${tx}`}>
            From zero to{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              primary inbox
            </span>{" "}
            in 5 steps
          </h2>
          <p className={`text-sm leading-relaxed max-w-lg mx-auto ${txm}`}>
            Get setup in 5 minutes and start scaling outreach with intelligent automation and proven deliverability.
          </p>
        </div>

        {/* ── Step timeline ── */}
        <div className="relative z-10 mb-20">
          {/* Continuous connector track (desktop only) */}
          <div className="hidden md:block absolute top-[51px] left-[8.33%] right-[8.33%] h-[2px] rounded-full pointer-events-none overflow-hidden"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.07)",
            }}
          >
            {/* Animated fill progress */}
            <motion.div 
              className="absolute inset-y-0 left-0 w-full origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              style={{
                background: "linear-gradient(90deg, rgba(139,92,246,0.8), rgba(59,130,246,0.9), rgba(6,182,212,0.9), rgba(20,184,166,0.8), rgba(16,185,129,0.8))",
              }}
            />
          </div>

          {/* Arrow-head that travels along the line */}
          <motion.div 
            className="hidden md:block absolute top-[44px] pointer-events-none"
            initial={{ left: "8.33%", opacity: 0 }}
            whileInView={{ left: "90%", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          >
            {/* Trail glow */}
            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-16 h-4 rounded-full blur-md"
              style={{ background: "rgba(99,102,241,0.5)" }}
            />
            {/* Arrow body */}
            <div className="relative flex items-center">
              <div className="w-8 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, transparent, #a78bfa)" }} />
              {/* Arrowhead SVG */}
              <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                <path d="M1 1L9 7L1 13" stroke="#c4b5fd" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-y-10 gap-x-4">
            {[
              { label: "Connect Accounts",  sub: "Add your email accounts and domains",      icon: Mail,       color: "from-violet-600 to-purple-600",   glow: "rgba(139,92,246,0.45)",  num: "bg-violet-500"  },
              { label: "Enable Warmup",     sub: "Activate smart domain reputation",          icon: Flame,      color: "from-indigo-600 to-blue-600",      glow: "rgba(99,102,241,0.45)",   num: "bg-indigo-500"  },
              { label: "Create Sequences",  sub: "Draft personalized multi-step campaigns",   icon: Sparkles,   color: "from-blue-600 to-cyan-500",        glow: "rgba(59,130,246,0.45)",   num: "bg-blue-500"    },
              { label: "Launch Campaign",   sub: "Auto-distribute across sender rotation",    icon: Send,       color: "from-cyan-600 to-teal-500",        glow: "rgba(6,182,212,0.45)",    num: "bg-cyan-500"    },
              { label: "Hit Primary Inbox", sub: "99.4% deliverability guaranteed",           icon: Inbox,      color: "from-teal-600 to-emerald-500",     glow: "rgba(20,184,166,0.45)",   num: "bg-teal-500"    },
              { label: "Track & Optimize",  sub: "Monitor opens, clicks, and replies",        icon: TrendingUp, color: "from-emerald-600 to-green-500",    glow: "rgba(16,185,129,0.45)",   num: "bg-emerald-500" },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={step.label} 
                  className="flex flex-col items-center group cursor-default"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.4 + 0.2, type: "spring", stiffness: 100 }}
                >
                  {/* Outer ring (pulses on hover) */}
                  <div className="relative">
                    {/* Pulsing outer glow ring */}
                    <div
                      className="absolute inset-[-6px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                      style={{ background: step.glow }}
                    />
                    {/* Number badge */}
                    <div className={`absolute -top-2 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-black text-white z-20 shadow-md ${step.num}`}>
                      {i + 1}
                    </div>
                    {/* Main icon circle */}
                    <div
                      className="relative h-[72px] w-[72px] rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:-translate-y-1 group-hover:rotate-6 transition-all duration-300 group-hover:-translate-y-1 shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${step.color.replace("from-", "").replace("to-", "").split(" ").map(c => `var(--tw-gradient-${c})`).join(",")}`,
                        boxShadow: `0 8px 32px ${step.glow}`,
                      }}
                    >
                      <div
                        className={`h-[72px] w-[72px] rounded-full flex items-center justify-center bg-gradient-to-br ${step.color}`}
                        style={{ boxShadow: `0 0 24px ${step.glow}` }}
                      >
                        <Icon className="h-7 w-7 text-white drop-shadow-sm" />
                      </div>
                    </div>
                  </div>
                  <h3 className={`font-bold text-xs md:text-sm text-center mt-4 transition-colors duration-200 ${tx}`}>
                    {step.label}
                  </h3>
                  <p className={`text-[10px] text-center mt-1 leading-snug max-w-[88px] ${txm}`}>
                    {step.sub}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Feature cards ── */}
        <div className="grid md:grid-cols-2 gap-4 relative z-10">
          {[
            { title: "Smart Account Rotation",       desc: "Distribute emails across connected accounts to stay under daily limits and maintain sender reputation.",                        icon: CheckCircle2, rgb: "139,92,246",  from: "from-violet-600", border: "border-violet-500/25" },
            { title: "Automatic Warmup Network",      desc: "Engage high-reputation warmup threads to build natural sending patterns and avoid spam filters.",                              icon: Flame,        rgb: "59,130,246",  from: "from-blue-600",   border: "border-blue-500/25"   },
            { title: "AI-Powered Personalization",    desc: "Generate context-aware copy from LinkedIn data. Merge {firstName}, {companyName} tokens dynamically.",                        icon: Sparkles,     rgb: "6,182,212",   from: "from-cyan-600",   border: "border-cyan-500/25"   },
            { title: "Intelligent Campaign Dispatch", desc: "Schedule emails with optimal send times, throttle delivery rates, and simulate natural peer warmups.",                        icon: Send,         rgb: "20,184,166",  from: "from-teal-600",   border: "border-teal-500/25"   },
            { title: "Primary Inbox Placement",       desc: "Achieve 99.4% deliverability rates to primary folders with real-time DNS validation and SPF/DKIM alignment.",                icon: Inbox,        rgb: "16,185,129",  from: "from-emerald-600",border: "border-emerald-500/25"},
            { title: "Real-Time Analytics",           desc: "Monitor opens, clicks, replies, and engagement metrics with contact-level timeline drawers and performance insights.",        icon: TrendingUp,   rgb: "132,204,22",  from: "from-lime-500",   border: "border-lime-500/25"   },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-0.5 cursor-default ${
                  isDark
                    ? `${card.border} bg-[#0d0d11] hover:border-white/15`
                    : `border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg`
                }`}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                {/* Animated left-edge accent bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${card.from} to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Top shimmer line on hover */}
                <div
                  className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, rgba(${card.rgb},0.7), transparent)` }}
                />

                {/* Inner glow on hover */}
                <div
                  className="absolute top-0 left-0 w-32 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `rgba(${card.rgb},0.12)` }}
                />

                <div className="relative p-5 flex gap-4 items-start">
                  {/* Icon */}
                  <div
                    className="h-11 w-11 flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:-translate-y-1 group-hover:rotate-6 transition-all duration-300 group-hover:-rotate-3"
                    style={{
                      background: `rgba(${card.rgb},0.12)`,
                      border: `1px solid rgba(${card.rgb},0.25)`,
                    }}
                  >
                    {/* Icon inner glow */}
                    <div
                      className="absolute h-11 w-11 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                      style={{ background: `rgba(${card.rgb},0.2)` }}
                    />
                    <Icon className="h-5 w-5 relative z-10" style={{ color: `rgb(${card.rgb})` }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-bold text-sm mb-1.5 transition-colors duration-200 ${tx} group-hover:text-[rgb(var(--card-rgb))]`}
                      style={{ ["--card-rgb" as string]: card.rgb } as React.CSSProperties}
                    >
                      {card.title}
                    </h4>
                    <p className={`text-xs leading-relaxed ${txm}`}>{card.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ INTEGRATIONS — Redesigned ═══════════════════════════════════════ */}
      <section id="pricing" className={`relative max-w-7xl mx-auto px-6 py-24 border-t ${bdrS} z-10 overflow-hidden`}>

        {/* Ambient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[140px] ${isDark ? "bg-teal-700/[0.06]" : "bg-teal-400/[0.05]"}`} />
          <div className={`absolute bottom-0 left-0 w-[400px] h-[250px] rounded-full blur-[120px] ${isDark ? "bg-emerald-700/[0.05]" : "bg-emerald-400/[0.04]"}`} />
          <div className={`absolute bottom-0 right-0 w-[400px] h-[250px] rounded-full blur-[120px] ${isDark ? "bg-blue-700/[0.05]" : "bg-blue-400/[0.04]"}`} />
        </div>

        {/* ── Heading ── */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-bold tracking-widest uppercase"
            style={{
              background: isDark ? "rgba(20,184,166,0.08)" : "rgba(20,184,166,0.06)",
              borderColor: isDark ? "rgba(20,184,166,0.3)" : "rgba(20,184,166,0.25)",
              color: isDark ? "#2dd4bf" : "#0d9488",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
            Integrations
          </div>
          <h2 className={`text-3xl md:text-4xl font-black tracking-tight leading-tight ${tx}`}>
            Connects with your{" "}
            <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
              entire stack
            </span>
          </h2>
          <p className={`text-sm leading-relaxed max-w-lg mx-auto ${txm}`}>
            Plug 360Airo into the tools you already use. Sync contacts, auto-create deals, and push events to 5,000+ apps.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 relative z-10">

          {/* ── LEFT COLUMN (3/5) ── */}
          <div className="lg:col-span-3 space-y-6">

            {/* Section label */}
            <div className="flex items-center gap-3">
              <span className={`h-px flex-1 ${isDark ? "bg-white/8" : "bg-slate-200"}`} />
              <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${txd}`}>Active Integrations</span>
              <span className={`h-px flex-1 ${isDark ? "bg-white/8" : "bg-slate-200"}`} />
            </div>

            {/* Active integration cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  name: "Pipedrive",
                  desc: "Auto-create deals on positive replies. Sync contacts and conversation history in real-time.",
                  abbr: "PD",
                  rgb: "16,185,129",
                  features: ["Deal auto-creation", "Contact sync", "Reply forwarding"],
                },
                {
                  name: "Zapier",
                  desc: "Push outbound events to 5,000+ apps. Trigger workflows on opens, clicks, and replies.",
                  abbr: "ZP",
                  rgb: "249,115,22",
                  features: ["5,000+ app triggers", "Event webhooks", "Custom workflows"],
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className={`group relative rounded-2xl p-[1px] transition-all duration-300 cursor-pointer`}
                >
                  {/* Gradient border on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(${item.rgb},0.5), transparent 70%)` }}
                  />
                  <div className={`relative rounded-2xl p-5 h-full transition-all duration-300 ${
                    isDark
                      ? "bg-[#0d0d11] border border-white/[0.08] group-hover:border-white/[0.16]"
                      : "bg-white border border-slate-200 group-hover:border-slate-300 group-hover:shadow-lg"
                  }`}>
                    {/* Top shine */}
                    <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"
                      style={{ background: `linear-gradient(90deg, transparent, rgba(${item.rgb},0.8), transparent)` }}
                    />
                    {/* Inner glow */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `rgba(${item.rgb},0.15)` }}
                    />
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {/* Icon badge */}
                        <div
                          className="h-11 w-11 rounded-xl flex items-center justify-center font-black text-sm font-mono transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:-translate-y-1 group-hover:rotate-6 transition-all duration-300 group-hover:-rotate-2"
                          style={{
                            background: `rgba(${item.rgb},0.12)`,
                            border: `1px solid rgba(${item.rgb},0.3)`,
                            color: `rgb(${item.rgb})`,
                          }}
                        >
                          {item.abbr}
                        </div>
                        <div>
                          <span className={`text-sm font-bold block transition-colors duration-200 group-hover:text-[rgb(${item.rgb})] ${tx}`}>{item.name}</span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Live</span>
                          </div>
                        </div>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-1 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className={`text-[11px] leading-relaxed mb-4 ${txm}`}>{item.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.features.map((f) => (
                        <span
                          key={f}
                          className="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider transition-all duration-200 group-hover:border-current"
                          style={{
                            background: `rgba(${item.rgb},0.08)`,
                            border: `1px solid rgba(${item.rgb},0.2)`,
                            color: `rgba(${item.rgb},0.9)`,
                          }}
                        >{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coming soon */}
            <div className="flex items-center gap-3">
              <span className={`h-px flex-1 ${isDark ? "bg-white/8" : "bg-slate-200"}`} />
              <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${txd}`}>Coming Soon</span>
              <span className={`h-px flex-1 ${isDark ? "bg-white/8" : "bg-slate-200"}`} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "HubSpot",    abbr: "HS", rgb: "249,115,22" },
                { name: "Salesforce", abbr: "SF", rgb: "59,130,246" },
                { name: "Zoho CRM",   abbr: "ZO", rgb: "239,68,68"  },
                { name: "Slack",      abbr: "SL", rgb: "139,92,246" },
              ].map((item) => (
                <div
                  key={item.name}
                  className={`relative group rounded-xl p-4 text-center overflow-hidden cursor-not-allowed transition-all duration-200 ${
                    isDark ? "bg-white/[0.02] border border-white/[0.06]" : "bg-slate-50 border border-slate-200"
                  }`}
                >
                  {/* Frosted coming-soon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px]">
                    <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      isDark ? "bg-white/8 text-slate-400 border border-white/10" : "bg-slate-200 text-slate-500 border border-slate-300"
                    }`}>Soon</span>
                  </div>
                  <div className="text-sm font-black font-mono mb-1 opacity-40" style={{ color: `rgb(${item.rgb})` }}>{item.abbr}</div>
                  <span className={`text-[10px] font-bold block opacity-40 ${txs}`}>{item.name}</span>
                </div>
              ))}
            </div>

            {/* Email providers */}
            <div className="flex items-center gap-3">
              <span className={`h-px flex-1 ${isDark ? "bg-white/8" : "bg-slate-200"}`} />
              <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${txd}`}>Email Providers</span>
              <span className={`h-px flex-1 ${isDark ? "bg-white/8" : "bg-slate-200"}`} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "Microsoft 365",    abbr: "M365", price: "$6/mo",    tag: "Recommended", rgb: "59,130,246"  },
                { name: "Google Workspace", abbr: "GWS",  price: "$6/mo",    tag: "Most Popular", rgb: "16,185,129" },
                { name: "GoDaddy Email",    abbr: "GDE",  price: "$3.99/mo", tag: "Best Value",   rgb: "249,115,22" },
              ].map((item) => (
                <div
                  key={item.name}
                  className={`group relative rounded-xl p-4 text-left overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-0.5 ${
                    isDark ? "bg-[#0d0d11] border border-white/[0.07] hover:border-white/[0.14]" : "bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  {/* Top glow edge */}
                  <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: `linear-gradient(90deg, transparent, rgba(${item.rgb},0.7), transparent)` }}
                  />
                  <div
                    className="h-9 w-9 rounded-lg flex items-center justify-center font-black text-[10px] font-mono mb-3 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:-translate-y-1 group-hover:rotate-6 transition-all duration-300"
                    style={{
                      background: `rgba(${item.rgb},0.1)`,
                      border: `1px solid rgba(${item.rgb},0.25)`,
                      color: `rgb(${item.rgb})`,
                    }}
                  >{item.abbr}</div>
                  <span className={`text-xs font-bold block ${tx}`}>{item.name}</span>
                  <span className={`text-[10px] font-mono block mt-0.5 ${txd}`}>{item.price}</span>
                  <span
                    className="text-[8px] font-bold px-2 py-0.5 mt-2 inline-block rounded-full uppercase tracking-wider border"
                    style={{
                      background: `rgba(${item.rgb},0.1)`,
                      borderColor: `rgba(${item.rgb},0.3)`,
                      color: `rgb(${item.rgb})`,
                    }}
                  >{item.tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN (2/5) ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Sync Capabilities card */}
            <div className={`group rounded-2xl border overflow-hidden transition-all duration-300 ${
              isDark ? "border-white/[0.08] bg-[#0d0d11] hover:border-teal-500/30" : "border-slate-200 bg-white hover:border-teal-300 hover:shadow-md"
            }`}>
              {/* Header */}
              <div className="flex items-center gap-3 p-5 border-b" style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0" }}>
                <div className="h-9 w-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Globe className="h-4 w-4 text-teal-500" />
                </div>
                <div>
                  <span className={`text-sm font-bold block ${tx}`}>Sync Capabilities</span>
                  <span className={`text-[10px] font-mono ${txd}`}>What flows in and out</span>
                </div>
              </div>
              {/* Flow rows */}
              <div className="p-5 space-y-2.5">
                {[
                  { label: "Interested contacts",    dest: "CRM",               rgb: "16,185,129"  },
                  { label: "Positive replies",        dest: "Deal creation",      rgb: "59,130,246"  },
                  { label: "Campaign events",         dest: "Zapier hooks",       rgb: "249,115,22"  },
                  { label: "Opens & clicks",          dest: "CRM timeline",       rgb: "139,92,246"  },
                  { label: "Unsubscribes",            dest: "Suppression list",   rgb: "244,63,94"   },
                ].map((row, i) => (
                  <div
                    key={row.label}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.01] cursor-default"
                    style={{
                      background: `rgba(${row.rgb},0.05)`,
                      border: `1px solid rgba(${row.rgb},0.12)`,
                      animationDelay: `${i * 100}ms`,
                    }}
                  >
                    <span className="text-[11px] font-semibold truncate flex-1" style={{ color: `rgb(${row.rgb})` }}>{row.label}</span>
                    {/* Animated arrow */}
                    <div className="flex items-center gap-1 shrink-0">
                      <div className="w-6 h-px rounded-full sync-arrow-line" style={{ background: `rgba(${row.rgb},0.5)` }} />
                      <svg width="6" height="8" viewBox="0 0 6 8" fill="none">
                        <path d="M1 1L5 4L1 7" stroke={`rgb(${row.rgb})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className={`text-[10px] font-bold shrink-0 ${txm}`}>{row.dest}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* REST API card */}
            <div className={`group rounded-2xl border overflow-hidden transition-all duration-300 ${
              isDark ? "border-white/[0.08] bg-[#0d0d11] hover:border-purple-500/30" : "border-slate-200 bg-white hover:border-purple-300 hover:shadow-md"
            }`}>
              <div className="flex items-center gap-3 p-5 border-b" style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0" }}>
                <div className="h-9 w-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Zap className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <span className={`text-sm font-bold block ${tx}`}>REST API Access</span>
                  <span className={`text-[10px] font-mono ${txd}`}>Build custom workflows</span>
                </div>
              </div>
              {/* Terminal block */}
              <div className="p-5 space-y-4">
                <div className={`rounded-xl p-4 font-mono text-[10px] space-y-2 relative overflow-hidden ${
                  isDark ? "bg-[#070709] border border-white/[0.06]" : "bg-slate-900 border border-slate-700"
                }`}>
                  {/* Terminal top dots */}
                  <div className="flex gap-1.5 mb-3">
                    <div className="h-2 w-2 rounded-full bg-rose-500/70" />
                    <div className="h-2 w-2 rounded-full bg-amber-500/70" />
                    <div className="h-2 w-2 rounded-full bg-emerald-500/70" />
                  </div>
                  {[
                    { method: "POST", path: "/api/v1/campaigns",     color: "text-blue-400"    },
                    { method: "GET",  path: "/api/v1/contacts",       color: "text-emerald-400" },
                    { method: "POST", path: "/api/v1/warmup/toggle",  color: "text-purple-400"  },
                    { method: "GET",  path: "/api/v1/analytics",      color: "text-amber-400"   },
                  ].map((line) => (
                    <div key={line.path} className="flex gap-2 items-center">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        line.method === "GET" ? "bg-emerald-500/15 text-emerald-400" : "bg-blue-500/15 text-blue-400"
                      }`}>{line.method}</span>
                      <span className={line.color}>{line.path}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-1 mt-2 pt-2 border-t border-white/5">
                    <span className="text-slate-500 text-[9px]">Bearer token auth · JSON responses</span>
                    <span className="terminal-cursor">▋</span>
                  </div>
                </div>
                <Link href="/auth">
                  <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-purple-400 border border-purple-500/20 bg-purple-500/8 hover:bg-purple-500/15 hover:border-purple-500/35 transition-all duration-200 cursor-pointer">
                    Get API Key <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Stats chips */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "5,000+", label: "Zapier Apps",      rgb: "20,184,166"  },
                { value: "4",      label: "CRM Platforms",    rgb: "59,130,246"  },
                { value: "3",      label: "Email Providers",  rgb: "139,92,246"  },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`group rounded-xl p-3 text-center transition-all duration-200 cursor-default hover:scale-105 ${
                    isDark ? "bg-[#0d0d11] border border-white/[0.07] hover:border-white/[0.14]" : "bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <span
                    className="text-lg font-black font-mono block bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, rgb(${s.rgb}), rgba(${s.rgb},0.6))` }}
                  >{s.value}</span>
                  <span className={`text-[8px] uppercase tracking-wider font-mono block mt-0.5 ${txd}`}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing Call to Action Section */}
      <section className={`relative z-10 border-t ${bdrS} overflow-hidden`}>
        {/* Ambient glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-purple-600/[0.06] rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] bg-indigo-600/[0.05] rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-blue-600/[0.04] rounded-full blur-[80px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 py-24 relative">
          {/* Main CTA card */}
          <motion.div 
          whileHover={{ y: -4, boxShadow: isDark ? "0 20px 40px -15px rgba(0,0,0,0.5)" : "0 25px 50px -12px rgba(0,0,0,0.15)" }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`relative rounded-3xl border ${bdr} backdrop-blur-xl overflow-hidden ${
            isDark ? "bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent" : "bg-white shadow-xl"
          }`}
        >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <div className="px-8 py-14 md:px-16 md:py-16">
              <motion.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.1 } }
                }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >

                {/* Left: copy */}
                <div className="space-y-6 text-left">
                  <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } } }}>
                    <Badge variant="outline" className="text-purple-600 border-purple-500/30 bg-purple-500/8 text-[10px] uppercase tracking-wider font-mono">✦ Start for free · No credit card</Badge>
                  </motion.div>
                  <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } } }} className="space-y-3">
                    <h2 className={`text-3xl md:text-4xl font-extrabold leading-tight tracking-tight ${tx}`}>
                      Ready to hit the
                      <span className="block bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent">primary inbox?</span>
                    </h2>
                    <p className={`text-sm leading-relaxed max-w-sm ${txm}`}>Set up warmup nodes in 5 minutes, launch AI-personalized sequences, and watch your reply rates climb.</p>
                  </motion.div>
                  <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } } }} className="flex flex-wrap gap-3">
                    {[
                      { icon: ShieldCheck, label: "99.4% deliverability", color: "text-emerald-600" },
                      { icon: Zap,         label: "5-min setup",          color: "text-amber-600"  },
                      { icon: Lock,        label: "No credit card",       color: "text-blue-600"   },
                    ].map(({ icon: Icon, label, color }) => (
                      <div key={label} className={`flex items-center space-x-1.5 text-[11px] font-semibold ${txm}`}>
                        <Icon className={`h-3.5 w-3.5 shrink-0 ${color}`} />
                        <span>{label}</span>
                      </div>
                    ))}
                  </motion.div>
                  <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } } }} className="flex flex-col sm:flex-row gap-3 pt-1">
                    <Link href="/auth">
                      <Button variant="premium" className="h-11 px-7 text-sm font-bold flex items-center gap-2 cursor-pointer w-full sm:w-auto">
                        <Sparkles className="h-4 w-4" />Get Started Free<ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <a href="https://app.360airo.com/" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className={`h-11 px-7 text-sm font-bold cursor-pointer w-full sm:w-auto ${
                        isDark ? "border-white/10 hover:border-white/20 text-slate-300 hover:text-white" : "border-slate-300 text-slate-600 hover:text-slate-900"
                      }`}>Explore 360Airo</Button>
                    </a>
                  </motion.div>
                </div>

                {/* Right: stats + checklist */}
                <div className="space-y-4">
                  <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } } }} className="grid grid-cols-3 gap-3">
                    {[
                      { value: "99.4%", label: "Avg Deliverability", color: "text-emerald-600" },
                      { value: "5.2x",  label: "Reply Multiplier",   color: "text-purple-600" },
                      { value: "5 min", label: "Setup Time",         color: "text-blue-600"   },
                    ].map((s) => (
                      <div key={s.label} className={`rounded-2xl border ${bdr} ${bgS} p-4 text-center`}>
                        <span className={`text-xl font-black font-mono block ${s.color}`}>{s.value}</span>
                        <span className={`text-[9px] uppercase tracking-wider font-mono block mt-1 leading-tight ${txd}`}>{s.label}</span>
                      </div>
                    ))}
                  </motion.div>
                  <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } } }} className={`rounded-2xl border ${bdr} ${bgS} p-5 space-y-3`}>
                    <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${txd}`}>What you get on day 1</span>
                    <div className="space-y-2.5">
                      {["AI-powered email sequence builder","Smart warmup engine for all mailboxes","Real-time DNS & deliverability checker","54 proven outreach templates","Pipedrive & Zapier integrations","Sales pipeline Kanban board"].map((item) => (
                        <div key={item} className="flex items-center space-x-2.5">
                          <div className="h-4 w-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
                          </div>
                          <span className={`text-[11px] font-medium ${txs}`}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } } }} whileHover={{ scale: 1.02 }} className={`flex items-center justify-between px-4 py-3 rounded-xl border ${bdrS} ${bgS} cursor-pointer`}>
                    <div className="flex -space-x-2">
                      {["A","B","C","D","E"].map((l, i) => (
                        <div key={i} className={`h-7 w-7 rounded-full border-2 flex items-center justify-center text-[9px] font-black text-white ${
                          isDark ? "border-[#0A0A0B]" : "border-white"
                        }`} style={{ background: ["#7c3aed","#2563eb","#059669","#d97706","#db2777"][i] }}>{l}</div>
                      ))}
                    </div>
                    <div className="text-right">
                      <span className={`text-[11px] font-bold block ${tx}`}>Join 2,400+ teams</span>
                      <span className={`text-[9px] font-mono ${txd}`}>already scaling outreach</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-8 text-xs font-mono ${
        isDark ? "border-white/5 bg-[#09090B] text-slate-500" : "border-slate-200 bg-slate-100 text-slate-400"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2.5">
            <div className="h-6 w-6 rounded-lg overflow-hidden flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #1e1b2e 0%, #2d1f4e 100%)" }}>
              <Image src="/logo.png" alt="360Airo Logo" width={20} height={20} className="object-contain" />
            </div>
            <span className={`font-bold font-sans text-xs ${tx}`}>360Airo</span>
          </div>
          <span>© 2026 360AIRO. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>

    </div>
  );
}
