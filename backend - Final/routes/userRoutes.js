const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// GET /api/users - Get all users (admin only)
router.get('/', authorize('admin'), getUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', getUserById);

// PUT /api/users/:id - Update user
router.put('/:id', updateUser);

// DELETE /api/users/:id - Delete user (admin only)
router.delete('/:id', authorize('admin'), deleteUser);

module.exports = router;