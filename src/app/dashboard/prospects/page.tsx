"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FolderSync, Users, Plus, Search, SlidersHorizontal, 
  Download, ArrowRight, RefreshCw, ChevronDown, ListFilter,
  Grid, List, FileSpreadsheet, AlertCircle, CheckCircle, Upload,
  Database, UserX, BarChart2, Star, Mail, Compass, ChevronLeft, Home, FileText
} from "lucide-react";

type TabMode = "lists" | "contacts";

export default function EmailListsPage() {
  const [activeTab, setActiveTab] = React.useState<TabMode>("lists");
  const [showUploadFlow, setShowUploadFlow] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [unsubQuery, setUnsubQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [layoutMode, setLayoutMode] = React.useState<"grid" | "list">("grid");

  const [showStatusDropdown, setShowStatusDropdown] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);
  const [qualityFilter, setQualityFilter] = React.useState("all");
  const [dateFilter, setDateFilter] = React.useState("all");
  const [countFilter, setCountFilter] = React.useState("all");
  const [campaignFilter, setCampaignFilter] = React.useState("all");

  // Dropdown states for each filter inside the filters drawer
  const [showQualityDropdown, setShowQualityDropdown] = React.useState(false);
  const [showDateDropdown, setShowDateDropdown] = React.useState(false);
  const [showCountDropdown, setShowCountDropdown] = React.useState(false);
  const [showCampaignDropdown, setShowCampaignDropdown] = React.useState(false);

  // Refs for closing on click outside
  const statusRef = React.useRef<HTMLDivElement>(null);
  const qualityRef = React.useRef<HTMLDivElement>(null);
  const dateRef = React.useRef<HTMLDivElement>(null);
  const countRef = React.useRef<HTMLDivElement>(null);
  const campaignRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false);
      }
      if (qualityRef.current && !qualityRef.current.contains(event.target as Node)) {
        setShowQualityDropdown(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setShowDateDropdown(false);
      }
      if (countRef.current && !countRef.current.contains(event.target as Node)) {
        setShowCountDropdown(false);
      }
      if (campaignRef.current && !campaignRef.current.contains(event.target as Node)) {
        setShowCampaignDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const stats = [
    {
      title: "Total Lists",
      value: "0",
      subtitle: "Active",
      icon: FolderSync,
      bgClass: "bg-blue-50/50 dark:bg-gradient-to-b dark:from-[#0b1329] dark:to-[#080d1e]",
      iconBgClass: "bg-blue-50 dark:bg-blue-900/20",
      iconColorClass: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Contacts",
      value: "0",
      subtitle: "Valid",
      icon: Users,
      bgClass: "bg-emerald-50/50 dark:bg-gradient-to-b dark:from-[#0b1329] dark:to-[#080d1e]",
      iconBgClass: "bg-emerald-50 dark:bg-emerald-900/20",
      iconColorClass: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "This Month",
      value: "+0",
      subtitle: "New",
      icon: BarChart2,
      bgClass: "bg-purple-50/50 dark:bg-gradient-to-b dark:from-[#0b1329] dark:to-[#080d1e]",
      iconBgClass: "bg-purple-50 dark:bg-purple-900/20",
      iconColorClass: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Avg. Quality",
      value: "0%",
      subtitle: "Score",
      icon: Star,
      bgClass: "bg-amber-50/50 dark:bg-gradient-to-b dark:from-[#0b1329] dark:to-[#080d1e]",
      iconBgClass: "bg-amber-50 dark:bg-amber-900/20",
      iconColorClass: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Open Rate",
      value: "0%",
      subtitle: "Avg",
      icon: Mail,
      bgClass: "bg-rose-50/50 dark:bg-gradient-to-b dark:from-[#0b1329] dark:to-[#080d1e]",
      iconBgClass: "bg-rose-50 dark:bg-rose-900/20",
      iconColorClass: "text-rose-600 dark:text-rose-400",
    },
    {
      title: "Click Rate",
      value: "0%",
      subtitle: "Avg",
      icon: Compass,
      bgClass: "bg-cyan-50/50 dark:bg-gradient-to-b dark:from-[#0b1329] dark:to-[#080d1e]",
      iconBgClass: "bg-cyan-50 dark:bg-cyan-900/20",
      iconColorClass: "text-cyan-600 dark:text-cyan-400",
    },
  ];

  if (showUploadFlow) {
    return (
      <div className="space-y-6 text-left">
        {/* Upload flow header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 border-b border-slate-200 dark:border-border/10 pb-4">
          <div className="flex items-center space-x-3.5">
            <button 
              onClick={() => setShowUploadFlow(false)}
              className="flex h-9 px-3 items-center gap-1.5 rounded-xl border border-slate-200 dark:border-border/20 bg-slate-50 dark:bg-card text-slate-650 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-[#1a1a2e] transition-colors cursor-pointer text-xs font-bold"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Email Lists</span>
            </button>
            <div className="h-6 w-[1px] bg-slate-300 dark:bg-border/20 hidden sm:block" />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Upload Email List</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Import contacts from CSV file</p>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = "/dashboard"}
            className="flex h-9 px-3.5 items-center gap-1.5 rounded-xl border border-slate-200 dark:border-border/20 bg-slate-50 dark:bg-card text-slate-650 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-[#1a1a2e] transition-colors cursor-pointer text-xs font-bold self-start sm:self-auto"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </button>
        </div>

        {/* Progress steps indicator */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-border/10 pb-3">
          <div className="relative pb-3 -mb-3 border-b-2 border-blue-500">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Progress</span>
          </div>
          <span className="text-xs font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider font-mono">Step 1 of 2</span>
        </div>

        {/* Two columns layout */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          
          {/* Left Column: Form & File Drop (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* List Information Card */}
            <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
              <CardHeader className="pb-2 p-6">
                <CardTitle className="text-sm font-extrabold text-slate-800 dark:text-slate-100">List Information</CardTitle>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">Basic details about your email list</p>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0 space-y-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider pl-1">List Name</label>
                  <Input 
                    type="text" 
                    placeholder="Newsletter Subscribers" 
                    className="h-10 text-xs border-slate-200 dark:border-border/30 bg-slate-50 dark:bg-card rounded-xl"
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider pl-1">Description (Optional)</label>
                  <textarea 
                    placeholder="Describe the purpose of this list..." 
                    rows={4}
                    className="w-full flex min-h-[80px] text-xs border border-slate-200 dark:border-border/30 bg-slate-50 dark:bg-card rounded-xl p-3.5 outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Upload CSV File Card */}
            <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
              <CardHeader className="pb-2 p-6">
                <CardTitle className="text-sm font-extrabold text-slate-800 dark:text-slate-100">Upload CSV File</CardTitle>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">Select your CSV file containing contact information</p>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <div className="border-2 border-dashed border-slate-200 dark:border-border/20 rounded-2xl py-10 flex flex-col items-center justify-center text-center space-y-3.5 bg-slate-50/50 dark:bg-card/10 hover:bg-slate-100/50 dark:hover:bg-card/15 transition-all cursor-pointer">
                  <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Upload className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Click to upload</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">or drag and drop your CSV or XLSX file</span>
                  </div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">🔒 Secure  📁 Max 10MB  📄 CSV or XLSX</span>
                </div>
              </CardContent>
            </Card>

            {/* CSV Format Tips Box */}
            <div className="flex items-start gap-3 p-4 bg-blue-500/[0.03] dark:bg-blue-950/[0.05] border border-blue-500/10 rounded-2xl">
              <AlertCircle className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
              <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 leading-relaxed">
                <span className="font-extrabold">CSV Format Tips:</span> Ensure your CSV has headers in the first row. Common columns: Email, First Name, Last Name, Company, Title, Phone, Address, City, State, Country. Quoted fields and embedded commas are supported.
              </span>
            </div>

            {/* Continue button */}
            <button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/15 flex items-center justify-center gap-1.5 cursor-pointer">
              <span>Continue to Field Mapping</span>
              <ArrowRight className="h-4 w-4" />
            </button>

          </div>

          {/* Right Column: Preview & Limit */}
          <div className="space-y-6">
            
            {/* Preview Card */}
            <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md rounded-2xl shadow-sm h-72 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
              <CardHeader className="pb-2 p-6">
                <CardTitle className="text-sm font-extrabold text-slate-800 dark:text-slate-100">👁 Preview</CardTitle>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">Live preview of your data</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col items-center justify-center text-center space-y-3.5 p-6 pt-0">
                <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-card text-slate-400 dark:text-slate-500 flex items-center justify-center shadow-inner">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">No data yet</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">Upload a CSV file to see preview</span>
                </div>
              </CardContent>
            </Card>

            {/* Credits Card */}
            <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
              <CardHeader className="pb-3 p-6 border-b border-slate-100 dark:border-border/10">
                <span className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider font-mono">CREDITS</span>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-800 dark:text-slate-200">Contact Upload Limit</span>
                    <span className="text-slate-550 dark:text-slate-400 font-mono">0/100</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-card overflow-hidden">
                    <div className="h-full bg-blue-600 dark:bg-blue-500 w-[0%]" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 block">100 contacts remaining</span>
                </div>
              </CardContent>
            </Card>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* ── HEADER SECTION ── */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0 pb-2 text-left">
        <div>
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {activeTab === "contacts" ? "Master List" : "Email Lists"}
            </h1>
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-white/5 p-1 rounded-xl shadow-inner">
              <button
                onClick={() => setActiveTab("lists")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "lists" 
                    ? "bg-white dark:bg-card text-blue-600 dark:text-white shadow-sm" 
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                Lists
              </button>
              <button
                onClick={() => setActiveTab("contacts")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "contacts" 
                    ? "bg-white dark:bg-card text-blue-600 dark:text-white shadow-sm" 
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                Contacts
              </button>
            </div>
          </div>
          <p className="text-xs font-semibold text-muted-foreground mt-1">
            {activeTab === "contacts" ? "Welcome back! Manage your contacts" : "Manage and organize your contact lists"}
          </p>
        </div>
      </div>

      {activeTab === "contacts" ? (
        /* ──────────────────────────────────────────────────────── */
        /* ── MASTER CONTACTS KANBAN/LIST VIEW ──                   */
        /* ──────────────────────────────────────────────────────── */
        <div className="space-y-6 text-left">
          
          {/* Overview Container */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-muted-foreground pl-1 font-mono">
              Overview
            </h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
              {[
                { label: "TOTAL CONTACTS", value: "0" },
                { label: "SELECTED", value: "0" },
                { label: "EMAIL LISTS", value: "0" }
              ].map((item) => (
                <Card key={item.label} className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md py-6 text-center shadow-sm">
                  <CardContent className="p-0 flex flex-col items-center justify-center space-y-1">
                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{item.value}</span>
                    <span className="text-[9px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider">{item.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Filters Card */}
          <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
            <CardHeader className="pb-2 p-6">
              <span className="text-xs font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider font-mono">FILTERS</span>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {[
                  "Company",
                  "Title",
                  "Industry",
                  "State",
                  "City",
                  "Zip Code",
                  "SIC Code",
                  "Employee Size",
                  "Revenue Size",
                  "Linkedin Status (None)"
                ].map((filterName) => (
                  <div key={filterName} className="relative">
                    <button className="w-full flex h-9 items-center justify-between bg-slate-50 dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl px-3.5 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-card/80 transition-all cursor-pointer">
                      <span>{filterName}</span>
                      <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2.5 pt-1.5">
                <button className="h-9 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer">
                  Apply Filters
                </button>
                <button className="h-9 px-4 rounded-xl border border-slate-200 dark:border-border/30 bg-white dark:bg-card text-slate-655 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-card/85 text-xs font-bold shadow-sm transition-all cursor-pointer">
                  Reset
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Email Contacts Table Container */}
          <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
            <CardHeader className="p-6 pb-4 border-b border-slate-100 dark:border-border/10 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
                Email Contacts
              </h3>
              <div className="flex items-center space-x-2">
                <button className="h-8 px-3.5 rounded-lg border border-slate-200 dark:border-border/30 bg-white dark:bg-card text-slate-655 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-card/85 text-[10px] font-bold cursor-pointer">
                  Select All
                </button>
                <button className="h-8 px-3.5 rounded-lg border border-slate-200 dark:border-border/30 bg-white dark:bg-card text-slate-655 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-card/85 text-[10px] font-bold cursor-pointer">
                  Clear
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left min-w-[1200px]">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-white/[0.01] border-b border-slate-100 dark:border-border/10">
                    {[
                      "SELECT", "EMAIL", "FIRST NAME", "LAST NAME", "TITLE", 
                      "COMPANY", "ADDRESS", "CITY", "STATE", "ZIP CODE", 
                      "COUNTRY", "PHONE", "INDUSTRY"
                    ].map((thName) => (
                      <th key={thName} className="px-5 py-3.5 text-[9px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider">
                        {thName}
                      </th>
                    ))}
                  </tr>
                </thead>
              </table>
              <div className="py-16 flex flex-col items-center justify-center space-y-3.5 text-center text-slate-400 dark:text-slate-500">
                <div className="h-6 w-6 rounded-full border-2 border-slate-300 dark:border-slate-700 border-t-blue-500 dark:border-t-blue-400 animate-spin" />
                <span className="text-xs font-semibold">Loading contacts...</span>
              </div>
            </CardContent>
          </Card>

        </div>
      ) : (
        <>
          {/* ── STATS METRIC GRID ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <Card className={`border-slate-200/60 dark:border-slate-800/80 ${stat.bgClass} backdrop-blur-md transition-all duration-300 relative group overflow-hidden hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 cursor-pointer`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-wider">
                      {stat.title}
                    </span>
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">
                      {stat.subtitle}
                    </span>
                  </div>
                  <div className={`h-8 w-8 rounded-xl flex items-center justify-center shadow-md ${stat.iconBgClass} ${stat.iconColorClass} transition-transform group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:-translate-y-1 group-hover:rotate-6 transition-all duration-300`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4 pt-0 text-left">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {stat.value}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* ── MAIN EMAIL LISTS WORKSPACE ── */}
      <div className="space-y-4">
        {/* Workspace controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Left search */}
          <div className="relative w-full md:w-80 max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search lists by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs border-slate-200 dark:border-border/30 bg-slate-50 dark:bg-card placeholder:text-slate-400 rounded-xl"
            />
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center space-x-2 self-start md:self-auto w-full md:w-auto">
            {/* Status dropdown */}
            <div className="relative" ref={statusRef}>
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="flex h-9 items-center justify-between bg-white dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none hover:bg-slate-50 dark:hover:bg-card/85 cursor-pointer shadow-sm min-w-[120px] transition-all"
              >
                <span>
                  {statusFilter === "all" && "All Status"}
                  {statusFilter === "active" && "Active"}
                  {statusFilter === "processing" && "Processing"}
                  {statusFilter === "draft" && "Draft"}
                  {statusFilter === "error" && "Error"}
                  {statusFilter === "archived" && "Archived"}
                </span>
                <ChevronDown className={`ml-2 h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${showStatusDropdown ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {showStatusDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 4, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full z-50 w-44 bg-white dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl shadow-xl p-1.5 focus:outline-none"
                  >
                    {[
                      { value: "all", label: "All Status" },
                      { value: "active", label: "Active" },
                      { value: "processing", label: "Processing" },
                      { value: "draft", label: "Draft" },
                      { value: "error", label: "Error" },
                      { value: "archived", label: "Archived" },
                    ].map((item) => (
                      <button
                        key={item.value}
                        onClick={() => {
                          setStatusFilter(item.value);
                          setShowStatusDropdown(false);
                        }}
                        className={`flex items-center w-full px-3 py-2 text-left text-xs rounded-lg transition-colors cursor-pointer ${
                          statusFilter === item.value
                            ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold"
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                        }`}
                      >
                        {statusFilter === item.value ? (
                          <span className="mr-2 text-blue-600 dark:text-blue-400 text-sm leading-none font-bold">✓</span>
                        ) : (
                          <span className="w-4" />
                        )}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex h-9 px-3 items-center justify-center gap-1.5 rounded-xl border transition-all cursor-pointer text-xs font-bold ${
                showFilters 
                  ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-sm" 
                  : "border-slate-200 dark:border-border/30 bg-slate-50 dark:bg-card text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Filters</span>
            </button>

            {/* Layout Toggles */}
            <div className="flex items-center space-x-0.5 bg-slate-100 dark:bg-white/5 p-0.5 rounded-xl border border-slate-200 dark:border-border/20">
              <button 
                onClick={() => setLayoutMode("grid")}
                className={`p-1.5 rounded-lg cursor-pointer transition-colors ${layoutMode === "grid" ? "bg-white dark:bg-card text-blue-600 dark:text-white shadow-sm" : "text-slate-400 hover:text-slate-700 dark:hover:text-white"}`}
              >
                <Grid className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => setLayoutMode("list")}
                className={`p-1.5 rounded-lg cursor-pointer transition-colors ${layoutMode === "list" ? "bg-white dark:bg-card text-blue-600 dark:text-white shadow-sm" : "text-slate-400 hover:text-slate-700 dark:hover:text-white"}`}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Refresh & Upload Action Buttons */}
            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-border/30 bg-slate-50 dark:bg-card text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shadow-sm">
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
            <button 
              onClick={() => setShowUploadFlow(true)}
              className="flex h-9 px-3.5 items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Upload className="h-3.5 w-3.5" />
              <span>Upload</span>
            </button>
          </div>
        </div>

        {/* Collapsible Filters Drawer */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: "auto", opacity: 1, marginBottom: 16 }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden bg-slate-50/50 dark:bg-card/10 border border-slate-200 dark:border-border/20 rounded-2xl p-4 shadow-inner"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Quality Filter */}
                <div className="flex flex-col space-y-1.5 text-left" ref={qualityRef}>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider pl-1">
                    Quality
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowQualityDropdown(!showQualityDropdown)}
                      className="w-full flex items-center justify-between bg-white dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none hover:bg-slate-50 dark:hover:bg-card/80 cursor-pointer shadow-sm"
                    >
                      <span>
                        {qualityFilter === "all" && "All Quality"}
                        {qualityFilter === "high" && "High (>80%)"}
                        {qualityFilter === "medium" && "Medium (50-80%)"}
                        {qualityFilter === "low" && "Low (<50%)"}
                      </span>
                      <ChevronDown className={`ml-2 h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${showQualityDropdown ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {showQualityDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 4, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 right-0 top-full z-40 bg-white dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl shadow-xl p-1.5 focus:outline-none"
                        >
                          {[
                            { value: "all", label: "All Quality" },
                            { value: "high", label: "High (>80%)" },
                            { value: "medium", label: "Medium (50-80%)" },
                            { value: "low", label: "Low (<50%)" },
                          ].map((item) => (
                            <button
                              key={item.value}
                              onClick={() => {
                                setQualityFilter(item.value);
                                setShowQualityDropdown(false);
                              }}
                              className={`flex items-center w-full px-3 py-1.5 text-left text-xs rounded-lg transition-colors cursor-pointer ${
                                qualityFilter === item.value
                                  ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold"
                                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                              }`}
                            >
                              <span>{item.label}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Date Range Filter */}
                <div className="flex flex-col space-y-1.5 text-left" ref={dateRef}>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider pl-1">
                    Date Range
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowDateDropdown(!showDateDropdown)}
                      className="w-full flex items-center justify-between bg-white dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none hover:bg-slate-50 dark:hover:bg-card/80 cursor-pointer shadow-sm"
                    >
                      <span>
                        {dateFilter === "all" && "All Time"}
                        {dateFilter === "today" && "Today"}
                        {dateFilter === "7days" && "Last 7 Days"}
                        {dateFilter === "30days" && "Last 30 Days"}
                        {dateFilter === "thismonth" && "This Month"}
                      </span>
                      <ChevronDown className={`ml-2 h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${showDateDropdown ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {showDateDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 4, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 right-0 top-full z-40 bg-white dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl shadow-xl p-1.5 focus:outline-none"
                        >
                          {[
                            { value: "all", label: "All Time" },
                            { value: "today", label: "Today" },
                            { value: "7days", label: "Last 7 Days" },
                            { value: "30days", label: "Last 30 Days" },
                            { value: "thismonth", label: "This Month" },
                          ].map((item) => (
                            <button
                              key={item.value}
                              onClick={() => {
                                setDateFilter(item.value);
                                setShowDateDropdown(false);
                              }}
                              className={`flex items-center w-full px-3 py-1.5 text-left text-xs rounded-lg transition-colors cursor-pointer ${
                                dateFilter === item.value
                                  ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold"
                                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                              }`}
                            >
                              <span>{item.label}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Contact Count Filter */}
                <div className="flex flex-col space-y-1.5 text-left" ref={countRef}>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider pl-1">
                    Contact Count
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowCountDropdown(!showCountDropdown)}
                      className="w-full flex items-center justify-between bg-white dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none hover:bg-slate-50 dark:hover:bg-card/80 cursor-pointer shadow-sm"
                    >
                      <span>
                        {countFilter === "all" && "Any Size"}
                        {countFilter === "small" && "Small (<1k)"}
                        {countFilter === "medium" && "Medium (1k-10k)"}
                        {countFilter === "large" && "Large (>10k)"}
                      </span>
                      <ChevronDown className={`ml-2 h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${showCountDropdown ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {showCountDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 4, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 right-0 top-full z-40 bg-white dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl shadow-xl p-1.5 focus:outline-none"
                        >
                          {[
                            { value: "all", label: "Any Size" },
                            { value: "small", label: "Small (<1k)" },
                            { value: "medium", label: "Medium (1k-10k)" },
                            { value: "large", label: "Large (>10k)" },
                          ].map((item) => (
                            <button
                              key={item.value}
                              onClick={() => {
                                setCountFilter(item.value);
                                setShowCountDropdown(false);
                              }}
                              className={`flex items-center w-full px-3 py-1.5 text-left text-xs rounded-lg transition-colors cursor-pointer ${
                                countFilter === item.value
                                  ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold"
                                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                              }`}
                            >
                              <span>{item.label}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Campaign Filter */}
                <div className="flex flex-col space-y-1.5 text-left" ref={campaignRef}>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider pl-1">
                    Campaign
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowCampaignDropdown(!showCampaignDropdown)}
                      className="w-full flex items-center justify-between bg-white dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none hover:bg-slate-50 dark:hover:bg-card/80 cursor-pointer shadow-sm"
                    >
                      <span>
                        {campaignFilter === "all" && "All Campaigns"}
                        {campaignFilter === "newsletter" && "Newsletter"}
                        {campaignFilter === "cold-outreach" && "Cold Outreach"}
                        {campaignFilter === "product-updates" && "Product Updates"}
                      </span>
                      <ChevronDown className={`ml-2 h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${showCampaignDropdown ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {showCampaignDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 4, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 right-0 top-full z-40 bg-white dark:bg-card border border-slate-200 dark:border-border/30 rounded-xl shadow-xl p-1.5 focus:outline-none"
                        >
                          {[
                            { value: "all", label: "All Campaigns" },
                            { value: "newsletter", label: "Newsletter" },
                            { value: "cold-outreach", label: "Cold Outreach" },
                            { value: "product-updates", label: "Product Updates" },
                          ].map((item) => (
                            <button
                              key={item.value}
                              onClick={() => {
                                setCampaignFilter(item.value);
                                setShowCampaignDropdown(false);
                              }}
                              className={`flex items-center w-full px-3 py-1.5 text-left text-xs rounded-lg transition-colors cursor-pointer ${
                                campaignFilter === item.value
                                  ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold"
                                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                              }`}
                            >
                              <span>{item.label}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state container */}
        <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md py-14 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center text-center space-y-5">
            <div className="h-14 w-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner animate-pulse">
              <Database className="h-6 w-6" />
            </div>

            <div className="space-y-1.5 max-w-[320px]">
              <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                No Email Lists Found
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                Upload your first CSV file and begin building connections with your audience.
              </p>
            </div>

            <button className="h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-500/15 flex items-center justify-center gap-1.5 cursor-pointer">
              <Upload className="h-4 w-4" />
              <span>Upload Your First List</span>
            </button>
          </CardContent>
        </Card>
      </div>

      {/* ── UNSUBSCRIBED USERS SECTION ── */}
      <div className="space-y-4">
        <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-rose-500" />
          
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 p-6 pb-4">
            <div className="flex items-start space-x-3 text-left">
              <div className="h-9 w-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                <UserX className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <CardTitle className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
                  Unsubscribed Users
                </CardTitle>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                  Contacts who replied with unsubscribe / not-interested messages
                </p>
              </div>
            </div>

            {/* Unsubscribed search & refresh actions */}
            <div className="flex items-center space-x-2 self-start sm:self-auto w-full sm:w-auto">
              <div className="relative flex-1 sm:w-48 max-w-xs">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={unsubQuery}
                  onChange={(e) => setUnsubQuery(e.target.value)}
                  className="pl-8 h-8 text-[11px] border-slate-200 dark:border-border/30 bg-slate-50 dark:bg-card rounded-xl placeholder:text-slate-400"
                />
              </div>
              <button className="flex h-8 px-3 items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-border/30 bg-slate-50 dark:bg-card text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shadow-sm text-[10px] font-bold">
                <RefreshCw className="h-3 w-3" />
                <span>Refresh</span>
              </button>
            </div>
          </CardHeader>

          {/* Unsubscribed users empty state */}
          <CardContent className="p-8 pt-2 flex flex-col items-center justify-center text-center space-y-3.5">
            <div className="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 animate-pulse">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                No unsubscribed users
              </h4>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                No unsubscribe replies detected yet
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
        </>
      )}
    </div>
  );
}
