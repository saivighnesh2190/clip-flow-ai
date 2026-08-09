import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const metadata: Metadata = {
    title: "About - ClipFlow",
    description: "Learn about our mission to help every coder master data structures and algorithms.",
};

const team = [
    {
        name: "N Sai Vighnesh",
        role: "Developer",
        avatar: "SV",
        bio: "Computer Science student at KL University. Built ClipFlow end to end - Next.js frontend, Supabase backend, and the Gemini-powered insight layer.",
    },
];

const stats = [
    { number: "2", label: "Platforms Integrated" },
    { number: "Next.js 15", label: "Framework" },
    { number: "Gemini", label: "AI Model" },
    { number: "Open Source", label: "License" },
];

const values = [
    {
        title: "Student-First",
        description: "Every decision starts with 'How does this help students learn better?'",
        icon: "🎯",
    },
    {
        title: "Data Privacy",
        description: "Your progress data is yours. We never sell it, and you can delete it anytime.",
        icon: "🔒",
    },
    {
        title: "Free to Use",
        description: "Core tracking and analytics are free. No paywall on the features that matter for practice.",
        icon: "🌍",
    },
    {
        title: "Open Source",
        description: "The full codebase is public on GitHub. Read it, fork it, or open an issue.",
        icon: "💬",
    },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
                <div className="absolute inset-0 gradient-purple opacity-20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        About Us
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        A student project to make <span className="gradient-text">DSA practice measurable</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        ClipFlow is an independent, open-source project built by a student, for students.
                        The goal is simple: make DSA practice measurable without paying for a bootcamp
                        or maintaining yet another spreadsheet.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.number}</p>
                                <p className="text-muted-foreground mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Our Story</h2>
                    <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                        <p>
                            ClipFlow started as a personal problem. Preparing for campus placements meant solving
                            problems on LeetCode and competing on Codeforces, but progress lived in two separate
                            profile pages and a messy spreadsheet.
                        </p>
                        <p>
                            Spreadsheets got stale fast, and the harder question was never answered: what should I
                            practice next? Am I actually weak in graphs, or does it just feel that way?
                        </p>
                        <p>
                            So I built ClipFlow — a single dashboard that pulls public profile data from both
                            platforms, charts progress over time, and uses the Gemini API to turn that raw history
                            into concrete practice suggestions.
                        </p>
                        <p>
                            It is a working project under active development, not a company. The full source is on
                            GitHub, and feedback or contributions are welcome.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <Card key={index} className="p-6 border-border/50 text-center">
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                                <p className="text-muted-foreground text-sm">{value.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">Who Built This</h2>
                    <div className="grid grid-cols-1 max-w-md mx-auto gap-8">
                        {team.map((member, index) => (
                            <Card key={index} className="p-6 border-border/50 text-center hover:shadow-lg transition-shadow">
                                <Avatar className="w-20 h-20 mx-auto mb-4">
                                    <AvatarFallback className="bg-gradient-to-br from-purple-start to-purple-end text-foreground font-bold text-xl">
                                        {member.avatar}
                                    </AvatarFallback>
                                </Avatar>
                                <h3 className="font-semibold text-foreground">{member.name}</h3>
                                <p className="text-primary text-sm mb-2">{member.role}</p>
                                <p className="text-muted-foreground text-sm">{member.bio}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
