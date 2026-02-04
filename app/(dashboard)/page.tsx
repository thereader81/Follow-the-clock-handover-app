'use client';

import { useState } from 'react';
import PageHeader from "@/components/PageHeader";
import RegionStatusBar from "@/components/RegionStatusBar";
import AIAlertsPanel from "@/components/AIAlertsPanel";
import ActiveHandovers from "@/components/ActiveHandovers";
import UpcomingTransitions from "@/components/UpcomingTransitions";
import QuickStats from "@/components/QuickStats";
import CreateHandoverModal from "@/components/modals/CreateHandoverModal";
import HandoverDetailModal from "@/components/modals/HandoverDetailModal";
import { useAuth } from "@/lib/auth-context";
import { Plus, Sparkles, History, ArrowUpRight, Video, Mic } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedHandover, setSelectedHandover] = useState<any>(null);

  const handleHandoverClick = (handover: any) => {
    setSelectedHandover(handover);
    setShowDetailModal(true);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Global Delivery Command Center"
        subtitle={`${getGreeting()}, ${user?.name?.split(" ")[0] || 'there'}. Track live handovers, anticipate friction, and keep every region in sync.`}
        actions={
          <button
            onClick={() => setShowCreateModal(true)}
            className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Handover
          </button>
        }
      />

      <RegionStatusBar />

      <QuickStats />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Active Handovers</h2>
              <button className="text-xs font-semibold text-gray-400 hover:text-white transition-colors">View All</button>
            </div>
            <ActiveHandovers onHandoverClick={handleHandoverClick} />
          </section>

          <UpcomingTransitions />
        </div>

        <div className="space-y-6">
          <AIAlertsPanel />

          <div className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Quick Actions</p>
            <div className="mt-4 grid gap-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center justify-between rounded-xl bg-black/50 px-4 py-3 text-sm font-semibold text-white hover:bg-black/70 transition-colors"
              >
                <span className="flex items-center gap-2"><Plus className="h-4 w-4" />New Handover</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-between rounded-xl bg-black/30 px-4 py-3 text-sm font-semibold text-white hover:bg-black/50 transition-colors">
                <span className="flex items-center gap-2"><Video className="h-4 w-4 text-blue-400" />Video Handover</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-between rounded-xl bg-black/30 px-4 py-3 text-sm font-semibold text-white hover:bg-black/50 transition-colors">
                <span className="flex items-center gap-2"><Mic className="h-4 w-4 text-green-400" />Audio Handover</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-400 hover:bg-white/5 transition-colors">
                <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-purple-400" />Run AI Summary</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-400 hover:bg-white/5 transition-colors">
                <span className="flex items-center gap-2"><History className="h-4 w-4" />View History</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateHandoverModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
      <HandoverDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        handover={selectedHandover}
      />
    </div>
  );
}
