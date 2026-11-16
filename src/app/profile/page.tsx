"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { saveGeminiApiKey, getGeminiApiKey, removeGeminiApiKey } from "@/lib/profile";

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
    const [geminiKey, setGeminiKey] = useState("");
    const [savedGeminiKey, setSavedGeminiKey] = useState("");
    const [showApiKey, setShowApiKey] = useState(false);
    const [apiKeyMessage, setApiKeyMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [savingKey, setSavingKey] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const initialize = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) {
                router.push("/login");
                return;
            }
            setUser(user);

            // Load saved API key from database
            const savedKey = await getGeminiApiKey();
            if (savedKey) {
                setSavedGeminiKey(savedKey);
                setGeminiKey(savedKey);
            }

            setLoading(false);
        };
        initialize();
    }, [supabase.auth, router]);

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (passwords.new !== passwords.confirm) {
            setMessage({ type: "error", text: "New passwords do not match" });
            return;
        }

        if (passwords.new.length < 8) {
            setMessage({ type: "error", text: "Password must be at least 8 characters" });
            return;
        }

        setUpdating(true);
        const { error } = await supabase.auth.updateUser({
            password: passwords.new,
        });

        if (error) {
            setMessage({ type: "error", text: error.message });
        } else {
            setMessage({ type: "success", text: "Password updated successfully!" });
            setPasswords({ current: "", new: "", confirm: "" });
        }
        setUpdating(false);
    };

    const handleSaveApiKey = async () => {
        if (!geminiKey.trim()) {
            setApiKeyMessage({ type: "error", text: "Please enter an API key" });
            return;
        }
        if (!geminiKey.startsWith("AIza")) {
            setApiKeyMessage({ type: "error", text: "Invalid API key format. Gemini API keys start with 'AIza'" });
            return;
        }

        setSavingKey(true);
        const success = await saveGeminiApiKey(geminiKey.trim());

        if (success) {
            setSavedGeminiKey(geminiKey.trim());
            setApiKeyMessage({ type: "success", text: "API key saved securely to database!" });
            setShowApiKey(false);
        } else {
            setApiKeyMessage({ type: "error", text: "Failed to save API key. Please try again." });
        }
        setSavingKey(false);
    };

    const handleRemoveApiKey = async () => {
        setSavingKey(true);
        const success = await removeGeminiApiKey();

        if (success) {
            setGeminiKey("");
            setSavedGeminiKey("");
            setApiKeyMessage({ type: "success", text: "API key removed" });
        } else {
            setApiKeyMessage({ type: "error", text: "Failed to remove API key" });
        }
        setSavingKey(false);
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    if (loading) {
        return (
            <main className="min-h-screen apple-canvas-ambient text-foreground">
                <Navbar />
                <div className="pt-36 flex items-center justify-center">
                    <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen apple-canvas-ambient text-foreground selection:bg-blue-500/20 selection:text-blue-400">
            <Navbar />

            <section className="pt-28 pb-16 md:pt-32">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-sans mb-1.5">
                            Account & Security
                        </h1>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            Manage your profile settings, telemetry keys, and security credentials.
                        </p>
                    </div>

                    {/* Profile Info */}
                    <Card className="p-6 md:p-8 apple-glass rounded-3xl relative overflow-hidden border border-white/10 dark:border-white/10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl apple-glass-pill flex items-center justify-center text-foreground text-2xl font-bold shadow-sm">
                                {user?.email?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-foreground tracking-tight">
                                    {user?.user_metadata?.full_name || user?.email?.split("@")[0]}
                                </h2>
                                <p className="text-xs text-muted-foreground font-mono">{user?.email}</p>
                            </div>
                        </div>

                        <div className="space-y-3 text-xs sm:text-sm">
                            <div className="flex justify-between py-2.5 border-b border-white/10">
                                <span className="text-muted-foreground">Account Email</span>
                                <span className="text-foreground font-mono">{user?.email}</span>
                            </div>
                            <div className="flex justify-between py-2.5 border-b border-white/10">
                                <span className="text-muted-foreground">Registered Since</span>
                                <span className="text-foreground">
                                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                                </span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span className="text-muted-foreground">Identifier</span>
                                <span className="text-foreground font-mono text-xs">{user?.id.slice(0, 12)}...</span>
                            </div>
                        </div>
                    </Card>

                    {/* Gemini API Key */}
                    <Card className="p-6 md:p-8 apple-glass rounded-3xl relative overflow-hidden apple-intelligence-aura border border-white/10 dark:border-white/10">
                        <div className="flex items-center gap-3.5 mb-4">
                            <div className="w-10 h-10 rounded-2xl apple-glass-pill flex items-center justify-center">
                                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-base text-foreground tracking-tight">Gemini Intelligence Key</h3>
                                <p className="text-xs text-muted-foreground">Powers automated pattern diagnosis (AES-256 encrypted)</p>
                            </div>
                        </div>

                        {apiKeyMessage && (
                            <div
                                className={`mb-4 p-3 rounded-2xl text-xs ${apiKeyMessage.type === "success"
                                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-500"
                                    : "bg-rose-500/10 border border-rose-500/20 text-rose-500"
                                    }`}
                            >
                                {apiKeyMessage.text}
                            </div>
                        )}

                        {savedGeminiKey ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                                    <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Key Secured & Active</span>
                                    <span className="text-[11px] text-muted-foreground font-mono ml-auto">
                                        {savedGeminiKey.slice(0, 8)}...{savedGeminiKey.slice(-4)}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="h-8 rounded-full apple-glass-pill text-xs" onClick={() => setShowApiKey(!showApiKey)} disabled={savingKey}>
                                        {showApiKey ? "Hide Key Form" : "Update Key"}
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 rounded-full text-xs text-rose-500 hover:bg-rose-500/10" onClick={handleRemoveApiKey} disabled={savingKey}>
                                        {savingKey ? "..." : "Remove Key"}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl mb-4 text-xs">
                                <p className="text-amber-600 dark:text-amber-400 font-medium">
                                    No Gemini API key set. Connect your personal key to activate AI drills.
                                </p>
                                <a
                                    href="https://aistudio.google.com/apikey"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline mt-1.5 inline-block font-medium"
                                >
                                    Get your free API key from Google AI Studio →
                                </a>
                            </div>
                        )}

                        {(showApiKey || !savedGeminiKey) && (
                            <div className="space-y-3 mt-4 pt-4 border-t border-white/10">
                                <div>
                                    <label htmlFor="geminiKey" className="block text-xs font-medium text-foreground mb-1.5 pl-1">
                                        Gemini API Key
                                    </label>
                                    <input
                                        type="password"
                                        id="geminiKey"
                                        value={geminiKey}
                                        onChange={(e) => setGeminiKey(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-full apple-glass text-xs sm:text-sm text-foreground border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/40 font-mono"
                                        placeholder="AIza..."
                                    />
                                </div>
                                <Button size="sm" className="h-9 px-5 rounded-full apple-button-prominent text-xs font-medium" onClick={handleSaveApiKey} disabled={savingKey}>
                                    {savingKey ? "Encrypting & Storing..." : "Save API Key"}
                                </Button>
                            </div>
                        )}
                    </Card>

                    {/* Change Password */}
                    <Card className="p-6 md:p-8 apple-glass rounded-3xl relative overflow-hidden border border-white/10 dark:border-white/10">
                        <h3 className="font-semibold text-base text-foreground mb-4 tracking-tight">Security Credentials</h3>

                        {message && (
                            <div
                                className={`mb-4 p-3 rounded-2xl text-xs ${message.type === "success"
                                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-500"
                                    : "bg-rose-500/10 border border-rose-500/20 text-rose-500"
                                    }`}
                            >
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label htmlFor="newPassword" className="block text-xs font-medium text-foreground mb-1.5 pl-1">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={passwords.new}
                                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-full apple-glass text-xs sm:text-sm text-foreground border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                                    placeholder="Enter new password"
                                    minLength={8}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-xs font-medium text-foreground mb-1.5 pl-1">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={passwords.confirm}
                                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-full apple-glass text-xs sm:text-sm text-foreground border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                                    placeholder="Confirm new password"
                                    minLength={8}
                                    required
                                />
                            </div>
                            <Button type="submit" disabled={updating} size="sm" className="h-9 px-5 rounded-full apple-button-prominent text-xs font-medium">
                                {updating ? "Updating..." : "Update Password"}
                            </Button>
                        </form>
                    </Card>

                    {/* Sign Out */}
                    <Card className="p-6 md:p-8 apple-glass rounded-3xl relative overflow-hidden border border-white/10 dark:border-white/10 flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-sm text-foreground">Sign Out</h3>
                            <p className="text-xs text-muted-foreground">
                                Disconnect active session from this device.
                            </p>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 rounded-full apple-glass-pill text-xs" onClick={handleSignOut}>
                            Sign Out
                        </Button>
                    </Card>
                </div>
            </section>

            <Footer />
        </main>
    );
}
