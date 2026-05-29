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
import { LandingHeader } from "@/components/landing/landing-header";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
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

  const quickFeatures = [
    { icon: Target,        label: "Campaigns",       desc: "Launch & track outreach",   color: "text-blue-400"   },
    { icon: Flame,         label: "Warmup Engine",   desc: "Build domain reputation",   color: "text-amber-400"  },
    { icon: Sparkles,      label: "AI Assistant",    desc: "Generate email copy",        color: "text-pink-400"   },
    { icon: ShieldCheck,   label: "DNS Checker",     desc: "MX, SPF, DKIM, DMARC",      color: "text-emerald-400"},
    { icon: Layers,        label: "Templates",       desc: "54 proven templates",        color: "text-violet-400" },
    { icon: Globe,         label: "Integrations",    desc: "Pipedrive, Zapier & more",   color: "text-teal-400"   },
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

      {/* Modular Header */}
      <LandingHeader />

      {/* ═══ HERO — Redesigned ═══════════════════════════════════════════ */}
      <HeroSection />


      {/* ─────────────────────────────────────────────────────────────────────
           FEATURES GRID  —  Redesigned with hover glow + animated borders
      ───────────────────────────────────────────────────────────────────── */}
      <FeaturesSection />

      {/* ═══ HOW IT WORKS — Redesigned ══════════════════════════════════════ */}
      <HowItWorksSection />

      {/* ═══ INTEGRATIONS — Redesigned ═══════════════════════════════════════ */}
      <IntegrationsSection />

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
