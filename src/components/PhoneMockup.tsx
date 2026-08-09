import { Card } from "@/components/ui/card";

const overlayLabels = [
    { text: "Track Progress", position: "top-8 -left-4 md:-left-16" },
    { text: "AI Suggestions", position: "top-1/4 -right-4 md:-right-20" },
    { text: "Daily Goals", position: "bottom-1/4 -left-4 md:-left-20" },
    { text: "Analyze Weak Areas", position: "bottom-12 -right-4 md:-right-16" },
];

export default function PhoneMockup() {
    return (
        <section className="relative py-12 md:py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-center">
                    {/* Left Info Card */}
                    <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 z-10 animate-float-delay-1">
                        <Card className="p-6 max-w-xs shadow-xl border-border/50 bg-card/90 backdrop-blur-sm">
                            <p className="text-lg font-semibold text-foreground mb-4">
                                Turn daily coding into measurable progress
                            </p>
                            <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline transition-all">
                                Track My Progress
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </Card>
                    </div>

                    {/* Right Product Card */}
                    <div className="hidden lg:block absolute right-0 top-1/3 z-10 animate-float-delay-2">
                        <Card className="p-5 max-w-xs shadow-xl border-border/50 bg-gradient-to-br from-orange-accent/90 to-yellow-accent/90">
                            <h3 className="text-lg font-bold text-foreground mb-1">DSA Mastery Tracker</h3>
                            <p className="text-sm text-foreground/80">AI-powered performance insights</p>
                        </Card>
                    </div>

                    {/* Stat Cards */}
                    <div className="hidden md:block absolute left-8 lg:left-24 top-12 z-10 animate-float">
                        <Card className="px-4 py-3 shadow-lg border-border/50 bg-yellow-accent">
                            <p className="text-2xl font-bold text-foreground">Daily Streaks</p>
                            <p className="text-sm text-foreground/80">Consistency tracking</p>
                        </Card>
                    </div>

                    <div className="hidden md:block absolute right-8 lg:right-24 top-8 z-10 animate-float-delay-3">
                        <Card className="px-4 py-3 shadow-lg border-border/50 bg-orange-accent">
                            <p className="text-2xl font-bold text-foreground">Topic Analysis</p>
                            <p className="text-sm text-foreground/80">Find your weak areas</p>
                        </Card>
                    </div>

                    {/* Phone Mockup */}
                    <div className="relative z-0">
                        {/* Illustrative UI preview - values shown are sample data */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                            <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-[11px] font-medium border border-border/50 whitespace-nowrap">
                                UI preview - sample data
                            </span>
                        </div>
                        {/* Phone Frame */}
                        <div className="relative mx-auto w-[280px] sm:w-[320px] md:w-[360px] h-[560px] sm:h-[640px] md:h-[720px] rounded-[3rem] bg-foreground p-3 shadow-2xl animate-float-slow">
                            {/* Phone Screen */}
                            <div className="w-full h-full rounded-[2.5rem] bg-background overflow-hidden relative">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-foreground rounded-b-2xl z-10" />

                                {/* Screen Content */}
                                <div className="pt-10 px-4 pb-4 h-full overflow-hidden">
                                    {/* Dashboard Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <p className="text-xs text-muted-foreground">Good morning</p>
                                            <p className="text-lg font-semibold text-foreground">Sample User</p>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-start to-purple-end flex items-center justify-center">
                                            <span className="text-sm font-bold text-foreground">SU</span>
                                        </div>
                                    </div>

                                    {/* Daily Stats */}
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="bg-muted rounded-xl p-3">
                                            <p className="text-xs text-muted-foreground mb-1">Today</p>
                                            <p className="text-xl font-bold text-foreground">3.2 hrs</p>
                                            <p className="text-xs text-green-500">+15% from yesterday</p>
                                        </div>
                                        <div className="bg-muted rounded-xl p-3">
                                            <p className="text-xs text-muted-foreground mb-1">Problems</p>
                                            <p className="text-xl font-bold text-foreground">12</p>
                                            <p className="text-xs text-green-500">4 LeetCode, 8 CF</p>
                                        </div>
                                    </div>

                                    {/* AI Insights Card */}
                                    <div className="bg-gradient-to-br from-purple-start/50 to-purple-end/50 rounded-xl p-4 mb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                                <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <p className="text-sm font-semibold text-foreground">AI Insight</p>
                                        </div>
                                        <p className="text-xs text-foreground/80">Focus on Graph problems today. You&apos;ve solved 3 this week - aim for 5!</p>
                                    </div>

                                    {/* Weekly Chart Placeholder */}
                                    <div className="bg-muted rounded-xl p-4">
                                        <p className="text-xs text-muted-foreground mb-3">Weekly Progress</p>
                                        <div className="flex items-end justify-between h-20 gap-1">
                                            {[60, 80, 45, 90, 70, 85, 95].map((height, i) => (
                                                <div key={i} className="flex-1 rounded-t-md bg-primary/30" style={{ height: `${height}%` }}>
                                                    <div className="w-full rounded-t-md bg-primary" style={{ height: `${Math.min(100, height + 20)}%` }} />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                                <span key={i} className="text-xs text-muted-foreground flex-1 text-center">{day}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Overlay Labels */}
                        {overlayLabels.map((label, index) => (
                            <div
                                key={index}
                                className={`absolute ${label.position} z-20 hidden sm:block`}
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className="px-3 py-1.5 rounded-full bg-foreground text-primary-foreground text-xs font-medium shadow-lg animate-float-slow">
                                    {label.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Stat Cards */}
                <div className="flex md:hidden justify-center gap-4 mt-8">
                    <Card className="px-4 py-3 shadow-lg border-border/50 bg-yellow-accent">
                        <p className="text-xl font-bold text-foreground">Daily Streaks</p>
                        <p className="text-xs text-foreground/80">Consistency tracking</p>
                    </Card>
                    <Card className="px-4 py-3 shadow-lg border-border/50 bg-orange-accent">
                        <p className="text-xl font-bold text-foreground">Topic Analysis</p>
                        <p className="text-xs text-foreground/80">Find your weak areas</p>
                    </Card>
                </div>
            </div>
        </section>
    );
}
