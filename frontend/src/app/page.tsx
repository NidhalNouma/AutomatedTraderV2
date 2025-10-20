import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Star,
  CheckCircle,
  BarChart3,
  Globe,
  Smartphone,
  Clock,
  Play,
  Award,
  Target,
  Rocket,
  DollarSign,
  Activity,
  ChevronDown,
  ExternalLink,
  AlertTriangle,
  BookOpen,
  FileText,
  Settings,
  Database,
  Webhook,
  LineChart,
  PieChart,
  Newspaper,
  MessageSquare,
  MessageCircle,
  Headphones,
  Code,
  Layers,
  Server,
  Key,
  Lock,
  Eye,
  Cpu,
  Gauge,
  Wifi,
  RefreshCw,
  Bell,
  Sliders,
  Plus,
} from "lucide-react";
import { Button, Card } from "../ui";

export default function HomePage() {
  const actualFeatures = [
    {
      icon: Bot,
      title: "Broker Automation",
      description:
        "Connect 15+ brokers including Binance, Bybit, MetaTrader 4/5, and more. Automate trades with TradingView alerts.",
      color: "from-blue-500/20 to-purple-500/20 border-blue-500/30",
      stats: "15+ Brokers",
      link: "/api/oauth/init",
    },
    {
      icon: Zap,
      title: "Alert Playground",
      description:
        "Generate perfect TradingView alert messages with our interactive tool. Multiple take profits, stop losses, and strategy IDs.",
      color: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
      stats: "Message Generator",
      link: "/api/oauth/init",
    },
    {
      icon: BarChart3,
      title: "Charts Hub",
      description:
        "Live market data for crypto, forex, and stocks. Real-time prices with direct TradingView integration for alert creation.",
      color: "from-blue-500/20 to-purple-500/20 border-blue-500/30",
      stats: "Live Data",
      link: "/api/oauth/init",
    },
    {
      icon: FileText,
      title: "Trading News",
      description:
        "Real-time financial news from multiple sources. Stay updated with market-moving events and trading opportunities.",
      color: "from-purple-500/20 to-blue-500/20 border-purple-500/30",
      stats: "Real-time",
      link: "/api/oauth/init",
    },
    {
      icon: Activity,
      title: "Trade History",
      description:
        "Track all your automated trades with detailed P&L analysis, win rates, and performance metrics across all connected accounts.",
      color: "from-blue-500/20 to-purple-500/20 border-blue-500/30",
      stats: "Full Analytics",
      link: "/api/oauth/init",
    },
    {
      icon: DollarSign,
      title: "Professional Marketplace",
      description:
        "Access premium trading tools, signals, education, and services from trusted partners in the trading community.",
      color: "from-purple-500/20 to-blue-500/20 border-purple-500/30",
      stats: "50+ Tools",
      link: "/api/oauth/init",
    },
  ];

  const brokerSupport = [
    { name: "Binance", logo: "B", color: "bg-yellow-500", category: "Crypto" },
    { name: "Bybit", logo: "BB", color: "bg-orange-500", category: "Crypto" },
    {
      name: "MetaTrader 4",
      logo: "MT4",
      color: "bg-blue-800",
      category: "Forex",
    },
    {
      name: "MetaTrader 5",
      logo: "MT5",
      color: "bg-blue-900",
      category: "Forex",
    },
    { name: "KuCoin", logo: "K", color: "bg-blue-600", category: "Crypto" },
    { name: "Bitget", logo: "BG", color: "bg-blue-600", category: "Crypto" },
    {
      name: "TradeLocker",
      logo: "TL",
      color: "bg-gray-700",
      category: "Forex",
    },
    { name: "MEXC", logo: "M", color: "bg-purple-500", category: "Crypto" },
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

  const stats = [];

  const pricingPlans = [
    {
      name: "Basic",
      price: "$29",
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
      cta: "Get Started",
      highlight: "Most Popular for Beginners",
      link: "https://whop.com/automated-trader-free/automated-trader/",
    },
    {
      name: "Pro",
      price: "$79",
      period: "/month",
      description: "For serious traders and growing portfolios",
      features: [
        "3 Broker Accounts",
        "Advanced Alert Templates (Coming Soon)",
        "Premium Market Data",
        "Advanced Analytics (Coming Soon)",
        "Priority Support",
        "Custom Webhook URLs (Coming Soon)",
        "Risk Management Tools",
        "Portfolio Tracking",
        "Real Trader Reviews",
      ],
      popular: true,
      cta: "Get Started",
      highlight: "Best Value",
      link: "https://whop.com/automated-trader-free/automatedtrader/",
    },
    {
      name: "Advanced",
      price: "$199",
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
        "API Access (Coming Soon)",
      ],
      popular: false,
      cta: "Get Started",
      highlight: "Enterprise Grade",
      link: "https://whop.com/automated-trader-free/automated-trader-advanced/",
    },
    {
      name: "Lifetime",
      price: "$2,999",
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
        "API Access (Coming Soon)",
        "Early Access to New Features",
      ],
      popular: false,
      isLifetime: true,
      cta: "Get Lifetime Access",
      highlight: "Best Deal",
      link: "https://whop.com/automated-trader-free/automated-trader-lifetime/",
    },
  ];

  const dashboardFeatures = [
    {
      title: "Real-time Dashboard",
      description:
        "Monitor all your automated trades, P&L, and account performance in one place",
      icon: Activity,
      image:
        "https://trustedsignalsvip.com/wp-content/uploads/2025/10/Screenshot-2025-10-20-at-12.29.07-AM.png",
    },
    {
      title: "Broker Management",
      description:
        "Connect and manage multiple broker accounts with secure API integration",
      icon: Settings,
      image:
        "https://trustedsignalsvip.com/wp-content/uploads/2025/10/Screenshot-2025-10-20-at-12.35.03-AM.png",
    },
    {
      title: "Alert Creation",
      description:
        "Generate perfect TradingView alert messages with our interactive playground",
      icon: Zap,
      image:
        "https://trustedsignalsvip.com/wp-content/uploads/2025/10/Screenshot-2025-10-19-at-11.15.29-PM.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Navigation */}

      <nav className="relative z-50 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://trustedsignalsvip.com/wp-content/uploads/2025/05/dark-logo-scaled.webp"
              alt="Automated Trader"
              className="h-10 w-auto"
            />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#brokers"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Brokers
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Reviews
            </a>
            <a href="/api/oauth/init">
              <Button size="md" icon={ArrowRight} iconPosition="right">
                Get Started
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-400 text-sm font-medium">
                    Live & Trading Now
                  </span>
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight">
                  Let the Bots
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Trade for You
                  </span>
                </h1>
              </div>

              <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Connect TradingView alerts to your broker.{" "}
                <span className="text-white font-semibold">Zero coding.</span>{" "}
                <span className="text-white font-semibold">
                  Zero monitoring.
                </span>{" "}
                Just profits.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="/api/oauth/init">
                  <Button
                    size="xl"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 text-lg px-12 py-7 font-bold"
                  >
                    Get Started
                  </Button>
                </a>
                <Link href="#how-it-works">
                  <Button
                    variant="outline"
                    size="xl"
                    icon={Play}
                    className="border-gray-600 hover:border-blue-500 hover:bg-blue-500/5 text-lg px-12 py-7"
                  >
                    See How It Works
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 justify-center lg:justify-start pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-400 text-sm">No Credit Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-400 text-sm">5 Min Setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-400 text-sm">Cancel Anytime</span>
                </div>
              </div>
            </div>

            <div className="relative lg:scale-110">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-3xl blur-3xl animate-pulse-slow"></div>
              <div className="relative rounded-2xl overflow-hidden border-2 border-gray-700/50 shadow-2xl hover:border-blue-500/50 transition-all duration-500 hover:scale-105">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <img
                  src="https://trustedsignalsvip.com/wp-content/uploads/2025/10/Screenshot-2025-10-19-at-10.24.11-PM.png"
                  alt="Automated Trading Dashboard"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-xl border border-blue-400/20">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  <div>
                    <div className="text-2xl font-bold">$2,847</div>
                    <div className="text-xs text-blue-100">Automated Today</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Start Trading in
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                3 Simple Steps
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              No coding. No complexity. Just automation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl">
                1
              </div>
              <Card
                variant="gradient"
                className="h-full pt-8 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 mb-6">
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Connect Your Broker
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Link your trading account in 2 minutes. We support all major
                  brokers.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-xs text-gray-400">
                    Binance
                  </span>
                  <span className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-xs text-gray-400">
                    Coinbase
                  </span>
                  <span className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-xs text-gray-400">
                    Kraken
                  </span>
                </div>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl">
                2
              </div>
              <Card
                variant="gradient"
                className="h-full pt-8 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-6">
                  <Bell className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Setup Your Alerts
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Create TradingView alerts and connect them to your strategy.
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>Works with any indicator</span>
                </div>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl">
                3
              </div>
              <Card
                variant="gradient"
                className="h-full pt-8 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-6">
                  <Rocket className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Let It Run
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Sit back and watch your strategies execute automatically.
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>Works 24/7, even when you sleep</span>
                </div>
              </Card>
            </div>
          </div>

          <div className="text-center mt-16">
            <a href="/api/oauth/init">
              <Button
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/25"
              >
                Get Started Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900/50 via-black/50 to-gray-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <Eye className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">
                Live Demo
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Everything You Need in One Dashboard
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              See real-time trading automation in action with professional-grade
              tools
            </p>
          </div>

          {/* Main Dashboard Preview */}
          <div className="mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative rounded-2xl overflow-hidden border-2 border-gray-700/50 shadow-2xl hover:border-blue-500/50 transition-all duration-500">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <img
                src="https://trustedsignalsvip.com/wp-content/uploads/2025/10/Screenshot-2025-10-19-at-11.15.29-PM.png"
                alt="Live Trading Dashboard"
                className="w-full h-auto"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="bg-black/80 backdrop-blur-sm border border-blue-500/30 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-400 text-xs font-medium">
                      Live Data
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {dashboardFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  variant="gradient"
                  hover
                  className="group overflow-hidden"
                >
                  <div className="aspect-video mb-6 -mx-6 -mt-6 overflow-hidden relative">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <a href="/api/oauth/init">
              <Button
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl shadow-blue-500/20"
              >
                Explore Full Dashboard
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <Award className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">
                Platform Features
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Professional Trading
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Automation Tools
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to automate your trading strategies and scale
              your profits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actualFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} href={feature.link}>
                  <Card variant="gradient" hover className="group h-full">
                    <div
                      className={`p-4 bg-gradient-to-br ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {feature.title}
                      </h3>
                      <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30">
                        {feature.stats}
                      </span>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                      <span>Explore Feature</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supported Brokers */}
      <section
        id="brokers"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900/50 to-black/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <Server className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">
                Broker Integration
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Connect Any
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Trading Platform
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Seamlessly integrate with 15+ major brokers and exchanges for
              crypto, forex, and CFD trading
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
            {brokerSupport.map((broker, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-4 hover:border-gray-600/50 transition-all duration-300 hover:scale-[1.05] hover:shadow-xl hover:shadow-gray-500/10 text-center">
                  <div
                    className={`w-12 h-12 ${broker.color} rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg mx-auto mb-3`}
                  >
                    {broker.logo}
                  </div>
                  <div className="text-white font-medium text-sm mb-1">
                    {broker.name}
                  </div>
                  <div className="text-gray-400 text-xs">{broker.category}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="/api/oauth/init">
              <Button
                size="lg"
                icon={Plus}
                iconPosition="right"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Connect Your Broker
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-yellow-300 text-sm font-medium">
                Trusted by Professionals
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Real Results from
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {" "}
                Real Traders
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              See what our community of professional traders is achieving with
              automation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                variant="gradient"
                className="group hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {testimonial.role}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-400 font-bold text-lg">
                      {testimonial.profit}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {testimonial.timeframe}
                    </div>
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
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900/50 via-black/50 to-gray-900/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-6 py-2.5 mb-8 backdrop-blur-sm">
              <DollarSign className="h-5 w-5 text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold tracking-wide">
                Simple, Transparent Pricing
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold text-white mb-8 tracking-tight">
              Choose Your
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Trading Plan
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Start today and scale as you grow. Cancel anytime.
            </p>
          </div>

          {/* Lifetime Plan - Full Width */}
          {pricingPlans
            .filter((plan) => plan.isLifetime)
            .map((plan, index) => (
              <div
                key={index}
                className="relative group hover:scale-[1.01] transition-all duration-500 max-w-6xl mx-auto mb-16 rounded-3xl"
                style={{
                  boxShadow:
                    "0 0 80px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.3), inset 0 0 60px rgba(59, 130, 246, 0.1)",
                  background:
                    "linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, rgba(17, 24, 39, 0.8) 50%, rgba(30, 58, 138, 0.3) 100%)",
                  border: "2px solid rgba(59, 130, 246, 0.5)",
                }}
              >
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-black shadow-2xl shadow-blue-500/50 animate-pulse">
                    {plan.highlight}
                  </div>
                </div>

                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse-slow"></div>
                  <div
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse-slow"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center p-6 sm:p-10 relative z-10">
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3 sm:mb-4">
                      {plan.name}
                    </h3>
                    <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 leading-relaxed">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline justify-center md:justify-start mb-8 sm:mb-10">
                      <span className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      <span className="text-lg sm:text-xl text-gray-400 ml-3 sm:ml-4">
                        {plan.period}
                      </span>
                    </div>

                    <a
                      href={plan.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mb-4 sm:mb-6"
                    >
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 text-lg sm:text-xl py-6 sm:py-7 font-bold transition-all duration-300"
                        icon={ArrowRight}
                        iconPosition="right"
                      >
                        {plan.cta}
                      </Button>
                    </a>
                    <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-blue-400/80 font-medium">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <span>One-time payment, lifetime access</span>
                    </div>
                  </div>

                  <div>
                    <ul className="space-y-3 sm:space-y-4 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-blue-500/20">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-2 sm:gap-3"
                        >
                          <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 mt-0.5 text-blue-400 flex-shrink-0" />
                          <span className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {pricingPlans
              .filter((plan) => !plan.isLifetime)
              .map((plan, index) => (
                <Card
                  key={index}
                  variant="gradient"
                  className={`relative group hover:scale-[1.02] transition-all duration-500 shadow-xl ${
                    plan.popular
                      ? "ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/30"
                      : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl shadow-blue-500/30">
                        {plan.highlight}
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                      {plan.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed px-2">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline justify-center mb-6 sm:mb-8">
                      <span className="text-4xl sm:text-5xl font-black text-white">
                        {plan.price}
                      </span>
                      <span className="text-base sm:text-lg text-gray-400 ml-2 sm:ml-3">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 px-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-2 sm:gap-3"
                      >
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 text-blue-400 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-300 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={plan.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-2"
                  >
                    <Button
                      variant={plan.popular ? "primary" : "outline"}
                      size="lg"
                      className="w-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      {plan.cta}
                    </Button>
                  </a>
                </Card>
              ))}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <p className="text-base sm:text-lg text-gray-400 mb-4 sm:mb-6 font-medium">
              No setup fees • Cancel anytime
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-gray-500 px-4">
              <div className="flex items-center gap-2 sm:gap-2.5 group cursor-default">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 group-hover:text-blue-300 transition-colors flex-shrink-0" />
                <span className="group-hover:text-gray-300 transition-colors">
                  SSL Encrypted
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5 group cursor-default">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 group-hover:text-blue-300 transition-colors flex-shrink-0" />
                <span className="group-hover:text-gray-300 transition-colors">
                  99.9% Uptime SLA
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5 group cursor-default">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 group-hover:text-blue-300 transition-colors flex-shrink-0" />
                <span className="group-hover:text-gray-300 transition-colors">
                  24/7 Support
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5 group cursor-default">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 group-hover:text-blue-300 transition-colors flex-shrink-0" />
                <span className="group-hover:text-gray-300 transition-colors">
                  Money Back Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 mb-6 sm:mb-8 backdrop-blur-sm">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
              <span className="text-blue-300 text-xs sm:text-sm font-semibold tracking-wide">
                Frequently Asked Questions
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                Know
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed">
              Simple answers to common questions about our platform
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <Card
              variant="gradient"
              className="group hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-start gap-3">
                <span className="text-blue-400 flex-shrink-0">Q:</span>
                <span>How easy is it to get started?</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed pl-8">
                <span className="text-cyan-400 font-semibold">A:</span> Getting
                started takes less than 5 minutes. Simply sign up, connect your
                broker account with your API keys, and start using our Alert
                Playground to generate TradingView alerts. No coding required -
                our intuitive interface guides you through every step.
              </p>
            </Card>

            <Card
              variant="gradient"
              className="group hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-start gap-3">
                <span className="text-blue-400 flex-shrink-0">Q:</span>
                <span>Do I need coding experience?</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed pl-8">
                <span className="text-cyan-400 font-semibold">A:</span>{" "}
                Absolutely not! Our platform is designed for traders, not
                developers. Everything is point-and-click. The Alert Playground
                generates perfect TradingView webhook messages for you - just
                fill in your preferences and copy-paste.
              </p>
            </Card>

            <Card
              variant="gradient"
              className="group hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-start gap-3">
                <span className="text-blue-400 flex-shrink-0">Q:</span>
                <span>How does the broker connection work?</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed pl-8">
                <span className="text-cyan-400 font-semibold">A:</span> We use
                secure API connections to your broker. You keep your login
                credentials private - we only need read/write API keys that you
                generate in your broker's dashboard. Your funds remain in your
                control at all times, and you can revoke access anytime.
              </p>
            </Card>

            <Card
              variant="gradient"
              className="group hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-start gap-3">
                <span className="text-blue-400 flex-shrink-0">Q:</span>
                <span>Can I use my existing TradingView strategies?</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed pl-8">
                <span className="text-cyan-400 font-semibold">A:</span> Yes!
                That's the beauty of our platform. Any TradingView indicator or
                strategy can trigger alerts. Use our Alert Playground to
                generate the webhook message, add it to your TradingView alert,
                and your trades execute automatically when conditions are met.
              </p>
            </Card>

            <Card
              variant="gradient"
              className="group hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-start gap-3">
                <span className="text-blue-400 flex-shrink-0">Q:</span>
                <span>What if I need help setting things up?</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed pl-8">
                <span className="text-cyan-400 font-semibold">A:</span> We've
                got you covered! Every plan includes access to our comprehensive
                documentation, video tutorials, and Discord community. Pro and
                Advanced plans get priority support, and Advanced plans even
                include a dedicated account manager to help you optimize your
                setup.
              </p>
            </Card>

            <Card
              variant="gradient"
              className="group hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-start gap-3">
                <span className="text-blue-400 flex-shrink-0">Q:</span>
                <span>Is my trading data secure?</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed pl-8">
                <span className="text-cyan-400 font-semibold">A:</span> Security
                is our top priority. We use bank-level SSL encryption, store API
                keys encrypted at rest, and never have access to your broker
                login credentials or funds. Our infrastructure maintains 99.9%
                uptime with redundant systems to ensure your trades execute
                reliably.
              </p>
            </Card>

            <Card
              variant="gradient"
              className="group hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-start gap-3">
                <span className="text-blue-400 flex-shrink-0">Q:</span>
                <span>Can I cancel or change my plan anytime?</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed pl-8">
                <span className="text-cyan-400 font-semibold">A:</span> Yes!
                Monthly plans can be canceled anytime with no penalties. You can
                also upgrade or downgrade between plans as your needs change.
                The Lifetime plan is a one-time payment with no recurring fees -
                own it forever with all future updates included.
              </p>
            </Card>
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <Card
              variant="gradient"
              className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-500/30"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                Still have questions?
              </h3>
              <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 leading-relaxed">
                Our team is here to help you succeed. Join our community or
                reach out directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://discord.gg/uan282DjyE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    icon={MessageCircle}
                    iconPosition="right"
                    className="w-full sm:w-auto shadow-lg hover:shadow-xl"
                  >
                    Join Discord
                  </Button>
                </a>
                <a href="/api/oauth/init">
                  <Button
                    variant="outline"
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="w-full sm:w-auto"
                  >
                    View Documentation
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card
            variant="gradient"
            padding="xl"
            className="relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
            <div className="relative z-10">
              <div className="mb-8">
                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
                  Ready to Automate Your Trading?
                </h2>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                  Join 50,000+ professional traders who have automated their
                  strategies and multiplied their profits with our platform
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <a href="/api/oauth/init">
                  <Button
                    size="xl"
                    icon={Rocket}
                    iconPosition="right"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/25"
                  >
                    Get Started
                  </Button>
                </a>
                <a
                  href="https://discord.gg/uan282DjyE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="xl"
                    icon={Users}
                    className="border-gray-600 hover:border-blue-500 hover:bg-blue-500/10"
                  >
                    Join Community
                  </Button>
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  <span>24/7 support</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <img
                src="https://trustedsignalsvip.com/wp-content/uploads/2025/05/dark-logo-scaled.webp"
                alt="Automated Trader"
                className="h-10 w-auto mb-4"
              />
              <p className="text-gray-400 mb-4 max-w-md">
                Professional trading automation platform trusted by 50,000+
                traders worldwide. Transform your strategies into profitable
                automated systems.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://discord.gg/uan282DjyE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Users className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com/@automatedtrader"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Play className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/api/oauth/init"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="/api/oauth/init"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Automate
                  </a>
                </li>
                <li>
                  <a
                    href="/api/oauth/init"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Alert Playground
                  </a>
                </li>
                <li>
                  <a
                    href="/api/oauth/init"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Marketplace
                  </a>
                </li>
                <li>
                  <a
                    href="/api/oauth/init"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Charts Hub
                  </a>
                </li>
                <li>
                  <a
                    href="/api/oauth/init"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://discord.gg/uan282DjyE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Discord Community
                  </a>
                </li>
                <li>
                  <a
                    href="/api/oauth/init"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    System Status
                  </a>
                </li>
                <li>
                  <a
                    href="/api/oauth/init"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@automatedtrader.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2024 AutomatedTrader. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 sm:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
