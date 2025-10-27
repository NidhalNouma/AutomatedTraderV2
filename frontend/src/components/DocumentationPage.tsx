import React, { useState } from "react";
import {
  BookOpen,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Shield,
  Key,
  Globe,
  Users,
  Zap,
  BarChart3,
  Bot,
  FileText,
  DollarSign,
  Activity,
  Target,
  Play,
  Copy,
  Settings,
  Bell,
  HelpCircle,
  ArrowRight,
  Plus,
  MessageCircle,
} from "lucide-react";

import { Card } from "../ui";
import { getBannersByCategory } from "../hooks/banners";
import { useBanner } from "../hooks/useBanner";

const DocumentationPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [expandedBroker, setExpandedBroker] = useState<string | null>(null);
  const [showQuickStart, setShowQuickStart] = useState(false);

  // Get education and community banners for documentation
  const docsBanners = [
    ...getBannersByCategory("education").slice(0, 3),
    ...getBannersByCategory("community").slice(0, 2),
  ];

  const { currentBannerData, touchHandlers } = useBanner(
    docsBanners,
    true,
    8000
  );
  const ButtonIcon = currentBannerData?.buttonIcon || BookOpen;

  const sections = [
    { id: "getting-started", name: "Getting Started", icon: Play },
    { id: "website-guide", name: "Website Guide", icon: Globe },
    { id: "broker-setup", name: "Broker Setup", icon: Settings },
    { id: "alert-creation", name: "Alert Creation", icon: Bell },
    { id: "automation", name: "Automation", icon: Bot },
    { id: "troubleshooting", name: "Troubleshooting", icon: HelpCircle },
    { id: "security", name: "Security", icon: Shield },
    { id: "faq", name: "FAQ", icon: MessageCircle },
  ];

  const brokers = [
    {
      id: "binance",
      name: "Binance",
      type: "Cryptocurrency Exchange",
      logo: "B",
      color: "bg-yellow-500",
      url: "https://www.binance.com/en/my/settings/api-management",
      features: ["Spot Trading", "Futures Trading", "Margin Trading"],
      fees: "0.1% Trading Fee",
      leverage: "Up to 125x",
      assets: "600+ Cryptocurrencies",
      setup: [
        "Log into your Binance account",
        "Go to Account → API Management",
        'Click "Create API" and choose "System generated"',
        'Enter a label (e.g., "AutomatedTrader")',
        "Complete security verification (2FA, email, SMS)",
        'Enable "Enable Spot & Margin Trading" permission only',
        'Never enable "Enable Withdrawals" for security',
        "Copy your API Key and Secret Key",
        "Add your server IP to the IP whitelist (optional but recommended)",
        "Test the connection with a small trade first",
      ],
      accountTypes: [
        { type: "Spot (S)", description: "Cash trading with your own funds" },
        { type: "Futures (D)", description: "Leveraged derivatives trading" },
      ],
      security: [
        "Only enable trading permissions",
        "Never enable withdrawal permissions",
        "Use IP whitelisting when possible",
        "Enable all 2FA methods",
        "Regularly rotate API keys",
      ],
    },
    {
      id: "bybit",
      name: "Bybit",
      type: "Cryptocurrency Exchange",
      logo: "BB",
      color: "bg-orange-500",
      url: "https://www.bybit.com/app/user/api-management",
      features: ["Spot Trading", "Derivatives", "Copy Trading"],
      fees: "0.1% Trading Fee",
      leverage: "Up to 100x",
      assets: "300+ Cryptocurrencies",
      setup: [
        "Log into your Bybit account",
        "Go to Account & Security → API Management",
        'Click "Create New Key"',
        'Choose "System-generated API Keys"',
        'Enter API key name (e.g., "AutomatedTrader")',
        'Select permissions: "Contract Trade" and/or "Spot Trade"',
        'Never select "Wallet" permissions',
        "Set IP restrictions (recommended)",
        "Complete 2FA verification",
        "Copy API Key and Secret Key",
        "Test with small positions first",
      ],
      accountTypes: [
        { type: "Spot (S)", description: "Cash trading with your own funds" },
        {
          type: "Derivatives (D)",
          description: "Futures, perpetuals, and options",
        },
      ],
      security: [
        "Use IP restrictions",
        "Only enable necessary trading permissions",
        "Never enable wallet permissions",
        "Monitor API usage regularly",
        "Set up withdrawal whitelist",
      ],
    },
    {
      id: "kucoin",
      name: "KuCoin",
      type: "Cryptocurrency Exchange",
      logo: "K",
      color: "bg-green-600",
      url: "https://www.kucoin.com/account/api",
      features: ["Spot Trading", "Futures Trading", "Margin Trading"],
      fees: "0.1% Trading Fee",
      leverage: "Up to 100x",
      assets: "700+ Cryptocurrencies",
      setup: [
        "Log into your KuCoin account",
        "Go to Account → API Management",
        'Click "Create API"',
        'Enter API Name (e.g., "AutomatedTrader")',
        "Create and confirm your API Passphrase (save this!)",
        'Select permissions: "General" and "Trade"',
        'Never select "Withdraw" or "Transfer" permissions',
        "Complete security verification",
        "Copy API Key, Secret Key, and Passphrase",
        "All three credentials are required for KuCoin",
        "Test the connection before live trading",
      ],
      accountTypes: [
        { type: "Spot (S)", description: "Cash trading with your own funds" },
        { type: "Futures (D)", description: "Leveraged futures contracts" },
      ],
      security: [
        "Store your passphrase securely",
        "Use IP whitelisting",
        "Only enable trading permissions",
        "Regular security audits",
        "Monitor API activity",
      ],
    },
    {
      id: "metatrader4",
      name: "MetaTrader 4",
      type: "Forex Trading Platform",
      logo: "MT4",
      color: "bg-blue-800",
      url: "https://www.metatrader4.com/",
      features: ["Forex Trading", "CFDs", "Expert Advisors"],
      fees: "Broker Dependent",
      leverage: "Up to 1:500",
      assets: "Forex, Indices, Commodities",
      setup: [
        "Contact your forex broker for account details",
        "Get your account login number (usually 6-8 digits)",
        "Get your account password",
        "Get the server address for your account type",
        "Determine if you have a demo or live account",
        "Test connection in MetaTrader 4 first",
        "Ensure your account has API/algorithmic trading enabled",
        "Check with broker about automated trading permissions",
        "Verify account type (Standard, ECN, etc.)",
        "Test with small positions before full automation",
      ],
      accountTypes: [
        { type: "Demo", description: "Practice account with virtual money" },
        { type: "Live", description: "Real money trading account" },
      ],
      security: [
        "Use strong passwords",
        "Enable two-factor authentication if available",
        "Only use trusted networks",
        "Monitor account activity",
        "Keep login credentials secure",
      ],
    },
    {
      id: "metatrader5",
      name: "MetaTrader 5",
      type: "Forex Trading Platform",
      logo: "MT5",
      color: "bg-blue-900",
      url: "https://www.metatrader5.com/",
      features: ["Forex Trading", "Stocks", "Futures", "CFDs"],
      fees: "Broker Dependent",
      leverage: "Up to 1:500",
      assets: "Forex, Stocks, Indices, Commodities",
      setup: [
        "Contact your forex broker for MT5 account details",
        "Get your account login number",
        "Get your account password",
        "Get the server address (different from MT4)",
        "Verify account type (Hedge or Netting)",
        "Test connection in MetaTrader 5 platform",
        "Ensure algorithmic trading is enabled",
        "Check broker policies on automated trading",
        "Verify supported order types",
        "Test with demo account first",
      ],
      accountTypes: [
        { type: "Demo", description: "Practice account with virtual money" },
        { type: "Live", description: "Real money trading account" },
      ],
      security: [
        "Use VPS for 24/7 trading",
        "Secure your login credentials",
        "Monitor trading activity",
        "Use broker-approved EAs only",
        "Regular account audits",
      ],
    },
  ];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "getting-started":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Play className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    Welcome to AutomatedTrader
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    AutomatedTrader is a professional platform that connects
                    your TradingView alerts to any broker for automated trade
                    execution. Follow this guide to get started with automated
                    trading in minutes.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                      <h4 className="font-semibold text-blue-300 mb-2">
                        What You'll Need
                      </h4>
                      <ul className="text-blue-300/80 text-sm space-y-1">
                        <li>• A TradingView account (free or paid)</li>
                        <li>• A supported broker account</li>
                        <li>• API credentials from your broker</li>
                        <li>• A trading strategy or indicators</li>
                      </ul>
                    </div>
                    <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                      <h4 className="font-semibold text-green-300 mb-2">
                        What You'll Get
                      </h4>
                      <ul className="text-green-300/80 text-sm space-y-1">
                        <li>• 24/7 automated trade execution</li>
                        <li>• Lightning-fast alert processing</li>
                        <li>• Multiple broker connections</li>
                        <li>• Real-time performance tracking</li>
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowQuickStart(!showQuickStart)}
                    className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 px-4 py-2 rounded-lg font-medium transition-all border border-blue-500/30"
                  >
                    <ArrowRight className="h-4 w-4" />
                    {showQuickStart ? "Hide" : "Show"} Quick Start Guide
                  </button>
                </div>
              </div>
            </div>

            {showQuickStart && (
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-400" />
                  5-Minute Quick Start
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-300">
                          Connect Your Broker
                        </h4>
                        <p className="text-green-300/80 text-sm">
                          Add your broker account with API credentials
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-300">
                          Create Alert Messages
                        </h4>
                        <p className="text-green-300/80 text-sm">
                          Use our Alert Playground to generate messages
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-300">
                          Setup TradingView Alerts
                        </h4>
                        <p className="text-green-300/80 text-sm">
                          Add webhook URL and alert messages
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-300">
                          Test Your Setup
                        </h4>
                        <p className="text-green-300/80 text-sm">
                          Start with small positions to verify
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        5
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-300">
                          Monitor & Scale
                        </h4>
                        <p className="text-green-300/80 text-sm">
                          Track performance and increase position sizes
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-green-500/20">
                      <a
                        href="/dashboard/automate"
                        className="inline-flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-300 px-4 py-2 rounded-lg font-medium transition-all border border-green-500/30"
                      >
                        <Bot className="h-4 w-4" />
                        Start Automating Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "website-guide":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Globe className="h-6 w-6 text-purple-400" />
                Complete Website Guide
              </h3>
              <p className="text-gray-300 mb-6">
                Learn how to use every feature of AutomatedTrader to maximize
                your trading automation.
              </p>
            </div>

            {/* Dashboard Overview */}
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                Dashboard Overview
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-blue-300 mb-3">
                    Performance Tracking
                  </h5>
                  <ul className="text-blue-300/80 text-sm space-y-2">
                    <li>
                      • <strong>Today's P&L:</strong> Real-time profit/loss
                      tracking
                    </li>
                    <li>
                      • <strong>Best/Worst Trades:</strong> Performance
                      highlights
                    </li>
                    <li>
                      • <strong>Live Charts:</strong> Quick market overview
                    </li>
                    <li>
                      • <strong>Trading News:</strong> Latest market updates
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-300 mb-3">
                    Quick Actions
                  </h5>
                  <ul className="text-blue-300/80 text-sm space-y-2">
                    <li>
                      • <strong>Alert Playground:</strong> Generate TradingView
                      messages
                    </li>
                    <li>
                      • <strong>Connect Broker:</strong> Add new trading
                      accounts
                    </li>
                    <li>
                      • <strong>Charts Hub:</strong> Access live market data
                    </li>
                    <li>
                      • <strong>Marketplace:</strong> Discover trading tools
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Automate Section */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Bot className="h-5 w-5 text-green-400" />
                Automate Dashboard
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-green-300 mb-2">
                    Account Management
                  </h5>
                  <ul className="text-green-300/80 text-sm space-y-1">
                    <li>
                      • <strong>Connect Accounts:</strong> Add crypto exchanges
                      and forex brokers
                    </li>
                    <li>
                      • <strong>Account Status:</strong> Monitor connection
                      health and activity
                    </li>
                    <li>
                      • <strong>Webhook URLs:</strong> Copy URLs for TradingView
                      alerts
                    </li>
                    <li>
                      • <strong>Configuration:</strong> Adjust risk settings and
                      parameters
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-green-300 mb-2">
                    Trading Controls
                  </h5>
                  <ul className="text-green-300/80 text-sm space-y-1">
                    <li>
                      • <strong>Enable/Disable:</strong> Turn automation on/off
                      per account
                    </li>
                    <li>
                      • <strong>View Logs:</strong> Monitor all trading activity
                      and alerts
                    </li>
                    <li>
                      • <strong>Trade History:</strong> Review past trades and
                      performance
                    </li>
                    <li>
                      • <strong>Real-time Status:</strong> See live trading
                      activity
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Alert Playground */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Alert Playground
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-yellow-300 mb-3">
                    Message Generation
                  </h5>
                  <ul className="text-yellow-300/80 text-sm space-y-2">
                    <li>
                      • <strong>Asset Configuration:</strong> Set symbol, size,
                      and strategy ID
                    </li>
                    <li>
                      • <strong>Entry Alerts:</strong> Generate long and short
                      entry messages
                    </li>
                    <li>
                      • <strong>Exit Strategy:</strong> Configure take profits
                      and stop losses
                    </li>
                    <li>
                      • <strong>Advanced TPs:</strong> Multiple take profit
                      levels with percentages
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-yellow-300 mb-3">
                    Usage Tips
                  </h5>
                  <ul className="text-yellow-300/80 text-sm space-y-2">
                    <li>
                      • <strong>Copy Messages:</strong> One-click copy to
                      clipboard
                    </li>
                    <li>
                      • <strong>Real-time Updates:</strong> Messages update as
                      you type
                    </li>
                    <li>
                      • <strong>Format Reference:</strong> Learn message syntax
                    </li>
                    <li>
                      • <strong>Safety Guidelines:</strong> Best practices for
                      stop losses
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Charts Hub */}
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-400" />
                Charts Hub
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-indigo-300 mb-2">
                    Market Data
                  </h5>
                  <ul className="text-indigo-300/80 text-sm space-y-1">
                    <li>
                      • <strong>Live Prices:</strong> Real-time crypto, forex,
                      stocks, and commodities
                    </li>
                    <li>
                      • <strong>Category Filters:</strong> Browse by asset type
                    </li>
                    <li>
                      • <strong>TradingView Links:</strong> Direct access to
                      charts
                    </li>
                    <li>
                      • <strong>Price Alerts:</strong> Set up notifications
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-indigo-300 mb-2">
                    Professional Tools
                  </h5>
                  <ul className="text-indigo-300/80 text-sm space-y-1">
                    <li>
                      • <strong>TradingView Pro:</strong> Advanced charting
                      platform
                    </li>
                    <li>
                      • <strong>LuxAlgo:</strong> Premium indicators and tools
                    </li>
                    <li>
                      • <strong>Our Tools:</strong> AutomatedTrader's own
                      features
                    </li>
                    <li>
                      • <strong>Quick Actions:</strong> Fast access to key
                      functions
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Trading News */}
            <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-red-400" />
                Trading News Hub
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-red-300 mb-3">
                    News Sources
                  </h5>
                  <ul className="text-red-300/80 text-sm space-y-2">
                    <li>
                      • <strong>CoinGecko:</strong> Cryptocurrency news and
                      updates
                    </li>
                    <li>
                      • <strong>CryptoPanic:</strong> Aggregated crypto news
                    </li>
                    <li>
                      • <strong>Cointelegraph:</strong> Professional crypto
                      journalism
                    </li>
                    <li>
                      • <strong>CoinDesk:</strong> Financial and blockchain news
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-red-300 mb-3">Features</h5>
                  <ul className="text-red-300/80 text-sm space-y-2">
                    <li>
                      • <strong>Real-time Updates:</strong> Latest market news
                    </li>
                    <li>
                      • <strong>Search & Filter:</strong> Find specific topics
                    </li>
                    <li>
                      • <strong>Save Articles:</strong> Bookmark important news
                    </li>
                    <li>
                      • <strong>Share Content:</strong> Social sharing options
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Marketplace */}
            <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-purple-400" />
                Professional Marketplace
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-purple-300 mb-2">
                    Trading Services
                  </h5>
                  <ul className="text-purple-300/80 text-sm space-y-1">
                    <li>
                      • <strong>Signal Providers:</strong> Premium trading
                      signals
                    </li>
                    <li>
                      • <strong>Prop Firms:</strong> Get funded to trade
                    </li>
                    <li>
                      • <strong>Brokers:</strong> Professional trading platforms
                    </li>
                    <li>
                      • <strong>Education:</strong> Trading courses and
                      resources
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-purple-300 mb-2">
                    Partner Benefits
                  </h5>
                  <ul className="text-purple-300/80 text-sm space-y-1">
                    <li>
                      • <strong>Verified Partners:</strong> Trusted service
                      providers
                    </li>
                    <li>
                      • <strong>Special Offers:</strong> Exclusive discounts for
                      users
                    </li>
                    <li>
                      • <strong>Integration:</strong> Seamless workflow
                      connections
                    </li>
                    <li>
                      • <strong>Support:</strong> Dedicated partner assistance
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-400" />
                System Status & Monitoring
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-green-300 mb-3">
                    Service Health
                  </h5>
                  <ul className="text-green-300/80 text-sm space-y-2">
                    <li>
                      • <strong>Webhook Processing:</strong> Alert execution
                      status
                    </li>
                    <li>
                      • <strong>Trading API:</strong> Broker connection health
                    </li>
                    <li>
                      • <strong>Database:</strong> Data storage and retrieval
                    </li>
                    <li>
                      • <strong>Authentication:</strong> User login systems
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-green-300 mb-3">
                    Performance Metrics
                  </h5>
                  <ul className="text-green-300/80 text-sm space-y-2">
                    <li>
                      • <strong>Uptime:</strong> Service availability tracking
                    </li>
                    <li>
                      • <strong>Response Time:</strong> System performance
                      metrics
                    </li>
                    <li>
                      • <strong>Incident History:</strong> Past issues and
                      resolutions
                    </li>
                    <li>
                      • <strong>Maintenance:</strong> Scheduled updates and
                      improvements
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case "broker-setup":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Settings className="h-6 w-6 text-green-400" />
                Broker Setup Guides
              </h3>
              <p className="text-gray-300 mb-6">
                Detailed setup instructions for all supported brokers and
                exchanges. Click on your broker below for step-by-step guidance.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {brokers.map((broker) => (
                <div
                  key={broker.id}
                  className="bg-gradient-to-r from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedBroker(
                        expandedBroker === broker.id ? null : broker.id
                      )
                    }
                    className="w-full p-6 text-left hover:bg-gray-800/20 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 ${broker.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                        >
                          {broker.logo}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">
                            {broker.name}
                          </h4>
                          <p className="text-gray-400 text-sm">{broker.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-4 text-sm text-gray-400">
                          <span>{broker.assets}</span>
                          <span>{broker.fees}</span>
                        </div>
                        {expandedBroker === broker.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>

                  {expandedBroker === broker.id && (
                    <div className="px-6 pb-6 border-t border-gray-800/30">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        {/* Platform Info */}
                        <div className="space-y-4">
                          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
                            <h5 className="font-semibold text-blue-300 mb-3">
                              Platform Information
                            </h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Assets:</span>
                                <span className="text-white">
                                  {broker.assets}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">
                                  Trading Fees:
                                </span>
                                <span className="text-white">
                                  {broker.fees}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">
                                  Max Leverage:
                                </span>
                                <span className="text-white">
                                  {broker.leverage}
                                </span>
                              </div>
                            </div>
                            <div className="mt-4">
                              <h6 className="font-medium text-blue-300 mb-2">
                                Features:
                              </h6>
                              <div className="flex flex-wrap gap-2">
                                {broker.features.map((feature, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Account Types */}
                          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
                            <h5 className="font-semibold text-purple-300 mb-3">
                              Account Types
                            </h5>
                            <div className="space-y-2">
                              {broker.accountTypes.map((type, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-3"
                                >
                                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <span className="font-medium text-purple-300">
                                      {type.type}:
                                    </span>
                                    <span className="text-purple-300/80 text-sm ml-2">
                                      {type.description}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex flex-col sm:flex-row gap-3">
                            <a
                              href={broker.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-300 px-4 py-3 rounded-xl font-medium transition-all border border-green-500/30 flex-1"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Open {broker.name}
                            </a>
                            <a
                              href="/dashboard/automate"
                              className="flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 px-4 py-3 rounded-xl font-medium transition-all border border-blue-500/30 flex-1"
                            >
                              <Plus className="h-4 w-4" />
                              Connect Account
                            </a>
                          </div>
                        </div>

                        {/* Setup Instructions */}
                        <div className="space-y-4">
                          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
                            <h5 className="font-semibold text-green-300 mb-3">
                              Setup Instructions
                            </h5>
                            <div className="space-y-3">
                              {broker.setup.map((step, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-3"
                                >
                                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                    {index + 1}
                                  </div>
                                  <p className="text-green-300/80 text-sm leading-relaxed">
                                    {step}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Security Guidelines */}
                          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-4">
                            <h5 className="font-semibold text-red-300 mb-3 flex items-center gap-2">
                              <Shield className="h-4 w-4" />
                              Security Guidelines
                            </h5>
                            <div className="space-y-2">
                              {broker.security.map((guideline, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-3"
                                >
                                  <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                                  <p className="text-red-300/80 text-sm">
                                    {guideline}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "alert-creation":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Bell className="h-6 w-6 text-yellow-400" />
                TradingView Alert Creation
              </h3>
              <p className="text-gray-300 mb-6">
                Learn how to create and configure TradingView alerts for
                automated trading with AutomatedTrader.
              </p>
            </div>

            {/* Alert Message Format */}
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Alert Message Format
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-blue-300 mb-3">
                    Entry Alerts
                  </h5>
                  <div className="space-y-3">
                    <div className="bg-black/40 rounded-lg p-3 border border-blue-500/20">
                      <div className="text-xs text-blue-400 mb-1">
                        Long Entry:
                      </div>
                      <code className="text-green-300 text-sm">
                        D=Buy A=BTCUSDT Q=0.001 ID=strategy_1
                      </code>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            "D=Buy A=BTCUSDT Q=0.001 ID=strategy_1"
                          )
                        }
                        className="ml-2 p-1 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="bg-black/40 rounded-lg p-3 border border-blue-500/20">
                      <div className="text-xs text-blue-400 mb-1">
                        Short Entry:
                      </div>
                      <code className="text-red-300 text-sm">
                        D=Sell A=BTCUSDT Q=0.001 ID=strategy_1
                      </code>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            "D=Sell A=BTCUSDT Q=0.001 ID=strategy_1"
                          )
                        }
                        className="ml-2 p-1 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-300 mb-3">
                    Exit Alerts
                  </h5>
                  <div className="space-y-3">
                    <div className="bg-black/40 rounded-lg p-3 border border-blue-500/20">
                      <div className="text-xs text-blue-400 mb-1">
                        Take Profit (50%):
                      </div>
                      <code className="text-blue-300 text-sm">
                        X=Buy A=BTCUSDT P=50 ID=strategy_1
                      </code>
                      <button
                        onClick={() =>
                          copyToClipboard("X=Buy A=BTCUSDT P=50 ID=strategy_1")
                        }
                        className="ml-2 p-1 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="bg-black/40 rounded-lg p-3 border border-blue-500/20">
                      <div className="text-xs text-blue-400 mb-1">
                        Stop Loss (100%):
                      </div>
                      <code className="text-red-300 text-sm">
                        X=Sell A=BTCUSDT P=100 ID=strategy_1
                      </code>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            "X=Sell A=BTCUSDT P=100 ID=strategy_1"
                          )
                        }
                        className="ml-2 p-1 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                <h5 className="font-semibold text-blue-300 mb-3">
                  Parameter Explanation
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div>
                      <strong className="text-blue-300">D=Buy/Sell:</strong>{" "}
                      <span className="text-blue-300/80">
                        Opens long/short position
                      </span>
                    </div>
                    <div>
                      <strong className="text-blue-300">X=Buy/Sell:</strong>{" "}
                      <span className="text-blue-300/80">
                        Closes short/long position
                      </span>
                    </div>
                    <div>
                      <strong className="text-blue-300">A=Symbol:</strong>{" "}
                      <span className="text-blue-300/80">
                        Trading asset/pair
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <strong className="text-blue-300">Q=Size:</strong>{" "}
                      <span className="text-blue-300/80">
                        Position quantity
                      </span>
                    </div>
                    <div>
                      <strong className="text-blue-300">P=Percent:</strong>{" "}
                      <span className="text-blue-300/80">
                        Amount to close (25, 50, 100)
                      </span>
                    </div>
                    <div>
                      <strong className="text-blue-300">ID=Name:</strong>{" "}
                      <span className="text-blue-300/80">
                        Strategy identifier
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert Playground Section */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-purple-300 font-semibold flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Alert Playground - Generate Perfect Messages
                </h4>
                <a
                  href="/dashboard/playground"
                  className="inline-flex items-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Playground
                </a>
              </div>

              <div className="space-y-4">
                <p className="text-purple-300/80 text-sm">
                  Use our interactive Alert Playground to generate perfect
                  TradingView alert messages with advanced take profit
                  configurations and stop loss management.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/20 rounded-lg p-4">
                    <h5 className="text-purple-300 font-medium mb-2">
                      Entry Alerts
                    </h5>
                    <div className="space-y-2 text-xs">
                      <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                        <code className="text-green-300">
                          D=Buy A=BTCUSDT Q=0.001 ID=strategy_1
                        </code>
                      </div>
                      <div className="bg-red-500/10 border border-red-500/30 rounded p-2">
                        <code className="text-red-300">
                          D=Sell A=BTCUSDT Q=0.001 ID=strategy_1
                        </code>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/20 rounded-lg p-4">
                    <h5 className="text-purple-300 font-medium mb-2">
                      Take Profit Alerts
                    </h5>
                    <div className="space-y-2 text-xs">
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                        <code className="text-blue-300">
                          X=Buy A=BTCUSDT P=50 ID=strategy_1
                        </code>
                      </div>
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded p-2">
                        <code className="text-purple-300">
                          X=Sell A=BTCUSDT P=100 ID=strategy_1
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <h5 className="text-red-300 font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Stop Loss Alerts
                  </h5>
                  <div className="space-y-2 text-xs">
                    <div className="bg-black/20 rounded p-2">
                      <div className="text-red-300/80 mb-1">
                        Long Stop Loss:
                      </div>
                      <code className="text-red-300">
                        X=Sell A=BTCUSDT P=100 ID=strategy_1
                      </code>
                    </div>
                    <div className="bg-black/20 rounded p-2">
                      <div className="text-red-300/80 mb-1">
                        Short Stop Loss:
                      </div>
                      <code className="text-red-300">
                        X=Buy A=BTCUSDT P=100 ID=strategy_1
                      </code>
                    </div>
                  </div>
                  <p className="text-red-300/60 text-xs mt-2">
                    💡 Always use P=100 for stop loss to close entire position
                    when hit
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
                  <h5 className="text-green-300 font-medium mb-2">
                    Advanced Features
                  </h5>
                  <ul className="text-green-300/80 text-sm space-y-1">
                    <li>
                      • <strong>Multiple Take Profits:</strong> Configure 1-6 TP
                      levels with custom percentages
                    </li>
                    <li>
                      • <strong>Auto-Distribution:</strong> Automatically
                      distribute percentages across TPs
                    </li>
                    <li>
                      • <strong>Copy to Clipboard:</strong> One-click copying of
                      all alert messages
                    </li>
                    <li>
                      • <strong>Real-time Preview:</strong> See messages update
                      as you configure parameters
                    </li>
                    <li>
                      • <strong>Strategy Templates:</strong> Save and reuse
                      common configurations
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* TradingView Setup */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                TradingView Alert Setup
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-300">
                      Open TradingView Chart
                    </h5>
                    <p className="text-green-300/80 text-sm">
                      Navigate to your desired trading pair and timeframe
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-300">
                      Add Your Strategy/Indicator
                    </h5>
                    <p className="text-green-300/80 text-sm">
                      Apply your trading strategy or technical indicators
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-300">
                      Create Alert
                    </h5>
                    <p className="text-green-300/80 text-sm">
                      Right-click on your indicator and select "Add Alert"
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-300">
                      Configure Alert Settings
                    </h5>
                    <p className="text-green-300/80 text-sm">
                      Set condition, frequency, and expiration
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-300">
                      Add Webhook URL
                    </h5>
                    <p className="text-green-300/80 text-sm">
                      Paste your AutomatedTrader webhook URL in the "Webhook
                      URL" field
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    6
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-300">
                      Add Alert Message
                    </h5>
                    <p className="text-green-300/80 text-sm">
                      Paste your generated alert message in the "Message" field
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    7
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-300">
                      Test & Activate
                    </h5>
                    <p className="text-green-300/80 text-sm">
                      Test with small positions, then activate your alert
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Best Practices
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-purple-300 mb-3">
                    Alert Configuration
                  </h5>
                  <ul className="text-purple-300/80 text-sm space-y-2">
                    <li>• Use unique strategy IDs for different systems</li>
                    <li>• Test alerts with small position sizes first</li>
                    <li>• Set appropriate expiration times</li>
                    <li>• Use "Once Per Bar Close" for most strategies</li>
                    <li>• Monitor alert frequency to avoid spam</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-purple-300 mb-3">
                    Risk Management
                  </h5>
                  <ul className="text-purple-300/80 text-sm space-y-2">
                    <li>• Always include stop loss alerts</li>
                    <li>• Use percentage-based position sizing</li>
                    <li>• Set maximum daily loss limits</li>
                    <li>• Monitor account balance regularly</li>
                    <li>• Have emergency stop procedures</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/dashboard/playground"
                className="flex items-center justify-center gap-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 px-6 py-3 rounded-xl font-medium transition-all border border-yellow-500/30 flex-1"
              >
                <Zap className="h-5 w-5" />
                Use Alert Playground
              </a>
              <a
                href="https://www.tradingview.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 px-6 py-3 rounded-xl font-medium transition-all border border-blue-500/30 flex-1"
              >
                <ExternalLink className="h-5 w-5" />
                Open TradingView
              </a>
            </div>
          </div>
        );

      case "automation":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Bot className="h-6 w-6 text-blue-400" />
                Trading Automation Guide
              </h3>
              <p className="text-gray-300 mb-6">
                Master the art of automated trading with comprehensive
                strategies, risk management, and optimization techniques.
              </p>
            </div>

            {/* Automation Strategies */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Popular Automation Strategies
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <h5 className="font-semibold text-green-300 mb-2">
                      Trend Following
                    </h5>
                    <p className="text-green-300/80 text-sm mb-3">
                      Follow market trends using moving averages and momentum
                      indicators
                    </p>
                    <ul className="text-green-300/80 text-xs space-y-1">
                      <li>• Use EMA crossovers for entry signals</li>
                      <li>• Set trailing stops to capture trends</li>
                      <li>• Best for trending markets</li>
                    </ul>
                  </div>
                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                    <h5 className="font-semibold text-blue-300 mb-2">
                      Mean Reversion
                    </h5>
                    <p className="text-blue-300/80 text-sm mb-3">
                      Trade against extreme price movements expecting return to
                      average
                    </p>
                    <ul className="text-blue-300/80 text-xs space-y-1">
                      <li>• Use RSI and Bollinger Bands</li>
                      <li>• Quick profit targets</li>
                      <li>• Best for ranging markets</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                    <h5 className="font-semibold text-purple-300 mb-2">
                      Scalping
                    </h5>
                    <p className="text-purple-300/80 text-sm mb-3">
                      High-frequency trading with small profits and quick exits
                    </p>
                    <ul className="text-purple-300/80 text-xs space-y-1">
                      <li>• Use 1-5 minute timeframes</li>
                      <li>• Tight stop losses and take profits</li>
                      <li>• Requires low latency execution</li>
                    </ul>
                  </div>
                  <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                    <h5 className="font-semibold text-orange-300 mb-2">
                      Grid Trading
                    </h5>
                    <p className="text-orange-300/80 text-sm mb-3">
                      Place buy and sell orders at regular intervals around
                      current price
                    </p>
                    <ul className="text-orange-300/80 text-xs space-y-1">
                      <li>• Works in sideways markets</li>
                      <li>• Requires sufficient capital</li>
                      <li>• Risk of large drawdowns</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Management */}
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-400" />
                Risk Management Rules
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h5 className="font-semibold text-red-300 mb-3">
                    Position Sizing
                  </h5>
                  <ul className="text-red-300/80 text-sm space-y-2">
                    <li>• Never risk more than 1-2% per trade</li>
                    <li>• Use fixed dollar amounts or percentages</li>
                    <li>• Adjust size based on volatility</li>
                    <li>• Consider correlation between positions</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-red-300 mb-3">
                    Stop Losses
                  </h5>
                  <ul className="text-red-300/80 text-sm space-y-2">
                    <li>• Always use stop losses</li>
                    <li>• Set stops before entering trades</li>
                    <li>• Use technical levels for stops</li>
                    <li>• Consider using trailing stops</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-red-300 mb-3">
                    Daily Limits
                  </h5>
                  <ul className="text-red-300/80 text-sm space-y-2">
                    <li>• Set maximum daily loss limits</li>
                    <li>• Limit number of trades per day</li>
                    <li>• Take breaks after big losses</li>
                    <li>• Review and adjust limits regularly</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Performance Optimization */}
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Performance Optimization
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-indigo-300 mb-3">
                    Backtesting
                  </h5>
                  <ul className="text-indigo-300/80 text-sm space-y-2">
                    <li>• Test strategies on historical data</li>
                    <li>• Use out-of-sample testing</li>
                    <li>• Consider transaction costs</li>
                    <li>• Test across different market conditions</li>
                    <li>• Avoid overfitting to historical data</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-indigo-300 mb-3">
                    Live Monitoring
                  </h5>
                  <ul className="text-indigo-300/80 text-sm space-y-2">
                    <li>• Monitor performance daily</li>
                    <li>• Track key metrics (win rate, profit factor)</li>
                    <li>• Set up alerts for unusual activity</li>
                    <li>• Regular strategy reviews</li>
                    <li>• Adjust parameters based on performance</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Common Pitfalls */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 border border-yellow-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Common Pitfalls to Avoid
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-yellow-300 mb-3">
                    Technical Issues
                  </h5>
                  <ul className="text-yellow-300/80 text-sm space-y-2">
                    <li>• Over-optimization (curve fitting)</li>
                    <li>• Ignoring transaction costs</li>
                    <li>• Not accounting for slippage</li>
                    <li>• Insufficient testing period</li>
                    <li>• Ignoring market regime changes</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-yellow-300 mb-3">
                    Psychological Issues
                  </h5>
                  <ul className="text-yellow-300/80 text-sm space-y-2">
                    <li>• Constantly tweaking strategies</li>
                    <li>• Abandoning strategies too quickly</li>
                    <li>• Increasing risk after losses</li>
                    <li>• Not following the system rules</li>
                    <li>• Emotional interference with automation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case "troubleshooting":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-orange-400" />
                Troubleshooting Guide
              </h3>
              <p className="text-gray-300 mb-6">
                Common issues and their solutions to help you resolve problems
                quickly and get back to automated trading.
              </p>
            </div>

            {/* Connection Issues */}
            <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Connection Issues
              </h4>
              <div className="space-y-4">
                <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                  <h5 className="font-semibold text-red-300 mb-2">
                    Broker Connection Failed
                  </h5>
                  <p className="text-red-300/80 text-sm mb-3">
                    Your broker account shows as disconnected or fails to
                    connect
                  </p>
                  <div className="space-y-2 text-red-300/80 text-sm">
                    <div>
                      • <strong>Check API credentials:</strong> Verify API key,
                      secret, and passphrase are correct
                    </div>
                    <div>
                      • <strong>Check permissions:</strong> Ensure trading
                      permissions are enabled
                    </div>
                    <div>
                      • <strong>IP whitelist:</strong> Add your IP address to
                      broker's whitelist if required
                    </div>
                    <div>
                      • <strong>API limits:</strong> Check if you've exceeded
                      API rate limits
                    </div>
                    <div>
                      • <strong>Account status:</strong> Verify your broker
                      account is active and funded
                    </div>
                  </div>
                </div>
                <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                  <h5 className="font-semibold text-orange-300 mb-2">
                    Webhook Not Receiving Alerts
                  </h5>
                  <p className="text-orange-300/80 text-sm mb-3">
                    TradingView alerts are not reaching AutomatedTrader
                  </p>
                  <div className="space-y-2 text-orange-300/80 text-sm">
                    <div>
                      • <strong>Check webhook URL:</strong> Ensure correct URL
                      is used in TradingView
                    </div>
                    <div>
                      • <strong>Alert settings:</strong> Verify alert is active
                      and not expired
                    </div>
                    <div>
                      • <strong>Message format:</strong> Check alert message
                      follows correct syntax
                    </div>
                    <div>
                      • <strong>TradingView plan:</strong> Webhooks require
                      TradingView Pro or higher
                    </div>
                    <div>
                      • <strong>Network issues:</strong> Check for internet
                      connectivity problems
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trading Issues */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Trading Issues
              </h4>
              <div className="space-y-4">
                <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                  <h5 className="font-semibold text-yellow-300 mb-2">
                    Orders Not Executing
                  </h5>
                  <p className="text-yellow-300/80 text-sm mb-3">
                    Alerts are received but trades are not placed
                  </p>
                  <div className="space-y-2 text-yellow-300/80 text-sm">
                    <div>
                      • <strong>Insufficient balance:</strong> Check account has
                      enough funds
                    </div>
                    <div>
                      • <strong>Symbol format:</strong> Verify trading pair
                      format matches broker
                    </div>
                    <div>
                      • <strong>Minimum order size:</strong> Check order meets
                      broker's minimum requirements
                    </div>
                    <div>
                      • <strong>Market hours:</strong> Ensure market is open for
                      the asset
                    </div>
                    <div>
                      • <strong>Account permissions:</strong> Verify trading is
                      enabled on the account
                    </div>
                  </div>
                </div>
                <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                  <h5 className="font-semibold text-blue-300 mb-2">
                    Incorrect Position Sizes
                  </h5>
                  <p className="text-blue-300/80 text-sm mb-3">
                    Orders are executing with wrong quantities
                  </p>
                  <div className="space-y-2 text-blue-300/80 text-sm">
                    <div>
                      • <strong>Quantity format:</strong> Check Q parameter uses
                      correct decimal places
                    </div>
                    <div>
                      • <strong>Account type:</strong> Verify spot vs futures
                      account settings
                    </div>
                    <div>
                      • <strong>Base currency:</strong> Ensure quantity is in
                      correct currency
                    </div>
                    <div>
                      • <strong>Leverage settings:</strong> Check leverage
                      multiplier for derivatives
                    </div>
                    <div>
                      • <strong>Risk limits:</strong> Verify position size
                      limits are not restricting orders
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert Issues */}
            <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Alert Message Issues
              </h4>
              <div className="space-y-4">
                <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                  <h5 className="font-semibold text-purple-300 mb-2">
                    Invalid Message Format
                  </h5>
                  <p className="text-purple-300/80 text-sm mb-3">
                    Alert messages are not being parsed correctly
                  </p>
                  <div className="space-y-2 text-purple-300/80 text-sm">
                    <div>
                      • <strong>Syntax check:</strong> Verify D=, X=, A=, Q=,
                      P=, ID= format
                    </div>
                    <div>
                      • <strong>No spaces:</strong> Ensure no extra spaces in
                      parameters
                    </div>
                    <div>
                      • <strong>Case sensitivity:</strong> Use exact case for
                      parameters
                    </div>
                    <div>
                      • <strong>Special characters:</strong> Avoid special
                      characters in values
                    </div>
                    <div>
                      • <strong>Use playground:</strong> Generate messages with
                      Alert Playground
                    </div>
                  </div>
                </div>
                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                  <h5 className="font-semibold text-green-300 mb-2">
                    Multiple Alerts Firing
                  </h5>
                  <p className="text-green-300/80 text-sm mb-3">
                    Too many alerts triggering simultaneously
                  </p>
                  <div className="space-y-2 text-green-300/80 text-sm">
                    <div>
                      • <strong>Alert frequency:</strong> Use "Once Per Bar
                      Close" instead of "Once Per Bar"
                    </div>
                    <div>
                      • <strong>Condition logic:</strong> Review indicator
                      conditions for false signals
                    </div>
                    <div>
                      • <strong>Timeframe:</strong> Consider using higher
                      timeframes
                    </div>
                    <div>
                      • <strong>Filters:</strong> Add additional filters to
                      reduce noise
                    </div>
                    <div>
                      • <strong>Cooldown period:</strong> Implement minimum time
                      between signals
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Issues */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Performance Issues
              </h4>
              <div className="space-y-4">
                <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/20">
                  <h5 className="font-semibold text-cyan-300 mb-2">
                    Slow Order Execution
                  </h5>
                  <p className="text-cyan-300/80 text-sm mb-3">
                    Delays between alert and order placement
                  </p>
                  <div className="space-y-2 text-cyan-300/80 text-sm">
                    <div>
                      • <strong>Server location:</strong> Choose broker servers
                      closest to you
                    </div>
                    <div>
                      • <strong>Internet speed:</strong> Ensure stable, fast
                      internet connection
                    </div>
                    <div>
                      • <strong>API limits:</strong> Check if hitting rate
                      limits
                    </div>
                    <div>
                      • <strong>Market conditions:</strong> High volatility can
                      cause delays
                    </div>
                    <div>
                      • <strong>Broker issues:</strong> Check broker's system
                      status
                    </div>
                  </div>
                </div>
                <div className="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/20">
                  <h5 className="font-semibold text-indigo-300 mb-2">
                    High Slippage
                  </h5>
                  <p className="text-indigo-300/80 text-sm mb-3">
                    Orders executing at worse prices than expected
                  </p>
                  <div className="space-y-2 text-indigo-300/80 text-sm">
                    <div>
                      • <strong>Market orders:</strong> Consider using limit
                      orders instead
                    </div>
                    <div>
                      • <strong>Liquidity:</strong> Trade more liquid
                      pairs/assets
                    </div>
                    <div>
                      • <strong>Position size:</strong> Reduce order sizes in
                      volatile markets
                    </div>
                    <div>
                      • <strong>Timing:</strong> Avoid trading during news
                      events
                    </div>
                    <div>
                      • <strong>Spread:</strong> Check bid-ask spreads before
                      trading
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Getting Help */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Still Need Help?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-green-300 mb-3">
                    Community Support
                  </h5>
                  <p className="text-green-300/80 text-sm mb-4">
                    Join our Discord community with 15,000+ automated traders
                    for real-time help and discussions.
                  </p>
                  <a
                    href="https://discord.gg/jsM4m3fApc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-300 px-4 py-2 rounded-lg font-medium transition-all border border-green-500/30"
                  >
                    <Users className="h-4 w-4" />
                    Join Discord
                  </a>
                </div>
                <div>
                  <h5 className="font-semibold text-green-300 mb-3">
                    Documentation
                  </h5>
                  <p className="text-green-300/80 text-sm mb-4">
                    Browse our comprehensive documentation for detailed guides
                    and tutorials.
                  </p>
                  <button
                    onClick={() => setActiveSection("getting-started")}
                    className="inline-flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 px-4 py-2 rounded-lg font-medium transition-all border border-blue-500/30"
                  >
                    <BookOpen className="h-4 w-4" />
                    Browse Docs
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-400" />
                Security Best Practices
              </h3>
              <p className="text-gray-300 mb-6">
                Protect your trading accounts and funds with these essential
                security measures and best practices.
              </p>
            </div>

            {/* API Security */}
            <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Key className="h-5 w-5 text-red-400" />
                API Key Security
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-red-300 mb-3">
                    Critical Rules
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-red-300">
                          Never enable withdrawal permissions
                        </strong>
                        <p className="text-red-300/80 text-sm">
                          Only enable trading permissions on your API keys
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-red-300">
                          Use IP whitelisting
                        </strong>
                        <p className="text-red-300/80 text-sm">
                          Restrict API access to specific IP addresses
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-red-300">
                          Rotate keys regularly
                        </strong>
                        <p className="text-red-300/80 text-sm">
                          Change API keys every 30-90 days
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-red-300 mb-3">
                    Additional Measures
                  </h5>
                  <ul className="text-red-300/80 text-sm space-y-2">
                    <li>• Store API keys securely (never in plain text)</li>
                    <li>• Use separate API keys for different strategies</li>
                    <li>• Monitor API usage regularly</li>
                    <li>• Set up alerts for unusual activity</li>
                    <li>• Disable unused API keys immediately</li>
                    <li>• Never share API keys with others</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Account Protection
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h5 className="font-semibold text-orange-300 mb-3">
                    Authentication
                  </h5>
                  <ul className="text-orange-300/80 text-sm space-y-2">
                    <li>• Enable 2FA on all accounts</li>
                    <li>• Use authenticator apps (not SMS)</li>
                    <li>• Strong, unique passwords</li>
                    <li>• Regular password updates</li>
                    <li>• Secure password manager</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-orange-300 mb-3">
                    Access Control
                  </h5>
                  <ul className="text-orange-300/80 text-sm space-y-2">
                    <li>• Secure internet connections</li>
                    <li>• Avoid public WiFi for trading</li>
                    <li>• Use VPN when necessary</li>
                    <li>• Log out after sessions</li>
                    <li>• Monitor login activity</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-orange-300 mb-3">
                    Device Security
                  </h5>
                  <ul className="text-orange-300/80 text-sm space-y-2">
                    <li>• Keep devices updated</li>
                    <li>• Use antivirus software</li>
                    <li>• Secure physical access</li>
                    <li>• Backup important data</li>
                    <li>• Use dedicated trading devices</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Risk Management */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-green-500/10 border border-yellow-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Financial Risk Management
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-yellow-300 mb-3">
                    Fund Protection
                  </h5>
                  <ul className="text-yellow-300/80 text-sm space-y-2">
                    <li>• Only trade with funds you can afford to lose</li>
                    <li>• Keep majority of funds in cold storage</li>
                    <li>• Use separate accounts for trading vs holding</li>
                    <li>• Set strict daily/weekly loss limits</li>
                    <li>• Regular profit withdrawals</li>
                    <li>• Diversify across multiple exchanges</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-yellow-300 mb-3">
                    Trading Limits
                  </h5>
                  <ul className="text-yellow-300/80 text-sm space-y-2">
                    <li>• Maximum position size limits</li>
                    <li>• Daily trade count restrictions</li>
                    <li>• Stop-loss on all positions</li>
                    <li>• Maximum drawdown limits</li>
                    <li>• Emergency stop procedures</li>
                    <li>• Regular strategy reviews</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Monitoring & Alerts */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Monitoring & Alerts
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-green-300 mb-3">
                    Account Monitoring
                  </h5>
                  <ul className="text-green-300/80 text-sm space-y-2">
                    <li>• Daily balance checks</li>
                    <li>• Review all transactions</li>
                    <li>• Monitor API usage logs</li>
                    <li>• Check for unauthorized access</li>
                    <li>• Verify all trade executions</li>
                    <li>• Regular security audits</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-green-300 mb-3">
                    Alert Setup
                  </h5>
                  <ul className="text-green-300/80 text-sm space-y-2">
                    <li>• Large position alerts</li>
                    <li>• Unusual activity notifications</li>
                    <li>• Login attempt alerts</li>
                    <li>• API key usage warnings</li>
                    <li>• Balance change notifications</li>
                    <li>• System downtime alerts</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Emergency Procedures */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Emergency Procedures
              </h4>
              <div className="space-y-4">
                <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                  <h5 className="font-semibold text-blue-300 mb-2">
                    Suspected Compromise
                  </h5>
                  <div className="text-blue-300/80 text-sm space-y-1">
                    <div>
                      1. <strong>Immediately disable all API keys</strong>
                    </div>
                    <div>
                      2. <strong>Change all passwords</strong>
                    </div>
                    <div>
                      3. <strong>Close all open positions</strong>
                    </div>
                    <div>
                      4. <strong>Withdraw funds to secure wallet</strong>
                    </div>
                    <div>
                      5. <strong>Contact broker support</strong>
                    </div>
                    <div>
                      6. <strong>Review all recent activity</strong>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                  <h5 className="font-semibold text-purple-300 mb-2">
                    System Malfunction
                  </h5>
                  <div className="text-purple-300/80 text-sm space-y-1">
                    <div>
                      1. <strong>Disable automation immediately</strong>
                    </div>
                    <div>
                      2. <strong>Manually close risky positions</strong>
                    </div>
                    <div>
                      3. <strong>Check system logs</strong>
                    </div>
                    <div>
                      4. <strong>Contact support if needed</strong>
                    </div>
                    <div>
                      5.{" "}
                      <strong>Test with small positions before resuming</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Checklist */}
            <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Security Checklist
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-purple-300 mb-3">
                    Daily Checks
                  </h5>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-purple-300/80 text-sm">
                      <input type="checkbox" className="rounded" />
                      Review account balances
                    </label>
                    <label className="flex items-center gap-2 text-purple-300/80 text-sm">
                      <input type="checkbox" className="rounded" />
                      Check recent transactions
                    </label>
                    <label className="flex items-center gap-2 text-purple-300/80 text-sm">
                      <input type="checkbox" className="rounded" />
                      Verify open positions
                    </label>
                    <label className="flex items-center gap-2 text-purple-300/80 text-sm">
                      <input type="checkbox" className="rounded" />
                      Monitor system alerts
                    </label>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-purple-300 mb-3">
                    Weekly Checks
                  </h5>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-purple-300/80 text-sm">
                      <input type="checkbox" className="rounded" />
                      Review API key usage
                    </label>
                    <label className="flex items-center gap-2 text-purple-300/80 text-sm">
                      <input type="checkbox" className="rounded" />
                      Check login history
                    </label>
                    <label className="flex items-center gap-2 text-purple-300/80 text-sm">
                      <input type="checkbox" className="rounded" />
                      Update security settings
                    </label>
                    <label className="flex items-center gap-2 text-purple-300/80 text-sm">
                      <input type="checkbox" className="rounded" />
                      Backup important data
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "faq":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-blue-400" />
                Frequently Asked Questions
              </h3>
              <p className="text-gray-300 mb-6">
                Find answers to the most common questions about AutomatedTrader
                and automated trading.
              </p>
            </div>

            {/* General Questions */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                General Questions
              </h4>
              <div className="space-y-4">
                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                  <h5 className="font-semibold text-green-300 mb-2">
                    What is AutomatedTrader?
                  </h5>
                  <p className="text-green-300/80 text-sm">
                    AutomatedTrader is a professional platform that connects
                    your TradingView alerts to any supported broker for
                    automated trade execution. It processes webhook alerts from
                    TradingView and executes trades on your behalf 24/7.
                  </p>
                </div>
                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                  <h5 className="font-semibold text-green-300 mb-2">
                    Which brokers are supported?
                  </h5>
                  <p className="text-green-300/80 text-sm">
                    We support 15+ major brokers including Binance, Bybit,
                    KuCoin, MetaTrader 4/5, and more. Check the broker setup
                    section for the complete list and setup instructions.
                  </p>
                </div>
                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                  <h5 className="font-semibold text-green-300 mb-2">
                    Do I need a TradingView Pro account?
                  </h5>
                  <p className="text-green-300/80 text-sm">
                    Yes, webhooks are only available with TradingView Pro, Pro+,
                    or Premium plans. The free TradingView account doesn't
                    support webhook alerts.
                  </p>
                </div>
              </div>
            </div>

            {/* Setup Questions */}
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Setup Questions
              </h4>
              <div className="space-y-4">
                <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                  <h5 className="font-semibold text-blue-300 mb-2">
                    How do I get started?
                  </h5>
                  <p className="text-blue-300/80 text-sm">
                    1. Connect your broker account with API credentials 2.
                    Create alert messages using our Alert Playground 3. Set up
                    TradingView alerts with webhook URLs 4. Test with small
                    positions and monitor results
                  </p>
                </div>
                <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                  <h5 className="font-semibold text-blue-300 mb-2">
                    Is it safe to provide API keys?
                  </h5>
                  <p className="text-blue-300/80 text-sm">
                    Yes, when done correctly. Only enable trading permissions
                    (never withdrawals), use IP whitelisting, and we encrypt all
                    credentials. Never share API keys that have withdrawal
                    permissions enabled.
                  </p>
                </div>
                <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                  <h5 className="font-semibold text-blue-300 mb-2">
                    How fast are trade executions?
                  </h5>
                  <p className="text-blue-300/80 text-sm">
                    Typically under 1 second from TradingView alert to broker
                    execution. Speed depends on your internet connection,
                    broker's API response time, and market conditions.
                  </p>
                </div>
              </div>
            </div>

            {/* Trading Questions */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Trading Questions
              </h4>
              <div className="space-y-4">
                <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                  <h5 className="font-semibold text-purple-300 mb-2">
                    Can I use multiple strategies?
                  </h5>
                  <p className="text-purple-300/80 text-sm">
                    Yes! Use different strategy IDs for each system. This allows
                    you to track performance separately and manage multiple
                    strategies on the same account.
                  </p>
                </div>
                <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                  <h5 className="font-semibold text-purple-300 mb-2">
                    What happens if my internet goes down?
                  </h5>
                  <p className="text-purple-300/80 text-sm">
                    AutomatedTrader runs on our servers, so your internet
                    connection doesn't affect trade execution. However, you
                    won't be able to monitor or manually intervene until your
                    connection is restored.
                  </p>
                </div>
                <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                  <h5 className="font-semibold text-purple-300 mb-2">
                    Can I manually override trades?
                  </h5>
                  <p className="text-purple-300/80 text-sm">
                    Yes, you can manually close positions or disable automation
                    at any time through your broker's platform or by disabling
                    the account in AutomatedTrader.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Questions */}
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Technical Questions
              </h4>
              <div className="space-y-4">
                <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                  <h5 className="font-semibold text-orange-300 mb-2">
                    Why aren't my alerts executing?
                  </h5>
                  <p className="text-orange-300/80 text-sm">
                    Common issues: incorrect webhook URL, wrong message format,
                    insufficient account balance, expired TradingView alert, or
                    broker API issues. Check the troubleshooting section for
                    detailed solutions.
                  </p>
                </div>
                <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                  <h5 className="font-semibold text-orange-300 mb-2">
                    How do I track my performance?
                  </h5>
                  <p className="text-orange-300/80 text-sm">
                    Use the dashboard to view real-time P&L, trade history, and
                    performance metrics. You can also view detailed logs and
                    export data for external analysis.
                  </p>
                </div>
                <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                  <h5 className="font-semibold text-orange-300 mb-2">
                    What are the system requirements?
                  </h5>
                  <p className="text-orange-300/80 text-sm">
                    AutomatedTrader is web-based, so you only need a modern
                    browser and internet connection. No software installation
                    required. Works on desktop, tablet, and mobile devices.
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing Questions */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Pricing & Plans
              </h4>
              <div className="space-y-4">
                <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                  <h5 className="font-semibold text-yellow-300 mb-2">
                    How much does it cost?
                  </h5>
                  <p className="text-yellow-300/80 text-sm">
                    $29/month per connected broker account. This includes
                    unlimited alerts, 24/7 execution, and access to all
                    features. No setup fees or hidden costs.
                  </p>
                </div>
                <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                  <h5 className="font-semibold text-yellow-300 mb-2">
                    Is there a free trial?
                  </h5>
                  <p className="text-yellow-300/80 text-sm">
                    We offer free tools like the Alert Playground and Charts
                    Hub. For automation, we recommend starting with a demo
                    account to test your strategies risk-free.
                  </p>
                </div>
                <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                  <h5 className="font-semibold text-yellow-300 mb-2">
                    Can I cancel anytime?
                  </h5>
                  <p className="text-yellow-300/80 text-sm">
                    Yes, you can cancel your subscription at any time. Your
                    automation will continue until the end of your billing
                    period, and you'll retain access to free tools.
                  </p>
                </div>
              </div>
            </div>

            {/* Support Questions */}
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Support & Community
              </h4>
              <div className="space-y-4">
                <div className="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/20">
                  <h5 className="font-semibold text-indigo-300 mb-2">
                    How do I get help?
                  </h5>
                  <p className="text-indigo-300/80 text-sm">
                    Join our Discord community with 15,000+ traders, browse this
                    documentation, or contact support through the platform. We
                    provide comprehensive guides and real-time assistance.
                  </p>
                </div>
                <div className="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/20">
                  <h5 className="font-semibold text-indigo-300 mb-2">
                    Do you provide trading advice?
                  </h5>
                  <p className="text-indigo-300/80 text-sm">
                    We provide technical support for the platform but not
                    trading advice. Our community shares strategies and
                    experiences, but all trading decisions are your
                    responsibility.
                  </p>
                </div>
                <div className="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/20">
                  <h5 className="font-semibold text-indigo-300 mb-2">
                    Is there educational content?
                  </h5>
                  <p className="text-indigo-300/80 text-sm">
                    Yes! We provide comprehensive documentation, video
                    tutorials, strategy examples, and a marketplace with
                    educational resources from professional traders.
                  </p>
                </div>
              </div>
            </div>

            {/* Still Have Questions */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Still Have Questions?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-green-300 mb-3">
                    Join Our Community
                  </h5>
                  <p className="text-green-300/80 text-sm mb-4">
                    Connect with 15,000+ automated traders in our Discord
                    community for real-time help and strategy discussions.
                  </p>
                  <a
                    href="https://discord.gg/jsM4m3fApc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-300 px-4 py-2 rounded-lg font-medium transition-all border border-green-500/30"
                  >
                    <Users className="h-4 w-4" />
                    Join Discord
                  </a>
                </div>
                <div>
                  <h5 className="font-semibold text-green-300 mb-3">
                    Start Automating
                  </h5>
                  <p className="text-green-300/80 text-sm mb-4">
                    Ready to get started? Connect your first broker account and
                    begin automating your trading strategies.
                  </p>
                  <a
                    href="/dashboard/automate"
                    className="inline-flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 px-4 py-2 rounded-lg font-medium transition-all border border-blue-500/30"
                  >
                    <Bot className="h-4 w-4" />
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              Documentation
            </h1>
            <p className="text-gray-400 mt-1">
              Complete guides for automated trading success
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-80 border-r border-gray-800 bg-gray-900/50">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Documentation
            </h2>
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
                      activeSection === section.id
                        ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="font-medium">{section.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 lg:p-8">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DocumentationPage;
