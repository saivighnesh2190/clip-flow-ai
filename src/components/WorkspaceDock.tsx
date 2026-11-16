"use client";

import { Radio, Database, Shield, Terminal, Clock, RefreshCw } from "lucide-react";

interface WorkspaceDockProps {
    lastSyncTime?: string;
    totalSolved?: number;
}

export default function WorkspaceDock({ lastSyncTime = "Just now", totalSolved = 0 }: WorkspaceDockProps) {
    return (
        <footer className="mt-20 border-t border-white/10 dark:border-white/10 bg-black/30 backdrop-blur-xl py-6 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
                {/* Left: Engine & DB Status */}
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-beacon-green" />
                        <span className="text-foreground font-semibold">CLIPFLOW-CORE</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-muted-foreground">
                            v2.4-PROD
                        </span>
                    </div>

                    <span className="text-white/20 hidden sm:inline">•</span>

                    <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                        <Database className="w-3 h-3 text-emerald-400" />
                        <span>SUPABASE PG-15 (AP-SOUTH-1)</span>
                    </div>

                    <span className="text-white/20 hidden sm:inline">•</span>

                    <div className="flex items-center gap-1.5 text-[11px]">
                        <Radio className="w-3 h-3 text-blue-400" />
                        <span>TELEMETRY STREAM: 28MS PING</span>
                    </div>
                </div>

                {/* Right: Quick shortcuts & Session Telemetry */}
                <div className="flex items-center gap-4 text-[11px]">
                    <span className="hidden lg:inline text-muted-foreground">
                        SHORTCUTS: <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-foreground font-mono">⌘K</kbd> SWITCHER &nbsp; <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-foreground font-mono">R</kbd> SYNC
                    </span>
                    <span className="text-white/20 hidden lg:inline">•</span>
                    <span className="text-foreground">
                        TOTAL REPOSITORIES: <strong>{totalSolved}</strong> PROBLEMS
                    </span>
                </div>
            </div>
        </footer>
    );
}
