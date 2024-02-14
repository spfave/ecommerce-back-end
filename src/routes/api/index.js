import { Router } from 'express';
import { router as categoryRoutes } from './category-routes.js';
import { router as productRoutes } from './product-routes.js';
import { router as tagRoutes } from './tag-routes.js';

export const router = Router();

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);
