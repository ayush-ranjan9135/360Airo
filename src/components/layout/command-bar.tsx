"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Mail, 
  Users, 
  Inbox, 
  Settings, 
  Sparkles, 
  PlusCircle, 
  FolderSync, 
  UserPlus, 
  HelpCircle,
  Hash
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function CommandBar({ isOpen, setIsOpen }: CommandBarProps) {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      setSearch("");
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const items = [
    { label: "Create Campaign", category: "Actions", shortcut: "C", icon: PlusCircle, href: "/dashboard/campaigns/create" },
    { label: "Connect Mailbox", category: "Actions", shortcut: "M", icon: FolderSync, href: "/dashboard/mailboxes" },
    { label: "Import Prospects", category: "Actions", shortcut: "P", icon: UserPlus, href: "/dashboard/prospects" },
    { label: "Go to Dashboard", category: "Navigation", shortcut: "G D", icon: Hash, href: "/dashboard" },
    { label: "Go to Campaigns", category: "Navigation", shortcut: "G C", icon: Mail, href: "/dashboard/campaigns" },
    { label: "Go to Prospects", category: "Navigation", shortcut: "G P", icon: Users, href: "/dashboard/prospects" },
    { label: "Go to Mailboxes", category: "Navigation", shortcut: "G M", icon: Inbox, href: "/dashboard/mailboxes" },
    { label: "Go to Settings", category: "Navigation", shortcut: "G S", icon: Settings, href: "/dashboard/settings" },
  ];

  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleItemClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={() => setIsOpen(false)}
      />

      {/* Main Dialog */}
      <div className="relative w-full max-w-xl rounded-xl border border-border/30 bg-[#121215] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-border/10">
          <Search className="h-5 w-5 text-muted-foreground mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="w-full h-14 bg-transparent text-sm text-white placeholder:text-muted-foreground focus:outline-none"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-border/20 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground shrink-0">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[320px] overflow-y-auto p-2 space-y-4">
          
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              <HelpCircle className="h-8 w-8 mx-auto text-muted-foreground/30 mb-2" />
              <span>No commands found matching "{search}"</span>
            </div>
          ) : (
            // Group by category
            Object.entries(
              filteredItems.reduce((acc, item) => {
                if (!acc[item.category]) acc[item.category] = [];
                acc[item.category].push(item);
                return acc;
              }, {} as Record<string, typeof items>)
            ).map(([category, catItems]) => (
              <div key={category} className="space-y-1">
                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-3 py-1 font-mono">
                  {category}
                </h4>
                {catItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleItemClick(item.href)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-all text-left cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-4.5 w-4.5 text-slate-400 group-hover:text-purple-400" />
                        <span>{item.label}</span>
                      </div>
                      {item.shortcut && (
                        <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-border/20 bg-muted px-1.5 font-mono text-[9px] font-medium text-muted-foreground">
                          {item.shortcut}
                        </kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Helper Footer */}
        <div className="px-4 py-3 border-t border-border/10 bg-[#09090B] flex justify-between items-center text-[10px] text-muted-foreground font-mono">
          <span className="flex items-center">
            <Sparkles className="h-3 w-3 text-purple-400 mr-1.5" />
            AI assistant commands ready
          </span>
          <span>
            ↑↓ to navigate · enter to select
          </span>
        </div>
      </div>
    </div>
  );
}
