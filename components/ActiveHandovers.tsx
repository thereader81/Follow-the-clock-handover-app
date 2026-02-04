'use client';

import { handovers } from "@/lib/data";
import {
  getRegionById,
  getUserById,
  getProgressPercent,
  statusLabels,
  statusTone,
  complexityTone
} from "@/lib/utils";
import { ArrowRight, Sparkles, Video } from "lucide-react";
import { motion } from "framer-motion";

interface ActiveHandoversProps {
  onHandoverClick?: (handover: any) => void;
}

export default function ActiveHandovers({ onHandoverClick }: ActiveHandoversProps) {
  const active = handovers.filter((handover: any) => ["ACTIVE", "PENDING_ACKNOWLEDGMENT"].includes(handover.status));

  return (
    <div className="space-y-4">
      {active.map((handover: any, index: number) => {
        const from = getRegionById(handover.fromRegion);
        const to = getRegionById(handover.toRegion);
        const createdBy = getUserById(handover.createdBy);
        const receivedBy = getUserById(handover.receivedBy);
        const progress = getProgressPercent(handover.completedItems, handover.itemCount);
        const statusClass = statusTone[handover.status] ?? "badge";

        return (
          <motion.div
            key={handover.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onHandoverClick?.({
              id: handover.displayId,
              from: from?.city,
              to: to?.city,
              status: handover.status,
              progress,
              createdBy: createdBy?.name
            })}
            className="card-gradient-teal rounded-2xl border border-white/10 p-5 shadow-[0_12px_28px_rgba(0,0,0,0.35)] cursor-pointer hover:border-white/20 transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{handover.displayId}</p>
                <h3 className="text-lg font-semibold text-white">
                  {from?.city} <ArrowRight className="inline h-4 w-4 text-[var(--text-tertiary)]" /> {to?.city}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Video className="w-3 h-3 text-blue-400" />
                </div>
                <div className={`badge ${statusClass}`}>{statusLabels[handover.status]}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-[var(--text-tertiary)]">
              <div>
                <p>Created by</p>
                <p className="text-sm text-white">{createdBy?.name}</p>
              </div>
              <div>
                <p>Receiving</p>
                <p className="text-sm text-white">{receivedBy?.name}</p>
              </div>
              <div>
                <p>Items</p>
                <p className="text-sm text-white">{handover.completedItems}/{handover.itemCount}</p>
              </div>
              <div>
                <p>Complexity</p>
                <p className={`text-sm font-semibold ${complexityTone(handover.complexityScore)}`}>{handover.complexityScore ?? "--"}</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
                <span>Progress</span>
                <span className="text-[var(--accent-primary)] font-mono">{progress}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-2 rounded-full bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-tertiary)]">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                <span>AI summary ready</span>
              </div>
              <span className="text-xs font-semibold text-[var(--accent-primary)]">View Details →</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
