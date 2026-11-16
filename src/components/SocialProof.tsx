"use client";

import { 
  Terminal, 
  Code2, 
  Cpu, 
  Shield, 
  GitBranch, 
  Database,
  Layers,
  Sparkles
} from "lucide-react";

const stats = [
  { value: "400+", label: "Verified Problem Patterns" },
  { value: "0ms", label: "Credential Exposure (Public Telemetry)" },
  { value: "14", label: "Core Algorithmic Classifications" },
  { value: "100%", label: "Free & Open Source on GitHub" },
];

const platforms = [
  {
    name: "LeetCode",
    type: "GraphQL Sync",
    status: "Live & Active",
    statusColor: "text-emerald-500",
    badge: "LC API"
  },
  {
    name: "Codeforces",
    type: "Contest REST API",
    status: "Live & Active",
    statusColor: "text-emerald-500",
    badge: "CF API"
  },
  {
    name: "CodeChef",
    type: "Rankings Parser",
    status: "In Staging",
    statusColor: "text-amber-500",
    badge: "CC Beta"
  },
  {
    name: "Gemini 2.5",
    type: "Algorithmic Diagnostic",
    status: "Production",
    statusColor: "text-indigo-400",
    badge: "Google AI"
  }
];

export default function SocialProof() {
  return (
    <section className="py-16 md:py-24 border-b border-border/40 relative bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Platform Integration Ticker */}
        <div className="text-center mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Synchronized Platforms & Algorithmic Engines
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="p-4 rounded-xl obsidian-card flex flex-col justify-between hover:border-indigo-500/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-foreground">
                    {p.name}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                    {p.badge}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  {p.type}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-border/60 flex items-center gap-1.5 text-[11px] font-mono">
                <span className={`w-1.5 h-1.5 rounded-full ${p.statusColor === 'text-emerald-500' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <span className={p.statusColor}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Verifiable Architecture Telemetry Facts */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center max-w-5xl mx-auto pt-8 border-t border-border/40">
          {stats.map((s) => (
            <div key={s.label} className="p-3">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground mb-1">
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
