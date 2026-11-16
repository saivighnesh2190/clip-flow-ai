"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Terminal, 
  Github, 
  Mail, 
  ArrowRight, 
  ExternalLink, 
  Code2, 
  Heart,
  ShieldCheck
} from "lucide-react";

const links = {
  architecture: [
    { label: "Capabilities", href: "#features" },
    { label: "Interactive Diagnostic", href: "#diagnostic-demo" },
    { label: "Three-Stage Ladder", href: "#how-it-works" },
    { label: "Benchmark Matrix", href: "#comparison" },
  ],
  telemetry: [
    { label: "LeetCode GraphQL", href: "https://leetcode.com", external: true },
    { label: "Codeforces REST", href: "https://codeforces.com", external: true },
    { label: "CodeChef Rankings", href: "https://codechef.com", external: true },
    { label: "Google Gemini Engine", href: "https://ai.google.dev", external: true },
  ],
  engineering: [
    { label: "GitHub Repository", href: "https://github.com/saivighnesh2190/clip-flow-ai", external: true },
    { label: "Issue Tracker", href: "https://github.com/saivighnesh2190/clip-flow-ai/issues", external: true },
    { label: "Author Profile", href: "https://github.com/saivighnesh2190", external: true },
    { label: "Contact Engineering", href: "mailto:nsaivighnesh@zohomail.in", external: true },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/60 relative">
      {/* Conversion Banner Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="apple-glass rounded-3xl p-8 sm:p-12 relative overflow-hidden apple-intelligence-aura">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-4 backdrop-blur-md">
              <Terminal className="w-3.5 h-3.5" />
              <span>Free Community Workspace</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4 font-sans">
              Ready to eliminate your DSA blind spots?
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
              Connect your public LeetCode and Codeforces handles in seconds. 
              No passwords required, no credit cards, 100% free and open-source.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button size="lg" className="h-11 px-7 text-xs sm:text-sm font-medium apple-button-prominent rounded-full" asChild>
                <Link href="/signup" className="flex items-center justify-center gap-2">
                  Launch Free Workspace
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="h-11 px-7 text-xs sm:text-sm font-medium apple-glass-pill rounded-full" asChild>
                <a 
                  href="https://github.com/saivighnesh2190/clip-flow-ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  Star on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Directory Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border/40">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info (Spans 2 cols) */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-foreground text-background flex items-center justify-center shadow-xs">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span className="text-base font-semibold tracking-tight text-foreground">
                ClipFlow AI
              </span>
            </Link>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              The high-craft DSA intelligence platform. Unified telemetry across LeetCode and Codeforces, 
              automated pattern-gap diagnostics, and zero-spoiler targeted drills.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Telemetry Nominal</span>
              </div>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground mb-4">
              Architecture
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              {links.architecture.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground mb-4">
              Telemetry
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              {links.telemetry.map((l) => (
                <li key={l.label}>
                  <a 
                    href={l.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    {l.label}
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground mb-4">
              Engineering
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              {links.engineering.map((l) => (
                <li key={l.label}>
                  <a 
                    href={l.href} 
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    {l.label}
                    {l.external && <ExternalLink className="w-2.5 h-2.5 opacity-60" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Bar */}
      <div className="border-t border-border/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
          <p>© {new Date().getFullYear()} ClipFlow AI. Engineered by N Sai Vighnesh.</p>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/saivighnesh2190/clip-flow-ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>MIT License</span>
            </a>
            <span>•</span>
            <a 
              href="mailto:nsaivighnesh@zohomail.in" 
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>nsaivighnesh@zohomail.in</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
