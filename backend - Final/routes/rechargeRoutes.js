const express = require('express');
const router = express.Router();
const { createRecharge, getUserRecharges, getAllRecharges, getTransactionStats } = require('../controllers/rechargeController');
const { authenticate, authorize } = require('../middleware/auth');

// Protected routes
router.post('/', authenticate, createRecharge);
router.get('/history', authenticate, getUserRecharges);

// Admin only
router.get('/all', authenticate, authorize('admin'), getAllRecharges);
router.get('/stats', authenticate, authorize('admin'), getTransactionStats);

module.exports = router;
