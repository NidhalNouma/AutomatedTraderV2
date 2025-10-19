import React, { useState } from "react";
import {
  X,
  Plus,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Loader,
  Server,
  Globe,
  BookOpen,
  ExternalLink,
  HelpCircle,
  Users,
  Copy,
  Zap,
  Target,
  Shield,
  TrendingUp,
  BarChart3,
  Key,
} from "lucide-react";
import { BrokerType } from "../types/broker";
import { useAccount } from "@/context";
import { Card, Button } from "../ui";

interface BrokerConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountConnectionModal: React.FC<BrokerConnectionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addAccount, isLoading } = useAccount();
  const [step, setStep] = useState(1);
  const [selectedBroker, setSelectedBroker] = useState<BrokerType | null>(null);
  const [showSecrets, setShowSecrets] = useState(false);
  const [accountEnvironment, setAccountEnvironment] = useState<"demo" | "live">(
    "demo"
  );
  const [showGuide, setShowGuide] = useState(false);
  const [showCredentialsHelp, setShowCredentialsHelp] = useState(false);
  const [showSupportHelp, setShowSupportHelp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    apiKey: "",
    secretKey: "",
    passPhrase: "",
    username: "",
    password: "",
    server: "",
    serverType: "demo" as "demo" | "live",
    type: "S" as "S" | "D",
  });

  const cryptoBrokers = [];

  const forexBrokers = [
    {
      id: "tradelocker",
      name: "TradeLocker",
      logo: "TL",
      color: "bg-gray-700",
      popular: false,
    },
  ];

  const comingSoonBrokers = [
    {
      id: "metatrader4",
      name: "MetaTrader 4",
      logo: "MT4",
      color: "bg-blue-800",
      popular: true,
    },
    {
      id: "metatrader5",
      name: "MetaTrader 5",
      logo: "MT5",
      color: "bg-blue-900",
      popular: true,
    },
    {
      id: "kraken",
      name: "Kraken",
      logo: "KR",
      color: "bg-purple-700",
      category: "crypto",
    },
    {
      id: "okx",
      name: "OKX",
      logo: "OKX",
      color: "bg-black",
      category: "crypto",
    },
    {
      id: "bitmex",
      name: "BitMEX",
      logo: "BMX",
      color: "bg-orange-600",
      category: "crypto",
    },
    {
      id: "tradestation",
      name: "TradeStation",
      logo: "TS",
      color: "bg-blue-700",
      category: "forex",
    },
    {
      id: "acttrader",
      name: "ActTrader",
      logo: "ACT",
      color: "bg-green-700",
      category: "forex",
    },
    {
      id: "dxtrade",
      name: "DXTrade",
      logo: "DX",
      color: "bg-red-700",
      category: "forex",
    },
    {
      id: "ninjatrader",
      name: "NinjaTrader",
      logo: "NT",
      color: "bg-indigo-700",
      category: "forex",
    },

    {
      id: "binance",
      name: "Binance",
      logo: "B",
      color: "bg-yellow-500",
      popular: true,
    },
    {
      id: "binanceus",
      name: "Binance US",
      logo: "BUS",
      color: "bg-blue-600",
      popular: false,
    },
    {
      id: "bybit",
      name: "Bybit",
      logo: "BB",
      color: "bg-orange-500",
      popular: true,
    },
    {
      id: "bitget",
      name: "Bitget",
      logo: "BG",
      color: "bg-blue-600",
      popular: false,
    },
    {
      id: "crypto",
      name: "Crypto.com",
      logo: "CDC",
      color: "bg-indigo-600",
      popular: false,
    },
    {
      id: "mexc",
      name: "MEXC",
      logo: "M",
      color: "bg-green-500",
      popular: false,
    },
    {
      id: "bingx",
      name: "BingX",
      logo: "BX",
      color: "bg-purple-600",
      popular: false,
    },
    {
      id: "bitmart",
      name: "BitMart",
      logo: "BM",
      color: "bg-red-500",
      popular: false,
    },
    {
      id: "kucoin",
      name: "KuCoin",
      logo: "K",
      color: "bg-green-600",
      popular: false,
    },
    {
      id: "coinbase",
      name: "Coinbase Pro",
      logo: "CB",
      color: "bg-blue-500",
      popular: false,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBroker) return;

    try {
      await addAccount(
        formData.name,
        selectedBroker,
        // apiKey: formData.apiKey || undefined,
        // secretKey: formData.secretKey || undefined,
        // passPhrase: formData.passPhrase || undefined,
        formData.username || undefined,
        formData.password || undefined,
        formData.server || undefined,
        formData.serverType
      );

      onClose();
      setStep(1);
      setSelectedBroker(null);
      setFormData({
        name: "",
        apiKey: "",
        secretKey: "",
        passPhrase: "",
        username: "",
        password: "",
        server: "",
        serverType: "demo",
        type: "S",
      });
    } catch (error) {
      console.error("Failed to add account:", error);
    }
  };

  const resetModal = () => {
    setStep(1);
    setSelectedBroker(null);
    setFormData({
      name: "",
      apiKey: "",
      secretKey: "",
      passPhrase: "",
      username: "",
      password: "",
      server: "",
      serverType: "demo",
      type: "S",
    });
    setShowSecrets(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card
        variant="gradient"
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Connect Broker Account
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Add your trading platform for automated execution
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Desktop Help Buttons */}
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-xl transition-all hover:scale-[1.02] border border-blue-500/30"
              title="Setup Guide"
            >
              <HelpCircle className="h-4 w-4" />
            </button>

            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Setup Guide */}
        {showGuide && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-950/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-white">Setup Guide</h4>
                <button
                  onClick={() => setShowGuide(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-4">
                  <h5 className="text-blue-300 font-semibold mb-3">
                    Quick Setup Steps
                  </h5>
                  <div className="space-y-3 text-blue-300/80 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        1
                      </div>
                      <span>Choose your broker/exchange from the list</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        2
                      </div>
                      <span>
                        Log into your broker account and create API keys
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        3
                      </div>
                      <span>Enter your credentials securely</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        4
                      </div>
                      <span>Start automating with TradingView alerts</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href="/dashboard/docs"
                    className="flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 px-4 py-3 rounded-xl font-medium transition-all border border-blue-500/30"
                  >
                    <BookOpen className="h-4 w-4" />
                    Full Documentation
                  </a>
                  <a
                    href="https://discord.gg/uan282DjyE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 px-4 py-3 rounded-xl font-medium transition-all border border-purple-500/30"
                  >
                    <Users className="h-4 w-4" />
                    Discord Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Choose Your Trading Platform
              </h3>
              <p className="text-gray-400 mb-8">
                Select the broker or exchange you want to connect for automated
                trading
              </p>

              {/* Crypto Brokers */}
              {cryptoBrokers.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">₿</span>
                    </div>
                    Cryptocurrency Exchanges
                    <span className="text-sm text-gray-400 font-normal">
                      ({cryptoBrokers.length} available)
                    </span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cryptoBrokers.map((broker) => (
                      <button
                        key={broker.id}
                        onClick={() => {
                          setSelectedBroker(broker.id as BrokerType);
                          setStep(2);
                        }}
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-900/60 to-gray-800/40 hover:from-blue-600/20 hover:to-purple-600/20 border border-gray-700/50 hover:border-blue-500/40 rounded-xl transition-all hover:scale-[1.02] group relative"
                      >
                        {broker.popular && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            Popular
                          </div>
                        )}
                        <div
                          className={`w-12 h-12 ${broker.color} rounded-xl flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0`}
                        >
                          {broker.logo}
                        </div>
                        <div className="text-left flex-1">
                          <div className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                            {broker.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            Crypto Exchange
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Forex Brokers */}
              {forexBrokers.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">💱</span>
                    </div>
                    Forex & CFD Brokers
                    <span className="text-sm text-gray-400 font-normal">
                      ({forexBrokers.length} available)
                    </span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {forexBrokers.map((broker) => (
                      <button
                        key={broker.id}
                        onClick={() => {
                          setSelectedBroker(broker.id as BrokerType);
                          setStep(2);
                        }}
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-900/60 to-gray-800/40 hover:from-green-600/20 hover:to-emerald-600/20 border border-gray-700/50 hover:border-green-500/40 rounded-xl transition-all hover:scale-[1.02] group relative"
                      >
                        {broker.popular && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            Popular
                          </div>
                        )}
                        <div
                          className={`w-12 h-12 ${broker.color} rounded-xl flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0`}
                        >
                          {broker.logo}
                        </div>
                        <div className="text-left flex-1">
                          <div className="font-semibold text-white group-hover:text-green-300 transition-colors">
                            {broker.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            Forex & CFDs
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Coming Soon */}
              {comingSoonBrokers.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">🚀</span>
                    </div>
                    Coming Soon
                    <span className="text-sm text-gray-400 font-normal">
                      ({comingSoonBrokers.length} planned)
                    </span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {comingSoonBrokers.map((broker) => (
                      <div
                        key={broker.id}
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-800/30 to-gray-700/20 border border-gray-700/30 rounded-xl opacity-60 cursor-not-allowed relative"
                      >
                        <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Soon
                        </div>
                        <div
                          className={`w-12 h-12 ${broker.color} rounded-xl flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0`}
                        >
                          {broker.logo}
                        </div>
                        <div className="text-left flex-1">
                          <div className="font-semibold text-gray-400">
                            {broker.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            Coming Soon
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 2 && selectedBroker && (
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-blue-400 hover:text-blue-300 text-sm mb-6 flex items-center gap-2 font-medium"
              >
                ← Back to broker selection
              </button>

              <h3 className="text-2xl font-bold text-white mb-2">
                Connect{" "}
                {cryptoBrokers.find((b) => b.id === selectedBroker)?.name ||
                  forexBrokers.find((b) => b.id === selectedBroker)?.name}
              </h3>
              <p className="text-gray-400 mb-8">
                {cryptoBrokers.find((b) => b.id === selectedBroker)
                  ? `Enter your ${
                      cryptoBrokers.find((b) => b.id === selectedBroker)?.name
                    } API credentials to enable automated trading`
                  : `Enter your ${
                      forexBrokers.find((b) => b.id === selectedBroker)?.name
                    } account details to enable automated trading`}
              </p>
            </div>

            <div className="space-y-6">
              {/* Account Name */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Account Information
                  <div className="ml-auto flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setShowCredentialsHelp(!showCredentialsHelp)
                      }
                      className="p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"
                      title="How to get credentials"
                    >
                      <HelpCircle className="h-3 w-3" />
                    </button>
                  </div>
                </h3>

                {/* Credentials Help Modal */}
                {showCredentialsHelp && (
                  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-gradient-to-br from-gray-950/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                      <div className="flex items-center justify-between mb-6">
                        <h5 className="text-xl font-bold text-white">
                          How to Get Credentials
                        </h5>
                        <button
                          onClick={() => setShowCredentialsHelp(false)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="space-y-6">
                        {selectedBroker &&
                          cryptoBrokers.find(
                            (b) => b.id === selectedBroker
                          ) && (
                            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
                              <h6 className="text-green-300 font-semibold mb-3">
                                For{" "}
                                {
                                  cryptoBrokers.find(
                                    (b) => b.id === selectedBroker
                                  )?.name
                                }
                                :
                              </h6>
                              <div className="space-y-3 text-green-300/80 text-sm">
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                    1
                                  </div>
                                  <span>
                                    Log into your{" "}
                                    {
                                      cryptoBrokers.find(
                                        (b) => b.id === selectedBroker
                                      )?.name
                                    }{" "}
                                    account
                                  </span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                    2
                                  </div>
                                  <span>Go to Account → API Management</span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                    3
                                  </div>
                                  <span>
                                    Create new API key with trading permissions
                                    only
                                  </span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                    4
                                  </div>
                                  <span>
                                    Copy API Key and Secret Key to the form
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                        {selectedBroker &&
                          forexBrokers.find((b) => b.id === selectedBroker) && (
                            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
                              <h6 className="text-green-300 font-semibold mb-3">
                                For{" "}
                                {
                                  forexBrokers.find(
                                    (b) => b.id === selectedBroker
                                  )?.name
                                }
                                :
                              </h6>
                              <div className="space-y-3 text-green-300/80 text-sm">
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                    1
                                  </div>
                                  <span>
                                    Contact your broker for account details
                                  </span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                    2
                                  </div>
                                  <span>
                                    Get your login number and password
                                  </span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                    3
                                  </div>
                                  <span>
                                    Get the server address for your account type
                                  </span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                    4
                                  </div>
                                  <span>
                                    Test connection in{" "}
                                    {
                                      forexBrokers.find(
                                        (b) => b.id === selectedBroker
                                      )?.name
                                    }{" "}
                                    first
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <a
                            href="/dashboard/docs"
                            className="flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-300 px-4 py-3 rounded-xl font-medium transition-all border border-green-500/30"
                          >
                            <BookOpen className="h-4 w-4" />
                            Detailed Guide
                          </a>
                          <a
                            href="https://discord.gg/uan282DjyE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 px-4 py-3 rounded-xl font-medium transition-all border border-purple-500/30"
                          >
                            <Users className="h-4 w-4" />
                            Get Help
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Account Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="e.g., My Binance Account, Main Trading"
                    className="w-full px-4 py-3 bg-gray-900/60 border border-blue-500/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Give your account a memorable name for easy identification
                  </p>
                </div>
              </div>

              {/* Environment Selection for Forex */}
              {forexBrokers.find((b) => b.id === selectedBroker) && (
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Trading Environment
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Account Environment *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            serverType: "demo",
                          }))
                        }
                        className={`p-4 rounded-xl border transition-all text-left ${
                          formData.serverType === "demo"
                            ? "bg-blue-500/20 border-blue-500/50 text-blue-300"
                            : "bg-gray-800/50 border-gray-700/50 text-gray-400 hover:border-gray-600/50"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Server className="h-5 w-5" />
                          <span className="font-medium">Demo Account</span>
                        </div>
                        <div className="text-xs">
                          Practice trading with virtual money
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            serverType: "live",
                          }))
                        }
                        className={`p-4 rounded-xl border transition-all text-left ${
                          formData.serverType === "live"
                            ? "bg-green-500/20 border-green-500/50 text-green-300"
                            : "bg-gray-800/50 border-gray-700/50 text-gray-400 hover:border-gray-600/50"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Globe className="h-5 w-5" />
                          <span className="font-medium">Live Account</span>
                        </div>
                        <div className="text-xs">Trade with real money</div>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Choose between demo (practice) or live (real money)
                      trading
                    </p>
                  </div>
                </div>
              )}

              {/* Account Type */}
              {/* Account Type - Broker Specific */}
              {(() => {
                const getAccountTypes = () => {
                  switch (selectedBroker) {
                    case "binance":
                      return [
                        {
                          id: "S",
                          name: "Spot Trading",
                          desc: "Cash trading with your own funds",
                        },
                        {
                          id: "D",
                          name: "Futures Trading",
                          desc: "Leveraged derivatives trading",
                        },
                      ];
                    case "binanceus":
                      return [
                        {
                          id: "S",
                          name: "Spot Trading",
                          desc: "Cash trading only (no futures available)",
                        },
                      ];
                    case "bybit":
                      return [
                        {
                          id: "S",
                          name: "Spot Trading",
                          desc: "Cash trading with your own funds",
                        },
                        {
                          id: "D",
                          name: "Derivatives",
                          desc: "Futures, perpetuals, and options",
                        },
                      ];
                    case "bitget":
                      return [
                        {
                          id: "S",
                          name: "Spot Trading",
                          desc: "Cash trading with your own funds",
                        },
                        {
                          id: "D",
                          name: "Futures Trading",
                          desc: "Leveraged futures contracts",
                        },
                      ];
                    case "crypto":
                      return [
                        {
                          id: "S",
                          name: "Spot Trading",
                          desc: "Buy and sell crypto with cash",
                        },
                        {
                          id: "D",
                          name: "Derivatives",
                          desc: "Futures and margin trading",
                        },
                      ];
                    case "mexc":
                      return [
                        {
                          id: "S",
                          name: "Spot Trading",
                          desc: "Cash trading with your own funds",
                        },
                        {
                          id: "D",
                          name: "Futures Trading",
                          desc: "Leveraged perpetual contracts",
                        },
                      ];
                    case "bingx":
                      return [
                        {
                          id: "S",
                          name: "Spot Trading",
                          desc: "Cash trading with your own funds",
                        },
                        {
                          id: "D",
                          name: "Perpetual Futures",
                          desc: "Leveraged perpetual contracts",
                        },
                      ];
                    case "bitmart":
                      return [
                        {
                          id: "S",
                          name: "Spot Trading",
                          desc: "Cash trading only",
                        },
                      ];
                    case "kucoin":
                      return [
                        {
                          id: "S",
                          name: "Spot Trading",
                          desc: "Cash trading with your own funds",
                        },
                        {
                          id: "D",
                          name: "Futures Trading",
                          desc: "Leveraged futures contracts",
                        },
                      ];
                    case "coinbase":
                      return [
                        {
                          id: "S",
                          name: "Spot Trading",
                          desc: "Cash trading only (professional trading)",
                        },
                      ];
                    case "tradelocker":
                      return [
                        {
                          id: "S",
                          name: "Standard Trading",
                          desc: "Forex, indices, and commodities",
                        },
                      ];
                    case "metatrader4":
                    case "metatrader5":
                      return []; // No account type selection needed - determined by broker
                    default:
                      return [
                        {
                          id: "S",
                          name: "Standard",
                          desc: "Regular trading account",
                        },
                      ];
                  }
                };

                const accountTypes = getAccountTypes();

                return accountTypes.length > 0 ? (
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Trading Type
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Account Type *
                      </label>
                      <div
                        className={`grid gap-4 ${
                          accountTypes.length === 1
                            ? "grid-cols-1"
                            : "grid-cols-2"
                        }`}
                      >
                        {accountTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                type: type.id as "S" | "D",
                              }))
                            }
                            className={`p-4 rounded-xl border transition-all text-left ${
                              formData.type === type.id
                                ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                                : "bg-gray-800/50 border-gray-700/50 text-gray-400 hover:border-gray-600/50"
                            }`}
                          >
                            <div className="font-medium">{type.name}</div>
                            <div className="text-xs mt-1">{type.desc}</div>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        Select the type of{" "}
                        {cryptoBrokers.find((b) => b.id === selectedBroker)
                          ? "trading"
                          : "account"}{" "}
                        you want to automate
                      </p>
                    </div>
                  </div>
                ) : null;
              })()}

              {/* Crypto-specific fields */}
              {cryptoBrokers.find((b) => b.id === selectedBroker) && (
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    API Credentials
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        API Key *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.apiKey}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            apiKey: e.target.value,
                          }))
                        }
                        placeholder={`Your ${
                          cryptoBrokers.find((b) => b.id === selectedBroker)
                            ?.name
                        } API key`}
                        className="w-full px-4 py-3 bg-gray-900/60 border border-green-500/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Get this from your{" "}
                        {
                          cryptoBrokers.find((b) => b.id === selectedBroker)
                            ?.name
                        }{" "}
                        account → API Management → Create API Key
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Secret Key *
                      </label>
                      <div className="relative">
                        <input
                          type={showSecrets ? "text" : "password"}
                          required
                          value={formData.secretKey}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              secretKey: e.target.value,
                            }))
                          }
                          placeholder={`Your ${
                            cryptoBrokers.find((b) => b.id === selectedBroker)
                              ?.name
                          } secret key`}
                          className="w-full px-4 py-3 pr-12 bg-gray-900/60 border border-green-500/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSecrets(!showSecrets)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showSecrets ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Your API secret key from{" "}
                        {
                          cryptoBrokers.find((b) => b.id === selectedBroker)
                            ?.name
                        }{" "}
                        (keep this private and secure)
                      </p>
                    </div>

                    {(selectedBroker === "kucoin" ||
                      selectedBroker === "crypto") && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Passphrase {selectedBroker === "kucoin" ? "*" : ""}
                        </label>
                        <input
                          type={showSecrets ? "text" : "password"}
                          required={selectedBroker === "kucoin"}
                          value={formData.passPhrase}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              passPhrase: e.target.value,
                            }))
                          }
                          placeholder={
                            selectedBroker === "kucoin"
                              ? "Your KuCoin API passphrase"
                              : "Your Crypto.com API passphrase (optional)"
                          }
                          className="w-full px-4 py-3 bg-gray-900/60 border border-green-500/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          {selectedBroker === "kucoin"
                            ? "Required: Your KuCoin API passphrase for additional security"
                            : "Optional: Your Crypto.com API passphrase (if set during API creation)"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Forex-specific fields */}
              {forexBrokers.find((b) => b.id === selectedBroker) && (
                <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Account Credentials
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Username/Login *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.username}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            username: e.target.value,
                          }))
                        }
                        placeholder={`Your ${
                          forexBrokers.find((b) => b.id === selectedBroker)
                            ?.name
                        } login number`}
                        className="w-full px-4 py-3 bg-gray-900/60 border border-blue-500/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Your{" "}
                        {
                          forexBrokers.find((b) => b.id === selectedBroker)
                            ?.name
                        }{" "}
                        account login number (usually 6-8 digits)
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showSecrets ? "text" : "password"}
                          required
                          value={formData.password}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                          placeholder={`Your ${
                            forexBrokers.find((b) => b.id === selectedBroker)
                              ?.name
                          } account password`}
                          className="w-full px-4 py-3 pr-12 bg-gray-900/60 border border-blue-500/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSecrets(!showSecrets)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showSecrets ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Your{" "}
                        {
                          forexBrokers.find((b) => b.id === selectedBroker)
                            ?.name
                        }{" "}
                        account password (not your platform password)
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Server *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.server}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            server: e.target.value,
                          }))
                        }
                        placeholder={
                          formData.serverType === "demo"
                            ? "e.g., demo.yourbroker.com:443"
                            : "e.g., live.yourbroker.com:443"
                        }
                        className="w-full px-4 py-3 bg-gray-900/60 border border-blue-500/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Your broker's{" "}
                        {formData.serverType === "demo" ? "demo" : "live"}{" "}
                        server address (found in your{" "}
                        {
                          forexBrokers.find((b) => b.id === selectedBroker)
                            ?.name
                        }{" "}
                        account details)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Security Notice */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-green-300 font-semibold mb-2">
                    🔒 Your Data is Safe
                  </h4>
                  <p className="text-green-300/80 text-sm leading-relaxed">
                    Your credentials are encrypted and stored securely. We never
                    store your private keys or passwords in plain text.
                    <strong className="text-green-200"> Important:</strong> Only
                    enable trading permissions - never enable withdrawal
                    permissions on your API keys.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                size="lg"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading}
                icon={isLoading ? Loader : Plus}
                className="flex-1"
              >
                {isLoading ? "Connecting..." : "Connect Account"}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default AccountConnectionModal;
