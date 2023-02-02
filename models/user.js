const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Fname: {
        type: String,
        require: true
    },
    Lname: {
        type: String,
        require: true
    },
    Email: {
        type: String,
        require: true,
        unique: true
    },
    Password: {
        type: String,
        require: true
    },
    Confirm_password: {
        type: String,
        require: true
    }

}, {
    timestamps: true
});


const User = mongoose.model("User", userSchema);

module.exports = User;
