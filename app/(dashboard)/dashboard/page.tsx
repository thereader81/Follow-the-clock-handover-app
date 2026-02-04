'use client';

import { useAuth } from "@/lib/auth-context";
import PageHeader from "@/components/PageHeader";
import { handovers } from "@/lib/data";
import {
    Activity,
    CheckCircle2,
    AlertTriangle,
    TrendingUp,
    Clock,
    ArrowRight,
    MapPin,
    MoreHorizontal
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardPage() {
    const { user } = useAuth();

    // Calculate metrics based on data
    const activeData = handovers.filter((h: any) => ['ACTIVE', 'PENDING_ACKNOWLEDGMENT'].includes(h.status));
    const activeCount = activeData.length;

    const completedCount = handovers.filter((h: any) => h.status === 'COMPLETED').length;

    // Completion rate ignoring drafts
    const nonDraftTotal = handovers.filter((h: any) => h.status !== 'DRAFT').length;
    const completionRate = nonDraftTotal > 0 ? Math.round((completedCount / nonDraftTotal) * 100) : 0;

    // Quality Score (only for items with a score)
    const scoredHandovers = handovers.filter((h: any) => h.qualityScore != null);
    const avgQuality = scoredHandovers.length > 0
        ? Math.round(scoredHandovers.reduce((acc: number, h: any) => acc + h.qualityScore, 0) / scoredHandovers.length)
        : 0;

    // Pending Actions (Pending Ack)
    const pendingCount = handovers.filter((h: any) => h.status === 'PENDING_ACKNOWLEDGMENT').length;

    // Mock "My Queue" data (items assigned to user)
    const myQueue = [
        { id: 'TASK-882', title: 'Review Payment API Handover', priority: 'High', due: '2h', region: 'London', project: 'Phoenix' },
        { id: 'TASK-901', title: 'Approve Deployment to Staging', priority: 'Medium', due: '4h', region: 'Singapore', project: 'Nexus' },
        { id: 'TASK-915', title: 'Q3 Handover Strategy Sync', priority: 'Low', due: 'Tomorrow', region: 'New York', project: 'General' },
    ];

    return (
        <div className="space-y-8 max-w-7xl">
            <PageHeader
                title="Command Center"
                subtitle={`Welcome back, ${user?.name || 'Team Lead'}. Here is your global delivery pulse.`}
            />

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    label="Active & Pending"
                    value={activeCount}
                    trend="Requires attention"
                    icon={Activity}
                    color="text-blue-500"
                    bgColor="bg-blue-500/10"
                />
                <MetricCard
                    label="Completion Rate"
                    value={`${completionRate}%`}
                    trend="Daily target met"
                    icon={CheckCircle2}
                    color="text-green-500"
                    bgColor="bg-green-500/10"
                />
                <MetricCard
                    label="Pending Actions"
                    value={pendingCount}
                    trend="1 critical"
                    icon={AlertTriangle}
                    color="text-amber-500"
                    bgColor="bg-amber-500/10"
                />
                <MetricCard
                    label="Avg Quality Score"
                    value={`${avgQuality}%`}
                    trend={avgQuality > 90 ? "Excellent" : "Good"}
                    icon={TrendingUp}
                    color="text-purple-500"
                    bgColor="bg-purple-500/10"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Column: My Queue & Recent Activity */}
                <div className="lg:col-span-2 space-y-8">

                    {/* My Queue Section */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">My Queue</h3>
                            <button className="text-xs text-gray-400 hover:text-white transition-colors">View All</button>
                        </div>
                        <div className="space-y-3">
                            {myQueue.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-4 rounded-xl border border-white/10 bg-[#0c0c0e] hover:bg-white/5 transition-colors group cursor-pointer"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-2 h-2 rounded-full ${item.priority === 'High' ? 'bg-red-500' : item.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                                            <div>
                                                <p className="font-medium text-white text-sm">{item.title}</p>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <span>{item.project}</span>
                                                    <span>•</span>
                                                    <span>{item.id}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {item.due}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Recent Handovers Section */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Recent Handovers</h3>
                            <Link href="/handovers" className="text-xs text-brand-primary hover:text-white transition-colors">
                                View Full Board
                            </Link>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-[rgba(12,12,14,0.5)] overflow-hidden">
                            <div className="grid grid-cols-1 divide-y divide-white/5">
                                {handovers.slice(0, 4).map((h: any, i: number) => (
                                    <div key={h.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-gray-400">
                                                {h.fromRegion.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-medium text-white">{h.displayId}</p>
                                                    {h.project && (
                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/5">
                                                            {h.project}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    {h.fromRegion.charAt(0).toUpperCase() + h.fromRegion.slice(1)} → {h.toRegion.charAt(0).toUpperCase() + h.toRegion.slice(1)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right hidden sm:block">
                                                <p className="text-xs text-gray-400">Items</p>
                                                <p className="text-sm font-medium text-white">{h.itemCount}</p>
                                            </div>
                                            <div className="text-right hidden sm:block">
                                                <p className="text-xs text-gray-400">Quality</p>
                                                <p className={`text-sm font-medium ${h.qualityScore && h.qualityScore > 90 ? 'text-green-500' : 'text-amber-500'}`}>
                                                    {h.qualityScore}%
                                                </p>
                                            </div>
                                            <Link href={`/handovers?id=${h.id}`} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                </div>

                {/* Sidebar Column: Global Pulse */}
                <div className="space-y-8">
                    <section>
                        <h3 className="text-lg font-semibold text-white mb-4">Global Pulse</h3>
                        <div className="rounded-2xl border border-white/10 bg-[#0c0c0e] p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <span className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-green-500">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    Live
                                </span>
                            </div>

                            <div className="mt-4 space-y-6">
                                <div className="text-center py-8">
                                    <div className="inline-block p-4 rounded-full bg-blue-500/10 text-blue-500 mb-3">
                                        <MapPin className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white">London</h4>
                                    <p className="text-sm text-gray-400">Current Active Region</p>
                                    <p className="text-xs text-gray-500 mt-1">10:30 AM GMT</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-white/5">
                                    <RegionRow name="Sydney" time="08:30 PM" status="Offline" />
                                    <RegionRow name="Singapore" time="05:30 PM" status="Wrapping Up" color="text-amber-500" />
                                    <RegionRow name="Bangalore" time="03:00 PM" status="Active" color="text-green-500" />
                                    <RegionRow name="London" time="10:30 AM" status="Peak" color="text-blue-500" />
                                    <RegionRow name="New York" time="05:30 AM" status="Incoming" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-4">Team Health</h3>
                        <div className="p-4 rounded-2xl border border-white/10 bg-[#0c0c0e]">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-gray-400">Velocity</span>
                                <span className="text-sm font-semibold text-green-500">+12%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full mb-6">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: '78%' }}></div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-gray-400">On-Time Delivery</span>
                                <span className="text-sm font-semibold text-white">96%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full mb-6">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: '96%' }}></div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-gray-400">Context Loss</span>
                                <span className="text-sm font-semibold text-green-500">Low (2%)</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full">
                                <div className="h-full bg-purple-500 rounded-full" style={{ width: '98%' }}></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ label, value, trend, icon: Icon, color, bgColor }: any) {
    return (
        <div className="p-6 rounded-2xl border border-white/10 bg-[rgba(12,12,14,0.5)] flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-400">{label}</p>
                <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
                <p className="text-xs text-green-500 mt-1 font-medium">{trend}</p>
            </div>
            <div className={`p-3 rounded-xl ${bgColor} ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
        </div>
    );
}

function RegionRow({ name, time, status, color = "text-gray-500" }: any) {
    return (
        <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">{name}</span>
            <div className={`flex items-center gap-3 ${color}`}>
                <span className="text-xs font-medium">{status}</span>
                <span className="text-xs text-gray-600 font-mono">{time}</span>
            </div>
        </div>
    );
}
