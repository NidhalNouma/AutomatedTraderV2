import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  Calendar,
  DollarSign,
  Clock,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, Button } from "../ui";
import { formatCurrency, formatDateTime } from "@/utils";
import { getBannersByCategory } from "../hooks/banners";
import { useBanner } from "../hooks";

interface Trade {
  id: string;
  symbol: string;
  side: "buy" | "sell";
  type: "market" | "limit";
  quantity: number;
  entryPrice: number;
  exitPrice: number | null;
  pnl: number;
  fees: number;
  status: "open" | "closed";
  openTime: string;
  closeTime: string | null;
  strategy: string;
  broker: string;
}

const TradeHistoryPage: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "open" | "closed">("all");
  const [dateRange, setDateRange] = useState("7d");

  // Get signals and tools banners for trade history
  const tradeBanners = [
    ...getBannersByCategory("signals").slice(0, 2),
    ...getBannersByCategory("tools").slice(0, 2),
    ...getBannersByCategory("education").slice(0, 1),
  ];

  const { currentBannerData, touchHandlers } = useBanner(
    tradeBanners,
    true,
    8000
  );
  const ButtonIcon = currentBannerData?.buttonIcon || BarChart3;

  // Mock trade data
  const trades: Trade[] = [
    {
      id: "1",
      symbol: "BTCUSDT",
      side: "buy",
      type: "market",
      quantity: 0.1,
      entryPrice: 43250.0,
      exitPrice: 44100.0,
      pnl: 85.0,
      fees: 2.15,
      status: "closed",
      openTime: "2024-01-15T10:30:00Z",
      closeTime: "2024-01-15T14:22:00Z",
      strategy: "Scalping Bot",
      broker: "Binance",
    },
    {
      id: "2",
      symbol: "ETHUSDT",
      side: "sell",
      type: "limit",
      quantity: 2.5,
      entryPrice: 2650.0,
      exitPrice: 2580.0,
      pnl: -175.0,
      fees: 3.31,
      status: "closed",
      openTime: "2024-01-15T09:15:00Z",
      closeTime: "2024-01-15T11:45:00Z",
      strategy: "Trend Following",
      broker: "Bybit",
    },
    {
      id: "3",
      symbol: "SOLUSDT",
      side: "buy",
      type: "market",
      quantity: 10,
      entryPrice: 98.5,
      exitPrice: null,
      pnl: 45.0,
      fees: 0.98,
      status: "open",
      openTime: "2024-01-15T16:20:00Z",
      closeTime: null,
      strategy: "DCA Bot",
      broker: "Binance",
    },
  ];

  const filteredTrades = trades.filter((trade) => {
    if (filter === "all") return true;
    return trade.status === filter;
  });

  const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const totalFees = trades.reduce((sum, trade) => sum + trade.fees, 0);
  const winRate =
    trades.filter((t) => t.status === "closed").length > 0
      ? (trades.filter((t) => t.status === "closed" && t.pnl > 0).length /
          trades.filter((t) => t.status === "closed").length) *
        100
      : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24 lg:pt-8">
      {/* Header */}
      <div className="mb-6">
        <Card variant="gradient" padding="lg">
          {/* Rotating Banner */}
          {currentBannerData && (
            <div
              className={`bg-gradient-to-r ${currentBannerData.gradient} border ${currentBannerData.borderColor} rounded-2xl p-4 sm:p-6 mb-6 transition-all duration-500 shadow-lg hover:shadow-xl cursor-pointer`}
              {...touchHandlers}
            >
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full font-medium">
                  Featured
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {currentBannerData.title}
                  </h3>
                  {currentBannerData.subtitle && (
                    <p className="text-blue-300 text-sm font-medium mb-2">
                      {currentBannerData.subtitle}
                    </p>
                  )}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {currentBannerData.description}
                  </p>
                </div>
                <a
                  href={currentBannerData.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg text-sm flex-shrink-0"
                >
                  <ButtonIcon className="h-4 w-4" />
                  {currentBannerData.buttonText}
                </a>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30">
              <BarChart3 className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Trade History</h1>
              <p className="text-gray-400">
                Track your trading performance and analyze results
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-green-300 text-sm font-medium">
                  Total P&L
                </span>
              </div>
              <div className="text-2xl font-bold text-green-400">
                {formatCurrency(totalPnL)}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                <span className="text-blue-300 text-sm font-medium">
                  Win Rate
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-400">
                {winRate.toFixed(1)}%
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-purple-400" />
                <span className="text-purple-300 text-sm font-medium">
                  Total Fees
                </span>
              </div>
              <div className="text-2xl font-bold text-purple-400">
                {formatCurrency(totalFees)}
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-orange-400" />
                <span className="text-orange-300 text-sm font-medium">
                  Total Trades
                </span>
              </div>
              <div className="text-2xl font-bold text-orange-400">
                {trades.length}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card variant="gradient" padding="md" className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-400" />
            <div className="flex items-center gap-2">
              {(["all", "open", "closed"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filter === status
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1d">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>

            <Button variant="outline" size="sm" icon={Download}>
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Trades Table */}
      <Card variant="gradient" padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800/30">
                <th className="text-left p-4 text-gray-300 font-medium">
                  Symbol
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">
                  Side
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">
                  Quantity
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">
                  Entry Price
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">
                  Exit Price
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">P&L</th>
                <th className="text-left p-4 text-gray-300 font-medium">
                  Status
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((trade) => (
                <tr
                  key={trade.id}
                  className="border-b border-gray-800/20 hover:bg-gray-800/20 transition-all"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">
                        {trade.symbol}
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                        {trade.broker}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div
                      className={`flex items-center gap-2 ${
                        trade.side === "buy" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {trade.side === "buy" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      <span className="font-medium capitalize">
                        {trade.side}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-white">{trade.quantity}</td>
                  <td className="p-4 text-white">
                    {formatCurrency(trade.entryPrice)}
                  </td>
                  <td className="p-4 text-white">
                    {trade.exitPrice ? formatCurrency(trade.exitPrice) : "-"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`font-medium ${
                        trade.pnl >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {trade.pnl >= 0 ? "+" : ""}
                      {formatCurrency(trade.pnl)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        trade.status === "open"
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-gray-500/20 text-gray-300"
                      }`}
                    >
                      {trade.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">
                    <div>{formatDateTime(trade.openTime)}</div>
                    {trade.closeTime && (
                      <div className="text-xs text-gray-500">
                        Closed: {formatDateTime(trade.closeTime)}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTrades.length === 0 && (
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">No trades found</p>
            <p className="text-gray-500 text-sm">
              {filter === "all"
                ? "Start trading to see your history here"
                : `No ${filter} trades in the selected time period`}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TradeHistoryPage;
