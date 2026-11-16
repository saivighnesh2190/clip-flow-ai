import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://piyruadguxstoykbrapf.supabase.co";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpeXJ1YWRndXhzdG95a2JyYXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNTYzMzQsImV4cCI6MjA4MjczMjMzNH0.LLBIK_caATdOR-y-KYwhFpHW69AxhWksFHGpTtAXd0A";
    
    return createBrowserClient(
        supabaseUrl,
        supabaseAnonKey
    );
}
