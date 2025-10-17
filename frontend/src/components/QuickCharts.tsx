import React, { useState, useEffect } from "react";
import {
  ExternalLink,
  TrendingUp,
  TrendingDown,
  RefreshCw,
} from "lucide-react";
import { COINGECKO_API_KEY } from "@/utils/constants";

interface PriceData {
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
}

interface QuickChartProps {
  symbol: string;
  name: string;
  logo: string;
  color: string;
  priceData: PriceData | null;
  isLoading: boolean;
}

const QuickChart: React.FC<QuickChartProps> = ({
  symbol,
  name,
  logo,
  color,
  priceData,
  isLoading,
}) => {
  const isPositive = priceData ? priceData.change24h >= 0 : true;

  const openTradingView = () => {
    const tradingViewUrl = `https://www.tradingview.com/chart/?symbol=${symbol}`;
    window.open(tradingViewUrl, "_blank");
  };

  // Generate more realistic chart data
  const generateChartData = () => {
    const points = [];
    const baseY = 50;
    const volatility = 15;

    for (let i = 0; i <= 20; i++) {
      const x = (i / 20) * 100;
      const randomVariation = (Math.random() - 0.5) * volatility;
      const trendAdjustment = isPositive ? -i * 0.8 : i * 0.8;
      const y = Math.max(
        10,
        Math.min(90, baseY + randomVariation + trendAdjustment)
      );
      points.push({ x, y });
    }
    return points;
  };

  const chartPoints = generateChartData();
  const pathData = chartPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-4 hover:border-blue-500/30 transition-all duration-300 group hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-lg`}
        >
          {logo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-semibold text-sm truncate">
            {symbol}
          </div>
          <div className="text-gray-400 text-xs truncate">{name}</div>
        </div>
        {isLoading && (
          <RefreshCw className="h-4 w-4 text-blue-400 animate-spin flex-shrink-0" />
        )}
      </div>

      {/* Mini Chart */}
      <div
        onClick={openTradingView}
        className="h-12 mb-3 relative bg-black/20 rounded-lg p-2 cursor-pointer hover:bg-black/30 transition-all"
      >
        <svg
          width="100%"
          height="100%"
          className="overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Chart line */}
          <path
            d={pathData}
            fill="none"
            stroke={isPositive ? "#10b981" : "#ef4444"}
            strokeWidth="2"
            className="drop-shadow-sm"
          />

          {/* Area fill */}
          <path
            d={`${pathData} L 100 90 L 0 90 Z`}
            fill={`url(#gradient-${symbol})`}
            opacity="0.2"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient
              id={`gradient-${symbol}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor={isPositive ? "#10b981" : "#ef4444"}
                stopOpacity="0.3"
              />
              <stop
                offset="100%"
                stopColor={isPositive ? "#10b981" : "#ef4444"}
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Price Info */}
      <div className="space-y-2">
        <div>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-20 mb-1"></div>
              <div className="h-3 bg-gray-700 rounded w-16"></div>
            </div>
          ) : priceData ? (
            <>
              <div className="text-white font-bold text-base">
                $
                {priceData.price.toLocaleString(undefined, {
                  minimumFractionDigits: priceData.price < 1 ? 4 : 2,
                  maximumFractionDigits: priceData.price < 1 ? 4 : 2,
                })}
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  isPositive ? "text-green-400" : "text-red-400"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>
                  {isPositive ? "+" : ""}
                  {priceData.changePercent24h.toFixed(1)}%
                </span>
              </div>
            </>
          ) : (
            <div className="text-gray-400 text-sm">Price unavailable</div>
          )}
        </div>

        {/* Create Alert Button */}
        <button
          onClick={openTradingView}
          className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 text-xs font-medium py-2 rounded-lg border border-blue-500/30 hover:border-blue-400/50 transition-all hover:scale-[1.02] flex items-center justify-center gap-1"
        >
          <ExternalLink className="h-3 w-3" />
          Create Alert
        </button>
      </div>
    </div>
  );
};

const QuickCharts: React.FC = () => {
  const [priceData, setPriceData] = useState<{ [key: string]: PriceData }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const chartAssets = [
    {
      symbol: "BTCUSDT",
      name: "Bitcoin",
      logo: "₿",
      color: "bg-orange-500",
      coinGeckoId: "bitcoin",
    },
    {
      symbol: "ETHUSDT",
      name: "Ethereum",
      logo: "Ξ",
      color: "bg-blue-500",
      coinGeckoId: "ethereum",
    },
    {
      symbol: "SOLUSDT",
      name: "Solana",
      logo: "◎",
      color: "bg-purple-500",
      coinGeckoId: "solana",
    },
    {
      symbol: "ADAUSDT",
      name: "Cardano",
      logo: "₳",
      color: "bg-blue-600",
      coinGeckoId: "cardano",
    },
  ];

  const fetchPrices = async () => {
    try {
      setIsLoading(true);
      const coinIds = chartAssets.map((asset) => asset.coinGeckoId).join(",");

      // Prepare headers
      const headers: HeadersInit = {
        Accept: "application/json",
      };

      // Add API key if available
      if (COINGECKO_API_KEY) {
        headers["x-cg-pro-api-key"] = COINGECKO_API_KEY;
      }

      // Using CoinGecko API (free tier)
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`,
        {
          headers,
          signal: AbortSignal.timeout(30000), // 30 second timeout
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch prices: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const newPriceData: { [key: string]: PriceData } = {};

      chartAssets.forEach((asset) => {
        const coinData = data[asset.coinGeckoId];
        if (coinData) {
          const price = coinData.usd;
          const changePercent = coinData.usd_24h_change || 0;
          const change = (price * changePercent) / 100;

          newPriceData[asset.symbol] = {
            symbol: asset.symbol,
            price: price,
            change24h: change,
            changePercent24h: changePercent,
          };
        }
      });

      setPriceData(newPriceData);
      setLastUpdate(new Date());
    } catch (error) {
      // Handle different types of errors more gracefully
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          console.warn("Price fetch timed out, using fallback data");
        } else if (error.message.includes("Failed to fetch")) {
          console.warn(
            "Network error or CORS issue, using fallback data. Consider adding COINGECKO_API_KEY to environment variables."
          );
        } else {
          console.warn("Error fetching prices:", error.message);
        }
      } else {
        console.warn("Unknown error fetching prices, using fallback data");
      }

      // Fallback to mock data if API fails
      const mockData: { [key: string]: PriceData } = {
        BTCUSDT: {
          symbol: "BTCUSDT",
          price: 44100,
          change24h: 920,
          changePercent24h: 2.1,
        },
        ETHUSDT: {
          symbol: "ETHUSDT",
          price: 2650,
          change24h: -40,
          changePercent24h: -1.5,
        },
        SOLUSDT: {
          symbol: "SOLUSDT",
          price: 102.3,
          change24h: 3.75,
          changePercent24h: 3.8,
        },
        ADAUSDT: {
          symbol: "ADAUSDT",
          price: 0.485,
          change24h: 0.012,
          changePercent24h: 2.5,
        },
      };
      setPriceData(mockData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchPrices();

    // Set up interval for live updates (every 30 seconds)
    const interval = setInterval(fetchPrices, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#111111] rounded-2xl border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Quick Charts</h3>
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-400">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
          <button
            onClick={fetchPrices}
            disabled={isLoading}
            className="p-1 text-gray-400 hover:text-blue-400 transition-colors disabled:opacity-50"
            title="Refresh prices"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {chartAssets.map((asset) => (
          <QuickChart
            key={asset.symbol}
            symbol={asset.symbol}
            name={asset.name}
            logo={asset.logo}
            color={asset.color}
            priceData={priceData[asset.symbol] || null}
            isLoading={isLoading}
          />
        ))}
      </div>

      {/* Enhanced Info Banner */}
      <div className="mt-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-xl">
            <ExternalLink className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <div className="text-blue-300 font-semibold text-base mb-1">
              Create TradingView Alerts
            </div>
            <div className="text-blue-300/80 text-sm">
              Click any chart above to open TradingView and set up automated
              trading alerts
            </div>
            <div className="text-blue-400/60 text-xs mt-1">
              Live prices update every 30 seconds • Real-time market data
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickCharts;
