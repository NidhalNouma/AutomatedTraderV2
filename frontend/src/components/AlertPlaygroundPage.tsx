import React from "react";
import {
  Copy,
  Info,
  Zap,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { useAlertGenerator, useBanner } from "../hooks";
import { getBannersByCategory } from "../hooks/banners";
import { Card, Button } from "../ui";

const AlertPlaygroundPage: React.FC = () => {
  const { config, updateConfig, generateAlertMessages, copyToClipboard } =
    useAlertGenerator();

  // Get community and education banners for playground
  const playgroundBanners = [
    ...getBannersByCategory("community").slice(0, 2),
    ...getBannersByCategory("education").slice(0, 2),
    ...getBannersByCategory("tools").slice(0, 2),
  ];

  const { currentBannerData, touchHandlers } = useBanner(
    playgroundBanners,
    true,
    6000
  );
  const ButtonIcon = currentBannerData?.buttonIcon || ExternalLink;
  const alertMessages = generateAlertMessages();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black">
      <div className="p-3 sm:p-4 md:p-6 lg:p-8 pt-20 sm:pt-24 lg:pt-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Card variant="gradient" padding="lg">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  Alert Playground
                </h1>
                <p className="text-gray-400 text-sm sm:text-base">
                  Generate perfect TradingView alert messages for automated
                  trading
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-3 sm:p-4">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-blue-300 text-xs sm:text-sm">
                  Create professional alert messages for TradingView strategies
                  and indicators. Configure your trade parameters below, then
                  copy the generated messages into your TradingView alerts to
                  enable automated trading.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Configuration Panel */}
          <div className="space-y-4 sm:space-y-6">
            {/* Banner */}
            <div
              className="bg-gradient-to-br from-gray-950/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl overflow-hidden touch-pan-y"
              {...touchHandlers}
            >
              <div
                className={`bg-gradient-to-r ${currentBannerData?.gradient} border-b border-gray-800/20 p-4`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-lg border ${currentBannerData?.borderColor}`}
                    >
                      <ButtonIcon className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">
                        {currentBannerData?.title}
                      </h3>
                      <p className="text-gray-400 text-xs">
                        {currentBannerData?.description}
                      </p>
                    </div>
                  </div>
                  <a
                    href={currentBannerData?.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 shadow-lg text-xs flex-shrink-0"
                  >
                    <ButtonIcon className="h-4 w-4" />
                    {currentBannerData?.buttonText}
                  </a>
                </div>
              </div>
            </div>

            {/* Configuration Panel */}
            <Card variant="gradient" padding="md">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="p-2 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30">
                  <BookOpen className="h-5 w-5 text-green-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  Strategy Configuration
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Trade Configuration */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-3 sm:p-4">
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Trade Parameters
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-2">
                        Asset/Symbol
                      </label>
                      <input
                        type="text"
                        placeholder="BTCUSDT, EURUSD, NAS100, AAPL"
                        value={config.assetName}
                        onChange={(e) =>
                          updateConfig({ assetName: e.target.value })
                        }
                        className="w-full px-3 py-3 bg-gray-900/60 border border-blue-500/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Trading symbol (crypto pairs, forex, stocks, indices)
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-2">
                        Position Size
                      </label>
                      <input
                        type="text"
                        placeholder="0.001, 100, 1.5, 10000"
                        value={config.volumeAmount}
                        onChange={(e) =>
                          updateConfig({ volumeAmount: e.target.value })
                        }
                        className="w-full px-3 py-3 bg-gray-900/60 border border-green-500/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Quantity/lot size/units to trade per signal
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-2">
                        Trade ID
                      </label>
                      <input
                        type="text"
                        placeholder="strategy_123, buy_3892, S_28929"
                        value={config.idValue}
                        onChange={(e) =>
                          updateConfig({ idValue: e.target.value })
                        }
                        className="w-full px-3 py-3 bg-gray-900/60 border border-purple-500/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Unique id to identify each trade
                      </p>
                    </div>
                  </div>
                </div>

                {/* Take Profit Configuration */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Exit Strategy
                    </h3>
                    <button
                      onClick={() =>
                        updateConfig({
                          showMoreOptions: !config.showMoreOptions,
                        })
                      }
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                        config.showMoreOptions
                          ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                          : "bg-gray-800/50 text-gray-400 border-gray-600/30 hover:border-purple-500/30 hover:text-purple-400"
                      }`}
                    >
                      {config.showMoreOptions ? "Simple Mode" : "Advanced TPs"}
                    </button>
                  </div>

                  {!config.showMoreOptions ? (
                    <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-700/30">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">
                          Exit Mode:
                        </span>
                        <span className="text-lg font-bold text-green-400">
                          100% (Full Close)
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        One alert closes entire position (most common)
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <label className="text-sm text-gray-300 min-w-0">
                          Number of TPs:
                        </label>
                        <select
                          value={config.numTPs}
                          onChange={(e) =>
                            updateConfig({ numTPs: Number(e.target.value) })
                          }
                          className="px-3 py-2 bg-gray-900/60 border border-purple-500/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                        >
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <option key={num} value={num}>
                              {num} Take Profit{num > 1 ? "s" : ""}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div
                        className={`grid gap-3 ${
                          config.numTPs <= 2
                            ? "grid-cols-2"
                            : config.numTPs <= 3
                            ? "grid-cols-3"
                            : "grid-cols-2 sm:grid-cols-3"
                        }`}
                      >
                        {[
                          {
                            value: config.tp1,
                            key: "tp1",
                            label: "TP1",
                            color: "purple",
                          },
                          {
                            value: config.tp2,
                            key: "tp2",
                            label: "TP2",
                            color: "blue",
                          },
                          {
                            value: config.tp3,
                            key: "tp3",
                            label: "TP3",
                            color: "green",
                          },
                          {
                            value: config.tp4,
                            key: "tp4",
                            label: "TP4",
                            color: "yellow",
                          },
                          {
                            value: config.tp5,
                            key: "tp5",
                            label: "TP5",
                            color: "red",
                          },
                          {
                            value: config.tp6,
                            key: "tp6",
                            label: "TP6",
                            color: "pink",
                          },
                        ]
                          .slice(0, config.numTPs)
                          .map((tp, index) => (
                            <div key={index}>
                              <label className="block text-xs font-medium text-gray-300 mb-2">
                                {tp.label} (%)
                              </label>
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={tp.value}
                                onChange={(e) =>
                                  updateConfig({
                                    [tp.key]: Math.max(
                                      0,
                                      Math.min(100, Number(e.target.value))
                                    ),
                                  })
                                }
                                className={`w-full px-3 py-2 bg-gray-900/60 border border-${tp.color}-500/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-${tp.color}-500 focus:border-transparent text-sm`}
                              />
                            </div>
                          ))}
                      </div>

                      <div className="bg-gradient-to-r from-gray-900/40 to-black/20 rounded-xl p-4 border border-gray-700/30">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">
                            Strategy:
                          </span>
                          <span className="text-sm font-medium text-white">
                            {[
                              config.tp1,
                              config.tp2,
                              config.tp3,
                              config.tp4,
                              config.tp5,
                              config.tp6,
                            ]
                              .slice(0, config.numTPs)
                              .filter((tp) => tp > 0)
                              .join("% + ")}
                            % ={" "}
                            {[
                              config.tp1,
                              config.tp2,
                              config.tp3,
                              config.tp4,
                              config.tp5,
                              config.tp6,
                            ]
                              .slice(0, config.numTPs)
                              .reduce((sum, tp) => sum + tp, 0)}
                            %
                          </span>
                        </div>
                        {[
                          config.tp1,
                          config.tp2,
                          config.tp3,
                          config.tp4,
                          config.tp5,
                          config.tp6,
                        ]
                          .slice(0, config.numTPs)
                          .reduce((sum, tp) => sum + tp, 0) > 100 && (
                          <p className="text-xs text-yellow-400 mt-2">
                            ⚠️ Total exceeds 100% - values will be auto-adjusted
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Generated Alerts Panel */}
          <Card variant="gradient" padding="md">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                <ExternalLink className="h-5 w-5 text-green-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Your Alert Messages
              </h2>
            </div>

            <div className="space-y-3">
              {/* Entry Alerts */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-gray-900/40 to-black/20 rounded-xl p-3 border border-gray-700/30 hover:border-gray-600/50 transition-all">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 whitespace-nowrap">
                  Long Entry
                </span>
                <code className="flex-1 text-xs font-mono text-gray-300 bg-black/40 px-3 py-2 rounded-lg border border-gray-800/50 min-w-0 overflow-x-auto">
                  {alertMessages.longEntry}
                </code>
                <button
                  onClick={() => copyToClipboard(alertMessages.longEntry)}
                  className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all flex-shrink-0"
                  title="Copy Alert"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 bg-gradient-to-r from-gray-900/40 to-black/20 rounded-xl p-3 border border-gray-700/30 hover:border-gray-600/50 transition-all">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 whitespace-nowrap">
                  Short Entry
                </span>
                <code className="flex-1 text-xs font-mono text-gray-300 bg-black/40 px-3 py-2 rounded-lg border border-gray-800/50 min-w-0 overflow-x-auto">
                  {alertMessages.shortEntry}
                </code>
                <button
                  onClick={() => copyToClipboard(alertMessages.shortEntry)}
                  className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all flex-shrink-0"
                  title="Copy Alert"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>

              {/* Exit/TP Alerts */}
              {!config.showMoreOptions ? (
                <>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-gray-900/40 to-black/20 rounded-xl p-3 border border-gray-700/30 hover:border-gray-600/50 transition-all">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 whitespace-nowrap">
                      Long Exit (100%)
                    </span>
                    <code className="flex-1 text-xs font-mono text-gray-300 bg-black/40 px-3 py-2 rounded-lg border border-gray-800/50 min-w-0 overflow-x-auto">
                      {alertMessages.longExit}
                    </code>
                    <button
                      onClick={() =>
                        copyToClipboard(alertMessages.longExit || "")
                      }
                      className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all flex-shrink-0"
                      title="Copy Alert"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 bg-gradient-to-r from-gray-900/40 to-black/20 rounded-xl p-3 border border-gray-700/30 hover:border-gray-600/50 transition-all">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 whitespace-nowrap">
                      Short Exit (100%)
                    </span>
                    <code className="flex-1 text-xs font-mono text-gray-300 bg-black/40 px-3 py-2 rounded-lg border border-gray-800/50 min-w-0 overflow-x-auto">
                      {alertMessages.shortExit}
                    </code>
                    <button
                      onClick={() =>
                        copyToClipboard(alertMessages.shortExit || "")
                      }
                      className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all flex-shrink-0"
                      title="Copy Alert"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {[
                    config.tp1,
                    config.tp2,
                    config.tp3,
                    config.tp4,
                    config.tp5,
                    config.tp6,
                  ]
                    .slice(0, config.numTPs)
                    .map((tpValue, index) => {
                      if (tpValue > 0) {
                        const longKey = `longTp${index + 1}`;
                        const shortKey = `shortTp${index + 1}`;

                        return (
                          <React.Fragment key={index}>
                            <div className="flex items-center gap-2 bg-gradient-to-r from-gray-900/40 to-black/20 rounded-xl p-3 border border-gray-700/30 hover:border-gray-600/50 transition-all">
                              <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 whitespace-nowrap">
                                Long TP{index + 1} ({tpValue}%)
                              </span>
                              <code className="flex-1 text-xs font-mono text-gray-300 bg-black/40 px-3 py-2 rounded-lg border border-gray-800/50 min-w-0 overflow-x-auto">
                                {alertMessages[longKey]}
                              </code>
                              <button
                                onClick={() =>
                                  copyToClipboard(alertMessages[longKey] || "")
                                }
                                className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all flex-shrink-0"
                                title="Copy Alert"
                              >
                                <Copy className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="flex items-center gap-2 bg-gradient-to-r from-gray-900/40 to-black/20 rounded-xl p-3 border border-gray-700/30 hover:border-gray-600/50 transition-all">
                              <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 whitespace-nowrap">
                                Short TP{index + 1} ({tpValue}%)
                              </span>
                              <code className="flex-1 text-xs font-mono text-gray-300 bg-black/40 px-3 py-2 rounded-lg border border-gray-800/50 min-w-0 overflow-x-auto">
                                {alertMessages[shortKey]}
                              </code>
                              <button
                                onClick={() =>
                                  copyToClipboard(alertMessages[shortKey] || "")
                                }
                                className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all flex-shrink-0"
                                title="Copy Alert"
                              >
                                <Copy className="h-4 w-4" />
                              </button>
                            </div>
                          </React.Fragment>
                        );
                      }
                      return null;
                    })}
                </>
              )}
            </div>

            {/* Usage Tips */}
            <div className="mt-6 space-y-4">
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-3">
                    <p className="text-red-300 text-xs font-medium">
                      Stop Loss Alert Messages:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 bg-black/40 rounded-xl p-3">
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 whitespace-nowrap">
                          Long SL
                        </span>
                        <code className="flex-1 text-xs font-mono text-red-300 min-w-0 overflow-x-auto">
                          X=BUY A={config.assetName || "{{ticker}}"} P=100 ID=
                          {config.idValue || "{{id}}"}
                        </code>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              `X=BUY A=${
                                config.assetName || "{{ticker}}"
                              } P=100 ID=${config.idValue || "{{id}}"}`
                            )
                          }
                          className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all flex-shrink-0"
                          title="Copy Stop Loss Alert"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 bg-black/40 rounded-xl p-3">
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 whitespace-nowrap">
                          Short SL
                        </span>
                        <code className="flex-1 text-xs font-mono text-red-300 min-w-0 overflow-x-auto">
                          X=SELL A={config.assetName || "{{ticker}}"} P=100 ID=
                          {config.idValue || "{{id}}"}
                        </code>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              `X=SELL A=${
                                config.assetName || "{{ticker}}"
                              } P=100 ID=${config.idValue || "{{id}}"}`
                            )
                          }
                          className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all flex-shrink-0"
                          title="Copy Stop Loss Alert"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-red-300/80 text-xs">
                      💡 Use P=100 for stop loss alerts to close entire position
                      when hit
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-green-300 text-xs font-medium">
                      How to Use:
                    </p>
                    <ul className="text-green-300/80 text-xs space-y-1">
                      <li>
                        • Copy alert messages into TradingView
                        strategy/indicator alerts
                      </li>
                      <li>
                        • Add your broker's webhook URL to the alert settings
                      </li>
                      <li>• Always test with small position sizes first</li>
                      <li>
                        • Monitor initial trades to ensure proper execution
                      </li>
                      <li>
                        • Use stop loss alerts to protect against large losses
                      </li>
                      <li>
                        • Test all alerts on demo accounts before going live
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-yellow-300 text-xs font-medium">
                      Message Format:
                    </p>
                    <ul className="text-yellow-300/80 text-xs space-y-1">
                      <li>
                        • <strong>D=Buy/Sell</strong> - Opens long/short
                        position
                      </li>
                      <li>
                        • <strong>X=Buy/Sell</strong> - Closes short/long
                        position
                      </li>
                      <li>
                        • <strong>A=Symbol</strong> - Trading asset/pair
                      </li>
                      <li>
                        • <strong>Q=Size</strong> - Position quantity
                      </li>
                      <li>
                        • <strong>P=Percent</strong> - Amount to close (25, 50,
                        100)
                      </li>
                      <li>
                        • <strong>ID=Name</strong> - Strategy identifier
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AlertPlaygroundPage;
