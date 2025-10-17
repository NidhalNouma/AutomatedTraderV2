import React, { use } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Bot,
  BarChart3,
  Zap,
  Activity,
  FileText,
  DollarSign,
  LogOut,
  User,
  Award,
} from "lucide-react";
import { useWhop, useAccount } from "@/context";

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  isMobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isMobileMenuOpen = false,
  onCloseMobileMenu,
}) => {
  const { whopUser } = useWhop();
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    // { id: 'landing', label: 'Landing', icon: Home, path: '/' },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      path: "/dashboard",
    },
    {
      id: "automate",
      label: "Automate",
      icon: Bot,
      path: "/dashboard/automate",
    },
    {
      id: "charts",
      label: "Charts Hub",
      icon: BarChart3,
      path: "/dashboard/charts",
    },
    {
      id: "marketplace",
      label: "Marketplace",
      icon: DollarSign,
      path: "/dashboard/marketplace",
    },
    {
      id: "news",
      label: "Trading News",
      icon: FileText,
      path: "/dashboard/news",
    },
    {
      id: "playground",
      label: "Alert Playground",
      icon: Zap,
      path: "/dashboard/playground",
    },
    {
      id: "status",
      label: "System Status",
      icon: Activity,
      path: "/dashboard/status",
    },
    {
      id: "docs",
      label: "Documentation",
      icon: FileText,
      path: "/dashboard/docs",
    },
    {
      id: "rent-space",
      label: "Rent This Space",
      icon: User,
      path: "/dashboard/rent-space",
    },
  ];

  const handleNavigation = (path: string, id: string) => {
    router.push(path);
    if (onTabChange) {
      onTabChange(id);
    }
    if (onCloseMobileMenu) {
      onCloseMobileMenu();
    }
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return (
      pathname === path ||
      (activeTab &&
        menuItems.find((item) => item.id === activeTab)?.path === path)
    );
  };

  const { accounts } = useAccount();

  const activeAccounts =
    accounts?.filter((account: any) => account.active === true).length || 0;

  return (
    <div
      className={`fixed left-0 top-0 h-full w-64 bg-[#0a0a0a] border-r border-gray-800 z-50 transform transition-transform duration-300 flex flex-col sidebar-scroll ${
        isMobileMenuOpen
          ? "translate-x-0"
          : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img
            src="https://trustedsignalsvip.com/wp-content/uploads/2025/05/dark-logo-scaled.webp"
            alt="AutomatedTrader"
            className="h-10 w-auto max-w-[180px] object-contain"
          />
        </div>
      </div>

      {/* System Status */}
      <div className="p-4 border-b border-neutral-800">
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
          System Status
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span className="text-sm text-gray-300">Online</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Active Accounts</span>
            <span className="text-primary-400 font-medium">
              {activeAccounts}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Today's P&L</span>
            <span className="text-success-400 font-medium">+$156</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto sidebar-scroll">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path, item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
                {active && (
                  <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      {whopUser && (
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={whopUser.profilePicture?.sourceUrl || "/images/profile.png"}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium text-sm truncate">
                {whopUser.name}
              </div>
              <div className="text-xs text-yellow-400 font-medium">
                LIFETIME
              </div>
              <div className="text-xs text-gray-500 truncate">
                {whopUser.username}
              </div>
            </div>
          </div>
          {/* <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg text-sm transition-all">
          <User className="h-4 w-4" />
          <span>Edit Profile</span>
        </button> */}
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg text-sm transition-all mt-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
