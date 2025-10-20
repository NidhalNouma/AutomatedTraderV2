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

      for (const plan of whopPlans) {
        // console.log(`Checking access for plan ${plan}`);
        const accessResp =
          await whopApi.access.checkIfUserHasAccessToAccessPass({
            accessPassId: plan.id,
            userId,
          });
        // console.log(`Access for plan ${plan}:`, accessResp.hasAccess);

        if (accessResp.hasAccess) {
          user.access = plan;
          user.hasAccess = true;
          // break;
        }
      }

      // const presponse = await whopApi.companies.listMembers({
      //   companyId: companyId!,
      // });
      // // prod_rYPTb6ExOywaT;

      // console.log(user);

      // user = {
      //   ...user,
      //   hasAccess: response.hasAccess ?? false,
      //   accessLevel: response.accessLevel || null,
      // };

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

interface WhopPlan {
  id: string;
  name: string;
  accounts: number;
}

const whopPlans: WhopPlan[] = [
  {
    id: "prod_rYPTb6ExOywaT",
    name: "Basic",
    accounts: 2,
  },
  {
    id: "prod_z0dGVEd6S0W1f",
    name: "Pro",
    accounts: 5,
  },
  {
    id: "prod_FkIozybpbMTmC",
    name: "Advanced",
    accounts: 10,
  },
  {
    id: "prod_79euYQ959oTPJ",
    name: "Lifetime",
    accounts: 20,
  },
];
