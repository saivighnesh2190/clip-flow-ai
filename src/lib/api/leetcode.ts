// LeetCode API Service
// Using LeetCode's GraphQL API (unofficial)

export interface LeetCodeUser {
    username: string;
    realName: string;
    avatar: string;
    ranking: number;
    reputation: number;
}

export interface LeetCodeStats {
    user: LeetCodeUser | null;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    acceptanceRate: number;
    submissionCalendar: Record<string, number>;
    recentSubmissions: {
        title: string;
        timestamp: string;
        statusDisplay: string;
    }[];
    topicProgress: { topic: string; solved: number }[];
}

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";

export async function fetchLeetCodeUser(username: string): Promise<LeetCodeStats | null> {
    const query = `
    query userPublicProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          realName
          userAvatar
          ranking
          reputation
        }
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        submissionCalendar
      }
      recentAcSubmissionList(username: $username, limit: 20) {
        title
        timestamp
        statusDisplay
      }
    }
  `;

    try {
        const response = await fetch(LEETCODE_GRAPHQL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
                variables: { username },
            }),
        });

        const data = await response.json();

        if (data.data?.matchedUser) {
            const user = data.data.matchedUser;
            const stats = user.submitStats?.acSubmissionNum || [];

            const easySolved = stats.find((s: { difficulty: string }) => s.difficulty === "Easy")?.count || 0;
            const mediumSolved = stats.find((s: { difficulty: string }) => s.difficulty === "Medium")?.count || 0;
            const hardSolved = stats.find((s: { difficulty: string }) => s.difficulty === "Hard")?.count || 0;
            const totalSolved = stats.find((s: { difficulty: string }) => s.difficulty === "All")?.count || (easySolved + mediumSolved + hardSolved);

            return {
                user: {
                    username: user.username,
                    realName: user.profile?.realName || user.username,
                    avatar: user.profile?.userAvatar || "",
                    ranking: user.profile?.ranking || 0,
                    reputation: user.profile?.reputation || 0,
                },
                totalSolved,
                easySolved,
                mediumSolved,
                hardSolved,
                acceptanceRate: 0, // Would need additional query
                submissionCalendar: user.submissionCalendar ? JSON.parse(user.submissionCalendar) : {},
                recentSubmissions: data.data.recentAcSubmissionList || [],
                topicProgress: [],
            };
        }
        return null;
    } catch (error) {
        console.error("LeetCode API error:", error);
        return null;
    }
}

export async function getLeetCodeStats(username: string): Promise<LeetCodeStats> {
    const stats = await fetchLeetCodeUser(username);

    if (!stats) {
        return {
            user: null,
            totalSolved: 0,
            easySolved: 0,
            mediumSolved: 0,
            hardSolved: 0,
            acceptanceRate: 0,
            submissionCalendar: {},
            recentSubmissions: [],
            topicProgress: [],
        };
    }

    return stats;
}
