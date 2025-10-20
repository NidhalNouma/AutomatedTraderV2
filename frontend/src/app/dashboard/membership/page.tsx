"use client";

import React from "react";
import {
  Award,
  CheckCircle,
  ArrowRight,
  Crown,
  Zap,
  Shield,
  MessageCircle,
  DollarSign,
} from "lucide-react";
import { Card, Button } from "@/ui";

import { pricingPlans } from "@/utils";

import { useWhop } from "@/context/WhopContext";

export default function MembershipPage() {
  const { whopUser } = useWhop();
  const userCurrentPlan: "Basic" | "Pro" | "Advanced" | "Lifetime" | null =
    (whopUser && whopUser.hasAccess && whopUser.access.name) ?? null;

  const currentPlanDetails = {
    Basic: { price: "$29", billingCycle: "monthly" },
    Pro: { price: "$79", billingCycle: "monthly" },
    Advanced: {
      price: "$199",
      billingCycle: "monthly",
    },
    Lifetime: {
      price: "$2,999",
      billingCycle: "one-time payment",
      renewalDate: null,
    },
  };

  const currentPlan = userCurrentPlan
    ? {
        name: userCurrentPlan,
        status: "active",
        ...currentPlanDetails[userCurrentPlan],
      }
    : null;

  const benefits = [
    {
      icon: Zap,
      title: "Instant Access",
      description:
        "Get immediate access to all features the moment you upgrade",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description:
        "Bank-level encryption protects all your payment information",
    },
    {
      icon: MessageCircle,
      title: "24/7 Support",
      description: "Our team is always here to help you succeed",
    },
    {
      icon: Crown,
      title: "No Commitments",
      description: "Cancel or change your plan anytime with no penalties",
    },
  ];

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 mb-6 backdrop-blur-sm">
            <Award className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
            <span className="text-blue-300 text-xs sm:text-sm font-semibold tracking-wide">
              Membership & Billing
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Manage Your
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              Membership
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Upgrade, downgrade, or manage your subscription anytime
          </p>
        </div>

        {/* Current Plan */}
        {currentPlan && (
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              background:
                (userCurrentPlan as string) === "Lifetime"
                  ? "linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(17, 24, 39, 0.8) 50%, rgba(234, 179, 8, 0.1) 100%)"
                  : "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(17, 24, 39, 0.8) 50%, rgba(59, 130, 246, 0.1) 100%)",
              border:
                (userCurrentPlan as string) === "Lifetime"
                  ? "2px solid rgba(234, 179, 8, 0.3)"
                  : "2px solid rgba(59, 130, 246, 0.3)",
              padding: "2rem",
            }}
          >
            <div className="absolute top-0 right-0 rounded-bl-2xl overflow-hidden z-20">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1.5 text-xs font-bold shadow-lg">
                ACTIVE
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Crown
                    className={`h-8 w-8 ${
                      (userCurrentPlan as string) === "Lifetime"
                        ? "text-yellow-400"
                        : "text-blue-400"
                    }`}
                  />
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      Current Plan: {currentPlan.name}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {(userCurrentPlan as string) === "Lifetime"
                        ? "You have lifetime access"
                        : ``}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-400">Plan Price</span>
                    <span className="text-2xl font-bold text-white">
                      {currentPlan.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-400">Billing Cycle</span>
                    <span className="text-white font-medium capitalize">
                      {currentPlan.billingCycle}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-400">Status</span>
                    <span className="inline-flex items-center gap-2 text-green-400 font-medium">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Active
                    </span>
                  </div>
                </div>

                {(userCurrentPlan as string) === "Lifetime" ? (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-yellow-300 mb-1">
                          Lifetime Access Secured
                        </p>
                        <p className="text-xs text-gray-400">
                          You own this forever with all future updates included.
                          No recurring payments needed.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-blue-300 mb-1">
                          Active Subscription
                        </p>
                        <p className="text-xs text-gray-400">
                          Your plan renews automatically. Cancel anytime with no
                          penalties.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div
                className={`bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border ${
                  (userCurrentPlan as string) === "Lifetime"
                    ? "border-yellow-500/20"
                    : "border-blue-500/20"
                }`}
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle
                    className={`h-5 w-5 ${
                      (userCurrentPlan as string) === "Lifetime"
                        ? "text-yellow-400"
                        : "text-blue-400"
                    }`}
                  />
                  Your Benefits
                </h3>
                <ul className="space-y-3">
                  {pricingPlans
                    .find((p) => p.name === userCurrentPlan)
                    ?.features.slice(0, 5)
                    .map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                variant="gradient"
                hover
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-4 mx-auto">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Available Plans */}
        {whopUser?.access?.name.toLowerCase() == "lifetime" || (
          <div>
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 sm:px-6 py-2 mb-6 backdrop-blur-sm">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                <span className="text-blue-300 text-xs sm:text-sm font-semibold tracking-wide">
                  All Available Plans
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Compare
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}
                  All Plans
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-400">
                Switch between plans anytime to match your trading needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingPlans.map((plan, index) => {
                const planOrder = pricingPlans.map((p) => p.name);
                const userIndex = planOrder.indexOf(userCurrentPlan || "");
                const planIndex = planOrder.indexOf(plan.name);

                const isCurrent = plan.name === userCurrentPlan;
                const isUpgrade = userIndex !== -1 && planIndex > userIndex;
                const isDowngrade = userIndex !== -1 && planIndex < userIndex;
                return (
                  <Card
                    key={index}
                    variant="gradient"
                    className={`relative group hover:scale-[1.02] transition-all duration-500 ${
                      isCurrent
                        ? "ring-2 ring-yellow-500/50 shadow-2xl shadow-yellow-500/30"
                        : plan.popular
                        ? "ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/30"
                        : ""
                    }`}
                  >
                    {(plan.popular || isCurrent) && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <div
                          className={`bg-gradient-to-r ${
                            isCurrent
                              ? "from-yellow-500 to-orange-500"
                              : "from-blue-500 to-purple-500"
                          } text-white px-3 sm:px-4 py-1 rounded-full text-xs font-bold shadow-xl`}
                        >
                          {isCurrent ? "YOUR PLAN" : plan.highlight}
                        </div>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mb-4 px-2 leading-relaxed">
                        {plan.description}
                      </p>
                      <div className="flex items-baseline justify-center mb-6">
                        <span className="text-3xl sm:text-4xl font-black text-white">
                          {plan.price}
                        </span>
                        <span className="text-sm text-gray-400 ml-2">
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6 px-2">
                      {plan.features
                        .slice(0, 5)
                        .map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start gap-2"
                          >
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 text-blue-400 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      {plan.features.length > 5 && (
                        <li className="text-xs text-gray-500 pl-7">
                          +{plan.features.length - 5} more features
                        </li>
                      )}
                    </ul>

                    <a
                      href={plan.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-2"
                    >
                      <Button
                        variant={
                          isCurrent
                            ? "outline"
                            : plan.popular
                            ? "primary"
                            : "outline"
                        }
                        size="lg"
                        className="w-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
                        icon={isCurrent ? CheckCircle : ArrowRight}
                        iconPosition="right"
                        disabled={isCurrent}
                      >
                        {isCurrent
                          ? "Current Plan"
                          : isUpgrade
                          ? "Upgrade to " + plan.name
                          : isDowngrade
                          ? "Downgrade"
                          : plan.cta}
                      </Button>
                    </a>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
        {/* Help Section */}
        <Card
          variant="gradient"
          className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30"
        >
          <div className="text-center">
            <MessageCircle className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Need Help Choosing?
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
              Our team is here to help you find the perfect plan for your
              trading needs. Join our Discord community or check our
              documentation.
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
              <Button
                variant="outline"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
