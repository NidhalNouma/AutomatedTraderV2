"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Zap,
  Shield,
  TrendingUp,
  Star,
  CheckCircle,
  BarChart3,
  Play,
  Award,
  DollarSign,
  Activity,
  ChevronDown,
  FileText,
  Settings,
  LineChart,
  Gauge,
  Bell,
  Menu,
  X,
  Rocket,
  Target,
  Clock,
  Users,
  Lock,
  Cloud,
  Smartphone,
  Globe,
  Code,
  MessageCircle,
  Brain,
  Heart,
  Coffee,
  Moon,
  Crown,
  Sparkles,
  TrendingDown,
  AlertCircle,
} from "lucide-react";
import { Button, Card } from "../ui";
import { ChatWidget } from "../components/ChatWidget";

import { pricingPlans } from "@/utils";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);

  const animatedWords = [
    "TradingView",
    "Indicators",
    "Bots",
    "Alerts",
    "Strategies",
  ];

  const [currentTrade, setCurrentTrade] = useState(0);
  const liveTrades = [
    {
      pair: "BTC/USDT",
      action: "LONG",
      broker: "Hankotrade",
      profit: "+$1,247",
      color: "text-green-400",
    },
    {
      pair: "ETH/USDT",
      action: "SHORT",
      broker: "TradeLocker",
      profit: "+$892",
      color: "text-green-400",
    },
    {
      pair: "EUR/USD",
      action: "LONG",
      broker: "Hankotrade",
      profit: "+$2,156",
      color: "text-green-400",
    },
    {
      pair: "XAU/USD",
      action: "LONG",
      broker: "TradeLocker",
      profit: "+$3,421",
      color: "text-green-400",
    },
    {
      pair: "SOL/USDT",
      action: "SHORT",
      broker: "Hankotrade",
      profit: "+$654",
      color: "text-green-400",
    },
    {
      pair: "GBP/USD",
      action: "LONG",
      broker: "TradeLocker",
      profit: "+$1,089",
      color: "text-green-400",
    },
  ];

  React.useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % animatedWords.length);
    }, 3000);
    const tradeInterval = setInterval(() => {
      setCurrentTrade((prev) => (prev + 1) % liveTrades.length);
    }, 2500);
    return () => {
      clearInterval(wordInterval);
      clearInterval(tradeInterval);
    };
  }, []);

  const actualFeatures = [
    {
      icon: Bot,
      title: "Broker Automation",
      description:
        "Connect 15+ brokers including Binance, Bybit, MetaTrader 4/5, and more. Automate trades with TradingView alerts.",
      color: "from-purple-500/20 to-blue-500/20 border-purple-500/30",
      stats: "15+ Brokers",
      link: "/api/oauth/init",
    },
    {
      icon: Zap,
      title: "Alert Playground",
      description:
        "Generate perfect TradingView alert messages with our interactive tool. Multiple take profits, stop losses, and strategy IDs.",
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
      stats: "Message Generator",
      link: "/api/oauth/init",
    },
    {
      icon: BarChart3,
      title: "Charts Hub",
      description:
        "Live market data for crypto, forex, and stocks. Real-time prices with direct TradingView integration.",
      color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
      stats: "Live Data",
      link: "/api/oauth/init",
    },
    {
      icon: FileText,
      title: "Trading News",
      description:
        "Real-time financial news from multiple sources. Stay updated with market-moving events.",
      color: "from-blue-500/20 to-purple-500/20 border-blue-500/30",
      stats: "Real-time",
      link: "/api/oauth/init",
    },
    {
      icon: Activity,
      title: "Trade History",
      description:
        "Track all automated trades with detailed P&L analysis, win rates, and performance metrics.",
      color: "from-purple-500/20 to-cyan-500/20 border-purple-500/30",
      stats: "Full Analytics",
      link: "/api/oauth/init",
    },
    {
      icon: DollarSign,
      title: "Professional Marketplace",
      description:
        "Access premium trading tools, signals, education, and services from trusted partners.",
      color: "from-cyan-500/20 to-purple-500/20 border-cyan-500/30",
      stats: "50+ Tools",
      link: "/api/oauth/init",
    },
  ];

  const brokerSupport = [
    {
      name: "Hankotrade",
      logo: "HK",
      color: "bg-blue-600",
      category: "Connected",
      connected: true,
    },
    {
      name: "TradeLocker",
      logo: "TL",
      color: "bg-cyan-600",
      category: "Connected",
      connected: true,
    },
    {
      name: "Binance",
      logo: "B",
      color: "bg-yellow-500",
      category: "Coming Soon",
      connected: false,
    },
    {
      name: "Bybit",
      logo: "BB",
      color: "bg-orange-500",
      category: "Coming Soon",
      connected: false,
    },
    {
      name: "MetaTrader 4",
      logo: "MT4",
      color: "bg-blue-800",
      category: "Coming Soon",
      connected: false,
    },
    {
      name: "MetaTrader 5",
      logo: "MT5",
      color: "bg-blue-900",
      category: "Coming Soon",
      connected: false,
    },
    {
      name: "KuCoin",
      logo: "K",
      color: "bg-gray-600",
      category: "Coming Soon",
      connected: false,
    },
    {
      name: "MEXC",
      logo: "M",
      color: "bg-gray-700",
      category: "Coming Soon",
      connected: false,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Professional Crypto Trader",
      company: "Blockchain Capital",
      content:
        "AutomatedTrader revolutionized my trading strategy. The Binance integration is flawless and the alert playground makes creating webhooks so easy.",
      rating: 5,
      avatar: "SC",
      profit: "+340%",
      timeframe: "6 months",
    },
    {
      name: "Mike Rodriguez",
      role: "Forex Trading Expert",
      company: "FX Masters",
      content:
        "The MetaTrader 5 connection works perfectly. My TradingView alerts execute instantly and the trade history tracking is incredibly detailed.",
      rating: 5,
      avatar: "MR",
      profit: "+180%",
      timeframe: "4 months",
    },
    {
      name: "Alex Thompson",
      role: "Algorithmic Trader",
      company: "Quant Solutions",
      content:
        "Setup was incredibly easy with the step-by-step guides. The marketplace has amazing tools and the Discord community is super helpful.",
      rating: 5,
      avatar: "AT",
      profit: "+250%",
      timeframe: "8 months",
    },
  ];

  const trustMetrics = [
    { icon: Users, label: "Active Traders", value: "10,000+" },
    { icon: Bot, label: "Brokers", value: "15+" },
    { icon: Gauge, label: "Uptime", value: "99.9%" },
    { icon: Clock, label: "Avg Response", value: "<100ms" },
  ];

  const platformFeatures = [
    {
      icon: Rocket,
      title: "Lightning Fast Execution",
      description:
        "Sub-100ms trade execution ensures you never miss a trade opportunity",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description:
        "AES-256 encryption, 2FA, and read-only API options keep your data safe",
    },
    {
      icon: Target,
      title: "Multiple Take Profits",
      description:
        "Set up to 10 take profit levels and trailing stops for maximum profit",
    },
    {
      icon: Bell,
      title: "Real-time Alerts",
      description:
        "Get instant notifications for every trade executed on your account",
    },
    {
      icon: LineChart,
      title: "Advanced Analytics",
      description:
        "Track performance with detailed P&L reports, win rates, and metrics",
    },
    {
      icon: Code,
      title: "Developer API",
      description:
        "Build custom integrations with our powerful REST API (coming soon)",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Top Promo Banner */}
      <div className="relative z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 py-3 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
        <p className="text-white font-bold text-sm sm:text-base relative z-10">
          🔥 <span className="animate-pulse">Use Code "FIRSTACCESS"</span> for
          50% OFF Lifetime Access
          <a
            href="#pricing"
            className="ml-3 underline hover:text-blue-200 transition-colors"
          >
            Get Started →
          </a>
        </p>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-4 sm:px-6 lg:px-8 py-4 backdrop-blur-2xl bg-black/80 border-b border-white/5 sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://trustedsignalsvip.com/wp-content/uploads/2025/05/dark-logo-scaled.webp"
              alt="Automated Trader"
              className="h-9 w-auto brightness-110"
            />
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
            >
              Reviews
            </a>
            <Link href="/api/oauth/init">
              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105">
                Start Automating
              </button>
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/5 py-6 px-4 shadow-2xl">
            <div className="flex flex-col gap-1">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium py-3 px-4 rounded-lg"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium py-3 px-4 rounded-lg"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium py-3 px-4 rounded-lg"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium py-3 px-4 rounded-lg"
              >
                Reviews
              </a>

              <Link href="/api/oauth/init" className="mt-4">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/30">
                  Start Automating
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-12 lg:pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Centered Content Layout */}
          <div className="text-center max-w-5xl mx-auto space-y-8">
            {/* Compact Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-full px-4 py-2 backdrop-blur-sm animate-bounce-slow">
              <AlertCircle className="h-4 w-4 text-red-400 animate-pulse" />
              <span className="text-red-400 text-sm font-bold">
                Losing Money While You Sleep?
              </span>
            </div>

            {/* Large, Bold Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight">
              Automate Your
              <br />
              <span className="relative inline-block mt-2">
                <span
                  key={currentWord}
                  className="bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent animate-fade-slide-in"
                >
                  {animatedWords[currentWord]}
                </span>
              </span>
            </h1>

            {/* Simple Description */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              TradingView alerts execute instantly on{" "}
              <span className="text-white font-bold">15+ brokers</span>.
              <span className="block mt-3 text-green-400 font-bold">
                No coding. No watching charts. Just profitable trades 24/7.
              </span>
            </p>

            {/* Live Trade Ticker */}
            <div className="w-full max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 bg-gradient-to-r from-blue-950/60 via-purple-950/60 to-violet-950/60 border border-blue-500/30 rounded-xl px-3 sm:px-6 py-3 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-lg shadow-green-500/50"></span>
                  </div>
                  <span className="text-green-400 text-xs sm:text-sm font-black tracking-wide">
                    LIVE EXECUTION
                  </span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-white/10"></div>
                <div
                  key={currentTrade}
                  className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 animate-fade-slide-in text-center"
                >
                  <span className="text-white font-bold text-xs sm:text-base">
                    {liveTrades[currentTrade].pair}
                  </span>
                  <span
                    className={`text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded whitespace-nowrap ${
                      liveTrades[currentTrade].action === "LONG"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {liveTrades[currentTrade].action}
                  </span>
                  <span className="text-blue-400 text-[10px] sm:text-sm font-medium whitespace-nowrap">
                    → {liveTrades[currentTrade].broker}
                  </span>
                  <span
                    className={`${liveTrades[currentTrade].color} text-xs sm:text-base font-bold whitespace-nowrap`}
                  >
                    {liveTrades[currentTrade].profit}
                  </span>
                </div>
              </div>
            </div>

            {/* Single Strong CTA */}
            <div className="pt-6">
              <Link href="/api/oauth/init">
                <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 text-white px-12 py-6 rounded-2xl text-xl font-black hover:from-blue-700 hover:via-purple-700 hover:to-violet-700 transition-all duration-200 shadow-2xl shadow-purple-500/40 hover:scale-105 hover:shadow-purple-500/60 animate-pulse-slow relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  <span className="relative">Start Automating Now</span>
                  <ArrowRight className="h-6 w-6 relative group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <p className="text-sm text-gray-400 mt-4 font-medium">
                ⚡ 60 second setup ·
                <span className="text-emerald-400 mx-1">✓</span> Try dashboard
                free ·<span className="text-emerald-400 mx-1">✓</span> Cancel
                anytime
              </p>
              <p className="text-xs text-gray-500 mt-2">
                10,000+ profitable traders trust AutomatedTrader
              </p>
            </div>

            {/* Broker Logos Ticker */}
            <div className="pt-12 overflow-hidden max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <div className="text-base text-gray-300 font-semibold tracking-wide uppercase">
                  Supported Platforms - Cloud API Trading
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  We connect via secure APIs. Your credentials never leave your
                  broker.
                </p>
              </div>
              <div className="relative">
                {/* Gradient overlays for fade effect */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

                <div className="flex animate-scroll-slow whitespace-nowrap">
                  <div className="flex items-center gap-8 shrink-0">
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-xl border border-green-400/40 hover:border-green-400/70 transition-all duration-300 shadow-lg shadow-green-500/10 hover:shadow-green-500/30 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-green-400 transition-colors">
                        TradeLocker
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                        LIVE
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-xl border border-green-400/40 hover:border-green-400/70 transition-all duration-300 shadow-lg shadow-green-500/10 hover:shadow-green-500/30 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-green-400 transition-colors">
                        Hankotrade
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                        LIVE
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-blue-400 transition-colors">
                        MetaTrader 4
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                        SOON
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-blue-400 transition-colors">
                        MetaTrader 5
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                        SOON
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-xl border border-green-400/40 hover:border-green-400/70 transition-all duration-300 shadow-lg shadow-green-500/10 hover:shadow-green-500/30 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-green-400 transition-colors">
                        TradingView
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                        LIVE
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-blue-400 transition-colors">
                        Interactive Brokers
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                        SOON
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-blue-400 transition-colors">
                        TD Ameritrade
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                        SOON
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-blue-400 transition-colors">
                        Alpaca
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                        SOON
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-blue-400 transition-colors">
                        Binance
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                        SOON
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-blue-400 transition-colors">
                        Coinbase
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                        SOON
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-blue-400 transition-colors">
                        Kraken
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                        SOON
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-blue-400 transition-colors">
                        eToro
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                        SOON
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 shrink-0">
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-xl border border-green-400/40 hover:border-green-400/70 transition-all duration-300 shadow-lg shadow-green-500/10 hover:shadow-green-500/30 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-green-400 transition-colors">
                        TradeLocker
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                        LIVE
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-xl border border-green-400/40 hover:border-green-400/70 transition-all duration-300 shadow-lg shadow-green-500/10 hover:shadow-green-500/30 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-green-400 transition-colors">
                        Hankotrade
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                        LIVE
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-blue-400 transition-colors">
                        MetaTrader 4
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                        SOON
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-blue-400 transition-colors">
                        MetaTrader 5
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                        SOON
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-xl border border-green-400/40 hover:border-green-400/70 transition-all duration-300 shadow-lg shadow-green-500/10 hover:shadow-green-500/30 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-green-400 transition-colors">
                        TradingView
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                        LIVE
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-blue-400 transition-colors">
                        Interactive Brokers
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                        SOON
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-blue-400 transition-colors">
                        TD Ameritrade
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                        SOON
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-blue-400 transition-colors">
                        Alpaca
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                        SOON
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-blue-400 transition-colors">
                        Binance
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                        SOON
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-blue-400 transition-colors">
                        Coinbase
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                        SOON
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-blue-400 transition-colors">
                        Kraken
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                        SOON
                      </span>
                    </div>
                    <div className="group relative flex items-center justify-center h-16 px-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <span className="text-white font-bold text-xl tracking-wide group-hover:text-blue-400 transition-colors">
                        eToro
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                        SOON
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Flow Illustration */}
          <div className="mt-20 lg:mt-24 max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                How It Works:{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                  Cloud API Trading
                </span>
              </h2>
              <p className="text-lg text-gray-400">
                TradingView pings us. We ping your broker. That's it.
              </p>
            </div>

            <div className="relative">
              {/* Connection Lines - Desktop */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-pulse"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                {/* Step 1: TradingView */}
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 h-full">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-blue-500/50 relative">
                        <TrendingUp className="w-10 h-10 text-white" />
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-black">
                          1
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        TradingView Alert
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        Your strategy fires an alert with trade details
                      </p>
                      <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 w-full">
                        <code className="text-blue-400 text-xs font-mono">
                          BUY EURUSD
                          <br />
                          Entry: 1.0950
                          <br />
                          SL: 1.0900
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: AutomatedTrader Cloud */}
                <div className="relative group lg:translate-y-8">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-violet-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 h-full">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center shadow-2xl shadow-purple-500/50 relative">
                        <Zap className="w-10 h-10 text-white" />
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-black">
                          2
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        AutomatedTrader
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        Our cloud receives webhook & validates via secure API
                      </p>
                      <div className="flex gap-2 mt-4">
                        <div className="px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg">
                          <span className="text-green-400 text-xs font-bold">
                            ✓ Validated
                          </span>
                        </div>
                        <div className="px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                          <span className="text-purple-400 text-xs font-bold">
                            ⚡ 0.3s
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Your Broker */}
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-green-500/30 hover:border-green-500/60 transition-all duration-300 h-full">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/50 relative">
                        <Rocket className="w-10 h-10 text-white" />
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-black">
                          3
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        Trade Executed
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        Broker receives order via API & executes instantly
                      </p>
                      <div className="mt-4 space-y-2 w-full">
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-2">
                          <span className="text-green-400 text-sm font-bold">
                            ✓ Order Filled
                          </span>
                        </div>
                        <div className="text-gray-500 text-xs">
                          Your credentials stay secure at your broker
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Points */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <h4 className="text-white font-bold">100% Secure APIs</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Your broker credentials never leave your account. We only
                    send trade signals.
                  </p>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Cloud className="w-5 h-5 text-purple-400" />
                    <h4 className="text-white font-bold">
                      Cloud Infrastructure
                    </h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    24/7 uptime. No software to install. Works from anywhere in
                    the world.
                  </p>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-green-400" />
                    <h4 className="text-white font-bold">Lightning Fast</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Average execution time: 0.3 seconds from alert to broker.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Risk Management Section */}
          <div className="mt-20 lg:mt-24 max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                Professional{" "}
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Risk Management
                </span>
              </h2>
              <p className="text-lg text-gray-400">
                Take profits like the pros. Protect your capital. Maximize
                gains.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Stop Loss & Take Profit Visual */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-green-500/30 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Take Profit Targets
                      </h3>
                      <p className="text-sm text-gray-400">
                        Lock in gains automatically
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 via-emerald-400 to-teal-400 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-gray-500">Entry</span>
                        <span className="text-xs text-green-400 font-bold">
                          +75% Profit
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-sm text-gray-300">
                            TP1 @ +25%
                          </span>
                        </div>
                        <span className="text-sm text-green-400 font-bold">
                          Close 33%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                          <span className="text-sm text-gray-300">
                            TP2 @ +50%
                          </span>
                        </div>
                        <span className="text-sm text-emerald-400 font-bold">
                          Close 33%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                          <span className="text-sm text-gray-300">
                            TP3 @ +75%
                          </span>
                        </div>
                        <span className="text-sm text-teal-400 font-bold">
                          Close 34%
                        </span>
                      </div>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                      <p className="text-green-400 text-xs font-medium">
                        ✓ Secure profits at multiple levels while trend
                        continues
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partial Profits Visual */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-violet-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-purple-500/30 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Partial Profits
                      </h3>
                      <p className="text-sm text-gray-400">
                        Reduce risk, keep upside
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Position Size</span>
                          <span className="text-purple-400 font-bold">
                            $10,000
                          </span>
                        </div>
                        <div className="relative h-8 bg-gray-900 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 flex">
                            <div
                              className="h-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold"
                              style={{ width: "50%" }}
                            >
                              50%
                            </div>
                            <div
                              className="h-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold"
                              style={{ width: "30%" }}
                            >
                              30%
                            </div>
                            <div
                              className="h-full bg-purple-700 flex items-center justify-center text-white text-xs font-bold"
                              style={{ width: "20%" }}
                            >
                              20%
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between text-purple-300">
                          <span>50% closed @ +5%</span>
                          <span className="font-bold">+$250</span>
                        </div>
                        <div className="flex justify-between text-purple-300">
                          <span>30% closed @ +10%</span>
                          <span className="font-bold">+$300</span>
                        </div>
                        <div className="flex justify-between text-purple-300">
                          <span>20% let run @ +20%</span>
                          <span className="font-bold">+$400</span>
                        </div>
                        <div className="pt-2 border-t border-gray-700 flex justify-between text-white font-bold">
                          <span>Total Profit</span>
                          <span className="text-green-400">+$950</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                      <p className="text-purple-400 text-xs font-medium">
                        💡 Institutional strategy: Lock in gains while staying
                        in the trend
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
                <div className="text-3xl font-black text-red-400 mb-2">
                  -73%
                </div>
                <p className="text-sm text-gray-400">
                  Average trader without stop loss
                </p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
                <div className="text-3xl font-black text-yellow-400 mb-2">
                  +12%
                </div>
                <p className="text-sm text-gray-400">With basic take profit</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
                <div className="text-3xl font-black text-green-400 mb-2">
                  +47%
                </div>
                <p className="text-sm text-gray-400">
                  With partial profit strategy
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard Preview Below */}
          <div className="mt-20 lg:mt-24 max-w-6xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-violet-600/30 rounded-3xl blur-3xl animate-pulse-slow"></div>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 rounded-2xl opacity-75"></div>
                <img
                  src="https://trustedsignalsvip.com/wp-content/uploads/2025/10/Screenshot-2025-10-20-at-12.29.07-AM.png"
                  alt="Dashboard Preview"
                  className="relative rounded-2xl shadow-2xl border-2 border-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Banner 1 */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-violet-900/30 border-y border-blue-500/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-2xl sm:text-3xl font-bold text-white mb-4">
            <span className="text-green-400">10,000+ traders</span> are making
            money right now while you read this.
            <span className="block text-xl text-blue-400 mt-2">
              Don't let another profitable alert slip away.
            </span>
          </p>
          <Link href="/api/oauth/init">
            <Button
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl animate-pulse-slow"
            >
              Start Automating Now
            </Button>
          </Link>
        </div>
      </div>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-full px-5 py-2 mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-400 text-sm font-bold tracking-wide">
                FROM ALERT TO EXECUTION
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              From Zero to
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                Profitable Automation
              </span>{" "}
              in 3 Minutes
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              <span className="text-white font-bold">
                No coding. No complexity. No BS.
              </span>
              <span className="block mt-2">
                Set it up once, profit forever. Even your grandma could do it.
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: 1,
                icon: Settings,
                title: "Connect Your Broker",
                description:
                  "Enter your API credentials for Binance, MetaTrader, or any supported broker. Takes 60 seconds.",
                color: "from-blue-500 to-blue-600",
              },
              {
                step: 2,
                icon: Zap,
                title: "Create Alert Webhook",
                description:
                  "Use our playground to generate the perfect TradingView alert message. Copy & paste into TradingView.",
                color: "from-purple-500 to-purple-600",
              },
              {
                step: 3,
                icon: Rocket,
                title: "Trade Automatically",
                description:
                  "Your strategy runs 24/7. Every TradingView alert executes instantly on your broker. Zero delays.",
                color: "from-violet-500 to-violet-600",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <Card
                    variant="gradient"
                    className="relative border-blue-500/30 hover:border-blue-500/60 transition-all h-full"
                  >
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br {item.color} flex items-center justify-center text-white font-bold text-xl shadow-xl z-10">
                      {item.step}
                    </div>
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/api/oauth/init">
              <Button
                size="lg"
                icon={Rocket}
                iconPosition="right"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 hover:from-blue-700 hover:via-purple-700 hover:to-violet-700 shadow-xl"
              >
                Start Automating Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Traders Choose Automation - DRAMATICALLY IMPROVED */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900/80 via-gray-950 to-black/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-red-500/30 rounded-full px-5 py-2 mb-6">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <span className="text-red-400 text-sm font-bold tracking-wide">
                MANUAL VS AUTOMATED
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Why Traders Choose
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                {" "}
                Automation
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Stop losing money to human limitations. Let technology do the
              heavy lifting.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Manual Trading - Problems */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-red-900/20 rounded-3xl blur-xl"></div>
              <Card
                variant="gradient"
                className="relative border-red-500/30 h-full"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                    <TrendingDown className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Manual Trading
                    </h3>
                    <p className="text-red-400 text-sm font-semibold">
                      The Old Way (Costing You Money)
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: Moon,
                      title: "Miss Trades While Sleeping",
                      desc: "Markets never sleep. You do. Miss opportunities every single night.",
                      lost: "$500+/night",
                    },
                    {
                      icon: Brain,
                      title: "Emotional Decision Making",
                      desc: "Fear and greed destroy accounts. One emotional trade wipes out weeks of gains.",
                      lost: "Account killer",
                    },
                    {
                      icon: Clock,
                      title: "Slow Execution Speed",
                      desc: "By the time you click, price moved. Manual = 2-5 second delays = worse fills.",
                      lost: "2-5% slippage",
                    },
                    {
                      icon: Coffee,
                      title: "Chained to Your Screen",
                      desc: "Can't enjoy life. Can't take breaks. Trading owns your time.",
                      lost: "Your freedom",
                    },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-4 p-4 bg-red-500/5 rounded-xl border border-red-500/20"
                      >
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-white font-bold text-sm">
                              {item.title}
                            </h4>
                            <span className="text-red-400 text-xs font-bold whitespace-nowrap bg-red-500/10 px-2 py-1 rounded">
                              -{item.lost}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
                  <p className="text-red-200 text-sm text-center font-semibold">
                    💸 Average manual trader loses 40% of potential profits to
                    these issues
                  </p>
                </div>
              </Card>
            </div>

            {/* Automated Trading - Solutions */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
              <Card
                variant="gradient"
                className="relative border-blue-500/50 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-violet-900/10 h-full shadow-2xl shadow-blue-500/20"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50 animate-pulse">
                    <Sparkles className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      AutomatedTrader
                    </h3>
                    <p className="text-blue-400 text-sm font-semibold">
                      The Smart Way (Making You Money)
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: Moon,
                      title: "24/7 Execution. Never Sleep.",
                      desc: "Trade London, NYC, Tokyo sessions automatically. Capture every opportunity around the clock.",
                      gain: "+$500+/night",
                    },
                    {
                      icon: Brain,
                      title: "Zero Emotions. Pure Logic.",
                      desc: "Execute your strategy perfectly every time. No fear. No greed. No hesitation. Just wins.",
                      gain: "+40% consistency",
                    },
                    {
                      icon: Rocket,
                      title: "Sub-100ms Execution",
                      desc: "Fastest execution in the industry. Get better fills, lower slippage, higher profits.",
                      gain: "+2-5% per trade",
                    },
                    {
                      icon: Heart,
                      title: "Live Your Life Freely",
                      desc: "Set it once. Forget it. Spend time with family, travel, sleep. Your bot works for you.",
                      gain: "Priceless",
                    },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl border border-blue-500/30 hover:border-blue-500/60 transition-all group/item"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <Icon className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-white font-bold text-sm">
                              {item.title}
                            </h4>
                            <span className="text-blue-400 text-xs font-bold whitespace-nowrap bg-blue-500/10 px-2 py-1 rounded">
                              {item.gain}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 p-5 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/40 rounded-xl">
                  <p className="text-blue-100 text-center font-bold mb-2">
                    🚀 Average automated trader captures 95% of profitable
                    signals
                  </p>
                  <Link href="/api/oauth/init">
                    <Button
                      size="lg"
                      icon={Rocket}
                      iconPosition="right"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                    >
                      Start Automating Now
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                10,000+
              </div>
              <div className="text-gray-300 text-sm">Traders Automated</div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/20 to-violet-900/20 border border-purple-500/30 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">2M+</div>
              <div className="text-gray-300 text-sm">Trades Executed</div>
            </div>
            <div className="bg-gradient-to-br from-violet-900/20 to-blue-900/20 border border-violet-500/30 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-violet-400 mb-2">
                99.9%
              </div>
              <div className="text-gray-300 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Banner 2 - Lifetime Upsell */}
      <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-900/20 via-orange-900/20 to-amber-900/20 border-y border-yellow-500/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-4">
            <Crown className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-400 text-xs font-bold tracking-wide">
              LIFETIME EXCLUSIVE
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Upgrade to Lifetime. Get{" "}
            <span className="text-yellow-400">One Click Bot</span>.
          </h3>
          <p className="text-gray-300 mb-6 text-lg font-semibold">
            Start Automating in 3 Minutes.
          </p>
          <a href="https://whop.com/automated-trader-free/automated-trader-lifetime/">
            <Button
              size="lg"
              icon={Crown}
              iconPosition="right"
              className="bg-gradient-to-r from-yellow-600 via-orange-600 to-amber-600 hover:from-yellow-700 hover:via-orange-700 hover:to-amber-700 shadow-2xl shadow-yellow-500/30 animate-pulse-slow"
            >
              Upgrade to Lifetime
            </Button>
          </a>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-full px-5 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-bold tracking-wide">
                PLATFORM FEATURES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                {" "}
                Print Money 24/7
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <span className="text-white font-bold">
                The exact same tools pros use to make millions.
              </span>
              <span className="block mt-2">
                Now available to you for pennies on the dollar.
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actualFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Link key={idx} href={feature.link}>
                  <Card
                    variant="gradient"
                    className={`h-full hover:border-blue-500/60 transition-all group cursor-pointer bg-gradient-to-br ${feature.color}`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">
                        {feature.title}
                      </h3>
                      <span className="text-xs font-bold bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full">
                        {feature.stats}
                      </span>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-blue-400 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/api/oauth/init">
              <Button
                size="lg"
                icon={Rocket}
                iconPosition="right"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 hover:from-blue-700 hover:via-purple-700 hover:to-violet-700 shadow-xl"
              >
                Explore All Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Broker Support */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900/50 to-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-full px-5 py-2 mb-6">
              <Globe className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-bold tracking-wide">
                BROKER INTEGRATIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Connect to{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                15+ Brokers
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Trade crypto on Binance, Bybit, or forex on MetaTrader. One
              platform, unlimited possibilities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {brokerSupport.map((broker, idx) => (
              <div key={idx} className="group relative">
                <Card
                  variant="gradient"
                  className={`text-center h-full relative overflow-hidden ${
                    broker.connected
                      ? "border-blue-500/50 shadow-lg shadow-blue-500/20"
                      : "border-gray-700/50 opacity-60"
                  } transition-all`}
                >
                  {broker.connected && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                  )}
                  <div
                    className={`w-16 h-16 rounded-2xl ${
                      broker.color
                    } flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg ${
                      broker.connected ? "group-hover:scale-110" : ""
                    } transition-transform`}
                  >
                    {broker.logo}
                  </div>
                  <h4
                    className={`font-bold mb-1 ${
                      broker.connected ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {broker.name}
                  </h4>
                  <p
                    className={`text-sm font-semibold ${
                      broker.connected ? "text-blue-400" : "text-gray-500"
                    }`}
                  >
                    {broker.category}
                  </p>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 text-lg mb-4">
              More brokers launching soon.{" "}
              <span className="text-blue-400 font-bold">Stay tuned!</span>
            </p>
            <Link href="/api/oauth/init">
              <Button
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Connect Your Broker
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-full px-5 py-2 mb-6">
              <Award className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-bold tracking-wide">
                SUCCESS STORIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              What{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                Traders Say
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join thousands of profitable traders automating their strategies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card
                key={idx}
                variant="gradient"
                className="border-blue-500/30 hover:border-blue-500/60 transition-all group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {testimonial.profit}
                    </div>
                    <div className="text-xs text-gray-400">Profit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {testimonial.timeframe}
                    </div>
                    <div className="text-xs text-gray-400">Timeframe</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900/80 via-gray-950 to-black/90"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-full px-5 py-2 mb-6">
              <DollarSign className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-bold tracking-wide">
                PRICING PLANS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                Trading Plan
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Start today and scale as you grow. Cancel anytime.
            </p>
          </div>

          {/* Lifetime Plan - Featured at Top */}
          <div className="max-w-4xl mx-auto mb-12">
            {pricingPlans
              .filter((plan) => plan.name === "Lifetime")
              .map((plan, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-xl z-10 whitespace-nowrap animate-pulse">
                    🔥 {plan.highlight} - 50% OFF with code FIRSTACCESS
                  </div>
                  <Card
                    variant="gradient"
                    className="border-green-500/50 shadow-2xl shadow-green-500/30 bg-gradient-to-br from-green-900/20 via-gray-900 to-emerald-900/20"
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 rounded-full px-4 py-1.5 mb-4">
                          <Crown className="h-4 w-4 text-yellow-400" />
                          <span className="text-green-300 text-xs font-bold">
                            LIFETIME ACCESS
                          </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">
                          {plan.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                          {plan.description}
                        </p>
                        <div className="flex items-baseline justify-center md:justify-start gap-2 mb-6">
                          <span className="text-gray-400 line-through text-2xl">
                            $2,999
                          </span>
                          <span className="text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                            {plan.price}
                          </span>
                          <span className="text-gray-400 text-lg">
                            {plan.period}
                          </span>
                        </div>
                        <div className="bg-green-500/20 border border-green-500/40 rounded-xl p-4 mb-6">
                          <p className="text-green-300 text-sm font-semibold mb-2">
                            💰 Save $1,500 with code:
                          </p>
                          <div className="font-mono bg-green-500/30 px-4 py-2 rounded-lg text-green-200 font-bold text-lg text-center">
                            FIRSTACCESS
                          </div>
                        </div>
                        <a
                          href={plan.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="lg"
                            icon={Rocket}
                            iconPosition="right"
                            className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 shadow-xl text-lg py-4"
                          >
                            {plan.cta}
                          </Button>
                        </a>
                      </div>
                      <div>
                        <ul className="space-y-3">
                          {plan.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300 text-sm leading-relaxed">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
          </div>

          {/* Monthly Plans */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pricingPlans
              .filter((plan) => plan.name !== "Lifetime")
              .map((plan, idx) => (
                <div
                  key={idx}
                  className={`relative group ${plan.popular ? "lg:-mt-4" : ""}`}
                >
                  {(plan.popular || plan.highlight) && (
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-xl z-10 whitespace-nowrap">
                      {plan.highlight}
                    </div>
                  )}
                  <Card
                    variant="gradient"
                    className={`h-full ${
                      plan.popular
                        ? "border-blue-500/50 shadow-2xl shadow-blue-500/20"
                        : "border-gray-700/50"
                    }`}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                        {plan.description}
                      </p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-black text-white">
                          {plan.price}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={plan.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="md"
                        icon={Rocket}
                        iconPosition="right"
                        className={`w-full ${
                          plan.popular
                            ? "bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 hover:from-blue-700 hover:via-purple-700 hover:to-violet-700 shadow-xl"
                            : "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </a>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-violet-900/20 border-y border-blue-500/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/50 animate-pulse">
              <Rocket className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              <span className="text-red-400">WARNING:</span> Your Competition is{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                Already Automated
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              <span className="text-white font-bold">
                10,000+ traders are capturing trades you're missing right now.
              </span>
              <span className="block mt-2">
                Don't fall further behind. Automate today, profit tomorrow.
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/api/oauth/init">
              <Button
                size="lg"
                icon={Rocket}
                iconPosition="right"
                className="w-full sm:w-auto bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 shadow-2xl shadow-green-500/30 text-lg py-6 px-8 animate-pulse-slow"
              >
                Start Automating Today
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button
                size="lg"
                variant="outline"
                icon={Play}
                iconPosition="left"
                className="w-full sm:w-auto text-lg py-6 px-8 border-gray-700 hover:border-blue-500"
              >
                See How It Works
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <p className="text-gray-300 text-sm font-semibold">
                Try Dashboard Free
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <p className="text-gray-300 text-sm font-semibold">
                60 Second Setup
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <p className="text-gray-300 text-sm font-semibold">
                Cancel Anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-black/80 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img
                src="https://trustedsignalsvip.com/wp-content/uploads/2025/05/dark-logo-scaled.webp"
                alt="Automated Trader"
                className="h-10 w-auto mb-4"
              />
              <p className="text-gray-400 text-sm leading-relaxed">
                Automate your TradingView alerts with any broker. Trade smarter,
                not harder.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <Link
                    href="/api/oauth/init"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/docs"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Discord Community
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Reviews
                  </a>
                </li>
                <li>
                  <Link
                    href="/dashboard/status"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    System Status
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Risk Disclaimer
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 AutomatedTrader. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
