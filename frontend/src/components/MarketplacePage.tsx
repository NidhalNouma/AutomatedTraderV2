"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  Users,
  ArrowRight,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Zap,
  Target,
  Filter,
  Plus,
  Search,
  Bot,
} from "lucide-react";
import { getBannersByCategory, Banner } from "../hooks/banners";
import { useBanner } from "../hooks";

interface MarketplaceTool {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  gradient: string;
  tags: string[];
  cta_text: string;
  link: string;
  featured: boolean;
  sort_order: number;
}

const MarketplacePage: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tools, setTools] = useState<MarketplaceTool[]>([]);
  const [platformTools, setPlatformTools] = useState<MarketplaceTool[]>([]);
  const [filteredTools, setFilteredTools] = useState<MarketplaceTool[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const marketplaceBanners: Banner[] = getBannersByCategory("partners");
  const { currentBannerData, touchHandlers } = useBanner(
    marketplaceBanners,
    true,
    4000
  );
  const ButtonIcon = currentBannerData?.buttonIcon || Zap;

  // Fetch tools from Supabase
  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    setIsLoading(true);
    try {
      // Fetch marketplace tools (non-platform)
      const marketplaceData: MarketplaceTool[] = [
        {
          id: "automated-trader",
          name: "AutomatedTrader",
          description:
            "Connect any broker. Execute trades 24/7 with TradingView alerts. Zero coding required.",
          logo: "🚀",
          category: "platform",
          gradient: "from-blue-500/10 to-cyan-500/10",
          tags: ["Automation", "No Code", "TradingView"],
          cta_text: "Start Free",
          link: "/dashboard/automate",
          featured: true,
          sort_order: 1,
        },
        {
          id: "hankox",
          name: "Hankox",
          description:
            "Ultra-low spreads, lightning execution. Regulated broker trusted by 100K+ traders worldwide.",
          logo: "💎",
          category: "broker",
          gradient: "from-emerald-500/10 to-teal-500/10",
          tags: ["Broker", "Low Spreads", "Regulated"],
          cta_text: "Open Account",
          link: "https://hankox.com",
          featured: true,
          sort_order: 2,
        },
        {
          id: "tradingview",
          name: "TradingView",
          description:
            "Professional charting with advanced indicators, alerts, and 50M+ trader community.",
          logo: "📈",
          category: "tool",
          gradient: "from-orange-500/10 to-red-500/10",
          tags: ["Charts", "Indicators", "Social"],
          cta_text: "Get Premium",
          link: "https://www.tradingview.com/pricing/?share_your_love=nedwolp",
          featured: true,
          sort_order: 3,
        },
        {
          id: "alert-playground",
          name: "Alert Playground",
          description:
            "Generate perfect TradingView alerts instantly. Copy, paste, automate. Free forever.",
          logo: "⚡",
          category: "platform",
          gradient: "from-purple-500/10 to-fuchsia-500/10",
          tags: ["Alerts", "Free", "Generator"],
          cta_text: "Try Now",
          link: "/dashboard/playground",
          featured: false,
          sort_order: 4,
        },
        {
          id: "charts-hub",
          name: "Charts Hub",
          description:
            "Real-time prices and professional charts for crypto, forex, stocks, commodities.",
          logo: "📊",
          category: "platform",
          gradient: "from-cyan-500/10 to-blue-500/10",
          tags: ["Charts", "Live Data", "Free"],
          cta_text: "View Charts",
          link: "/dashboard/charts",
          featured: false,
          sort_order: 5,
        },
        {
          id: "trustedsignals",
          name: "Trusted Signals",
          description:
            "Premium signals with detailed analysis and risk management for all markets.",
          logo: "📡",
          category: "signals",
          gradient: "from-green-500/10 to-emerald-500/10",
          tags: ["Signals", "Analysis", "Multi-Market"],
          cta_text: "Get Signals",
          link: "https://trustedsignals.com",
          featured: false,
          sort_order: 6,
        },
        {
          id: "luxalgo",
          name: "LuxAlgo",
          description:
            "Institutional-grade indicators with smart money concepts and advanced market structure.",
          logo: "💠",
          category: "tool",
          gradient: "from-indigo-500/10 to-purple-500/10",
          tags: ["Indicators", "Smart Money", "Pro"],
          cta_text: "Explore",
          link: "https://luxalgo.com",
          featured: false,
          sort_order: 7,
        },
        {
          id: "trade-alerts",
          name: "Trade Alerts",
          description:
            "Connect with traders, share alerts, grow together. Free community platform.",
          logo: "🔔",
          category: "community",
          gradient: "from-amber-500/10 to-orange-500/10",
          tags: ["Community", "Social", "Free"],
          cta_text: "Join Free",
          link: "https://tradealerts.com",
          featured: false,
          sort_order: 8,
        },
        {
          id: "3commas",
          name: "3Commas",
          description:
            "Smart crypto trading bots with DCA strategies and portfolio management tools.",
          logo: "🤖",
          category: "tool",
          gradient: "from-blue-500/10 to-purple-500/10",
          tags: ["Bots", "DCA", "Portfolio"],
          cta_text: "Start Trading",
          link: "https://3commas.io",
          featured: false,
          sort_order: 9,
        },
        {
          id: "binance",
          name: "Binance",
          description:
            "World's largest crypto exchange with lowest fees and highest liquidity.",
          logo: "⚡",
          category: "broker",
          gradient: "from-yellow-500/10 to-orange-500/10",
          tags: ["Exchange", "Low Fees", "High Liquidity"],
          cta_text: "Sign Up",
          link: "https://www.binance.com",
          featured: false,
          sort_order: 10,
        },
        {
          id: "bybit",
          name: "Bybit",
          description:
            "Advanced crypto derivatives platform with up to 100x leverage and low fees.",
          logo: "🎯",
          category: "broker",
          gradient: "from-orange-500/10 to-red-500/10",
          tags: ["Derivatives", "Leverage", "Low Fees"],
          cta_text: "Trade Now",
          link: "https://www.bybit.com",
          featured: false,
          sort_order: 11,
        },
        {
          id: "tradinglite",
          name: "TradingLite",
          description:
            "Professional trading terminal with advanced order types and market data.",
          logo: "📱",
          category: "tool",
          gradient: "from-cyan-500/10 to-teal-500/10",
          tags: ["Terminal", "Advanced Orders", "Pro"],
          cta_text: "Get Started",
          link: "https://tradinglite.com",
          featured: false,
          sort_order: 12,
        },
        {
          id: "coinmarketcap",
          name: "CoinMarketCap",
          description:
            "Real-time cryptocurrency prices, charts, and market capitalizations.",
          logo: "💰",
          category: "tool",
          gradient: "from-blue-400/10 to-cyan-400/10",
          tags: ["Data", "Free", "Research"],
          cta_text: "Browse Markets",
          link: "https://coinmarketcap.com",
          featured: false,
          sort_order: 13,
        },
        {
          id: "discord-trading-hub",
          name: "Discord Trading Hub",
          description:
            "Join our community of 10K+ traders sharing strategies and market insights.",
          logo: "💬",
          category: "community",
          gradient: "from-indigo-400/10 to-purple-400/10",
          tags: ["Community", "Free", "Support"],
          cta_text: "Join Discord",
          link: "https://discord.gg/uan282DjyE",
          featured: false,
          sort_order: 14,
        },
        {
          id: "learn-pine-script",
          name: "Learn Pine Script",
          description:
            "Master TradingView scripting with comprehensive tutorials and examples.",
          logo: "📚",
          category: "education",
          gradient: "from-green-400/10 to-emerald-400/10",
          tags: ["Education", "Pine Script", "Free"],
          cta_text: "Start Learning",
          link: "https://www.tradingview.com/pine-script-docs/",
          featured: false,
          sort_order: 15,
        },
      ];
      const platformData: MarketplaceTool[] = [];

      setTools(marketplaceData || []);
      setPlatformTools(platformData || []);
      setFilteredTools(marketplaceData || []);
    } catch (error) {
      console.error("Error fetching tools:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter tools
  useEffect(() => {
    let filtered = tools;

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((tool) => tool.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredTools(filtered);
  }, [selectedCategory, searchQuery, tools]);

  const categories = [
    { id: "all", label: "All Partners", count: tools.length },
    {
      id: "broker",
      label: "Brokers",
      count: tools.filter((t) => t.category === "broker").length,
    },
    {
      id: "tool",
      label: "Tools",
      count: tools.filter((t) => t.category === "tool").length,
    },
    {
      id: "signals",
      label: "Signals",
      count: tools.filter((t) => t.category === "signals").length,
    },
    {
      id: "community",
      label: "Community",
      count: tools.filter((t) => t.category === "community").length,
    },
    {
      id: "education",
      label: "Education",
      count: tools.filter((t) => t.category === "education").length,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              Marketplace
            </h1>
            <p className="text-gray-400 mt-1">
              Discover {tools.length} partner tools to supercharge your trading
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        {/* Rent Banner Space */}
        <a
          href="/dashboard/rent-space"
          className="block mb-8 group relative overflow-hidden"
        >
          <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-8 transition-all duration-300 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/20">
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent animate-shimmer"
              style={{ backgroundSize: "200% 100%" }}
            ></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-amber-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Premium Banner Space Available
                  </h3>
                  <p className="text-amber-300/80 text-sm">
                    Reach 50,000+ active traders with your product or service
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white rounded-xl font-bold transition-all group-hover:scale-105 shadow-lg">
                Rent This Space
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </a>

        {/* Bot Access Card */}
        {!searchQuery &&
          selectedCategory === "all" &&
          platformTools.length > 0 && (
            <a href="/dashboard/tradingview-bot" className="block mb-8 group">
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-black border-2 border-blue-500/30 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwgMTMwLCAyNDYsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

                <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/40 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Bot className="h-7 w-7 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/40 rounded-full text-blue-400 text-xs font-semibold uppercase tracking-wider">
                          Partner Exclusive
                        </span>
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 border border-green-500/40 rounded-full">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 text-xs font-medium">
                            Live
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        One Click Bot
                      </h3>
                      <p className="text-gray-300 text-sm">
                        TradingView bot and backtestable strategy from our
                        partners.{" "}
                        <span className="text-yellow-400 font-semibold">
                          Exclusive to Automated Trader lifetime members only.
                        </span>{" "}
                        Can't be found anywhere else.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all group-hover:scale-105 shadow-lg">
                    Claim Access
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </a>
          )}

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tools, categories, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-900/50 border border-gray-800/50 text-gray-400 hover:text-white hover:border-gray-700/50"
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">
          {selectedCategory === "all"
            ? "Partner Tools & Services"
            : categories.find((c) => c.id === selectedCategory)?.label}
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-400">Loading tools...</div>
          </div>
        ) : filteredTools.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">
              No tools found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Featured Banner Card */}
            {selectedCategory === "all" &&
              !searchQuery &&
              currentBannerData && (
                <div
                  className={`md:col-span-2 xl:col-span-1 bg-gradient-to-br ${currentBannerData.gradient} border ${currentBannerData.borderColor} rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] relative overflow-hidden`}
                  {...touchHandlers}
                >
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2 py-1 bg-purple-600/90 backdrop-blur-sm text-white text-xs rounded-full font-medium shadow-lg">
                      Featured
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mb-4 pr-16">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30 flex-shrink-0">
                      <ButtonIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                        {currentBannerData.title}
                      </h3>
                      {currentBannerData.subtitle && (
                        <p className="text-blue-300 text-xs sm:text-sm font-medium mt-1">
                          {currentBannerData.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {currentBannerData.description}
                  </p>

                  {currentBannerData.buttonLink && (
                    <a
                      href={currentBannerData.buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all text-sm w-full shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <ButtonIcon className="h-4 w-4" />
                      {currentBannerData.buttonText}
                    </a>
                  )}
                </div>
              )}

            {/* Product Cards */}
            {filteredTools.map((tool) => {
              const isInternal = tool.link.startsWith("/");
              const isHovered = hoveredId === tool.id;

              const isFeatured = tool.featured;

              return (
                <div
                  key={tool.id}
                  onMouseEnter={() => setHoveredId(tool.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`relative rounded-2xl p-4 sm:p-6 transition-all duration-300 ${
                    isFeatured
                      ? "bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-pink-900/30 border-2 border-blue-500/40 hover:border-blue-400/60 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/30"
                      : "bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 hover:border-gray-600/50 hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-500/10"
                  }`}
                >
                  {isFeatured && (
                    <>
                      <div className="absolute -top-2 -right-2 z-10">
                        <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs rounded-full font-bold shadow-lg">
                          <Sparkles className="h-3 w-3" />
                          FEATURED
                        </span>
                      </div>
                    </>
                  )}
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${
                        tool.gradient
                      } border ${
                        isFeatured
                          ? "border-blue-400/50 shadow-xl shadow-blue-500/20"
                          : "border-gray-700/50"
                      } rounded-xl flex items-center justify-center text-3xl shadow-lg`}
                    >
                      {tool.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg">
                        {tool.name}
                      </h3>
                      <span className="text-xs text-gray-500 capitalize">
                        {tool.category}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {tool.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tool.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={tool.link}
                    {...(!isInternal && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className={`relative z-10 flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-medium transition-all ${
                      isFeatured
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105"
                        : "bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 hover:scale-[1.02]"
                    }`}
                  >
                    {tool.cta_text}
                    <ArrowRight
                      className={`h-4 w-4 transition-transform ${
                        isHovered ? "translate-x-1" : ""
                      }`}
                    />
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-8 sm:p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl mb-6">
            <TrendingUp className="h-8 w-8 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            List Your Product
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Reach 50,000+ active traders with premium placement
          </p>
          <a
            href="/dashboard/rent-space"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-xl"
          >
            Apply Now
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
