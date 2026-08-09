"use client";

import { useState } from "react";

const faqs = [
    {
        question: "How does ClipFlow track my progress across platforms?",
        answer: "You enter your public LeetCode and Codeforces handles. ClipFlow reads the publicly available profile data for those handles and combines it into a single dashboard. It never asks for your platform passwords, because it does not need them.",
    },
    {
        question: "Is my data secure and private?",
        answer: "ClipFlow only stores your account details and the public handles you connect, using Supabase with row-level security so your rows are only readable by you. No platform passwords are collected or stored, and you can delete your account and its data at any time.",
    },
    {
        question: "What makes the AI recommendations work?",
        answer: "Your solved-problem breakdown by topic and difficulty is sent to the Google Gemini API with a prompt describing your current progress. Gemini returns suggestions on which topics to focus on next. It is a language model reading your stats, not a trained recommendation engine.",
    },
    {
        question: "Can I use ClipFlow for free?",
        answer: "Yes. Progress tracking, the analytics dashboard, goals, and AI insights are all usable for free. Paid tiers are listed on the pricing page as a planned feature, but payment processing is not live yet.",
    },
    {
        question: "How often does the data sync?",
        answer: "Data is fetched when you load your dashboard or trigger a manual refresh. There is no background real-time sync at the moment.",
    },
    {
        question: "Does ClipFlow work for competitive programming?",
        answer: "Yes, to a point. Codeforces rating history and contest results are charted over time. Rating prediction and head-to-head comparison are not implemented yet.",
    },
    {
        question: "Can I track my friend's progress?",
        answer: "Not yet. Shared study groups and leaderboards are on the roadmap, but the current version is single-user only.",
    },
    {
        question: "What platforms do you support?",
        answer: "LeetCode and Codeforces are supported today. CodeChef support is partially implemented and disabled in the UI. Other platforms may be added later.",
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
