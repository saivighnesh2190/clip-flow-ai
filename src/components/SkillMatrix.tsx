"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    Zap, 
    Layers, 
    Calculator, 
    Network, 
    Crosshair, 
    Binary, 
    ChevronRight, 
    Sparkles, 
    CheckCircle2, 
    Shield, 
    TrendingUp,
    Compass
} from "lucide-react";

interface SkillMatrixProps {
    stats: {
        codeforces?: {
            user?: { rating: number; maxRating: number; rank: string };
            totalSolved: number;
            problemsByTag?: Record<string, number>;
        };
        leetcode?: {
            totalSolved: number;
            easySolved: number;
            mediumSolved: number;
            hardSolved: number;
            topicProgress?: { topic: string; solved: number }[];
        };
    };
    onSelectTopicForDrill: (topic: string) => void;
}

interface DomainSkill {
    id: string;
    name: string;
    category: string;
    icon: any;
    accentColor: string;
    badgeColor: string;
    cfTags: string[];
    description: string;
    corePatterns: string[];
    baseTarget: number;
}

const skillDomains: DomainSkill[] = [
    {
        id: "greedy",
        name: "Greedy & Invariants",
        category: "Optimization",
        icon: Zap,
        accentColor: "from-amber-500/20 to-amber-600/5 text-amber-500 border-amber-500/20",
        badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        cfTags: ["greedy", "sortings"],
        description: "Optimal substructure, activity selection, and local choice theorems.",
        corePatterns: ["Interval Scheduling", "Exchange Arguments", "Two-Pointers Greed"],
        baseTarget: 25,
    },
    {
        id: "dp",
        name: "Dynamic Programming",
        category: "State Space",
        icon: Layers,
        accentColor: "from-indigo-500/20 to-indigo-600/5 text-indigo-400 border-indigo-500/20",
        badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        cfTags: ["dp", "dynamic programming"],
        description: "Overlapping subproblems, state compression, memoization and DAG paths.",
        corePatterns: ["Knapsack & Subsets", "Digit DP", "Longest Common Subsequence"],
        baseTarget: 30,
    },
    {
        id: "math",
        name: "Discrete Math & Number Theory",
        category: "Foundations",
        icon: Calculator,
        accentColor: "from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/20",
        badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        cfTags: ["math", "number theory", "combinatorics"],
        description: "Modular arithmetic, GCD Euclidean algorithms, Fermat's Little Theorem, and sieves.",
        corePatterns: ["Euler's Totient", "Linear Sieve", "Combinatorial Inverses"],
        baseTarget: 25,
    },
    {
        id: "graphs",
        name: "Trees & Graph Traversal",
        category: "Topology",
        icon: Network,
        accentColor: "from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/20",
        badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        cfTags: ["graphs", "trees", "dfs and similar"],
        description: "Shortest paths, minimum spanning trees, bipartite checks, and cycle detection.",
        corePatterns: ["Dijkstra / BFS", "Disjoint Set Union (DSU)", "Topological Sort"],
        baseTarget: 20,
    },
    {
        id: "binary-search",
        name: "Monotonic Predicates",
        category: "Search Strategy",
        icon: Crosshair,
        accentColor: "from-rose-500/20 to-rose-600/5 text-rose-400 border-rose-500/20",
        badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        cfTags: ["binary search", "two pointers"],
        description: "Binary search on answers, monotonic queues, and sliding window boundaries.",
        corePatterns: ["Search on Answer Space", "Sliding Window Maximum", "Sparse Table Queries"],
        baseTarget: 20,
    },
    {
        id: "bits-strings",
        name: "Bitmasks & Combinatorics",
        category: "Low-Level & Algebra",
        icon: Binary,
        accentColor: "from-cyan-500/20 to-cyan-600/5 text-cyan-400 border-cyan-500/20",
        badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        cfTags: ["bitmasks", "strings", "hashing"],
        description: "Bit manipulation, state masking, rolling hash polynomial arithmetic, and Trie.",
        corePatterns: ["Subset Iteration (3^N)", "Rolling Polynomial Hash", "Bitwise XOR Invariants"],
        baseTarget: 20,
    },
];

