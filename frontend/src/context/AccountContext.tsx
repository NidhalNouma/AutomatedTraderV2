"use client";
import {
  getAccountsByUserId,
  addAccount as addAccountDb,
  deleteAccount as deleteAccountDb,
  updateAccount as updateAccountDb,
} from "@/lib/accounts-db";
import { type Account } from "@/lib/types";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useWhop } from "@/context/WhopContext";

const AccountContext = createContext<any | undefined>(undefined);

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useBroker must be used within a BrokerProvider");
  }
  return context;
};

interface AccountProviderProps {
  children: ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({
  children,
}) => {
  const { whopUser } = useWhop();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate loading accounts from API
    const loadAccounts = async () => {
      try {
        setIsLoading(true);
        const data = await getAccountsByUserId(whopUser.id);
        setAccounts(data);
      } catch (error) {
        console.error("Failed to load accounts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (whopUser?.id) loadAccounts();
  }, [whopUser]);

  const addAccount = async (
    name: string,
    broker: Account["broker"],
    val1: string,
    val2: string,
    val3: string,
    type: string
  ) => {
    if (!whopUser) return;
    setIsLoading(true);
    // console.log(whopUser);
    try {
      const acc: Account = {
        userId: whopUser.id,
        name,
        broker,
        active: true,
        accountNumber: val1,
        accountPassword: val2,
        accountPass: val3,
        accountType: type,
      };
      const newAccount = await addAccountDb(acc);

      setAccounts((prev) => [newAccount, ...prev]);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to add account");
    } finally {
      setIsLoading(false);
    }
  };

  const updateAccount = async (id: string, updates: Partial<Account>) => {
    setIsLoading(true);
    try {
      const acc = accounts.find((ac) => ac.id === id);
      if (!acc) throw new Error("Account doesn't exist.");
      updates = { ...acc, ...updates };
      const update = await updateAccountDb(id, updates);

      setAccounts((prev) =>
        prev.map((account) =>
          account.id === id ? { ...account, ...update } : account
        )
      );
    } catch (error) {
      throw new Error("Failed to update account");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteAccountDb(id);

      setAccounts((prev) => prev.filter((account) => account.id !== id));
    } catch (error) {
      throw new Error("Failed to delete account");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAccount = async (id: string) => {
    const account = accounts.find((acc) => acc.id === id);
    if (account) {
      await updateAccount(id, { active: !account.active });
    }
  };

  const value = {
    isLoading,
    accounts,
    addAccount,
    deleteAccount,
    toggleAccount,
  };
  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
