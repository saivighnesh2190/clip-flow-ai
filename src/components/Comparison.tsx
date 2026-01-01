import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
            "30-day analytics",
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
            "Priority support",
        ],
        cta: "Upgrade to Pro",
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
            "Team dashboard",
        ],
        cta: "Get Team Plan",
        href: "/checkout?plan=team",
        popular: false,
    },
];

export default function Comparison() {
    return (
        <section id="pricing" className="py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Pricing
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Simple, <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">transparent pricing</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Choose the plan that fits your coding journey. Start free, upgrade anytime.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`relative p-8 border-2 ${plan.popular
                                ? "border-primary shadow-xl md:scale-105 bg-gradient-to-b from-primary/5 to-transparent"
                                : "border-border/50"
                                } hover:shadow-lg transition-all duration-300`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-full">
                                    Most Popular
                                </div>
                            )}

                            {/* Plan Info */}
                            <div className="text-center mb-8">
                                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                                    <span className="text-muted-foreground">{plan.period}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{plan.priceInr}{plan.period !== "forever" && "/mo"}</p>
                                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                            </div>

                            {/* Features List */}
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm text-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button with Link */}
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

                {/* Money Back Guarantee */}
                <div className="text-center mt-12">
                    <p className="text-muted-foreground text-sm">
                        🛡️ 30-day money-back guarantee • Cancel anytime
                    </p>
                </div>
            </div>
        </section>
    );
}
