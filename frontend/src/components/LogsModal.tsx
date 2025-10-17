import React, { useState, useEffect } from "react";
import {
  X,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Download,
  Search,
} from "lucide-react";
import { Card, Button } from "@/ui";
import { formatDateTime } from "@/utils";
import { useLogs, type LogEntry } from "@/hooks";

interface LogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountId: string;
  accountName: string;
}

const LogsModal: React.FC<LogsModalProps> = ({
  isOpen,
  onClose,
  accountId,
  accountName,
}) => {
  const {
    filter,
    setFilter,
    isLoading,
    filteredLogs,
    searchTerm,
    setSearchTerm,
    getLogs,
  } = useLogs(accountId);
  useEffect(() => {
    if (isOpen) {
      getLogs();
    }
  }, [isOpen, accountId]);

  const getStatusIcon = (status: LogEntry["status"]) => {
    switch (status) {
      case "S":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "E":
        return <AlertCircle className="h-4 w-4 text-red-400" />;
    }
  };

  const getStatusColor = (status: LogEntry["status"]) => {
    switch (status) {
      case "S":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "E":
        return "bg-red-500/20 text-red-300 border-red-500/30";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card
        variant="gradient"
        className="w-full max-w-6xl max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Activity Logs</h2>
            <p className="text-gray-400">{accountName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-400" />
            <div className="flex items-center gap-2">
              {(["all", "S", "E"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    filter === status
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {status === "E"
                    ? "Error"
                    : status === "S"
                    ? "Success"
                    : "All"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <Button variant="outline" size="sm" icon={Download}>
              Export
            </Button>
          </div>
        </div>

        {/* Logs List */}
        <div className="overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading logs...</p>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-2">No logs found</p>
              <p className="text-gray-500 text-sm">
                {filter === "all"
                  ? "No activity logs available for this account"
                  : `No ${filter} logs found`}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-gray-900/40 rounded-xl p-4 border border-gray-700/30 hover:border-gray-600/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(log.status)}
                      <div>
                        <div className="text-white font-medium">
                          {formatDateTime(log.timestamp)}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {log.executionTime}ms execution time
                        </div>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        log.status
                      )}`}
                    >
                      {log.status === "E" ? "Error" : "Success"}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Alert Message
                      </label>
                      <div className="bg-black/40 rounded-lg p-3 mt-1">
                        <code className="text-sm text-blue-300 font-mono">
                          {log.alertMessage}
                        </code>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Response
                      </label>
                      <div className="bg-black/40 rounded-lg p-3 mt-1">
                        <p className="text-sm text-gray-300">
                          {log.responseMessage}
                        </p>
                      </div>
                    </div>

                    {log.symbol && (
                      <div className="flex items-center gap-4 text-xs">
                        <div>
                          <span className="text-gray-500">Symbol:</span>
                          <span className="text-white ml-2 font-medium">
                            {log.symbol}
                          </span>
                        </div>
                        {log.side && (
                          <div>
                            <span className="text-gray-500">Side:</span>
                            <span
                              className={`ml-2 font-medium ${
                                log.side.toLowerCase() === "buy"
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {log.side.toUpperCase()}
                            </span>
                          </div>
                        )}
                        {log.quantity && (
                          <div>
                            <span className="text-gray-500">Quantity:</span>
                            <span className="text-white ml-2 font-medium">
                              {log.quantity}
                            </span>
                          </div>
                        )}
                        {log.price && (
                          <div>
                            <span className="text-gray-500">Price:</span>
                            <span className="text-white ml-2 font-medium">
                              ${log.price.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default LogsModal;
