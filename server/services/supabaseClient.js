import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

let client = null;

export const getSupabaseClient = () => {
    if (client) return client;

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error('Supabase configuration is missing (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).');
    }

    client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
    });

    return client;
};
