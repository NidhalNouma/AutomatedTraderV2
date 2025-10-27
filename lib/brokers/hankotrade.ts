import axios from "axios";
import { randomUUID } from "crypto";
import { type Account, type Trade, type ClosedTrade } from "../types";

export class HankoTradeBroker {
  private API_URL: string;
  private accountId?: string;
  private accessToken?: string;
  private currentTrade?: Trade;
  private axiosInstance = axios.create({});

 private username?: string;
 private account?: Account;
 private password?: string;
 private type?: string;

  constructor(
    account?: Account,
    username?: string,
    password?: string,
    type?: string,) {

    if (account) {
        this.username = account.accountNumber
        this.password = account.accountPassword
        this.type = account.accountType
        
        this.account = account
      }
      else {
        this.username = username
        this.password = password
        this.type = type
      }

    const environmentUrl = (["l", "live"].includes(this.type!.toLowerCase())) 
        ? "http://s257.hankotrade.com:10101"
        : "http://s257demo.hankotrade.com:10101";
    this.API_URL = environmentUrl;

  }

  static async checkCredentials(username: string, password: string, type: string): Promise<{ error: string | null; valid: boolean }> {
    
    try {
      const client = new HankoTradeBroker(undefined, username, password, type);
      await client.login()
      
      if (client.accountId && client.accessToken) {
        return { error: null, valid: true };
      } else {
        return { error: "Invalid response from server", valid: false };
      }
    } catch (error: any) {
      const errMsg = error?.response?.data?.error || error?.response?.data?.message || error?.message || error?.code || 'Unknown error occurred';
      return { error: errMsg, valid: false };
    }
  }

  async login(): Promise<void> {
    try {
      const response = await this.axiosInstance.get(`${this.API_URL}/api/v2/auth/token?lifetime=20`, {
        auth: {
          username: this.username!,
          password: this.password!,
        },
      });
      const data = response.data as {
        success: boolean,
        result: string,
        message: string,
      };

      if(data.success !== true) {
        throw new Error(data.message || 'Login failed');
      }
      this.accessToken = data.result;

        const accountInfo = await this.getAccountInfo();
        if (accountInfo) {
            this.accountId = accountInfo.AccountID;
        } else {
            throw new Error("Failed to retrieve account information after login");
        }
    } catch (error: any) {
      const errMsg = error?.response?.data?.error || error?.response?.data?.message || error?.message || error?.code || 'Unknown error occurred';
      console.log(errMsg);
    }
  }

