import express from 'express';
import { list, createOrder, verifyPayment, getDonationStats } from '../controllers/donationController.js';

const router = express.Router();

// Razorpay integration routes
router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

// Admin routes
router.get('/stats', getDonationStats);
router.get('/', list);

export default router;
