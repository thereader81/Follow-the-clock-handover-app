"use client";

import { useEffect, useState } from "react";
import { regions } from "@/lib/data";
import { getRegionStatus, getTimeInZone, getRegionAccent } from "@/lib/utils";

export default function RegionStatusBar() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="grid gap-4 lg:grid-cols-5">
      {regions.map((region) => {
        const status = getRegionStatus(region, now);
        const localTime = getTimeInZone(now, region.timezone);
        const accent = getRegionAccent(region.id);

        return (
          <div
            key={region.id}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-1"
          >
            <div className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full" style={{ background: accent, boxShadow: `0 0 12px ${accent}` }} />
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">{region.flag} {region.name}</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{region.city}</h3>
            <p className="text-sm text-[var(--text-secondary)]">{localTime} local</p>
            <div className={`badge mt-4 ${status.tone}`}>{status.label}</div>
            <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-tertiary)]">
              <span>Workday {region.workStart}-{region.workEnd}</span>
              <span>Handover {region.handoverStart}</span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
