import { aiInsights } from "@/lib/data";
import {
  AlertTriangle,
  TrendingUp,
  Trophy,
  Lightbulb,
  AlertCircle
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  "alert-triangle": AlertTriangle,
  "trending-up": TrendingUp,
  trophy: Trophy,
  lightbulb: Lightbulb,
  "alert-circle": AlertCircle
};

export default function AIAlertsPanel() {
  return (
    <div className="card-gradient-ai rounded-2xl border border-purple-500/20 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ai-primary)]">AI Insights</p>
        <button className="text-xs text-[var(--ai-primary)]">View All</button>
      </div>

      <div className="mt-6 space-y-5">
        {aiInsights.slice(0, 3).map((insight: any) => {
          const Icon = iconMap[insight.icon] || AlertCircle;
          const isHigh = insight.severity === "high";
          return (
            <div key={insight.id} className="rounded-xl border border-white/5 bg-[rgba(12,12,14,0.6)] p-4">
              <div className="flex items-start gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full ${isHigh ? "bg-[rgba(248,113,113,0.16)]" : "bg-[rgba(167,139,250,0.12)]"}`}>
                  <Icon className={`h-4 w-4 ${isHigh ? "text-[var(--error)]" : "text-[var(--ai-primary)]"}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{insight.title}</p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">{insight.message}</p>
                  <button className="mt-3 text-xs font-semibold text-[var(--ai-primary)]">{insight.actionLabel}</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
