import { listTools } from '../services/toolsService.js';

export const getTools = async (req, res, next) => {
    try {
        const tools = await listTools();
        res.status(200).json({ success: true, tools });
    } catch (error) {
        console.error('[ToolsController] Error listing tools:', error.message);
        next(error);
    }
};
