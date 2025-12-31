import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
    "Multi-platform tracking",
    "Real-time sync",
    "AI-powered insights",
    "Daily recommendations",
    "Time analytics",
    "Goal setting",
    "Weekly reports",
    "Progress charts",
    "Topic mastery tracking",
    "Contest performance",
    "Friends leaderboard",
    "Export data",
    "API access",
    "Priority support",
];

const plans = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Perfect for getting started",
        features: [0, 1, 2, 6, 7],
        cta: "Get Started",
        popular: false,
    },
    {
        name: "Pro",
        price: "$9",
        period: "/month",
        description: "For serious competitive programmers",
        features: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        cta: "Start Free Trial",
        popular: true,
    },
    {
        name: "Team",
        price: "$29",
        period: "/month",
        description: "For coding groups and clubs",
        features: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        cta: "Contact Sales",
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
                        Simple, <span className="gradient-text">transparent pricing</span>
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
                                    ? "border-primary shadow-xl scale-105"
                                    : "border-border/50"
                                } hover:shadow-lg transition-all duration-300`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
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
                                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                            </div>

                            {/* Features List */}
                            <ul className="space-y-3 mb-8">
                                {features.map((feature, featureIndex) => {
                                    const included = plan.features.includes(featureIndex);
                                    return (
                                        <li key={featureIndex} className="flex items-center gap-3">
                                            {included ? (
                                                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5 text-muted-foreground/30 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            )}
                                            <span className={`text-sm ${included ? "text-foreground" : "text-muted-foreground/50"}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>

                            {/* CTA Button */}
                            <Button
                                className="w-full"
                                variant={plan.popular ? "default" : "outline"}
                                size="lg"
                            >
                                {plan.cta}
                            </Button>
                        </Card>
                    ))}
                </div>

                {/* Money Back Guarantee */}
                <div className="text-center mt-12">
                    <p className="text-muted-foreground text-sm">
                        🛡️ 30-day money-back guarantee • No credit card required for free tier
                    </p>
                </div>
            </div>
        </section>
    );
}
