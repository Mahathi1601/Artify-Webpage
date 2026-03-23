const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    phone: String,
    address: String,
    profilePic: {
    type: String,
    default: "https://i.pravatar.cc/150"
} 
});

module.exports = mongoose.model("User", UserSchema);