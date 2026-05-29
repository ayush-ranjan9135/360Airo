"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "@/lib/theme-context";
import { CheckCircle2, Globe, Zap, ArrowRight } from "lucide-react";

export function IntegrationsSection() {
  const { isDark } = useTheme();

  const tx = isDark ? "text-white" : "text-slate-900";
  const txs = isDark ? "text-slate-300" : "text-slate-600";
  const txm = isDark ? "text-slate-400" : "text-slate-500";
  const txd = isDark ? "text-slate-500" : "text-slate-400";
  const bdrS = isDark ? "border-white/5" : "border-slate-100";

  return (
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
  );
}
