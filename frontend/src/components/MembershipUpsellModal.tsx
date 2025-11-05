import React from 'react';
import { X, Crown, Zap, CheckCircle, TrendingUp, Shield, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui';

interface MembershipUpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MembershipUpsellModal: React.FC<MembershipUpsellModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30 shadow-2xl shadow-purple-500/20 animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-gray-800/80 hover:bg-gray-700/80 text-gray-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 mb-4 shadow-lg shadow-yellow-500/30">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Choose Your <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Trading Plan</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Select the perfect plan to automate your trading
            </p>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Basic Plan */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-500/50 rounded-xl p-5 hover:border-blue-400/70 transition-all">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-white mb-1">Basic</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-3xl font-bold text-blue-400">$29</span>
                  <span className="text-gray-400 text-sm">one-time</span>
                </div>
                <p className="text-gray-400 text-xs">Perfect for getting started</p>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-xs">1 Broker Account</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-xs">Alert Playground Access</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-xs">Basic Support</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-xs">Community Access</p>
                </div>
              </div>
              <Link href="/dashboard/membership">
                <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all text-sm">
                  Get Basic
                </button>
              </Link>
            </div>

            {/* Lifetime Plan */}
            <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border-2 border-yellow-500/70 rounded-xl p-5 relative hover:border-yellow-400/90 transition-all shadow-lg shadow-yellow-500/20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  BEST VALUE
                </span>
              </div>
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-white mb-1">Lifetime</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">$499</span>
                  <span className="text-gray-400 text-sm">one-time</span>
                </div>
                <p className="text-yellow-300 text-xs font-semibold">Pay once, use forever</p>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-200 text-xs"><strong>Unlimited</strong> Broker Accounts</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-200 text-xs">Advanced Trading Features</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-200 text-xs">Priority Support</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-200 text-xs">VIP Community Access</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-200 text-xs">Premium Indicators & Bots</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-200 text-xs">All Future Updates</p>
                </div>
              </div>
              <Link href="/dashboard/membership">
                <button className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-lg transition-all text-sm shadow-lg">
                  Get Lifetime
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-300 text-sm font-semibold mb-1">100% Secure Payment</p>
                <p className="text-blue-300/80 text-xs">
                  One-time payment. No subscriptions. No hidden fees. Full access immediately after purchase.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-2">
              <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-300 font-semibold text-sm mb-1">Start Trading in Minutes</p>
                <p className="text-yellow-300/80 text-xs">
                  Choose your plan, connect your broker, and start automating. It's that simple!
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full px-4 py-3 text-gray-400 hover:text-white text-sm font-medium transition-colors"
          >
            I'll decide later
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipUpsellModal;
