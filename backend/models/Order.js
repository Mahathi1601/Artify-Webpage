const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  items: Array,
  totalAmount: Number,
  paymentMethod: String,
  paymentStatus: String,
  date: String
});

module.exports = mongoose.model("Order", OrderSchema);