import { createClient } from '@/lib/supabase/client';
import { encrypt, decrypt } from '@/lib/crypto';

export interface Profile {
    id: string;
    user_id: string;
    leetcode_username: string | null;
    codeforces_username: string | null;
    gemini_api_key_encrypted: string | null;
    created_at: string;
    updated_at: string;
}

export interface ConnectedPlatform {
    platform: string;
    username: string;
}

/**
 * Get the current user's profile from database
 */
export async function getProfile(): Promise<Profile | null> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

    if (error) {
        console.error('Error fetching profile:', error);
        // If profile doesn't exist, create one
        if (error.code === 'PGRST116') {
            const { data: newProfile } = await supabase
                .from('profiles')
                .insert({ user_id: user.id })
                .select()
                .single();
            return newProfile;
        }
        return null;
    }

    return data;
}

/**
 * Get connected platforms from user profile
 */
export async function getConnectedPlatforms(): Promise<ConnectedPlatform[]> {
    const profile = await getProfile();
    if (!profile) return [];

    const platforms: ConnectedPlatform[] = [];

    if (profile.leetcode_username) {
        platforms.push({ platform: 'leetcode', username: profile.leetcode_username });
    }
    if (profile.codeforces_username) {
        platforms.push({ platform: 'codeforces', username: profile.codeforces_username });
    }

    return platforms;
}

/**
 * Connect a platform account
 */
export async function connectPlatform(platform: string, username: string): Promise<boolean> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    const updateData: Record<string, string> = {
        updated_at: new Date().toISOString(),
    };

    if (platform === 'leetcode') {
        updateData.leetcode_username = username;
    } else if (platform === 'codeforces') {
        updateData.codeforces_username = username;
    }

    const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('user_id', user.id);

    if (error) {
        console.error('Error connecting platform:', error);
        return false;
    }

    return true;
}

/**
 * Disconnect a platform account
 */
export async function disconnectPlatform(platform: string): Promise<boolean> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    const updateData: Record<string, string | null> = {
        updated_at: new Date().toISOString(),
    };

    if (platform === 'leetcode') {
        updateData.leetcode_username = null;
    } else if (platform === 'codeforces') {
        updateData.codeforces_username = null;
    }

    const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('user_id', user.id);

    if (error) {
        console.error('Error disconnecting platform:', error);
        return false;
    }

    return true;
}

/**
 * Save encrypted Gemini API key
 */
export async function saveGeminiApiKey(apiKey: string): Promise<boolean> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    const encryptedKey = encrypt(apiKey);

    const { error } = await supabase
        .from('profiles')
        .update({
            gemini_api_key_encrypted: encryptedKey,
            updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

    if (error) {
        console.error('Error saving API key:', error);
        return false;
    }

    return true;
}

/**
 * Get decrypted Gemini API key
 */
export async function getGeminiApiKey(): Promise<string | null> {
    const profile = await getProfile();
    if (!profile?.gemini_api_key_encrypted) return null;

    return decrypt(profile.gemini_api_key_encrypted);
}

/**
 * Remove Gemini API key
 */
export async function removeGeminiApiKey(): Promise<boolean> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    const { error } = await supabase
        .from('profiles')
        .update({
            gemini_api_key_encrypted: null,
            updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

    if (error) {
        console.error('Error removing API key:', error);
        return false;
    }

    return true;
}
