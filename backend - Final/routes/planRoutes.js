const express = require('express');
const { getPlans, getPlanById, createPlan, updatePlan, deletePlan } = require('../controllers/planController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/plans - Get all plans (public)
router.get('/', getPlans);

// GET /api/plans/:id - Get plan by ID (public)
router.get('/:id', getPlanById);

// Protected routes (require authentication)
router.use(authenticate);

// POST /api/plans - Create new plan (admin only)
router.post('/', authorize('admin'), createPlan);

// PUT /api/plans/:id - Update plan (admin only)
router.put('/:id', authorize('admin'), updatePlan);

// DELETE /api/plans/:id - Delete plan (admin only)
router.delete('/:id', authorize('admin'), deletePlan);

module.exports = router;