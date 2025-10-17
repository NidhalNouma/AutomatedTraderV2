import React, { useState } from "react";
import {
  Star,
  Users,
  ExternalLink,
  Activity,
  Target,
  DollarSign,
  Award,
  Search,
  BarChart3,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Card } from "../ui";
import { getBannersByCategory, getBannerById, Banner } from "../hooks/banners";
import { useBanner } from "../hooks";

const MarketplacePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Get banners for marketplace
  const marketplaceBanners = [
    getBannerById("trusted-signals"),
    getBannerById("hankox-trading"),
    getBannerById("superfunded-trading"),
    getBannerById("trade-alerts"),
    getBannerById("rent-ad-space"),
    getBannerById("affiliate-program"),
  ].filter(Boolean) as Banner[];

  const { currentBannerData, touchHandlers } = useBanner(
    marketplaceBanners,
    true,
    5000
  );
  const ButtonIcon = currentBannerData?.buttonIcon || Plus;

  // Partner Companies (Priority placement)
  const partnerCompanies = [
    {
      id: "trusted-signals",
      name: "Trusted Signals",
      description:
        "Premium trading signals from professional traders with detailed analysis and risk management strategies.",
      logo: "📈",
      category: "partners",
      users: "25K+",
      features: [
        "Crypto Signals",
        "Forex Signals",
        "Stock Signals",
        "Risk Management",
      ],
      link: "https://trustedsignals.com",
      featured: true,
      price: "Paid",
    },
    {
      id: "hankox-trading",
      name: "Hankox",
      description:
        "Professional trading broker offering competitive spreads, advanced platforms, and institutional-grade execution.",
      logo: "💎",
      category: "partners",
      users: "100K+",
      features: [
        "Competitive Spreads",
        "Advanced Platforms",
        "Institutional Grade",
        "Regulated",
      ],
      link: "https://hankox.com",
      featured: true,
      price: "Free",
    },
    {
      id: "superfunded-ea",
      name: "Super EA Trading",
      description:
        "Professional Expert Advisors for MetaTrader 4/5. Automated trading robots with proven track records and live performance monitoring.",
      logo: "🤖",
      category: "partners",
      users: "15K+",
      features: [
        "Expert Advisors",
        "MT4/MT5 Support",
        "Live Performance",
        "Proven Track Records",
      ],
      link: "https://eatrader.com",
      featured: true,
      price: "Paid",
    },
    {
      id: "trade-alerts",
      name: "Trade Alerts Social",
      description:
        "Free social media platform for traders. Share alerts, connect with traders, and organize your trading community efficiently.",
      logo: "🔔",
      category: "partners",
      users: "30K+",
      features: [
        "Social Trading",
        "Free Platform",
        "Community Features",
        "Alert Sharing",
      ],
      link: "https://tradealerts.com",
      featured: false,
      price: "Free",
    },
    {
      id: "propfirmalgo",
      name: "PropFirmAlgo",
      description:
        "Algorithmic trading solutions for prop firms and professional traders. Advanced strategies and risk management systems.",
      logo: "⚡",
      category: "partners",
      users: "10K+",
      features: [
        "Prop Firm Solutions",
        "Advanced Algorithms",
        "Risk Management",
        "Professional Trading",
      ],
      link: "https://propfirmalgo.com",
      featured: false,
      price: "Paid",
    },
  ];

  // Professional Tools
  const professionalTools = [
    {
      id: "tradingview",
      name: "TradingView",
      description:
        "Professional charting platform with advanced indicators and social trading features",
      logo: "📈",
      category: "tools",
      users: "50M+",
      features: [
        "Advanced Charts",
        "Custom Indicators",
        "Social Trading",
        "Alerts",
      ],
      link: "https://www.tradingview.com/pricing/?share_your_love=nedwolp",
      featured: false,
      price: "Paid",
    },
    {
      id: "luxalgo",
      name: "LuxAlgo Premium",
      description:
        "Professional trading indicators and tools for TradingView with institutional-grade algorithms",
      logo: "💎",
      category: "tools",
      users: "100K+",
      features: [
        "Smart Money Concepts",
        "Market Structure",
        "Liquidity Analysis",
        "Signals",
      ],
      link: "https://luxalgo.com",
      featured: false,
      price: "Paid",
    },
    {
      id: "bookmap",
      name: "Bookmap",
      description:
        "Advanced order flow and market depth visualization platform for professional traders",
      logo: "📈",
      category: "tools",
      users: "50K+",
      features: ["Order Flow", "Market Depth", "Heatmaps", "Volume Analysis"],
      link: "https://bookmap.com",
      featured: false,
      price: "Paid",
    },
    {
      id: "quantower",
      name: "Quantower",
      description:
        "Professional trading platform with advanced analytics and multi-asset support",
      logo: "⚡",
      category: "tools",
      users: "100K+",
      features: [
        "Multi-Asset",
        "Advanced Analytics",
        "Custom Indicators",
        "Algorithmic Trading",
      ],
      link: "https://quantower.com",
      featured: false,
      price: "Free",
    },
    {
      id: "coinigy",
      name: "Coinigy",
      description:
        "Multi-exchange trading platform with advanced charting and portfolio management",
      logo: "🔗",
      category: "tools",
      users: "500K+",
      features: [
        "45+ Exchanges",
        "Portfolio Tracking",
        "Advanced Charts",
        "API Trading",
      ],
      link: "https://coinigy.com",
      featured: false,
      price: "Paid",
    },
    {
      id: "chartprime",
      name: "ChartPrime",
      description:
        "Advanced charting tools and market analysis with professional-grade features",
      logo: "⭐",
      category: "tools",
      users: "25K+",
      features: ["Custom Charts", "Market Scanner", "Backtesting", "Analytics"],
      link: "https://chartprime.com",
      featured: false,
      price: "Paid",
    },
  ];

  // Educational Resources
  const educationalResources = [
    {
      id: "trading-mastery",
      name: "Trading Mastery Course",
      description:
        "Comprehensive trading education covering technical analysis, risk management, and automated trading strategies.",
      logo: "📚",
      category: "education",
      users: "50K+",
      features: [
        "Technical Analysis",
        "Risk Management",
        "Automated Trading",
        "Beginner to Expert",
      ],
      link: "https://tradingmastery.com",
      featured: false,
      price: "Paid",
    },
    {
      id: "automation-academy",
      name: "Automation Academy",
      description:
        "Learn to build and deploy automated trading systems. Webhook setup, strategy development, and risk management.",
      logo: "🎓",
      category: "education",
      users: "30K+",
      features: [
        "Webhook Setup",
        "Strategy Development",
        "Risk Management",
        "Algorithmic Trading",
      ],
      link: "https://automationacademy.com",
      featured: false,
      price: "Paid",
    },
    {
      id: "crypto-university",
      name: "Crypto University",
      description:
        "Master cryptocurrency trading, DeFi, NFTs, and blockchain technology from basics to advanced strategies.",
      logo: "₿",
      category: "education",
      users: "75K+",
      features: ["Crypto Trading", "DeFi", "NFTs", "Blockchain Technology"],
      link: "https://cryptouniversity.com",
      featured: false,
      price: "Paid",
    },
  ];

  // Our Tools (AutomatedTrader's own products)
  const ourTools = [
    {
      id: "automated-trader-platform",
      name: "AutomatedTrader Platform",
      description:
        "Professional trading automation platform. Connect any broker and automate trades 24/7 with TradingView alerts.",
      logo: "🚀",
      category: "our-tools",
      price: "$29/month",
      features: [
        "15+ Brokers",
        "TradingView Integration",
        "Webhook Automation",
        "24/7 Trading",
      ],
      link: "/dashboard/automate",
      users: "50K+",
      featured: true,
    },
    {
      id: "alert-playground",
      name: "Alert Playground",
      description:
        "Generate perfect TradingView alert messages for automated trading with our interactive tool.",
      logo: "⚡",
      category: "our-tools",
      price: "Free",
      features: [
        "Message Generator",
        "Multiple TPs",
        "Copy to Clipboard",
        "Strategy Templates",
      ],
      link: "/dashboard/playground",
      users: "50K+",
      featured: true,
    },
    {
      id: "charts-hub",
      name: "Charts Hub",
      description:
        "Live market data and professional charting tools for all asset classes with real-time prices.",
      logo: "📊",
      category: "our-tools",
      price: "Free",
      features: [
        "Live Prices",
        "Multi-Asset",
        "TradingView Links",
        "Market Analysis",
      ],
      link: "/dashboard/charts",
      users: "50K+",
      featured: false,
    },
    {
      id: "trading-news",
      name: "Trading News Hub",
      description:
        "Real-time financial and cryptocurrency news aggregated from multiple trusted sources.",
      logo: "📰",
      category: "our-tools",
      price: "Free",
      features: [
        "Real-time News",
        "Multiple Sources",
        "Search & Filter",
        "Mobile Friendly",
      ],
      link: "/dashboard/news",
      users: "50K+",
      featured: false,
    },
  ];

  const allItems = [
    ...ourTools,
    ...partnerCompanies,
    ...professionalTools,
    ...educationalResources,
  ];
  const filteredItems = allItems.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.features.some((feature) =>
        feature.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesSearch;
  });

  const getItemColor = (category: string) => {
    switch (category) {
      case "our-tools":
        return {
          gradient: "from-blue-500/20 to-purple-500/20",
          border: "border-blue-500/30",
          button:
            "from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
          tags: "from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30",
          cardGradient: "from-gray-900/90 to-black/80",
        };
      case "partners":
        return {
          gradient: "from-green-500/20 to-emerald-500/20",
          border: "border-green-500/30",
          button:
            "from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
          tags: "from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30",
          cardGradient: "from-gray-900/90 to-black/80",
        };
      case "tools":
        return {
          gradient: "from-purple-500/20 to-pink-500/20",
          border: "border-purple-500/30",
          button:
            "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
          tags: "from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30",
          cardGradient: "from-gray-900/90 to-black/80",
        };
      case "education":
        return {
          gradient: "from-orange-500/20 to-red-500/20",
          border: "border-orange-500/30",
          button:
            "from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700",
          tags: "from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/30",
          cardGradient: "from-gray-900/90 to-black/80",
        };
      default:
        return {
          gradient: "from-gray-500/20 to-gray-600/20",
          border: "border-gray-500/30",
          button:
            "from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800",
          tags: "from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/30",
          cardGradient: "from-gray-900/90 to-black/80",
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              Professional Marketplace
            </h1>
            <p className="text-gray-400 mt-1">
              Premium charting platforms, indicators, and trading strategies
            </p>
          </div>
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm w-64"
            />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-4 sm:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
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
                  <a
                    href={currentBannerData.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg text-sm w-full"
                  >
                    <ButtonIcon className="h-4 w-4" />
                    {currentBannerData.buttonText}
                  </a>
                </div>
              </div>

              {/* Banner Navigation Dots */}
              <div className="flex justify-center mt-4 gap-2 sm:hidden">
                {marketplaceBanners.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index ===
                      marketplaceBanners.findIndex(
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

        <h2 className="text-2xl font-bold text-white mb-6">
          Professional Trading Tools
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const colors = getItemColor(item.category);
            const isOurTool = item.category === "our-tools";

            return (
              <div
                key={item.id}
                className={`bg-gradient-to-br ${colors.cardGradient} backdrop-blur-xl border ${colors.border} rounded-2xl p-6 hover:border-opacity-60 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl relative`}
              >
                {item.featured && (
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-2 py-1 ${
                        isOurTool ? "bg-purple-600" : "bg-blue-600"
                      } text-white text-xs rounded-full font-medium`}
                    >
                      {isOurTool
                        ? "Our Tool"
                        : item.category === "partners"
                        ? "Partner"
                        : "Featured"}
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg border ${colors.border}`}
                    >
                      {item.logo}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-blue-400" />
                          <span className="text-blue-400 text-sm">
                            {item.users}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {item.features.map((feature, index) => (
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
                      className={`font-bold text-lg ${
                        item.price === "Free"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {item.price === "Free" ? "Free" : "Paid"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 capitalize">
                    {item.category === "our-tools"
                      ? "AutomatedTrader"
                      : item.category === "partners"
                      ? "Partner"
                      : item.category === "tools"
                      ? "Professional Tool"
                      : item.category === "education"
                      ? "Education"
                      : item.category}
                  </div>
                </div>

                {isOurTool ? (
                  <a
                    href={item.link}
                    className={`flex items-center justify-center gap-2 w-full bg-gradient-to-r ${colors.button} text-white px-4 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] shadow-lg`}
                  >
                    <ArrowRight className="h-4 w-4" />
                    Use Tool
                  </a>
                ) : (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full bg-gradient-to-r ${colors.button} text-white px-4 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] shadow-lg`}
                  >
                    <ExternalLink className="h-4 w-4" />
                    {item.category === "partners"
                      ? "Visit Partner"
                      : item.category === "tools"
                      ? "Get Tool"
                      : item.category === "education"
                      ? "Start Learning"
                      : "Get Product"}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-500/10 max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-500/20 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    No Products Found
                  </h3>
                  <p className="text-gray-400 text-sm">Try different search</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                No products match your search criteria. Try adjusting your
                search terms.
              </p>

              <button
                onClick={() => setSearchTerm("")}
                className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium transition-all text-sm w-full"
              >
                <Search className="h-4 w-4" />
                Clear Search
              </button>
            </div>
          </div>
        )}

        {/* Want to be Added Section */}
        <div className="mt-12 bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                <Plus className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Want to be Featured?
                </h2>
                <p className="text-gray-400 text-sm">
                  Join our professional marketplace
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Are you a trading service provider, broker, or educational
              platform? Get your product featured in our marketplace and reach
              50,000+ active automated traders worldwide.
            </p>
            <a
              href="/dashboard/rent-space"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg"
            >
              <ArrowRight className="h-5 w-5" />
              Apply for Marketplace
            </a>
          </div>
        </div>

        {/* Educational Resources */}
        <div className="mt-12 bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Award className="h-6 w-6 text-blue-400" />
            Why Choose Professional Tools?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                <span className="text-blue-300 font-medium">Our Platform</span>
              </div>
              <p className="text-gray-400 text-sm">
                Start with AutomatedTrader's own tools - built specifically for
                automated trading
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-green-400" />
                <span className="text-green-300 font-medium">
                  Trusted Partners
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Carefully selected partners providing premium signals, funding,
                and trading services
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-purple-400" />
                <span className="text-purple-300 font-medium">
                  Professional Tools
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Premium third-party tools and educational resources for serious
                traders
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
