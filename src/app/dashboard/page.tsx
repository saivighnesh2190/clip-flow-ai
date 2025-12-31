"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlatformConnection from "@/components/PlatformConnection";
import StatsOverview from "@/components/StatsOverview";
import AIInsights from "@/components/AIInsights";
import AIChat from "@/components/AIChat";

interface PlatformStats {
    [key: string]: unknown;
    codeforces?: {
        user?: { rating: number; maxRating: number; rank: string; handle: string };
        totalSolved: number;
        problemsByTag?: Record<string, number>;
    };
    leetcode?: {
        user?: { username: string; ranking: number };
        totalSolved: number;
        easySolved: number;
        mediumSolved: number;
        hardSolved: number;
    };
}

const STORAGE_KEY = "clipflow_connected_platforms";

export default function DashboardPage() {
    const [connectedPlatforms, setConnectedPlatforms] = useState<{ platform: string; username: string }[]>([]);
    const [stats, setStats] = useState<PlatformStats>({});
    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setConnectedPlatforms(parsed);
            } catch {
                console.error("Failed to parse saved platforms");
            }
        }
        setInitialized(true);
    }, []);

    // Save to localStorage when platforms change
    useEffect(() => {
        if (initialized) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(connectedPlatforms));
        }
    }, [connectedPlatforms, initialized]);

    const fetchStats = useCallback(async () => {
        if (connectedPlatforms.length === 0) {
            setStats({});
            return;
        }

        setLoading(true);
        const newStats: PlatformStats = {};

        for (const { platform, username } of connectedPlatforms) {
            try {
                const response = await fetch(`/api/stats?platform=${platform}&username=${username}`);
                const data = await response.json();
                if (data.success) {
                    newStats[platform] = data.data;
                }
            } catch (error) {
                console.error(`Failed to fetch ${platform} stats:`, error);
            }
        }

        setStats(newStats);
        setLoading(false);
    }, [connectedPlatforms]);

    useEffect(() => {
        if (initialized) {
            fetchStats();
        }
    }, [connectedPlatforms, initialized, fetchStats]);

    const handleConnect = (platform: string, username: string) => {
        setConnectedPlatforms((prev) => [...prev, { platform, username }]);
    };

    const handleDisconnect = (platform: string) => {
        setConnectedPlatforms((prev) => prev.filter((p) => p.platform !== platform));
        setStats((prev) => {
            const newStats = { ...prev };
            delete newStats[platform];
            return newStats;
        });
    };

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <section className="pt-24 pb-8 md:pt-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                            Dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Track your DSA progress across platforms with AI-powered insights
                        </p>
                    </div>

                    {/* Platform Connection */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-foreground mb-4">Connect Platforms</h2>
                        <PlatformConnection
                            onConnect={handleConnect}
                            onDisconnect={handleDisconnect}
                            connectedPlatforms={connectedPlatforms}
                        />
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Stats - 2 columns */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-lg font-semibold text-foreground mb-4">Your Stats</h2>
                                {loading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                    </div>
                                ) : (
                                    <StatsOverview stats={stats} />
                                )}
                            </div>

                            {/* AI Chat */}
                            <div>
                                <h2 className="text-lg font-semibold text-foreground mb-4">Ask AI</h2>
                                <AIChat stats={stats} />
                            </div>
                        </div>

                        {/* AI Insights - 1 column */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-foreground">AI Insights</h2>
                            <AIInsights stats={stats} />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
