import { db } from './firebase-sdk'

import { collection, getDocs, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore/lite';

import {type Alert} from "./types"

const collectionName = 'alerts'


const alertsRef = collection(db, collectionName);

// Save a new alert
export async function saveAlert(alert: Alert): Promise<Alert> {
  const alertRef = doc(alertsRef);
  await setDoc(alertRef, { ...alert, createdAt: Date.now(), updatedAt: Date.now() });
  const savedDoc = await getDoc(alertRef);
  return { id: savedDoc.id, ...(savedDoc.data() as Alert) };
}

// Update an existing alert
export async function updateAlert(alertId: string, updatedData: Partial<Alert>): Promise<Alert> {
  const alertRef = doc(alertsRef, alertId);
  await updateDoc(alertRef, { ...updatedData, updatedAt: Date.now() });
  const updatedDoc = await getDoc(alertRef);
  return { id: updatedDoc.id, ...(updatedDoc.data() as Alert) };
}

// Get all alerts by user ID
export async function getAlertsByUserId(userId: string): Promise<Alert[]> {
  const snapshot = await getDocs(alertsRef);
  const alerts = snapshot.docs
    .map((doc) => ({ id: doc.id, ...(doc.data() as Alert) }))
    .filter((alert) => alert.userId === userId)
    .sort((a, b) => (b?.createdAt ?? 0) - (a?.createdAt ?? 0));
  return alerts;
}

// Get all alerts by user ID and account ID
export async function getAlertsByUserAndAccountId(userId: string, accountId: string): Promise<Alert[]> {
  const snapshot = await getDocs(alertsRef);
  const alerts = snapshot.docs
    .map((doc) => ({ id: doc.id, ...(doc.data() as Alert) }))
    .filter((alert) => alert.userId === userId && alert.accountId === accountId)
    .sort((a, b) => (b?.createdAt ?? 0) - (a?.createdAt ?? 0));;
  return alerts;
}
