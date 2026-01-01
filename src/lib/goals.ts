import { createClient } from '@/lib/supabase/client';

export interface Goal {
    id: string;
    user_id: string;
    goal_type: 'daily' | 'weekly' | 'rating';
    target_value: number;
    current_value: number;
    deadline: string | null;
    completed: boolean;
    created_at: string;
}

/**
 * Create a new goal
 */
export async function createGoal(goal: {
    goal_type: 'daily' | 'weekly' | 'rating';
    target_value: number;
    deadline?: string;
}): Promise<Goal | null> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
        .from('goals')
        .insert({
            user_id: user.id,
            goal_type: goal.goal_type,
            target_value: goal.target_value,
            current_value: 0,
            deadline: goal.deadline || null,
            completed: false,
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating goal:', error);
        return null;
    }

    return data;
}

/**
 * Get all active goals for the current user
 */
export async function getActiveGoals(): Promise<Goal[]> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .eq('completed', false)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching goals:', error);
        return [];
    }

    return data || [];
}

/**
 * Update goal progress
 */
export async function updateGoalProgress(goalId: string, currentValue: number): Promise<boolean> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    // First get the goal to check target
    const { data: goal } = await supabase
        .from('goals')
        .select('target_value')
        .eq('id', goalId)
        .eq('user_id', user.id)
        .single();

    if (!goal) return false;

    const completed = currentValue >= goal.target_value;

    const { error } = await supabase
        .from('goals')
        .update({
            current_value: currentValue,
            completed,
        })
        .eq('id', goalId)
        .eq('user_id', user.id);

    if (error) {
        console.error('Error updating goal:', error);
        return false;
    }

    return true;
}

/**
 * Delete a goal
 */
export async function deleteGoal(goalId: string): Promise<boolean> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', goalId)
        .eq('user_id', user.id);

    if (error) {
        console.error('Error deleting goal:', error);
        return false;
    }

    return true;
}

/**
 * Get completed goals count
 */
export async function getCompletedGoalsCount(): Promise<number> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return 0;

    const { count } = await supabase
        .from('goals')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('completed', true);

    return count || 0;
}
