"use client";

import { 
  Terminal, 
  Cpu, 
  Zap, 
  TrendingUp, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  Flame, 
  Code2, 
  Compass, 
  BarChart3,
  Lightbulb,
  ArrowRight
} from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28 border-b border-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-mono text-muted-foreground mb-4">
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            <span>Architecture & Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
            Engineered for algorithmic mastery.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Eliminate the guesswork of interview prep with structured data pipelines, automated diagnosis, and targeted execution.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Multi-Platform (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 obsidian-card rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 mb-6">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                Unified Multi-Platform Telemetry
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mb-6">
                Connect your public handles from LeetCode and Codeforces. ClipFlow aggregates your complete solve history, 
                contest submissions, and difficulty distributions into a single, clean telemetry pipeline without requiring credentials.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-border/60 font-mono text-xs">
              <div className="p-3 rounded-lg bg-secondary/50 border border-border/50">
                <span className="text-muted-foreground block text-[11px]">LeetCode Sync</span>
                <span className="text-foreground font-semibold">GraphQL Engine</span>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50 border border-border/50">
                <span className="text-muted-foreground block text-[11px]">Codeforces Sync</span>
                <span className="text-foreground font-semibold">Official REST API</span>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 rounded-lg bg-secondary/50 border border-border/50">
                <span className="text-muted-foreground block text-[11px]">CodeChef Sync</span>
                <span className="text-indigo-400 font-semibold">Native Parser</span>
              </div>
            </div>
          </div>

          {/* Card 2: AI Pattern Gap Detection */}
          <div className="obsidian-card rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 mb-6">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                Pattern Gap Diagnostics
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Gemini analyzes your solved breakdown by algorithmic paradigm to spot hidden blind spots—like 
                lagging behind on Monotonic Stacks, Bitmask DP, or Tree Path Sums.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-secondary/50 border border-border/50 font-mono text-xs text-muted-foreground">
              <div className="flex items-center justify-between text-indigo-400 mb-1">
                <span>Diagnostic Accuracy</span>
                <span>94.8%</span>
              </div>
              <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full w-[94%]" />
              </div>
            </div>
          </div>

          {/* Card 3: Contest Rating Progression */}
          <div className="obsidian-card rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 mb-6">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                Contest Rating Trajectory
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track your rating variance across Codeforces rounds and LeetCode bi-weekly contests. Measure your true velocity toward Guardian and Specialist tiers.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3 font-mono text-xs">
              <div className="flex items-center gap-1.5 text-emerald-500">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+142 Rating Delta</span>
              </div>
              <span className="text-border">|</span>
              <span className="text-muted-foreground">Last 6 Contests</span>
            </div>
          </div>

          {/* Card 4: Progressive Zero-Spoiler Hints */}
          <div className="obsidian-card rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 mb-6">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                Zero-Spoiler Progressive Hints
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Stuck on a Hard problem? Receive structured 3-tier nudges: Invariant hint first, Complexity constraint second, Pseudo-code architecture last.
              </p>
            </div>

            <div className="mt-6 space-y-1.5 font-mono text-[11px]">
              <div className="px-2.5 py-1 rounded bg-secondary/80 text-muted-foreground border border-border/50">
                Level 1: Core Mathematical Invariant
              </div>
              <div className="px-2.5 py-1 rounded bg-secondary/80 text-muted-foreground border border-border/50">
                Level 2: Time/Space Complexity Boundary
              </div>
            </div>
          </div>

          {/* Card 5: Placement & Core Company Alignment (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 obsidian-card rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 mb-6">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                Placement & Interview Readiness Index
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mb-6">
                Evaluate your problem distribution against verified interview rubrics for top tier tech firms. 
                Focus on the 70 high-yield patterns that constitute 85% of technical screening rounds.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-border/60 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-secondary/40 border border-border/40 text-center">
                <span className="text-muted-foreground block text-[10px]">Google Core</span>
                <span className="text-emerald-500 font-bold">88% Ready</span>
              </div>
              <div className="p-2.5 rounded-lg bg-secondary/40 border border-border/40 text-center">
                <span className="text-muted-foreground block text-[10px]">Amazon High-Yield</span>
                <span className="text-emerald-500 font-bold">92% Ready</span>
              </div>
              <div className="p-2.5 rounded-lg bg-secondary/40 border border-border/40 text-center">
                <span className="text-muted-foreground block text-[10px]">Meta Dynamic Prog</span>
                <span className="text-amber-500 font-bold">74% Ready</span>
              </div>
              <div className="p-2.5 rounded-lg bg-secondary/40 border border-border/40 text-center">
                <span className="text-muted-foreground block text-[10px]">Uber Graphs & DSU</span>
                <span className="text-emerald-500 font-bold">86% Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
