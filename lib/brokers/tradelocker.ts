import axios from "axios";
import { type Account, type Trade, type ClosedTrade } from "../types";

export class TradeLockerClient {
  private baseUrl: string;
  private token?: string;
    
    private username?: string;
    private account?: Account;
    private password?: string;
    private server?: string;
    private type?: string;
    private accountId?: string;
    private accNum?: string;
    private currency?: string;
    
    private configs?: Object;

   constructor(
    account?: Account,
    username?: string,
    password?: string,
    server?: string,
    type?: string,
   ) {
      if (account) {
          this.username = account.accountNumber
          this.password = account.accountPassword
          this.server = account.accountPass
          this.type = account.accountType
          
          this.account = account
      }
      else {
        this.username = username
        this.password = password
        this.server = server
        this.type = type
      }

    const environmentUrl = (["l", "live"].includes(this.type!.toLowerCase())) 
        ? "https://live.tradelocker.com"
        : "https://demo.tradelocker.com";
    this.baseUrl = environmentUrl;
      
  }

  private async login(): Promise<void> {
    try {
      const res = await axios.post(`${this.baseUrl}/backend-api/auth/jwt/token`, {
        email: this.username,
        password: this.password,
        server: this.server,
      });
      
      const data = res.data as {
            accessToken: string,
            refreshToken: string,
            expireDate: string,
      }
      
      this.token = data.accessToken;
  
      const { accounts, firstId, currency, accNum } = await this.getAccounts()
  
      this.accountId = firstId.toString()
      this.currency = currency
      this.accNum = accNum

    } catch (error: any) {
      const errMsg = error?.response?.data?.error || error?.response?.data?.message || error?.message || error?.code || 'Unknown error occurred';
      console.log(errMsg)
    }
  }

  private async getAccounts() {
    const res = await axios.get(`${this.baseUrl}/backend-api/auth/jwt/all-accounts`, {
        headers: { Authorization: `Bearer ${this.token}` },
    });
    const accounts = (res.data as any).accounts as any[];

    let r = {
      accounts,
      currency: "",
      accNum: "",
      firstId: []
    }

    if (accounts.length > 0){
      r.firstId = accounts[0].id
      r.currency = accounts[0].currency
      r.accNum = accounts[0].accNum
    }

    return r
  }

  // -------- STATIC --------
  static async checkCredentials(
    username: string,
    password: string,
    server: string,
    type: string
  ) {
    try {
      const client = new TradeLockerClient(undefined, username, password, server, type);
      await client.login();

      if (client.accountId) {
        return { message: "API credentials are valid.", valid: true };
      } else {
        return { error: "Failed to retrieve accounts.", valid: false };
      }
    } catch (e: any) {
      return { error: e.message, valid: false };
    }
  }

  // -------- TRADING --------
  async openTrade(symbol: string, side: string, quantity: number, customId: string, startTime: number, source?: string) {
    try {
      await this.login()

      const { instrumentId, instrumentRooutes } = await this.getSymbolId(symbol)

      const route = instrumentRooutes.find((route: { type: string; id: number }) => route.type === "TRADE");
      
      if (!route) throw new Error("TRADE route not found for this instrument.");
      const routeId = route.id;
      
      const orderRes = await axios.post(
        `${this.baseUrl}/backend-api/trade/accounts/${this.accountId}/orders`,
        {
          tradableInstrumentId: instrumentId,
          qty: quantity,
          side: side.toLowerCase(),
          type: "market",
          validity: "IOC",
          routeId
        },
        { headers: { Authorization: `Bearer ${this.token}`, accNum: this.accNum } }
      ) as any;

      const exeTime = Date.now() - startTime;
        
      const orderResData = orderRes.data?.d as any
      const orderId = orderResData?.orderId;
      if (!orderId) throw new Error("Failed to open trade.");

      const order = await this.getOrder(orderId, instrumentId)
      
      const positionId = order?.positionId
      
      const positions = await this.getOpenPosition()
      
      const position = positions.find(pos => pos.id === positionId)
      
      // console.log(orderResData, order, position)

      const trade: Trade = {
        orderId: orderId,
        tradeId: positionId,
        customId: customId,
        accountId: this.account!.id!,
        userId: this.account!.userId!,
        symbol,
        side: side,
        b_side: order?.side ?? side,
        volume: order?.qty ?? quantity,
        remainingVolume: order?.qty ?? quantity,
        entryPrice: order?.price ?? 0,
        entryTime: Number(order?.createdDate),
        fees: order?.fees ?? 0,
        pnl: 0,
        currency: this.currency,
        exeTime,
        status: 'open',
        source: source ?? '',

        volumeDigits: 2,
        profitDigits: 2,
        priceDigits: null,

        tradableInstrumentId: order?.tradableInstrumentId ?? instrumentId,
      };

      return trade;
    } catch (e: any) {
      console.error("Error:", e);
      return { error: e.message };
    }
  }

