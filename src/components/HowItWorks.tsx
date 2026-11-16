"use client";

import { 
  Terminal, 
  Cpu, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Code2, 
  Target 
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Sync Public Handles",
    description: "Enter your public LeetCode and Codeforces handles. ClipFlow connects to platform endpoints to pull your solve history, timestamps, and rating delta without requiring passwords or sensitive OAuth access.",
    codeSnippet: "clipflow sync --leetcode=\"your_handle\" --codeforces=\"cf_handle\"",
    badge: "Read-Only Telemetry"
  },
  {
    step: "02",
    title: "Algorithmic Pattern Audit",
    description: "ClipFlow's engine classifies all solved problems into 14 core patterns. It computes your accuracy rates, identifies topics lagging behind, and cross-references gaps against interview hiring bar requirements.",
    codeSnippet: "audit.run(matrix) -> Gap: Monotonic Stack (31% coverage)",
    badge: "Gemini Analysis"
  },
  {
    step: "03",
    title: "Execute Targeted Drills",
    description: "Receive 2-3 laser-focused problems daily with target time limits, space/time constraints, and zero-spoiler progressive hints. Strengthen your weak areas systematically instead of solving random problems.",
    codeSnippet: "queue.next() -> LC 84 (Hard) [Target: 25m, Space: O(N)]",
    badge: "High-Yield Sprints"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 border-b border-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-mono text-muted-foreground mb-4">
            <Target className="w-3.5 h-3.5 text-indigo-500" />
            <span>Structured Workflow</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
            Three steps to focused preparation.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Stop grinding random questions. Follow a verified data-driven system built for engineering students and competitive programmers.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((item, idx) => (
            <div 
              key={item.step}
              className="obsidian-card rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-6 group hover:border-indigo-500/40 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-indigo-500/80">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Code Snippet Box */}
              <div className="p-3 rounded-lg bg-secondary/60 border border-border/60 font-mono text-[11px] text-muted-foreground select-all overflow-x-auto">
                <div className="flex items-center gap-1.5 text-border mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                </div>
                <code className="text-foreground/90 block whitespace-nowrap">
                  $ {item.codeSnippet}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
