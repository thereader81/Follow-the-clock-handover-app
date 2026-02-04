'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

interface DemoVideoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Complete end-to-end demo slides
const demoSlides = [
    {
        id: 'intro',
        title: "Helix",
        subtitle: "AI-Powered Handover Intelligence",
        visual: "intro",
        duration: 5000
    },
    {
        id: 'problem-1',
        title: "The $470 Billion Problem",
        subtitle: "The Hidden Cost of Global Handovers",
        visual: "problem-stats",
        duration: 6000
    },
    {
        id: 'problem-2',
        title: "What Goes Wrong",
        subtitle: "Every Single Day",
        visual: "problem-examples",
        duration: 6000
    },
    {
        id: 'solution',
        title: "Meet Helix",
        subtitle: "Seamless Follow-the-Sun Delivery",
        visual: "solution",
        duration: 5000
    },
    {
        id: 'feature-1',
        title: "Video & Audio Handovers",
        subtitle: "Rich Context, Zero Friction",
        visual: "video-handover",
        duration: 6000
    },
    {
        id: 'feature-2',
        title: "AI Context Preservation",
        subtitle: "Never Lose Critical Information",
        visual: "ai-processing",
        duration: 7000
    },
    {
        id: 'feature-3',
        title: "Global Region Orchestration",
        subtitle: "True 24/7 Coverage",
        visual: "regions",
        duration: 6000
    },
    {
        id: 'feature-4',
        title: "One-Click Integrations",
        subtitle: "JIRA • Slack • Teams • Azure DevOps",
        visual: "integrations",
        duration: 5000
    },
    {
        id: 'workflow',
        title: "The Helix Workflow",
        subtitle: "End-of-Shift to Next-Region Pickup",
        visual: "workflow",
        duration: 8000
    },
    {
        id: 'analytics',
        title: "Handover Analytics",
        subtitle: "Measure. Optimize. Excel.",
        visual: "analytics",
        duration: 5000
    },
    {
        id: 'results',
        title: "The Results",
        subtitle: "What Our Teams Achieve",
        visual: "results",
        duration: 5000
    },
    {
        id: 'cta',
        title: "Ready to Transform Your Handovers?",
        subtitle: "Start Your Free Trial Today",
        visual: "cta",
        duration: 6000
    }
];

