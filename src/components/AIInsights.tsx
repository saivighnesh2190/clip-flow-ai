"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getGeminiApiKey } from "@/lib/profile";
import { Sparkles, Key, Compass, Brain, ArrowRight, Loader2, Lightbulb, ChevronRight } from "lucide-react";

interface AIInsightsProps {
    stats: Record<string, unknown>;
}

export default function AIInsights({ stats }: AIInsightsProps) {
    const [quickInsight, setQuickInsight] = useState<string>("");
    const [recommendation, setRecommendation] = useState<{
        topic: string;
        reason: string;
        problems: string[];
    } | null>(null);
    const [detailedAnalysis, setDetailedAnalysis] = useState<string>("");
    const [loading, setLoading] = useState<{ insight: boolean; recommendation: boolean; analysis: boolean }>({
        insight: false,
        recommendation: false,
        analysis: false,
    });
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [hasApiKey, setHasApiKey] = useState(false);
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [checkingKey, setCheckingKey] = useState(true);

    const hasStats = Object.keys(stats).length > 0;

    useEffect(() => {
        const loadApiKey = async () => {
            try {
                const key = await getGeminiApiKey();
                setApiKey(key);
                setHasApiKey(Boolean(key));
            } catch (error) {
                console.error("Error loading API key:", error);
                setHasApiKey(false);
            } finally {
                setCheckingKey(false);
            }
        };
        loadApiKey();
    }, []);

    const fetchQuickInsight = useCallback(async () => {
        if (!hasStats || !apiKey) return;
        setLoading((prev) => ({ ...prev, insight: true }));
        try {
            const response = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "quick_insight", stats, apiKey }),
            });
            const data = await response.json();
            setQuickInsight(data.insight || "");
        } catch {
            setQuickInsight("Unable to generate diagnostic. Please check your Gemini API key.");
        } finally {
            setLoading((prev) => ({ ...prev, insight: false }));
        }
    }, [stats, hasStats, apiKey]);

    const fetchRecommendation = useCallback(async () => {
        if (!hasStats || !apiKey) return;
        setLoading((prev) => ({ ...prev, recommendation: true }));
        try {
            const response = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "daily_recommendation", stats, apiKey }),
            });
            const data = await response.json();
            setRecommendation(data.recommendation);
        } catch {
            setRecommendation(null);
        } finally {
            setLoading((prev) => ({ ...prev, recommendation: false }));
        }
    }, [stats, hasStats, apiKey]);

    const fetchDetailedAnalysis = async () => {
        if (!hasStats || !apiKey) return;
        setLoading((prev) => ({ ...prev, analysis: true }));
        setShowAnalysis(true);
        try {
            const response = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "detailed_analysis", stats, apiKey }),
            });
            const data = await response.json();
            setDetailedAnalysis(data.analysis || "");
        } catch {
            setDetailedAnalysis("Unable to generate comprehensive analysis.");
        } finally {
            setLoading((prev) => ({ ...prev, analysis: false }));
        }
    };

    useEffect(() => {
        if (hasStats && apiKey) {
            fetchQuickInsight();
            fetchRecommendation();
        }
    }, [hasStats, apiKey, fetchQuickInsight, fetchRecommendation]);

    // Checking Key state
    if (checkingKey) {
        return (
            <Card className="p-6 apple-glass rounded-3xl text-center">
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span>Verifying Intelligence Engine...</span>
                </div>
            </Card>
        );
    }

    // Missing API Key setup prompt
    if (!hasApiKey) {
        return (
            <Card className="p-6 apple-glass rounded-3xl relative overflow-hidden apple-intelligence-aura">
                <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-2xl apple-glass-pill flex items-center justify-center shadow-sm">
                        <Key className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-base text-foreground tracking-tight">
                            Gemini Intelligence
                        </h3>
                        <p className="text-xs text-muted-foreground">Pattern Diagnostics Standby</p>
                    </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                    Connect your Gemini API key in Profile to activate personalized problem prescriptions, rating trajectory projections, and zero-spoiler hints.
                </p>

                <Button size="sm" className="w-full h-9 rounded-full apple-button-prominent text-xs font-medium" asChild>
                    <Link href="/profile" className="flex items-center justify-center gap-1.5">
                        Configure API Key
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </Button>
            </Card>
        );
    }

    // No Connected Platforms
    if (!hasStats) {
        return (
            <Card className="p-6 apple-glass rounded-3xl relative overflow-hidden">
                <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-11 h-11 rounded-2xl apple-glass-pill flex items-center justify-center">
                        <Compass className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-base text-foreground tracking-tight">
                            Awaiting Telemetry
                        </h3>
                        <p className="text-xs text-muted-foreground">Platforms Unlinked</p>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    Connect your LeetCode or Codeforces accounts to enable automated pattern-gap diagnostics.
                </p>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {/* Quick Diagnostic Card with Apple Intelligence Aura */}
            <Card className="p-5 md:p-6 apple-glass rounded-3xl relative overflow-hidden apple-intelligence-aura">
                <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl apple-glass-pill flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm text-foreground tracking-tight">
                                Live AI Diagnostic
                            </h4>
                            <p className="text-[11px] text-muted-foreground">Gemini Algorithmic Tutor</p>
                        </div>
                    </div>
                    <Badge variant="blue" className="text-[10px] py-0 px-2">
                        Real-time
                    </Badge>
                </div>

                {loading.insight ? (
                    <div className="flex items-center gap-2 py-3 text-xs text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        <span>Synthesizing competitive profile...</span>
                    </div>
                ) : (
                    <div className="p-3.5 rounded-2xl bg-white/[0.04] dark:bg-white/[0.04] border border-white/[0.08] text-xs text-foreground leading-relaxed">
                        &ldquo;{quickInsight || "Solving 2 medium-tier Greedy problems today will reinforce pattern recognition for Codeforces Div 2."}&rdquo;
                    </div>
                )}
            </Card>

            {/* Daily Tactical Focus */}
            <Card className="p-5 md:p-6 apple-glass rounded-3xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl apple-glass-pill flex items-center justify-center">
                            <Brain className="w-4 h-4 text-amber-500" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm text-foreground tracking-tight">
                                Today&apos;s Strategic Focus
                            </h4>
                            <p className="text-[11px] text-muted-foreground">Gap Targeting</p>
                        </div>
                    </div>
                    <Badge variant="gold" className="text-[10px] py-0 px-2">
                        Prescription
                    </Badge>
                </div>

                {loading.recommendation ? (
                    <div className="flex items-center gap-2 py-3 text-xs text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                        <span>Generating custom training set...</span>
                    </div>
                ) : recommendation ? (
                    <div className="space-y-3">
                        <div>
                            <p className="font-semibold text-sm text-foreground tracking-tight">
                                {recommendation.topic}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                {recommendation.reason}
                            </p>
                        </div>

                        <div className="space-y-1.5 pt-1">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                Recommended Drills
                            </span>
                            <div className="flex flex-col gap-1.5">
                                {recommendation.problems.map((problem, index) => (
                                    <div
                                        key={index}
                                        className="p-2 rounded-xl apple-glass-pill flex items-center justify-between text-xs text-foreground group"
                                    >
                                        <span className="truncate pr-2 font-medium">{problem}</span>
                                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-xs text-muted-foreground">
                        Continue daily practice to unlock focused topic prescriptions.
                    </p>
                )}
            </Card>

            {/* Detailed Analysis Button */}
            {!showAnalysis && (
                <Button
                    onClick={fetchDetailedAnalysis}
                    variant="outline"
                    size="sm"
                    className="w-full h-9 rounded-full apple-glass-pill text-xs font-medium text-foreground hover:bg-white/10"
                >
                    <Lightbulb className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                    Deep Architectural Assessment
                </Button>
            )}

            {/* Detailed Analysis Container */}
            {showAnalysis && (
                <Card className="p-5 md:p-6 apple-glass rounded-3xl relative overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-sm text-foreground">
                            Architectural Assessment
                        </h4>
                        <Badge variant="outline" className="text-[10px]">
                            Full Report
                        </Badge>
                    </div>

                    {loading.analysis ? (
                        <div className="flex items-center gap-2 py-4 text-xs text-muted-foreground">
                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            <span>Compiling full report...</span>
                        </div>
                    ) : (
                        <div className="p-3.5 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] border border-white/[0.08] text-xs text-foreground leading-relaxed max-h-80 overflow-y-auto whitespace-pre-wrap font-sans">
                            {detailedAnalysis}
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
}
