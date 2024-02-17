import { Router } from 'express';
import { router as apiRoutes } from './api/index.js';

export const router = Router();

router.use('/api', apiRoutes);

router.use((req, res) => {
	res.send('<h1>Wrong Route!</h1>');
});
