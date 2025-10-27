
export const servicesURL = {
  publicFrontend: process.env.NEXT_PUBLIC_PUBLIC_FRONTEND_URL,
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
  DISCORD: 'https://discord.gg/jsM4m3fApc',
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



interface PricePlan {
  id: string;
  name: string;
  price: string;
  accounts: number;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  cta: string;
  highlight: string;
  link: string;
  color: string;
  current?: boolean;
}

export const pricingPlans:PricePlan[] = [
  {

    id: "prod_rYPTb6ExOywaT",
    name: "Basic",
    price: "$29",
    accounts: 1,
    period: "/month",
    description: "Perfect for individual traders getting started",
    features: [
      "1 Broker Account",
      "Alert Playground Access",
      "Charts Hub & Live Data",
      "Trading News Feed",
      "Basic Trade History",
      "Email Support",
      "Discord Community Access",
    ],
    popular: false,
    cta: "Upgrade to Basic",
    highlight: "Most Popular for Beginners",
    link: "https://whop.com/automated-trader-free/automated-trader/",
    color: "from-gray-500 to-gray-600",
  },
  {
    id: "prod_z0dGVEd6S0W1f",
    name: "Pro",
    price: "$79",
    accounts: 4,
    period: "/month",
    description: "For serious traders and growing portfolios",
    features: [
      "4 Broker Accounts",
      "Advanced Alert Templates",
      "Premium Market Data",
      "Advanced Analytics",
      "Priority Support",
      "Custom Webhook URLs",
      "Risk Management Tools",
      "Portfolio Tracking",
      "Real Trader Reviews",
    ],
    popular: true,
    cta: "Upgrade to Pro",
    highlight: "Best Value",
    link: "https://whop.com/automated-trader-free/automatedtrader/",
    color: "from-blue-500 to-purple-500",
  },
  {
    id: "prod_FkIozybpbMTmC",
    name: "Advanced",
    price: "$199",
    accounts: 10,
    period: "/month",
    description: "For trading firms and institutions",
    features: [
      "10 Broker Accounts",
      "Custom Integrations",
      "Dedicated Account Manager",
      "24/7 Phone Support",
      "Advanced Security Features",
      "Custom Reporting",
      "SLA Guarantee",
      "Team Management",
      "API Access",
    ],
    popular: false,
    cta: "Upgrade to Advanced",
    highlight: "Enterprise Grade",
    link: "https://whop.com/automated-trader-free/automated-trader-advanced/",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "prod_79euYQ959oTPJ",
    name: "Lifetime",
    price: "$2,999",
    accounts: 400,
    period: "one-time",
    description: "Pay once, own forever",
    features: [
      "Unlimited Broker Accounts",
      "All Advanced Features",
      "Lifetime Updates",
      "Priority Support Forever",
      "Custom Integrations",
      "Advanced Security Features",
      "Custom Reporting",
      "Team Management",
      "API Access",
      "Early Access to New Features",
    ],
    popular: false,
    current: false,
    cta: "Get Lifetime Access",
    highlight: "Best Deal",
    link: "https://whop.com/automated-trader-free/automated-trader-lifetime/",
    color: "from-yellow-500 to-orange-500",
  },
];