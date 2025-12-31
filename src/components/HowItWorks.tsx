"use client";

import { Card } from "@/components/ui/card";

const steps = [
    {
        number: "01",
        title: "Connect Your Accounts",
        description: "Link your LeetCode, CodeChef, and Codeforces profiles in seconds. No complex setup required.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "Track Your Progress",
        description: "View real-time analytics on problems solved, time spent, and topic mastery across all platforms.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "Get AI Recommendations",
        description: "Receive personalized suggestions on what to practice next based on your strengths and weaknesses.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 md:py-28 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        How It Works
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Start tracking in <span className="gradient-text">3 simple steps</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Get started in minutes and unlock the power of AI-driven coding analytics
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connection Line (Desktop) */}
                    <div className="hidden md:block absolute top-20 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

                    {steps.map((step, index) => (
                        <Card
                            key={index}
                            className="relative p-8 text-center border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card"
                        >
                            {/* Step Number */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                                {index + 1}
                            </div>

                            {/* Icon */}
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-start to-purple-end flex items-center justify-center mb-6 mt-4">
                                <div className="text-foreground">{step.icon}</div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
