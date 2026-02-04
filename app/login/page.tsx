'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import {
    Globe,
    ArrowRight,
    Sparkles,
    Lock,
    Mail,
    Eye,
    EyeOff,
    Zap
} from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { login, loginDemo } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const success = await login(email, password);
            if (success) {
                router.push('/dashboard');
            }
        } catch (err) {
            setError('Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDemoLogin = () => {
        loginDemo();
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black">
                {/* Sculptural Wave Background */}
                <div className="absolute bottom-0 left-0 right-0 h-96">
                    <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="loginWave1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3A3A3A" />
                                <stop offset="100%" stopColor="#2A2A2A" />
                            </linearGradient>
                            <linearGradient id="loginWave2" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#4A4A4A" />
                                <stop offset="100%" stopColor="#3A3A3A" />
                            </linearGradient>
                        </defs>
                        <motion.path
                            d="M0,150 C150,220 300,80 500,150 C700,220 750,100 800,150 L800,300 L0,300 Z"
                            fill="url(#loginWave1)"
                            animate={{
                                d: [
                                    "M0,150 C150,220 300,80 500,150 C700,220 750,100 800,150 L800,300 L0,300 Z",
                                    "M0,150 C150,80 300,220 500,150 C700,80 750,200 800,150 L800,300 L0,300 Z",
                                    "M0,150 C150,220 300,80 500,150 C700,220 750,100 800,150 L800,300 L0,300 Z"
                                ]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.path
                            d="M0,200 C200,150 400,250 600,200 C750,160 780,220 800,200 L800,300 L0,300 Z"
                            fill="url(#loginWave2)"
                            animate={{
                                d: [
                                    "M0,200 C200,150 400,250 600,200 C750,160 780,220 800,200 L800,300 L0,300 Z",
                                    "M0,200 C200,250 400,150 600,200 C750,240 780,180 800,200 L800,300 L0,300 Z",
                                    "M0,200 C200,150 400,250 600,200 C750,160 780,220 800,200 L800,300 L0,300 Z"
                                ]
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        />
                    </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                                <Globe className="w-6 h-6 text-black" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">helix</span>
                        </div>

                        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                            Seamless global
                            <br />
                            <span className="text-gray-400">handovers.</span>
                        </h1>

                        <p className="text-lg text-gray-400 max-w-md mb-12">
                            Orchestrate your follow-the-sun delivery with AI-powered insights,
                            video handoffs, and real-time tracking.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-400">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <span>AI-powered context preservation</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                    <Globe className="w-4 h-4 text-white" />
                                </div>
                                <span>5 global regions, 24/7 coverage</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                    <Zap className="w-4 h-4 text-white" />
                                </div>
                                <span>JIRA, Slack, Teams integration</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                            <Globe className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-black tracking-tight">helix</span>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                        <h2 className="text-2xl font-bold text-black mb-2">Welcome back</h2>
                        <p className="text-gray-500 mb-8">
                            Sign in to your account to continue
                        </p>

                        {/* Demo Mode Button */}
                        <motion.button
                            onClick={handleDemoLogin}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 px-6 rounded-xl bg-black text-white font-semibold mb-6 flex items-center justify-center gap-2 shadow-lg"
                        >
                            <Zap className="w-5 h-5" />
                            Launch Demo Mode
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-400">
                                    or sign in with email
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@company.com"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full pl-12 pr-12 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-black" />
                                    <span className="text-gray-600">Remember me</span>
                                </label>
                                <a href="#" className="text-black font-medium hover:underline">
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !email || !password}
                                className="w-full py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-medium border border-gray-200 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-gray-500">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-black font-medium hover:underline">
                                Get started
                            </a>
                        </p>
                    </div>

                    {/* Integration Logos */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-400 mb-4">Integrates with</p>
                        <div className="flex items-center justify-center gap-8 text-gray-400">
                            <span className="text-sm font-medium">JIRA</span>
                            <span className="text-sm font-medium">Slack</span>
                            <span className="text-sm font-medium">Teams</span>
                            <span className="text-sm font-medium">DevOps</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
