"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { getDailyStats, calculateStreak, DailyStats } from "@/lib/stats";
import { getActiveGoals, createGoal, deleteGoal, Goal } from "@/lib/goals";
import { getConnectedPlatforms } from "@/lib/profile";
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#22c55e", "#eab308", "#ef4444"];

interface PlatformStats {
    leetcode?: {
        totalSolved: number;
        easySolved: number;
        mediumSolved: number;
        hardSolved: number;
        user?: {
            ranking: number;
            contestRating?: number;
            contestGlobalRank?: number;
            contestAttended?: number;
        };
    };
    codeforces?: {
        totalSolved: number;
        user?: { rating: number };
    };
}

export default function AnalyticsPage() {
    const [loading, setLoading] = useState(true);
    const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
    const [streak, setStreak] = useState({ current: 0, longest: 0 });
    const [goals, setGoals] = useState<Goal[]>([]);
    const [platformStats, setPlatformStats] = useState<PlatformStats>({});
    const [timeRange, setTimeRange] = useState<30 | 90 | 365>(30);
    const [showGoalForm, setShowGoalForm] = useState(false);
    const [newGoal, setNewGoal] = useState<{ type: "daily" | "weekly" | "rating"; target: number }>({ type: "daily", target: 3 });
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
                return;
            }
            loadData();
        };
        checkAuth();
    }, [supabase.auth, router, timeRange]);

    const loadData = async () => {
        setLoading(true);

        // Load all data in parallel
        const [statsData, streakData, goalsData, platforms] = await Promise.all([
            getDailyStats(timeRange),
            calculateStreak(),
            getActiveGoals(),
            getConnectedPlatforms(),
        ]);

        // Fetch current platform stats for real difficulty breakdown
        const newPlatformStats: PlatformStats = {};
        for (const { platform, username } of platforms) {
            try {
                const response = await fetch(`/api/stats?platform=${platform}&username=${username}`);
                const data = await response.json();
                if (data.success) {
                    newPlatformStats[platform as 'leetcode' | 'codeforces'] = data.data;
                }
            } catch (error) {
                console.error(`Failed to fetch ${platform} stats:`, error);
            }
        }

        setDailyStats(statsData);
        setStreak(streakData);
        setGoals(goalsData);
        setPlatformStats(newPlatformStats);
        setLoading(false);
    };

    const handleCreateGoal = async () => {
        const goal = await createGoal({
            goal_type: newGoal.type,
            target_value: newGoal.target,
        });
        if (goal) {
            setGoals([goal, ...goals]);
            setShowGoalForm(false);
        }
    };

    const handleDeleteGoal = async (goalId: string) => {
        const success = await deleteGoal(goalId);
        if (success) {
            setGoals(goals.filter(g => g.id !== goalId));
        }
    };

    // Prepare chart data
    const chartData = dailyStats.map(stat => ({
        date: new Date(stat.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        problems: (stat.leetcode_solved || 0) + (stat.codeforces_solved || 0),
        leetcode: stat.leetcode_solved || 0,
        codeforces: stat.codeforces_solved || 0,
        rating: stat.codeforces_rating || stat.leetcode_rating || 0,
    }));

    // Use REAL difficulty data from LeetCode API
    const leetcodeData = platformStats.leetcode;
    const codeforcesData = platformStats.codeforces;

    // Total problems from actual platform data (not daily stats)
    const totalProblems = (leetcodeData?.totalSolved || 0) + (codeforcesData?.totalSolved || 0);

    // Real difficulty breakdown from LeetCode
    const difficultyData = leetcodeData ? [
        { name: "Easy", value: leetcodeData.easySolved || 0, color: "#22c55e" },
        { name: "Medium", value: leetcodeData.mediumSolved || 0, color: "#eab308" },
        { name: "Hard", value: leetcodeData.hardSolved || 0, color: "#ef4444" },
    ].filter(d => d.value > 0) : [];

    if (loading) {
        return (
            <main className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-32 flex items-center justify-center">
                    <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <section className="pt-28 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Analytics</h1>
                            <p className="text-muted-foreground">Track your DSA progress over time</p>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                            {[30, 90, 365].map((days) => (
                                <Button
                                    key={days}
                                    variant={timeRange === days ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setTimeRange(days as 30 | 90 | 365)}
                                >
                                    {days === 365 ? "1Y" : `${days}D`}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <Card className="p-4 border-border/50">
                            <p className="text-sm text-muted-foreground">Current Streak</p>
                            <p className="text-3xl font-bold text-foreground flex items-center gap-2">
                                {streak.current}
                                <span className="text-2xl">🔥</span>
                            </p>
                            <p className="text-xs text-muted-foreground">days</p>
                        </Card>
                        <Card className="p-4 border-border/50">
                            <p className="text-sm text-muted-foreground">Longest Streak</p>
                            <p className="text-3xl font-bold text-foreground">{streak.longest}</p>
                            <p className="text-xs text-muted-foreground">days</p>
                        </Card>
                        <Card className="p-4 border-border/50">
                            <p className="text-sm text-muted-foreground">Total Solved</p>
                            <p className="text-3xl font-bold text-primary">{totalProblems}</p>
                            <p className="text-xs text-muted-foreground">all-time</p>
                        </Card>
                        <Card className="p-4 border-border/50">
                            <p className="text-sm text-muted-foreground">Active Goals</p>
                            <p className="text-3xl font-bold text-foreground">{goals.length}</p>
                            <p className="text-xs text-muted-foreground">in progress</p>
                        </Card>
                    </div>

                    {/* Platform Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {leetcodeData && (
                            <Card className="p-4 border-border/50 bg-gradient-to-r from-yellow-500/10 to-transparent">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">🟡</span>
                                    <h3 className="font-semibold text-foreground">LeetCode</h3>
                                    {leetcodeData.user?.contestRating && leetcodeData.user.contestRating > 0 && (
                                        <span className="ml-auto px-2 py-1 bg-yellow-500/20 rounded-full text-sm font-bold text-yellow-500">
                                            Rating: {leetcodeData.user.contestRating}
                                        </span>
                                    )}
                                </div>
                                <p className="text-2xl font-bold text-foreground">{leetcodeData.totalSolved} solved</p>
                                <p className="text-sm text-muted-foreground">
                                    Easy: {leetcodeData.easySolved} • Medium: {leetcodeData.mediumSolved} • Hard: {leetcodeData.hardSolved}
                                    {leetcodeData.user?.contestAttended && leetcodeData.user.contestAttended > 0 && (
                                        <span> • {leetcodeData.user.contestAttended} contests</span>
                                    )}
                                </p>
                            </Card>
                        )}
                        {codeforcesData && (
                            <Card className="p-4 border-border/50 bg-gradient-to-r from-blue-500/10 to-transparent">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">🔵</span>
                                    <h3 className="font-semibold text-foreground">Codeforces</h3>
                                </div>
                                <p className="text-2xl font-bold text-foreground">{codeforcesData.totalSolved} solved</p>
                                <p className="text-sm text-muted-foreground">
                                    Rating: {codeforcesData.user?.rating || 'Unrated'}
                                </p>
                            </Card>
                        )}
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Problems Solved Chart */}
                        <Card className="p-6 border-border/50">
                            <h3 className="font-semibold text-foreground mb-4">Daily Activity</h3>
                            {chartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                                        <YAxis stroke="#9ca3af" fontSize={12} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
                                            labelStyle={{ color: "#fff" }}
                                        />
                                        <Bar dataKey="leetcode" stackId="a" fill="#eab308" name="LeetCode" />
                                        <Bar dataKey="codeforces" stackId="a" fill="#3b82f6" name="Codeforces" />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground mb-2">No daily activity data yet</p>
                                    <p className="text-xs text-muted-foreground">Visit your dashboard each day to track progress</p>
                                </div>
                            )}
                        </Card>

                        {/* Rating Chart */}
                        <Card className="p-6 border-border/50">
                            <h3 className="font-semibold text-foreground mb-4">Rating Progress</h3>
                            {chartData.some(d => d.rating > 0) ? (
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={chartData.filter(d => d.rating > 0)}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                                        <YAxis stroke="#9ca3af" fontSize={12} domain={['auto', 'auto']} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
                                            labelStyle={{ color: "#fff" }}
                                        />
                                        <Line type="monotone" dataKey="rating" stroke="#a855f7" strokeWidth={2} dot={{ fill: "#a855f7" }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground mb-2">No rating history yet</p>
                                    <p className="text-xs text-muted-foreground">Rating will be tracked as you visit the dashboard</p>
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* Goals & Difficulty */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Goals Section */}
                        <Card className="p-6 border-border/50">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-foreground">Goals</h3>
                                <Button size="sm" onClick={() => setShowGoalForm(!showGoalForm)}>
                                    {showGoalForm ? "Cancel" : "+ Add Goal"}
                                </Button>
                            </div>

                            {showGoalForm && (
                                <div className="mb-4 p-4 bg-muted rounded-lg">
                                    <div className="flex gap-2 mb-3">
                                        <select
                                            value={newGoal.type}
                                            onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value as "daily" | "weekly" | "rating" })}
                                            className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                                        >
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="rating">Rating</option>
                                        </select>
                                        <input
                                            type="number"
                                            value={newGoal.target}
                                            onChange={(e) => setNewGoal({ ...newGoal, target: parseInt(e.target.value) || 0 })}
                                            className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                                            placeholder="Target"
                                        />
                                        <Button size="sm" onClick={handleCreateGoal}>Create</Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {newGoal.type === "daily" && "Solve X problems today"}
                                        {newGoal.type === "weekly" && "Solve X problems this week"}
                                        {newGoal.type === "rating" && "Reach rating X"}
                                    </p>
                                </div>
                            )}

                            {goals.length > 0 ? (
                                <div className="space-y-3">
                                    {goals.map((goal) => (
                                        <div key={goal.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-foreground capitalize">
                                                    {goal.goal_type} Goal
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-primary transition-all"
                                                            style={{ width: `${Math.min((goal.current_value / goal.target_value) * 100, 100)}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">
                                                        {goal.current_value}/{goal.target_value}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-500 hover:text-red-600"
                                                onClick={() => handleDeleteGoal(goal.id)}
                                            >
                                                ✕
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-8">No active goals. Create one to track your progress!</p>
                            )}
                        </Card>

                        {/* Difficulty Distribution - REAL DATA */}
                        <Card className="p-6 border-border/50">
                            <h3 className="font-semibold text-foreground mb-4">LeetCode Difficulty</h3>
                            {difficultyData.length > 0 ? (
                                <>
                                    <div className="flex items-center justify-center">
                                        <ResponsiveContainer width="100%" height={200}>
                                            <PieChart>
                                                <Pie
                                                    data={difficultyData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {difficultyData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="flex justify-center gap-6 mt-4">
                                        {difficultyData.map((entry, index) => (
                                            <div key={entry.name} className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                                <span className="text-sm text-muted-foreground">{entry.name}: {entry.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground mb-2">Connect LeetCode to see difficulty breakdown</p>
                                    <Button variant="outline" size="sm" onClick={() => router.push('/dashboard')}>
                                        Go to Dashboard
                                    </Button>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
