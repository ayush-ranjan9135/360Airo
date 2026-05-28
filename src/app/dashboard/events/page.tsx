"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  AlertCircle, 
  XCircle, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  Info,
  CalendarCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CalendarView = "month" | "week" | "day" | "agenda";

interface Event {
  id: string;
  title: string;
  time: string;
  type: "scheduled" | "completed" | "cancelled" | "noshow";
  provider: "email" | "linkedin";
  recipient: string;
}

const demoEvents: Record<string, Event[]> = {
  "2026-05-12": [
    { id: "1", title: "Outbound Follow-up Call", time: "10:00 AM", type: "completed", provider: "email", recipient: "john@startup.co" },
    { id: "2", title: "LinkedIn Connection Setup", time: "02:30 PM", type: "scheduled", provider: "linkedin", recipient: "Sarah Jenkins" }
  ],
  "2026-05-18": [
    { id: "3", title: "AI Campaign Review", time: "11:00 AM", type: "scheduled", provider: "email", recipient: "marketing@saas.io" }
  ],
  "2026-05-20": [
    { id: "4", title: "Introductory Meeting", time: "09:00 AM", type: "noshow", provider: "linkedin", recipient: "David Miller" }
  ],
  "2026-05-25": [
    { id: "5", title: "Demo Call - 360Airo Alignment", time: "04:00 PM", type: "cancelled", provider: "email", recipient: "partners@growth.org" }
  ]
};

