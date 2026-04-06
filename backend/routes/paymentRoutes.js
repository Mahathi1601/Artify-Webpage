const express = require('express');
const router = express.Router();
const { processPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/:orderId').post(protect, processPayment);

module.exports = router;
