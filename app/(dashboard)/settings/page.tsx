import PageHeader from "@/components/PageHeader";
import { currentUser, regions } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";

const integrations = [
  { name: "JIRA Cloud", status: "Connected" },
  { name: "Azure DevOps", status: "Connected" },
  { name: "Slack", status: "Connected" },
  { name: "Microsoft Teams", status: "Pending" }
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings & Configuration"
        subtitle="Manage your profile, AI preferences, and integration readiness for global handovers." 
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[rgba(12,12,14,0.7)] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Profile</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(61,155,155,0.2)] text-lg font-semibold text-white">
              {currentUser.name.split(" ").map((part: string) => part[0]).join("")}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{currentUser.name}</p>
              <p className="text-xs text-[var(--text-tertiary)]">{currentUser.role}</p>
              <p className="text-xs text-[var(--text-tertiary)]">{currentUser.email}</p>
            </div>
          </div>
          <div className="mt-4 text-xs text-[var(--text-tertiary)]">Timezone: {currentUser.timezone}</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[rgba(12,12,14,0.7)] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">AI Settings</p>
          <div className="mt-5 space-y-4">
            {[
              { label: "Summary verbosity", value: "Executive" },
              { label: "Prediction threshold", value: "High sensitivity" },
              { label: "Auto escalation", value: "Enabled" }
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3">
                <div>
                  <p className="text-sm text-white">{item.label}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">{item.value}</p>
                </div>
                <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--text-secondary)]">Edit</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[rgba(12,12,14,0.7)] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Regional Config</p>
          <div className="mt-5 space-y-3">
            {regions.map((region: any) => (
              <div key={region.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-[rgba(12,12,14,0.6)] px-4 py-3">
                <div>
                  <p className="text-sm text-white">{region.flag} {region.city}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">Workday {region.workStart}-{region.workEnd}</p>
                </div>
                <span className="badge badge-info">Read-only</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[rgba(12,12,14,0.7)] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Integrations</p>
          <div className="mt-5 space-y-3">
            {integrations.map((integration) => (
              <div key={integration.name} className="flex items-center justify-between rounded-xl border border-white/10 bg-[rgba(12,12,14,0.6)] px-4 py-3">
                <p className="text-sm text-white">{integration.name}</p>
                <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
                  <CheckCircle2 className="h-4 w-4 text-[var(--success)]" />
                  {integration.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[rgba(12,12,14,0.7)] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">About</p>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          Follow-the-Sun Orchestrator - v2.0 Enhanced demo build. Designed for executive storytelling, AI-powered handover intelligence, and global delivery excellence.
        </p>
      </div>
    </div>
  );
}
