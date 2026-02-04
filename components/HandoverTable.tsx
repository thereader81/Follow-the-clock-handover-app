"use client";

import { useMemo, useState } from "react";
import {
  handovers,
  handoverSummaries,
  qualityScores,
  regions
} from "@/lib/data";
import {
  getRegionById,
  statusLabels,
  statusTone,
  formatDateTime,
  getProgressPercent,
  complexityTone
} from "@/lib/utils";
import { ChevronDown, X, Sparkles, Clock, ShieldCheck } from "lucide-react";

const statusOptions = ["All", "Active", "Completed", "Pending", "Draft"];
const aiOptions = ["All", "AI-Generated", "Manual"];

export default function HandoverTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");
  const [aiFilter, setAiFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [selected, setSelected] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("AI Summary");

  const filteredHandovers = useMemo(() => {
    return handovers.filter((handover: any) => {
      const matchesSearch =
        handover.displayId.toLowerCase().includes(search.toLowerCase()) ||
        handover.project?.toLowerCase().includes(search.toLowerCase()) ||
        getRegionById(handover.fromRegion)?.city.toLowerCase().includes(search.toLowerCase()) ||
        getRegionById(handover.toRegion)?.city.toLowerCase().includes(search.toLowerCase());

      const statusLabel = statusLabels[handover.status];
      const matchesStatus = statusFilter === "All" || statusLabel === statusFilter;
      const matchesRegion =
        regionFilter === "All" ||
        getRegionById(handover.fromRegion)?.name === regionFilter ||
        getRegionById(handover.toRegion)?.name === regionFilter;
      const matchesAi =
        aiFilter === "All" ||
        (aiFilter === "AI-Generated" && handover.hasAiSummary) ||
        (aiFilter === "Manual" && !handover.hasAiSummary);

      let matchesDate = true;
      if (dateFilter !== "All Time") {
        const created = new Date(handover.createdAt);
        const now = new Date();
        const p = 24 * 60 * 60 * 1000; // milliseconds in a day

        if (dateFilter === "Today") {
          matchesDate = created.toDateString() === now.toDateString();
        } else if (dateFilter === "Yesterday") {
          const yesterday = new Date(now.getTime() - p);
          matchesDate = created.toDateString() === yesterday.toDateString();
        } else if (dateFilter === "Last 7 Days") {
          const sevenDaysAgo = new Date(now.getTime() - (7 * p));
          matchesDate = created >= sevenDaysAgo;
        } else if (dateFilter === "Last 30 Days") {
          const thirtyDaysAgo = new Date(now.getTime() - (30 * p));
          matchesDate = created >= thirtyDaysAgo;
        }
      }

      return matchesSearch && matchesStatus && matchesRegion && matchesAi && matchesDate;
    });
  }, [search, statusFilter, regionFilter, aiFilter, dateFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by ID, project, or keyword..."
          className="w-full rounded-xl border border-white/10 bg-[rgba(12,12,14,0.6)] px-4 py-2 text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-secondary)] sm:w-64"
        />
        <FilterSelect label="Region" value={regionFilter} onChange={setRegionFilter} options={["All", ...regions.map((region: any) => region.name)]} />
        <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter} options={statusOptions} />
        <FilterSelect label="AI" value={aiFilter} onChange={setAiFilter} options={aiOptions} />
        <FilterSelect
          label="Date Range"
          value={dateFilter}
          onChange={setDateFilter}
          options={["All Time", "Today", "Yesterday", "Last 7 Days", "Last 30 Days"]}
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.02)]">
        <table className="w-full text-left text-xs text-[var(--text-tertiary)]">
          <thead className="bg-[rgba(12,12,14,0.8)]">
            <tr>
              {[
                "ID",
                "Project",
                "Route",
                "Created",
                "Status",
                "Items",
                "Complexity",
                "Progress",
                "Quality",
                "Actions"
              ].map((label) => (
                <th key={label} className="px-4 py-3 font-semibold uppercase tracking-[0.2em]">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredHandovers.map((handover: any) => {
              const from = getRegionById(handover.fromRegion);
              const to = getRegionById(handover.toRegion);
              const progress = getProgressPercent(handover.completedItems, handover.itemCount);
              return (
                <tr key={handover.id} className="border-t border-white/5 text-sm text-white">
                  <td className="px-4 py-3 text-xs text-[var(--text-tertiary)]">{handover.displayId}</td>
                  <td className="px-4 py-3 font-medium text-white">{handover.project || "Unknown"}</td>
                  <td className="px-4 py-3">{from?.city} → {to?.city}</td>
                  <td className="px-4 py-3 text-xs text-[var(--text-tertiary)]">{formatDateTime(handover.createdAt, "UTC")}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${statusTone[handover.status]}`}>{statusLabels[handover.status]}</span>
                  </td>
                  <td className="px-4 py-3 text-center">{handover.itemCount}</td>
                  <td className={`px-4 py-3 font-semibold ${complexityTone(handover.complexityScore)}`}>
                    {handover.complexityScore ?? "--"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-2 w-24 rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-[var(--accent-secondary)]" style={{ width: `${progress}%` }} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">{handover.qualityScore ?? "--"}%</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setSelected(handover);
                        setActiveTab("AI Summary");
                      }}
                      className="rounded-lg border border-white/10 px-3 py-1 text-xs text-white hover:bg-white/5"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected ? (
        <HandoverDetailModal
          handover={selected}
          activeTab={activeTab}
          onClose={() => setSelected(null)}
          onTabChange={setActiveTab}
        />
      ) : null}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <label className="block text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-1 w-40 appearance-none rounded-xl border border-white/10 bg-[rgba(12,12,14,0.6)] px-4 py-2 text-xs text-white"
        >
          {options.map((option) => (
            <option key={option} value={option} className="bg-[#0c0c0e]">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-[var(--text-tertiary)]" />
      </div>
    </div>
  );
}

function HandoverDetailModal({
  handover,
  activeTab,
  onClose,
  onTabChange
}: {
  handover: any;
  activeTab: string;
  onClose: () => void;
  onTabChange: (tab: string) => void;
}) {
  const summary = handoverSummaries[handover.displayId];
  const quality = qualityScores[handover.displayId];
  const tabs = ["AI Summary", "Work Items", "Timeline", "Audit Trail"];
  const from = getRegionById(handover.fromRegion);
  const to = getRegionById(handover.toRegion);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div className="max-h-[80vh] w-full max-w-5xl overflow-x-auto rounded-2xl border border-white/10 bg-[rgba(12,12,14,0.95)] shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <div className="flex items-center gap-3">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">{handover.displayId}</p>
              {handover.project && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-gray-300 border border-white/5">
                  {handover.project}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-white">{from?.city} → {to?.city}</h3>
          </div>
          <button onClick={onClose} className="rounded-full border border-white/10 p-2 text-white hover:bg-white/5">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex gap-2 border-b border-white/10 px-6 py-3 text-xs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`rounded-full px-4 py-2 ${activeTab === tab ? "bg-white/10 text-white" : "text-[var(--text-tertiary)]"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-6 text-sm text-[var(--text-secondary)]">
          {activeTab === "AI Summary" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-purple-500/20 bg-[rgba(35,25,50,0.6)] p-5">
                <div className="flex items-center gap-2 text-xs text-[var(--ai-primary)]">
                  <Sparkles className="h-4 w-4" />
                  AI TL;DR
                </div>
                <p className="mt-3 text-white">{summary?.tldr ?? "AI summary pending for this handover."}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Critical Decisions</p>
                <div className="mt-3 space-y-3">
                  {(summary?.criticalDecisions ?? []).map((decision: any) => (
                    <div key={decision.id} className="rounded-xl border border-white/10 bg-[rgba(12,12,14,0.7)] p-4">
                      <p className="font-semibold text-white">{decision.title}</p>
                      <p className="mt-2 text-xs">{decision.context}</p>
                      <p className="mt-2 text-xs text-[var(--accent-primary)]">Recommendation: {decision.recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Risks</p>
                <div className="mt-3 space-y-3">
                  {(summary?.risks ?? []).map((risk: any) => (
                    <div key={risk.id} className="rounded-xl border border-white/10 bg-[rgba(12,12,14,0.7)] p-4">
                      <p className="font-semibold text-white">{risk.title}</p>
                      <p className="mt-2 text-xs">{risk.description}</p>
                      <p className="mt-2 text-xs text-[var(--warning)]">Mitigation: {risk.mitigation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Work Items" && (
            <div className="space-y-4">
              {(summary?.workItemsSummary?.items ?? []).map((item: any) => (
                <div key={item.id} className="rounded-xl border border-white/10 bg-[rgba(12,12,14,0.7)] p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-white">{item.id} - {item.title}</p>
                    <span className="badge badge-info">{item.status}</span>
                  </div>
                  <p className="mt-2 text-xs">{item.aiContext}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Timeline" && (
            <div className="space-y-4">
              {(summary?.timeline ?? []).map((event: any) => (
                <div key={event.timestamp} className="flex items-start gap-3 rounded-xl border border-white/10 bg-[rgba(12,12,14,0.7)] p-4">
                  <Clock className="mt-1 h-4 w-4 text-[var(--accent-secondary)]" />
                  <div>
                    <p className="text-white">{event.event}</p>
                    <p className="mt-1 text-xs text-[var(--text-tertiary)]">{formatDateTime(event.timestamp, "UTC")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Audit Trail" && (
            <div className="space-y-4">
              {quality ? (
                <div className="rounded-2xl border border-white/10 bg-[rgba(12,12,14,0.7)] p-5">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-[var(--success)]" />
                    <div>
                      <p className="text-sm font-semibold text-white">Quality Score {quality.overallScore}%</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{quality.comparedToAverage}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {Object.values(quality.dimensions).map((dimension: any) => (
                      <div key={dimension.details} className="rounded-xl border border-white/10 p-3">
                        <p className="text-xs text-[var(--text-tertiary)]">{dimension.details}</p>
                        <p className="mt-2 text-sm font-semibold text-white">Score {dimension.score}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-white/10 bg-[rgba(12,12,14,0.7)] p-4 text-xs">
                  Audit trail data pending for this handover.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
