const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a product title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  image: {
    type: String, // String URL to the image
    required: [true, 'Please add an image URL']
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
