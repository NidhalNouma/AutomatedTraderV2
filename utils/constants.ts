export const APP_BASE_URL = 'http://localhost:3000'
export const WEBHOOK_BASE_URL = 'https://webhook.automatedtrader.com/';

export const servicesURL = {
  webhook: process.env.NEXT_PUBLIC_WEBHOOK_URL,
  publicWebhook: process.env.NEXT_PUBLIC_PUBLIC_WEBHOOK_URL,
  accounts: process.env.NEXT_PUBLIC_ACCOUNTS_URL,
  publicAccounts: process.env.NEXT_PUBLIC_PUBLIC_ACCOUNTS_URL,
};

export const metaApiToken = process.env.NEXT_PUBLIC_META_API_TOKEN;

export const TRADING_PAIRS = [
  { symbol: 'BTCUSDT', name: 'Bitcoin' },
  { symbol: 'ETHUSDT', name: 'Ethereum' },
  { symbol: 'SOLUSDT', name: 'Solana' },
  { symbol: 'ADAUSDT', name: 'Cardano' },
  { symbol: 'DOGEUSDT', name: 'Dogecoin' },
  { symbol: 'XRPUSDT', name: 'Ripple' },
  { symbol: 'NQ1!', name: 'Nasdaq 100' },
  { symbol: 'US30', name: 'Dow Jones' },
  { symbol: 'XAUUSD', name: 'Gold' },
  { symbol: 'EURUSD', name: 'Euro/Dollar' },
  { symbol: 'GBPUSD', name: 'Pound/Dollar' },
  { symbol: 'USDJPY', name: 'Dollar/Yen' },
  { symbol: 'AUDUSD', name: 'Aussie/Dollar' },
  { symbol: 'USDCAD', name: 'Dollar/Canadian' },
  { symbol: 'NZDUSD', name: 'Kiwi/Dollar' },
];

export const BROKER_MONTHLY_COST = 29.00;

export const SUPPORTED_BROKERS = {
  CRYPTO: ['binance', 'binanceus', 'bitget', 'bybit', 'crypto', 'mexc', 'bingx', 'bitmart', 'kucoin', 'coinbase'],
  FOREX: ['metatrader4', 'metatrader5', 'tradelocker'],
  COMING_SOON: ['kraken', 'okx', 'bitmex', 'tradestation', 'acttrader', 'dxtrade', 'ninjatrader'],
};

export const ALERT_MESSAGE_FORMAT = {
  ENTRY_LONG: 'D=Buy A={{ticker}} Q={{qty}} ID={{id}}',
  ENTRY_SHORT: 'D=Sell A={{ticker}} Q={{qty}} ID={{id}}',
  EXIT_LONG: 'X=Buy A={{ticker}} P={{percent}} ID={{id}}',
  EXIT_SHORT: 'X=Sell A={{ticker}} P={{percent}} ID={{id}}',
  STOP_LOSS_LONG: 'X=Sell A={{ticker}} P=100 ID={{id}}',
  STOP_LOSS_SHORT: 'X=Buy A={{ticker}} P=100 ID={{id}}',
};

export const EXTERNAL_LINKS = {
  DISCORD: 'https://discord.gg/uan282DjyE',
  TRUSTED_SIGNALS: 'https://trustedsignals.com',
  ISALGO: 'https://www.isalgo.com',
  LUXALGO: 'https://luxalgo.com',
  CHART_PRIME: 'https://chartprime.com',
  SUPER_EA: 'https://eatrader.com',
  HANKOX: 'https://hankox.com',
  TRADE_ALERTS: 'https://tradealerts.com',
  RENT_AD_SPACE: 'https://whop.com/automated-trader-free/automatedtrader-promo/',
};

export const COINGECKO_API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;