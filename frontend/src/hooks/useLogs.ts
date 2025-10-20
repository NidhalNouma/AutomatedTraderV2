import { useState, useEffect } from 'react';
import { getAlertsByUserAndAccountId } from "@/lib/alerts-db";
import { useWhop } from '@/context';
import { extractAlertData, type AlertData } from "@/lib/alerts"
import { type Alert } from "@/lib/types"


export interface LogEntry {
  id: string;
  timestamp: string;
  status: "E" | "S";
  alertMessage: string;
  responseMessage: string;
  executionTime: number;
  symbol: string;
  side: "BUY" | "SELL";
  quantity: string;
  price?: number;
}


export function useLogs(accountId: string) {
  const {whopUser} = useWhop()
    
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<"all" | "S" | "E" >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filteredLogs = logs.filter((log) => {
    const matchesFilter = filter === "all" || log.status === filter;
    const matchesSearch =
      searchTerm === "" ||
      log.alertMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.responseMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.symbol &&
        log.symbol.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });
    
    const getLogs = async () => {
        if (!whopUser || !accountId) return;
        setIsLoading(true)

        const alerts = await getAlertsByUserAndAccountId(whopUser.id, accountId)

        const rlogs = alerts.map((alert: Alert) => { 
            const alertData:AlertData = extractAlertData(alert.title!)
            const log: LogEntry = {
                id: alert.id,
                timestamp: new Date(alert.createdAt!).toISOString(),
                status: alert.status!,
                alertMessage: alert.title!,
                responseMessage: alert.message!,
                executionTime: alert.executionTime!,
                symbol: alertData.Asset!,
                side: alertData.Type!,
                quantity:alertData.Volume ? alertData.Volume.toString() : "",
            }

            return log
        })
        setLogs(rlogs)
        setIsLoading(false)
  }

    return {
        filter,
        setFilter,
        isLoading,
        filteredLogs,
        searchTerm,
        setSearchTerm,
        getLogs,
  }
}