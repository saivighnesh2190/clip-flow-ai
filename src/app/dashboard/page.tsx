"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import CommandDeckHUD from "@/components/CommandDeckHUD";
import PlatformConnection from "@/components/PlatformConnection";
import StatsOverview from "@/components/StatsOverview";
import SkillMatrix from "@/components/SkillMatrix";
import AIDrillConsole from "@/components/AIDrillConsole";
import AIInsights from "@/components/AIInsights";
import WorkspaceDock from "@/components/WorkspaceDock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getConnectedPlatforms, connectPlatform, disconnectPlatform } from "@/lib/profile";
import { saveDailyStats } from "@/lib/stats";
import { 
    Activity, 
    RefreshCw, 
    Radio, 
    Sparkles, 
    Cpu,
    Layers,
    SlidersHorizontal,
    Terminal
} from "lucide-react";

interface PlatformStats {
    [key: string]: unknown;
    codeforces?: {
        user?: { rating: number; maxRating: number; rank: string; handle: string };
        totalSolved: number;
        problemsByTag?: Record<string, number>;
    };
    leetcode?: {
        user?: { username: string; ranking: number; contestRating?: number; contestGlobalRank?: number; contestAttended?: number };
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
    const [lastSyncTime, setLastSyncTime] = useState<string>("Just now");
    
    // Spatial Cockpit Modes: overview | matrix | drills
    const [activeView, setActiveView] = useState<"overview" | "matrix" | "drills">("overview");
    const [selectedDrillTopic, setSelectedDrillTopic] = useState<string | null>(null);

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
        setLastSyncTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));

        // Auto-save daily stats to database for analytics
        const leetcodeData = newStats.leetcode;
        const codeforcesData = newStats.codeforces;
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
        try {
            await connectPlatform(platform, username);
        } catch {
            // Ignore if unauthenticated guest session
        }
        setConnectedPlatforms((prev) => {
            const filtered = prev.filter((p) => p.platform !== platform);
            return [...filtered, { platform, username }];
        });
    };

    const handleDisconnect = async (platform: string) => {
        try {
            await disconnectPlatform(platform);
        } catch {
            // Ignore if unauthenticated guest session
        }
        setConnectedPlatforms((prev) => prev.filter((p) => p.platform !== platform));
        setStats((prev) => {
            const newStats = { ...prev };
            delete newStats[platform];
            return newStats;
        });
    };

    const handleSelectTopicForDrill = (topic: string) => {
        setSelectedDrillTopic(topic);
        setActiveView("drills");
    };

    const totalSolved = (stats.codeforces?.totalSolved || 0) + (stats.leetcode?.totalSolved || 0);

    return (
        <main className="min-h-screen apple-canvas-ambient text-foreground selection:bg-blue-500/20 selection:text-blue-400">
            <Navbar />

            <section className="pt-26 pb-12 md:pt-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    {/* Top Mission Control Telemetry Strip & Spatial Mode Switcher */}
                    <CommandDeckHUD
                        activeView={activeView}
                        onViewChange={setActiveView}
                        onRefresh={fetchStats}
                        loading={loading}
                        lastSyncTime={lastSyncTime}
                        totalSolved={totalSolved}
                        streakDays={3}
                    />

                    {/* Modular Hardware Cartridge Platform Dock */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2">
                                <Radio className="w-3.5 h-3.5 text-primary" />
                                <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground font-mono">
                                    Platform Sockets Dock
                                </h2>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground">
                                {connectedPlatforms.length} of 2 Cartridges Active
                            </span>
                        </div>

                        {loadingPlatforms ? (
                            <div className="p-8 apple-glass rounded-2xl flex items-center justify-center gap-3 text-muted-foreground text-xs font-mono">
                                <RefreshCw className="animate-spin w-4 h-4 text-primary" />
                                <span>Verifying linked ecosystem sockets...</span>
                            </div>
                        ) : (
                            <PlatformConnection
                                onConnect={handleConnect}
                                onDisconnect={handleDisconnect}
                                connectedPlatforms={connectedPlatforms}
                            />
                        )}
                    </div>

                    {/* Dynamic View Engine */}
                    {activeView === "overview" && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Cockpit Telemetry (8 Columns) */}
                            <div className="lg:col-span-8 space-y-6">
                                <div className="flex items-center justify-between px-1">
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-3.5 h-3.5 text-blue-500" />
                                        <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground font-mono">
                                            Telemetry & Algorithmic Performance
                                        </h2>
                                    </div>
                                    <button 
                                        onClick={() => setActiveView("matrix")}
                                        className="text-xs text-primary hover:underline font-mono flex items-center gap-1 cursor-pointer"
                                    >
                                        <span>View Full Skill Matrix</span>
                                        <span>→</span>
                                    </button>
                                </div>

                                {loading ? (
                                    <div className="p-16 apple-glass rounded-3xl flex flex-col items-center justify-center gap-3">
                                        <RefreshCw className="animate-spin w-8 h-8 text-primary" />
                                        <p className="text-xs font-mono text-muted-foreground">Synthesizing live contest submissions...</p>
                                    </div>
                                ) : (
                                    <StatsOverview stats={stats} />
                                )}
                            </div>

                            {/* Strategic Intelligence Sidebar (4 Columns) */}
                            <div className="lg:col-span-4 space-y-4">
                                <div className="flex items-center justify-between px-1">
                                    <div className="flex items-center gap-2">
                                        <Cpu className="w-3.5 h-3.5 text-amber-500" />
                                        <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground font-mono">
                                            Strategic Intelligence
                                        </h2>
                                    </div>
                                </div>

                                <AIInsights stats={stats} />
                            </div>
                        </div>
                    )}

                    {activeView === "matrix" && (
                        <SkillMatrix
                            stats={stats}
                            onSelectTopicForDrill={handleSelectTopicForDrill}
                        />
                    )}

                    {activeView === "drills" && (
                        <AIDrillConsole
                            stats={stats}
                            initialTopic={selectedDrillTopic}
                        />
                    )}
                </div>
            </section>

            {/* Dedicated Developer Workspace Dock Status Footer */}
            <WorkspaceDock lastSyncTime={lastSyncTime} totalSolved={totalSolved} />
        </main>
    );
}
