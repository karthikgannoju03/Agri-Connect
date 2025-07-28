import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// In production, these values would be in environment variables
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';

export const supabase = createClient(supabaseUrl, supabaseKey);