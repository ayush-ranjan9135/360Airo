"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TiltCard } from "@/components/ui/tilt-card";
import { ProspectCard } from "@/components/pipeline/ProspectCard";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  DollarSign, 
  CheckCircle, 
  TrendingUp, 
  Search, 
  RefreshCw, 
  ExternalLink,
  UserPlus,
  Edit2,
  Mail,
  Calendar,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Settings,
  Database,
  Plus,
  Trash2,
  Check,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type PipelineStage = "contact" | "interested" | "meeting" | "closed";

interface Prospect {
  id: string;
  name: string;
  role: string;
  company: string;
  value: number;
  stage: PipelineStage;
  source: string;
}

const initialProspects: Prospect[] = [
  { id: "p1", name: "John Doe", role: "CEO", company: "Globopersona", value: 5000, stage: "contact", source: "Email Cold Run" },
  { id: "p2", name: "Sarah Jenkins", role: "Growth Lead", company: "SaaS.io", value: 8000, stage: "interested", source: "LinkedIn Connect" },
  { id: "p3", name: "Michael Chen", role: "Ops Director", company: "OutboundSend", value: 12000, stage: "meeting", source: "Email Cold Run" },
  { id: "p4", name: "Emma Watson", role: "VP Marketing", company: "Startup.co", value: 15000, stage: "closed", source: "Partner Referral" }
];

