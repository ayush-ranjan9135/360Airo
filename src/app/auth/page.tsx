"use client";

import * as React from "react";
import { useAuth } from "@/lib/auth-context";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Sun, Moon, Mail, Lock, User, Phone, MapPin,
  Eye, EyeOff, ArrowRight, CheckCircle2, ShieldCheck,
  Sparkles, TrendingUp, Clock, X, Loader2, Zap,
  Check, ChevronDown, LocateFixed,
} from "lucide-react";

import { useTheme, type T, TS } from "@/lib/theme-context";
import { cn } from "@/lib/utils";
import { TiltCard } from "@/components/ui/tilt-card";

/* ══════════════════════════════════════════════════════
   FIELD  — defined OUTSIDE AuthPage to prevent remount
══════════════════════════════════════════════════════ */
interface FieldProps {
  label: string; id: string; type: string; placeholder: string;
  value: string; onChange: (v: string) => void;
  icon: React.ReactNode; rightNode?: React.ReactNode;
  required?: boolean; autoComplete?: string; optional?: boolean;
  subHint?: React.ReactNode;
  t: T;
}
const Field = React.memo(function Field({
  label, id, type, placeholder, value, onChange,
  icon, rightNode, required, autoComplete, optional, subHint, t,
}: FieldProps) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} style={{ color: t.text, transition: TS }}
        className="flex items-center gap-1 text-[13px] font-bold tracking-wide select-none">
        {label}
        {optional && <span style={{ color: t.textMuted, transition: TS }} className="text-[11px] font-normal ml-1">(Optional)</span>}
      </label>
      <div style={{
        background: focused ? t.inputFocusBg : t.inputBg,
        borderWidth: "1.5px", borderStyle: "solid",
        borderColor: focused ? t.inputFocusBdr : t.inputBorder,
        boxShadow: focused ? `0 0 0 4px ${t.inputFocusRing}, 0 4px 12px rgba(0,0,0,0.05)` : "inset 0 2px 4px rgba(0,0,0,0.02)",
        transition: TS,
      }} className="flex items-center rounded-xl relative overflow-hidden group">
        <span style={{ color: focused ? t.textAccent : t.iconColor, transition: TS }} className="pl-3.5 shrink-0">
          {icon}
        </span>
        <input
          id={id} type={type} value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          style={{ color: t.text, background: "transparent" } as React.CSSProperties}
          className="flex-1 h-[48px] px-3 text-[14px] font-medium outline-none placeholder:text-slate-400"
        />
        {rightNode && (
          <span style={{ color: t.iconColor, transition: TS }} className="pr-3.5 shrink-0">
            {rightNode}
          </span>
        )}
      </div>
      {subHint}
    </div>
  );
});

/* ══════════════════════════════════════════════════════
   SELECT FIELD
══════════════════════════════════════════════════════ */
const SelectField = React.memo(function SelectField({ label, id, value, onChange, options, t }: {
  label: string; id: string; value: string; onChange: (v: string) => void; options: string[]; t: T;
}) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div className="flex flex-col gap-1.5 flex-1">
      <label htmlFor={id} style={{ color: t.text, transition: TS }} className="text-[13px] font-bold tracking-wide select-none">{label}</label>
      <div style={{
        background: focused ? t.inputFocusBg : t.inputBg,
        borderWidth: "1.5px", borderStyle: "solid",
        borderColor: focused ? t.inputFocusBdr : t.inputBorder,
        boxShadow: focused ? `0 0 0 3px ${t.inputFocusRing}` : "none",
        transition: TS,
      }} className="relative flex items-center rounded-xl">
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ color: t.text, background: "transparent" } as React.CSSProperties}
          className="w-full h-[48px] pl-3.5 pr-8 text-[14px] font-medium outline-none appearance-none cursor-pointer">
          {options.map((o) => (
            <option key={o} value={o} style={{ background: t.inputBg, color: t.text }}>{o}</option>
          ))}
        </select>
        <ChevronDown style={{ color: t.iconColor }} className="absolute right-3 h-4 w-4 pointer-events-none" />
      </div>
    </div>
  );
});

