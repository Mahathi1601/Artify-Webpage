const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // Return empty cart structure if not found
      return res.status(200).json({ items: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    let cart = await Cart.findOne({ user: req.user._id });

    // If cart doesn't exist for user, create it
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: []
      });
    }

    // Check if product is already in the cart
    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += Number(quantity);
    } else {
      // Push new item details into cart array
      cart.items.push({
        product: productId,
        name: product.title,
        price: product.price,
        image: product.image,
        quantity: Number(quantity)
      });
    }

    const updatedCart = await cart.save();
    res.status(201).json(updatedCart);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
      const updatedCart = await cart.save();
      res.status(200).json(updatedCart);
    } else {
      res.status(404);
      throw new Error('Cart not found');
    }
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart
};
