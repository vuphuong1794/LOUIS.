const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String },  // Password is now optional
    googleId: { type: String, unique: true },  // Google OAuth users will have this field
    isAdmin: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
