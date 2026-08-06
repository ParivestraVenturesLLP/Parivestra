import { getSupabaseClient } from './supabaseClient.js';

export const listTools = async () => {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data;
};

export const createTool = async ({ name, description, icon, displayOrder = 0 }) => {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
        .from('tools')
        .insert({ name, description, icon, display_order: displayOrder })
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const updateTool = async (id, { name, description, icon, displayOrder }) => {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
        .from('tools')
        .update({ name, description, icon, display_order: displayOrder })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const deleteTool = async (id) => {
    const supabase = getSupabaseClient();

    const { error } = await supabase
        .from('tools')
        .delete()
        .eq('id', id);

    if (error) throw error;
};