  async getAccountInfo(): Promise<{ [key: string]: any } | undefined> {
    if (!this.accessToken) {
      throw new Error("Not authenticated");
    }
    try {
      const url = `${this.API_URL}/api/v2/account/accounts`;
      const response = await this.axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        params: {
          token: this.accessToken,
        },
      });
      const data = response.data as {
        success: boolean,
        message: string,
        result: { 
            Balance: number,
            Currency: string,
            [key: string]: any 
        }[],
      };
      if (data.success) {
        const accounts = data.result || [];
        if (accounts.length > 0) {
          return accounts[0];
        } else {
          throw new Error("No accounts found.");
        }
      } else {
        throw new Error(`Failed to get account info: ${data.message || "Unknown error"}`);
      }
    } catch (error: any) {
      const errMsg = error?.message || "Unknown error";
      throw new Error(`Get account info Error: ${errMsg}`);
    }
  }

  async getAccountBalance(): Promise<number> {
    const accountInfo = await this.getAccountInfo();
    if (accountInfo && typeof accountInfo.Balance === "number") {
      return accountInfo.Balance;
    }
    throw new Error("Unable to retrieve account balance");
  }

  async getAccountCurrency(): Promise<string> {
    const accountInfo = await this.getAccountInfo();
    if (accountInfo && typeof accountInfo.Currency === "string") {
      return accountInfo.Currency;
    }
    throw new Error("Unable to retrieve account currency");
  }

  adjust_symbol_name(symbol: string): string {
    if (!symbol.endsWith(".HKT")) {
      symbol = symbol + ".HKT";
    }
    return symbol;
  }

  async get_symbol_info(symbol: string) {
    try {
        const adjustedSymbol = this.adjust_symbol_name(symbol);
        const url = `${this.API_URL}/api/v2/market/symbols`;

        const response = await this.axiosInstance.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            params: {
                token: this.accessToken,
                symbol: adjustedSymbol,
            },
        });

        const data = response.data as {
            success: boolean,
            message: string,
            result: { [key: string]: any }[],
        };

        if (data.success) {
        const instruments = data.result || [];
        const instrument = instruments.find(inst => inst.Symbol === adjustedSymbol);
        if (instrument) {
            return instrument;
        }
        throw new Error(`Symbol ${adjustedSymbol} not found.`);
        } else {
        throw new Error(`Failed to get symbol info: ${data.message || "Unknown error"}`);
        }

    } catch (error: any) {
        const errMsg = error?.message || "Unknown error";
        throw new Error(`Get symbol Error: ${errMsg}`);
    }
 }

  async openTrade(symbol: string, side: string, quantity: number, customId: string, startTime: number, source?: string) {
    try {
      await this.login()
      const adjustedSymbol = this.adjust_symbol_name(symbol);
      const symbolInfo = await this.get_symbol_info(adjustedSymbol);
      const contractSize = symbolInfo?.ContractSize || 1;
      const adjustedQuantity = Number(quantity) * Number(contractSize);

      const url = `${this.API_URL}/api/v2/trading/placemarket`;
      const orderType = side.toUpperCase() === "BUY" || side.toUpperCase() === "B" ? 1 : 0;
      const commentary = `${customId}_${randomUUID()}`;

      const params = {
        token: this.accessToken,
        account: this.accountId,
        symbol: adjustedSymbol,
        side: orderType,
        quantity: adjustedQuantity,
        commentary,
      };

      const start = performance.now();
      const response = await this.axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        params,
      });
      const exeTime = Date.now() - startTime;
      const data = response.data as {
        success: boolean,
        message?: string,
        result: {
            OrderId: string,
        },
      };

      if (data.success) {
        const tradeInfo = data.result || {};
        const orderId = tradeInfo.OrderId ? String(tradeInfo.OrderId) : "";
        const orderInfo = await this.getOpenTradeByCustomId(adjustedSymbol!, commentary);

        const trade: Trade = {
            orderId: orderId,
            tradeId: orderInfo?.tradeId,
            customId: customId,
            accountId: this.account?.id!,
            userId: this.account?.userId!,
            symbol,
            side: side,
            b_side: orderType.toString(),
            volume: adjustedQuantity,
            remainingVolume: adjustedQuantity,
            entryPrice: orderInfo?.price ?? 0,
            entryTime: orderInfo?.time ? Number(orderInfo.time) : 0,
            fees: orderInfo?.fees ?? 0,
            pnl: 0,
            currency: orderInfo?.currency,
            exeTime,
            status: 'open',
            source: source ?? '',

            volumeDigits: 2,
            profitDigits: 2,
            priceDigits: null,
        };
        return trade;
      } else {
        throw new Error(`${data.message || "Unknown error"}`);
      }
    } catch (error: any) {
      const errMsg = error?.response?.data?.message || error?.message || "Unknown error";
      throw new Error(`Open trade Error: ${errMsg}`);
    }
  }

  async closeTrade(oTrade: Trade, quantity: number, startTime: number) {
    try {
      await this.login()
      const adjustedSymbol = this.adjust_symbol_name(oTrade.symbol);
      const adjustedQuantity = Number(quantity);

      let volumeToClose = Number(oTrade.remainingVolume)
      if (adjustedQuantity > 0)
        volumeToClose = volumeToClose * adjustedQuantity / 100;

      const url = `${this.API_URL}/api/v2/trading/closetrade`;
      const orderType = oTrade.side.toUpperCase() === "BUY" || oTrade.side.toUpperCase() === "B" ? 0 : 1;

      const params = {
        token: this.accessToken,
        trade: oTrade?.tradeId,
        symbol: adjustedSymbol,
        side: orderType,
        quantity: volumeToClose,
      };

      const response = await this.axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        params,
      });
      const exeTime = Date.now() - startTime;
      const data = response.data as {
        success: boolean,
        message?: string,
      };

      if (data.success) {
        const orderId = oTrade?.tradeId;
        const closedPositions = await this.getClosedTrades(adjustedSymbol, orderId!);
        console.log(closedPositions)

        const closedTrades: ClosedTrade[] = closedPositions.map((pos: any) => ({
          tradeId: pos.tradeId,
          orderId: pos.tradeId,
          side: pos.side,
          volume: pos.volume,
          exitPrice: pos.closePrice,
          closeTime: Number(pos.closeTime),
          fee: Math.abs(Number(pos.fees)),
          pnl: Number(pos.profit),
        }));
        const rTrade: Trade = {
          ...oTrade!,
          exeTime,
          closedTrades,
        };
        return {
          message: `Trade closed for order ID ${rTrade.orderId}.`,
          trade: rTrade,
          exeTime,
        };
      } else {
        throw new Error(data.message || "Unknown error");
      }
    } catch (error: any) {
      const errMsg = error?.response?.data?.message || error?.message || "Unknown error";
      throw new Error(`Close trade Error: ${errMsg}`);
    }
  }

  async getOpenTradeByCustomId(symbol: string, customId: string): Promise<any> {
    try {
        const adjustedSymbol = this.adjust_symbol_name(symbol);
        const url = `${this.API_URL}/api/v2/trading/opentrades`;

        const response = await this.axiosInstance.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            params: {
                token: this.accessToken,
            },
        });

        const data = response.data as {
            success: boolean,
            message?: string,
            result: { [key: string]: any }[],
        };

        if (data.success) {
        const openTrades = data.result || [];
        const trade = openTrades.find((t: any) => t.Commentary === customId);
        if (!trade) return null;

        const timeStr = trade.OpenTime;
        const time = timeStr ? new Date(timeStr).getTime() : null;

        return {
            tradeId: trade.TradeID,
            symbol: trade.Symbol,
            side: trade.Side === 1 ? "BUY" : "SELL",
            qty: trade.Quantity,
            price: trade.Price,
            time,
            fees: (trade.Commission || 0) + (trade.Interest || 0),
            currency: await this.getAccountCurrency(),
        };
        } else {
        throw new Error(`${data.message || "Unknown error"}`);
        }
    } catch (error: any) {
        const errMsg = error?.response?.data?.message || error?.message || "Unknown error";
        throw new Error(`Get trade error: ${errMsg}`);
    }
 }

 async getOpenTrade(symbol: string, tradeId: string): Promise<any> {
  try {
    const adjustedSymbol = this.adjust_symbol_name(symbol);
    const url = `${this.API_URL}/api/v2/trading/opentrades`;

    const response = await this.axiosInstance.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      params: {
        token: this.accessToken,
      },
    });

    const data = response.data as {
        success: boolean,
        message?: string,
        result: { [key: string]: any }[],
    };

    if (data.success) {
      const openTrades = data.result || [];
      const trade = openTrades.find((t: any) => String(t.TradeID) === String(tradeId));

      if (!trade) throw new Error(`Open trade with ID ${tradeId} not found.`);

      const timeStr = trade.OpenTime;
      const time = timeStr ? new Date(timeStr).getTime() : null;

      return {
        trade_id: trade.TradeID,
        symbol: trade.Symbol,
        side: trade.Side === 1 ? "BUY" : "SELL",
        qty: trade.Quantity,
        price: trade.Price,
        time,
        fees: (trade.Commission || 0) + (trade.Interest || 0),
        currency: await this.getAccountCurrency(),
      };
    } else {
      throw new Error(`${data.message || "Unknown error"}`);
    }
  } catch (error: any) {
    const errMsg = error?.response?.data?.message || error?.message || "Unknown error";
    throw new Error(`Get open trade error: ${errMsg}`);
  }
}

