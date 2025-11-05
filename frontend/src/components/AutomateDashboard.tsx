import React, { useState, useEffect } from "react";
import {
  Plus,
  FileText,
  TrendingUp,
  Settings,
  Power,
  Copy,
  CheckCircle,
  ExternalLink,
  Trash2,
  BookOpen,
  Zap,
  MoreVertical,
  Edit3,
  TestTube,
  AlertTriangle,
  X,
  Shield,
  Key,
  Globe,
  ArrowRight,
  Info,
  Target,
  Play,
  BarChart3,
  Users,
  Activity,
} from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { useWhop } from "@/context/WhopContext";
import { useAlertGenerator } from "../hooks/useAlertGenerator";
import { Card, Button } from "../ui";
import AccountConnectionModal from "./AccountConnectionModal";
import LogsModal from "./LogsModal";
import TradesModal from "./TradesModal";
import ConfigModal from "./ConfigModal";

import PricingModal from "./PricingModal";
import MembershipUpsellModal from "./MembershipUpsellModal";
import { servicesURL } from "@/utils";
import { getBannersByCategory, getBannerById, Banner } from "../hooks/banners";
import { useBanner } from "../hooks/useBanner";

const AutomateDashboard: React.FC = () => {
  const { accounts, toggleAccount, updateAccount, deleteAccount, isLoading } =
    useAccount();
  const { whopUser } = useWhop();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);

  const [setupGuideModal, setSetupGuideModal] = useState<{
    isOpen: boolean;
    brokerType: string;
    brokerName: string;
  }>({
    isOpen: false,
    brokerType: "",
    brokerName: "",
  });

  useEffect(() => {
    if (!whopUser) {
      setIsPricingModalOpen(true);
      setIsModalOpen(false);
    } else if (isModalOpen && whopUser && !whopUser.hasAccess) {
      setIsPricingModalOpen(true);
      setIsModalOpen(false);
    } else if (isModalOpen && whopUser && whopUser.hasAccess) {
      if (whopUser.access && whopUser.access.accounts <= accounts.length) {
        setIsPricingModalOpen(true);
        setIsModalOpen(false);
      }
    }
  }, [whopUser, isModalOpen, accounts.length]);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [logsModal, setLogsModal] = useState<{
    isOpen: boolean;
    accountId: string;
    accountName: string;
  }>({
    isOpen: false,
    accountId: "",
    accountName: "",
  });
  const [tradesModal, setTradesModal] = useState<{
    isOpen: boolean;
    accountId: string;
    accountName: string;
  }>({
    isOpen: false,
    accountId: "",
    accountName: "",
  });
  const [configModal, setConfigModal] = useState<{
    isOpen: boolean;
    account: any;
  }>({
    isOpen: false,
    account: null,
  });
  const [copiedWebhook, setCopiedWebhook] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  // Get banners for featured card
  const automateBanners = [
    getBannerById("platform-main"),
    getBannerById("discord-community"),
    getBannerById("hankox-trading"),
    getBannerById("trusted-signals"),
    getBannerById("isalgo-signals"),
    getBannerById("luxalgo-indicators"),
    getBannerById("chartprime-tools"),
  ].filter(Boolean) as Banner[];

  const { currentBannerData, touchHandlers } = useBanner(
    automateBanners,
    true,
    4000
  );
  const ButtonIcon = currentBannerData?.buttonIcon || Zap;

  const copyWebhookUrl = async (customId: string) => {
    const webhookUrl = `${servicesURL.publicWebhook}/${customId}`;
    try {
      await navigator.clipboard.writeText(webhookUrl);
      setCopiedWebhook(customId);
      setTimeout(() => setCopiedWebhook(null), 2000);
    } catch (err) {
      console.error("Failed to copy webhook URL:", err);
    }
  };

  const handleDeleteAccount = async (accountId: string) => {
    if (deleteConfirmText === "DELETE") {
      try {
        await deleteAccount(accountId);
        setDeleteConfirm(null);
        setDeleteConfirmText("");
      } catch (error) {
        console.error("Failed to delete account:", error);
      }
    }
  };

  const testConnection = async (accountId: string) => {
    // Mock connection test
    console.log("Testing connection for account:", accountId);
    setActiveDropdown(null);
  };

  const openSetupGuide = (brokerType: string) => {
    const brokerInfo = getBrokerInfo(brokerType);
    setSetupGuideModal({
      isOpen: true,
      brokerType,
      brokerName: brokerInfo.name,
    });
    setActiveDropdown(null);
  };

  const getBrokerInfo = (brokerType: string) => {
    const brokerData: {
      [key: string]: { name: string; logo: string; color: string };
    } = {
      binance: { name: "Binance", logo: "B", color: "bg-yellow-500" },
      bybit: { name: "Bybit", logo: "BB", color: "bg-orange-500" },
      bitget: { name: "Bitget", logo: "BG", color: "bg-blue-600" },
      kucoin: { name: "KuCoin", logo: "K", color: "bg-green-600" },
      metatrader5: { name: "MetaTrader5", logo: "MT5", color: "bg-blue-800" },
      mexc: { name: "MEXC", logo: "M", color: "bg-green-500" },
      tradelocker: { name: "TradeLocker", logo: "TL", color: "bg-gray-600" },
      hankotrade: { name: "HankoTrade", logo: "HT", color: "bg-blue-900" },
    };

    return (
      brokerData[brokerType] || {
        name: brokerType,
        logo: "_",
        color: "bg-gray-500",
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              Automate Dashboard
            </h1>
            <p className="text-gray-400 mt-1">
              Manage your trading accounts and automation
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={Plus}
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex"
            >
              Connect Account
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setIsModalOpen(true)}
              className="sm:hidden"
            >
              Connect
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Your Accounts</h2>
        {accounts.length === 0 ? (
          /* Empty State */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Featured Banner Card */}
            {currentBannerData && (
              <div
                className={`bg-gradient-to-br ${currentBannerData.gradient} border ${currentBannerData.borderColor} rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] relative overflow-hidden`}
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

                {currentBannerData.buttonLink ? (
                  <a
                    href={currentBannerData.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all text-sm w-full shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <ButtonIcon className="h-4 w-4" />
                    {currentBannerData.buttonText}
                  </a>
                ) : (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all text-sm w-full shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <ButtonIcon className="h-4 w-4" />
                    {currentBannerData.buttonText}
                  </button>
                )}
              </div>
            )}

            {/* Connect Account Card */}
            <div
              className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-4 sm:p-6 cursor-pointer hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Connect Your Trading Account
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Get Started
                  </p>
                </div>
              </div>

              <p className="text-gray-300 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                Start automating your trades by connecting your favorite broker
                or exchange
              </p>

              <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-medium transition-all text-xs sm:text-sm w-full">
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                Connect Account
              </button>
            </div>
          </div>
        ) : (
          /* Account Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Featured Banner Card */}
            {currentBannerData && (
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

                {currentBannerData.buttonLink ? (
                  <a
                    href={currentBannerData.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all text-sm w-full shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <ButtonIcon className="h-4 w-4" />
                    {currentBannerData.buttonText}
                  </a>
                ) : (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all text-sm w-full shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <ButtonIcon className="h-4 w-4" />
                    {currentBannerData.buttonText}
                  </button>
                )}
              </div>
            )}

            {/* Account Cards */}
            {accounts.map((account: any) => {
              const brokerInfo = getBrokerInfo(account.broker);

              return (
                <div
                  key={account.id}
                  className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-4 sm:p-6 hover:border-gray-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-500/10 relative"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full ${brokerInfo.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                      >
                        {brokerInfo.logo}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">
                          {account.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {brokerInfo.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          account.active
                            ? "bg-green-500/20 text-green-300 border border-green-500/30"
                            : "bg-red-500/20 text-red-300 border border-red-500/30"
                        }`}
                      >
                        {account.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  {/* Webhook URL */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400 text-sm">Webhook URL</span>
                    </div>
                    <div className="bg-black/40 rounded-lg p-3 flex items-center gap-2">
                      <code className="flex-1 text-xs text-gray-400 font-mono truncate">
                        {servicesURL.publicWebhook}/{account.webhookPath}
                      </code>
                      <button
                        onClick={() => copyWebhookUrl(account.webhookPath)}
                        className="p-1 text-gray-400 hover:text-blue-400 transition-colors flex-shrink-0"
                        title="Copy webhook URL"
                      >
                        {copiedWebhook === account.customId ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      onClick={() =>
                        setLogsModal({
                          isOpen: true,
                          accountId: account.id,
                          accountName: account.name,
                        })
                      }
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg text-sm font-medium transition-all hover:scale-[1.02] border border-blue-500/30"
                    >
                      <FileText className="h-4 w-4" />
                      View Logs
                    </button>
                    <button
                      onClick={() =>
                        setTradesModal({
                          isOpen: true,
                          accountId: account.id,
                          accountName: account.name,
                        })
                      }
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600/20 hover:bg-green-600/30 text-green-300 rounded-lg text-sm font-medium transition-all hover:scale-[1.02] border border-green-500/30"
                    >
                      <TrendingUp className="h-4 w-4" />
                      View Trades
                    </button>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openSetupGuide(account.brokerType)}
                        className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                        title="Setup Guide"
                      >
                        <BookOpen className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => toggleAccount(account.id)}
                        className={`p-2 transition-all rounded-lg ${
                          account.active
                            ? "text-green-400 hover:text-green-300 hover:bg-green-500/10"
                            : "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                        }`}
                        title={account.active ? "Pause" : "Start"}
                      >
                        <Power className="h-4 w-4" />
                      </button>
                      <button
                        // onClick={ () => setConfigModal({ isOpen: true, account })}
                        className="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all"
                        title="Settings"
                      >
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => setDeleteConfirm(account.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      title="Delete Account"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card
            variant="gradient"
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Delete Trading Account
                </h2>
                <p className="text-red-300">This action cannot be undone</p>
              </div>
              <button
                onClick={() => {
                  setDeleteConfirm(null);
                  setDeleteConfirmText("");
                }}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {(() => {
              const accountToDelete = accounts.find(
                (acc: any) => acc.id === deleteConfirm
              );
              if (!accountToDelete) return null;

              const brokerInfo = getBrokerInfo(accountToDelete.brokerType);

              return (
                <div className="space-y-6">
                  {/* Account Info */}
                  <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
                    <h3 className="text-red-300 font-semibold mb-4 flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Account Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 ${brokerInfo.color} rounded-lg flex items-center justify-center text-white font-bold shadow-lg`}
                          >
                            {brokerInfo.logo}
                          </div>
                          <div>
                            <div className="text-white font-semibold">
                              {accountToDelete.name}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {brokerInfo.name}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-400">Account Type: </span>
                          <span className="text-white">
                            {accountToDelete.type === "S"
                              ? "Spot"
                              : "Derivatives"}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-400">Status: </span>
                          <span
                            className={
                              accountToDelete.active
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {accountToDelete.active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="text-sm">
                          <span className="text-gray-400">Custom ID: </span>
                          <span className="text-white font-mono text-xs">
                            {accountToDelete.customId}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-400">Created: </span>
                          <span className="text-white">
                            {new Date(
                              accountToDelete.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-400">Category: </span>
                          <span className="text-white capitalize">
                            {accountToDelete.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Warning Information */}
                  <div className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 border border-yellow-500/30 rounded-xl p-6">
                    <h3 className="text-yellow-300 font-semibold mb-4 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      What Will Be Deleted
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span className="text-yellow-300">
                          <strong>Account Configuration:</strong> All API keys,
                          credentials, and settings will be permanently removed
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span className="text-yellow-300">
                          <strong>Webhook URL:</strong> Your webhook URL (
                          {servicesURL.publicWebhook}
                          {accountToDelete.customId}) will stop working
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span className="text-yellow-300">
                          <strong>TradingView Alerts:</strong> All alerts using
                          this webhook will fail to execute trades
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span className="text-yellow-300">
                          <strong>Trade History:</strong> All logs and trade
                          records for this account will be lost
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span className="text-yellow-300">
                          <strong>Active Positions:</strong> Any open trades
                          will continue on your broker but won't be managed by
                          automation
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Required */}
                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
                    <h3 className="text-blue-300 font-semibold mb-4 flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      Before You Delete
                    </h3>
                    <div className="space-y-2 text-sm text-blue-300/80">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>
                          Update or disable all TradingView alerts using this
                          webhook
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>
                          Close any open positions you want to manage manually
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>
                          Export trade history if you need records for tax
                          purposes
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>
                          Consider pausing the account instead of deleting if
                          you might reconnect later
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Confirmation Input */}
                  <div className="bg-gradient-to-r from-gray-900/40 to-black/20 border border-gray-700/30 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">
                      Type "DELETE" to confirm
                    </h3>
                    <input
                      type="text"
                      placeholder="Type DELETE to confirm"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/60 border border-red-500/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setDeleteConfirm(null);
                        setDeleteConfirmText("");
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="error"
                      size="lg"
                      disabled={deleteConfirmText !== "DELETE" || isLoading}
                      icon={isLoading ? undefined : Trash2}
                      onClick={() => handleDeleteAccount(accountToDelete.id)}
                      className="flex-1"
                    >
                      {isLoading ? "Deleting..." : "Delete Account"}
                    </Button>
                  </div>
                </div>
              );
            })()}
          </Card>
        </div>
      )}

      {/* Modals */}
      <AccountConnectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <LogsModal
        isOpen={logsModal.isOpen}
        onClose={() =>
          setLogsModal({ isOpen: false, accountId: "", accountName: "" })
        }
        accountId={logsModal.accountId}
        accountName={logsModal.accountName}
      />

      <TradesModal
        isOpen={tradesModal.isOpen}
        onClose={() =>
          setTradesModal({ isOpen: false, accountId: "", accountName: "" })
        }
        accountId={tradesModal.accountId}
        accountName={tradesModal.accountName}
      />

      <ConfigModal
        isOpen={configModal.isOpen}
        onClose={() => setConfigModal({ isOpen: false, account: null })}
        account={configModal.account}
        onSave={async (updates) => {
          if (configModal.account) {
            await updateAccount(configModal.account.id, updates);
            setConfigModal({ isOpen: false, account: null });
          }
        }}
      />
      {/* Modals */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
      />

      <MembershipUpsellModal
        isOpen={showMembershipModal}
        onClose={() => setShowMembershipModal(false)}
      />

      {/* Setup Guide Modal */}
      {setupGuideModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card
            variant="gradient"
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {setupGuideModal.brokerName} Setup Guide
                  </h2>
                  <p className="text-gray-400">
                    Step-by-step instructions to connect your account
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  setSetupGuideModal({
                    isOpen: false,
                    brokerType: "",
                    brokerName: "",
                  })
                }
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <SetupGuideContent
              brokerType={setupGuideModal.brokerType}
              brokerName={setupGuideModal.brokerName}
              onClose={() =>
                setSetupGuideModal({
                  isOpen: false,
                  brokerType: "",
                  brokerName: "",
                })
              }
            />
          </Card>
        </div>
      )}
    </div>
  );
};

export default AutomateDashboard;

// Setup Guide Content Component
interface SetupGuideContentProps {
  brokerType: string;
  brokerName: string;
  onClose: () => void;
}

const SetupGuideContent: React.FC<SetupGuideContentProps> = ({
  brokerType,
  brokerName,
  onClose,
}) => {
  const { config, updateConfig, generateAlertMessages, copyToClipboard } =
    useAlertGenerator();
  const [activeSection, setActiveSection] = useState<string>("overview");

  const getGuideContent = () => {
    const cryptoBrokers = [
      "binance",
      "binanceus",
      "bybit",
      "bitget",
      "crypto",
      "mexc",
      "bingx",
      "bitmart",
      "kucoin",
      "coinbase",
    ];
    const forexBrokers = ["metatrader4", "metatrader5", "tradelocker"];

    if (cryptoBrokers.includes(brokerType)) {
      return {
        type: "crypto",
        steps: [
          {
            title: "Log into your account",
            description: `Go to ${brokerName} and log into your trading account`,
            icon: Globe,
          },
          {
            title: "Navigate to API Management",
            description:
              "Find the API or API Keys section in your account settings",
            icon: Key,
          },
          {
            title: "Create New API Key",
            description: 'Click "Create API Key" or "New API Key" button',
            icon: Plus,
          },
          {
            title: "Configure Permissions",
            description:
              'Enable ONLY "Spot Trading" or "Futures Trading" permissions. NEVER enable withdrawal permissions.',
            icon: Shield,
          },
          {
            title: "Copy Credentials",
            description:
              "Copy your API Key, Secret Key, and Passphrase (if required) to AutomatedTrader",
            icon: Copy,
          },
        ],
        warnings: [
          "Never enable withdrawal permissions on your API keys",
          "Keep your secret keys private and secure",
          "Use IP restrictions if available for added security",
          "Start with small position sizes to test the connection",
        ],
        officialLink: getOfficialLink(brokerType),
      };
    } else if (forexBrokers.includes(brokerType)) {
      return {
        type: "forex",
        steps: [
          {
            title: "Open your trading platform",
            description: `Launch ${brokerName} on your computer`,
            icon: Globe,
          },
          {
            title: "Get account credentials",
            description: "Note your login number, password, and server address",
            icon: Key,
          },
          {
            title: "Enable automated trading",
            description:
              'Go to Tools > Options > Expert Advisors and enable "Allow automated trading"',
            icon: Settings,
          },
          {
            title: "Configure connection",
            description:
              "Enter your login, password, and server details in AutomatedTrader",
            icon: Copy,
          },
        ],
        warnings: [
          "Ensure your trading platform allows automated trading",
          "Use demo accounts first to test the connection",
          "Keep your login credentials secure",
          "Monitor your first few automated trades closely",
        ],
        officialLink: getOfficialLink(brokerType),
      };
    }

    return null;
  };

  const getOfficialLink = (brokerType: string) => {
    const links: { [key: string]: string } = {
      binance:
        "https://www.binance.com/en/support/faq/how-to-create-api-keys-on-binance-360002502072",
      binanceus:
        "https://support.binance.us/hc/en-us/articles/360046786914-How-to-create-API-keys",
      bybit:
        "https://www.bybit.com/en-US/help-center/bybitHC_Article?language=en_US&id=000001755",
      bitget:
        "https://www.bitget.com/support/articles/360033773114-How-to-create-an-API-key",
      crypto:
        "https://help.crypto.com/en/articles/3511412-how-to-create-an-api-key",
      mexc: "https://mexcdocs.github.io/apidocs/spot_v3_en/#introduction",
      bingx:
        "https://bingx-api.github.io/docs/#/en-us/common/account.html#API-Key-Management",
      bitmart: "https://developer-pro.bitmart.com/en/part1/auth.html",
      kucoin: "https://docs.kucoin.com/#authentication",
      coinbase:
        "https://help.coinbase.com/en/exchange/managing-my-account/how-to-create-an-api-key",
      metatrader4:
        "https://www.metatrader4.com/en/trading-platform/help/userguide",
      metatrader5:
        "https://www.metatrader5.com/en/trading-platform/help/userguide",
      tradelocker: "https://help.tradelocker.com/en/",
    };
    return links[brokerType] || "https://docs.automatedtrader.com";
  };

  const guideContent = getGuideContent();

  if (!guideContent) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-12 w-12 text-gray-500 mx-auto mb-4" />
        <p className="text-gray-400">
          Setup guide not available for this broker yet.
        </p>
      </div>
    );
  }

  // Alert Playground Guide
  const alertPlaygroundGuide = {
    title: "Alert Playground Guide",
    description: "Learn how to create perfect TradingView alert messages",
    steps: [
      {
        title: "Navigate to Alert Playground",
        description:
          "Go to the Alert Playground page from the main navigation menu",
        icon: Globe,
      },
      {
        title: "Configure Your Strategy",
        description:
          "Enter your asset symbol (BTCUSDT, EURUSD), position size, and strategy ID",
        icon: Settings,
      },
      {
        title: "Set Exit Strategy",
        description:
          "Choose simple mode (100% exit) or advanced mode with multiple take profits",
        icon: Target,
      },
      {
        title: "Generate Alert Messages",
        description:
          "The playground automatically generates properly formatted alert messages",
        icon: Zap,
      },
      {
        title: "Copy Alert Messages",
        description:
          "Click the copy button next to each generated alert message",
        icon: Copy,
      },
      {
        title: "Create TradingView Alerts",
        description:
          "Paste the messages into TradingView alert conditions with your webhook URL",
        icon: ExternalLink,
      },
    ],
    examples: [
      {
        type: "Long Entry",
        message: "D=Buy A=BTCUSDT Q=0.001 ID=my_strategy",
        description: "Opens a long position",
      },
      {
        type: "Short Entry",
        message: "D=Sell A=ETHUSDT Q=0.1 ID=my_strategy",
        description: "Opens a short position",
      },
      {
        type: "Take Profit",
        message: "X=Buy A=BTCUSDT P=50 ID=my_strategy",
        description: "Closes 50% of position",
      },
      {
        type: "Stop Loss",
        message: "X=Sell A=BTCUSDT P=100 ID=my_strategy",
        description: "Closes entire position",
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 p-2 bg-gray-900/50 rounded-2xl border border-gray-800/30">
        {[
          { id: "overview", label: "Overview", icon: Globe },
          { id: "setup", label: "Setup Steps", icon: ArrowRight },
          { id: "alerts", label: "Alert Messages", icon: Zap },
          { id: "security", label: "Security", icon: Shield },
          {
            id: "troubleshooting",
            label: "Troubleshooting",
            icon: AlertTriangle,
          },
        ].map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                activeSection === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              <TabIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Overview Section */}
      {activeSection === "overview" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-blue-500/20 rounded-2xl border border-blue-500/40">
                <Globe className="h-8 w-8 text-blue-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {brokerName} Integration Overview
                </h3>
                <p className="text-blue-300 text-lg">
                  Everything you need to know about connecting your account
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg mb-3">
                  What You'll Need
                </h4>
                {guideContent?.type === "crypto" ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                      <Key className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">
                        API Key from {brokerName}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                      <Shield className="h-5 w-5 text-yellow-400" />
                      <span className="text-gray-300">
                        Secret Key (keep private)
                      </span>
                    </div>
                    {(brokerType === "kucoin" || brokerType === "crypto") && (
                      <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                        <Key className="h-5 w-5 text-purple-400" />
                        <span className="text-gray-300">
                          Passphrase (if required)
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                      <Key className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">
                        Account Login Number
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                      <Shield className="h-5 w-5 text-yellow-400" />
                      <span className="text-gray-300">Account Password</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                      <Globe className="h-5 w-5 text-blue-400" />
                      <span className="text-gray-300">Server Address</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg mb-3">
                  What You'll Get
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                    <Zap className="h-5 w-5 text-blue-400" />
                    <span className="text-gray-300">
                      24/7 Automated Trading
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                    <ExternalLink className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">
                      TradingView Integration
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-purple-400" />
                    <span className="text-gray-300">
                      Real-time Performance Tracking
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                    <Shield className="h-5 w-5 text-yellow-400" />
                    <span className="text-gray-300">Secure Webhook URL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alert Messages Section */}
      {activeSection === "alerts" && (
        <div className="space-y-8">
          {/* Alert Playground Configuration */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-400" />
              Alert Message Generator
            </h3>
            <p className="text-blue-300/80 text-sm mb-6">
              Configure your strategy parameters below to generate perfect
              TradingView alert messages:
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Configuration Panel */}
              <div className="space-y-4">
                <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-700/30">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Trade Parameters
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-2">
                        Asset/Symbol
                      </label>
                      <input
                        type="text"
                        placeholder="BTCUSDT, EURUSD, AAPL"
                        value={config.assetName}
                        onChange={(e) =>
                          updateConfig({ assetName: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-gray-900/60 border border-blue-500/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-2">
                        Position Size
                      </label>
                      <input
                        type="text"
                        placeholder="0.001, 100, 1.5"
                        value={config.volumeAmount}
                        onChange={(e) =>
                          updateConfig({ volumeAmount: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-gray-900/60 border border-green-500/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-2">
                        Strategy ID
                      </label>
                      <input
                        type="text"
                        placeholder="strategy_1, scalp_bot"
                        value={config.idValue}
                        onChange={(e) =>
                          updateConfig({ idValue: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-gray-900/60 border border-purple-500/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Take Profit Configuration */}
                <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-700/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Exit Strategy
                    </h4>
                    <button
                      type="button"
                      onClick={() =>
                        updateConfig({
                          showMoreOptions: !config.showMoreOptions,
                        })
                      }
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all border ${
                        config.showMoreOptions
                          ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                          : "bg-gray-800/50 text-gray-400 border-gray-600/30 hover:border-purple-500/30 hover:text-purple-400"
                      }`}
                    >
                      {config.showMoreOptions ? "Simple Mode" : "Advanced TPs"}
                    </button>
                  </div>

                  {!config.showMoreOptions ? (
                    <div className="bg-black/40 rounded-lg p-3 border border-gray-800/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">
                          Exit Mode:
                        </span>
                        <span className="text-lg font-bold text-green-400">
                          100% (Full Close)
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        One alert closes entire position
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <label className="text-sm text-gray-300 min-w-0">
                          Number of TPs:
                        </label>
                        <select
                          value={config.numTPs}
                          onChange={(e) =>
                            updateConfig({ numTPs: Number(e.target.value) })
                          }
                          className="px-3 py-1 bg-gray-900/60 border border-purple-500/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                        >
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <option key={num} value={num}>
                              {num} TP{num > 1 ? "s" : ""}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div
                        className={`grid gap-2 ${
                          config.numTPs <= 2
                            ? "grid-cols-2"
                            : config.numTPs <= 3
                            ? "grid-cols-3"
                            : "grid-cols-2"
                        }`}
                      >
                        {[
                          { value: config.tp1, key: "tp1", label: "TP1" },
                          { value: config.tp2, key: "tp2", label: "TP2" },
                          { value: config.tp3, key: "tp3", label: "TP3" },
                          { value: config.tp4, key: "tp4", label: "TP4" },
                          { value: config.tp5, key: "tp5", label: "TP5" },
                          { value: config.tp6, key: "tp6", label: "TP6" },
                        ]
                          .slice(0, config.numTPs)
                          .map((tp, index) => (
                            <div key={index}>
                              <label className="block text-xs font-medium text-gray-300 mb-1">
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
                                className="w-full px-2 py-1 bg-gray-900/60 border border-purple-500/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Generated Messages Panel */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Generated Alert Messages
                </h4>

                {/* Entry Alerts */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 bg-gray-900/40 rounded-lg p-3 border border-gray-700/30">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 whitespace-nowrap">
                      Long Entry
                    </span>
                    <code className="flex-1 text-xs font-mono text-gray-300 bg-black/40 px-2 py-1 rounded border border-gray-800/50 min-w-0 overflow-x-auto">
                      {generateAlertMessages().longEntry}
                    </code>
                    <button
                      onClick={() =>
                        copyToClipboard(generateAlertMessages().longEntry)
                      }
                      className="p-1 text-gray-500 hover:text-green-400 hover:bg-green-500/10 rounded transition-all flex-shrink-0"
                      title="Copy Alert"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-900/40 rounded-lg p-3 border border-gray-700/30">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 whitespace-nowrap">
                      Short Entry
                    </span>
                    <code className="flex-1 text-xs font-mono text-gray-300 bg-black/40 px-2 py-1 rounded border border-gray-800/50 min-w-0 overflow-x-auto">
                      {generateAlertMessages().shortEntry}
                    </code>
                    <button
                      onClick={() =>
                        copyToClipboard(generateAlertMessages().shortEntry)
                      }
                      className="p-1 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-all flex-shrink-0"
                      title="Copy Alert"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Exit/TP Alerts */}
                <div className="space-y-2">
                  {!config.showMoreOptions ? (
                    <>
                      <div className="flex items-center gap-2 bg-gray-900/40 rounded-lg p-3 border border-gray-700/30">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 whitespace-nowrap">
                          Long Exit (100%)
                        </span>
                        <code className="flex-1 text-xs font-mono text-gray-300 bg-black/40 px-2 py-1 rounded border border-gray-800/50 min-w-0 overflow-x-auto">
                          {generateAlertMessages().longExit}
                        </code>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              generateAlertMessages().longExit || ""
                            )
                          }
                          className="p-1 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-all flex-shrink-0"
                          title="Copy Alert"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 bg-gray-900/40 rounded-lg p-3 border border-gray-700/30">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 whitespace-nowrap">
                          Short Exit (100%)
                        </span>
                        <code className="flex-1 text-xs font-mono text-gray-300 bg-black/40 px-2 py-1 rounded border border-gray-800/50 min-w-0 overflow-x-auto">
                          {generateAlertMessages().shortExit}
                        </code>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              generateAlertMessages().shortExit || ""
                            )
                          }
                          className="p-1 text-gray-500 hover:text-purple-400 hover:bg-purple-500/10 rounded transition-all flex-shrink-0"
                          title="Copy Alert"
                        >
                          <Copy className="h-3 w-3" />
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
                                <div className="flex items-center gap-2 bg-gray-900/40 rounded-lg p-3 border border-gray-700/30">
                                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 whitespace-nowrap">
                                    Long TP{index + 1} ({tpValue}%)
                                  </span>
                                  <code className="flex-1 text-xs font-mono text-gray-300 bg-black/40 px-2 py-1 rounded border border-gray-800/50 min-w-0 overflow-x-auto">
                                    {generateAlertMessages()[longKey]}
                                  </code>
                                  <button
                                    onClick={() =>
                                      copyToClipboard(
                                        generateAlertMessages()[longKey] || ""
                                      )
                                    }
                                    className="p-1 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-all flex-shrink-0"
                                    title="Copy Alert"
                                  >
                                    <Copy className="h-3 w-3" />
                                  </button>
                                </div>

                                <div className="flex items-center gap-2 bg-gray-900/40 rounded-lg p-3 border border-gray-700/30">
                                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 whitespace-nowrap">
                                    Short TP{index + 1} ({tpValue}%)
                                  </span>
                                  <code className="flex-1 text-xs font-mono text-gray-300 bg-black/40 px-2 py-1 rounded border border-gray-800/50 min-w-0 overflow-x-auto">
                                    {generateAlertMessages()[shortKey]}
                                  </code>
                                  <button
                                    onClick={() =>
                                      copyToClipboard(
                                        generateAlertMessages()[shortKey] || ""
                                      )
                                    }
                                    className="p-1 text-gray-500 hover:text-purple-400 hover:bg-purple-500/10 rounded transition-all flex-shrink-0"
                                    title="Copy Alert"
                                  >
                                    <Copy className="h-3 w-3" />
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
              </div>
            </div>
          </div>

          {/* Stop Loss Section */}
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Stop Loss Alert Messages
            </h3>
            <p className="text-red-300/80 text-sm mb-4">
              Use these stop loss alerts to protect your positions from large
              losses:
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2 bg-black/40 rounded-lg p-3">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 whitespace-nowrap">
                  Long SL
                </span>
                <code className="flex-1 text-xs font-mono text-red-300 min-w-0 overflow-x-auto">
                  X=Sell A={config.assetName || "{{ticker}}"} P=100 ID=
                  {config.idValue || "{{id}}"}
                </code>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `X=Sell A=${config.assetName || "{{ticker}}"} P=100 ID=${
                        config.idValue || "{{id}}"
                      }`
                    )
                  }
                  className="p-1 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-all flex-shrink-0"
                  title="Copy Stop Loss Alert"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>

              <div className="flex items-center gap-2 bg-black/40 rounded-lg p-3">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 whitespace-nowrap">
                  Short SL
                </span>
                <code className="flex-1 text-xs font-mono text-red-300 min-w-0 overflow-x-auto">
                  X=Buy A={config.assetName || "{{ticker}}"} P=100 ID=
                  {config.idValue || "{{id}}"}
                </code>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `X=Buy A=${config.assetName || "{{ticker}}"} P=100 ID=${
                        config.idValue || "{{id}}"
                      }`
                    )
                  }
                  className="p-1 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-all flex-shrink-0"
                  title="Copy Stop Loss Alert"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-300/80 text-xs">
                💡 <strong>Important:</strong> Use P=100 for stop loss alerts to
                close the entire position when hit. Always set stop losses to
                protect against large losses.
              </p>
            </div>
          </div>

          {/* Message Format Reference */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-yellow-400" />
              Message Format Reference
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-yellow-300 font-medium">
                    D=Buy/Sell
                  </span>
                  <p className="text-yellow-300/70 text-sm">
                    Opens long/short position
                  </p>
                </div>
                <div>
                  <span className="text-yellow-300 font-medium">
                    X=Buy/Sell
                  </span>
                  <p className="text-yellow-300/70 text-sm">
                    Closes short/long position
                  </p>
                </div>
                <div>
                  <span className="text-yellow-300 font-medium">A=Symbol</span>
                  <p className="text-yellow-300/70 text-sm">
                    Trading asset/pair
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-yellow-300 font-medium">Q=Size</span>
                  <p className="text-yellow-300/70 text-sm">
                    Position quantity
                  </p>
                </div>
                <div>
                  <span className="text-yellow-300 font-medium">P=Percent</span>
                  <p className="text-yellow-300/70 text-sm">
                    Amount to close (25, 50, 100)
                  </p>
                </div>
                <div>
                  <span className="text-yellow-300 font-medium">ID=Name</span>
                  <p className="text-yellow-300/70 text-sm">
                    Strategy identifier
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-green-300 font-semibold mb-2">
                  🚀 Ready to Use?
                </h4>
                <p className="text-green-300/80 text-sm mb-4">
                  Want to use the full Alert Playground with more features and
                  templates?
                </p>
                <a
                  href="/dashboard/playground"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 shadow-lg text-sm"
                >
                  <ArrowRight className="h-4 w-4" />
                  Open Alert Playground
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Setup Steps Section */}
      {activeSection === "setup" && guideContent && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-green-500/20 rounded-2xl border border-green-500/40">
                <ArrowRight className="h-8 w-8 text-green-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Detailed Setup Instructions
                </h3>
                <p className="text-green-300 text-lg">
                  Follow these steps carefully to connect your account
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {guideContent.steps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-gray-900/60 to-black/40 rounded-2xl p-6 border border-gray-700/30 hover:border-green-500/30 transition-all"
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center border border-green-500/30 shadow-lg">
                          <span className="text-green-300 font-bold text-xl">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <StepIcon className="h-6 w-6 text-green-400" />
                          <h4 className="text-xl font-bold text-white">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-gray-300 text-base leading-relaxed mb-4">
                          {step.description}
                        </p>

                        {/* Enhanced step details */}
                        {index === 0 && (
                          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <ExternalLink className="h-5 w-5 text-blue-400" />
                              <span className="text-blue-300 font-semibold">
                                Quick Access
                              </span>
                            </div>
                            <a
                              href={guideContent.officialLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm"
                            >
                              <Globe className="h-4 w-4" />
                              Open {brokerName} Official Guide
                            </a>
                          </div>
                        )}

                        {index === 3 && guideContent.type === "crypto" && (
                          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="h-5 w-5 text-red-400" />
                              <span className="text-red-300 font-semibold">
                                Critical Security Setting
                              </span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <p className="text-red-300/80">
                                ✅ Enable: Spot Trading or Futures Trading
                              </p>
                              <p className="text-red-300/80">
                                ❌ Disable: Withdrawal, Transfer, Sub-account
                              </p>
                              <p className="text-red-300/80">
                                💡 Tip: Use IP restrictions for added security
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Security Section */}
      {activeSection === "security" && guideContent && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-red-500/20 rounded-2xl border border-red-500/40">
                <Shield className="h-8 w-8 text-red-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Security Best Practices
                </h3>
                <p className="text-red-300 text-lg">
                  Protect your trading account and funds
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  Do These Things
                </h4>
                <div className="space-y-3">
                  {[
                    "Use strong, unique passwords",
                    "Enable 2FA on your broker account",
                    "Set IP restrictions on API keys",
                    "Start with demo/small amounts",
                    "Monitor first few trades closely",
                    "Keep API keys private and secure",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
                    >
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span className="text-green-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
                  <X className="h-5 w-5 text-red-400" />
                  Never Do These
                </h4>
                <div className="space-y-3">
                  {[
                    "Enable withdrawal permissions",
                    "Share your API keys publicly",
                    "Use the same password everywhere",
                    "Skip testing with small amounts",
                    "Ignore unusual trading activity",
                    "Store credentials in plain text",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                    >
                      <X className="h-4 w-4 text-red-400 flex-shrink-0" />
                      <span className="text-red-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Troubleshooting Section */}
      {activeSection === "troubleshooting" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-yellow-500/20 rounded-2xl border border-yellow-500/40">
                <AlertTriangle className="h-8 w-8 text-yellow-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Common Issues & Solutions
                </h3>
                <p className="text-yellow-300 text-lg">
                  Troubleshoot connection problems
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  problem: "Connection Failed",
                  solution:
                    "Check your API credentials and ensure trading permissions are enabled",
                  icon: AlertTriangle,
                  color: "red",
                },
                {
                  problem: "Invalid API Key",
                  solution:
                    "Verify your API key is copied correctly without extra spaces",
                  icon: Key,
                  color: "yellow",
                },
                {
                  problem: "Insufficient Permissions",
                  solution:
                    "Enable spot/futures trading permissions in your broker API settings",
                  icon: Shield,
                  color: "orange",
                },
                {
                  problem: "Webhook Not Working",
                  solution:
                    "Ensure your TradingView alert uses the correct webhook URL format",
                  icon: ExternalLink,
                  color: "blue",
                },
                {
                  problem: "Trades Not Executing",
                  solution:
                    "Check account balance, market hours, and symbol format",
                  icon: Activity,
                  color: "purple",
                },
              ].map((issue, index) => {
                const IssueIcon = issue.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-gray-900/60 to-black/40 rounded-2xl p-6 border border-gray-700/30"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 bg-${issue.color}-500/20 rounded-xl border border-${issue.color}-500/30`}
                      >
                        <IssueIcon
                          className={`h-6 w-6 text-${issue.color}-400`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-lg mb-2">
                          {issue.problem}
                        </h4>
                        <p className="text-gray-300 leading-relaxed">
                          {issue.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Support */}
            <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-blue-400" />
                  <div>
                    <h4 className="text-blue-300 font-semibold text-lg">
                      Still Need Help?
                    </h4>
                    <p className="text-blue-300/80">
                      Join our Discord community for live support
                    </p>
                  </div>
                </div>
                <a
                  href="https://discord.gg/jsM4m3fApc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  <Users className="h-5 w-5" />
                  Get Support
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="sticky bottom-0 bg-gradient-to-r from-gray-950/95 to-black/90 backdrop-blur-xl border-t border-gray-800/50 p-6 mt-8">
        <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
          <button
            onClick={() => {
              onClose();
              window.location.href = "/dashboard/playground";
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-4 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg"
          >
            <Zap className="h-5 w-5" />
            Open Alert Playground
          </button>
          <a
            href={guideContent?.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-4 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg"
          >
            <ExternalLink className="h-5 w-5" />
            Official {brokerName} Guide
          </a>
        </div>
      </div>
    </div>
  );
};
