import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Use Cases - ClipFlow",
    description: "Discover how students, professionals, and teams use ClipFlow to accelerate their coding journey.",
};

const useCases = [
    {
        title: "Students",
        subtitle: "Preparing for Placements",
        description: "Whether you're a CS undergraduate or preparing for your first tech job, ClipFlow helps you build a structured practice routine and track your progress towards interview readiness.",
        features: [
            "Track problems solved across difficulty levels",
            "AI-curated interview prep paths",
            "Topic-wise progress for DSA fundamentals",
            "Daily practice reminders",
            "Resume-ready stats and achievements",
        ],
        color: "from-purple-start to-purple-end",
        icon: "🎓",
    },
    {
        title: "Competitive Programmers",
        subtitle: "Climbing the Ranks",
        description: "From Codeforces Pupil to Grandmaster, ClipFlow provides the analytics and insights you need to identify weaknesses and level up your competitive programming game.",
        features: [
            "Contest performance analytics",
            "Rating change predictions",
            "Compare with top-rated friends",
            "Virtual contest tracking",
            "Problem difficulty progression",
        ],
        color: "from-yellow-accent to-orange-accent",
        icon: "🏆",
    },
    {
        title: "Working Professionals",
        subtitle: "Switching to FAANG",
        description: "Balancing work and interview prep is hard. ClipFlow helps you make the most of your limited practice time with smart recommendations and focused learning paths.",
        features: [
            "Company-specific problem lists",
            "Time-boxed daily goals",
            "Weekend warrior analytics",
            "Interview-focused AI suggestions",
            "Progress towards target companies",
        ],
        color: "from-green-400 to-emerald-500",
        icon: "💼",
    },
    {
        title: "Coding Bootcamps",
        subtitle: "Training the Next Generation",
        description: "Manage cohorts, track student progress, and identify struggling learners early. ClipFlow Teams gives bootcamps the tools to improve student outcomes.",
        features: [
            "Cohort-wide dashboards",
            "Individual student analytics",
            "Automated progress reports",
            "Custom assignment tracking",
            "Instructor intervention alerts",
        ],
        color: "from-blue-400 to-indigo-500",
        icon: "🏫",
    },
    {
        title: "College Coding Clubs",
        subtitle: "Building a Community",
        description: "Run contests, create leaderboards, and foster healthy competition. ClipFlow helps coding clubs engage members and track collective growth.",
        features: [
            "Club leaderboards",
            "Custom challenges",
            "Member progress tracking",
            "Achievement badges",
            "Social sharing tools",
        ],
        color: "from-pink-400 to-rose-500",
        icon: "👥",
    },
    {
        title: "Self-Learners",
        subtitle: "Mastering DSA Solo",
        description: "No mentor? No problem. ClipFlow's AI acts as your personal coach, guiding you through the vast world of data structures and algorithms.",
        features: [
            "Personalized learning paths",
            "Adaptive difficulty scaling",
            "Concept explanations",
            "Practice consistency tracking",
            "Goal achievement rewards",
        ],
        color: "from-amber-400 to-orange-500",
        icon: "🚀",
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
                        From students to professionals, from solo learners to teams — ClipFlow adapts to your journey
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
                                    <h3 className="text-xl font-bold text-foreground">{useCase.title}</h3>
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
                        Join 50,000+ coders who are already tracking their progress with ClipFlow
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="font-semibold px-8">
                            Start Free Trial
                        </Button>
                        <Button variant="outline" size="lg" className="font-semibold px-8">
                            View Demo
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
