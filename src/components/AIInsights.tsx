"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getGeminiApiKey } from "@/lib/profile";

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
                setHasApiKey(!!key);
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
            setQuickInsight("Unable to fetch insight");
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
            setDetailedAnalysis("Unable to generate analysis");
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

    // Show loading state while checking for API key
    if (checkingKey) {
        return (
            <Card className="p-6 border-border/50">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Loading...</span>
                </div>
            </Card>
        );
    }

    // Show API key setup prompt
    if (!hasApiKey) {
        return (
            <Card className="p-6 border-border/50 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center text-2xl">
                        🔑
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">Setup Required</h3>
                        <p className="text-xs text-muted-foreground">Add your Gemini API key</p>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                    Add your Gemini API key in Profile to get AI-powered insights and recommendations.
                </p>
                <Button size="sm" asChild>
                    <Link href="/profile">Go to Profile</Link>
                </Button>
            </Card>
        );
    }

    if (!hasStats) {
        return (
            <Card className="p-6 border-border/50 bg-gradient-to-br from-purple-start/20 to-purple-end/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-start to-purple-end flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">AI Insights</h3>
                        <p className="text-xs text-muted-foreground">Powered by Gemini</p>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground">
                    Connect your coding platforms to get AI-powered insights about your DSA journey!
                </p>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {/* Quick Insight */}
            <Card className="p-6 border-border/50 bg-gradient-to-br from-purple-start/20 to-purple-end/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-start to-purple-end flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">AI Quick Insight</h3>
                        <p className="text-xs text-muted-foreground">Powered by Gemini Flash</p>
                    </div>
                </div>
                {loading.insight ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Analyzing your progress...
                    </div>
                ) : (
                    <p className="text-sm text-foreground">{quickInsight}</p>
                )}
            </Card>

            {/* Daily Recommendation */}
            <Card className="p-6 border-border/50">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center text-xl">
                        🎯
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">Today&apos;s Focus</h3>
                        <p className="text-xs text-muted-foreground">AI-recommended topic</p>
                    </div>
                </div>
                {loading.recommendation ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Getting recommendation...
                    </div>
                ) : recommendation ? (
                    <>
                        <p className="font-medium text-foreground mb-1">{recommendation.topic}</p>
                        <p className="text-sm text-muted-foreground mb-3">{recommendation.reason}</p>
                        <div className="flex flex-wrap gap-2">
                            {recommendation.problems.map((problem, index) => (
                                <span key={index} className="px-2 py-1 rounded-full bg-muted text-xs text-foreground">
                                    {problem}
                                </span>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-sm text-muted-foreground">No recommendation available</p>
                )}
            </Card>

            {/* Detailed Analysis Button */}
            {!showAnalysis && (
                <Button onClick={fetchDetailedAnalysis} variant="outline" className="w-full">
                    Get Detailed AI Analysis
                </Button>
            )}

            {/* Detailed Analysis */}
            {showAnalysis && (
                <Card className="p-6 border-border/50">
                    <h3 className="font-semibold text-foreground mb-4">Detailed Analysis</h3>
                    {loading.analysis ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Generating comprehensive analysis...
                        </div>
                    ) : (
                        <div className="prose prose-sm max-w-none text-foreground">
                            <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg overflow-auto">
                                {detailedAnalysis}
                            </pre>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
}
