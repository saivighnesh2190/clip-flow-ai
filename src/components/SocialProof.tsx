const platforms = [
    { name: "LeetCode", icon: "LC" },
    { name: "CodeChef", icon: "CC" },
    { name: "Codeforces", icon: "CF" },
    { name: "HackerRank", icon: "HR" },
    { name: "GeeksforGeeks", icon: "GFG" },
    { name: "InterviewBit", icon: "IB" },
    { name: "AlgoExpert", icon: "AE" },
    { name: "Coding Ninjas", icon: "CN" },
];

export default function SocialProof() {
    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Trust Statement */}
                <p className="text-center text-lg md:text-xl text-muted-foreground mb-12">
                    Trusted by ambitious students and coding communities worldwide
                </p>

                {/* Brand Logos */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
                    {platforms.map((platform) => (
                        <div
                            key={platform.name}
                            className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                        >
                            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center border border-border/50">
                                <span className="text-sm font-bold text-muted-foreground">{platform.icon}</span>
                            </div>
                            <span className="text-xs text-muted-foreground font-medium">{platform.name}</span>
                        </div>
                    ))}
                </div>

                {/* Stats Row */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">50K+</p>
                        <p className="text-muted-foreground">Active Students</p>
                    </div>
                    <div className="p-6">
                        <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">2M+</p>
                        <p className="text-muted-foreground">Problems Analyzed</p>
                    </div>
                    <div className="p-6">
                        <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">98%</p>
                        <p className="text-muted-foreground">User Satisfaction</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
