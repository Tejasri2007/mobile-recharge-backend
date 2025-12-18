require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const User = require('./models/User');
const Plan = require('./models/Plan');

const app = express();

// Connect to MongoDB
connectDB();

// Create admin user if it doesn't exist
const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@admin.com' });
    if (!adminExists) {
      await User.create({
        username: 'admin',
        name: 'Admin User',
        email: 'admin@admin.com',
        phone: '1234567890',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};



// Initialize app with admin user and test plan (only if they don't exist)
const initializeApp = async () => {
  try {
    // Create admin user
    await createAdminUser();
    
    // Create test plan only if no plans exist
    const existingPlans = await Plan.countDocuments();
    if (existingPlans === 0) {
      await Plan.create({
        name: 'Test Plan',
        operator: 'airtel',
        price: 199,
        validity: 28,
        data: '1.5GB/day',
        description: 'Test plan for verification',
        category: 'prepaid',
        benefits: ['Unlimited calls', 'Free roaming']
      });
      console.log('Created initial test plan');
    } else {
      console.log(`Found ${existingPlans} existing plans, skipping initialization`);
    }
  } catch (error) {
    console.error('Error initializing app:', error);
  }
};

// Call the function after a short delay to ensure DB connection
setTimeout(() => {
  initializeApp();
}, 1000);

// Middleware
app.use(cors({
  origin: "*"
}));



app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/plans', require('./routes/planRoutes'));
app.use('/api/recharge', require('./routes/rechargeRoutes'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Mobile Recharge Backend API is running!' });
});

module.exports = app;
