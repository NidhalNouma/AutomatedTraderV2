import { db } from './firebase-sdk'

import { collection, getDocs, getDoc, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore/lite';

import { type Account } from './types';

import axios from "axios";

import { servicesURL } from '../utils/constants'

const collectionName = 'account';

const accountsRef = collection(db, collectionName);


async function checkAccount(account: Account) {
  try {
    console.log(account)
    const check = await axios.post(`${servicesURL.publicAccounts}/check`, {
      broker: account.broker,
      type: account.accountType,
      val1: account.accountNumber,
      val2: account.accountPassword,
      val3: account.accountPass
    }) as any
    if(check?.data?.valid) return check.data.valid

    throw new Error(check?.data?.error)
  } catch (err: any) {
    throw new Error(err.response?.data?.error || err?.message || "Network error");
  } 
}

// Add a new account
export async function addAccount(account: Account): Promise<Account> {
  const check = await checkAccount(account)
  if (check) {
    const accountRef = doc(accountsRef);
    const webhookPath = `${crypto.randomUUID()}-${account.userId.replace('user_', '')}`;
    await setDoc(accountRef, { ...account, webhookPath, createdAt: Date.now(), updatedAt: Date.now() });
    const savedDoc = await getDoc(accountRef);
    return { id: savedDoc.id, ...(savedDoc.data() as Account) };
  } else {
    throw new Error('Invalid credential.')
  }
}

// Update an existing account
export async function updateAccount(accountId: string, updatedData: Partial<Account>): Promise<Account> {
  try {
    const accountRef = doc(accountsRef, accountId);
    const uAccount = { ...updatedData, updatedAt: Date.now() } as Account

    const check = await checkAccount(uAccount)

    if (check) {
      await updateDoc(accountRef, uAccount);
      const updatedDoc = await getDoc(accountRef);
      return { id: updatedDoc.id, ...(updatedDoc.data() as Account) };
    } else {
      throw new Error('Invalid credential.')
    }
  } catch (error) {
    console.error('Error updating account:', error);
    throw error;
  }
}

// Delete an account
export async function deleteAccount(accountId: string): Promise<void> {
  const accountRef = doc(accountsRef, accountId);
  await deleteDoc(accountRef);
}

// Get all accounts by user ID
export async function getAccountsByUserId(userId: string): Promise<Account[]> {
  const snapshot = await getDocs(accountsRef);
  const accounts = snapshot.docs
    .map((doc) => ({ id: doc.id, ...(doc.data() as Account) }))
    .filter((account) => account?.userId === userId)
    .sort((a, b) => (b?.createdAt ?? 0) - (a?.createdAt ?? 0));
  return accounts;
}

// Get all accounts by user ID
export async function getAccountByWebhook(webhookPath: string): Promise<Account | null> {
  const snapshot = await getDocs(accountsRef);
  const accountDoc = snapshot.docs.find((doc) => {
    const data = doc.data() as Account;
    return data.webhookPath === webhookPath;
  });
  return accountDoc ? { id: accountDoc.id, ...(accountDoc.data() as Account) } : null;
}
