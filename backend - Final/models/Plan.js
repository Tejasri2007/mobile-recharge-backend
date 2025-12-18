const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  operator: {
    type: String,
    required: true,
    enum: ['airtel', 'jio', 'vi', 'bsnl']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  validity: {
    type: Number,
    required: true,
    min: 1
  },
  data: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['prepaid', 'postpaid'],
    default: 'prepaid'
  },
  benefits: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);