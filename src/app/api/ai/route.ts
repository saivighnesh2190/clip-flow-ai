import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

interface PlatformStats {
    codeforces?: {
        handle: string;
        rating: number;
        maxRating: number;
        rank: string;
        totalSolved: number;
        problemsByTag: Record<string, number>;
    };
    leetcode?: {
        username: string;
        ranking: number;
        totalSolved: number;
        easySolved: number;
        mediumSolved: number;
        hardSolved: number;
    };
}

async function getQuickInsight(ai: GoogleGenAI, stats: PlatformStats): Promise<string> {
    const prompt = `You are ClipFlow AI, a helpful DSA learning assistant. Based on the following coding profile stats, provide a brief, actionable insight (2-3 sentences max):

${JSON.stringify(stats, null, 2)}

Focus on one specific area for improvement or encouragement. Be concise and motivating.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text || "Keep practicing! Consistency is key to mastering DSA.";
    } catch (error) {
        console.error("Gemini quick insight error:", error);
        return "Keep practicing! Consistency is key to mastering DSA.";
    }
}

async function getDetailedAnalysis(ai: GoogleGenAI, stats: PlatformStats): Promise<string> {
    const prompt = `You are ClipFlow AI, an expert DSA mentor. Analyze the following coding profile comprehensively:

${JSON.stringify(stats, null, 2)}

Provide:
1. **Strengths**: What topics/areas is this user strong in?
2. **Weaknesses**: What areas need improvement?
3. **Recommended Focus**: Top 3 topics to practice this week
4. **Problem Suggestions**: Specific problem types to attempt
5. **Goal Setting**: Realistic weekly targets

Format your response in clear markdown with headers.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text || "Unable to generate detailed analysis. Please try again.";
    } catch (error) {
        console.error("Gemini detailed analysis error:", error);
        return "Unable to generate detailed analysis. Please try again.";
    }
}

async function chatWithAI(
    ai: GoogleGenAI,
    message: string,
    stats: PlatformStats,
    conversationHistory: { role: "user" | "assistant"; content: string }[]
): Promise<string> {
    const systemContext = `You are ClipFlow AI, a friendly and expert DSA learning assistant. You help students master data structures and algorithms by analyzing their progress across coding platforms.

Current user stats:
${JSON.stringify(stats, null, 2)}

You can:
- Answer DSA questions
- Explain algorithms and data structures
- Suggest problems to practice
- Provide study strategies
- Analyze their coding journey
- Give motivational support

Be concise, helpful, and encouraging. Use code examples when explaining concepts.`;

    const historyText = conversationHistory
        .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
        .join("\n\n");

    const prompt = `${systemContext}

${historyText ? `Previous conversation:\n${historyText}\n\n` : ""}User: ${message}

Respond helpfully and concisely:`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text || "I'm having trouble responding right now. Please try again!";
    } catch (error) {
        console.error("Gemini chat error:", error);
        return "I'm having trouble responding right now. Please try again!";
    }
}

async function getDailyRecommendation(ai: GoogleGenAI, stats: PlatformStats): Promise<{
    topic: string;
    reason: string;
    problems: string[];
}> {
    const prompt = `Based on these coding stats, recommend ONE specific DSA topic to practice today:

${JSON.stringify(stats, null, 2)}

Return ONLY valid JSON in this exact format:
{
  "topic": "topic name",
  "reason": "why this topic (1 sentence)",
  "problems": ["problem type 1", "problem type 2", "problem type 3"]
}`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        const text = response.text || "";
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
    } catch (error) {
        console.error("Gemini recommendation error:", error);
    }

    return {
        topic: "Arrays",
        reason: "Foundation for all DSA concepts",
        problems: ["Two Sum", "Best Time to Buy and Sell Stock", "Contains Duplicate"],
    };
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action, message, stats, history, apiKey } = body;

        if (!apiKey) {
            return NextResponse.json({ error: "API key required" }, { status: 401 });
        }

        const ai = new GoogleGenAI({ apiKey });

        let result;
        switch (action) {
            case "chat":
                result = await chatWithAI(ai, message, stats as PlatformStats, history || []);
                return NextResponse.json({ success: true, response: result });

            case "quick_insight":
                result = await getQuickInsight(ai, stats as PlatformStats);
                return NextResponse.json({ success: true, insight: result });

            case "detailed_analysis":
                result = await getDetailedAnalysis(ai, stats as PlatformStats);
                return NextResponse.json({ success: true, analysis: result });

            case "daily_recommendation":
                result = await getDailyRecommendation(ai, stats as PlatformStats);
                return NextResponse.json({ success: true, recommendation: result });

            default:
                return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }
    } catch (error) {
        console.error("AI API error:", error);
        return NextResponse.json({ error: "AI service error" }, { status: 500 });
    }
}
