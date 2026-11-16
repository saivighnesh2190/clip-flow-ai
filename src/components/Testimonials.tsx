"use client";

import { 
  GraduationCap, 
  Trophy, 
  Briefcase, 
  Users, 
  ArrowRight,
  TrendingUp,
  Target,
  Terminal
} from "lucide-react";

const personas = [
  {
    role: "Campus Placement Sprints",
    target: "Targeting FAANG & Product Companies",
    icon: GraduationCap,
    quote: "Grinding random questions on LeetCode was burning me out. ClipFlow diagnosed that my Graph and Tree DP coverage was at 22%. Three weeks of targeted drills took me through Google and Microsoft technical rounds.",
    metric: "400+ Problems Indexed",
    badge: "Tier-1 Placement"
  },
  {
    role: "Competitive Programming Climb",
    target: "Codeforces Specialist & Candidate Master",
    icon: Trophy,
    quote: "Having my Codeforces contest delta synced side-by-side with LeetCode gives me a single place to inspect contest performance dips. The speed insights helped me break past the 1600 rating barrier.",
    metric: "1,620 Specialist",
    badge: "Rating Trajectory"
  },
  {
    role: "Structured Daily Consistency",
    target: "Engineering Students & Self-Taught Devs",
    icon: Target,
    quote: "The 45-minute daily practice queue completely removes decision fatigue. You sit down, open ClipFlow, and your two high-yield problems are already prioritized with zero spoilers.",
    metric: "48-Day Habit Streak",
    badge: "Habit Engine"
  }
];

export default function Testimonials() {
  return (
    <section id="use-cases" className="py-20 md:py-28 border-b border-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-mono text-muted-foreground mb-4">
            <Users className="w-3.5 h-3.5 text-indigo-500" />
            <span>Target Workflows</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
            Built for serious algorithmic builders.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            From university placement cycles to high-rated contest rounds, engineered for deliberate practice.
          </p>
        </div>

        {/* Persona Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.role}
                className="obsidian-card rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-indigo-500/40 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {item.role}
                    </h3>
                    <p className="text-xs font-mono text-indigo-400 mt-0.5">
                      {item.target}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60 flex items-center justify-between font-mono text-xs">
                  <span className="text-muted-foreground text-[11px]">Key Outcome:</span>
                  <span className="text-foreground font-semibold">{item.metric}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
