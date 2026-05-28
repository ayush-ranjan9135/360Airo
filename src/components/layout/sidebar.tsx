"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FolderSync,
  Mail,
  Flame,
  Sparkles,
  Inbox,
  Calendar,
  Layers,
  TrendingUp,
  Globe,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ChevronDown,
  Building,
  User as UserIcon,
  Sun,
  Moon,
  Crown,
  Rocket,
  Lock,
  X,
  Settings,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useTheme } from "@/lib/theme-context";
import { motion, AnimatePresence, type Variants } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */
interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Static menu definition  (defined OUTSIDE component — no stale closure bugs)
───────────────────────────────────────────────────────────────────────────── */
const MENU_ITEMS = [
  { name: "Dashboard",       href: "/dashboard",              icon: LayoutDashboard, isPremium: false },
  { name: "Email Lists",     href: "/dashboard/prospects",    icon: Users,           isPremium: false },
  { name: "Email Accounts",  href: "/dashboard/mailboxes",    icon: FolderSync,      isPremium: false },
  { name: "Email Campaign",  href: "/dashboard/campaigns",    icon: Mail,            isPremium: false },
  { name: "Email Warmup",    href: "/dashboard/warmup",       icon: Flame,           isPremium: true  },
  { name: "AI Automation",   href: "/dashboard/ai",          icon: Sparkles,        isPremium: true  },
  { name: "LinkedIn",        href: "/dashboard/linkedin",     icon: FaLinkedin,      isPremium: true  },
  { name: "Inbox",           href: "/dashboard/inbox",        icon: Inbox,           isPremium: false },
  { name: "Scheduled Event", href: "/dashboard/events",       icon: Calendar,        isPremium: false },
  { name: "Template Library",href: "/dashboard/templates",    icon: Layers,          isPremium: false },
  { name: "Pipeline",        href: "/dashboard/pipeline",     icon: TrendingUp,      isPremium: false },
  { name: "Integrations",    href: "/dashboard/integrations", icon: Globe,           isPremium: false },
  { name: "Settings",        href: "/dashboard/settings",     icon: Settings,        isPremium: false },
] as const;

