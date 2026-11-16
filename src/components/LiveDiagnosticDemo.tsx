"use client";

import { useState } from "react";
import { 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Terminal, 
  Layers, 
  TrendingUp, 
  ArrowRight,
  Code2,
  Clock,
  ShieldCheck,
  Target
} from "lucide-react";

interface TopicDiagnostic {
  topic: string;
  category: string;
  interviewWeight: string;
  typicalMistake: string;
  optimalMindset: string;
  targetDrills: {
    id: string;
    title: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    timeTarget: string;
    keyIdea: string;
  }[];
}

const diagnosticsData: Record<string, TopicDiagnostic> = {
  "monotonic-stack": {
    topic: "Monotonic Stack & Deque",
    category: "Arrays & Stacks",
    interviewWeight: "High (Google, Meta, Uber)",
    typicalMistake: "Falling back to O(N²) nested loops because indices were not stored alongside values.",
    optimalMindset: "Maintain invariant: elements inside the stack are strictly increasing or decreasing. A pop signifies an element has found its 'next greater' or boundary.",
    targetDrills: [
      { id: "LC 739", title: "Daily Temperatures", difficulty: "MEDIUM", timeTarget: "15 min", keyIdea: "Decreasing monotonic stack storing index differences" },
      { id: "LC 84", title: "Largest Rectangle in Histogram", difficulty: "HARD", timeTarget: "25 min", keyIdea: "Compute left and right smaller boundaries with a single pass" },
      { id: "LC 239", title: "Sliding Window Maximum", difficulty: "HARD", timeTarget: "25 min", keyIdea: "Monotonic deque removing out-of-window front elements" }
    ]
  },
  "binary-search": {
    topic: "Binary Search on Answer Space",
    category: "Searching & Optimization",
    interviewWeight: "Very High (Google, Amazon, Bloomberg)",
    typicalMistake: "Confining binary search to sorted arrays instead of recognizing monotonic predicate functions f(x) -> boolean.",
    optimalMindset: "If answer x satisfies f(x) and f is monotonically non-decreasing, the optimal answer can be searched in O(log(High - Low)).",
    targetDrills: [
      { id: "LC 875", title: "Koko Eating Bananas", difficulty: "MEDIUM", timeTarget: "15 min", keyIdea: "Search speed k in range [1, max(piles)], test feasibility in O(N)" },
      { id: "LC 1011", title: "Capacity To Ship Packages Within D Days", difficulty: "MEDIUM", timeTarget: "18 min", keyIdea: "Feasibility function f(capacity) checking ship day count <= D" },
      { id: "LC 410", title: "Split Array Largest Sum", difficulty: "HARD", timeTarget: "25 min", keyIdea: "Binary search maximum sum threshold with greedy chunking" }
    ]
  },
  "dynamic-programming": {
    topic: "Multidimensional & State DP",
    category: "Dynamic Programming",
    interviewWeight: "Critical (Goldman Sachs, Google, Atlassian)",
    typicalMistake: "Jumping directly into tabulation before writing down the recurrence relation and base conditions.",
    optimalMindset: "First formulate pure recursive state f(i, j, state). Cache it with memoization. Once verified, invert to iterative bottom-up table to optimize space.",
    targetDrills: [
      { id: "LC 1143", title: "Longest Common Subsequence", difficulty: "MEDIUM", timeTarget: "20 min", keyIdea: "2D grid state dp[i][j] comparing string heads with 1-character shifts" },
      { id: "LC 300", title: "Longest Increasing Subsequence", difficulty: "MEDIUM", timeTarget: "18 min", keyIdea: "O(N log N) patience sorting via binary search on tail array" },
      { id: "LC 72", title: "Edit Distance", difficulty: "HARD", timeTarget: "30 min", keyIdea: "Three-way transition: insert, delete, or replace character" }
    ]
  },
  "graphs": {
    topic: "Topological Sort & Disjoint Set Union",
    category: "Graph Theory",
    interviewWeight: "High (Microsoft, Amazon, Apple)",
    typicalMistake: "Using naive DFS for cycle detection in directed graphs without maintaining a recursion visiting stack.",
    optimalMindset: "For dependency ordering, use Kahn's in-degree BFS algorithm. For connected components and dynamic merging, use DSU with path compression and union by rank.",
    targetDrills: [
      { id: "LC 207", title: "Course Schedule", difficulty: "MEDIUM", timeTarget: "18 min", keyIdea: "Cycle detection via in-degree counting in Kahn's algorithm" },
      { id: "LC 684", title: "Redundant Connection", difficulty: "MEDIUM", timeTarget: "15 min", keyIdea: "DSU find-parent check: if parents match, edge creates a cycle" },
      { id: "LC 269", title: "Alien Dictionary", difficulty: "HARD", timeTarget: "28 min", keyIdea: "Build directed graph from adjacent word prefixes, run topo sort" }
    ]
  }
};

export default function LiveDiagnosticDemo() {
  const [selectedKey, setSelectedKey] = useState<string>("monotonic-stack");
  const diagnostic = diagnosticsData[selectedKey];

  return (
    <section id="diagnostic-demo" className="py-20 md:py-28 border-b border-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-mono text-muted-foreground mb-4">
            <Cpu className="w-3.5 h-3.5 text-indigo-500" />
            <span>Interactive Simulator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
            Test the algorithmic diagnostic engine.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Select an interview topic below to see how ClipFlow synthesizes weakness telemetry, 
            identifies the core misconception, and generates a structured drill path.
          </p>
        </div>

        {/* Interactive Topic Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {[
            { id: "monotonic-stack", label: "Monotonic Stack" },
            { id: "binary-search", label: "Binary Search on Answer" },
            { id: "dynamic-programming", label: "State Dynamic Programming" },
            { id: "graphs", label: "Topological Sort & DSU" },
          ].map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedKey(topic.id)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedKey === topic.id
                  ? "bg-foreground text-background shadow-sm scale-102"
                  : "bg-secondary/70 text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50"
              }`}
            >
              {topic.label}
            </button>
          ))}
        </div>

        {/* Diagnostic Output Card */}
        <div className="obsidian-card rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
          {/* Card Top Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <span className="text-base font-semibold text-foreground">
                  {diagnostic.topic}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                  {diagnostic.category}
                </span>
              </div>
              <p className="text-xs font-mono text-indigo-500 font-medium">
                Interview Weighting: {diagnostic.interviewWeight}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Automated Drill Ready</span>
            </div>
          </div>

          {/* Core Misconception & Mindset Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-border">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-rose-400">
                <span>⚠️ Common Pitfall Diagnosed:</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {diagnostic.typicalMistake}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400">
                <span>💡 Correct Intuitive Model:</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {diagnostic.optimalMindset}
              </p>
            </div>
          </div>

          {/* Generated High-Yield Practice Queue */}
          <div className="pt-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Curated Targeted Practice Drill (3-Stage Ladder)
            </h4>

            <div className="space-y-3">
              {diagnostic.targetDrills.map((drill, idx) => (
                <div 
                  key={drill.id}
                  className="p-3.5 rounded-lg bg-secondary/40 border border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-indigo-500/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-muted-foreground w-6">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-foreground">
                          {drill.id}: {drill.title}
                        </span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                          drill.difficulty === "HARD"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                        }`}>
                          {drill.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Key idea: {drill.keyIdea}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground self-end sm:self-center">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {drill.timeTarget}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
