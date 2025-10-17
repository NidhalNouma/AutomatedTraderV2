"use client";
import { whopApi } from "@/lib/whop-sdk";
import { getOrCreateUser } from "@/lib/user-db";
import { useRouter } from "next/navigation";

import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";

const WhopContext = createContext<any | undefined>(undefined);

export const useWhop = () => {
  const context = useContext(WhopContext);
  if (context === undefined) {
    throw new Error("useWhop must be used within a WhopProvider");
  }
  return context;
};

interface WhopProviderProps {
  children: ReactNode;
  accessToken: any;
}

export const WhopProvider: React.FC<WhopProviderProps> = ({
  children,
  accessToken,
}) => {
  const router = useRouter();
  const [whopUser, setWhopUser] = useState<any>(null);

  async function getWhopUser() {
    try {
      const { userId } = await whopApi.verifyUserToken(accessToken);
      const user = await whopApi.users.getUser({ userId });

      if (!user) {
        router.push("/"); // Redirect if user not found
        return;
      }

      const dbUser = await getOrCreateUser(userId);
      setWhopUser(user);
    } catch (err) {
      console.error("Failed to load Whop user:", err);
      router.push("/"); // Redirect on error
    }
  }

  useEffect(() => {
    getWhopUser();
  }, []);

  useEffect(() => {
    if (whopUser && window.location.pathname === "/") {
      router.push("/dashboard");
    }
  }, [whopUser]);

  return (
    <WhopContext.Provider value={{ whopUser }}>{children}</WhopContext.Provider>
  );
};
