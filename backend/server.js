const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 CONNECT ROUTES FIRST
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// 🔥 CONNECT DATABASE
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Artify Backend Running");
});

// 🔥 START SERVER AT LAST
app.listen(5000, () => {
    console.log("Server running on port 5000");
});