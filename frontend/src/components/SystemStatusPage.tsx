import React from "react";
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Server,
  Zap,
  Globe,
  Database,
  Shield,
} from "lucide-react";
import { Card } from "../ui";
import { getBannersByCategory } from "../hooks/banners";
import { useBanner } from "../hooks";

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "outage";
  uptime: string;
  responseTime: string;
  lastIncident?: string;
  description: string;
  icon: any;
}

const SystemStatusPage: React.FC = () => {
  // Get platform banners for status page
  const statusBanners = [
    ...getBannersByCategory("platform").slice(0, 2),
    ...getBannersByCategory("promotional").slice(0, 1),
  ];
  const { currentBannerData, touchHandlers } = useBanner(
    statusBanners,
    true,
    10000
  );
  const ButtonIcon = currentBannerData?.buttonIcon || Activity;

  const services: ServiceStatus[] = [
    {
      name: "Webhook Processing",
      status: "operational",
      uptime: "99.98%",
      responseTime: "45ms",
      description: "TradingView alert processing and execution",
      icon: Zap,
    },
    {
      name: "Trading API",
      status: "operational",
      uptime: "99.95%",
      responseTime: "120ms",
      description: "Broker API connections and trade execution",
      icon: Activity,
    },
    {
      name: "Database",
      status: "operational",
      uptime: "99.99%",
      responseTime: "12ms",
      description: "User data and trade history storage",
      icon: Database,
    },
    {
      name: "Authentication",
      status: "degraded",
      uptime: "99.85%",
      responseTime: "250ms",
      lastIncident: "2 hours ago",
      description: "User login and session management",
      icon: Shield,
    },
    {
      name: "Web Dashboard",
      status: "operational",
      uptime: "99.97%",
      responseTime: "180ms",
      description: "Main application interface",
      icon: Globe,
    },
    {
      name: "Monitoring",
      status: "operational",
      uptime: "100%",
      responseTime: "25ms",
      description: "System health and performance monitoring",
      icon: Server,
    },
  ];

  const getStatusColor = (status: ServiceStatus["status"]) => {
    switch (status) {
      case "operational":
        return "text-green-400 bg-green-500/20 border-green-500/30";
      case "degraded":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
      case "outage":
        return "text-red-400 bg-red-500/20 border-red-500/30";
    }
  };

  const getStatusIcon = (status: ServiceStatus["status"]) => {
    switch (status) {
      case "operational":
        return CheckCircle;
      case "degraded":
        return AlertTriangle;
      case "outage":
        return XCircle;
    }
  };

  const overallStatus = services.every((s) => s.status === "operational")
    ? "operational"
    : services.some((s) => s.status === "outage")
    ? "outage"
    : "degraded";

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24 lg:pt-8">
      {/* Header */}
      <div className="mb-6">
        <Card variant="gradient" padding="lg">
          {/* Rotating Banner */}
          {currentBannerData && (
            <div
              className={`bg-gradient-to-r ${currentBannerData.gradient} border ${currentBannerData.borderColor} rounded-2xl p-4 sm:p-6 mb-6 transition-all duration-500 shadow-lg hover:shadow-xl cursor-pointer`}
              {...touchHandlers}
            >
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full font-medium">
                  Featured
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {currentBannerData.title}
                  </h3>
                  {currentBannerData.subtitle && (
                    <p className="text-blue-300 text-sm font-medium mb-2">
                      {currentBannerData.subtitle}
                    </p>
                  )}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {currentBannerData.description}
                  </p>
                </div>
                {currentBannerData.buttonLink ? (
                  <a
                    href={currentBannerData.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg text-sm flex-shrink-0"
                  >
                    <ButtonIcon className="h-4 w-4" />
                    {currentBannerData.buttonText}
                  </a>
                ) : (
                  <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg text-sm flex-shrink-0">
                    <ButtonIcon className="h-4 w-4" />
                    {currentBannerData.buttonText}
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl border border-green-500/30">
              <Activity className="h-8 w-8 text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">System Status</h1>
              <p className="text-gray-400">
                Real-time status of all AutomatedTrader services
              </p>
            </div>
          </div>

          {/* Overall Status */}
          <div
            className={`p-6 rounded-2xl border ${getStatusColor(
              overallStatus
            )}`}
          >
            <div className="flex items-center gap-3 mb-2">
              {React.createElement(getStatusIcon(overallStatus), {
                className: `h-6 w-6 ${
                  overallStatus === "operational"
                    ? "text-green-400"
                    : overallStatus === "degraded"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`,
              })}
              <h2 className="text-xl font-bold text-white">
                {overallStatus === "operational"
                  ? "All Systems Operational"
                  : overallStatus === "degraded"
                  ? "Some Systems Degraded"
                  : "System Outage"}
              </h2>
            </div>
            <p className="text-gray-300">
              {overallStatus === "operational"
                ? "All services are running normally with optimal performance."
                : overallStatus === "degraded"
                ? "Some services are experiencing performance issues but remain functional."
                : "Critical services are currently unavailable. We are working to resolve this immediately."}
            </p>
          </div>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {services.map((service) => {
          const ServiceIcon = service.icon;
          const StatusIcon = getStatusIcon(service.status);

          return (
            <Card key={service.name} variant="gradient" padding="lg" hover>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-800/50 rounded-xl">
                    <ServiceIcon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {service.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(
                    service.status
                  )}`}
                >
                  <StatusIcon className="h-4 w-4" />
                  <span className="text-sm font-medium capitalize">
                    {service.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/40 rounded-xl p-3">
                  <div className="text-sm text-gray-400 mb-1">Uptime</div>
                  <div className="text-lg font-bold text-green-400">
                    {service.uptime}
                  </div>
                </div>
                <div className="bg-gray-900/40 rounded-xl p-3">
                  <div className="text-sm text-gray-400 mb-1">
                    Response Time
                  </div>
                  <div className="text-lg font-bold text-blue-400">
                    {service.responseTime}
                  </div>
                </div>
              </div>

              {service.lastIncident && (
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                  <div className="flex items-center gap-2 text-yellow-300 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Last incident: {service.lastIncident}</span>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Recent Incidents */}
      <Card variant="gradient" padding="lg">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Clock className="h-6 w-6 text-purple-400" />
          Recent Incidents
        </h2>

        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white">
                  Authentication Service Degradation
                </h3>
                <span className="text-sm text-gray-400">2 hours ago</span>
              </div>
              <p className="text-gray-300 text-sm mb-2">
                Users may experience slower login times due to increased
                authentication server load.
              </p>
              <div className="text-xs text-yellow-300">
                Status: Investigating • Expected resolution: 1 hour
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white">
                  Webhook Processing Maintenance
                </h3>
                <span className="text-sm text-gray-400">1 day ago</span>
              </div>
              <p className="text-gray-300 text-sm mb-2">
                Scheduled maintenance completed successfully. Webhook processing
                performance improved by 15%.
              </p>
              <div className="text-xs text-green-300">
                Status: Resolved • Duration: 30 minutes
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-800/30 border border-gray-700/30 rounded-xl">
            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white">
                  Database Connection Issues
                </h3>
                <span className="text-sm text-gray-400">3 days ago</span>
              </div>
              <p className="text-gray-300 text-sm mb-2">
                Brief database connectivity issues affecting trade history
                display. All data remained secure.
              </p>
              <div className="text-xs text-green-300">
                Status: Resolved • Duration: 15 minutes
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SystemStatusPage;
