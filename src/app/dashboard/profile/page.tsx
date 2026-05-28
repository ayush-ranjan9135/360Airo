"use client";

import * as React from "react";
import { useAuth } from "@/lib/auth-context";
import { 
  User, 
  Link2, 
  Mail, 
  Copy, 
  Calendar, 
  Send, 
  BarChart2, 
  CheckCircle2, 
  DollarSign, 
  FileText, 
  PieChart,
  TrendingUp,
  Camera
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user } = useAuth();
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(user?.email || "ayushranjan9531@gmail.com");
    // Could add a toast here
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto pt-4 pb-10 px-4 md:px-0">
      
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">My Profile</h1>
        <p className="text-sm text-slate-500 dark:text-[#8892B0] mt-1">Your account overview and statistics</p>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-2 mb-8"
      >
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-md shadow-blue-600/20">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-transparent hover:bg-slate-200 dark:hover:bg-[#1E2336] text-slate-700 dark:text-[#8892B0] hover:text-slate-900 dark:hover:text-white rounded-lg text-sm font-semibold transition-colors border border-transparent dark:border-[#2A314A]">
          <Link2 className="h-4 w-4" />
          <span>Affiliate Program</span>
        </button>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Main Identity Card */}
        <motion.div variants={item} className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#111526] border border-slate-200 dark:border-[#1E2336] shadow-sm relative overflow-hidden group/card hover:border-blue-500/30 transition-colors duration-500">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-56 h-56 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[60px] group-hover/card:bg-blue-500/20 transition-all duration-700 pointer-events-none" />
          
          <div className="flex items-center space-x-6 mb-8 relative z-10">
            {/* Interactive Avatar Section */}
            <div className="relative group/avatar cursor-pointer shrink-0">
              {/* Animated glow ring behind avatar */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 blur-md opacity-20 group-hover/avatar:opacity-60 transition-opacity duration-300 animate-pulse" />
              
              <div className="relative h-20 w-20 rounded-full bg-gradient-to-tr from-[#1DA1F2] to-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow-xl shadow-blue-500/20 overflow-hidden border-2 border-white dark:border-[#111526]">
                <User className="h-10 w-10 relative z-10 group-hover/avatar:scale-110 transition-transform duration-300" />
                {/* Upload Overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-emerald-500 border-2 border-white dark:border-[#111526] rounded-full z-30 flex items-center justify-center" title="Online">
                <span className="h-2 w-2 bg-white rounded-full"></span>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{user?.name || "Ayush Ranjan"}</h2>
              <p className="text-sm font-medium text-blue-500 dark:text-blue-400 mt-0.5">Administrator</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Email Field */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-[#1E2336] bg-slate-50 dark:bg-[#0B0E17]">
              <div className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-slate-400 dark:text-[#64748B] mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 dark:text-[#64748B] font-medium uppercase tracking-wider mb-0.5">Email Address</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{user?.email || "ayushranjan9531@gmail.com"}</span>
                </div>
              </div>
              <button 
                onClick={handleCopyEmail}
                className="p-2 hover:bg-slate-200 dark:hover:bg-[#1E2336] rounded-md transition-colors text-slate-400 dark:text-[#64748B] hover:text-slate-700 dark:hover:text-white cursor-pointer"
                title="Copy Email"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>

            {/* Member Since Field */}
            <div className="flex items-center p-4 rounded-xl border border-slate-200 dark:border-[#1E2336] bg-slate-50 dark:bg-[#0B0E17]">
              <div className="flex items-start space-x-3">
                <Calendar className="h-4 w-4 text-slate-400 dark:text-[#64748B] mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 dark:text-[#64748B] font-medium uppercase tracking-wider mb-0.5">Member Since</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">May 27, 2026</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top 3 Stats Grid */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111526] border border-slate-200 dark:border-[#1E2336] shadow-sm flex flex-col relative overflow-hidden group hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-semibold text-slate-600 dark:text-[#E2E8F0]">Emails Sent Today</span>
              <Send className="h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-3xl font-black text-slate-900 dark:text-white mb-2">0</span>
            <span className="text-[10px] text-slate-500 dark:text-[#64748B]">Email campaigns sent in the last 24 hours</span>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#111526] border border-slate-200 dark:border-[#1E2336] shadow-sm flex flex-col relative overflow-hidden group hover:border-[#38BDF8]/30 hover:shadow-xl hover:shadow-[#38BDF8]/5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-semibold text-slate-600 dark:text-[#E2E8F0]">Emails This Month</span>
              <BarChart2 className="h-4 w-4 text-[#38BDF8] group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-3xl font-black text-slate-900 dark:text-white mb-2">0</span>
            <span className="text-[10px] text-slate-500 dark:text-[#64748B]">Out of 100 monthly limit</span>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#111526] border border-slate-200 dark:border-[#1E2336] shadow-sm flex flex-col relative overflow-hidden group hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-semibold text-slate-600 dark:text-[#E2E8F0]">Verify Credits</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-3xl font-black text-slate-900 dark:text-white mb-2">1</span>
            <span className="text-[10px] text-slate-500 dark:text-[#64748B]">Available email verifications</span>
          </div>
        </motion.div>

        {/* Monthly Quota */}
        <motion.div variants={item} className="p-6 rounded-2xl bg-white dark:bg-[#111526] border border-slate-200 dark:border-[#1E2336] shadow-sm flex flex-col relative">
          <div className="absolute top-6 right-6">
            <DollarSign className="h-5 w-5 text-[#FBBF24]" />
          </div>
          <span className="text-xs font-semibold text-slate-600 dark:text-[#E2E8F0] mb-1">Monthly Quota</span>
          <span className="text-sm font-medium text-slate-500 dark:text-[#8892B0] mb-6">0 / 100 emails used</span>
          
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-[#1E2336] overflow-hidden mb-2">
            {/* The bar itself */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "2%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-[#38BDF8] rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold">
            <span className="text-slate-500 dark:text-[#64748B]">0% used</span>
            <span className="text-slate-700 dark:text-white">100 remaining</span>
          </div>
        </motion.div>

        {/* Bottom 3 Stats Grid */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111526] border border-slate-200 dark:border-[#1E2336] shadow-sm flex flex-col relative overflow-hidden group hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-[#8892B0]">Total Campaigns</span>
              <FileText className="h-4 w-4 text-purple-500 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-2xl font-black text-slate-900 dark:text-white">0</span>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#111526] border border-slate-200 dark:border-[#1E2336] shadow-sm flex flex-col relative overflow-hidden group hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-[#8892B0]">This Month</span>
              <TrendingUp className="h-4 w-4 text-emerald-500 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-2xl font-black text-slate-900 dark:text-white">0</span>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#111526] border border-slate-200 dark:border-[#1E2336] shadow-sm flex flex-col relative overflow-hidden group hover:border-[#38BDF8]/30 hover:shadow-xl hover:shadow-[#38BDF8]/5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-[#8892B0]">Click Rate</span>
              <PieChart className="h-4 w-4 text-[#38BDF8] group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-2xl font-black text-slate-900 dark:text-white">0%</span>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
