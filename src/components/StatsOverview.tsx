"use client";

import { Card } from "@/components/ui/card";

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
    const totalProblems =
        (stats.codeforces?.totalSolved || 0) +
        (stats.leetcode?.totalSolved || 0);

    const hasStats = stats.codeforces || stats.leetcode;

    if (!hasStats) {
        return (
            <Card className="p-8 border-border/50 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="font-semibold text-foreground mb-2">No platforms connected</h3>
                <p className="text-sm text-muted-foreground">
                    Connect your coding platforms above to see your stats
                </p>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 border-border/50 bg-gradient-to-br from-purple-start/30 to-purple-end/30">
                    <p className="text-sm text-muted-foreground">Total Solved</p>
                    <p className="text-3xl font-bold text-foreground">{totalProblems}</p>
                    <p className="text-xs text-muted-foreground">across all platforms</p>
                </Card>

                {stats.codeforces?.user && (
                    <Card className="p-4 border-border/50">
                        <p className="text-sm text-muted-foreground">Codeforces Rating</p>
                        <p className="text-2xl font-bold text-blue-500">{stats.codeforces.user.rating}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                            {stats.codeforces.user.rank} • {stats.codeforces.totalSolved} solved
                        </p>
                    </Card>
                )}

                {stats.leetcode && (
                    <Card className="p-4 border-border/50">
                        <p className="text-sm text-muted-foreground">LeetCode</p>
                        {stats.leetcode.user?.contestRating && stats.leetcode.user.contestRating > 0 ? (
                            <>
                                <p className="text-2xl font-bold text-yellow-500">
                                    {stats.leetcode.user.contestRating}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Contest Rating • #{stats.leetcode.user.contestGlobalRank?.toLocaleString() || 'N/A'}
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-2xl font-bold text-yellow-500">
                                    #{stats.leetcode.user?.ranking ? stats.leetcode.user.ranking.toLocaleString() : "N/A"}
                                </p>
                                <p className="text-xs text-muted-foreground">{stats.leetcode.totalSolved} problems solved</p>
                            </>
                        )}
                    </Card>
                )}
            </div>

            {/* LeetCode Contest Stats (if participated) */}
            {stats.leetcode?.user?.contestAttended && stats.leetcode.user.contestAttended > 0 && (
                <Card className="p-4 border-border/50 bg-gradient-to-r from-yellow-500/10 to-transparent">
                    <h4 className="font-semibold text-foreground mb-3">LeetCode Contest Stats</h4>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-yellow-500">{stats.leetcode.user.contestRating || 0}</p>
                            <p className="text-xs text-muted-foreground">Contest Rating</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-foreground">#{stats.leetcode.user.contestGlobalRank?.toLocaleString() || 'N/A'}</p>
                            <p className="text-xs text-muted-foreground">Global Rank</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-foreground">{stats.leetcode.user.contestAttended}</p>
                            <p className="text-xs text-muted-foreground">Contests</p>
                        </div>
                    </div>
                </Card>
            )}

            {/* LeetCode Difficulty Breakdown */}
            {stats.leetcode && (
                <Card className="p-4 border-border/50">
                    <h4 className="font-semibold text-foreground mb-4">LeetCode Progress</h4>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                                <span className="text-2xl font-bold text-green-500">{stats.leetcode.easySolved}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Easy</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center mb-2">
                                <span className="text-2xl font-bold text-yellow-500">{stats.leetcode.mediumSolved}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Medium</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center mb-2">
                                <span className="text-2xl font-bold text-red-500">{stats.leetcode.hardSolved}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Hard</p>
                        </div>
                    </div>
                </Card>
            )}

            {/* Codeforces Tags */}
            {stats.codeforces?.problemsByTag && Object.keys(stats.codeforces.problemsByTag).length > 0 && (
                <Card className="p-4 border-border/50">
                    <h4 className="font-semibold text-foreground mb-4">Codeforces Topics</h4>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(stats.codeforces.problemsByTag)
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 10)
                            .map(([tag, count]) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs"
                                >
                                    {tag}: {count}
                                </span>
                            ))}
                    </div>
                </Card>
            )}
        </div>
    );
}
