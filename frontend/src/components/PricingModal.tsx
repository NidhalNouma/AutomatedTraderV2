import React from 'react';
import { X, CheckCircle, Crown, Zap, TrendingUp, Shield, Infinity, ArrowRight } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] border border-gray-800 rounded-2xl sm:rounded-3xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="sticky top-2 sm:absolute sm:top-4 right-2 sm:right-4 z-30 p-2 text-gray-400 hover:text-white transition-colors bg-gray-900/90 rounded-full hover:bg-gray-800 ml-auto block"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-4 sm:p-6 lg:p-12">
          {/* Hero Section */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400" />
              <span className="text-orange-300 text-xs sm:text-sm font-semibold">Limited Time Offer</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight px-2">
              Automate Your Trading,<br />
              <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Own It Forever
              </span>
            </h1>

            <p className="text-gray-400 text-sm sm:text-base lg:text-lg xl:text-xl max-w-3xl mx-auto px-2">
              Connect unlimited brokers, execute trades 24/7, and never miss an opportunity.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-12">
            {/* Lifetime Plan - Featured */}
            <div className="bg-gradient-to-br from-orange-950/40 via-yellow-950/30 to-orange-950/40 border-2 border-orange-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 pt-8 sm:pt-10 flex flex-col relative overflow-visible shadow-2xl shadow-orange-900/50">
              {/* Glow Effects */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl" />

              {/* Badge */}
              <div className="absolute -top-3 sm:-top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 text-white text-[10px] sm:text-xs font-bold px-3 sm:px-6 py-1 sm:py-1.5 rounded-full shadow-xl uppercase tracking-wider flex items-center gap-1 sm:gap-2 z-20 whitespace-nowrap">
                <Crown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                <span className="hidden sm:inline">Most Popular - Best Value</span>
                <span className="sm:hidden">Best Value</span>
              </div>

              <div className="relative z-10">
                {/* Promo Code Badge - Top */}
                <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 rounded-lg px-2 sm:px-3 py-1.5 mb-3 sm:mb-4">
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 flex-shrink-0" />
                  <span className="text-green-400 text-xs sm:text-sm font-bold">Use code: FIRSTACCESS for 50% OFF</span>
                </div>

                <div className="mb-4 sm:mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <Infinity className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">Lifetime Access</h3>
                        <p className="text-orange-300 text-xs sm:text-sm font-semibold">Pay once. Own forever.</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <span className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">$1,500</span>
                      <div className="flex flex-col">
                        <span className="text-gray-500 line-through text-sm sm:text-base lg:text-lg">$2,999</span>
                        <span className="text-green-400 text-xs sm:text-sm font-bold">50% OFF</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 mb-4 sm:mb-6">
                      <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 flex-shrink-0" />
                      <span className="text-green-300 text-xs sm:text-sm font-semibold">Limited time - Use FIRSTACCESS code</span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2 sm:gap-3 lg:grid-cols-2 lg:gap-4 mb-6 sm:mb-8">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-2 sm:gap-3 text-gray-100 text-xs sm:text-sm">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="font-medium"><span className="text-orange-400 font-bold">Unlimited</span> Broker Accounts</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3 text-gray-100 text-xs sm:text-sm">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">24/7 Trade Execution</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3 text-gray-100 text-xs sm:text-sm">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">Advanced Analytics</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3 text-gray-100 text-xs sm:text-sm">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">Premium Indicators</span>
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-2 sm:gap-3 text-gray-100 text-xs sm:text-sm">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">Priority Support</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3 text-gray-100 text-xs sm:text-sm">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">VIP Community Access</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3 text-gray-100 text-xs sm:text-sm">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">Early Feature Access</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3 text-gray-100 text-xs sm:text-sm">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="font-medium"><span className="text-orange-400 font-bold">All Future Updates</span></span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => window.location.href = '/dashboard/membership'}
                  className="w-full bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-600 text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 hover:scale-[1.02] text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2 group"
                >
                  <span>Get Lifetime Access Now</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-gray-400 text-[10px] sm:text-xs mt-2 sm:mt-3">
                  <Shield className="h-3 w-3 inline mr-1" />
                  7-day money-back guarantee • Secure payment
                </p>

                <div className="mt-4 sm:mt-6 text-center">
                  <p className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3 px-2">
                    Not ready yet? Explore all plans on the membership page
                  </p>
                  <button
                    onClick={() => window.location.href = '/dashboard/membership'}
                    className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-semibold transition-colors underline"
                  >
                    View All Membership Options
                  </button>
                </div>
              </div>
            </div>

            {/* Basic Plan */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Basic</h3>
                <div className="mb-2 sm:mb-3">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl sm:text-4xl font-black text-gray-300">$25</span>
                    <span className="text-gray-500 text-xs sm:text-sm">one-time</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 rounded-md px-2 py-1">
                    <span className="text-green-400 text-xs font-bold">Use code: FIRSTACCESS</span>
                  </div>
                </div>
                <p className="text-gray-500 text-xs sm:text-sm">Start your automation journey</p>
              </div>

              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                <li className="flex items-start gap-2 sm:gap-3 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <span>1 Broker Connection</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <span>Alert Playground</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <span>Email Support</span>
                </li>
              </ul>

              <button
                onClick={() => window.location.href = '/dashboard/membership'}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all text-sm sm:text-base"
              >
                Get Basic
              </button>
            </div>
          </div>

          {/* CTA Footer */}
          <div className="text-center">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-400 text-xs sm:text-sm transition-colors"
            >
              I'll decide later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
