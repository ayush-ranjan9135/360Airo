"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme-context";
import {
  Mail,
  Flame,
  Sparkles,
  Send,
  Inbox,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

export function HowItWorksSection() {
  const { isDark } = useTheme();

  const tx = isDark ? "text-white" : "text-slate-900";
  const txm = isDark ? "text-slate-400" : "text-slate-500";
  const bdrS = isDark ? "border-white/5" : "border-slate-100";

  return (
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
  );
}
