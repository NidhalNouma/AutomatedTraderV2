"use client";

import React from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Zap,
  ChevronRight,
  Plus,
  Activity,
  Clock,
  Target,
  Wallet,
  Globe,
} from "lucide-react";
import { Card } from "../ui";
import { getBannersByCategory, getBannerById, Banner } from "../hooks/banners";
import { useBanner } from "../hooks";

import { useWhop } from "@/context/WhopContext";
import { QuickCharts } from "./";

interface NewsArticle {
  title: string;
  description: string;
  publishedAt: string;
  source: {
    name: string;
  };
  url: string;
  image?: string | null;
}

interface DashboardOverviewProps {
  onNavigate?: (tab: string) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigate,
}) => {
  const [news, setNews] = React.useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = React.useState(true);
  const [lastNewsUpdate, setLastNewsUpdate] = React.useState<Date>(new Date());
  const [newsError, setNewsError] = React.useState<string | null>(null);

  // User's membership plan - change this to match actual user plan

  const { whopUser } = useWhop();
  const userMembership: "Basic" | "Pro" | "Advanced" | "Lifetime" | null =
    (whopUser && whopUser.hasAccess && whopUser.access.name) ?? null;

  // Get rotating banners for dashboard
  const dashboardBanners = [
    getBannerById("platform-main"), // Connect to broker
    getBannerById("discord-community"), // Discord
    getBannerById("hankox-trading"), // Hankox
    getBannerById("trusted-signals"), // TrustedSignals
    getBannerById("isalgo-signals"), // IsAlgo
    getBannerById("trade-alerts"), // TradeAlerts
  ].filter(Boolean) as Banner[];
  const { currentBannerData, touchHandlers } = useBanner(
    dashboardBanners,
    true,
    4000
  );

  // Mock data for today's performance
  const todayData = {
    totalPnL: 2847.5,
    bestTrade: 450.25,
    worstTrade: -125.8,
  };

  // Fetch real trading news
  const fetchTradingNews = async () => {
    try {
      setNewsLoading(true);
      setNewsError(null);

      let articles: NewsArticle[] = [];

      // Try multiple real news sources
      const newsSources = [
        {
          name: "CoinGecko",
          url: "https://api.coingecko.com/api/v3/news",
          transform: (data: any) =>
            (data.data || []).slice(0, 3).map((item: any) => ({
              title: item.title,
              description: item.description || item.title,
              publishedAt: item.created_at,
              source: { name: item.domain || "CoinGecko" },
              url: item.url,
              image: item.thumb_2x || item.thumb || null,
            })),
        },
        {
          name: "CryptoPanic",
          url: "https://cryptopanic.com/api/v1/posts/?public=true&kind=news&filter=hot",
          transform: (data: any) =>
            (data.results || []).slice(0, 3).map((item: any) => ({
              title: item.title,
              description: item.title, // CryptoPanic doesn't provide descriptions
              publishedAt: item.published_at,
              source: { name: item.source?.title || "CryptoPanic" },
              url: item.url,
              image: null,
            })),
        },
        {
          name: "RSS2JSON-Cointelegraph",
          url: "https://api.rss2json.com/v1/api.json?rss_url=https://cointelegraph.com/rss",
          transform: (data: any) =>
            (data.items || []).slice(0, 3).map((item: any) => ({
              title: item.title,
              description:
                item.description?.replace(/<[^>]*>/g, "").substring(0, 150) +
                  "..." || item.title,
              publishedAt: item.pubDate,
              source: { name: "Cointelegraph" },
              url: item.link,
              image: item.enclosure?.link || item.thumbnail || null,
            })),
        },
        {
          name: "RSS2JSON-CoinDesk",
          url: "https://api.rss2json.com/v1/api.json?rss_url=https://www.coindesk.com/arc/outboundfeeds/rss/",
          transform: (data: any) =>
            (data.items || []).slice(0, 3).map((item: any) => ({
              title: item.title,
              description:
                item.description?.replace(/<[^>]*>/g, "").substring(0, 150) +
                  "..." || item.title,
              publishedAt: item.pubDate,
              source: { name: "CoinDesk" },
              url: item.link,
              image: item.enclosure?.link || item.thumbnail || null,
            })),
        },
      ];

      // Try each news source until we get articles
      for (const source of newsSources) {
        try {
          console.log(`Trying ${source.name}...`);
          const response = await fetch(source.url, {
            headers: { Accept: "application/json" },
            signal: AbortSignal.timeout(8000),
          });

          if (response.ok) {
            const data = await response.json();
            articles = source.transform(data);

            if (articles.length > 0) {
              console.log(
                `✅ ${source.name} success:`,
                articles.length,
                "articles"
              );
              break;
            }
          }
        } catch (sourceError) {
          console.warn(`❌ ${source.name} failed:`, sourceError);
          continue;
        }
      }

      setNews(articles.slice(0, 3));

      // Sort articles by date (newest first)
      const sortedArticles = articles.sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return dateB - dateA; // Newest first
      });

      setNews(sortedArticles.slice(0, 3));
      setLastNewsUpdate(new Date());

      if (articles.length > 0) {
        console.log(
          "✅ News updated successfully at:",
          new Date().toLocaleTimeString()
        );
      } else {
        setNewsError("Unable to fetch news from any source");
        console.log("❌ No news sources returned data");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNewsError("Failed to fetch trading news");
    } finally {
      setNewsLoading(false);
    }
  };

  // Fetch news on component mount and set up refresh interval
  React.useEffect(() => {
    fetchTradingNews();

    // Refresh news every 3 minutes for more frequent updates
    const interval = setInterval(fetchTradingNews, 3 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInMinutes = Math.abs(
      Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60))
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) {
          return `${diffInDays} days ago`;
        } else {
          const diffInWeeks = Math.floor(diffInDays / 7);
          return `${diffInWeeks} weeks ago`;
        }
      }
    }
  };

  const getBorderColor = (index: number) => {
    const colors = ["border-blue-500", "border-green-500", "border-purple-500"];
    return colors[index % colors.length];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const ButtonIcon = currentBannerData?.buttonIcon || Plus;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">
            Monitor your trading performance and automation
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Featured Banner */}
        {currentBannerData && (
          <div className="mb-8">
            <div
              className={`bg-gradient-to-r ${currentBannerData.gradient} border ${currentBannerData.borderColor} rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-500 shadow-lg hover:shadow-xl cursor-pointer overflow-hidden`}
              {...touchHandlers}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-purple-500/20 rounded-full flex-shrink-0">
                      <ButtonIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                    </div>
                    <div className="min-w-0 flex-1 pr-12">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-purple-400">🚀</span>
                        <h3 className="text-base sm:text-xl font-semibold text-white truncate">
                          {currentBannerData.title}
                        </h3>
                      </div>
                      {currentBannerData.subtitle && (
                        <p className="text-blue-300 text-xs sm:text-sm font-medium mb-2">
                          {currentBannerData.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full flex-shrink-0">
                    Featured
                  </span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {currentBannerData.description}
                </p>

                <div className="w-full">
                  {currentBannerData.buttonLink ? (
                    <a
                      href={currentBannerData.buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg text-sm w-full"
                    >
                      <ButtonIcon className="h-4 w-4" />
                      {currentBannerData.buttonText}
                    </a>
                  ) : (
                    <button
                      onClick={() => onNavigate?.("automate")}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg text-sm w-full"
                    >
                      <ButtonIcon className="h-4 w-4" />
                      {currentBannerData.buttonText}
                    </button>
                  )}
                </div>
              </div>

              {/* Banner Navigation Dots */}
              <div className="flex justify-center mt-4 gap-2 sm:hidden">
                {dashboardBanners.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index ===
                      dashboardBanners.findIndex(
                        (b) => b.id === currentBannerData?.id
                      )
                        ? "bg-white"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Performance Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Today's P&L */}
          <div className="xl:col-span-2 bg-[#1a1a2e] border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Activity className="h-6 w-6 text-cyan-400" />
                📊 Today's Performance
              </h2>
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3">
                <div className="text-xs text-gray-400 hidden sm:block">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
                <div className="px-2 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-xs font-medium whitespace-nowrap">
                  <span className="sm:hidden">12 Active</span>
                  <span className="hidden sm:inline">12 Trades Active</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Main P&L Card */}
              <div className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-4 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-cyan-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      $
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">
                        Total P&L
                      </div>
                      <div className="text-gray-400 text-xs">Today</div>
                    </div>
                  </div>
                  <TrendingUp className="h-4 w-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                </div>

                <div className="h-12 mb-3 relative bg-black/20 rounded-xl p-2">
                  <svg
                    width="100%"
                    height="100%"
                    className="overflow-visible"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 0 80 L 20 60 L 40 45 L 60 30 L 80 25 L 100 20"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="1.5"
                      className="drop-shadow-sm"
                    />
                    <path
                      d="M 0 80 L 20 60 L 40 45 L 60 30 L 80 25 L 100 20 L 100 90 L 0 90 Z"
                      fill="url(#gradient-pnl)"
                      opacity="0.3"
                    />
                    <defs>
                      <linearGradient
                        id="gradient-pnl"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#10b981"
                          stopOpacity="0.4"
                        />
                        <stop
                          offset="100%"
                          stopColor="#10b981"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-white font-bold text-lg">
                      {formatCurrency(todayData.totalPnL)}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-cyan-400">
                      <TrendingUp className="h-3 w-3" />
                      <span>
                        +{((todayData.totalPnL / 10000) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-medium rounded-full border border-cyan-500/30">
                    Live
                  </div>
                </div>
              </div>

              {/* Best Trade Card */}
              <div className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-4 hover:border-blue-500/30 transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      ↗
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">
                        Best Trade
                      </div>
                      <div className="text-gray-400 text-xs">BTCUSDT</div>
                    </div>
                  </div>
                  <TrendingUp className="h-4 w-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                </div>

                <div className="h-12 mb-3 relative bg-black/20 rounded-xl p-2">
                  <svg
                    width="100%"
                    height="100%"
                    className="overflow-visible"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 0 90 L 25 70 L 50 40 L 75 20 L 100 10"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="1.5"
                      className="drop-shadow-sm"
                    />
                    <path
                      d="M 0 90 L 25 70 L 50 40 L 75 20 L 100 10 L 100 90 L 0 90 Z"
                      fill="url(#gradient-best)"
                      opacity="0.3"
                    />
                    <defs>
                      <linearGradient
                        id="gradient-best"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#3b82f6"
                          stopOpacity="0.4"
                        />
                        <stop
                          offset="100%"
                          stopColor="#3b82f6"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-white font-bold text-lg">
                      +{formatCurrency(todayData.bestTrade)}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-blue-400">
                      <Clock className="h-3 w-3" />
                      <span>2h ago</span>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30">
                    Win
                  </div>
                </div>
              </div>

              {/* Worst Trade Card */}
              <div className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-4 hover:border-red-500/30 transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      ↘
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">
                        Worst Trade
                      </div>
                      <div className="text-gray-400 text-xs">ETHUSDT</div>
                    </div>
                  </div>
                  <TrendingDown className="h-4 w-4 text-gray-500 group-hover:text-red-400 transition-colors" />
                </div>

                <div className="h-12 mb-3 relative bg-black/20 rounded-xl p-2">
                  <svg
                    width="100%"
                    height="100%"
                    className="overflow-visible"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 0 20 L 25 35 L 50 60 L 75 75 L 100 85"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                      className="drop-shadow-sm"
                    />
                    <path
                      d="M 0 20 L 25 35 L 50 60 L 75 75 L 100 85 L 100 90 L 0 90 Z"
                      fill="url(#gradient-worst)"
                      opacity="0.3"
                    />
                    <defs>
                      <linearGradient
                        id="gradient-worst"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#ef4444"
                          stopOpacity="0.4"
                        />
                        <stop
                          offset="100%"
                          stopColor="#ef4444"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-white font-bold text-lg">
                      {formatCurrency(todayData.worstTrade)}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-red-400">
                      <Clock className="h-3 w-3" />
                      <span>4h ago</span>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-red-500/20 text-red-300 text-xs font-medium rounded-full border border-red-500/30">
                    Loss
                  </div>
                </div>
              </div>
            </div>

            {/* Info Banner */}
            <div className="mt-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div className="flex justify-center mt-4 gap-2 sm:hidden">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-blue-300 font-semibold text-base mb-1">
                    Live Trading Performance
                  </div>
                  <div className="text-blue-300/80 text-sm">
                    Real-time P&L tracking with automated trade execution across
                    all connected accounts
                  </div>
                  <div className="text-blue-400/60 text-xs mt-1">
                    Updates every 30 seconds • {12} trades executed today
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Membership */}
          <div className="bg-gradient-to-br from-gray-950/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-6 hover:border-gray-600/50 transition-all">
            {/* Membership Status */}
            {(userMembership as string) === "none" ? (
              <div className="mb-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg flex-shrink-0">
                    <Target className="h-5 w-5 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-orange-300 font-semibold text-sm mb-1">
                      🎯 No Active Membership
                    </h4>
                    <p className="text-orange-200/80 text-xs mb-3">
                      Upgrade to unlock premium features and automated trading
                    </p>
                    <button
                      onClick={() => onNavigate?.("membership")}
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-[1.02]"
                    >
                      View Plans →
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`mb-6 bg-gradient-to-r ${
                  (userMembership as string) === "Lifetime"
                    ? "from-yellow-500/10 to-orange-500/10 border-yellow-500/30"
                    : "from-blue-500/10 to-cyan-500/10 border-blue-500/30"
                } border rounded-xl p-4`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 ${
                        (userMembership as string) === "Lifetime"
                          ? "bg-yellow-500/20"
                          : "bg-blue-500/20"
                      } rounded-lg`}
                    >
                      <Target
                        className={`h-5 w-5 ${
                          (userMembership as string) === "Lifetime"
                            ? "text-yellow-400"
                            : "text-blue-400"
                        }`}
                      />
                    </div>
                    <div>
                      <h4
                        className={`${
                          (userMembership as string) === "Lifetime"
                            ? "text-yellow-300"
                            : "text-blue-300"
                        } font-semibold text-sm`}
                      >
                        {(userMembership as string) === "Lifetime"
                          ? "👑"
                          : "✨"}{" "}
                        {userMembership} Member
                      </h4>
                      <p
                        className={`${
                          (userMembership as string) === "Lifetime"
                            ? "text-yellow-200/80"
                            : "text-blue-200/80"
                        } text-xs`}
                      >
                        {(userMembership as string) === "Lifetime"
                          ? "Lifetime access"
                          : "Premium features unlocked"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate?.("membership")}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    Manage →
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  ⚡ Quick Actions
                </h3>
                <p className="text-gray-400 text-sm">
                  Get started with key features
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => onNavigate?.("playground")}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600/10 to-cyan-600/10 hover:from-blue-600/20 hover:to-cyan-600/20 border border-blue-500/30 hover:border-blue-400/50 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Zap className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white text-base">
                        Create Alert Messages
                      </div>
                      <div className="text-blue-300/80 text-sm">
                        Generate TradingView alerts
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => onNavigate?.("automate")}
                className="group relative overflow-hidden bg-gradient-to-r from-green-600/10 to-emerald-600/10 hover:from-cyan-600/20 hover:to-teal-600/20 border border-cyan-500/30 hover:border-green-400/50 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      <Plus className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white text-base">
                        Connect Broker Account
                      </div>
                      <div className="text-cyan-300/80 text-sm">
                        Add your trading platform
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => onNavigate?.("charts")}
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 border border-purple-500/30 hover:border-purple-400/50 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white text-base">
                        Explore Charts Hub
                      </div>
                      <div className="text-purple-300/80 text-sm">
                        Live market data & tools
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Live Trading News */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Quick Charts */}
          <div className="xl:col-span-2">
            <QuickCharts />
          </div>

          {/* Live Trading News */}
          <div className="bg-[#111111] rounded-2xl border border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-400" />
              Live Trading News
            </h3>

            {/* News Items */}
            {newsLoading ? (
              <div className="space-y-4 mb-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border-l-2 border-gray-600 pl-3 animate-pulse"
                  >
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-800 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-800 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : newsError ? (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-red-400" />
                  <span className="text-red-300 font-medium text-sm">
                    News Unavailable
                  </span>
                </div>
                <p className="text-red-300/80 text-xs">{newsError}</p>
                <button
                  onClick={fetchTradingNews}
                  className="mt-2 text-red-400 hover:text-red-300 text-xs underline"
                >
                  Try Again
                </button>
              </div>
            ) : news.length > 0 ? (
              <div className="space-y-4 mb-6">
                {news.map((article, index) => (
                  <a
                    key={index}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block border-l-2 ${getBorderColor(
                      index
                    )} pl-3 hover:bg-gray-800/30 rounded-r-lg p-2 transition-all group`}
                  >
                    <h4 className="text-white font-medium text-sm mb-1 group-hover:text-blue-300 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        {article.source.name}
                      </span>
                      <span className="text-gray-500">
                        {getTimeAgo(article.publishedAt)}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="mb-6 p-4 bg-gray-800/30 border border-gray-700 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300 font-medium text-sm">
                    No News Available
                  </span>
                </div>
                <p className="text-gray-400 text-xs">
                  Unable to fetch trading news at the moment.
                </p>
              </div>
            )}

            {/* News Footer */}
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-2">
                Last updated: {lastNewsUpdate.toLocaleTimeString()}
              </div>
              <button
                onClick={fetchTradingNews}
                disabled={newsLoading}
                className="text-blue-400 hover:text-blue-300 text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {newsLoading ? "Refreshing..." : "Refresh News"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