export default function DemoVideoModal({ isOpen, onClose }: DemoVideoModalProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isOpen) {
            setCurrentSlide(0);
            setProgress(0);
            setIsPlaying(true);
            return;
        }

        if (!isPlaying) return;

        const slide = demoSlides[currentSlide];
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    if (currentSlide < demoSlides.length - 1) {
                        setCurrentSlide(currentSlide + 1);
                        return 0;
                    } else {
                        setIsPlaying(false);
                        return 100;
                    }
                }
                return prev + (100 / (slide.duration / 50));
            });
        }, 50);

        return () => clearInterval(progressInterval);
    }, [isOpen, isPlaying, currentSlide]);

    if (!isOpen) return null;

    const slide = demoSlides[currentSlide];

    const goNext = () => {
        if (currentSlide < demoSlides.length - 1) {
            setCurrentSlide(currentSlide + 1);
            setProgress(0);
        }
    };

    const goPrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
            setProgress(0);
        }
    };

    const renderVisual = () => {
        switch (slide.visual) {
            case 'intro':
                return (
                    <div className="flex flex-col items-center justify-center space-y-6">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-2xl"
                        >
                            <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M2 4h20M2 20h20M4 4c0 8 4 8 8 8s8 0 8-8M4 20c0-8 4-8 8-8s8 0 8 8" />
                            </svg>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex gap-2"
                        >
                            {['🇦🇺', '🇸🇬', '🇮🇳', '🇬🇧', '🇺🇸'].map((flag, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + i * 0.1 }}
                                    className="text-3xl"
                                >
                                    {flag}
                                </motion.span>
                            ))}
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="text-gray-400 text-lg"
                        >
                            Follow-the-Sun Orchestrator
                        </motion.p>
                    </div>
                );

            case 'problem-stats':
                return (
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { value: '$470B', label: 'Lost annually to handover failures', color: 'text-red-500' },
                            { value: '40%', label: 'Context lost in traditional handovers', color: 'text-orange-500' },
                            { value: '3.2hrs', label: 'Wasted per handover on ramp-up', color: 'text-amber-500' },
                            { value: '67%', label: 'Teams report handover frustration', color: 'text-yellow-500' }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.3 }}
                                className="text-center p-4 rounded-xl bg-gray-800/50 backdrop-blur"
                            >
                                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                                <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                );

            case 'problem-examples':
                return (
                    <div className="space-y-4">
                        {[
                            { icon: '💬', text: '"I spent 2 hours reading through Slack to understand what happened"', delay: 0 },
                            { icon: '⚠️', text: '"Critical blocker wasn\'t mentioned in the handover notes"', delay: 0.5 },
                            { icon: '🔄', text: '"We had to redo work because context was lost"', delay: 1 },
                            { icon: '😤', text: '"Nobody knew the status of the deployment"', delay: 1.5 }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: item.delay }}
                                className="flex items-center gap-3 p-3 rounded-lg bg-red-900/20 border border-red-500/30"
                            >
                                <span className="text-xl">{item.icon}</span>
                                <p className="text-sm text-gray-300 italic">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                );

            case 'solution':
                return (
                    <div className="relative">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center justify-center gap-4"
                        >
                            <div className="w-32 h-20 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center border border-gray-600">
                                <span className="text-2xl">🇮🇳</span>
                            </div>
                            <motion.div
                                animate={{ x: [0, 10, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="flex items-center"
                            >
                                <div className="w-16 h-0.5 bg-gradient-to-r from-green-500 to-blue-500" />
                                <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M2 4h20M2 20h20M4 4c0 8 4 8 8 8s8 0 8-8M4 20c0-8 4-8 8-8s8 0 8 8" />
                                </svg>
                                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
                            </motion.div>
                            <div className="w-32 h-20 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center border border-gray-600">
                                <span className="text-2xl">🇬🇧</span>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-6 text-center"
                        >
                            <p className="text-green-400 font-semibold">Seamless Context Transfer</p>
                            <p className="text-sm text-gray-400 mt-1">Zero ramp-up time, full context preserved</p>
                        </motion.div>
                    </div>
                );

            case 'video-handover':
                return (
                    <div className="relative">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-64 h-40 mx-auto rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 overflow-hidden relative"
                        >
                            {/* Video preview mockup */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                            <div className="absolute bottom-2 left-2 right-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="w-3 h-3 rounded-full bg-red-500"
                                    />
                                    <span className="text-xs text-white font-mono">Recording...</span>
                                </div>
                                <div className="h-1 bg-gray-700 rounded">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '60%' }}
                                        transition={{ duration: 3 }}
                                        className="h-full bg-blue-500 rounded"
                                    />
                                </div>
                            </div>
                            <div className="absolute top-3 left-3 text-white text-sm font-medium">
                                End-of-Day Handover
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-4 grid grid-cols-3 gap-2 text-center text-xs"
                        >
                            <div className="p-2 rounded bg-blue-500/20 text-blue-400">🎥 Video</div>
                            <div className="p-2 rounded bg-green-500/20 text-green-400">🎤 Audio</div>
                            <div className="p-2 rounded bg-purple-500/20 text-purple-400">📝 Text</div>
                        </motion.div>
                    </div>
                );

            case 'ai-processing':
                return (
                    <div className="space-y-4">
                        <div className="flex justify-center mb-4">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 rounded-full border-2 border-purple-500 border-t-transparent"
                            />
                        </div>
                        <div className="space-y-2">
                            {[
                                { text: 'Transcribing audio...', delay: 0 },
                                { text: 'Extracting key decisions...', delay: 0.8 },
                                { text: 'Identifying blockers...', delay: 1.6 },
                                { text: 'Generating summary...', delay: 2.4 },
                                { text: 'Linking JIRA tickets...', delay: 3.2 }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: item.delay }}
                                    className="flex items-center gap-3"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: item.delay + 0.3 }}
                                        className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                                    >
                                        <span className="text-white text-xs">✓</span>
                                    </motion.div>
                                    <span className="text-sm text-gray-300">{item.text}</span>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 4 }}
                            className="text-center pt-2"
                        >
                            <span className="text-2xl font-bold text-green-400">94%</span>
                            <span className="text-gray-400 text-sm ml-2">Context Retention</span>
                        </motion.div>
                    </div>
                );

            case 'regions':
                return (
                    <div className="space-y-4">
                        <div className="relative h-24 flex items-center justify-center">
                            {/* Timeline */}
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 via-blue-500 to-purple-500" />
                            {/* Region dots */}
                            {[
                                { emoji: '🇦🇺', name: 'Sydney', pos: '5%', color: 'green' },
                                { emoji: '🇸🇬', name: 'Singapore', pos: '25%', color: 'yellow' },
                                { emoji: '🇮🇳', name: 'Bangalore', pos: '45%', color: 'orange' },
                                { emoji: '🇬🇧', name: 'London', pos: '65%', color: 'blue' },
                                { emoji: '🇺🇸', name: 'NY', pos: '85%', color: 'purple' }
                            ].map((region, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="absolute flex flex-col items-center"
                                    style={{ left: region.pos }}
                                >
                                    <div className={`w-10 h-10 rounded-full bg-${region.color}-500/20 border-2 border-${region.color}-500 flex items-center justify-center`}>
                                        <span className="text-lg">{region.emoji}</span>
                                    </div>
                                    <span className="text-xs text-gray-400 mt-1">{region.name}</span>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="text-center p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-purple-500/10 border border-gray-700"
                        >
                            <p className="text-white font-medium">24/7 Coverage</p>
                            <p className="text-xs text-gray-400">The sun never sets on your project</p>
                        </motion.div>
                    </div>
                );

            case 'integrations':
                return (
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { name: 'JIRA', color: '#0052CC', desc: 'Auto-sync tickets' },
                            { name: 'Slack', color: '#E01E5A', desc: 'Real-time alerts' },
                            { name: 'Teams', color: '#6264A7', desc: 'Video handovers' },
                            { name: 'DevOps', color: '#0078D7', desc: 'Pipeline status' }
                        ].map((tool, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="p-4 rounded-xl border border-gray-700 text-center"
                                style={{ backgroundColor: `${tool.color}15` }}
                            >
                                <p className="font-bold text-lg" style={{ color: tool.color }}>{tool.name}</p>
                                <p className="text-xs text-gray-400 mt-1">{tool.desc}</p>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 + i * 0.2 }}
                                    className="text-green-400 text-xs mt-2"
                                >
                                    ✓ Connected
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                );

            case 'workflow':
                return (
                    <div className="space-y-3">
                        {[
                            { step: 1, title: 'End-of-Shift', desc: 'Record video/audio handover', icon: '🎥' },
                            { step: 2, title: 'AI Processing', desc: 'Context extraction & summary', icon: '🤖' },
                            { step: 3, title: 'Tool Sync', desc: 'JIRA, Slack, Teams updated', icon: '🔄' },
                            { step: 4, title: 'Seamless Pickup', desc: 'Next region starts with context', icon: '✅' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.4 }}
                                className="flex items-center gap-4 p-3 rounded-xl bg-gray-800/50"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                                    {item.step}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-white">{item.title}</p>
                                    <p className="text-xs text-gray-400">{item.desc}</p>
                                </div>
                                <span className="text-2xl">{item.icon}</span>
                            </motion.div>
                        ))}
                    </div>
                );

            case 'analytics':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { label: 'Quality Score', value: '94%', color: 'green' },
                                { label: 'Avg Time', value: '12min', color: 'blue' },
                                { label: 'On-Time', value: '98%', color: 'purple' }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    className={`p-3 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/30 text-center`}
                                >
                                    <p className={`text-xl font-bold text-${stat.color}-400`}>{stat.value}</p>
                                    <p className="text-xs text-gray-400">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30"
                        >
                            <p className="text-sm text-amber-400 font-medium">💡 AI Insight</p>
                            <p className="text-xs text-gray-300 mt-1">London handovers improved 12% this week with video format</p>
                        </motion.div>
                    </div>
                );

            case 'results':
                return (
                    <div className="space-y-4">
                        {[
                            { before: '3.2 hrs wasted', after: '0 hrs wasted', metric: 'Ramp-up Time', color: 'green' },
                            { before: '40% context lost', after: '94% retained', metric: 'Context Preservation', color: 'blue' },
                            { before: 'Frustrated teams', after: 'Happy teams', metric: 'Team Satisfaction', color: 'purple' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.4 }}
                                className="flex items-center gap-4 p-3 rounded-xl bg-gray-800/50"
                            >
                                <div className="flex-1 text-center">
                                    <p className="text-red-400 line-through text-sm">{item.before}</p>
                                </div>
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="text-gray-500"
                                >
                                    →
                                </motion.div>
                                <div className="flex-1 text-center">
                                    <p className={`text-${item.color}-400 font-bold`}>{item.after}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                );

            case 'cta':
                return (
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="text-center space-y-6"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-6xl"
                        >
                            🚀
                        </motion.div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onClose}
                            className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg shadow-lg shadow-purple-500/30"
                        >
                            Start Free Trial →
                        </motion.button>
                        <p className="text-gray-400 text-sm">No credit card required</p>
                    </motion.div>
                );

            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/90 backdrop-blur-md"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50"
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    {/* Video Player Area */}
                    <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-8 relative">
                        {/* Animated background gradient */}
                        <div className="absolute inset-0 opacity-30">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20"
                                animate={{
                                    background: [
                                        'radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
                                        'radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                                        'radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)'
                                    ]
                                }}
                                transition={{ duration: 10, repeat: Infinity }}
                            />
                        </div>

                        {/* Slide content */}
                        <div className="relative z-10 w-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    className="space-y-6"
                                >
                                    {/* Title */}
                                    <div className="text-center">
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="text-purple-400 text-sm font-medium mb-2"
                                        >
                                            {slide.subtitle}
                                        </motion.p>
                                        <motion.h2
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-3xl font-bold text-white"
                                        >
                                            {slide.title}
                                        </motion.h2>
                                    </div>

                                    {/* Visual content */}
                                    <div className="max-w-md mx-auto pt-4">
                                        {renderVisual()}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="p-4 bg-black/50 border-t border-gray-800">
                        {/* Progress bar */}
                        <div className="flex gap-1 mb-4">
                            {demoSlides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setCurrentSlide(i); setProgress(0); setIsPlaying(true); }}
                                    className="flex-1 h-1 rounded-full overflow-hidden bg-gray-700 hover:bg-gray-600 transition-colors"
                                >
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-100"
                                        style={{
                                            width: i < currentSlide ? '100%' : i === currentSlide ? `${progress}%` : '0%'
                                        }}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Control buttons */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={goPrev}
                                    disabled={currentSlide === 0}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5 text-white" />
                                </button>
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                >
                                    {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                                </button>
                                <button
                                    onClick={goNext}
                                    disabled={currentSlide === demoSlides.length - 1}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5 text-white" />
                                </button>
                            </div>
                            <span className="text-sm text-gray-400">
                                {currentSlide + 1} / {demoSlides.length}
                            </span>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm text-white transition-colors"
                            >
                                Skip
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
