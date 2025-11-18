export interface AlertData {
  Action?: "Entry" | "Exit";
  Type?: "BUY" | "SELL";
  Asset?: string;
  Volume?: string;
  Partial?: string;
  ID?: string;
  Source?: string;
}

export function extractAlertData(alertMessage: string): AlertData {
  const data: AlertData = {};

  /**
   * Splits strings like:
   *  "D=BUY A=BTC-PERP INTX V=10 ID=4 SR=1"
   * into:
   *  ["D=BUY", "A=BTC-PERP INTX", "V=10", "ID=4", "SR=1"]
   */

  if (!alertMessage || typeof alertMessage !== "string" || alertMessage.trim() === "") {
    return data;
  }
  const pattern = /([A-Z]+=.*?)(?=\s+[A-Z]+=|$)/g;
  const parts = alertMessage.match(pattern) || [];

  for (const part of parts) {
    const [keyRaw, valueRaw] = part.split("=", 2);
    const key = keyRaw.trim().toUpperCase();
    const value = valueRaw?.trim();

    switch (key) {
      case "D":
        data.Action = "Entry";
        if (value.toUpperCase() === "BUY" || value.toUpperCase() === "SELL") {
          data.Type = value.toUpperCase() as 'BUY' | 'SELL';
        }
        break;
      case "X":
        data.Action = "Exit";
        if (value.toUpperCase() === "BUY" || value.toUpperCase() === "SELL") {
          data.Type = value.toUpperCase() as 'BUY' | 'SELL';
        }
        break;
      case "A":
        data.Asset = value?.toUpperCase();
        break;
      case "V":
      case "Q":
        data.Volume = value;
        break;
      case "P":
        data.Partial = value;
        break;
      case "ID":
        data.ID = value;
        break;
      case "ST":
      case "ST_ID":
      case "SR":
        data.Source = value;
        break;
      default:
        break;
    }
  }

  return data;
}

export function checkAlertData(alertData: AlertData) {
  if (!alertData.Action || !alertData.Asset || !alertData.Type || !alertData.ID) {
    throw new Error("Invalid alert body");
  }
}