const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// ✅ CREATE ORDER
router.post("/create", async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();

        res.status(201).json({
            message: "Order saved successfully",
            order
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ GET ALL ORDERS (for admin)
router.get("/all", async (req, res) => {
    try {
        const orders = await Order.find().sort({ _id: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ GET USER ORDERS
router.get("/user/:userId", async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;