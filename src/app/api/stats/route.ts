import { NextRequest, NextResponse } from "next/server";
import { getCodeforcesStats } from "@/lib/api/codeforces";
import { getLeetCodeStats } from "@/lib/api/leetcode";
import { getCodeChefStats } from "@/lib/api/codechef";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get("platform");
    const username = searchParams.get("username");

    if (!platform || !username) {
        return NextResponse.json({ error: "Missing platform or username" }, { status: 400 });
    }

    try {
        let stats;
        switch (platform.toLowerCase()) {
            case "codeforces":
                stats = await getCodeforcesStats(username);
                break;
            case "leetcode":
                stats = await getLeetCodeStats(username);
                break;
            case "codechef":
                stats = await getCodeChefStats(username);
                break;
            default:
                return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
        }

        return NextResponse.json({ success: true, data: stats });
    } catch (error) {
        console.error("Stats API error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