async getClosedTrades(symbol: string, tradeId: string, fromDate?: string, toDate?: string): Promise<any[]> {
  try {
    const adjustedSymbol = this.adjust_symbol_name(symbol);
    const url = `${this.API_URL}/api/v2/trading/tradehistory`;

    const params: any = {
      token: this.accessToken,
      account: this.accountId,
      tradeID: tradeId,
    };

    if (fromDate) params.from = fromDate;
    if (toDate) params.to = toDate;

    const response = await this.axiosInstance.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      params,
    });

    const data = response.data as {
        success: boolean,
        message?: string,
        result: { [key: string]: any }[],
    };

    if (data.success) {
      const closedTrades = data.result || [];

      const responseTrades = closedTrades.map((trade: any) => {
        const openTime = trade.OpenTime ? new Date(trade.OpenTime).getTime() : null;
        const closeTime = trade.CloseTime ? new Date(trade.CloseTime).getTime() : null;

        return {
          tradeId: trade.TradeID,
          symbol: trade.Symbol,
          side: trade.Side === 1 ? "BUY" : "SELL",
          volume: trade.Quantity,
          openPrice: trade.OpenPrice,
          closePrice: trade.ClosePrice,
          openTime: openTime,
          closeTime: closeTime,
          fees: (trade.Commission || 0) + (trade.Interest || 0),
          profit: trade.ProfitLoss,
        };
      });

      responseTrades.sort((a, b) => (a.closeTime || 0) - (b.closeTime || 0));
      return responseTrades;
    } else {
      throw new Error(`${data.message || "Unknown error"}`);
    }
  } catch (error: any) {
    const errMsg = error?.response?.data?.message || error?.message || "Unknown error";
    throw new Error(`Get closed trades Error: ${errMsg}`);
  }
}

}