/* ══════════════════════════════════════════════════════
   LOCATION AUTO-DETECT FIELD
══════════════════════════════════════════════════════ */
const LocationAutoField = React.memo(function LocationAutoField({
  value, onChange, t,
}: { value: string; onChange: (v: string) => void; t: T }) {
  const [detecting, setDetecting] = React.useState(false);
  const [geoError, setGeoError] = React.useState("");
  const [focused, setFocused] = React.useState(false);

  const detect = React.useCallback(async () => {
    if (!navigator.geolocation) { setGeoError("Geolocation not supported by your browser."); return; }
    setDetecting(true); setGeoError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`,
            { headers: { "User-Agent": "GlobopersonaApp/1.0" } }
          );
          const data = await res.json();
          const addr = data.address || {};
          const city = addr.city || addr.town || addr.village || addr.county || addr.state_district || "";
          const country = addr.country || "";
          onChange([city, country].filter(Boolean).join(", ") || "Unknown location");
        } catch { setGeoError("Couldn't fetch location name. Try again."); }
        finally { setDetecting(false); }
      },
      (err) => {
        setDetecting(false);
        if (err.code === 1) setGeoError("Location permission denied.");
        else if (err.code === 2) setGeoError("Location unavailable. Enter manually.");
        else setGeoError("Request timed out. Try again.");
      },
      { timeout: 12000, enableHighAccuracy: false }
    );
  }, [onChange]);

  const clearLocation = React.useCallback(() => { onChange(""); setGeoError(""); }, [onChange]);
  const hasValue = value.length > 0;

  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ color: t.text, transition: TS }} className="text-[13px] font-bold tracking-wide select-none">
        Location <span style={{ color: t.textMuted }} className="text-[11px] font-normal">(Optional)</span>
      </label>

      <div style={{
        background: focused ? t.inputFocusBg : t.inputBg,
        borderWidth: "1.5px", borderStyle: "solid",
        borderColor: focused ? t.inputFocusBdr : hasValue ? "rgba(99,102,241,0.5)" : t.inputBorder,
        boxShadow: focused ? `0 0 0 3px ${t.inputFocusRing}` : hasValue ? "0 0 0 3px rgba(99,102,241,0.08)" : "none",
        transition: TS,
      }} className="flex items-center rounded-xl min-h-[48px] px-3.5 gap-2">
        {/* Icon */}
        <span style={{ color: hasValue ? "#6366f1" : detecting ? "#818cf8" : t.iconColor, transition: TS }} className="shrink-0">
          {detecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
        </span>

        {/* Input — always an input, value controlled */}
        <input
          type="text"
          placeholder={detecting ? "Detecting your location…" : "City, Country"}
          value={value}
          onChange={(e) => { setGeoError(""); onChange(e.target.value); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ color: t.text, background: "transparent" } as React.CSSProperties}
          className="flex-1 h-[48px] text-[14px] font-medium outline-none placeholder:text-slate-500"
        />

        {/* Right: clear (×) or auto-detect button */}
        {hasValue ? (
          <button type="button" onClick={clearLocation}
            style={{ color: t.textMuted, transition: TS }}
            className="shrink-0 p-1.5 rounded-lg hover:bg-red-400/10 hover:text-red-400 transition-all cursor-pointer"
            title="Clear location">
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button type="button" onClick={detect} disabled={detecting}
            style={{
              color: detecting ? t.textMuted : t.textAccent,
              background: detecting ? "transparent" : "rgba(99,102,241,0.08)",
              transition: TS,
            }}
            className="shrink-0 flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1.5 rounded-lg hover:bg-indigo-500/15 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap border-0"
            title="Auto-detect my location">
            <LocateFixed className="h-3.5 w-3.5" />
            {detecting ? "Detecting…" : "Auto-detect"}
          </button>
        )}
      </div>

      {/* Feedback row */}
      <AnimatePresence mode="wait">
        {geoError ? (
          <motion.p key="err" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-[11px] text-red-400 font-medium flex items-center gap-1.5">
            <X className="h-3 w-3 shrink-0" /> {geoError}
          </motion.p>
        ) : hasValue ? (
          <motion.p key="ok" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-[11px] font-medium flex items-center gap-1.5" style={{ color: "#34d399" }}>
            <CheckCircle2 className="h-3 w-3 shrink-0" /> Location set successfully
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
});

/* ══════════════════════════════════════════════════════
   PASSWORD STRENGTH BAR
══════════════════════════════════════════════════════ */
function getPasswordStrength(pwd: string): 0 | 1 | 2 | 3 {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 8)  score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;
  if (score <= 2) return 1;
  if (score <= 4) return 2;
  return 3;
}

const SEG_COLORS: Record<1 | 2 | 3, string> = { 1: "#ef4444", 2: "#f59e0b", 3: "#22c55e" };
const SEG_LABELS: Record<0 | 1 | 2 | 3, string> = { 0: "", 1: "Weak", 2: "Medium", 3: "Strong" };
const SEG_HINTS: Record<1 | 2, string> = {
  1: "Add uppercase letters, numbers, or symbols",
  2: "Add a special character or more length",
};

const PasswordStrengthBar = React.memo(function PasswordStrengthBar({ password, t }: { password: string; t: T }) {
  const strength = getPasswordStrength(password);
  if (!password) return null;
  return (
    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}
      className="flex flex-col gap-1.5 pt-0.5">
      <div className="flex items-center gap-1.5">
        {([1, 2, 3] as const).map((seg) => (
          <div key={seg} className="flex-1 h-[5px] rounded-full overflow-hidden" style={{ background: "rgba(148,163,184,0.18)" }}>
            <motion.div className="h-full rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: strength >= seg ? "100%" : "0%" }}
              transition={{ duration: 0.28, ease: "easeOut", delay: strength >= seg ? (seg - 1) * 0.04 : 0 }}
              style={{ background: SEG_COLORS[seg] }} />
          </div>
        ))}
        <AnimatePresence mode="wait">
          <motion.span key={strength} initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="text-[11px] font-bold ml-1 w-[44px] shrink-0"
            style={{ color: strength > 0 ? SEG_COLORS[strength as 1 | 2 | 3] : "transparent" }}>
            {SEG_LABELS[strength]}
          </motion.span>
        </AnimatePresence>
      </div>
      {strength > 0 && strength < 3 && (
        <p className="text-[10.5px] leading-relaxed" style={{ color: t.textMuted }}>
          {SEG_HINTS[strength as 1 | 2]}
        </p>
      )}
    </motion.div>
  );
});

/* ══════════════════════════════════════════════════════
   CHECKBOX
══════════════════════════════════════════════════════ */
function Checkbox({ checked, onChange, t, children }: { checked: boolean; onChange: (v: boolean) => void; t: T; children: React.ReactNode }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none" onClick={() => onChange(!checked)}>
      <div style={{
        borderWidth: "2px", borderStyle: "solid",
        borderColor: checked ? "transparent" : t.checkboxBorder,
        background: checked ? "linear-gradient(135deg,#4f46e5,#7c3aed)" : "transparent",
        transition: TS,
      }} className="mt-0.5 h-5 w-5 shrink-0 rounded-md flex items-center justify-center">
        <AnimatePresence>
          {checked && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 600, damping: 25 }}>
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={3.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span style={{ color: t.textSub, transition: TS }} className="text-[13px] leading-snug mt-0.5">{children}</span>
    </label>
  );
}

/* ══════════════════════════════════════════════════════
   CTA BUTTON
══════════════════════════════════════════════════════ */
function CTAButton({ type = "button", isLoading, children }: { type?: "button" | "submit"; isLoading?: boolean; children: React.ReactNode }) {
  return (
    <div className="relative group w-full">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" />
      <button type={type} disabled={isLoading}
        className="relative w-full h-[50px] rounded-xl font-bold text-white text-[14px] bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:from-indigo-500 hover:via-violet-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-[1.012] active:scale-[0.988] overflow-hidden cursor-pointer flex items-center justify-center gap-2.5">
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <span className="relative flex items-center justify-center gap-2.5">
          {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing…</> : children}
        </span>
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ALERT BANNER
══════════════════════════════════════════════════════ */
function AlertBanner({ kind, msg, t }: { kind: "err" | "ok"; msg: string; t: T }) {
  const isErr = kind === "err";
  return (
    <motion.div initial={{ opacity: 0, y: -6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6 }}
      style={{ background: isErr ? t.errBg : t.okBg, borderWidth: "1px", borderStyle: "solid", borderColor: isErr ? t.errBorder : t.okBorder, transition: TS }}
      className="flex items-start gap-2.5 p-3.5 rounded-xl text-xs font-semibold">
      <span style={{ color: isErr ? "#f87171" : "#34d399" }} className="shrink-0 mt-0.5">
        {isErr ? <X className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
      </span>
      <span style={{ color: isErr ? "#f87171" : "#34d399" }}>{msg}</span>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   THEME TOGGLE
══════════════════════════════════════════════════════ */
function ThemeToggle({ isDark, toggle, t }: { isDark: boolean; toggle: () => void; t: T }) {
  return (
    <motion.button onClick={toggle} whileTap={{ scale: 0.88 }}
      style={{ background: t.toggleBg, borderWidth: "1.5px", borderStyle: "solid", borderColor: t.toggleBorder, transition: TS }}
      className="flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer shadow-sm"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.span key="sun" initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.3, ease: "backOut" }}>
            <Sun className="h-4 w-4" style={{ color: t.toggleIcon }} />
          </motion.span>
        ) : (
          <motion.span key="moon" initial={{ rotate: 90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.3, ease: "backOut" }}>
            <Moon className="h-4 w-4" style={{ color: t.toggleIcon }} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ══════════════════════════════════════════════════════
   CARD
══════════════════════════════════════════════════════ */
function Card({ children, t }: { children: React.ReactNode; t: T }) {
  return (
    <div className="relative rounded-3xl overflow-hidden backdrop-blur-2xl transition-all duration-300 group"
      style={{ 
        background: t.card, 
        borderWidth: "1px", 
        borderStyle: "solid", 
        borderColor: t.cardBorder, 
        boxShadow: `0 24px 48px -12px rgba(0,0,0,0.15), 0 0 0 1px ${t.cardBorder} inset`, 
        transition: TS 
      }}>
      {/* Top shimmer line */}
      <div style={{ background: `linear-gradient(90deg, transparent, ${t.topLine}, transparent)` }} className="absolute top-0 inset-x-0 h-[1.5px] w-full opacity-60" />
      {/* Inner subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-32 rounded-full blur-[60px] pointer-events-none opacity-30 transition-opacity duration-500 group-hover:opacity-50"
        style={{ background: t.topLine }} />
      <div className="relative z-10 p-7 sm:p-9">{children}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SWITCH LINK
══════════════════════════════════════════════════════ */
function SwitchLink({ text, linkText, onClick, t }: { text: string; linkText: string; onClick: () => void; t: T }) {
  return (
    <p className="text-center text-[13px] font-medium" style={{ color: t.textSub, transition: TS }}>
      {text}{" "}
      <button type="button" onClick={onClick} style={{ color: t.switchLink, transition: TS }}
        className="font-bold hover:underline underline-offset-2 transition-all cursor-pointer">
        {linkText}
      </button>
    </p>
  );
}

/* ══════════════════════════════════════════════════════
   FORM CARD — CRITICAL: defined OUTSIDE AuthPage
   so React never sees a new component type on re-render
══════════════════════════════════════════════════════ */
interface FormCardProps {
  heading: string; subStart: string; subAccent: string;
  children: React.ReactNode;
  switchText: string; switchLink: string; switchAction: () => void;
  error: string; success: string; t: T; isDark: boolean;
}
function FormCard({ heading, subStart, subAccent, children, switchText, switchLink, switchAction, error, success, t, isDark }: FormCardProps) {
  return (
    <Card t={t}>
      {/* Mobile brand */}
      <div className="flex lg:hidden items-center justify-center gap-2.5 mb-7">
        <div style={{ transition: TS }}
          className={cn("h-8 w-8 rounded-lg overflow-hidden flex items-center justify-center border", isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-slate-100 border-slate-200/50")}>
          <Image src="/logo.png" alt="" width={24} height={24} style={{ width: "auto", height: "auto", maxWidth: 24, maxHeight: 24 }} className="object-contain" />
        </div>
        <span style={{ color: t.text, transition: TS }} className="font-extrabold text-base tracking-tight">Globopersona</span>
      </div>

      {/* Heading */}
      <div className="mb-6">
        <h2 style={{ color: t.text, transition: TS }} className="text-[26px] font-extrabold tracking-[-0.022em] leading-tight">{heading}</h2>
        <p style={{ color: t.textSub, transition: TS }} className="text-[14px] mt-1.5">
          {subStart}{" "}
          <span style={{ color: t.textAccent, transition: TS }} className="font-bold">{subAccent}</span>
        </p>
      </div>

      {/* Alerts */}
      <div className="space-y-2 empty:hidden mb-4">
        <AnimatePresence>{error && <AlertBanner key="err" kind="err" msg={error} t={t} />}</AnimatePresence>
        <AnimatePresence>{success && <AlertBanner key="ok" kind="ok" msg={success} t={t} />}</AnimatePresence>
      </div>

      {children}

      <div style={{ marginTop: "20px", paddingTop: "16px", borderTopWidth: 1, borderTopStyle: "solid", borderTopColor: t.divider, transition: TS }}>
        <SwitchLink text={switchText} linkText={switchLink} onClick={switchAction} t={t} />
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════════════════
   LOGIN FORM — standalone component, defined outside
══════════════════════════════════════════════════════ */
interface LoginFormProps {
  t: T; isDark: boolean; error: string; success: string;
  email: string; setEmail: (v: string) => void;
  password: string; setPassword: (v: string) => void;
  showPwd: boolean; setShowPwd: (v: boolean) => void;
  loginLocation: string; setLoginLocation: (v: string) => void;
  rememberMe: boolean; setRememberMe: (v: boolean) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onForgot: () => void;
  onSignup: () => void;
  onFillDemo: () => void;
}
function LoginFormView({
  t, isDark, error, success,
  email, setEmail, password, setPassword,
  showPwd, setShowPwd, loginLocation, setLoginLocation,
  rememberMe, setRememberMe, isLoading,
  onSubmit, onForgot, onSignup, onFillDemo,
}: LoginFormProps) {
  return (
    <motion.div key="login"
      initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -22 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
      <FormCard
        heading="Welcome Back!"
        subStart="Sign in to continue to your"
        subAccent="dashboard"
        switchText="Don't have an account?"
        switchLink="Create Account"
        switchAction={onSignup}
        error={error} success={success} t={t} isDark={isDark}>
        <form onSubmit={onSubmit} className="space-y-4">
          <Field id="l-email" label="Email or Phone Number" type="email"
            placeholder="Enter your email or phone number"
            value={email} onChange={setEmail}
            icon={<Mail className="h-4 w-4" />}
            required autoComplete="email" t={t} />

          <Field id="l-pwd" label="Password"
            type={showPwd ? "text" : "password"}
            placeholder="Enter your password"
            value={password} onChange={setPassword}
            icon={<Lock className="h-4 w-4" />}
            rightNode={
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                className="hover:opacity-70 transition-opacity cursor-pointer">
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            required autoComplete="current-password" t={t} />

          <LocationAutoField value={loginLocation} onChange={setLoginLocation} t={t} />

          <div className="flex items-center justify-between pt-0.5">
            <Checkbox checked={rememberMe} onChange={setRememberMe} t={t}>Remember me</Checkbox>
            <button type="button" onClick={onForgot}
              style={{ color: t.textAccent, transition: TS }}
              className="text-[13px] font-bold hover:underline underline-offset-2 cursor-pointer">
              Forgot Password?
            </button>
          </div>

          <div className="pt-1">
            <CTAButton type="submit" isLoading={isLoading}>
              Sign In <ArrowRight className="h-4 w-4" />
            </CTAButton>
          </div>

          {/* Demo hint */}
          <div style={{ 
            background: isDark ? "rgba(99,102,241,0.05)" : "rgba(99,102,241,0.03)", 
            borderWidth: "1px", borderStyle: "solid", 
            borderColor: isDark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.2)", 
            transition: TS 
          }}
            className="flex items-center justify-between px-4 py-3 rounded-xl mt-4 group hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse shrink-0" />
              <span style={{ color: t.textSub, transition: TS }} className="text-[11px] font-medium tracking-wide">
                Demo: ayushranjan9531@gmail.com / Ayush@123
              </span>
            </div>
            <button type="button" onClick={onFillDemo}
              className="text-[11px] font-bold text-indigo-500 hover:text-indigo-400 hover:bg-indigo-500/10 px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1">
              Fill <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </form>
      </FormCard>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   SIGNUP FORM — standalone component, defined outside
══════════════════════════════════════════════════════ */
interface SignupFormProps {
  t: T; isDark: boolean; error: string; success: string;
  name: string; setName: (v: string) => void;
  signupEmail: string; setSignupEmail: (v: string) => void;
  phone: string; setPhone: (v: string) => void;
  newPwd: string; setNewPwd: (v: string) => void;
  showNewPwd: boolean; setShowNewPwd: (v: boolean) => void;
  confirmPwd: string; setConfirmPwd: (v: string) => void;
  showConfirmPwd: boolean; setShowConfirmPwd: (v: boolean) => void;
  location: string; setLocation: (v: string) => void;
  agreedToTerms: boolean; setAgreedToTerms: (v: boolean) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onLogin: () => void;
}
function SignupFormView({
  t, isDark, error, success,
  name, setName, signupEmail, setSignupEmail, phone, setPhone,
  newPwd, setNewPwd, showNewPwd, setShowNewPwd,
  confirmPwd, setConfirmPwd, showConfirmPwd, setShowConfirmPwd,
  location, setLocation, agreedToTerms, setAgreedToTerms,
  isLoading, onSubmit, onLogin,
}: SignupFormProps) {
  const pwdMatch = confirmPwd.length > 0 && confirmPwd === newPwd;
  const pwdMismatch = confirmPwd.length > 0 && confirmPwd !== newPwd;

  return (
    <motion.div key="signup"
      initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -22 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
      <FormCard
        heading="Create Account"
        subStart="Fill in your details to"
        subAccent="get started"
        switchText="Already have an account?"
        switchLink="Sign In"
        switchAction={onLogin}
        error={error} success={success} t={t} isDark={isDark}>
        <form onSubmit={onSubmit} className="space-y-3.5">
          <Field id="s-name" label="Full Name" type="text"
            placeholder="Enter your full name"
            value={name} onChange={setName}
            icon={<User className="h-4 w-4" />}
            required autoComplete="name" t={t} />

          <Field id="s-email" label="Email Address" type="email"
            placeholder="Enter your email address"
            value={signupEmail} onChange={setSignupEmail}
            icon={<Mail className="h-4 w-4" />}
            required autoComplete="email" t={t} />

          <Field id="s-phone" label="Phone Number" type="tel"
            placeholder="Enter phone number"
            value={phone} onChange={setPhone}
            icon={<Phone className="h-4 w-4" />}
            optional autoComplete="tel" t={t} />

          {/* Password + strength bar */}
          <Field id="s-pwd" label="Password"
            type={showNewPwd ? "text" : "password"}
            placeholder="Create a strong password"
            value={newPwd} onChange={setNewPwd}
            icon={<Lock className="h-4 w-4" />}
            rightNode={
              <button type="button" onClick={() => setShowNewPwd(!showNewPwd)}
                className="hover:opacity-70 transition-opacity cursor-pointer">
                {showNewPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            subHint={<PasswordStrengthBar password={newPwd} t={t} />}
            required autoComplete="new-password" t={t} />

          {/* Confirm password — eye always visible, match hint below */}
          <Field id="s-confirm" label="Confirm Password"
            type={showConfirmPwd ? "text" : "password"}
            placeholder="Re-enter your password"
            value={confirmPwd} onChange={setConfirmPwd}
            icon={<Lock className="h-4 w-4" />}
            rightNode={
              <button type="button" onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                className="hover:opacity-70 transition-opacity cursor-pointer">
                {showConfirmPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            subHint={
              confirmPwd.length > 0 ? (
                <motion.p initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }}
                  className="text-[11px] font-bold flex items-center gap-1.5"
                  style={{ color: pwdMatch ? "#22c55e" : pwdMismatch ? "#ef4444" : t.textMuted }}>
                  {pwdMatch
                    ? <><Check className="h-3 w-3 shrink-0" /> Passwords match</>
                    : <><X className="h-3 w-3 shrink-0" /> Passwords do not match</>}
                </motion.p>
              ) : null
            }
            required autoComplete="new-password" t={t} />

          <LocationAutoField value={location} onChange={setLocation} t={t} />

          <Checkbox checked={agreedToTerms} onChange={setAgreedToTerms} t={t}>
            I agree to the{" "}
            <span style={{ color: t.textAccent }} className="font-bold hover:underline underline-offset-2 cursor-pointer">Terms & Conditions</span>
          </Checkbox>

          <div className="pt-1">
            <CTAButton type="submit" isLoading={isLoading}>Create Account</CTAButton>
          </div>
        </form>
      </FormCard>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   FORGOT FORM
══════════════════════════════════════════════════════ */
interface ForgotFormProps {
  t: T; isDark: boolean; error: string; success: string;
  forgotEmail: string; setForgotEmail: (v: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onLogin: () => void;
}
function ForgotFormView({ t, isDark, error, success, forgotEmail, setForgotEmail, isLoading, onSubmit, onLogin }: ForgotFormProps) {
  return (
    <motion.div key="forgot"
      initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}>
      <FormCard
        heading="Reset Password"
        subStart="Enter your email and we'll send a"
        subAccent="reset link"
        switchText="Remember your password?"
        switchLink="Sign In"
        switchAction={onLogin}
        error={error} success={success} t={t} isDark={isDark}>
        <form onSubmit={onSubmit} className="space-y-4">
          <Field id="f-email" label="Email Address" type="email"
            placeholder="Enter your registered email"
            value={forgotEmail} onChange={setForgotEmail}
            icon={<Mail className="h-4 w-4" />}
            required autoComplete="email" t={t} />
          <div className="pt-1">
            <CTAButton type="submit" isLoading={isLoading}>
              Send Reset Link <ArrowRight className="h-4 w-4" />
            </CTAButton>
          </div>
        </form>
      </FormCard>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   PENDING STATE
══════════════════════════════════════════════════════ */
function PendingView({ t, onLogin }: { t: T; onLogin: () => void }) {
  return (
    <motion.div key="pending"
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}>
      <Card t={t}>
        <div className="text-center space-y-5 py-2">
          <div className="mx-auto relative w-16 h-16">
            <div className="absolute inset-0 rounded-full bg-amber-500/10 flex items-center justify-center"
              style={{ borderWidth: "2px", borderStyle: "solid", borderColor: "rgba(245,158,11,0.2)" }}>
              <Clock className="h-7 w-7 text-amber-400" />
            </div>
            <svg className="absolute inset-0 animate-spin" style={{ animationDuration: "4s" }} viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="29" fill="none" stroke="rgba(245,158,11,0.3)" strokeWidth="2.5" strokeDasharray="10 7" />
            </svg>
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-mono uppercase tracking-widest"
              style={{ borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(245,158,11,0.2)" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" /> Under Review
            </span>
            <h3 style={{ color: t.text, transition: TS }} className="text-xl font-extrabold mt-3">Registration Submitted!</h3>
            <p style={{ color: t.textSub, transition: TS }} className="text-[13px] mt-2 leading-relaxed max-w-[300px] mx-auto">
              We review every workspace to maintain inbox quality. Approval usually takes 5–15 minutes.
            </p>
          </div>
          <button onClick={onLogin}
            style={{ background: t.inputBg, borderWidth: "1px", borderStyle: "solid", borderColor: t.inputBorder, color: t.textSub, transition: TS }}
            className="w-full h-11 rounded-xl text-sm font-bold hover:opacity-80 transition-all cursor-pointer">
            Back to Sign In
          </button>
        </div>
      </Card>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
type AuthMode = "login" | "signup" | "forgot" | "pending";

const FEATURES = [
  { icon: ShieldCheck, color: "#818cf8", bg: "rgba(99,102,241,0.1)",  border: "rgba(99,102,241,0.18)", title: "Smart Deliverability Guard", desc: "Automated SPF, DKIM & DMARC checking with live warmup networks." },
  { icon: Sparkles,    color: "#a78bfa", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.18)", title: "AI-Driven Sequencer",        desc: "Generate high-converting, personalized cold emails at scale." },
  { icon: TrendingUp,  color: "#34d399", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.18)", title: "Advanced CRM Analytics",    desc: "Live open, click & reply rates across all sender addresses." },
];

export default function AuthPage() {
  const { login, signup, user } = useAuth();

  const { isDark, toggle, t } = useTheme();

  const [mode, setMode] = React.useState<AuthMode>("login");

  /* login */
  const [email, setEmail]           = React.useState("");
  const [password, setPassword]     = React.useState("");
  const [showPwd, setShowPwd]       = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [loginLocation, setLoginLocation] = React.useState("");

  /* signup */
  const [name, setName]               = React.useState("");
  const [phone, setPhone]             = React.useState("");
  const [signupEmail, setSignupEmail] = React.useState("");
  const [newPwd, setNewPwd]           = React.useState("");
  const [showNewPwd, setShowNewPwd]   = React.useState(false);
  const [confirmPwd, setConfirmPwd]   = React.useState("");
  const [showConfirmPwd, setShowConfirmPwd] = React.useState(false);
  const [location, setLocation]       = React.useState("");
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);

  /* forgot */
  const [forgotEmail, setForgotEmail] = React.useState("");

  /* status */
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError]         = React.useState("");
  const [success, setSuccess]     = React.useState("");

  React.useEffect(() => { if (user?.status === "pending_approval") setMode("pending"); }, [user]);

  const reset      = React.useCallback(() => { setError(""); setSuccess(""); }, []);
  const switchMode = React.useCallback((m: AuthMode) => { setMode(m); setError(""); setSuccess(""); }, []);

  const handleSubmit = React.useCallback(async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setSuccess(""); setIsLoading(true);
    try {
      if (mode === "login") {
        if (!email || !password) { setError("Please fill in all fields."); return; }
        const res = await login(email, password);
        if (!res.success) setError(res.error || "Invalid credentials. Please try again.");
      } else if (mode === "signup") {
        if (!name || !signupEmail || !newPwd || !confirmPwd) { setError("All required fields must be filled."); return; }
        if (newPwd !== confirmPwd) { setError("Passwords do not match."); return; }
        if (newPwd.length < 6) { setError("Password must be at least 6 characters."); return; }
        if (!agreedToTerms) { setError("You must accept the Terms & Conditions."); return; }
        await signup(name, signupEmail, newPwd, location || "Global");
        setMode("pending");
      } else if (mode === "forgot") {
        if (!forgotEmail) { setError("Please enter your email address."); return; }
        await new Promise((r) => setTimeout(r, 1000));
        setSuccess("Password reset link sent! Check your inbox.");
      }
    } catch { setError("Something went wrong. Please try again."); }
    finally { setIsLoading(false); }
  }, [mode, email, password, name, signupEmail, newPwd, confirmPwd, location, agreedToTerms, forgotEmail, login, signup]);

  const onFillDemo = React.useCallback(() => {
    setEmail("ayushranjan9531@gmail.com");
    setPassword("Ayush@123");
    setError(""); setSuccess("");
  }, []);

  const goLogin  = React.useCallback(() => switchMode("login"),  [switchMode]);
  const goSignup = React.useCallback(() => switchMode("signup"), [switchMode]);
  const goForgot = React.useCallback(() => switchMode("forgot"), [switchMode]);

  return (
    <div style={{ background: t.pageBg, transition: TS }} className="min-h-screen w-full flex overflow-hidden">

      {/* ── LEFT PANEL ── */}
      <div style={{ borderRightWidth: "1px", borderRightStyle: "solid", borderRightColor: t.leftBorder, transition: TS }}
        className="relative hidden lg:flex lg:w-[52%] flex-col justify-between p-12 xl:p-16 overflow-hidden">
        {/* Orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="auth-orb-1 absolute -top-[12%] -left-[8%] w-[65%] h-[65%] rounded-full"
            style={{ background: `radial-gradient(circle, ${t.orb1} 0%, transparent 70%)`, filter: "blur(70px)", transition: TS }} />
          <div className="auth-orb-2 absolute -bottom-[12%] -right-[8%] w-[60%] h-[60%] rounded-full"
            style={{ background: `radial-gradient(circle, ${t.orb2} 0%, transparent 70%)`, filter: "blur(80px)", transition: TS }} />
          <div className="auth-orb-3 absolute top-[38%] left-[32%] w-[42%] h-[42%] rounded-full"
            style={{ background: `radial-gradient(circle, ${t.orb3} 0%, transparent 70%)`, filter: "blur(55px)", transition: TS }} />
          <div className="absolute inset-0 opacity-[0.018]"
            style={{ backgroundImage: `radial-gradient(${t.dotGrid} 1px, transparent 1px)`, backgroundSize: "26px 26px", transition: TS }} />
        </div>

        {/* Brand */}
        <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
          className="relative z-10 flex items-center gap-3.5">
          <div className={cn(
            "h-10 w-10 rounded-lg overflow-hidden flex items-center justify-center transition-all border",
            isDark 
              ? "bg-slate-800/60 border-slate-700/50"
              : "bg-slate-100 border-slate-200/50"
          )}>
            <Image src="/logo.png" alt="Globopersona" width={32} height={32}
              style={{ width: "auto", height: "auto", maxWidth: 32, maxHeight: 32 }} className="object-contain" />
          </div>
          <div>
            <p style={{ color: t.text, transition: TS }} className="font-extrabold text-[15px] tracking-tight">Globopersona</p>
            <p style={{ color: t.textAccent, transition: TS }} className="text-[10px] font-mono uppercase tracking-[0.18em] opacity-70">B2B Outreach Engine</p>
          </div>
        </motion.div>

        {/* Hero */}
        <div className="relative z-10 my-auto space-y-9">
          <div className="space-y-5">
            <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
              style={{ background: isDark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.07)", borderWidth: "1px", borderStyle: "solid", borderColor: isDark ? "rgba(99,102,241,0.22)" : "rgba(99,102,241,0.18)", transition: TS }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full">
              <Zap className="h-3.5 w-3.5" style={{ color: t.textAccent }} />
              <span style={{ color: t.textAccent, transition: TS }} className="text-xs font-bold tracking-wide">Powered by 360Airo Technology</span>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.55 }}
              style={{ color: t.text, transition: TS }}
              className="text-[40px] xl:text-[48px] font-extrabold leading-[1.07] tracking-[-0.025em]">
              Reach prospects in the{" "}
              <span className={`bg-gradient-to-r ${isDark ? "from-indigo-400 via-violet-400 to-purple-400" : "from-indigo-600 via-violet-600 to-purple-700"} bg-clip-text text-transparent`}
                style={{ backgroundSize: "200% 200%" }}>
                primary inbox
              </span>
              , every time.
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
              style={{ color: t.textSub, transition: TS }}
              className="text-[14.5px] leading-[1.75] max-w-[400px]">
              Enterprise-grade warmup, AI sequences, and real-time deliverability monitoring for serious growth teams.
            </motion.p>
          </div>

          {/* Features */}
          <div className="grid gap-3 group/features">
            {FEATURES.map(({ icon: Icon, color, bg, border, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
                <TiltCard className="block w-full">
                  <div 
                    style={{ background: t.featureBg, transition: TS }}
                    className="flex items-start gap-4 p-4 rounded-2xl border border-transparent hover:border-indigo-500/30 dark:hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group/card"
                  >
                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-purple-500/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div style={{ background: bg, borderWidth: "1px", borderStyle: "solid", borderColor: border, transition: TS }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl relative z-10">
                      <Icon className="h-4 w-4 group-hover/card:scale-110 transition-transform duration-300" style={{ color }} />
                    </div>
                    <div className="relative z-10">
                      <p style={{ color: t.text, transition: TS }} className="text-sm font-bold group-hover/card:text-indigo-400 dark:group-hover/card:text-indigo-300 transition-colors">{title}</p>
                      <p style={{ color: t.textMuted, transition: TS }} className="text-xs mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            style={{ borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: t.divider, transition: TS }}
            className="flex items-center gap-10 pt-5">
            {[["2.4M+", "Emails Sent"], ["98.7%", "Inbox Rate"], ["12K+", "Teams"]].map(([v, l], i) => (
              <motion.div 
                key={l}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 100, damping: 12 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group cursor-pointer"
              >
                <p className={`text-[26px] font-black bg-gradient-to-r ${isDark ? "from-indigo-400 via-violet-400 to-purple-400" : "from-indigo-600 via-violet-600 to-purple-700"} bg-clip-text text-transparent tracking-tight group-hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.6)] transition-all duration-300`}>
                  {v}
                </p>
                <p style={{ color: t.textMuted, transition: TS }} className="text-[10px] mt-1 font-bold uppercase tracking-[0.15em] group-hover:text-indigo-300 dark:group-hover:text-indigo-400 transition-colors">
                  {l}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          style={{ color: t.textMuted, transition: TS }}
          className="relative z-10 text-[11px] font-mono tracking-widest">
          © 2026 GLOBOPERSONA INC. · POWERED BY 360AIRO
        </motion.p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex w-full lg:w-[48%] items-center justify-center min-h-screen p-5 sm:p-8 relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] rounded-full opacity-40"
            style={{ background: `radial-gradient(circle, ${t.orb1} 0%, transparent 70%)`, filter: "blur(70px)", transition: TS }} />
        </div>

        <div className="relative z-10 w-full max-w-[420px]">
          <div className="flex justify-end mb-4">
            <ThemeToggle isDark={isDark} toggle={toggle} t={t} />
          </div>

          <AnimatePresence mode="wait">
            {mode === "login" && (
              <LoginFormView key="login"
                t={t} isDark={isDark} error={error} success={success}
                email={email} setEmail={setEmail}
                password={password} setPassword={setPassword}
                showPwd={showPwd} setShowPwd={setShowPwd}
                loginLocation={loginLocation} setLoginLocation={setLoginLocation}
                rememberMe={rememberMe} setRememberMe={setRememberMe}
                isLoading={isLoading}
                onSubmit={handleSubmit} onForgot={goForgot}
                onSignup={goSignup} onFillDemo={onFillDemo}
              />
            )}
            {mode === "signup" && (
              <SignupFormView key="signup"
                t={t} isDark={isDark} error={error} success={success}
                name={name} setName={setName}
                signupEmail={signupEmail} setSignupEmail={setSignupEmail}
                phone={phone} setPhone={setPhone}
                newPwd={newPwd} setNewPwd={setNewPwd}
                showNewPwd={showNewPwd} setShowNewPwd={setShowNewPwd}
                confirmPwd={confirmPwd} setConfirmPwd={setConfirmPwd}
                showConfirmPwd={showConfirmPwd} setShowConfirmPwd={setShowConfirmPwd}
                location={location} setLocation={setLocation}
                agreedToTerms={agreedToTerms} setAgreedToTerms={setAgreedToTerms}
                isLoading={isLoading}
                onSubmit={handleSubmit} onLogin={goLogin}
              />
            )}
            {mode === "forgot" && (
              <ForgotFormView key="forgot"
                t={t} isDark={isDark} error={error} success={success}
                forgotEmail={forgotEmail} setForgotEmail={setForgotEmail}
                isLoading={isLoading}
                onSubmit={handleSubmit} onLogin={goLogin}
              />
            )}
            {mode === "pending" && (
              <PendingView key="pending" t={t} onLogin={goLogin} />
            )}
          </AnimatePresence>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-4 flex items-center justify-center gap-1.5">
            <span style={{ color: t.textMuted, transition: TS }} className="text-[11px] font-mono">
              {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
