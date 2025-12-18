const Recharge = require('../models/Recharge');
const User = require('../models/User');
const Plan = require('../models/Plan');

// Create a recharge
const createRecharge = async (req, res) => {
  try {
    const rechargeData = {
      ...req.body,
      user: req.user?.id,
      transactionId: 'TXN' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase(),
      status: 'success'
    };
    
    const recharge = await Recharge.create(rechargeData);
    const populatedRecharge = await Recharge.findById(recharge._id)
      .populate('user', 'name email username')
      .populate('plan', 'name price data validity');
    
    res.json({ success: true, recharge: populatedRecharge });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get user's recharge history
const getUserRecharges = async (req, res) => {
  try {
    const recharges = await Recharge.find({ user: req.user.id })
      .populate('plan', 'name price data validity')
      .sort({ createdAt: -1 });
    res.json({ success: true, recharges });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all recharges (Admin only)
const getAllRecharges = async (req, res) => {
  try {
    const recharges = await Recharge.find()
      .populate('user', 'name email username')
      .populate('plan', 'name price data validity')
      .sort({ createdAt: -1 });
    res.json({ success: true, recharges });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get transaction statistics (Admin only)
const getTransactionStats = async (req, res) => {
  try {
    const totalTransactions = await Recharge.countDocuments();
    const totalRevenue = await Recharge.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalUsers = await Recharge.distinct('user').then(users => users.length);
    
    const statusStats = await Recharge.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    const operatorStats = await Recharge.aggregate([
      { $group: { _id: '$operator', count: { $sum: 1 }, revenue: { $sum: '$amount' } } }
    ]);
    
    res.json({
      success: true,
      stats: {
        totalTransactions,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalUsers,
        statusStats,
        operatorStats
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createRecharge,
  getUserRecharges,
  getAllRecharges,
  getTransactionStats
};
