import express from 'express';
import { getTools } from '../controllers/toolsController.js';

const router = express.Router();

router.get('/', getTools);

export default router;
