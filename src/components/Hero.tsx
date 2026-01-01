import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20" />

            {/* Animated Gradient Orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full blur-3xl animate-float" />

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float-random"
                        style={{
                            left: `${15 + i * 15}%`,
                            top: `${20 + (i % 3) * 25}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${4 + i}s`,
                        }}
                    />
                ))}
            </div>

            {/* Grid Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-primary">
                        AI-Powered DSA Tracker
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-primary/20 text-xs font-semibold text-primary">
                        New
                    </span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 animate-slide-up">
                    <span className="block mb-2">Master DSA with</span>
                    <span className="relative">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                            AI-Powered Insights
                        </span>
                        <svg
                            className="absolute -bottom-2 left-0 w-full h-3 text-primary/30"
                            viewBox="0 0 200 12"
                            fill="none"
                        >
                            <path
                                d="M2 10C50 2 150 2 198 10"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                </h1>

                {/* Subheadline */}
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
                    Track your progress across <span className="text-yellow-500 font-medium">LeetCode</span> and <span className="text-blue-500 font-medium">Codeforces</span>.
                    Get personalized AI recommendations, build streaks, and level up your coding skills.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                    <Button
                        size="lg"
                        className="text-base px-8 py-6 font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0"
                        asChild
                    >
                        <Link href="/signup" className="flex items-center gap-2">
                            Get Started Free
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="text-base px-8 py-6 font-semibold border-2 hover:bg-muted/50 transition-all duration-300 backdrop-blur-sm"
                        asChild
                    >
                        <Link href="/features" className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Watch Demo
                        </Link>
                    </Button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.6s" }}>
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {['🟣', '🔵', '🟢', '🟡'].map((emoji, i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-sm">
                                    {emoji}
                                </div>
                            ))}
                        </div>
                        <span className="font-medium text-foreground">500+</span> developers joined
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span><span className="font-medium text-foreground">4.9/5</span> rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>100% Free forever</span>
                    </div>
                </div>

                {/* Platform Logos */}
                <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.8s" }}>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Works with your favorite platforms</p>
                    <div className="flex items-center justify-center gap-8 opacity-60 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-2xl">🟡</span>
                            <span className="font-semibold">LeetCode</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-2xl">🔵</span>
                            <span className="font-semibold">Codeforces</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
