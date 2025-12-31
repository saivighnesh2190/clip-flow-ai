"use client";

import { useState } from "react";

const faqs = [
    {
        question: "How does ClipFlow track my progress across platforms?",
        answer: "ClipFlow securely connects to your LeetCode, CodeChef, and Codeforces accounts using their public APIs. We sync your problem-solving data automatically, providing you with unified analytics across all platforms in one dashboard.",
    },
    {
        question: "Is my data secure and private?",
        answer: "Absolutely. We use industry-standard encryption and never store your platform passwords. Your data is only accessible to you, and you can delete your account and all associated data at any time.",
    },
    {
        question: "What makes the AI recommendations work?",
        answer: "Our AI analyzes your problem-solving patterns, success rates, time spent per topic, and weak areas. It then recommends problems that will help you improve most efficiently, focusing on topics where you need the most practice.",
    },
    {
        question: "Can I use ClipFlow for free?",
        answer: "Yes! Our free tier includes progress tracking for one platform, basic analytics, and weekly AI insights. Upgrade to Pro for multi-platform sync, advanced analytics, and daily personalized recommendations.",
    },
    {
        question: "How often does the data sync?",
        answer: "For Pro users, data syncs in real-time as you solve problems. Free tier users get hourly syncs. You can also manually trigger a sync anytime from your dashboard.",
    },
    {
        question: "Does ClipFlow work for competitive programming?",
        answer: "Yes! We have specific features for competitive programmers, including contest performance tracking, rating predictions, and comparison with friends. Many Codeforces Masters and Grandmasters use ClipFlow.",
    },
    {
        question: "Can I track my friend's progress?",
        answer: "With our Teams feature, you can create study groups, share progress, and compete on leaderboards. Great for college coding clubs and interview prep groups.",
    },
    {
        question: "What platforms do you support?",
        answer: "Currently we support LeetCode, Codeforces, CodeChef, HackerRank, and GeeksforGeeks. We're actively working on adding more platforms based on user requests.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-20 md:py-28 bg-muted/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        FAQ
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Frequently asked <span className="gradient-text">questions</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to know about ClipFlow
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-card border border-border/50 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                            >
                                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                                <svg
                                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96" : "max-h-0"
                                    }`}
                            >
                                <p className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="text-center mt-12">
                    <p className="text-muted-foreground">
                        Still have questions?{" "}
                        <a href="/contact" className="text-primary font-medium hover:underline">
                            Contact our support team
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
