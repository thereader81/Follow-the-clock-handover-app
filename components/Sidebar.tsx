'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutGrid,
  Shuffle,
  BarChart3,
  Settings as SettingsIcon,
  Sparkles,
  Globe,
  LogOut,
  User,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import FeatureModal from "./modals/FeatureModal";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/handovers", label: "Handovers", icon: Shuffle },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: SettingsIcon }
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className="relative hidden min-h-screen w-72 flex-col border-r border-white/5 bg-[rgba(12,12,14,0.95)] px-6 py-8 lg:flex">
      {/* Logo */}
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
          <Globe className="h-6 w-6 text-black" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">helix</h2>
          <p className="text-xs text-gray-500">Follow-the-Sun</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${isActive
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-500 group-hover:text-white"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* AI Feature Card */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-transparent p-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <p className="text-xs font-medium text-purple-400">AI Orchestrator</p>
        </div>
        <p className="text-sm text-gray-400">Predictive guidance and live context preservation.</p>
        <button
          onClick={() => setShowFeatureModal(true)}
          className="mt-4 w-full rounded-xl bg-purple-500 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-600 transition-colors"
        >
          Launch AI Studio
        </button>
      </div>

      {/* User Profile */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <span className="text-sm font-semibold text-white">{user?.name?.charAt(0) || <User className="w-5 h-5 text-gray-400" />}</span>
              </div>
            )}
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-white">{user?.name || 'Demo User'}</p>
              <p className="text-xs text-gray-500">{user?.role || 'Team Lead'}</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-full left-0 right-0 mb-2 p-2 rounded-xl bg-[#1A1A1A] border border-white/10 shadow-xl"
            >
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </motion.div>
          )}
        </div>
      </div>
      <FeatureModal
        isOpen={showFeatureModal}
        onClose={() => setShowFeatureModal(false)}
        feature="ai"
      />
    </aside>
  );
}
