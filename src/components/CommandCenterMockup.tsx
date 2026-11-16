"use client";

import { useState } from "react";
import { 
  Terminal, 
  Flame, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Code2, 
  Layers, 
  Compass,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

export default function CommandCenterMockup() {
  const [activeTab, setActiveTab] = useState<"ai-insights" | "drill" | "submissions">("ai-insights");
  const [hintOpen, setHintOpen] = useState(false);

  // Generate 7x8 heatmap sample squares
  const heatmapData = [
    [0, 1, 2, 3, 2, 4, 3],
    [1, 2, 4, 2, 3, 1, 0],
    [2, 3, 3, 4, 4, 2, 3],
    [0, 1, 3, 2, 1, 3, 4],
    [2, 4, 3, 1, 4, 3, 2],
    [3, 2, 4, 4, 3, 2, 4],
    [1, 3, 2, 4, 3, 4, 3],
  ];

  return (
    <div className="relative mx-auto max-w-5xl rounded-xl border border-border bg-card/90 shadow-2xl obsidian-card terminal-glow overflow-hidden">
      {/* OS Chrome Window Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
          </div>
          <span className="text-border mx-1">|</span>
          <span className="font-mono text-xs text-muted-foreground flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-indigo-500" />
            clipflow://workspace/telemetry-active
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LeetCode: Synced
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Codeforces: 1,620
          </span>
        </div>
      </div>

      {/* Main Terminal Grid Body */}
      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-card">
        {/* Left Col: Unified Solved Metrics & Topics (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Top User Profile Bar */}
          <div className="flex items-center justify-between p-3.5 rounded-lg bg-secondary/40 border border-border/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-mono font-bold text-indigo-400">
                SV
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  saivighnesh
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Guardian
                  </span>
                </p>
                <p className="text-xs font-mono text-muted-foreground">Rating: 1,842 (Top 4.2%)</p>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-500 font-semibold">
                <Flame className="w-3.5 h-3.5" />
                48d streak
              </div>
            </div>
          </div>

          {/* Solved Progress Overview */}
          <div className="p-4 rounded-lg bg-secondary/30 border border-border/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Unified Solved Matrix
              </span>
              <span className="text-sm font-mono font-bold text-foreground">
                407 <span className="text-xs text-muted-foreground font-normal">/ 3,310</span>
              </span>
            </div>

            {/* Segmented Progress Bar */}
            <div className="h-2 rounded-full bg-muted overflow-hidden flex gap-0.5">
              <div className="w-[35%] bg-emerald-500" title="Easy (142)" />
              <div className="w-[53%] bg-amber-500" title="Medium (218)" />
              <div className="w-[12%] bg-rose-500" title="Hard (47)" />
            </div>

            {/* Metric Items */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="p-2 rounded bg-card/60 border border-border/40 text-center">
                <span className="text-[11px] font-mono text-emerald-500 block">Easy</span>
                <span className="text-sm font-mono font-bold text-foreground">142</span>
              </div>
              <div className="p-2 rounded bg-card/60 border border-border/40 text-center">
                <span className="text-[11px] font-mono text-amber-500 block">Medium</span>
                <span className="text-sm font-mono font-bold text-foreground">218</span>
              </div>
              <div className="p-2 rounded bg-card/60 border border-border/40 text-center">
                <span className="text-[11px] font-mono text-rose-500 block">Hard</span>
                <span className="text-sm font-mono font-bold text-foreground">47</span>
              </div>
            </div>
          </div>

          {/* Topic Weakness Telemetry */}
          <div className="p-4 rounded-lg bg-secondary/30 border border-border/70 space-y-2.5">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
              Algorithmic Coverage
            </span>

            <div className="space-y-2 text-xs font-mono">
              <div>
                <div className="flex justify-between text-muted-foreground mb-1">
                  <span>Dynamic Programming</span>
                  <span className="text-foreground">82 / 120</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full w-[68%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-muted-foreground mb-1">
                  <span>Graph & BFS/DFS</span>
                  <span className="text-foreground">94 / 110</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-muted-foreground mb-1">
                  <span className="text-rose-400 font-semibold">Monotonic Stack (Gap)</span>
                  <span className="text-rose-400 font-bold">14 / 45</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full w-[31%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Gemini Algorithmic Diagnostic & Live Drill (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* Diagnostic Card Header */}
          <div className="p-4 rounded-lg border border-indigo-500/30 bg-gradient-to-br from-indigo-500/[0.08] via-card to-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-indigo-400">
                  Gemini Diagnostic Engine
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Confidence: 94%
              </span>
            </div>

            <div className="space-y-1.5">
              <p className="text-sm font-medium text-foreground">
                Critical Gap: Monotonic Stack & Sliding Window Minimums
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Telemetry indicates 3 timeout failures on LeetCode contests when processing range maximums. 
                Replacing standard queue evaluation with a monotonic deque will compress time complexity from O(N · K) to O(N).
              </p>
            </div>

            {/* Targeted Recommended Problem Drill */}
            <div className="mt-3 p-3.5 rounded-md bg-secondary/50 border border-border space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold">
                      HARD
                    </span>
                    <span className="text-xs font-semibold text-foreground">
                      84. Largest Rectangle in Histogram
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-muted-foreground">
                    Target Time: &lt; 25 mins • Expected Space: O(N)
                  </p>
                </div>

                <button 
                  onClick={() => setHintOpen(!hintOpen)}
                  className="px-2.5 py-1 text-[11px] font-mono font-medium rounded bg-secondary hover:bg-muted text-foreground border border-border transition-colors cursor-pointer"
                  aria-expanded={hintOpen}
                >
                  {hintOpen ? "Hide Hint" : "Hint [Spoiler-Free]"}
                </button>
              </div>

              {hintOpen && (
                <div className="pt-2 text-xs text-muted-foreground border-t border-border/60 animate-fade-in font-mono text-[11px] bg-card/60 p-2 rounded">
                  💡 Keep indices in stack such that values are strictly increasing. When encountering a smaller bar, pop and calculate area with the popped element as the lowest bar.
                </div>
              )}
            </div>
          </div>

          {/* Submission Heatmap Activity Grid */}
          <div className="p-3.5 rounded-lg bg-secondary/30 border border-border/70">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-muted-foreground">
                Recent Daily Submissions (48 Day Streak)
              </span>
              <span className="text-[11px] font-mono text-emerald-500 font-medium">
                Active Today (4 Solved)
              </span>
            </div>

            <div className="grid grid-flow-col grid-rows-7 gap-1.5 justify-start">
              {heatmapData.map((col, colIdx) =>
                col.map((val, rowIdx) => {
                  const colors = [
                    "bg-muted/40",
                    "bg-emerald-500/25",
                    "bg-emerald-500/50",
                    "bg-emerald-500/75",
                    "bg-emerald-500",
                  ];
                  return (
                    <div
                      key={`${colIdx}-${rowIdx}`}
                      className={`w-3.5 h-3.5 rounded-[3px] ${colors[val]} transition-transform hover:scale-125 cursor-pointer`}
                      title={`${val * 2} submissions`}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
