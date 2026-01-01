"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlatformConnection from "@/components/PlatformConnection";
import StatsOverview from "@/components/StatsOverview";
import AIInsights from "@/components/AIInsights";
import AIChat from "@/components/AIChat";
import { getConnectedPlatforms, connectPlatform, disconnectPlatform } from "@/lib/profile";
import { saveDailyStats } from "@/lib/stats";

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

export default function DashboardPage() {
    const [connectedPlatforms, setConnectedPlatforms] = useState<{ platform: string; username: string }[]>([]);
    const [stats, setStats] = useState<PlatformStats>({});
    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [loadingPlatforms, setLoadingPlatforms] = useState(true);

    // Load connected platforms from database on mount
    useEffect(() => {
        const loadPlatforms = async () => {
            try {
                const platforms = await getConnectedPlatforms();
                setConnectedPlatforms(platforms);
            } catch (error) {
                console.error("Failed to load platforms:", error);
            } finally {
                setLoadingPlatforms(false);
                setInitialized(true);
            }
        };
        loadPlatforms();
    }, []);

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

        // Auto-save daily stats to database for analytics
        const leetcodeData = newStats.leetcode as typeof newStats.leetcode;
        const codeforcesData = newStats.codeforces as typeof newStats.codeforces;
        saveDailyStats({
            leetcode_solved: leetcodeData?.totalSolved || 0,
            leetcode_rating: leetcodeData?.user?.ranking || undefined,
            codeforces_solved: codeforcesData?.totalSolved || 0,
            codeforces_rating: codeforcesData?.user?.rating || undefined,
        });
    }, [connectedPlatforms]);

    useEffect(() => {
        if (initialized && connectedPlatforms.length > 0) {
            fetchStats();
        }
    }, [connectedPlatforms, initialized, fetchStats]);

    const handleConnect = async (platform: string, username: string) => {
        // Save to database
        const success = await connectPlatform(platform, username);
        if (success) {
            setConnectedPlatforms((prev) => [...prev, { platform, username }]);
        }
    };

    const handleDisconnect = async (platform: string) => {
        // Remove from database
        const success = await disconnectPlatform(platform);
        if (success) {
            setConnectedPlatforms((prev) => prev.filter((p) => p.platform !== platform));
            setStats((prev) => {
                const newStats = { ...prev };
                delete newStats[platform];
                return newStats;
            });
        }
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
                        {loadingPlatforms ? (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                <span>Loading your connected accounts...</span>
                            </div>
                        ) : (
                            <PlatformConnection
                                onConnect={handleConnect}
                                onDisconnect={handleDisconnect}
                                connectedPlatforms={connectedPlatforms}
                            />
                        )}
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
