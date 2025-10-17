import { db } from './firebase-sdk'

import { collection, getDocs, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore/lite';

import {whopApi} from "./whop-sdk"

import {type WhopUser} from "./types"

const collectionName = 'whopuser'

const usersRef = collection(db, collectionName);

// Retrieve a user by whop user_id
export async function getUserByWhopId(userId: string): Promise<WhopUser | null> {
  const snapshot = await getDocs(usersRef);
  const userDoc = snapshot.docs.find((doc) => doc.data().user_id === userId);
  return userDoc ? (userDoc.data() as WhopUser) : null;
}

// Save a new user
export async function saveUser(user: WhopUser): Promise<WhopUser> {
  const userRef = doc(usersRef, user.user_id);
   await setDoc(userRef, user);
   const savedDoc = await getDoc(userRef);
  return savedDoc.data() as WhopUser;
}

// Update an existing user
export async function updateUser(userId: string, updatedData: Partial<WhopUser>): Promise<WhopUser> {
    const userRef = doc(usersRef, userId);
    await updateDoc(userRef, updatedData);
    const updatedDoc = await getDoc(userRef);
    return updatedDoc.data() as WhopUser;
}

// Get or create a user if it doesn't exist
export async function getOrCreateUser(user_id: string): Promise<WhopUser | null> {
  const existingUser = await getUserByWhopId(user_id);
  if (existingUser) {
    return existingUser;
  }
  const wuser = await whopApi.users.getUser({ userId: user_id })
  if (!wuser) return null
  const user = {
      user_id: user_id,
  }
  const newUser = await saveUser(user);
  return newUser;
}
