import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Use Cases - ClipFlow",
    description: "How students, competitive programmers, and self-learners can use ClipFlow to track DSA progress.",
};

const useCases = [
    {
        title: "Students",
        subtitle: "Preparing for Placements",
        description: "If you are a CS undergraduate working towards your first tech job, ClipFlow gives you one dashboard for your LeetCode and Codeforces practice instead of two profile pages and a spreadsheet.",
        features: [
            "Track problems solved across difficulty levels",
            "AI suggestions on what topic to practice next",
            "Topic-wise progress for DSA fundamentals",
            "Daily and weekly goal targets",
            "Streaks to keep practice consistent",
        ],
        color: "from-purple-start to-purple-end",
        icon: "🎓",
        status: "Available",
    },
    {
        title: "Competitive Programmers",
        subtitle: "Tracking Contest Form",
        description: "Codeforces rating history and contest results are charted over time, so you can see whether your form is actually improving rather than checking your profile after each round.",
        features: [
            "Contest performance history",
            "Rating trend charts",
            "Problem difficulty progression",
            "Solved-count breakdown by tag",
        ],
        color: "from-yellow-accent to-orange-accent",
        icon: "🏆",
        status: "Available",
    },
    {
        title: "Working Professionals",
        subtitle: "Interview Prep Around a Job",
        description: "With limited practice time, the useful question is what to do tonight. The AI assistant reads your solved-problem breakdown and suggests where the next hour is best spent.",
        features: [
            "Time-boxed daily goals",
            "AI suggestions based on your weak topics",
            "Weekly progress view",
            "Single dashboard for both platforms",
        ],
        color: "from-green-400 to-emerald-500",
        icon: "💼",
        status: "Available",
    },
    {
        title: "Self-Learners",
        subtitle: "Mastering DSA Solo",
        description: "Without a mentor, the hardest part is knowing what you are weak at. ClipFlow turns your own solve history into a plain-language read on which topics you are avoiding.",
        features: [
            "AI chat assistant for progress questions",
            "Weak-topic identification",
            "Practice consistency tracking",
            "Goal setting and review",
        ],
        color: "from-amber-400 to-orange-500",
        icon: "🚀",
        status: "Available",
    },
    {
        title: "College Coding Clubs",
        subtitle: "Building a Community",
        description: "Shared leaderboards and club-wide progress views are on the roadmap. The current version is single-user only, so this is not usable yet.",
        features: [
            "Club leaderboards",
            "Member progress tracking",
            "Custom challenges",
        ],
        color: "from-pink-400 to-rose-500",
        icon: "👥",
        status: "Planned",
    },
    {
        title: "Coding Bootcamps",
        subtitle: "Cohort Tracking",
        description: "Cohort dashboards and instructor views are a roadmap idea, not a shipped feature. Nothing in this section is available today.",
        features: [
            "Cohort-wide dashboards",
            "Individual student analytics",
            "Automated progress reports",
        ],
        color: "from-blue-400 to-indigo-500",
        icon: "🏫",
        status: "Planned",
    },
];

export default function UseCasesPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
                <div className="absolute inset-0 gradient-purple opacity-20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Use Cases
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        Built for <span className="gradient-text">every coder</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        How ClipFlow fits different kinds of practice. Items marked Planned are on the roadmap and not available yet.
                    </p>
                </div>
            </section>

            {/* Use Cases Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {useCases.map((useCase, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                {/* Header */}
                                <div className={`p-6 bg-gradient-to-r ${useCase.color}`}>
                                    <div className="text-4xl mb-3">{useCase.icon}</div>
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="text-xl font-bold text-foreground">{useCase.title}</h3>
                                        <span className="text-[10px] uppercase tracking-wide font-semibold text-foreground/80 border border-foreground/30 rounded px-1.5 py-0.5 whitespace-nowrap">
                                            {useCase.status}
                                        </span>
                                    </div>
                                    <p className="text-foreground/80 text-sm">{useCase.subtitle}</p>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                                        {useCase.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {useCase.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center gap-2 text-sm">
                                                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-foreground/90">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-muted/30">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                        Ready to start your journey?
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Create a free account, connect your LeetCode and Codeforces handles, and see your
                        progress in one place.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="font-semibold px-8" asChild>
                            <Link href="/signup">Get Started Free</Link>
                        </Button>
                        <Button variant="outline" size="lg" className="font-semibold px-8" asChild>
                            <Link href="/features">Explore Features</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
