import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

// Admin emails that can access this endpoint
const ADMIN_EMAILS = ["nsv2190@gmail.com", "nsaivighnesh@zohomail.in"];

export async function GET() {
    try {
        // Check if user is authenticated and is admin
        const supabase = await createServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!ADMIN_EMAILS.includes(user.email || "")) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Create admin client with service role key to bypass RLS
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // Fetch all profiles
        const { data: profiles, error } = await supabaseAdmin
            .from("profiles")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching profiles:", error);
            return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
        }

        // Calculate stats
        const stats = {
            total_users: profiles?.length || 0,
            users_with_leetcode: profiles?.filter(p => p.leetcode_username).length || 0,
            users_with_codeforces: profiles?.filter(p => p.codeforces_username).length || 0,
            users_with_api_key: profiles?.filter(p => p.gemini_api_key_encrypted).length || 0,
        };

        return NextResponse.json({
            stats,
            users: profiles?.map(p => ({
                user_id: p.user_id,
                leetcode_username: p.leetcode_username,
                codeforces_username: p.codeforces_username,
                created_at: p.created_at,
            })) || [],
        });
    } catch (error) {
        console.error("Admin API error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
