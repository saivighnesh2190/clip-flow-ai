"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlatformConnectionProps {
    onConnect: (platform: string, username: string) => void;
    onDisconnect: (platform: string) => void;
    connectedPlatforms: { platform: string; username: string }[];
}

const platforms = [
    {
        id: "codeforces",
        name: "Codeforces",
        icon: "🔵",
        color: "from-blue-500 to-blue-600",
        placeholder: "Enter your handle",
    },
    {
        id: "leetcode",
        name: "LeetCode",
        icon: "🟡",
        color: "from-yellow-500 to-orange-500",
        placeholder: "Enter your username",
    },
];

export default function PlatformConnection({ onConnect, onDisconnect, connectedPlatforms }: PlatformConnectionProps) {
    const [inputValues, setInputValues] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleConnect = async (platformId: string) => {
        const username = inputValues[platformId]?.trim();
        if (!username) {
            setErrors({ ...errors, [platformId]: "Please enter a username" });
            return;
        }

        setLoading(platformId);
        setErrors({});

        try {
            const response = await fetch(`/api/stats?platform=${platformId}&username=${username}`);
            const data = await response.json();

            if (data.success && data.data?.user) {
                onConnect(platformId, username);
                setInputValues({ ...inputValues, [platformId]: "" });
            } else {
                setErrors({ ...errors, [platformId]: "User not found" });
            }
        } catch {
            setErrors({ ...errors, [platformId]: "Failed to connect" });
        } finally {
            setLoading(null);
        }
    };

    const isConnected = (platformId: string) =>
        connectedPlatforms.some((p) => p.platform === platformId);

    const getConnectedUsername = (platformId: string) =>
        connectedPlatforms.find((p) => p.platform === platformId)?.username;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {platforms.map((platform) => (
                <Card key={platform.id} className="p-4 border-border/50">
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-xl`}>
                            {platform.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{platform.name}</h3>
                            {isConnected(platform.id) ? (
                                <p className="text-xs text-green-500 flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Connected as {getConnectedUsername(platform.id)}
                                </p>
                            ) : (
                                <p className="text-xs text-muted-foreground">Not connected</p>
                            )}
                        </div>
                    </div>

                    {isConnected(platform.id) ? (
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => onDisconnect(platform.id)}
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Disconnect
                        </Button>
                    ) : (
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={inputValues[platform.id] || ""}
                                onChange={(e) => setInputValues({ ...inputValues, [platform.id]: e.target.value })}
                                placeholder={platform.placeholder}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                onKeyPress={(e) => e.key === "Enter" && handleConnect(platform.id)}
                            />
                            {errors[platform.id] && (
                                <p className="text-xs text-red-500">{errors[platform.id]}</p>
                            )}
                            <Button
                                size="sm"
                                className="w-full"
                                onClick={() => handleConnect(platform.id)}
                                disabled={loading === platform.id}
                            >
                                {loading === platform.id ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Connecting...
                                    </>
                                ) : (
                                    "Connect"
                                )}
                            </Button>
                        </div>
                    )}
                </Card>
            ))}
        </div>
    );
}
