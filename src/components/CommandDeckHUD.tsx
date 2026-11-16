"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    Activity, 
    Flame, 
    Clock, 
    RefreshCw, 
    Cpu, 
    Terminal, 
    Layers, 
    Sparkles,
    SlidersHorizontal,
    Radio
} from "lucide-react";

interface CommandDeckHUDProps {
    activeView: "overview" | "matrix" | "drills";
    onViewChange: (view: "overview" | "matrix" | "drills") => void;
    onRefresh: () => void;
    loading: boolean;
    lastSyncTime: string;
    totalSolved: number;
    streakDays?: number;
}

export default function CommandDeckHUD({
    activeView,
    onViewChange,
    onRefresh,
    loading,
    lastSyncTime,
    totalSolved,
    streakDays = 3,
}: CommandDeckHUDProps) {
    return (
        <div className="w-full space-y-4">
            {/* Mission Control Top Telemetry Ticker */}
            <div className="apple-glass rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs border border-white/10 dark:border-white/10">
                {/* Left: Stream Beacon & Latency */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 status-beacon-green animate-pulse" />
                        <span className="font-mono font-medium tracking-wider text-emerald-600 dark:text-emerald-400 text-[11px] uppercase">
                            Telemetry Nominal
                        </span>
                    </div>
                    <span className="text-white/20 hidden sm:inline">•</span>
                    <span className="text-muted-foreground font-mono text-[11px] hidden sm:inline">
                        Updated {lastSyncTime}
                    </span>
                </div>

                {/* Center: Live Contest Ticker */}
                <div className="hidden md:flex items-center gap-4 text-muted-foreground font-mono text-[11px]">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>Next Contest: <strong className="text-foreground">Codeforces Div. 2</strong> in <span className="text-blue-400">1d 14h</span></span>
                    </div>
                    <span className="text-white/20">•</span>
                    <div className="flex items-center gap-1.5 text-amber-500">
                        <Flame className="w-3.5 h-3.5 fill-amber-500" />
                        <span className="font-semibold text-foreground">{streakDays}d Streak Active</span>
                    </div>
                </div>

                {/* Right: Quick Refresh */}
                <div className="flex items-center gap-2">
                    <Button
                        onClick={onRefresh}
                        disabled={loading}
                        variant="outline"
                        size="sm"
                        className="h-7 px-3 rounded-full apple-glass-pill text-[11px] font-medium text-foreground hover:bg-white/10"
                    >
                        <RefreshCw className={`w-3 h-3 mr-1.5 ${loading ? "animate-spin text-primary" : ""}`} />
                        {loading ? "Syncing..." : "Sync Stream"}
                    </Button>
                </div>
            </div>

            {/* Tactical View Switcher Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground font-sans flex items-center gap-2.5">
                        <span>Algorithmic Cockpit</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/10 font-mono text-muted-foreground border border-white/10">
                            v2.4
                        </span>
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Unified Competitive Programming telemetry across LeetCode & Codeforces.
                    </p>
                </div>

                {/* Spatial Segment Switcher */}
                <div className="tactical-switcher flex items-center self-start md:self-auto">
                    <button
                        onClick={() => onViewChange("overview")}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                            activeView === "overview"
                                ? "apple-button-prominent text-white shadow-xs"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <Activity className="w-3.5 h-3.5" />
                        <span>Cockpit</span>
                    </button>
                    <button
                        onClick={() => onViewChange("matrix")}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                            activeView === "matrix"
                                ? "apple-button-prominent text-white shadow-xs"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Skill Matrix</span>
                    </button>
                    <button
                        onClick={() => onViewChange("drills")}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                            activeView === "drills"
                                ? "apple-button-prominent text-white shadow-xs"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Drill Co-Pilot</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
