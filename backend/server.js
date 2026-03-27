const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🔥 CONNECT ROUTES
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");   // ✅ ADDED

app.use("/api/auth", authRoutes);
app.use("/api", orderRoutes);                    // ✅ ADDED

// 🔥 CONNECT DATABASE
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// ✅ TEST ROUTE
app.get("/", (req, res) => {
    res.send("🚀 Artify Backend Running");
});

// 🔥 START SERVER
app.listen(5000, () => {
    console.log("🔥 Server running on http://localhost:5000");
});