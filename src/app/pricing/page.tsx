import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Pricing - ClipFlow",
    description: "Choose the perfect plan for your coding journey. Start free, upgrade anytime.",
};

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
        description: "Perfect for getting started with DSA tracking",
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
        description: "For coding groups, clubs, and bootcamps",
        features: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        cta: "Contact Sales",
        popular: false,
    },
];

const faqItems = [
    {
        question: "Can I change my plan later?",
        answer: "Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of your next billing cycle.",
    },
    {
        question: "Is there a free trial for Pro?",
        answer: "Yes, Pro comes with a 14-day free trial. No credit card required to start.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, and in select regions, UPI and bank transfers.",
    },
    {
        question: "Do you offer student discounts?",
        answer: "Yes! Students get 50% off Pro with a valid .edu email. Contact us for verification.",
    },
];

export default function PricingPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 md:pt-40 md:pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        Simple, <span className="gradient-text">transparent pricing</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Start free and upgrade as you grow. No hidden fees, no surprises.
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
                                        ? "border-primary shadow-xl md:scale-105"
                                        : "border-border/50"
                                    } hover:shadow-lg transition-all duration-300`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                                        Most Popular
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                                        <span className="text-muted-foreground">{plan.period}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                                </div>

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

                    <div className="text-center mt-12">
                        <p className="text-muted-foreground text-sm">
                            🛡️ 30-day money-back guarantee • No credit card required for free tier
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-muted/30">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
                        Pricing FAQ
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
