"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-context";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Users, 
  BarChart2, 
  Mail, 
  Flame 
} from "lucide-react";

export function HeroSection() {
  const { isDark } = useTheme();
  const [emailInput, setEmailInput] = React.useState("");

  // Semantic color tokens
  const tx = isDark ? "text-white" : "text-slate-900";
  const txm = isDark ? "text-slate-400" : "text-slate-600";
  const txs = isDark ? "text-slate-300" : "text-slate-700";
  const txd = isDark ? "text-slate-500" : "text-slate-400";
  const bgS = isDark ? "bg-white/[0.02]" : "bg-slate-50";
  const bdr = isDark ? "border-white/10" : "border-slate-200";
  const bdrS = isDark ? "border-white/5" : "border-slate-100";

  return (
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
  );
}
