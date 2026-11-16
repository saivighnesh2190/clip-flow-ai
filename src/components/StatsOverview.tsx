"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    Flame, 
    Trophy, 
    Target, 
    TrendingUp, 
    CheckCircle, 
    Award, 
    Sparkles,
    Zap,
    Layers
} from "lucide-react";

interface StatsOverviewProps {
    stats: {
        codeforces?: {
            user?: { rating: number; maxRating: number; rank: string };
            totalSolved: number;
            problemsByTag?: Record<string, number>;
        };
        leetcode?: {
            user?: {
                ranking: number;
                contestRating?: number;
                contestGlobalRank?: number;
                contestAttended?: number;
            };
            totalSolved: number;
            easySolved: number;
            mediumSolved: number;
            hardSolved: number;
        };
    };
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
    const cf = stats.codeforces;
    const lc = stats.leetcode;

    const totalSolved = (cf?.totalSolved || 0) + (lc?.totalSolved || 0);
    const hasStats = Boolean(cf || lc);

    if (!hasStats) {
        return (
            <Card className="p-8 apple-glass rounded-3xl text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl apple-glass-pill flex items-center justify-center mb-4">
                    <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-1.5 tracking-tight">
                    No Telemetry Streams Connected
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    Connect your Codeforces or LeetCode accounts in the platform dock above to initiate continuous algorithmic telemetry.
                </p>
            </Card>
        );
    }

    // LeetCode calculations
    const easyCount = lc?.easySolved || 0;
    const medCount = lc?.mediumSolved || 0;
    const hardCount = lc?.hardSolved || 0;
    const lcTotal = lc?.totalSolved || (easyCount + medCount + hardCount) || 1;

    const easyPct = Math.min(100, Math.round((easyCount / (lcTotal || 1)) * 100));
    const medPct = Math.min(100, Math.round((medCount / (lcTotal || 1)) * 100));
    const hardPct = Math.min(100, Math.round((hardCount / (lcTotal || 1)) * 100));

    // Codeforces tier milestones
    const cfRating = cf?.user?.rating || 0;
    const cfMaxRating = cf?.user?.maxRating || cfRating;
    const cfRank = cf?.user?.rank || "Unrated";

    // Calculate progress to next CF rank
    // Rank milestones: Newbie (0-1199), Pupil (1200-1399), Specialist (1400-1599), Expert (1600-1899)
    let nextTierName = "Pupil";
    let nextTierRating = 1200;
    let tierBase = 0;

    if (cfRating >= 1200 && cfRating < 1400) {
        nextTierName = "Specialist";
        nextTierRating = 1400;
        tierBase = 1200;
    } else if (cfRating >= 1400 && cfRating < 1600) {
        nextTierName = "Expert";
        nextTierRating = 1600;
        tierBase = 1400;
    } else if (cfRating >= 1600 && cfRating < 1900) {
        nextTierName = "Candidate Master";
        nextTierRating = 1900;
        tierBase = 1600;
    }

    const cfTierProgress = Math.min(
        100,
        Math.max(5, Math.round(((cfRating - tierBase) / (nextTierRating - tierBase)) * 100))
    );
    const pointsNeeded = Math.max(0, nextTierRating - cfRating);

