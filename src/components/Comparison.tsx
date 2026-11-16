"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  X, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Zap,
  BarChart2
} from "lucide-react";

const matrixData = [
  { feature: "Multi-Platform Telemetry (LC + CF)", clipflow: true, sheets: false, premium: false, genericAi: false },
  { feature: "Zero Passwords / No OAuth Required", clipflow: true, sheets: true, premium: true, genericAi: true },
  { feature: "Automated Pattern Gap Diagnostics", clipflow: true, sheets: false, premium: false, genericAi: "Manual" },
  { feature: "Zero-Spoiler Stepwise Hints", clipflow: true, sheets: false, premium: false, genericAi: "Unreliable" },
  { feature: "Contest Rating & Trend Analytics", clipflow: true, sheets: "Manual", premium: false, genericAi: false },
  { feature: "100% Free Core Access", clipflow: true, sheets: true, premium: false, genericAi: "Limited" },
];

const plans = [
  {
    name: "Community Core",
    price: "$0",
    period: "forever free",
    description: "Full telemetry, pattern diagnostics, and daily drills for student engineers.",
    features: [
      "LeetCode & Codeforces sync",
      "Unified Solved Matrix & topic coverage",
      "Gemini pattern gap diagnostics",
      "Daily targeted practice queues",
      "Contest rating trajectory tracking",
      "Community GitHub support",
    ],
    cta: "Launch Workspace Free",
    href: "/signup",
    popular: true,
  },
  {
    name: "Placement Pro",
    price: "$5",
    period: "per month",
    description: "Deep mock interviews, automated Big-O code audits, and team study rooms.",
    features: [
      "Everything in Community Core",
      "Unlimited deep Gemini code audits",
      "Company-specific mock question ladders",
      "Shared cohort leaderboards & club views",
      "Priority API telemetry synchronization",
      "Direct Discord engineering access",
    ],
    cta: "Coming Soon (Beta)",
    href: "/signup",
    popular: false,
  },
];

export default function Comparison() {
  return (
    <section id="comparison" className="py-20 md:py-28 border-b border-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-mono text-muted-foreground mb-4">
            <BarChart2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>Competitive Benchmark</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
            Why engineers switch to ClipFlow.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Compare manual spreadsheets, expensive subscriptions, and generic LLM chats against a dedicated algorithmic engine.
          </p>
        </div>

        {/* Feature Comparison Table */}
        <div className="obsidian-card rounded-xl overflow-x-auto mb-16">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="p-4 text-muted-foreground font-semibold">CAPABILITY</th>
                <th className="p-4 text-indigo-400 font-bold bg-indigo-500/10">CLIPFLOW AI</th>
                <th className="p-4 text-muted-foreground font-normal">EXCEL / SHEETS</th>
                <th className="p-4 text-muted-foreground font-normal">LEETCODE PREMIUM</th>
                <th className="p-4 text-muted-foreground font-normal">GENERIC CHATGPT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {matrixData.map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-sans text-xs font-medium text-foreground">
                    {row.feature}
                  </td>
                  <td className="p-4 bg-indigo-500/[0.04]">
                    <div className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                      <Check className="w-4 h-4 text-indigo-500" />
                      <span>Native</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {typeof row.sheets === "boolean" ? (
                      row.sheets ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-muted-foreground/40" />
                    ) : (
                      <span>{row.sheets}</span>
                    )}
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {typeof row.premium === "boolean" ? (
                      row.premium ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-muted-foreground/40" />
                    ) : (
                      <span>{row.premium}</span>
                    )}
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {typeof row.genericAi === "boolean" ? (
                      row.genericAi ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-muted-foreground/40" />
                    ) : (
                      <span>{row.genericAi}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`obsidian-card rounded-xl p-6 sm:p-8 flex flex-col justify-between relative ${
                plan.popular ? "border-indigo-500/50 shadow-indigo-500/5" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-6">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500 text-white shadow-sm">
                    Recommended for Students
                  </span>
                </div>
              )}

              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                  <div className="text-right">
                    <span className="text-3xl font-bold font-mono text-foreground">{plan.price}</span>
                    <span className="text-xs font-mono text-muted-foreground ml-1.5">/{plan.period}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                  {plan.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-border/60">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-2">
                    Included capabilities:
                  </span>
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5 text-xs text-foreground">
                      <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Button
                  className={`w-full h-10 text-xs font-medium ${
                    plan.popular
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "bg-secondary text-foreground hover:bg-muted border border-border"
                  }`}
                  asChild
                >
                  <Link href={plan.href} className="flex items-center justify-center gap-1.5">
                    {plan.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
