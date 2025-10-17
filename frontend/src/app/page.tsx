"use client";

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
} from "lucide-react";
import { Button, Card } from "../ui";

import { useWhop } from "@/context";

export default function HomePage() {
  const { whopUser } = useWhop();

  const features = [
    {
      icon: Bot,
      title: "Automated Trading",
      description:
        "Connect your broker and automate trades 24/7 with TradingView alerts",
      color: "from-blue-500/20 to-purple-500/20 border-blue-500/30",
    },
    {
      icon: Zap,
      title: "Instant Execution",
      description:
        "Lightning-fast webhook processing with sub-second trade execution",
      color: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Military-grade encryption and secure API key management",
      color: "from-green-500/20 to-emerald-500/20 border-green-500/30",
    },
    {
      icon: TrendingUp,
      title: "Multi-Broker Support",
      description: "Connect to 15+ major exchanges and trading platforms",
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Real-time performance tracking and detailed trade analytics",
      color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
    },
    {
      icon: Globe,
      title: "Global Markets",
      description: "Trade crypto, forex, stocks, and commodities worldwide",
      color: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Crypto Trader",
      content:
        "AutomatedTrader transformed my trading. I can now execute strategies 24/7 without being glued to my screen.",
      rating: 5,
    },
    {
      name: "Mike Rodriguez",
      role: "Forex Trader",
      content:
        "The webhook integration is flawless. My TradingView alerts execute instantly on my MT5 account.",
      rating: 5,
    },
    {
      name: "Alex Thompson",
      role: "Algorithmic Trader",
      content:
        "Finally, a platform that understands automated trading. The setup was incredibly easy.",
      rating: 5,
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Traders" },
    { value: "15+", label: "Supported Brokers" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Automation" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <img
                src="https://trustedsignalsvip.com/wp-content/uploads/2025/05/dark-logo-scaled.webp"
                alt="Automated Trader"
                className="h-16 sm:h-20 w-auto mx-auto mb-8"
              />
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Automate Your Trading
              </span>
              <br />
              <span className="text-white">Like a Pro</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Connect any broker, automate any strategy. Turn your TradingView
              alerts into profitable trades 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <a href="/api/oauth/init">
                <Button size="xl" icon={ArrowRight} iconPosition="right">
                  Start Trading Now
                </Button>
              </a>
              <a href="/api/oauth/init">
                <Button variant="outline" size="xl" icon={Users}>
                  Join 50K+ Traders
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Everything You Need to Automate Trading
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Professional-grade automation tools designed for serious traders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} variant="gradient" hover>
                  <div
                    className={`p-4 bg-gradient-to-br ${feature.color} rounded-xl mb-6`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Trusted by Traders Worldwide
            </h2>
            <p className="text-xl text-gray-400">
              See what our community is saying
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} variant="gradient">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card variant="gradient" padding="xl">
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Automate Your Trading?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Join thousands of traders who have automated their strategies
                with our platform
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <a href="/api/oauth/init">
                <Button size="xl" icon={ArrowRight} iconPosition="right">
                  Get Started Free
                </Button>
              </a>
              {/* <Button variant="outline" size="xl" icon={Clock}>
                Schedule Demo
              </Button> */}
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>24/7 support</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
