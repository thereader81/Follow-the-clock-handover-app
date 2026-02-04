import { upcomingTransitions } from "@/lib/data";
import { getRegionById, formatDateTime, complexityTone } from "@/lib/utils";
import { Clock, ArrowRight } from "lucide-react";

export default function UpcomingTransitions() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Next 6 Hours</p>
          <h3 className="text-lg font-semibold text-white">Upcoming Transitions</h3>
        </div>
        <Clock className="h-5 w-5 text-[var(--accent-secondary)]" />
      </div>

      <div className="mt-6 space-y-4">
        {upcomingTransitions.map((transition: any) => {
          const from = getRegionById(transition.fromRegion);
          const to = getRegionById(transition.toRegion);

          return (
            <div key={transition.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-[rgba(12,12,14,0.6)] px-4 py-3">
              <div>
                <p className="text-sm text-white">
                  {from?.city} <ArrowRight className="inline h-3.5 w-3.5 text-[var(--text-tertiary)]" /> {to?.city}
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">{formatDateTime(transition.scheduledTime, "UTC")} GMT</p>
              </div>
              <div className="text-right text-xs">
                <p className="text-[var(--text-tertiary)]">{transition.estimatedItems} items</p>
                <p className={`font-semibold ${complexityTone(transition.predictedComplexity)}`}>{transition.predictedComplexity} complexity</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
