'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Video,
    Sparkles,
    Globe,
    BarChart3,
    Play,
    Pause,
    Mic,
    FileText,
    Check,
    ArrowRight,
    MessageSquare,
    AlertTriangle,
    TrendingUp,
    Clock,
    Users
} from 'lucide-react';

interface FeatureModalProps {
    isOpen: boolean;
    onClose: () => void;
    feature: string | null;
}

export default function FeatureModal({ isOpen, onClose, feature }: FeatureModalProps) {
    const [activeStep, setActiveStep] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);

    if (!isOpen || !feature) return null;

    const features: Record<string, {
        title: string;
        description: string;
        workflow: { step: number; title: string; content: React.ReactNode }[];
    }> = {
        video: {
            title: "Video & Audio Handovers",
            description: "Record rich context with video or audio. AI automatically transcribes and extracts action items.",
            workflow: [
                {
                    step: 1,
                    title: "Select Recording Type",
                    content: (
                        <div className="space-y-4">
                            <p className="text-gray-600 text-sm mb-4">Choose how you want to record your handover:</p>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => { setIsRecording(true); setActiveStep(1); }}
                                    className="p-6 rounded-xl bg-blue-50 border-2 border-blue-200 hover:border-blue-500 transition-all flex flex-col items-center gap-3"
                                >
                                    <Video className="w-8 h-8 text-blue-600" />
                                    <span className="font-semibold text-blue-900">Video Recording</span>
                                    <span className="text-xs text-blue-600">Screen + Camera + Audio</span>
                                </button>
                                <button
                                    onClick={() => { setIsRecording(true); setActiveStep(1); }}
                                    className="p-6 rounded-xl bg-green-50 border-2 border-green-200 hover:border-green-500 transition-all flex flex-col items-center gap-3"
                                >
                                    <Mic className="w-8 h-8 text-green-600" />
                                    <span className="font-semibold text-green-900">Audio Only</span>
                                    <span className="text-xs text-green-600">Voice recording</span>
                                </button>
                            </div>
                        </div>
                    )
                },
                {
                    step: 2,
                    title: "Record Your Handover",
                    content: (
                        <div className="text-center">
                            <div className="w-48 h-32 mx-auto rounded-xl bg-gray-900 flex items-center justify-center mb-4 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                                <div className="relative z-10">
                                    {isRecording ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse" />
                                            <span className="text-white text-sm font-mono">00:0{recordingTime}</span>
                                        </div>
                                    ) : (
                                        <Play className="w-12 h-12 text-white" />
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setIsRecording(!isRecording)}
                                    className={`px-6 py-2 rounded-full font-medium ${isRecording ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
                                >
                                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                                </button>
                            </div>
                            {isRecording && (
                                <button
                                    onClick={() => setActiveStep(2)}
                                    className="mt-4 text-sm text-blue-600 hover:underline"
                                >
                                    Skip to AI Processing →
                                </button>
                            )}
                        </div>
                    )
                },
                {
                    step: 3,
                    title: "AI Processes Recording",
                    content: (
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="w-5 h-5 text-purple-600" />
                                    <span className="font-semibold text-purple-900">AI Processing Complete</span>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-green-600">
                                        <Check className="w-4 h-4" /> Transcription complete
                                    </div>
                                    <div className="flex items-center gap-2 text-green-600">
                                        <Check className="w-4 h-4" /> 3 action items extracted
                                    </div>
                                    <div className="flex items-center gap-2 text-green-600">
                                        <Check className="w-4 h-4" /> 1 blocker identified
                                    </div>
                                    <div className="flex items-center gap-2 text-green-600">
                                        <Check className="w-4 h-4" /> Summary generated
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setActiveStep(3)}
                                className="w-full py-3 rounded-xl bg-black text-white font-medium"
                            >
                                View AI Summary →
                            </button>
                        </div>
                    )
                },
                {
                    step: 4,
                    title: "Handover Ready",
                    content: (
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                                <h4 className="font-semibold text-black mb-2">AI-Generated Summary</h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    "Completed API integration for payment module. Pending code review from Sarah.
                                    Blocker: AWS credentials need rotation before London shift starts."
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">3 Work Items</span>
                                    <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs">1 Blocker</span>
                                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">Ready for London</span>
                                </div>
                            </div>
                            <button className="w-full py-3 rounded-xl bg-green-500 text-white font-medium">
                                ✓ Handover Sent to London Team
                            </button>
                        </div>
                    )
                }
            ]
        },
        ai: {
            title: "AI Context Preservation",
            description: "Never lose context. AI extracts, summarizes, and preserves critical handover information.",
            workflow: [
                {
                    step: 1,
                    title: "Raw Handover Input",
                    content: (
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-gray-100 border border-gray-200">
                                <p className="text-sm text-gray-700 font-mono">
                                    "Hey team, so we've been working on the payment gateway integration all day.
                                    Had some issues with the Stripe webhook callbacks not firing properly.
                                    Mike figured out it was a CORS issue. We pushed a fix but need someone to
                                    verify in staging. Also, the client called about changing the checkout flow
                                    again - I logged it in JIRA as PROJ-456. Sarah's PR is still pending review..."
                                </p>
                            </div>
                            <button
                                onClick={() => setActiveStep(1)}
                                className="w-full py-3 rounded-xl bg-purple-500 text-white font-medium flex items-center justify-center gap-2"
                            >
                                <Sparkles className="w-4 h-4" />
                                Run AI Analysis
                            </button>
                        </div>
                    )
                },
                {
                    step: 2,
                    title: "AI Extraction",
                    content: (
                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-4 py-8">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
                                />
                                <span className="text-purple-600 font-medium">Analyzing context...</span>
                            </div>
                            <div className="space-y-2">
                                {['Extracting entities...', 'Identifying blockers...', 'Linking JIRA issues...', 'Generating summary...'].map((text, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.3 }}
                                        className="flex items-center gap-2 text-sm text-gray-600"
                                    >
                                        <Check className="w-4 h-4 text-green-500" />
                                        {text}
                                    </motion.div>
                                ))}
                            </div>
                            <button
                                onClick={() => setActiveStep(2)}
                                className="w-full py-3 rounded-xl bg-black text-white font-medium mt-4"
                            >
                                View Results →
                            </button>
                        </div>
                    )
                },
                {
                    step: 3,
                    title: "Structured Output",
                    content: (
                        <div className="space-y-4">
                            <div className="grid gap-3">
                                <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                                    <div className="flex items-center gap-2 mb-1">
                                        <FileText className="w-4 h-4 text-blue-600" />
                                        <span className="font-semibold text-blue-900 text-sm">Summary</span>
                                    </div>
                                    <p className="text-xs text-blue-700">Payment gateway integration in progress. Stripe webhook CORS fix deployed, needs staging verification.</p>
                                </div>
                                <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                                    <div className="flex items-center gap-2 mb-1">
                                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                                        <span className="font-semibold text-amber-900 text-sm">Blockers</span>
                                    </div>
                                    <p className="text-xs text-amber-700">• Staging verification needed for webhook fix</p>
                                </div>
                                <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Check className="w-4 h-4 text-green-600" />
                                        <span className="font-semibold text-green-900 text-sm">Action Items</span>
                                    </div>
                                    <p className="text-xs text-green-700">• Review Sarah's PR<br />• Address PROJ-456<br />• Verify staging</p>
                                </div>
                            </div>
                            <div className="text-center text-xs text-gray-500">
                                Confidence Score: <span className="font-bold text-green-600">94%</span>
                            </div>
                        </div>
                    )
                }
            ]
        },
        regions: {
            title: "5 Global Regions",
            description: "Sydney → Singapore → Bangalore → London → New York. True 24/7 follow-the-sun coverage.",
            workflow: [
                {
                    step: 1,
                    title: "Global Coverage Map",
                    content: (
                        <div className="space-y-4">
                            <div className="relative h-40 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Globe className="w-24 h-24 text-gray-700" />
                                </div>
                                {/* Region dots */}
                                <motion.div
                                    className="absolute w-3 h-3 rounded-full bg-green-500"
                                    style={{ top: '45%', left: '85%' }}
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <motion.div
                                    className="absolute w-3 h-3 rounded-full bg-yellow-500"
                                    style={{ top: '55%', left: '72%' }}
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                                />
                                <motion.div
                                    className="absolute w-3 h-3 rounded-full bg-orange-500"
                                    style={{ top: '50%', left: '65%' }}
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                                />
                                <motion.div
                                    className="absolute w-3 h-3 rounded-full bg-blue-500"
                                    style={{ top: '35%', left: '47%' }}
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                                />
                                <motion.div
                                    className="absolute w-3 h-3 rounded-full bg-purple-500"
                                    style={{ top: '40%', left: '25%' }}
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 1.6 }}
                                />
                            </div>
                            <div className="grid grid-cols-5 gap-2 text-center text-xs">
                                <div><span className="block w-2 h-2 rounded-full bg-green-500 mx-auto mb-1" />Sydney</div>
                                <div><span className="block w-2 h-2 rounded-full bg-yellow-500 mx-auto mb-1" />Singapore</div>
                                <div><span className="block w-2 h-2 rounded-full bg-orange-500 mx-auto mb-1" />Bangalore</div>
                                <div><span className="block w-2 h-2 rounded-full bg-blue-500 mx-auto mb-1" />London</div>
                                <div><span className="block w-2 h-2 rounded-full bg-purple-500 mx-auto mb-1" />New York</div>
                            </div>
                        </div>
                    )
                },
                {
                    step: 2,
                    title: "Live Region Status",
                    content: (
                        <div className="space-y-3">
                            {[
                                { name: 'Sydney', status: 'Offline', time: '02:30 AM', color: 'gray' },
                                { name: 'Singapore', status: 'Active', time: '11:30 PM', color: 'green' },
                                { name: 'Bangalore', status: 'Active', time: '09:00 PM', color: 'green' },
                                { name: 'London', status: 'Active', time: '05:30 PM', color: 'green' },
                                { name: 'New York', status: 'Incoming', time: '12:30 PM', color: 'amber' }
                            ].map((region, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full bg-${region.color}-500`} />
                                        <span className="font-medium">{region.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${region.status === 'Active' ? 'bg-green-100 text-green-700' : region.status === 'Incoming' ? 'bg-amber-100 text-amber-700' : 'bg-gray-200 text-gray-600'}`}>
                                            {region.status}
                                        </span>
                                        <span className="text-xs text-gray-500 ml-2">{region.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                },
                {
                    step: 3,
                    title: "Handover Scheduling",
                    content: (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">Automatic handover windows based on region overlap:</p>
                            <div className="space-y-2">
                                {[
                                    { from: 'Sydney', to: 'Singapore', time: '5:00 PM AEST' },
                                    { from: 'Singapore', to: 'Bangalore', time: '6:00 PM SGT' },
                                    { from: 'Bangalore', to: 'London', time: '5:30 PM IST' },
                                    { from: 'London', to: 'New York', time: '4:00 PM GMT' }
                                ].map((handover, i) => (
                                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 text-sm">
                                        <Clock className="w-4 h-4 text-blue-600" />
                                        <span>{handover.from}</span>
                                        <ArrowRight className="w-3 h-3 text-gray-400" />
                                        <span>{handover.to}</span>
                                        <span className="ml-auto text-xs text-blue-600">{handover.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }
            ]
        },
        analytics: {
            title: "Handover Analytics",
            description: "Track quality, identify bottlenecks, and measure team performance across regions.",
            workflow: [
                {
                    step: 1,
                    title: "Quality Metrics",
                    content: (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-center">
                                    <p className="text-3xl font-bold text-green-600">94%</p>
                                    <p className="text-xs text-green-700">Context Retention</p>
                                </div>
                                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-center">
                                    <p className="text-3xl font-bold text-blue-600">12min</p>
                                    <p className="text-xs text-blue-700">Avg Handover Time</p>
                                </div>
                                <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 text-center">
                                    <p className="text-3xl font-bold text-purple-600">98%</p>
                                    <p className="text-xs text-purple-700">On-Time Rate</p>
                                </div>
                                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-center">
                                    <p className="text-3xl font-bold text-amber-600">2.1</p>
                                    <p className="text-xs text-amber-700">Blockers/Week</p>
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    step: 2,
                    title: "Team Performance",
                    content: (
                        <div className="space-y-3">
                            {[
                                { team: 'Sydney', score: 96, trend: '+2%' },
                                { team: 'Singapore', score: 94, trend: '+1%' },
                                { team: 'Bangalore', score: 92, trend: '+5%' },
                                { team: 'London', score: 89, trend: '-1%' },
                                { team: 'New York', score: 91, trend: '+3%' }
                            ].map((team, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <span className="w-24 text-sm font-medium">{team.team}</span>
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${team.score}%` }}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                        />
                                    </div>
                                    <span className="text-sm font-bold">{team.score}%</span>
                                    <span className={`text-xs ${team.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                        {team.trend}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )
                },
                {
                    step: 3,
                    title: "Insights & Recommendations",
                    content: (
                        <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-amber-900">London Handover Delays</p>
                                        <p className="text-xs text-amber-700">3 late handovers this week. Consider 30min earlier start.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                                <div className="flex items-start gap-2">
                                    <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-green-900">Bangalore Improvement</p>
                                        <p className="text-xs text-green-700">Video handovers increased quality score by 5%.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                                <div className="flex items-start gap-2">
                                    <Users className="w-4 h-4 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-blue-900">Team Suggestion</p>
                                        <p className="text-xs text-blue-700">Add overlap meeting between Singapore & Bangalore.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            ]
        }
    };

    const currentFeature = features[feature];
    if (!currentFeature) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-black">{currentFeature.title}</h2>
                                <p className="text-sm text-gray-600 mt-1">{currentFeature.description}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                    </div>

                    {/* Step Indicators */}
                    <div className="px-6 py-4 bg-gray-50 flex items-center gap-2">
                        {currentFeature.workflow.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveStep(i)}
                                className={`flex-1 h-1.5 rounded-full transition-colors ${i <= activeStep ? 'bg-black' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>

                    {/* Content */}
                    <div className="p-6 min-h-[300px]">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            Step {activeStep + 1}: {currentFeature.workflow[activeStep]?.title}
                        </h3>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                {currentFeature.workflow[activeStep]?.content}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="p-6 border-t border-gray-100 flex items-center justify-between">
                        <button
                            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                            disabled={activeStep === 0}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ← Previous
                        </button>
                        {activeStep < currentFeature.workflow.length - 1 ? (
                            <button
                                onClick={() => setActiveStep(activeStep + 1)}
                                className="px-6 py-2 rounded-full bg-black text-white text-sm font-medium"
                            >
                                Next Step →
                            </button>
                        ) : (
                            <button
                                onClick={onClose}
                                className="px-6 py-2 rounded-full bg-green-500 text-white text-sm font-medium"
                            >
                                ✓ Done
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
