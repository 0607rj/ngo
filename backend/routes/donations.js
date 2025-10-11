import express from 'express';
import { create, list, createOrder, verifyPayment, getDonationStats } from '../controllers/donationController.js';

const router = express.Router();

// Razorpay integration routes
router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

// Admin routes
router.get('/stats', getDonationStats);
router.get('/', list);

// Legacy routes (keep for compatibility)
router.post('/', create);

export default router;
