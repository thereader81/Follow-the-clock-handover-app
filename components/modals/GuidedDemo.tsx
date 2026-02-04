'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    ChevronRight,
    ChevronLeft,
    Play,
    Video,
    Mic,
    Brain,
    Globe,
    BarChart3,
    Check,
    Sparkles,
    Clock,
    Users,
    MessageSquare,
    ArrowRight,
    Zap,
    Mail,
    KeyRound,
    Shield,
    LayoutDashboard
} from 'lucide-react';

interface GuidedDemoProps {
    isOpen: boolean;
    onClose: () => void;
}

// Demo steps simulating an actual business flow
const demoSteps = [
    {
        id: 'welcome',
        title: 'Welcome to Helix',
        description: 'Let\'s walk through a real user journey',
        scene: 'intro'
    },
    {
        id: 'login',
        title: 'Secure Login',
        description: 'Multiple authentication options for enterprise security',
        scene: 'login'
    },
    {
        id: 'dashboard',
        title: 'Your Dashboard',
        description: 'Sarah logs in and sees her personalized command center',
        scene: 'dashboard'
    },
    {
        id: 'scenario',
        title: 'The Scenario',
        description: 'It\'s 5:30 PM in Bangalore. Time to handover to London.',
        scene: 'scenario'
    },
    {
        id: 'create-handover',
        title: 'Creating a Handover',
        description: 'Sarah starts recording her end-of-day handover.',
        scene: 'create'
    },
    {
        id: 'recording',
        title: 'Recording in Progress',
        description: 'She records a 3-minute video explaining today\'s progress.',
        scene: 'recording'
    },
    {
        id: 'ai-processing',
        title: 'AI Processing',
        description: 'Helix AI analyzes the recording in real-time.',
        scene: 'ai'
    },
    {
        id: 'summary',
        title: 'AI-Generated Summary',
        description: 'Within seconds, a structured handover is ready.',
        scene: 'summary'
    },
    {
        id: 'tools-sync',
        title: 'Automatic Tool Sync',
        description: 'JIRA, Slack, and Teams are updated automatically.',
        scene: 'sync'
    },
    {
        id: 'london-pickup',
        title: 'London Team Pickup',
        description: 'James in London receives the handover notification.',
        scene: 'pickup'
    },
    {
        id: 'analytics',
        title: 'Handover Analytics',
        description: 'Track quality and measure improvement over time.',
        scene: 'analytics'
    },
    {
        id: 'complete',
        title: 'Zero Context Loss',
        description: 'The London team starts immediately with full context.',
        scene: 'complete'
    }
];

