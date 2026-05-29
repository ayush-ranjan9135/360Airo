"use client";

import * as React from "react";

export const DARK = {
  pageBg:         "#080b14",
  leftBorder:     "rgba(255,255,255,0.04)",
  card:           "rgba(11,13,28,0.96)",
  cardBorder:     "rgba(255,255,255,0.07)",
  topLine:        "rgba(99,102,241,0.55)",
  shadow:         "0 32px 80px rgba(0,0,0,0.55)",
  inputBg:        "#101322",
  inputBorder:    "rgba(255,255,255,0.08)",
  inputFocusBdr:  "rgba(99,102,241,0.65)",
  inputFocusRing: "rgba(99,102,241,0.10)",
  inputFocusBg:   "#121533",
  text:           "#f1f5f9",
  textSub:        "#94a3b8",
  textMuted:      "#475569",
  textAccent:     "#818cf8",
  divider:        "rgba(255,255,255,0.05)",
  toggleBg:       "#161929",
  toggleBorder:   "rgba(255,255,255,0.09)",
  toggleIcon:     "#818cf8",
  iconColor:      "#475569",
  switchLink:     "#818cf8",
  checkboxBorder: "rgba(255,255,255,0.18)",
  featureBg:      "rgba(255,255,255,0.025)",
  featureBorder:  "rgba(255,255,255,0.05)",
  demoHintBg:     "rgba(99,102,241,0.05)",
  demoHintBorder: "rgba(99,102,241,0.12)",
  orb1:           "rgba(99,102,241,0.18)",
  orb2:           "rgba(139,92,246,0.15)",
  orb3:           "rgba(167,139,250,0.08)",
  errBg:          "rgba(239,68,68,0.08)",
  errBorder:      "rgba(239,68,68,0.22)",
  okBg:           "rgba(16,185,129,0.08)",
  okBorder:       "rgba(16,185,129,0.22)",
  dotGrid:        "rgba(255,255,255,0.45)",
};

export const LIGHT = {
  pageBg:         "#eef0f9",
  leftBorder:     "rgba(99,102,241,0.09)",
  card:           "#ffffff",
  cardBorder:     "rgba(99,102,241,0.12)",
  topLine:        "rgba(99,102,241,0.45)",
  shadow:         "0 24px 64px rgba(99,102,241,0.10)",
  inputBg:        "#f4f6ff",
  inputBorder:    "#dde1f0",
  inputFocusBdr:  "rgba(99,102,241,0.55)",
  inputFocusRing: "rgba(99,102,241,0.09)",
  inputFocusBg:   "#eff1ff",
  text:           "#0f172a",
  textSub:        "#475569",
  textMuted:      "#64748b",
  textAccent:     "#4f46e5",
  divider:        "#cbd5e1",
  toggleBg:       "#eff2ff",
  toggleBorder:   "rgba(99,102,241,0.2)",
  toggleIcon:     "#4f46e5",
  iconColor:      "#94a3b8",
  switchLink:     "#4f46e5",
  checkboxBorder: "#cbd5e1",
  featureBg:      "rgba(99,102,241,0.08)",
  featureBorder:  "rgba(99,102,241,0.2)",
  demoHintBg:     "rgba(99,102,241,0.04)",
  demoHintBorder: "rgba(99,102,241,0.14)",
  orb1:           "rgba(99,102,241,0.10)",
  orb2:           "rgba(139,92,246,0.07)",
  orb3:           "rgba(167,139,250,0.05)",
  errBg:          "rgba(239,68,68,0.06)",
  errBorder:      "rgba(239,68,68,0.2)",
  okBg:           "rgba(16,185,129,0.06)",
  okBorder:       "rgba(16,185,129,0.2)",
  dotGrid:        "rgba(99,102,241,0.6)",
};

export type T = typeof DARK;
/**
 * Theme transition styles applied to various elements.
 */
export const TS = "background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease";

/**
 * Context payload containing the current theme state and CSS variables.
 */
interface ThemeContextType {
  /** True if the active theme is dark mode */
  isDark: boolean;
  /** Toggles between light and dark mode */
  toggle: () => void;
  /** Current theme palette (t for tokens) */
  t: T;
  /** Global transition string */
  TS: string;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider wraps the application and syncs the theme with localStorage and system preferences.
 * 
 * @param children Application tree to be wrapped
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = React.useState<boolean>(true); // Default to Dark Mode (Night)
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Sync theme on mount
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialIsDark = savedTheme ? savedTheme === "dark" : systemPrefersDark;
    
    setIsDark(initialIsDark);
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark, mounted]);

  const toggle = React.useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const t = isDark ? DARK : LIGHT;

  // Render children but wrap in a style container if not fully mounted yet to avoid screen flash
  return (
    <ThemeContext.Provider value={{ isDark, toggle, t, TS }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to consume the ThemeContext.
 * Must be used within a ThemeProvider.
 * 
 * @returns {ThemeContextType} The active theme context
 */
export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
