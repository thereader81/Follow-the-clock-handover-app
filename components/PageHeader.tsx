"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, Globe2 } from "lucide-react";
import { currentUser, notifications } from "@/lib/data";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  const [now, setNow] = useState(new Date());
  const unreadCount = useMemo(() => notifications.filter((note) => !note.isRead).length, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const gmtTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(now);

  return (
    <header className="flex flex-wrap items-center justify-between gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--text-tertiary)]">Global Delivery Intelligence</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
        {subtitle ? <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">{subtitle}</p> : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="glass-panel flex items-center gap-3 rounded-full px-4 py-2 text-xs text-[var(--text-secondary)] shadow-sm">
          <Globe2 className="h-4 w-4 text-[var(--accent-secondary)]" />
          <span>GMT {gmtTime}</span>
        </div>
        <div className="relative flex items-center gap-3 rounded-full border border-white/10 bg-[rgba(212,168,83,0.08)] px-4 py-2 text-xs text-white">
          <span className="text-[var(--text-secondary)]">Signed in</span>
          <span className="font-semibold">{currentUser.name}</span>
        </div>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] text-white">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-primary)] text-[10px] font-semibold text-[var(--text-inverse)]">
              {unreadCount}
            </span>
          ) : null}
        </button>
        {actions}
      </div>
    </header>
  );
}
