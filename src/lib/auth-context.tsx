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

    if (email.trim().toLowerCase() === "ayushranjan9531@gmail.com" && pass === "Ayush@123") {
      const activeUser: User = {
        email: "ayushranjan9531@gmail.com",
        name: "Ayush Ranjan",
        country: "India",
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

    const pendingUser: User = {
      email,
      name,
      country,
      status: "pending_approval",
    };
    setUser(pendingUser);
    localStorage.setItem("globopersona_user", JSON.stringify(pendingUser));
    setIsLoading(false);
    return { success: true, status: "pending_approval" as const };
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
