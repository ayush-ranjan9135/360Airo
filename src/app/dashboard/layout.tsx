"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { CommandBar } from "@/components/layout/command-bar";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { cn } from "@/lib/utils";
import { Sparkles, LayoutDashboard } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isCommandBarOpen, setIsCommandBarOpen] = React.useState(false);

  // If session is loading, show a premium loader screen
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-background text-foreground space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="h-14 w-14 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-center overflow-hidden animate-pulse">
            <Image src="/logo.png" alt="360Airo" width={36} height={36} className="object-contain" />
          </div>
          <div className="absolute inset-0 rounded-xl bg-purple-500/10 blur-md animate-ping" />
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground font-mono">
          <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-spin" />
          <span>Synchronizing outreach nodes...</span>
        </div>
      </div>
    );
  }

  // If not authenticated and not loading, auth-context redirects us.
  // We can return null to avoid UI flickers.
  if (!user || user.status !== "active") {
    return null;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      
      {/* Desktop Sidebar (visible on large screen) */}
      <div className="hidden lg:flex shrink-0 h-full">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          setIsCollapsed={setIsSidebarCollapsed} 
        />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Sliding container */}
          <div className="relative flex w-64 max-w-xs flex-col bg-slate-50 dark:bg-[#0C0C0E] h-full shadow-2xl animate-in slide-in-from-left duration-250">
            <Sidebar 
              isCollapsed={false} 
              setIsCollapsed={() => {}} 
            />
          </div>
        </div>
      )}

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Glow accent highlights */}
        <div className="absolute top-0 right-0 w-[50%] h-[30%] bg-purple-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-[20%] w-[40%] h-[40%] bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

        {/* Top Navbar */}
        <TopNav 
          onSearchClick={() => setIsCommandBarOpen(true)}
          onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
        />

        {/* Content Workspace */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <div className="max-w-[1400px] mx-auto space-y-8 pb-12">
            {children}
          </div>
        </main>
      </div>

      {/* Cmd + K Command overlay dialog */}
      <CommandBar 
        isOpen={isCommandBarOpen} 
        setIsOpen={setIsCommandBarOpen} 
      />
    </div>
  );
}
