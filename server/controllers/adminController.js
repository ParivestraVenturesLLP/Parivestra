import { timingSafeEqual } from '../middleware/adminAuth.js';
import { listLeads, updateLeadStatus } from '../services/leadsService.js';
import { listTools, createTool, updateTool, deleteTool } from '../services/toolsService.js';

export const login = (req, res) => {
    const expected = process.env.ADMIN_DASHBOARD_PASSWORD;
    const { password } = req.body;

    if (!expected) {
        return res.status(500).json({ success: false, message: 'Admin dashboard is not configured.' });
    }

    if (!password || !timingSafeEqual(password, expected)) {
        return res.status(401).json({ success: false, message: 'Incorrect password.' });
    }

    res.status(200).json({ success: true });
};

export const getLeads = async (req, res, next) => {
    try {
        const leads = await listLeads();
        res.status(200).json({ success: true, leads });
    } catch (error) {
        console.error('[AdminController] Error listing leads:', error.message);
        next(error);
    }
};

export const patchLeadStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = ['new', 'contacted', 'qualified', 'closed'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status value.' });
        }

        const lead = await updateLeadStatus(id, status);
        res.status(200).json({ success: true, lead });
    } catch (error) {
        console.error('[AdminController] Error updating lead status:', error.message);
        next(error);
    }
};

export const getAdminTools = async (req, res, next) => {
    try {
        const tools = await listTools();
        res.status(200).json({ success: true, tools });
    } catch (error) {
        console.error('[AdminController] Error listing tools:', error.message);
        next(error);
    }
};

export const postTool = async (req, res, next) => {
    try {
        const { name, description, icon, displayOrder } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: 'Tool name is required.' });
        }

        const tool = await createTool({ name, description, icon, displayOrder });
        res.status(201).json({ success: true, tool });
    } catch (error) {
        console.error('[AdminController] Error creating tool:', error.message);
        next(error);
    }
};

export const patchTool = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, icon, displayOrder } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: 'Tool name is required.' });
        }

        const tool = await updateTool(id, { name, description, icon, displayOrder });
        res.status(200).json({ success: true, tool });
    } catch (error) {
        console.error('[AdminController] Error updating tool:', error.message);
        next(error);
    }
};

export const removeTool = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteTool(id);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('[AdminController] Error deleting tool:', error.message);
        next(error);
    }
};
