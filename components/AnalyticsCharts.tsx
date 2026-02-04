"use client";

import { kpiData } from "@/lib/data";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar
} from "recharts";

export default function AnalyticsCharts() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-[rgba(12,12,14,0.7)] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Efficiency Trend</p>
        <h3 className="mt-2 text-lg font-semibold text-white">30-Day Handover Efficiency</h3>
        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={kpiData.trends.handoverEfficiency}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <Tooltip contentStyle={{ background: "#141416", border: "1px solid rgba(255,255,255,0.1)" }} />
              <Line type="monotone" dataKey="value" stroke="#3d9b9b" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[rgba(12,12,14,0.7)] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Regional Performance</p>
        <h3 className="mt-2 text-lg font-semibold text-white">Efficiency by Delivery Hub</h3>
        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={kpiData.byRegion} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
              <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.4)" fontSize={12} width={80} />
              <Tooltip contentStyle={{ background: "#141416", border: "1px solid rgba(255,255,255,0.1)" }} />
              <Bar dataKey="efficiency" fill="#d4a853" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