export default function PipelinePage() {
  const [viewMode, setViewMode] = React.useState<"pipeline" | "crm">("pipeline");
  const [prospects, setProspects] = React.useState<Prospect[]>(initialProspects);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sourceFilter, setSourceFilter] = React.useState("all");

  // CRM Stepper state
  const [crmStep, setCrmStep] = React.useState(1);
  const [crmConnected, setCrmConnected] = React.useState(false);
  const [apiKey, setApiKey] = React.useState("");
  const [isVerifying, setIsVerifying] = React.useState(false);

  // Drag state
  const [draggedId, setDraggedId] = React.useState<string | null>(null);

  // Sources list
  const sources = ["all", "Email Cold Run", "LinkedIn Connect", "Partner Referral"];

  // Filter prospects
  const filteredProspects = prospects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = sourceFilter === "all" || p.source === sourceFilter;
    return matchesSearch && matchesSource;
  });

  // Calculate Metrics
  const totalProspectsCount = filteredProspects.length;
  const pipelineValueSum = filteredProspects.reduce((acc, curr) => acc + curr.value, 0);
  const dealsWonCount = filteredProspects.filter(p => p.stage === "closed").length;
  const winRate = totalProspectsCount > 0 ? Math.round((dealsWonCount / totalProspectsCount) * 100) : 0;

  // Group prospects by stage
  const getProspectsByStage = (stage: PipelineStage) => {
    return filteredProspects.filter(p => p.stage === stage);
  };


  // Modal State
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    name: "",
    role: "",
    company: "",
    value: 0,
    stage: "contact" as PipelineStage,
    source: "Email Cold Run"
  });

  const handleEditProspect = (p: Prospect) => {
    setEditingId(p.id);
    setFormData({
      name: p.name,
      role: p.role,
      company: p.company,
      value: p.value,
      stage: p.stage,
      source: p.source
    });
    setIsModalOpen(true);
  };

  const handleSaveProspect = () => {
    if (!formData.name) return;
    
    if (editingId) {
      setProspects(prev => prev.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
    } else {
      const newP: Prospect = {
        ...formData,
        id: String(Date.now()),
      };
      setProspects([...prospects, newP]);
    }
    setIsModalOpen(false);
  };

  // HTML5 Drag and Drop handlers
  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (stage: PipelineStage) => {
    if (draggedId) {
      setProspects(prev => prev.map(p => p.id === draggedId ? { ...p, stage } : p));
      setDraggedId(null);
    }
  };

  // Move via arrow buttons (fallback/alternative to drag)
  const moveStage = (id: string, direction: "next" | "prev") => {
    const stages: PipelineStage[] = ["contact", "interested", "meeting", "closed"];
    setProspects(prev => prev.map(p => {
      if (p.id !== id) return p;
      const idx = stages.indexOf(p.stage);
      let newIdx = idx;
      if (direction === "next" && idx < 3) newIdx = idx + 1;
      if (direction === "prev" && idx > 0) newIdx = idx - 1;
      return { ...p, stage: stages[newIdx] };
    }));
  };

  const handleDeleteProspect = (id: string) => {
    setProspects(prev => prev.filter(p => p.id !== id));
  };

  const handleAddProspect = (stage: PipelineStage) => {
    setEditingId(null);
    setFormData({
      name: "",
      role: "",
      company: "",
      value: 0,
      stage: stage,
      source: "Email Cold Run"
    });
    setIsModalOpen(true);
  };


  const handleVerifyCRM = () => {
    if (!apiKey) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setCrmConnected(true);
      setCrmStep(3);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        
        {viewMode === "pipeline" ? (
          /* ──────────────────────────────────────────────────────── */
          /* ── PIPELINE KANBAN VIEW ──                               */
          /* ──────────────────────────────────────────────────────── */
          <motion.div
            key="pipeline-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >

            {/* Supervisor Pipeline Info Row */}
            <Card className="border-slate-200 dark:border-slate-800/80 bg-white dark:bg-gradient-to-b dark:from-[#0b1329] dark:to-[#080d1e] backdrop-blur-md rounded-2xl overflow-hidden shadow-sm dark:shadow-lg text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
              <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                    Supervisor Pipeline
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Interested Prospects
                  </h2>
                  <p className="text-xs text-slate-400 font-semibold max-w-lg leading-relaxed">
                    Drag cards between columns or use arrows to move prospects. Hand off to CRM when ready.
                  </p>
                  
                  {/* Drag indicator badge */}
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold px-2.5 py-1 text-[10px] rounded-lg">
                    ⠿ Drag & drop cards between columns
                  </Badge>
                </div>

                {/* Handoff CRM integration status box */}
                <div className="flex items-start gap-4 p-4 border border-slate-800 bg-white dark:bg-[#040812]/95 rounded-2xl text-left w-full md:w-auto shadow-inner">
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-xs font-black text-slate-900 dark:text-white">
                          {crmConnected ? "CRM Connected" : "No CRM connected"}
                        </h4>
                        <Badge className={`text-[9px] font-bold py-0 px-2 rounded-full uppercase tracking-wider ${
                          crmConnected 
                            ? "bg-emerald-50 dark:bg-[#0b1b1a] text-emerald-600 dark:text-[#00b55b] border-emerald-200 dark:border-[#00b55b]/20" 
                            : "bg-orange-50 dark:bg-[#251b15] text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/20"
                        }`}>
                          {crmConnected ? "Pipedrive Connected" : "Not connected"}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Connect your CRM to start handoff.
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setViewMode("crm")}
                        className="flex h-7 px-3.5 items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold cursor-pointer transition-all shadow-md"
                      >
                        <span>Connect CRM</span>
                        <ExternalLink className="h-3 w-3" />
                      </button>
                      <div className="flex space-x-1">
                        <span className="bg-slate-50 dark:bg-[#0b1329] text-slate-400 text-[9px] font-bold px-2 py-0.5 rounded-md border border-slate-800">0 Contact</span>
                        <span className="bg-slate-50 dark:bg-[#0b1329] text-slate-400 text-[9px] font-bold px-2 py-0.5 rounded-md border border-slate-800">0 Interested</span>
                        <span className="bg-slate-50 dark:bg-[#0b1329] text-slate-400 text-[9px] font-bold px-2 py-0.5 rounded-md border border-slate-800">0 Meeting</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* ── METRICS GRID ── */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
              {/* Total Prospects */}
              <Card className="border-slate-200 dark:border-slate-800/80 bg-white dark:bg-gradient-to-b dark:from-[#0b1329] dark:to-[#080d1e] backdrop-blur-md rounded-2xl shadow-sm dark:shadow-md hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-5">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Total Prospects
                    </span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                      {totalProspectsCount}
                    </span>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Users className="h-4.5 w-4.5" />
                  </div>
                </CardHeader>
              </Card>

              {/* Pipeline Value */}
              <Card className="border-slate-200 dark:border-slate-800/80 bg-white dark:bg-gradient-to-b dark:from-[#0b1329] dark:to-[#080d1e] backdrop-blur-md rounded-2xl shadow-sm dark:shadow-md hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-5">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Pipeline Value
                    </span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                      ${pipelineValueSum.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <DollarSign className="h-4.5 w-4.5" />
                  </div>
                </CardHeader>
              </Card>

              {/* Deals Won */}
              <Card className="border-slate-200 dark:border-slate-800/80 bg-white dark:bg-gradient-to-b dark:from-[#0b1329] dark:to-[#080d1e] backdrop-blur-md rounded-2xl shadow-sm dark:shadow-md hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-5">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Deals Won
                    </span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                      {dealsWonCount}
                    </span>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                    <CheckCircle className="h-4.5 w-4.5" />
                  </div>
                </CardHeader>
              </Card>

              {/* Win Rate */}
              <Card className="border-slate-200 dark:border-slate-800/80 bg-white dark:bg-gradient-to-b dark:from-[#0b1329] dark:to-[#080d1e] backdrop-blur-md rounded-2xl shadow-sm dark:shadow-md hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-5">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Win Rate
                    </span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                      {winRate}%
                    </span>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                    <TrendingUp className="h-4.5 w-4.5" />
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* ── SEARCH & FILTERS ROW ── */}
            <div className="flex items-center space-x-2 justify-start">
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search prospects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 text-xs border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-[#0b1329] text-slate-900 dark:text-white placeholder:text-slate-500 rounded-xl focus:border-blue-500"
                />
              </div>

              {/* Source filter select */}
              <div className="relative">
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="appearance-none bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-slate-850 rounded-xl px-3.5 py-1.5 pr-8 text-xs font-bold text-slate-200 outline-none hover:bg-slate-100 dark:hover:bg-[#0c1936] cursor-pointer shadow-md min-w-[110px]"
                >
                  <option value="all">All Sources</option>
                  <option value="Email Cold Run">Email Cold Run</option>
                  <option value="LinkedIn Connect">LinkedIn Connect</option>
                  <option value="Partner Referral">Partner Referral</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Reset stats button */}
              <button 
                onClick={() => setProspects(initialProspects)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-[#0b1329] text-slate-400 hover:text-slate-900 dark:text-white transition-colors cursor-pointer shadow-md"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* ── KANBAN BOARD ── */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              
              {/* CONTACT COLUMN */}
              <div 
                onDragOver={handleDragOver}
                onDrop={() => handleDrop("contact")}
                className="border border-blue-500/25 bg-slate-50 dark:bg-[#0b1329]/40 backdrop-blur-md rounded-2xl p-4 min-h-[380px] space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-850 pb-2">
                  <div className="flex items-center space-x-2 text-blue-400 font-extrabold text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <UserPlus className="h-4 w-4" />
                    <span>Contact</span>
                  </div>
                  <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold px-2 py-0.5 rounded-full text-[9px]">
                    {getProspectsByStage("contact").length}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {getProspectsByStage("contact").map(p => (
                    <ProspectCard 
                      key={p.id} 
                      prospect={p} 
                      themeColor="blue" 
                      shadowColor="hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
                      handleDragStart={handleDragStart} 
                      moveStage={moveStage} 
                      handleEditProspect={handleEditProspect} 
                      handleDeleteProspect={handleDeleteProspect} 
                    />
                  ))}

                  {getProspectsByStage("contact").length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-center space-y-2">
                      <UserPlus className="h-6 w-6 stroke-1 text-slate-600" />
                      <span className="text-[10px] font-bold">Initial outreach sent</span>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => handleAddProspect("contact")}
                  className="w-full py-2.5 border border-dashed border-slate-800 rounded-xl text-[10px] font-bold text-slate-500 hover:text-blue-400 hover:bg-blue-500/5 transition-all cursor-pointer flex items-center justify-center gap-1 mt-2"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Prospect</span>
                </button>
              </div>

              {/* INTERESTED COLUMN */}
              <div 
                onDragOver={handleDragOver}
                onDrop={() => handleDrop("interested")}
                className="border border-orange-500/25 bg-slate-50 dark:bg-[#0b1329]/40 backdrop-blur-md rounded-2xl p-4 min-h-[380px] space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-850 pb-2">
                  <div className="flex items-center space-x-2 text-orange-400 font-extrabold text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <Mail className="h-4 w-4" />
                    <span>Interested</span>
                  </div>
                  <Badge className="bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold px-2 py-0.5 rounded-full text-[9px]">
                    {getProspectsByStage("interested").length}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {getProspectsByStage("interested").map(p => (
                    <ProspectCard 
                      key={p.id} 
                      prospect={p} 
                      themeColor="purple" 
                      shadowColor="hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)]"
                      handleDragStart={handleDragStart} 
                      moveStage={moveStage} 
                      handleEditProspect={handleEditProspect} 
                      handleDeleteProspect={handleDeleteProspect} 
                    />
                  ))}

                  {getProspectsByStage("interested").length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-center space-y-2">
                      <Mail className="h-6 w-6 stroke-1 text-slate-600" />
                      <span className="text-[10px] font-bold">Positive reply detected</span>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => handleAddProspect("interested")}
                  className="w-full py-2.5 border border-dashed border-slate-800 rounded-xl text-[10px] font-bold text-slate-500 hover:text-orange-400 hover:bg-orange-500/5 transition-all cursor-pointer flex items-center justify-center gap-1 mt-2"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Prospect</span>
                </button>
              </div>

              {/* MEETING COLUMN */}
              <div 
                onDragOver={handleDragOver}
                onDrop={() => handleDrop("meeting")}
                className="border border-purple-500/25 bg-slate-50 dark:bg-[#0b1329]/40 backdrop-blur-md rounded-2xl p-4 min-h-[380px] space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-850 pb-2">
                  <div className="flex items-center space-x-2 text-purple-400 font-extrabold text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
                    <Calendar className="h-4 w-4" />
                    <span>Meeting</span>
                  </div>
                  <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold px-2 py-0.5 rounded-full text-[9px]">
                    {getProspectsByStage("meeting").length}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {getProspectsByStage("meeting").map(p => (
                    <ProspectCard 
                      key={p.id} 
                      prospect={p} 
                      themeColor="purple" 
                      shadowColor="hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)]"
                      handleDragStart={handleDragStart} 
                      moveStage={moveStage} 
                      handleEditProspect={handleEditProspect} 
                      handleDeleteProspect={handleDeleteProspect} 
                    />
                  ))}

                  {getProspectsByStage("meeting").length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-center space-y-2">
                      <Calendar className="h-6 w-6 stroke-1 text-slate-600" />
                      <span className="text-[10px] font-bold">Meeting scheduled or held</span>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => handleAddProspect("meeting")}
                  className="w-full py-2.5 border border-dashed border-slate-800 rounded-xl text-[10px] font-bold text-slate-500 hover:text-purple-400 hover:bg-purple-500/5 transition-all cursor-pointer flex items-center justify-center gap-1 mt-2"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Prospect</span>
                </button>
              </div>

              {/* CLOSED COLUMN */}
              <div 
                onDragOver={handleDragOver}
                onDrop={() => handleDrop("closed")}
                className="border border-emerald-500/25 bg-slate-50 dark:bg-[#0b1329]/40 backdrop-blur-md rounded-2xl p-4 min-h-[380px] space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-850 pb-2">
                  <div className="flex items-center space-x-2 text-emerald-400 font-extrabold text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <Trophy className="h-4 w-4" />
                    <span>Closed</span>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold px-2 py-0.5 rounded-full text-[9px]">
                    {getProspectsByStage("closed").length}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {getProspectsByStage("closed").map(p => (
                    <ProspectCard 
                      key={p.id} 
                      prospect={p} 
                      themeColor="purple" 
                      shadowColor="hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)]"
                      handleDragStart={handleDragStart} 
                      moveStage={moveStage} 
                      handleEditProspect={handleEditProspect} 
                      handleDeleteProspect={handleDeleteProspect} 
                    />
                  ))}

                  {getProspectsByStage("closed").length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-center space-y-2">
                      <Trophy className="h-6 w-6 stroke-1 text-slate-600" />
                      <span className="text-[10px] font-bold">Deal concluded (won or lost)</span>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => handleAddProspect("closed")}
                  className="w-full py-2.5 border border-dashed border-slate-800 rounded-xl text-[10px] font-bold text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all cursor-pointer flex items-center justify-center gap-1 mt-2"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Prospect</span>
                </button>
              </div>
            </div>

          </motion.div>
        ) : (
          /* ──────────────────────────────────────────────────────── */
          /* ── CRM INTEGRATION STEPPER VIEW ──                       */
          /* ──────────────────────────────────────────────────────── */
          <motion.div
            key="crm-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 text-left">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  CRM Integrations
                </h1>
                <p className="text-xs font-semibold text-muted-foreground mt-1">
                  Connect Pipedrive first, then control what flows in and out of 360AIRO
                </p>
              </div>
            </div>

            {/* Stepper Card Main Header */}
            <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
              <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 dark:border-border/10 gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="h-10 w-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center font-mono font-bold text-xs shadow-inner">
                    pd
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-extrabold text-slate-950 dark:text-slate-900 dark:text-white">
                        Pipedrive Integration
                      </h3>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 text-[9px] font-black py-0.5 px-2 rounded-full">
                        360Airo - CRM
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                      Connect Pipedrive and control how contacts, deals, and conversations sync with 360Airo.
                    </p>
                  </div>
                </div>

                <Badge variant="outline" className="border-slate-200 dark:border-border/30 text-slate-500 font-extrabold px-3 py-1 text-[11px] rounded-lg">
                  Pipedrive • {crmConnected ? "Connected" : "Not connected"}
                </Badge>
              </div>

              {/* Stepper Wizard Progress Indicators */}
              <div className="px-6 py-5 border-b border-slate-100 dark:border-border/10 flex flex-col md:flex-row justify-between gap-4">
                {/* Step 1 */}
                <div className="flex items-center space-x-3.5 flex-1">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                    crmStep >= 1 ? "bg-blue-600 border-blue-600 text-slate-900 dark:text-white" : "border-slate-200 text-slate-400 dark:border-border/20"
                  }`}>
                    1
                  </div>
                  <div className="flex flex-col text-left">
                    <span className={`text-[11px] font-extrabold ${crmStep === 1 ? "text-blue-600 dark:text-blue-400" : "text-slate-800 dark:text-slate-300"}`}>
                      Choose CRM
                    </span>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                      Select the provider to connect first
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center text-slate-300 dark:text-slate-700">
                  <ArrowRight className="h-4 w-4" />
                </div>

                {/* Step 2 */}
                <div className="flex items-center space-x-3.5 flex-1">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                    crmStep >= 2 ? "bg-blue-600 border-blue-600 text-slate-900 dark:text-white" : "border-slate-200 text-slate-400 dark:border-border/20"
                  }`}>
                    2
                  </div>
                  <div className="flex flex-col text-left">
                    <span className={`text-[11px] font-extrabold ${crmStep === 2 ? "text-blue-600 dark:text-blue-400" : "text-slate-800 dark:text-slate-300"}`}>
                      Credentials
                    </span>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                      Add and validate Pipedrive API Key
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center text-slate-300 dark:text-slate-700">
                  <ArrowRight className="h-4 w-4" />
                </div>

                {/* Step 3 */}
                <div className="flex items-center space-x-3.5 flex-1">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                    crmStep >= 3 ? "bg-blue-600 border-blue-600 text-slate-900 dark:text-white" : "border-slate-200 text-slate-400 dark:border-border/20"
                  }`}>
                    3
                  </div>
                  <div className="flex flex-col text-left">
                    <span className={`text-[11px] font-extrabold ${crmStep === 3 ? "text-blue-600 dark:text-blue-400" : "text-slate-800 dark:text-slate-300"}`}>
                      Sync Settings
                    </span>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                      Control forwarding and sync behavior
                    </span>
                  </div>
                </div>
              </div>

              {/* Wizard Content Body */}
              <CardContent className="p-6">
                <AnimatePresence mode="wait">
                  {crmStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4"
                    >
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider pl-1">
                        Select a CRM Provider
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold pl-1">
                        Choose the platform you want to connect. Only one CRM can be active at a time.
                      </p>

                      <div className="grid gap-4 sm:grid-cols-2 pt-2">
                        {/* Pipedrive */}
                        <div className="border-2 border-blue-600 bg-blue-600/[0.02] p-5 rounded-2xl flex items-start justify-between cursor-pointer">
                          <div className="flex items-start space-x-3">
                            <div className="h-9 w-9 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold font-mono text-xs border border-orange-500/20">
                              pd
                            </div>
                            <div className="text-left">
                              <div className="flex items-center space-x-2">
                                <span className="font-extrabold text-slate-900 dark:text-white text-xs">Pipedrive</span>
                                <Badge variant="secondary" className="bg-blue-50 text-blue-600 text-[8px] font-black px-1.5 py-0 rounded-md">Available</Badge>
                              </div>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal font-semibold">
                                Interested lead sync, deal creation, and conversation forwarding.
                              </p>
                            </div>
                          </div>
                          <Check className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                        </div>

                        {/* HubSpot */}
                        <div className="border border-slate-200 dark:border-border/20 bg-slate-50/50 dark:bg-white/[0.01] p-5 rounded-2xl flex items-start justify-between opacity-50 cursor-not-allowed">
                          <div className="flex items-start space-x-3">
                            <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 flex items-center justify-center font-bold text-xs">
                              hs
                            </div>
                            <div className="text-left">
                              <div className="flex items-center space-x-2">
                                <span className="font-extrabold text-slate-400 text-xs">HubSpot</span>
                                <Badge variant="outline" className="text-[8px] px-1.5 py-0 rounded-md">Coming soon</Badge>
                              </div>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal font-semibold">
                                Planned CRM integration.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Salesforce */}
                        <div className="border border-slate-200 dark:border-border/20 bg-slate-50/50 dark:bg-white/[0.01] p-5 rounded-2xl flex items-start justify-between opacity-50 cursor-not-allowed">
                          <div className="flex items-start space-x-3">
                            <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 flex items-center justify-center font-bold text-xs">
                              sf
                            </div>
                            <div className="text-left">
                              <div className="flex items-center space-x-2">
                                <span className="font-extrabold text-slate-400 text-xs">Salesforce</span>
                                <Badge variant="outline" className="text-[8px] px-1.5 py-0 rounded-md">Coming soon</Badge>
                              </div>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal font-semibold">
                                Planned CRM integration.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Zoho CRM */}
                        <div className="border border-slate-200 dark:border-border/20 bg-slate-50/50 dark:bg-white/[0.01] p-5 rounded-2xl flex items-start justify-between opacity-50 cursor-not-allowed">
                          <div className="flex items-start space-x-3">
                            <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 flex items-center justify-center font-bold text-xs">
                              zo
                            </div>
                            <div className="text-left">
                              <div className="flex items-center space-x-2">
                                <span className="font-extrabold text-slate-400 text-xs">Zoho CRM</span>
                                <Badge variant="outline" className="text-[8px] px-1.5 py-0 rounded-md">Coming soon</Badge>
                              </div>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal font-semibold">
                                Planned CRM integration.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {crmStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4 max-w-md mx-auto py-4"
                    >
                      <div className="text-center space-y-1.5">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white">
                          Pipedrive API Authorization
                        </h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          Provide your Pipedrive API Token key to authorize connection sync with 360Airo.
                        </p>
                      </div>

                      <div className="space-y-3.5">
                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                            Pipedrive API Key
                          </label>
                          <Input
                            type="password"
                            placeholder="api_token_here_..."
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="text-xs"
                          />
                        </div>

                        <button
                          onClick={handleVerifyCRM}
                          disabled={!apiKey || isVerifying}
                          className="w-full flex h-10 items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50 transition-all shadow-xs"
                        >
                          {isVerifying ? "Validating key..." : "Validate & Connect API Key"}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {crmStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6 text-left"
                    >
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider pl-1">
                        Sync Configuration Settings
                      </h4>

                      <div className="space-y-4">
                        {/* Auto Deal Creation */}
                        <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-border/10 bg-slate-50/50 dark:bg-card/20">
                          <div className="space-y-1">
                            <span className="font-extrabold text-slate-900 dark:text-white text-xs">Auto Deal Creation</span>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">Instantly create deals when a positive reply is detected.</p>
                          </div>
                          <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold px-2 py-0.5 rounded-md text-[9px] uppercase">Enabled</Badge>
                        </div>

                        {/* Direct Contacts Sync */}
                        <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-border/10 bg-slate-50/50 dark:bg-card/20">
                          <div className="space-y-1">
                            <span className="font-extrabold text-slate-900 dark:text-white text-xs">Direct Contacts Sync</span>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">Forward new interested contacts to Pipedrive contact lists.</p>
                          </div>
                          <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold px-2 py-0.5 rounded-md text-[9px] uppercase">Enabled</Badge>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>

              {/* Stepper Footer Controls */}
              <div className="px-6 py-4 border-t border-slate-100 dark:border-border/10 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (crmStep > 1) {
                      setCrmStep(crmStep - 1);
                    } else {
                      setViewMode("pipeline");
                    }
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-900 dark:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>{crmStep === 1 ? "Back to dashboard" : "Previous Step"}</span>
                </button>

                <div className="flex items-center space-x-4">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    Step {crmStep} / 3
                  </span>

                  <button
                    onClick={() => {
                      if (crmStep < 3) {
                        setCrmStep(crmStep + 1);
                      } else {
                        setViewMode("pipeline");
                      }
                    }}
                    disabled={crmStep === 2 && !crmConnected}
                    className="flex h-9 px-5 items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50 transition-all shadow-sm"
                  >
                    <span>{crmStep === 3 ? "Complete Sync" : "Continue"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </Card>

            {/* Bottom Status bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] font-bold font-mono text-slate-400 dark:text-slate-500 border-t border-slate-200 dark:border-border/10 pt-4 px-2">
              <div className="flex flex-wrap gap-4 items-center">
                <span>Pipedrive • {crmConnected ? "Connected" : "Not connected"}</span>
                <span>|</span>
                <span>Forward: Note</span>
                <span>|</span>
                <span>Import: 7</span>
                <span>|</span>
                <span>Export: 4</span>
              </div>
              
              <a 
                href="https://developers.pipedrive.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-400 hover:text-blue-500 transition-colors mt-2 sm:mt-0"
              >
                <span>API docs</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Prospect Form Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Prospect" : "Add Prospect"}</DialogTitle>
            <DialogDescription>
              {editingId ? "Update the details for this prospect." : "Enter details for the new prospect."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                placeholder="e.g. John Doe"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Input 
                  value={formData.role} 
                  onChange={(e) => setFormData({...formData, role: e.target.value})} 
                  placeholder="e.g. CEO"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Input 
                  value={formData.company} 
                  onChange={(e) => setFormData({...formData, company: e.target.value})} 
                  placeholder="e.g. Acme Corp"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Value ($)</label>
                <Input 
                  type="number"
                  value={formData.value || ""} 
                  onChange={(e) => setFormData({...formData, value: parseInt(e.target.value) || 0})} 
                  placeholder="5000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Source / Tag</label>
                <select 
                  className="w-full h-10 px-3 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={formData.source}
                  onChange={(e) => setFormData({...formData, source: e.target.value})}
                >
                  <option value="Email Cold Run">Email Cold Run</option>
                  <option value="LinkedIn Connect">LinkedIn Connect</option>
                  <option value="Partner Referral">Partner Referral</option>
                  <option value="Direct Inbound">Direct Inbound</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveProspect}>{editingId ? "Save Changes" : "Add Prospect"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
