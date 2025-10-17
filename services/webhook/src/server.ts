import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { getAccountByWebhook } from "./lib/accounts-db"
import { extractAlertData, checkAlertData, type AlertData } from "./lib/alerts"
import { saveAlert } from './lib/alerts-db'
import { type Alert, type Trade } from './lib/types'

import { servicesURL } from './utils/constants'
import axios from "axios";

const app = express();
const PORT = process.env.WEBHOOK_PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.text({ type: '*/*' }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Webhook server running!");
});

app.post("/:id", async (req: Request, res: Response) => {
  try {
    const start = Date.now();
    const { id } = req.params;
    // console.log(id)
    const account = await getAccountByWebhook(id);

    if (!account) {
      return res.status(404).send("Account not found");
    }

    if (!account.active) {
      return res.status(404).send("Account is not active");
    }

    const bodyText = req.body;

    let alert: Alert = {
      userId: account.userId,
      accountId: account.id,
      title: bodyText,
      tradeId: null,
      message: "",
      executionTime: null,
      tradeExecutionTime: null
    }
    let trade: Trade | null = null;

    try {
      const alertData: AlertData = extractAlertData(bodyText)
      checkAlertData(alertData)


      const tradeReq = await axios.post(`${servicesURL.accounts}/trade`, {
        account: account,
        data: alertData,
        startTime: start
      })
      
      trade = tradeReq.data as any
      if(trade) {
        if (trade.error) throw new Error(trade.error)
        if (trade.id) {
          alert.tradeId = trade.id;
          alert.message = 'Successfully executed.'
          alert.status = 'S';
          alert.tradeExecutionTime = trade.exeTime
        }
      }
      
    } catch (error: any) {
      const errMsg = error?.response?.data?.error || error?.response?.data?.message || error?.message || error?.code || 'Unknown error occurred';
      console.error("Error exe trade:", errMsg);
      alert.message = `${errMsg}`;
      alert.status = 'E';
    }
    const end = Date.now();
    const duration = Date.now() - start;

    alert.executionTime = duration
    
    const alertDb = await saveAlert(alert)
      
    res.status(200).json({alert, trade})
  } catch (error: any) {
    const errMsg = error?.response?.data?.error || error?.response?.data?.message || error?.message || error?.code || 'Unknown error occurred';
    console.error("Error sending trade:", errMsg);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});