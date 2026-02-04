'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import DemoVideoModal from '@/components/modals/DemoVideoModal';
import FeatureModal from '@/components/modals/FeatureModal';
import GuidedDemo from '@/components/modals/GuidedDemo';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Video,
  BarChart3,
  X,
  Check,
  Clock,
  Users,
  TrendingUp,
  Shield,
  MessageSquare,
  FileText,
  ArrowDown,
  Play,
  Globe,
  Mic,
  Brain,
  ChevronRight
} from 'lucide-react';

// DNA Helix Logo SVG
const DNAIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 4h20M2 20h20M4 4c0 8 4 8 8 8s8 0 8-8M4 20c0-8 4-8 8-8s8 0 8 8" />
    <path d="M6 8h12M6 16h12" strokeWidth="1.5" opacity="0.6" />
  </svg>
);

// Integration logos
const integrations = [
  {
    id: 'jira',
    name: 'JIRA',
    color: '#0052CC',
    features: ['Auto-sync work items', 'Status updates', 'Sprint handovers', 'Blocker alerts'],
    description: 'Automatically sync JIRA tickets across regions. When a handover occurs, all linked issues are updated with context.'
  },
  {
    id: 'slack',
    name: 'Slack',
    color: '#4A154B',
    features: ['Real-time notifications', 'Handover summaries', 'Channel updates', 'AI digests'],
    description: 'Get instant Slack notifications when handovers happen. AI summaries posted directly to team channels.'
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    color: '#6264A7',
    features: ['Video handovers', 'Meeting integration', 'Channel posts', 'Task sync'],
    description: 'Record video handovers in Teams. Auto-schedule handover meetings across time zones.'
  },
  {
    id: 'devops',
    name: 'Azure DevOps',
    color: '#0078D7',
    features: ['Pipeline status', 'PR handovers', 'Board sync', 'Release notes'],
    description: 'Sync DevOps work items and pipeline status. Automatic notes from commits and PRs.'
  }
];

const JiraLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M11.53 2c0 2.4 1.97 4.35 4.35 4.35h1.78v1.7c0 2.4 1.94 4.34 4.34 4.35V2.84a.84.84 0 0 0-.84-.84H11.53zM6.77 6.8a4.36 4.36 0 0 0 4.34 4.34h1.8v1.72a4.36 4.36 0 0 0 4.34 4.34V7.63a.84.84 0 0 0-.83-.83H6.77zM2 11.6c0 2.4 1.95 4.34 4.35 4.34h1.78v1.72c.01 2.39 1.95 4.34 4.35 4.34v-9.57a.84.84 0 0 0-.84-.83H2z" />
  </svg>
);

const SlackLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
  </svg>
);

const TeamsLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M20.625 8.073c.574 0 1.125.224 1.53.624.407.4.637.944.637 1.51v5.358a2.12 2.12 0 0 1-.637 1.512 2.18 2.18 0 0 1-1.53.623h-3.863v3.088c0 .847-.348 1.66-.965 2.258a3.31 3.31 0 0 1-2.33.954H6.72c-.875 0-1.714-.343-2.332-.954a3.14 3.14 0 0 1-.963-2.258V10.03c0-.848.347-1.66.963-2.26a3.31 3.31 0 0 1 2.332-.953h10.042v1.255h3.863zM16.875 5.25a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25zM10.5 7.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
  </svg>
);

const AzureDevOpsLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M0 8.877L2.247 5.91l8.405-3.416V.022l7.37 5.393L2.966 8.338v8.225L0 15.707zm24-4.45v14.651l-5.753 4.9-9.303-3.057v3.056l-5.978-7.416 15.057 1.798V5.415z" />
  </svg>
);

const logoMap: Record<string, React.FC> = {
  jira: JiraLogo,
  slack: SlackLogo,
  teams: TeamsLogo,
  devops: AzureDevOpsLogo
};

