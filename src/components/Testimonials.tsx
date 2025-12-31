"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
    {
        name: "Priya Sharma",
        role: "Software Engineer at Google",
        avatar: "PS",
        rating: 5,
        quote: "ClipFlow completely transformed my interview prep. The AI insights helped me identify weak areas I didn't even know I had. Landed my dream job!",
        platform: "LeetCode",
    },
    {
        name: "Alex Chen",
        role: "CS Student at Stanford",
        avatar: "AC",
        rating: 5,
        quote: "Tracking my progress across LeetCode and Codeforces in one place is a game-changer. The daily goals keep me consistent and motivated.",
        platform: "Codeforces",
    },
    {
        name: "Rahul Patel",
        role: "Backend Developer at Amazon",
        avatar: "RP",
        rating: 5,
        quote: "As someone preparing for system design interviews, the analytical insights from ClipFlow are invaluable. Highly recommend for serious coders.",
        platform: "CodeChef",
    },
    {
        name: "Sarah Johnson",
        role: "Data Scientist at Meta",
        avatar: "SJ",
        rating: 5,
        quote: "The time tracking feature helped me realize I was spending too much time on easy problems. Now I focus on what matters most.",
        platform: "LeetCode",
    },
    {
        name: "Mike Williams",
        role: "Full Stack Developer",
        avatar: "MW",
        rating: 5,
        quote: "Finally, a tool that understands competitive programming. The multi-platform sync is seamless and the UI is beautiful.",
        platform: "Codeforces",
    },
    {
        name: "Ananya Gupta",
        role: "SDE Intern at Microsoft",
        avatar: "AG",
        rating: 5,
        quote: "ClipFlow's AI suggestions are surprisingly accurate. It's like having a personal coding coach that knows exactly what I need to practice.",
        platform: "LeetCode",
    },
];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    className={`w-4 h-4 ${i < rating ? "text-yellow-accent" : "text-muted"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Loved by <span className="gradient-text">50,000+ students</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        See what ambitious coders are saying about their ClipFlow experience
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className="p-6 border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Rating */}
                            <StarRating rating={testimonial.rating} />

                            {/* Quote */}
                            <p className="mt-4 text-foreground/90 text-sm leading-relaxed">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border/50">
                                <Avatar className="w-10 h-10">
                                    <AvatarFallback className="bg-gradient-to-br from-purple-start to-purple-end text-foreground font-semibold text-sm">
                                        {testimonial.avatar}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                                    <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                                </div>
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                    {testimonial.platform}
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
