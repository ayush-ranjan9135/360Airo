"use client";

import * as React from "react";
import { useAuth } from "@/lib/auth-context";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme-context";
import { 
  Bell, 
  Menu, 
  ChevronDown, 
  Moon,
  Sun,
  LogOut,
  Settings,
  User,
  CreditCard,
  Link2,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TopNavProps {
  onSearchClick: () => void;
  onMobileMenuToggle: () => void;
}

export function TopNav({ onSearchClick, onMobileMenuToggle }: TopNavProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const { isDark, toggle, TS } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  // Map pathname to Page Title and Description
  const getHeaderDetails = () => {
    switch (pathname) {
      case "/dashboard":
        return {
          title: "Dashboard",
          subtitle: "Overview of your outreach nodes and performance metrics"
        };
      case "/dashboard/pipeline":
        return {
          title: "Pipeline",
          subtitle: "Track interested prospects from detection through to closed deals"
        };
      case "/dashboard/integrations":
        return {
          title: "Integrations",
          subtitle: "Connect Pipedrive and control how contacts, deals, and conversations sync with 360Airo"
        };
      case "/dashboard/prospects":
        return {
          title: "Email Lists",
          subtitle: "Manage and organize your contact lists"
        };
      case "/dashboard/mailboxes":
        return {
          title: "Email Accounts",
          subtitle: "Configure your sending accounts and domains"
        };
      case "/dashboard/campaigns":
        return {
          title: "Email Campaigns",
          subtitle: "Create, schedule and track your email campaigns"
        };
      case "/dashboard/events":
        return {
          title: "Scheduled Events",
          subtitle: "Manage your upcoming calls, meetings and events"
        };
      case "/dashboard/templates":
        return {
          title: "Template Library",
          subtitle: "Draft and customize email copy templates"
        };
      case "/dashboard/settings":
        return {
          title: "Settings",
          subtitle: "Manage your workspace settings and configurations"
        };
      default:
        return {
          title: "360Airo",
          subtitle: "Outreach & CRM synchronization console"
        };
    }
  };

  const details = getHeaderDetails();

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#090e1a]/95 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20 select-none transition-colors duration-200">
      
      {/* Left side: Mobile Menu Trigger + Route Titles */}
      <div className="flex items-center space-x-4 text-left">
        <button 
          onClick={onMobileMenuToggle}
          className="lg:hidden p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex flex-col justify-center">
          <h2 className="font-extrabold text-sm text-slate-900 dark:text-white tracking-wide">
            {details.title}
          </h2>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5 leading-none">
            {details.subtitle}
          </span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-5 relative">
        
        {/* Theme Toggle Pill Switch */}
        <button 
          onClick={toggle}
          className="h-7 w-12 rounded-full bg-slate-200 dark:bg-slate-800 p-0.5 flex items-center transition-all cursor-pointer relative shadow-inner border border-slate-300 dark:border-slate-800"
          title="Toggle Mode"
        >
          <div className={cn(
            "h-[22px] w-[22px] rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-300",
            isDark ? "translate-x-5" : "translate-x-0"
          )}>
            {isDark ? (
              <Moon className="h-3.5 w-3.5 text-slate-900 fill-slate-900" />
            ) : (
              <Sun className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            )}
          </div>
        </button>

        {/* Notification Bell */}
        <button
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer relative"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
        </button>

        {/* User Profile Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2.5 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
          >
            {/* Blue Square Avatar with letter 'A' */}
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-extrabold text-xs shadow-md shadow-blue-500/10">
              A
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-white hidden md:block">
              {user?.name || "Ayush Ranjan"}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-30" 
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-[220px] rounded-lg border border-slate-200 dark:border-[#2A314A] bg-white dark:bg-[#1C2136] shadow-2xl z-40 animate-in fade-in slide-in-from-top-2 duration-150 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-[#2A314A] leading-snug text-left">
                  <p className="font-bold text-sm text-slate-900 dark:text-white">{user?.name || "Ayush Ranjan"}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{user?.email || "ayushranjan9531@gmail.com"}</p>
                </div>
                <div className="py-1">
                  {[
                    { label: "My Profile", icon: User, href: "/dashboard/profile" },
                    { label: "Billing", icon: CreditCard, href: "/dashboard/billing" },
                    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
                    { label: "Affiliate", icon: Link2, href: "/dashboard/affiliate" },
                    { label: "Help Center", icon: HelpCircle, href: "/dashboard/help" },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button 
                        key={idx}
                        onClick={() => {
                          setShowProfileMenu(false);
                          window.location.href = item.href;
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#222840] hover:text-slate-900 dark:hover:text-white transition-colors text-left cursor-pointer group"
                      >
                        <Icon className="h-[18px] w-[18px] text-slate-400 dark:text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300 transition-colors" strokeWidth={1.5} />
                        <span>{item.label}</span>
                      </button>
                    )
                  })}
                </div>
                <div className="border-t border-slate-100 dark:border-[#2A314A] py-1">
                  <button 
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-rose-500 dark:text-[#E95B5B] hover:bg-rose-50 dark:hover:bg-[#2A2030] transition-colors text-left cursor-pointer group"
                  >
                    <LogOut className="h-[18px] w-[18px] text-rose-500 dark:text-[#E95B5B] group-hover:text-rose-600" strokeWidth={1.5} />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
