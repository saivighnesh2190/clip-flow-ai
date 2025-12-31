// Codeforces API Service
// Public API: https://codeforces.com/apiHelp

export interface CodeforcesUser {
    handle: string;
    rating: number;
    maxRating: number;
    rank: string;
    maxRank: string;
    contribution: number;
    friendOfCount: number;
    avatar: string;
    titlePhoto: string;
}

export interface CodeforcesSubmission {
    id: number;
    contestId: number;
    problem: {
        contestId: number;
        index: string;
        name: string;
        type: string;
        rating?: number;
        tags: string[];
    };
    verdict: string;
    creationTimeSeconds: number;
}

export interface CodeforcesStats {
    user: CodeforcesUser | null;
    totalSolved: number;
    submissions: CodeforcesSubmission[];
    ratingHistory: { date: string; rating: number }[];
    problemsByDifficulty: Record<string, number>;
    problemsByTag: Record<string, number>;
    recentActivity: CodeforcesSubmission[];
}

export async function fetchCodeforcesUser(handle: string): Promise<CodeforcesUser | null> {
    try {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
        const data = await response.json();

        if (data.status === "OK" && data.result?.[0]) {
            return data.result[0];
        }
        return null;
    } catch (error) {
        console.error("Codeforces API error:", error);
        return null;
    }
}

export async function fetchCodeforcesSubmissions(handle: string): Promise<CodeforcesSubmission[]> {
    try {
        const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=500`);
        const data = await response.json();

        if (data.status === "OK") {
            return data.result || [];
        }
        return [];
    } catch (error) {
        console.error("Codeforces submissions error:", error);
        return [];
    }
}

export async function fetchCodeforcesRating(handle: string): Promise<{ date: string; rating: number }[]> {
    try {
        const response = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
        const data = await response.json();

        if (data.status === "OK") {
            return data.result.map((r: { ratingUpdateTimeSeconds: number; newRating: number }) => ({
                date: new Date(r.ratingUpdateTimeSeconds * 1000).toLocaleDateString(),
                rating: r.newRating,
            }));
        }
        return [];
    } catch (error) {
        console.error("Codeforces rating error:", error);
        return [];
    }
}

export async function getCodeforcesStats(handle: string): Promise<CodeforcesStats> {
    const [user, submissions, ratingHistory] = await Promise.all([
        fetchCodeforcesUser(handle),
        fetchCodeforcesSubmissions(handle),
        fetchCodeforcesRating(handle),
    ]);

    // Calculate solved problems (unique, accepted)
    const solvedProblems = new Set<string>();
    const problemsByDifficulty: Record<string, number> = {};
    const problemsByTag: Record<string, number> = {};

    submissions.forEach((sub) => {
        if (sub.verdict === "OK") {
            const problemId = `${sub.problem.contestId}-${sub.problem.index}`;
            if (!solvedProblems.has(problemId)) {
                solvedProblems.add(problemId);

                // Count by difficulty
                const rating = sub.problem.rating || 0;
                const difficultyBucket = rating === 0 ? "Unrated" :
                    rating < 1200 ? "800-1100" :
                        rating < 1600 ? "1200-1500" :
                            rating < 2000 ? "1600-1900" :
                                rating < 2400 ? "2000-2300" : "2400+";
                problemsByDifficulty[difficultyBucket] = (problemsByDifficulty[difficultyBucket] || 0) + 1;

                // Count by tag
                sub.problem.tags.forEach((tag) => {
                    problemsByTag[tag] = (problemsByTag[tag] || 0) + 1;
                });
            }
        }
    });

    // Recent activity (last 20 submissions)
    const recentActivity = submissions.slice(0, 20);

    return {
        user,
        totalSolved: solvedProblems.size,
        submissions,
        ratingHistory,
        problemsByDifficulty,
        problemsByTag,
        recentActivity,
    };
}
