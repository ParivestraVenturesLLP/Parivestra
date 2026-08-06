const API_BASE_URL = import.meta.env.PROD ? '/api/tools' : 'http://localhost:5000/api/tools';

export const getTools = async () => {
    const response = await fetch(API_BASE_URL);
    const result = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(result?.message || 'Failed to load tools.');
    }

    return result?.tools || [];
};
