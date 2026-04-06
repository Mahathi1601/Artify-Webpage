const Order = require('../models/Order');

// @desc    Process a mock payment for an order
// @route   POST /api/payment/:orderId
// @access  Private
const processPayment = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (order) {
      if (order.isPaid) {
        res.status(400);
        throw new Error('Order is already paid');
      }

      // Mock payment handling...
      // In a real app you would integrate Stripe or Razorpay here.
      order.isPaid = true;
      order.paidAt = Date.now();

      const updatedOrder = await order.save();
      res.json({
        message: 'Payment mock successful',
        updatedOrder
      });
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
  }
};

module.exports = {
  processPayment,
};