  async closeTrade(trade: Trade, partial: number|undefined|null, startTime: number) {
    try {
      await this.login()

      if (!trade) throw new Error("Trade must be availble.");
      if (trade.remainingVolume <= 0) throw new Error("Trade was fully closed.");

      let quantity = trade.remainingVolume;
      if(partial) quantity = trade.volume * partial / 100;
      if(quantity > trade.remainingVolume) quantity = trade.remainingVolume;

      if (quantity < 0.01) throw new Error("Quantity must be greater than 0.01.");

      // console.log(trade, partial, quantity)

      const closeReq = (await axios.request({
        method: 'DELETE',
        url: `${this.baseUrl}/backend-api/trade/positions/${trade.tradeId}`,
        data: { qty: quantity },
        headers: { Authorization: `Bearer ${this.token}`, accNum: this.accNum }
      })) as { data?: { errmsg?: string } };

      if (closeReq.data?.errmsg) throw new Error(closeReq.data.errmsg);

      const exeTime = Date.now() - startTime;

      const positions = await this.getClosedPositionsById(trade.tradeId);
      // console.log(positions)

      const closedTrades:ClosedTrade[] = positions.map((pos:any) => {
        return {
          tradeId: pos.positionId,
          orderId: pos.closeOrderId,
          b_side: pos.positionSide,
          volume: pos.closeAmount,
          exitPrice: pos.closePrice,
          closeTime: Number(pos.closeMilliseconds),
          fee: Math.abs(Number(pos.swap)) + Math.abs(Number(pos.commission)),
          pnl: Number(pos.profit)
        } as ClosedTrade
      })

      const rTrade: Trade = {
        ...trade,
        exeTime,
        closedTrades: closedTrades
      }

      return {
          message: `Trade closed for order ID ${trade.orderId}.`,
          trade: rTrade,
          exeTime: exeTime,
        };
    } catch (e: any) {
      console.error("Error closing trade:", e);
      return { error: e.message };
    }
  }

  // -------- UTILITIES --------

  async getConfg() {
    try {
      if (this.configs)
        return this.configs

      const req = await axios.get(
        `${this.baseUrl}/backend-api/trade/config`,
        {
          headers: { Authorization: `Bearer ${this.token}`, accNum: this.accNum }
        }
      );

      const data = req.data as any
      const config = data?.d;
      this.configs = config;
      return config;
    } catch (e) {
      console.error('Get config error ', e)
      return null
    }
  }

  private mapDicToObjects(columns: any[], dic: any[][]) {
    const keys = columns.map((col: any) => col.id);
    return dic.map((orderArray: any[]) => {
      const orderObj: Record<string, any> = {};
      keys.forEach((key, index) => {
        orderObj[key] = orderArray[index] ?? null;
      });
      return orderObj;
    });
  }

  async getSymbolId(symbol: string) {
    // Find instrument ID by symbol
      const instRes = await axios.get(`${this.baseUrl}/backend-api/trade/accounts/${this.accountId}/instruments`, {
        headers: { Authorization: `Bearer ${this.token}`, 'accNum': this.accNum },
      }) as any;
        
      const instruments = instRes.data?.d?.instruments as any[] | undefined
        
      const instrument = instruments?.find((i: any) => i.name === symbol);
    
      if (!instrument) throw new Error(`Symbol ${symbol} not found.`)
    return {
      instrumentId: instrument.tradableInstrumentId,
      instrumentRooutes: instrument.routes
    };
  }

  async getOrder(orderId: string, tradableInstrumentId: Number) {
    try {
      const req = await axios.get(
        `${this.baseUrl}/backend-api/trade/accounts/${this.accountId}/ordersHistory`,
        {
          params: { tradableInstrumentId },
          headers: { Authorization: `Bearer ${this.token}`, accNum: this.accNum }
        }
      );

      const data = req.data as any
      const orders = data?.d?.ordersHistory || [];

      if (orders.length > 0) {
        const config = await this.getConfg();
        const columns = config.ordersConfig.columns;
        const formattedOrders = this.mapDicToObjects(columns, orders);

        // console.log("Formatted orders:", formattedOrders);

        const order = formattedOrders.find(o => o.id === orderId)
        return order
      }

      return null;
    } catch (e) {
      console.error('Get position Id error ', e)
      return null
    }
  }

  async getOpenPosition() {
    try {
      const req = await axios.get(
        `${this.baseUrl}/backend-api/trade/accounts/${this.accountId}/positions`,
        { headers: { Authorization: `Bearer ${this.token}`, accNum: this.accNum } }
      );

      const data = req.data as any
      const positions = data?.d?.positions || [];

      if (positions.length > 0) {
        const config = await this.getConfg();
        const columns = config.positionsConfig.columns;
        const formattedPositions = this.mapDicToObjects(columns, positions);
        return formattedPositions
      }
      
      return [];
    } catch (e) {
      console.error('Get positions error ', e)
      return[]
    }
  }

  async getClosedPosition() {
    try {
      const req = await axios.get(
        `${this.baseUrl}/backend-api/trade/reports/close-trades-history`,
        { headers: { Authorization: `Bearer ${this.token}`, accNum: this.accNum } }
      );

      const data = req.data as any
      const positions = data?.data || [];
      return positions;
    } catch (e) {
      console.error('Get closed positions error ', e)
      return[]
    }
  }

  async getClosedPositionsById(positionId:string) {
    try {
      const totalPositions = await this.getClosedPosition()
      const positions = totalPositions.filter((pos:any) => pos.positionId === positionId);
      return positions;
    } catch (e) {
      console.error('Get closed positions id error ', e)
      return[]
    }
  }
}