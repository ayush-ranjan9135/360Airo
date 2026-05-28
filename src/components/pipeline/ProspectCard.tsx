"use client";

import * as React from "react";
import { TiltCard } from "@/components/ui/tilt-card";
import { motion } from "framer-motion";
import { ArrowRight, Edit2, Trash2 } from "lucide-react";

export type PipelineStage = "contact" | "interested" | "meeting" | "closed";

export interface Prospect {
  id: string;
  name: string;
  role: string;
  company: string;
  value: number;
  stage: PipelineStage;
  source: string;
}

interface ProspectCardProps {
  prospect: Prospect;
  themeColor: string;
  shadowColor: string;
  handleDragStart: (id: string) => void;
  moveStage: (id: string, direction: "next" | "prev") => void;
  handleEditProspect: (p: Prospect) => void;
  handleDeleteProspect: (id: string) => void;
}

export function ProspectCard({
  prospect: p,
  themeColor,
  shadowColor,
  handleDragStart,
  moveStage,
  handleEditProspect,
  handleDeleteProspect,
}: ProspectCardProps) {
  return (
    <TiltCard className="w-full block">
      <motion.div
        draggable
        onDragStart={() => handleDragStart(p.id)}
        layoutId={p.id}
        className={`p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#040812]/80 backdrop-blur-xs cursor-grab active:cursor-grabbing text-left space-y-3.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all relative group shadow-sm hover:-translate-y-1 ${shadowColor} hover:border-${themeColor}-500/40 dark:hover:border-${themeColor}-500/60`}
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white block">{p.name}</span>
            <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{p.role} at {p.company}</span>
          </div>
          <div className="h-6 w-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[9px] font-black text-slate-400">
            {p.name.split(" ").map(n => n[0]).join("")}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-850 pt-2.5 text-[10px] font-mono">
          <span className="text-slate-400 bg-slate-50 dark:bg-[#0b1329] px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-850 font-bold">{p.source}</span>
          <span className={`font-extrabold text-${themeColor}-400`}>${p.value.toLocaleString()}</span>
        </div>
        
        {/* Control buttons inside card */}
        <div className="flex justify-end space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity pt-1 border-t border-slate-200 dark:border-slate-850/50">
          <button 
            onClick={() => moveStage(p.id, "next")}
            className={`p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-400 hover:text-${themeColor}-400 cursor-pointer`}
            title="Move Forward"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
          
          <button 
            onClick={() => handleEditProspect(p)}
            className={`p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-400 hover:text-${themeColor}-400 cursor-pointer`}
            title="Edit"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </button>
          <button 
            onClick={() => handleDeleteProspect(p.id)}
            className="p-1 hover:bg-rose-500/10 rounded-md text-slate-400 hover:text-rose-400 cursor-pointer"
            title="Delete"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.div>
    </TiltCard>
  );
}
