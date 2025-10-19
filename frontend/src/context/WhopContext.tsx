"use client";
import { whopApi, companyId } from "@/lib/whop-sdk";
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
      console.log("Verifying user token...", whopApi);
      const { userId } = await whopApi.verifyUserToken(accessToken);
      const whopUser = await whopApi.users.getUser({ userId });

      if (!whopUser) {
        router.push("/"); // Redirect if user not found
        return;
      }

      let user: any = { ...whopUser };

      const response = await whopApi.access.checkIfUserHasAccessToCompany({
        companyId: companyId!,
        userId,
      });

      console.log(response, response.hasAccess);

      user = {
        ...user,
        hasAccess: response.hasAccess ?? false,
        accessType: response.accessLevel || null,
      };

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