type MenuName = (typeof MENU_ITEMS)[number]["name"];

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { isDark, toggle, t, TS } = useTheme();

  /* ── single source of truth for active item ── */
  const [activeItem, setActiveItem] = React.useState<MenuName>("Dashboard");

  const [showWorkspaceMenu, setShowWorkspaceMenu] = React.useState(false);
  const [premiumModalOpen, setPremiumModalOpen] = React.useState(false);
  const [premiumFeature, setPremiumFeature] = React.useState<{
    title: string;
    desc: string;
  } | null>(null);

  /* ── resizable sidebar ── */
  const [width, setWidth] = React.useState(256);
  const [isResizing, setIsResizing] = React.useState(false);

  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  React.useEffect(() => {
    if (!isResizing) return;
    const onMove = (e: MouseEvent) =>
      setWidth(Math.max(180, Math.min(480, e.clientX)));
    const onUp = () => setIsResizing(false);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [isResizing]);

  /* ── sync active item with URL — ONLY for non-premium, unique-href items ── */
  React.useEffect(() => {
    const matched = MENU_ITEMS.find(
      (item) => !item.isPremium && item.href === pathname
    );
    if (matched) setActiveItem(matched.name);
  }, [pathname]);

  /* ── premium modal helpers ── */
  const PREMIUM_DESC: Record<string, string> = {
    "Email Warmup":
      "Automatically warm up your email accounts to build a strong sender reputation and significantly improve your email deliverability rates.",
    "AI Automation":
      "Supercharge your outreach sequences with context-aware, personalized email copywriting and scheduling, fully automated with AI.",
    LinkedIn:
      "Engage prospects across multiple touchpoints by combining email outreach with automated LinkedIn connections, visits, and messages.",
  };

  const handlePremiumClick = React.useCallback((name: string) => {
    setPremiumFeature({
      title: name,
      desc:
        PREMIUM_DESC[name] ??
        "Unlock advanced functionality to supercharge your email outbound workflow.",
    });
    setPremiumModalOpen(true);
  }, []);

  /* ── handle item click — strict single-select ── */
  const handleItemClick = React.useCallback(
    (e: React.MouseEvent, item: (typeof MENU_ITEMS)[number]) => {
      e.stopPropagation(); // prevent event from bubbling to any parent
      if (item.isPremium) {
        e.preventDefault();
        handlePremiumClick(item.name);
        // do NOT setActiveItem for premium items
        return;
      }
      setActiveItem(item.name);
    },
    [handlePremiumClick]
  );

  /* ── animation variants ── */
  const navVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -14 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 320, damping: 28 } },
  };

  return (
    <TooltipProvider>
      <aside
        style={{
          width: isCollapsed ? "64px" : `${width}px`,
          transition: isResizing ? "none" : TS,
          /* scope resize cursor to this element only */
          cursor: isResizing ? "ew-resize" : undefined,
        }}
        className={cn(
          "relative flex flex-col h-screen border-r border-slate-200 dark:border-border/20",
          "bg-slate-50 dark:bg-[#0C0C0E] text-slate-700 dark:text-slate-300",
          "shrink-0 z-30 select-none overflow-hidden"
        )}
      >
        {/* ── Resize Handle ── */}
        {!isCollapsed && (
          <div
            onMouseDown={handleMouseDown}
            className="absolute top-0 right-0 w-[4px] h-full cursor-ew-resize hover:bg-purple-500/40 active:bg-purple-500 transition-all z-50 group"
          >
            <div className="h-10 w-[2px] bg-slate-300/30 group-hover:bg-purple-500 rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition-colors" />
          </div>
        )}

        {/* ── Collapse Toggle ── */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ transition: TS }}
          className="absolute right-[-12px] top-10 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 dark:border-border/20 bg-white dark:bg-[#0C0C0E] hover:bg-slate-100 dark:hover:bg-[#151518] hover:text-slate-900 dark:hover:text-white transition-all text-muted-foreground shadow-sm cursor-pointer z-40"
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </motion.button>

        {/* ── Logo / Workspace ── */}
        <div
          style={{ borderColor: t.divider, transition: TS }}
          className="p-4 border-b"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.08, rotate: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg transition-all duration-300",
                  isDark
                    ? "bg-slate-800/60 border border-slate-700/50"
                    : "bg-slate-100 border border-slate-200/50"
                )}
              >
                <Image
                  src="/logo.png"
                  alt="360Airo Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </motion.div>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="flex flex-col text-left leading-tight"
                >
                  <span
                    style={{ color: t.text, transition: TS }}
                    className="font-bold text-sm truncate"
                  >
                    360Airo
                  </span>
                  <span
                    style={{ color: t.textMuted, transition: TS }}
                    className="text-[10px] font-mono flex items-center"
                  >
                    <Building className="h-2.5 w-2.5 mr-1" /> Team plan
                  </span>
                </motion.div>
              )}
            </div>
            {!isCollapsed && (
              <motion.button
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
                className="p-1 hover:bg-slate-200/50 dark:hover:bg-white/5 rounded-md text-muted-foreground hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.button>
            )}
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 p-3 mt-2 overflow-y-auto overflow-x-hidden space-y-0.5">
          <motion.ul
            variants={navVariants}
            initial="hidden"
            animate="show"
            className="space-y-0.5 list-none m-0 p-0"
          >
            {MENU_ITEMS.map((item) => {
              const isActive = activeItem === item.name;
              const Icon = item.icon;

              const linkContent = (
                <motion.div
                  variants={itemVariants}
                  key={item.name}
                  className="relative origin-left"
                  whileHover={{ x: 4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                >
                  <Link
                    href={item.isPremium ? "#" : item.href}
                    onClick={(e) => handleItemClick(e, item)}
                    className={cn(
                      "relative flex items-center rounded-xl text-[13px] font-bold tracking-tight",
                      isCollapsed ? "justify-center py-3 px-0 w-10 h-10 mx-auto" : "justify-between px-3 py-3 w-full",
                      "transition-all duration-300 group hover:shadow-[0_0_15px_rgba(124,58,237,0.05)]",
                      isActive
                        ? isDark
                          ? "text-white"
                          : "text-indigo-900"
                        : isDark
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/50"
                    )}
                  >
                    {/* ── Active background pill (Framer layoutId) ── */}
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active-pill"
                        className={cn(
                          "absolute inset-0 rounded-xl pointer-events-none z-0 shadow-sm",
                          isDark
                            ? "bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-transparent"
                            : "bg-gradient-to-r from-indigo-50 via-purple-50/50 to-white"
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* ── Left accent bar ── */}
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active-bar"
                        className={cn(
                          "absolute left-0 top-[15%] bottom-[15%] w-[4px] rounded-r-full pointer-events-none z-10 shadow-[0_0_10px_rgba(79,70,229,0.5)]",
                          isDark ? "bg-indigo-500" : "bg-indigo-600"
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* ── Hover shimmer (non-active only) ── */}
                    {!isActive && (
                      <span
                        className={cn(
                          "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-0",
                          isDark ? "bg-white/[0.04]" : "bg-slate-200/50"
                        )}
                      />
                    )}

                    {/* ── Icon + Label ── */}
                    <div className={cn("flex items-center truncate relative z-10 min-w-0", !isCollapsed && "space-x-3")}>
                      <motion.span
                        animate={
                          isActive
                            ? { scale: 1.15, rotate: 0 }
                            : { scale: 1, rotate: 0 }
                        }
                        whileHover={!isActive ? { scale: 1.1 } : {}}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                        className="shrink-0"
                      >
                        <Icon
                          className={cn(
                            "h-4 w-4 transition-colors duration-200",
                            isActive
                              ? isDark
                                ? "text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]"
                                : "text-indigo-600"
                              : isDark
                              ? "text-slate-500 group-hover:text-indigo-400"
                              : "text-slate-400 group-hover:text-indigo-600"
                          )}
                        />
                      </motion.span>
                      {!isCollapsed && (
                        <span
                          className={cn(
                            "truncate transition-all duration-200",
                            isActive ? "font-bold" : "font-medium"
                          )}
                        >
                          {item.name}
                        </span>
                      )}
                    </div>

                    {/* ── Premium crown badge ── */}
                    {!isCollapsed && item.isPremium && (
                      <motion.span
                        whileHover={{ scale: 1.2, rotate: -10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="relative z-10 shrink-0 ml-1"
                      >
                        <Crown className="h-3 w-3 text-amber-500 fill-amber-500/20" />
                      </motion.span>
                    )}
                  </Link>
                </motion.div>
              );

              /* collapsed → show tooltip */
              if (isCollapsed) {
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="flex items-center gap-1.5 font-bold text-xs"
                    >
                      {item.name}
                      {item.isPremium && (
                        <Crown className="h-3 w-3 text-amber-500" />
                      )}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return <React.Fragment key={item.name}>{linkContent}</React.Fragment>;
            })}
          </motion.ul>
        </nav>

        {/* ── Upgrade Box ── */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 280, damping: 26 }}
            className="mx-3 my-3 p-4 rounded-xl border border-slate-200 dark:border-border/10 bg-slate-100/50 dark:bg-white/[0.02] space-y-3.5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-2.5">
                <motion.div
                  whileHover={{ scale: 1.12, rotate: -6 }}
                  transition={{ type: "spring", stiffness: 380 }}
                  className="h-7 w-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400"
                >
                  <Rocket className="h-4 w-4" />
                </motion.div>
                <div className="flex flex-col text-left leading-tight">
                  <span
                    style={{ color: t.text, transition: TS }}
                    className="font-extrabold text-xs"
                  >
                    Free Plan
                  </span>
                  <span
                    style={{ color: t.textMuted, transition: TS }}
                    className="text-[10px] font-semibold mt-0.5"
                  >
                    Getting started
                  </span>
                </div>
              </div>
              <span
                style={{ color: t.text, transition: TS }}
                className="text-xs font-mono font-bold"
              >
                $0/mo
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ borderColor: t.divider, transition: TS }}
                className="h-8 rounded-lg border bg-white dark:bg-transparent text-[10px] font-extrabold hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                View Plan
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
                }}
                whileTap={{ scale: 0.96 }}
                className="h-8 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-[10px] font-extrabold shadow-sm transition-all flex items-center justify-center gap-0.5 cursor-pointer"
              >
                Upgrade ↗
              </motion.button>
            </div>
          </motion.div>
        )}
      </aside>

      {/* ── Premium Lock Modal ── */}
      <AnimatePresence>
        {premiumModalOpen && premiumFeature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPremiumModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-[400px] rounded-[24px] bg-white/95 dark:bg-[#0f0f13]/90 backdrop-blur-2xl border border-slate-200 dark:border-white/10 p-8 shadow-2xl z-10 flex flex-col items-center text-center space-y-6 overflow-hidden group"
            >
              {/* Top shimmer line */}
              <div className="absolute top-0 inset-x-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />
              {/* Glow accent */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-56 h-40 bg-purple-600/30 rounded-full blur-[50px] pointer-events-none transition-opacity duration-500 group-hover:opacity-70" />

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                transition={{ type: "spring", stiffness: 400 }}
                onClick={() => setPremiumModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </motion.button>

              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-[0_0_30px_rgba(124,58,237,0.5)] z-10 mt-2"
              >
                <div className="absolute inset-0 rounded-full border-2 border-white/20" />
                <Lock className="h-7 w-7" />
              </motion.div>

              <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 text-[11px] font-bold shadow-[0_0_15px_rgba(245,158,11,0.15)] z-10">
                <Crown className="h-3.5 w-3.5 fill-amber-500/30" /> Premium Feature
              </motion.div>

              <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                className="space-y-2.5 z-10">
                <h3 className="text-[20px] font-black text-slate-900 dark:text-white tracking-tight">
                  {premiumFeature.title}
                </h3>
                <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed px-2">
                  {premiumFeature.desc}
                </p>
              </motion.div>

              <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}
                className="w-full space-y-4 pt-3 z-10">
                <div className="relative group/btn w-full">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 blur-md opacity-60 group-hover/btn:opacity-80 transition-opacity duration-300 pointer-events-none" />
                  <motion.button
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => setPremiumModalOpen(false)}
                    className="relative w-full h-[52px] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-[14px] font-bold shadow-xl transition-all cursor-pointer overflow-hidden flex items-center justify-center border border-white/10"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    Upgrade Plan to Unlock
                  </motion.button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPremiumModalOpen(false)}
                  className="w-full text-slate-400 hover:text-slate-300 text-[13px] font-bold transition-colors cursor-pointer py-1"
                >
                  Maybe Later
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </TooltipProvider>
  );
}
