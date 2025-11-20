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
        data.Volume = parseVolumeExpression(value!).toString();
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

  // console.log("Extracted alert data:", data);

  return data;
}

export function checkAlertData(alertData: AlertData) {
  if (!alertData.Action || !alertData.Asset || !alertData.Type || !alertData.ID) {
    throw new Error("Invalid alert body");
  }
}

function parseVolumeExpression(input: string): number {
  try {
    let expr = input.trim();
    let digits: number | null = null;

    // Check for %<digits> (rounding instruction)
    if (expr.includes("%")) {
      const parts = expr.split("%");
      expr = parts[0].trim();
      digits = parts[1] ? parseInt(parts[1], 10) : 0;
    }

    // Validate allowed characters: digits, ., *, /, spaces
    if (!/^[0-9.\*\/\s]+$/.test(expr)) {
      throw new Error(`Invalid volume expression: ${expr}`);
    }

    // Safe evaluation of math operators (* and / only)
    // We avoid using eval by converting to a real expression parser
    const result = evaluateSimpleExpression(expr);

    if (result === null || isNaN(result)) {
      throw new Error(`Invalid expression: ${expr}`);
    }

    // Apply rounding if digits provided
    return digits !== null ? Number(result.toFixed(digits)) : result;

  } catch (e: any) {
    throw new Error(`Error parsing volume '${input}': ${e.message}`);
  }
}


// ----------- Helper: Safe evaluator for numbers, *, / -----------
function evaluateSimpleExpression(expr: string): number {
  // Split into tokens by * and /
  const tokens = expr.split(/([*\/])/).map(t => t.trim()).filter(Boolean);

  if (tokens.length === 0) return 0;

  let value = parseFloat(tokens[0]);
  if (isNaN(value)) throw new Error(`Invalid number: ${tokens[0]}`);

  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i];
    const num = parseFloat(tokens[i + 1]);

    if (isNaN(num)) throw new Error(`Invalid number: ${tokens[i + 1]}`);

    if (op === "*") value *= num;
    else if (op === "/") value /= num;
    else throw new Error(`Invalid operator: ${op}`);
  }

  return value;
}