export default function ScheduledEventsPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date(2026, 4, 1)); // May 2026
  const [selectedDateStr, setSelectedDateStr] = React.useState<string>("2026-05-12");
  const [activeView, setActiveView] = React.useState<CalendarView>("month");

  // Get date metrics
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Grid days array construction
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

  const gridCells: { dayNum: number; dateStr: string; isCurrentMonth: boolean }[] = [];

  // Previous month padding days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const mStr = String(prevMonth + 1).padStart(2, "0");
    const dStr = String(d).padStart(2, "0");
    gridCells.push({
      dayNum: d,
      dateStr: `${prevMonthYear}-${mStr}-${dStr}`,
      isCurrentMonth: false
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const mStr = String(month + 1).padStart(2, "0");
    const dStr = String(i).padStart(2, "0");
    gridCells.push({
      dayNum: i,
      dateStr: `${year}-${mStr}-${dStr}`,
      isCurrentMonth: true
    });
  }

  // Next month padding days to make grid standard 35 or 42 cells
  const remainingCells = gridCells.length <= 35 ? 35 - gridCells.length : 42 - gridCells.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextMonthYear = month === 11 ? year + 1 : year;
  for (let i = 1; i <= remainingCells; i++) {
    const mStr = String(nextMonth + 1).padStart(2, "0");
    const dStr = String(i).padStart(2, "0");
    gridCells.push({
      dayNum: i,
      dateStr: `${nextMonthYear}-${mStr}-${dStr}`,
      isCurrentMonth: false
    });
  }

  // Navigations
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date(2026, 4, 1)); // May 2026 matching mockup
    setSelectedDateStr("2026-05-12");
  };

  // Metrics calculators
  let scheduledCount = 0;
  let completedCount = 0;
  let noShowCount = 0;
  let cancelledCount = 0;

  Object.values(demoEvents).forEach(evList => {
    evList.forEach(e => {
      if (e.type === "scheduled") scheduledCount++;
      if (e.type === "completed") completedCount++;
      if (e.type === "noshow") noShowCount++;
      if (e.type === "cancelled") cancelledCount++;
    });
  });

  return (
    <div className="space-y-6">
      

      {/* ── MAIN WORKSPACE ── */}
      <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md overflow-hidden rounded-2xl shadow-sm text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
        <CardHeader className="pb-4 border-b border-slate-100 dark:border-border/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-base font-extrabold text-slate-900 dark:text-white">
              Scheduled Events Calendar
            </CardTitle>
            <CardDescription className="text-xs font-semibold mt-0.5">
              View and manage all your scheduled LinkedIn & campaign events
            </CardDescription>
          </div>

          <button 
            onClick={handleToday}
            className="flex h-9 px-4 items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </button>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          
          {/* ── STATS CARDS ROW ── */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {/* Scheduled */}
            <div className="border border-emerald-500/20 bg-emerald-500/[0.01] dark:bg-emerald-950/[0.04] p-4 rounded-xl flex items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Scheduled
                </span>
                <span className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {scheduledCount}
                </span>
              </div>
              <div className="h-8 w-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <CalendarIcon className="h-4.5 w-4.5" />
              </div>
            </div>

            {/* Completed */}
            <div className="border border-slate-200 dark:border-border/20 bg-slate-50/50 dark:bg-white/[0.02] p-4 rounded-xl flex items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Completed
                </span>
                <span className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {completedCount}
                </span>
              </div>
              <div className="h-8 w-8 rounded-lg bg-slate-400 text-white flex items-center justify-center shadow-lg">
                <Clock className="h-4.5 w-4.5" />
              </div>
            </div>

            {/* No Show */}
            <div className="border border-orange-500/20 bg-orange-500/[0.01] dark:bg-orange-950/[0.04] p-4 rounded-xl flex items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                  No Show
                </span>
                <span className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {noShowCount}
                </span>
              </div>
              <div className="h-8 w-8 rounded-lg bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                <AlertCircle className="h-4.5 w-4.5" />
              </div>
            </div>

            {/* Cancelled */}
            <div className="border border-rose-500/20 bg-rose-500/[0.01] dark:bg-rose-950/[0.04] p-4 rounded-xl flex items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                  Cancelled
                </span>
                <span className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {cancelledCount}
                </span>
              </div>
              <div className="h-8 w-8 rounded-lg bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/20">
                <XCircle className="h-4.5 w-4.5" />
              </div>
            </div>
          </div>

          {/* Color legend line */}
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 pl-1 uppercase tracking-wider">
            <div className="flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Scheduled</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              <span>Completed</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              <span>Cancelled</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              <span>No Show</span>
            </div>
          </div>

          {/* Info Banner */}
          <div className="flex items-start gap-2.5 p-3.5 bg-blue-500/[0.03] dark:bg-blue-950/[0.05] border border-blue-500/10 rounded-xl">
            <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
            <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 leading-normal">
              Click on any date to see all scheduled emails and LinkedIn messages for that day.
            </span>
          </div>

          {/* ── CALENDAR INNER WORKSPACE ── */}
          <div className="border border-slate-200 dark:border-border/30 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-white/[0.01]">
            
            {/* Calendar Controls */}
            <div className="p-4 border-b border-slate-200 dark:border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-1 bg-slate-100 dark:bg-white/5 p-1 rounded-xl shadow-inner">
                <button 
                  onClick={handleToday}
                  className="px-3 py-1.5 bg-white dark:bg-card text-slate-800 dark:text-white rounded-lg text-[10px] font-extrabold shadow-sm transition-all hover:bg-slate-50 cursor-pointer"
                >
                  Today
                </button>
                <button 
                  onClick={handlePrevMonth}
                  className="p-1.5 hover:bg-slate-200/50 dark:hover:bg-white/5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button 
                  onClick={handleNextMonth}
                  className="p-1.5 hover:bg-slate-200/50 dark:hover:bg-white/5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                {monthNames[month]} {year}
              </span>

              {/* View tabs */}
              <div className="flex items-center space-x-0.5 bg-slate-100 dark:bg-white/5 p-0.5 rounded-xl border border-slate-200 dark:border-border/20">
                {(["month", "week", "day", "agenda"] as CalendarView[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setActiveView(v)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold capitalize transition-all cursor-pointer ${
                      activeView === v
                        ? "bg-white dark:bg-card text-blue-600 dark:text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid display */}
            <AnimatePresence mode="wait">
              {activeView === "month" ? (
                <motion.div
                  key="month-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Grid Header Days */}
                  <div className="grid grid-cols-7 text-center border-b border-slate-200 dark:border-border/20 bg-slate-100/50 dark:bg-white/[0.02] py-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                      <span key={day} className="text-[10px] font-extrabold text-slate-400 dark:text-muted-foreground uppercase tracking-wider">
                        {day}
                      </span>
                    ))}
                  </div>

                  {/* Days cells */}
                  <div className="grid grid-cols-7 grid-rows-5 divide-x divide-y divide-slate-100 dark:divide-border/10">
                    {gridCells.map((cell, idx) => {
                      const dayEvents = demoEvents[cell.dateStr] || [];
                      const isSelected = selectedDateStr === cell.dateStr;
                      return (
                        <div
                          key={`${cell.dateStr}-${idx}`}
                          onClick={() => setSelectedDateStr(cell.dateStr)}
                          className={`min-h-[70px] sm:min-h-[85px] p-2 flex flex-col justify-between transition-all cursor-pointer text-left ${
                            cell.isCurrentMonth 
                              ? "bg-white dark:bg-transparent" 
                              : "bg-slate-50/50 dark:bg-card/5 text-slate-300 dark:text-slate-600"
                          } ${isSelected ? "ring-2 ring-blue-500 ring-inset" : "hover:bg-slate-50/50 dark:hover:bg-white/[0.01]"}`}
                        >
                          <span className={`text-xs font-bold ${
                            !cell.isCurrentMonth 
                              ? "text-slate-300 dark:text-slate-600" 
                              : isSelected
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-slate-600 dark:text-slate-300"
                          }`}>
                            {String(cell.dayNum).padStart(2, "0")}
                          </span>

                          {/* Render indicators inside cell */}
                          <div className="flex flex-col space-y-1 mt-1">
                            {dayEvents.map(e => (
                              <div
                                key={e.id}
                                className={`text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-md truncate ${
                                  e.type === "scheduled" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400" :
                                  e.type === "completed" ? "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400" :
                                  e.type === "cancelled" ? "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400" :
                                  "bg-orange-50 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400"
                                }`}
                              >
                                {e.title}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                /* Simple mockup view for Week, Day, Agenda views */
                <motion.div
                  key="other-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-14 text-center text-slate-400 dark:text-slate-500 font-semibold text-xs"
                >
                  No events found in this view.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── EXPANDED DAILY EVENT LOG ── */}
          <div className="space-y-3 pt-2 text-left">
            <h3 className="text-xs font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider pl-1">
              Events on {selectedDateStr}
            </h3>

            {demoEvents[selectedDateStr] && demoEvents[selectedDateStr].length > 0 ? (
              <div className="grid gap-3">
                {demoEvents[selectedDateStr].map((e) => (
                  <div
                    key={e.id}
                    className="p-4 rounded-xl border border-slate-100 dark:border-border/10 bg-slate-50/50 dark:bg-card/30 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3 text-left">
                      <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <CalendarCheck className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{e.title}</span>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                          Recipient: <span className="font-semibold text-slate-500 dark:text-slate-400">{e.recipient}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary" className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-md uppercase">
                        {e.provider}
                      </Badge>
                      <Badge
                        variant={
                          e.type === "scheduled" ? "success" :
                          e.type === "completed" ? "secondary" :
                          e.type === "cancelled" ? "destructive" :
                          "warning"
                        }
                        className="text-[9px] font-bold uppercase"
                      >
                        {e.type}
                      </Badge>
                      <span className="text-xs font-mono font-semibold text-slate-400 dark:text-slate-500">{e.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 dark:text-slate-500 pl-1">
                No outbound tasks or campaign events scheduled on this date.
              </p>
            )}
          </div>

        </CardContent>
      </Card>

    </div>
  );
}
