"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

const GEMINI_KEY_STORAGE = "clipflow_gemini_api_key";

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
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) {
                router.push("/login");
                return;
            }
            setUser(user);
            setLoading(false);
        };
        getUser();

        // Load saved API key
        const savedKey = localStorage.getItem(GEMINI_KEY_STORAGE);
        if (savedKey) {
            setSavedGeminiKey(savedKey);
            setGeminiKey(savedKey);
        }
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

    const handleSaveApiKey = () => {
        if (!geminiKey.trim()) {
            setApiKeyMessage({ type: "error", text: "Please enter an API key" });
            return;
        }
        if (!geminiKey.startsWith("AIza")) {
            setApiKeyMessage({ type: "error", text: "Invalid API key format. Gemini API keys start with 'AIza'" });
            return;
        }
        localStorage.setItem(GEMINI_KEY_STORAGE, geminiKey.trim());
        setSavedGeminiKey(geminiKey.trim());
        setApiKeyMessage({ type: "success", text: "API key saved successfully!" });
        setShowApiKey(false);
    };

    const handleRemoveApiKey = () => {
        localStorage.removeItem(GEMINI_KEY_STORAGE);
        setGeminiKey("");
        setSavedGeminiKey("");
        setApiKeyMessage({ type: "success", text: "API key removed" });
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-32 flex items-center justify-center">
                    <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <section className="pt-28 pb-16">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Profile</h1>
                        <p className="text-muted-foreground">Manage your account settings</p>
                    </div>

                    {/* Profile Info */}
                    <Card className="p-6 border-border/50 mb-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-start to-purple-end flex items-center justify-center text-white text-2xl font-bold">
                                {user?.email?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">
                                    {user?.user_metadata?.full_name || user?.email?.split("@")[0]}
                                </h2>
                                <p className="text-sm text-muted-foreground">{user?.email}</p>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between py-2 border-b border-border/50">
                                <span className="text-muted-foreground">Email</span>
                                <span className="text-foreground">{user?.email}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-border/50">
                                <span className="text-muted-foreground">Member since</span>
                                <span className="text-foreground">
                                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                                </span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">User ID</span>
                                <span className="text-foreground font-mono text-xs">{user?.id.slice(0, 8)}...</span>
                            </div>
                        </div>
                    </Card>

                    {/* Gemini API Key */}
                    <Card className="p-6 border-border/50 mb-6 bg-gradient-to-br from-purple-start/10 to-purple-end/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-start to-purple-end flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Gemini API Key</h3>
                                <p className="text-xs text-muted-foreground">Required for AI Chat & Insights</p>
                            </div>
                        </div>

                        {apiKeyMessage && (
                            <div
                                className={`mb-4 p-3 rounded-lg text-sm ${apiKeyMessage.type === "success"
                                        ? "bg-green-100 border border-green-200 text-green-700"
                                        : "bg-red-100 border border-red-200 text-red-700"
                                    }`}
                            >
                                {apiKeyMessage.text}
                            </div>
                        )}

                        {savedGeminiKey ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 p-3 bg-green-100 border border-green-200 rounded-lg">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm text-green-700">API Key configured</span>
                                    <span className="text-xs text-green-600 font-mono ml-auto">
                                        {savedGeminiKey.slice(0, 8)}...{savedGeminiKey.slice(-4)}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                                        {showApiKey ? "Hide" : "Update"} Key
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600" onClick={handleRemoveApiKey}>
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                                <p className="text-sm text-yellow-800">
                                    <strong>No API key set.</strong> Add your Gemini API key to use AI features.
                                </p>
                                <a
                                    href="https://aistudio.google.com/apikey"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:underline mt-1 inline-block"
                                >
                                    Get your free API key from Google AI Studio →
                                </a>
                            </div>
                        )}

                        {(showApiKey || !savedGeminiKey) && (
                            <div className="space-y-3 mt-4">
                                <div>
                                    <label htmlFor="geminiKey" className="block text-sm font-medium text-foreground mb-2">
                                        API Key
                                    </label>
                                    <input
                                        type="password"
                                        id="geminiKey"
                                        value={geminiKey}
                                        onChange={(e) => setGeminiKey(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                                        placeholder="AIza..."
                                    />
                                </div>
                                <Button onClick={handleSaveApiKey}>Save API Key</Button>
                            </div>
                        )}
                    </Card>

                    {/* Change Password */}
                    <Card className="p-6 border-border/50 mb-6">
                        <h3 className="font-semibold text-foreground mb-4">Change Password</h3>

                        {message && (
                            <div
                                className={`mb-4 p-3 rounded-lg text-sm ${message.type === "success"
                                        ? "bg-green-100 border border-green-200 text-green-700"
                                        : "bg-red-100 border border-red-200 text-red-700"
                                    }`}
                            >
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-foreground mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={passwords.new}
                                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Enter new password"
                                    minLength={8}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={passwords.confirm}
                                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Confirm new password"
                                    minLength={8}
                                    required
                                />
                            </div>
                            <Button type="submit" disabled={updating} className="w-full sm:w-auto">
                                {updating ? "Updating..." : "Update Password"}
                            </Button>
                        </form>
                    </Card>

                    {/* Sign Out */}
                    <Card className="p-6 border-border/50">
                        <h3 className="font-semibold text-foreground mb-2">Sign Out</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Sign out of your account on this device.
                        </p>
                        <Button variant="outline" onClick={handleSignOut}>
                            Sign Out
                        </Button>
                    </Card>
                </div>
            </section>

            <Footer />
        </main>
    );
}
