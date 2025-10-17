import React, { useState, useEffect } from "react";
import {
  X,
  Settings,
  Save,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { Card, Button } from "../ui";
import { BrokerAccount } from "../types/broker";

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: BrokerAccount;
  onSave: (updates: Partial<BrokerAccount>) => Promise<void>;
}

const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  account,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "S" as "S" | "D",
    apiKey: "",
    secretKey: "",
    passPhrase: "",
    username: "",
    password: "",
    server: "",
    maxPositionSize: 1000,
    riskPerTrade: 2,
    enableStopLoss: true,
    stopLossPercentage: 5,
    enableTakeProfit: true,
    takeProfitPercentage: 10,
    enableTrailing: false,
    trailingPercentage: 2,
    maxDailyTrades: 50,
    maxDailyLoss: 500,
    tradingHours: {
      enabled: false,
      start: "09:00",
      end: "17:00",
      timezone: "UTC",
    },
    allowedSymbols: [] as string[],
    blockedSymbols: [] as string[],
    webhookSecret: "",
    notifications: {
      email: true,
      discord: false,
      telegram: false,
    },
  });

  const [showSecrets, setShowSecrets] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen && account) {
      setFormData({
        name: account.name,
        type: account.type as "S" | "D",
        apiKey: account.apiKey || "",
        secretKey: account.secretKey || "",
        passPhrase: account.passPhrase || "",
        username: account.username || "",
        password: account.password || "",
        server: account.server || "",
        maxPositionSize: 1000,
        riskPerTrade: 2,
        enableStopLoss: true,
        stopLossPercentage: 5,
        enableTakeProfit: true,
        takeProfitPercentage: 10,
        enableTrailing: false,
        trailingPercentage: 2,
        maxDailyTrades: 50,
        maxDailyLoss: 500,
        tradingHours: {
          enabled: false,
          start: "09:00",
          end: "17:00",
          timezone: "UTC",
        },
        allowedSymbols: [],
        blockedSymbols: [],
        webhookSecret: account.customId,
        notifications: {
          email: true,
          discord: false,
          telegram: false,
        },
      });
    }
  }, [isOpen, account]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Account name is required";
    }

    if (account.category === "crypto") {
      if (!formData.apiKey.trim()) {
        newErrors.apiKey = "API key is required";
      }
      if (!formData.secretKey.trim()) {
        newErrors.secretKey = "Secret key is required";
      }
    } else {
      if (!formData.username.trim()) {
        newErrors.username = "Username is required";
      }
      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      }
      if (!formData.server.trim()) {
        newErrors.server = "Server is required";
      }
    }

    if (formData.maxPositionSize <= 0) {
      newErrors.maxPositionSize = "Max position size must be greater than 0";
    }

    if (formData.riskPerTrade <= 0 || formData.riskPerTrade > 100) {
      newErrors.riskPerTrade = "Risk per trade must be between 0 and 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSave({
        name: formData.name,
        type: formData.type,
        apiKey: formData.apiKey || undefined,
        secretKey: formData.secretKey || undefined,
        passPhrase: formData.passPhrase || undefined,
        username: formData.username || undefined,
        password: formData.password || undefined,
        server: formData.server || undefined,
      });
      onClose();
    } catch (error) {
      console.error("Failed to save configuration:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatBrokerName = (brokerType: string) => {
    const names: { [key: string]: string } = {
      binance: "Binance",
      binanceus: "Binance US",
      bybit: "Bybit",
      bitget: "Bitget",
      crypto: "Crypto.com",
      mexc: "MEXC",
      bingx: "BingX",
      bitmart: "BitMart",
      kucoin: "KuCoin",
      coinbase: "Coinbase Pro",
      metatrader4: "MetaTrader 4",
      metatrader5: "MetaTrader 5",
      tradelocker: "TradeLocker",
    };
    return names[account.brokerType] || account.brokerType;
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
              Account Configuration
            </h2>
            <p className="text-gray-400">
              {formatBrokerName(account.brokerType)} - {account.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Settings */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-400" />
              Basic Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Account Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className={`w-full px-4 py-3 bg-gray-900/60 border ${
                    errors.name ? "border-red-500" : "border-gray-700/50"
                  } text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Account Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      type: e.target.value as "S" | "D",
                    }))
                  }
                  className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="S">Spot (S)</option>
                  <option value="D">Derivatives (D)</option>
                </select>
              </div>
            </div>
          </div>

          {/* API Credentials */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              API Credentials
            </h3>

            {account.category === "crypto" ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    API Key *
                  </label>
                  <input
                    type="text"
                    value={formData.apiKey}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        apiKey: e.target.value,
                      }))
                    }
                    className={`w-full px-4 py-3 bg-gray-900/60 border ${
                      errors.apiKey ? "border-red-500" : "border-gray-700/50"
                    } text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.apiKey && (
                    <p className="text-red-400 text-sm mt-1">{errors.apiKey}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Secret Key *
                  </label>
                  <div className="relative">
                    <input
                      type={showSecrets ? "text" : "password"}
                      value={formData.secretKey}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          secretKey: e.target.value,
                        }))
                      }
                      className={`w-full px-4 py-3 pr-12 bg-gray-900/60 border ${
                        errors.secretKey
                          ? "border-red-500"
                          : "border-gray-700/50"
                      } text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
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
                  {errors.secretKey && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.secretKey}
                    </p>
                  )}
                </div>

                {(account.brokerType === "kucoin" ||
                  account.brokerType === "crypto") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Passphrase {account.brokerType === "kucoin" ? "*" : ""}
                    </label>
                    <input
                      type={showSecrets ? "text" : "password"}
                      value={formData.passPhrase}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          passPhrase: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Username/Login *
                    </label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      className={`w-full px-4 py-3 bg-gray-900/60 border ${
                        errors.username
                          ? "border-red-500"
                          : "border-gray-700/50"
                      } text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    {errors.username && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.username}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showSecrets ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        className={`w-full px-4 py-3 pr-12 bg-gray-900/60 border ${
                          errors.password
                            ? "border-red-500"
                            : "border-gray-700/50"
                        } text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
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
                    {errors.password && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Server *
                  </label>
                  <input
                    type="text"
                    value={formData.server}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        server: e.target.value,
                      }))
                    }
                    placeholder="demo.server.com:443"
                    className={`w-full px-4 py-3 bg-gray-900/60 border ${
                      errors.server ? "border-red-500" : "border-gray-700/50"
                    } text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.server && (
                    <p className="text-red-400 text-sm mt-1">{errors.server}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Risk Management */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              Risk Management
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Position Size ($)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.maxPositionSize}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      maxPositionSize: Number(e.target.value),
                    }))
                  }
                  className={`w-full px-4 py-3 bg-gray-900/60 border ${
                    errors.maxPositionSize
                      ? "border-red-500"
                      : "border-gray-700/50"
                  } text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.maxPositionSize && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.maxPositionSize}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Risk Per Trade (%)
                </label>
                <input
                  type="number"
                  min="0.1"
                  max="100"
                  step="0.1"
                  value={formData.riskPerTrade}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      riskPerTrade: Number(e.target.value),
                    }))
                  }
                  className={`w-full px-4 py-3 bg-gray-900/60 border ${
                    errors.riskPerTrade
                      ? "border-red-500"
                      : "border-gray-700/50"
                  } text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.riskPerTrade && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.riskPerTrade}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Daily Trades
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.maxDailyTrades}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      maxDailyTrades: Number(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Daily Loss ($)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.maxDailyLoss}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      maxDailyLoss: Number(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Stop Loss & Take Profit */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.enableStopLoss}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        enableStopLoss: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Enable Stop Loss</span>
                </label>
                {formData.enableStopLoss && (
                  <input
                    type="number"
                    min="0.1"
                    max="50"
                    step="0.1"
                    value={formData.stopLossPercentage}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        stopLossPercentage: Number(e.target.value),
                      }))
                    }
                    className="w-20 px-2 py-1 bg-gray-900/60 border border-gray-700/50 text-white rounded text-sm"
                    placeholder="%"
                  />
                )}
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.enableTakeProfit}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        enableTakeProfit: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Enable Take Profit</span>
                </label>
                {formData.enableTakeProfit && (
                  <input
                    type="number"
                    min="0.1"
                    max="100"
                    step="0.1"
                    value={formData.takeProfitPercentage}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        takeProfitPercentage: Number(e.target.value),
                      }))
                    }
                    className="w-20 px-2 py-1 bg-gray-900/60 border border-gray-700/50 text-white rounded text-sm"
                    placeholder="%"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              icon={isLoading ? undefined : Save}
              className="flex-1"
            >
              {isLoading ? "Saving..." : "Save Configuration"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ConfigModal;
