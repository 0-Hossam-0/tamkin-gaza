"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { TUser } from "@/@types/IUser";

interface AuthContextType {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("tamkin_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("tamkin_user");
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("tamkin_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("tamkin_user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