export default function LandingPage() {
  const router = useRouter();
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [showDemoVideo, setShowDemoVideo] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [showGuidedDemo, setShowGuidedDemo] = useState(false);
  const { loginDemo } = useAuth();

  const features = [
    {
      icon: Video,
      title: "Video & Audio Handovers",
      description: "Record rich context with video summaries. AI transcribes and extracts action items.",
      color: "bg-blue-600"
    },
    {
      icon: Brain,
      title: "AI Context Preservation",
      description: "Never lose context. AI extracts, summarizes, and preserves critical handover information.",
      color: "bg-teal-600"
    },
    {
      icon: Globe,
      title: "5 Global Regions",
      description: "Sydney → Singapore → Bangalore → London → New York. True 24/7 coverage.",
      color: "bg-indigo-600"
    },
    {
      icon: BarChart3,
      title: "Handover Analytics",
      description: "Track quality, identify bottlenecks, measure team performance across regions.",
      color: "bg-slate-700"
    }
  ];

  const problemStats = [
    { value: "$470B", label: "Lost to inefficient handovers" },
    { value: "40%", label: "Context lost in handovers" },
    { value: "3.2hrs", label: "Wasted per handover" },
    { value: "67%", label: "Teams frustrated" }
  ];

  const featureKeys = ['video', 'ai', 'regions', 'analytics'];
  const selectedInt = integrations.find(i => i.id === selectedIntegration);

  const handleLaunchDemo = () => {
    setShowGuidedDemo(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(100,116,139,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center">
              <DNAIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">helix</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#problem" className="hover:text-slate-900 transition-colors">The Problem</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it Works</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#integrations" className="hover:text-slate-900 transition-colors">Integrations</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/login')}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-4 py-2"
            >
              Sign In
            </button>
            <motion.button
              onClick={() => router.push('/login')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium flex items-center gap-2 shadow-lg shadow-slate-900/10"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Sophisticated gradient mesh */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)' }}
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #14b8a6 0%, transparent 70%)' }}
            animate={{
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8"
              whileHover={{ scale: 1.02 }}
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-medium text-slate-700">
                AI-Powered Handover Intelligence
              </span>
            </motion.div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.05] mb-8">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                The{' '}
                <span className="text-teal-600">$470B problem</span>
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-slate-400"
              >
                of broken handovers.
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-slate-900"
              >
                Solved.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Helix orchestrates seamless follow-the-sun delivery with AI-powered
              context preservation, video handoffs, and real-time tracking.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                onClick={handleLaunchDemo}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 rounded-xl bg-slate-900 text-white font-semibold flex items-center gap-3 shadow-xl shadow-slate-900/20 text-lg"
              >
                <Zap className="w-5 h-5" />
                Launch Demo
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={() => setShowDemoVideo(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:border-slate-300 transition-all flex items-center gap-3 text-lg shadow-sm"
              >
                <Play className="w-5 h-5 text-teal-600" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-500"
            >
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> No credit card</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> 14-day free trial</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> SOC2 compliant</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Stats - Corporate dark section */}
      <section id="problem" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-teal-400 font-semibold text-sm uppercase tracking-wider mb-4 block">The Hidden Crisis</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The Cost of Poor Handovers
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Global IT teams lose billions to context loss and inefficient handovers every year.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {problemStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-slate-800/50 backdrop-blur border border-slate-700/50 text-center"
              >
                <motion.p
                  className="text-4xl md:text-5xl font-bold text-white"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-slate-400 text-sm mt-3">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider mb-4 block">Simple & Powerful</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How Helix Works
            </h2>
            <p className="text-slate-600 text-xl max-w-2xl mx-auto">
              Four simple steps to seamless global delivery
            </p>
          </motion.div>

          {/* Process steps */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { step: "01", title: "Record", desc: "Video, audio, or text handover at end of shift", icon: Video, color: "bg-blue-600" },
              { step: "02", title: "AI Process", desc: "Automatic transcription, summary, and extraction", icon: Brain, color: "bg-teal-600" },
              { step: "03", title: "Sync Tools", desc: "JIRA, Slack, Teams updated automatically", icon: Zap, color: "bg-indigo-600" },
              { step: "04", title: "Seamless Pickup", desc: "Next region starts with full context", icon: Globe, color: "bg-slate-700" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative group"
              >
                {/* Connector line */}
                {i < 3 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-slate-200" />
                )}

                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all h-full"
                >
                  <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Step {item.step}</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Global flow visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-slate-900 text-white"
          >
            <h3 className="text-center text-xl font-bold mb-8">Global Handover Flow</h3>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              {[
                { flag: '🇦🇺', name: 'Sydney', time: '9AM-5PM AEST' },
                { flag: '🇸🇬', name: 'Singapore', time: '9AM-5PM SGT' },
                { flag: '🇮🇳', name: 'Bangalore', time: '9AM-5PM IST' },
                { flag: '🇬🇧', name: 'London', time: '9AM-5PM GMT' },
                { flag: '🇺🇸', name: 'New York', time: '9AM-5PM EST' }
              ].map((region, i, arr) => (
                <div key={i} className="flex items-center gap-3 md:gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl mb-2">
                      {region.flag}
                    </div>
                    <span className="text-sm font-semibold">{region.name}</span>
                    <span className="text-xs text-slate-400">{region.time}</span>
                  </motion.div>
                  {i < arr.length - 1 && (
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ChevronRight className="w-6 h-6 text-teal-500" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-center mt-6 text-slate-400">Continuous 24/7 coverage following the sun</p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider mb-4 block">Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-slate-600 text-xl">Click any feature to explore the workflow</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.button
                key={i}
                onClick={() => setSelectedFeature(featureKeys[i])}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all text-left cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">{feature.title}</h3>
                <p className="text-slate-600 text-lg mb-4">{feature.description}</p>
                <span className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm">
                  Explore workflow
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider mb-4 block">Seamless Connectivity</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              One-Click Integrations
            </h2>
            <p className="text-slate-600 text-xl">Click to see how Helix connects with your tools</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {integrations.map((integration) => {
              const Logo = logoMap[integration.id];
              const isSelected = selectedIntegration === integration.id;
              return (
                <motion.button
                  key={integration.id}
                  onClick={() => setSelectedIntegration(isSelected ? null : integration.id)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-xl flex flex-col items-center gap-4 transition-all ${isSelected
                    ? 'bg-white shadow-lg border-2'
                    : 'bg-slate-50 border border-slate-200 hover:bg-white hover:shadow-md'
                    }`}
                  style={{ borderColor: isSelected ? integration.color : undefined }}
                >
                  <div style={{ color: integration.color }}>
                    <Logo />
                  </div>
                  <span className="font-semibold text-slate-900">{integration.name}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Integration detail panel */}
          <AnimatePresence>
            {selectedInt && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div
                  className="p-8 rounded-2xl bg-white shadow-lg border-2"
                  style={{ borderColor: selectedInt.color }}
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-4" style={{ color: selectedInt.color }}>
                        {selectedInt.name} Integration
                      </h3>
                      <p className="text-slate-600 mb-6">{selectedInt.description}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedInt.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${selectedInt.color}15` }}
                            >
                              <Check className="w-3 h-3" style={{ color: selectedInt.color }} />
                            </div>
                            <span className="text-sm text-slate-700">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="md:w-80">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <h4 className="font-semibold text-slate-900 mb-3">How it works</h4>
                        <div className="space-y-3 text-sm text-slate-600">
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                            <span>Connect your {selectedInt.name} account</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                            <span>Link projects and channels</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                            <span>Auto-sync on every handover</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Subtle gradient orbs */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to transform your
              <br />
              <span className="text-teal-400">global handovers?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-10">
              Join leading teams using Helix for seamless follow-the-sun delivery.
            </p>
            <motion.button
              onClick={() => router.push('/login')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 rounded-xl bg-white text-slate-900 font-bold text-lg inline-flex items-center gap-3 shadow-xl"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <p className="mt-6 text-slate-400">No credit card required • 14-day free trial</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
              <DNAIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">helix</span>
          </div>
          <p className="text-sm text-slate-500">© 2026 Helix. Follow-the-Sun Orchestrator.</p>
        </div>
      </footer>

      {/* Modals */}
      <DemoVideoModal isOpen={showDemoVideo} onClose={() => setShowDemoVideo(false)} />
      <FeatureModal isOpen={!!selectedFeature} onClose={() => setSelectedFeature(null)} feature={selectedFeature} />
      <GuidedDemo isOpen={showGuidedDemo} onClose={() => setShowGuidedDemo(false)} />
    </div>
  );
}
