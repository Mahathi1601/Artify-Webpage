const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// The protect and admin middlewares could be added to modify routes later.
// Currently exposed loosely for beginner-friendly usage and postman testing.
router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router;
