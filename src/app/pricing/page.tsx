import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Pricing - ClipFlow",
    description: "ClipFlow is currently free to use. Paid tiers are planned and not yet available.",
};

const plans = [
    {
        name: "Free",
        price: "$0",
        priceInr: "₹0",
        period: "forever",
        description: "Perfect for getting started",
        features: [
            "LeetCode & Codeforces tracking",
            "Basic dashboard",
            "10 AI messages per day",
            "30-day analytics history",
            "1 goal at a time",
        ],
        notIncluded: [
            "Unlimited AI messages",
            "1-year analytics",
            "Priority support",
            "Team features",
        ],
        cta: "Get Started Free",
        href: "/signup",
        popular: false,
    },
    {
        name: "Pro",
        price: "$5",
        priceInr: "₹415",
        period: "/month",
        description: "For serious coders",
        features: [
            "Everything in Free",
            "Unlimited AI messages",
            "1-year analytics history",
            "Unlimited goals",
            "Priority support",
            "Advanced insights",
            "Export data",
        ],
        notIncluded: [
            "Team features",
        ],
        cta: "Coming Soon",
        href: "/checkout?plan=pro",
        popular: true,
    },
    {
        name: "Team",
        price: "$15",
        priceInr: "₹1,245",
        period: "/month",
        description: "For coding groups & clubs",
        features: [
            "Everything in Pro",
            "Up to 5 team members",
            "Shared goals & streaks",
            "Team analytics dashboard",
            "Admin controls",
            "Dedicated support",
        ],
        notIncluded: [],
        cta: "Coming Soon",
        href: "/checkout?plan=team",
        popular: false,
    },
];

const faqItems = [
    {
        question: "Is anything paid right now?",
        answer: "No. Every feature currently built into ClipFlow is free. The Pro and Team columns describe what paid tiers would include if billing is added later.",
    },
    {
        question: "What counts as an AI message?",
        answer: "Each question you ask the AI assistant sends one request to the Gemini API. A daily limit is applied per account to stay inside the free API quota.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "None yet. No payment gateway is integrated, so the checkout page is a non-functional placeholder.",
    },
    {
        question: "Will it stay free?",
        answer: "The core tracking and analytics are intended to stay free. This is a student project, not a commercial product.",
    },
];

export default function PricingPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        Simple, <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">transparent pricing</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        ClipFlow is free to use right now. The Pro and Team tiers below describe the planned
                        roadmap - no payment gateway is connected, so nothing can be charged.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {plans.map((plan, index) => (
                            <Card
                                key={index}
                                className={`relative p-8 border-2 ${plan.popular
                                    ? "border-primary shadow-xl md:scale-105 bg-gradient-to-b from-primary/5 to-transparent"
                                    : "border-border/50"
                                    } hover:shadow-lg transition-all duration-300`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-full">
                                        Planned
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                                        <span className="text-muted-foreground">{plan.period}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">{plan.priceInr}{plan.period !== "forever" ? "/mo" : ""}</p>
                                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                                </div>

                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-sm text-foreground">{feature}</span>
                                        </li>
                                    ))}
                                    {plan.notIncluded.map((feature, featureIndex) => (
                                        <li key={`not-${featureIndex}`} className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-muted-foreground/30 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            <span className="text-sm text-muted-foreground/50">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    className={`w-full ${plan.popular ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0" : ""}`}
                                    variant={plan.popular ? "default" : "outline"}
                                    size="lg"
                                    asChild
                                >
                                    <Link href={plan.href}>{plan.cta}</Link>
                                </Button>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-muted-foreground text-sm">
                            ℹ️ Billing is not live. Paid tiers are shown as a roadmap only.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-muted/30">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {faqItems.map((item, index) => (
                            <div key={index} className="bg-card rounded-xl p-6 border border-border/50">
                                <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                                <p className="text-muted-foreground text-sm">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
