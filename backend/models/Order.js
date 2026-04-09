const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        type: String,
        required: false
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Card', 'UPI', 'COD'],
    default: 'COD'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
