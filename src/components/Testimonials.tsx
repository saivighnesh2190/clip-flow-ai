"use client";

import { Card } from "@/components/ui/card";

const useCases = [
    {
        title: "Interview preparation",
        icon: "🎯",
        description:
            "Pull your LeetCode and Codeforces history into one dashboard so you can see which topics you have actually covered before an interview loop.",
        platform: "LeetCode",
    },
    {
        title: "Finding weak topics",
        icon: "🔍",
        description:
            "The Gemini-powered assistant reads your solved-problem breakdown and points out topics you are under-practicing, such as graphs or DP.",
        platform: "AI Insights",
    },
    {
        title: "Staying consistent",
        icon: "🔥",
        description:
            "Daily streaks and goal targets turn scattered practice into a habit you can measure week over week instead of guessing.",
        platform: "Goals",
    },
    {
        title: "Contest rating tracking",
        icon: "📈",
        description:
            "Rating history from Codeforces is charted over time, so contest performance trends are visible instead of buried in profile pages.",
        platform: "Codeforces",
    },
    {
        title: "One dashboard, no spreadsheets",
        icon: "📊",
        description:
            "Replace the manual progress spreadsheet with an automatic sync that pulls public profile data from each platform.",
        platform: "Dashboard",
    },
    {
        title: "Study groups and clubs",
        icon: "👥",
        description:
            "Planned: shared progress views for college coding clubs and interview-prep groups. Not available yet.",
        platform: "Roadmap",
    },
];

export default function Testimonials() {
    return (
        <section id="use-cases" className="py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Use Cases
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Built for <span className="gradient-text">serious DSA learners</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        How ClipFlow fits into a real interview-preparation workflow
                    </p>
                </div>

                {/* Use Case Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {useCases.map((useCase, index) => (
                        <Card
                            key={index}
                            className="p-6 border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="text-3xl mb-4">{useCase.icon}</div>
                            <h3 className="font-semibold text-foreground mb-2">{useCase.title}</h3>
                            <p className="text-foreground/80 text-sm leading-relaxed">
                                {useCase.description}
                            </p>
                            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border/50">
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                    {useCase.platform}
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
