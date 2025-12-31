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
        name: "Arjun Mehta",
        role: "Founder & CEO",
        avatar: "AM",
        bio: "Former Google engineer and 3x ICPC World Finalist. Passionate about democratizing coding education.",
    },
    {
        name: "Priya Venkat",
        role: "CTO",
        avatar: "PV",
        bio: "Ex-Meta tech lead. Built systems serving billions. Loves competitive programming and teaching.",
    },
    {
        name: "David Kim",
        role: "Head of AI",
        avatar: "DK",
        bio: "PhD in ML from Stanford. Previously at OpenAI. Making AI work for learners, not the other way around.",
    },
    {
        name: "Sarah Chen",
        role: "Head of Product",
        avatar: "SC",
        bio: "Former PM at Notion. Obsessed with building tools that people actually want to use every day.",
    },
];

const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "2M+", label: "Problems Tracked" },
    { number: "15+", label: "Team Members" },
    { number: "10+", label: "Countries" },
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
        title: "Accessibility",
        description: "Great tools should be affordable. That's why we have a generous free tier.",
        icon: "🌍",
    },
    {
        title: "Community",
        description: "We build with our community, not just for them. Your feedback shapes our roadmap.",
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
                        On a mission to help <span className="gradient-text">every coder succeed</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        We started ClipFlow because we believe everyone deserves access to the tools and insights
                        that help top performers excel. No expensive bootcamps, no gatekeeping — just smart technology
                        that meets you where you are.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <p className="text-4xl md:text-5xl font-bold text-foreground">{stat.number}</p>
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
                            ClipFlow was born from frustration. In 2022, our founders were preparing for tech interviews
                            while working full-time jobs. They were solving problems on LeetCode, competing on Codeforces,
                            and practicing on CodeChef — but tracking progress across all these platforms was a nightmare.
                        </p>
                        <p>
                            Spreadsheets got messy. Progress felt invisible. And worst of all, there was no way to know
                            what to practice next. Should I do more Dynamic Programming? Am I weak in Graphs?
                            How do I compare to where I should be for Google interviews?
                        </p>
                        <p>
                            So we built ClipFlow — the tool we wished we had. An intelligent assistant that consolidates
                            your coding progress, analyzes your patterns, and guides you towards mastery. No more guesswork.
                            No more scattered data. Just focused, effective practice.
                        </p>
                        <p>
                            Today, ClipFlow helps over 50,000 students and professionals track their DSA journey.
                            We&apos;re just getting started.
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
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">Meet the Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
