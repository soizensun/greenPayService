const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true, minlength: 5},
    displayName: {type: String},
    role: {type: [String], default: ["shopper"]},
    addressId: {type: String}
})

module.exports = User = mongoose.model("user", userShema);