export default function GuidedDemo({ isOpen, onClose }: GuidedDemoProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [recordingProgress, setRecordingProgress] = useState(0);
    const [aiProgress, setAiProgress] = useState(0);

    useEffect(() => {
        if (!isOpen) {
            setCurrentStep(0);
            setRecordingProgress(0);
            setAiProgress(0);
            setIsAutoPlaying(true);
            return;
        }

        if (!isAutoPlaying) return;

        // Auto-advance timer based on step
        const durations: Record<string, number> = {
            intro: 3500,
            login: 5000,
            dashboard: 5000,
            scenario: 4000,
            create: 4000,
            recording: 5000,
            ai: 5000,
            summary: 4000,
            sync: 4000,
            pickup: 4000,
            analytics: 4000,
            complete: 5000
        };

        const step = demoSteps[currentStep];
        const timer = setTimeout(() => {
            if (currentStep < demoSteps.length - 1) {
                setCurrentStep(currentStep + 1);
                setRecordingProgress(0);
                setAiProgress(0);
            } else {
                setIsAutoPlaying(false);
            }
        }, durations[step.scene] || 4000);

        return () => clearTimeout(timer);
    }, [isOpen, isAutoPlaying, currentStep]);

    // Recording progress simulation
    useEffect(() => {
        if (!isOpen || demoSteps[currentStep]?.scene !== 'recording') return;

        const interval = setInterval(() => {
            setRecordingProgress(prev => Math.min(prev + 2, 100));
        }, 100);

        return () => clearInterval(interval);
    }, [isOpen, currentStep]);

    // AI progress simulation
    useEffect(() => {
        if (!isOpen || demoSteps[currentStep]?.scene !== 'ai') return;

        const interval = setInterval(() => {
            setAiProgress(prev => Math.min(prev + 3, 100));
        }, 100);

        return () => clearInterval(interval);
    }, [isOpen, currentStep]);

    if (!isOpen) return null;

    const step = demoSteps[currentStep];

    const renderScene = () => {
        switch (step.scene) {
            case 'intro':
                return (
                    <div className="flex flex-col items-center justify-center h-full">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", duration: 0.6 }}
                            className="w-24 h-24 rounded-2xl bg-slate-800 flex items-center justify-center mb-6"
                        >
                            <svg viewBox="0 0 24 24" className="w-12 h-12 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M2 4h20M2 20h20M4 4c0 8 4 8 8 8s8 0 8-8M4 20c0-8 4-8 8-8s8 0 8 8" />
                            </svg>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-slate-400 text-lg"
                        >
                            Follow-the-Sun Orchestrator
                        </motion.p>
                    </div>
                );

            case 'login':
                return (
                    <div className="flex flex-col items-center justify-center h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full max-w-sm bg-slate-800 rounded-xl p-6 border border-slate-700"
                        >
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center mx-auto mb-3">
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M2 4h20M2 20h20M4 4c0 8 4 8 8 8s8 0 8-8M4 20c0-8 4-8 8-8s8 0 8 8" />
                                    </svg>
                                </div>
                                <h3 className="text-white font-semibold">Sign in to Helix</h3>
                            </div>

                            <div className="space-y-3">
                                <motion.button
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="w-full p-3 rounded-lg bg-white text-slate-900 font-medium flex items-center justify-center gap-3"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Continue with Google
                                </motion.button>

                                <motion.button
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="w-full p-3 rounded-lg bg-[#2F2F2F] text-white font-medium flex items-center justify-center gap-3"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 23 23" fill="none">
                                        <path fill="#f25022" d="M1 1h10v10H1z" />
                                        <path fill="#00a4ef" d="M1 12h10v10H1z" />
                                        <path fill="#7fba00" d="M12 1h10v10H12z" />
                                        <path fill="#ffb900" d="M12 12h10v10H12z" />
                                    </svg>
                                    Continue with Microsoft
                                </motion.button>

                                <motion.button
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="w-full p-3 rounded-lg bg-slate-700 text-white font-medium flex items-center justify-center gap-3"
                                >
                                    <KeyRound className="w-5 h-5 text-teal-400" />
                                    SSO / SAML
                                </motion.button>

                                <div className="relative my-4">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-600" />
                                    </div>
                                    <div className="relative flex justify-center text-xs">
                                        <span className="px-2 bg-slate-800 text-slate-400">or</span>
                                    </div>
                                </div>

                                <motion.button
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="w-full p-3 rounded-lg border border-slate-600 text-slate-300 font-medium flex items-center justify-center gap-3"
                                >
                                    <Mail className="w-5 h-5" />
                                    Sign in with Email
                                </motion.button>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500"
                            >
                                <Shield className="w-3 h-3" />
                                SOC2 & GDPR Compliant
                            </motion.div>
                        </motion.div>
                    </div>
                );

            case 'dashboard':
                return (
                    <div className="flex flex-col h-full">
                        {/* Dashboard header */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-between mb-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
                                    S
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">Welcome back, Sarah</p>
                                    <p className="text-slate-400 text-xs">Bangalore Team Lead</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Clock className="w-3 h-3" />
                                5:28 PM IST
                            </div>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="grid grid-cols-4 gap-3 mb-4"
                        >
                            {[
                                { label: 'Pending', value: '3', color: 'text-amber-400' },
                                { label: 'Completed', value: '12', color: 'text-teal-400' },
                                { label: 'Team Score', value: '94%', color: 'text-blue-400' },
                                { label: 'Streak', value: '7d', color: 'text-indigo-400' }
                            ].map((stat, i) => (
                                <div key={i} className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-center">
                                    <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                                    <p className="text-xs text-slate-500">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* Recent handovers */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex-1 bg-slate-800 rounded-lg border border-slate-700 p-3"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <LayoutDashboard className="w-4 h-4 text-teal-500" />
                                <span className="text-white text-sm font-medium">Recent Handovers</span>
                            </div>
                            <div className="space-y-2">
                                {[
                                    { from: 'Singapore', project: 'Payment API', time: '2h ago', status: 'reviewed' },
                                    { from: 'Sydney', project: 'Auth Service', time: '8h ago', status: 'pending' }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className="p-2 rounded bg-slate-700/50 flex items-center justify-between"
                                    >
                                        <div>
                                            <p className="text-white text-xs font-medium">{item.project}</p>
                                            <p className="text-slate-400 text-xs">From {item.from} • {item.time}</p>
                                        </div>
                                        <span className={`text-xs px-2 py-0.5 rounded ${item.status === 'reviewed'
                                                ? 'bg-teal-500/20 text-teal-400'
                                                : 'bg-amber-500/20 text-amber-400'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                );

            case 'scenario':
                return (
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex items-center gap-8 mb-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-20 h-20 rounded-xl bg-slate-700 flex items-center justify-center text-4xl mb-2">
                                    🇮🇳
                                </div>
                                <span className="text-white font-semibold">Bangalore</span>
                                <span className="text-slate-400 text-sm">5:30 PM IST</span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center"
                            >
                                <motion.div
                                    animate={{ x: [0, 10, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    <ArrowRight className="w-8 h-8 text-teal-500" />
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-20 h-20 rounded-xl bg-slate-700 flex items-center justify-center text-4xl mb-2">
                                    🇬🇧
                                </div>
                                <span className="text-white font-semibold">London</span>
                                <span className="text-slate-400 text-sm">12:00 PM GMT</span>
                            </motion.div>
                        </div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-teal-400 text-center"
                        >
                            Time for the daily handover
                        </motion.p>
                    </div>
                );

            case 'create':
                return (
                    <div className="flex flex-col items-center justify-center h-full">
                        {/* Mock UI for creating handover */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-sm bg-slate-800 rounded-xl p-6 border border-slate-700"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
                                    S
                                </div>
                                <div>
                                    <p className="text-white font-semibold">Sarah Chen</p>
                                    <p className="text-slate-400 text-sm">Bangalore Team Lead</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    className="w-full p-3 rounded-lg bg-teal-600 text-white font-medium flex items-center justify-center gap-2"
                                >
                                    <Video className="w-5 h-5" />
                                    Record Video Handover
                                </motion.button>
                                <button className="w-full p-3 rounded-lg bg-slate-700 text-slate-300 font-medium flex items-center justify-center gap-2">
                                    <Mic className="w-5 h-5" />
                                    Audio Only
                                </button>
                            </div>
                        </motion.div>
                    </div>
                );

            case 'recording':
                return (
                    <div className="flex flex-col items-center justify-center h-full">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full max-w-md"
                        >
                            {/* Video recording simulation */}
                            <div className="aspect-video bg-slate-800 rounded-xl overflow-hidden mb-4 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center">
                                        <span className="text-3xl">👩‍💻</span>
                                    </div>
                                </div>
                                <div className="absolute top-3 left-3 flex items-center gap-2">
                                    <motion.div
                                        animate={{ opacity: [1, 0.3, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="w-3 h-3 rounded-full bg-red-500"
                                    />
                                    <span className="text-white text-sm font-mono">REC</span>
                                </div>
                                <div className="absolute bottom-3 left-3 right-3">
                                    <div className="h-1 bg-slate-600 rounded overflow-hidden">
                                        <motion.div
                                            className="h-full bg-teal-500"
                                            style={{ width: `${recordingProgress}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-1 text-xs text-slate-400 font-mono">
                                        <span>{Math.floor(recordingProgress * 3 / 100)}:{(recordingProgress % 60).toString().padStart(2, '0')}</span>
                                        <span>3:00</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center text-slate-400 text-sm">
                                "Completed the payment API integration. There's a blocker with AWS credentials..."
                            </p>
                        </motion.div>
                    </div>
                );

            case 'ai':
                return (
                    <div className="flex flex-col items-center justify-center h-full">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-20 h-20 rounded-full border-4 border-slate-700 border-t-teal-500 mb-6"
                        />
                        <p className="text-white font-semibold mb-4">AI Processing</p>
                        <div className="w-64 space-y-2">
                            {[
                                { label: 'Transcribing', complete: aiProgress > 25 },
                                { label: 'Extracting context', complete: aiProgress > 50 },
                                { label: 'Identifying blockers', complete: aiProgress > 75 },
                                { label: 'Generating summary', complete: aiProgress > 95 }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="flex items-center gap-2"
                                >
                                    {item.complete ? (
                                        <Check className="w-4 h-4 text-teal-500" />
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border-2 border-slate-600" />
                                    )}
                                    <span className={item.complete ? 'text-white' : 'text-slate-500'}>
                                        {item.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            case 'summary':
                return (
                    <div className="flex flex-col items-center justify-center h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full max-w-md bg-slate-800 rounded-xl p-5 border border-slate-700"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-5 h-5 text-teal-500" />
                                <span className="text-white font-semibold">AI-Generated Summary</span>
                            </div>
                            <p className="text-slate-300 text-sm mb-4">
                                "Completed payment API integration with Stripe. Code pushed to feature branch.
                                <span className="text-amber-400"> Blocker: AWS credentials rotation needed before deployment.</span>
                                Sarah's PR is ready for review."
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs">PROJ-124</span>
                                <span className="px-2 py-1 rounded bg-teal-500/20 text-teal-400 text-xs">2 Work Items</span>
                                <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-400 text-xs">1 Blocker</span>
                            </div>
                        </motion.div>
                    </div>
                );

            case 'sync':
                return (
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { name: 'JIRA', color: '#0052CC', status: 'Updated' },
                                { name: 'Slack', color: '#4A154B', status: 'Notified' },
                                { name: 'Teams', color: '#6264A7', status: 'Posted' }
                            ].map((tool, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="flex flex-col items-center"
                                >
                                    <div
                                        className="w-16 h-16 rounded-xl flex items-center justify-center mb-2"
                                        style={{ backgroundColor: `${tool.color}30` }}
                                    >
                                        <span className="text-2xl font-bold" style={{ color: tool.color }}>
                                            {tool.name[0]}
                                        </span>
                                    </div>
                                    <span className="text-white text-sm font-medium">{tool.name}</span>
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 + i * 0.2 }}
                                        className="text-teal-400 text-xs"
                                    >
                                        ✓ {tool.status}
                                    </motion.span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            case 'pickup':
                return (
                    <div className="flex flex-col items-center justify-center h-full">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full max-w-sm bg-slate-800 rounded-xl p-5 border border-teal-500/50"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                    J
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-semibold">James Wilson</p>
                                    <p className="text-slate-400 text-sm">London Team</p>
                                </div>
                                <span className="text-teal-400 text-xs">Just now</span>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-700/50 mb-3">
                                <p className="text-sm text-slate-300">
                                    📥 New handover from <span className="text-teal-400">Sarah Chen</span>
                                </p>
                                <p className="text-xs text-slate-400 mt-1">Payment API Integration • 1 Blocker</p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                className="w-full p-2 rounded-lg bg-teal-600 text-white font-medium text-sm"
                            >
                                View Full Handover
                            </motion.button>
                        </motion.div>
                    </div>
                );

            case 'analytics':
                return (
                    <div className="flex flex-col items-center justify-center h-full">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full max-w-md"
                        >
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {[
                                    { label: 'Quality Score', value: '94%', color: 'text-teal-400' },
                                    { label: 'Avg Duration', value: '12min', color: 'text-blue-400' },
                                    { label: 'On-Time Rate', value: '98%', color: 'text-indigo-400' }
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.15 }}
                                        className="text-center p-3 rounded-lg bg-slate-800"
                                    >
                                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                        <p className="text-xs text-slate-400">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <BarChart3 className="w-4 h-4 text-teal-500" />
                                    <span className="text-white text-sm font-medium">Team Performance</span>
                                </div>
                                <div className="space-y-2">
                                    {['Sydney', 'Singapore', 'Bangalore', 'London'].map((team, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <span className="text-xs text-slate-400 w-20">{team}</span>
                                            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${85 + Math.random() * 15}%` }}
                                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                                    className="h-full bg-teal-500 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                );

            case 'complete':
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                            className="w-20 h-20 rounded-full bg-teal-600 flex items-center justify-center mb-6"
                        >
                            <Check className="w-10 h-10 text-white" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-2">Handover Complete</h3>
                        <p className="text-slate-400 mb-6">Zero context loss. Zero ramp-up time.</p>
                        <motion.button
                            onClick={onClose}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-3 rounded-xl bg-teal-600 text-white font-semibold flex items-center gap-2"
                        >
                            Start Free Trial
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </div>
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
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full max-w-3xl bg-slate-900 rounded-2xl overflow-hidden border border-slate-700"
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>

                    {/* Scene */}
                    <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 p-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="h-full"
                            >
                                {renderScene()}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Controls */}
                    <div className="p-6 bg-slate-800 border-t border-slate-700">
                        {/* Title and description */}
                        <div className="text-center mb-4">
                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                            <p className="text-slate-400">{step.description}</p>
                        </div>

                        {/* Progress dots */}
                        <div className="flex justify-center gap-2 mb-4">
                            {demoSteps.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setCurrentStep(i); setIsAutoPlaying(false); }}
                                    className={`w-2 h-2 rounded-full transition-all ${i === currentStep
                                        ? 'w-8 bg-teal-500'
                                        : i < currentStep
                                            ? 'bg-teal-500/50'
                                            : 'bg-slate-600'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => { setCurrentStep(Math.max(0, currentStep - 1)); setIsAutoPlaying(false); }}
                                disabled={currentStep === 0}
                                className="flex items-center gap-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Previous
                            </button>

                            <button
                                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
                            >
                                {isAutoPlaying ? (
                                    <span className="w-5 h-5 flex items-center justify-center text-white">⏸</span>
                                ) : (
                                    <Play className="w-5 h-5 text-white" />
                                )}
                            </button>

                            <button
                                onClick={() => { setCurrentStep(Math.min(demoSteps.length - 1, currentStep + 1)); setIsAutoPlaying(false); }}
                                disabled={currentStep === demoSteps.length - 1}
                                className="flex items-center gap-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
