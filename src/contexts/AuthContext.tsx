import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type UserRole = "admin" | "franchise";

export interface User {
  email: string;
  role: UserRole;
  franchiseId?: string;
  franchiseName?: string;
}

export interface FranchiseProfile {
  id: string;
  userId: string;
  franchiseName: string;
  hasDiscount: boolean;
  discountType: "percentage" | "fixed";
  discountValue: number;
  discountNote: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  franchise: FranchiseProfile | null;
  login: (email: string, password: string, role: UserRole) => { success: boolean; error?: string };
  logout: () => void;
  isAuthenticated: boolean;
}

const DEMO_ACCOUNTS = {
  admin: { email: "admin@dot.com", password: "admin123" },
  franchise: { email: "franchise@dot.com", password: "franchise123" },
};

const MOCK_FRANCHISE: FranchiseProfile = {
  id: "fr-001",
  userId: "u-002",
  franchiseName: "Sample Dot Franchise",
  hasDiscount: true,
  discountType: "percentage",
  discountValue: 10,
  discountNote: "Franchise Partner Discount",
  isActive: true,
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("dot_user");
    return saved ? JSON.parse(saved) : null;
  });

  const franchise = user?.role === "franchise" ? MOCK_FRANCHISE : null;

  const login = useCallback((email: string, password: string, role: UserRole) => {
    const demo = DEMO_ACCOUNTS[role];
    if (email === demo.email && password === demo.password) {
      const u: User = {
        email,
        role,
        ...(role === "franchise" ? { franchiseId: MOCK_FRANCHISE.id, franchiseName: MOCK_FRANCHISE.franchiseName } : {}),
      };
      setUser(u);
      localStorage.setItem("dot_user", JSON.stringify(u));
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("dot_user");
    localStorage.removeItem("dot_cart");
  }, []);

  return (
    <AuthContext.Provider value={{ user, franchise, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
