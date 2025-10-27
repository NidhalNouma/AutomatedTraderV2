export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  buttonIcon: any;
  gradient: string;
  borderColor: string;
  buttonLink?: string;
  action?: () => void;
  category: 'platform' | 'community' | 'signals' | 'tools' | 'education' | 'partners' | 'promotional';
  priority: number;
}

import { Plus, Users, ExternalLink, TrendingUp, Zap, BookOpen, Bot, BarChart3, Star, Rocket, Shield, Globe, DollarSign, Target, Award, Crown, Sparkles, Activity, Brain, Briefcase, Calculator, Camera, LineChart as ChartLine, Code, Compass, Database, Diamond, Eye, Filter, Gift, Headphones, Heart, Home, Key, Layers, Lock, Mail, Map, Monitor, Phone, Play, Search, Settings, Smartphone, Tablet, Truck, Wifi, Wrench } from 'lucide-react';

export const banners: Banner[] = [
  // Platform Banners (Priority 1-2)
  {
    id: 'platform-main',
    title: "🚀 AutomatedTrader Platform",
    subtitle: "Connect Any Broker, Automate Everything",
    description: "Advanced trading automation platform. Connect your broker and automate trades 24/7 with TradingView alerts. Lightning-fast execution with 99.9% uptime.",
    buttonText: "Connect Account",
    buttonIcon: Plus,
    gradient: "from-blue-500/15 via-purple-500/15 to-pink-500/15",
    borderColor: "border-blue-500/30",
    category: 'platform',
    priority: 1
  },
  {
    id: 'discord-community',
    title: "💬 AutomatedTrader Discord",
    subtitle: "15,000+ Automation Experts",
    description: "Join the largest automated trading community. Get exclusive strategies, webhook tutorials, broker setup guides, and real-time support from experienced traders.",
    buttonText: "Join Discord",
    buttonIcon: Users,
    gradient: "from-purple-500/15 via-indigo-500/15 to-blue-500/15",
    borderColor: "border-purple-500/30",
    buttonLink: "https://discord.gg/jsM4m3fApc",
    category: 'platform',
    priority: 2
  },
  {
    id: 'youtube-channel',
    title: "📺 AutomatedTrader YouTube",
    subtitle: "100+ Tutorial Videos",
    description: "Learn automated trading with our comprehensive video tutorials. Setup guides, strategy explanations, and live trading sessions.",
    buttonText: "Watch Videos",
    buttonIcon: Play,
    gradient: "from-red-500/15 via-pink-500/15 to-rose-500/15",
    borderColor: "border-red-500/30",
    buttonLink: "https://youtube.com/@automatedtrader",
    category: 'platform',
    priority: 3
  },
  {
    id: 'hankox-trading',
    title: "💎 Hankox",
    subtitle: "Professional Trading Broker",
    description: "Professional trading broker offering competitive spreads, advanced trading platforms, and institutional-grade execution. Regulated and trusted by traders worldwide.",
    buttonText: "Join Hankox",
    buttonIcon: Crown,
    gradient: "from-emerald-500/15 via-green-500/15 to-teal-500/15",
    borderColor: "border-emerald-500/30",
    buttonLink: "https://hankox.com",
    category: 'platform',
    priority: 4
  },
  {
    id: 'trusted-signals',
    title: "📈 Trusted Signals",
    subtitle: "Premium Trading Signals",
    description: "Get high-quality trading signals from professional traders. Crypto, Forex, and Stock signals with detailed analysis and risk management strategies.",
    buttonText: "Get Signals",
    buttonIcon: TrendingUp,
    gradient: "from-green-500/15 via-emerald-500/15 to-teal-500/15",
    borderColor: "border-green-500/30",
    buttonLink: "https://trustedsignals.com",
    category: 'platform',
    priority: 5
  },
  {
    id: 'isalgo-signals',
    title: "🤖 IsAlgo",
    subtitle: "Algorithmic Trading Signals",
    description: "Advanced algorithmic trading signals powered by machine learning. Automated signal delivery with backtested strategies and performance tracking.",
    buttonText: "Explore IsAlgo",
    buttonIcon: Bot,
    gradient: "from-cyan-500/15 via-blue-500/15 to-indigo-500/15",
    borderColor: "border-cyan-500/30",
    buttonLink: "https://www.isalgo.com",
    category: 'platform',
    priority: 6
  },
  {
    id: 'trade-alerts',
    title: "🔔 Trade Alerts",
    subtitle: "Smart Alert Management",
    description: "Advanced alert management system for traders. Organize, filter, and automate your trading alerts efficiently across multiple platforms.",
    buttonText: "Get TradeAlerts",
    buttonIcon: Activity,
    gradient: "from-blue-500/15 via-cyan-500/15 to-teal-500/15",
    borderColor: "border-blue-500/30",
    buttonLink: "https://tradealerts.com",
    category: 'platform',
    priority: 7
  },
  {
    id: 'super-ea',
    title: "🔥 Super EA Trading",
    subtitle: "Expert Advisors & EAs",
    description: "Professional Expert Advisors for MetaTrader 4/5. Automated trading robots with proven track records and live performance monitoring.",
    buttonText: "Browse EAs",
    buttonIcon: Rocket,
    gradient: "from-red-500/15 via-orange-500/15 to-yellow-500/15",
    borderColor: "border-red-500/30",
    buttonLink: "https://eatrader.com",
    category: 'platform',
    priority: 8
  },
  {
    id: 'luxalgo-indicators',
    title: "📊 LuxAlgo",
    subtitle: "Professional Trading Indicators",
    description: "Access premium TradingView indicators and tools. Advanced market analysis with institutional-grade algorithms and smart money concepts.",
    buttonText: "Get LuxAlgo",
    buttonIcon: BarChart3,
    gradient: "from-purple-500/15 via-pink-500/15 to-rose-500/15",
    borderColor: "border-purple-500/30",
    buttonLink: "https://luxalgo.com",
    category: 'platform',
    priority: 9
  },
  {
    id: 'chartprime-tools', 
    title: "📈 ChartPrime",
    subtitle: "Advanced Charting Tools",
    description: "Professional charting and analysis tools for serious traders. Custom indicators, alerts, market scanners, and backtesting capabilities.",
    buttonText: "Try ChartPrime",
    buttonIcon: Star,
    gradient: "from-orange-500/15 via-red-500/15 to-pink-500/15",
    borderColor: "border-orange-500/30",
    buttonLink: "https://chartprime.com",
    category: 'platform',
    priority: 10
  },

  // Community Banners (Priority 1-2)
  {
    id: 'telegram-community',
    title: "📱 Telegram Community",
    subtitle: "5,000+ Active Members",
    description: "Connect with traders worldwide in our Telegram community. Share strategies, get quick support, and stay updated with platform announcements.",
    buttonText: "Join Telegram",
    buttonIcon: Phone,
    gradient: "from-blue-500/15 via-cyan-500/15 to-teal-500/15",
    borderColor: "border-blue-500/30",
    buttonLink: "https://t.me/automatedtrader",
    category: 'community',
    priority: 1
  },
  {
    id: 'crypto-signals-pro',
    title: "₿ CryptoSignals Pro",
    subtitle: "Elite Crypto Trading",
    description: "Professional cryptocurrency trading signals with 85%+ win rate. Includes DeFi, NFT, and altcoin opportunities with detailed market analysis.",
    buttonText: "Join Pro",
    buttonIcon: Diamond,
    gradient: "from-yellow-500/15 via-orange-500/15 to-amber-500/15",
    borderColor: "border-yellow-500/30",
    buttonLink: "https://cryptosignalspro.com",
    category: 'community',
    priority: 2
  },

  // Signal Services (Priority 1-2)
  {
    id: 'forex-masters',
    title: "💱 Forex Masters",
    subtitle: "Professional Forex Signals",
    description: "Expert forex trading signals from institutional traders. Major pairs, exotics, and commodities with precise entry/exit points.",
    buttonText: "Get Forex Signals",
    buttonIcon: Target,
    gradient: "from-emerald-500/15 via-green-500/15 to-lime-500/15",
    borderColor: "border-emerald-500/30",
    buttonLink: "https://forexmasters.com",
    category: 'signals',
    priority: 1
  },
  {
    id: 'superfunded-trading',
    title: "💰 Superfunded Trading",
    subtitle: "Prop Trading Firm",
    description: "Get funded to trade with up to $200K capital. Professional prop trading firm with competitive profit splits and comprehensive trader support.",
    buttonText: "Get Funded",
    buttonIcon: DollarSign,
    gradient: "from-green-500/15 via-emerald-500/15 to-teal-500/15",
    borderColor: "border-green-500/30",
    buttonLink: "https://superfunded.com",
    category: 'signals',
    priority: 2
  },

  // Trading Tools (Priority 1-6)
  {
    id: 'tradingview-pro',
    title: "📊 TradingView Pro",
    subtitle: "Professional Charting Platform",
    description: "Upgrade to TradingView Pro for advanced features, more indicators, and faster data. Essential for serious automated trading.",
    buttonText: "Upgrade Now",
    buttonIcon: ChartLine,
    gradient: "from-blue-500/15 via-indigo-500/15 to-purple-500/15",
    borderColor: "border-blue-500/30",
    buttonLink: "https://tradingview.com/gopro/",
    category: 'tools',
    priority: 1
  },
  {
    id: 'coinigy-platform',
    title: "🔗 Coinigy Trading",
    subtitle: "Multi-Exchange Platform",
    description: "Trade on 45+ exchanges from one platform. Portfolio management, advanced charting, and automated trading tools all in one place.",
    buttonText: "Try Coinigy",
    buttonIcon: Layers,
    gradient: "from-teal-500/15 via-cyan-500/15 to-blue-500/15",
    borderColor: "border-teal-500/30",
    buttonLink: "https://coinigy.com",
    category: 'tools',
    priority: 2
  },
  {
    id: 'cryptohopper-bots',
    title: "🤖 Cryptohopper Bots",
    subtitle: "Automated Trading Bots",
    description: "Pre-built trading bots for cryptocurrency markets. Copy trading, DCA bots, and strategy marketplace with proven performance.",
    buttonText: "Explore Bots",
    buttonIcon: Bot,
    gradient: "from-green-500/15 via-emerald-500/15 to-cyan-500/15",
    borderColor: "border-green-500/30",
    buttonLink: "https://cryptohopper.com",
    category: 'tools',
    priority: 3
  },
  {
    id: 'portfolio-tracker',
    title: "📱 Portfolio Tracker Pro",
    subtitle: "Advanced Portfolio Management",
    description: "Track your trading performance across all exchanges. P&L analysis, tax reporting, and performance metrics in one dashboard.",
    buttonText: "Track Portfolio",
    buttonIcon: Briefcase,
    gradient: "from-violet-500/15 via-purple-500/15 to-indigo-500/15",
    borderColor: "border-violet-500/30",
    buttonLink: "https://portfoliotracker.com",
    category: 'tools',
    priority: 4
  },

  // Education (Priority 1-5)
  {
    id: 'trading-mastery',
    title: "📚 Trading Mastery Course",
    subtitle: "Learn Professional Trading",
    description: "Comprehensive trading education covering technical analysis, risk management, and automated trading strategies. From beginner to expert level.",
    buttonText: "Start Learning",
    buttonIcon: BookOpen,
    gradient: "from-indigo-500/15 via-purple-500/15 to-pink-500/15",
    borderColor: "border-indigo-500/30",
    buttonLink: "https://tradingmastery.com",
    category: 'education',
    priority: 1
  },
  {
    id: 'automation-academy',
    title: "🎓 Automation Academy",
    subtitle: "Master Trading Automation",
    description: "Learn to build and deploy automated trading systems. Webhook setup, strategy development, and risk management for algorithmic trading.",
    buttonText: "Join Academy",
    buttonIcon: Brain,
    gradient: "from-blue-500/15 via-cyan-500/15 to-teal-500/15",
    borderColor: "border-blue-500/30",
    buttonLink: "https://automationacademy.com",
    category: 'education',
    priority: 2
  },
  {
    id: 'crypto-university',
    title: "₿ Crypto University",
    subtitle: "Complete Crypto Education",
    description: "Master cryptocurrency trading, DeFi, NFTs, and blockchain technology. From basics to advanced trading strategies and market analysis.",
    buttonText: "Enroll Now",
    buttonIcon: Award,
    gradient: "from-yellow-500/15 via-orange-500/15 to-red-500/15",
    borderColor: "border-yellow-500/30",
    buttonLink: "https://cryptouniversity.com",
    category: 'education',
    priority: 3
  },
  {
    id: 'forex-institute',
    title: "💱 Forex Institute",
    subtitle: "Professional Forex Training",
    description: "Learn institutional forex trading techniques. Price action, market structure, and professional trading psychology from industry experts.",
    buttonText: "Start Course",
    buttonIcon: Globe,
    gradient: "from-emerald-500/15 via-green-500/15 to-teal-500/15",
    borderColor: "border-emerald-500/30",
    buttonLink: "https://forexinstitute.com",
    category: 'education',
    priority: 4
  },
  {
    id: 'risk-management-pro',
    title: "🛡️ Risk Management Pro",
    subtitle: "Master Trading Psychology",
    description: "Learn professional risk management and trading psychology. Position sizing, emotional control, and systematic approach to trading success.",
    buttonText: "Master Risk",
    buttonIcon: Shield,
    gradient: "from-red-500/15 via-orange-500/15 to-yellow-500/15",
    borderColor: "border-red-500/30",
    buttonLink: "https://riskmanagementpro.com",
    category: 'education',
    priority: 5
  },

  // Partners (Priority 1-8)
  {
    id: 'profit-trailer',
    title: "🚀 ProfitTrailer",
    subtitle: "Advanced Crypto Bot",
    description: "Sophisticated cryptocurrency trading bot with DCA, grid trading, and advanced strategies. Proven performance in bull and bear markets.",
    buttonText: "Try ProfitTrailer",
    buttonIcon: Bot,
    gradient: "from-purple-500/15 via-indigo-500/15 to-blue-500/15",
    borderColor: "border-purple-500/30",
    buttonLink: "https://profittrailer.com",
    category: 'partners',
    priority: 1
  },
  {
    id: 'quantconnect-algo',
    title: "🧠 QuantConnect",
    subtitle: "Algorithmic Trading Platform",
    description: "Build, backtest, and deploy algorithmic trading strategies. Access to historical data, research environment, and live trading capabilities.",
    buttonText: "Start Coding",
    buttonIcon: Code,
    gradient: "from-violet-500/15 via-purple-500/15 to-pink-500/15",
    borderColor: "border-violet-500/30",
    buttonLink: "https://quantconnect.com",
    category: 'partners',
    priority: 2
  },
  {
    id: 'tradersync-journal',
    title: "📊 TraderSync",
    subtitle: "Professional Trading Journal",
    description: "Advanced trading journal and analytics platform. Track performance, analyze trades, and improve your trading with detailed insights.",
    buttonText: "Start Journaling",
    buttonIcon: Database,
    gradient: "from-green-500/15 via-emerald-500/15 to-cyan-500/15",
    borderColor: "border-green-500/30",
    buttonLink: "https://tradersync.com",
    category: 'partners',
    priority: 3
  },
  {
    id: 'myfxbook-analytics',
    title: "📈 MyFxBook Analytics",
    subtitle: "Forex Performance Tracking",
    description: "Professional forex trading analytics and social trading platform. Track performance, copy successful traders, and analyze market data.",
    buttonText: "Join MyFxBook",
    buttonIcon: BarChart3,
    gradient: "from-blue-500/15 via-indigo-500/15 to-purple-500/15",
    borderColor: "border-blue-500/30",
    buttonLink: "https://myfxbook.com",
    category: 'partners',
    priority: 4
  },
  {
    id: 'zignaly-copy',
    title: "👥 Zignaly Copy Trading",
    subtitle: "Social Copy Trading Platform",
    description: "Copy successful traders automatically. Connect your exchange and mirror the trades of profitable traders with full transparency.",
    buttonText: "Start Copying",
    buttonIcon: Users,
    gradient: "from-cyan-500/15 via-blue-500/15 to-indigo-500/15",
    borderColor: "border-cyan-500/30",
    buttonLink: "https://zignaly.com",
    category: 'partners',
    priority: 5
  },

  // Promotional (Priority 1-5)
  {
    id: 'rent-ad-space',
    title: "📢 Advertise Here",
    subtitle: "Reach 50,000+ Active Traders",
    description: "Promote your trading service to our engaged community of automated traders. Premium ad placement with high conversion rates and targeted audience.",
    buttonText: "Rent Space",
    buttonIcon: ExternalLink,
    gradient: "from-pink-500/15 via-purple-500/15 to-indigo-500/15",
    borderColor: "border-pink-500/30",
    buttonLink: "https://whop.com/automated-trader-free/automatedtrader-promo/",
    category: 'promotional',
    priority: 1
  },
  {
    id: 'affiliate-program',
    title: "💰 Affiliate Program",
    subtitle: "Earn 30% Commission",
    description: "Join our affiliate program and earn generous commissions promoting AutomatedTrader. Marketing materials, tracking, and monthly payouts included.",
    buttonText: "Join Affiliates",
    buttonIcon: DollarSign,
    gradient: "from-green-500/15 via-emerald-500/15 to-teal-500/15",
    borderColor: "border-green-500/30",
    buttonLink: "https://automatedtrader.com/affiliates",
    category: 'promotional',
    priority: 2
  },
  {
    id: 'partnership-program',
    title: "🤝 Partnership Program",
    subtitle: "Strategic Business Partnerships",
    description: "Partner with AutomatedTrader to offer integrated solutions. White-label options, API access, and revenue sharing opportunities available.",
    buttonText: "Partner With Us",
    buttonIcon: Briefcase,
    gradient: "from-blue-500/15 via-purple-500/15 to-pink-500/15",
    borderColor: "border-blue-500/30",
    buttonLink: "https://automatedtrader.com/partners",
    category: 'promotional',
    priority: 3
  },
  {
    id: 'referral-rewards',
    title: "🎁 Referral Rewards",
    subtitle: "Get Rewarded for Referrals",
    description: "Refer friends and earn rewards! Get free months, exclusive features, and cash bonuses for every successful referral to our platform.",
    buttonText: "Start Referring",
    buttonIcon: Gift,
    gradient: "from-orange-500/15 via-red-500/15 to-pink-500/15",
    borderColor: "border-orange-500/30",
    buttonLink: "https://automatedtrader.com/referrals",
    category: 'promotional',
    priority: 4
  },
  {
    id: 'enterprise-solutions',
    title: "🏢 Enterprise Solutions",
    subtitle: "Custom Trading Infrastructure",
    description: "Enterprise-grade trading automation for institutions. Custom integrations, dedicated support, and scalable infrastructure solutions.",
    buttonText: "Contact Sales",
    buttonIcon: Briefcase,
    gradient: "from-gray-500/15 via-slate-500/15 to-zinc-500/15",
    borderColor: "border-gray-500/30",
    buttonLink: "https://automatedtrader.com/enterprise",
    category: 'promotional',
    priority: 5
  }
];

export const getBannersByCategory = (category: Banner['category']): Banner[] => {
  return banners
    .filter(banner => banner.category === category)
    .sort((a, b) => a.priority - b.priority);
};

export const getRandomBanners = (count: number, excludeIds: string[] = []): Banner[] => {
  const availableBanners = banners.filter(banner => !excludeIds.includes(banner.id));
  const shuffled = [...availableBanners].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getBannerById = (id: string): Banner | undefined => {
  return banners.find(banner => banner.id === id);
};

export const getAllBanners = (): Banner[] => {
  return banners.sort((a, b) => a.priority - b.priority);
};

export const getBannersByPriority = (maxPriority: number = 3): Banner[] => {
  return banners
    .filter(banner => banner.priority <= maxPriority)
    .sort((a, b) => a.priority - b.priority);
};

export const getHighPriorityBanners = (): Banner[] => {
  return banners
    .filter(banner => banner.priority === 1)
    .sort(() => 0.5 - Math.random());
};