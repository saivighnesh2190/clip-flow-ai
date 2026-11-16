"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getGeminiApiKey } from "@/lib/profile";
import { 
    Sparkles, 
    Send, 
    Key, 
    Lock, 
    Unlock, 
    Eye, 
    AlertTriangle, 
    CheckCircle2, 
    HelpCircle, 
    Terminal, 
    Layers, 
    Compass, 
    ArrowRight, 
    RefreshCw, 
    Lightbulb, 
    Zap,
    Cpu,
    Flame
} from "lucide-react";

interface AIDrillConsoleProps {
    stats: Record<string, unknown>;
    initialTopic?: string | null;
}

interface HintTier {
    tier: number;
    title: string;
    spoilerLevel: string;
    description: string;
    content: string;
    unlocked: boolean;
    icon: any;
}

export default function AIDrillConsole({ stats, initialTopic }: AIDrillConsoleProps) {
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [hasApiKey, setHasApiKey] = useState(false);
    const [checkingKey, setCheckingKey] = useState(true);

    // Active drill topic
    const [problemQuery, setProblemQuery] = useState(initialTopic ? `${initialTopic} problem drill` : "");
    const [loadingHintLadder, setLoadingHintLadder] = useState(false);

    // Progressive 4-Tier Hint Ladder State
    const [hintLadder, setHintLadder] = useState<HintTier[]>([
        {
            tier: 1,
            title: "Core Intuition & Physical Analogy",
            spoilerLevel: "0% (Zero Spoiler)",
            description: "How to conceptualize the problem before thinking in code.",
            content: "Think about this as arranging intervals on a single timeline. If you greedily select the event that ends the earliest, you leave the maximum possible room for all future compatible events.",
            unlocked: true,
            icon: Lightbulb,
        },
        {
            tier: 2,
            title: "Algorithmic Paradigm & Invariant",
            spoilerLevel: "25% Spoiler",
            description: "The mathematical invariant or pattern property that guarantees optimality.",
            content: "Sort intervals primarily by their end-times in ascending order. Maintain an invariant: `last_end_time = -infinity`. A candidate interval is admitted if and only if `start_time >= last_end_time`.",
            unlocked: false,
            icon: Compass,
        },
        {
            tier: 3,
            title: "Critical Edge Cases & Traps",
            spoilerLevel: "60% Spoiler",
            description: "Specific constraints that cause WA (Wrong Answer) or TLE (Time Limit Exceeded).",
            content: "Watch out for intervals that share identical boundaries `[a, b]` and `[b, c]` (check whether end boundary is inclusive or strictly non-overlapping). Also test with empty lists, single element list, and negative timestamps.",
            unlocked: false,
            icon: AlertTriangle,
        },
        {
            tier: 4,
            title: "Optimal Space-Time Pseudocode",
            spoilerLevel: "100% Reveal",
            description: "The optimal asymptotic blueprint and concrete implementation structure.",
            content: "Time Complexity: O(N log N) dominated by sorting.\nAuxiliary Space: O(1) or O(N) depending on in-place sort.\n\nAlgorithm:\n1. Sort intervals by `interval[1]`\n2. Iterate through intervals:\n   if `interval[0] >= current_end`:\n      count++\n      current_end = interval[1]\n3. return count",
            unlocked: false,
            icon: Cpu,
        },
    ]);

    // Terminal Dialogue State
    const [terminalMessages, setTerminalMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
        {
            role: "assistant",
            content: "Zero-Spoiler Co-Pilot initialized. Ask questions without fear of accidental code leaks, or enter a problem title to synthesize a 4-tier progressive hint ladder.",
        },
    ]);
    const [chatInput, setChatInput] = useState("");
    const [chatLoading, setChatLoading] = useState(false);
    const terminalEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadApiKey = async () => {
            try {
                const key = await getGeminiApiKey();
                setApiKey(key);
                setHasApiKey(Boolean(key));
            } catch (error) {
                console.error("Error loading key:", error);
                setHasApiKey(false);
            } finally {
                setCheckingKey(false);
            }
        };
        loadApiKey();
    }, []);

    useEffect(() => {
        if (initialTopic) {
            setProblemQuery(`${initialTopic} pattern`);
        }
    }, [initialTopic]);

    useEffect(() => {
        if (terminalEndRef.current) {
            terminalEndRef.current.scrollTop = terminalEndRef.current.scrollHeight;
        }
    }, [terminalMessages]);

    const unlockTier = (tierIndex: number) => {
        setHintLadder((prev) =>
            prev.map((tier, idx) => (idx === tierIndex ? { ...tier, unlocked: true } : tier))
        );
    };

    const generateHintLadder = async () => {
        if (!problemQuery.trim() || !apiKey) return;
        setLoadingHintLadder(true);

        try {
            const prompt = `You are a world-class competitive programming coach. A student is practicing the problem or topic: "${problemQuery}".
Provide a strict 4-tier zero-spoiler progressive hint ladder in JSON format with keys:
"tier1": "Core high-level intuition and physical analogy without mentioning specific data structures or code (0% spoiler)",
"tier2": "Algorithmic invariant, property, or pattern to apply (25% spoiler)",
"tier3": "Tricky edge cases, corner test conditions, and traps that cause Wrong Answer or TLE (60% spoiler)",
"tier4": "Optimal time & space asymptotic complexity and pseudocode outline (100% reveal)"

Output strictly JSON with these 4 keys.`;

            const response = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "chat",
                    message: prompt,
                    stats,
                    history: [],
                    apiKey,
                }),
            });

            const data = await response.json();
            const text = data.response || "";

            // Attempt to parse JSON from AI response
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                setHintLadder([
                    {
                        tier: 1,
                        title: "Core Intuition & Physical Analogy",
                        spoilerLevel: "0% (Zero Spoiler)",
                        description: "How to conceptualize the problem before thinking in code.",
                        content: parsed.tier1 || "Consider how choices propagate sequentially.",
                        unlocked: true,
                        icon: Lightbulb,
                    },
                    {
                        tier: 2,
                        title: "Algorithmic Paradigm & Invariant",
                        spoilerLevel: "25% Spoiler",
                        description: "The mathematical invariant or pattern property that guarantees optimality.",
                        content: parsed.tier2 || "Identify the monotonic invariant across the state space.",
                        unlocked: false,
                        icon: Compass,
                    },
                    {
                        tier: 3,
                        title: "Critical Edge Cases & Traps",
                        spoilerLevel: "60% Spoiler",
                        description: "Specific constraints that cause WA or TLE.",
                        content: parsed.tier3 || "Verify bounds on empty inputs and duplicate values.",
                        unlocked: false,
                        icon: AlertTriangle,
                    },
                    {
                        tier: 4,
                        title: "Optimal Space-Time Pseudocode",
                        spoilerLevel: "100% Reveal",
                        description: "The optimal asymptotic blueprint and concrete implementation structure.",
                        content: parsed.tier4 || "Analyze the asymptotic recurrence relation.",
                        unlocked: false,
                        icon: Cpu,
                    },
                ]);
            } else {
                // Fallback if not pure JSON
                setHintLadder((prev) => [
                    { ...prev[0], content: text.slice(0, 300), unlocked: true },
                    { ...prev[1], content: text.slice(300, 600), unlocked: false },
                    { ...prev[2], content: text.slice(600, 900), unlocked: false },
                    { ...prev[3], content: text.slice(900), unlocked: false },
                ]);
            }
        } catch (error) {
            console.error("Error generating hint ladder:", error);
        } finally {
            setLoadingHintLadder(false);
        }
    };

    const sendTerminalChat = async (presetText?: string) => {
        const query = (presetText || chatInput).trim();
        if (!query || chatLoading || !apiKey) return;

        setChatInput("");
        setTerminalMessages((prev) => [...prev, { role: "user", content: query }]);
        setChatLoading(true);

        try {
            const response = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "chat",
                    message: `Context: Active problem query: "${problemQuery}". Student question: ${query}. Please answer concisely in coach mode without giving away complete code solutions unless explicitly asked.`,
                    stats,
                    history: terminalMessages.slice(-6),
                    apiKey,
                }),
            });

            const data = await response.json();
            setTerminalMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.response || "No response received." },
            ]);
        } catch {
            setTerminalMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Connection error: Unable to communicate with Gemini API." },
            ]);
        } finally {
            setChatLoading(false);
        }
    };

    if (checkingKey) {
        return (
            <div className="p-12 apple-glass rounded-3xl flex items-center justify-center gap-3 text-muted-foreground text-sm">
                <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                <span>Checking Gemini telemetry authorization...</span>
            </div>
        );
    }

    if (!hasApiKey) {
        return (
            <Card className="p-8 apple-glass rounded-3xl border border-white/10 text-center max-w-xl mx-auto">
                <div className="w-14 h-14 mx-auto rounded-2xl apple-glass-pill flex items-center justify-center mb-4">
                    <Key className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2 tracking-tight">
                    Gemini API Authorization Required
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    To power the Zero-Spoiler Progressive Hint Ladder and live algorithmic diagnostics, please add your personal Gemini API key in your profile.
                </p>
                <Link href="/profile">
                    <Button className="apple-button-prominent rounded-full text-xs font-semibold px-6 h-9">
                        Configure API Key in Profile
                        <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </Button>
                </Link>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Mission Header */}
            <div className="p-5 rounded-2xl apple-glass border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-xs font-mono font-medium tracking-wide uppercase text-muted-foreground">
                            Zero-Spoiler Drill Co-Pilot
                        </span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        Progressive Hint Ladder & Adversarial Testing
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Solve competitive problems with graduated intuition reveals instead of spoiling the solution.
                    </p>
                </div>

                {/* Problem search & drill trigger */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-72">
                        <input
                            type="text"
                            placeholder="Enter LeetCode / CF problem name or topic..."
                            value={problemQuery}
                            onChange={(e) => setProblemQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && generateHintLadder()}
                            className="w-full h-9 px-3.5 rounded-xl bg-black/30 border border-white/10 text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:border-primary font-mono"
                        />
                    </div>
                    <Button
                        onClick={generateHintLadder}
                        disabled={loadingHintLadder || !problemQuery.trim()}
                        size="sm"
                        className="apple-button-prominent h-9 px-4 rounded-xl text-xs font-medium shrink-0"
                    >
                        {loadingHintLadder ? (
                            <>
                                <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                                <span>Building...</span>
                            </>
                        ) : (
                            <>
                                <Zap className="w-3.5 h-3.5 mr-1.5" />
                                <span>Generate Ladder</span>
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Hint Ladder Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* 4-Tier Ladder (7 Columns) */}
                <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-blue-400" />
                            <span>Progressive Revelation Ladder</span>
                        </span>
                        <span className="text-[11px] font-mono text-muted-foreground">
                            {hintLadder.filter((h) => h.unlocked).length} of 4 tiers unlocked
                        </span>
                    </div>

                    <div className="space-y-3.5">
                        {hintLadder.map((tier, idx) => {
                            const IconComponent = tier.icon;
                            return (
                                <Card
                                    key={tier.tier}
                                    className={`rounded-2xl p-4.5 border transition-all ${
                                        tier.unlocked
                                            ? "apple-glass border-white/15 dark:border-white/15"
                                            : "bg-black/20 border-white/5 opacity-80"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <div className="flex items-center gap-2.5">
                                            <div
                                                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                                                    tier.unlocked
                                                        ? "bg-primary/20 text-primary border border-primary/30"
                                                        : "bg-white/5 text-muted-foreground border border-white/10"
                                                }`}
                                            >
                                                T{tier.tier}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-foreground tracking-tight flex items-center gap-2">
                                                    <span>{tier.title}</span>
                                                </h4>
                                                <p className="text-[11px] text-muted-foreground">
                                                    {tier.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <Badge
                                                variant="outline"
                                                className={`text-[10px] font-mono px-2 py-0.5 ${
                                                    tier.tier === 1
                                                        ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                                                        : tier.tier === 2
                                                        ? "border-blue-500/30 text-blue-400 bg-blue-500/10"
                                                        : tier.tier === 3
                                                        ? "border-amber-500/30 text-amber-400 bg-amber-500/10"
                                                        : "border-rose-500/30 text-rose-400 bg-rose-500/10"
                                                }`}
                                            >
                                                {tier.spoilerLevel}
                                            </Badge>

                                            {!tier.unlocked && (
                                                <Button
                                                    onClick={() => unlockTier(idx)}
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-7 px-2.5 text-[11px] rounded-lg apple-glass-pill text-foreground hover:bg-white/10"
                                                >
                                                    <Unlock className="w-3 h-3 mr-1 text-primary" />
                                                    <span>Unlock</span>
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content display */}
                                    {tier.unlocked ? (
                                        <div className="mt-3 p-3.5 rounded-xl bg-black/30 border border-white/10 text-xs text-foreground/90 font-mono leading-relaxed whitespace-pre-wrap">
                                            {tier.content}
                                        </div>
                                    ) : (
                                        <div className="mt-2.5 p-3 rounded-xl bg-black/15 border border-dashed border-white/10 flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono">
                                            <Lock className="w-3.5 h-3.5 text-muted-foreground/60" />
                                            <span>Tier {tier.tier} locked. Click unlock to reveal when stuck.</span>
                                        </div>
                                    )}
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Tactical Terminal & Quick Diagnostics (5 Columns) */}
                <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Interactive Diagnostic Console</span>
                        </span>
                    </div>

                    <Card className="apple-glass rounded-2xl border border-white/10 p-4 flex flex-col h-[520px]">
                        {/* Quick Action Chips */}
                        <div className="flex flex-wrap gap-1.5 pb-3 border-b border-white/10">
                            <button
                                onClick={() => sendTerminalChat("Analyze why my approach might get Time Limit Exceeded (TLE) on N=10^5")}
                                className="text-[10px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:border-primary/40 text-muted-foreground hover:text-foreground font-mono transition-colors"
                            >
                                /diagnose-tle
                            </button>
                            <button
                                onClick={() => sendTerminalChat("Generate 3 adversarial edge cases that break naive implementations")}
                                className="text-[10px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:border-primary/40 text-muted-foreground hover:text-foreground font-mono transition-colors"
                            >
                                /gen-adversarial-cases
                            </button>
                            <button
                                onClick={() => sendTerminalChat("How can I optimize auxiliary space from O(N) down to O(1)?")}
                                className="text-[10px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:border-primary/40 text-muted-foreground hover:text-foreground font-mono transition-colors"
                            >
                                /space-opt-o1
                            </button>
                        </div>

                        {/* Terminal Log */}
                        <div 
                            ref={terminalEndRef}
                            className="flex-1 overflow-y-auto py-3 space-y-3 font-mono text-xs pr-1 scrollbar-thin"
                        >
                            {terminalMessages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`p-3 rounded-xl ${
                                        msg.role === "assistant"
                                            ? "bg-black/35 border border-white/10 text-foreground"
                                            : "bg-primary/10 border border-primary/20 text-primary-foreground ml-4"
                                    }`}
                                >
                                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">
                                        <span>{msg.role === "assistant" ? "CO-PILOT" : "YOU"}</span>
                                    </div>
                                    <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            ))}
                            {chatLoading && (
                                <div className="p-3 rounded-xl bg-black/35 border border-white/10 flex items-center gap-2 text-xs text-muted-foreground font-mono">
                                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />
                                    <span>Synthesizing diagnostic...</span>
                                </div>
                            )}
                        </div>

                        {/* Input Box */}
                        <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Ask a targeted question without code spoilers..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendTerminalChat()}
                                className="flex-1 h-8 px-3 rounded-xl bg-black/40 border border-white/10 text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:border-primary font-mono"
                            />
                            <Button
                                onClick={() => sendTerminalChat()}
                                disabled={chatLoading || !chatInput.trim()}
                                size="sm"
                                className="h-8 w-8 p-0 rounded-xl apple-button-prominent shrink-0"
                            >
                                <Send className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
