"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getGeminiApiKey } from "@/lib/profile";
import { Sparkles, Send, Key, Bot, User, ArrowUpRight, Loader2 } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface AIChatProps {
    stats: Record<string, unknown>;
}

export default function AIChat({ stats }: AIChatProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Welcome to ClipFlow AI. I have direct access to your verified LeetCode and Codeforces telemetry. Ask me about algorithmic patterns, competitive contest strategies, or personalized problem drills.",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasApiKey, setHasApiKey] = useState(false);
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [checkingKey, setCheckingKey] = useState(true);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async (textToSend?: string) => {
        const query = (textToSend || input).trim();
        if (!query || isLoading || !apiKey) return;

        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: query }]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "chat",
                    message: query,
                    stats,
                    history: messages.slice(-10),
                    apiKey,
                }),
            });

            const data = await response.json();
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.response || "No response received." },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Telemetry error: Unable to communicate with Gemini API." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (checkingKey) {
        return (
            <Card className="p-8 apple-glass rounded-3xl text-center">
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span>Initializing DSA Assistant...</span>
                </div>
            </Card>
        );
    }

    if (!hasApiKey) {
        return (
            <Card className="p-6 md:p-8 apple-glass rounded-3xl relative overflow-hidden apple-intelligence-aura">
                <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl apple-glass-pill flex items-center justify-center">
                        <Key className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-foreground tracking-tight">
                            Interactive Assistant Requires API Key
                        </h3>
                        <p className="text-xs text-muted-foreground">Direct Gemini 2.0 Flash integration</p>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                    ClipFlow AI provides zero-spoiler hints, pattern diagnostics, and interactive interview mock questions. Add your personal Google AI Studio Gemini API key to activate.
                </p>
                <div className="flex flex-wrap gap-3">
                    <Button size="sm" className="h-9 px-5 apple-button-prominent rounded-full text-xs font-medium" asChild>
                        <Link href="/profile">Add Key in Profile</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 px-5 apple-glass-pill rounded-full text-xs font-medium" asChild>
                        <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                            Get Free Key <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <Card className="flex flex-col h-[540px] apple-glass rounded-3xl relative overflow-hidden border border-white/10 dark:border-white/10 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/10 dark:border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl apple-glass-pill flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-sm text-foreground tracking-tight">
                                ClipFlow AI Tutor
                            </h4>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <p className="text-[11px] text-muted-foreground">DSA Algorithmic Specialist</p>
                    </div>
                </div>

                <Badge variant="blue" className="text-[11px] py-0 px-2.5">
                    Gemini Active
                </Badge>
            </div>

            {/* Conversation Flow */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        {msg.role === "assistant" && (
                            <div className="w-7 h-7 rounded-full apple-glass-pill flex items-center justify-center shrink-0 mt-0.5">
                                <Sparkles className="w-3.5 h-3.5 text-primary" />
                            </div>
                        )}

                        <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                                msg.role === "user"
                                    ? "apple-button-prominent rounded-tr-xs text-white"
                                    : "apple-glass-pill rounded-tl-xs text-foreground bg-white/[0.06] dark:bg-white/[0.06]"
                            }`}
                        >
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>

                        {msg.role === "user" && (
                            <div className="w-7 h-7 rounded-full apple-button-prominent flex items-center justify-center shrink-0 mt-0.5 text-white text-xs font-semibold">
                                <User className="w-3.5 h-3.5" />
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3 justify-start">
                        <div className="w-7 h-7 rounded-full apple-glass-pill flex items-center justify-center shrink-0 mt-0.5">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="apple-glass-pill rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                        </div>
                    </div>
                )}
            </div>

            {/* Prompt Starters & Input Area */}
            <div className="p-4 border-t border-white/10 dark:border-white/10 bg-white/[0.02] space-y-3">
                {/* Suggested Starters */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
                    <button
                        onClick={() => sendMessage("Diagnose my pattern gap based on my solved problems")}
                        className="px-3 py-1 rounded-full apple-glass-pill text-muted-foreground hover:text-foreground text-[11px] whitespace-nowrap transition-colors"
                    >
                        🎯 Pattern Gap Analysis
                    </button>
                    <button
                        onClick={() => sendMessage("Suggest 3 Codeforces Div 2 problems to reach 1200")}
                        className="px-3 py-1 rounded-full apple-glass-pill text-muted-foreground hover:text-foreground text-[11px] whitespace-nowrap transition-colors"
                    >
                        📈 Reach Pupil (1200)
                    </button>
                    <button
                        onClick={() => sendMessage("Explain Topological Sort with Kahn's Algorithm")}
                        className="px-3 py-1 rounded-full apple-glass-pill text-muted-foreground hover:text-foreground text-[11px] whitespace-nowrap transition-colors"
                    >
                        💡 Explain Topo Sort
                    </button>
                </div>

                {/* Input Bar */}
                <div className="flex items-center gap-2 relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about your algorithmic progress or problem intuition..."
                        className="flex-1 px-4 py-2.5 rounded-full apple-glass text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 border border-white/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all pr-12"
                        disabled={isLoading}
                    />
                    <Button
                        onClick={() => sendMessage()}
                        disabled={isLoading || !input.trim()}
                        size="icon-sm"
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full apple-button-prominent shadow-sm"
                    >
                        <Send className="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}
