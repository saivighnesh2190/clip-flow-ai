"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
        } else {
            // Check if user is admin
            const adminEmails = ["nsv2190@gmail.com", "nsaivighnesh@zohomail.in"];
            const isAdmin = adminEmails.includes(data.user?.email || "");

            router.push(isAdmin ? "/admin" : "/dashboard");
            router.refresh();
        }
    };

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) setError(error.message);
    };

    const handleGithubLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) setError(error.message);
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden apple-canvas-ambient text-foreground">
            {/* Precision Grid Overlay */}
            <div className="absolute inset-0 grid-subtle pointer-events-none opacity-30 dark:opacity-20" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-md">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2.5 mb-8 group">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/20 text-white flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="w-5 h-5 text-white"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground font-sans">ClipFlow</span>
                </Link>

                <Card className="p-8 apple-glass rounded-3xl relative overflow-hidden border border-white/10 dark:border-white/10 shadow-2xl">
                    <div className="text-center mb-7">
                        <h1 className="text-2xl font-bold text-foreground mb-1.5 font-sans">Welcome back</h1>
                        <p className="text-muted-foreground text-xs sm:text-sm">
                            Sign in to continue your algorithmic journey
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs">
                            {error}
                        </div>
                    )}

                    {/* Social Login */}
                    <div className="space-y-2.5 mb-6">
                        <Button
                            variant="outline"
                            className="w-full h-10 rounded-full apple-glass-pill text-xs font-medium"
                            type="button"
                            onClick={handleGoogleLogin}
                        >
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full h-10 rounded-full apple-glass-pill text-xs font-medium"
                            type="button"
                            onClick={handleGithubLogin}
                        >
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    fillRule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Continue with GitHub
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10 dark:border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
                            <span className="apple-glass-pill px-3 py-0.5 text-muted-foreground rounded-full">
                                Or continue with email
                            </span>
                        </div>
                    </div>

                    {/* Email Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-xs font-medium text-foreground mb-1.5 pl-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-full apple-glass text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1.5 pl-1">
                                <label htmlFor="password" className="block text-xs font-medium text-foreground">
                                    Password
                                </label>
                                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                type="password"
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-full apple-glass text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        <Button type="submit" size="lg" className="w-full h-10 rounded-full apple-button-prominent font-medium text-xs mt-2" disabled={isLoading}>
                            {isLoading ? (
                                <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : null}
                            {isLoading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>

                    {/* Sign up link */}
                    <p className="text-center text-xs text-muted-foreground mt-6">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-primary font-medium hover:underline">
                            Sign up free
                        </Link>
                    </p>
                </Card>

                {/* Back to home */}
                <p className="text-center mt-6">
                    <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        ← Back to home
                    </Link>
                </p>
            </div>
        </main>
    );
}
