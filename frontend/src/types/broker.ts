export type BrokerType = 
  | 'binance' 
  | 'binanceus' 
  | 'bitget' 
  | 'bybit' 
  | 'crypto' 
  | 'mexc' 
  | 'bingx' 
  | 'bitmart' 
  | 'kucoin' 
  | 'coinbase' 
  | 'kraken' 
  | 'okx' 
  | 'bitmex'
  | 'metatrader4' 
  | 'metatrader5' 
  | 'tradelocker' 
  | 'tradestation'
  | 'acttrader'
  | 'hankotrade'
  | 'dxtrade' 
  | 'ninjatrader';

export interface BrokerAccount {
  id: string;
  name: string;
  brokerType: BrokerType;
  category: 'crypto' | 'forex';
  type: string;
  active: boolean;
  customId: string;
  createdAt: string;
  subscriptionId?: string;
  
  // Crypto-specific fields
  apiKey?: string;
  secretKey?: string;
  passPhrase?: string;
  
  // Forex-specific fields
  username?: string;
  password?: string;
  server?: string;
  accountApiId?: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  status: 'success' | 'error';
  alertMessage: string;
  responseMessage: string;
}

export interface Trade {
  id: string;
  status: 'open' | 'closed';
  asset: string;
  side: 'buy' | 'sell';
  amount: number;
  pnl: number;
  fees: number;
  openPrice: number;
  closePrice: number | null;
  openTime: string;
  closeTime: string | null;
  source: string;
}