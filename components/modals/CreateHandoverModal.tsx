'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Video,
    Mic,
    FileText,
    Send,
    ArrowRight,
    Sparkles,
    Globe,
    Clock,
    Users,
    Paperclip,
    Calendar
} from 'lucide-react';

interface CreateHandoverModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const regions = [
    { id: 'syd', name: 'Sydney', flag: '🇦🇺', color: 'var(--region-sydney)' },
    { id: 'sgp', name: 'Singapore', flag: '🇸🇬', color: 'var(--region-singapore)' },
    { id: 'blr', name: 'Bangalore', flag: '🇮🇳', color: 'var(--region-bangalore)' },
    { id: 'lon', name: 'London', flag: '🇬🇧', color: 'var(--region-london)' },
    { id: 'nyc', name: 'New York', flag: '🇺🇸', color: 'var(--region-newyork)' }
];

export default function CreateHandoverModal({ isOpen, onClose }: CreateHandoverModalProps) {
    const [step, setStep] = useState(1);
    const [handoverType, setHandoverType] = useState<'text' | 'video' | 'audio'>('text');
    const [fromRegion, setFromRegion] = useState('sgp');
    const [toRegion, setToRegion] = useState('blr');
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);

    const handleStartRecording = () => {
        setIsRecording(true);
        // Simulate recording timer
        const interval = setInterval(() => {
            setRecordingTime(prev => {
                if (prev >= 300) { // 5 min max
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 1000);
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        setRecordingTime(0);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSubmit = () => {
        // Demo: just close modal
        onClose();
    };

    if (!isOpen) return null;

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
                    className="relative w-full max-w-2xl glass-panel rounded-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-[var(--border-subtle)]">
                        <div>
                            <h2 className="text-xl font-semibold text-white">Create Handover</h2>
                            <p className="text-sm text-[var(--text-tertiary)] mt-1">
                                Step {step} of 2 • {step === 1 ? 'Select Type' : 'Add Details'}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                        >
                            <X className="w-5 h-5 text-[var(--text-secondary)]" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {step === 1 ? (
                            <div className="space-y-6">
                                {/* Handover Type Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-4">
                                        Select Handover Type
                                    </label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { type: 'text' as const, icon: FileText, label: 'Written', desc: 'Text-based handover document' },
                                            { type: 'video' as const, icon: Video, label: 'Video', desc: 'Record a video summary' },
                                            { type: 'audio' as const, icon: Mic, label: 'Audio', desc: 'Voice memo handover' }
                                        ].map(({ type, icon: Icon, label, desc }) => (
                                            <button
                                                key={type}
                                                onClick={() => setHandoverType(type)}
                                                className={`p-4 rounded-xl border-2 text-left transition-all ${handoverType === type
                                                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10'
                                                        : 'border-[var(--border-subtle)] hover:border-[var(--border-default)]'
                                                    }`}
                                            >
                                                <Icon className={`w-6 h-6 mb-3 ${handoverType === type ? 'text-[var(--accent-primary)]' : 'text-[var(--text-tertiary)]'
                                                    }`} />
                                                <p className="font-medium text-white">{label}</p>
                                                <p className="text-xs text-[var(--text-tertiary)] mt-1">{desc}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Region Selection */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                            From Region
                                        </label>
                                        <select
                                            value={fromRegion}
                                            onChange={(e) => setFromRegion(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-white focus:outline-none focus:border-[var(--accent-primary)]"
                                        >
                                            {regions.map(r => (
                                                <option key={r.id} value={r.id}>{r.flag} {r.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                            To Region
                                        </label>
                                        <select
                                            value={toRegion}
                                            onChange={(e) => setToRegion(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-white focus:outline-none focus:border-[var(--accent-primary)]"
                                        >
                                            {regions.map(r => (
                                                <option key={r.id} value={r.id}>{r.flag} {r.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Video/Audio Recording Interface */}
                                {(handoverType === 'video' || handoverType === 'audio') && (
                                    <div className="relative rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden">
                                        {handoverType === 'video' ? (
                                            <div className="aspect-video bg-black flex items-center justify-center">
                                                {isRecording ? (
                                                    <div className="text-center">
                                                        <div className="w-16 h-16 rounded-full bg-[var(--error)] animate-pulse mx-auto mb-4 flex items-center justify-center">
                                                            <Video className="w-8 h-8 text-white" />
                                                        </div>
                                                        <p className="text-2xl font-mono text-white">{formatTime(recordingTime)}</p>
                                                        <p className="text-sm text-[var(--text-tertiary)] mt-2">Recording...</p>
                                                    </div>
                                                ) : (
                                                    <div className="text-center">
                                                        <Video className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
                                                        <p className="text-[var(--text-secondary)]">Click record to start video handover</p>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="p-8 flex items-center justify-center">
                                                {isRecording ? (
                                                    <div className="text-center">
                                                        <div className="w-20 h-20 rounded-full bg-[var(--error)] animate-pulse mx-auto mb-4 flex items-center justify-center">
                                                            <Mic className="w-10 h-10 text-white" />
                                                        </div>
                                                        <p className="text-3xl font-mono text-white">{formatTime(recordingTime)}</p>
                                                        <div className="flex items-center justify-center gap-1 mt-4">
                                                            {[...Array(20)].map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className="w-1 bg-[var(--accent-primary)] rounded-full animate-pulse"
                                                                    style={{
                                                                        height: Math.random() * 24 + 8,
                                                                        animationDelay: `${i * 50}ms`
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-center">
                                                        <div className="w-20 h-20 rounded-full bg-[var(--bg-hover)] mx-auto mb-4 flex items-center justify-center">
                                                            <Mic className="w-10 h-10 text-[var(--text-muted)]" />
                                                        </div>
                                                        <p className="text-[var(--text-secondary)]">Click record to start audio handover</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Recording Controls */}
                                        <div className="p-4 border-t border-[var(--border-subtle)] flex items-center justify-center gap-4">
                                            {isRecording ? (
                                                <button
                                                    onClick={handleStopRecording}
                                                    className="px-6 py-2 rounded-full bg-[var(--error)] text-white font-medium flex items-center gap-2"
                                                >
                                                    <div className="w-3 h-3 rounded-sm bg-white" />
                                                    Stop Recording
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={handleStartRecording}
                                                    className="px-6 py-2 rounded-full bg-[var(--accent-primary)] text-[var(--bg-base)] font-medium flex items-center gap-2"
                                                >
                                                    <div className="w-3 h-3 rounded-full bg-[var(--error)]" />
                                                    Start Recording
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Text Handover */}
                                {handoverType === 'text' && (
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                            Handover Summary
                                        </label>
                                        <textarea
                                            rows={6}
                                            placeholder="Describe the current status, blockers, and next steps..."
                                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] resize-none"
                                        />
                                    </div>
                                )}

                                {/* AI Enhancement Option */}
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--ai-glow)] border border-[var(--ai-primary)]/30">
                                    <Sparkles className="w-5 h-5 text-[var(--ai-primary)]" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-white">AI Enhancement</p>
                                        <p className="text-xs text-[var(--text-tertiary)]">Auto-generate structured summary and action items</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-[var(--bg-surface)] rounded-full peer peer-checked:bg-[var(--ai-primary)] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                                    </label>
                                </div>

                                {/* Attachments */}
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                        Attachments
                                    </label>
                                    <button className="w-full p-4 rounded-xl border border-dashed border-[var(--border-default)] hover:border-[var(--accent-primary)] transition-colors flex items-center justify-center gap-2 text-[var(--text-secondary)]">
                                        <Paperclip className="w-4 h-4" />
                                        Add files, screenshots, or links
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between p-6 border-t border-[var(--border-subtle)]">
                        {step === 1 ? (
                            <>
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 rounded-xl text-[var(--text-secondary)] hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setStep(2)}
                                    className="px-6 py-2 rounded-xl bg-[var(--accent-primary)] text-[var(--bg-base)] font-medium flex items-center gap-2"
                                >
                                    Continue
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-6 py-2 rounded-xl text-[var(--text-secondary)] hover:text-white transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="px-6 py-2 rounded-xl bg-[var(--accent-primary)] text-[var(--bg-base)] font-medium flex items-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    Create Handover
                                </button>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