    // Top tags from Codeforces
    const tags = cf?.problemsByTag
        ? Object.entries(cf.problemsByTag)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 4)
        : [];

    return (
        <div className="space-y-6">
            {/* Bento Grid: Main Activity Overview */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Total Solved Hero Card with Apple Activity Style Rings */}
                <Card className="md:col-span-7 p-6 apple-glass rounded-3xl relative overflow-hidden flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Overall Problem Mastery
                            </span>
                        </div>
                        <Badge variant="blue" className="text-[11px] px-2.5 py-0.5">
                            Unified Telemetry
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center my-2">
                        {/* Big Metric Display */}
                        <div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl md:text-6xl font-bold tracking-tight text-foreground font-sans">
                                    {totalSolved}
                                </span>
                                <span className="text-sm font-medium text-muted-foreground">Solved</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                                Aggregated across LeetCode ({lc?.totalSolved || 0}) and Codeforces ({cf?.totalSolved || 0}).
                            </p>

                            <div className="mt-4 pt-3 border-t border-white/10 dark:border-white/10 flex items-center gap-2 text-xs text-emerald-500 font-medium">
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Active streak recorded in Supabase</span>
                            </div>
                        </div>

                        {/* Apple-style Triple Activity Rings */}
                        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] border border-white/[0.06]">
                            <div className="relative w-28 h-28 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    {/* Track Rings */}
                                    <circle cx="50" cy="50" r="40" stroke="rgba(51, 214, 159, 0.15)" strokeWidth="8" fill="none" />
                                    <circle cx="50" cy="50" r="28" stroke="rgba(255, 189, 56, 0.15)" strokeWidth="8" fill="none" />
                                    <circle cx="50" cy="50" r="16" stroke="rgba(255, 92, 122, 0.15)" strokeWidth="8" fill="none" />

                                    {/* Active Progress Rings */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        stroke="#33d69f"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        fill="none"
                                        strokeDasharray="251.2"
                                        strokeDashoffset={251.2 - (251.2 * easyPct) / 100}
                                        className="transition-all duration-1000 ease-out"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="28"
                                        stroke="#ffbd38"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        fill="none"
                                        strokeDasharray="175.9"
                                        strokeDashoffset={175.9 - (175.9 * medPct) / 100}
                                        className="transition-all duration-1000 ease-out"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="16"
                                        stroke="#ff5c7a"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        fill="none"
                                        strokeDasharray="100.5"
                                        strokeDashoffset={100.5 - (100.5 * Math.max(5, hardPct)) / 100}
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>
                                <div className="absolute text-center">
                                    <Trophy className="w-5 h-5 text-amber-400 mx-auto" />
                                </div>
                            </div>

                            {/* Ring Legend */}
                            <div className="flex items-center gap-3 mt-3 text-[11px] font-medium text-muted-foreground">
                                <span className="flex items-center gap-1 text-emerald-500">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {easyCount}E
                                </span>
                                <span className="flex items-center gap-1 text-amber-500">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {medCount}M
                                </span>
                                <span className="flex items-center gap-1 text-rose-500">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> {hardCount}H
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* LeetCode Contest Standing Card */}
                {lc ? (
                    <Card className="md:col-span-5 p-6 apple-glass rounded-3xl relative overflow-hidden flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                                    LeetCode Rating
                                </span>
                                {lc.user?.contestRating ? (
                                    <Badge variant="gold" className="text-[11px]">
                                        Contest Active
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="text-[11px]">
                                        General
                                    </Badge>
                                )}
                            </div>

                            <div className="mt-2">
                                <div className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-sans">
                                    {lc.user?.contestRating ? Math.round(lc.user.contestRating) : `#${lc.user?.ranking?.toLocaleString() || "Active"}`}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {lc.user?.contestRating ? "Global Contest ELO Rating" : "Global Acceptance Standing"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/10 dark:border-white/10 space-y-2.5">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Global Ranking</span>
                                <span className="font-mono font-medium text-foreground">
                                    #{lc.user?.contestGlobalRank?.toLocaleString() || lc.user?.ranking?.toLocaleString() || "Top Tier"}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Contests Attended</span>
                                <span className="font-mono font-medium text-foreground">
                                    {lc.user?.contestAttended ? `${lc.user.contestAttended} Participations` : "Active Participant"}
                                </span>
                            </div>
                        </div>
                    </Card>
                ) : null}
            </div>

            {/* Codeforces Spatial Rating & Rank Tier */}
            {cf?.user && (
                <Card className="p-6 apple-glass rounded-3xl relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl apple-glass-pill flex items-center justify-center">
                                <Award className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="font-semibold text-foreground text-base tracking-tight">
                                        Codeforces Standing
                                    </h4>
                                    <Badge variant="blue" className="text-[11px] capitalize">
                                        {cfRank}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Current Rating: <strong className="text-foreground">{cfRating}</strong> • Max: <strong className="text-foreground">{cfMaxRating}</strong>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-muted-foreground">
                                Target: <strong className="text-foreground">{nextTierName} ({nextTierRating})</strong>
                            </span>
                        </div>
                    </div>

                    {/* Progress Slider to Next Rank */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Rank Progression</span>
                            <span className="font-mono text-blue-500 font-semibold">
                                {pointsNeeded > 0 ? `${pointsNeeded} pts to reach ${nextTierName}` : "Milestone Attained!"}
                            </span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-white/10 dark:bg-white/10 overflow-hidden p-0.5 border border-white/10">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 transition-all duration-1000 shadow-sm"
                                style={{ width: `${cfTierProgress}%` }}
                            />
                        </div>
                    </div>

                    {/* Codeforces Tags Preview */}
                    {tags.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                            <span className="text-xs text-muted-foreground mr-1 flex items-center gap-1">
                                <Layers className="w-3.5 h-3.5" /> Top Topics:
                            </span>
                            {tags.map(([tag, count]) => (
                                <Badge key={tag} variant="outline" className="text-xs capitalize py-0.5 px-2.5">
                                    {tag} <span className="font-mono text-muted-foreground ml-1">({count})</span>
                                </Badge>
                            ))}
                        </div>
                    )}
                </Card>
            )}

            {/* LeetCode Difficulty Mastery Cards */}
            {lc && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Easy */}
                    <Card className="p-4 apple-glass rounded-2xl relative overflow-hidden">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-emerald-500">Easy Fundamentals</span>
                            <Badge variant="jade" className="text-[10px] py-0 px-2">
                                {easyPct}%
                            </Badge>
                        </div>
                        <div className="text-2xl font-bold text-foreground font-sans">
                            {easyCount}
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 mt-3 overflow-hidden">
                            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${easyPct}%` }} />
                        </div>
                    </Card>

                    {/* Medium */}
                    <Card className="p-4 apple-glass rounded-2xl relative overflow-hidden">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-amber-500">Medium Interviews</span>
                            <Badge variant="gold" className="text-[10px] py-0 px-2">
                                {medPct}%
                            </Badge>
                        </div>
                        <div className="text-2xl font-bold text-foreground font-sans">
                            {medCount}
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 mt-3 overflow-hidden">
                            <div className="h-full rounded-full bg-amber-500" style={{ width: `${medPct}%` }} />
                        </div>
                    </Card>

                    {/* Hard */}
                    <Card className="p-4 apple-glass rounded-2xl relative overflow-hidden">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-rose-500">Hard Competitions</span>
                            <Badge variant="rose" className="text-[10px] py-0 px-2">
                                {hardPct}%
                            </Badge>
                        </div>
                        <div className="text-2xl font-bold text-foreground font-sans">
                            {hardCount}
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 mt-3 overflow-hidden">
                            <div className="h-full rounded-full bg-rose-500" style={{ width: `${Math.max(4, hardPct)}%` }} />
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
