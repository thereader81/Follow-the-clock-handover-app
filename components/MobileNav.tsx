"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Shuffle, BarChart3, Settings as SettingsIcon } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/handovers", label: "Handovers", icon: Shuffle },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: SettingsIcon }
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-40 mb-6 flex items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[rgba(12,12,14,0.95)] px-3 py-2 lg:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-[10px] ${
              isActive ? "bg-[rgba(61,155,155,0.2)] text-white" : "text-[var(--text-tertiary)]"
            }`}
          >
            <Icon className={`h-4 w-4 ${isActive ? "text-[var(--accent-secondary)]" : "text-[var(--text-tertiary)]"}`} />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
