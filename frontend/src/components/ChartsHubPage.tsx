import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Search,
  Filter,
  RefreshCw,
  BarChart3,
  Globe,
  DollarSign,
  Activity,
  Star,
  Eye,
  Zap,
  Target,
  Award,
  Crown,
  Rocket,
  Diamond,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Play,
  Bookmark,
  Share2,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Layers,
  LineChart,
  PieChart,
  Smartphone,
  Monitor,
  Tablet,
  Plus,
  Wrench,
} from "lucide-react";
import { Card } from "../ui";
import { getBannersByCategory, getBannerById } from "../hooks/banners";
import { useBanner } from "../hooks/useBanner";
import { COINGECKO_API_KEY } from "@/utils/constants";

interface Asset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  marketCap: number;
  category:
    | "crypto"
    | "forex"
    | "stocks"
    | "commodities"
    | "futures"
    | "indices";
  logo: string;
  color: string;
  description: string;
  popularity: "high" | "medium" | "low";
  tradingViewSymbol: string;
  coinGeckoId?: string;
  isLoading?: boolean;
}

interface TradingTool {
  id: string;
  name: string;
  description: string;
  category:
    | "charting"
    | "indicators"
    | "bots"
    | "analysis"
    | "news"
    | "education"
    | "our-tools";
  logo: string;
  rating: number;
  users: string;
  price: "Free" | "Paid" | "Freemium";
  features: string[];
  link: string;
  color: string;
  gradient: string;
  borderColor: string;
  popular: boolean;
  featured?: boolean;
}

interface MarketOverview {
  totalMarketCap: number;
  totalVolume: number;
  btcDominance: number;
  fearGreedIndex: number;
  activeCoins: number;
  marketCapChange24h: number;
}

type AssetCategory =
  | "crypto"
  | "forex"
  | "stocks"
  | "commodities"
  | "futures"
  | "indices";

const ChartsHubPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<AssetCategory>("crypto");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceData, setPriceData] = useState<{ [key: string]: any }>({});
  const [isLoadingPrices, setIsLoadingPrices] = useState(true);
  const [lastPriceUpdate, setLastPriceUpdate] = useState<Date | null>(null);

  const assets: Asset[] = [
    {
      id: "bitcoin",
      symbol: "BTC",
      name: "Bitcoin",
      price: 43250.0,
      change24h: 1250.0,
      changePercent24h: 2.98,
      volume24h: 28500000000,
      marketCap: 847000000000,
      category: "crypto",
      logo: "₿",
      color: "bg-orange-500",
      description: "The first and largest cryptocurrency by market cap",
      popularity: "high",
      tradingViewSymbol: "BINANCE:BTCUSDT",
      coinGeckoId: "bitcoin",
      isLoading: false,
    },
    {
      id: "ethereum",
      symbol: "ETH",
      name: "Ethereum",
      price: 2650.0,
      change24h: 85.5,
      changePercent24h: 3.34,
      volume24h: 15200000000,
      marketCap: 318000000000,
      category: "crypto",
      logo: "Ξ",
      color: "bg-blue-600",
      description:
        "Leading smart contract platform and second-largest cryptocurrency",
      popularity: "high",
      tradingViewSymbol: "BINANCE:ETHUSDT",
      coinGeckoId: "ethereum",
      isLoading: false,
    },
    {
      id: "solana",
      symbol: "SOL",
      name: "Solana",
      price: 98.5,
      change24h: 4.25,
      changePercent24h: 4.51,
      volume24h: 2800000000,
      marketCap: 42000000000,
      category: "crypto",
      logo: "◎",
      color: "bg-purple-600",
      description:
        "High-performance blockchain supporting decentralized apps and crypto-currencies",
      popularity: "high",
      tradingViewSymbol: "BINANCE:SOLUSDT",
      coinGeckoId: "solana",
      isLoading: false,
    },
    {
      id: "cardano",
      symbol: "ADA",
      name: "Cardano",
      price: 0.485,
      change24h: 0.015,
      changePercent24h: 3.19,
      volume24h: 450000000,
      marketCap: 17000000000,
      category: "crypto",
      logo: "₳",
      color: "bg-blue-800",
      description:
        "Proof-of-stake blockchain platform focused on sustainability and scalability",
      popularity: "medium",
      tradingViewSymbol: "BINANCE:ADAUSDT",
      coinGeckoId: "cardano",
      isLoading: false,
    },
    {
      id: "polkadot",
      symbol: "DOT",
      name: "Polkadot",
      price: 7.25,
      change24h: 0.18,
      changePercent24h: 2.55,
      volume24h: 180000000,
      marketCap: 9500000000,
      category: "crypto",
      logo: "●",
      color: "bg-pink-600",
      description: "Multi-chain protocol enabling cross-blockchain transfers",
      popularity: "medium",
      tradingViewSymbol: "BINANCE:DOTUSDT",
      coinGeckoId: "polkadot",
      isLoading: false,
    },
    {
      id: "chainlink",
      symbol: "LINK",
      name: "Chainlink",
      price: 14.85,
      change24h: 0.45,
      changePercent24h: 3.13,
      volume24h: 520000000,
      marketCap: 8200000000,
      category: "crypto",
      logo: "🔗",
      color: "bg-blue-700",
      description:
        "Decentralized oracle network connecting smart contracts to real-world data",
      popularity: "medium",
      tradingViewSymbol: "BINANCE:LINKUSDT",
      coinGeckoId: "chainlink",
      isLoading: false,
    },

    // Additional Crypto Assets
    {
      id: "avalanche",
      symbol: "AVAX",
      name: "Avalanche",
      price: 36.5,
      change24h: 1.25,
      changePercent24h: 3.55,
      volume24h: 380000000,
      marketCap: 13500000000,
      category: "crypto",
      logo: "🔺",
      color: "bg-red-600",
      description:
        "High-performance blockchain platform for decentralized applications and custom blockchain networks",
      popularity: "medium",
      tradingViewSymbol: "BINANCE:AVAXUSDT",
      coinGeckoId: "avalanche-2",
      isLoading: false,
    },
    {
      id: "polygon",
      symbol: "MATIC",
      name: "Polygon",
      price: 0.85,
      change24h: 0.03,
      changePercent24h: 3.65,
      volume24h: 290000000,
      marketCap: 7800000000,
      category: "crypto",
      logo: "🟣",
      color: "bg-purple-700",
      description:
        "Ethereum scaling solution providing faster and cheaper transactions",
      popularity: "medium",
      tradingViewSymbol: "BINANCE:MATICUSDT",
      coinGeckoId: "matic-network",
      isLoading: false,
    },
    {
      id: "uniswap",
      symbol: "UNI",
      name: "Uniswap",
      price: 6.25,
      change24h: 0.18,
      changePercent24h: 2.97,
      volume24h: 125000000,
      marketCap: 3750000000,
      category: "crypto",
      logo: "🦄",
      color: "bg-pink-600",
      description: "Leading decentralized exchange protocol on Ethereum",
      popularity: "medium",
      tradingViewSymbol: "BINANCE:UNIUSDT",
      coinGeckoId: "uniswap",
      isLoading: false,
    },
    {
      id: "litecoin",
      symbol: "LTC",
      name: "Litecoin",
      price: 72.5,
      change24h: 1.85,
      changePercent24h: 2.62,
      volume24h: 680000000,
      marketCap: 5400000000,
      category: "crypto",
      logo: "Ł",
      color: "bg-gray-500",
      description: "Peer-to-peer cryptocurrency and payment network",
      popularity: "medium",
      tradingViewSymbol: "BINANCE:LTCUSDT",
      coinGeckoId: "litecoin",
      isLoading: false,
    },
    {
      id: "binancecoin",
      symbol: "BNB",
      name: "BNB",
      price: 315.0,
      change24h: 8.5,
      changePercent24h: 2.77,
      volume24h: 1200000000,
      marketCap: 47000000000,
      category: "crypto",
      logo: "🟡",
      color: "bg-yellow-500",
      description: "Native token of Binance exchange and BNB Chain ecosystem",
      popularity: "high",
      tradingViewSymbol: "BINANCE:BNBUSDT",
      coinGeckoId: "binancecoin",
      isLoading: false,
    },
    {
      id: "ripple",
      symbol: "XRP",
      name: "XRP",
      price: 0.52,
      change24h: 0.015,
      changePercent24h: 2.97,
      volume24h: 890000000,
      marketCap: 28000000000,
      category: "crypto",
      logo: "💧",
      color: "bg-blue-800",
      description:
        "Digital payment protocol for fast and low-cost international transfers",
      popularity: "high",
      tradingViewSymbol: "BINANCE:XRPUSDT",
      coinGeckoId: "ripple",
      isLoading: false,
    },
    {
      id: "dogecoin",
      symbol: "DOGE",
      name: "Dogecoin",
      price: 0.082,
      change24h: 0.003,
      changePercent24h: 3.8,
      volume24h: 420000000,
      marketCap: 11700000000,
      category: "crypto",
      logo: "🐕",
      color: "bg-yellow-600",
      description: "Popular meme cryptocurrency with strong community support",
      popularity: "high",
      tradingViewSymbol: "BINANCE:DOGEUSDT",
      coinGeckoId: "dogecoin",
      isLoading: false,
    },
    {
      id: "shiba-inu",
      symbol: "SHIB",
      name: "Shiba Inu",
      price: 0.0000095,
      change24h: 0.0000004,
      changePercent24h: 4.42,
      volume24h: 185000000,
      marketCap: 5600000000,
      category: "crypto",
      logo: "🐶",
      color: "bg-orange-600",
      description: "Decentralized meme token with ecosystem of DeFi products",
      popularity: "medium",
      tradingViewSymbol: "BINANCE:SHIBUSDT",
      coinGeckoId: "shiba-inu",
      isLoading: false,
    },
    {
      id: "tron",
      symbol: "TRX",
      name: "TRON",
      price: 0.105,
      change24h: 0.004,
      changePercent24h: 3.96,
      volume24h: 320000000,
      marketCap: 9200000000,
      category: "crypto",
      logo: "⚡",
      color: "bg-red-700",
      description:
        "Blockchain platform focused on content sharing and entertainment",
      popularity: "medium",
      tradingViewSymbol: "BINANCE:TRXUSDT",
      coinGeckoId: "tron",
      isLoading: false,
    },
    // Forex
    {
      id: "eurusd",
      symbol: "EUR/USD",
      name: "Euro / US Dollar",
      price: 1.0875,
      change24h: 0.0025,
      changePercent24h: 0.23,
      volume24h: 0,
      marketCap: 0,
      category: "forex",
      logo: "€",
      color: "bg-blue-700",
      description: "Most traded currency pair in the world",
      popularity: "high",
      tradingViewSymbol: "FX:EURUSD",
      isLoading: false,
    },
    {
      id: "gbpusd",
      symbol: "GBP/USD",
      name: "British Pound / US Dollar",
      price: 1.265,
      change24h: 0.0085,
      changePercent24h: 0.68,
      volume24h: 0,
      marketCap: 0,
      category: "forex",
      logo: "£",
      color: "bg-red-700",
      description: 'Major currency pair known as "Cable"',
      popularity: "high",
      tradingViewSymbol: "FX:GBPUSD",
      isLoading: false,
    },
    {
      id: "usdjpy",
      symbol: "USD/JPY",
      name: "US Dollar / Japanese Yen",
      price: 148.5,
      change24h: -0.85,
      changePercent24h: -0.57,
      volume24h: 0,
      marketCap: 0,
      category: "forex",
      logo: "¥",
      color: "bg-red-800",
      description: "Major currency pair popular among carry traders",
      popularity: "high",
      tradingViewSymbol: "FX:USDJPY",
      isLoading: false,
    },
    {
      id: "audusd",
      symbol: "AUD/USD",
      name: "Australian Dollar / US Dollar",
      price: 0.6785,
      change24h: 0.0045,
      changePercent24h: 0.67,
      volume24h: 0,
      marketCap: 0,
      category: "forex",
      logo: "A$",
      color: "bg-green-700",
      description: "Commodity currency sensitive to risk sentiment",
      popularity: "medium",
      tradingViewSymbol: "FX:AUDUSD",
      isLoading: false,
    },
    {
      id: "usdcad",
      symbol: "USD/CAD",
      name: "US Dollar / Canadian Dollar",
      price: 1.3425,
      change24h: -0.0035,
      changePercent24h: -0.26,
      volume24h: 0,
      marketCap: 0,
      category: "forex",
      logo: "C$",
      color: "bg-red-600",
      description: "North American currency pair influenced by oil prices",
      popularity: "medium",
      tradingViewSymbol: "FX:USDCAD",
      isLoading: false,
    },
    {
      id: "usdchf",
      symbol: "USD/CHF",
      name: "US Dollar / Swiss Franc",
      price: 0.895,
      change24h: -0.0025,
      changePercent24h: -0.28,
      volume24h: 0,
      marketCap: 0,
      category: "forex",
      logo: "₣",
      color: "bg-gray-700",
      description: "Safe-haven currency pair during market uncertainty",
      popularity: "medium",
      tradingViewSymbol: "FX:USDCHF",
      isLoading: false,
    },

    // Additional Forex Pairs
    {
      id: "eurgbp",
      symbol: "EUR/GBP",
      name: "Euro / British Pound",
      price: 0.8595,
      change24h: 0.0015,
      changePercent24h: 0.17,
      volume24h: 0,
      marketCap: 0,
      category: "forex",
      logo: "🇪🇺",
      color: "bg-blue-800",
      description: "Major European cross currency pair",
      popularity: "medium",
      tradingViewSymbol: "FX:EURGBP",
      isLoading: false,
    },
    {
      id: "eurjpy",
      symbol: "EUR/JPY",
      name: "Euro / Japanese Yen",
      price: 161.25,
      change24h: 0.85,
      changePercent24h: 0.53,
      volume24h: 0,
      marketCap: 0,
      category: "forex",
      logo: "🇯🇵",
      color: "bg-red-900",
      description: "Popular cross pair sensitive to risk sentiment",
      popularity: "medium",
      tradingViewSymbol: "FX:EURJPY",
      isLoading: false,
    },
    {
      id: "gbpjpy",
      symbol: "GBP/JPY",
      name: "British Pound / Japanese Yen",
      price: 187.5,
      change24h: 1.25,
      changePercent24h: 0.67,
      volume24h: 0,
      marketCap: 0,
      category: "forex",
      logo: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      color: "bg-red-700",
      description: 'Volatile cross pair known as "The Dragon"',
      popularity: "medium",
      tradingViewSymbol: "FX:GBPJPY",
      isLoading: false,
    },
    {
      id: "nzdusd",
      symbol: "NZD/USD",
      name: "New Zealand Dollar / US Dollar",
      price: 0.6125,
      change24h: 0.0035,
      changePercent24h: 0.58,
      volume24h: 0,
      marketCap: 0,
      category: "forex",
      logo: "🥝",
      color: "bg-green-800",
      description:
        "Commodity currency sensitive to dairy and agricultural prices",
      popularity: "low",
      tradingViewSymbol: "FX:NZDUSD",
      isLoading: false,
    },
    {
      id: "usdmxn",
      symbol: "USD/MXN",
      name: "US Dollar / Mexican Peso",
      price: 17.25,
      change24h: 0.15,
      changePercent24h: 0.88,
      volume24h: 0,
      marketCap: 0,
      category: "forex",
      logo: "🇲🇽",
      color: "bg-green-600",
      description: "Emerging market currency pair with oil correlation",
      popularity: "low",
      tradingViewSymbol: "FX:USDMXN",
      isLoading: false,
    },
    // Stocks
    {
      id: "aapl",
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 185.5,
      change24h: 2.85,
      changePercent24h: 1.56,
      volume24h: 0,
      marketCap: 0,
      category: "stocks",
      logo: "🍎",
      color: "bg-gray-800",
      description: "Technology giant and iPhone manufacturer",
      popularity: "high",
      tradingViewSymbol: "NASDAQ:AAPL",
      isLoading: false,
    },
    {
      id: "msft",
      symbol: "MSFT",
      name: "Microsoft Corporation",
      price: 375.25,
      change24h: 8.5,
      changePercent24h: 2.32,
      volume24h: 0,
      marketCap: 0,
      category: "stocks",
      logo: "🪟",
      color: "bg-blue-800",
      description: "Software and cloud computing leader",
      popularity: "high",
      tradingViewSymbol: "NASDAQ:MSFT",
      isLoading: false,
    },
    {
      id: "googl",
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 142.5,
      change24h: 1.85,
      changePercent24h: 1.32,
      volume24h: 0,
      marketCap: 0,
      category: "stocks",
      logo: "🔍",
      color: "bg-red-700",
      description: "Google parent company and search engine giant",
      popularity: "high",
      tradingViewSymbol: "NASDAQ:GOOGL",
      isLoading: false,
    },
    {
      id: "amzn",
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 155.75,
      change24h: 3.25,
      changePercent24h: 2.13,
      volume24h: 0,
      marketCap: 0,
      category: "stocks",
      logo: "📦",
      color: "bg-orange-700",
      description: "E-commerce and cloud computing giant",
      popularity: "high",
      tradingViewSymbol: "NASDAQ:AMZN",
      isLoading: false,
    },
    {
      id: "tsla",
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 248.5,
      change24h: 12.25,
      changePercent24h: 5.18,
      volume24h: 0,
      marketCap: 0,
      category: "stocks",
      logo: "⚡",
      color: "bg-red-600",
      description: "Electric vehicle and clean energy company",
      popularity: "high",
      tradingViewSymbol: "NASDAQ:TSLA",
      isLoading: false,
    },
    {
      id: "nvda",
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      price: 485.25,
      change24h: 18.75,
      changePercent24h: 4.02,
      volume24h: 0,
      marketCap: 0,
      category: "stocks",
      logo: "🎮",
      color: "bg-green-700",
      description: "Graphics processing and AI chip manufacturer",
      popularity: "high",
      tradingViewSymbol: "NASDAQ:NVDA",
      isLoading: false,
    },

    // Additional Stocks
    {
      id: "meta",
      symbol: "META",
      name: "Meta Platforms Inc.",
      price: 325.5,
      change24h: 8.25,
      changePercent24h: 2.6,
      volume24h: 0,
      marketCap: 0,
      category: "stocks",
      logo: "📘",
      color: "bg-blue-700",
      description: "Social media and metaverse technology company",
      popularity: "high",
      tradingViewSymbol: "NASDAQ:META",
      isLoading: false,
    },
    {
      id: "nflx",
      symbol: "NFLX",
      name: "Netflix Inc.",
      price: 445.75,
      change24h: 12.5,
      changePercent24h: 2.89,
      volume24h: 0,
      marketCap: 0,
      category: "stocks",
      logo: "🎬",
      color: "bg-red-600",
      description: "Leading streaming entertainment service",
      popularity: "high",
      tradingViewSymbol: "NASDAQ:NFLX",
      isLoading: false,
    },
    {
      id: "amd",
      symbol: "AMD",
      name: "Advanced Micro Devices",
      price: 142.3,
      change24h: 5.8,
      changePercent24h: 4.25,
      volume24h: 0,
      marketCap: 0,
      category: "stocks",
      logo: "💻",
      color: "bg-red-700",
      description:
        "Semiconductor company specializing in processors and graphics",
      popularity: "high",
      tradingViewSymbol: "NASDAQ:AMD",
      isLoading: false,
    },
    {
      id: "intc",
      symbol: "INTC",
      name: "Intel Corporation",
      price: 48.75,
      change24h: 1.25,
      changePercent24h: 2.63,
      volume24h: 0,
      marketCap: 0,
      category: "stocks",
      logo: "🔧",
      color: "bg-blue-800",
      description: "Leading semiconductor chip manufacturer",
      popularity: "medium",
      tradingViewSymbol: "NASDAQ:INTC",
      isLoading: false,
    },
    {
      id: "bac",
      symbol: "BAC",
      name: "Bank of America Corp",
      price: 32.85,
      change24h: 0.65,
      changePercent24h: 2.02,
      volume24h: 0,
      marketCap: 0,
      category: "stocks",
      logo: "🏦",
      color: "bg-red-800",
      description: "Major American multinational investment bank",
      popularity: "medium",
      tradingViewSymbol: "NYSE:BAC",
      isLoading: false,
    },
    {
      id: "jpm",
      symbol: "JPM",
      name: "JPMorgan Chase & Co",
      price: 165.5,
      change24h: 3.25,
      changePercent24h: 2.0,
      volume24h: 0,
      marketCap: 0,
      category: "stocks",
      logo: "🏛️",
      color: "bg-blue-900",
      description: "Largest bank in the United States",
      popularity: "medium",
      tradingViewSymbol: "NYSE:JPM",
      isLoading: false,
    },
    {
      id: "ko",
      symbol: "KO",
      name: "The Coca-Cola Company",
      price: 58.25,
      change24h: 0.85,
      changePercent24h: 1.48,
      volume24h: 0,
      marketCap: 0,
      category: "stocks",
      logo: "🥤",
      color: "bg-red-600",
      description: "World's largest beverage company",
      popularity: "medium",
      tradingViewSymbol: "NYSE:KO",
      isLoading: false,
    },
    {
      id: "dis",
      symbol: "DIS",
      name: "The Walt Disney Company",
      price: 95.75,
      change24h: 2.15,
      changePercent24h: 2.3,
      volume24h: 0,
      marketCap: 0,
      category: "stocks",
      logo: "🏰",
      color: "bg-blue-600",
      description: "Entertainment and media conglomerate",
      popularity: "medium",
      tradingViewSymbol: "NYSE:DIS",
      isLoading: false,
    },
    // Indices
    {
      id: "spx",
      symbol: "SPX",
      name: "S&P 500",
      price: 4850.0,
      change24h: 58.2,
      changePercent24h: 1.22,
      volume24h: 0,
      marketCap: 0,
      category: "indices",
      logo: "📈",
      color: "bg-blue-600",
      description: "Benchmark index of 500 largest US companies",
      popularity: "high",
      tradingViewSymbol: "SP:SPX",
      isLoading: false,
    },
    {
      id: "ndx",
      symbol: "NDX",
      name: "Nasdaq 100",
      price: 16800.0,
      change24h: 302.4,
      changePercent24h: 1.83,
      volume24h: 0,
      marketCap: 0,
      category: "indices",
      logo: "💻",
      color: "bg-cyan-700",
      description:
        "Technology-heavy index of 100 largest non-financial companies",
      popularity: "high",
      tradingViewSymbol: "NASDAQ:NDX",
      isLoading: false,
    },
    {
      id: "dji",
      symbol: "DJI",
      name: "Dow Jones Industrial",
      price: 37500.0,
      change24h: 337.5,
      changePercent24h: 0.91,
      volume24h: 0,
      marketCap: 0,
      category: "indices",
      logo: "🏭",
      color: "bg-indigo-800",
      description: "Price-weighted index of 30 blue-chip US companies",
      popularity: "high",
      tradingViewSymbol: "DJ:DJI",
      isLoading: false,
    },
    {
      id: "rut",
      symbol: "RUT",
      name: "Russell 2000",
      price: 2050.0,
      change24h: 24.6,
      changePercent24h: 1.22,
      volume24h: 0,
      marketCap: 0,
      category: "indices",
      logo: "🏢",
      color: "bg-green-900",
      description: "Small-cap stock market index",
      popularity: "medium",
      tradingViewSymbol: "RUSSELL:RUT",
      isLoading: false,
    },
    {
      id: "vix",
      symbol: "VIX",
      name: "Volatility Index",
      price: 18.5,
      change24h: -1.25,
      changePercent24h: -6.33,
      volume24h: 0,
      marketCap: 0,
      category: "indices",
      logo: "📊",
      color: "bg-red-700",
      description: "Market fear gauge measuring expected volatility",
      popularity: "medium",
      tradingViewSymbol: "CBOE:VIX",
      isLoading: false,
    },
    {
      id: "dxy",
      symbol: "DXY",
      name: "US Dollar Index",
      price: 103.5,
      change24h: 0.35,
      changePercent24h: 0.34,
      volume24h: 0,
      marketCap: 0,
      category: "indices",
      logo: "💵",
      color: "bg-green-800",
      description: "Measure of USD strength against basket of currencies",
      popularity: "medium",
      tradingViewSymbol: "TVC:DXY",
      isLoading: false,
    },

    // Additional Indices
    {
      id: "ftse",
      symbol: "FTSE",
      name: "FTSE 100",
      price: 7650.0,
      change24h: 45.2,
      changePercent24h: 0.59,
      volume24h: 0,
      marketCap: 0,
      category: "indices",
      logo: "🇬🇧",
      color: "bg-red-800",
      description: "UK's leading share index of 100 largest companies",
      popularity: "medium",
      tradingViewSymbol: "TVC:UKX",
      isLoading: false,
    },
    {
      id: "dax",
      symbol: "DAX",
      name: "DAX 40",
      price: 16850.0,
      change24h: 125.3,
      changePercent24h: 0.75,
      volume24h: 0,
      marketCap: 0,
      category: "indices",
      logo: "🇩🇪",
      color: "bg-yellow-700",
      description: "German stock market index of 40 major companies",
      popularity: "medium",
      tradingViewSymbol: "TVC:DAX",
      isLoading: false,
    },
    {
      id: "nikkei",
      symbol: "NIKKEI",
      name: "Nikkei 225",
      price: 33250.0,
      change24h: 185.5,
      changePercent24h: 0.56,
      volume24h: 0,
      marketCap: 0,
      category: "indices",
      logo: "🇯🇵",
      color: "bg-red-900",
      description: "Japanese stock market index of 225 companies",
      popularity: "medium",
      tradingViewSymbol: "TVC:NI225",
      isLoading: false,
    },
    {
      id: "asx",
      symbol: "ASX",
      name: "ASX 200",
      price: 7425.0,
      change24h: 32.5,
      changePercent24h: 0.44,
      volume24h: 0,
      marketCap: 0,
      category: "indices",
      logo: "🇦🇺",
      color: "bg-green-700",
      description: "Australian stock market index of top 200 companies",
      popularity: "low",
      tradingViewSymbol: "TVC:AS51",
      isLoading: false,
    },
    // Commodities
    {
      id: "gold",
      symbol: "GOLD",
      name: "Gold",
      price: 2025.5,
      change24h: 15.25,
      changePercent24h: 0.76,
      volume24h: 0,
      marketCap: 0,
      category: "commodities",
      logo: "🥇",
      color: "bg-yellow-600",
      description: "Precious metal and store of value",
      popularity: "high",
      tradingViewSymbol: "COMEX:GC1!",
      isLoading: false,
    },
    {
      id: "silver",
      symbol: "SILVER",
      name: "Silver",
      price: 24.85,
      change24h: 0.45,
      changePercent24h: 1.84,
      volume24h: 0,
      marketCap: 0,
      category: "commodities",
      logo: "🥈",
      color: "bg-gray-500",
      description: "Precious metal with industrial applications",
      popularity: "medium",
      tradingViewSymbol: "COMEX:SI1!",
      isLoading: false,
    },
    {
      id: "oil",
      symbol: "OIL",
      name: "Crude Oil WTI",
      price: 78.5,
      change24h: 1.25,
      changePercent24h: 1.62,
      volume24h: 0,
      marketCap: 0,
      category: "commodities",
      logo: "🛢️",
      color: "bg-black",
      description: "West Texas Intermediate crude oil benchmark",
      popularity: "high",
      tradingViewSymbol: "NYMEX:CL1!",
      isLoading: false,
    },
    {
      id: "natgas",
      symbol: "NATGAS",
      name: "Natural Gas",
      price: 2.85,
      change24h: 0.12,
      changePercent24h: 4.4,
      volume24h: 0,
      marketCap: 0,
      category: "commodities",
      logo: "🔥",
      color: "bg-blue-900",
      description: "Clean-burning fossil fuel commodity",
      popularity: "medium",
      tradingViewSymbol: "NYMEX:NG1!",
      isLoading: false,
    },
    {
      id: "copper",
      symbol: "COPPER",
      name: "Copper",
      price: 3.85,
      change24h: 0.08,
      changePercent24h: 2.1,
      volume24h: 0,
      marketCap: 0,
      category: "commodities",
      logo: "🔶",
      color: "bg-orange-800",
      description: "Industrial metal and economic indicator",
      popularity: "medium",
      tradingViewSymbol: "COMEX:HG1!",
      isLoading: false,
    },
    {
      id: "wheat",
      symbol: "WHEAT",
      name: "Wheat",
      price: 585.5,
      change24h: 8.25,
      changePercent24h: 1.4,
      volume24h: 0,
      marketCap: 0,
      category: "commodities",
      logo: "🌾",
      color: "bg-yellow-700",
      description: "Agricultural commodity and food staple",
      popularity: "low",
      tradingViewSymbol: "CBOT:ZW1!",
      isLoading: false,
    },

    // Additional Commodities
    {
      id: "platinum",
      symbol: "PLATINUM",
      name: "Platinum",
      price: 985.5,
      change24h: 12.25,
      changePercent24h: 1.26,
      volume24h: 0,
      marketCap: 0,
      category: "commodities",
      logo: "⚪",
      color: "bg-gray-400",
      description: "Precious metal with industrial and jewelry applications",
      popularity: "low",
      tradingViewSymbol: "COMEX:PL1!",
      isLoading: false,
    },
    {
      id: "palladium",
      symbol: "PALLADIUM",
      name: "Palladium",
      price: 1125.0,
      change24h: 18.5,
      changePercent24h: 1.67,
      volume24h: 0,
      marketCap: 0,
      category: "commodities",
      logo: "🔘",
      color: "bg-gray-600",
      description: "Rare precious metal used in automotive catalysts",
      popularity: "low",
      tradingViewSymbol: "COMEX:PA1!",
      isLoading: false,
    },
    {
      id: "corn",
      symbol: "CORN",
      name: "Corn",
      price: 485.25,
      change24h: 6.75,
      changePercent24h: 1.41,
      volume24h: 0,
      marketCap: 0,
      category: "commodities",
      logo: "🌽",
      color: "bg-yellow-600",
      description: "Major agricultural commodity and biofuel feedstock",
      popularity: "low",
      tradingViewSymbol: "CBOT:ZC1!",
      isLoading: false,
    },
    {
      id: "soybeans",
      symbol: "SOYBEANS",
      name: "Soybeans",
      price: 1285.5,
      change24h: 15.25,
      changePercent24h: 1.2,
      volume24h: 0,
      marketCap: 0,
      category: "commodities",
      logo: "🫘",
      color: "bg-green-600",
      description: "Important agricultural commodity for food and feed",
      popularity: "low",
      tradingViewSymbol: "CBOT:ZS1!",
      isLoading: false,
    },
    {
      id: "coffee",
      symbol: "COFFEE",
      name: "Coffee",
      price: 168.5,
      change24h: 3.25,
      changePercent24h: 1.97,
      volume24h: 0,
      marketCap: 0,
      category: "commodities",
      logo: "☕",
      color: "bg-amber-800",
      description: "Popular beverage commodity traded globally",
      popularity: "low",
      tradingViewSymbol: "ICE:KC1!",
      isLoading: false,
    },
    {
      id: "sugar",
      symbol: "SUGAR",
      name: "Sugar",
      price: 22.85,
      change24h: 0.45,
      changePercent24h: 2.01,
      volume24h: 0,
      marketCap: 0,
      category: "commodities",
      logo: "🍯",
      color: "bg-amber-600",
      description: "Global sweetener commodity with seasonal patterns",
      popularity: "low",
      tradingViewSymbol: "ICE:SB1!",
      isLoading: false,
    },
    // Futures
    {
      id: "es",
      symbol: "ES",
      name: "E-mini S&P 500",
      price: 4850.0,
      change24h: 58.2,
      changePercent24h: 1.2,
      volume24h: 0,
      marketCap: 0,
      category: "futures",
      logo: "📊",
      color: "bg-blue-600",
      description: "Most liquid equity index futures contract",
      popularity: "high",
      tradingViewSymbol: "CME:ES1!",
      isLoading: false,
    },
    {
      id: "nq",
      symbol: "NQ",
      name: "E-mini Nasdaq 100",
      price: 16800.0,
      change24h: 302.4,
      changePercent24h: 1.8,
      volume24h: 0,
      marketCap: 0,
      category: "futures",
      logo: "💻",
      color: "bg-cyan-700",
      description: "Technology-focused futures contract",
      popularity: "high",
      tradingViewSymbol: "CME:NQ1!",
      isLoading: false,
    },
    {
      id: "ym",
      symbol: "YM",
      name: "E-mini Dow Jones",
      price: 37500.0,
      change24h: 337.5,
      changePercent24h: 0.9,
      volume24h: 0,
      marketCap: 0,
      category: "futures",
      logo: "🏭",
      color: "bg-indigo-800",
      description: "Blue-chip industrial futures contract",
      popularity: "medium",
      tradingViewSymbol: "CBOT:YM1!",
      isLoading: false,
    },
    {
      id: "rty",
      symbol: "RTY",
      name: "E-mini Russell 2000",
      price: 2050.0,
      change24h: 24.6,
      changePercent24h: 1.2,
      volume24h: 0,
      marketCap: 0,
      category: "futures",
      logo: "🏢",
      color: "bg-green-900",
      description: "Small-cap equity futures contract",
      popularity: "medium",
      tradingViewSymbol: "CME:RTY1!",
      isLoading: false,
    },
  ];

  const tools: TradingTool[] = [
    {
      id: "tradingview-pro",
      name: "TradingView Pro",
      description:
        "Professional charting platform with advanced indicators, alerts, and social trading features. Essential for serious traders.",
      category: "charting",
      logo: "📊",
      rating: 5,
      users: "50M+",
      price: "Paid",
      features: [
        "Advanced Charts",
        "Custom Indicators",
        "Alerts",
        "Social Trading",
      ],
      link: "https://www.tradingview.com/pricing/?share_your_love=nedwolp",
      color: "bg-blue-600",
      gradient: "from-blue-500/15 to-indigo-500/15",
      borderColor: "border-blue-500/30",
      popular: true,
      featured: true,
    },
    {
      id: "luxalgo",
      name: "LuxAlgo Premium",
      description:
        "Professional trading indicators and tools for TradingView with institutional-grade algorithms and smart money concepts.",
      category: "indicators",
      logo: "💎",
      rating: 5,
      users: "100K+",
      price: "Paid",
      features: [
        "Smart Money Concepts",
        "Market Structure",
        "Liquidity Analysis",
        "Signals",
      ],
      link: "https://luxalgo.com",
      color: "bg-purple-600",
      gradient: "from-purple-500/15 to-pink-500/15",
      borderColor: "border-purple-500/30",
      popular: true,
      featured: true,
    },
    {
      id: "automated-trader",
      name: "AutomatedTrader",
      description:
        "Professional trading automation platform. Connect any broker and automate trades 24/7 with TradingView alerts.",
      category: "our-tools",
      logo: "🤖",
      rating: 5,
      users: "50K+",
      price: "Paid",
      features: [
        "15+ Brokers",
        "TradingView Integration",
        "Webhook Automation",
        "24/7 Trading",
      ],
      link: "/dashboard/automate",
      color: "bg-blue-700",
      gradient: "from-blue-500/15 to-purple-500/15",
      borderColor: "border-blue-500/30",
      popular: true,
      featured: true,
    },
    {
      id: "alert-playground",
      name: "Alert Playground",
      description:
        "Generate perfect TradingView alert messages for automated trading with our interactive tool and templates.",
      category: "our-tools",
      logo: "⚡",
      rating: 5,
      users: "50K+",
      price: "Free",
      features: [
        "Message Generator",
        "Multiple TPs",
        "Copy to Clipboard",
        "Strategy Templates",
      ],
      link: "/dashboard/playground",
      color: "bg-purple-700",
      gradient: "from-purple-500/15 to-pink-500/15",
      borderColor: "border-purple-500/30",
      popular: true,
      featured: true,
    },
    {
      id: "chartprime",
      name: "ChartPrime",
      description:
        "Advanced charting tools and market analysis with professional-grade features, scanners, and backtesting capabilities.",
      category: "analysis",
      logo: "⭐",
      rating: 4,
      users: "25K+",
      price: "Paid",
      features: ["Custom Charts", "Market Scanner", "Backtesting", "Analytics"],
      link: "https://chartprime.com",
      color: "bg-orange-600",
      gradient: "from-orange-500/15 to-red-500/15",
      borderColor: "border-orange-500/30",
      popular: false,
    },
    {
      id: "coinigy",
      name: "Coinigy",
      description:
        "Multi-exchange trading platform with advanced charting and portfolio management for cryptocurrency traders.",
      category: "charting",
      logo: "🔗",
      rating: 4,
      users: "500K+",
      price: "Paid",
      features: [
        "45+ Exchanges",
        "Portfolio Tracking",
        "Advanced Charts",
        "API Trading",
      ],
      link: "https://coinigy.com",
      color: "bg-teal-600",
      gradient: "from-teal-500/15 to-cyan-500/15",
      borderColor: "border-teal-500/30",
      popular: false,
    },
  ];

  // Fetch crypto prices
  const fetchCryptoPrices = async () => {
    try {
      setIsLoadingPrices(true);
      const cryptoAssets = assets.filter(
        (asset) => asset.category === "crypto" && asset.coinGeckoId
      );
      const coinIds = cryptoAssets.map((asset) => asset.coinGeckoId).join(",");

      if (!coinIds) return;

      // Prepare headers
      const headers: HeadersInit = {
        Accept: "application/json",
      };

      // Add API key if available
      if (COINGECKO_API_KEY) {
        headers["x-cg-pro-api-key"] = COINGECKO_API_KEY;
      }

      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`,
        {
          headers,
          signal: AbortSignal.timeout(30000),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch prices: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setPriceData(data);
      setLastPriceUpdate(new Date());
      console.log(
        "✅ Crypto prices updated:",
        Object.keys(data).length,
        "assets"
      );
    } catch (error) {
      console.warn("❌ Error fetching crypto prices:", error);
      // Keep existing priceData if fetch fails
    } finally {
      setIsLoadingPrices(false);
    }
  };

  useEffect(() => {
    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    {
      id: "crypto" as AssetCategory,
      name: "Cryptocurrency",
      icon: DollarSign,
      count: assets.filter((a) => a.category === "crypto").length,
    },
    {
      id: "forex" as AssetCategory,
      name: "Forex",
      icon: Activity,
      count: assets.filter((a) => a.category === "forex").length,
    },
    {
      id: "stocks" as AssetCategory,
      name: "Stocks",
      icon: TrendingUp,
      count: assets.filter((a) => a.category === "stocks").length,
    },
    {
      id: "indices" as AssetCategory,
      name: "Indices",
      icon: BarChart3,
      count: assets.filter((a) => a.category === "indices").length,
    },
    {
      id: "commodities" as AssetCategory,
      name: "Commodities",
      icon: Award,
      count: assets.filter((a) => a.category === "commodities").length,
    },
    {
      id: "futures" as AssetCategory,
      name: "Futures",
      icon: Target,
      count: assets.filter((a) => a.category === "futures").length,
    },
  ];

  const filteredAssets = assets.filter((asset) => {
    const matchesCategory = asset.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCryptoPrice = (asset: Asset) => {
    if (asset.category !== "crypto" || !asset.coinGeckoId) return null;
    return priceData[asset.coinGeckoId];
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white sidebar-scroll">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              Charts Hub
            </h1>
            <p className="text-gray-400 mt-1">
              Professional trading tools and live market data
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-64"
              />
            </div>
            <button
              onClick={fetchCryptoPrices}
              disabled={isLoadingPrices}
              className="p-2 text-gray-400 hover:text-blue-400 transition-colors disabled:opacity-50"
              title="Refresh crypto prices"
            >
              <RefreshCw
                className={`h-5 w-5 ${isLoadingPrices ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-4 sm:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-8">
        {/* Category Filters */}
        <div className="mb-8">
          {/* Desktop Categories */}
          <div className="hidden md:flex gap-3 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/30 hover:border-gray-600/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                  <span className="bg-gray-600/50 text-gray-300 text-xs px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Category Dropdown */}
          <div className="md:hidden mb-6">
            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value as AssetCategory)
              }
              className="w-full px-4 py-3 bg-gradient-to-r from-gray-900/90 to-black/80 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium shadow-lg"
            >
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className="bg-gray-900"
                >
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>

          {/* Assets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => {
              const cryptoPrice = getCryptoPrice(asset);
              const hasRealPrice = asset.category === "crypto" && cryptoPrice;
              const isPositive = hasRealPrice
                ? (cryptoPrice.usd_24h_change || 0) >= 0
                : asset.changePercent24h >= 0;

              return (
                <div
                  key={asset.id}
                  className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 relative"
                >
                  {/* Popularity Badge */}
                  {asset.popularity === "high" && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full text-xs font-medium">
                        Popular
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 ${asset.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                    >
                      {asset.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-lg truncate">
                        {asset.symbol}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">
                        {asset.name}
                      </p>
                    </div>
                    {asset.category === "crypto" && isLoadingPrices && (
                      <RefreshCw className="h-4 w-4 text-blue-400 animate-spin flex-shrink-0" />
                    )}
                  </div>

                  {/* Price Info */}
                  <div className="mb-4">
                    {asset.category === "crypto" &&
                    hasRealPrice &&
                    cryptoPrice ? (
                      <div>
                        <div className="text-white font-bold text-xl mb-1">
                          $
                          {cryptoPrice.usd?.toLocaleString(undefined, {
                            minimumFractionDigits: cryptoPrice.usd < 1 ? 4 : 2,
                            maximumFractionDigits: cryptoPrice.usd < 1 ? 4 : 2,
                          })}
                        </div>
                        <div
                          className={`flex items-center gap-1 text-sm font-medium ${
                            isPositive ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {isPositive ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          <span>
                            {isPositive ? "+" : ""}
                            {(cryptoPrice.usd_24h_change || 0).toFixed(2)}%
                          </span>
                        </div>
                        {cryptoPrice.usd_market_cap && (
                          <div className="text-gray-400 text-xs mt-1">
                            Cap: $
                            {(cryptoPrice.usd_market_cap / 1000000000).toFixed(
                              1
                            )}
                            B
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          window.open(
                            `https://www.tradingview.com/chart/?symbol=${asset.tradingViewSymbol}`,
                            "_blank"
                          )
                        }
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-all hover:underline"
                      >
                        Click to view price →
                      </button>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        window.open(
                          `https://www.tradingview.com/chart/?symbol=${asset.tradingViewSymbol}`,
                          "_blank"
                        )
                      }
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-blue-200 text-sm font-medium py-3 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all hover:scale-[1.02]"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Chart
                    </button>
                    <button className="p-3 bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all">
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-xs mt-3 leading-relaxed">
                    {asset.description}
                  </p>
                </div>
              );
            })}
          </div>

          {filteredAssets.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-500/10 max-w-md mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-500/20 rounded-full flex items-center justify-center">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      No Assets Found
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Try different filters
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  No assets match your current search and filter criteria. Try
                  adjusting your filters or search terms.
                </p>

                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("crypto");
                  }}
                  className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium transition-all text-sm w-full"
                >
                  <Search className="h-4 w-4" />
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Professional Trading Tools */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                <Wrench className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Professional Trading Tools
                </h2>
                <p className="text-gray-400 text-sm">
                  Premium platforms and indicators for serious traders
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 relative"
              >
                {tool.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full font-medium">
                      Featured
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                    >
                      {tool.logo}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {tool.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < tool.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                          <span className="text-yellow-400 text-sm ml-1">
                            {tool.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-blue-400" />
                          <span className="text-blue-400 text-sm">
                            {tool.users}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-lg border border-gray-700/30"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-400" />
                    <span
                      className={`font-bold ${
                        tool.price === "Free"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {tool.price}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 capitalize">
                    {tool.category}
                  </div>
                </div>

                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] shadow-lg"
                >
                  <ExternalLink className="h-4 w-4" />
                  {tool.category === "our-tools" ? "Use Tool" : "Get Tool"}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30">
              <Zap className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Quick Actions</h2>
              <p className="text-gray-400 text-sm">
                Essential tools for automated trading
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/dashboard/playground"
              className="group bg-gradient-to-r from-blue-600/10 to-cyan-600/10 hover:from-blue-600/20 hover:to-cyan-600/20 border border-blue-500/30 hover:border-blue-400/50 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Zap className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                      Alert Playground
                    </div>
                    <div className="text-blue-300/80 text-sm">
                      Generate TradingView alerts
                    </div>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            <a
              href="/dashboard/automate"
              className="group bg-gradient-to-r from-green-600/10 to-emerald-600/10 hover:from-green-600/20 hover:to-emerald-600/20 border border-green-500/30 hover:border-green-400/50 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Plus className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white group-hover:text-green-300 transition-colors">
                      Connect Broker
                    </div>
                    <div className="text-green-300/80 text-sm">
                      Add trading account
                    </div>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 text-green-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            <a
              href="/dashboard/marketplace"
              className="group bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 border border-purple-500/30 hover:border-purple-400/50 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                      Marketplace
                    </div>
                    <div className="text-purple-300/80 text-sm">
                      Explore premium tools
                    </div>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsHubPage;
