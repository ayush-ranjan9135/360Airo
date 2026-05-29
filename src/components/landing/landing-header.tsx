"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/lib/theme-context";
import {
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  Sun,
  Moon,
  Target,
  Flame,
  Sparkles,
  ShieldCheck,
  Layers,
  Globe,
  ArrowRight
} from "lucide-react";

export function LandingHeader() {
  const { isDark, toggle } = useTheme();
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

  return (
    <>
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
    </>
  );
}
