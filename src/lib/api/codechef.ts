// CodeChef API Service
// Note: Most free CodeChef APIs are unstable. Using multiple fallbacks.

export interface CodeChefUser {
    username: string;
    name: string;
    currentRating: number;
    highestRating: number;
    stars: string;
    countryName: string;
}

export interface CodeChefStats {
    user: CodeChefUser | null;
    totalSolved: number;
    fullysolvedCount: number;
    partiallySolvedCount: number;
    ratingHistory: { date: string; rating: number }[];
    recentContests: { name: string; rating: number; rank: number }[];
}

export async function getCodeChefStats(username: string): Promise<CodeChefStats> {
    // Try multiple API endpoints
    const apis = [
        `https://codechef-api.vercel.app/handle/${username}`,
        `https://codechef-api-fork.onrender.com/handle/${username}`,
    ];

    for (const apiUrl of apis) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(apiUrl, {
                signal: controller.signal,
                headers: { Accept: "application/json" },
            });

            clearTimeout(timeoutId);

            if (!response.ok) continue;

            const data = await response.json();

            if (data.success === false || !data.name) continue;

            return {
                user: {
                    username: data.username || username,
                    name: data.name || username,
                    currentRating: data.currentRating || 0,
                    highestRating: data.highestRating || 0,
                    stars: data.stars || "1★",
                    countryName: data.countryName || "Unknown",
                },
                totalSolved: (data.fullysolvedCount || 0) + (data.partiallySolvedCount || 0),
                fullysolvedCount: data.fullysolvedCount || 0,
                partiallySolvedCount: data.partiallySolvedCount || 0,
                ratingHistory: (data.ratingData || []).map((r: { code: string; rating: string }) => ({
                    date: r.code,
                    rating: parseInt(r.rating) || 0,
                })),
                recentContests: [],
            };
        } catch (error) {
            console.error(`CodeChef API error for ${apiUrl}:`, error);
            continue;
        }
    }

    // If all APIs fail, return a placeholder that indicates the username was accepted
    // This allows the user to still see their profile is "connected"
    return {
        user: {
            username: username,
            name: username,
            currentRating: 0,
            highestRating: 0,
            stars: "⭐",
            countryName: "Unknown",
        },
        totalSolved: 0,
        fullysolvedCount: 0,
        partiallySolvedCount: 0,
        ratingHistory: [],
        recentContests: [],
    };
}
