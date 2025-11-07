import { db } from './firebase-sdk'

import { collection, getDocs, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore/lite';

import { type Trade, type ClosedTrade } from './types';

const collectionName = 'trade'


const tradesRef = collection(db, collectionName);

// Save a new trade
export async function saveTrade(trade: Trade): Promise<Trade> {
  const tradeRef = doc(tradesRef);
  await setDoc(tradeRef, { ...trade, createdAt: Date.now(), updatedAt: Date.now() });
  const savedDoc = await getDoc(tradeRef);
  return { id: savedDoc.id, ...(savedDoc.data() as Trade) };
}

export async function updateClosingTrade(trade: Trade) {
  if (!trade.closedTrades || trade.closedTrades.length === 0) return;

  trade.closedTrades.sort((a: ClosedTrade, b: ClosedTrade) => a.closeTime - b.closeTime);

  const totalProfit = Number(
    trade.closedTrades.reduce((sum, t) => sum + (t.pnl || 0), 0).toFixed(trade.profitDigits)
  );
  const totalfee = Number(
    trade.closedTrades.reduce((sum, t) => sum + (t.fee || 0), 0).toFixed(trade.profitDigits)
  );

  const totalVolume = trade.closedTrades.reduce((sum, t) => sum + (Number(t.volume) || 0), 0);

  trade.remainingVolume = Number(
    Math.max(Number(trade.volume) - Number(totalVolume), 0).toFixed(trade.volumeDigits)
  );

  if (trade.remainingVolume > 0) trade.status = 'partial';
  if (trade.remainingVolume <= 0) trade.status = 'closed';

  trade.pnl = totalProfit;
  trade.fee = totalfee;

  const lastTrade = trade.closedTrades[trade.closedTrades.length - 1];
  trade.exitPrice = lastTrade.exitPrice;
  trade.closeTime = lastTrade.closeTime;

  const r = await updateTrade(trade.id, trade);
  return r;

}

// Update an existing trade
export async function updateTrade(tradeId: string, updatedData: Partial<Trade>): Promise<Trade> {
  const tradeRef = doc(tradesRef, tradeId);
  await updateDoc(tradeRef, { ...updatedData, updatedAt: Date.now() });
  const updatedDoc = await getDoc(tradeRef);
  return { id: updatedDoc.id, ...(updatedDoc.data() as Trade) };
}
// Retrieve all trades (optionally by user ID)
export async function getTrades(userId?: string): Promise<Trade[]> {
  const snapshot = await getDocs(tradesRef);
  const trades = snapshot.docs
    .map((doc) => ({ id: doc.id, ...(doc.data() as Trade) }))
    .sort((a, b) => Number(b?.createdAt ?? 0) - Number(a?.createdAt ?? 0));

  return userId ? trades.filter((t: Trade) => t.userId === userId) : trades;
}

// Retrieve trades by user ID and account ID
export async function getTradesByUserAndAccount(userId: string, accountId: string): Promise<Trade[]> {
  const snapshot = await getDocs(tradesRef);
  const trades = snapshot.docs
    .map((doc) => ({ id: doc.id, ...(doc.data() as Trade) }))
    .filter((trade: Trade) => trade.userId === userId && trade.accountId === accountId)
    .sort((a, b) => Number(b?.createdAt ?? 0) - Number(a?.createdAt ?? 0));

  return trades;
}

// Retrieve a specific trade by account_id, user_id, custom_id, and symbol
export async function getTradeByDetails(
  accountId: string,
  userId: string,
  customId: string,
  symbol: string,
  type?: string
): Promise<Trade | null> {
  const snapshot = await getDocs(tradesRef);
  let trades: Trade[] = []
  const tradeDoc = snapshot.docs.find((doc) => {
    const data = doc.data() as Trade;
    let tradeMatches = data.accountId === accountId && data.userId === userId && data.customId === customId && data.side === type && data.symbol === symbol && (data.status === 'open' || data.status === 'partial');
    if (tradeMatches) {
      trades.push({ id: doc.id, ...data });
    }
    return false; // continue searching to collect all matching trades
  });

  trades.sort((a, b) => Number(b?.createdAt ?? 0) - Number(a?.createdAt ?? 0));

  // console.log(trades)
  
  return trades.length > 0 ? trades[0] : null;
}
