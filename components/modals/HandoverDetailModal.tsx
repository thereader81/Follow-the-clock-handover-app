'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Video,
    Play,
    Sparkles,
    Clock,
    User,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    MessageSquare,
    FileText,
    ExternalLink
} from 'lucide-react';

interface HandoverDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    handover?: {
        id: string;
        from: string;
        to: string;
        status: string;
        progress: number;
        createdBy: string;
        summary?: string;
    };
}

// Mock AI Summary data
const mockAISummary = {
    tldr: "Production deployment completed successfully. Two authentication edge cases identified and documented for next region. Performance optimization task 60% complete—recommend prioritizing before US business hours.",
    decisions: [
        { title: "OAuth Token Refresh Strategy", status: "Approved", description: "Implemented sliding window approach for session management" },
        { title: "Database Migration Timing", status: "Pending", description: "Scheduled for next maintenance window" }
    ],
    workItems: [
        { id: "JIRA-1234", title: "Fix OAuth token refresh loop", status: "In Progress", priority: "High" },
        { id: "JIRA-1235", title: "Update API documentation", status: "Done", priority: "Medium" },
        { id: "JIRA-1236", title: "Performance optimization for dashboard", status: "In Progress", priority: "High" }
    ],
    risks: [
        { level: "Medium", title: "Memory leak in WebSocket handler", mitigation: "Monitoring added, fix scheduled for next sprint" }
    ],
    confidence: 94
};

export default function HandoverDetailModal({ isOpen, onClose, handover }: HandoverDetailModalProps) {
    if (!isOpen || !handover) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl"
                >
                    {/* Header */}
                    <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]/95 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{handover.from === 'Singapore' ? '🇸🇬' : '🇺🇸'}</span>
                                <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
                                <span className="text-2xl">{handover.to === 'Sydney' ? '🇦🇺' : '🇮🇳'}</span>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white">{handover.from} → {handover.to}</h2>
                                <p className="text-sm text-[var(--text-tertiary)]">Handover #{handover.id}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                        >
                            <X className="w-5 h-5 text-[var(--text-secondary)]" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Progress Bar */}
                        <div className="glass-panel rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-white">Handover Progress</span>
                                <span className="text-sm font-mono text-[var(--accent-primary)]">{handover.progress}%</span>
                            </div>
                            <div className="h-2 bg-[var(--bg-surface)] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${handover.progress}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="h-full bg-[var(--accent-primary)] rounded-full"
                                />
                            </div>
                            <div className="flex items-center justify-between mt-3 text-xs text-[var(--text-tertiary)]">
                                <span>Started 2h ago</span>
                                <span>Est. completion: 45 min</span>
                            </div>
                        </div>

                        {/* Video Recording */}
                        <div className="glass-panel rounded-xl overflow-hidden">
                            <div className="aspect-video bg-black relative flex items-center justify-center group cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="relative z-10 text-center">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                                        <Play className="w-8 h-8 text-white ml-1" />
                                    </div>
                                    <p className="text-white font-medium">Video Handover Summary</p>
                                    <p className="text-sm text-white/60 mt-1">3:24 duration</p>
                                </div>
                                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                    <Video className="w-4 h-4 text-[var(--accent-primary)]" />
                                    <span className="text-sm text-white">{handover.createdBy}</span>
                                </div>
                            </div>
                        </div>

                        {/* AI Summary */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-[var(--ai-primary)]" />
                                    <h3 className="text-lg font-semibold text-white">AI Summary</h3>
                                </div>
                                <div className="badge badge-ai">
                                    {mockAISummary.confidence}% confidence
                                </div>
                            </div>

                            {/* TL;DR */}
                            <div className="p-4 rounded-xl bg-gradient-to-r from-[var(--ai-primary)]/10 to-transparent border-l-2 border-[var(--ai-primary)]">
                                <p className="text-sm font-medium text-[var(--ai-primary)] mb-2">TL;DR</p>
                                <p className="text-[var(--text-secondary)]">{mockAISummary.tldr}</p>
                            </div>

                            {/* Decisions */}
                            <div className="glass-panel rounded-xl p-4">
                                <h4 className="text-sm font-medium text-white mb-3">Key Decisions</h4>
                                <div className="space-y-3">
                                    {mockAISummary.decisions.map((decision, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            {decision.status === 'Approved' ? (
                                                <CheckCircle2 className="w-5 h-5 text-[var(--success)] flex-shrink-0 mt-0.5" />
                                            ) : (
                                                <AlertCircle className="w-5 h-5 text-[var(--warning)] flex-shrink-0 mt-0.5" />
                                            )}
                                            <div>
                                                <p className="text-sm font-medium text-white">{decision.title}</p>
                                                <p className="text-xs text-[var(--text-tertiary)]">{decision.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Work Items */}
                            <div className="glass-panel rounded-xl p-4">
                                <h4 className="text-sm font-medium text-white mb-3">Work Items</h4>
                                <div className="space-y-2">
                                    {mockAISummary.workItems.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-mono text-[var(--accent-primary)]">{item.id}</span>
                                                <span className="text-sm text-white">{item.title}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`badge ${item.status === 'Done' ? 'badge-success' :
                                                        item.priority === 'High' ? 'badge-warning' : 'badge-info'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                                <ExternalLink className="w-4 h-4 text-[var(--text-muted)]" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Risks */}
                            {mockAISummary.risks.length > 0 && (
                                <div className="glass-panel rounded-xl p-4 border border-[var(--warning)]/30">
                                    <h4 className="text-sm font-medium text-[var(--warning)] mb-3">⚠️ Risk Alerts</h4>
                                    {mockAISummary.risks.map((risk, i) => (
                                        <div key={i}>
                                            <p className="text-sm text-white">{risk.title}</p>
                                            <p className="text-xs text-[var(--text-tertiary)] mt-1">Mitigation: {risk.mitigation}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Comments */}
                        <div className="glass-panel rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <MessageSquare className="w-4 h-4 text-[var(--text-tertiary)]" />
                                <h4 className="text-sm font-medium text-white">Comments (3)</h4>
                            </div>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    className="flex-1 px-4 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
                                />
                                <button className="px-4 py-2 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-base)] font-medium">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
