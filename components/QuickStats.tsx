import { quickStats } from "@/lib/data";

const stats = [
  { label: "Active Handovers", value: quickStats.activeHandovers },
  { label: "Pending Acknowledgment", value: quickStats.pendingAcknowledgment },
  { label: "Completed Today", value: quickStats.completedToday },
  { label: "Items In Transit", value: quickStats.totalItemsInTransit },
  { label: "Blocked Items", value: quickStats.blockedItems },
  { label: "Next 2 Hours", value: quickStats.upcomingIn2Hours }
];

export default function QuickStats() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{stat.label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
