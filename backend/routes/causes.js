import express from 'express';
import auth from '../middleware/auth.js';
import { getAll, getOne, create, update, remove } from '../controllers/causeController.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:slug', getOne);
// Admin routes (protect in real app)
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

export default router;
