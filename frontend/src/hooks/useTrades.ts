import { useState, useEffect } from 'react';
import { getTradesByUserAndAccount } from "@/lib/trades-db";
import { useWhop } from '@/context';
import { type Trade } from "@/lib/types"


export function useTrades(accountId:string) {
  const { whopUser } = useWhop()
  const [trades, setTrades] = useState<Trade[]>([]);
  const [filter, setFilter] = useState<"all" | "open" | "closed" | "partial">("all");
  const [isLoading, setIsLoading] = useState(true);

  async function getTrades() {
    if (!whopUser || !accountId) return;
    setIsLoading(true)

    const cTrades = await getTradesByUserAndAccount(whopUser.id, accountId)

  console.log("trades", trades);
    setTrades(cTrades)
    setIsLoading(false)
  }

  const filteredTrades = trades.filter((trade) => {
    if (filter === "all") return true;
    return trade.status === filter;
  });

  const totalPnL = trades.reduce(
    (sum, trade) => sum + (Number(trade.pnl) || 0),
    0
  );
  const totalFees = trades.reduce(
    (sum, trade) => sum + (Number(trade.fee) || 0),
    0
  );
  const closedTrades = trades.filter((t) => t.status === "closed");
  const winRate =
    closedTrades.length > 0
      ? (closedTrades.filter((t) => Number(t.pnl) > 0).length / closedTrades.length) *
        100
      : 0;

    console.log(totalPnL, trades)

  return {
    trades,
    totalPnL,
    totalFees,
    closedTrades,
    winRate,
    filter,
    setFilter,
    filteredTrades,
    isLoading,
    getTrades
  }
}