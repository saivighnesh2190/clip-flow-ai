"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface UserStats {
    total_users: number;
    users_with_leetcode: number;
    users_with_codeforces: number;
    users_with_api_key: number;
}

interface UserProfile {
    user_id: string;
    leetcode_username: string | null;
    codeforces_username: string | null;
    created_at: string;
}

export default function AdminPage() {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [stats, setStats] = useState<UserStats | null>(null);
    const [users, setUsers] = useState<UserProfile[]>([]);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        checkAdminAndLoadData();
    }, []);

    const checkAdminAndLoadData = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push("/login");
            return;
        }

        // Check if user is admin (hardcode your email as admin for now)
        const adminEmails = ["nsv2190@gmail.com", "nsaivighnesh@zohomail.in"];
        if (!adminEmails.includes(user.email || "")) {
            setIsAdmin(false);
            setLoading(false);
            return;
        }

        setIsAdmin(true);

        // Fetch stats from admin API (bypasses RLS)
        try {
            const response = await fetch("/api/admin");
            if (response.ok) {
                const data = await response.json();
                setStats(data.stats);
                setUsers(data.users);
            }
        } catch (error) {
            console.error("Error fetching admin data:", error);
        }

        setLoading(false);
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

    if (!isAdmin) {
        return (
            <main className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-32 flex flex-col items-center justify-center text-center px-4">
                    <div className="text-6xl mb-4">🔒</div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
                    <p className="text-muted-foreground mb-6">You don&apos;t have permission to view this page.</p>
                    <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <section className="pt-28 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-red-500/20 text-red-500 text-xs font-medium rounded-full">ADMIN</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Manage users and view platform statistics</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <Card className="p-4 border-border/50">
                            <p className="text-sm text-muted-foreground">Total Users</p>
                            <p className="text-3xl font-bold text-foreground">{stats?.total_users || 0}</p>
                        </Card>
                        <Card className="p-4 border-border/50">
                            <p className="text-sm text-muted-foreground">LeetCode Connected</p>
                            <p className="text-3xl font-bold text-yellow-500">{stats?.users_with_leetcode || 0}</p>
                        </Card>
                        <Card className="p-4 border-border/50">
                            <p className="text-sm text-muted-foreground">Codeforces Connected</p>
                            <p className="text-3xl font-bold text-blue-500">{stats?.users_with_codeforces || 0}</p>
                        </Card>
                        <Card className="p-4 border-border/50">
                            <p className="text-sm text-muted-foreground">AI Enabled</p>
                            <p className="text-3xl font-bold text-green-500">{stats?.users_with_api_key || 0}</p>
                        </Card>
                    </div>

                    {/* Users Table */}
                    <Card className="border-border/50 overflow-hidden">
                        <div className="p-4 border-b border-border/50">
                            <h3 className="font-semibold text-foreground">Users ({users.length})</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">#</th>
                                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">User ID</th>
                                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">LeetCode</th>
                                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Codeforces</th>
                                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user.user_id} className="border-t border-border/50 hover:bg-muted/30 transition-colors">
                                            <td className="p-4 text-sm text-muted-foreground">{index + 1}</td>
                                            <td className="p-4">
                                                <code className="text-xs bg-muted px-2 py-1 rounded">
                                                    {user.user_id.substring(0, 8)}...
                                                </code>
                                            </td>
                                            <td className="p-4">
                                                {user.leetcode_username ? (
                                                    <span className="text-yellow-500 font-medium">{user.leetcode_username}</span>
                                                ) : (
                                                    <span className="text-muted-foreground">—</span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                {user.codeforces_username ? (
                                                    <span className="text-blue-500 font-medium">{user.codeforces_username}</span>
                                                ) : (
                                                    <span className="text-muted-foreground">—</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-sm text-muted-foreground">
                                                {user.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}
                                            </td>
                                        </tr>
                                    ))}
                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                                No users found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </section>

            <Footer />
        </main>
    );
}
