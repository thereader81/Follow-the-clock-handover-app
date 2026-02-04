'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import {
    Globe,
    ArrowRight,
    User,
    Building,
    Mail,
    Lock,
    Eye,
    EyeOff
} from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        role: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await login(formData.email, formData.password);
        router.push('/');
    };

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8 justify-center">
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-black tracking-tight">helix</span>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-bold text-black mb-2 text-center">Create your account</h2>
                    <p className="text-gray-500 mb-8 text-center">
                        Start orchestrating global handovers in minutes
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => updateField('name', e.target.value)}
                                    placeholder="John Smith"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Work Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                    placeholder="you@company.com"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company
                                </label>
                                <div className="relative">
                                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => updateField('company', e.target.value)}
                                        placeholder="Acme Inc"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Role
                                </label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => updateField('role', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                                >
                                    <option value="">Select Role</option>
                                    <option value="lead">Team Lead</option>
                                    <option value="manager">Manager</option>
                                    <option value="developer">Developer</option>
                                    <option value="analyst">Analyst</option>
                                </select>
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
                                    value={formData.password}
                                    onChange={(e) => updateField('password', e.target.value)}
                                    placeholder="Create a strong password"
                                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                                    required
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

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 px-6 rounded-xl bg-black text-white font-semibold mt-6 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all"
                        >
                            {isLoading ? (
                                'Creating account...'
                            ) : (
                                <>
                                    Get Started Free
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <a href="/login" className="text-black font-medium hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>

                <p className="mt-6 text-center text-xs text-gray-400">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
            </motion.div>
        </div>
    );
}
