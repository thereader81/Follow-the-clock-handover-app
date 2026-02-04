import { kpiData } from "@/lib/data";
import { TrendingDown, TrendingUp } from "lucide-react";

const kpiEntries = Object.entries(kpiData.current);

export default function KpiGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {kpiEntries.map(([key, metric]: any) => {
        const isPositive = metric.trend >= 0;
        const TrendIcon = isPositive ? TrendingUp : TrendingDown;
        return (
          <div key={key} className="card-gradient-neutral rounded-2xl border border-white/10 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">{formatLabel(key)}</p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-3xl font-semibold text-white">{metric.value}{metric.unit}</p>
              <div className={`flex items-center gap-1 text-xs ${isPositive ? "text-[var(--success)]" : "text-[var(--error)]"}`}>
                <TrendIcon className="h-3 w-3" />
                <span>{Math.abs(metric.trend)}{metric.unit}</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-[var(--text-tertiary)]">Target {metric.target}{metric.unit}</p>
          </div>
        );
      })}
    </div>
  );
}

const formatLabel = (label: string) =>
  label
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
