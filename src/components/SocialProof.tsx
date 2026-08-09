const platforms = [
    { name: "LeetCode", icon: "LC", status: "live" },
    { name: "Codeforces", icon: "CF", status: "live" },
    { name: "CodeChef", icon: "CC", status: "planned" },
];

const facts = [
    { value: "2", label: "Platforms integrated" },
    { value: "Gemini", label: "AI model powering insights" },
    { value: "Open Source", label: "Full code on GitHub" },
];

export default function SocialProof() {
    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Honest positioning */}
                <p className="text-center text-lg md:text-xl text-muted-foreground mb-12">
                    An independent, open-source project built for students preparing for coding interviews
                </p>

                {/* Supported platforms */}
                <div className="grid grid-cols-3 gap-8 items-center justify-items-center max-w-2xl mx-auto">
                    {platforms.map((platform) => (
                        <div
                            key={platform.name}
                            className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center border border-border/50">
                                <span className="text-sm font-bold text-muted-foreground">{platform.icon}</span>
                            </div>
                            <span className="text-xs text-muted-foreground font-medium">{platform.name}</span>
                            {platform.status === "planned" && (
                                <span className="text-[10px] uppercase tracking-wide text-muted-foreground/70 border border-border/50 rounded px-1.5 py-0.5">
                                    Planned
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Project facts (verifiable, not vanity metrics) */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    {facts.map((fact) => (
                        <div key={fact.label} className="p-6">
                            <p className="text-3xl md:text-4xl font-bold text-foreground mb-2">{fact.value}</p>
                            <p className="text-muted-foreground">{fact.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
