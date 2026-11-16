"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Terminal, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Flame, 
  Code2, 
  Activity, 
  Compass,
  Cpu
} from "lucide-react";
import CommandCenterMockup from "@/components/CommandCenterMockup";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-border/40">
      {/* Precision Background Grid Overlay */}
      <div className="absolute inset-0 grid-subtle pointer-events-none opacity-40 dark:opacity-25" />

      {/* Subtle Radial Atmosphere Accent (Anti-slop, no cheesy floating blobs) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border text-xs font-mono text-muted-foreground backdrop-blur-sm shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-foreground font-medium">ClipFlow Engine v2.4</span>
            <span className="text-border">|</span>
            <span className="text-muted-foreground hidden sm:inline">Precision Algorithmic Analytics</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-foreground leading-[1.08] mb-6">
            Master DSA without the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-indigo-400 to-purple-400">
              blind spots.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-normal">
            Unified telemetry across LeetCode and Codeforces. Automated pattern-gap diagnostics, 
            contest rating analytics, and zero-spoiler targeted problem drills.
          </p>
        </div>

        {/* Call to Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
          <Button 
            size="lg" 
            className="w-full sm:w-auto h-11 px-6 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 shadow-sm transition-all hover:scale-[1.01]" 
            asChild
          >
            <Link href="/signup" className="flex items-center gap-2">
              Connect Handles Free
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>
          </Button>

          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto h-11 px-6 text-sm font-medium border-border/80 text-foreground hover:bg-muted/60 transition-colors"
            asChild
          >
            <a href="#diagnostic-demo" className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-500" />
              Test Live Diagnostic
            </a>
          </Button>
        </div>

        {/* Technical Trust Spec Matrix */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-mono text-muted-foreground mb-16">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Zero Passwords Required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>100% Free & Open Source</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Gemini Algorithmic Diagnostic</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>LeetCode & Codeforces Live Sync</span>
          </div>
        </div>

        {/* Real Product Command Center Preview (App-Frame) */}
        <CommandCenterMockup />
      </div>
    </section>
  );
}
