"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";

export interface User {
  email: string;
  name: string;
  country?: string;
  status: "active" | "pending_approval";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, pass: string, country: string) => Promise<{ success: boolean; status: "pending_approval" }>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    // Read from localStorage on mount
    const storedUser = localStorage.getItem("globopersona_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      const isDashboardPath = pathname.startsWith("/dashboard");
      const isAuthPath = pathname.startsWith("/auth");
      
      if (!user && isDashboardPath) {
        router.push("/auth");
      } else if (user && user.status === "active" && isAuthPath) {
        router.push("/dashboard");
      }
    }
  }, [user, isLoading, pathname, router]);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    // Mimic API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // For demo purposes, we will accept any valid email/password combo
    // OR we can check if they registered
    const storedUsers = JSON.parse(localStorage.getItem("globopersona_users") || "{}");
    const isDefaultAdmin = email.trim().toLowerCase() === "ayushranjan9531@gmail.com" && pass === "Ayush@123";
    
    if (isDefaultAdmin || storedUsers[email.trim().toLowerCase()]?.password === pass) {
      const activeUser: User = isDefaultAdmin ? {
        email: "ayushranjan9531@gmail.com",
        name: "Ayush Ranjan",
        country: "India",
        status: "active",
      } : {
        email: email.trim().toLowerCase(),
        name: storedUsers[email.trim().toLowerCase()].name,
        country: storedUsers[email.trim().toLowerCase()].country,
        status: "active",
      };
      
      setUser(activeUser);
      localStorage.setItem("globopersona_user", JSON.stringify(activeUser));
      setIsLoading(false);
      router.push("/dashboard");
      return { success: true };
    } else {
      setIsLoading(false);
      return { success: false, error: "Invalid email or password." };
    }
  };

  const signup = async (name: string, email: string, pass: string, country: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store in our local "database" so they can log in again later
    const storedUsers = JSON.parse(localStorage.getItem("globopersona_users") || "{}");
    storedUsers[email.trim().toLowerCase()] = { name, password: pass, country };
    localStorage.setItem("globopersona_users", JSON.stringify(storedUsers));

    // Immediately log them in as an active user (bypassing pending for the assessment)
    const activeUser: User = {
      email: email.trim().toLowerCase(),
      name,
      country,
      status: "active",
    };
    
    setUser(activeUser);
    localStorage.setItem("globopersona_user", JSON.stringify(activeUser));
    setIsLoading(false);
    
    // Force navigation to dashboard
    router.push("/dashboard");
    return { success: true, status: "active" as any };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("globopersona_user");
    router.push("/auth");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user && user.status === "active", isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
