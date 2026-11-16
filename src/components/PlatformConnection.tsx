"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    CheckCircle2, 
    ExternalLink, 
    Unlink, 
    ArrowRight, 
    Loader2, 
    Cpu, 
    Radio,
    Terminal,
    ShieldCheck
} from "lucide-react";

interface PlatformConnectionProps {
    onConnect: (platform: string, username: string) => void;
    onDisconnect: (platform: string) => void;
    connectedPlatforms: { platform: string; username: string }[];
    compact?: boolean;
}

const platforms = [
    {
        id: "codeforces",
        name: "Codeforces",
        topBorder: "border-t-blue-500",
        beaconGlow: "status-beacon-blue",
        glowColor: "rgba(49, 140, 231, 0.2)",
        placeholder: "Codeforces Handle (e.g. tourist)",
        profileUrl: (username: string) => `https://codeforces.com/profile/${username}`,
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <rect x="2.5" y="10" width="4.5" height="11" rx="1.5" fill="#318CE7" />
                <rect x="9.5" y="3.5" width="4.5" height="17.5" rx="1.5" fill="#2563EB" />
                <rect x="16.5" y="12.5" width="4.5" height="8.5" rx="1.5" fill="#EF4444" />
            </svg>
        ),
    },
    {
        id: "leetcode",
        name: "LeetCode",
        topBorder: "border-t-amber-500",
        beaconGlow: "status-beacon-amber",
        glowColor: "rgba(255, 161, 22, 0.2)",
        placeholder: "LeetCode Username (e.g. neetcode)",
        profileUrl: (username: string) => `https://leetcode.com/u/${username}`,
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.874 5.874 0 0 0 .749 1.838 5.606 5.606 0 0 0 1.554 1.591l4.032 2.548a1.373 1.373 0 0 0 1.942-.511 1.376 1.376 0 0 0-.512-1.943l-3.968-2.507a3.02 3.02 0 0 1-.844-.863 3.003 3.003 0 0 1-.406-.994 3.064 3.064 0 0 1-.036-1.284 3.026 3.026 0 0 1 .665-1.155l3.854-4.126 5.406-5.788a1.375 1.375 0 0 0-.962-2.355z" fill="#FFA116" />
                <path d="M9.833 13.921a1.377 1.377 0 0 0 0 2.753h8.334a1.377 1.377 0 0 0 0-2.753H9.833z" fill="#A0A0A0" />
            </svg>
        ),
    },
];

export default function PlatformConnection({ 
    onConnect, 
    onDisconnect, 
    connectedPlatforms,
    compact = false
}: PlatformConnectionProps) {
    const [inputValues, setInputValues] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleConnect = async (platformId: string) => {
        const username = inputValues[platformId]?.trim();
        if (!username) {
            setErrors({ ...errors, [platformId]: "Please enter a handle" });
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
                setErrors({ ...errors, [platformId]: data.error || "User not found" });
            }
        } catch {
            setErrors({ ...errors, [platformId]: "Network check failed." });
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
            {platforms.map((platform) => {
                const connected = isConnected(platform.id);
                const username = getConnectedUsername(platform.id);

                return (
                    <Card
                        key={platform.id}
                        className={`hardware-cartridge rounded-2xl p-4 md:p-5 border-t-2 ${platform.topBorder} relative overflow-hidden`}
                    >
                        {/* Top Hardware Strip */}
                        <div className="flex items-center justify-between mb-3.5">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl apple-glass-pill flex items-center justify-center p-2 shadow-sm">
                                    {platform.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm text-foreground tracking-tight flex items-center gap-2">
                                        <span>{platform.name}</span>
                                        <span className="font-mono text-[10px] text-muted-foreground uppercase">
                                            // Cartridge
                                        </span>
                                    </h3>
                                    <p className="text-[11px] text-muted-foreground">
                                        {connected ? "Active Socket • Live Polling" : "Cartridge Standby"}
                                    </p>
                                </div>
                            </div>

                            {/* LED Beacon Status */}
                            {connected ? (
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-beacon-green animate-pulse" />
                                    <span>STREAM_OK</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-muted-foreground">
                                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                                    <span>UNSLOTTED</span>
                                </div>
                            )}
                        </div>

                        {/* Connected Socket View */}
                        {connected && username ? (
                            <div className="space-y-3 pt-1">
                                <div className="p-3 rounded-xl bg-black/25 dark:bg-black/30 border border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-mono font-bold text-foreground">
                                            {username.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-mono text-xs font-semibold text-foreground">
                                                    @{username}
                                                </span>
                                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                            </div>
                                            <span className="text-[10px] font-mono text-muted-foreground">VERIFIED_HANDLE</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <a
                                            href={platform.profileUrl(username)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 rounded-full apple-glass-pill text-muted-foreground hover:text-foreground transition-colors"
                                            title="View Public Profile"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                        <button
                                            onClick={() => onDisconnect(platform.id)}
                                            className="px-2.5 py-1 rounded-full text-[10px] font-mono text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                            title="Unslot Cartridge"
                                        >
                                            Unslot
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Unslotted Input View */
                            <div className="space-y-2.5 pt-1">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={inputValues[platform.id] || ""}
                                        onChange={(e) =>
                                            setInputValues({ ...inputValues, [platform.id]: e.target.value })
                                        }
                                        placeholder={platform.placeholder}
                                        className="flex-1 px-3.5 py-2 rounded-full apple-glass text-xs text-foreground placeholder:text-muted-foreground/50 border border-white/10 focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                                        onKeyDown={(e) => e.key === "Enter" && handleConnect(platform.id)}
                                    />
                                    <Button
                                        size="sm"
                                        className="h-8 px-4 rounded-full apple-button-prominent text-xs font-medium shrink-0"
                                        onClick={() => handleConnect(platform.id)}
                                        disabled={loading === platform.id}
                                    >
                                        {loading === platform.id ? (
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                        ) : (
                                            <>
                                                Slot In
                                                <ArrowRight className="w-3 h-3 ml-1" />
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {errors[platform.id] && (
                                    <p className="text-[11px] font-mono text-rose-500 px-2">{errors[platform.id]}</p>
                                )}
                            </div>
                        )}
                    </Card>
                );
            })}
        </div>
    );
}
