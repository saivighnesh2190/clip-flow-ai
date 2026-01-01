import { Card } from "@/components/ui/card";

const features = [
    {
        icon: "📊",
        title: "Multi-Platform Tracking",
        description: "Sync and track progress across LeetCode and Codeforces in one unified dashboard.",
        color: "from-purple-500/20 to-pink-500/20",
        borderColor: "group-hover:border-purple-500/50",
    },
    {
        icon: "⚡",
        title: "AI-Powered Insights",
        description: "Get personalized recommendations and learning paths based on your problem-solving patterns.",
        color: "from-yellow-500/20 to-orange-500/20",
        borderColor: "group-hover:border-yellow-500/50",
    },
    {
        icon: "🔥",
        title: "Streak Tracking",
        description: "Build consistency with daily streaks. Never break your coding habit again.",
        color: "from-red-500/20 to-orange-500/20",
        borderColor: "group-hover:border-red-500/50",
    },
    {
        icon: "🎯",
        title: "Goal Setting",
        description: "Set daily, weekly, and monthly goals. Stay accountable with visual progress tracking.",
        color: "from-green-500/20 to-emerald-500/20",
        borderColor: "group-hover:border-green-500/50",
    },
    {
        icon: "📈",
        title: "Rating Analytics",
        description: "Track your contest ratings over time with beautiful charts and trend analysis.",
        color: "from-blue-500/20 to-cyan-500/20",
        borderColor: "group-hover:border-blue-500/50",
    },
    {
        icon: "🤖",
        title: "AI Chat Assistant",
        description: "Ask questions about your progress and get personalized tips from our AI assistant.",
        color: "from-violet-500/20 to-purple-500/20",
        borderColor: "group-hover:border-violet-500/50",
    },
];

export default function Features() {
    return (
        <section id="platform" className="py-16 md:py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Features
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Everything you need to{" "}
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                            master DSA
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        One intelligent platform to track, analyze, and optimize your coding journey
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className={`group p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-border/50 ${feature.borderColor} cursor-default relative overflow-hidden`}
                        >
                            {/* Gradient Background on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-3xl">
                                    {feature.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-foreground transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors">
                                    {feature.description}
                                </p>

                                {/* Arrow */}
                                <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                                    <span className="text-sm font-medium">Learn more</span>
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
