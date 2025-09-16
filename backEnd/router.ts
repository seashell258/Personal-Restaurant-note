import { Router } from 'express';
import { searchRestaurants } from './controllers/restaurantSearchController.js';

const router = Router();

// GET /search?query=xxx
router.get('/mapSearch', searchRestaurants);

export default router;