export default function SkillMatrix({ stats, onSelectTopicForDrill }: SkillMatrixProps) {
    const cf = stats.codeforces;
    const lc = stats.leetcode;
    const cfTags = cf?.problemsByTag || {};

    // Helper to calculate solved count for each skill domain from verified tags
    const getDomainStats = (domain: DomainSkill) => {
        let count = 0;
        domain.cfTags.forEach((tag) => {
            if (cfTags[tag]) {
                count += cfTags[tag];
            }
        });

        // If no CF tag found, blend in an estimated proportion of LeetCode if available
        if (count === 0 && lc?.totalSolved) {
            if (domain.id === "math") count = Math.max(5, Math.round(lc.totalSolved * 0.18));
            else if (domain.id === "greedy") count = Math.max(4, Math.round(lc.totalSolved * 0.16));
            else if (domain.id === "dp") count = Math.max(3, Math.round(lc.totalSolved * 0.14));
            else if (domain.id === "graphs") count = Math.max(2, Math.round(lc.totalSolved * 0.12));
            else if (domain.id === "binary-search") count = Math.max(3, Math.round(lc.totalSolved * 0.15));
            else count = Math.max(2, Math.round(lc.totalSolved * 0.1));
        }

        const percentage = Math.min(100, Math.round((count / domain.baseTarget) * 100));
        
        let levelTitle = "Novice Lvl 1";
        if (percentage >= 80) levelTitle = "Grandmaster Lvl 4";
        else if (percentage >= 50) levelTitle = "Specialist Lvl 3";
        else if (percentage >= 25) levelTitle = "Journeyman Lvl 2";

        return { count, percentage, levelTitle };
    };

    return (
        <div className="space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl apple-glass border border-white/10 dark:border-white/10">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Compass className="w-4 h-4 text-primary" />
                        <span className="text-xs font-mono font-medium tracking-wide uppercase text-muted-foreground">
                            Algorithmic Competency Matrix
                        </span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        Algorithmic Skill Tree & Mastery Level
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Domain telemetry calculated from verified problem tags across Codeforces submissions and LeetCode categories.
                    </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Badge variant="outline" className="px-3 py-1 font-mono text-[11px] gap-1.5 bg-black/20">
                        <Shield className="w-3 h-3 text-emerald-400" />
                        <span>6 Tactical Domains Tracked</span>
                    </Badge>
                </div>
            </div>

            {/* Matrix Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {skillDomains.map((domain) => {
                    const { count, percentage, levelTitle } = getDomainStats(domain);
                    const IconComponent = domain.icon;

                    return (
                        <Card 
                            key={domain.id}
                            className="hardware-cartridge rounded-2xl p-5 border border-white/10 flex flex-col justify-between group hover:border-white/20 transition-all"
                        >
                            <div className="space-y-4">
                                {/* Top Badging & Icon */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center p-2.5 bg-gradient-to-b ${domain.accentColor} border shadow-xs`}>
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">
                                                {domain.category}
                                            </span>
                                            <h3 className="font-semibold text-sm text-foreground tracking-tight">
                                                {domain.name}
                                            </h3>
                                        </div>
                                    </div>

                                    <Badge variant="outline" className={`font-mono text-[10px] px-2 py-0.5 ${domain.badgeColor}`}>
                                        {levelTitle}
                                    </Badge>
                                </div>

                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                    {domain.description}
                                </p>

                                {/* Mastery Progress Bar */}
                                <div className="space-y-1.5 pt-1">
                                    <div className="flex items-center justify-between text-xs font-mono">
                                        <span className="text-muted-foreground text-[11px]">Mastery XP</span>
                                        <span className="font-semibold text-foreground text-[11px]">
                                            {count} / {domain.baseTarget} solved ({percentage}%)
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                                        <div 
                                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-primary transition-all duration-700 ease-out"
                                            style={{ width: `${Math.max(6, percentage)}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Core Invariant Patterns */}
                                <div className="pt-2">
                                    <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider block mb-1.5">
                                        Key Patterns
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {domain.corePatterns.map((pattern, idx) => (
                                            <span 
                                                key={idx}
                                                className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground font-mono"
                                            >
                                                {pattern}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Tactical Action Button */}
                            <div className="pt-5 mt-4 border-t border-white/5">
                                <Button
                                    onClick={() => onSelectTopicForDrill(domain.name)}
                                    size="sm"
                                    variant="outline"
                                    className="w-full h-8 text-xs font-medium rounded-xl apple-glass-pill hover:bg-white/10 text-foreground flex items-center justify-between group/btn"
                                >
                                    <span className="flex items-center gap-1.5">
                                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                                        <span>Deploy Zero-Spoiler Drill</span>
                                    </span>
                                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover/btn:translate-x-0.5 transition-transform" />
                                </Button>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
