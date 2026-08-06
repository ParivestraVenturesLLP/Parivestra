import express from 'express';
import { login, getLeads, patchLeadStatus, getAdminTools, postTool, patchTool, removeTool } from '../controllers/adminController.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/login', login);
router.get('/leads', adminAuth, getLeads);
router.patch('/leads/:id', adminAuth, patchLeadStatus);
router.get('/tools', adminAuth, getAdminTools);
router.post('/tools', adminAuth, postTool);
router.patch('/tools/:id', adminAuth, patchTool);
router.delete('/tools/:id', adminAuth, removeTool);

export default router;
