const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true,
    default: () => `ORD-${Math.floor(1000 + Math.random() * 9000)}` // Generates a random ID
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number']
  },
  garments: [{
    item: { type: String, required: true }, // e.g., "Saree"
    quantity: { type: Number, required: true, min: 1 },
    pricePerItem: { type: Number, required: true, min: 0 }
  }],
  totalBill: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'],
    default: 'RECEIVED'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});




module.exports = mongoose.model('Order', OrderSchema);