const API_BASE_URL = import.meta.env.PROD ? '/api/admin' : 'http://localhost:5000/api/admin';

const parseResponse = async (response) => {
    const result = await response.json().catch(() => null);
    if (!response.ok) {
        const error = new Error(result?.message || 'An unexpected error occurred.');
        error.status = response.status;
        throw error;
    }
    return result;
};

export const loginAdmin = async (password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
    });
    return parseResponse(response);
};

export const getLeads = async (password) => {
    const response = await fetch(`${API_BASE_URL}/leads`, {
        headers: { Authorization: `Bearer ${password}` },
    });
    return parseResponse(response);
};

export const updateLeadStatus = async (id, status, password) => {
    const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ status }),
    });
    return parseResponse(response);
};

export const getAdminTools = async (password) => {
    const response = await fetch(`${API_BASE_URL}/tools`, {
        headers: { Authorization: `Bearer ${password}` },
    });
    return parseResponse(response);
};

export const createTool = async (data, password) => {
    const response = await fetch(`${API_BASE_URL}/tools`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify(data),
    });
    return parseResponse(response);
};

export const updateTool = async (id, data, password) => {
    const response = await fetch(`${API_BASE_URL}/tools/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify(data),
    });
    return parseResponse(response);
};

export const deleteTool = async (id, password) => {
    const response = await fetch(`${API_BASE_URL}/tools/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${password}` },
    });
    return parseResponse(response);
};
