const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.email ? req.body.email.split("@")[0] : "user",
        password: req.body.password,
        phone: "",       // default
        address: ""
    });

    await user.save();
    res.json(user);
});

// Login
router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user || user.password !== req.body.password) {
        return res.status(400).json("Invalid credentials");
    }

    res.json(user);
});

// Update user profile
router.put("/update/:id", async (req, res) => {
    try {
        let updateData = { ...req.body };

        // ❗ Don't overwrite password if empty
        if (!req.body.password) {
            delete updateData.password;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json("Error updating user");
    }
});

router.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json("Error fetching user");
    }
});

module.exports = router;