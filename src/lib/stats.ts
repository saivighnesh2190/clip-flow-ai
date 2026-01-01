import { createClient } from '@/lib/supabase/client';

export interface DailyStats {
    id: string;
    user_id: string;
    date: string;
    leetcode_solved: number;
    leetcode_rating: number | null;
    codeforces_solved: number;
    codeforces_rating: number | null;
    created_at: string;
}

/**
 * Save or update daily stats for the current user
 */
export async function saveDailyStats(stats: {
    leetcode_solved?: number;
    leetcode_rating?: number;
    codeforces_solved?: number;
    codeforces_rating?: number;
}): Promise<boolean> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    const today = new Date().toISOString().split('T')[0];

    const { error } = await supabase
        .from('daily_stats')
        .upsert({
            user_id: user.id,
            date: today,
            leetcode_solved: stats.leetcode_solved || 0,
            leetcode_rating: stats.leetcode_rating || null,
            codeforces_solved: stats.codeforces_solved || 0,
            codeforces_rating: stats.codeforces_rating || null,
        }, {
            onConflict: 'user_id,date'
        });

    if (error) {
        console.error('Error saving daily stats:', error);
        return false;
    }

    return true;
}

/**
 * Get daily stats for the specified date range
 */
export async function getDailyStats(days: number = 30): Promise<DailyStats[]> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
        .from('daily_stats')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', startDate.toISOString().split('T')[0])
        .order('date', { ascending: true });

    if (error) {
        console.error('Error fetching daily stats:', error);
        return [];
    }

    return data || [];
}

/**
 * Calculate current streak (consecutive days with activity)
 */
export async function calculateStreak(): Promise<{ current: number; longest: number }> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { current: 0, longest: 0 };

    const { data, error } = await supabase
        .from('daily_stats')
        .select('date, leetcode_solved, codeforces_solved')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

    if (error || !data) {
        console.error('Error calculating streak:', error);
        return { current: 0, longest: 0 };
    }

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < data.length; i++) {
        const stat = data[i];
        const statDate = new Date(stat.date);
        statDate.setHours(0, 0, 0, 0);

        const totalSolved = (stat.leetcode_solved || 0) + (stat.codeforces_solved || 0);

        if (totalSolved > 0) {
            // Check if this is a consecutive day
            const expectedDate = new Date(today);
            expectedDate.setDate(expectedDate.getDate() - i);

            if (statDate.getTime() === expectedDate.getTime()) {
                currentStreak++;
            } else {
                break;
            }
        } else {
            break;
        }
    }

    // Calculate longest streak
    for (const stat of data) {
        const totalSolved = (stat.leetcode_solved || 0) + (stat.codeforces_solved || 0);
        if (totalSolved > 0) {
            tempStreak++;
            longestStreak = Math.max(longestStreak, tempStreak);
        } else {
            tempStreak = 0;
        }
    }

    return { current: currentStreak, longest: Math.max(longestStreak, currentStreak) };
}

/**
 * Get activity data for heatmap (last 365 days)
 */
export async function getActivityHeatmap(): Promise<{ date: string; count: number }[]> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 365);

    const { data, error } = await supabase
        .from('daily_stats')
        .select('date, leetcode_solved, codeforces_solved')
        .eq('user_id', user.id)
        .gte('date', startDate.toISOString().split('T')[0]);

    if (error) {
        console.error('Error fetching activity data:', error);
        return [];
    }

    return (data || []).map(stat => ({
        date: stat.date,
        count: (stat.leetcode_solved || 0) + (stat.codeforces_solved || 0)
    }));
}
