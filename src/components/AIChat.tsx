"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface AIChatProps {
    stats: Record<string, unknown>;
}

const GEMINI_KEY_STORAGE = "clipflow_gemini_api_key";

export default function AIChat({ stats }: AIChatProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hi! I'm ClipFlow AI, your DSA learning assistant. Ask me anything about data structures, algorithms, or your coding progress!",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasApiKey, setHasApiKey] = useState(false);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedKey = localStorage.getItem(GEMINI_KEY_STORAGE);
        setHasApiKey(!!savedKey);
    }, []);

    // Scroll only within the messages container
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const apiKey = localStorage.getItem(GEMINI_KEY_STORAGE);
            const response = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "chat",
                    message: userMessage,
                    stats,
                    history: messages.slice(-10),
                    apiKey,
                }),
            });

            const data = await response.json();
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.response || "Sorry, I couldn't process that." },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, something went wrong. Please try again!" },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Show API key setup prompt if no key
    if (!hasApiKey) {
        return (
            <Card className="p-6 border-border/50 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center text-2xl">
                        🔑
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">Setup Required</h3>
                        <p className="text-xs text-muted-foreground">Add your Gemini API key to use AI Chat</p>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                    To use the AI assistant, you need to add your Gemini API key in your profile settings.
                    Get a free API key from Google AI Studio.
                </p>
                <div className="flex gap-2">
                    <Button asChild>
                        <Link href="/profile">Add API Key in Profile</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">
                            Get Free Key
                        </a>
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <Card className="flex flex-col h-[500px] border-border/50">
            {/* Header */}
            <div className="p-4 border-b border-border/50 bg-muted/30 rounded-t-xl">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-start to-purple-end flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground text-sm">ClipFlow AI</h3>
                        <p className="text-xs text-muted-foreground">Your DSA Assistant</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-foreground"
                                }`}
                        >
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-muted rounded-2xl px-4 py-2">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about DSA, your progress, or get recommendations..."
                        className="flex-1 px-4 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                        disabled={isLoading}
                    />
                    <Button onClick={sendMessage} disabled={isLoading || !input.trim()} size="sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </Button>
                </div>
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={() => setInput("What should I practice today?")}
                        className="text-xs px-3 py-1 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
                    >
                        Today&apos;s focus
                    </button>
                    <button
                        onClick={() => setInput("Analyze my weak areas")}
                        className="text-xs px-3 py-1 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
                    >
                        Weak areas
                    </button>
                    <button
                        onClick={() => setInput("Explain Dynamic Programming")}
                        className="text-xs px-3 py-1 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
                    >
                        Explain DP
                    </button>
                </div>
            </div>
        </Card>
    );
}
