"use client";

import Link from "next/link";
import { ArrowLeft, Hammer } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0A0A0B] text-slate-900 dark:text-white p-4">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/10 blur-xl rounded-full animate-pulse" />
            <div className="relative h-28 w-28 rounded-full bg-white dark:bg-[#1C2136] border border-slate-200 dark:border-[#2A314A] shadow-xl flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, -30, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatDelay: 0.5 }}
                style={{ originX: 0.9, originY: 0.9 }}
              >
                <Hammer className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">Under Construction</h1>
          <p className="text-slate-500 dark:text-[#8892B0] text-sm md:text-base px-4">
            We are currently building out this section of the application. It will be available in a future update!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/dashboard" className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-600/20">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Dashboard</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
