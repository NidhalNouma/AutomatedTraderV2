import React, { useState, useEffect, Fragment } from "react";
import {
  X,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  MoveVertical,
} from "lucide-react";

import { Card, Button } from "../ui";
import { formatCurrency, formatDateTime } from "@/utils";
import { useTrades } from "@/hooks";

interface TradesModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountId: string;
  accountName: string;
}

const TradesModal: React.FC<TradesModalProps> = ({
  isOpen,
  onClose,
  accountId,
  accountName,
}) => {
  const {
    trades,
    totalPnL,
    totalFees,
    winRate,
    filter,
    setFilter,
    filteredTrades,
    isLoading,
    getTrades,
  } = useTrades(accountId);

  useEffect(() => {
    if (isOpen) {
      getTrades();
    }
  }, [isOpen, accountId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card
        variant="gradient"
        className="w-full max-w-7xl max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Trade History</h2>
            <p className="text-gray-400">{accountName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
              <TrendingUp className="h-5 w-5 text-blue-400" />
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
              <TrendingDown className="h-5 w-5 text-purple-400" />
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
              <TrendingUp className="h-5 w-5 text-orange-400" />
              <span className="text-orange-300 text-sm font-medium">
                Total Trades
              </span>
            </div>
            <div className="text-2xl font-bold text-orange-400">
              {trades.length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-400" />
            <div className="flex items-center gap-2">
              {(["all", "open", "closed", "partial"] as const).map((status) => (
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

          <Button variant="outline" size="sm" icon={Download}>
            Export
          </Button>
        </div>

        {/* Trades Table */}
        <div className="overflow-y-auto max-h-[50vh]">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading trades...</p>
            </div>
          ) : filteredTrades.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-2">No trades found</p>
              <p className="text-gray-500 text-sm">
                {filter === "all"
                  ? "No trades available for this account"
                  : `No ${filter} trades found`}
              </p>
            </div>
          ) : (
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
                    <th className="text-left p-4 text-gray-300 font-medium">
                      P&L
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      Status
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      Source
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTrades.map((trade) => (
                    <Row key={trade.id} trade={trade} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TradesModal;

function Row({ trade }: { trade: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Fragment>
      <tr
        key={trade.id}
        onClick={() => setIsExpanded(!isExpanded)}
        className="border-b border-gray-800/20 hover:bg-gray-800/20 transition-all"
      >
        <td className="p-4">
          <span className="font-medium text-white">{trade.symbol}</span>
        </td>
        <td className="p-4">
          <div
            className={`flex items-center gap-2 ${
              trade.side?.toLowerCase() === "buy"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {trade.side?.toLowerCase() === "buy" ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
            <span className="font-medium capitalize">
              {trade.side?.toUpperCase()}
            </span>
          </div>
        </td>
        <td className="p-4 text-white">{trade.volume}</td>
        <td className="p-4 text-white">{trade.entryPrice}</td>
        <td className="p-4 text-white">
          {trade.exitPrice && trade.status == "closed" ? trade.exitPrice : "-"}
        </td>
        <td className="p-4">
          <span
            className={`font-medium ${
              (trade.pnl ?? 0) > 0
                ? "text-green-400"
                : (trade.pnl ?? 0) < 0
                ? "text-red-400"
                : "text-white"
            }`}
          >
            {(trade.pnl ?? 0) > 0 ? "+" : ""}
            {formatCurrency(trade.pnl ?? 0)}
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
        <td className="p-4">
          <span className="text-gray-300 text-sm bg-gray-800/50 px-2 py-1 rounded">
            {trade.source ? trade.source : "NA"}
          </span>
        </td>
        <td className="p-4 text-gray-400 text-sm">
          <div>{formatDateTime(trade.entryTime)}</div>
          {trade.closeTime && trade.status == "closed" && (
            <div className="text-xs text-gray-500">
              Closed: {formatDateTime(trade.closeTime)}
            </div>
          )}
        </td>
        {/* <td className="p-0">
          {trade.closedTrades && trade.closedTrades.length > 0 && (
            <MoveVertical
              className={`h-5 w-5 mt-2 ml-1 inline cursor-pointer ${
                isExpanded ? "transform rotate-180" : ""
              }`}
            />
          )}
        </td> */}
      </tr>

      {isExpanded &&
        trade.closedTrades &&
        trade.closedTrades.length > 0 &&
        trade.closedTrades.map((ct: any, idx: number) => (
          <tr key={idx} className="">
            <Fragment>
              <td colSpan={2} className="p-4"></td>

              <td className="p-4 text-white">{trade.volume}</td>
              <td colSpan={1} className="p-4">
                {trade.entryPrice}
              </td>
              <td className="p-4 text-white">{ct.exitPrice}</td>

              <td className="p-4">
                <span
                  className={`font-medium ${
                    (ct.pnl ?? 0) > 0
                      ? "text-green-400"
                      : (trade.pnl ?? 0) < 0
                      ? "text-red-400"
                      : "text-white"
                  }`}
                >
                  {(ct.pnl ?? 0) > 0 ? "+" : ""}
                  {formatCurrency(ct.pnl ?? 0)}
                </span>
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-300`}
                >
                  closed
                </span>
              </td>
              <td className="p-4">
                <span className="text-gray-300 text-sm bg-gray-800/50 px-2 py-1 rounded">
                  {trade.source ? trade.source : "NA"}
                </span>
              </td>
              <td className="p-4 text-gray-400 text-sm">
                <div>{formatDateTime(trade.entryTime)}</div>
                <div className="text-xs text-gray-500">
                  Closed: {formatDateTime(ct.closeTime)}
                </div>
              </td>
            </Fragment>
          </tr>
        ))}
    </Fragment>
  );
}
