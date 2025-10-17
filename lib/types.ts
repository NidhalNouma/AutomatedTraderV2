

export interface Account {
  userId: string;
  name: string;
  broker: "tradelocker" | "binance" | "metatrader";
  active: Boolean;
  accountNumber: string;
  accountPassword: string;
  accountPass?: string;
  accountType?: string;
  createdAt?: number;
  updatedAt?: number;
  webhookPath?: string;
  [key: string]: any;
}


export interface Alert {
  userId: string;
  accountId: string;
  tradeId?: string | null;
  title?: string | null;
  message?: string | null;
  status?: 'E' | 'S';
  executionTime?: number | null;
  createdAt?: number;
  updatedAt?: number;
  [key: string]: any;
}

export interface ClosedTrade {
  tradeId: string;
  orderId: string;
  b_side?: string;
  volume: number;
  exitPrice: number;
  closeTime: number;
  fee: number;
  pnl: number;
}

export interface Trade {
  orderId: string;
  tradeId: string;
  userId: string;
  accountId: string;
  customId: string;
  symbol: string;
  side: string;
  b_side?: string;
  volume: number;
  remainingVolume: number;
  entryPrice: number;
  exitPrice?: number;
  status: 'open' | 'closed' | 'partial';
  fee?: number;
  pnl?: number;
  source?: string;
  entryTime: number;
  closeTime?: number;
  currency?: string;
  closedTrades?: ClosedTrade[];
  volumeDigits: number;
  profitDigits: number;
  priceDigits?: number | null;
  [key: string]: any;
  createdAt?: Number;
  updatedAt?: Number;
}


export interface WhopUser {
  user_id: string;
  email?: string;
  name?: string;
  username?: string;
  [key: string]: any;
}
