import express, { Request, Response } from "express";
import cors from "cors";

import { TradeLockerClient } from "./lib/brokers";
import { saveTrade, getTradeByDetails, updateClosingTrade } from "./lib/trades-db";
import { type Account, type Trade } from './lib/types'
import { checkAlertData, type AlertData } from './lib/alerts'


const app = express();
const PORT = process.env.WEBHOOK_PORT || 4001;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Accounts server running!");
});

app.post("/check", async (req: Request, res: Response) => {
  try {
    const { broker, val1, val2, val3, type } = req.body;
    
    if (broker === 'tradelocker') {
        if (!val1 || !val2 || !val3 || !type) {
            return res.status(400).json({ error: "Missing required fields" });
    }
          
//   console.log(val1, val2, val3, type)
            
    const result = await TradeLockerClient.checkCredentials(val1, val2, val3, type);
    console.log(result)
    return res.json(result);
    }
    return res.status(400).json({ error: 'Invalid broker.' });
  } catch (error: any) {
    console.error("Error checking credentials:", error);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/trade", async (req: Request, res: Response) => {
  try {
    let { account, data, startTime } = req.body as { account: Account; data: AlertData; startTime?: number };

    console.log(data);
    if (!startTime) startTime = Date.now();

    let opendTrade: Trade | null = null;
    let closedTrade: Trade | null = null;

    if (account.broker === "tradelocker") {
      const acc = new TradeLockerClient(account);

      if (data.Action === "Entry") {
        // ✅ Ensure all args are typed properly
        const tr = await acc.openTrade(
          data.Asset!,
          data.Type!,
          Number(data.Volume!),
          data.ID || "",
          startTime ?? Date.now(),
          data.Source || ""
        );

        if ((tr as any).error) throw new Error((tr as any).error);
        opendTrade = tr as Trade;
      } else if (data.Action === "Exit") {
        // ✅ Ensure params are non-null strings
        const oTrade = await getTradeByDetails(
          account.id,
          account.userId,
          data.ID || "",
          data.Asset || ""
        );

        if (!oTrade) throw new Error(`No trade available with ID ${data.ID} to close.`);

        // ✅ Ensure Partial is numeric
        const tr = await acc.closeTrade(oTrade, Number(data.Partial) || 0);
        if ((tr as any).error) throw new Error((tr as any).error);
        closedTrade = (tr as any).trade ? ((tr as any).trade as Trade) : null;
      }
    }

    if (opendTrade) {
      const sTrade = await saveTrade(opendTrade);
      return res.json(sTrade);
    }

    if (closedTrade) {
      const cTrade = await updateClosingTrade(closedTrade);
      return res.json(cTrade);
    }

    return res.status(400).json({ error: "Invalid broker." });
  } catch (error: any) {
    console.error("Error placing/closing trade:", error);
    return res.status(400).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});