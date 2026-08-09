import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Features - ClipFlow",
    description: "Explore all the powerful features that make ClipFlow the best DSA progress tracking tool.",
};

const features = [
    {
        category: "Progress Tracking",
        items: [
            {
                title: "Multi-Platform Sync",
                description: "Connect LeetCode and Codeforces. All your progress in one unified dashboard.",
                icon: "🔗",
            },
            {
                title: "Real-Time Updates",
                description: "See your stats update instantly as you solve problems. No manual refresh needed.",
                icon: "⚡",
            },
            {
                title: "Historical Data",
                description: "Access your complete coding history with detailed logs of every problem solved.",
                icon: "📊",
            },
        ],
    },
    {
        category: "AI Intelligence",
        items: [
            {
                title: "Smart Recommendations",
                description: "Get personalized problem suggestions based on your skill level and learning goals.",
                icon: "🧠",
            },
            {
                title: "Weakness Analysis",
                description: "AI identifies your weak topics and creates focused practice plans to improve.",
                icon: "🎯",
            },
            {
                title: "Learning Paths",
                description: "Follow AI-curated paths for specific goals like FAANG interviews or competitive programming.",
                icon: "🛤️",
            },
        ],
    },
    {
        category: "Analytics & Insights",
        items: [
            {
                title: "Time Tracking",
                description: "Know exactly how much time you spend coding. Identify your most productive hours.",
                icon: "⏱️",
            },
            {
                title: "Topic Mastery",
                description: "Visual progress bars for each DSA topic from Arrays to Dynamic Programming.",
                icon: "📈",
            },
            {
                title: "Consistency Streaks",
                description: "Build habits with daily streaks and get motivated to code every day.",
                icon: "🔥",
            },
        ],
    },
    {
        category: "Social & Collaboration",
        items: [
            {
                title: "Friends & Leaderboards",
                description: "Add friends, compare progress, and compete on weekly leaderboards.",
                icon: "👥",
            },
            {
                title: "Study Groups",
                description: "Create or join study groups to prepare together for interviews.",
                icon: "📚",
            },
            {
                title: "Share Progress",
                description: "Generate beautiful shareable cards of your achievements for LinkedIn and Twitter.",
                icon: "🎉",
            },
        ],
    },
];

export default function FeaturesPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
                <div className="absolute inset-0 gradient-purple opacity-20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Features
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        Everything you need to <span className="gradient-text">master DSA</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Powerful features designed by competitive programmers, for competitive programmers
                    </p>
                </div>
            </section>

            {/* Features Sections */}
            {features.map((section, sectionIndex) => (
                <section
                    key={sectionIndex}
                    className={`py-20 ${sectionIndex % 2 === 1 ? "bg-muted/30" : ""}`}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
                            {section.category}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {section.items.map((item, itemIndex) => (
                                <Card
                                    key={itemIndex}
                                    className="p-6 border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            <Footer />
        </main>
    );
}
