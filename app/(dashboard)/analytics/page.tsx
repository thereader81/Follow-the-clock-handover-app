import PageHeader from "@/components/PageHeader";
import KpiGrid from "@/components/KpiGrid";
import AnalyticsCharts from "@/components/AnalyticsCharts";
import { mockAi } from "@/lib/data";

export default function AnalyticsPage() {
  const teams = Object.values(mockAi.teamPerformance?.regions ?? {}) as any[];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Performance Analytics"
        subtitle="Quantify handover quality, predict friction, and identify the highest-performing global hubs." 
      />

      <KpiGrid />

      <AnalyticsCharts />

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[rgba(12,12,14,0.7)] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Team Leaderboard</p>
          <h3 className="mt-2 text-lg font-semibold text-white">Top Performers by Region</h3>
          <div className="mt-6 space-y-4">
            {teams.map((team) => (
              <div key={team.name} className="rounded-xl border border-white/10 bg-[rgba(12,12,14,0.6)] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">{team.name}</p>
                  <p className="text-xs text-[var(--accent-secondary)]">{team.efficiency}% efficiency</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--text-tertiary)]">
                  <span>Context loss {team.contextLossRate}%</span>
                  <span>Avg handover {team.avgHandoverTime}m</span>
                  <span>On-time {team.onTimeRate}%</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {team.topPerformers.map((person: any) => (
                    <span key={person.name} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white">
                      {person.name} - {person.score}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[rgba(12,12,14,0.7)] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Prediction Accuracy</p>
          <h3 className="mt-2 text-lg font-semibold text-white">AI Forecast Quality</h3>
          <div className="mt-6 rounded-2xl border border-white/10 bg-[rgba(35,25,50,0.5)] p-6">
            <p className="text-sm text-white">89% accuracy across 30-day predictions</p>
            <p className="mt-2 text-xs text-[var(--text-tertiary)]">Model confidence improving +4.1% MoM</p>
            <div className="mt-5 h-2 rounded-full bg-white/10">
              <div className="h-2 w-[89%] rounded-full bg-[var(--ai-primary)]" />
            </div>
            <div className="mt-4 grid gap-3 text-xs text-[var(--text-tertiary)]">
              <div className="flex items-center justify-between">
                <span>High-complexity predictions</span>
                <span className="text-white">87%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Standard handovers</span>
                <span className="text-white">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Risk alerts accepted</span>
                <span className="text-white">78%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
