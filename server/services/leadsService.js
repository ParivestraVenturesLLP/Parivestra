import { getSupabaseClient } from './supabaseClient.js';

export const createLead = async ({ name, brandName, phoneNumber, serviceRequired, emailId, source = 'contact_form' }) => {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
        .from('leads')
        .insert({
            name,
            brand_name: brandName,
            phone: phoneNumber,
            email: emailId,
            service_required: serviceRequired,
            source,
        })
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const listLeads = async () => {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};

export const updateLeadStatus = async (id, status) => {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};
